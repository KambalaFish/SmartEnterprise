<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StaffResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'phoneNumber' => $this->phoneNumber,
            'email' => $this->email,
            'status' => $this->status,
            'companyId' => $this->companyId,
            'usertype' => $this->usertype
        ];
    }
}
