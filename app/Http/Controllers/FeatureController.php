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
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $features = Feature::with("user")->latest()->paginate(5);

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
     * Store a newly created resource in storage.
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
     * Display the specified resource.
     */
    public function show(Feature $feature): Response
    {
        return Inertia::render("Feature/Show", ["feature" => new FeatureResource($feature)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature): Response
    {
        return Inertia::render("Feature/Edit", ["feature" => new FeatureResource($feature)]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature): RedirectResponse
    {
        $data = $request->validate([

            "name" => ["required", "string", "min:5"],
            "description" => ["nullable", "string"]
        ]);

        $feature->update($data);

        return to_route("feature.show")->with("success", "Feature updated successfully");
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature): RedirectResponse
    {
        $feature->delete();
        return to_route("feature.inex")->with("Feature deleted succesfully");
    }
}
