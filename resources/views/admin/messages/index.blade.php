@extends('admin.layouts.app')
@section('title', 'Contact Messages')
@section('page-title', 'Contact Messages')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
    <form method="GET" class="d-flex gap-2">
        <select name="filter" class="form-select form-select-sm" style="width:auto;" onchange="this.form.submit()">
            <option value="">All Messages</option>
            <option value="unread" {{ request('filter') === 'unread' ? 'selected' : '' }}>Unread</option>
            <option value="replied" {{ request('filter') === 'replied' ? 'selected' : '' }}>Replied</option>
        </select>
    </form>
    <span class="text-muted small">{{ $messages->total() }} message(s)</span>
</div>

<div class="admin-table">
    <table class="table table-hover mb-0">
        <thead>
            <tr>
                <th>From</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
                <th>Received</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            @forelse($messages as $msg)
            <tr class="{{ is_null($msg->replied_at) ? 'fw-500' : '' }}">
                <td>{{ $msg->name }}</td>
                <td><a href="mailto:{{ $msg->email }}">{{ $msg->email }}</a></td>
                <td>{{ $msg->phone ?? '—' }}</td>
                <td class="text-muted" style="max-width:220px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                    {{ $msg->message }}
                </td>
                <td class="text-muted small">{{ $msg->created_at->format('d M Y, h:i A') }}</td>
                <td>
                    @if($msg->replied_at)
                        <span class="badge badge-active">
                            <i class="fas fa-check me-1"></i>Replied
                        </span>
                    @else
                        <span class="badge badge-pending">Unread</span>
                    @endif
                </td>
                <td>
                    <a href="{{ route('admin.messages.show', $msg) }}"
                       class="btn btn-xs btn-outline-primary">
                        <i class="fas fa-eye me-1"></i>View
                    </a>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="7" class="text-center text-muted py-4">No messages yet.</td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="mt-3">
    {{ $messages->appends(request()->query())->links('pagination::bootstrap-5') }}
</div>

@endsection

@push('styles')
<style>.btn-xs { padding:.2rem .45rem; font-size:.75rem; border-radius:4px; }</style>
@endpush
