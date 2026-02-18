@extends('layouts.app')

@section('title', 'Browse Jain Profiles - Navkar Marriage Bureau')
@section('meta_description', 'Browse verified Jain Bride and Groom profiles on Navkar Marriage Bureau. Use advanced filters to find your perfect match.')

@section('content')

<div class="log-banner">
    <div class="container"></div>
</div>

<div class="container mt-5">
    <div class="row">
        <div class="col-md-8 p-4">
            <div class="col-md-12 title2 pt-3 pb-3">
                <h1>Browse Jain Profiles</h1>
                <hr class="mb-4">
            </div>

            @if($profiles->count() > 0)
                @foreach($profiles as $profile)
                <div class="user-list Parent_Class shadow row mb-5">
                    <div class="col-md-4 p-2">
                        <div class="list-img">
                            @if($profile->photo)
                                <img src="{{ asset('storage/images/' . $profile->photo) }}" class="img-fluid" alt="{{ $profile->name }}">
                            @else
                                <img src="{{ asset('assets/frontend/img/download.png') }}" class="img-fluid" alt="No photo">
                            @endif
                        </div>
                    </div>
                    <div class="col-md-5 memb-content">
                        <h4>
                            <span>{{ ucfirst($profile->gender) }}</span> - {{ $profile->name }}
                        </h4>
                        <div class="d-flex justify-content-start flex-wrap gap-2">
                            @if($profile->dob)
                                <p>{{ \Carbon\Carbon::parse($profile->dob)->age }} Yrs</p>
                            @endif
                            @if($profile->city)
                                <p> | {{ $profile->city }}</p>
                            @endif
                        </div>
                        @foreach($profile->fieldValues as $fv)
                            @if($fv->value)
                            <div class="d-flex justify-content-start">
                                <p><strong>{{ $fv->formField->label }}:</strong> {{ $fv->value }}</p>
                            </div>
                            @endif
                        @endforeach
                        <div class="d-flex justify-content-start mt-2">
                            <a href="{{ route('profiles.show', $profile->id) }}" class="btn btn-small">
                                <i class="far fa-user"></i> View Profile
                            </a>
                        </div>
                    </div>
                    <div class="col-md-3 intrest-sec">
                        <p class="d-none d-sm-block">Interested in this profile?</p>
                        <a href="{{ route('profiles.show', $profile->id) }}" class="btn btn-primary">
                            <i class="far fa-heart"></i> Connect Now
                        </a>
                    </div>
                </div>
                @endforeach

                <div class="d-flex justify-content-center mt-4">
                    {{ $profiles->appends(request()->query())->links('pagination::bootstrap-5') }}
                </div>
            @else
                <div class="text-center py-5">
                    <i class="fas fa-users fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">No profiles found</h4>
                    <p class="text-muted">Try adjusting your filters or check back later.</p>
                </div>
            @endif
        </div>

        {{-- Filter Sidebar --}}
        <div class="col-md-4 p-3 mt-4">
            <div class="bg-gry p-4 shadow-sm">
                <div class="col-md-12 title">
                    <h4>Filter Profiles</h4>
                </div>
                <form method="GET" action="{{ route('profiles') }}">
                    <div class="mb-3">
                        <label class="form-label">Gender</label>
                        <select name="gender" class="form-select">
                            <option value="">All</option>
                            <option value="female" {{ request('gender') === 'female' ? 'selected' : '' }}>Bride (Female)</option>
                            <option value="male" {{ request('gender') === 'male' ? 'selected' : '' }}>Groom (Male)</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">City</label>
                        <input type="text" name="city" class="form-control" value="{{ request('city') }}" placeholder="Enter city">
                    </div>

                    @foreach($filterFields as $field)
                    <div class="mb-3">
                        <label class="form-label">{{ $field->label }}</label>
                        @if($field->field_type === 'select' && $field->options)
                            <select name="field[{{ $field->field_name }}]" class="form-select">
                                <option value="">Any</option>
                                @foreach($field->options as $opt)
                                    <option value="{{ $opt }}" {{ request("field.{$field->field_name}") === $opt ? 'selected' : '' }}>{{ $opt }}</option>
                                @endforeach
                            </select>
                        @else
                            <input type="text" name="field[{{ $field->field_name }}]" class="form-control"
                                value="{{ request("field.{$field->field_name}") }}" placeholder="{{ $field->label }}">
                        @endif
                    </div>
                    @endforeach

                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary">Apply Filters</button>
                        <a href="{{ route('profiles') }}" class="btn btn-outline-secondary">Clear Filters</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection
