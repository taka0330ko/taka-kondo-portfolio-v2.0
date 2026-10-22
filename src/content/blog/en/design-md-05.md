---
locale: "en"
title: "Aiming for 100% Figma Fidelity with Design.md"
description: "Comparing three Codex implementations to see how Figma design tokens, a detailed design.md, and natural-language revisions affect fidelity."
publishedAt: 2026-10-20T12:00:00-07:00
cover: "../../../assets/images/blog/05-Design-md/design-md-thumbnail.webp"
coverAlt: "A design-token infographic slides into an envelope, followed by a large serif Design.md title"
coverVideoFallback: "/videos/blog/design-md-05-thumbnail.mp4"
tags: ["Design", "Figma", "AI", "Development"]
draft: false
---

### Revisiting the Figma design

This started when I revisited the pay overview screen of a dashboard I had designed. I noticed areas where my design skills had fallen short and thought, “I could have done this differently.” So I decided to revisit the design in Figma from the ground up.

I reviewed the color tokens, added spacing tokens, and aimed to use tokens wherever possible in the frames. Besides making future design changes easier, I thought this might help AI understand the Figma design more clearly.

![Figma variables organized into Primitive, Semantic, and Components collections alongside pay overview layouts at different screen sizes](../../../assets/images/blog/05-Design-md/figma-tokens-and-screens.webp)

I used this plugin to create Design.md:

<a href="https://www.figma.com/community/plugin/1612814320994608244/design-md-generator" target="_blank" rel="noopener noreferrer">Plugin on Figma Community</a>

![The Figma design and its design-token setup](../../../assets/images/blog/05-Design-md/figma-setup.webp)

### v1: The first implementation

First, I gave Codex the Figma link, an image of the design, and the generated Design.md.

![The first generated implementation of the pay overview screen](../../../assets/images/blog/05-Design-md/implementation-v1.webp)

Visually, the result was reproduced to a high standard. The spacing, color, radius, and font-size tokens also appeared to be respected. However, closing the sidebar revealed elements I had not designed in Figma, hover behavior differed from what I expected, and the responsive layout needed more work. Having designed the UI myself, I noticed several rough edges.

Still, there were only a handful of these issues, and my impression was that they would not take too long to fix.

<a href="https://ukg-pay-overview-design-md.vercel.app/v1/" target="_blank" rel="noopener noreferrer">View the v1 implementation</a>

### v2: More detailed specifications

Next, I described the front-end implementation in more detail in Design.md: which libraries and stack to use, such as React + Vite and Highcharts, and specific calendar settings, such as a height of 360px with 15px representing one hour. I then asked for another implementation.

![The second implementation, generated with a more detailed stack and interaction specification](../../../assets/images/blog/05-Design-md/implementation-v2.webp)

The appearance did not change much from the first attempt, and generation took longer, although I could see a small improvement in the interactive behavior.

<a href="https://ukg-pay-overview-design-md.vercel.app/v2/" target="_blank" rel="noopener noreferrer">View the v2 implementation</a>

### v3: Refining through conversation with the AI agent

This felt like the limit of asking for a complete implementation in one pass with design.md. From there, I refined the implementation by describing the changes to the AI agent in plain language, without editing the Figma design or code myself. I think those revisions took at least an hour in total.

<a href="https://ukg-pay-overview-design-md.vercel.app/v3/" target="_blank" rel="noopener noreferrer">View the v3 implementation</a>

### Fidelity and behavior

For a static website whose appearance does not change in response to user interaction, I would expect a single prompt to achieve a fairly high level of fidelity. The more rigorously the design system is defined in Figma, the more accurate the result should be.

For a dashboard like this one, however, appearance alone is not enough: the behavior also needs to be communicated. Even after revisions, interactions can still differ from what I intended, so iteration and QA take time. I think a stronger understanding of front-end development can help reduce the time spent on those revisions.

The Design.md files used and the results of each version are collected on the <a href="https://ukg-pay-overview-design-md.vercel.app/" target="_blank" rel="noopener noreferrer">comparison site</a>.
