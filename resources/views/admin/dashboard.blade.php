@extends('admin.layouts.app')
@section('title', 'Dashboard')
@section('page-title', 'Dashboard')

@section('content')

{{-- ── Stats Row ── --}}
<div class="row g-3 mb-4">
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#fff3cd;">
                    <i class="fas fa-clock" style="color:#856404;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['pending'] }}</div>
                    <div class="text-muted small">Pending</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#d1e7dd;">
                    <i class="fas fa-check-circle" style="color:#0f5132;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['active'] }}</div>
                    <div class="text-muted small">Active</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#f8d7da;">
                    <i class="fas fa-times-circle" style="color:#842029;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['rejected'] }}</div>
                    <div class="text-muted small">Rejected</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#cff4fc;">
                    <i class="fas fa-star" style="color:#055160;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['featured'] }}</div>
                    <div class="text-muted small">Featured</div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row g-3 mb-4">
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#e2d9f3;">
                    <i class="fas fa-users" style="color:#6f42c1;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['total'] }}</div>
                    <div class="text-muted small">Total Profiles</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#fde8d8;">
                    <i class="fas fa-venus" style="color:#c0392b;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['brides'] }}</div>
                    <div class="text-muted small">Brides</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#d6eaf8;">
                    <i class="fas fa-mars" style="color:#2980b9;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['grooms'] }}</div>
                    <div class="text-muted small">Grooms</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6 col-md-3">
        <div class="card stat-card h-100">
            <div class="card-body d-flex align-items-center gap-3">
                <div class="stat-icon" style="background:#d5f5e3;">
                    <i class="fas fa-envelope" style="color:#1e8449;"></i>
                </div>
                <div>
                    <div class="stat-value">{{ $stats['messages'] }}</div>
                    <div class="text-muted small">Messages</div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- ── Quick Links ── --}}
<div class="row g-3 mb-4">
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <h6 class="fw-600 mb-3"><i class="fas fa-bolt text-warning me-2"></i>Quick Actions</h6>
                <div class="d-flex flex-wrap gap-2">
                    <a href="{{ route('admin.profiles.pending') }}" class="btn btn-warning btn-sm">
                        <i class="fas fa-clock me-1"></i> Review Pending ({{ $stats['pending'] }})
                    </a>
                    <a href="{{ route('admin.profiles.index') }}" class="btn btn-primary btn-sm">
                        <i class="fas fa-users me-1"></i> All Profiles
                    </a>
                    <a href="{{ route('admin.messages.index') }}" class="btn btn-info btn-sm text-white">
                        <i class="fas fa-envelope me-1"></i> Messages
                    </a>
                    <a href="{{ route('admin.form-fields.index') }}" class="btn btn-secondary btn-sm">
                        <i class="fas fa-list-ul me-1"></i> Form Fields
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <h6 class="fw-600 mb-3"><i class="fas fa-history text-primary me-2"></i>Recent Registrations</h6>
                @forelse($recentProfiles as $p)
                <div class="d-flex align-items-center gap-2 mb-2">
                    @if($p->photo)
                        <img src="{{ asset('storage/images/'.$p->photo) }}" class="profile-thumb" alt="">
                    @else
                        <div class="profile-thumb d-flex align-items-center justify-content-center bg-light">
                            <i class="fas fa-user text-muted"></i>
                        </div>
                    @endif
                    <div class="flex-grow-1">
                        <div class="fw-500 small">{{ $p->name }}</div>
                        <div class="text-muted" style="font-size:.75rem;">{{ $p->created_at->diffForHumans() }}</div>
                    </div>
                    <span class="badge badge-{{ $p->status }}">{{ ucfirst($p->status) }}</span>
                </div>
                @empty
                <p class="text-muted small">No profiles yet.</p>
                @endforelse
            </div>
        </div>
    </div>
</div>

@endsection
