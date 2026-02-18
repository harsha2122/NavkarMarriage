@extends('admin.layouts.app')
@section('title', 'Add Form Field')
@section('page-title', 'Add Form Field')

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
                <h6 class="mb-0 fw-600">New Custom Field</h6>
            </div>
            <div class="card-body">

                @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
                </div>
                @endif

                <form method="POST" action="{{ route('admin.form-fields.store') }}">
                    @csrf

                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Label <span class="text-danger">*</span></label>
                            <input type="text" name="label" class="form-control @error('label') is-invalid @enderror"
                                value="{{ old('label') }}" placeholder="e.g. Education" required>
                            @error('label')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            <small class="text-muted">Shown to users on the form.</small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Field Name <span class="text-danger">*</span></label>
                            <input type="text" name="field_name" id="field_name"
                                class="form-control @error('field_name') is-invalid @enderror"
                                value="{{ old('field_name') }}" placeholder="e.g. education" required
                                pattern="[a-z0-9_]+" title="Lowercase letters, numbers and underscores only">
                            @error('field_name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            <small class="text-muted">Unique key, lowercase with underscores.</small>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Field Type <span class="text-danger">*</span></label>
                            <select name="field_type" id="field_type"
                                class="form-select @error('field_type') is-invalid @enderror"
                                onchange="toggleOptions()" required>
                                <option value="">Select type</option>
                                <option value="text"     {{ old('field_type') === 'text'     ? 'selected' : '' }}>Text</option>
                                <option value="select"   {{ old('field_type') === 'select'   ? 'selected' : '' }}>Dropdown (Select)</option>
                                <option value="number"   {{ old('field_type') === 'number'   ? 'selected' : '' }}>Number</option>
                                <option value="date"     {{ old('field_type') === 'date'     ? 'selected' : '' }}>Date</option>
                                <option value="textarea" {{ old('field_type') === 'textarea' ? 'selected' : '' }}>Textarea</option>
                            </select>
                            @error('field_type')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Sort Order</label>
                            <input type="number" name="sort_order" class="form-control"
                                value="{{ old('sort_order', 0) }}" min="0" max="999">
                            <small class="text-muted">Lower = shown first on form.</small>
                        </div>

                        {{-- Options (shown only for select type) --}}
                        <div class="col-12" id="options_wrap"
                             style="{{ old('field_type') === 'select' ? '' : 'display:none;' }}">
                            <label class="form-label">
                                Options <span class="text-danger">*</span>
                                <span class="text-muted fw-400 small">— one per line</span>
                            </label>
                            <textarea name="options_text" id="options_text" rows="6"
                                class="form-control @error('options_text') is-invalid @enderror"
                                placeholder="B.Com&#10;M.Com&#10;B.Tech&#10;MBA&#10;B.Sc&#10;Other">{{ old('options_text') }}</textarea>
                            @error('options_text')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            <small class="text-muted">Enter each option on a new line.</small>
                        </div>

                        <div class="col-md-6">
                            <div class="form-check form-switch mt-2">
                                <input class="form-check-input" type="checkbox" name="is_required"
                                       id="is_required" {{ old('is_required') ? 'checked' : '' }}>
                                <label class="form-check-label" for="is_required">
                                    Required field
                                </label>
                            </div>
                            <small class="text-muted d-block mt-1">User must fill this to submit form.</small>
                        </div>

                        <div class="col-md-6">
                            <div class="form-check form-switch mt-2">
                                <input class="form-check-input" type="checkbox" name="is_filter"
                                       id="is_filter" {{ old('is_filter') ? 'checked' : '' }}>
                                <label class="form-check-label" for="is_filter">
                                    Show in Browse Profiles filter
                                </label>
                            </div>
                            <small class="text-muted d-block mt-1">Adds this field to the sidebar filter.</small>
                        </div>
                    </div>

                    <hr>
                    <div class="d-flex justify-content-between">
                        <a href="{{ route('admin.form-fields.index') }}" class="btn btn-outline-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save me-1"></i>Create Field
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script>
// Auto-generate field_name from label
document.querySelector('[name="label"]').addEventListener('input', function () {
    const fn = document.getElementById('field_name');
    if (!fn.dataset.touched) {
        fn.value = this.value.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    }
});
document.getElementById('field_name').addEventListener('input', function () {
    this.dataset.touched = '1';
    this.value = this.value.toLowerCase().replace(/[^a-z0-9_]/g, '');
});

function toggleOptions() {
    const type = document.getElementById('field_type').value;
    const wrap = document.getElementById('options_wrap');
    wrap.style.display = type === 'select' ? '' : 'none';
    document.getElementById('options_text').required = type === 'select';
}
toggleOptions();
</script>
@endpush
