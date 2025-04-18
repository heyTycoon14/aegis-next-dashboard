// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  if (req.method == "GET") {
    const id = req.nextUrl.pathname.split("/").pop();
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces/${id}`,
        {
          headers: {
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );
      const workspace = data.workspace;
      return NextResponse.json({ workspace }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export { handler as GET };
