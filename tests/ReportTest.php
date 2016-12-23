<?php

use App\Entry;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ReportTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/report/weekly')
             ->assertResponseStatus(401);
    }

    public function testGetWeekly()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/report/weekly')
             ->assertResponseOk()
             ->seeJsonStructure([
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
