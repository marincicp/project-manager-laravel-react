<?php

use App\Enum\PermissionEnum;
use App\Http\Controllers\ProjectCommentController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified"])->group(function () {

   Route::resource('project', ProjectController::class)->except(['index', 'show'])->middleware('can:' . PermissionEnum::ManageFeatures->value);


   Route::get('/project', [ProjectController::class, 'index'])->name('project.index');
   Route::get('/project/{project}', [ProjectController::class, 'show'])->name('project.show');


   Route::post("/project/{project}/comment", [ProjectCommentController::class, "store"])->middleware('can:' . PermissionEnum::ManageComments->value)->name("projectComment.store");


   Route::delete("/project/{comment}", [ProjectCommentController::class, "destroy"])->can("delete", "comment")->middleware('can:' . PermissionEnum::ManageComments->value)->name("projectComment.destroy");
});
