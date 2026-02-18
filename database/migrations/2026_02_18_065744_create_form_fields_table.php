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
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->string('label');                     // Display label: "Education"
            $table->string('field_name')->unique();      // DB key: "education"
            $table->enum('field_type', ['text', 'select', 'date', 'number', 'textarea']);
            $table->json('options')->nullable();         // For select: ["B.Com","M.Com","B.Tech"]
            $table->boolean('is_required')->default(false);
            $table->boolean('is_filter')->default(false); // Show in browse page filter sidebar
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_fields');
    }
};
