import { ImageMedia } from "@/components/image-media";
import { cn, isPopulated } from "@/lib/utils";
import type { Chain } from "@/payload/payload-types";
import Link from "next/link";
import { UpvotesButton } from "./upvotes-button";

export type ChainCardData = Pick<
  Chain,
  | "id"
  | "name"
  | "slug"
  | "icon"
  | "description"
  | "token"
  | "isSupported"
  | "spotsLimit"
  | "upvotes"
> & {
  claimedSpots: number;
};

export const NetworkCard = ({
  chain,
  highlighted = false,
}: {
  chain: ChainCardData;
  highlighted?: boolean;
}) => {
  const chainIcon = isPopulated(chain.icon) ? chain.icon : null;

  return (
    <div className="relative group h-full">
      <Link href={`/chains/${chain.slug}`} className="h-full block">
        <div
          className={cn(
            "relative bg-white border-2 border-szo-border-light p-4 flex flex-col gap-2 group-hover:border-szo-primary transition-all duration-300 h-full",
            highlighted && "border-szo-primary",
          )}
        >
          <div className="absolute top-0 left-0 w-full h-14 flex gap-2 px-2 pt-2">
            <div className="h-full w-full inset[0_0_0_0] border border-szo-border-light bg-szo-light-gray group-hover:bg-szo-primary transition-all duration-300"></div>
            <UpvotesButton
              chainId={chain.id}
              upvotes={chain.upvotes ?? 0}
            />
          </div>

          <div className={cn(
            'size-14 rounded-md overflow-hidden z-1 mt-4 relative border border-szo-border-light bg-white transition-border duration-300',
            'hover:border-szo-primary',
            highlighted && 'border-szo-primary',
          )}>
            {chainIcon && (
              <ImageMedia
                resource={chainIcon}
                imgClassName="p-2 object-contain object-center"
              />
            )}
          </div>

          <div className="grow mt-4 mb-8">
            <p className="font-light font-mono text-px-16">/ {chain.name}</p>
          </div>

          <p className="font-mono text-px-13 text-text-secondary">
            Spots claimed: {chain.claimedSpots}/{chain.spotsLimit}
          </p>
        </div>
      </Link>

      {/* Pattern */}
      <div
        className={cn(
          "bg-[url('/bg-pattern.png')] bg-repeat-y bg-no-repeat-x bg-right absolute inset-0 translate-0 -z-1 opacity-0",
          "group-hover:opacity-100 transition-all duration-300 group-hover:translate-2",
        )}
      />
    </div>
  );
};
