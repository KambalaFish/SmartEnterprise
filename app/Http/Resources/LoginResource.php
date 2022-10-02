<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        if (strcmp($this->usertype, 'systemAdmin') == 0) {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'phoneNumber' => $this->phoneNumber,
                'email' => $this->email,
                'usertype' => $this->usertype,
                'roles' => $this->roles->map(function ($value) {
                    return $value->name;
                })
            ];
        }
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
//            'status' => $this->status,
//            'login' => $this->login,
            'companyId' => $this->companyId,
            'usertype' => $this->usertype,
            'roles' => $this->roles->map(function ($value) {
                return $value->name;
            })
        ];
    }
}
