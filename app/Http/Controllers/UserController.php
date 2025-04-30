<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('permissions')->get();

        return Inertia::render('User/Index', ['users' => AuthUserResource::collection($users), 'roleLabels' => RolesEnum::labels()]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {

        $roles = Role::all();

        return Inertia::render('User/Edit', ['user' => new AuthUserResource($user), 'roles' => $roles, 'roleLabels' => RolesEnum::labels()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate(['roles' => ['array', 'required']]);

        $user->syncRoles(...$data['roles']);

        return back()->with('success', 'Role update successfully');
    }
}
