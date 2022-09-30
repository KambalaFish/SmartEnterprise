<?php

namespace App\Models\Contacts;

use Database\Factories\Contacts\ItDepartmentContactFactory;
use Illuminate\Support\Facades\DB;

class ItDepartmentContact extends Contact{

    protected static function newFactory(){
        return ItDepartmentContactFactory::new();
    }

    protected $table = 'itDepartmentContact';

    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table itDepartmentContact auto_increment=1;');
    }

}
