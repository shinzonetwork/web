import { ReactNode } from 'react';

export interface BlockNumbereredListProps {
    items: {
        title: string;
        content: ReactNode;
    }[];
}

export default function BlockNumbereredList({ items }: BlockNumbereredListProps) {

    return (<div>
        {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-1">
                <div className="flex items-center text-h3">
                    {String(index + 1).padStart(2, '0')}<span className="text-szo-primary mr-2">/</span>
                    <span>{item.title}</span>
                </div>
                <p>{item.content}</p>
            </div>
        ))}
    </div>
    );
}
