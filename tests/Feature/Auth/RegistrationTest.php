<?php

use App\Enum\PermissionEnum;
use App\Enum\RolesEnum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

test('registration screen can be rendered', function () {
    $response = $this->get('/register');

    $response->assertStatus(200);
});

test('new users can register', function () {
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

    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'tesqt@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', false));
});
