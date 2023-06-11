<?php

namespace App\Http\Controllers;

use App\Models\TargetGroup;
use Illuminate\Http\Request;

class TargetGroupController extends Controller
{
    public function index()
    {
        return TargetGroup::all();
    }

    public function show($id)
    {
        return TargetGroup::findOrFail($id);
    }

    public function store(Request $request)
    {
        $targetGroup = TargetGroup::create($request->all());
        return $targetGroup;
    }

    public function update(Request $request, $id)
    {
        $targetGroup = TargetGroup::findOrFail($id);
        $targetGroup->update($request->all());

        return $targetGroup;
    }

    public function destroy($id)
    {
        $targetGroup = TargetGroup::findOrFail($id);
        $targetGroup->delete();

        return response()->json([], 204);
    }
}