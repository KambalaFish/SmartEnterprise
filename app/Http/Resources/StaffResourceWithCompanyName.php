<?php

namespace App\Http\Resources;

use App\Models\Company;
use Illuminate\Http\Resources\Json\JsonResource;

class StaffResourceWithCompanyName extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request){
        $status = $this->status;
        if ($this->status=='on_vacation')
            $status = 'on vacation';
        return [
            'name' => $this->name,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
            'status' => $status,
            'companyId' => $this->companyId,
            'companyName' => Company::find($this->companyId)->name,
            'usertype' => $this->usertype
        ];
    }
}
