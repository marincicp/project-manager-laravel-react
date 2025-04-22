import { useState } from "react";
import { Project } from "@/types";
import { StatusLabel } from "./index";
import { Link } from "@inertiajs/react";

export default function ProjectItem({ project }: { project: Project }) {
    console.log(project);
    const [isExpanded, setIsExpended] = useState<boolean>(false);
    return (
        <div className="mb-4  bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                <div className="flex-1">
                    <h2 className="text-xl mb-2 ">
                        <Link href={route("project.show", project)}>
                            {project.name}
                        </Link>
                    </h2>

                    {project.description &&
                        (project.description.length > 200 ? (
                            <>
                                <p className="text-gray-400">
                                    {isExpanded
                                        ? project?.description
                                        : project?.description.slice(0, 500) +
                                          "..."}
                                </p>

                                <button
                                    className="text-amber-500 hover:underline"
                                    onClick={() =>
                                        setIsExpended((prev) => !prev)
                                    }
                                >
                                    {isExpanded ? "Read Less" : "Read More"}
                                </button>
                            </>
                        ) : (
                            <p className=" text-gray-400">
                                {project.description}
                            </p>
                        ))}
                    <div className="mt-2">
                        <StatusLabel status={project.status.name} />
                    </div>

                    <div className="p-2">
                        {/* <Link
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-600 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            href={route("project.show", feature)}
                        >
                            Comments
                        </Link> */}
                    </div>
                </div>
                <div>
                    {/* <FeatureActionDropdown feature={feature} />{" "} */}
                </div>
            </div>
        </div>
    );
}
