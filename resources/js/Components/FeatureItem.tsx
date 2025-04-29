import { useState } from "react";
import { Feature } from "@/types";
import {
    FeatureActionDropdown,
    FeatureUpvoteDownvote,
    StatusLabel,
} from "./index";
import { Link } from "@inertiajs/react";

export default function FeatureItem({
    feature,
    audio,
}: {
    feature: Feature;
    audio: HTMLAudioElement;
}) {
    const [isExpanded, setIsExpended] = useState<boolean>(false);
    return (
        <div className="mb-4  bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                <FeatureUpvoteDownvote feature={feature} audio={audio} />

                <div className="flex-1">
                    <h2 className="text-xl mb-2 ">
                        <Link href={route("feature.show", feature)}>
                            {feature.name}
                        </Link>
                    </h2>

                    <div className="mt-2">
                        <p className=" text-gray-400">
                            Project name: {feature.project.name}
                        </p>
                    </div>
                    {feature.description &&
                        (feature.description.length > 200 ? (
                            <>
                                <p className="text-gray-400">
                                    Description:{" "}
                                    {isExpanded
                                        ? feature?.description
                                        : feature?.description.slice(0, 500) +
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
                                Description: {feature.description}
                            </p>
                        ))}

                    <div className="p-2">
                        <Link
                            className="inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-600 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300"
                            href={route("feature.show", feature)}
                        >
                            Comments
                        </Link>
                    </div>
                </div>
                <div>
                    <FeatureActionDropdown feature={feature} />
                </div>
            </div>
        </div>
    );
}
