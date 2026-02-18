<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormField;
use App\Models\ProfileFieldValue;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class FormFieldController extends Controller
{
    public function index()
    {
        $fields = FormField::ordered()->get();
        return view('admin.form-fields.index', compact('fields'));
    }

    public function create()
    {
        return view('admin.form-fields.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'label'       => 'required|string|max:100',
            'field_name'  => [
                'required', 'string', 'max:60',
                'regex:/^[a-z0-9_]+$/',
                Rule::unique('form_fields', 'field_name'),
            ],
            'field_type'  => 'required|in:text,select,number,date,textarea',
            'options_text'=> 'required_if:field_type,select|nullable|string',
            'sort_order'  => 'nullable|integer|min:0|max:999',
            'is_required' => 'boolean',
            'is_filter'   => 'boolean',
        ]);

        $options = null;
        if ($validated['field_type'] === 'select' && !empty($validated['options_text'])) {
            $options = array_values(array_filter(
                array_map('trim', explode("\n", $validated['options_text']))
            ));
        }

        FormField::create([
            'label'      => $validated['label'],
            'field_name' => $validated['field_name'],
            'field_type' => $validated['field_type'],
            'options'    => $options,
            'is_required'=> $request->boolean('is_required'),
            'is_filter'  => $request->boolean('is_filter'),
            'sort_order' => $validated['sort_order'] ?? 0,
        ]);

        return redirect()->route('admin.form-fields.index')
            ->with('success', "Field '{$validated['label']}' created successfully.");
    }

    public function edit(FormField $formField)
    {
        return view('admin.form-fields.edit', ['field' => $formField]);
    }

    public function update(Request $request, FormField $formField)
    {
        $validated = $request->validate([
            'label'       => 'required|string|max:100',
            'options_text'=> 'required_if:field_type,select|nullable|string',
            'sort_order'  => 'nullable|integer|min:0|max:999',
            'is_required' => 'boolean',
            'is_filter'   => 'boolean',
        ]);

        $options = $formField->options; // keep existing by default
        if ($formField->field_type === 'select' && !empty($validated['options_text'])) {
            $options = array_values(array_filter(
                array_map('trim', explode("\n", $validated['options_text']))
            ));
        }

        $formField->update([
            'label'      => $validated['label'],
            'options'    => $options,
            'is_required'=> $request->boolean('is_required'),
            'is_filter'  => $request->boolean('is_filter'),
            'sort_order' => $validated['sort_order'] ?? $formField->sort_order,
        ]);

        return redirect()->route('admin.form-fields.index')
            ->with('success', "Field '{$formField->label}' updated.");
    }

    public function destroy(FormField $formField)
    {
        // Delete all stored values for this field across all profiles
        ProfileFieldValue::where('form_field_id', $formField->id)->delete();
        $label = $formField->label;
        $formField->delete();

        return redirect()->route('admin.form-fields.index')
            ->with('success', "Field '{$label}' and all its values have been deleted.");
    }

    // Route resource requires a show — redirect to edit
    public function show(FormField $formField)
    {
        return redirect()->route('admin.form-fields.edit', $formField);
    }
}
