<div class="mt-4 mb-4">
    <h1 class="text-2xl text-[#ED9121] font-bold">All Games</h1>
    <div class="grid grid-cols-5 gap-3 mt-3">
        @foreach ($all as $games)
            <a href={{$games->url}} target="_blank" class="grid col-span-1 bg-gray-50 shadow rounded-xl hover:bg-[#ED9121] hover:text-white relative">
                <img src="{{asset('images/'. $games->image)}}" alt="" class="rounded-t-xl relative">
                <h1 class="text-md font-semibold py-2 px-3">{{$games->name}}</h1>
                @if ($games->isNew == true)
                        <h1 class="bg-[#F01E2C] text-white absolute py-1 px-2 font-semibold rounded-bl-xl rounded-tr-lg right-0">New!</h1>
                @endif
            </a>
        @endforeach
    </div>
</div>