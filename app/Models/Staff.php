<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Staff extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'staff';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];

    /**
     * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table staff auto_increment=1;');
    }

    public function departments(): \Illuminate\Database\Eloquent\Relations\BelongsToMany {
        return $this->belongsToMany(Department::class, 'departmentStaff', 'staffId', 'departmentId');
    }
    public function company(){
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }
    public function roles(){
        return $this->belongsToMany(Role::class, 'roleStaff', 'staffId', 'roleId');
    }
}
