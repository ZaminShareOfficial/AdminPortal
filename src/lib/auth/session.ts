import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

export async function getAccessToken() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}
