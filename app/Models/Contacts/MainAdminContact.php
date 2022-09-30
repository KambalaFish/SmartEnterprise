<?php

namespace App\Models\Contacts;

use Database\Factories\Contacts\MainAdminContactFactory;
use Illuminate\Support\Facades\DB;

class MainAdminContact extends Contact{

    protected static function newFactory(){
        return MainAdminContactFactory::new();
    }

    protected $table = 'mainAdminContact';

    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table mainAdminContact auto_increment=1;');
    }
}
