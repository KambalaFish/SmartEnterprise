<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

//class DepartmentResourceCollection extends ResourceCollection
class DepartmentResourceCollection extends PaginatedBaseResourceCollection
{
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
