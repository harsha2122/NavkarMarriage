@extends('layouts.app')

@section('title', 'Contact Us - Navkar Marriage Bureau')
@section('meta_description', 'Get in touch with Navkar Marriage Bureau. We are here to help you find your perfect Jain life partner.')

@section('content')

<div class="reg-banner">
    <div class="container">
        <div class="banner-text">
            <h6>We'd Love to Hear from You!</h6>
            <p>#NavkarMarriageBureau – India's Most Trusted Jain Marriage Bureau</p>
        </div>
    </div>
</div>

<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10 col-lg-9">

                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <div class="shadow rounded-3 overflow-hidden">
                    <div class="row g-0">

                        {{-- Left: Form --}}
                        <div class="col-md-7 p-4 p-md-5 bg-white">
                            <h4 class="mb-1" style="color:#505d7e;font-weight:700;">Send Us a Message</h4>
                            <p class="text-muted mb-4" style="font-size:1.3rem;">We'll get back to you within 24 hours.</p>

                            <form method="POST" action="{{ route('contact.store') }}">
                                @csrf
                                <div class="mb-3">
                                    <label class="form-label">Full Name <span class="text-danger">*</span></label>
                                    <input type="text" name="name"
                                        class="form-control @error('name') is-invalid @enderror"
                                        value="{{ old('name') }}" placeholder="Your full name" required>
                                    @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Email <span class="text-danger">*</span></label>
                                        <input type="email" name="email"
                                            class="form-control @error('email') is-invalid @enderror"
                                            value="{{ old('email') }}" placeholder="your@email.com" required>
                                        @error('email')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label class="form-label">Phone</label>
                                        <input type="tel" name="phone"
                                            class="form-control @error('phone') is-invalid @enderror"
                                            value="{{ old('phone') }}" placeholder="+91 XXXXX XXXXX">
                                        @error('phone')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                    </div>
                                </div>

                                <div class="mb-4">
                                    <label class="form-label">Message <span class="text-danger">*</span></label>
                                    <textarea name="message" rows="4"
                                        class="form-control @error('message') is-invalid @enderror"
                                        placeholder="Write your message here..." required>{{ old('message') }}</textarea>
                                    @error('message')<div class="invalid-feedback">{{ $message }}</div>@enderror
                                </div>

                                <button type="submit" class="btn btn-primary px-5">
                                    <i class="fas fa-paper-plane me-2"></i>Send Message
                                </button>
                            </form>
                        </div>

                        {{-- Right: Contact Info --}}
                        <div class="col-md-5 p-4 p-md-5 d-flex flex-column justify-content-center"
                             style="background: linear-gradient(160deg, #505d7e 0%, #6b7fa8 70%, #ea334b 100%); color:#fff;">

                            <h4 class="mb-4" style="font-weight:700;">Get in Touch</h4>

                            <div class="d-flex align-items-start mb-4">
                                <i class="fas fa-map-marker-alt me-3 mt-1" style="font-size:1.4rem;opacity:0.85;min-width:20px;"></i>
                                <div>
                                    <div style="font-weight:600;font-size:1.3rem;">Location</div>
                                    <div style="opacity:0.8;font-size:1.2rem;">India</div>
                                </div>
                            </div>

                            <div class="d-flex align-items-start mb-4">
                                <i class="fas fa-envelope me-3 mt-1" style="font-size:1.4rem;opacity:0.85;min-width:20px;"></i>
                                <div>
                                    <div style="font-weight:600;font-size:1.3rem;">Email</div>
                                    <div style="opacity:0.8;font-size:1.2rem;">info@navkarmarriage.com</div>
                                </div>
                            </div>

                            <div class="d-flex align-items-start mb-4">
                                <i class="fab fa-whatsapp me-3 mt-1" style="font-size:1.4rem;opacity:0.85;min-width:20px;"></i>
                                <div>
                                    <div style="font-weight:600;font-size:1.3rem;">WhatsApp</div>
                                    <div style="opacity:0.8;font-size:1.2rem;">Available on WhatsApp</div>
                                </div>
                            </div>

                            <hr style="border-color:rgba(255,255,255,0.25);">
                            <p style="opacity:0.75;font-size:1.2rem;margin-bottom:0;">
                                For urgent queries please reach out via WhatsApp. We typically respond within 24 hours.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

@endsection
