"use client";

interface DeployStatusMessageProps {
  error: string;
}

export const DeployStatusMessage = ({ error }: DeployStatusMessageProps) => (
  <>
    {error && (
      <p className="whitespace-pre-line text-sm text-red-500">{error}</p>
    )}
  </>
);
