<?php

namespace App\Policies;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EntryPolicy
{
    use HandlesAuthorization;

    /**
     * Before all
     *
     * @param User $user
     * @param      $ability
     * @return bool
     */
    public function before(User $user, $ability) // phpcs:ignore
    {
        if ($user->isAdmin()) {
            return true;
        }
    }

    /**
     * Determine whether the user can view all users entries
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function all(User $user) // phpcs:ignore
    {
        return false;
    }

    /**
     * Determine whether the user can view the entry.
     *
     * @param  \App\User  $user
     * @param  \App\Entry  $entry
     * @return mixed
     */
    public function view(User $user, Entry $entry)
    {
        return $user->id === $entry->user_id;
    }

    /**
     * Determine whether the user can create entries.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user) // phpcs:ignore
    {
        return true;
    }

    /**
     * Determine whether the user can update the entry.
     *
     * @param  \App\User  $user
     * @param  \App\Entry  $entry
     * @return mixed
     */
    public function update(User $user, Entry $entry)
    {
        return $user->id === $entry->user_id;
    }

    /**
     * Determine whether the user can delete the entry.
     *
     * @param  \App\User  $user
     * @param  \App\Entry  $entry
     * @return mixed
     */
    public function delete(User $user, Entry $entry)
    {
        return $user->id === $entry->user_id;
    }
}
