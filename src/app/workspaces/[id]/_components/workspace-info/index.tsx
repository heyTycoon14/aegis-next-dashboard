"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { compactFormat, standardFormat } from "@/lib/format-number";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function WorkspaceInfo({ className }: { className?: string }) {
  const { id } = useParams();

  const [workspace, setWorkspace] = useState<WorkspaceType>();

  const { data: session } = useSession();

  const fetchWorkspace = () => {
    fetch(`/api/workspace/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.workspace) setWorkspace(data.workspace);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  };

  useEffect(() => {
    if (id) fetchWorkspace();
  }, [id]);

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Workspace {id}
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none uppercase [&>th]:text-center">
            <TableHead className="!text-left">ID</TableHead>
            <TableHead>UUID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="!text-right">Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="text-center text-base font-medium text-dark dark:text-white">
            <TableCell className="flex min-w-fit items-center gap-3">
              <div className="">{workspace?.id}</div>
            </TableCell>

            <TableCell>{workspace?.uuid}</TableCell>
            <TableCell>{workspace?.name}</TableCell>

            <TableCell className="!text-right text-green-light-1">
              {workspace?.slug}
            </TableCell>

            <TableCell>
              {workspace?.is_disabled || workspace?.is_removed
                ? "Disabled"
                : "Active"}
            </TableCell>

            <TableCell>
              {workspace?.created_at
                ? new Date(workspace.created_at).toLocaleDateString()
                : "N/A"}
            </TableCell>
            <TableCell>
              {workspace?.updated_at
                ? new Date(workspace.updated_at).toLocaleDateString()
                : "N/A"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
