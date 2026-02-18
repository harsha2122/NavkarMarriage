<?php

namespace App\Http\Controllers;

use App\Models\Setting;

class PageController extends Controller
{
    public function about()
    {
        $content = Setting::get('about_content', $this->defaultAbout());
        return view('about', compact('content'));
    }

    public function rules()
    {
        $content = Setting::get('rules_content', $this->defaultRules());
        return view('rules', compact('content'));
    }

    private function defaultAbout(): string
    {
        return '<h1>India\'s No. 1 Jain Marriage Bureau: Preserving Tradition, Uniting Souls</h1>
<p>Choosing a life partner is one of the most important decisions, but finding the perfect life partner can be challenging. That\'s where the Navkar Marriage Bureau steps in, helping you easily connect with your soulmate, someone caring and understanding.</p>
<p>Welcome to India\'s No. 1 Jain Marriage Bureau, the largest Jain Marriage Bureau, dedicated to helping thousands of people find their perfect match. In this modern world, finding the perfect life partner can be challenging. In that case, the Jain Marriage Bureau plays a key role in choosing your ideal life partner by combining modern matchmaking techniques while respecting traditional Jain Values, ensuring you find a life partner who shares your beliefs and lifestyle.</p>
<p>The Jain Marriage Bureau plays a crucial role in simplifying this journey, offering services where every profile is thoroughly checked and verified. Our advanced privacy settings ensure that contact details are secure and verified, allowing you to search for your ideal match safely and confidently.</p>';
    }

    private function defaultRules(): string
    {
        return '<h1>Rules &amp; Guidelines – Navkar Marriage Bureau</h1>
<p>Welcome to Navkar Marriage Bureau. To ensure a safe and respectful experience for all members, please read and follow these rules carefully.</p>
<h4>1. Authentic Information</h4>
<p>All members must provide accurate and truthful information about themselves. False information may result in profile removal.</p>
<h4>2. Respectful Communication</h4>
<p>Members must maintain respectful and courteous communication at all times.</p>
<h4>3. Privacy</h4>
<p>Do not share other members\' contact details or personal information without their consent.</p>
<h4>4. Profile Photos</h4>
<p>Profile photos must be recent, clear, and of the individual only. Group photos or obscene images are not allowed.</p>
<h4>5. No Solicitation</h4>
<p>Commercial solicitation, spam, or promotional messages are strictly prohibited.</p>
<h4>6. Admin Authority</h4>
<p>The admin reserves the right to approve, reject, or remove any profile that violates these guidelines.</p>';
    }
}
