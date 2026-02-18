@extends('layouts.app')

@section('title', 'Profile Submitted - Navkar Marriage Bureau')
@section('meta_description', 'Thank you for registering with Navkar Marriage Bureau. Your profile is under review.')

@section('content')

<div class="log-banner d-none d-sm-block">
    <div class="container"></div>
</div>

<section>
    <div class="container log">
        <div class="row justify-content-center">
            <div class="col-md-7 register-form shadow text-center py-5">

                <div class="mb-4">
                    <i class="fas fa-check-circle fa-5x" style="color: #c8a96e;"></i>
                </div>

                <div class="title mb-4">
                    <h2 class="pb-2">Profile Submitted Successfully!</h2>
                    <p class="text-muted">Thank you for registering with Navkar Marriage Bureau.</p>
                </div>

                <div class="bg-light rounded p-4 text-start mb-4">
                    <h5 class="mb-3"><i class="fas fa-info-circle text-primary me-2"></i>What happens next?</h5>
                    <ul class="list-unstyled">
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>
                            Our team will <strong>review your profile</strong> within 24–48 hours.
                        </li>
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>
                            Once approved, your profile will be <strong>visible to other members</strong>.
                        </li>
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>
                            Interested profiles will <strong>contact you directly on WhatsApp</strong>.
                        </li>
                        <li class="mb-2">
                            <i class="fas fa-check text-success me-2"></i>
                            You will be <strong>notified by email</strong> when your profile goes live.
                        </li>
                    </ul>
                </div>

                <div class="d-flex justify-content-center gap-3 flex-wrap">
                    <a href="{{ route('profiles') }}" class="btn btn-primary">
                        <i class="fas fa-users me-2"></i>Browse Profiles
                    </a>
                    <a href="{{ route('home') }}" class="btn btn-outline-secondary">
                        <i class="fas fa-home me-2"></i>Go to Home
                    </a>
                </div>

                <p class="text-muted small mt-4">
                    Have questions? <a href="{{ route('contact') }}">Contact us</a> and we'll be happy to help.
                </p>

            </div>
        </div>
    </div>
</section>

@endsection
