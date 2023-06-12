<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;

class TodoListController extends Controller
{
    public function index()
    {
        $todoLists = TodoList::all();
        return response()->json($todoLists);
    }

    public function store(Request $request)
    {
        $todoList = TodoList::create($request->all());
        return response()->json($todoList, 201);
    }

    public function show(TodoList $todoList)
    {
        return response()->json($todoList);
    }

    public function update(Request $request, TodoList $todoList)
    {
        $todoList->update($request->all());
        return response()->json($todoList);
    }

    public function destroy(TodoList $todoList)
    {
        $todoList->delete();
        return response()->json(null, 204);
    }
}
