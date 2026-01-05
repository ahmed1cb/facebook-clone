<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Services\Response;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    public function commentOnPost($postId)
    {

        $post = Post::whereId($postId)->first();

        if (!$post) {

            if (!$post) {
                return Response::json([], 'Post Not Found', 404);
            }
        }


        if (!request()->input('content') or strlen(request()->input('content') < 3)) {
            return Response::json([
                'errors' => [
                    'content' => 'post Content Must Be at Least 3 Letters'
                ]
            ], 'Invalid Post Data', 400);
        }

        $comment = $post->comments()->create([
            'content' => request()->input('content'),
            'user_id' => request()->user()->id,
            'post_id' => $post->id
        ]);

        return Response::json([
            'comment' => $comment
        ], 'Comment Created Successfully', 201);

    }


    public function deleteComment($commentId)
    {
        $user = request()->user();
        $comment = $user->comments()->whereId($commentId)->first();

        if (!$comment) {

            return Response::json([], 'Comment Not Found', 404);

        }

        $comment->delete();

        return Response::json([], 'Comment Deleted Successfully', 200);



    }

}
