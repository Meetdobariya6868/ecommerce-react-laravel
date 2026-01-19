<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'shipping.name' => 'required|string',
            'shipping.email' => 'required|email',
            'shipping.address' => 'required|string',
            'items' => 'required|array',
            'total' => 'required|numeric'
        ]);

        $order = Order::create([
            'shipping_name' => $request->shipping['name'],
            'shipping_email' => $request->shipping['email'],
            'shipping_address' => $request->shipping['address'],
            'items' => json_encode($request->items),
            'total' => $request->total
        ]);

        // 3️⃣ Return response to React
        return response()->json([
            'success' => true,
            'order_id' => $order->id,
            'message' => 'Order placed successfully'
        ], 201);
    }
}
