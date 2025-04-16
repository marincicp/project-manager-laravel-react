import {
    AuthenticatedLayout,
    InputError,
    InputLabel,
    PrimaryButton,
    Radio,
    TextInput,
} from "@/Components";
import { Role, User } from "@/types";
import { Head, useForm } from "@inertiajs/react";

export default function Edit({
    user,
    roles,
    roleLabels,
}: {
    user: User;
    roles: Role[];
    roleLabels: Record<string, string>;
}) {
    const { data, setData, processing, errors, put } = useForm({
        name: user.name,
        email: user.email,
        roles: user.roles,
    });
    function handleUserEdit(e: React.FormEvent<Element>) {
        e.preventDefault();

        put(route("user.update", user.id), { preserveScroll: true });
    }
    function handleOnRoleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const roleName = e.target.value;

        setData("roles", [roleName]);
        console.log(data.roles, "data");
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit user: {user.name}
                </h2>
            }
        >
            <Head title="Edit user" />

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                    <form onSubmit={handleUserEdit} className="w-full">
                        <div className="mb-8">
                            <InputLabel htmlFor="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                disabled
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-8">
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="name"
                                disabled
                                value={data.email}
                                className="mt-1 block w-full"
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <div className="mt-4 block">
                            <InputLabel htmlFor="roles" value="Role" />
                            {roles.map((role) => {
                                return (
                                    <label
                                        key={role.id}
                                        className="flex items-center mb-2 mt-2"
                                    >
                                        <Radio
                                            name="roles"
                                            value={role.name}
                                            checked={data.roles?.includes(
                                                role.name
                                            )}
                                            onChange={handleOnRoleChange}
                                        />
                                        <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
                                            {roleLabels[role.name]}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="mt-4 ">
                            <PrimaryButton
                                className="ms-4"
                                disabled={processing}
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
