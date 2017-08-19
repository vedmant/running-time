<?php

use App\Entry;
use Illuminate\Database\Seeder;
use Laravel\Passport\Bridge\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class)->states('admin')
            ->create(['name' => 'Admin', 'email' => 'admin@gmail.com'])
            ->entries()->saveMany(factory(Entry::class, 30)->make());

        factory(App\User::class)->states('manager')
            ->create(['name' => 'Manager', 'email' => 'manager@gmail.com'])
            ->entries()->saveMany(factory(Entry::class, 30)->make());

        factory(App\User::class)
            ->create(['name' => 'User', 'email' => 'user@gmail.com'])
            ->entries()->saveMany(factory(Entry::class, 30)->make());

        factory(App\User::class, 5)
            ->create()
            ->each(function ($u) {
                $u->entries()->saveMany(factory(Entry::class, 30)->make());
            });
    }
}
