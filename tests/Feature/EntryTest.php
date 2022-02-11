<?php

namespace Tests\Feature;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class EntryTest extends TestCase
{
    use DatabaseTransactions;

    public function testMustBeAuthenticated()
    {
        $this->json('GET', 'api/v1/entry')->assertStatus(401);
        $this->json('GET', 'api/v1/entry/all')->assertStatus(401);
        $this->json('POST', 'api/v1/entry')->assertStatus(401);
        $this->json('PUT', 'api/v1/entry/1')->assertStatus(401);
        $this->json('DELETE', 'api/v1/entry/1')->assertStatus(401);
    }

    public function testGetEntriesList()
    {
        $user = User::factory()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/entry')
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->admin()->create();

        $user2 = User::factory()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/entry/all')
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->create();

        $user2 = User::factory()->has(Entry::factory()->count(30))->create();

        $this->actingAs($user, 'sanctum')
             ->json('GET', '/api/v1/entry/all')
             ->assertStatus(403);
    }

    public function testCteateEntry()
    {
        $user = User::factory()->admin()->create();

        $this->actingAs($user, 'sanctum')
             ->json('POST', '/api/v1/entry', [
                 'date'     => \Carbon\Carbon::now()->toDateString(),
                 'distance' => '6',
                 'time'     => '00:30:05',
             ])
             ->assertOk()
             ->assertJsonStructure([
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
        $user = User::factory()->admin()->create();

        $this->actingAs($user, 'sanctum')
             ->json('POST', '/api/v1/entry', [
                 'date'     => '',
                 'distance' => '',
                 'time'     => '',
             ])
             ->assertStatus(422)
             ->assertJsonStructure([
                 'errors' => [
                     'date',
                     'distance',
                     'time',
                 ],
             ]);

    }

    public function testUpdateEntry()
    {
        $user = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertOk()
             ->assertJson(['entry' => $entry->fresh()->toArray()]);

    }

    public function testUpdateNotOwnedEntry()
    {
        $user = User::factory()->create();

        $user2 = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertStatus(403);
    }

    public function testUpdateNotOwnedEntryByAdmin()
    {
        $user = User::factory()->admin()->create();

        $user2 = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('PUT', '/api/v1/entry/' . $entry->id, [
                 'date'     => $entry->date->toDateString(),
                 'distance' => 5,
                 'time'     => '00:20:00',
             ])
             ->assertOk()
             ->assertJson(['entry' => $entry->fresh()->toArray()]);

    }

    public function testDeleteEntry()
    {
        $user = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertOk();

        $this->assertNull(Entry::find($entry->id));
    }

    public function testDeleteNotOwnedEntry()
    {
        $user = User::factory()->create();

        $user2 = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertStatus(403);

        $this->assertNotNull(Entry::find($entry->id));
    }

    public function testDeleteNotOwnedEntryByAdmin()
    {
        $user = User::factory()->admin()->create();

        $user2 = User::factory()->has(Entry::factory()->count(2))->create();

        /** @var Entry $entry */
        $entry = $user2->entries()->first();

        $this->actingAs($user, 'sanctum')
             ->json('DELETE', '/api/v1/entry/' . $entry->id)
             ->assertOk();

        $this->assertNull(Entry::find($entry->id));
    }
}
