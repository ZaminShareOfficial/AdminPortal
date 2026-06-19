import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOGIN_PATH } from "@/constants/routes";
import { SESSION_COOKIE } from "@/lib/auth/cookie";

export async function getAccessToken() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function requireSession(): Promise<string> {
  const token = await getAccessToken();

  if (!token) {
    redirect(LOGIN_PATH);
  }

  return token;
}
