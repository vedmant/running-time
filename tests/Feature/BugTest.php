<?php

namespace Tests\Feature;

use App\Entry;
use App\Notifications\TokenExpiration;
use App\User;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Illuminate\Support\Facades\Notification;

class BugTest extends TestCase
{
    use DatabaseTransactions;

    public function testLogin()
    {
        $this->markTestSkipped();
        Notification::fake();

        $user = factory(\App\User::class)->create();
        $user->notify(new TokenExpiration('test'));

        Notification::sent($user, TokenExpiration::class);
    }
}
