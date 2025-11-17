import { Social } from "@/app/registration/profile/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { isValidUrl } from "@/lib/utils";

export default function SocialProfile({
  socials,
  handleSocials,
}: {
  socials: Social[];
  handleSocials: Dispatch<SetStateAction<Social[]>>;
}) {
  const handleSocialChange = (
    id: string,
    field: "platform" | "link",
    value: string,
  ) => {
    handleSocials((prev: Social[]) =>
      prev.map((social) =>
        social.id === id ? { ...social, [field]: value } : social,
      ),
    );
  };

  const addSocialRow = () => {
    handleSocials((prev) => [
      ...prev,
      { id: crypto.randomUUID(), platform: "", link: "" },
    ]);
  };

  const removeSocialRow = (id: string) => {
    handleSocials((prev) => prev.filter((social) => social.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Social Media</h3>
        <Button
          type="button"
          onClick={addSocialRow}
          size="sm"
          variant="outline"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Social
        </Button>
      </div>
      <div className="space-y-3">
        {socials.map((social) => (
          <div key={social.id} className="flex gap-2 items-start">
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="Platform (e.g., Twitter, LinkedIn)"
                value={social.platform}
                onChange={(e) =>
                  handleSocialChange(social.id, "platform", e.target.value)
                }
              />
            </div>
            <div className="flex-1 space-y-2">
              <Input
                type="text"
                placeholder="Link or username"
                value={social.link}
                onChange={(e) =>
                  handleSocialChange(social.id, "link", e.target.value)
                }
                className={
                  social.link && !isValidUrl(social.link)
                    ? "border-destructive"
                    : ""
                }
              />
              {social.link && !isValidUrl(social.link) && (
                <p className="text-sm text-destructive">Invalid URL format</p>
              )}
            </div>
            {socials.length > 1 && (
              <Button
                type="button"
                onClick={() => removeSocialRow(social.id)}
                size="icon"
                variant="ghost"
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            {socials.length === 1 && <div className="w-10 shrink-0" />}
          </div>
        ))}
      </div>
    </div>
  );
}
