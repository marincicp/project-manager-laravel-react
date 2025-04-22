import { StatusLabelColor } from "@/Enums/StatusLabelColor";

export default function StatusLabel({ status }: { status: string }) {
    const bgClass = StatusLabelColor[status as keyof typeof StatusLabelColor];
    return (
        <div>
            <p
                className={`${bgClass} size-max py-2 px-4 rounded-lg text-xs uppercase font-semibold tracking-wide`}
            >
                {status}
            </p>
        </div>
    );
}
