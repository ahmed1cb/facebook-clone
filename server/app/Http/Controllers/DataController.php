<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Services\Response;

class DataController extends Controller
{
    public function search($query)
    {

        $query = trim(strip_tags($query));

        if (strlen($query) < 3) {
            return Response::json([], "Query Too Short", 400);
        }

        $userId = request()->user()->id;

        $posts = Post::where('post_content', 'LIKE', "%{$query}%")->with('comments.user', 'user')->withCount('likes', 'comments')->withExists([
            'likes as isLiked' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }
        ])->limit(300)->get();

        $people = User::where('id', '!=', $userId)->where('name', 'LIKE', "%{$query}%")->orWhere('location', 'LIKE', "%{$query}%")->limit(300)->get();

        return Response::json([
            'posts' => $posts,
            'people' => $people
        ]);


    }
}
