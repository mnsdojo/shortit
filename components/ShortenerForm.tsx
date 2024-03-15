"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RotateCw } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { useEffect } from "react";

export const formSchema = z.object({
  slug: z
    .string({
      description: "The slug for the URL",
      invalid_type_error: "Invalid Slug",
      required_error: "Slug is required",
    })
    .trim()
    .optional(),
  url: z.string().url({ message: "Invalid URL" }),
});
function ShortenerForm() {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug: "",
      url: "",
    },
  });
  async function onSubmit({ url, slug }: z.infer<typeof formSchema>) {
    try {
      const req = await fetch("/api/shortit", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          url,
          slug,
        }),
      });
      const res = await req.json();
      if (!req.ok) {
        return toast(res.message);
      }
      toast.success("Successfully created Short URL");
      push(`/success?slug=${res.slug}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    form.reset({
      slug: "",
      url: "",
    });
  }, [form.formState.isSubmitSuccessful]);

  return (
    <div className="pt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    pattern="https://.*"
                    placeholder="http://example.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your public URL</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />
          <FormField
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>This is optional</FormDescription>
                <FormMessage />
              </FormItem>
            )}
            control={form.control}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default ShortenerForm;
