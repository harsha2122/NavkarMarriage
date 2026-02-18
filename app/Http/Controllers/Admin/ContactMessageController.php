<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $query = ContactMessage::latest();

        if ($request->filter === 'unread') {
            $query->whereNull('replied_at');
        } elseif ($request->filter === 'replied') {
            $query->whereNotNull('replied_at');
        }

        $messages = $query->paginate(20);
        return view('admin.messages.index', compact('messages'));
    }

    public function show(ContactMessage $message)
    {
        $smtpConfigured = !empty(Setting::get('smtp_user')) && !empty(Setting::get('smtp_pass'));
        return view('admin.messages.show', compact('message', 'smtpConfigured'));
    }

    public function reply(Request $request, ContactMessage $message)
    {
        $request->validate([
            'reply_message' => 'required|string|max:3000',
        ]);

        // Apply SMTP settings from DB at runtime
        $this->configureMailer();

        try {
            $replyText = $request->reply_message;
            $toEmail   = $message->email;
            $toName    = $message->name;
            $fromName  = Setting::get('smtp_name', 'Navkar Marriage Bureau');
            $fromEmail = Setting::get('smtp_user');

            Mail::send([], [], function ($mail) use ($toEmail, $toName, $fromEmail, $fromName, $replyText, $message) {
                $mail->to($toEmail, $toName)
                     ->from($fromEmail, $fromName)
                     ->subject('Re: Your Message — Navkar Marriage Bureau')
                     ->setBody(
                         nl2br(e($replyText)) .
                         '<br><br><hr><p style="color:#888;font-size:12px;">Original message:<br>' .
                         nl2br(e($message->message)) . '</p>',
                         'text/html'
                     );
            });

            $message->update([
                'reply_message' => $replyText,
                'replied_at'    => now(),
            ]);

            return redirect()->route('admin.messages.show', $message)
                ->with('success', 'Reply sent successfully to ' . $toEmail);

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to send email: ' . $e->getMessage())
                         ->withInput();
        }
    }

    private function configureMailer(): void
    {
        $host     = Setting::get('smtp_host', 'smtp.hostinger.com');
        $port     = (int) Setting::get('smtp_port', '465');
        $user     = Setting::get('smtp_user');
        $pass     = Setting::get('smtp_pass');
        $fromName = Setting::get('smtp_name', 'Navkar Marriage Bureau');

        Config::set('mail.mailers.smtp.host',       $host);
        Config::set('mail.mailers.smtp.port',       $port);
        Config::set('mail.mailers.smtp.username',   $user);
        Config::set('mail.mailers.smtp.password',   $pass);
        Config::set('mail.mailers.smtp.encryption', $port === 465 ? 'ssl' : 'tls');
        Config::set('mail.from.address',            $user);
        Config::set('mail.from.name',               $fromName);
    }
}
