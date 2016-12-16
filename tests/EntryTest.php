<?php

use App\Entry;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EntryTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/entry')
             ->assertResponseStatus(401);
    }

    public function testGetEntriesList()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/entry')
             ->assertResponseOk()
             ->seeJsonStructure([
                 'entries' => [
                     'current_page',
                     'data' => [
                         '*' => [
                             'id',
                             'date',
                             'distance',
                             'time',
                             'speed',
                             'pace'
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

    public function testCteateEntry()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('POST', '/api/v1/entry', [
                 'date'     => \Carbon\Carbon::now()->toDateString(),
                 'distance' => '6',
                 'time'     => '00:30:05',
             ])
             ->assertResponseOk()
             ->seeJsonStructure([
                 'entry' => [
                     'id',
                     'date',
                     'distance',
                     'time',
                     'speed',
                     'pace',
                 ],
             ]);

    }

    public function testCteateEntryValidationError()
    {
        $user = factory(App\User::class)->create();

        $this->actingAs($user, 'api')
             ->json('POST', '/api/v1/entry', [
                 'date'     => '',
                 'distance' => '',
                 'time'     => '',
             ])
             ->assertResponseStatus(422)
             ->seeJsonStructure([
                 'validation' => [
                     'date',
                     'distance',
                     'time',
                 ],
             ]);

    }
}
