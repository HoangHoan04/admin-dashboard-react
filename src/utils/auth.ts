import { tokenCache } from "@/utils/token";

export type LoginResult =
  | { ok: true; mustChangePassword?: boolean }
  | { ok: false; message: string };

/** MOCK LOGIN: admin / 123 — comment lại khi nối API thật */
export function login(username: string, password: string): Promise<LoginResult> {
  // TODO: API auth thật
  // const res = await fetch(`${API}/auth/login`, { method: 'POST', body: JSON.stringify({ username, password }) })

  return new Promise((resolve) => {
    setTimeout(() => {
      if (username.trim() === "admin" && password === "123") {
        tokenCache.setAuthData("mock-access-token", "mock-refresh-token", {
          username: "admin",
          name: "Admin",
          email: "admin@example.com",
        });
        resolve({ ok: true });
        return;
      }
      resolve({
        ok: false,
        message: "Tên đăng nhập hoặc mật khẩu không chính xác!",
      });
    }, 300);
  });
}

export function logout(): void {
  tokenCache.clear();
}
