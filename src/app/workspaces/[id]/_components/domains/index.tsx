"use client";

import { ActivateDeactivateIcon, EditIcon, TrashIcon } from "@/assets/icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Domains() {
  const { id } = useParams();
  const [domains, setDomains] = useState<DomainType[]>([]);
  const { data: session } = useSession();

  const fetchDomains = () => {
    fetch(`/api/workspace/${id}/domains`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.domains) setDomains(data.domains);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
      });
  };

  useEffect(() => {
    if (id) fetchDomains();
  }, [id]);

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Domains
        </h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-t text-base [&>th]:h-auto [&>th]:py-3 sm:[&>th]:py-4.5">
            <TableHead className="pl-5 sm:pl-6 xl:pl-7.5">Id</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Protocol</TableHead>
            <TableHead>Main</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Removed</TableHead>
            <TableHead>Is Up</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead>Uptime StatusCode</TableHead>
            <TableHead>Uptime Redirect</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            {/* <TableHead className="pr-5 text-right sm:pr-6 xl:pr-7.5">
              Actions
            </TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {domains.map((domain, idx) => (
            <TableRow
              className="text-base font-medium text-dark dark:text-white"
              key={idx}
            >
              <TableCell className="flex min-w-fit items-center gap-3 pl-5 sm:pl-6 xl:pl-7.5">
                <div>{domain.id}</div>
              </TableCell>

              <TableCell>{domain.url}</TableCell>
              <TableCell>{domain.protocol}</TableCell>
              <TableCell>{domain.is_main ? "Main" : ""}</TableCell>
              <TableCell>
                {domain.is_disabled ? "Enabled" : "Disabled"}
              </TableCell>
              <TableCell>{domain.is_removed ? "Yes" : "No"}</TableCell>
              <TableCell>{domain.is_up ? "Yes" : "No"}</TableCell>
              <TableCell>
                {domain?.uptime
                  ? new Date(domain.uptime).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>{domain.uptime_statuscode}</TableCell>
              <TableCell>{domain.uptime_redirect}</TableCell>
              <TableCell>
                {domain?.created_at
                  ? new Date(domain.created_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                {domain?.updated_at
                  ? new Date(domain.updated_at).toLocaleDateString()
                  : "N/A"}
              </TableCell>

              {/* <TableCell className="pr-5 text-right text-green-light-1 sm:pr-6 xl:pr-7.5">
                <div className="flex items-center justify-end gap-x-3.5">
                  <button className="hover:text-primary">
                    <span className="sr-only">Edit Domain</span>
                    <EditIcon />
                  </button>

                  <button className="hover:text-primary">
                    <span className="sr-only">Activate/Deactivate Domain</span>
                    <ActivateDeactivateIcon />
                  </button>

                  <button
                    className="hover:text-primary"
                    disabled={domain.is_removed == 1}
                  >
                    <span className="sr-only">Remove Domain</span>
                    <TrashIcon />
                  </button>
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
