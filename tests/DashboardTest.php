<?php

use App\Entry;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class DashboardTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/dashboard/data')->assertResponseStatus(401);
        $this->json('GET', 'api/v1/dashboard/admin-data')->assertResponseStatus(401);
    }

    public function testGetData()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/dashboard/data')
             ->assertResponseOk()
             ->seeJsonStructure([
                 'weekly_count',
                 'weekly_avg_speed',
                 'weekly_avg_pace',
                 'week_chart',
                 'max_speed',
                 'max_distance',
                 'max_time',
             ]);
    }

    public function testGetAdminData()
    {
        $user = factory(App\User::class)->states('admin')->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/dashboard/admin-data')
             ->assertResponseOk()
             ->seeJsonStructure([
                 'total_users',
                 'new_users_this_week',
                 'new_users_this_month',
                 'total_entries',
                 'avg_entries_per_user',
                 'fastest_run',
                 'longest_run',
             ]);
    }

    public function testGetAdminDataByNonAdmin()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/dashboard/admin-data')
             ->assertResponseStatus(401);
    }
}
