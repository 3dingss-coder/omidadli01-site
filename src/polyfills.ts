// src/polyfills.ts
//
// Feature-detected fallbacks for Web platform APIs that `motion`
// (framer-motion) uses without guarding, and that are missing on older
// engines (Safari <= 12.0, iOS <= 12.1, legacy Android WebView, etc).
//
// IMPORTANT: every installer below is a strict `typeof x === 'undefined'`
// guard. On any browser that already has the native API, nothing here
// runs and behavior is 100% unchanged (zero-cost, zero-behavior-change
// for modern browsers).
//
// This file MUST be the first import in src/main.tsx, before react/motion
// modules are evaluated, so the shims exist by the time those modules run
// their top-level feature checks / class extends.

// ---------------------------------------------------------------------------
// Bug 2 — queueMicrotask
// ---------------------------------------------------------------------------
// Missing in Safari <= 12.0, Chrome < 71, Firefox < 66.
if (typeof (window as any).queueMicrotask !== 'function') {
  (window as any).queueMicrotask = function queueMicrotaskShim(callback: () => void) {
    Promise.resolve().then(callback);
  };
}

// ---------------------------------------------------------------------------
// Bug 4 — AbortController
// ---------------------------------------------------------------------------
// Missing in Safari <= 11.0 and older engines.
if (typeof (window as any).AbortController === 'undefined') {
  class AbortSignalShim {
    aborted = false;
    private _listeners: Array<() => void> = [];
    // onabort is part of the real AbortSignal interface; keep it for parity.
    onabort: (() => void) | null = null;

    addEventListener(type: string, handler: () => void) {
      if (type !== 'abort' || typeof handler !== 'function') return;
      this._listeners.push(handler);
    }

    removeEventListener(type: string, handler: () => void) {
      if (type !== 'abort') return;
      const idx = this._listeners.indexOf(handler);
      if (idx !== -1) this._listeners.splice(idx, 1);
    }

    _fire() {
      if (this.aborted) return; // notify exactly once
      this.aborted = true;
      if (typeof this.onabort === 'function') {
        try {
          this.onabort();
        } catch {
          /* ignore listener errors, matches native EventTarget semantics closely enough */
        }
      }
      // Snapshot before iterating in case a handler mutates the list.
      const listeners = this._listeners.slice();
      this._listeners.length = 0;
      for (const fn of listeners) {
        try {
          fn();
        } catch {
          /* ignore listener errors */
        }
      }
    }
  }

  class AbortControllerShim {
    signal = new AbortSignalShim();
    abort() {
      this.signal._fire();
    }
  }

  (window as any).AbortController = AbortControllerShim;
}

// ---------------------------------------------------------------------------
// Bug 3 — PointerEvent constructor
// ---------------------------------------------------------------------------
// Safari <= 12 has no PointerEvent constructor. `motion` synthesizes one for
// its keyboard-Enter tap-gesture fallback: new PointerEvent('pointerup', {...}).
if (typeof (window as any).PointerEvent === 'undefined') {
  class PointerEventShim extends Event {
    pointerId: number;
    width: number;
    height: number;
    pressure: number;
    tangentialPressure: number;
    tiltX: number;
    tiltY: number;
    twist: number;
    pointerType: string;
    isPrimary: boolean;

    constructor(type: string, params: any = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.width = params.width ?? 1;
      this.height = params.height ?? 1;
      this.pressure = params.pressure ?? 0;
      this.tangentialPressure = params.tangentialPressure ?? 0;
      this.tiltX = params.tiltX ?? 0;
      this.tiltY = params.tiltY ?? 0;
      this.twist = params.twist ?? 0;
      this.pointerType = params.pointerType ?? '';
      this.isPrimary = params.isPrimary ?? true;
    }
  }

  (window as any).PointerEvent = PointerEventShim;
}

// ---------------------------------------------------------------------------
// Bug 1 — IntersectionObserver (CRITICAL: without this the site never loads)
// ---------------------------------------------------------------------------
if (typeof (window as any).IntersectionObserver === 'undefined') {
  type IOCallback = (records: IOEntryShim[], observer: IntersectionObserverShim) => void;

  interface IOEntryShim {
    target: Element;
    isIntersecting: boolean;
    intersectionRatio: number;
    boundingClientRect: DOMRectLike;
    intersectionRect: DOMRectLike;
    rootBounds: DOMRectLike | null;
    time: number;
  }

  interface DOMRectLike {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
    x: number;
    y: number;
  }

  function rectFrom(top: number, left: number, right: number, bottom: number): DOMRectLike {
    const width = Math.max(0, right - left);
    const height = Math.max(0, bottom - top);
    return { top, left, right, bottom, width, height, x: left, y: top };
  }

  function parseRootMargin(rootMargin: string): { top: number; right: number; bottom: number; left: number } {
    // CSS-order parts: top [right [bottom [left]]]. Supports px, %, vh, vw.
    const parts = (rootMargin || '0px').trim().split(/\s+/).slice(0, 4);
    const resolve = (part: string | undefined, axis: 'x' | 'y'): number => {
      if (!part) return 0;
      const m = /^(-?[\d.]+)(px|%|vh|vw)$/.exec(part);
      if (!m) return 0;
      const value = parseFloat(m[1]);
      const unit = m[2];
      if (unit === 'px') return value;
      if (unit === 'vh') return (value / 100) * window.innerHeight;
      if (unit === 'vw') return (value / 100) * window.innerWidth;
      if (unit === '%') {
        // Percentage of the relevant root axis.
        const base = axis === 'y' ? window.innerHeight : window.innerWidth;
        return (value / 100) * base;
      }
      return 0;
    };
    const [t, r, b, l] = parts;
    const top = resolve(t, 'y');
    const right = resolve(r ?? t, 'x');
    const bottom = resolve(b ?? t, 'y');
    const left = resolve(l ?? r ?? t, 'x');
    return { top, right, bottom, left };
  }

  function normalizeThreshold(threshold: number | number[] | undefined): number[] {
    let list = threshold === undefined ? [0] : Array.isArray(threshold) ? threshold.slice() : [threshold];
    list = list.filter((n) => typeof n === 'number' && !Number.isNaN(n) && n >= 0 && n <= 1);
    if (list.length === 0) list = [0];
    list.sort((a, b) => a - b);
    return list;
  }

  function bucketFor(ratio: number, thresholds: number[]): number {
    let bucket = -1;
    for (let i = 0; i < thresholds.length; i++) {
      if (ratio >= thresholds[i]) bucket = i;
    }
    // Anything with zero ratio (not intersecting at all) is always -1,
    // even if 0 is in the threshold list, UNLESS ratio === 0 AND 0 is a
    // real threshold the spec wants reported — keep it simple & practical:
    // treat exact 0 ratio with a 0 threshold present as bucket 0 only when
    // there truly is *some* geometric intersection (handled by caller).
    return bucket;
  }

  class IntersectionObserverShim {
    root: Element | null;
    rootMargin: string;
    thresholds: number[];

    private _callback: IOCallback;
    private _targets: Set<Element> = new Set();
    private _lastBucket: WeakMap<Element, number> = new WeakMap();
    private _timer: ReturnType<typeof setInterval> | null = null;
    private _onScrollOrResize = () => this._checkAll();

    constructor(callback: IOCallback, options: IntersectionObserverInit = {}) {
      if (typeof callback !== 'function') {
        throw new TypeError('IntersectionObserver: callback must be a function');
      }
      this._callback = callback;
      this.root = (options.root as Element | null) ?? null;
      this.rootMargin = options.rootMargin ?? '0px';
      this.thresholds = normalizeThreshold(options.threshold as number | number[] | undefined);
    }

    observe(target: Element) {
      if (!target || this._targets.has(target)) return;
      this._targets.add(target);
      // Guarantee the first evaluation fires by seeding an impossible bucket.
      this._lastBucket.set(target, -2);
      this._ensureRunning();
      // Evaluate this target on the next tick so callers that observe
      // synchronously during render still get an initial callback.
      this._checkAll();
    }

    unobserve(target: Element) {
      this._targets.delete(target);
      this._lastBucket.delete(target);
      if (this._targets.size === 0) this._stopRunning();
    }

    disconnect() {
      this._targets.clear();
      this._stopRunning();
    }

    takeRecords(): IOEntryShim[] {
      return [];
    }

    private _ensureRunning() {
      if (this._timer) return;
      this._timer = setInterval(() => this._checkAll(), 100);
      window.addEventListener('scroll', this._onScrollOrResize, { passive: true, capture: true });
      window.addEventListener('resize', this._onScrollOrResize, { passive: true });
    }

    private _stopRunning() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
      window.removeEventListener('scroll', this._onScrollOrResize, true as any);
      window.removeEventListener('resize', this._onScrollOrResize);
    }

    private _rootRect(): DOMRectLike {
      if (this.root) {
        const r = this.root.getBoundingClientRect();
        return rectFrom(r.top, r.left, r.right, r.bottom);
      }
      return rectFrom(0, 0, window.innerWidth, window.innerHeight);
    }

    private _expandedRootRect(): DOMRectLike {
      const base = this._rootRect();
      const m = parseRootMargin(this.rootMargin);
      return rectFrom(base.top - m.top, base.left - m.left, base.right + m.right, base.bottom + m.bottom);
    }

    private _checkAll() {
      if (this._targets.size === 0) return;
      const rootBounds = this._expandedRootRect();
      const now = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      const changed: IOEntryShim[] = [];

      for (const target of Array.from(this._targets)) {
        if (!target.isConnected) {
          // Dropped from the DOM: stop tracking it, don't throw.
          this._targets.delete(target);
          this._lastBucket.delete(target);
          continue;
        }

        const tr = target.getBoundingClientRect();
        const targetRect = rectFrom(tr.top, tr.left, tr.right, tr.bottom);

        let insideRootContainment = true;
        if (this.root && typeof this.root.contains === 'function') {
          insideRootContainment = this.root.contains(target);
        }

        let ratio = 0;
        let isIntersecting = false;
        let intersectionRect = rectFrom(0, 0, 0, 0);

        if (insideRootContainment) {
          const top = Math.max(targetRect.top, rootBounds.top);
          const left = Math.max(targetRect.left, rootBounds.left);
          const right = Math.min(targetRect.right, rootBounds.right);
          const bottom = Math.min(targetRect.bottom, rootBounds.bottom);
          const overlapW = Math.max(0, right - left);
          const overlapH = Math.max(0, bottom - top);
          const overlapArea = overlapW * overlapH;
          intersectionRect = rectFrom(top, left, right, bottom);

          const targetArea = targetRect.width * targetRect.height;
          if (targetArea > 0) {
            ratio = overlapArea > 0 ? Math.min(1, overlapArea / targetArea) : 0;
            isIntersecting = overlapArea > 0;
          } else {
            // Zero-area target: intersecting if its point is inside root.
            const pointInside =
              targetRect.left >= rootBounds.left &&
              targetRect.left <= rootBounds.right &&
              targetRect.top >= rootBounds.top &&
              targetRect.top <= rootBounds.bottom;
            isIntersecting = pointInside;
            ratio = pointInside ? 1 : 0;
          }
        }

        const bucket = isIntersecting ? bucketFor(ratio, this.thresholds) : -1;
        const lastBucket = this._lastBucket.get(target);

        if (bucket !== lastBucket) {
          this._lastBucket.set(target, bucket);
          changed.push({
            target,
            isIntersecting,
            intersectionRatio: ratio,
            boundingClientRect: targetRect,
            intersectionRect,
            rootBounds: this.root ? rootBounds : rootBounds,
            time: now,
          });
        }
      }

      if (this._targets.size === 0) this._stopRunning();
      if (changed.length > 0) {
        try {
          this._callback(changed, this);
        } catch {
          /* never let a consumer error break the observer loop */
        }
      }
    }
  }

  (window as any).IntersectionObserver = IntersectionObserverShim;
}

export {};
