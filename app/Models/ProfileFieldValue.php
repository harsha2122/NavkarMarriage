<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileFieldValue extends Model
{
    protected $fillable = ['profile_id', 'form_field_id', 'value'];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }

    public function formField()
    {
        return $this->belongsTo(FormField::class);
    }
}
