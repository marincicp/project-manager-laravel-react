import { VoteBtnType } from "@/Enums/VoteBtnType";
import { Feature } from "@/types";
import { useForm } from "@inertiajs/react";

export default function VoteButton({
    type,
    isDisabled,
    isClicked = false,
    onClick,
}: {
    type: VoteBtnType;
    isDisabled: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    isClicked: boolean;
}) {
    const btnColor = isClicked ? "orange" : "currentColor";

    return (
        <button disabled={isDisabled} onClick={onClick}>
            {type === VoteBtnType.ArrowUp ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={btnColor}
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke={btnColor}
                    className="size-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                </svg>
            )}
        </button>
    );
}
