@extends('admin.layouts.app')
@section('title', 'Edit Profile — '.$profile->name)
@section('page-title', 'Edit Profile')

@section('content')

<div class="mb-3">
    <a href="{{ route('admin.profiles.index') }}" class="btn btn-sm btn-outline-secondary">
        <i class="fas fa-arrow-left me-1"></i>Back to Profiles
    </a>
</div>

@if($errors->any())
<div class="alert alert-danger">
    <ul class="mb-0">
        @foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach
    </ul>
</div>
@endif

<form method="POST" action="{{ route('admin.profiles.update', $profile) }}" enctype="multipart/form-data">
    @csrf @method('PUT')

    <div class="row g-4">

        {{-- ── Left: Photo & Status ── --}}
        <div class="col-md-3">
            <div class="card border-0 shadow-sm">
                <div class="card-body text-center">
                    @if($profile->photo)
                        <img src="{{ asset('storage/images/'.$profile->photo) }}"
                             id="photo_preview" class="img-fluid rounded mb-3"
                             style="max-height:220px; object-fit:cover; width:100%; border:2px solid #e0c4a8;">
                    @else
                        <img src="{{ asset('assets/frontend/img/download.png') }}"
                             id="photo_preview" class="img-fluid rounded mb-3"
                             style="max-height:220px; object-fit:cover; width:100%; border:2px solid #e0c4a8;">
                    @endif

                    <label class="form-label small">Change Photo (max 1 MB)</label>
                    <input type="file" name="photo" id="photo_input"
                        class="form-control form-control-sm @error('photo') is-invalid @enderror"
                        accept="image/jpeg,image/png,image/jpg,image/webp">
                    @error('photo')<div class="invalid-feedback">{{ $message }}</div>@enderror

                    <hr>

                    <label class="form-label small fw-500">Status</label>
                    <select name="status" class="form-select form-select-sm mb-2">
                        <option value="pending"  {{ $profile->status === 'pending'  ? 'selected' : '' }}>Pending</option>
                        <option value="active"   {{ $profile->status === 'active'   ? 'selected' : '' }}>Active</option>
                        <option value="rejected" {{ $profile->status === 'rejected' ? 'selected' : '' }}>Rejected</option>
                    </select>

                    <div class="form-check form-switch text-start">
                        <input class="form-check-input" type="checkbox" name="is_featured"
                               id="is_featured" {{ $profile->is_featured ? 'checked' : '' }}>
                        <label class="form-check-label small" for="is_featured">Featured on Homepage</label>
                    </div>

                    <div class="mt-3">
                        <label class="form-label small">Admin Note</label>
                        <textarea name="admin_note" class="form-control form-control-sm" rows="3"
                            placeholder="Internal note (not visible to user)">{{ $profile->admin_note }}</textarea>
                    </div>
                </div>
            </div>
        </div>

        {{-- ── Right: Profile Fields ── --}}
        <div class="col-md-9">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white border-bottom">
                    <h6 class="mb-0 fw-600">Profile Details</h6>
                </div>
                <div class="card-body">
                    <div class="row g-3">

                        {{-- Fixed Fields --}}
                        <div class="col-md-6">
                            <label class="form-label">Full Name <span class="text-danger">*</span></label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                value="{{ old('name', $profile->name) }}" required>
                            @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">WhatsApp Number <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fab fa-whatsapp text-success"></i> +91</span>
                                <input type="tel" name="whatsapp" class="form-control @error('whatsapp') is-invalid @enderror"
                                    value="{{ old('whatsapp', $profile->whatsapp) }}" maxlength="10" required>
                                @error('whatsapp')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Gender <span class="text-danger">*</span></label>
                            <select name="gender" class="form-select @error('gender') is-invalid @enderror" required>
                                <option value="female" {{ old('gender', $profile->gender) === 'female' ? 'selected' : '' }}>Bride (Female)</option>
                                <option value="male"   {{ old('gender', $profile->gender) === 'male'   ? 'selected' : '' }}>Groom (Male)</option>
                            </select>
                            @error('gender')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Date of Birth</label>
                            <input type="date" name="dob" class="form-control @error('dob') is-invalid @enderror"
                                value="{{ old('dob', $profile->dob?->format('Y-m-d')) }}">
                            @error('dob')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">City</label>
                            <input type="text" name="city" class="form-control @error('city') is-invalid @enderror"
                                value="{{ old('city', $profile->city) }}" placeholder="City">
                            @error('city')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        {{-- Dynamic Fields --}}
                        @if($formFields->count() > 0)
                        <div class="col-12"><hr><h6 class="text-muted small text-uppercase">Additional Fields</h6></div>
                        @foreach($formFields as $field)
                        <div class="col-md-6">
                            <label class="form-label small">{{ $field->label }}</label>
                            @php
                                $currentVal = old('fields.'.$field->field_name,
                                    $profile->fieldValues->firstWhere('form_field_id', $field->id)?->value);
                            @endphp

                            @if($field->field_type === 'select' && $field->options)
                                <select name="fields[{{ $field->field_name }}]" class="form-select form-select-sm">
                                    <option value="">— Select —</option>
                                    @foreach($field->options as $opt)
                                        <option value="{{ $opt }}" {{ $currentVal === $opt ? 'selected' : '' }}>{{ $opt }}</option>
                                    @endforeach
                                </select>
                            @elseif($field->field_type === 'textarea')
                                <textarea name="fields[{{ $field->field_name }}]" class="form-control form-control-sm" rows="2">{{ $currentVal }}</textarea>
                            @elseif($field->field_type === 'date')
                                <input type="date" name="fields[{{ $field->field_name }}]" class="form-control form-control-sm" value="{{ $currentVal }}">
                            @elseif($field->field_type === 'number')
                                <input type="number" name="fields[{{ $field->field_name }}]" class="form-control form-control-sm" value="{{ $currentVal }}">
                            @else
                                <input type="text" name="fields[{{ $field->field_name }}]" class="form-control form-control-sm" value="{{ $currentVal }}">
                            @endif
                        </div>
                        @endforeach
                        @endif

                    </div>
                </div>
                <div class="card-footer bg-white border-top d-flex justify-content-between">
                    <a href="{{ route('admin.profiles.index') }}" class="btn btn-outline-secondary">Cancel</a>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save me-1"></i>Save Changes
                    </button>
                </div>
            </div>
        </div>

    </div>
</form>

@endsection

@push('scripts')
<script>
document.getElementById('photo_input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
        alert('Photo must be less than 1 MB.');
        this.value = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = e => document.getElementById('photo_preview').src = e.target.result;
    reader.readAsDataURL(file);
});
</script>
@endpush
