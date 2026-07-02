import Link from "next/link";
import { Container, PageLayout } from "@/widgets/layout";
import { Typography } from "@/shared/ui/typography";

export default function NotFound() {
  return (
    <PageLayout title="Page not found">
      <Container borderX borderB className="flex min-h-72 flex-col items-start justify-center gap-5 px-8 py-16">
        <Typography variant="h2" font="mono">404</Typography>
        <Typography className="max-w-xl text-muted-foreground">
          The page you requested does not exist or may have moved.
        </Typography>
        <Link
          href="/shinzohub"
          className="font-mono text-sm text-text-accent underline underline-offset-4"
        >
          Return to Shinzohub Explorer
        </Link>
      </Container>
    </PageLayout>
  );
}
