<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Department extends Model
{
    use HasFactory;
    protected $table = 'department';
    public $timestamps = false;
    protected $guarded = [];

    public function company(){
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }

    public function staff(){
        return $this->belongsToMany(Staff::class, 'departmentStaff',  'departmentId', 'staffId');
    }

    public static function truncateTable(){
        self::query()->delete();
        DB::statement('alter table department auto_increment=1');
    }

}
