"use client";

import React from "react";
import CreateWish from "@/app/profile/CreateAcc";
import ListWidget from "../List/ListWidget";

const ProfileWishListWidget: React.FC = () => {
  const [isNewWishes, setIsNewWishes] = React.useState(false);
  return (
    <div>
      <CreateWish  setIsNewWishes={setIsNewWishes}/>
      <ListWidget isNewWishes={isNewWishes}  setIsNewWishes={setIsNewWishes}/>
    </div>
  );
};

export default ProfileWishListWidget;
