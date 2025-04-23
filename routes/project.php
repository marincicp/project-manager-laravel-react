<?php

use App\Enum\PermissionEnum;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified"])->group(function () {

   Route::resource("/project", ProjectController::class);


   Route::post("/project/{project}/comment", [ProjectCommentController::class, "store"])->middleware('can:' . PermissionEnum::ManageComments->value)->name("projectComment.store");
});
