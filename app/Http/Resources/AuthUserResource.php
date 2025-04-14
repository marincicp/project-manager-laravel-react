<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuthUserResource extends JsonResource
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
            "created_at" => $this->created_at,
            "email" => $this->email,
            "email_verfied_at" => $this->email_verified_at,
            "permissions" => $this->getAllPermissions()->map(

                function ($permission): string {
                    return $permission->name;
                }
            ),
            "roles" => $this->getRoleNames(),
        ];
    }
}
