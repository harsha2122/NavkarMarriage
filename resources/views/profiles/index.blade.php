@extends('layouts.app')

@section('title', 'Browse Jain Profiles - Navkar Marriage Bureau')
@section('meta_description', 'Browse verified Jain Bride and Groom profiles on Navkar Marriage Bureau. Use advanced filters to find your perfect match.')

@section('content')

<div class="container mt-4">
    <div class="row">
        <div class="col-md-8 p-4">
            <div class="col-md-12 title2 pt-3 pb-3">
                <h1>Browse Jain Profiles</h1>
                <hr class="mb-4">
            </div>

            @if($profiles->count() > 0)
                @foreach($profiles as $profile)
                <div class="user-list Parent_Class shadow row mb-3 align-items-center">
                    <div class="col-3 col-md-2 p-2">
                        <div class="list-img">
                            @if($profile->photo)
                                <img src="{{ asset('storage/images/' . $profile->photo) }}" class="img-fluid w-100 h-100" style="object-fit:cover;" alt="{{ $profile->name }}">
                            @else
                                <img src="{{ asset('assets/frontend/img/logo.png') }}" class="img-fluid w-100 h-100" style="object-fit:contain;padding:8px;background:#f5f5f5;" alt="No photo">
                            @endif
                        </div>
                    </div>
                    <div class="col-6 col-md-7 memb-content">
                        <h4 class="mb-1">
                            <span>{{ ucfirst($profile->gender) }}</span> — {{ $profile->name }}
                        </h4>
                        <div class="d-flex flex-wrap gap-1 mb-1" style="font-size:1.2rem;color:#555;">
                            @if($profile->dob)
                                <span>{{ \Carbon\Carbon::parse($profile->dob)->age }} Yrs</span>
                            @endif
                            @if($profile->city)
                                <span>&bull; {{ $profile->city }}</span>
                            @endif
                            @foreach($profile->fieldValues->take(2) as $fv)
                                @if($fv->value)
                                <span>&bull; {{ $fv->value }}</span>
                                @endif
                            @endforeach
                        </div>
                    </div>
                    <div class="col-3 col-md-3 intrest-sec">
                        <a href="{{ route('profiles.show', $profile->id) }}" class="btn btn-primary btn-sm">
                            <i class="far fa-user"></i> View
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
