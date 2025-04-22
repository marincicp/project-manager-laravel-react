import { AuthenticatedLayout, ProjectItem } from "@/Components";
import FeatureItem from "@/Components/FeatureItem";
import { UserPermission } from "@/Enums/UserPermissions";
import { can } from "@/helpers";
import { Feature, PaginatedData, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Index({
    projects,
}: {
    projects: PaginatedData<Project>;
}) {
    console.log(projects, "ww");
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Projects
                </h2>
            }
        >
            <Head title="Features" />
            {can(UserPermission.MANAGE_FEATURES) && (
                <div className="mb-8">
                    <Link
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 "
                        href={route("project.create")}
                    >
                        Create New Project
                    </Link>
                </div>
            )}

            {projects.data.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </AuthenticatedLayout>
    );
}
