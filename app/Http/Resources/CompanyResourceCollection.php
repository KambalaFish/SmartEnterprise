<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class CompanyResourceCollection extends PaginatedBaseResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
            'data' => $this->collection,
            'someMetaData' => 'hello',
        ];
    }


//    public $collects = CompanyResource::class;
//    public static $wrap = 'collection';
}

//overriding per_page to perPage, last_page to lastPage
//https://stackoverflow.com/questions/53430277/laravel-5-6-customise-a-paginated-resource-collection-meta-and-links-attributes
