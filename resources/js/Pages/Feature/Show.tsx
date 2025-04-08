import {
    AuthenticatedLayout,
    Divider,
    FeatureUpvoteDownvote,
    NewCommentForm,
} from "@/Components";
import CommentItem from "@/Components/CommentItem";
import { Feature } from "@/types";
import { Head, Link } from "@inertiajs/react";

export default function Show({ feature }: { feature: Feature }) {
    const audio = new Audio();

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Feature : <b>{feature.name}</b>
                </h2>
            }
        >
            <Head title={"Feature " + feature.name} />
            <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                <div className="flex justify-end p-2 gap-2">
                    <Link
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 "
                        href={route("feature.edit", feature)}
                    >
                        Edit
                    </Link>

                    <Link
                        className=" 
                inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-red-500 dark:text-gray-800 dark:hover:bg-red-400 dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                        href={route("feature.destroy", feature)}
                        method="delete"
                        as="button"
                    >
                        Delete
                    </Link>
                </div>
                <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                    <FeatureUpvoteDownvote feature={feature} audio={audio} />
                    <div className="flex-1">
                        <p>Feature title:</p>
                        <h2 className="text-xl mb-2 text-gray-400">
                            {feature.name}
                        </h2>
                        <p>Feature description:</p>
                        <p className="text-gray-400">{feature.description}</p>
                        <Divider />
                        <div className="mt-2">
                            <NewCommentForm feature={feature} />
                        </div>

                        <Divider />

                        <div>
                            {feature.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
