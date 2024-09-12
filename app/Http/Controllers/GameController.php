<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Carbon\Carbon;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Session as FacadesSession;

class GameController extends Controller
{
    protected $clickedId;
    public function recentlyClicked(Request $request) {
        $key = $request->key;
        $user = $request->user;
        $url = Game::where('id', "LIKE", $key)->value('url');

        Redis::connection('cache')->sadd($user, $key);

        return response()->json([
            'result'=> true,
            'url' => $url,
        ]);
    }

    public function getGames(Game $game) {
        $updateGames = Game::get();

        foreach ($updateGames as $game) {
            $isNew = 0;
            $creationDate = Carbon::parse($game->creationDate);
            $currentDate = Carbon::now()->toDateString();
            
            $months = $creationDate->diffInMonths($currentDate);
    
            if($months <= 3) {
                $isNew = 1;
            }

            DB::table('games')->where('name', '=', $game->name)->update(['isNew'=> $isNew]);
        }

        $games = new Game;
        $user = Auth::user();
        $username = $user->username;
        $isSearch = false;

        return response()->json([
            'isSearch' => $isSearch,
            'topGames' => $games->topGames(),
            'allGames' => $games->allGames(),
            'recentGames' => $games->recentGames($username)
        ]);
    }

    public function searchGames(Request $request) { 
        $game = Game::where("name", 'LIKE', '%'.$request->gameName.'%')->get();
        $isSearch = true;   

        return response()->json([
            'result' => $isSearch,
            'data'=> $game
        ]);
    }
}
