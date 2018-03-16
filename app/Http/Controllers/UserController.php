<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Mockery\Exception;
use App\Company;
class UserController extends Controller
{
    /*
     * Get current User
     */
    public function getCurrentUser(){
        try{
            $user = Auth::user();
            $user->company = Company::find( $user->company_id );
            return ['success'=>true, 'user'=>$user ];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }
    }

    /*
     * Get all employee but company ID
     */
    public function getAllEmployee(){
        try {
            $user = Auth::user();
            $employees = User::where([['company_id','=',$user->company_id], ['id', '!=',  $user->id] ])->orderBy('updated_at', 'DESC')->get();
            if( !$employees )
                throw new Exception("Employee not found for this company ");

            return ['success'=>true, 'employees'=>$employees];

        }catch( Exception $e ){
            return [ 'success'=>true, 'message'=>$e->getMessage() ];
        }
    }

    /*
     * Create new employee
     * @Role : employee
     * @Company: authenticate user company
     */
    public function create( Request $request ){
        try {
            $user = Auth::user();
            $employee = new User();
            $employee->company_id = $user->company_id;
            $employee->first_name = $request->input('first_name');
            $employee->last_name = $request->input('last_name');
            $employee->designation = $request->input('designation');
            $employee->mobile = $request->input('mobile');
            $employee->email = $request->input('email');
            $employee->password = bcrypt($request->input('password'));
            $employee->address = $request->input('address');
            $employee->basic_info = $request->input('basic_info');
            if( !$employee->save() )
                throw new Exception("User save failed!");
            $rootRole = Role::where('name','=','employee')->first();
            $employee->attachRole($rootRole);
            return ['success'=>true, 'employee'=>$employee, 'message'=>"User create Successful!"];
        }catch(Exception $e ){
            return ['success'=>true, 'message'=>$e->getMessage() ];
        }
    }

    /*
     * Update existing employee
     */
    public function update( Request $request ){
        try {
            $employee = User::find($request->input('id'));
            $employee->first_name = $request->input('first_name');
            $employee->last_name = $request->input('last_name');
            $employee->designation = $request->input('designation');
            $employee->mobile = $request->input('mobile');
            $employee->email = $request->input('email');
            $employee->address = $request->input('address');
            $employee->basic_info = $request->input('basic_info');
            if( !$employee->save() )
                throw new Exception("User update failed!");
            return ['success'=>true, 'employee'=>$employee, 'message'=>"User update Successful!"];
        }catch (Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage()];
        }
    }

    /*
     * Delete employee
     */
    public function delete( Request $request ){
        try{
            $employee = User::find( $request->input('id'));
            if(!$employee)
                throw new Exception("Employer not found!");

            if(!$employee->delete())
                throw new Exception("Sorry delete operation failed!");

            return ['success'=>true, 'message'=>'User delete successful!'];
        }catch(Exception $e){
            return ['success'=>false, 'message'=>$e->getMessage() ];
        }

    }

    /*
    * Custom logout from react router
    */
    public function logout(){
        try {
            Auth::logout();
            $json = ['success' => true, 'code' => 200, 'message' => 'You are Logged out!'];
            return response()->json($json, '200');
        }catch(Exception $e){
            return ['success'=>false ,'message'=>$e->getMessage() ];
        }
    }
}
