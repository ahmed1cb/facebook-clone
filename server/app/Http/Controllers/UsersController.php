<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Response;
use Illuminate\Http\Request;

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
                $q->where(function ($q) use ($authUserId, $userFriendsIds) {
                    $q->where(function ($q) use ($authUserId) {
                        $q->where('user_id', $authUserId)
                            ->where('post_privacy', 'PUB');
                    })->orWhere(function ($q) use ($userFriendsIds) {
                        $q->whereIn('user_id', $userFriendsIds)
                            ->where('post_privacy', 'FRI');
                    });
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

        if (!$user) {
            return Response::json([], 'User Not Found', 404);
        }

        return Response::json([
            'user' => $user
        ], 'Success', 200);


    }
}
