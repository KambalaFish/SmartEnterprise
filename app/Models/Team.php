<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Team extends Model
{
    use HasFactory;
    protected $table = 'team';
    protected $primaryKey = 'id';
    private string $foreighKey= 'companyId';
    public $timestamps = false;
    protected $guarded = [];

    public function company(){
        return $this->belongsTo(Company::class, $this->foreighKey, $this->primaryKey);
    }

    public static function truncateTable(){
        self::query()->delete();
        DB::statement('alter table team auto_increment=1');
    }
}
