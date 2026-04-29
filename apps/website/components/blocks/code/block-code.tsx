import { createHighlighterCore, HighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import githubLight from '@shikijs/themes/github-light';

export type CodeBlockProps = {
    code: string
    language?: string
    blockType: 'code'
}

type Props = CodeBlockProps & {
    className?: string
}

// CMS language values to shiki language IDs
const LANGUAGE_MAP: Record<string, string> = {
    text: 'plaintext',
    docker: 'dockerfile',
    markup: 'html',
    makefile: 'make',
    git: 'git-commit',
    objectivec: 'objective-c',
    arduino: 'c',
    mongodb: 'javascript',
}

// Matches the language options for payload
const LANGS = [
    import('@shikijs/langs/bash'),
    import('@shikijs/langs/c'),
    import('@shikijs/langs/cpp'),
    import('@shikijs/langs/csharp'),
    import('@shikijs/langs/dockerfile'),
    import('@shikijs/langs/git-commit'),
    import('@shikijs/langs/go'),
    import('@shikijs/langs/graphql'),
    import('@shikijs/langs/html'),
    import('@shikijs/langs/java'),
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/json'),
    import('@shikijs/langs/jsx'),
    import('@shikijs/langs/kotlin'),
    import('@shikijs/langs/latex'),
    import('@shikijs/langs/log'),
    import('@shikijs/langs/make'),
    import('@shikijs/langs/markdown'),
    import('@shikijs/langs/mermaid'),
    import('@shikijs/langs/objective-c'),
    import('@shikijs/langs/php'),
    import('@shikijs/langs/python'),
    import('@shikijs/langs/ruby'),
    import('@shikijs/langs/rust'),
    import('@shikijs/langs/scala'),
    import('@shikijs/langs/sql'),
    import('@shikijs/langs/swift'),
    import('@shikijs/langs/tsx'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/yaml'),
    import('@shikijs/langs/zig'),
]

// Singleton — avoids re-initialising on every render within the same isolate
let highlighterPromise: Promise<HighlighterCore> | null = null

function getHighlighter() {
    if (!highlighterPromise) {

        // https://shiki.style/guide/install#cloudflare-workers
        highlighterPromise = createHighlighterCore({
            themes: [githubLight],
            langs: LANGS,
            engine: createJavaScriptRegexEngine(),
        })
    }
    return highlighterPromise
}

export const CodeBlock = async ({ className, code, language = 'plaintext' }: Props) => {
    const lang = LANGUAGE_MAP[language] ?? language
    const highlighter = await getHighlighter()

    const html = highlighter.codeToHtml(code, {
        lang,
        theme: 'github-light',
    })

    return (
        <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
            <div
                className="border border-border p-4 overflow-x-auto text-xs"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}
