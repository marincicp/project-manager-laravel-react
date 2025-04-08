<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;


class Feature extends Model
{

    use HasFactory;

    protected $fillable = ["name", "description", "user_id"];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    public function comments(): MorphMany
    {

        return $this->morphMany(Comment::class, "commentable")->orderByDesc("created_at");
    }


    public function upvotes(): HasMany
    {
        return  $this->hasMany(Upvote::class);
    }


    /**
     * Scope a query to include whether the authenticated user has upvoted or downvoted each feature
     *   Adds two boolean fields:
     *    - user_has_upvoted
     *    - user_has_downvoted
     * @param \Illuminate\Contracts\Database\Eloquent\Builder $query
     * @return Builder
     */
    public function scopeWithAuthUserUpvotes(Builder $query): Builder
    {
        $currUserId  = Auth::user()->id;

        return $query->withExists([

            "upvotes as user_has_upvoted" => function ($query) use ($currUserId) {
                $query->where(
                    "user_id",
                    $currUserId
                )->where("upvote", true)
                ;
            },

            "upvotes as user_has_downvoted" => function ($query) use ($currUserId) {
                $query->where("user_id", $currUserId)->where("upvote", false);
            }

        ]);
    }


    /**
     *  Load whether the authenticated user has upvoted or downvoted feature
     * @return Feature
     */
    public function loadAuthUserVoteFeature(): Feature
    {
        $currUserId  = Auth::user()->id;

        return $this->loadExists(
            [
                "upvotes as user_has_upvoted" => function ($query) use ($currUserId) {
                    $query->where(
                        "user_id",
                        $currUserId
                    )->where("upvote", true)
                    ;
                },
                "upvotes as user_has_downvoted" => function ($query) use ($currUserId) {
                    $query->where("user_id", $currUserId)->where("upvote", false);
                }

            ]
        );
    }


    /**
     * Load the count of upvotes for specific feature
     * @return Feature
     */
    public function loadFeatureUpvoteCount(): Feature
    {
        return $this->loadCount(["upvotes as upvote_count" => function ($query) {

            return $query->where("upvote", true);
        }]);
    }
}
