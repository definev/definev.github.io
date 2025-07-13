import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import remarkGfm from 'remark-gfm'

interface MarkdownContentProps {
    content: string
    className?: string
}

const MarkdownContent = ({ content, className = '' }: MarkdownContentProps) => {
    return (
        <div className={`prose prose-sm max-w-none ${className}`}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink uppercase tracking-tight my-6 p-4 bg-accent border-2 border-border-brutal shadow-md">
                            {children}
                        </h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-xl md:text-2xl font-display font-bold text-ink uppercase tracking-tight my-5 p-3 bg-paper-dark border-2 border-border-brutal shadow-md">
                            {children}
                        </h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-lg md:text-xl font-display font-bold text-ink uppercase tracking-tight my-4 p-2 bg-paper border-2 border-border-brutal shadow-md">
                            {children}
                        </h3>
                    ),
                    p: ({ children }) => (
                        <p className="text-sm text-ink leading-relaxed mb-4 font-medium">
                            {children}
                        </p>
                    ),
                    strong: ({ children }) => (
                        <strong className="font-bold bg-accent px-1 py-0.5 border border-border-brutal text-ink">
                            {children}
                        </strong>
                    ),
                    em: ({ children }) => (
                        <em className="italic bg-paper-dark px-1 py-0.5 border border-border-brutal text-ink">
                            {children}
                        </em>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-none space-y-2 mb-6 pl-0">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-none space-y-2 mb-6 pl-0">
                            {children}
                        </ol>
                    ),
                    li: ({ children }) => (
                        <li className="pl-4 border-l-4 bg-paper-dark/50 py-2 px-4 border border-border-brutal">
                            {children}
                        </li>
                    ),
                    a: ({ href, children }) => (
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent font-bold underline decoration-2 decoration-accent hover:bg-accent hover:text-ink transition-colors px-1 py-0.5 border-b-2 border-accent"
                        >
                            {children}
                        </a>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-accent bg-paper-dark p-4 my-6 border">
                            {children}
                        </blockquote>
                    ),
                    table: ({ children }) => (
                        <div className="overflow-x-auto my-6">
                            <table className="w-full border-2 border-border-brutal bg-paper">
                                {children}
                            </table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-accent border-b-2 border-border-brutal">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody>
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => (
                        <tr className="border-b border-border-brutal">
                            {children}
                        </tr>
                    ),
                    th: ({ children }) => (
                        <th className="p-3 text-left text-ink font-bold uppercase tracking-wider border-r border-border-brutal">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="p-3 text-ink border-r border-border-brutal">
                            {children}
                        </td>
                    ),
                    del: ({ children }) => (
                        <del className="bg-red-200 text-red-800 px-1 py-0.5 border border-border-brutal line-through">
                            {children}
                        </del>
                    ),
                    input: ({ checked, disabled }) => (
                        <input
                            type="checkbox"
                            checked={checked}
                            disabled={disabled}
                            className="mr-2 accent-accent"
                        />
                    ),
                    code: ({ node, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                language={match[1]}
                                PreTag="div"
                                customStyle={{
                                    background: 'var(--color-paper)',
                                    border: '1px solid',
                                    borderRadius: '0',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.4',
                                    padding: '1rem',
                                    margin: '1rem 0',
                                    color: 'var(--color-ink)',
                                }}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className="bg-paper-dark px-2 py-1 border border-border-brutal text-ink font-mono text-sm" {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
            >
                {content}
            </Markdown>
        </div>
    )
}

export default MarkdownContent 