---
locale: "en"
title: "Hello, Blog.  Hello, Mark Down."
description: "The first post on this blog — why it exists and what to expect."
publishedAt: 2026-09-11
cover: "../../../assets/images/blog/01-Hello-Blog/blog-01-thumbnail.png"
coverAlt: "Hello Blog article thumbnail showing an Astro Content Collections code editor"
coverVideo: "/videos/blog/blog-01-thumbnail.webm"
coverVideoFallback: "/videos/blog/blog-01-thumbnail.mp4"
tags: ["Development", "Design", "Case Study"]
---


### Hello, my first blog experience in my life
I've never written a blog post in my life. Basically, I don't post pictures or comments on social media. Now, I'm writing this article without AI, then I seriously realized how I've been relying on AI too much in my daily life, even when writing in my first language. Since I don't practice putting my thoughts into words, I'm beginning to worry that having trouble of real-life conversation. I hope this would be a good practice through writing blog posts, and help me improve my English skills :)


### Why Blog?

It all started with rethinking how I built the main project pages, the core of my portfolio. In my case studies, I wrote at length about what the problem was, how I approached it, what the outcome was, and what I learned from the project, *all directly in HTML.*

Of course, keeping the content and design together had its advantages, such as allowing me to create custom layouts and elaborate effects with JavaScript. However, all the HTML tags, classes, and attributes made the actual text difficult to read and maintain in the source code.

![Code for the Store-map Case Study](../../../assets/images/blog/01-Hello-Blog/html-code-case-study.webp)
*HTML Code for the Case Study*


I began to realize that writing a case study was not all that different from writing a blog post. That led me to a simple conclusion: wouldn’t it be easier to write them in Markdown, more like blog posts?

The content on my project pages also represents only a small part of what I learn in my day-to-day work. I wanted a more casual way to document those lessons without unnecessarily adding more project pages to my portfolio. That was when I realized that a blog would be the perfect place for them.

### Astro Content Collections

This portfolio is built with Astro, a JavaScript framework designed for content-focused websites. I originally started building it with Next.js and React, but I began to question whether I really needed to use so much JavaScript for a portfolio whose main purpose was simply to present information. Around that time, I discovered Astro.

Unlike client-side frameworks such as React and Vue, Astro sends JavaScript to the browser only when it is needed. Since most pages can be generated as HTML, it is well suited to static, content-focused websites such as blogs and portfolios. This makes it possible to build them in a relatively simple and lightweight way.

More importantly for this blog, Astro works particularly well with Markdown. It allows me to keep the content separate from the page’s layout and code. Using Astro Content Collections, I can write the main body of each post in Markdown while keeping information such as its title, publication date, tags, and thumbnail together in its frontmatter.

Even if I change the layout later, I do not need to edit every post individually. This makes longer articles easier to write, organize, and maintain.

### Future Blog Posts

First, I would like to write about the design decisions and behind-the-scenes development work that I could not fully cover on my main project pages.

For example, the [Product Location Search App](https://www.takanari-kondo.com/jp/store-map) involved building an API that brings together product data and location information. There is a much deeper story behind its development, but I was not able to include everything on the project page.

I want this blog to be a place where I can put what I have learned into words and return to it later. If I have time, I may also write about some more personal topics.

### References

- [Astro Documentation](https://docs.astro.build/)
- [Why Astro?](https://docs.astro.build/en/concepts/why-astro/)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Markdown in Astro](https://docs.astro.build/en/guides/markdown-content/)