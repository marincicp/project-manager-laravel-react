<?php

namespace App\Enum;

enum ProjectStatusEnum: string
{
    case InProgress = 'In progress';
    case NotStarted = 'Not started';
    case Completed = 'Completed';
    case Inactive = 'Inactive';
}
