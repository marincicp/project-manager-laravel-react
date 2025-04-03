import { Feature } from "@/types";
import { VoteButton } from "./index";
import { VoteBtnType } from "@/Enums/VoteBtnType";
import { useState } from "react";

export default function FeatureItem({ feature }: { feature: Feature }) {
    const [isExpanded, setIsExpended] = useState<boolean>(false);

    return (
        <div className="mb-4 overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100 flex gap-8  transition-all duration-300">
                <div className="flex flex-col items-center">
                    <VoteButton type={VoteBtnType.ArrowUp} />
                    <span>12</span>

                    <VoteButton type={VoteBtnType.ArrowDown} />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl mb-2">{feature.name}</h2>

                    <p className="">
                        {isExpanded
                            ? feature.description
                            : feature.description.slice(0, 500) + "..."}
                    </p>

                    <button
                        className="text-amber-500 hover:underline"
                        onClick={() => setIsExpended((prev) => !prev)}
                    >
                        {isExpanded ? "Read Less" : "Read More"}
                    </button>
                </div>
            </div>
        </div>
    );
}
