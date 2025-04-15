<?php

use App\Enum\RolesEnum;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified", "role:".RolesEnum::Admin->value])->group(function () {

    Route::get("/user", [UserController::class, "index"])->name("user.index");
    Route::get("/user/{user}/edit", [UserController::class, "edit"])->name("user.edit");
    Route::put("/user/{user}", [UserController::class, "update"])->name("user.update");
});
