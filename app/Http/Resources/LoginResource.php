<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
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
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
//            'status' => $this->status,
//            'login' => $this->login,
//            'companyId' => $this->companyId,
            'usertype' => $this->usertype,
            'roles' => $this->roles->map(function($value){
                return $value->name;
            })
        ];
    }
}
