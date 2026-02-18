<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    private const KEYS = [
        'site_name', 'site_logo',
        'about_content', 'rules_content',
        'smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_name',
    ];

    public function index()
    {
        $settings = Setting::whereIn('key', self::KEYS)
            ->pluck('value', 'key')
            ->toArray();

        return view('admin.settings.index', compact('settings'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'site_name'     => 'nullable|string|max:100',
            'site_logo'     => 'nullable|image|mimes:jpg,jpeg,png,webp|max:1024',
            'about_content' => 'nullable|string',
            'rules_content' => 'nullable|string',
            'smtp_host'     => 'nullable|string|max:100',
            'smtp_port'     => 'nullable|integer',
            'smtp_user'     => 'nullable|email|max:150',
            'smtp_pass'     => 'nullable|string|max:200',
            'smtp_name'     => 'nullable|string|max:100',
        ]);

        // Handle logo upload
        if ($request->hasFile('site_logo')) {
            $file     = $request->file('site_logo');
            $filename = 'logo_' . time() . '.' . $file->getClientOriginalExtension();
            $destDir  = public_path('storage/images');
            if (!is_dir($destDir)) mkdir($destDir, 0755, true);
            $file->move($destDir, $filename);
            Setting::set('site_logo', $filename);
        }

        $textKeys = ['site_name', 'about_content', 'rules_content',
                     'smtp_host', 'smtp_port', 'smtp_user', 'smtp_name'];

        foreach ($textKeys as $key) {
            if ($request->has($key)) {
                Setting::set($key, $request->input($key, ''));
            }
        }

        // Only update password if a new one was typed
        if ($request->filled('smtp_pass')) {
            Setting::set('smtp_pass', $request->input('smtp_pass'));
        }

        return redirect()->route('admin.settings.index')
            ->with('success', 'Settings saved successfully.');
    }
}
