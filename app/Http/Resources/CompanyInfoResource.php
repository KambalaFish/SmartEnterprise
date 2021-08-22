<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CompanyInfoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name'=>$this->name,
            'country' => $this->country,
            'city' => $this->city,
            'address' => $this->address,
            'zipCode' => $this->zipCode,
            'status'=>$this->status,
            'mainAdminContact' => MainAdminContactResource::make($this->mainAdminContact),
            'itDepartmentContact' => ItHeadContactResource::make($this->itDepartmentContact),
            'customerManagerContact' => CustomerManagerContactResource::make($this->customerManagerContact)
        ];
    }
}
