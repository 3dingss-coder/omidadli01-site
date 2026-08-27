// scripts/test-polyfills.ts
//
// Unit tests for src/polyfills.ts, run directly under Node with `tsx`
// (see `npm run test:compat`). Node has no `window`/DOM, no
// IntersectionObserver, no queueMicrotask override target, no
// AbortController override target (Node *does* have AbortController /
// queueMicrotask natively, so those two "never override native" cases are
// tested against a *fake* pre-existing global to prove the guard works),
// and no PointerEvent — so it's a reasonable stand-in for legacy-browser
// conditions for exercising the shim logic in isolation.
//
// This does not exercise real layout/scroll timing; scripts/test-jsdom.mjs
// (optional) covers that with an actual DOM. This file focuses on the
// pure logic: thresholds, rootMargin parsing, intersection math, dedup,
// lifecycle, and the "never override native" guarantee for every shim.

let pass = 0;
let fail = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    pass++;
    console.log(`  \u2713 ${message}`);
  } else {
    fail++;
    console.error(`  \u2717 FAILED: ${message}`);
  }
}

async function group(name: string, fn: () => void | Promise<void>) {
  console.log(`\n${name}`);
  await fn();
}

// ---------------------------------------------------------------------------
// Minimal fake DOM so src/polyfills.ts (written for a browser `window`) can
// be loaded and exercised under plain Node via tsx.
// ---------------------------------------------------------------------------

class FakeEvent {
  type: string;
  bubbles: boolean;
  constructor(type: string, params: any = {}) {
    this.type = type;
    this.bubbles = !!params.bubbles;
  }
}

class FakeElement {
  private _rect: { top: number; left: number; right: number; bottom: number };
  isConnected = true;
  private _children: FakeElement[] = [];

  constructor(rect = { top: 0, left: 0, right: 0, bottom: 0 }) {
    this._rect = rect;
  }

  setRect(rect: { top: number; left: number; right: number; bottom: number }) {
    this._rect = rect;
  }

  getBoundingClientRect() {
    const { top, left, right, bottom } = this._rect;
    return { top, left, right, bottom, width: right - left, height: bottom - top, x: left, y: top };
  }

  appendChild(child: FakeElement) {
    this._children.push(child);
  }

  contains(el: FakeElement): boolean {
    return el === this || this._children.includes(el);
  }
}

const listeners: Record<string, Array<() => void>> = { scroll: [], resize: [] };

const fakeWindow: any = {
  innerWidth: 1000,
  innerHeight: 800,
  addEventListener(type: string, handler: () => void) {
    if (!listeners[type]) listeners[type] = [];
    listeners[type].push(handler);
  },
  removeEventListener(type: string, handler: () => void) {
    if (!listeners[type]) return;
    const idx = listeners[type].indexOf(handler);
    if (idx !== -1) listeners[type].splice(idx, 1);
  },
  Event: FakeEvent,
};

(global as any).window = fakeWindow;
(global as any).performance = { now: () => Date.now() };

// Timers: use real setInterval/clearInterval from Node (they exist globally).

// Load the polyfill module AFTER window exists. It self-installs onto
// `window` based on `typeof window.X === 'undefined'` checks, so we control
// what's "missing" by what we do/don't predefine on fakeWindow above.
async function loadPolyfills() {
  // Fresh module instance each call so re-running install logic is possible
  // across test groups without ts-node/tsx module caching interfering.
  const url = new URL('../src/polyfills.ts', import.meta.url);
  await import(`${url.href}?t=${Date.now()}-${Math.random()}`);
}

async function main() {
  // -------------------------------------------------------------------
  // queueMicrotask
  // -------------------------------------------------------------------
  await group('queueMicrotask shim', async () => {
    delete fakeWindow.queueMicrotask;
    await loadPolyfills();
    assert(typeof fakeWindow.queueMicrotask === 'function', 'installs a shim when missing');

    let ran = false;
    let syncFlag = true;
    fakeWindow.queueMicrotask(() => {
      ran = true;
      assert(syncFlag === false, 'runs on a microtask, not synchronously');
    });
    syncFlag = false;
    await Promise.resolve();
    await Promise.resolve();
    assert(ran, 'callback eventually runs');
  });

  await group('queueMicrotask — never overrides native', async () => {
    const native = () => {};
    fakeWindow.queueMicrotask = native;
    await loadPolyfills();
    assert(fakeWindow.queueMicrotask === native, 'existing native implementation is preserved');
  });

  // -------------------------------------------------------------------
  // AbortController
  // -------------------------------------------------------------------
  await group('AbortController shim', async () => {
    delete fakeWindow.AbortController;
    await loadPolyfills();
    assert(typeof fakeWindow.AbortController === 'function', 'installs a shim when missing');

    const ctrl = new fakeWindow.AbortController();
    assert(ctrl.signal.aborted === false, 'signal starts not aborted');

    let calls = 0;
    ctrl.signal.addEventListener('abort', () => calls++);
    ctrl.signal.addEventListener('abort', () => calls++);
    ctrl.abort();
    ctrl.abort(); // second call must be a no-op
    assert(ctrl.signal.aborted === true, 'aborted flips to true');
    assert(calls === 2, 'both listeners notified exactly once each (abort() itself only fires once)');
  });

  await group('AbortController — never overrides native', async () => {
    class NativeLike {}
    fakeWindow.AbortController = NativeLike;
    await loadPolyfills();
    assert(fakeWindow.AbortController === NativeLike, 'existing native implementation is preserved');
  });

  // -------------------------------------------------------------------
  // PointerEvent
  // -------------------------------------------------------------------
  await group('PointerEvent shim', async () => {
    delete fakeWindow.PointerEvent;
    await loadPolyfills();
    assert(typeof fakeWindow.PointerEvent === 'function', 'installs a shim when missing');

    const evt = new fakeWindow.PointerEvent('pointerup', { isPrimary: true, bubbles: true, pointerId: 7 });
    assert(evt.type === 'pointerup', 'event type is set');
    assert(evt.bubbles === true, 'bubbles option is forwarded to Event');
    assert(evt.isPrimary === true, 'isPrimary honors passed option');
    assert(evt.pointerId === 7, 'pointerId honors passed option');
    assert(evt.pointerType === '', 'pointerType has a sane default');
    assert(evt.pressure === 0, 'pressure has a sane default');

    const defaults = new fakeWindow.PointerEvent('pointerdown');
    assert(defaults.isPrimary === true, 'isPrimary defaults to true');
  });

  await group('PointerEvent — never overrides native', async () => {
    class NativeLike {}
    fakeWindow.PointerEvent = NativeLike;
    await loadPolyfills();
    assert(fakeWindow.PointerEvent === NativeLike, 'existing native implementation is preserved');
  });

  // -------------------------------------------------------------------
  // IntersectionObserver
  // -------------------------------------------------------------------
  await group('IntersectionObserver shim', async () => {
    delete fakeWindow.IntersectionObserver;
    await loadPolyfills();
    assert(typeof fakeWindow.IntersectionObserver === 'function', 'installs a shim when missing');

    // Throws TypeError for a non-function callback.
    let threw = false;
    try {
      new (fakeWindow.IntersectionObserver as any)('not a function');
    } catch (e) {
      threw = e instanceof TypeError;
    }
    assert(threw, 'throws TypeError for a non-function callback');

    // Fires once on observe(), reports correctly for in-viewport target.
    await new Promise<void>((resolve) => {
      const inViewport = new FakeElement({ top: 100, left: 100, right: 200, bottom: 200 });
      const records: any[] = [];
      const io = new fakeWindow.IntersectionObserver((entries: any[]) => {
        records.push(...entries);
      });
      io.observe(inViewport);
      setTimeout(() => {
        assert(records.length >= 1, 'fires at least once after observe() for an in-viewport target');
        assert(records[0].target === inViewport, 'record.target is the observed element');
        assert(records[0].isIntersecting === true, 'reports isIntersecting=true for a fully in-viewport target');
        io.disconnect();
        resolve();
      }, 50);
    });

    // Off-screen target never reported as intersecting.
    await new Promise<void>((resolve) => {
      const offscreen = new FakeElement({ top: -500, left: -500, right: -400, bottom: -400 });
      const records: any[] = [];
      const io = new fakeWindow.IntersectionObserver((entries: any[]) => {
        records.push(...entries);
      });
      io.observe(offscreen);
      setTimeout(() => {
        const anyIntersecting = records.some((r) => r.isIntersecting);
        assert(!anyIntersecting, 'off-screen target is never reported as intersecting');
        io.disconnect();
        resolve();
      }, 50);
    });

    // Fires on "scroll" into view (simulated via the scroll listener).
    await new Promise<void>((resolve) => {
      const target = new FakeElement({ top: 2000, left: 0, right: 100, bottom: 2100 }); // off-screen initially
      const records: any[] = [];
      const io = new fakeWindow.IntersectionObserver((entries: any[]) => {
        records.push(...entries);
      });
      io.observe(target);
      setTimeout(() => {
        const beforeCount = records.filter((r) => r.isIntersecting).length;
        assert(beforeCount === 0, 'not intersecting before scrolling into view');
        // Simulate scrolling the target into view, then a scroll event.
        target.setRect({ top: 10, left: 10, right: 110, bottom: 110 });
        for (const fn of listeners.scroll) fn();
        setTimeout(() => {
          const afterCount = records.filter((r) => r.isIntersecting).length;
          assert(afterCount > 0, 'scroll event triggers re-evaluation and reports the new intersection');
          io.disconnect();
          resolve();
        }, 20);
      }, 50);
    });

    // threshold: 1 — only fires "intersecting" once fully covered.
    await new Promise<void>((resolve) => {
      // Root defaults to the viewport (1000x800). Target only half inside.
      const target = new FakeElement({ top: 700, left: 0, right: 100, bottom: 900 }); // half off bottom
      const records: any[] = [];
      const io = new fakeWindow.IntersectionObserver(
        (entries: any[]) => {
          records.push(...entries);
        },
        { threshold: 1 }
      );
      io.observe(target);
      setTimeout(() => {
        const fullyIntersecting = records.some((r) => r.isIntersecting && r.intersectionRatio >= 1);
        assert(!fullyIntersecting, 'threshold:1 does not report intersecting for a partially-visible target');
        io.disconnect();
        resolve();
      }, 50);
    });

    // Negative rootMargin shrinks the effective root.
    await new Promise<void>((resolve) => {
      // Target sits right at the viewport edge (last 10px of an 800px-tall viewport).
      const target = new FakeElement({ top: 790, left: 0, right: 50, bottom: 810 });
      const records: any[] = [];
      const io = new fakeWindow.IntersectionObserver(
        (entries: any[]) => {
          records.push(...entries);
        },
        { rootMargin: '-50px' }
      );
      io.observe(target);
      setTimeout(() => {
        const anyIntersecting = records.some((r) => r.isIntersecting);
        assert(!anyIntersecting, 'negative rootMargin shrinks the root so an edge target is excluded');
        io.disconnect();
        resolve();
      }, 50);
    });

    // Stops after disconnect() — no further callback invocations.
    await new Promise<void>((resolve) => {
      const target = new FakeElement({ top: 0, left: 0, right: 50, bottom: 50 });
      let callCount = 0;
      const io = new fakeWindow.IntersectionObserver(() => {
        callCount++;
      });
      io.observe(target);
      setTimeout(() => {
        io.disconnect();
        const countAtDisconnect = callCount;
        target.setRect({ top: -500, left: -500, right: -450, bottom: -450 });
        for (const fn of listeners.scroll) fn();
        setTimeout(() => {
          assert(callCount === countAtDisconnect, 'disconnect() stops further callback invocations');
          resolve();
        }, 150);
      }, 50);
    });

    // Dropped DOM targets don't throw.
    await new Promise<void>((resolve) => {
      const target = new FakeElement({ top: 0, left: 0, right: 50, bottom: 50 });
      const io = new fakeWindow.IntersectionObserver(() => {});
      io.observe(target);
      setTimeout(() => {
        target.isConnected = false;
        let threwOnDrop = false;
        try {
          for (const fn of listeners.scroll) fn();
        } catch {
          threwOnDrop = true;
        }
        assert(!threwOnDrop, 'evaluating a target removed from the DOM does not throw');
        io.disconnect();
        resolve();
      }, 50);
    });
  });

  await group('IntersectionObserver — never overrides native', async () => {
    class NativeLike {
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    fakeWindow.IntersectionObserver = NativeLike;
    await loadPolyfills();
    assert(fakeWindow.IntersectionObserver === NativeLike, 'existing native implementation is preserved');
  });

  console.log(`\n${pass} passed, ${fail} failed\n`);
  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
