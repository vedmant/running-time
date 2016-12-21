<?php

namespace App;

use Illuminate\Database\Eloquent\Model as Eloquent;

abstract class Model extends Eloquent
{
    /**
     * The number of models to return for pagination.
     *
     * @var int
     */
    protected $perPage = 15;
}
