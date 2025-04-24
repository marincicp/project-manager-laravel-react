<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectCommentController extends Controller
{



    /**
     * Store the newly added project comment in the database
     */
    public function store(Request $request, Project $project): RedirectResponse
    {
        $data = $request->validate(["comment" => ["required", "string", "min:3", "max:200"]]);

        $project->comments()->create(["user_id" => Auth::user()->id, "comment" => $data["comment"]]);

        return back()->with("success", "Comment created successfully");
    }

    /**
     * Handle the incoming request to delete a project's comment in the database
     */
    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back()->with("success", "Comment successfully deleted");
    }
}
