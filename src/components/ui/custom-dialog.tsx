import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  variant:
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link"
    | "default"
    | null
    | undefined;
  cta: string;
  children: React.ReactNode;
}

export function CustomDialog({ variant, cta, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={variant}>{cta}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
