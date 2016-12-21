<?php

namespace App\Providers;

use App\Extensions\ExtendedValidator;
use Illuminate\Support\ServiceProvider;
use Validator;

class AppServiceProvider extends ServiceProvider
{
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

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerDevProviders();
    }

    /**
     * Register development and local enviroment service providers
     */
    private function registerDevProviders()
    {
        // Local enviroment enviroment service providers
        if ($this->app->environment('local')) {
            $this->app->register(\Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider::class);
        }

        // Local and development enviroment service providers
        if ($this->app->environment('local') || $this->app->environment('development')) {
            $this->app->register(\Barryvdh\Debugbar\ServiceProvider::class);
        }
    }
}
