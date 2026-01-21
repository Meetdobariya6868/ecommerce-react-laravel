<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PlaceOrder;
use Illuminate\Http\Request;

class PlaceOrderController extends Controller
{

    public function index()
    {
        return response()->json(
            \App\Models\PlaceOrder::latest()->get()
        );
    }

    public function userOrders(Request $request)
    {
        $orders = $request->user()->placeOrders()->latest()->get();
        
        // Ensure items is always an array
        $orders->transform(function ($order) {
            if (is_string($order->items)) {
                $order->items = json_decode($order->items, true) ?? [];
            }
            return $order;
        });
        
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'phone'   => 'required|numeric',
            'address' => 'required|string',
            'total'   => 'required|numeric',
            'items'   => 'required|array'
        ]);

        $order = PlaceOrder::create([
            'name'    => $validated['name'],
            'email'   => $validated['email'],
            'phone'   => $validated['phone'],
            'address' => $validated['address'],
            'total'   => $validated['total'],
            'items'   => $validated['items'],
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Order placed successfully!',
            'order' => $order
        ], 201);
    }
}
