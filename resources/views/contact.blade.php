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
            <div class="col-md-8 mt-4">
                <div class="col-md-12 title2 pt-3 pb-3">
                    <h1>Contact Navkar Marriage Bureau</h1>
                    <p>Have a question or need assistance? Fill out the form below and we'll get back to you shortly.</p>
                </div>

                @if(session('success'))
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        {{ session('success') }}
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                @endif

                <div class="bg-gry p-4 shadow-sm">
                    <form method="POST" action="{{ route('contact.store') }}">
                        @csrf
                        <div class="row">
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Full Name <span class="text-danger">*</span></label>
                                <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                    value="{{ old('name') }}" placeholder="Enter your full name" required>
                                @error('name')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Email Address <span class="text-danger">*</span></label>
                                <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                                    value="{{ old('email') }}" placeholder="Enter your email" required>
                                @error('email')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                            <div class="col-md-6 mb-3">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" name="phone" class="form-control @error('phone') is-invalid @enderror"
                                    value="{{ old('phone') }}" placeholder="Enter your phone number">
                                @error('phone')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                            <div class="col-md-12 mb-3">
                                <label class="form-label">Message <span class="text-danger">*</span></label>
                                <textarea name="message" rows="5" class="form-control @error('message') is-invalid @enderror"
                                    placeholder="Write your message here..." required>{{ old('message') }}</textarea>
                                @error('message')<div class="invalid-feedback">{{ $message }}</div>@enderror
                            </div>
                            <div class="col-md-12 text-center">
                                <button type="submit" class="btn btn-primary w-50">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div class="col-md-4 mt-4 ps-4">
                <div class="col-md-12 title2 pt-3 pb-3">
                    <h3>Get in Touch</h3>
                </div>
                <div class="bg-gry p-4 shadow-sm">
                    <p><i class="fas fa-map-marker-alt me-2 text-primary"></i> India</p>
                    <p><i class="fas fa-envelope me-2 text-primary"></i> info@navkarmarriage.com</p>
                    <p><i class="fab fa-whatsapp me-2 text-primary"></i> Available on WhatsApp</p>
                    <hr>
                    <p class="small text-muted">We typically respond within 24 hours. For urgent queries, please reach out via WhatsApp.</p>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
