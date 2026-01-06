'use client'

import { Highlight, Prism, themes } from 'prism-react-renderer';
import React, { useEffect } from 'react';

type Props = {
    code: string
    language?: string
}

export const Code: React.FC<Props> = ({ code, language = '' }) => {
    useEffect(() => {
        // https://github.com/FormidableLabs/prism-react-renderer/blob/master/packages/generate-prism-languages/index.ts#L9-L23
        if (language && language !== 'text') {
            if (language === "scala") {
                prismIncludeLanguages(Prism, ['java', 'scala']);
            } else {
                prismIncludeLanguages(Prism, [language]);
            }
        }
    }, [language]);

    if (!code) return null

    return (
        <Highlight code={code} language={language} theme={themes.vsLight}>
            {({ getLineProps, getTokenProps, tokens }) => (
                <pre className="bg-background p-4 border text-xs border-border overflow-x-auto">
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ className: 'table-row', line })}>
                            <span className="table-cell">
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </span>
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

function prismIncludeLanguages(
    PrismObject: typeof Prism,
    additionalLanguages: string[]
): void {
    const PrismBefore = globalThis.Prism;
    globalThis.Prism = PrismObject;

    additionalLanguages.forEach(lang => {
        if (!lang) return;
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        require(`prismjs/components/prism-${lang}`);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (globalThis as any).Prism;

    if (typeof PrismBefore !== 'undefined') {
        globalThis.Prism = PrismObject;
    }
}
