import { Button } from "@/components/animate-ui/components/buttons/button";
import { Checkbox } from "@/components/animate-ui/components/radix/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CancelOrder() {
  const reasons = [
    "Ordered the wrong item",
    "Found a better price elsewhere",
    "Changed my mind / No longer needed",
    "Duplicate order by mistake",
    "Payment issue / Couldn’t complete payment",
    "Other (please specify below)",
  ];

  return (
    <section>
      <div>
        <h2 className="text-xl font-semibold">Cancel Order?</h2>
        <p className="mt-2 text-sm text-neutral-400">
          Please let us know why you’re canceling this appointment. Your
          feedback helps us improve the experience.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold">Select a Reason</h2>

        <div className="mt-2 space-y-2.5">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center gap-5">
              <Checkbox name="reason" id={reason} />
              <Label htmlFor={reason}>{reason}</Label>
            </div>
          ))}
        </div>
      </div>

      <Textarea placeholder="Write here..." className="mt-5" />

      <div className="mt-5 flex gap-2.5">
        <Button variant="outline" className="w-full flex-1">
          Cancel
        </Button>
        <Button className="w-full flex-1">Submit</Button>
      </div>
    </section>
  );
}
