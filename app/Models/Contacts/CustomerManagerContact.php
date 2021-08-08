<?php

namespace App\Models\Contacts;

use Database\Factories\Contacts\CustomerManagerContactFactory;
use Illuminate\Support\Facades\DB;

class CustomerManagerContact extends Contact{

    protected static function newFactory(){
        return CustomerManagerContactFactory::new();
    }

    protected $table = 'customerManagerContact';

    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table customerManagerContact auto_increment=1;');
    }

}
