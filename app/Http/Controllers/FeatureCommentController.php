<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FeatureCommentController extends Controller
{
    /**
     * Store a newly created feature comment in the database
     */
    public function store(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate(['comment' => ['required', 'min:3', 'max:300', 'string']]);

        $feature->comments()->create(['user_id' => Auth::user()->id, 'comment' => $data['comment']]);

        return back()->with('success', 'Comment created successfully!');
    }

    /**
     * Handle the incoming request to delete a feature's comment in the database
     */
    public function destroy(Request $request, Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back()->with('success', 'Comment deleted successfully.');
    }
}
