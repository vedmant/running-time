<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/user')->assertStatus(401);
        $this->json('GET', 'api/v1/user/me')->assertStatus(401);
        $this->json('GET', 'api/v1/user/1')->assertStatus(401);
        $this->json('PUT', 'api/v1/user/1')->assertStatus(401);
        $this->json('DELETE', 'api/v1/user/1')->assertStatus(401);
    }

    public function testMustBeAdmin()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', 'api/v1/user')
             ->assertStatus(403);

        $this->actingAs($user, 'sanctum')
             ->json('GET', 'api/v1/user/' . $user2->id)
             ->assertStatus(403);

        $this->actingAs($user, 'sanctum')
             ->json('PUT', 'api/v1/user/' . $user2->id)
             ->assertStatus(403);

        $this->actingAs($user, 'sanctum')
             ->json('DELETE', 'api/v1/user/' . $user2->id)
             ->assertStatus(403);
    }

    public function testGetCurrentUser()
    {
        /** @var User $user */
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', 'api/v1/user/me')
             ->assertStatus(200)
             ->assertJson($user->toArray());
    }

    public function testGetUsersList()
    {
        $user = User::factory()->admin()->create();
        User::factory()->count(10)->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/user')
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->admin()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/user/' . $user2->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
             ])
             ->assertOk()
             ->assertJson(['user' => $user2->fresh()->toArray()]);
    }

    public function testUpdateUser()
    {
        $user = User::factory()->admin()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/user/' . $user2->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
                 'role'  => 'manager',
             ])
             ->assertOk()
             ->assertJson(['user' => $user2->fresh()->toArray()]);
    }

    public function testRevokeSelfAdminRestriction()
    {
        $user = User::factory()->admin()->create();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/user/' . $user->id, [
                 'name'  => $user->name,
                 'email' => $user->email,
                 'role' => 'user'
             ])->assertStatus(401);
    }

    public function testUpdateCurrentUserByNonAdmin()
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/user/' . $user->id, [
                 'name'  => 'New Name',
                 'email' => 'newemail@gmail.com',
             ])
             ->assertOk()
             ->assertJson(['user' => $user->fresh()->toArray()]);
    }

    public function testDeleteUser()
    {
        $user = User::factory()->admin()->create();
        $user2 = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('DELETE', '/api/v1/user/' . $user2->id)
             ->assertOk();

        $this->assertNull(User::find($user2->id));
    }
}
