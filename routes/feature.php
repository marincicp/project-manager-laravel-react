<?php

use App\Enum\PermissionEnum;
use App\Http\Controllers\FeatureCommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified"])->group(function () {

   Route::resource("feature", FeatureController::class)->except(["index", "show"])->middleware("can:" . PermissionEnum::ManageFeatures->value);

   Route::get("/feature", [FeatureController::class, "index"])->name("feature.index");
   Route::get("/feature/{feature}", [FeatureController::class, "show"])->name("feature.show");


   Route::post("/feature/{feature}/comment", [FeatureCommentController::class, "store"])->name("featureComment.store")->middleware("can:" . PermissionEnum::ManageComments->value);

   Route::delete("/comment/{comment}", [FeatureCommentController::class, "destroy"])->name("featureComment.destroy")->can("delete", "comment")->middleware("can:" . PermissionEnum::ManageComments->value);



   Route::post("/feature/{feature}/upvote}", [UpvoteController::class, "store"])->name("upvote.store");
   Route::delete("/feature/{feature}/upvote}", [UpvoteController::class, "destroy"])->name("upvote.destroy");
});