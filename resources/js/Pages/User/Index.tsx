import { AuthenticatedLayout, UsersTable } from "@/Components";
import FeatureItem from "@/Components/FeatureItem";
import { UserPermission } from "@/Enums/UserPermissions";
import { can } from "@/helpers";
import { Feature, PaginatedData, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    users,
    roleLabels,
}: {
    users: PaginatedData<User>;
    roleLabels: Record<string, string>;
}) {
    console.log(roleLabels);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />
            <UsersTable users={users.data} roleLabels={roleLabels} />
        </AuthenticatedLayout>
    );
}
