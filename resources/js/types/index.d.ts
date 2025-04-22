import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    email_verified_at?: string;
    permissions?: string[];
    roles: string[];
}

export type PaginatedData<T = any> = {
    data: T[];
    links: Record<string, string>;
    // meta: object;
};

export type Comment = {
    id: number;
    created_at: string;
    user: User;
    comment: string;
};

export type Feature = {
    id: number;
    created_at: string;
    description: string;
    name: string;
    user: User;
    upvote_count: number;
    user_has_upvoted: boolean;
    user_has_downvoted: boolean;
    comments: Comment[];
};

export type Project = {
    id: number;
    name: string;
    description: string;
    user: User;
    user_id: string;
    due_date?: string;
    start_date?: string;
    status: ProjectStatus;
};

export type ProjectStatus = {
    id: number;
    name: string;
};

export type Role = {
    created_at: string;
    guard_name: string;
    id: number;
    name: string;
    updated_at: string;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    success: string;
};
