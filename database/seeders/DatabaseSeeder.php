<?php

namespace Database\Seeders;

use App\Enum\RolesEnum;
use App\Models\Feature;
use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([RolesAndPermissionSeeder::class, ProjectStatusesSeeder::class]);

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

        // User::factory()->has(Feature::factory()->count(5), 'features')->create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        // ])->assignRole(RolesEnum::Admin);

        // $admin =  User::factory()->has(Project::factory(4)->state(function (array $attributes, User $user) {
        //     return ["created_by" => $user->id];
        // })->hasAttached(Feature::factory(5)->state(function (array $attributes, Project $project) {
        //     return ["user_id" => $project->created_by];
        // }), "features"), "projects")->create([
        //     'name' => 'Admin User',
        //     'email' => 'admin@example.com',
        // ])->assignRole(RolesEnum::Admin);

        User::factory()
            ->has(
                Project::factory()
                    ->count(5)
                    ->has(
                        Feature::factory(5)->state(function (array $attributes, Project $project) {
                            return [
                                'user_id' => $project->user_id,
                            ];
                        }),
                        'features'
                    ),
                'projects'
            )
            ->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ])
            ->assignRole(RolesEnum::Admin);

        User::factory()
            ->has(
                Project::factory()
                    ->count(5)
                    ->has(
                        Feature::factory(5)->state(function (array $attributes, Project $project) {
                            return [
                                'user_id' => $project->user_id,
                            ];
                        }),
                        'features'
                    ),
                'projects'
            )
            ->create([
                'name' => 'Admin User1',
                'email' => 'admin1@example.com',
            ])
            ->assignRole(RolesEnum::Admin);
    }
}
