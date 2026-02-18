<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'site_name'     => 'Navkar Marriage Bureau',
            'site_logo'     => '',
            'about_content' => '<h1>India\'s No. 1 Jain Marriage Bureau: Preserving Tradition, Uniting Souls</h1><p>Welcome to Navkar Marriage Bureau, dedicated to helping you find your perfect Jain life partner. We combine modern matchmaking with traditional Jain values to connect brides and grooms within the Jain community.</p>',
            'rules_content' => '<h1>Rules &amp; Guidelines</h1><ul><li>Provide accurate and truthful information.</li><li>Maintain respectful communication.</li><li>Do not share other members\' personal details.</li><li>Profile photos must be clear and recent.</li><li>No commercial solicitation or spam.</li><li>Admin reserves the right to remove non-compliant profiles.</li></ul>',
            'smtp_host'     => 'smtp.hostinger.com',
            'smtp_port'     => '465',
            'smtp_user'     => '',
            'smtp_pass'     => '',
            'smtp_from'     => '',
            'smtp_name'     => 'Navkar Marriage Bureau',
        ];

        foreach ($defaults as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
