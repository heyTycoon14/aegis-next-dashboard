// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  if (req.method == "GET") {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces`,
        {
          headers: Object.fromEntries(req.headers.entries()),
        },
      );
      const workspaces = data.data;
      return NextResponse.json({ workspaces }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
  if (req.method == "POST") {
    try {
      const body = await req.json();
      const { name, slug } = body;

      if (!name || !slug) {
        return NextResponse.json(
          { error: "Missing required fields: name, or slug" },
          { status: 400 },
        );
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces`,
        { name, slug },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );

      return NextResponse.json({ data: data.data }, { status: 200 });
    } catch (error: any) {
      console.error("Error in POST request:", error);
      // Handle Axios errors specifically
      if (error.response) {
        return NextResponse.json(
          { error: error.response.data || "Backend error" },
          { status: error.response.status || 500 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 },
      );
    }
  }
  if (req.method == "PUT") {
    try {
      const body = await req.json();
      const { id, name, slug } = body;

      if (!id || !name || !slug) {
        return NextResponse.json(
          { error: "Missing required fields: id, name, or slug" },
          { status: 400 },
        );
      }

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces/${id}`,
        { name, slug },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );

      return NextResponse.json({ data: data.data }, { status: 200 });
    } catch (error: any) {
      console.error("Error in PUT request:", error);

      // Handle Axios errors specifically
      if (error.response) {
        return NextResponse.json(
          { error: error.response.data || "Backend error" },
          { status: error.response.status || 500 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 },
      );
    }
  }
  if (req.method == "DELETE") {
    try {
      const body = await req.json();
      const { id } = body;

      if (!id) {
        return NextResponse.json(
          { error: "Missing required fields: id" },
          { status: 400 },
        );
      }

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );

      return NextResponse.json({ data: data.data }, { status: 200 });
    } catch (error: any) {
      console.error("Error in DELETE request:", error);

      // Handle Axios errors specifically
      if (error.response) {
        return NextResponse.json(
          { error: error.response.data || "Backend error" },
          { status: error.response.status || 500 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 },
      );
    }
  }
  if (req.method == "PATCH") {
    try {
      const body = await req.json();
      const { id, action } = body;

      if (!id || !action) {
        return NextResponse.json(
          { error: "Missing required fields: id, or action" },
          { status: 400 },
        );
      }

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces/${id}/${action}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );

      return NextResponse.json({ data }, { status: 200 });
    } catch (error: any) {
      console.error("Error in PATCH request:", error);
      // Handle Axios errors specifically
      if (error.response) {
        return NextResponse.json(
          { error: error.response.data || "Backend error" },
          { status: error.response.status || 500 },
        );
      }

      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 },
      );
    }
  }
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
