import { usePage } from "@inertiajs/react";
import { User } from "./types";
import { UserRoles } from "./Enums/UserRoles";

function getAuthUser() {
    const { user } = usePage().props.auth;

    return user;
}

export function can(permission: string) {
    return getAuthUser().permissions?.includes(permission);
}

export function hasRole(role: string) {
    return getAuthUser().roles?.includes(role);
}

export function canManageComments(commentOwner: User) {
    return hasRole(UserRoles.ADMIN) || commentOwner.id === getAuthUser().id;
}
