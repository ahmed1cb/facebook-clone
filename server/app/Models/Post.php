<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{

    protected $appends = ['creation_date'];
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id');
    }


    public function getCreationDateAttribute()
    {
        return $this->created_at
            ? Carbon::parse($this->created_at)->diffForHumans()
            : null;
    }



}


