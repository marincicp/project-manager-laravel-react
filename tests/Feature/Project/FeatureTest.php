<?php

use App\Enum\RolesEnum;
use App\Models\Project;
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

   $project = $user->projects()->create(['name' => 'New Project', 'description' => "desc"]);

   $this->actingAs($user)->get(route('feature.create'))->assertStatus(200);

   $res = $this->actingAs($user)->post(
      '/feature',
      [
         'name' => 'Feature x',
         'description' => 'some description',
         'project_id' => $project->id,
      ]
   );

   $res->assertRedirect(route('feature.index'));
   $this->assertDatabaseHas('features', [
      'name' => 'Feature x',
   ]);
});


test('can not be created by user and commenter role', function () {
   $this->seed([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

   $roles = [RolesEnum::User->value, RolesEnum::Commenter->value];

   foreach ($roles as $role) {
      $user = User::factory()->create(['email_verified_at' => now()]);
      $user->assignRole($role);

      $this->actingAs($user)
         ->get(route('feature.create'))
         ->assertForbidden();

      $this->actingAs($user)
         ->post('/feature', [
            'name' => 'new name',
            'description' => 'some description',
            'user_id' => 1,
         ])
         ->assertForbidden();
   }
});
