<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Client;

class Condition extends Model
{
    use HasFactory;

    // Allow the below fields to be filled
    protected $fillable = [
        'name'
    ];

    public function clients()
    {
        return $this->hasMany(Client::class);
    }
}
