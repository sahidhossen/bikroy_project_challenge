<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    //

    /**
     * Get the page that owns the post.
     */
    public function review()
    {
        return $this->belongsTo('App\PerformanceReview','id','review_id');
    }
}
