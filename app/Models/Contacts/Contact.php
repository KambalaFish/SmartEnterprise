<?php


namespace App\Models\Contacts;
use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use \Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $primaryKey = 'companyId';
    public $incrementing = true;
    public $timestamps = false;
    protected $guarded = [];

    public function company(){
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }
}
