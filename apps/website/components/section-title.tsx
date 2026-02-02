import { cn } from "@/lib/utils";

export interface SectionTitleProps {
    text: string;
    className?: string;
}

export default function SectionTitle({ text, className }: SectionTitleProps) {

    return (
        <div className={cn("flex items-center uppercase font-mono mb-10 pl-1 text-px-12 lg:text-px-16 text-szo-black", className)}>
            <span className="text-szo-primary mr-3">{`/`}</span>{text}
            <div className="spacer grow h-px bg-szo-border ml-2" />
        </div>
    );
}
