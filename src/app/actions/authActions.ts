"use server";
import { registerSchema } from "@/lib/schemas/RegisterSchema";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { RegisterSchema } from "@/lib/schemas/RegisterSchema";
import { ActionResult } from "@/types";
import { signIn, signOut } from "@/auth";

export async function signOutUser() {
  await signOut({ redirectTo: "/" });
}

export async function signUpUser(
  data: RegisterSchema
): Promise<ActionResult<string | {}>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const response = await fetch(
      "http://localhost:1337/api/auth/local/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      }
    );

    const result = await response?.json();

    if (result && result.user.id) {
      const account = await createAccount(result.user.id, result.jwt, result.name);
    }

    return { status: "success", data: "Success" };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Произошла ошибка, попробуйте позже" };
  }
}

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: result.user };
  } catch (error: any) {
    switch (error.type) {
      case "CredentialsSignin":
        return { status: "error", error: "Неверный логин или пароль" };
      case "CredentialsSignin":
        throw error;
      default:
        return { status: "error", error: "Произошла ошибка, попробуйте позже" };
    }
  }
}

export async function createAccount(
  id: string,
  token: string, 
  name: string
): Promise<ActionResult<string | {}>> {
  try {
    const response = await fetch("http://localhost:1337/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          userId: id,
          name: "",
          tgId: "",
          tgUsername: "",
        },
      }),
    });

    const result = await response?.json();
    if (result && result.error) {
      console.log(result);
      return { status: "error", error: result.error.message };
    }

    console.log(result);

    return { status: "success", data: "success" };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Произошла ошибка, попробуйте позже" };
  }
}
