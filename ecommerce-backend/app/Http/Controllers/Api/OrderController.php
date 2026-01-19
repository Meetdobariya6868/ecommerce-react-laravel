<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function placeOrder(Request $request)
    {
        // Return the received order for now
        // (Later we will save this to MySQL)
        $order = Order::create([
        'items' => json_encode($request->items),
        'total' => $request->total
    ]);
        
        return response()->json([
            "message" => "Order received successfully",
            "order" => $order->id
        ]);
    }
}
