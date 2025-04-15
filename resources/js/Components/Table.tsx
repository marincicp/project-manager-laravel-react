import { formatDate } from "@/helpers";
import { User } from "@/types";
import { Link } from "@inertiajs/react";

export function Table({ users }: { users: User[] }) {
    const header = ["Name", "Email", "Created At", "Roles", "Actions"];

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {header.map((item) => {
                            return (
                                <th
                                    key={item}
                                    scope="col"
                                    className="px-6 py-3"
                                >
                                    {item}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: User) => {
                        return (
                            <tr
                                key={user.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {user.name}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">
                                    {formatDate(user.created_at)}
                                </td>
                                <td className="px-6 py-4">{user.roles}</td>
                                <td className="px-6 py-4">
                                    <Link
                                        href={route("user.edit", user.id)}
                                        className="text-blue-500"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
