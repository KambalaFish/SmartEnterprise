<?php

namespace App\Models;

use App\Models\Contacts\CustomerManagerContact;
use App\Models\Contacts\ItDepartmentContact;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Contacts\MainAdminContact;
use Illuminate\Support\Facades\DB;

class Company extends Model
{
    use HasFactory;
    protected $table = 'company';
//    unnecessary, read below 1)
    protected $primaryKey = 'id';
//    unnecessary, read below 2)
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];
    private string $foreignKey = 'companyId';
////    Sometimes you might want to always load some relationships when retrieving a model. To accomplish this, you may define a $with property on the model:
//    protected $with = ['staff'];
//  second and third parameters match convention, I added them not to forget how to override the convention
    public function mainAdminContact(){
//        return $this->hasOne(MainAdminContact::class, 'companyId', 'id');
        return $this->hasOne(MainAdminContact::class, $this->foreignKey, $this->primaryKey);
    }
    public function itDepartmentContact(){
        return $this->hasOne(ItDepartmentContact::class, $this->foreignKey, $this->primaryKey);
    }
    public function customerManagerContact(){
        return $this->hasOne(CustomerManagerContact::class, $this->foreignKey, $this->primaryKey);
    }
//  same here
    public function departments(){
        return $this->hasMany(Department::class, $this->foreignKey, $this->primaryKey);
//        return $this->hasMany(Department::class, 'companyId', 'id');
    }
    public function roles(){
        return $this->hasMany(Role::class, $this->foreignKey, $this->primaryKey);
    }
    public function teams(){
        return $this->hasMany(Team::class, $this->foreignKey, $this->primaryKey);
    }
    public function staff(){
        return $this->hasMany(Staff::class, $this->foreignKey, $this->primaryKey);
    }
    public static function truncateTable(){
        self::query()->delete();
        DB::update('alter table company auto_increment=1;');
    }
//    this was created just to check how it works
    public function biggestDepartment(){
        return $this->hasOne(Department::class)->ofMany('usersNumber', 'max');
    }
}

//1) Eloquent will also assume that each model's corresponding database table has a primary key column named id. If necessary, you may define a protected $primaryKey property on your model to specify a different column that serves as your model's primary key:

//2) In addition, Eloquent assumes that the primary key is an incrementing integer value, which means that Eloquent will automatically cast the primary key to an integer. If you wish to use a non-incrementing or a non-numeric primary key you must define a public $incrementing property on your model that is set to false:


//    protected $fillable = [
//        'name', 'country', 'city', 'address', 'zipCode', 'usersNumber', 'beaconsNumber', 'status'
//    ];

// I added this property just to see how it works
//    protected $hidden = [
//        'name', 'status', 'country'
//    ];

// I added this property just to see how it works
//    protected $visible = ['name', 'country', 'city',];
