<?php

use App\Http\Controllers\FeatureCommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\UpvoteController;
use App\Models\Comment;
use Illuminate\Support\Facades\Route;

Route::middleware(["auth", "verified"])->group(function () {

   Route::resource("feature", FeatureController::class);


   Route::post("/feature/{feature}/comment", [FeatureCommentController::class, "store"])->name("featureComment.store");

   Route::delete("/comment/{comment}", [FeatureCommentController::class, "destroy"])->name("featureComment.destroy")->can("delete", "comment");



   Route::post("/feature/{feature}/upvote}", [UpvoteController::class, "store"])->name("upvote.store");
   Route::delete("/feature/{feature}/upvote}", [UpvoteController::class, "destroy"])->name("upvote.destroy");
});
