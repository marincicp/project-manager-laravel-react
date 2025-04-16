import { formatDate } from "@/helpers";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import UsersTableRow from "./UsersTableRow";

export default function UsersTable({
    users,
    roleLabels,
}: {
    users: User[];
    roleLabels: Record<string, string>;
}) {
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
                    {users.map((user: User) => (
                        <UsersTableRow
                            key={user.id}
                            user={user}
                            roleLabels={roleLabels}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
