"use client";

interface DeployStatusMessageProps {
  error: string;
}

export const DeployStatusMessage = ({ error }: DeployStatusMessageProps) => (
  <>{error && <p className="text-sm text-red-500">{error}</p>}</>
);
