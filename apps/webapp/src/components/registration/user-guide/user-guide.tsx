import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Github, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserGuide() {
  const [showGuide, setShowGuide] = useState<boolean>(true);
  const router = useRouter();

  const handleCloseGuide = () => {
    setShowGuide(false);
    router.push("/");
  };

  return (
    <Dialog open={showGuide} onOpenChange={handleCloseGuide}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Welcome to Shinzo!
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed pt-2">
            Your profile has been saved successfully. Here are some helpful
            resources to get you started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          <a
            href="https://docs.shinzo.app/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <BookOpen className="h-5 w-5 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">Getting Started Guide</h4>
              <p className="text-sm text-muted-foreground">
                Learn the basics and start using Shinzo
              </p>
            </div>
          </a>

          <a
            href="https://github.com/shinzonetwork"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Github className="h-5 w-5 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">GitHub Repository</h4>
              <p className="text-sm text-muted-foreground">
                View source code and contribute
              </p>
            </div>
          </a>

          <a
            href="https://docs.shinzo.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <FileText className="h-5 w-5 text-primary shrink-0" />
            <div>
              <h4 className="font-semibold">Read More</h4>
              <p className="text-sm text-muted-foreground">
                Explore detailed documentation
              </p>
            </div>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
