import { Button } from './button';
import { Copy } from 'lucide-react';

export const CopyButton = ({ text }: { text: string }) => {
  const copy = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copy}>
      <Copy className="h-3 w-3"/>
    </Button>
  );
};
