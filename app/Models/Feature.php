<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'user_id', 'project_id'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): MorphMany
    {

        return $this->morphMany(Comment::class, 'commentable')->orderByDesc('created_at');
    }

    public function upvotes(): HasMany
    {
        return $this->hasMany(Upvote::class);
    }

    public function project(): BelongsTo
    {

        return $this->belongsTo(Project::class);
    }

    /**
     * Scope a query to include whether the authenticated user has upvoted or downvoted each feature
     *   Adds two boolean fields:
     *    - user_has_upvoted
     *    - user_has_downvoted
     */
    public function scopeWithAuthUserUpvotes(Builder $query): Builder
    {
        $currUserId = Auth::user()->id;

        return $query->withExists([

            'upvotes as user_has_upvoted' => function ($query) use ($currUserId) {
                $query->where(
                    'user_id',
                    $currUserId
                )->where('upvote', true);
            },

            'upvotes as user_has_downvoted' => function ($query) use ($currUserId) {
                $query->where('user_id', $currUserId)->where('upvote', false);
            },

        ]);
    }

    public function scopeWithUpvoteCount(Builder $query): Builder
    {
        return $query->addSelect([
            'upvote_count' => DB::table('upvotes')
                ->selectRaw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)')
                ->whereColumn('features.id', 'upvotes.feature_id'),
        ]);
    }

    /**
     *  Load whether the authenticated user has upvoted or downvoted feature
     */
    public function loadAuthUserVoteFeature(): Feature
    {
        $currUserId = Auth::user()->id;

        return $this->loadExists(
            [
                'upvotes as user_has_upvoted' => function ($query) use ($currUserId) {
                    $query->where(
                        'user_id',
                        $currUserId
                    )->where('upvote', true);
                },
                'upvotes as user_has_downvoted' => function ($query) use ($currUserId) {
                    $query->where('user_id', $currUserId)->where('upvote', false);
                },

            ]
        );
    }

    /**
     * Load the count of upvotes for specific feature
     */
    public function loadFeatureUpvoteCount(): Feature
    {
        return $this->loadCount(['upvotes as upvote_count' => function ($query) {

            return $query->where('upvote', true);
        }]);
    }
}
