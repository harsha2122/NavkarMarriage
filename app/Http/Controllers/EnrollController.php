<?php
namespace App\Http\Controllers;
class EnrollController extends Controller
{
    public function create() { return view('enroll.create'); }
    public function store()  { return redirect()->route('home'); }
    public function thankyou() { return view('enroll.thankyou'); }
}
