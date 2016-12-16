<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot() {
        parent::boot();

        static::deleting(function($user) {
            $user->entries()->delete();
        });
    }


    /* ========================================================================= *\
     * Relations
    \* ========================================================================= */

    /**
     * User has many entries
     */
    public function entries()
    {
        return $this->hasMany(Entry::class);
    }


    /* ========================================================================= *\
     * Helpers
    \* ========================================================================= */

    /**
     * Get existing or make new access token
     */
    public function getOrMakeToken()
    {
        return $this->createToken('API')->accessToken;
    }

    /**
     * Is user admin
     *
     * @return bool
     */
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    /**
     * Is user manager
     *
     * @return bool
     */
    public function isManager()
    {
        return $this->role === 'manager';
    }
}
