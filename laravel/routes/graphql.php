<?php

use Illuminate\Support\Facades\Route;

Route::post('/graphql', function () {
    return \GraphQL::executeRequest(\Illuminate\Http\Request::capture());
});