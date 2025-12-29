<?php

namespace App\Http\Controllers;

use App\Models\Friend;
use App\Models\User;
use App\Services\Response;
use App\Models\Request;
class RequestsController extends Controller
{
    public function toggleFriendRequest($targetUserId)
    {
        $myId = request()->user()->id;
        $targetUserExists = User::where('id', $targetUserId)->where('id', '!=', $myId)->exists();


        if (!$targetUserExists) {
            return Response::json([], "Invalid Target User Id", 400);
        }


        $request = Request::where('from_id', $myId)->where('to_id', $targetUserId)->first();

        if ($request) {

            $request->delete();
            return Response::json([], "Friend Request Deleted Successfully", 200);

        }

        $isAlreadyFriend = Friend::where('user_id', $myId)->where('friend_id', $targetUserId)
            ->orWhere('user_id', $targetUserId)->where('friend_id', $myId)->exists();

        if ($isAlreadyFriend) {


            return Response::json([], "You Are Already Friends", 400);
        }

        $data = [
            'from_id' => request()->user()->id,
            'to_id' => $targetUserId
        ];


        $request = Request::create($data);

        if ($request) {
            return Response::json([], "Friend Request Sent Successfully", 200);
        }
    }

    public function acceptFriendRequest($senderId)
    {
        $myId = request()->user()->id;
        $request = Request::where('from_id', $senderId)->where('to_id', $myId)->first();

        if (!$request) {
            return Response::json([], "There is no Recived Requests From this User", 400);
        }



        $request->delete();

        // insert Friend

        Friend::create([
            'user_id' => $senderId,
            'friend_id' => $myId,
        ]);


        Friend::create([
            'friend_id' => $senderId,
            'user_id' => $myId,
        ]);

        return Response::json([], "Friend Request Accepted Successfully", 200);

    }



    public function FriendRequest($senderId)
    {
        $myId = request()->user()->id;
        $request = Request::where('from_id', $senderId)->where('to_id', $myId)->first();

        if (!$request) {
            return Response::json([], "There is no Recived Requests From this User", 400);
        }



        $request->delete();


        return Response::json([], "Friend Request Rejected Successfully", 200);

    }

}
