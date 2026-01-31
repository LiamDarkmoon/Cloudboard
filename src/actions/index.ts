import { defineAction } from "astro:actions";
import { z } from "astro/zod";

const schema = z.object({
  username: z.string().email().min(1),
  password: z.string().min(1),
});

export const server = {
  login: defineAction({
    accept: "form",

    handler: async (formData, { cookies }) => {
      const parsed = schema.parse({
        username: formData.get("username"),
        password: formData.get("password"),
      });

      const data = new FormData();
      data.append("username", parsed.username);
      data.append("password", parsed.password);

      const res = await fetch("https://cloudapi-chi.vercel.app/auth/login", {
        method: "POST",
        body: data,
      });

      const text = await res.text();

      if (!res.ok) {
        return {
          success: false,
          error: "login failed",
          status: res.status,
        };
      }

      const resData = JSON.parse(text);
      const { user_token, user } = resData;

      if (!user_token) {
        return { success: false };
      }

      cookies.set("auth", user_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      cookies.set("user", user.email, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      return { success: true };
    },
  }),

  logout: defineAction({
    input: z.string().optional(),
    handler: async (_, { cookies }) => {
      cookies.delete("auth", { path: "/" });

      return { success: true };
    },
  }),

  register: defineAction({
    accept: "form",

    handler: async (formData, { cookies }) => {
      const parsed = schema.parse({
        username: formData.get("username"),
        password: formData.get("password"),
      });

      const data = new FormData();
      data.append("username", parsed.username);
      data.append("password", parsed.password);

      const res = await fetch("https://cloudapi-chi.vercel.app/auth/register", {
        method: "POST",
        body: data,
      });

      const text = await res.text();

      if (!res.ok) {
        return {
          success: false,
          error: "Register failed",
          status: res.status,
        };
      }

      const resData = JSON.parse(text);
      const { user_token, user } = resData;

      if (!user_token) {
        return { success: false };
      }

      cookies.set("auth", user_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
      cookies.set("user", user.email, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      return { success: true };
    },
  }),
};
