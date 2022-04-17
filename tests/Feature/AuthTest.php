<?php

namespace Tests\Feature;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use DatabaseTransactions;

    public function testLogin()
    {
        $user = User::factory()->has(Entry::factory()->count(30))->create();

        $this->json('POST', '/api/v1/auth/login', [
            'email'    => $user->email,
            'password' => '123456',
        ])
             ->assertOk()
             ->assertJsonStructure([
                 'access_token',
                 'user' => [
                     'id',
                     'email',
                     'name'
                 ]
             ]);
    }

    public function testWrongLogin()
    {
        $user = User::factory()->has(Entry::factory()->count(30))->create();

        $this->json('POST', '/api/v1/auth/login', [
            'email'    => $user->email,
            'password' => 'wrong-pass',
        ])
             ->assertStatus(401)
             ->assertJsonStructure([
                 'message',
             ]);
    }

    public function testRegister()
    {
        $faker = \Faker\Factory::create();

        $this->json('POST', '/api/v1/auth/register', [
            'name'                  => $faker->name,
            'email'                 => $faker->email,
            'password'              => '123456',
            'password_confirmation' => '123456',
        ])
             ->assertOk()
             ->assertJsonStructure([
                 'access_token',
                 'user' => [
                     'id',
                     'email',
                     'name'
                 ]
             ]);
    }

    public function testRegisterValidationError()
    {
        $this->json('POST', '/api/v1/auth/register', [
            'name'                  => '',
            'email'                 => '',
            'password'              => '',
            'password_confirmation' => '',
        ])
             ->assertStatus(422)
             ->assertJsonStructure([
                 'errors' => [
                     'name',
                     'email',
                     'password'
                 ],
             ]);
    }
}
