"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { notify } from "@/utils/notifications";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const NewWorkspaceComponent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    slug: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    fetch("/api/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify({
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
          router.push("/workspaces/list");
        }
      })
      .catch((error) => {
        console.error("Error creating workspace:", error);
      });
  };

  return (
    <div className="space-y-10">
      <ShowcaseSection title="Workspace Detail" className="space-y-5.5 !p-6.5">
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
          <div className="w-full px-3">
            <button
              className="block w-full rounded-[7px] border border-primary bg-primary p-[11px] text-center font-medium text-white transition hover:bg-opacity-90"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </ShowcaseSection>
    </div>
  );
};

export default NewWorkspaceComponent;
