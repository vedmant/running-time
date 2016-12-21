<?php

namespace App\Extensions;

use Illuminate\Validation\Validator;

class ExtendedValidator extends Validator
{
    /**
     * Validate required time field
     *
     * @param $attribute
     * @param $value
     * @param $parameters
     * @return bool
     */
    public function validateTimeRequired($attribute, $value, $parameters)
    {
        return time2secconds($value) > 0;
    }

}