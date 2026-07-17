// --- ZzFX Micro Synthesizer ---
const zzfxV = 0.2; // Softer global volume
const zzfx = (...z) => {
    let b = zzfxX.createBuffer(1, 99999, 44100), c = b.getChannelData(0), d = 0, e = 0, f = 0, g = 0, h = 0, i = 0, j = 1, k = 0, l = 0, m = 0, n = 0, o = 0, p = 0, q = 0, r = 0, s = 0, t = 0, u = 0, v = 0, w = 0, x = 0, y = 0, A = 0, B = 0, C = 0, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0;
    let [L = 1, M = .05, N = 220, O = 0, P = 0, Q = .1, R = 0, S = 1, T = 0, U = 0, V = 0, W = 0, X = 0, Y = 0, Z = 0, $ = 0, _ = 0, aa = 1, ba = 0, ca = 0] = z;
    let da = 2 * Math.PI, ea = 44100, fa = R *= 500 * da / ea / ea, ga = N *= (1 + 2 * M * Math.random() - M) * da / ea, ha = 0, ia = 0, ja = 0, ka = 0, la = 0, ma = 0, na = 0, oa = 0, pa = 0;
    for (O = O * ea + 9, l = P * ea, m = Q * ea, n = m + l + O, o = T * da / ea, p = U * da / ea, q = V * ea, r = W * ea, s = X * ea, t = Y * ea, u = Z * ea, v = $ * ea, w = _ * da / ea, x = ba * da / ea, y = ca * da / ea, A = 0; A < n; A++) {
        B = A < O ? A / O : A < O + l ? 1 : 1 - (A - O - l) / m;
        C = ga + fa * (A < r ? A : r) + o * Math.sin(A * p); D = 1; E = Math.sin(ka); F = Math.sin(la); G = Math.sin(ma);
        switch (S) { case 0: H = Math.sin(ha); break; case 1: H = H > 0 ? 1 : -1; break; case 2: H = H > 0 ? 1 - 2 * H : 2 * H + 1; break; case 3: H = 1 - 2 * Math.abs(1 - 2 * (ha / da % 1)); break; case 4: H = 2 * Math.random() - 1; break; }
        H = H * D * B * L * zzfxV * (A < q ? A / q : 1) * (A > n - s ? (n - A) / s : 1) * (A > u ? 1 - (A - u) / v : 1);
        c[A] = H; ha += C;
    }
    b = zzfxX.createBufferSource(); b.buffer = b; b.connect(zzfxX.destination); b.start(); return b;
};
let zzfxX;

// SFX Library mapped to user constraints (softer, premium sounds)
const sfx = {
    boom: () => {}, 
    impact: () => zzfx(0.5,.1,400,.01,.1,.5,0,0,0,0,0,0,0,0,0,0,0,1,0,0), 
    whoosh: () => zzfx(1.5,.1,0,.5,.5,1,0,4,0,0,0,0,0,0,0,0,0,1,0,0),      
    revWhoosh: () => zzfx(1.5,.1,0,1,.1,.1,0,4,0,0,0,0,0,0,0,0,0,1,0,0),   
    click: () => zzfx(0.2,.1,800,.01,.05,.05,0,0,0,0,0,0,0,0,0,0,0,1,0,0), 
    notify: () => zzfx(0.5,.1,600,.05,.2,.5,0,0,0,0,0,0,0,0,0,0,0,1,0,0),    
    tick: () => zzfx(0.1,.1,1200,.01,.01,.05,0,0,0,0,0,0,0,0,0,0,0,1,0,0), 
    type: () => zzfx(0.05,.1,900,.01,.01,.02,0,0,0,0,0,0,0,0,0,0,0,1,0,0), 
    rise: () => zzfx(0.5,.1,200,.1,.5,1,0,0,0,0,0,0,0,500,0,0,0,1,0,0),
    bassHit: () => {} 
};

// Engine Setup
gsap.registerPlugin();
let tl = gsap.timeline({ paused: true });

function playVOMaster() {
    const bgm = document.getElementById('bgm');
    const master = document.getElementById('vo_master');
    
    if (master) {
        master.volume = 1.0;
        master.currentTime = 0;
        let playPromise = master.play();
        if (playPromise !== undefined) {
            playPromise.catch(e => console.log('VO Play prevented:', e));
        }
        
        // Smoothly fade down BGM
        if (bgm) gsap.to(bgm, { volume: 0.2, duration: 0.5, ease: "power2.out" }); 
        
        master.onended = () => {
            // Restore BGM beautifully at the end of the script
            if (bgm) gsap.to(bgm, { volume: 0.6, duration: 2.0, ease: "power2.inOut" });
        };
    }
}

function buildFilm() {
    new SplitType('.slam-text', { types: 'chars' });
    new SplitType('.type-text', { types: 'chars' });
    
    // Initial State Setup
    gsap.set('.scene', { autoAlpha: 0 });
    gsap.set('#camera-rig', { transformOrigin: '50% 50%', scale: 1, x: 0, y: 0, z: 0 });
    gsap.set('.type-text .char', { opacity: 0, y: 6 }); 
    gsap.set('.f-obj', { x: () => gsap.utils.random(-800, 800), y: () => gsap.utils.random(-400, 400), z: () => gsap.utils.random(-1000, 500) });
    
    // Set message bubbles to exact center, pushed far back, hidden
    gsap.set('.m-bub', { x: 0, y: 50, z: -500, scale: 0.5, opacity: 0 });

    // MASTER TIMELINE (Synchronized to continuous vo_master.mp3)
    // Audio length: ~78 seconds
    
    // -------------------------------------
    // SCENE 1 (0.0s - 21.8s)
    // -------------------------------------
    tl.call(playVOMaster, null, 0.0)
      .set('#sc-1-env', { autoAlpha: 1 }, 0.0)
      .to('.f-obj', { opacity: 1, stagger: 0.2, duration: 2, ease: "power2.out" }, 0.1)
      .to('#camera-rig', { scale: 1.15, z: 500, duration: 20, ease: "sine.inOut" }, 0.1)
      
      // 3.3s: Is this available?
      .to('.mb1', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 3.3)
      
      // 5.3s: Can I reserve it?
      .to('.mb1', { y: -100, z: -200, scale: 0.8, opacity: 0.3, filter: 'blur(4px)', duration: 0.5, ease: "power2.out" }, 5.3)
      .to('.mb4', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 5.3)
      
      // 7.1s: Do you have another size?
      .to('.mb1', { y: -200, z: -400, scale: 0.6, opacity: 0, duration: 0.5 }, 7.1)
      .to('.mb4', { y: -100, z: -200, scale: 0.8, opacity: 0.3, filter: 'blur(4px)', duration: 0.5, ease: "power2.out" }, 7.1)
      .to('.mb2', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 7.1)
      
      // 9.4s: Sometimes it's a message.
      .to('.mb4', { y: -200, z: -400, scale: 0.6, opacity: 0, duration: 0.5 }, 9.4)
      .to('.mb2', { y: -100, z: -200, scale: 0.8, opacity: 0.3, filter: 'blur(4px)', duration: 0.5, ease: "power2.out" }, 9.4)
      .to('.mb3', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 9.4)
      
      // 11.9s: Sometimes it's a photo.
      .to('.mb2', { y: -200, z: -400, scale: 0.6, opacity: 0, duration: 0.5 }, 11.9)
      .to('.mb3', { y: -100, z: -200, scale: 0.8, opacity: 0.3, filter: 'blur(4px)', duration: 0.5, ease: "power2.out" }, 11.9)
      .to('.mb6', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 11.9)
      
      // 14.3s: Sometimes it's a voice note.
      .to('.mb3', { y: -200, z: -400, scale: 0.6, opacity: 0, duration: 0.5 }, 14.3)
      .to('.mb6', { y: -100, z: -200, scale: 0.8, opacity: 0.3, filter: 'blur(4px)', duration: 0.5, ease: "power2.out" }, 14.3)
      .to('.mb5', { opacity: 1, scale: 1.2, y: 0, z: 100, duration: 0.6, ease: "back.out(1.5)", onStart: sfx.notify }, 14.3)
      
      .to('.floating-space, .msg-bubbles', { opacity: 0, filter: 'blur(20px)', scale: 0.8, duration: 1, ease: "power2.inOut" }, 16.0)

      // 16.9s: Customers don't search anymore
      .set('#ts-1', { autoAlpha: 1 }, 16.9)
      .call(sfx.impact, null, 16.9)
      .fromTo('#ts-1 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 16.9)
      .set('#ts-1', { autoAlpha: 0 }, 19.3) 
      
      // 19.6s: They simply ask
      .set('#ts-2', { autoAlpha: 1 }, 19.6)
      .call(sfx.impact, null, 19.6)
      .fromTo('#ts-2 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 19.6)
      .set('#ts-2', { autoAlpha: 0 }, 21.6)

      .to('#sc-1-env', { opacity: 0, duration: 0.1 }, 21.8)
      
    // -------------------------------------
    // SCENE 2 (21.8s - 29.4s)
    // -------------------------------------
      .set('#sc-2-reveal', { autoAlpha: 1 }, 21.8)
      .set('#camera-rig', { scale: 1, z: -1000, x: 0, y: 0 }, 21.8)
      .to('#camera-rig', { z: 0, duration: 3, ease: "power2.out" }, 21.8)
      
      // 21.8s: Presenting, Munim AI.
      .set('#rv-0', { autoAlpha: 1 }, 21.8) 
      .call(sfx.impact, null, 21.8)
      .fromTo('#rv-0 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 21.8)
      .set('#rv-0', { autoAlpha: 0 }, 23.0)
      
      .fromTo('.m-logo', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "elastic.out(1, 0.5)" }, 22.8)
      .set('#rv-1', { autoAlpha: 1 }, 22.8)
      .call(sfx.impact, null, 22.8)
      .fromTo('#rv-1 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 22.8)
      .set('#rv-1', { autoAlpha: 0 }, 24.3)
      
      // 24.5s: One WhatsApp Number
      .set('#rv-2', { autoAlpha: 1 }, 24.5)
      .call(sfx.impact, null, 24.5)
      .fromTo('#rv-2 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 24.5)
      .set('#rv-2', { autoAlpha: 0 }, 26.5)
      
      // 26.7s: Unlimited possibilities
      .set('#rv-3', { autoAlpha: 1 }, 26.7)
      .call(sfx.impact, null, 26.7)
      .fromTo('#rv-3 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 26.7)
      
      .call(sfx.whoosh, null, 28.8)
      .to('#camera-rig', { x: 2000, duration: 0.6, ease: "expo.in" }, 28.8)
      .set('#sc-2-reveal', { autoAlpha: 0 }, 29.4)
      
    // -------------------------------------
    // SCENE 4: Features (29.4s - 37.1s)
    // -------------------------------------
      .set('#sc-4-dash', { autoAlpha: 1 }, 29.4)
      .set('#camera-rig', { y: -2000, scale: 1, x: 0, z: 0 }, 29.4)
      .to('#camera-rig', { y: 0, duration: 0.6, ease: "expo.out" }, 29.4)
      .call(sfx.whoosh, null, 29.4)
      
      // Dashboard sits blurred in background
      .to('#main-dashboard-ui', { opacity: 0.5, scale: 0.95, filter: 'blur(4px)', duration: 0.8, ease: "expo.out" }, 29.4)
      
      // 29.4s: TEXT MESSAGE ("Whether your customer sends a message...")
      .set('#feat-text', { autoAlpha: 0, scale: 0.8, y: 50 }, 29.4)
      .to('#feat-text', { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)" }, 29.6)
      
      .to('#f-cursor', { opacity: 1, duration: 0.1 }, 29.8)
      .to('#f-type-text .char', { opacity: 1, y: 0, stagger: 0.05, duration: 0.1, onStart: () => {
          let t = setInterval(sfx.type, 50); setTimeout(() => clearInterval(t), 1200);
      }}, 29.9)
      .to('#f-cursor', { opacity: 0, duration: 0.1 }, 31.5)
      
      .to('#feat-text', { autoAlpha: 0, scale: 0.9, y: -30, duration: 0.4, ease: "power2.in" }, 31.8)

      // 32.2s: IMAGE SEARCH ("Shares a product image...")
      .set('#feat-img', { autoAlpha: 0, scale: 0.8, y: 50 }, 32.1)
      .to('#feat-img', { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)", onStart: sfx.whoosh }, 32.2)
      
      .to('#f-scan-line', { opacity: 1, duration: 0.2 }, 32.5)
      .to('#f-scan-line', { top: '100%', duration: 1, ease: "linear" }, 32.5)
      .to('#f-img-badge', { autoAlpha: 1, y: 0, duration: 0.4, ease: "back.out(2)", onStart: sfx.notify }, 33.6)
      
      .to('#feat-img', { autoAlpha: 0, scale: 0.9, y: -30, duration: 0.4, ease: "power2.in" }, 34.2)

      // 34.6s: VOICE NOTE ("Or records a voice note...")
      .set('#feat-voice', { autoAlpha: 0, scale: 0.8, y: 50 }, 34.5)
      .to('#feat-voice', { autoAlpha: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.2)", onStart: sfx.whoosh }, 34.6)
      
      .to('#f-mic-ring', { scale: 1.5, opacity: 0, duration: 1.5, repeat: 1, ease: "power2.out" }, 34.8)
      .to('.f-wf', { height: () => gsap.utils.random(10, 30), duration: 0.2, yoyo: true, repeat: 9, ease: "sine.inOut" }, 34.8)
      
      .to('#feat-voice', { autoAlpha: 0, scale: 0.9, y: -30, duration: 0.4, ease: "power2.in" }, 36.7)

    // -------------------------------------
    // DASHBOARD REVEAL & KEEP ALIVE (37.1s - 53.7s)
    // -------------------------------------
      // 37.1s: "Munim AI understands instantly..."
      .to('#main-dashboard-ui', { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: "power2.out" }, 37.1)
      .to('#camera-rig', { scale: 1.02, x: 0, y: 0, duration: 1.5, ease: "power2.inOut" }, 37.1)

      // Subtle motion loop while on screen
      .to('#camera-rig', { scale: 1.05, x: 30, y: -20, rotationY: 1, duration: 15, ease: "linear" }, 38.0)
      
      // 40.2s: "It identifies products."
      .to('#camera-rig', { scale: 1.08, x: 50, y: -30, duration: 2, ease: "power2.out" }, 40.2)
      
      // 42.8s: "Checks inventory."
      .call(sfx.rise, null, 42.8)
      .to('.bar.b1', { height: '40px', duration: 0.6, ease: "power2.out" }, 42.8)
      .to('.bar.b2', { height: '90px', duration: 0.6, ease: "power2.out" }, 43.1)
      .to('.bar.b3', { height: '70px', duration: 0.6, ease: "power2.out" }, 43.4)
      .to('.bar.b4', { height: '120px', duration: 0.6, ease: "power2.out", onStart: sfx.notify }, 43.7)
      
      // 44.9s: "Creates orders."
      .fromTo('.o-r-1', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.2)" }, 44.9)
      .fromTo('.o-r-2', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "back.out(1.2)" }, 45.4)
      
      // 46.9s: "Updates your dashboard."
      .to({val: 83999}, { val: 86500, duration: 1.5, ease: "power2.out", onUpdate: function() {
          let el = document.getElementById('c-rev');
          if(el) el.innerText = '₹' + Math.floor(this.targets()[0].val).toLocaleString('en-IN');
      }}, 46.9)
      .to('#c-rev', { color: '#10b981', duration: 0.2, yoyo: true, repeat: 1 }, 47.1)
      
      // 49.2s: "Tracks customers."
      .to('.metric-card', { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)', stagger: 0.2, duration: 0.4, yoyo: true, repeat: 1 }, 49.2)
      
      // 51.3s: "Generates analytics."
      .to('.sidebar .sb-item.active', { backgroundColor: 'rgba(16,185,129,0.2)', duration: 0.4, yoyo: true, repeat: 1 }, 51.3)
      
      // 53.7s: Transition to Inventory
      .to('#camera-rig', { z: 2000, rotationY: 0, duration: 0.6, ease: "expo.in" }, 53.5)
      .set('#sc-4-dash', { autoAlpha: 0 }, 54.1)
      
    // -------------------------------------
    // SCENE 5 (Inventory) (54.1s - 59.5s)
    // -------------------------------------
      .set('#sc-5-inv', { autoAlpha: 1 }, 54.1)
      .set('#camera-rig', { z: -2000, x:0, y:0, scale: 1 }, 54.1)
      .to('#camera-rig', { z: 0, duration: 0.6, ease: "expo.out" }, 54.1)
      .call(sfx.impact, null, 54.1)
      .to('#camera-rig', { scale: 1.06, duration: 4, ease: "power2.inOut" }, 54.1)
      
      // "All from a single WhatsApp conversation" (57.3s)
      .to('#inp-name .char', { opacity: 1, y: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", onStart: () => {
          let t = setInterval(sfx.type, 30); setTimeout(() => clearInterval(t), 200);
      }}, 55.0)
      .to('#inp-price .char', { opacity: 1, y: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", onStart: () => {
          let t = setInterval(sfx.type, 30); setTimeout(() => clearInterval(t), 150);
      }}, 56.0)
      .to('#inp-stock .char', { opacity: 1, y: 0, stagger: 0.03, duration: 0.2, ease: "power2.out", onStart: () => {
          let t = setInterval(sfx.type, 30); setTimeout(() => clearInterval(t), 60);
      }}, 57.0)
      
      .call(sfx.click, null, 58.0)
      .to('#btn-save', { scale: 1.05, backgroundColor: '#10b981', boxShadow: '0 0 20px rgba(16,185,129,0.3)', duration: 0.2, yoyo: true, repeat: 1 }, 58.0)
      
      .call(sfx.whoosh, null, 59.5)
      .to('#camera-rig', { x: -2000, duration: 0.6, ease: "expo.in" }, 59.5)
      .set('#sc-5-inv', { autoAlpha: 0 }, 60.1)

    // -------------------------------------
    // SCENE 6 (FINALE) (60.5s+)
    // -------------------------------------
      .set('#sc-6-finale', { autoAlpha: 1 }, 60.5)
      .set('#camera-rig', { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, z: -2000, x: 0 }, 60.5)
      .to('#camera-rig', { z: 0, duration: 0.6, ease: "expo.out" }, 60.5)
      .call(sfx.whoosh, null, 60.5)
      
      // 60.5s: Smarter conversations.
      .set('#f-slam-0', { autoAlpha: 1 }, 60.5)
      .call(sfx.impact, null, 60.5)
      .fromTo('#f-slam-0 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 60.5)
      .set('#f-slam-0', { autoAlpha: 0 }, 62.9)
      
      // 63.0s: Faster decisions.
      .set('#f-slam-1', { autoAlpha: 1 }, 63.0)
      .call(sfx.impact, null, 63.0)
      .fromTo('#f-slam-1 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 63.0)
      .set('#f-slam-1', { autoAlpha: 0 }, 65.2)

      // 65.3s: Happier customers.
      .set('#f-slam-2', { autoAlpha: 1 }, 65.3)
      .call(sfx.impact, null, 65.3)
      .fromTo('#f-slam-2 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 65.3)
      .set('#f-slam-2', { autoAlpha: 0 }, 67.3)

      // 67.4s: One intelligent assistant.
      .set('#f-slam-3', { autoAlpha: 1 }, 67.4)
      .call(sfx.impact, null, 67.4)
      .fromTo('#f-slam-3 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 67.4)
      .set('#f-slam-3', { autoAlpha: 0 }, 69.9)

      // 70.0s: One WhatsApp Number.
      .set('#f-slam-4', { autoAlpha: 1 }, 70.0)
      .call(sfx.impact, null, 70.0)
      .fromTo('#f-slam-4 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 70.0)
      .set('#f-slam-4', { autoAlpha: 0 }, 72.2)

      // 72.3s: Presenting, Munim AI.
      .set('#f-slam-5', { autoAlpha: 1 }, 72.3)
      .call(sfx.impact, null, 72.3)
      .fromTo('#f-slam-5 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 72.3)
      .set('#f-slam-5', { autoAlpha: 0 }, 74.9)

      .to('.f-logo', { autoAlpha: 1, y: -50, duration: 1, ease: "power2.out" }, 72.3)
      
      // 75.0s: The future of AI-powered business.
      .set('#f-slam-6', { autoAlpha: 1 }, 75.0)
      .call(sfx.impact, null, 75.0)
      .fromTo('#f-slam-6 .char', { scale: 0.95, autoAlpha: 0, y: 20, filter: 'blur(10px)' }, { scale: 1, autoAlpha: 1, y: 0, filter: 'blur(0px)', stagger: 0.03, duration: 0.7, ease: 'power3.out' }, 75.0)
      
      .to('#f-slam-6, .f-logo', { scale: 1.02, duration: 3, ease: "none" }, 75.8)
      .to('#camera-rig', { autoAlpha: 0, duration: 1, ease: "power2.in" }, 79.0)
      .to(document.getElementById('bgm'), { volume: 0, duration: 2, ease: "power2.inOut" }, 79.0);
}

window.startFilm = function() {
    zzfxX = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play Background Music
    const bgm = document.getElementById('bgm');
    if (bgm) {
        bgm.volume = 0.6; // Base volume is higher during transitions
        bgm.play().catch(e => console.log('BGM Play prevented:', e));
    }

    gsap.to('#preshow-camera', { scale: 50, opacity: 0, duration: 1, ease: "power4.in" });
    gsap.to('#start-overlay', { opacity: 0, duration: 1, onComplete: () => {
        document.getElementById('start-overlay').style.display = 'none';
    }});

    buildFilm();
    tl.play(); 
};
