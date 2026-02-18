<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Admin Login — Navkar Marriage Bureau</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Work Sans', sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%);
            min-height: 100vh;
            display: flex; align-items: center; justify-content: center;
        }
        .login-card {
            background: #fff;
            border-radius: 16px;
            padding: 2.5rem;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 20px 60px rgba(0,0,0,.3);
        }
        .login-logo { max-height: 52px; }
        .btn-admin {
            background: #c8a96e; border: none; color: #fff; font-weight: 600;
            padding: .7rem; border-radius: 8px; transition: background .2s;
        }
        .btn-admin:hover { background: #a8894e; color: #fff; }
        .form-control:focus { border-color: #c8a96e; box-shadow: 0 0 0 .2rem rgba(200,169,110,.2); }
    </style>
</head>
<body>
<div class="login-card">
    <div class="text-center mb-4">
        <img src="{{ asset('assets/frontend/img/logo.png') }}" alt="Logo" class="login-logo mb-3">
        <h5 class="fw-700 mb-0">Admin Panel</h5>
        <p class="text-muted small">Sign in to manage your bureau</p>
    </div>

    @if($errors->any())
    <div class="alert alert-danger py-2">
        <i class="fas fa-exclamation-circle me-1"></i>
        {{ $errors->first() }}
    </div>
    @endif

    @if(session('error'))
    <div class="alert alert-danger py-2">
        <i class="fas fa-exclamation-circle me-1"></i>{{ session('error') }}
    </div>
    @endif

    <form method="POST" action="{{ route('admin.login.post') }}">
        @csrf
        <div class="mb-3">
            <label class="form-label fw-500">Email Address</label>
            <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                    <i class="fas fa-envelope text-muted"></i>
                </span>
                <input type="email" name="email" class="form-control border-start-0"
                    value="{{ old('email') }}" placeholder="admin@example.com" required autofocus>
            </div>
        </div>
        <div class="mb-4">
            <label class="form-label fw-500">Password</label>
            <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                    <i class="fas fa-lock text-muted"></i>
                </span>
                <input type="password" name="password" id="pwd" class="form-control border-start-0"
                    placeholder="Enter password" required>
                <button type="button" class="btn btn-light border" onclick="togglePwd()">
                    <i class="fas fa-eye" id="pwd-icon"></i>
                </button>
            </div>
        </div>
        <button type="submit" class="btn btn-admin w-100">
            <i class="fas fa-sign-in-alt me-2"></i>Sign In
        </button>
    </form>

    <div class="text-center mt-4">
        <a href="{{ route('home') }}" class="text-muted small">
            <i class="fas fa-arrow-left me-1"></i>Back to Website
        </a>
    </div>
</div>

<script>
function togglePwd() {
    const pwd = document.getElementById('pwd');
    const icon = document.getElementById('pwd-icon');
    if (pwd.type === 'password') {
        pwd.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        pwd.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}
</script>
</body>
</html>
