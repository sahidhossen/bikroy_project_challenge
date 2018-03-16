<?php

namespace App\Http\Controllers\Auth;

use App\Company;
use App\Role;
use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/dashboard';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $company = new Company();
        $company->company_name = 'XYZ International Company';
        $company->description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab id nihil quasi quia quidem quod similique sit, velit. Aliquid ex illo ipsum maiores nam non odit perferendis placeat quam tempora!";
        $company->save();
        $user =  User::create([
            'company_id'=> $company->id,
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'designation' => $data['designation'],
            'company_name' => $data['company_name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);
        $rootRole = Role::where('name','=','admin')->first();
        $user->attachRole($rootRole);
        return $user;
    }
}
