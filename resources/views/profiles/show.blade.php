@extends('layouts.app')

@section('title', $profile->name . ' - Navkar Marriage Bureau')

@section('content')

<div class="reg-banner">
    <div class="container">
        <div class="banner-text">
            <h6>Profile Details</h6>
            <p>#NavkarMarriageBureau – India's Most Trusted Jain Marriage Bureau</p>
        </div>
    </div>
</div>

<div class="container mt-5 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-4 text-center">
            @if($profile->photo)
                <img src="{{ asset('storage/images/' . $profile->photo) }}" class="img-fluid rounded shadow" alt="{{ $profile->name }}" style="max-height:400px; object-fit:cover; width:100%;">
            @else
                <img src="{{ asset('assets/frontend/img/download.png') }}" class="img-fluid rounded shadow" alt="No photo">
            @endif
        </div>
        <div class="col-md-6 ps-4">
            <h2 class="mb-1">{{ $profile->name }}</h2>
            <p class="text-muted mb-3">{{ ucfirst($profile->gender) }}</p>

            <table class="table table-borderless">
                <tbody>
                    @if($profile->dob)
                    <tr>
                        <td><strong>Age</strong></td>
                        <td>{{ \Carbon\Carbon::parse($profile->dob)->age }} Years</td>
                    </tr>
                    @endif
                    @if($profile->city)
                    <tr>
                        <td><strong>City</strong></td>
                        <td>{{ $profile->city }}</td>
                    </tr>
                    @endif
                    @foreach($profile->fieldValues as $fv)
                    @if($fv->value)
                    <tr>
                        <td><strong>{{ $fv->formField->label }}</strong></td>
                        <td>{{ $fv->value }}</td>
                    </tr>
                    @endif
                    @endforeach
                </tbody>
            </table>

            <div class="mt-4">
                <a href="https://wa.me/91{{ $profile->whatsapp }}" target="_blank" class="btn btn-success btn-lg">
                    <i class="fab fa-whatsapp me-2"></i> Connect on WhatsApp
                </a>
                <a href="{{ route('profiles') }}" class="btn btn-outline-secondary ms-2">
                    <i class="fas fa-arrow-left me-1"></i> Back to Profiles
                </a>
            </div>
        </div>
    </div>
</div>

@endsection
