<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use App\Company;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = new Company();
        $company->company_name = 'XYZ International Company';
        $company->description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab id nihil quasi quia quidem quod similique sit, velit. Aliquid ex illo ipsum maiores nam non odit perferendis placeat quam tempora!";
        $company->save();

        $user = new User();
        $user->company_id = $company->id;
        $user->first_name= 'Sahid';
        $user->last_name='Hossen';
        $user->email = "xyz@mail.com";
        $user->password=bcrypt("admin123");
        $user->designation="Administrator";
        $user->basic_info = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda at, incidunt labore nam nemo veniam? Ad aliquid aspernatur blanditiis, eius enim esse explicabo, numquam, officiis provident repudiandae similique unde veritatis!";
        $user->save();

        $rootRole = Role::where('name','=','admin')->first();
        $user->attachRole($rootRole);

    }
}
