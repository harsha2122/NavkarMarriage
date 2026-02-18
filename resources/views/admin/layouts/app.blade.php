<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'Admin') — Navkar Marriage Bureau</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --sidebar-w: 240px;
            --primary:   #c8a96e;
            --primary-dk:#a8894e;
            --dark:      #1a1a2e;
        }
        body { font-family: 'Work Sans', sans-serif; background: #f4f6f9; }

        /* ── Sidebar ── */
        #sidebar {
            width: var(--sidebar-w);
            min-height: 100vh;
            background: var(--dark);
            position: fixed;
            top: 0; left: 0;
            z-index: 1000;
            transition: transform .25s ease;
            display: flex;
            flex-direction: column;
        }
        #sidebar .sidebar-brand {
            padding: 1.25rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,.08);
        }
        #sidebar .sidebar-brand img { max-height: 42px; }
        #sidebar .sidebar-brand small { color: rgba(255,255,255,.5); font-size: .7rem; }

        #sidebar .nav-link {
            color: rgba(255,255,255,.7);
            padding: .6rem 1.25rem;
            border-radius: 6px;
            margin: 2px 8px;
            font-size: .875rem;
            transition: all .18s;
        }
        #sidebar .nav-link i { width: 20px; }
        #sidebar .nav-link:hover, #sidebar .nav-link.active {
            background: var(--primary);
            color: #fff;
        }
        #sidebar .nav-section {
            color: rgba(255,255,255,.3);
            font-size: .68rem;
            text-transform: uppercase;
            letter-spacing: .08em;
            padding: .75rem 1.25rem .25rem;
        }
        #sidebar .sidebar-footer {
            margin-top: auto;
            padding: 1rem;
            border-top: 1px solid rgba(255,255,255,.08);
        }

        /* ── Main content ── */
        #main-content {
            margin-left: var(--sidebar-w);
            min-height: 100vh;
            transition: margin .25s ease;
        }
        #topbar {
            background: #fff;
            padding: .75rem 1.5rem;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 999;
        }
        #topbar .page-title { font-weight: 600; font-size: 1.1rem; color: var(--dark); }
        #topbar .admin-name { font-size: .875rem; color: #555; }

        .content-area { padding: 1.5rem; }

        /* ── Cards ── */
        .stat-card { border: none; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.06); }
        .stat-card .stat-icon {
            width: 52px; height: 52px; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.4rem;
        }
        .stat-card .stat-value { font-size: 1.8rem; font-weight: 700; }

        /* ── Tables ── */
        .admin-table { background: #fff; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,.06); overflow: hidden; }
        .admin-table table thead th { background: var(--dark); color: #fff; font-weight: 500; border: none; font-size: .8rem; text-transform: uppercase; letter-spacing: .04em; }
        .admin-table .table td { vertical-align: middle; font-size: .875rem; }
        .admin-table .table tr:hover td { background: #fafafa; }

        /* ── Badges ── */
        .badge-pending  { background: #fff3cd; color: #856404; }
        .badge-active   { background: #d1e7dd; color: #0f5132; }
        .badge-rejected { background: #f8d7da; color: #842029; }

        /* ── Profile thumb ── */
        .profile-thumb { width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 2px solid #e0c4a8; }

        /* ── Toggle switch ── */
        .form-switch .form-check-input { cursor: pointer; }
        .form-switch .form-check-input:checked { background-color: var(--primary); border-color: var(--primary); }

        /* ── Mobile sidebar ── */
        @media (max-width: 767.98px) {
            #sidebar { transform: translateX(-100%); }
            #sidebar.show { transform: translateX(0); }
            #main-content { margin-left: 0; }
            .sidebar-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 999; }
            .sidebar-overlay.show { display: block; }
        }
    </style>
    @stack('styles')
</head>
<body>

<!-- Sidebar overlay (mobile) -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeSidebar()"></div>

<!-- Sidebar -->
<nav id="sidebar">
    <div class="sidebar-brand">
        <div class="d-flex align-items-center gap-2">
            <img src="{{ asset('assets/frontend/img/logo.png') }}" alt="Logo">
        </div>
        <small class="d-block mt-1">Admin Panel</small>
    </div>

    <ul class="nav flex-column mt-2">
        <li><span class="nav-section">Main</span></li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}"
               href="{{ route('admin.dashboard') }}">
                <i class="fas fa-tachometer-alt me-2"></i> Dashboard
            </a>
        </li>

        <li><span class="nav-section">Profiles</span></li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.profiles.index') ? 'active' : '' }}"
               href="{{ route('admin.profiles.index') }}">
                <i class="fas fa-users me-2"></i> All Profiles
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.profiles.pending') ? 'active' : '' }}"
               href="{{ route('admin.profiles.pending') }}">
                <i class="fas fa-clock me-2"></i> Pending Approval
                @php $pendingCount = \App\Models\Profile::where('status','pending')->count(); @endphp
                @if($pendingCount > 0)
                    <span class="badge bg-warning text-dark ms-1">{{ $pendingCount }}</span>
                @endif
            </a>
        </li>

        <li><span class="nav-section">Content</span></li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.form-fields*') ? 'active' : '' }}"
               href="{{ route('admin.form-fields.index') }}">
                <i class="fas fa-list-ul me-2"></i> Form Fields
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.messages*') ? 'active' : '' }}"
               href="{{ route('admin.messages.index') }}">
                <i class="fas fa-envelope me-2"></i> Messages
                @php $unreadCount = \App\Models\ContactMessage::whereNull('replied_at')->count(); @endphp
                @if($unreadCount > 0)
                    <span class="badge bg-danger ms-1">{{ $unreadCount }}</span>
                @endif
            </a>
        </li>

        <li><span class="nav-section">Settings</span></li>
        <li class="nav-item">
            <a class="nav-link {{ request()->routeIs('admin.settings*') ? 'active' : '' }}"
               href="{{ route('admin.settings.index') }}">
                <i class="fas fa-cog me-2"></i> Settings
            </a>
        </li>
    </ul>

    <div class="sidebar-footer">
        <a href="{{ route('home') }}" target="_blank" class="d-block text-center mb-2"
           style="color:rgba(255,255,255,.5); font-size:.8rem; text-decoration:none;">
            <i class="fas fa-external-link-alt me-1"></i> View Site
        </a>
        <form method="POST" action="{{ route('admin.logout') }}">
            @csrf
            <button type="submit" class="btn btn-sm w-100"
                style="background:rgba(255,255,255,.08); color:rgba(255,255,255,.7); font-size:.8rem;">
                <i class="fas fa-sign-out-alt me-1"></i> Logout
            </button>
        </form>
    </div>
</nav>

<!-- Main Content -->
<div id="main-content">
    <!-- Topbar -->
    <div id="topbar">
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-sm d-md-none" onclick="toggleSidebar()" style="color:#555;">
                <i class="fas fa-bars fa-lg"></i>
            </button>
            <span class="page-title">@yield('page-title', 'Dashboard')</span>
        </div>
        <div class="d-flex align-items-center gap-3">
            @if(session('success'))
            <span class="text-success small"><i class="fas fa-check-circle me-1"></i>{{ session('success') }}</span>
            @endif
            <span class="admin-name">
                <i class="fas fa-user-shield me-1 text-muted"></i>
                {{ auth('admin')->user()->name }}
            </span>
        </div>
    </div>

    <!-- Page Content -->
    <div class="content-area">
        @if(session('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>{{ session('success') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif
        @if(session('error'))
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>{{ session('error') }}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        @endif

        @yield('content')
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script>
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
    document.getElementById('sidebarOverlay').classList.toggle('show');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('show');
    document.getElementById('sidebarOverlay').classList.remove('show');
}
</script>
@stack('scripts')
</body>
</html>
