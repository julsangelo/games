<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->primary();
            $table->string('name', 40);
            $table->string('image', 20);
            $table->integer('rank')->nullable(true);
            $table->date('creationDate');
            $table->boolean('isNew')->nullable(true);
            $table->string('url', 100);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
