import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, Send } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const POSITIONS = ["Laptop Service Engineer", "Service Coordinator"] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  position: z.enum(POSITIONS),
  experience: z.string().trim().min(1, "Select your experience"),
});

export function ApplyDialog({
  open,
  onOpenChange,
  position,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  position: (typeof POSITIONS)[number];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = schema.safeParse(data);
    const errs: Record<string, string> = {};
    if (!res.success) res.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
    if (!file) errs["resume"] = "Please upload your resume";
    else if (file.size > 5 * 1024 * 1024) errs["resume"] = "Resume must be under 5 MB";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    toast.success("Application submitted!", { description: "Our HR team will contact you shortly." });
    setFile(null);
    onOpenChange(false);
  }

  const field = "space-y-1.5";
  const err = (k: string) => errors[k] && <p className="text-xs text-destructive">{errors[k]}</p>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Apply for this role</DialogTitle>
          <DialogDescription>Join the Longe Technologies service team.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" key={position}>
          <div className={`${field} sm:col-span-2`}>
            <Label htmlFor="a-name">Full name</Label>
            <Input id="a-name" name="name" maxLength={100} placeholder="Your name" />
            {err("name")}
          </div>
          <div className={field}>
            <Label htmlFor="a-phone">Phone</Label>
            <Input id="a-phone" name="phone" maxLength={15} placeholder="+91 98765 43210" />
            {err("phone")}
          </div>
          <div className={field}>
            <Label htmlFor="a-email">Email</Label>
            <Input id="a-email" name="email" type="email" maxLength={255} placeholder="you@email.com" />
            {err("email")}
          </div>
          <div className={field}>
            <Label htmlFor="a-pos">Position</Label>
            <select id="a-pos" name="position" defaultValue={position} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              {POSITIONS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className={field}>
            <Label htmlFor="a-exp">Experience</Label>
            <select id="a-exp" name="experience" defaultValue="" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="" disabled>Select</option>
              <option>Fresher</option>
              <option>1–2 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
            {err("experience")}
          </div>
          <div className={`${field} sm:col-span-2`}>
            <Label htmlFor="a-resume">Resume (PDF/DOC, max 5 MB)</Label>
            <label htmlFor="a-resume" className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-input bg-secondary px-4 py-5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              <Upload className="size-5" />
              <span className="truncate">{file ? file.name : "Click to upload your resume"}</span>
            </label>
            <input id="a-resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
            {err("resume")}
          </div>
          <Button type="submit" variant="hero" size="lg" className="sm:col-span-2">
            Submit Application <Send />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
