import { withAuth } from "@/lib/auth";
import { dbConnection } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export const GET = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const { db } = await dbConnection();

      const detailAbout = await db
        .collection("about")
        .findOne({ _id: new ObjectId(id as string) });
      return NextResponse.json(
        {
          message: "Success get detail about",
          data: detailAbout,
        },
        {}
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch about information" },
        { status: 500 }
      );
    }
  }
);

export const PUT = withAuth(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
      const { id } = params;
      const { text } = await req.json();
      const { db } = await dbConnection();
      const result = await db.collection("about").findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            text: text,
            updatedAt: new Date(),
          },
        }
      );
      return NextResponse.json(
        { message: "Success update about information", success: true },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to update about information", success: false },
        { status: 500 }
      );
    }
  }
);
