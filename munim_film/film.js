// --- ZzFX - Zuper Zmall Zound Zynth - Micro Edition ---
// MIT License - Copyright 2019 Frank Force
// Customized for cinematic impact sounds
const zzfxV = 0.5;
const zzfx = (...z) => {
    let b = zzfxX.createBuffer(1, 99999, 44100), c = b.getChannelData(0), d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 1, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0;
    let [L = 1, M = .05, N = 220, O = 0, P = 0, Q = .1, R = 0, S = 1, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 1, ba = 0, ca = 0] = z;
    let da = 2 * Math.PI, ea = 44100, fa = R *= 500 * da / ea / ea, ga = N *= (1 + 2 * M * Math.random() - M) * da / ea, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0;
    for (O = O * ea + 9, l = P * ea, m = Q * ea, n = m + l + O, o = T * da / ea, p = U * da / ea, q = V * ea, r = W * ea, s = X * ea, t = Y * ea, u = Z * ea, v = $ * ea, w = _ * da / ea, x = ba * da / ea, y = ca * da / ea, A = 0; A < n; A++) {
        B = A < O ? A / O : A < O + l ? 1 : 1 - (A - O - l) / m;
        C = ga + fa * (A < r ? A : r) + o * Math.sin(A * p);
        D = 1;
        E = Math.sin(ka);
        F = Math.sin(la);
        G = Math.sin(ma);
        switch (S) {
            case 0: H = Math.sin(ha); break;
            case 1: H = H > 0 ? 1 : -1; break;
            case 2: H = H > 0 ? 1 - 2 * H : 2 * H + 1; break;
            case 3: H = 1 - 2 * Math.abs(1 - 2 * (ha / da % 1)); break;
            case 4: H = 2 * Math.random() - 1; break;
        }
        H = H * D * B * L * zzfxV * (A < q ? A / q : 1) * (A > n - s ? (n - A) / s : 1) * (A > u ? 1 - (A - u) / v : 1);
        c[A] = H;
        ha += C;
    }
    b = zzfxX.createBufferSource();
    b.buffer = b;
    b.connect(zzfxX.destination);
    b.start();
    return b;
};
let zzfxX;

// Synthetic Sound Presets (Cinematic)
const sfx = {
    bassHit: () => zzfx(2,.1,50,.1,1,2,0,0,0,0,0,0,0,0,0,0,0,1,0,0), // Deep sub hit
    whoosh: () => zzfx(1.5,.1,0,.5,.5,1,0,4,0,0,0,0,0,0,0,0,0,1,0,0), // Noise whoosh
    impact: () => zzfx(2,.1,100,.01,.1,1,0,4,0,0,0,0,0,0,0,0,0,1,0,0), // Hard slam
    glass: () => zzfx(1,.1,800,.01,.1,.5,0,0,0,0,0,0,0,0,0,0,0,1,0,0), // High UI click/glass
    digital: () => zzfx(0.5,.1,300,.01,.1,.1,0,1,0,0,0,0,0,0,0,0,0,1,0,0),
    whip: () => zzfx(1.5,.1,0,.1,.1,.5,0,4,0,0,0,0,0,0,0,0,0,1,0,0) // Fast whip pan
};

// ==========================================
// CINEMATIC GSAP TIMELINE
// ==========================================
gsap.registerPlugin();
const tl = gsap.timeline({ paused: true });

function buildFilm() {
    // Initial Setup
    gsap.set('.scene', { autoAlpha: 0 });
    gsap.set('#camera-rig', { transformOrigin: '50% 50%', z: 0 });

    // Scene 1: Typographic Slams (0:00 - 0:03)
    tl.set('#scene-words', { autoAlpha: 1 })
      
      // "MANAGE" Slam
      .call(sfx.bassHit)
      .call(sfx.impact)
      .fromTo('#word-manage', 
        { scale: 5, opacity: 0, z: 1000 }, 
        { scale: 1, opacity: 1, z: 0, duration: 0.1, ease: "power4.out" }
      )
      .to('#word-manage', { scale: 1.1, duration: 1, ease: "none" })
      
      // "YOUR" Slam
      .call(sfx.bassHit, null, "+=0.2")
      .call(sfx.impact)
      .fromTo('#word-your', 
        { scale: 5, opacity: 0, z: 1000 }, 
        { scale: 1, opacity: 1, z: 0, duration: 0.1, ease: "power4.out" }
      )
      .to('#word-manage', { opacity: 0, duration: 0.01 }, "<")
      .to('#word-your', { scale: 1.1, duration: 1, ease: "none" })
      
      // "SHOP." Slam
      .call(sfx.bassHit, null, "+=0.2")
      .call(sfx.impact)
      .fromTo('#word-shop', 
        { scale: 5, opacity: 0, z: 1000 }, 
        { scale: 1, opacity: 1, z: 0, duration: 0.1, ease: "power4.out" }
      )
      .to('#word-your', { opacity: 0, duration: 0.01 }, "<")
      .to('#word-shop', { scale: 1.1, duration: 1, ease: "none" })

      // Whip Pan / Crash Zoom Transition to Scene 2
      .call(sfx.whip, null, "+=0.5")
      .to('#camera-rig', { z: 2000, rotationY: -90, duration: 0.3, ease: "expo.in" })
      
      // Scene 2: Glass App (0:04 - 0:08)
      .set('#scene-words', { autoAlpha: 0 })
      .set('#scene-app', { autoAlpha: 1 })
      
      // Camera recovers from whip
      .to('#camera-rig', { z: -1000, rotationY: 90, duration: 0.01 })
      .call(sfx.impact)
      .to('#camera-rig', { z: 0, rotationY: 0, duration: 1, ease: "expo.out" })
      
      // Glass UI animates in
      .fromTo('#wa-mock', { y: 200, rotationX: 45, opacity: 0 }, { y: 0, rotationX: 0, opacity: 1, duration: 1, ease: "back.out(2)" }, "<0.2")
      
      // UI interactions
      .call(sfx.glass, null, "+=0.5")
      .fromTo('#chat-1', { scale: 0, transformOrigin: 'top left' }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" })
      .call(sfx.digital, null, "+=1")
      .fromTo('#chat-2', { scale: 0, transformOrigin: 'top right' }, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" })
      
      // Zoom into UI (Match cut)
      .call(sfx.whoosh, null, "+=1")
      .to('#camera-rig', { scale: 10, x: 2000, y: 1000, duration: 0.4, ease: "power4.in" })

      // Scene 3: Fast Features (0:09 - 0:13)
      .set('#scene-app', { autoAlpha: 0 })
      .set('#scene-features', { autoAlpha: 1 })
      
      // Camera reset flash
      .to('#camera-rig', { scale: 1, x: 0, y: 0, z: 0, duration: 0.01 })
      .call(sfx.impact)
      .fromTo('#global-flash', { opacity: 1 }, { opacity: 0, duration: 0.3 })
      
      // "SELL"
      .fromTo('#feat-sell', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.5, duration: 0.1 })
      .to('#feat-sell', { opacity: 0, scale: 2, duration: 0.2, ease: "power2.in" }, "+=0.5")
      
      // "TRACK STOCK"
      .call(sfx.impact)
      .fromTo('#feat-track', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.5, duration: 0.1 })
      .to('#feat-track', { opacity: 0, scale: 2, duration: 0.2, ease: "power2.in" }, "+=0.5")

      // "CRM"
      .call(sfx.impact)
      .fromTo('#feat-crm', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1.5, duration: 0.1 })
      .to('#feat-crm', { opacity: 0, scale: 2, duration: 0.2, ease: "power2.in" }, "+=0.5")

      // Scene 4: Liquid Wipe Transition (0:14 - 0:17)
      .set('#scene-features', { autoAlpha: 0 })
      .set('#scene-no-app', { autoAlpha: 1 })
      
      .call(sfx.bassHit)
      .call(sfx.whip)
      .to('#green-wipe', { scale: 5, duration: 0.6, ease: "expo.inOut" })
      .fromTo('#zero-install', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" })
      .to('#zero-install', { y: -100, opacity: 0, duration: 0.3, ease: "power2.in" }, "+=1")
      .call(sfx.glass)
      .fromTo('#just-wa', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(2)" })
      
      // Crash zoom through text
      .call(sfx.whoosh, null, "+=1")
      .to('#camera-rig', { z: 1500, duration: 0.5, ease: "expo.in" })

      // Scene 5: Finale (0:18 - end)
      .set('#scene-no-app', { autoAlpha: 0 })
      .set('#scene-finale', { autoAlpha: 1 })
      
      .to('#camera-rig', { z: 0, duration: 0.01 })
      .call(sfx.bassHit)
      .call(sfx.impact)
      
      // Logo and Volumetric light smash in
      .fromTo('.volumetric-light', { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 2, ease: "power4.out" })
      .fromTo('#final-logo-wrapper', { scale: 0, rotationZ: -180 }, { scale: 1, rotationZ: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }, "<")
      .fromTo('.finale-brand', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1")
      
      // Tagline subtle fade
      .fromTo('.finale-tagline', { opacity: 0, filter: 'blur(10px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1 }, "+=0.5")
      
      // Slow push in for ending
      .to('#camera-rig', { z: 200, duration: 4, ease: "none" }, "-=3")
      
      // Fade to black
      .to('#camera-rig', { opacity: 0, duration: 1 }, "+=1");
}

// Start Button Handler
document.getElementById('start-btn').addEventListener('click', () => {
    // Init Audio Context for ZZFX on user gesture
    zzfxX = new (window.AudioContext || window.webkitAudioContext)();
    
    // Hide start screen
    gsap.to('#start-screen', { 
        opacity: 0, 
        duration: 0.5, 
        onComplete: () => {
            document.getElementById('start-screen').style.display = 'none';
            buildFilm();
            tl.play(); // Start the cinematic timeline!
        }
    });
});
