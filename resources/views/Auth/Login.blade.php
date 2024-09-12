@extends('Layout.Layout')
@section('title', 'Login')
@include('Messages.SuccessMessage')
@include('Messages.ErrorMessage')
@section('content')
    <div class="h-screen w-screen flex justify-center items-center bg-gray-50 overflow-hidden">
        <div class="h-fit w-3/12 bg-white p-7 rounded-lg shadow space-y-4">
            <h1 class="text-2xl text-[rgb(237,145,33)] font-bold">Login an account.</h1>
            <form action="{{route('submitLogin')}}" method="POST">
                @csrf
                <div class="grid grid-cols-2 gap-5">
                    <div class="grid col-span-2 gap-y-2">
                        <h1 class="text-md">Username</h1>
                        <input name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="Username" value="{{old('username')}}">
                        @error('username')
                            <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
                    <div class="grid col-span-2 gap-y-2">
                        <h1 class="text-md">Password</h1>
                        <input name="password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="Password">
                        @error('password')
                            <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {{$message}}
                            </div>
                        @enderror
                    </div>
                    <div class="grid col-span-2">
                        <button class="bg-[#ED9121] p-2 font-semibold text-white rounded-lg">Login</button>
                    </div>
                    <div class="grid col-span-2 text-center">
                        <h1 class="font-medium">Already have an account? <a href="{{route('register')}}" class="text-[#ED9121] font-bold hover:underline">Register here.</a></h1>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection