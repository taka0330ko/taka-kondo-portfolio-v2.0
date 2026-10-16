---
locale: "en"
title: "What I Learned About Google Analytics Implementation and Privacy Policies"
description: "Notes on what I learned about implementing Google Analytics and preparing a privacy policy."
publishedAt: 2026-10-14
cover: "../../../assets/images/blog/04-GA4-Privacy-Policy/ga4-privacy-policy-04-thumbnail.webp"
coverAlt: "Yellow and orange world map particles forming a padlock beside the Google Analytics logo and article title"
coverVideoFallback: "/videos/blog/ga4-privacy-policy-04-thumbnail.mp4"
tags: ["Development", "Google Analytics", "Privacy"]
draft: false
---

### Learning About User Behavior Through Website Data
Recently I created a report the data collected by GA4 (Google Analytics 4), and I also integrated GA4 into WordPress sites.

Before starting this task, I was already fairly familiar with GA4, as I use it on this website. However, the insights I can gain are very limited since this website has very few visitors. So I enjoyed the opportunity to analyze data from a website with a lot of visitors.

In addition, this experience helped me understand why so many websites have a privacy policy page, even though people (myself included) usually don’t read it.

### Insights from a larger dataset
As I mentioned earlier, I hadn't had the chance to work with this much data until this task, so I found some interesting patterns. The website I reviewed were mainly community organizations' website. Compared with this portfolio site, they had more visitors, which made it easier to identify patterns in how people used them. For example, on one website, the contact page received more views than the newsletter page. This suggested that finding contact information was important reason people visited the site, helping me better understand its main role.

<figure style="margin-top: 2rem;">
  <video autoplay loop muted playsinline preload="metadata" poster="/images/blog/ga4-report-sample.png" aria-label="Animated GA4-style report comparing Contact and Newsletter page views using sample data" style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/blog/ga4-report-sample.mp4" type="video/mp4" />
    <a href="/videos/blog/ga4-report-sample.mp4">Watch the sample GA4 report animation</a>
  </video>
  <figcaption style="margin-top: 0.5rem; text-align: center; font-size: 0.875rem; color: inherit; opacity: 0.75;">Sample data for illustration only. Not actual client data.</figcaption>
</figure>

### Understanding Why Privacy Policies Matter
Until this task, my understanding of privacy policies was vague, and I couldn’t explain their purpose well. I vaguely thought websites with e-commerce or newsletters needed one, but I had never really thought about why.

This time, my manager asked me to use AI to help draft privacy policies. However, we had several websites, and each policy needed different content depending on the site’s features. For example, some had online stores, while others didn’t. What they all had in common was that they handled user data. Depending on the website, this could include names, email addresses, or payment information handled through a payment service. Even websites that don’t collect visitors’ names or email addresses can still process data through tools like GA4. 

I started by asking AI to audit each website and create an Excel spreadsheet listing which features each site did or didn’t have. After reviewing the results, I asked AI to create a customized privacy policy draft for each website.

This task taught me the importance of explaining how visitors’ data is used. Now it’s time to create a privacy policy page for this website, too!

### References

<ul>
  <li>
    <a href="https://termly.io/resources/articles/why-you-need-a-privacy-policy/" target="_blank" rel="noopener noreferrer">
      9 Key Reasons Why You Need a Privacy Policy
    </a>
  </li>
  <li>
    <a href="https://mcmillan.ca/insights/understanding-privacy-policies-clarifying-what-they-are-not-and-avoiding-common-misconceptions/" target="_blank" rel="noopener noreferrer">
      Understanding Privacy Policies: Clarifying What They Are Not, and Avoiding Common Misconceptions
    </a>
  </li>
</ul>
