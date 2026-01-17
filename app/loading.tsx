import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner className="text-primary size-12" />
    </div>
  );
}
