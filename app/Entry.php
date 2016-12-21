<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;

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

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id'  => 'int',
        'date'     => 'date',
        'distance' => 'float',
        'time'     => 'string',
        'speed'    => 'float',
        'pace'     => 'float',
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


    /* ========================================================================= *\
     * Helpers
    \* ========================================================================= */

    /**
     * Get time in seconds
     *
     * @return int
     */
    public function seconds()
    {
        return time2secconds($this->time);
    }

    /**
     * Apply filters
     *
     * @param Builder $query
     * @param $filters
     */
    public function scopeFilter($query, $filters)
    {
        foreach ($filters as $filter => $value) {
            if ( ! $value) continue;
            switch ($filter) {
                case 'dateFrom':
                    $query->where('date', '>=', Carbon::parse($value)->toDateString());
                    break;
                case 'dateTo':
                    $query->where('date', '<=', Carbon::parse($value)->toDateString());
                    break;
            }
        }
    }
}
