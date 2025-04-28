import {
    AuthenticatedLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    StatusLabel,
    TextAreaInput,
    TextInput,
} from "@/Components";
import FeatureItem from "@/Components/FeatureItem";
import { Feature, PaginatedData, Project, ProjectDropdown } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Create({
    projects,
}: {
    projects: { data: ProjectDropdown[] };
}) {
    const { data, setData, processing, errors, post } = useForm({
        name: "",
        description: "",
        project_id: "",
    });
    console.log(projects);
    function handleCreateFeature(e: React.FormEvent<Element>) {
        e.preventDefault();

        post(route("feature.store"), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Crate New Feature
                </h2>
            }
        >
            <Head title="Create New Feature" />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                    <form onSubmit={handleCreateFeature} className="w-full">
                        <div className="mb-8">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-8">
                            <InputLabel
                                htmlFor="description"
                                value="Description"
                            />

                            <TextAreaInput
                                id="description"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.description}
                                className="mt-2"
                            />
                        </div>

                        <div className="mb-8 flex flex-col">
                            <label htmlFor="status">Select project</label>
                            <select
                                onChange={(e) =>
                                    setData("project_id", e.target.value)
                                }
                                id="status"
                                name="status"
                                className={
                                    "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 mt-2"
                                }
                            >
                                <option value="">Select a project...</option>
                                {projects.data.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name} ({project.status})
                                    </option>
                                ))}
                            </select>
                            <InputError
                                message={errors.project_id}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <PrimaryButton disabled={processing}>
                                Create
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
