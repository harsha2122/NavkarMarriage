<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'name', 'whatsapp', 'gender', 'dob', 'city',
        'photo', 'status', 'is_featured', 'admin_note',
    ];

    protected function casts(): array
    {
        return [
            'dob'         => 'date',
            'is_featured' => 'boolean',
        ];
    }

    public function fieldValues()
    {
        return $this->hasMany(ProfileFieldValue::class)->with('formField');
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
