<?php

namespace App\Http\Controllers;

use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
    public function index()
    {
        return Condition::all();
    }

    public function show($id)
    {
        return Condition::findOrFail($id);
    }

    public function store(Request $request)
    {
        $client = Condition::create($request->all());
        return $client;
    }

    public function update(Request $request, $id)
    {
        $client = Condition::findOrFail($id);
        $client->update($request->all());

        return $client;
    }

    public function destroy($id)
    {
        $client = Condition::findOrFail($id);
        $client->delete();

        return response()->json([], 204);
    }
}
