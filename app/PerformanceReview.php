<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Mockery\Exception;

class PerformanceReview extends Model
{
    protected $table = 'performance_reviews';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'review_name','company_id','assign_id'
    ];

    public function company()
    {
        return $this->hasOne('App\Company');
    }

    /**
     * Get the review that owns the user.
     */
    public function user()
    {
        return $this->belongsTo('App\User','assign_id', 'id');
    }

    /**
     * Get the feedback for the reviewers.
     */
    public function feedbacks()
    {
        return $this->hasMany('App\Feedback','review_id','id');
    }

    /*
     * Get All review by user_id and company_id
     */
    public static function getReviewByCompany($company_id){
        try{
            $reviews = self::where([ 'company_id'=>$company_id])->orderBy('updated_at', 'DESC')->get();
            return $reviews;
        }catch(Exception $e ){
            throw new Exception( $e->getMessage() );
        }
    }

}
