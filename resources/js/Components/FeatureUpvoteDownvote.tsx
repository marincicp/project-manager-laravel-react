import { Feature } from "@/types";
import { VoteButton } from "./";
import { VoteBtnType } from "@/Enums/VoteBtnType";
import { useForm } from "@inertiajs/react";

export default function FeatureUpvoteDownvote({
    feature,
    audio,
}: {
    feature: Feature;
    audio: HTMLAudioElement;
}) {
    const upvoteForm = useForm({
        upvote: true,
        feature_id: feature.id,
    });

    const downvoteForm = useForm({
        upvote: false,
        feature_id: feature.id,
    });

    function handleUpvoteDownvote(upvote: boolean) {
        if (
            (feature.user_has_upvoted && upvote) ||
            (feature.user_has_downvoted && !upvote)
        ) {
            audio.src = "/sounds/delete.mp3";
            audio.play();
            downvoteForm.delete(route("upvote.destroy", feature), {
                preserveScroll: true,
                preserveState: true,
            });
        } else {
            const form = upvote ? upvoteForm : downvoteForm;
            audio.src = "/sounds/like.mp3";
            audio.play();

            form.post(route("upvote.store", feature), {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }

    return (
        <div className="flex flex-col items-center">
            <VoteButton
                isDisabled={upvoteForm.processing}
                onClick={() => handleUpvoteDownvote(true)}
                type={VoteBtnType.ArrowUp}
                isClicked={feature.user_has_upvoted}
            />
            <span>{feature.upvote_count}</span>

            <VoteButton
                isClicked={feature.user_has_downvoted}
                isDisabled={upvoteForm.processing}
                onClick={() => handleUpvoteDownvote(false)}
                type={VoteBtnType.ArrowDown}
            />
        </div>
    );
}
