import AuthenticatedCard from "@/core/components/card";
import { getUsers } from "@/core/libraries/queries";
import React from "react";

const Page = async () => {
  const users = await getUsers();

  console.log(users);
  return (
    <div className="h-screen grid items-center justify-center bg-black">
      <AuthenticatedCard />
    </div>
  );
};

export default Page;
