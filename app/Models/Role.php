<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Role extends Model
{
    use HasFactory;
    protected $table = 'role';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded = [];

    public function company(){
        return $this->belongsTo(Company::class, 'companyId', $this->primaryKey);
    }
    public function staff(){
        return $this->belongsToMany(Staff::class, 'roleStaff', 'roleId', 'staffId');
    }

    public static function truncateTable(){
        self::query()->delete();
        DB::statement('alter table role auto_increment=1');
    }
}
