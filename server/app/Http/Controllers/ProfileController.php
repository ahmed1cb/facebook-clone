<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\Response;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
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
            'location' => ['nullable', 'string', 'max:255', 'min:3'],
            'state' => ['nullable', 'string', 'max:255', 'min:3'],
            'photo' => ['max:20480', 'image', 'mimes:jpg,png,jpeg,gif,svg'],
            'cover' => ['max:20480', 'image', 'mimes:jpg,png,jpeg,gif,svg'],
            'bio' => ['max:255', 'min:3'],
        ]);


        if ($check->fails()) {

            return Response::json([
                'errors' => $check->errors()
            ], "Invalid Profile Data", );

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
