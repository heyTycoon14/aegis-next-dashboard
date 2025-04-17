"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import dayjs from "dayjs";
import { DownloadIcon, PreviewIcon } from "../Tables/icons";
import { ActivateDeactivateIcon, EditIcon, TrashIcon } from "@/assets/icons";
import { getInvoiceTableData } from "../Tables/fetch";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import InputGroup from "../FormElements/InputGroup";
import { notify } from "@/utils/notifications";

const WorkspacesComponent = () => {
  const [data, setData] = useState({
    name: "",
    slug: "",
  });
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceType>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [workspaceToDelete, setWorkspaceToDelete] = useState<number | null>(
    null,
  );

  const fetchWorkspaces = () => {
    setLoading(true);
    fetch("/api/workspace", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWorkspaces(data.workspaces);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching workspaces:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (session?.token) {
      fetchWorkspaces();
    }
  }, [session?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async () => {
    fetch("/api/workspace", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({
        id: selectedWorkspace?.id,
        name: data.name,
        slug: data.slug,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          notify({
            type: "Success",
            message: "Success",
            description: "Successfully updated workspace details",
          });
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.map((workspace) =>
              workspace.id === selectedWorkspace?.id ? data.data : workspace,
            ),
          );
        }
        setIsEditOpen(false);
      })
      .catch((error) => {
        console.error("Error saving workspace:", error);
        setIsEditOpen(false);
      });
  };

  const handleRemove = async () => {
    if (!workspaceToDelete) return;

    fetch("/api/workspace", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({
        id: workspaceToDelete,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        notify({
          type: "Success",
          message: "Success",
          description: "Successfully removed workspace",
        });
        setWorkspaces((prevWorkspaces) =>
          prevWorkspaces.filter(
            (workspace) => workspace.id !== workspaceToDelete,
          ),
        );
        setIsDeleteConfirmOpen(false);
        setWorkspaceToDelete(null);
      })
      .catch((error) => {
        console.error("Error removing workspace:", error);
        setIsDeleteConfirmOpen(false);
        setWorkspaceToDelete(null);
      });
  };

  const handleTogggle = async (index: number) => {
    console.log(index, "here");
    fetch("/api/workspace", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({
        id: workspaces[index].id,
        action: workspaces[index].is_disabled == 1 ? "enable" : "disable",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data.success) {
          notify({
            type: "Success",
            message: "Success",
            description: "Successfully updated workspace status",
          });
          setWorkspaces((prevWorkspaces) =>
            prevWorkspaces.map((workspace) =>
              workspace.id === workspaces[index].id
                ? {
                    ...workspace,
                    is_disabled: workspace.is_disabled === 1 ? 0 : 1,
                  }
                : workspace,
            ),
          );
        }
      })
      .catch((error) => {
        console.error("Error toggling workspace:", error);
      });
  };

  return (
    <div className="space-y-10">
      <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
              <TableHead className="min-w-[20px] xl:pl-7.5">Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Disabled</TableHead>
              <TableHead>Removed</TableHead>
              <TableHead className="text-right xl:pr-7.5">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {workspaces.map((item, index) => (
              <TableRow
                key={index}
                className="border-[#eee] dark:border-dark-3"
              >
                <TableCell className="min-w-[20px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item.id}</h5>
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item.name}</h5>
                </TableCell>

                <TableCell className="min-w-[155px] xl:pl-7.5">
                  <h5 className="text-dark dark:text-white">{item.slug}</h5>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {dayjs(item.created_at).format("MMM DD, YYYY")}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="text-dark dark:text-white">
                    {dayjs(item.updated_at).format("MMM DD, YYYY")}
                  </p>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]":
                          item.is_disabled === 1,
                        "bg-[#D34053]/[0.08] text-[#D34053]":
                          item.is_disabled === 0,
                        // "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                        //   item.status === "Pending",
                      },
                    )}
                  >
                    {item.is_disabled ? "Yes" : "No"}
                  </div>
                </TableCell>

                <TableCell>
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]":
                          item.is_removed === 1,
                        // "bg-[#D34053]/[0.08] text-[#D34053]":
                        //   item.is_removed === 0,
                        "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                          item.is_removed === 0,
                      },
                    )}
                  >
                    {item.is_removed ? "Yes" : "No"}
                  </div>
                </TableCell>

                <TableCell className="xl:pr-7.5">
                  <div className="flex items-center justify-end gap-x-3.5">
                    <button
                      className="hover:text-primary"
                      onClick={() => {
                        setSelectedWorkspace(item);
                        setData({
                          name: item.name,
                          slug: item.slug,
                        });
                        setIsEditOpen(true);
                      }}
                    >
                      <span className="sr-only">Edit Workspace</span>
                      <EditIcon />
                    </button>

                    <button
                      className="hover:text-primary"
                      onClick={() => handleTogggle(index)}
                    >
                      <span className="sr-only">
                        Activate/Deactivate Workspace
                      </span>
                      <ActivateDeactivateIcon />
                    </button>

                    <button
                      className="hover:text-primary"
                      disabled={item.is_disabled == 1}
                      onClick={() => {
                        setWorkspaceToDelete(item.id);
                        setIsDeleteConfirmOpen(true);
                      }}
                    >
                      <span className="sr-only">Remove Workspace</span>
                      <TrashIcon />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {isEditOpen && (
        <div role="presentation" className="fixed inset-0 z-50">
          <div
            className="animate-fade-in fixed inset-0 bg-[rgba(94,93,93,0.25)] backdrop-blur-sm"
            role="presentation"
          ></div>
          <div
            className="animate-zoom-in fixed left-[50%] top-[50%] z-50 h-full max-h-fit w-full max-w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-[15px] bg-white px-8 py-12 text-center shadow-3 dark:bg-gray-dark dark:shadow-card max-sm:max-w-[90vw] md:px-15 md:py-15"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
          >
            <h3 className="pb-4 text-xl font-bold text-dark dark:text-white sm:text-2xl">
              Edit Workspace details
            </h3>
            <span className="mx-auto mb-5.5 inline-block h-[3px] w-22.5 rounded-[2px] bg-primary"></span>
            <InputGroup
              type="text"
              label="Workspace Name"
              className="mb-4 [&_input]:py-[15px]"
              placeholder="Enter workspace name"
              name="name"
              handleChange={handleChange}
              value={data.name}
            />
            <InputGroup
              type="text"
              label="Workspace Slug"
              className="mb-4 [&_input]:py-[15px]"
              placeholder="Enter workspace slug"
              name="slug"
              handleChange={handleChange}
              value={data.slug}
            />
            <div className="-mx-2.5 flex flex-wrap gap-y-4">
              <div className="w-full px-2.5 2xsm:w-1/2">
                <button
                  className="block w-full rounded-[7px] border border-stroke bg-gray-2 p-[11px] text-center font-medium text-dark transition hover:border-gray-3 hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:border-dark-4 dark:hover:bg-dark-4"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </button>
              </div>
              <div className="w-full px-3 2xsm:w-1/2">
                <button
                  className="block w-full rounded-[7px] border border-primary bg-primary p-[11px] text-center font-medium text-white transition hover:bg-opacity-90"
                  onClick={handleEdit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDeleteConfirmOpen && (
        <div role="presentation" className="fixed inset-0 z-50">
          <div
            className="animate-fade-in fixed inset-0 bg-[rgba(94,93,93,0.25)] backdrop-blur-sm"
            role="presentation"
          ></div>
          <div
            className="animate-zoom-in fixed left-[50%] top-[50%] z-50 h-full max-h-fit w-full max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-[15px] bg-white px-8 py-12 text-center shadow-3 dark:bg-gray-dark dark:shadow-card max-sm:max-w-[90vw] md:px-15 md:py-15"
            role="dialog"
            aria-modal="true"
          >
            <h3 className="pb-4 text-xl font-bold text-dark dark:text-white sm:text-2xl">
              Confirm Deletion
            </h3>
            <p className="mb-5 text-dark dark:text-white">
              Are you sure you want to delete this workspace?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="rounded-[7px] border border-stroke bg-gray-2 px-4 py-2 text-dark hover:bg-gray-3 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:hover:bg-dark-4"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-[7px] border border-primary bg-primary px-4 py-2 text-white hover:bg-opacity-90"
                onClick={handleRemove}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspacesComponent;
