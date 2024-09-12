<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Support\Facades\DB;

class DatabaseController extends Controller
{
    public function showDatabase() {
        try {
            $connection = DB::connection("mysql")->getPdo();
            $databaseName = DB::connection("")->getDatabaseName();
            $connectionResult = "Connected to database " . $databaseName . ".";
        } catch (Exception $e) {
            $connectionResult = "Not connected to database.";
        }
        
        return view("Database.Database", ["connection"=> $connectionResult]);
    }
}
