@extends('admin.layouts.app')
@section('title', 'Settings')
@section('page-title', 'Settings')

@section('content')

<form method="POST" action="{{ route('admin.settings.update') }}" enctype="multipart/form-data">
    @csrf @method('PUT')

    @if($errors->any())
    <div class="alert alert-danger">
        <ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
    </div>
    @endif

    <div class="row g-4">

        {{-- ── Site & Branding ── --}}
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-header bg-white border-bottom">
                    <h6 class="mb-0 fw-600"><i class="fas fa-globe me-2 text-primary"></i>Site & Branding</h6>
                </div>
                <div class="card-body">
                    <div class="mb-3">
                        <label class="form-label">Site Name</label>
                        <input type="text" name="site_name" class="form-control"
                            value="{{ old('site_name', $settings['site_name'] ?? 'Navkar Marriage Bureau') }}">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Site Logo</label>
                        @if(!empty($settings['site_logo']))
                            <div class="mb-2">
                                <img src="{{ asset('storage/images/'.$settings['site_logo']) }}"
                                     style="max-height:50px;" alt="Logo">
                            </div>
                        @endif
                        <input type="file" name="site_logo" class="form-control"
                            accept="image/jpeg,image/png,image/webp">
                        <small class="text-muted">Leave empty to keep current logo. Max 1 MB.</small>
                    </div>
                </div>
            </div>
        </div>

        {{-- ── SMTP Settings ── --}}
        <div class="col-md-6">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-header bg-white border-bottom">
                    <h6 class="mb-0 fw-600"><i class="fas fa-envelope me-2 text-primary"></i>SMTP / Email</h6>
                </div>
                <div class="card-body">
                    <div class="row g-2">
                        <div class="col-8">
                            <label class="form-label small">SMTP Host</label>
                            <input type="text" name="smtp_host" class="form-control form-control-sm"
                                value="{{ old('smtp_host', $settings['smtp_host'] ?? 'smtp.hostinger.com') }}"
                                placeholder="smtp.hostinger.com">
                        </div>
                        <div class="col-4">
                            <label class="form-label small">Port</label>
                            <input type="number" name="smtp_port" class="form-control form-control-sm"
                                value="{{ old('smtp_port', $settings['smtp_port'] ?? '465') }}">
                        </div>
                        <div class="col-12">
                            <label class="form-label small">Email (Username)</label>
                            <input type="email" name="smtp_user" class="form-control form-control-sm"
                                value="{{ old('smtp_user', $settings['smtp_user'] ?? '') }}"
                                placeholder="info@yourdomain.com">
                        </div>
                        <div class="col-12">
                            <label class="form-label small">Password</label>
                            <input type="password" name="smtp_pass" class="form-control form-control-sm"
                                placeholder="Leave blank to keep current password"
                                autocomplete="new-password">
                            @if(!empty($settings['smtp_pass']))
                                <small class="text-success"><i class="fas fa-check me-1"></i>Password is set.</small>
                            @endif
                        </div>
                        <div class="col-12">
                            <label class="form-label small">From Name</label>
                            <input type="text" name="smtp_name" class="form-control form-control-sm"
                                value="{{ old('smtp_name', $settings['smtp_name'] ?? 'Navkar Marriage Bureau') }}">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {{-- ── About Content ── --}}
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fw-600"><i class="fas fa-info-circle me-2 text-primary"></i>About Page Content</h6>
                    <small class="text-muted">HTML supported</small>
                </div>
                <div class="card-body">
                    <textarea name="about_content" rows="10" class="form-control font-monospace"
                        style="font-size:.82rem;">{{ old('about_content', $settings['about_content'] ?? '') }}</textarea>
                </div>
            </div>
        </div>

        {{-- ── Rules Content ── --}}
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white border-bottom d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fw-600"><i class="fas fa-gavel me-2 text-primary"></i>Rules Page Content</h6>
                    <small class="text-muted">HTML supported</small>
                </div>
                <div class="card-body">
                    <textarea name="rules_content" rows="10" class="form-control font-monospace"
                        style="font-size:.82rem;">{{ old('rules_content', $settings['rules_content'] ?? '') }}</textarea>
                </div>
            </div>
        </div>

        {{-- Save button --}}
        <div class="col-12">
            <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary px-5">
                    <i class="fas fa-save me-2"></i>Save All Settings
                </button>
            </div>
        </div>

    </div>
</form>

@endsection
