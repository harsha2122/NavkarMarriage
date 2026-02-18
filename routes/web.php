<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EnrollController;
use App\Http\Controllers\Admin\AdminAuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\FormFieldController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\ContactMessageController;
use Illuminate\Support\Facades\Route;

// ─── Frontend ────────────────────────────────────────────────────────────────

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/rules', [PageController::class, 'rules'])->name('rules');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('/profiles', [ProfileController::class, 'index'])->name('profiles');
Route::get('/profiles/{profile}', [ProfileController::class, 'show'])->name('profiles.show');

// Enrollment (Phase 3)
Route::get('/enroll', [EnrollController::class, 'create'])->name('enroll');
Route::post('/enroll', [EnrollController::class, 'store'])->name('enroll.store');
Route::get('/enroll/thankyou', [EnrollController::class, 'thankyou'])->name('enroll.thankyou');

// ─── Admin ───────────────────────────────────────────────────────────────────

Route::prefix('admin')->name('admin.')->group(function () {

    // Auth
    Route::get('/login', [AdminAuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AdminAuthController::class, 'login'])->name('login.post');
    Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

    // Protected admin routes
    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Profiles
        Route::get('/profiles', [AdminProfileController::class, 'index'])->name('profiles.index');
        Route::get('/profiles/pending', [AdminProfileController::class, 'pending'])->name('profiles.pending');
        Route::get('/profiles/{profile}/edit', [AdminProfileController::class, 'edit'])->name('profiles.edit');
        Route::put('/profiles/{profile}', [AdminProfileController::class, 'update'])->name('profiles.update');
        Route::delete('/profiles/{profile}', [AdminProfileController::class, 'destroy'])->name('profiles.destroy');
        Route::patch('/profiles/{profile}/approve', [AdminProfileController::class, 'approve'])->name('profiles.approve');
        Route::patch('/profiles/{profile}/reject', [AdminProfileController::class, 'reject'])->name('profiles.reject');
        Route::patch('/profiles/{profile}/toggle-featured', [AdminProfileController::class, 'toggleFeatured'])->name('profiles.toggleFeatured');
        Route::patch('/profiles/{profile}/toggle-status', [AdminProfileController::class, 'toggleStatus'])->name('profiles.toggleStatus');

        // Form Fields
        Route::resource('form-fields', FormFieldController::class);

        // Settings
        Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
        Route::put('/settings', [SettingsController::class, 'update'])->name('settings.update');

        // Contact Messages
        Route::get('/messages', [ContactMessageController::class, 'index'])->name('messages.index');
        Route::get('/messages/{message}', [ContactMessageController::class, 'show'])->name('messages.show');
        Route::post('/messages/{message}/reply', [ContactMessageController::class, 'reply'])->name('messages.reply');
    });
});
