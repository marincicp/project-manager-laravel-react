<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    /**
     * Store or update a user's vote (upvote or downvote) on a feature
     */
    public function store(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate(["feature_id" => "required", "exist:features,id", "upvote" => ["required", "boolean"]]);

        $feature->upvotes()->updateOrCreate(
            [
                "user_id" => Auth::user()->id,
            ],
            [
                "upvote" => $data["upvote"],
            ]
        );

        return back();
    }

    /**
     * Remove the authenticated user's vote from a comment
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->upvotes()->where("user_id", Auth::user()->id)->delete();

        return back();
    }
}
