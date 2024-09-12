<?php

use App\Models\User;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstName', 15);
            $table->string('lastName', 10);
            $table->string('username', 15)->unique();
            $table->string('password', 100);
            $table->tinyInteger('gender');
            $table->date('dateOfBirth');
            $table->timestamp(User::CREATED_AT)->nullable();
            $table->timestamp(User::UPDATED_AT)->nullable();
        });

        Schema::create('gender', function (Blueprint $table) {
            $table->tinyInteger('id');
            $table->string('gender', 6);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('gender');
    }
};
