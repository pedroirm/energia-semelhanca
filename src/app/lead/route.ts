import { connectToDB } from "@/lib/db";
import Lead from "@/models/Lead";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  await connectToDB();
  const lead = await Lead.create(data);
  return NextResponse.json(lead, { status: 201 });
}
