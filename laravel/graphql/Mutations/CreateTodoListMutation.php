<?php

namespace App\GraphQL\Mutations;

use Closure;
use App\Models\TodoList;

class CreateTodoListMutation
{
    public function __invoke($rootValue, array $args, Closure $context)
    {
        $title = $args['input']['title'];

        // Perform the necessary operations to create a new todo list
        // For example, create a new record in the database
        $newTodoList = TodoList::create(['title' => $title]);

        // Return the created todo list to the client
        return $newTodoList;
    }
}