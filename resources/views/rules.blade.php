@extends('layouts.app')

@section('title', 'Rules - Navkar Marriage Bureau')
@section('meta_description', 'Read the rules and guidelines for using Navkar Marriage Bureau, India\'s trusted Jain Matrimony platform.')

@section('content')

<div class="reg-banner">
    <div class="container">
        <div class="banner-text">
            <h6>Rules &amp; Guidelines</h6>
            <p>#NavkarMarriageBureau – India's Most Trusted Jain Marriage Bureau</p>
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
