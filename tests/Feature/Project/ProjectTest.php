<?php

use App\Enum\RolesEnum;
use App\Models\User;
use Database\Seeders\ProjectStatusesSeeder;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can be created by admin role', function () {

    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole(RolesEnum::Admin->value);

    $this->actingAs($user)->get(route('project.create'))->assertStatus(200);

    $res = $this->actingAs($user)->post(
        '/project',
        [
            'name' => 'Project x',
            'description' => 'some description',
            'start_date' => '',
            'due_date' => '',
        ]
    );

    $res->assertRedirect(route('project.index'));
    $this->assertDatabaseHas('projects', [
        'name' => 'Project x',
    ]);
});

test('can not be created by user and commenter role', function () {
    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $roles = [RolesEnum::User->value, RolesEnum::Commenter->value];

    foreach ($roles as $role) {
        $user = User::factory()->create(['email_verified_at' => now()]);
        $user->assignRole($role);

        $this->actingAs($user)
            ->get(route('project.create'))
            ->assertForbidden();

        $this->actingAs($user)
            ->post('/project', [
                'name' => 'new name',
                'description' => 'some description',
                'start_date' => '',
                'due_date' => '',
            ])
            ->assertForbidden();
    }
});

test('can not be created without name field', function () {

    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole(RolesEnum::Admin->value);

    $this->actingAs($user)->get(route('project.create'))->assertStatus(200);

    $res = $this->actingAs($user)->post(
        '/project',
        [
            'name' => '',
            'description' => 'some description',
            'start_date' => '',
            'due_date' => '',
        ]
    )->assertSessionHasErrors('name');
});


test('can not be created with start date in the past', function () {

    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole(RolesEnum::Admin->value);

    $this->actingAs($user)->get(route('project.create'))->assertStatus(200);

    $res = $this->actingAs($user)->post(
        '/project',
        [
            'name' => 'new project',
            'description' => 'some description',
            'start_date' => now()->addDays(-2),
            'due_date' => '',
        ]
    )->assertSessionHasErrors('start_date');
});




test('cannot be created with a due date before the start date', function () {

    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole(RolesEnum::Admin->value);

    $this->actingAs($user)->get(route('project.create'))->assertStatus(200);

    $res = $this->actingAs($user)->post(
        '/project',
        [
            'name' => 'new project',
            'description' => 'some description',
            'start_date' => now()->addDays(+2),
            'due_date' => now()->addDays(),
        ]
    )->assertSessionHasErrors('due_date');
});


test('can be created with only a due date', function () {

    $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

    $user = User::factory()->create([
        'email_verified_at' => now(),
    ]);
    $user->assignRole(RolesEnum::Admin->value);

    $this->actingAs($user)->get(route('project.create'))->assertStatus(200);

    $res = $this->actingAs($user)->post(
        '/project',
        [
            'name' => 'new project 2',
            'description' => 'some description',
            'start_date' => "",
            'due_date' => now()->addDays(2),
        ]
    );

    $res->assertRedirect(route('project.index'));
    $this->assertDatabaseHas('projects', [
        'name' => 'new project 2',
    ]);
});
