'use client'; // This makes the component a client component
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";
import { useEffect, useState } from 'react';

const TOCClient = ({ htmlContent, inFront = false }: { htmlContent: string, inFront: boolean }) => {
    const [toc, setToc] = useState<string[]>([]);
    const [contentWithIds, setContentWithIds] = useState<string>(htmlContent);
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

    useEffect(() => {
        const updatedContent = addHeadingIds(htmlContent);
        setContentWithIds(updatedContent);
        generateTOC(updatedContent);

        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [htmlContent]);

    const addHeadingIds = (html: string): string => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading) => {
            const id = heading.textContent?.toLowerCase().replace(/\s/g, '-');
            if (id) {
                heading.id = id; // Assign an ID to each heading
            }
        });
        return doc.body.innerHTML; // Return the updated HTML content
    };

    const generateTOC = (html: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const headings = doc.querySelectorAll('h2, h3'); // Only focus on h2 and h3 for TOC

        const tocItems: string[] = [];
        let currentH2: string | null = null;

        headings.forEach((heading) => {
            const id = heading.id;
            const tag = heading.tagName.toLowerCase();
            const text = heading.textContent;

            if (tag === 'h2') {
                currentH2 = `<a id="tocStyle-h2" href="#${id}" class="text-gray-400 hover:text-blue-500 transition duration-200">${text}</a>`;
                tocItems.push(`<div class="toc-h2 py-3">${currentH2}</div>`);
            } else if (tag === 'h3' && currentH2) {
                tocItems.push(`<div class="toc-h3 ml-4"><a id="tocStyle-h3" href="#${id}" class="text-[14px] text-gray-400 hover:text-blue-500 transition duration-200">${text}</a></div>`);
            }
        });

        setToc(tocItems);
    };

    const onScroll = () => {
        const headings = document.querySelectorAll('h2, h3');
        let lastVisibleHeading: Element | null = null;

        headings.forEach((heading) => {
            const bounding = heading.getBoundingClientRect();
            if (bounding.top <= 100) {
                lastVisibleHeading = heading;
            }
        });

        if (lastVisibleHeading && (lastVisibleHeading as HTMLElement).id !== activeHeadingId) {
            setActiveHeadingId((lastVisibleHeading as HTMLElement).id);
        }
    };

    return (
        <div className='flex gap-10 relative max-lg:flex-col'>
            {inFront ?
                <>
                    <div className="mr-20 max-lg:mr-0 w-1/4 max-lg:w-full">
                        <div className="sticky top-10 border rounded-lg">
                            <div className="p-5">
                                <div className='font-bold text-2xl mb-3'>Table of contents</div>
                                <nav className="flex flex-col">
                                    {toc.map((item, index) => (
                                        <div
                                            key={index}
                                            dangerouslySetInnerHTML={{ __html: item }}
                                            className={`toc-item ${item.includes(activeHeadingId || '') ? 'underline active-text' : ''}`}
                                        />
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="w-[760px] max-lg:w-full prose bn-default-styles" dangerouslySetInnerHTML={{ __html: contentWithIds }} />
                </>
                :
                <>
                    <div>
                        <nav dangerouslySetInnerHTML={{ __html: toc.join('<br/>') }} />
                    </div>
                </>
            }
        </div>
    );
};

export default TOCClient;
