<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Return current authenticated user data
     *
     * @param Request $request
     * @return mixed
     */
    public function me(Request $request)
    {
        return $request->user();
    }

    /**
     * Display a listing of users
     *
     * @return array
     */
    public function index()
    {
        return ['users' =>(new User)->latest()->paginate(15)];
    }


    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize(User::class);
    }

    /**
     * Display the specified user.
     *
     * @param User $user
     * @return array
     */
    public function show(User $user)
    {
        $this->authorize($user);

        return ['user' => $user];
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param User                      $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize($user);
    }

    /**
     * Remove the specified user from storage.
     *
     * @param User $user
     * @return array
     */
    public function destroy(User $user)
    {
        $this->authorize($user);

        $user->delete();

        return ['message' => 'Success'];
    }
}
