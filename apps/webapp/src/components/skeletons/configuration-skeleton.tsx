import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function ConfigurationSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-start justify-center pt-20 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-5 w-12" />
              </div>
            </div>
          </div>
          {/* Defra Public Key */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Defra Signed Message (textarea) */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-[100px] w-full" />
          </div>
          {/* Peer ID */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          {/* Peer Signed Message (textarea) */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-[100px] w-full" />
          </div>
          {/* Register Button */}
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
