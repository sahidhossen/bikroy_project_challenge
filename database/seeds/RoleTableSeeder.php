<?php

use Illuminate\Database\Seeder;
use App\Role;

class RoleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $owner = new Role();
        $owner->name         = 'admin';
        $owner->display_name = 'Admin'; // optional
        $owner->description  = 'Admin of the company'; // optional
        $owner->save();

        $admin = new Role();
        $admin->name         = 'employee';
        $admin->display_name = 'Employeer'; // optional
        $admin->description  = 'Only for employer permission'; // optional
        $admin->save();

    }
}
