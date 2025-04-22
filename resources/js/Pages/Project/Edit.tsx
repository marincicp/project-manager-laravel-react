import {
    AuthenticatedLayout,
    Dropdown,
    InputError,
    InputLabel,
    PrimaryButton,
    TextAreaInput,
    TextInput,
} from "@/Components";
import { formatInputDate } from "@/helpers";
import { Feature, Project, ProjectStatus } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import moment from "moment";

export default function Edit({
    project,
    statuses,
}: {
    project: Project;
    statuses: ProjectStatus[];
}) {
    const { data, setData, processing, errors, put } = useForm({
        name: project.name,
        description: project?.description || "",
        start_date: project?.start_date || "",
        due_date: project?.due_date || "",
        status_id: project?.status.id || "",
    });

    console.log(statuses);
    function handleEditProject(e: React.FormEvent<Element>) {
        e.preventDefault();

        put(route("project.update", project), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit project: {project.name}
                </h2>
            }
        >
            <Head title="Edit project" />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                    <form onSubmit={handleEditProject} className="w-full">
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
                                value={data?.description || ""}
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
                        <div className="mb-8 flex gap-20">
                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="start_date"
                                    value="Start Date"
                                />

                                <TextInput
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={moment(data.start_date).format(
                                        "YYYY-MM-DD"
                                    )}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("start_date", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.start_date}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex-1">
                                <InputLabel
                                    htmlFor="due_date"
                                    value="Due Date"
                                />

                                <TextInput
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    value={moment(data.due_date).format(
                                        "YYYY-MM-DD"
                                    )}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("due_date", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.due_date}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="mb-8 flex flex-col">
                            <label htmlFor="status">Change status</label>
                            <select
                                onChange={(e) =>
                                    setData("status_id", e.target.value)
                                }
                                id="status"
                                name="status"
                                className={
                                    "rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-indigo-600 dark:focus:ring-indigo-600 mt-2"
                                }
                                defaultValue={project.status.id}
                            >
                                {statuses.data.map((status) => (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <PrimaryButton disabled={processing}>
                                Edit
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
