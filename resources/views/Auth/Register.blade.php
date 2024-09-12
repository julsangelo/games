@extends('Layout.Layout')
@section('title', 'Register')
@section('content')
    <div class="h-screen w-screen flex justify-center items-center bg-gray-50 overflow-hidden">
        <div class="h-fit w-4/12 bg-white p-7 rounded-lg shadow space-y-4">
            <h1 class="text-2xl text-[#ED9121] font-bold">Register an account.</h1>
            <form action="{{route('submitRegister')}}" method="POST">
                @csrf
                <div class="grid grid-cols-2 gap-x-5 gap-y-2">
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">First name</h1>
                        <input name="firstName" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="First name" value="{{old('firstName')}}">
                    </div>
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">Last name</h1>
                        <input name="lastName" type="text" class="block bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="Last name" value="{{old('lastName')}}">
                    </div>
                    <div class="grid col-span-2 grid-cols-2 gap-x-5">
                        <div class="gird col-span-1">
                            @error('firstName')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                        <div class="gird col-span-1">
                            @error('lastName')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                    </div>
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">Gender</h1>
                        <select name="gender" id="" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-2 focus:outline-[#ED9121]" value="{{old('gender')}}">
                            <option selected="true" class="text-gray-50" disabled>Select gender</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                    </div>
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">Birthday</h1>
                        <input name="dateOfBirth" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" value="{{old('dateOfBirth')}}">
                        
                    </div>
                    <div class="grid col-span-2 grid-cols-2 gap-x-5">
                        <div class="gird col-span-1">
                            @error('gender')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                        <div class="gird col-span-1">
                            @error('dateOfBirth')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                    </div>
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">Username</h1>
                        <input name="username" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="Username" value="{{old('username')}}">
                    </div>
                    <div class="grid col-span-1 gap-y-2">
                        <h1 class="text-md">Password</h1>
                        <input name="password" type="password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg py-2 px-3 focus:outline-[#ED9121]" placeholder="Password" value="{{old('password')}}">
                    </div>
                    <div class="grid col-span-2 grid-cols-2 gap-x-5">
                        <div class="gird col-span-1">
                            @error('username')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                        <div class="gird col-span-1">
                            @error('password')
                                <div class="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {{$message}}
                                </div>
                            @enderror
                        </div>
                    </div>
                    <div class="grid col-span-2 mt-2">
                        <button class="bg-[#ED9121] p-2 font-semibold text-white rounded-lg">Register</button>
                    </div>
                    <div class="grid col-span-2 text-center mt-2">
                        <h1 class="font-medium">Already have an account? <a href="{{route('login')}}" class="text-[#ED9121] font-bold hover:underline">Login here.</a></h1>
                    </div>
                </div>
            </form>
        </div>
    </div>
@endsection