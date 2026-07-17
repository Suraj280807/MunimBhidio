// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Setup GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// 1. Split Text setup
const splitElements = document.querySelectorAll('.split-text');
splitElements.forEach(el => {
    // Split into characters for fine-grained animation
    new SplitType(el, { types: 'chars, words' });
});

// Helper for char animations
const charAnim = {
    y: 50,
    opacity: 0,
    rotationX: -90,
    transformOrigin: "bottom center"
};
const charAnimTo = {
    y: 0,
    opacity: 1,
    rotationX: 0,
    ease: "back.out(1.7)",
    stagger: 0.02,
    duration: 1
};

// ============================================
// ScrollTrigger Animations Setup
// ============================================

// Scene 1: Problem
const tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-problem",
        start: "top center",
        end: "bottom top",
        scrub: false,
    }
});
tl1.fromTo("#scene-problem .problem-text:not(.delayed) .char", charAnim, charAnimTo)
   .fromTo("#scene-problem .problem-text.delayed .char", charAnim, charAnimTo, "+=1")
   .to("#scene-problem .content", { y: -100, opacity: 0, duration: 1, scrollTrigger: {
       trigger: "#scene-problem",
       start: "bottom center",
       scrub: 1
   }});

// Scene 2: Reveal
const tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-reveal",
        start: "top 70%",
        end: "bottom top",
    }
});
tl2.fromTo("#scene-reveal .until-now .char", charAnim, charAnimTo)
   .fromTo(".munim-logo", { scale: 0, rotation: -45, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, ease: "elastic.out(1, 0.5)", duration: 1.5 }, "+=0.5")
   .fromTo("#scene-reveal .brand-name .char", charAnim, charAnimTo, "-=1");

// Scene 3: Solution
const tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-solution",
        start: "top 60%",
    }
});
tl3.fromTo("#scene-solution .huge-text:not(.highlight-text) .char", charAnim, charAnimTo)
   .fromTo("#scene-solution .highlight-text .char", charAnim, { ...charAnimTo, color: "#4ae176" }, "-=0.5")
   .fromTo("#scene-solution .subtitle .char", charAnim, { ...charAnimTo, stagger: 0.01 }, "+=0.5");

// Function to animate feature scenes
function animateFeatureScene(sceneId, isReverse) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sceneId,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1
        }
    });

    // Parallax and float effect for glass panel
    gsap.fromTo(`${sceneId} .glass-panel`, 
        { y: 150, rotationY: isReverse ? -15 : 15, opacity: 0, scale: 0.8 },
        { 
            y: -50, 
            rotationY: 0, 
            opacity: 1, 
            scale: 1,
            scrollTrigger: {
                trigger: sceneId,
                start: "top 80%",
                end: "center center",
                scrub: 1
            }
        }
    );

    // Text animations
    gsap.fromTo(`${sceneId} .feature-title .char`, charAnim, {
        ...charAnimTo,
        scrollTrigger: { trigger: sceneId, start: "top 60%" }
    });
    gsap.fromTo(`${sceneId} .feature-desc .char`, charAnim, {
        ...charAnimTo, stagger: 0.01,
        scrollTrigger: { trigger: sceneId, start: "top 55%" }
    });
}

animateFeatureScene("#scene-sell", false);
animateFeatureScene("#scene-stock", true);
animateFeatureScene("#scene-customers", false);

// Inner animations for Sell Scene (Chat bubbles)
gsap.fromTo("#scene-sell .chat-bubble.user", 
    { x: -50, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: "#scene-sell", start: "top 40%" } }
);
gsap.fromTo("#scene-sell .chat-bubble.ai", 
    { x: 50, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 0.8, delay: 0.5, scrollTrigger: { trigger: "#scene-sell", start: "top 40%" } }
);

// Inner animations for Stock Scene
gsap.fromTo("#scene-stock .stock-count",
    { color: "#ffffff" },
    { color: "#ff3b3b", duration: 0.5, yoyo: true, repeat: 3, delay: 1, scrollTrigger: { trigger: "#scene-stock", start: "top 40%" } }
);

// Scene 7: Outro
const tlOutro = gsap.timeline({
    scrollTrigger: {
        trigger: "#scene-outro",
        start: "top 60%",
    }
});
tlOutro.fromTo("#scene-outro .munim-logo.large", 
    { scale: 0, rotationY: 90, opacity: 0 }, 
    { scale: 1, rotationY: 0, opacity: 1, ease: "back.out(1.5)", duration: 1.5 }
)
.fromTo("#scene-outro .brand-name .char", charAnim, charAnimTo, "-=0.5")
.fromTo("#scene-outro .subtitle .char", charAnim, { ...charAnimTo, stagger: 0.01 }, "-=0.5")
.fromTo(".cta-button", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "+=0.5");


// ============================================
// Cinematic Auto-Play Sequence (90 seconds)
// ============================================

// We wait 2 seconds, then smoothly scroll to the bottom over 90 seconds.
setTimeout(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    
    gsap.to(window, {
        scrollTo: { y: maxScroll, autoKill: false },
        duration: 90,
        ease: "power1.inOut",
        onUpdate: () => {
            // Let Lenis know about the forced scroll
            lenis.resize();
        }
    });
}, 2000);
