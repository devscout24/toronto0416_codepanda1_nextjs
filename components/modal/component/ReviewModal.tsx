// ReviewModal.tsx

"use client";

import { Button } from "@/components/animate-ui/components/buttons/button";
import Rating from "@/components/shared/Rating";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { createReviewAction } from "@/app/account/my-orders/[id]/components/action";
import { useState } from "react";

const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  title: z.string().min(1, "Subject is required"),
  comment: z.string().optional(),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export default function ReviewModal() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      comment: "",
    },
  });

  const onSubmit = async (values: ReviewFormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id ?? "");
      formData.append("rating", String(values.rating));
      formData.append("title", values.title);
      formData.append("comment", values.comment?.trim() || values.title.trim());

      try {
        const msg = await createReviewAction(formData);
        toast.success(msg || "Review submitted successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit review",
        );
      }
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      window.history.back();
      setLoading(false);
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Rating */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Ratings</FormLabel>
              <FormControl>
                <Rating
                  value={field.value}
                  defaultValue={1}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Subject <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Comment */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your comment.."
                  rows={10}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || loading}
        >
          {form.formState.isSubmitting || loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
