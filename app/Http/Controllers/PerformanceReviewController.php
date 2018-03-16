<?php

namespace App\Http\Controllers;

use App\PerformanceReview;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

class PerformanceReviewController extends Controller
{

    /*
     * get all review by current company id
     * @user: should authorized
     */
    public function getAllReviewByCompanyId(){
        try{
            $user = Auth::user();
            $reviews = PerformanceReview::where([ 'company_id'=>$user->company_id])->orderBy('updated_at', 'DESC')->get();;
            if( count( $reviews ) > 0 ){
                foreach ( $reviews as $key=>$review ){
                    $reviews[$key]->assign_user = $review->user;
                    $reviews[$key]->feedbacks = $review->feedbacks;
                    $reviews[$key]->reviewer = null;
                    if( $review->reviewer_id )
                        $reviews[$key]->reviewer = User::find( $review->reviewer_id );
                }
            }
            return [ 'success'=>true, 'reviews'=>$reviews  ];
        }catch(Exception $e){
            return ['success'=>true, 'message'=>$e->getMessage() ];
        }
    }

    /*
     * Save reviews and assigned ID
     */
    public function create( Request $request ){
        try {
            $user = Auth::user();
            $review = new PerformanceReview();
            $review->company_id = $user->company_id;
            $review->review_name = $request->input('review_name');
            $review->description = $request->input('description');
            $review->assign_id =  $request->input('assign_id');
            $review->reviewer_id = $request->input('reviewer_id');
            if( !$review->save() )
                throw new Exception("Sorry review save failed!");
            $review = $this->parseFullReview( $review );
            return ['success'=>true, 'reviews'=>$review, 'message'=>"Review save successful!" ];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }

    /*
    * Update reviews and assigned ID
    */
    public function update( Request $request ){
        try {
            $user = Auth::user();
            $review = PerformanceReview::find( $request->input('id') );
            $review->company_id = $user->company_id;
            $review->review_name = $request->input('review_name');
            $review->description = $request->input('description');
            $review->assign_id =  $request->input('assign_id');
            $review->reviewer_id = $request->input('reviewer_id');
            if( !$review->save() )
                throw new Exception("Sorry review update failed!");
            $review = $this->parseFullReview( $review );
            return ['success'=>true, 'reviews'=>$review ,'message'=>"Review update successful!"];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }

    private function parseFullReview( $review ){
        $review->assign_user = $review->user;
        $review->feedbacks = $review->feedbacks;
        $review->reviewer = null;
        if( $review->reviewer_id )
            $review->reviewer = User::find( $review->reviewer_id );
        return $review;
    }

    /*
     * Review By Feedback
     * When employer logged in then he/she get his assigned performance review list
     */
    public function reviewFeedbackByAssigned(){
        try{
            $user = Auth::user();
            $reviews = PerformanceReview::where(['assign_id'=>$user->id])->orderBy('created_at', 'DESC')->get();
            if( count($reviews) > 0){
                foreach( $reviews as $key=>$review){
                    $reviews[$key]->feedbacks = $review->feedbacks;
                    $reviews[$key]->assigned = $review->user;
                    $reviews[$key]->reviewer = null;
                    if( $review->reviewer_id )
                        $reviews[$key]->reviewer = User::find( $review->reviewer_id );
                }
            }

            return ['success'=>true, 'feedbacks'=>$reviews ];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }

    /*
     * Review by reviewer
     * If current user get a reviewer performance list then he/she will see the lists and feedback
     */
    public function reviewFeedbackByReviewer(){
        try{
            $user = Auth::user();
            $reviews = PerformanceReview::where(['reviewer_id'=>$user->id])->orderBy('created_at', 'DESC')->get();
            if( count($reviews) > 0){
                foreach( $reviews as $key=>$review){
                    $reviews[$key]->feedbacks = $review->feedbacks;
                    $reviews[$key]->reviewer = $user;
                    $reviews[$key]->assigned = null;
                    if( $review->assign_id )
                        $reviews[$key]->assigned = User::find( $review->assign_id );
                }
            }

            return ['success'=>true, 'feedbacks'=>$reviews ];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }
}
