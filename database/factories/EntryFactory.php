<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Entry>
 */
class EntryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $distance = $this->faker->numberBetween(2, 20);
        $time     = round($distance * rand(4 * 60, 7 * 60));

        return [
            'user_id'  => 0,
            'date'     => $this->faker->dateTimeBetween('-90 days', 'now')->format('Y-m-d'),
            'distance' => $distance,
            'time'     => seconds2time($time),
            'speed'    => $distance / ($time / 3600),
            'pace'     => ($time / 60) / $distance,
        ];
    }
}
