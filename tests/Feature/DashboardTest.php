<?php

namespace Tests\Feature;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/dashboard/data')->assertStatus(401);
        $this->json('GET', 'api/v1/dashboard/admin-data')->assertStatus(401);
    }

    public function testGetData()
    {
        $user = User::factory()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/dashboard/data')
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->admin()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/dashboard/admin-data')
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/dashboard/admin-data')
             ->assertStatus(401);
    }
}
