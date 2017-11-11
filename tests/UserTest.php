<?php

use App\Entry;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/user')->assertResponseStatus(401);
        $this->json('GET', 'api/v1/user/me')->assertResponseStatus(401);
        $this->json('GET', 'api/v1/user/1')->assertResponseStatus(401);
        $this->json('PUT', 'api/v1/user/1')->assertResponseStatus(401);
        $this->json('DELETE', 'api/v1/user/1')->assertResponseStatus(401);
    }

    public function testMustBeAdmin()
    {
        $user = factory(App\User::class)->create();
        $user2 = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('GET', 'api/v1/user')
             ->assertResponseStatus(403);

        $this->actingAs($user, 'api')
             ->json('GET', 'api/v1/user/' . $user2->id)
             ->assertResponseStatus(403);

        $this->actingAs($user, 'api')
             ->json('PUT', 'api/v1/user/' . $user2->id)
             ->assertResponseStatus(403);

        $this->actingAs($user, 'api')
             ->json('DELETE', 'api/v1/user/' . $user2->id)
             ->assertResponseStatus(403);
    }

    public function testGetCurrentUser()
    {
        /** @var User $user */
        $user = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('GET', 'api/v1/user/me')
             ->assertResponseOK()
             ->seeJson($user->toArray());
    }

    public function testGetUsersList()
    {
        $user = factory(App\User::class)->states('admin')->create();
        factory(User::class, 10)->make();

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/user')
             ->assertResponseOk()
             ->seeJsonStructure([
                 'users' => [
                     'current_page',
                     'data' => [
                         '*' => [
                             'id',
                             'name',
                             'email',
                         ]
                     ],
                     'from',
                     'last_page',
                     'per_page',
                     'to',
                     'total',
                 ],
             ]);
    }

    public function testShowUser()
    {
        $user = factory(App\User::class)->states('admin')->create();
        $user2 = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/user/' . $user2->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
             ])
             ->assertResponseOk()
             ->seeJson(['user' => $user2->fresh()->toArray()]);
    }

    public function testUpdateUser()
    {
        $user = factory(App\User::class)->states('admin')->create();
        $user2 = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('PUT', '/api/v1/user/' . $user2->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
             ])
             ->assertResponseOk()
             ->seeJson(['user' => $user2->fresh()->toArray()]);
    }

    public function testUpdateCurrentUserByNonAdmin()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('PUT', '/api/v1/user/' . $user->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
             ])
             ->assertResponseOk()
             ->seeJson(['user' => $user->fresh()->toArray()]);
    }

    public function testDeleteUser()
    {
        $user = factory(App\User::class)->states('admin')->create();
        $user2 = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('DELETE', '/api/v1/user/' . $user2->id)
             ->assertResponseOk();

        $this->assertNull(User::find($user2->id));
    }
}
