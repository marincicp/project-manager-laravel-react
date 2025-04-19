<?php

namespace Database\Seeders;

use App\Enum\PermissionEnum;
use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);
        $commenterRole = Role::create(['name' => RolesEnum::Commenter->value]);

        $manageFeaturesPermission = Permission::create(['name' => PermissionEnum::ManageFeatures->value]);
        $manageUsersPermission = Permission::create(['name' => PermissionEnum::ManageUsers->value]);
        $manageCommentersPermission = Permission::create(['name' => PermissionEnum::ManageComments->value]);
        $upvoteDownvotesPermission = Permission::create(['name' => PermissionEnum::UpvoteDownvote->value]);

        $userRole->syncPermissions([$upvoteDownvotesPermission]);
        $commenterRole->syncPermissions([$upvoteDownvotesPermission, $manageCommentersPermission]);
        $adminRole->syncPermissions([
            $manageCommentersPermission,
            $manageUsersPermission,
            $manageFeaturesPermission,
            $upvoteDownvotesPermission,
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'com@example.com',
        ])->assignRole(RolesEnum::Commenter);
        User::factory()->create([
            'name' => 'Commenter User1',
            'email' => 'com1@example.com',
        ])->assignRole(RolesEnum::Commenter);
        User::factory()->has(Feature::factory()->count(5), 'features')->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);

        User::factory()->has(Feature::factory()->count(5), 'features')->create([
            'name' => 'Admin User1',
            'email' => 'admin1@example.com',
        ])->assignRole(RolesEnum::Admin);


        $projectStatus = [
            ["name" => "Not started"],
            ["name" => "In progress"],
            ["name" => "Completed"],
            ["name" => "Inactive"],
        ];

        DB::table("project_status")->insert($projectStatus);
    }
}