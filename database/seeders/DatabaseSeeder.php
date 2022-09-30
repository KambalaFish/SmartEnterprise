<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Contacts\CustomerManagerContact;
use App\Models\Contacts\ItDepartmentContact;
use App\Models\Contacts\MainAdminContact;
use App\Models\Department;
use App\Models\Role;
use App\Models\Staff;
use App\Models\Team;
use Illuminate\Database\Seeder;

use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(CompanySeeder $companySeeder)
    {
         User::factory(1)->create();
//        Company::truncateTable();
//        Department::truncateTable();
//        MainAdminContact::truncateTable();
//        ItDepartmentContact::truncateTable();
//        CustomerManagerContact::truncateTable();
//        Staff::truncateTable();
//        Role::truncateTable();
//        Team::truncateTable();
//        $companySeeder->run();
    }
}
