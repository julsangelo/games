<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class Game extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'rank',
        'creationDate',
        'isNew',
        'url',
    ];

    public function allGames() {
        return $this->orderBy("isNew", 'desc')->orderBy("name", 'asc')->get();
    }

    public function topGames() {
        return $this->where('rank','<>', 'null')->orderBy('rank')->get();
    }

    public function recentGames($user) {
        $values = Redis::connection('cache')->smembers($user);
        return $this->whereIn('id', $values)->get();
    }
}
