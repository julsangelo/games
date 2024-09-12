@extends('Layout.Layout')
@section('title', 'Get Games')
@include('Messages.SuccessMessage')
@section('content')
    <div class="px-80 py-5 flex justify-between">
        <form action="{{route('getGames')}}" method="GET">
            <input name="gameName" type="text" placeholder="Search game" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" value="{{old('gameName')}}"> 
        </form>
        <form action="{{route('submitLogout')}}" method="POST">
            @csrf
            <button class="text-lg text-[#ED9121] py-2 px-3 rounded-lg font-bold border-2 border-[#ED9121]">Logout</button>
        </form>
    </div>
    <div class="px-80">
        <hr>
        @if($isSearch == true)
            <div class="mt-4 mb-4">
                <h1 class="text-2xl text-[#ED9121] font-bold">Search</h1>
                <div class="grid grid-cols-5 gap-3 mt-3">
                    @foreach ($search as $game)
                        <a href={{route('recentlyClicked', $game->id)}} id="game" target="_blank" class="grid col-span-1 bg-gray-50 shadow rounded-xl hover:bg-[#ED9121] hover:text-white relative">
                            <img src="{{asset('images/'. $game->image)}}" alt="" class="rounded-t-xl relative">
                            <h1 class="text-md font-semibold py-2 px-3">{{$game->name}}</h1>
                            @if ($game->isNew == true)
                                    <h1 class="bg-[#F01E2C] text-white absolute py-1 px-2 font-semibold rounded-bl-xl rounded-tr-lg right-0">New!</h1>
                            @endif
                        </a>
                    @endforeach
                </div>
            </div>
        @endif
        @if($isSearch == false)
            @include('Shared.Games.RecentGames')
            <hr>
            @include('Shared.Games.TopGames')
            <hr>
            @include('Shared.Games.AllGames')
        @endif
    </div>
@endsection