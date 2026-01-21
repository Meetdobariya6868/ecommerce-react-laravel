<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlaceOrder extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'total',
        'items',
        'user_id'
    ];

    protected $casts = [
        'items' => 'array',   // decode JSON automatically
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
