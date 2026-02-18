@extends('admin.layouts.app')
@section('title', 'All Profiles')
@section('page-title', 'All Profiles')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
    <form method="GET" action="{{ route('admin.profiles.index') }}" class="d-flex gap-2 flex-wrap">
        <select name="status" class="form-select form-select-sm" style="width:auto;" onchange="this.form.submit()">
            <option value="">All Statuses</option>
            <option value="pending"  {{ request('status') === 'pending'  ? 'selected' : '' }}>Pending</option>
            <option value="active"   {{ request('status') === 'active'   ? 'selected' : '' }}>Active</option>
            <option value="rejected" {{ request('status') === 'rejected' ? 'selected' : '' }}>Rejected</option>
        </select>
        <select name="gender" class="form-select form-select-sm" style="width:auto;" onchange="this.form.submit()">
            <option value="">All Genders</option>
            <option value="female" {{ request('gender') === 'female' ? 'selected' : '' }}>Brides</option>
            <option value="male"   {{ request('gender') === 'male'   ? 'selected' : '' }}>Grooms</option>
        </select>
        <input type="text" name="search" class="form-control form-control-sm" style="width:200px;"
            value="{{ request('search') }}" placeholder="Search name / WhatsApp…">
        <button type="submit" class="btn btn-sm btn-primary">
            <i class="fas fa-search"></i>
        </button>
        @if(request()->hasAny(['status','gender','search']))
            <a href="{{ route('admin.profiles.index') }}" class="btn btn-sm btn-outline-secondary">Clear</a>
        @endif
    </form>
    <span class="text-muted small">{{ $profiles->total() }} profiles</span>
</div>

<div class="admin-table">
    <table class="table table-hover mb-0">
        <thead>
            <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>WhatsApp</th>
                <th>Gender</th>
                <th>City</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Active</th>
                <th>Registered</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($profiles as $profile)
            <tr>
                <td>
                    @if($profile->photo)
                        <img src="{{ asset('storage/images/'.$profile->photo) }}" class="profile-thumb" alt="">
                    @else
                        <div class="profile-thumb d-flex align-items-center justify-content-center bg-light">
                            <i class="fas fa-user text-muted small"></i>
                        </div>
                    @endif
                </td>
                <td class="fw-500">{{ $profile->name }}</td>
                <td>
                    <a href="https://wa.me/91{{ $profile->whatsapp }}" target="_blank" class="text-success">
                        <i class="fab fa-whatsapp me-1"></i>{{ $profile->whatsapp }}
                    </a>
                </td>
                <td>
                    @if($profile->gender === 'female')
                        <span class="badge" style="background:#fde8d8;color:#c0392b;">
                            <i class="fas fa-venus me-1"></i>Bride
                        </span>
                    @else
                        <span class="badge" style="background:#d6eaf8;color:#2980b9;">
                            <i class="fas fa-mars me-1"></i>Groom
                        </span>
                    @endif
                </td>
                <td>{{ $profile->city ?? '—' }}</td>
                <td>
                    <span class="badge badge-{{ $profile->status }}">{{ ucfirst($profile->status) }}</span>
                </td>

                {{-- Featured toggle --}}
                <td>
                    <form method="POST" action="{{ route('admin.profiles.toggleFeatured', $profile) }}">
                        @csrf @method('PATCH')
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox"
                                   {{ $profile->is_featured ? 'checked' : '' }}
                                   onchange="this.form.submit()">
                        </div>
                    </form>
                </td>

                {{-- Active toggle (only for active/rejected, not pending) --}}
                <td>
                    @if($profile->status !== 'pending')
                    <form method="POST" action="{{ route('admin.profiles.toggleStatus', $profile) }}">
                        @csrf @method('PATCH')
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox"
                                   {{ $profile->status === 'active' ? 'checked' : '' }}
                                   onchange="this.form.submit()">
                        </div>
                    </form>
                    @else
                        <span class="text-muted small">—</span>
                    @endif
                </td>

                <td class="text-muted small">{{ $profile->created_at->format('d M Y') }}</td>

                <td>
                    <div class="d-flex gap-1 flex-wrap">
                        <a href="{{ route('admin.profiles.edit', $profile) }}"
                           class="btn btn-xs btn-outline-primary" title="Edit">
                            <i class="fas fa-edit"></i>
                        </a>
                        @if($profile->status === 'pending')
                        <form method="POST" action="{{ route('admin.profiles.approve', $profile) }}" class="d-inline">
                            @csrf @method('PATCH')
                            <button type="submit" class="btn btn-xs btn-success" title="Approve">
                                <i class="fas fa-check"></i>
                            </button>
                        </form>
                        <button type="button" class="btn btn-xs btn-danger" title="Reject"
                            onclick="openReject({{ $profile->id }}, '{{ addslashes($profile->name) }}')">
                            <i class="fas fa-times"></i>
                        </button>
                        @endif
                        <form method="POST" action="{{ route('admin.profiles.destroy', $profile) }}"
                              onsubmit="return confirm('Delete {{ addslashes($profile->name) }}? This cannot be undone.')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-xs btn-outline-danger" title="Delete">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="10" class="text-center text-muted py-4">No profiles found.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-3">
    {{ $profiles->appends(request()->query())->links('pagination::bootstrap-5') }}
</div>

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
                    <label class="form-label">Reason (optional — for admin notes)</label>
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

@push('styles')
<style>
.btn-xs { padding: .2rem .45rem; font-size: .75rem; border-radius: 4px; }
</style>
@endpush

@push('scripts')
<script>
function openReject(id, name) {
    document.getElementById('rejectName').textContent = name;
    document.getElementById('rejectForm').action = '/admin/profiles/' + id + '/reject';
    new bootstrap.Modal(document.getElementById('rejectModal')).show();
}
</script>
@endpush
