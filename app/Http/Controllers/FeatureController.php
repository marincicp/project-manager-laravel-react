<?php

namespace App\Http\Controllers;

use App\Http\Resources\CommentResource;
use App\Http\Resources\FeatureListResource;
use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    /**
     * Show all features page
     */
    public function index(): Response
    {
        $features = Feature::with(['user'])->withAuthUserUpvotes()->withCount([
            'upvotes as upvote_count' => function ($query) {
                $query->where('upvote', true);
            },
        ])->latest()->paginate(5);

        return Inertia::render('Feature/Index', ['features' => FeatureListResource::collection($features)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Feature/Create');
    }

    /**
     * Store a newly created feature in the database
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['string', 'min:5', 'max:500', 'required'],
            'description' => ['nullable', 'string'],
        ]);

        $data['user_id'] = Auth::user()->id;

        Feature::create($data);

        return to_route('feature.index')->with('succes', 'Feature created successfully');
    }

    /**
     * Show a feature details page
     */
    public function show(Feature $feature): Response
    {
        $feature = $feature->load('comments.user')->loadAuthUserVoteFeature()->loadFeatureUpvoteCount();

        return Inertia::render('Feature/Show', ['feature' => new FeatureResource($feature), 'comments' => Inertia::defer(fn () => CommentResource::collection($feature->comments()))]);
    }

    /**
     * Show the edit feature page
     */
    public function edit(Feature $feature): Response
    {
        $feature->load('comments.user')->loadAuthUserVoteFeature();

        return Inertia::render('Feature/Edit', ['feature' => new FeatureResource($feature)]);
    }

    /**
     * Handle the incoming request to update a feature in the database
     */
    public function update(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:5'],
            'description' => ['nullable', 'string'],
        ]);

        $feature->update($data);

        return to_route('feature.index')->with('success', 'Feature updated successfully');
    }

    /**
     * Handle the incoming request to delete a feature in the database
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();

        return to_route('feature.index')->with('success', 'Feature deleted succesfully');
    }
}
