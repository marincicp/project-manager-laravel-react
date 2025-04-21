<?php

namespace App\Enum;

use App\Models\Project;

enum ProjectStatusEnum: string
{

   case InProgress = 'In progress';
   case NotStarted = 'Not started';
   case Completed = 'Completed';
   case Inactive = 'Inactive';
}
