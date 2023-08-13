<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Before all
     *
     * @param User $user
     * @return bool
     */
    public function before(User $user, $ability) // phpcs:ignore
    {
        if ($user->isAdmin() || $user->isManager()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the user.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function viewAll(User $user) // phpcs:ignore
    {
        return false;
    }

    /**
     * Determine whether the user can view the user.
     *
     * @param  \App\User  $user
     * @param  \App\User  $onUser
     * @return mixed
     */
    public function view(User $user, User $onUser)
    {
        return $user->id === $onUser->id;
    }

    /**
     * Determine whether the user can create users.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user) // phpcs:ignore
    {
        return false;
    }

    /**
     * Determine whether the user can update the user.
     *
     * @param  \App\User  $user
     * @param  \App\User  $onUser
     * @return mixed
     */
    public function update(User $user, User $onUser)
    {
        return $user->id === $onUser->id;
    }

    /**
     * Determine whether the user can delete the user.
     *
     * @param  \App\User  $user
     * @param  \App\User  $onUser
     * @return mixed
     */
    public function delete(User $user, User $onUser) // phpcs:ignore
    {
        return false;
    }
}
