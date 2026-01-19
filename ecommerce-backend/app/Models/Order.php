<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
    'shipping_name',
    'shipping_email',
    'shipping_address',
    'items',
    'total'
];

    protected $casts = [
        'items' => 'array',
    ];
}
