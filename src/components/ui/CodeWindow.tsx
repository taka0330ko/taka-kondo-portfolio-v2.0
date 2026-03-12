import { useState, useEffect, useRef } from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"

type CodeWindowProps = {
    collapsedHeight?: number;
    code: string;
}

export default function CodeWindow({collapsedHeight = 160, code}:CodeWindowProps) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (codeRef.current) {
        hljs.highlightElement(codeRef.current);
      }
    }, [code]);
  return (
    <figure className="bg-frame overflow-hidden rounded-lg">
        {/* Header */}
      <div className="border-b border-black/10 px-4 py-3">
        <button
        onClick={()=>setIsExpanded(!isExpanded)}
        className="text-sm text-heading-default transition cursor-pointer bg-background py-1 px-2 rounded-sm hover:text-accent"
        aria-expanded={isExpanded}
        >
            {isExpanded? (<>Collapse</>):(<>Expand</>)}
        </button>
      </div>
      {/* Code Body */}
      <div
        className="relative transition-all duration-300 ease-in-out"
        style={{
            maxHeight: isExpanded? "1000px" : `${collapsedHeight}px`,
        }}>
            <pre className="overflow-x-auto bg-[#0d1117] p-4 text-sm leading-6 text-gray-100">
          <code ref={codeRef} className="language-js">{code}</code>
           {!isExpanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-[#0d1117] to-transparent" />
        )}
        </pre>
</div>
    </figure>
  )
}
