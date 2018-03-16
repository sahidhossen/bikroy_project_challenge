<?php

namespace App\Http\Controllers;

use App\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery\Exception;

class FeedbackController extends Controller
{
    /*
     * Create Feedback for assigned user
     */
    public function create( Request $request ){
        try{
            $user = Auth::user();
            $feedback = new Feedback();
            $feedback->feedback = $request->input('feedback');
            $feedback->review_id = $request->input('review_id');
            $feedback->user_id = $user->id;
            if(!$feedback->save() )
                throw new Exception("Feedback save failed!");
            return ['success'=>true, 'feedback'=>$feedback , 'message'=>"Feedback post successful!" ];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }
}
