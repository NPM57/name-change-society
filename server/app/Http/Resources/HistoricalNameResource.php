<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HistoricalNameResource extends JsonResource
{

    public function toArray($request)
    {   
        return [
            'id' => $this->id,
            'submitted_name' => $this->submitted_name,
            'user_id' => $this->user_id,
            'created_at' => $this->created_at
        ];
    }
}
