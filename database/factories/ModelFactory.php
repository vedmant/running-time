<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name'           => $faker->name,
        'email'          => $faker->unique()->safeEmail,
        'password'       => $password ? : $password = bcrypt('123456'),
        'role'           => 'user',
        'remember_token' => str_random(10),
    ];
});

$factory->state(App\User::class, 'admin', function ($faker) {
    return [
        'role' => 'admin',
    ];
});

$factory->state(App\User::class, 'manager', function ($faker) {
    return [
        'role' => 'manager',
    ];
});

$factory->define(App\Entry::class, function (Faker\Generator $faker) {
    $distance = $faker->numberBetween(2, 20);
    $time     = round($distance * rand(4 * 60, 7 * 60));

    return [
        'user_id'  => 0,
        'date'     => $faker->dateTimeBetween('-60 days', 'now')->format('Y-m-d'),
        'distance' => $distance,
        'time'     => seconds2time($time),
        'speed'    => $distance / ($time / 3600),
        'pace'     => ($time / 60) / $distance,
    ];
});