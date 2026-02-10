<?php

namespace App\Http\Controllers;

use App\Models\Request;
use App\Models\User;
use App\Services\Response;

class UsersController extends Controller
{
    public function getUser($id)
    {

        $userExists = User::whereId($id)->exists();


        if (!$userExists) {
            return Response::json([], 'User Not Found', 404);
        }

        $authUserId = request()->user()->id;

        $userFriendsIds = request()->user()->friends()->pluck('friend_id');

        $user = User::with([
            'posts' => function ($q) use ($authUserId, $userFriendsIds) {
                $q->where(function ($q) {
                    $q->where('post_privacy', 'PUB');
                })->orWhere(function ($q) use ($userFriendsIds) {
                    $q->whereIn('user_id', $userFriendsIds)
                        ->where('post_privacy', 'FRI');
                })
                    ->with(['comments.user', 'user'])
                    ->withCount('likes', 'comments')
                    ->withExists([
                        'likes as isLiked' => function ($q) use ($authUserId) {
                            $q->where('user_id', $authUserId);
                        }
                    ])
                    ->orderBy('id', 'Desc');
            },
            'friends.friend'
        ])->find($id);




        $isFriend = request()->user()->friends()->where('friend_id', $id)->exists();
        $isRequested = Request::where('from_id', $authUserId)->where('to_id', $id)->exists();
        $user->isFriend = $isFriend;
        $user->isRequested = $isRequested;

        return Response::json([
            'user' => $user
        ], 'Success', 200);


    }
}
