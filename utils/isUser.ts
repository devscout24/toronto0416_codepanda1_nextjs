"use server";

import { cookies } from "next/headers";

export const isUser = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    return !accessToken || accessToken?.length === 0 ? false : true;
}