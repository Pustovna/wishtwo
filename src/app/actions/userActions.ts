"use server";
import { ActionResult, Wishlist } from "@/types";
import { getAccount } from "./authActions";

export async function createWishList(
  wishlist: Wishlist,
  token: string
): Promise<ActionResult<string | {}>> {
  try {
    console.log(wishlist);
    const accountInfo = await getAccount(wishlist.account, token);
    let accountId = null;
    if (accountInfo && accountInfo.status === "success" && accountInfo.data) {
      accountId = (accountInfo.data as any).data[0].id;
      console.log(accountId);
    }

    if (!accountId) {
      return {
        status: "error",
        error: "Произошла ошибка во время идентификации аккаунта",
      };
    }

   
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
