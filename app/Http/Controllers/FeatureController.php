<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    /**
     * Show all features page
     * @return Response
     */
    public function index(): Response
    {
        $features = Feature::with(["user"])->withAuthUserUpvotes()->withCount([
            "upvotes as upvote_count" => function ($query) {
                $query->where("upvote", true);
            }
        ])->latest()->paginate(5);

        return Inertia::render("Feature/Index", ["features" => FeatureResource::collection($features)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render("Feature/Create");
    }

    /**
     * Store a newly created feature in the database
     * @param \Illuminate\Http\Request $request
     * @return RedirectResponse
     */
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            "name" => ["string", "min:5", "max:500", "required"],
            "description" => ["nullable", "string"],
        ]);

        $data["user_id"] = Auth::user()->id;

        Feature::create($data);

        return to_route("feature.index")->with("succes", "Feature created successfully");
    }

    /**
     * Show a feature details page
     * @param \App\Models\Feature $feature
     * @return Response
     */
    public function show(Feature $feature): Response
    {
        return Inertia::render("Feature/Show", ["feature" => new FeatureResource($feature->loadAuthUserVoteFeature()->loadFeatureUpvoteCount())]);
    }

    /**
     * Show the edit feature page
     * @param \App\Models\Feature $feature
     * @return Response
     */
    public function edit(Feature $feature): Response
    {
        return Inertia::render("Feature/Edit", ["feature" => new FeatureResource($feature->loadAuthUserVoteFeature())]);
    }

    /**
     * Handle the incoming request to update a feature in the database
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Feature $feature
     * @return RedirectResponse
     */
    public function update(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([
            "name" => ["required", "string", "min:5"],
            "description" => ["nullable", "string"]
        ]);

        $feature->update($data);

        return to_route("feature.index")->with("success", "Feature updated successfully");
    }



    /**
     * Handle the incoming request to delete a feature in the database
     * @param \App\Models\Feature $feature
     * @return RedirectResponse
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();
        return to_route("feature.index")->with("success", "Feature deleted succesfully");
    }
}
