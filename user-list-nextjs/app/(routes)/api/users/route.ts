"use server";

import { addUser, getUsers } from "@/app/(helpers)/model";
import { NextRequest } from "next/server";

export const GET = async () => {
  const users = await getUsers();
  return Response.json({ ok: true, users });
};

export const POST = async (body: NextRequest) => {
  const user = await body.json();
  const result = await addUser(user);
  return Response.json(result, { status: 201 });
};