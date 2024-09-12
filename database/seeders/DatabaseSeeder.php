<?php

namespace Database\Seeders;

use App\Models\Game;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Game::factory()->create([
            'id' => 1,
            'name' => 'Candy Match 3 Crush',
            'image' => 'pjpg350x209.jfif',
            'rank' => 87,
            'creationDate' => 2024-03-25,
            'url' => 'https://yandex.com/games/app/303985'
        ]
        // , [
        //     'id' => 2,
        //     'name' => 'Solitaire Classic',
        //     'image' => 'pjpg350x209(5).jfif',
        //     'rank' => 79,
        //     'creationDate' => 2024-03-25,
        //     'url' => 'https://yandex.com/games/app/191706'
        // ], [
        //     'id' => 3,
        //     'name' => 'Word Crosswords',
        //     'image' => 'pjpg350x209 (6).jfif',
        //     'rank' => 76,
        //     'creationDate' => 2024-03-25,
        //     'url' => 'https://yandex.com/games/app/275307'
        // ], [
        //     'id' => 4,
        //     'name' => 'Nubix vs the Zombie King',
        //     'image' => 'pjpg350x209(4).jfif',
        //     'rank' => null,
        //     'creationDate' => 2024-06-25,
        //     'url' => 'https://yandex.com/games/app/351598'
        // ], [
        //     'id' => 5,
        //     'name' => 'Obby: School Empire, Monster',
        //     'image' => 'pjpg350x209 (2).jfif',
        //     'rank' => null,
        //     'creationDate' => 2024-06-25,
        //     'url' => 'https://yandex.com/games/app/352542'
        // ], [
        //     'id' => 6,
        //     'name' => '5 minutes flight time is fine!',
        //     'image' => 'pjpg350x209 (1).jfif',
        //     'rank' => null,
        //     'creationDate' => 2024-06-25,
        //     'url' => 'https://yandex.com/games/app/347391'
        // ]
        );
    }
}
