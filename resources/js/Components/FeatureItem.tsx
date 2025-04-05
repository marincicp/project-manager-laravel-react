import { Feature } from "@/types";
import { FeatureActionDropdown, FeatureUpvoteDownvote } from "./index";

import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpended] = useState<boolean>(false);

    return (
        <div className="mb-4  bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                {/* <div className="flex flex-col items-center">
                    <VoteButton
                        isDisabled={processing}
                        onClick={() => handleUpvote(feature.id)}
                        type={VoteBtnType.ArrowUp}
                        isClicked={feature.user_has_upvoted}
                    />
                    <span>{feature.upvote_count}</span>

                    <VoteButton
                        isClicked={feature.user_has_downvoted}
                        isDisabled={processing}
                        onClick={() => handleUpvote(feature)}
                        type={VoteBtnType.ArrowDown}
                    />
                </div> */}

                <FeatureUpvoteDownvote feature={feature} />

                <div className="flex-1">
                    <h2 className="text-xl mb-2 ">
                        <Link href={route("feature.show", feature)}>
                            {feature.name}
                        </Link>
                    </h2>

                    {feature.description && (
                        <>
                            <p className=" text-gray-400">
                                {isExpanded
                                    ? feature?.description
                                    : feature?.description.slice(0, 500) +
                                      "..."}
                            </p>

                            <button
                                className="text-amber-500 hover:underline"
                                onClick={() => setIsExpended((prev) => !prev)}
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </button>
                        </>
                    )}
                </div>
                <div>
                    <FeatureActionDropdown feature={feature} />
                </div>
            </div>
        </div>
    );
}
