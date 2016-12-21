<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

class User extends Model implements
    AuthenticatableContract,
    AuthorizableContract,
    CanResetPasswordContract
{
    use Authenticatable, Authorizable, CanResetPassword, HasApiTokens, Notifiable;

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
