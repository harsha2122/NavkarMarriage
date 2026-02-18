@extends('admin.layouts.app')
@section('title', 'Pending Approval')
@section('page-title', 'Pending Approval')

@section('content')

@if($profiles->count() === 0)
<div class="card border-0 shadow-sm text-center py-5">
    <div class="card-body">
        <i class="fas fa-check-circle fa-4x text-success mb-3"></i>
        <h5>All Clear!</h5>
        <p class="text-muted">No profiles pending approval right now.</p>
        <a href="{{ route('admin.profiles.index') }}" class="btn btn-primary btn-sm">View All Profiles</a>
    </div>
</div>
@else
<p class="text-muted mb-3">{{ $profiles->count() }} profile(s) waiting for review.</p>

@foreach($profiles as $profile)
<div class="card border-0 shadow-sm mb-3">
    <div class="card-body">
        <div class="row align-items-center g-3">

            {{-- Photo --}}
            <div class="col-auto">
                @if($profile->photo)
                    <img src="{{ asset('storage/images/'.$profile->photo) }}"
                         style="width:80px;height:80px;border-radius:10px;object-fit:cover;border:2px solid #e0c4a8;"
                         alt="{{ $profile->name }}">
                @else
                    <div style="width:80px;height:80px;border-radius:10px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">
                        <i class="fas fa-user fa-2x text-muted"></i>
                    </div>
                @endif
            </div>

            {{-- Info --}}
            <div class="col">
                <h5 class="mb-1 fw-600">{{ $profile->name }}</h5>
                <div class="d-flex flex-wrap gap-3 text-muted small">
                    <span>
                        @if($profile->gender === 'female')
                            <i class="fas fa-venus text-danger me-1"></i>Bride
                        @else
                            <i class="fas fa-mars text-primary me-1"></i>Groom
                        @endif
                    </span>
                    @if($profile->dob)
                    <span><i class="fas fa-birthday-cake me-1"></i>{{ \Carbon\Carbon::parse($profile->dob)->age }} yrs</span>
                    @endif
                    @if($profile->city)
                    <span><i class="fas fa-map-marker-alt me-1"></i>{{ $profile->city }}</span>
                    @endif
                    <span>
                        <i class="fab fa-whatsapp text-success me-1"></i>{{ $profile->whatsapp }}
                    </span>
                    <span><i class="fas fa-clock me-1"></i>{{ $profile->created_at->diffForHumans() }}</span>
                </div>

                @if($profile->fieldValues->count() > 0)
                <div class="mt-2 d-flex flex-wrap gap-2">
                    @foreach($profile->fieldValues->take(4) as $fv)
                    <span class="badge bg-light text-dark border">
                        {{ $fv->formField->label }}: {{ $fv->value }}
                    </span>
                    @endforeach
                </div>
                @endif
            </div>

            {{-- Actions --}}
            <div class="col-auto d-flex gap-2 flex-wrap">
                <a href="{{ route('admin.profiles.edit', $profile) }}"
                   class="btn btn-sm btn-outline-secondary">
                    <i class="fas fa-eye me-1"></i>View Full
                </a>
                <form method="POST" action="{{ route('admin.profiles.approve', $profile) }}" class="d-inline">
                    @csrf @method('PATCH')
                    <button type="submit" class="btn btn-sm btn-success">
                        <i class="fas fa-check me-1"></i>Approve
                    </button>
                </form>
                <button type="button" class="btn btn-sm btn-danger"
                    onclick="openReject({{ $profile->id }}, '{{ addslashes($profile->name) }}')">
                    <i class="fas fa-times me-1"></i>Reject
                </button>
            </div>

        </div>
    </div>
</div>
@endforeach
@endif

{{-- Reject Modal --}}
<div class="modal fade" id="rejectModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Reject Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form method="POST" id="rejectForm">
                @csrf @method('PATCH')
                <div class="modal-body">
                    <p>Rejecting: <strong id="rejectName"></strong></p>
                    <label class="form-label">Reason (optional)</label>
                    <textarea name="admin_note" class="form-control" rows="3"
                        placeholder="Reason for rejection…"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="submit" class="btn btn-danger">Confirm Reject</button>
                </div>
            </form>
        </div>
    </div>
</div>

@endsection

@push('scripts')
<script>
function openReject(id, name) {
    document.getElementById('rejectName').textContent = name;
    document.getElementById('rejectForm').action = '/admin/profiles/' + id + '/reject';
    new bootstrap.Modal(document.getElementById('rejectModal')).show();
}
</script>
@endpush
