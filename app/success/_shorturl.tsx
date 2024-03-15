"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

interface Props {
  slug: string;
}
import { Copy } from "lucide-react";
function ShortUrl(props: Props) {
  async function copyToClip() {
    try {
      await navigator.clipboard.writeText(`
      
      ${typeof window !== "undefined" ? window.location.origin : ""}/${
        props.slug
      }
      `);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Oops! Something went wrong", {
        duration: 3000,
      });
    }
  }
  return (
    <div className="w-full flex flex-row ">
      <Input
        type="url"
        readOnly
        id="url"
        name="url"
        defaultValue={`${
          typeof window !== "undefined" ? window.location.origin : ""
        }/${props.slug}`}
      />
      <Button onClick={copyToClip} size="icon" variant="outline">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default ShortUrl;
