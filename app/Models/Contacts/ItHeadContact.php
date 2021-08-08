<?php

namespace App\Models\Contacts;

use Database\Factories\Contacts\ItHeadContactFactory;
use Illuminate\Support\Facades\DB;

class ItHeadContact extends Contact{

    protected static function newFactory(){
        return ItHeadContactFactory::new();
    }

    protected $table = 'itDepartmentContact';

    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table itDepartmentContact auto_increment=1;');
    }

}
