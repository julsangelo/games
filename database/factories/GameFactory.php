<?php

namespace Database\Factories;

use App\Models\Game;
use Illuminate\Database\Eloquent\Factories\Factory;

class GameFactory extends Factory
{
    protected $model = Game::class;

    public function definition()
    {
        return [
            'id',
            'name',
            'image',
            'rank',
            'creationDate',
            'isNew',
            'url'
        ];
    }
}