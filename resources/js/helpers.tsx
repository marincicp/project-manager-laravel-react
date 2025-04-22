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

export function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export function formatInputDate(dateStr: string) {
    const date = new Date(dateStr);
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}
