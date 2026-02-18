@extends('admin.layouts.app')
@section('title', 'Message from '.$message->name)
@section('page-title', 'View Message')

@section('content')

<div class="mb-3">
    <a href="{{ route('admin.messages.index') }}" class="btn btn-sm btn-outline-secondary">
        <i class="fas fa-arrow-left me-1"></i>Back to Messages
    </a>
</div>

<div class="row g-4">

    {{-- Message Detail --}}
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-bottom">
                <h6 class="mb-0 fw-600">
                    <i class="fas fa-envelope me-2 text-primary"></i>Message
                    @if($message->replied_at)
                        <span class="badge badge-active ms-2">Replied</span>
                    @else
                        <span class="badge badge-pending ms-2">Unread</span>
                    @endif
                </h6>
            </div>
            <div class="card-body">
                <table class="table table-borderless table-sm">
                    <tr>
                        <td class="text-muted small" style="width:90px;">From</td>
                        <td><strong>{{ $message->name }}</strong></td>
                    </tr>
                    <tr>
                        <td class="text-muted small">Email</td>
                        <td><a href="mailto:{{ $message->email }}">{{ $message->email }}</a></td>
                    </tr>
                    @if($message->phone)
                    <tr>
                        <td class="text-muted small">Phone</td>
                        <td>
                            <a href="https://wa.me/91{{ preg_replace('/\D/','',$message->phone) }}" target="_blank">
                                <i class="fab fa-whatsapp text-success me-1"></i>{{ $message->phone }}
                            </a>
                        </td>
                    </tr>
                    @endif
                    <tr>
                        <td class="text-muted small">Received</td>
                        <td>{{ $message->created_at->format('d M Y, h:i A') }}</td>
                    </tr>
                    @if($message->replied_at)
                    <tr>
                        <td class="text-muted small">Replied</td>
                        <td class="text-success">{{ $message->replied_at->format('d M Y, h:i A') }}</td>
                    </tr>
                    @endif
                </table>
                <hr>
                <h6 class="text-muted small text-uppercase mb-2">Message</h6>
                <div class="p-3 bg-light rounded" style="white-space:pre-wrap;line-height:1.7;">{{ $message->message }}</div>

                @if($message->reply_message)
                <hr>
                <h6 class="text-muted small text-uppercase mb-2">Your Reply</h6>
                <div class="p-3 rounded border-start border-primary border-3 bg-white" style="white-space:pre-wrap;line-height:1.7;">
                    {{ $message->reply_message }}
                </div>
                @endif
            </div>
        </div>
    </div>

    {{-- Reply Form --}}
    <div class="col-md-6">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-bottom">
                <h6 class="mb-0 fw-600">
                    <i class="fas fa-reply me-2 text-primary"></i>
                    {{ $message->replied_at ? 'Send Another Reply' : 'Send Reply' }}
                </h6>
            </div>
            <div class="card-body">
                @if(!$smtpConfigured)
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    SMTP is not configured. Please set up email in
                    <a href="{{ route('admin.settings.index') }}">Settings</a> before sending replies.
                </div>
                @endif

                @if($errors->any())
                <div class="alert alert-danger">
                    <ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul>
                </div>
                @endif

                <form method="POST" action="{{ route('admin.messages.reply', $message) }}">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label">To</label>
                        <input type="text" class="form-control bg-light"
                            value="{{ $message->name }} <{{ $message->email }}>" readonly>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Reply Message <span class="text-danger">*</span></label>
                        <textarea name="reply_message" rows="8" class="form-control @error('reply_message') is-invalid @enderror"
                            placeholder="Type your reply here…" required>{{ old('reply_message') }}</textarea>
                        @error('reply_message')<div class="invalid-feedback">{{ $message }}</div>@enderror
                    </div>
                    <div class="d-grid">
                        <button type="submit" class="btn btn-primary" {{ !$smtpConfigured ? 'disabled' : '' }}>
                            <i class="fas fa-paper-plane me-2"></i>Send Reply via Email
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>

@endsection
