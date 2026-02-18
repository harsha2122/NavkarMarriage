<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormField;
use App\Models\Profile;
use App\Models\ProfileFieldValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AdminProfileController extends Controller
{
    public function index(Request $request)
    {
        $query = Profile::latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('gender')) {
            $query->where('gender', $request->gender);
        }
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%'.$request->search.'%')
                  ->orWhere('whatsapp', 'like', '%'.$request->search.'%');
            });
        }

        $profiles = $query->paginate(20);
        return view('admin.profiles.index', compact('profiles'));
    }

    public function pending()
    {
        $profiles = Profile::where('status', 'pending')
            ->with('fieldValues.formField')
            ->latest()
            ->get();

        return view('admin.profiles.pending', compact('profiles'));
    }

    public function edit(Profile $profile)
    {
        $profile->load('fieldValues.formField');
        $formFields = FormField::ordered()->get();
        return view('admin.profiles.edit', compact('profile', 'formFields'));
    }

    public function update(Request $request, Profile $profile)
    {
        $validated = $request->validate([
            'name'     => 'required|string|max:150',
            'whatsapp' => [
                'required', 'digits:10',
                Rule::unique('profiles', 'whatsapp')->ignore($profile->id),
            ],
            'gender'   => 'required|in:male,female',
            'dob'      => 'nullable|date',
            'city'     => 'nullable|string|max:100',
            'status'   => 'required|in:pending,active,rejected',
            'photo'    => 'nullable|image|mimes:jpg,jpeg,png,webp|max:1024',
            'admin_note' => 'nullable|string|max:500',
        ]);

        // Handle photo replacement
        if ($request->hasFile('photo')) {
            $photo    = $request->file('photo');
            $ext      = $photo->getClientOriginalExtension();
            $filename = 'img_' . time() . '_' . uniqid() . '.' . $ext;
            $destDir  = public_path('storage/images');
            if (!is_dir($destDir)) mkdir($destDir, 0755, true);

            // Delete old photo if it exists
            if ($profile->photo && file_exists(public_path('storage/images/'.$profile->photo))) {
                @unlink(public_path('storage/images/'.$profile->photo));
            }
            $photo->move($destDir, $filename);
            $validated['photo'] = $filename;
        }

        DB::transaction(function () use ($request, $profile, $validated) {
            $profile->update([
                'name'       => $validated['name'],
                'whatsapp'   => $validated['whatsapp'],
                'gender'     => $validated['gender'],
                'dob'        => $validated['dob'] ?? null,
                'city'       => $validated['city'] ?? null,
                'status'     => $validated['status'],
                'is_featured'=> $request->boolean('is_featured'),
                'admin_note' => $validated['admin_note'] ?? null,
                'photo'      => $validated['photo'] ?? $profile->photo,
            ]);

            // Update dynamic field values
            $formFields = FormField::all()->keyBy('field_name');
            $submittedFields = $request->input('fields', []);

            foreach ($formFields as $fieldName => $field) {
                $value = $submittedFields[$fieldName] ?? null;
                if ($value !== null && $value !== '') {
                    ProfileFieldValue::updateOrCreate(
                        ['profile_id' => $profile->id, 'form_field_id' => $field->id],
                        ['value' => $value]
                    );
                } else {
                    ProfileFieldValue::where('profile_id', $profile->id)
                        ->where('form_field_id', $field->id)
                        ->delete();
                }
            }
        });

        return redirect()->route('admin.profiles.index')
            ->with('success', "Profile '{$profile->name}' updated successfully.");
    }

    public function destroy(Profile $profile)
    {
        // Delete photo file
        if ($profile->photo && file_exists(public_path('storage/images/'.$profile->photo))) {
            @unlink(public_path('storage/images/'.$profile->photo));
        }
        $profile->delete();

        return redirect()->route('admin.profiles.index')
            ->with('success', "Profile deleted successfully.");
    }

    public function approve(Profile $profile)
    {
        $profile->update(['status' => 'active', 'admin_note' => null]);
        return back()->with('success', "'{$profile->name}' approved and is now live.");
    }

    public function reject(Request $request, Profile $profile)
    {
        $profile->update([
            'status'     => 'rejected',
            'admin_note' => $request->input('admin_note'),
        ]);
        return back()->with('success', "'{$profile->name}' has been rejected.");
    }

    public function toggleFeatured(Profile $profile)
    {
        $profile->update(['is_featured' => !$profile->is_featured]);
        return back()->with('success', $profile->is_featured
            ? "'{$profile->name}' marked as featured."
            : "'{$profile->name}' removed from featured.");
    }

    public function toggleStatus(Profile $profile)
    {
        $newStatus = $profile->status === 'active' ? 'rejected' : 'active';
        $profile->update(['status' => $newStatus]);
        return back()->with('success', "Profile status changed to {$newStatus}.");
    }
}
