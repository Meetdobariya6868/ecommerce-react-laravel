<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlaceOrder extends Model
{
    //
    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'total',
        'items'
    ];

    protected $casts = [
        'items' => 'array',   // decode JSON automatically
    ];
}
