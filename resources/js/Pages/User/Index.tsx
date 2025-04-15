import { AuthenticatedLayout, Table } from "@/Components";
import FeatureItem from "@/Components/FeatureItem";
import { UserPermission } from "@/Enums/UserPermissions";
import { can } from "@/helpers";
import { Feature, PaginatedData, User } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Index({ users }: { users: PaginatedData<User> }) {
    console.log(users);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />
            <Table users={users.data} />
        </AuthenticatedLayout>
    );
}
