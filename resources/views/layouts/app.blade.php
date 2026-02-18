<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Google Tag Manager -->
    <script>
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TT6V5VHR');
    </script>

    <link rel="icon" type="image/x-icon" href="{{ asset('assets/frontend/img/logo.png') }}">
    <link rel="canonical" href="{{ url()->current() }}">
    <meta name="robots" content="index,follow">

    <title>@yield('title', 'Navkar Marriage Bureau: Find Your Perfect Jain Life Partner')</title>
    <meta name="description" content="@yield('meta_description', 'Discover the Best Navkar Marriage Bureau for Your Marriage Journey. Connect with Our Jain Matrimony Site and Find Your Ideal Life Partner. Register Now!')">
    <meta name="keywords" content="Jain Matrimony, Navkar Marriage Bureau, Jain Matrimony Site, Jain Matrimonial Website">

    <meta property="og:type" content="article" />
    <meta property="og:title" content="@yield('title', 'Navkar Marriage Bureau: Find Your Perfect Jain Life Partner')" />
    <meta property="og:description" content="@yield('meta_description', 'Discover the Best Navkar Marriage Bureau for Your Marriage Journey.')" />
    <meta property="og:image" content="{{ asset('assets/frontend/img/logo.png') }}" />
    <meta property="og:url" content="{{ url()->current() }}" />
    <meta property="og:site_name" content="Navkar Marriage Bureau" />

    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "Organization",
      "name": "Navkar Marriage Bureau",
      "url": "{{ url('/') }}",
      "logo": "{{ asset('assets/frontend/img/logo.png') }}"
    }
    </script>

    <!-- Disable Right Click & Dev Tools -->
    <script>
      document.addEventListener('contextmenu', e => e.preventDefault());
      document.addEventListener('keydown', e => {
        if ((e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && ['i','c','j'].includes(e.key)) || e.key === 'F12') {
          e.preventDefault();
        }
      });
      document.addEventListener('copy', e => e.preventDefault());
    </script>

    <!-- Meta Pixel -->
    <script>
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init','1476400143027283');fbq('track','PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1476400143027283&ev=PageView&noscript=1"/></noscript>

    <!-- CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-beta.1/css/select2.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="{{ asset('assets/frontend/desktop/css/toast.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/frontend/desktop/css/main.css') }}">

    <!-- jQuery (before layout scripts) -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" crossorigin="anonymous"></script>
    <script src="{{ asset('assets/frontend/desktop/js/toast.js') }}"></script>

    <script>window.ASSET_PATH = '{{ asset('/') }}';</script>

    @yield('head')
</head>

<body class="w-100">

<!-- GTM noscript -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TT6V5VHR" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

<header>
    <nav class="navbar navbar-expand-lg bg-white">
        <div class="container">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <a class="navbar-brand" href="{{ route('home') }}">
                <img src="{{ asset('assets/frontend/img/logo.png') }}" class="w-100" alt="India's No. 1 Trusted, Navkar Marriage Bureau.">
            </a>
            <div>
                <a href="{{ route('enroll') }}" class="btn btn-primary me-4 d-block d-sm-none">Register</a>
            </div>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('home') ? 'active' : '' }}" href="{{ route('home') }}">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('about') ? 'active' : '' }}" href="{{ route('about') }}">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('rules') ? 'active' : '' }}" href="{{ route('rules') }}">Rules</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('profiles*') ? 'active' : '' }}" href="{{ route('profiles') }}">Browse Profiles</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('contact') ? 'active' : '' }}" href="{{ route('contact') }}">Contact</a>
                    </li>
                </ul>
                <a href="{{ route('enroll') }}" class="btn btn-primary me-4 d-none d-sm-block">Register Free</a>
            </div>
        </div>
    </nav>
</header>

@yield('content')

<footer>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <a href="{{ route('home') }}">
                    <img src="{{ asset('assets/frontend/img/logo.png') }}" class="w-75" alt="India's No. 1 Trusted, Navkar Marriage Bureau.">
                </a>
                <p class="footer-text">Navkar Marriage Bureau offers online matrimony services, especially for the Jain Community. Use our user-friendly search features to find a bride or groom who matches your preferences. Join us and begin your happy journey today.</p>
            </div>
            <div class="col-md-3">
                <h4>Useful Links</h4>
                <ul>
                    <li><a href="{{ route('home') }}">Home</a></li>
                    <li><a href="{{ route('about') }}">About Us</a></li>
                    <li><a href="{{ route('enroll') }}">Registration</a></li>
                    <li><a href="{{ route('profiles') }}">Browse Profiles</a></li>
                    <li><a href="{{ route('contact') }}">Contact</a></li>
                </ul>
            </div>
            <div class="col-md-3">
                <h4>Legal</h4>
                <ul>
                    <li><a href="{{ route('rules') }}">Rules</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.1.0-beta.1/js/select2.min.js"></script>
<script src="{{ asset('assets/frontend/js/js-validation.js') }}"></script>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var dropdowns = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdowns.map(el => new bootstrap.Dropdown(el));
});
</script>

@stack('scripts')
</body>
</html>
