---
locale: "en"
title: "Aiming for 100% Figma Fidelity with Design.md"
description: "Comparing three Codex implementations to see how Figma design tokens, a detailed design.md, and natural-language revisions affect fidelity."
publishedAt: 2026-10-22T12:00:00-07:00
cover: "../../../assets/images/blog/05-Design-md/design-md-thumbnail.webp"
coverAlt: "A design-token infographic slides into an envelope, followed by a large serif Design.md title"
coverVideoFallback: "/videos/blog/design-md-05-thumbnail.mp4"
tags: ["Design", "Figma", "AI", "Development"]
draft: false
---

This started when I revisited the pay overview screen of a dashboard I had designed. I noticed areas where my design skills had fallen short and thought, “I could have done this differently.” So I decided to revisit the design in Figma from the ground up.

I reviewed the color tokens, added spacing tokens, and aimed to use tokens wherever possible in the frames. Besides making future design changes easier, I thought this might help AI understand the Figma design more clearly.

I used this plugin to create Design.md:

[Figma DESIGN.md Generator - TypeUI](https://github.com/bergside/design-md-figma)

[Plugin on Figma Community](https://www.figma.com/community/plugin/1612814320994608244/design-md-generator)

![The Figma design and its design-token setup](../../../assets/images/blog/05-Design-md/figma-setup.webp)

First, I gave Codex the Figma link, an image of the design, and the generated Design.md.

![The first generated implementation of the pay overview screen](../../../assets/images/blog/05-Design-md/implementation-v1.webp)

[View the v1 implementation](https://ukg-pay-overview-design-md.vercel.app/v1/)

Visually, the result was reproduced to a high standard. The spacing, color, radius, and font-size tokens also appeared to be respected. However, closing the sidebar revealed elements I had not designed in Figma, hover behavior differed from what I expected, and the responsive layout needed more work. Having designed the UI myself, I noticed several rough edges.

Still, there were only a handful of these issues, and my impression was that they would not take too long to fix.

Next, I described the front-end implementation in more detail in Design.md: which libraries and stack to use, such as React + Vite and Highcharts, and specific calendar settings, such as a height of 360px with 15px representing one hour. I then asked for another implementation.

![The second implementation, generated with a more detailed stack and interaction specification](../../../assets/images/blog/05-Design-md/implementation-v2.webp)

[View the v2 implementation](https://ukg-pay-overview-design-md.vercel.app/v2/)

The appearance did not change much from the first attempt, and generation took longer, although I could see a small improvement in the interactive behavior. This felt like the limit of asking for a complete implementation in one pass with design.md, so I moved on to requesting individual changes in natural language to refine the appearance and behavior. I think those revisions took at least an hour in total.

[View the v3 implementation](https://ukg-pay-overview-design-md.vercel.app/v3/)

For a static website whose appearance does not change in response to user interaction, I would expect a single prompt to achieve a fairly high level of fidelity. The more rigorously the design system is defined in Figma, the more accurate the result should be.

For a dashboard like this one, however, appearance alone is not enough: the behavior also needs to be communicated. Even after revisions, interactions can still differ from what I intended, so iteration and QA take time. I think a stronger understanding of front-end development can help reduce the time spent on those revisions.
