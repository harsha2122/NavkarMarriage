@extends('layouts.app')

@section('title', 'About Us - Navkar Marriage Bureau')
@section('meta_description', 'Learn about Navkar Marriage Bureau, India\'s trusted Jain Matrimony platform dedicated to helping Jain Brides and Grooms find their perfect life partner.')

@section('content')

<div class="reg-banner">
    <div class="container">
        <div class="banner-text">
            <h6>Let's Begin the Journey to Find the Perfect Life Partner!!!</h6>
            <p>#MatchYourWay with India's Biggest Jain Marriage Bureau</p>
        </div>
    </div>
</div>

<section>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12 title">
                {!! $content !!}
            </div>
        </div>
    </div>
</section>

@endsection
