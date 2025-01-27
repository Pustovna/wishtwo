"use server";
import { ActionResult, Wishlist } from "@/types";
import { getAccount } from "./authActions";

export async function createWishList(
  wishlist: Wishlist,
  token: string
): Promise<ActionResult<string | {}>> {
  try {
    // console.log(wishlist);
    const accountInfo = await getAccount(wishlist.account, token);
    let accountId = null;
    if (accountInfo && accountInfo.status === "success" && accountInfo.data) {
      accountId = (accountInfo.data as any).data[0].id;
    }

    if (!accountId) {
      return {
        status: "error",
        error: "Произошла ошибка во время идентификации аккаунта",
      };
    }

    console.log("sending data", wishlist.wishes);

    const response = await fetch("http://localhost:1337/api/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          account: accountId,
          title: wishlist.title,
          wishes: wishlist.wishes,
          link: wishlist.link,
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

export async function getWishList(
  id: string,
  token: string
): Promise<ActionResult<{ data: any[] }>> {
  const accountInfo = await getAccount(id, token);
  let accountId = null;
  if (accountInfo && accountInfo.status === "success" && accountInfo.data) {
    accountId = (accountInfo.data as any).data[0].id;
  }

  if (!accountId) {
    return {
      status: "error",
      error: "Произошла ошибка во время идентификации аккаунта",
    };
  }

  try {
    const response = await fetch(
      `http://localhost:1337/api/wishlists?filters[account][$eq]=${accountId}&populate=wishes.image`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response?.json();
    if (result && result.error) {
      console.log(result);
      return { status: "error", error: result.error.message };
    }

    console.log(result);

    return { status: "success", data: result };
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Произошла ошибка, попробуйте позже" };
  }
}

export async function uploadFile(
  file: File,
  token: string
): Promise<ActionResult<string | {}>> {
  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch("http://localhost:1337/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response?.json();
  if (result && result.error) {
    console.log(result);
    return { status: "error", error: result.error.message };
  }

  console.log(result);

  return { status: "success", data: result };
}

export async function deleteWishList(
  id: string,
  token: string
): Promise<ActionResult<string>> {
  const response = await fetch(`http://localhost:1337/api/wishlists/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    return { status: "success", data: 'deleted'};
  } else { 
    const errorMessage = await response.text(); 
    return { status: "error", error: errorMessage || 'Failed to delete' };
  }
}
