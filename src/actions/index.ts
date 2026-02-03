import { defineAction } from "astro:actions";
import { latestUrl, eventsUrl, eventUrl } from "../lib/cons";
import { z } from "astro/zod";
import { getAllEvents, getEvent } from "../lib/utils/fetch";

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
      cookies.set("user_id", user.id, {
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
      cookies.set("user_id", user.id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      return { success: true };
    },
  }),

  deleteEvent: defineAction({
    input: z.number(),
    handler: async (id, { cookies }) => {
      const res = await fetch(eventUrl + id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.get("auth")?.value}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}`);
      }

      return { success: true };
    },
  }),

  fetchEvent: defineAction({
    handler: async (id, { cookies }) => {
      const token = cookies.get("auth")?.value;

      if (token) if (id) return await getEvent(id, token);

      return await getEvent();
    },
  }),

  fetchEvents: defineAction({
    handler: async (id, { cookies }) => {
      const token = cookies.get("auth")?.value;

      return await getAllEvents(token);
    },
  }),
};
