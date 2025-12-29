<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $guarded = [];
    public function sender()
    {
        return $this->belongsTo(User::class, 'from_id');
    }

    public function reciver()
    {
        return $this->belongsTo(User::class, 'to_id');
    }
}
