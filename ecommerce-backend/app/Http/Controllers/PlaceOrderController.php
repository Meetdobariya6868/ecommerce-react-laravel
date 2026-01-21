<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PlaceOrder;

class PlaceOrderController extends Controller
{
    public function index()
    {
        $orders = PlaceOrder::all();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'address' => 'required',
            'total' => 'required|numeric',
            'items' => 'required|array',
        ]);

        $order = PlaceOrder::create($request->all());

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ]);
    }
}