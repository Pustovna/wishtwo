'use client';
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";
import { createWishList } from "@/app/actions/userActions";
import { useEffect } from "react";

export default function CreateAcc() {
  const { data: session } = useSession();

  const wishList = {
    account: session?.user?.id || "",
    title: "",
  };

  return (
    <>
      {session && (
        <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            createWishList(wishList, session?.token);
          }
        }
        >
          Создать вишлист
        </Button>
      )}
    </>
  );
}
