<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PaginatedBaseResourceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }

    public function withResponse($request, $response)
    {
        $data = $response->getData(true);
        $perPage = $data['meta']['per_page'];
        $lastPage = $data['meta']['last_page'];
        $data['meta'] = compact('perPage', 'lastPage');
        $response->setData($data);
    }
}
