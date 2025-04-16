import { formatDate } from "@/helpers";
import { User } from "@/types";
import { Link } from "@inertiajs/react";

export default function UsersTableRow({
    user,
    roleLabels,
}: {
    user: User;
    roleLabels: Record<string, string>;
}) {
    console.log(user);
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {user.name}
            </th>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{formatDate(user.created_at)}</td>
            <td className="px-6 py-4">{roleLabels[user.roles[0]]}</td>
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
}
