<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date', 'distance', 'time',
    ];

    /* ========================================================================= *\
     * Relations
    \* ========================================================================= */

    /**
     * Belongs to user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
