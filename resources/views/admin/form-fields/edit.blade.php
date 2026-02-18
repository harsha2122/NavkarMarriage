@extends('admin.layouts.app')
@section('title', 'Edit Field — '.$field->label)
@section('page-title', 'Edit Form Field')

@section('content')

<div class="mb-3">
    <a href="{{ route('admin.form-fields.index') }}" class="btn btn-sm btn-outline-secondary">
        <i class="fas fa-arrow-left me-1"></i>Back to Fields
    </a>
</div>

<div class="row justify-content-center">
    <div class="col-md-7">
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white border-bottom">
                <h6 class="mb-0 fw-600">Edit: {{ $field->label }}</h6>
            </div>
            <div class="card-body">

                @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
                </div>
                @endif

                <form method="POST" action="{{ route('admin.form-fields.update', $field) }}">
                    @csrf @method('PUT')

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Label <span class="text-danger">*</span></label>
                            <input type="text" name="label" class="form-control @error('label') is-invalid @enderror"
                                value="{{ old('label', $field->label) }}" required>
                            @error('label')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Field Name</label>
                            <input type="text" class="form-control bg-light" value="{{ $field->field_name }}" readonly>
                            <small class="text-muted">Field name cannot be changed after creation.</small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Field Type</label>
                            <input type="text" class="form-control bg-light" value="{{ $field->field_type }}" readonly>
                            <small class="text-muted">Type cannot be changed after creation.</small>
                            <input type="hidden" name="field_type" value="{{ $field->field_type }}">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Sort Order</label>
                            <input type="number" name="sort_order" class="form-control"
                                value="{{ old('sort_order', $field->sort_order) }}" min="0" max="999">
                        </div>

                        @if($field->field_type === 'select')
                        <div class="col-12">
                            <label class="form-label">
                                Options <span class="text-danger">*</span>
                                <span class="text-muted fw-400 small">— one per line</span>
                            </label>
                            <textarea name="options_text" rows="8"
                                class="form-control @error('options_text') is-invalid @enderror"
                                required>{{ old('options_text', $field->options ? implode("\n", $field->options) : '') }}</textarea>
                            @error('options_text')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>
                        @endif

                        <div class="col-md-6">
                            <div class="form-check form-switch mt-2">
                                <input class="form-check-input" type="checkbox" name="is_required"
                                       id="is_required" {{ old('is_required', $field->is_required) ? 'checked' : '' }}>
                                <label class="form-check-label" for="is_required">Required field</label>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-check form-switch mt-2">
                                <input class="form-check-input" type="checkbox" name="is_filter"
                                       id="is_filter" {{ old('is_filter', $field->is_filter) ? 'checked' : '' }}>
                                <label class="form-check-label" for="is_filter">Show in Browse Profiles filter</label>
                            </div>
                        </div>
                    </div>

                    <hr>
                    <div class="d-flex justify-content-between">
                        <a href="{{ route('admin.form-fields.index') }}" class="btn btn-outline-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-1"></i>Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
