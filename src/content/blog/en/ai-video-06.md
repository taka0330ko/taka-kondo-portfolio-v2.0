---
locale: "en"
title: "Creating Assets for a Promotional Video with Higgsfield (Seedance AI)"
description: "What I learned from using Higgsfield to replace people in footage, animate historical photographs, and prepare better source assets for AI video generation."
publishedAt: 2026-11-02T12:00:00-08:00
cover: "../../../assets/images/blog/06-AI-Video/ai-video-06-thumbnail.webp"
coverAlt: "The promotional video I created using Higgsfield"
coverVideoFallback: "/videos/blog/06-ai-video/promotion-video.mp4"
tags: ["AI", "Video", "Higgsfield", "Creative Process"]
draft: false
---

During my internship, I had an opportunity to try one of the latest video-generation AI tools, Higgsfield. My personal impression was that creating the stunning visuals shown in Higgsfield’s official promotional videos from simple assets and prompts is difficult, and that producing those kinds of videos still requires creativity from the person making them. Video-generation AI also uses up tokens quickly. Still, with the right use case, it can be just the tool you need to solve a specific problem.

## Replacing a person in stock footage

The most useful application I found for Higgsfield was modifying existing footage. When creating a promotional video, finding stock clips that meet your requirements in a short amount of time is not easy. During my internship, one particular challenge was finding suitable models while keeping diversity in mind. The target audience was First Nations people in Vancouver, but it was difficult to find footage featuring models who reflected that audience.

In those situations, I generated an image of the person I wanted using Gemini, then gave Higgsfield both that image and the footage I wanted to modify. With an appropriate prompt, I could get footage close to what I had in mind. I used ChatGPT to draft the prompts, then reviewed and revised them before passing them to Higgsfield.

![A reference image generated with Gemini for the replacement person](../../../assets/images/blog/06-AI-Video/reference-woman.jpeg)

*The reference image generated with Gemini. It was used as a reference for the person's appearance and clothing, rather than the background or pose.*

![Higgsfield's generation interface with the original footage, reference image, and prompt](../../../assets/images/blog/06-AI-Video/higgsfield-workflow.png)

*Higgsfield's generation interface. The original footage, a reference image, and a prompt are combined to replace the person.*

<figure>
  <video controls playsinline preload="metadata" aria-label="Before and after replacing the person: Original on the left, and the Seedance 2.5 result on the right." style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/blog/06-ai-video/original-vs-seedance-2.5.mp4" type="video/mp4" />
    <a href="/videos/blog/06-ai-video/original-vs-seedance-2.5.mp4">Before and after replacing the person: Original on the left, and the Seedance 2.5 result on the right.</a>
  </video>
  <figcaption>Before and after replacing the person: Original on the left, and the Seedance 2.5 result on the right.</figcaption>
</figure>

## Adding movement to old photographs

For another project, I also used the tool to make a single historical photograph more engaging. I gradually transformed it to look more like a modern photograph and added a little camera movement.

<figure>
  <video controls playsinline preload="metadata" aria-label="An example of adding color and camera movement to a photograph of an old building (a recording of the generation interface)." style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/blog/06-ai-video/historical-photo-barn.mp4" type="video/mp4" />
    <a href="/videos/blog/06-ai-video/historical-photo-barn.mp4">An example of adding color and camera movement to a photograph of an old building (a recording of the generation interface).</a>
  </video>
</figure>

<figure>
  <video controls playsinline preload="metadata" aria-label="Another example using a historical street photograph (a recording of the generation interface)." style="display: block; width: 100%; height: auto; border-radius: 8px;">
    <source src="/videos/blog/06-ai-video/historical-photo-street.mp4" type="video/mp4" />
    <a href="/videos/blog/06-ai-video/historical-photo-street.mp4">Another example using a historical street photograph (a recording of the generation interface).</a>
  </video>
</figure>

## The challenges and the importance of source assets

Video-generation AI does not always produce the footage you expect from a single image and a prompt.

The most important part of using Higgsfield, I felt, was the source material. Ideally, you should prepare images that communicate the scene you want for each part of the video.

For example, rather than providing only an image of an apple and asking it to “turn into a golden apple over 10 seconds,” you are more likely to get the result you want if you also provide an image showing how the golden apple should look at the end. In other words, I found that preparing images to serve as a storyboard was key to generating video.

Tasks such as replacing a person or turning a still image into a short video can be handled with a fairly high degree of accuracy. But deciding how to use those results still calls for a creator's imagination.

