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
            'items'   => json_encode($validated['items']),
        ]);

        return response()->json([
            'message' => 'Order placed successfully!',
            'order' => $order
        ], 201);
    }
}
