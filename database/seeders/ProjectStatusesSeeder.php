<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProjectStatusesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projectStatus = [
            ["name" => "Not started"],
            ["name" => "In progress"],
            ["name" => "Completed"],
            ["name" => "Inactive"],
        ];

        DB::table("project_statuses")->insert($projectStatus);
    }
}
