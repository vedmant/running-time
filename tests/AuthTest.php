<?php

use App\Entry;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AuthTest extends TestCase
{
    use DatabaseTransactions;

    public function testLogin()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->json('POST', '/api/v1/auth/login', [
            'email'    => $user->email,
            'password' => '123456',
        ])
             ->assertResponseOk()
             ->seeJsonStructure([
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
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->json('POST', '/api/v1/auth/login', [
            'email'    => $user->email,
            'password' => 'wrong-pass',
        ])
             ->assertResponseStatus(401)
             ->seeJsonStructure([
                 'message',
             ]);
    }

    public function testRegister()
    {
        $faker = Faker\Factory::create();

        $this->json('POST', '/api/v1/auth/register', [
            'name'                  => $faker->name,
            'email'                 => $faker->email,
            'password'              => '123456',
            'password_confirmation' => '123456',
        ])
             ->assertResponseOk()
             ->seeJsonStructure([
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
             ->assertResponseStatus(422)
             ->seeJsonStructure([
                 'errors' => [
                     'name',
                     'email',
                     'password'
                 ],
             ]);
    }
}
