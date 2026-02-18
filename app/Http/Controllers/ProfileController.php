<?php

namespace App\Http\Controllers;

use App\Models\FormField;
use App\Models\Profile;
use App\Models\ProfileFieldValue;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        // Session-based shuffle seed (consistent per session)
        if (!session()->has('shuffle_seed')) {
            session(['shuffle_seed' => rand(1, 99999)]);
        }
        $seed = session('shuffle_seed');

        $query = Profile::active()->with('fieldValues.formField');

        // Gender filter
        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }

        // City filter
        if ($request->filled('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        // Dynamic field filters
        if ($request->has('field') && is_array($request->field)) {
            foreach ($request->field as $fieldName => $value) {
                if (!empty($value)) {
                    $query->whereHas('fieldValues', function ($q) use ($fieldName, $value) {
                        $q->whereHas('formField', fn($q2) => $q2->where('field_name', $fieldName))
                          ->where('value', 'like', '%' . $value . '%');
                    });
                }
            }
        }

        // Session-seeded shuffle via RAND(seed) — consistent for this session
        $profiles = $query->orderByRaw("RAND({$seed})")->paginate(12);

        $filterFields = FormField::where('is_filter', true)->ordered()->get();

        return view('profiles.index', compact('profiles', 'filterFields'));
    }

    public function show(Profile $profile)
    {
        if ($profile->status !== 'active') {
            abort(404);
        }

        $profile->load('fieldValues.formField');

        return view('profiles.show', compact('profile'));
    }
}
