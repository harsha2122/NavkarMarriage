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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('whatsapp', 20)->unique();
            $table->enum('gender', ['male', 'female']);
            $table->date('dob')->nullable();
            $table->string('city')->nullable();
            $table->string('photo')->nullable();         // stored filename in storage/images/
            $table->enum('status', ['pending', 'active', 'rejected'])->default('pending');
            $table->boolean('is_featured')->default(false);
            $table->text('admin_note')->nullable();      // internal note for rejected reason
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
