<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Profile;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total'    => Profile::count(),
            'pending'  => Profile::where('status', 'pending')->count(),
            'active'   => Profile::where('status', 'active')->count(),
            'rejected' => Profile::where('status', 'rejected')->count(),
            'featured' => Profile::where('is_featured', true)->count(),
            'brides'   => Profile::where('gender', 'female')->count(),
            'grooms'   => Profile::where('gender', 'male')->count(),
            'messages' => ContactMessage::count(),
        ];

        $recentProfiles = Profile::latest()->take(5)->get();

        return view('admin.dashboard', compact('stats', 'recentProfiles'));
    }
}
