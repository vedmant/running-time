<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

/**
 * Class UserController
 *
 * @package App\Http\Controllers
 * @resource User
 */
class UserController extends Controller
{
    /**
     * Сurrent authenticated user
     *
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
     * Users list
     *
     * Display a listing of users
     *
     * @param Request $request
     * @return array
     */
    public function index(Request $request)
    {
        $this->authorize('index', User::class);

        $users = (new User)->latest();

        if ($request->get('query')) {
            $users->where('name', 'like', '%' . $request->get('query') . '%')
                ->orWhere('email', 'like', '%' . $request->get('query') . '%');
        }

        return ['users' => $users->paginate()];
    }

    /**
     * Show user
     *
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
     * Update user
     *
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
     * Delete user
     *
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
