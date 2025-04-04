import { AuthenticatedLayout } from "@/Components";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const featires = usePage().props;
    console.log(usePage().props);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                    You're logged in!
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
