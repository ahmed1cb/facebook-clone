<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{
    function getUserDetails()
    {
        $userId = request()->user()->id;
        $user = request()->user()->load([
            'posts' => function ($q) use ($userId) {
                return $q->withCount('likes', 'comments')->with('comments.user')->withExists([
                    'likes as isLiked' => function ($q) use ($userId) {
                        return $q->where('user_id', $userId);
                    }
                ]);
            }
            ,
            'friends.friend',
            'recivedRequests.sender'
        ]);


        return Response::json([
            'user' => $user
        ], "Success", 200);

    }


    function register()
    {
        /* 

            name *
            email *
            password *
            password Verification *

        */

        $data = request()->only('name', 'email', 'password', 'password_confirmation');

        $check = Validator::make($data, [
            'name' => ['required', 'max:255'],
            'email' => ['email', 'required', 'max:255', 'unique:users,email'],
            'password' => ['min:8', 'max:16', 'required', 'confirmed']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Register Data", 400);
        }


        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password'])
        ]);


        $joiningPostDetails = [
            'post_content' => "\nHello There im new At Facebook\n",
            'post_type' => 'TXT',
            'user_id' => $user->id,
            'post_privacy' => 'PUB'
        ];

        $user->posts()->create(($joiningPostDetails));

        return Response::json([], 'User registered successfully', 201);
    }


    public function login()
    {

        $data = request()->only('email', 'password');

        $check = Validator::make($data, [
            'email' => ['email', 'required', 'max:255', 'exists:users,email'],
            'password' => ['min:8', 'max:16', 'required']
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors(),
                'dd' => $data
            ], "Invalid Data Data", 400);
        }


        $userByEmail = User::whereEmail($data['email'])->first();

        $passwordCheck = Hash::check($data['password'], $userByEmail->password);

        if (!$passwordCheck) {
            return Response::json([
                'errors' => [
                    'login' => "Invalid Login Data"
                ]
            ], "Invalid Data Data", 400);
        }

        $token = $userByEmail->createToken('USER_AUTH_TOKEN', [], Carbon::now()->addDays(30))->plainTextToken;


        return Response::json([
            'token' => $token
        ], "User Login Successfully", 200);
    }


    public function logoutUser()
    {
        request()->user()->currentAccessToken()->delete();

        return Response::json([], 'User Logout Successfully', 200);
    }

    public function editProfile()
    {

        $user = request()->user();

        $dataToEdit = ['name', 'location', 'state', 'bio'];
        $files = ['photo', 'cover'];


        $check = Validator::make(request()->only(array_merge(
            $dataToEdit,
            $files
        )), [
            'name' => ['nullable', 'string', 'max:255', 'min:3'],
            'location' => ['nullable', 'string', 'max:255'],
            'state' => ['nullable', 'string', 'max:255'],
            'photo' => ['max:20480', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp'],
            'cover' => ['max:20480', 'image', 'mimes:jpg,png,jpeg,gif,svg,webp'],
            'bio' => ['max:255'],
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Profile Data", 400);

        }


        $data = [];

        foreach ($dataToEdit as $key) {
            if (request()->has($key)) {
                $data[$key] = request()->input($key);
            }
        }

        foreach ($files as $key) {
            if (request()->hasFile($key)) {


                $path = request()->file($key)->store('users', 'public');

                $data[$key] = $path;

            }
        }


        $user->update($data);


        return Response::json([
            'user' => $user->fresh()
        ], "User Updated Successfully", 200);

    }

}
