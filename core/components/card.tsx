"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

const AuthenticatedCard = () => {
  const { data: session } = useSession();
  const user = session?.user;

  console.log(user);
  if (!user || !session) {
    return (
      <Button
        onClick={() => signIn()}
        className="text-white px-4 py-2"
        variant="solid"
        color="primary"
        radius="lg">
        Sign In
      </Button>
    );
  }

  return (
    <Card isFooterBlurred radius="lg" className="border-[1px] relative">
      <Image
        alt={user.name ?? ""}
        className="object-cover"
        height={250}
        src={user.image ?? ""}
        width={250}
      />
      <CardFooter className="justify-between bg-white/10 border-white/20 border-1 p-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10 ml-1 flex gap-4 items-center">
        <p className="text-tiny text-white/80 font-semibold">{user.name}</p>
        <Button
          onClick={() => signOut()}
          className="text-tiny text-white bg-black/20 px-4 py-2"
          variant="flat"
          color="default"
          radius="lg"
          size="sm">
          Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthenticatedCard;
