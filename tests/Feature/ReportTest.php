<?php

namespace Tests\Feature;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ReportTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/report/weekly')
             ->assertStatus(401);
    }

    public function testGetWeekly()
    {
        $user = User::factory()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/report/weekly')
             ->assertOk()
             ->assertJsonStructure([
                 'weekly' => [
                     'year',
                     'min_year',
                     'max_year',
                     'data',
                     'chart',
                 ]
             ]);
    }
}
