<?php

namespace App\Http\Controllers;

use App\Models\Profile;

class HomeController extends Controller
{
    public function index()
    {
        $featuredBrides = Profile::active()->featured()
            ->where('gender', 'female')
            ->whereNotNull('photo')
            ->latest()
            ->take(6)
            ->get();

        $featuredGrooms = Profile::active()->featured()
            ->where('gender', 'male')
            ->whereNotNull('photo')
            ->latest()
            ->take(6)
            ->get();

        return view('home', compact('featuredBrides', 'featuredGrooms'));
    }
}
