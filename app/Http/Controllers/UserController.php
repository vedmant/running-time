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
     * @return array
     */
    public function update(Request $request, User $user)
    {
        $this->authorize($user);

        $this->validate($request, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'password' => 'min:6|confirmed',
        ]);

        $user->fill($request->only('name', 'email'));
        if ($request->get('password')) {
            $user->password = bcrypt($request->get('password'));
        }

        // Update user role only for admin
        if ($request->get('role') && $request->get('role') !== $user->role) {
            if ( ! auth()->user()->isAdmin()) abort(401, 'Unathorized to edit user role.');

            $user->role = $request->get('role');
        }

        $user->save();

        return ['user' => $user];
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
