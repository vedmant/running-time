<?php

namespace App\Providers;

use App\Extensions\ExtendedValidator;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Validator with custom rules
        Validator::resolver(function($translator, $data, $rules, $messages) {
            return new ExtendedValidator($translator, $data, $rules, $messages);
        });
    }
}
