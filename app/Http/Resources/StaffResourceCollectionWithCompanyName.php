<?php

namespace App\Http\Resources;

class StaffResourceCollectionWithCompanyName extends PaginatedBaseResourceCollection
{
    public $collects = StaffResourceWithCompanyName::class;
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => $this->collection
        ];
    }
}
