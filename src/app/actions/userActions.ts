"use server";
import { ActionResult, Wishlist } from "@/types";


export async function createWishList(
    wishlist: Wishlist, token: string
  ): Promise<ActionResult<string | {}>> {
    try {
      const response = await fetch("http://localhost:1337/api/wishes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          data: {
            account: wishlist.account,
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
  