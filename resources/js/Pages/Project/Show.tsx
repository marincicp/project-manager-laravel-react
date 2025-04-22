import {
    AuthenticatedLayout,
    Divider,
    FeatureUpvoteDownvote,
    NewCommentForm,
    StatusLabel,
} from "@/Components";
import CommentItem from "@/Components/CommentItem";
import { StatusLabelColor } from "@/Enums/StatusLabelColor";
import { UserPermission } from "@/Enums/UserPermissions";
import { can, formatDate } from "@/helpers";
import { Feature, Project } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Show({ project }: { project: Project }) {
    console.log(project);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Project : <b>{project.name}</b>
                </h2>
            }
        >
            <Head title={"Project " + project.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                {can(UserPermission.MANAGE_FEATURES) && (
                    <div className="flex justify-end p-2 gap-2">
                        <Link
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 "
                            href={route("project.edit", project)}
                        >
                            Edit
                        </Link>

                        <Link
                            className=" 
      inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-red-500 dark:text-gray-800 dark:hover:bg-red-400 dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            href={route("project.destroy", project)}
                            method="delete"
                            as="button"
                        >
                            Delete
                        </Link>
                    </div>
                )}
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                    <div className="flex-1">
                        <p>Project title:</p>
                        <h2 className="text-xl mb-2 text-gray-400">
                            {project.name}
                        </h2>
                        <p className="mt-4">Project description:</p>
                        <p className="text-gray-400">
                            {project.description ?? "-"}
                        </p>
                        <p className="mt-4">Created by:</p>
                        <p className="text-gray-400">{project.user.name}</p>
                        <p className="mt-4">Start date:</p>
                        <p className="text-gray-400">
                            {project?.start_date
                                ? formatDate(project?.start_date)
                                : "-"}
                        </p>
                        <p className="mt-4">Due date:</p>
                        <p className="text-gray-400">
                            {project?.due_date
                                ? formatDate(project?.due_date)
                                : "-"}
                        </p>
                        <p className="mt-4 mb-2">Status:</p>
                        <StatusLabel status={project.status.name} />
                        <Divider />
                        <div className="mt-2">
                            {/* <NewCommentForm feature={feature} /> */}
                        </div>
                        <Divider />
                        {/* <div>
                            {feature.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                asd
            </div>
        </AuthenticatedLayout>
    );
}
