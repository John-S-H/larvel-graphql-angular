<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TargetGroup;

class Client extends Model
{
    use HasFactory;

    // Allow the below fields to be filled
    protected $fillable = [
        'first_name',
        'last_name',
        'age',
        'height',
        'weight',
        'email',
        'company',
    ];

    public function targetGroup()
    {
        return $this->belongsTo(TargetGroup::class);
    }

    public function condition()
    {
        return $this->belongsTo(Condition::class);
    }
}
