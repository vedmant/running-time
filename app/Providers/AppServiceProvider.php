<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
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
            //$this->app->register(\App\Services\ApiDebug\ApiDebugServiceProvider::class);
        }
    }
}
