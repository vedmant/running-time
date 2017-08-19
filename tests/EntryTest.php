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
        $this->json('GET', 'api/v1/entry')->assertResponseStatus(401);
        $this->json('GET', 'api/v1/entry/all')->assertResponseStatus(401);
        $this->json('POST', 'api/v1/entry')->assertResponseStatus(401);
        $this->json('PUT', 'api/v1/entry/1')->assertResponseStatus(401);
        $this->json('DELETE', 'api/v1/entry/1')->assertResponseStatus(401);
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

    public function testGetAllEntriesListByAdmin()
    {
        $user = factory(App\User::class)->states('admin')->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/entry/all')
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

    public function testGetAllEntriesList()
    {
        $user = factory(App\User::class)->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 30)->make());

        $this->actingAs($user, 'api')
             ->json('GET', '/api/v1/entry/all')
             ->assertResponseStatus(401);
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

    public function testUpdateEntry()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user->entries()->first();

        $this->actingAs($user, 'api')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertResponseOk()
             ->seeJson(['entry' => $entry->fresh()->toArray()]);

    }

    public function testUpdateNotOwnedEntry()
    {
        $user = factory(App\User::class)->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'api')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertResponseStatus(401);
    }

    public function testUpdateNotOwnedEntryByAdmin()
    {
        $user = factory(App\User::class)->states('admin')->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'api')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertResponseOk()
             ->seeJson(['entry' => $entry->fresh()->toArray()]);

    }

    public function testDeleteEntry()
    {
        $user = factory(App\User::class)->create();
        $user->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user->entries()->first();

        $this->actingAs($user, 'api')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertResponseOk();

        $this->assertNull(Entry::find($entry->id));
    }

    public function testDeleteNotOwnedEntry()
    {
        $user = factory(App\User::class)->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'api')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertResponseStatus(401);

        $this->assertNotNull(Entry::find($entry->id));
    }

    public function testDeleteNotOwnedEntryByAdmin()
    {
        $user = factory(App\User::class)->states('admin')->create();

        $user2 = factory(App\User::class)->create();
        $user2->entries()->saveMany(factory(Entry::class, 2)->make());

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'api')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertResponseOk();

        $this->assertNull(Entry::find($entry->id));
    }
}
