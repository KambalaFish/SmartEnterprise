<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Contacts\CustomerManagerContact;
use App\Models\Contacts\ItHeadContact;
use App\Models\Role;
use App\Models\Staff;
use App\Models\Team;
use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Contacts\MainAdminContact;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {
        Company::factory()
            ->has(
                Department::factory()
                    ->count(2)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    })
                    ->has(
                        Staff::factory()
                            ->count(2)
                            ->state(function (array $attributes, Department $department) {
                                return ['companyId' => $department->companyId];
                            }),
                        'staff'
                    ),
                'departments'
            )
            ->has(
                Role::factory()
                    ->count(2)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    })
            )
            ->has(
                Team::factory()
                    ->count(2)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    })
            )
            ->has(
                MainAdminContact::factory()
                    ->count(1)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    }),
                'mainAdminContact'
            )
            ->has(
                ItHeadContact::factory()
                    ->count(1)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    }),
                'itHeadContact'
            )
            ->has(
                CustomerManagerContact::factory()
                    ->count(1)
                    ->state(function (array $attributes, Company $company) {
                        return ['companyId' => $company->id];
                    }),
                'customerManagerContact'
            )
            ->count(47)
            ->create();

        Company::factory()
            ->has(
                Staff::factory()
                    ->count(1)
                    ->state(function (array $attributes) {
                        return [
                            'email' => 'admin@admin.com',
                            'login' => 'admin@admin.com',
                            'usertype' => 'systemAdmin'
                        ];
                    })
                    ->has(
                        Role::factory()
                            ->count(1)
                            ->state(function (array $attributes, Staff $staff) {
                                return [
                                    'companyId' => $staff->companyId
                                ];
                            }),
                        'roles'
                    ),
                'staff'
            )
            ->count(1)
            ->create();
//        Company::factory()
//            ->hasDepartments(
//                2, function (array $attributes, Company $company){
//                    return ['companyId' => $company->id];
//                })
//            ->hasMainAdminContact(
//                1, function (array $attributes, Company $company){
//                    return ['companyId' => $company->id];
//                })
//            ->count(50)
//            ->create();
    }
}
