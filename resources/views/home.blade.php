@extends('layouts.app')

@section('title', 'Navkar Marriage Bureau: Find Your Perfect Jain Life Partner')
@section('meta_description', 'Discover the Best Navkar Marriage Bureau for Your Marriage Journey. Connect with Our Jain Matrimony Site and Find Your Ideal Life Partner. Register Now!')

@section('content')

{{-- Mobile carousel --}}
<div class="banner">
    <div id="carouselMobile" class="carousel slide d-block d-sm-none" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="{{ asset('assets/frontend/mobile/img/Trusted-Jain-Matrimony-Bureau.jpg') }}" class="w-100" alt="Trusted Navkar Marriage Bureau">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('assets/frontend/mobile/img/India\'s-No.1-Jain-Matrimony-Bureau.jpg') }}" class="w-100" alt="India's No.1 Navkar Marriage Bureau">
            </div>
            <div class="carousel-item">
                <img src="{{ asset('assets/frontend/mobile/img/Connect-with-Jain-Matrimony-Bureau.jpg') }}" class="w-100" alt="Connect with Navkar Marriage Bureau">
            </div>
        </div>
    </div>

    {{-- Desktop carousel --}}
    <div id="carouselDesktop" class="carousel slide d-none d-sm-block" data-bs-ride="carousel">
        <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselDesktop" data-bs-slide-to="0" class="active"></button>
            <button type="button" data-bs-target="#carouselDesktop" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselDesktop" data-bs-slide-to="2"></button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="{{ asset('storage/images/img_1723029992_66b359e827483.png') }}" class="d-block w-100" alt="India's No.1 Navkar Marriage Bureau">
                <div class="carousel-caption d-none d-md-block">
                    <h2>India's No 1 Jain Matrimony Website to Find Your Soulmate</h2>
                    <p>#FindTheOne with Navkar Marriage Bureau</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="{{ asset('storage/images/img_1723030001_66b359f1d1fed.png') }}" class="d-block w-100" alt="India's No.1 Navkar Marriage Bureau">
                <div class="carousel-caption d-none d-md-block">
                    <h2>Navkar Marriage Bureau: Where Genuine Connections Begin</h2>
                    <p>Matching Hearts, Building Families</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="{{ asset('storage/images/img_1723030013_66b359fd7bd1b.png') }}" class="d-block w-100" alt="India's No.1 Navkar Marriage Bureau">
                <div class="carousel-caption d-none d-md-block">
                    <h2>Your Journey to Perfect Life Partner Starts Here</h2>
                    <p>Choose your compatible life partner with us!</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselDesktop" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"><i class="fas fa-chevron-circle-left"></i></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselDesktop" data-bs-slide="next">
            <span class="carousel-control-next-icon"><i class="fas fa-chevron-circle-right"></i></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</div>

{{-- Steps section --}}
<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 title">
                <h2>We bring hearts together with simple steps, keeping traditions alive</h2>
            </div>
            <div class="col-md-3">
                <div class="steps shadow-sm">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-matrimony-site-step-1-to-find-life-partner.png') }}" alt="Step 1 Register" class="w-50">
                    <h5><span>1</span> Register</h5>
                    <p>Sign up with your basic details and create your profile and access thousands of verified profiles.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="steps shadow-sm">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-matrimony-site-step-2-to-find-life-partner.png') }}" alt="Step 2 Search" class="w-50">
                    <h5><span>2</span> Search</h5>
                    <p>Use our advanced filters to search for potential matches based on your preferences.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="steps shadow-sm">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-matrimony-site-step-3-to-find-life-partner.png') }}" alt="Step 3 Connect" class="w-50">
                    <h5><span>3</span> Connect</h5>
                    <p>Express interest in profiles that resonate with you and start a conversation.</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="steps shadow-sm">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-matrimony-site-final-step-4-to-find-life-partner.png') }}" alt="Step 4 Match" class="w-50">
                    <h5><span>4</span> Match</h5>
                    <p>When you find someone special, take the next steps towards marriage with confidence.</p>
                </div>
            </div>
            <div class="col-md-10 text-center p-5 title">
                <p>Welcome to Navkar Marriage Bureau, India's largest Jain Matrimonial Website with thousands of profiles to explore, we are the most trusted and number one choice for countless Jain Brides and Jain Grooms seeking their ideal life partner. Discover your future together in a community that values tradition and shared beliefs. Register today to begin your journey towards finding a compatible partner who resonates with your lifestyle and values.</p>
                <a href="{{ route('profiles') }}" class="font-weight-bold">Let's explore together and unveil your perfect match</a>
            </div>
        </div>
    </div>
</section>

{{-- About section --}}
<section>
    <div class="container-fluid bg-light">
        <div class="row justify-content-center">
            <div class="col-md-4 p-3">
                <img src="{{ asset('assets/frontend/img/Jain-Matrimonial-Website-Happy-Aged-Parents-Use-online-Matrimony-Bureau.jpg') }}" alt="Happy Parents" class="w-100">
            </div>
            <div class="col-md-6 title2 pt-5 pb-3">
                <h2>Discover Your Perfect Match at Navkar Marriage Bureau – Experience the Joy of a Meaningful Connection Rooted in Jain Values.</h2>
                <h6>Trusted &amp; Verified Profiles | Secure &amp; Private | Comprehensive Family Details</h6>
                <p>Welcome to Navkar Marriage Bureau, your trusted partner in finding the perfect Jain Bride or Jain Groom. As the leading Jain Matrimony Site, we have gained the trust of countless individuals in the Jain Community, making us the top choice for those seeking lifelong partnerships.</p>
                <a href="{{ route('enroll') }}" class="btn btn-primary">Get Started</a>
            </div>
        </div>
    </div>
</section>

{{-- Features section --}}
<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 title">
                <h2>Access Exclusive Benefits with Navkar Marriage Bureau</h2>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-3 features">
                <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-Express-Interest.png') }}" alt="Express Interest" class="w-25">
                <h4>Express Interest</h4>
                <p>Send an interest to profiles you like and start your journey to a new connection.</p>
            </div>
            <div class="col-md-3 features">
                <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-Shortlist-Profile.png') }}" alt="Shortlist Profiles" class="w-25">
                <h4>Browse Profiles</h4>
                <p>Explore verified profiles and keep track of your top choices.</p>
            </div>
            <div class="col-md-3 features">
                <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-View-Contact.png') }}" alt="WhatsApp Connect" class="w-25">
                <h4>WhatsApp Connect</h4>
                <p>Connect directly via WhatsApp with profiles that interest you.</p>
            </div>
            <div class="col-md-3 features">
                <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-Advance-Search.png') }}" alt="Advanced Search" class="w-25">
                <h4>Advanced Search</h4>
                <p>Easily filter profiles based on your partner's preferences.</p>
            </div>
            <div class="col-md-12 text-center">
                <a href="{{ route('enroll') }}" class="btn btn-primary">YOUR PARTNER IS JUST A CLICK AWAY</a>
            </div>
        </div>
    </div>
</section>

{{-- Featured Brides --}}
@if($featuredBrides->count() > 0)
<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 title text-center">
                <h3>Connect with Your Ideal Jain Bride Here!</h3>
            </div>
            <div class="main-bride">
                @foreach($featuredBrides as $profile)
                <div class="desk-list bride-list">
                    <div class="listing-box">
                        <img src="{{ asset('storage/images/' . $profile->photo) }}" loading="lazy" alt="profile" class="listing-photo">
                        <div class="overlay user-content text-center">
                            <h4><a href="{{ route('profiles.show', $profile->id) }}">{{ $profile->name }}</a></h4>
                            <div class="row">
                                <div class="col-12 pb-4">
                                    @if($profile->dob)
                                    <p>{{ \Carbon\Carbon::parse($profile->dob)->age }} Years</p>
                                    @endif
                                    @if($profile->city)<p>{{ $profile->city }}</p>@endif
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons pb-3">
                        <div class="text-center">
                            <a href="{{ route('profiles.show', $profile->id) }}" class="btn btn_interest">
                                <i class="far fa-heart"></i> Connect Now
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
@endif

{{-- Pink CTA banner --}}
<section>
    <div class="container">
        <div class="pink-img shadow">
            <div class="row justify-content-center">
                <div class="col-md-5 text-right">
                    <img src="{{ asset('assets/frontend/img/Jain-Matrimony-Bureau-Jain-Matrimonial-Website-Happy-Jain-Bride-and-Jain-Groom.png') }}" class="w-100 border-radius" alt="Happy Jain Bride and Groom">
                </div>
                <div class="col-md-7 title2 text-white">
                    <h3>Navkar Marriage Bureau - Building Bonds on the Foundation of Jain Traditions</h3>
                    <p>At Navkar Marriage Bureau, tradition meets current matchmaking to help you find the perfect partner for your Jain lifestyle. Our platform respects the rich culture and history of Jainism while catering to the needs of today's generation.</p>
                    <a href="{{ route('enroll') }}" class="btn btn-secondary">Register Now</a>
                </div>
            </div>
        </div>
    </div>
</section>

{{-- Featured Grooms --}}
@if($featuredGrooms->count() > 0)
<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 title text-center">
                <h3>Connect with Your Ideal Jain Groom Here!</h3>
            </div>
            <div class="main-bride">
                @foreach($featuredGrooms as $profile)
                <div class="desk-list bride-list">
                    <div class="listing-box">
                        <img src="{{ asset('storage/images/' . $profile->photo) }}" loading="lazy" alt="profile" class="listing-photo">
                        <div class="overlay user-content text-center">
                            <h4><a href="{{ route('profiles.show', $profile->id) }}">{{ $profile->name }}</a></h4>
                            <div class="row">
                                <div class="col-12 pb-4">
                                    @if($profile->dob)
                                    <p>{{ \Carbon\Carbon::parse($profile->dob)->age }} Years</p>
                                    @endif
                                    @if($profile->city)<p>{{ $profile->city }}</p>@endif
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="buttons pb-3">
                        <div class="text-center">
                            <a href="{{ route('profiles.show', $profile->id) }}" class="btn btn_interest">
                                <i class="far fa-heart"></i> Connect Now
                            </a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>
@endif

{{-- SEO text section --}}
<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-10 title">
                <h1>Navkar Marriage Bureau – Your Perfect Jain Match Awaits</h1>
                <p>At the Navkar Marriage Bureau, we understand the importance of marriage within the Jain Community. We are devoted to assisting you discover a life partner who shares your values, ideals, and aspirations. As the most trusted Jain Matrimony Website, we have profiles with your match preference like education, occupation, and locations, inside India and internationally.</p>
                <p>We believe that finding the right partner is a journey that should be enriching and fulfilling. Our platform offers features to help you connect with like-minded individuals. Join us today and take the first step toward a beautiful journey of love and companionship.</p>
            </div>
        </div>
    </div>
</section>

@endsection
