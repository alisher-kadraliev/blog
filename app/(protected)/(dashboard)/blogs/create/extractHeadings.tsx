import React from 'react'

export function extractHeadings(htmlContent: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    return Array.from(headings).map(heading => ({
        id: heading.id,
        level: heading.tagName.toLowerCase(),
        text: heading.textContent,
    }));
}
