<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function index()
    {
        return response()->json([
            [
                "id" => 1,
                "name" => "Classic White T-Shirt",
                "price" => 499,
                "image" => "https://picsum.photos/seed/p1/600",
                "category" => 'Clothing',
                "rating" => 4.5,
                "description" => 'A soft, breathable cotton tee with a classic fit — perfect for everyday wear.'
            ],
            [
                "id" => 2,
                "name" => "Vintage Leather Wallet",
                "price" => 899,
                "image" => 'https://picsum.photos/seed/p2/600',
                "category" => 'Accessories',
                "rating" => 4.7,
                "description" => 'Handcrafted leather wallet with multiple card slots and a slim profile.'
            ],
            [
                "id" => 3,
                "name" => "Wireless Headphones",
                "price" => 1299,
                "image" => 'https://picsum.photos/seed/p3/600',
                "category" => 'Electronics',
                "rating" => 4.3,
                "description" => 'Comfortable Bluetooth headphones with long battery life and clear sound.'
            ],

            [
                "id" => 'p4',
                "name" => 'Minimal Desk Lamp',
                "price" => 34.5,
                "image" => 'https://picsum.photos/seed/p4/600',
                "category" => 'Home',
                "rating" => 4.6,
                "description" => 'Elegant desk lamp with adjustable head and warm LED lighting.'
            ],
  [
                "id" => 'p5',
                "name" => 'Ceramic Coffee Mug',
                "price" => 12.0,
                "image" => 'https://picsum.photos/seed/p5/600',
                "category" => 'Kitchen',
                "rating" => 4.2,
                "description" => 'Durable ceramic mug with a comfortable handle and a matte glaze.'
  ],
  [
                "id" => 'p6',
                "name" => 'Canvas Tote Bag',
                "price" => 22.0,
                "image" => 'https://picsum.photos/seed/p6/600',
                "category" => 'Accessories',
                "rating" => 4.4,
                "description" => 'A sturdy canvas tote with reinforced straps — ideal for everyday errands.'
            ]
        ]);
    }
}
