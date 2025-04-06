import { useState } from "react";
import { Feature } from "@/types";
import { FeatureActionDropdown, FeatureUpvoteDownvote } from "./index";
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

                    {feature.description &&
                        (feature.description.length > 200 ? (
                            <>
                                <p className=" text-gray-400">
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
                                {feature.description}
                            </p>
                        ))}
                </div>
                <div>
                    <FeatureActionDropdown feature={feature} />
                </div>
            </div>
        </div>
    );
}
