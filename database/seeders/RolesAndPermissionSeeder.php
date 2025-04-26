<?php

namespace Database\Seeders;

use App\Enum\PermissionEnum;
use App\Enum\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
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
    }
}
