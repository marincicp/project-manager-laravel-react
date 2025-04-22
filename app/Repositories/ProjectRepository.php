<?php

namespace App\Repositories;

use App\Enum\ProjectStatusEnum;
use App\Models\Project;
use App\Models\ProjectStatus;
use Illuminate\Support\Facades\Auth;

class ProjectRepository
{


   public static function create(array $data)
   {
      $status = ProjectStatus::where("name", ProjectStatusEnum::NotStarted->value)->firstOrFail();

      $data["status_id"] = $status->id;
      $data["user_id"] = Auth::user()->id;

      $project = Project::create($data);

      return $project;
   }
}
