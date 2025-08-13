import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  return NextResponse.json({ ok: true, code });
}
