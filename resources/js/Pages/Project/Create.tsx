import {
    AuthenticatedLayout,
    Dropdown,
    InputError,
    InputLabel,
    PrimaryButton,
    TextAreaInput,
    TextInput,
} from "@/Components";
import FeatureItem from "@/Components/FeatureItem";
import { Feature, PaginatedData } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, processing, errors, post } = useForm({
        name: "",
        description: "",
        start_date: "",
        due_date: "",
    });

    function handleCreateFeature(e: React.FormEvent<Element>) {
        e.preventDefault();

        post(route("project.store"), { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create New Project
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
                                    value={data.start_date}
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
                                    value={data.due_date}
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
