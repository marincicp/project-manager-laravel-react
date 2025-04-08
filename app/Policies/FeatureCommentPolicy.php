<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class FeatureCommentPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function delete(
        User $user,
        Comment $comment
    ) {
        $feature = $comment->commentable()->first();

        return $user->id === $comment->user->id || $user->id === $feature->user_id;
    }
}
