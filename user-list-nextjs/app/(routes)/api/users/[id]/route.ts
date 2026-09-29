"use server"

import { deleteUser, getUserById, updateUser } from "@/app/(helpers)/model";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ id: string }>}) => {
    const { id } = await params;
    const user = await getUserById(id);

    if (!user) {
        return Response.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return Response.json({ ok: true, user });
};

export const PUT = async (req : NextRequest, {params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    const data = await req.json();
    const user = await updateUser(Number(id), data);
    if (!user) {
        return Response.json({ok : false, error : "User is not found"}, {status : 404});
    }
    return Response.json({ok : true, user})
}

export const DELETE = async (req: NextRequest, {params} : {params : Promise<{id : string}>}) => {
    const {id} = await params;
    const userDelete = await deleteUser(Number(id));
    if (!userDelete) {
        return Response.json({ok : false, error : "User is not found"}, {status : 404});
    }
    return Response.json({ok : true, userDelete});
}