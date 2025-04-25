<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


    public function toArray(Request $request): array
    {

        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "completed_at"  => $this->completed_at,
            "start_date"  => $this->start_date,
            "due_date"  => $this->due_date,
            "user" => new UserResource($this->user),
            "status" => new ProjectStatusResource($this->status),
            "comments" => CommentResource::collection($this->comments)
        ];
    }
}
