<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormField extends Model
{
    protected $fillable = [
        'label', 'field_name', 'field_type',
        'options', 'is_required', 'is_filter', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'options'     => 'array',
            'is_required' => 'boolean',
            'is_filter'   => 'boolean',
        ];
    }

    public function profileValues()
    {
        return $this->hasMany(ProfileFieldValue::class);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
