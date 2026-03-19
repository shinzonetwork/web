export function Banner() {
  return (
    <div className="mb-6 rounded-md border border-warning/40 bg-warning/10 p-4">
      <h3 className="text-sm font-semibold text-foreground">
        Please confirm port 9171 is open.
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Port 9171 is used for communication between your indexer and Hosts. This
        must be open for inbound and outbound traffic.
      </p>
    </div>
  );
};
