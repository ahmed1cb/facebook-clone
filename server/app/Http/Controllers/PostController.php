<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Services\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class PostController extends Controller
{
    public function getPostDetails($postId)
    {
        $userId = request()->user()->id;
        $targetPost = Post::whereId($postId)->with('comments')->withCount('likes', 'comments')
            ->withExists([
                'likes as isLiked' => function ($q) use ($userId) {
                    return $q->where('user_id', $userId);
                }
            ])
            ->first();

        if (!$targetPost) {
            return Response::json([], "Post Not Found", 404);
        }

        return Response::json([
            'post' => $targetPost
        ], "Post Found Successfully", 200);


    }


    public function getSomeVideos()
    {
        $page = request()->input('page') ?? 1;
        $userId = request()->user()->id;
        $posts = Post::where('post_privacy', 'PUB')->where('post_type', 'VID')->with(['comments.user', 'user'])->withCount('likes', 'comments')->withExists([
            'likes as isLiked' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }
        ])->orderBy('id', 'Desc')->paginate(10, ['*'], 'page', $page);


        return Response::json([
            'videos' => $posts->items()
        ], 'Success', 200);

    }

    public function uploadPost()
    {

        $data = ['post_type', 'post_privacy', 'post_content', 'subtext'];

        $check = Validator::make(request()->only($data), [
            'post_type' => ['in:TXT,IMG,VID', 'required'],
            'post_content' => [
                'required',
                'min:3',
                Rule::when(
                    request('post_type') === 'IMG',
                    [
                        'mimetypes:image/jpeg,image/png,image/webp',
                        'file',
                        'max:40960'
                    ]
                ),

                Rule::when(
                    request('post_type') === 'VID',
                    [
                        'mimetypes:video/mp4,video/quicktime,video/webm',
                        'file',
                        'max:40960'
                    ]

                ),
                Rule::when(
                    request('post_type') === 'TXT',
                    [
                        'string',
                        'max:5000'
                    ]
                )

            ],
            'post_privacy' => ['in:PUB,PRIV,FRI'],
            'subtext' => ['string']
        ]);

        $recordData = [];

        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Post Data", 400);

        }


        $postType = request()->input('post_type');

        if ($postType !== 'TXT') {

            $mediaPath = request()->file('post_content')->store('posts', 'public');
            $recordData['post_content'] = $mediaPath;

        } else {
            $recordData['post_content'] = request()->input('post_content');
        }

        $recordData['post_type'] = request()->input('post_type');
        $recordData['post_privacy'] = request()->input('post_privacy');
        $recordData['user_id'] = request()->user()->id;
        $recordData['subtext'] = request()->input('subtext');
        $post = Post::create($recordData);


        if ($post) {

            return Response::json([
                'post' => $post
            ], 'Post Created Successfully', 201);

        }

    }


    public function deletePost($postId)
    {

        $targetPost = request()->user()->posts()->whereId($postId)->first();

        if (!$targetPost) {
            return Response::json([], "Post With This Id Not Found", 404);
        }


        $targetPost->delete();

        return Response::json([], "Post Deleted Successfully", 200);

    }

    public function updatePost($postId)
    {

        $targetPost = request()->user()->posts()->whereId($postId)->first();


        if (!$targetPost) {
            return Response::json([], "Post With This Id Not Found", 404);
        }


        $updateableData = ['post_privacy', 'post_content', 'subtext'];

        $check = Validator::make(request()->only($updateableData), [
            'post_content' => [
                'nullable',
                Rule::when(
                    $targetPost->post_type === 'IMG',
                    [
                        'mimetypes:image/jpeg,image/png,image/webp',
                        'file',
                        'max:40480'
                    ]
                ),

                Rule::when(
                    $targetPost->post_type === 'VID',
                    [
                        'mimetypes:video/mp4,video/quicktime,video/webm',
                        'file',
                        'max:40480'
                    ]

                ),
                Rule::when(
                    $targetPost->post_type === 'TXT',
                    [
                        'string',
                        'min:3',

                        'max:5000'
                    ]
                )

            ],
            'post_privacy' => ['in:PUB,PRIV,FRI'],
            'subtext' => ['string']
        ]);


        if ($check->fails()) {
            return Response::json([
                'errors' => $check->errors()
            ], 'Invalid Post Data', 400);
        }


        $newData = [];


        if (request()->has('post_privacy')) {
            $newData['post_privacy'] = request()->input('post_privacy');
        }

        if (request()->has('post_content') && $targetPost->post_type === 'TXT') {
            $newData['post_content'] = request()->input('post_content');
        }

        if (request()->has('subtext')) {
            $newData['subtext'] = request()->input('subtext');
        }


        if (request()->hasFile('post_content')) {

            if ($targetPost->post_type !== "TXT") {

                Storage::disk('public')->delete($targetPost->post_content);

                $path = request()->file('post_content')->store('posts', 'public');

                $newData['post_content'] = $path;

            }

        }


        $targetPost->update($newData);



        return Response::json([
            'post' => $targetPost,
        ], 'Post Updated Successfully', 200);



    }

    public function toggeLike($postId)
    {

        $post = Post::whereId($postId)->first();
        $user = request()->user();

        if (!$post) {
            return Response::json([], 'Post Not Found', 404);
        }


        $like = $post->likes->where('user_id', $user->id)->first();


        if ($like) {
            $like->delete();

            return Response::json([
                'is_liked' => false
            ], 'Like Deleted Successfully', 200);

        }


        $like = Like::create([
            'user_id' => $user->id,
            'post_id' => $postId
        ]);

        return Response::json([
            'is_liked' => true
        ], 'Post Liked Successfully', 201);

    }


    public function getSomePosts()
    {

        $page = request()->input('page') ?? 1;
        $userId = request()->user()->id;
        $posts = Post::where('post_privacy', 'PUB')->with(['comments.user', 'user'])->withCount('likes', 'comments')->withExists([
            'likes as isLiked' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }
        ])->orderBy('id', 'Desc')->paginate(10, ['*'], 'page', $page);


        return Response::json([
            'posts' => $posts->items()
        ], 'Success', 200);

    }

}
