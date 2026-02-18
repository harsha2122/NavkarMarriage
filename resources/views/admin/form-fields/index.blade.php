@extends('admin.layouts.app')
@section('title', 'Form Fields')
@section('page-title', 'Form Field Builder')

@section('content')

<div class="d-flex justify-content-between align-items-center mb-3">
    <p class="text-muted mb-0 small">
        These fields appear on the enrollment form. Fields with <strong>Filter</strong> enabled appear in the Browse Profiles sidebar.
    </p>
    <a href="{{ route('admin.form-fields.create') }}" class="btn btn-primary btn-sm">
        <i class="fas fa-plus me-1"></i> Add Field
    </a>
</div>

<div class="admin-table">
    <table class="table table-hover mb-0">
        <thead>
            <tr>
                <th style="width:40px;">#</th>
                <th>Label</th>
                <th>Field Name</th>
                <th>Type</th>
                <th>Options</th>
                <th>Required</th>
                <th>Filter</th>
                <th>Order</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @forelse($fields as $field)
            <tr>
                <td class="text-muted small">{{ $field->id }}</td>
                <td class="fw-500">{{ $field->label }}</td>
                <td><code class="small">{{ $field->field_name }}</code></td>
                <td>
                    <span class="badge bg-secondary">{{ $field->field_type }}</span>
                </td>
                <td class="small text-muted">
                    @if($field->options)
                        {{ implode(', ', array_slice($field->options, 0, 3)) }}
                        @if(count($field->options) > 3)
                            <em>+{{ count($field->options) - 3 }} more</em>
                        @endif
                    @else
                        —
                    @endif
                </td>
                <td>
                    @if($field->is_required)
                        <span class="badge badge-active">Yes</span>
                    @else
                        <span class="text-muted small">No</span>
                    @endif
                </td>
                <td>
                    @if($field->is_filter)
                        <span class="badge" style="background:#cff4fc;color:#055160;">
                            <i class="fas fa-filter me-1"></i>Yes
                        </span>
                    @else
                        <span class="text-muted small">No</span>
                    @endif
                </td>
                <td>{{ $field->sort_order }}</td>
                <td>
                    <div class="d-flex gap-1">
                        <a href="{{ route('admin.form-fields.edit', $field) }}"
                           class="btn btn-xs btn-outline-primary">
                            <i class="fas fa-edit"></i>
                        </a>
                        <form method="POST" action="{{ route('admin.form-fields.destroy', $field) }}"
                              onsubmit="return confirm('Delete field \'{{ addslashes($field->label) }}\'? All stored values for this field will also be deleted.')">
                            @csrf @method('DELETE')
                            <button type="submit" class="btn btn-xs btn-outline-danger">
                                <i class="fas fa-trash"></i>
                            </button>
                        </form>
                    </div>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="9" class="text-center text-muted py-5">
                    <i class="fas fa-list-ul fa-3x mb-3 d-block text-muted opacity-50"></i>
                    No custom fields yet. <a href="{{ route('admin.form-fields.create') }}">Add your first field</a>.
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>
</div>

@if($fields->count() > 0)
<div class="mt-3 p-3 bg-light rounded border small text-muted">
    <i class="fas fa-info-circle me-1"></i>
    Fields are shown on the enrollment form in <strong>sort order</strong> (ascending).
    Edit any field to change its order. Deleting a field also deletes all saved values for that field from existing profiles.
</div>
@endif

@endsection

@push('styles')
<style>.btn-xs { padding:.2rem .45rem; font-size:.75rem; border-radius:4px; }</style>
@endpush
