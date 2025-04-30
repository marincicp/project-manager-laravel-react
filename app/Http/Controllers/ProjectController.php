<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectStoreRequest;
use App\Http\Requests\ProjectUpdateRequest;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\ProjectStatusResource;
use App\Models\Project;
use App\Models\ProjectStatus;
use App\Repositories\ProjectRepository;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(private ProjectRepository $projectRepo) {}

    /**
     * Show a list of all projects
     */
    public function index(): Response
    {
        $projects = Project::with(['user', 'status', 'comments.user'])->latest()->paginate(15);

        return Inertia::render('Project/Index', ['projects' => ProjectResource::collection($projects)]);
    }

    /**
     * Show the project detail page
     */
    public function show(Project $project): Response
    {
        $project->load(relations: ['user', 'status', 'comments.user',  'features' => function ($query) {
            $query->with(['user', 'comments'])->withUpvoteCount()->withAuthUserUpvotes();
        }]);

        return Inertia::render('Project/Show', ['project' => new ProjectResource($project), 'features' => FeatureResource::collection($project->features)]);
    }

    /**
     * Show the project edit page
     */
    public function edit(Project $project)
    {
        $statuses = ProjectStatusResource::collection(ProjectStatus::all());

        return Inertia::render('Project/Edit', ['project' => new ProjectResource($project), 'statuses' => $statuses]);
    }

    /**
     * Handle the request to update a project in the database
     */
    public function update(ProjectUpdateRequest $request, Project $project): RedirectResponse
    {
        $data = $request->validated();

        $project->update($data);

        return to_route('project.show', $project)->with('success', 'Project updated successfully');
    }

    /**
     * Show the create project page
     */
    public function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Store newly created project in the database
     */
    public function store(ProjectStoreRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $this->projectRepo->create($data);

        return to_route('project.index')->with('success', 'Project has been successfully created');
    }

    /**
     * Handle the request to delete a project in the database
     */
    public function destroy(Project $project): RedirectResponse
    {

        $project->delete();

        return to_route('project.index')->with('success', 'Project successfully deleted');
    }
}
