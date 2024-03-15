import Link from "next/link";
import { Metadata } from "next";
import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ShortUrl from "./_shorturl";

interface Props {
  searchParams: {
    [key: string]: string;
  };
}
export const metadata: Metadata = {
  title: "Success",
  description: "Your shortened link has been created successfully.",
};

function Page(props: Props) {
  return (
    <div className="mt-10">
      <h1 className="text-5xl font-bold">Sucess!</h1>
      <p className="mt-2 mb-4">
        Your shortened link has been created successfully.{" "}
      </p>
      <ShortUrl slug={props.searchParams.slug} />
      <Link href={"/"} className={cn(buttonVariants(), "mt-4")}>
        Shorten another link
      </Link>
    </div>
  );
}

export default Page;
