<?php

namespace App\Http\Controllers;

use App\Models\FormField;
use App\Models\Profile;
use App\Models\ProfileFieldValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class EnrollController extends Controller
{
    public function create()
    {
        $formFields = FormField::ordered()->get();
        return view('enroll.create', compact('formFields'));
    }

    public function store(Request $request)
    {
        // ── Build dynamic field validation rules ──────────────────────────────
        $formFields  = FormField::ordered()->get();
        $fieldRules  = [];
        $fieldLabels = [];

        foreach ($formFields as $field) {
            $rules = $field->is_required ? ['required'] : ['nullable'];

            match ($field->field_type) {
                'number'   => array_push($rules, 'numeric'),
                'date'     => array_push($rules, 'date'),
                'select'   => array_push($rules, Rule::in($field->options ?? [])),
                default    => array_push($rules, 'string', 'max:500'),
            };

            $fieldRules["fields.{$field->field_name}"]  = $rules;
            $fieldLabels["fields.{$field->field_name}"] = $field->label;
        }

        // ── Validate all fixed + dynamic fields ───────────────────────────────
        $validated = $request->validate(
            array_merge([
                'name'     => 'required|string|max:150',
                'whatsapp' => [
                    'required',
                    'digits:10',
                    Rule::unique('profiles', 'whatsapp'),
                ],
                'gender'   => 'required|in:male,female',
                'dob'      => [
                    'required',
                    'date',
                    'before:' . now()->subYears(18)->format('Y-m-d'),
                    'after:'  . now()->subYears(60)->format('Y-m-d'),
                ],
                'city'     => 'required|string|max:100',
                'photo'    => [
                    'required',
                    'image',
                    'mimes:jpg,jpeg,png,webp',
                    'max:1024',   // 1 MB = 1024 KB
                ],
            ], $fieldRules),
            [],
            array_merge([
                'name'     => 'Full Name',
                'whatsapp' => 'WhatsApp Number',
                'gender'   => 'Gender',
                'dob'      => 'Date of Birth',
                'city'     => 'City',
                'photo'    => 'Profile Photo',
            ], $fieldLabels)
        );

        // ── Save photo to public/storage/images/ ──────────────────────────────
        $photo    = $request->file('photo');
        $ext      = $photo->getClientOriginalExtension();
        $filename = 'img_' . time() . '_' . uniqid() . '.' . $ext;
        $destDir  = public_path('storage/images');

        if (!is_dir($destDir)) {
            mkdir($destDir, 0755, true);
        }

        $photo->move($destDir, $filename);

        // ── Save profile + field values in a transaction ──────────────────────
        DB::transaction(function () use ($validated, $filename, $formFields, $request) {
            $profile = Profile::create([
                'name'     => $validated['name'],
                'whatsapp' => $validated['whatsapp'],
                'gender'   => $validated['gender'],
                'dob'      => $validated['dob'],
                'city'     => $validated['city'],
                'photo'    => $filename,
                'status'   => 'pending',
            ]);

            $submittedFields = $request->input('fields', []);
            foreach ($formFields as $field) {
                $value = $submittedFields[$field->field_name] ?? null;
                if ($value !== null && $value !== '') {
                    ProfileFieldValue::create([
                        'profile_id'    => $profile->id,
                        'form_field_id' => $field->id,
                        'value'         => $value,
                    ]);
                }
            }
        });

        return redirect()->route('enroll.thankyou');
    }

    public function thankyou()
    {
        return view('enroll.thankyou');
    }
}
