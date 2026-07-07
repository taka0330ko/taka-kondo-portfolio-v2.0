import{t as e}from"./rolldown-runtime-Dh6celcD.js";var t,n=e((()=>{(function(){if(typeof document>`u`)return;let e=document.head.querySelectorAll(`style[data-astro-build]`);for(let t of e)if(t.getAttribute(`data-astro-build`)===`/Users/takanarikondo/Desktop/Portfolio/Astro/taka_kondo_portfolio/src/components/ui/MainProjectCard.astro:0`)return;let t=document.createElement(`style`);t.setAttribute(`data-astro-build`,`/Users/takanarikondo/Desktop/Portfolio/Astro/taka_kondo_portfolio/src/components/ui/MainProjectCard.astro:0`),t.textContent=`.mouse-track-card {
        position: relative;
        overflow: hidden;
    }

    .glow-effect {
        position: absolute;
        inset: 0;
        background: radial-gradient(
            circle 250px at var(--x, 0px) var(--y, 0px),
            var(--five-lines),
            transparent 80%
        );
        opacity: 0;
        transition: opacity 0.3s;
        pointer-events: none;
    }

    .mouse-track-card:hover .glow-effect {
        opacity: 1;
    }

    .content {
        position: relative;
        z-index: 10;
    }

    .project-cover-image {
        aspect-ratio: 16 / 10;
        display: block;
    }

    .project-cover-video {
        display: block;
    }

    .project-progress-bar {
        transform-origin: left center;
        transform: scaleX(0);
        will-change: transform;
    }

    .project-card:focus-within .project-progress-track {
        opacity: 1;
    }

    .project-card.is-video-active .project-cover-video,
    .project-card.is-video-active .project-progress-track {
        opacity: 1;
    }

    .project-card.is-video-active .project-cover-image {
        filter: blur(12px);
    }`,document.head.appendChild(t)})(),t=()=>{throw Error(`Astro components are rendered server-side by Storybook.`)},t.isAstroComponentFactory=!0,t.moduleId=`/Users/takanarikondo/Desktop/Portfolio/Astro/taka_kondo_portfolio/src/components/ui/MainProjectCard.astro`})),r,i=e((()=>{r={src:`./_astro/billow-tumbnail-CiOsawnd.png`,width:1440,height:950,format:`png`}})),a,o=e((()=>{a=``+new URL(`billow-cover-video-DjtRsn-4.mp4`,import.meta.url).href})),s,c=e((()=>{s={src:`./_astro/stone-honey-thumbnail-C8tRxRGi.jpg`,width:1920,height:1080,format:`jpg`}})),l,u,d,f;e((()=>{n(),i(),o(),c(),l={title:`UI/Card`,component:t,parameters:{layout:`fullscreen`},decorators:[e=>{let t=document.createElement(`main`);t.className=`min-h-screen bg-background px-6 py-12 md:px-12`;let n=document.createElement(`div`);return n.className=`mx-auto max-w-6xl`,n.append(e()),t.append(n),t}]},u={args:{href:`/billow`,cover:r,coverVideo:a,title:`Billow`,description:`AI chat-based dashboard built with Next.js, focusing on conversational UI and chat interaction design.`,summaryList:[`Redesigned and rebuilt an existing hackathon project to create a more scalable architecture`,`Improved maintainability by organizing API logic, state management, and UI responsibilities`,`Practiced a development process that prioritized code understanding and architecture while leveraging AI tools`],tag:`Web dev`}},d={args:{href:`/stone-and-honey`,cover:s,title:`Stone & Honey`,description:`Brand identity and packaging exploration for a premium nut butter concept.`,summaryList:[`Defined a warm visual system across typography, color, and packaging`,`Created product mockups to validate the brand expression across touchpoints`,`Balanced handmade cues with a clean retail-ready presentation`],tag:`Branding`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/billow',
    cover: BillowCover,
    coverVideo: BillowVideo,
    title: 'Billow',
    description: 'AI chat-based dashboard built with Next.js, focusing on conversational UI and chat interaction design.',
    summaryList: ['Redesigned and rebuilt an existing hackathon project to create a more scalable architecture', 'Improved maintainability by organizing API logic, state management, and UI responsibilities', 'Practiced a development process that prioritized code understanding and architecture while leveraging AI tools'],
    tag: 'Web dev'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    href: '/stone-and-honey',
    cover: StoneAndHoneyCover,
    title: 'Stone & Honey',
    description: 'Brand identity and packaging exploration for a premium nut butter concept.',
    summaryList: ['Defined a warm visual system across typography, color, and packaging', 'Created product mockups to validate the brand expression across touchpoints', 'Balanced handmade cues with a clean retail-ready presentation'],
    tag: 'Branding'
  }
}`,...d.parameters?.docs?.source}}},f=[`Default`,`WithoutVideo`]}))();export{u as Default,d as WithoutVideo,f as __namedExportsOrder,l as default};