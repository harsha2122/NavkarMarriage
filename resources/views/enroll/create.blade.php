@extends('layouts.app')

@section('title', 'Register Free - Navkar Marriage Bureau')
@section('meta_description', 'Register your profile for free on Navkar Marriage Bureau. Find your perfect Jain life partner today.')

@section('content')

<section>
    <div class="container log">
        <div class="row justify-content-center">
            <div class="col-md-8 register-form shadow">

                <div class="row">
                    <div class="col-md-12 title mb-4">
                        <p class="d-none d-sm-block">Navkar Marriage Bureau Registration</p>
                        <h3 class="pb-2">Create Your Free Profile</h3>
                        <p class="text-muted small">Fill in your details below. Your profile will be reviewed and activated by our team.</p>
                    </div>
                </div>

                {{-- Validation Errors Summary --}}
                @if($errors->any())
                    <div class="alert alert-danger alert-dismissible fade show mx-3" role="alert">
                        <strong>Please fix the following errors:</strong>
                        <ul class="mb-0 mt-1">
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <form id="enroll_form" method="POST" action="{{ route('enroll.store') }}" enctype="multipart/form-data" novalidate>
                    @csrf

                    <div class="row justify-content-center px-3">

                        {{-- ── FIXED FIELDS ─────────────────────────────── --}}

                        {{-- Full Name --}}
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Full Name <span class="text-danger">*</span></label>
                            <input type="text" name="name"
                                class="form-control @error('name') is-invalid @enderror"
                                value="{{ old('name') }}"
                                placeholder="Enter your full name" required>
                            @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        {{-- WhatsApp Number --}}
                        <div class="col-md-6 mb-3">
                            <label class="form-label">WhatsApp Number <span class="text-danger">*</span></label>
                            <div class="input-group">
                                <span class="input-group-text"><i class="fab fa-whatsapp text-success"></i> +91</span>
                                <input type="tel" name="whatsapp"
                                    class="form-control @error('whatsapp') is-invalid @enderror"
                                    value="{{ old('whatsapp') }}"
                                    placeholder="10-digit number" maxlength="10" pattern="[0-9]{10}" required>
                                @error('whatsapp')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                            <small class="text-muted">This will be used by interested profiles to contact you.</small>
                        </div>

                        {{-- Gender --}}
                        <div class="col-md-6 mb-3">
                            <label class="form-label">I am a <span class="text-danger">*</span></label>
                            <select name="gender" class="form-select @error('gender') is-invalid @enderror" required>
                                <option value="" disabled {{ old('gender') ? '' : 'selected' }}>Select gender</option>
                                <option value="female" {{ old('gender') === 'female' ? 'selected' : '' }}>Bride (Female)</option>
                                <option value="male"   {{ old('gender') === 'male'   ? 'selected' : '' }}>Groom (Male)</option>
                            </select>
                            @error('gender')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        {{-- Date of Birth --}}
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Date of Birth <span class="text-danger">*</span></label>
                            <input type="date" name="dob"
                                class="form-control @error('dob') is-invalid @enderror"
                                value="{{ old('dob') }}"
                                min="{{ now()->subYears(60)->format('Y-m-d') }}"
                                max="{{ now()->subYears(18)->format('Y-m-d') }}" required>
                            @error('dob')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        {{-- City --}}
                        <div class="col-md-6 mb-3">
                            <label class="form-label">City <span class="text-danger">*</span></label>
                            <input type="text" name="city"
                                class="form-control @error('city') is-invalid @enderror"
                                value="{{ old('city') }}"
                                placeholder="Enter your city" required>
                            @error('city')<div class="invalid-feedback">{{ $message }}</div>@enderror
                        </div>

                        {{-- Profile Photo --}}
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Profile Photo <span class="text-danger">*</span></label>
                            <input type="file" name="photo" id="photo_input"
                                class="form-control @error('photo') is-invalid @enderror"
                                accept="image/jpeg,image/png,image/jpg,image/webp" required>
                            @error('photo')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            <small class="text-muted">JPG, PNG or WEBP. Maximum size: 1 MB.</small>

                            {{-- Live preview --}}
                            <div id="photo_preview_wrap" class="mt-2 d-none">
                                <img id="photo_preview" src="" alt="Preview"
                                    style="max-height:180px; border-radius:8px; border:2px solid #e0c4a8;">
                            </div>
                        </div>

                        {{-- ── DYNAMIC FIELDS from form_fields table ──────── --}}
                        @if($formFields->count() > 0)
                            <div class="col-md-12">
                                <hr>
                            </div>

                            @foreach($formFields as $field)
                            <div class="col-md-6 mb-3">
                                <label class="form-label">
                                    {{ $field->label }}
                                    @if($field->is_required) <span class="text-danger">*</span> @endif
                                </label>

                                @if($field->field_type === 'select' && $field->options)
                                    <select name="fields[{{ $field->field_name }}]"
                                        class="form-select @error('fields.'.$field->field_name) is-invalid @enderror"
                                        {{ $field->is_required ? 'required' : '' }}>
                                        <option value="">Select {{ $field->label }}</option>
                                        @foreach($field->options as $opt)
                                            <option value="{{ $opt }}"
                                                {{ old('fields.'.$field->field_name) === $opt ? 'selected' : '' }}>
                                                {{ $opt }}
                                            </option>
                                        @endforeach
                                    </select>

                                @elseif($field->field_type === 'textarea')
                                    <textarea name="fields[{{ $field->field_name }}]" rows="3"
                                        class="form-control @error('fields.'.$field->field_name) is-invalid @enderror"
                                        placeholder="{{ $field->label }}"
                                        {{ $field->is_required ? 'required' : '' }}>{{ old('fields.'.$field->field_name) }}</textarea>

                                @elseif($field->field_type === 'date')
                                    <input type="date" name="fields[{{ $field->field_name }}]"
                                        class="form-control @error('fields.'.$field->field_name) is-invalid @enderror"
                                        value="{{ old('fields.'.$field->field_name) }}"
                                        {{ $field->is_required ? 'required' : '' }}>

                                @elseif($field->field_type === 'number')
                                    <input type="number" name="fields[{{ $field->field_name }}]"
                                        class="form-control @error('fields.'.$field->field_name) is-invalid @enderror"
                                        value="{{ old('fields.'.$field->field_name) }}"
                                        placeholder="{{ $field->label }}"
                                        {{ $field->is_required ? 'required' : '' }}>

                                @else {{-- text --}}
                                    <input type="text" name="fields[{{ $field->field_name }}]"
                                        class="form-control @error('fields.'.$field->field_name) is-invalid @enderror"
                                        value="{{ old('fields.'.$field->field_name) }}"
                                        placeholder="{{ $field->label }}"
                                        {{ $field->is_required ? 'required' : '' }}>
                                @endif

                                @error('fields.'.$field->field_name)
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>
                            @endforeach
                        @endif

                        {{-- ── CONSENT & SUBMIT ────────────────────────── --}}
                        <div class="col-md-12 mt-3 mb-2">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" id="consent" required>
                                <label class="form-check-label" for="consent">
                                    I agree that the information provided is accurate and I accept the
                                    <a href="{{ route('rules') }}" target="_blank">Rules &amp; Guidelines</a>
                                    of Navkar Marriage Bureau.
                                </label>
                            </div>
                        </div>

                        <div class="col-md-12 text-center mb-4 mt-2">
                            <button type="submit" class="btn btn-primary w-50" id="submit_btn">
                                <span id="btn_text">Submit Profile</span>
                                <span id="btn_loader" class="d-none">
                                    <span class="spinner-border spinner-border-sm me-1"></span> Submitting...
                                </span>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

<section>
    <div class="container">
        <div class="pink-img shadow">
            <div class="row justify-content-center">
                <div class="col-md-5 text-right">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-Happy-Jain-Bride-and-Jain-Groom.png') }}"
                        class="w-100 border-radius" alt="Happy Jain Bride and Groom">
                </div>
                <div class="col-md-7 title2 text-white">
                    <h2>Begin Your Journey with Navkar Marriage Bureau</h2>
                    <p>Register for free and let us help you find your perfect Jain life partner. Every profile is reviewed by our team to ensure a safe and trusted experience for everyone.</p>
                    <a href="{{ route('profiles') }}" class="btn btn-secondary">Browse Profiles</a>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection

@push('scripts')
<script>
// Live photo preview
document.getElementById('photo_input').addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
        alert('Photo must be less than 1 MB. Please choose a smaller image.');
        this.value = '';
        document.getElementById('photo_preview_wrap').classList.add('d-none');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('photo_preview').src = e.target.result;
        document.getElementById('photo_preview_wrap').classList.remove('d-none');
    };
    reader.readAsDataURL(file);
});

// Spinner on submit
document.getElementById('enroll_form').addEventListener('submit', function () {
    document.getElementById('btn_text').classList.add('d-none');
    document.getElementById('btn_loader').classList.remove('d-none');
    document.getElementById('submit_btn').disabled = true;
});
</script>
@endpush
