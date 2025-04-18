// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  if (req.method == "GET") {
    const pathSegments = req.nextUrl.pathname.split("/");
    const id = pathSegments[pathSegments.indexOf("workspace") + 1];

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/workspaces/${id}/domains`,
        {
          headers: {
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      );
      const domains = data.domains;
      return NextResponse.json({ domains }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}

export { handler as GET };
