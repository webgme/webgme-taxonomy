var app = (function () {
  "use strict";
  function e() {}
  function t(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function n(e) {
    return e();
  }
  function a() {
    return Object.create(null);
  }
  function i(e) {
    e.forEach(n);
  }
  function s(e) {
    return "function" == typeof e;
  }
  function r(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function o(t, n, a) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const a = t.subscribe(...n);
        return a.unsubscribe ? () => a.unsubscribe() : a;
      })(n, a)
    );
  }
  function c(e, t, n, a) {
    if (e) {
      const i = l(e, t, n, a);
      return e[0](i);
    }
  }
  function l(e, n, a, i) {
    return e[1] && i ? t(a.ctx.slice(), e[1](i(n))) : a.ctx;
  }
  function d(e, t, n, a) {
    if (e[2] && a) {
      const i = e[2](a(n));
      if (void 0 === t.dirty) return i;
      if ("object" == typeof i) {
        const e = [],
          n = Math.max(t.dirty.length, i.length);
        for (let a = 0; a < n; a += 1) e[a] = t.dirty[a] | i[a];
        return e;
      }
      return t.dirty | i;
    }
    return t.dirty;
  }
  function u(e, t, n, a, i, s) {
    if (i) {
      const r = l(t, n, a, s);
      e.p(r, i);
    }
  }
  function p(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }
  function m(e) {
    const t = {};
    for (const n in e) "$" !== n[0] && (t[n] = e[n]);
    return t;
  }
  function f(e, t) {
    const n = {};
    t = new Set(t);
    for (const a in e) t.has(a) || "$" === a[0] || (n[a] = e[a]);
    return n;
  }
  function h(e) {
    const t = {};
    for (const n in e) t[n] = !0;
    return t;
  }
  function I(e, t, n) {
    return e.set(n), t;
  }
  function b(t) {
    return t && s(t.destroy) ? t.destroy : e;
  }
  function g(e, t) {
    e.appendChild(t);
  }
  function T(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function C(e) {
    e.parentNode.removeChild(e);
  }
  function y(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function S(e) {
    return document.createElement(e);
  }
  function $(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function v(e) {
    return document.createTextNode(e);
  }
  function E() {
    return v(" ");
  }
  function x() {
    return v("");
  }
  function A(e, t, n, a) {
    return e.addEventListener(t, n, a), () => e.removeEventListener(t, n, a);
  }
  function D(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function N(e, t) {
    const n = Object.getOwnPropertyDescriptors(e.__proto__);
    for (const a in t)
      null == t[a]
        ? e.removeAttribute(a)
        : "style" === a
        ? (e.style.cssText = t[a])
        : "__value" === a
        ? (e.value = e[a] = t[a])
        : n[a] && n[a].set
        ? (e[a] = t[a])
        : D(e, a, t[a]);
  }
  function P(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function _(e, t) {
    e.value = null == t ? "" : t;
  }
  function O(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  let L;
  function R(e) {
    L = e;
  }
  function M() {
    if (!L) throw new Error("Function called outside component initialization");
    return L;
  }
  function k(e) {
    M().$$.on_mount.push(e);
  }
  function F(e) {
    M().$$.on_destroy.push(e);
  }
  function B() {
    const e = M();
    return (t, n, { cancelable: a = !1 } = {}) => {
      const i = e.$$.callbacks[t];
      if (i) {
        const s = (function (
          e,
          t,
          { bubbles: n = !1, cancelable: a = !1 } = {}
        ) {
          const i = document.createEvent("CustomEvent");
          return i.initCustomEvent(e, n, a, t), i;
        })(t, n, { cancelable: a });
        return (
          i.slice().forEach((t) => {
            t.call(e, s);
          }),
          !s.defaultPrevented
        );
      }
      return !0;
    };
  }
  function w(e, t) {
    return M().$$.context.set(e, t), t;
  }
  function H(e) {
    return M().$$.context.get(e);
  }
  function V(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const U = [],
    G = [],
    j = [],
    q = [],
    z = Promise.resolve();
  let Q = !1;
  function W() {
    Q || ((Q = !0), z.then(J));
  }
  function K(e) {
    j.push(e);
  }
  function X(e) {
    q.push(e);
  }
  const Y = new Set();
  let Z = 0;
  function J() {
    const e = L;
    do {
      for (; Z < U.length; ) {
        const e = U[Z];
        Z++, R(e), ee(e.$$);
      }
      for (R(null), U.length = 0, Z = 0; G.length; ) G.pop()();
      for (let e = 0; e < j.length; e += 1) {
        const t = j[e];
        Y.has(t) || (Y.add(t), t());
      }
      j.length = 0;
    } while (U.length);
    for (; q.length; ) q.pop()();
    (Q = !1), Y.clear(), R(e);
  }
  function ee(e) {
    if (null !== e.fragment) {
      e.update(), i(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(K);
    }
  }
  const te = new Set();
  let ne;
  function ae() {
    ne = { r: 0, c: [], p: ne };
  }
  function ie() {
    ne.r || i(ne.c), (ne = ne.p);
  }
  function se(e, t) {
    e && e.i && (te.delete(e), e.i(t));
  }
  function re(e, t, n, a) {
    if (e && e.o) {
      if (te.has(e)) return;
      te.add(e),
        ne.c.push(() => {
          te.delete(e), a && (n && e.d(1), a());
        }),
        e.o(t);
    } else a && a();
  }
  const oe =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function ce(e, t) {
    const n = {},
      a = {},
      i = { $$scope: 1 };
    let s = e.length;
    for (; s--; ) {
      const r = e[s],
        o = t[s];
      if (o) {
        for (const e in r) e in o || (a[e] = 1);
        for (const e in o) i[e] || ((n[e] = o[e]), (i[e] = 1));
        e[s] = o;
      } else for (const e in r) i[e] = 1;
    }
    for (const e in a) e in n || (n[e] = void 0);
    return n;
  }
  function le(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function de(e, t, n) {
    const a = e.$$.props[t];
    void 0 !== a && ((e.$$.bound[a] = n), n(e.$$.ctx[a]));
  }
  function ue(e) {
    e && e.c();
  }
  function pe(e, t, a, r) {
    const { fragment: o, on_mount: c, on_destroy: l, after_update: d } = e.$$;
    o && o.m(t, a),
      r ||
        K(() => {
          const t = c.map(n).filter(s);
          l ? l.push(...t) : i(t), (e.$$.on_mount = []);
        }),
      d.forEach(K);
  }
  function me(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (i(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function fe(t, n, s, r, o, c, l, d = [-1]) {
    const u = L;
    R(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: c,
      update: e,
      not_equal: o,
      bound: a(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (u ? u.$$.context : [])),
      callbacks: a(),
      dirty: d,
      skip_bound: !1,
      root: n.target || u.$$.root,
    });
    l && l(p.root);
    let m = !1;
    if (
      ((p.ctx = s
        ? s(t, n.props || {}, (e, n, ...a) => {
            const i = a.length ? a[0] : n;
            return (
              p.ctx &&
                o(p.ctx[e], (p.ctx[e] = i)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](i),
                m &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (U.push(e), W(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (m = !0),
      i(p.before_update),
      (p.fragment = !!r && r(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(C);
      } else p.fragment && p.fragment.c();
      n.intro && se(t.$$.fragment),
        pe(t, n.target, n.anchor, n.customElement),
        J();
    }
    R(u);
  }
  class he {
    $destroy() {
      me(this, 1), (this.$destroy = e);
    }
    $on(e, t) {
      const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
      return (
        n.push(t),
        () => {
          const e = n.indexOf(t);
          -1 !== e && n.splice(e, 1);
        }
      );
    }
    $set(e) {
      var t;
      this.$$set &&
        ((t = e), 0 !== Object.keys(t).length) &&
        ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
    }
  }
  var Ie = function (e, t) {
    return (
      (Ie =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      Ie(e, t)
    );
  };
  function be(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    Ie(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var ge = function () {
    return (
      (ge =
        Object.assign ||
        function (e) {
          for (var t, n = 1, a = arguments.length; n < a; n++)
            for (var i in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          return e;
        }),
      ge.apply(this, arguments)
    );
  };
  function Te(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      a = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && a >= e.length && (e = void 0), { value: e && e[a++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Ce = (function () {
    function e(e) {
      void 0 === e && (e = {}), (this.adapter = e);
    }
    return (
      Object.defineProperty(e, "cssClasses", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "strings", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "numbers", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(e, "defaultAdapter", {
        get: function () {
          return {};
        },
        enumerable: !1,
        configurable: !0,
      }),
      (e.prototype.init = function () {}),
      (e.prototype.destroy = function () {}),
      e
    );
  })();
  /**
   * @license
   * Copyright 2019 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var ye = Object.freeze({
    __proto__: null,
    applyPassive: function (e) {
      return (
        void 0 === e && (e = window),
        !!(function (e) {
          void 0 === e && (e = window);
          var t = !1;
          try {
            var n = {
                get passive() {
                  return (t = !0), !1;
                },
              },
              a = function () {};
            e.document.addEventListener("test", a, n),
              e.document.removeEventListener("test", a, n);
          } catch (e) {
            t = !1;
          }
          return t;
        })(e) && { passive: !0 }
      );
    },
  });
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ function Se(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var $e,
    ve = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (Se(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: Se,
      estimateScrollWidth: function (e) {
        var t = e;
        if (null !== t.offsetParent) return t.scrollWidth;
        var n = t.cloneNode(!0);
        n.style.setProperty("position", "absolute"),
          n.style.setProperty("transform", "translate(-9999px, -9999px)"),
          document.documentElement.appendChild(n);
        var a = n.scrollWidth;
        return document.documentElement.removeChild(n), a;
      },
    }),
    Ee = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    xe = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    Ae = {
      DEACTIVATION_TIMEOUT_MS: 225,
      FG_DEACTIVATION_MS: 150,
      INITIAL_ORIGIN_SCALE: 0.6,
      PADDING: 10,
      TAP_DELAY_MS: 300,
    };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var De = ["touchstart", "pointerdown", "mousedown", "keydown"],
    Ne = ["touchend", "pointerup", "mouseup", "contextmenu"],
    Pe = [],
    _e = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.activationAnimationHasEnded = !1),
          (a.activationTimer = 0),
          (a.fgDeactivationRemovalTimer = 0),
          (a.fgScale = "0"),
          (a.frame = { width: 0, height: 0 }),
          (a.initialSize = 0),
          (a.layoutFrame = 0),
          (a.maxRadius = 0),
          (a.unboundedCoords = { left: 0, top: 0 }),
          (a.activationState = a.defaultActivationState()),
          (a.activationTimerCallback = function () {
            (a.activationAnimationHasEnded = !0),
              a.runDeactivationUXLogicIfReady();
          }),
          (a.activateHandler = function (e) {
            a.activateImpl(e);
          }),
          (a.deactivateHandler = function () {
            a.deactivateImpl();
          }),
          (a.focusHandler = function () {
            a.handleFocus();
          }),
          (a.blurHandler = function () {
            a.handleBlur();
          }),
          (a.resizeHandler = function () {
            a.layout();
          }),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ee;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return xe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ae;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              browserSupportsCssVars: function () {
                return !0;
              },
              computeBoundingRect: function () {
                return {
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  width: 0,
                  height: 0,
                };
              },
              containsEventTarget: function () {
                return !0;
              },
              deregisterDocumentInteractionHandler: function () {},
              deregisterInteractionHandler: function () {},
              deregisterResizeHandler: function () {},
              getWindowPageOffset: function () {
                return { x: 0, y: 0 };
              },
              isSurfaceActive: function () {
                return !0;
              },
              isSurfaceDisabled: function () {
                return !0;
              },
              isUnbounded: function () {
                return !0;
              },
              registerDocumentInteractionHandler: function () {},
              registerInteractionHandler: function () {},
              registerResizeHandler: function () {},
              removeClass: function () {},
              updateCssVariable: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          var e = this,
            n = this.supportsPressRipple();
          if ((this.registerRootHandlers(n), n)) {
            var a = t.cssClasses,
              i = a.ROOT,
              s = a.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(i),
                e.adapter.isUnbounded() &&
                  (e.adapter.addClass(s), e.layoutInternal());
            });
          }
        }),
        (t.prototype.destroy = function () {
          var e = this;
          if (this.supportsPressRipple()) {
            this.activationTimer &&
              (clearTimeout(this.activationTimer),
              (this.activationTimer = 0),
              this.adapter.removeClass(t.cssClasses.FG_ACTIVATION)),
              this.fgDeactivationRemovalTimer &&
                (clearTimeout(this.fgDeactivationRemovalTimer),
                (this.fgDeactivationRemovalTimer = 0),
                this.adapter.removeClass(t.cssClasses.FG_DEACTIVATION));
            var n = t.cssClasses,
              a = n.ROOT,
              i = n.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.removeClass(a),
                e.adapter.removeClass(i),
                e.removeCssVars();
            });
          }
          this.deregisterRootHandlers(), this.deregisterDeactivationHandlers();
        }),
        (t.prototype.activate = function (e) {
          this.activateImpl(e);
        }),
        (t.prototype.deactivate = function () {
          this.deactivateImpl();
        }),
        (t.prototype.layout = function () {
          var e = this;
          this.layoutFrame && cancelAnimationFrame(this.layoutFrame),
            (this.layoutFrame = requestAnimationFrame(function () {
              e.layoutInternal(), (e.layoutFrame = 0);
            }));
        }),
        (t.prototype.setUnbounded = function (e) {
          var n = t.cssClasses.UNBOUNDED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.handleFocus = function () {
          var e = this;
          requestAnimationFrame(function () {
            return e.adapter.addClass(t.cssClasses.BG_FOCUSED);
          });
        }),
        (t.prototype.handleBlur = function () {
          var e = this;
          requestAnimationFrame(function () {
            return e.adapter.removeClass(t.cssClasses.BG_FOCUSED);
          });
        }),
        (t.prototype.supportsPressRipple = function () {
          return this.adapter.browserSupportsCssVars();
        }),
        (t.prototype.defaultActivationState = function () {
          return {
            activationEvent: void 0,
            hasDeactivationUXRun: !1,
            isActivated: !1,
            isProgrammatic: !1,
            wasActivatedByPointer: !1,
            wasElementMadeActive: !1,
          };
        }),
        (t.prototype.registerRootHandlers = function (e) {
          var t, n;
          if (e) {
            try {
              for (var a = Te(De), i = a.next(); !i.done; i = a.next()) {
                var s = i.value;
                this.adapter.registerInteractionHandler(
                  s,
                  this.activateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                i && !i.done && (n = a.return) && n.call(a);
              } finally {
                if (t) throw t.error;
              }
            }
            this.adapter.isUnbounded() &&
              this.adapter.registerResizeHandler(this.resizeHandler);
          }
          this.adapter.registerInteractionHandler("focus", this.focusHandler),
            this.adapter.registerInteractionHandler("blur", this.blurHandler);
        }),
        (t.prototype.registerDeactivationHandlers = function (e) {
          var t, n;
          if ("keydown" === e.type)
            this.adapter.registerInteractionHandler(
              "keyup",
              this.deactivateHandler
            );
          else
            try {
              for (var a = Te(Ne), i = a.next(); !i.done; i = a.next()) {
                var s = i.value;
                this.adapter.registerDocumentInteractionHandler(
                  s,
                  this.deactivateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                i && !i.done && (n = a.return) && n.call(a);
              } finally {
                if (t) throw t.error;
              }
            }
        }),
        (t.prototype.deregisterRootHandlers = function () {
          var e, t;
          try {
            for (var n = Te(De), a = n.next(); !a.done; a = n.next()) {
              var i = a.value;
              this.adapter.deregisterInteractionHandler(
                i,
                this.activateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              a && !a.done && (t = n.return) && t.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
          this.adapter.deregisterInteractionHandler("focus", this.focusHandler),
            this.adapter.deregisterInteractionHandler("blur", this.blurHandler),
            this.adapter.isUnbounded() &&
              this.adapter.deregisterResizeHandler(this.resizeHandler);
        }),
        (t.prototype.deregisterDeactivationHandlers = function () {
          var e, t;
          this.adapter.deregisterInteractionHandler(
            "keyup",
            this.deactivateHandler
          );
          try {
            for (var n = Te(Ne), a = n.next(); !a.done; a = n.next()) {
              var i = a.value;
              this.adapter.deregisterDocumentInteractionHandler(
                i,
                this.deactivateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              a && !a.done && (t = n.return) && t.call(n);
            } finally {
              if (e) throw e.error;
            }
          }
        }),
        (t.prototype.removeCssVars = function () {
          var e = this,
            n = t.strings;
          Object.keys(n).forEach(function (t) {
            0 === t.indexOf("VAR_") && e.adapter.updateCssVariable(n[t], null);
          });
        }),
        (t.prototype.activateImpl = function (e) {
          var t = this;
          if (!this.adapter.isSurfaceDisabled()) {
            var n = this.activationState;
            if (!n.isActivated) {
              var a = this.previousActivationEvent;
              if (!(a && void 0 !== e && a.type !== e.type))
                (n.isActivated = !0),
                  (n.isProgrammatic = void 0 === e),
                  (n.activationEvent = e),
                  (n.wasActivatedByPointer =
                    !n.isProgrammatic &&
                    void 0 !== e &&
                    ("mousedown" === e.type ||
                      "touchstart" === e.type ||
                      "pointerdown" === e.type)),
                  void 0 !== e &&
                  Pe.length > 0 &&
                  Pe.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (Pe.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (Pe = []),
                          n.wasElementMadeActive ||
                            void 0 === e ||
                            (" " !== e.key && 32 !== e.keyCode) ||
                            ((n.wasElementMadeActive =
                              t.checkElementMadeActive(e)),
                            n.wasElementMadeActive && t.animateActivation()),
                          n.wasElementMadeActive ||
                            (t.activationState = t.defaultActivationState());
                      }));
            }
          }
        }),
        (t.prototype.checkElementMadeActive = function (e) {
          return (
            void 0 === e ||
            "keydown" !== e.type ||
            this.adapter.isSurfaceActive()
          );
        }),
        (t.prototype.animateActivation = function () {
          var e = this,
            n = t.strings,
            a = n.VAR_FG_TRANSLATE_START,
            i = n.VAR_FG_TRANSLATE_END,
            s = t.cssClasses,
            r = s.FG_DEACTIVATION,
            o = s.FG_ACTIVATION,
            c = t.numbers.DEACTIVATION_TIMEOUT_MS;
          this.layoutInternal();
          var l = "",
            d = "";
          if (!this.adapter.isUnbounded()) {
            var u = this.getFgTranslationCoordinates(),
              p = u.startPoint,
              m = u.endPoint;
            (l = p.x + "px, " + p.y + "px"), (d = m.x + "px, " + m.y + "px");
          }
          this.adapter.updateCssVariable(a, l),
            this.adapter.updateCssVariable(i, d),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(r),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(o),
            (this.activationTimer = setTimeout(function () {
              e.activationTimerCallback();
            }, c));
        }),
        (t.prototype.getFgTranslationCoordinates = function () {
          var e,
            t = this.activationState,
            n = t.activationEvent;
          return {
            startPoint: (e = {
              x:
                (e = t.wasActivatedByPointer
                  ? (function (e, t, n) {
                      if (!e) return { x: 0, y: 0 };
                      var a,
                        i,
                        s = t.x,
                        r = t.y,
                        o = s + n.left,
                        c = r + n.top;
                      if ("touchstart" === e.type) {
                        var l = e;
                        (a = l.changedTouches[0].pageX - o),
                          (i = l.changedTouches[0].pageY - c);
                      } else {
                        var d = e;
                        (a = d.pageX - o), (i = d.pageY - c);
                      }
                      return { x: a, y: i };
                    })(
                      n,
                      this.adapter.getWindowPageOffset(),
                      this.adapter.computeBoundingRect()
                    )
                  : { x: this.frame.width / 2, y: this.frame.height / 2 }).x -
                this.initialSize / 2,
              y: e.y - this.initialSize / 2,
            }),
            endPoint: {
              x: this.frame.width / 2 - this.initialSize / 2,
              y: this.frame.height / 2 - this.initialSize / 2,
            },
          };
        }),
        (t.prototype.runDeactivationUXLogicIfReady = function () {
          var e = this,
            n = t.cssClasses.FG_DEACTIVATION,
            a = this.activationState,
            i = a.hasDeactivationUXRun,
            s = a.isActivated;
          (i || !s) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, Ae.FG_DEACTIVATION_MS)));
        }),
        (t.prototype.rmBoundedActivationClasses = function () {
          var e = t.cssClasses.FG_ACTIVATION;
          this.adapter.removeClass(e),
            (this.activationAnimationHasEnded = !1),
            this.adapter.computeBoundingRect();
        }),
        (t.prototype.resetActivationState = function () {
          var e = this;
          (this.previousActivationEvent = this.activationState.activationEvent),
            (this.activationState = this.defaultActivationState()),
            setTimeout(function () {
              return (e.previousActivationEvent = void 0);
            }, t.numbers.TAP_DELAY_MS);
        }),
        (t.prototype.deactivateImpl = function () {
          var e = this,
            t = this.activationState;
          if (t.isActivated) {
            var n = ge({}, t);
            t.isProgrammatic
              ? (requestAnimationFrame(function () {
                  e.animateDeactivation(n);
                }),
                this.resetActivationState())
              : (this.deregisterDeactivationHandlers(),
                requestAnimationFrame(function () {
                  (e.activationState.hasDeactivationUXRun = !0),
                    e.animateDeactivation(n),
                    e.resetActivationState();
                }));
          }
        }),
        (t.prototype.animateDeactivation = function (e) {
          var t = e.wasActivatedByPointer,
            n = e.wasElementMadeActive;
          (t || n) && this.runDeactivationUXLogicIfReady();
        }),
        (t.prototype.layoutInternal = function () {
          var e = this;
          this.frame = this.adapter.computeBoundingRect();
          var n = Math.max(this.frame.height, this.frame.width);
          this.maxRadius = this.adapter.isUnbounded()
            ? n
            : Math.sqrt(
                Math.pow(e.frame.width, 2) + Math.pow(e.frame.height, 2)
              ) + t.numbers.PADDING;
          var a = Math.floor(n * t.numbers.INITIAL_ORIGIN_SCALE);
          this.adapter.isUnbounded() && a % 2 != 0
            ? (this.initialSize = a - 1)
            : (this.initialSize = a),
            (this.fgScale = "" + this.maxRadius / this.initialSize),
            this.updateLayoutCssVars();
        }),
        (t.prototype.updateLayoutCssVars = function () {
          var e = t.strings,
            n = e.VAR_FG_SIZE,
            a = e.VAR_LEFT,
            i = e.VAR_TOP,
            s = e.VAR_FG_SCALE;
          this.adapter.updateCssVariable(n, this.initialSize + "px"),
            this.adapter.updateCssVariable(s, this.fgScale),
            this.adapter.isUnbounded() &&
              ((this.unboundedCoords = {
                left: Math.round(this.frame.width / 2 - this.initialSize / 2),
                top: Math.round(this.frame.height / 2 - this.initialSize / 2),
              }),
              this.adapter.updateCssVariable(
                a,
                this.unboundedCoords.left + "px"
              ),
              this.adapter.updateCssVariable(
                i,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Ce),
    Oe = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    Le = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    Re = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Me = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        be(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Re;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Oe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Le;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setStyle: function () {},
              getTopAppBarHeight: function () {
                return 0;
              },
              notifyNavigationIconClicked: function () {},
              getViewportScrollY: function () {
                return 0;
              },
              getTotalActionItems: function () {
                return 0;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.handleTargetScroll = function () {}),
        (t.prototype.handleWindowResize = function () {}),
        (t.prototype.handleNavigationClick = function () {
          this.adapter.notifyNavigationIconClicked();
        }),
        t
      );
    })(Ce),
    ke = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (
          (n.wasDocked = !0),
          (n.isDockedShowing = !0),
          (n.currentAppBarOffsetTop = 0),
          (n.isCurrentlyBeingResized = !1),
          (n.resizeThrottleId = 0),
          (n.resizeDebounceId = 0),
          (n.lastScrollPosition = n.adapter.getViewportScrollY()),
          (n.topAppBarHeight = n.adapter.getTopAppBarHeight()),
          n
        );
      }
      return (
        be(t, e),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this), this.adapter.setStyle("top", "");
        }),
        (t.prototype.handleTargetScroll = function () {
          var e = Math.max(this.adapter.getViewportScrollY(), 0),
            t = e - this.lastScrollPosition;
          (this.lastScrollPosition = e),
            this.isCurrentlyBeingResized ||
              ((this.currentAppBarOffsetTop -= t),
              this.currentAppBarOffsetTop > 0
                ? (this.currentAppBarOffsetTop = 0)
                : Math.abs(this.currentAppBarOffsetTop) >
                    this.topAppBarHeight &&
                  (this.currentAppBarOffsetTop = -this.topAppBarHeight),
              this.moveTopAppBar());
        }),
        (t.prototype.handleWindowResize = function () {
          var e = this;
          this.resizeThrottleId ||
            (this.resizeThrottleId = setTimeout(function () {
              (e.resizeThrottleId = 0), e.throttledResizeHandler();
            }, Le.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, Le.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
        }),
        (t.prototype.checkForUpdate = function () {
          var e = -this.topAppBarHeight,
            t = this.currentAppBarOffsetTop < 0,
            n = this.currentAppBarOffsetTop > e,
            a = t && n;
          if (a) this.wasDocked = !1;
          else {
            if (!this.wasDocked) return (this.wasDocked = !0), !0;
            if (this.isDockedShowing !== n)
              return (this.isDockedShowing = n), !0;
          }
          return a;
        }),
        (t.prototype.moveTopAppBar = function () {
          if (this.checkForUpdate()) {
            var e = this.currentAppBarOffsetTop;
            Math.abs(e) >= this.topAppBarHeight &&
              (e = -Le.MAX_TOP_APP_BAR_HEIGHT),
              this.adapter.setStyle("top", e + "px");
          }
        }),
        (t.prototype.throttledResizeHandler = function () {
          var e = this.adapter.getTopAppBarHeight();
          this.topAppBarHeight !== e &&
            ((this.wasDocked = !1),
            (this.currentAppBarOffsetTop -= this.topAppBarHeight - e),
            (this.topAppBarHeight = e)),
            this.handleTargetScroll();
        }),
        t
      );
    })(Me),
    Fe = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        be(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(Oe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(Oe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(ke),
    Be = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        be(t, e),
        Object.defineProperty(t.prototype, "isCollapsed", {
          get: function () {
            return this.collapsed;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          e.prototype.init.call(this),
            this.adapter.getTotalActionItems() > 0 &&
              this.adapter.addClass(Oe.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(Oe.SHORT_COLLAPSED_CLASS)
            );
        }),
        (t.prototype.setAlwaysCollapsed = function (e) {
          (this.isAlwaysCollapsed = !!e),
            this.isAlwaysCollapsed ? this.collapse() : this.maybeCollapseBar();
        }),
        (t.prototype.getAlwaysCollapsed = function () {
          return this.isAlwaysCollapsed;
        }),
        (t.prototype.handleTargetScroll = function () {
          this.maybeCollapseBar();
        }),
        (t.prototype.maybeCollapseBar = function () {
          this.isAlwaysCollapsed ||
            (this.adapter.getViewportScrollY() <= 0
              ? this.collapsed && this.uncollapse()
              : this.collapsed || this.collapse());
        }),
        (t.prototype.uncollapse = function () {
          this.adapter.removeClass(Oe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(Oe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(Me);
  const we = [];
  function He(t, n = e) {
    let a;
    const i = new Set();
    function s(e) {
      if (r(t, e) && ((t = e), a)) {
        const e = !we.length;
        for (const e of i) e[1](), we.push(e, t);
        if (e) {
          for (let e = 0; e < we.length; e += 2) we[e][0](we[e + 1]);
          we.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (r, o = e) {
        const c = [r, o];
        return (
          i.add(c),
          1 === i.size && (a = n(s) || e),
          r(t),
          () => {
            i.delete(c), 0 === i.size && (a(), (a = null));
          }
        );
      },
    };
  }
  function Ve(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function Ue(e, t, n, a = { bubbles: !0 }, i = !1) {
    if ("undefined" != typeof Event && e) {
      const s = new CustomEvent(
        t,
        Object.assign(Object.assign({}, a), { detail: n })
      );
      if ((null == e || e.dispatchEvent(s), i && t.startsWith("SMUI"))) {
        const i = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, a), { detail: n })
        );
        null == e || e.dispatchEvent(i),
          i.defaultPrevented && s.preventDefault();
      }
      return s;
    }
  }
  function Ge(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const a = {};
    for (let i = 0; i < n.length; i++) {
      const s = n[i],
        r = s.indexOf("$");
      (-1 !== r && -1 !== t.indexOf(s.substring(0, r + 1))) ||
        (-1 === t.indexOf(s) && (a[s] = e[s]));
    }
    return a;
  }
  const je =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    qe =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function ze(e) {
    let t,
      n = [];
    function a(t) {
      V(e, t);
    }
    return (
      (e.$on = (e, a) => {
        let i = e,
          s = () => {};
        t ? (s = t(i, a)) : n.push([i, a]);
        return (
          i.match(je) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              i
            ),
          () => {
            s();
          }
        );
      }),
      (e) => {
        const i = [],
          s = {};
        t = (t, n) => {
          let r = t,
            o = n,
            c = !1;
          const l = r.match(je),
            d = r.match(qe),
            u = l || d;
          if (r.match(/^SMUI:\w+:/)) {
            const e = r.split(":");
            let t = "";
            for (let n = 0; n < e.length; n++)
              t +=
                n === e.length - 1
                  ? ":" + e[n]
                  : e[n]
                      .split("-")
                      .map((e) => e.slice(0, 1).toUpperCase() + e.slice(1))
                      .join("");
            console.warn(
              `The event ${r.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (r = t);
          }
          if (u) {
            const e = r.split(l ? ":" : "$");
            r = e[0];
            const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
            t.passive && ((c = c || {}), (c.passive = !0)),
              t.nonpassive && ((c = c || {}), (c.passive = !1)),
              t.capture && ((c = c || {}), (c.capture = !0)),
              t.once && ((c = c || {}), (c.once = !0)),
              t.preventDefault &&
                ((p = o),
                (o = function (e) {
                  return e.preventDefault(), p.call(this, e);
                })),
              t.stopPropagation &&
                (o = (function (e) {
                  return function (t) {
                    return t.stopPropagation(), e.call(this, t);
                  };
                })(o));
          }
          var p;
          const m = A(e, r, o, c),
            f = () => {
              m();
              const e = i.indexOf(f);
              e > -1 && i.splice(e, 1);
            };
          return i.push(f), r in s || (s[r] = A(e, r, a)), f;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < i.length; e++) i[e]();
            for (let e of Object.entries(s)) e[1]();
          },
        };
      }
    );
  }
  function Qe(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const a = {};
    for (let i = 0; i < n.length; i++) {
      const s = n[i];
      s.substring(0, t.length) === t && (a[s.substring(t.length)] = e[s]);
    }
    return a;
  }
  function We(e, t) {
    let n = [];
    if (t)
      for (let a = 0; a < t.length; a++) {
        const i = t[a],
          s = Array.isArray(i) ? i[0] : i;
        Array.isArray(i) && i.length > 1 ? n.push(s(e, i[1])) : n.push(s(e));
      }
    return {
      update(e) {
        if (((e && e.length) || 0) != n.length)
          throw new Error(
            "You must not change the length of an actions array."
          );
        if (e)
          for (let t = 0; t < e.length; t++) {
            const a = n[t];
            if (a && a.update) {
              const n = e[t];
              Array.isArray(n) && n.length > 1 ? a.update(n[1]) : a.update();
            }
          }
      },
      destroy() {
        for (let e = 0; e < n.length; e++) {
          const t = n[e];
          t && t.destroy && t.destroy();
        }
      },
    };
  }
  const { window: Ke } = oe;
  function Xe(e) {
    let n, a, r, o, l, m, f;
    const h = e[22].default,
      I = c(h, e, e[21], null);
    let g = [
        {
          class: (a = Ve({
            [e[2]]: !0,
            "mdc-top-app-bar": !0,
            "mdc-top-app-bar--short": "short" === e[4],
            "mdc-top-app-bar--short-collapsed": e[0],
            "mdc-top-app-bar--fixed": "fixed" === e[4],
            "smui-top-app-bar--static": "static" === e[4],
            "smui-top-app-bar--color-secondary": "secondary" === e[5],
            "mdc-top-app-bar--prominent": e[6],
            "mdc-top-app-bar--dense": e[7],
            ...e[11],
          })),
        },
        { style: (r = Object.entries(e[12]).map(Ye).concat([e[3]]).join(" ")) },
        e[15],
      ],
      y = {};
    for (let e = 0; e < g.length; e += 1) y = t(y, g[e]);
    return {
      c() {
        (n = S("header")), I && I.c(), N(n, y);
      },
      m(t, a) {
        T(t, n, a),
          I && I.m(n, null),
          e[25](n),
          (l = !0),
          m ||
            ((f = [
              A(Ke, "resize", e[23]),
              A(Ke, "scroll", e[24]),
              b((o = We.call(null, n, e[1]))),
              b(e[13].call(null, n)),
              A(n, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!l || 2097152 & t[0]) &&
          u(I, h, e, e[21], l ? d(h, e[21], t, null) : p(e[21]), null),
          N(
            n,
            (y = ce(g, [
              (!l ||
                (2293 & t[0] &&
                  a !==
                    (a = Ve({
                      [e[2]]: !0,
                      "mdc-top-app-bar": !0,
                      "mdc-top-app-bar--short": "short" === e[4],
                      "mdc-top-app-bar--short-collapsed": e[0],
                      "mdc-top-app-bar--fixed": "fixed" === e[4],
                      "smui-top-app-bar--static": "static" === e[4],
                      "smui-top-app-bar--color-secondary": "secondary" === e[5],
                      "mdc-top-app-bar--prominent": e[6],
                      "mdc-top-app-bar--dense": e[7],
                      ...e[11],
                    })))) && { class: a },
              (!l ||
                (4104 & t[0] &&
                  r !==
                    (r = Object.entries(e[12])
                      .map(Ye)
                      .concat([e[3]])
                      .join(" ")))) && { style: r },
              32768 & t[0] && e[15],
            ]))
          ),
          o && s(o.update) && 2 & t[0] && o.update.call(null, e[1]);
      },
      i(e) {
        l || (se(I, e), (l = !0));
      },
      o(e) {
        re(I, e), (l = !1);
      },
      d(t) {
        t && C(n), I && I.d(t), e[25](null), (m = !1), i(f);
      },
    };
  }
  const Ye = ([e, t]) => `${e}: ${t};`;
  function Ze(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "variant",
      "color",
      "collapsed",
      "prominent",
      "dense",
      "scrollTarget",
      "getPropStore",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l = () => {};
    function d(e) {
      return e === l;
    }
    let { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { variant: I = "standard" } = n,
      { color: b = "primary" } = n,
      { collapsed: g = l } = n;
    const T = !d(g) && !!g;
    d(g) && (g = !1);
    let C,
      y,
      S,
      { prominent: $ = !1 } = n,
      { dense: v = !1 } = n,
      { scrollTarget: E } = n,
      x = {},
      A = {},
      D = {
        subscribe: He({ variant: I, prominent: $, dense: v }, (e) => {
          a(18, (S = e));
        }).subscribe,
      };
    let N,
      P = I;
    function _() {
      return new ({ static: Me, short: Be, fixed: Fe }[I] || ke)({
        hasClass: O,
        addClass: L,
        removeClass: R,
        setStyle: F,
        getTopAppBarHeight: () => C.clientHeight,
        notifyNavigationIconClicked: () =>
          Ue(C, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == E ? window.pageYOffset : E.scrollTop,
        getTotalActionItems: () =>
          C.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function O(e) {
      return e in x ? x[e] : w().classList.contains(e);
    }
    function L(e) {
      x[e] || a(11, (x[e] = !0), x);
    }
    function R(e) {
      (e in x && !x[e]) || a(11, (x[e] = !1), x);
    }
    function F(e, t) {
      A[e] != t &&
        ("" === t || null == t
          ? (delete A[e], a(12, A), a(20, P), a(4, I), a(9, y))
          : a(12, (A[e] = t), A));
    }
    function B() {
      y &&
        (y.handleTargetScroll(),
        "short" === I && a(0, (g = "isCollapsed" in y && y.isCollapsed)));
    }
    function w() {
      return C;
    }
    k(
      () => (
        a(9, (y = _())),
        y.init(),
        () => {
          y.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(15, (s = f(n, i))),
          "use" in e && a(1, (u = e.use)),
          "class" in e && a(2, (p = e.class)),
          "style" in e && a(3, (h = e.style)),
          "variant" in e && a(4, (I = e.variant)),
          "color" in e && a(5, (b = e.color)),
          "collapsed" in e && a(0, (g = e.collapsed)),
          "prominent" in e && a(6, ($ = e.prominent)),
          "dense" in e && a(7, (v = e.dense)),
          "scrollTarget" in e && a(8, (E = e.scrollTarget)),
          "$$scope" in e && a(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          S &&
          S({ variant: I, prominent: $, dense: v }),
          1049104 & e.$$.dirty[0] &&
            P !== I &&
            y &&
            (a(20, (P = I)),
            y.destroy(),
            a(11, (x = {})),
            a(12, (A = {})),
            a(9, (y = _())),
            y.init()),
          528 & e.$$.dirty[0] &&
            y &&
            "short" === I &&
            "setAlwaysCollapsed" in y &&
            y.setAlwaysCollapsed(T),
          524544 & e.$$.dirty[0] &&
            N !== E &&
            (N && N.removeEventListener("scroll", B),
            E && E.addEventListener("scroll", B),
            a(19, (N = E)));
      }),
      [
        g,
        u,
        p,
        h,
        I,
        b,
        $,
        v,
        E,
        y,
        C,
        x,
        A,
        c,
        B,
        s,
        function () {
          return D;
        },
        w,
        S,
        N,
        P,
        o,
        r,
        () => "short" !== I && "fixed" !== I && y && y.handleWindowResize(),
        () => null == E && B(),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (C = e), a(10, C);
          });
        },
        () => y && y.handleNavigationClick(),
      ]
    );
  }
  class Je extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Ze,
          Xe,
          r,
          {
            use: 1,
            class: 2,
            style: 3,
            variant: 4,
            color: 5,
            collapsed: 0,
            prominent: 6,
            dense: 7,
            scrollTarget: 8,
            getPropStore: 16,
            getElement: 17,
          },
          null,
          [-1, -1]
        );
    }
    get getPropStore() {
      return this.$$.ctx[16];
    }
    get getElement() {
      return this.$$.ctx[17];
    }
  }
  function et(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("div")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function tt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  class nt extends he {
    constructor(e) {
      super(), fe(this, e, tt, et, r, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function at(e) {
    let t;
    const n = e[10].default,
      a = c(n, e, e[12], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 4096 & i) &&
          u(a, n, e, e[12], t ? d(n, e[12], i, null) : p(e[12]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function it(e) {
    let n, a, i;
    const s = [
      { use: [e[7], ...e[0]] },
      { class: Ve({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var r = e[2];
    function o(e) {
      let n = { $$slots: { default: [at] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r && ((n = new r(o(e))), e[11](n)),
      {
        c() {
          n && ue(n.$$.fragment), (a = x());
        },
        m(e, t) {
          n && pe(n, e, t), T(e, a, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            499 & t
              ? ce(s, [
                  129 & t && { use: [e[7], ...e[0]] },
                  50 & t && { class: Ve({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & t && le(e[6]),
                  256 & t && le(e[8]),
                ])
              : {};
          if (
            (4096 & t && (i.$$scope = { dirty: t, ctx: e }), r !== (r = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              re(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            r
              ? ((n = new r(o(e))),
                e[11](n),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else r && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && re(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[11](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  const st = {
    component: nt,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function rt(e, n, a) {
    const i = ["use", "class", "component", "getElement"];
    let s,
      r = f(n, i),
      { $$slots: o = {}, $$scope: c } = n,
      { use: l = [] } = n,
      { class: d = "" } = n;
    const u = st.class,
      p = {},
      h = [],
      I = st.contexts,
      b = st.props;
    let { component: g = st.component } = n;
    Object.entries(st.classMap).forEach(([e, t]) => {
      const n = H(t);
      n &&
        "subscribe" in n &&
        h.push(
          n.subscribe((t) => {
            a(4, (p[e] = t), p);
          })
        );
    });
    const T = ze(M());
    for (let e in I) I.hasOwnProperty(e) && w(e, I[e]);
    return (
      F(() => {
        for (const e of h) e();
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(8, (r = f(n, i))),
          "use" in e && a(0, (l = e.use)),
          "class" in e && a(1, (d = e.class)),
          "component" in e && a(2, (g = e.component)),
          "$$scope" in e && a(12, (c = e.$$scope));
      }),
      [
        l,
        d,
        g,
        s,
        p,
        u,
        b,
        T,
        r,
        function () {
          return s.getElement();
        },
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (s = e), a(3, s);
          });
        },
        c,
      ]
    );
  }
  class ot extends he {
    constructor(e) {
      super(),
        fe(this, e, rt, it, r, {
          use: 0,
          class: 1,
          component: 2,
          getElement: 9,
        });
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  }
  const ct = Object.assign({}, st);
  function lt(e) {
    return new Proxy(ot, {
      construct: function (t, n) {
        return Object.assign(st, ct, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(st, ct, e), t[n];
      },
    });
  }
  function dt(e) {
    let n, a, r, o, l;
    const m = e[7].default,
      f = c(m, e, e[6], null);
    let h = [{ href: e[1] }, e[4]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("a")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[8](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[3].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 64 & t) &&
          u(f, m, e, e[6], r ? d(m, e[6], t, null) : p(e[6]), null),
          N(n, (I = ce(h, [(!r || 2 & t) && { href: e[1] }, 16 & t && e[4]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[8](null), (o = !1), i(l);
      },
    };
  }
  function ut(e, n, a) {
    const i = ["use", "href", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n,
      { href: l = "javascript:void(0);" } = n;
    const d = ze(M());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(4, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "href" in e && a(1, (l = e.href)),
          "$$scope" in e && a(6, (o = e.$$scope));
      }),
      [
        c,
        l,
        u,
        d,
        s,
        function () {
          return u;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (u = e), a(2, u);
          });
        },
      ]
    );
  }
  function pt(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("h1")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function mt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function ft(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("h2")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function ht(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function It(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("h3")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function bt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function gt(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("li")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function Tt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function Ct(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("nav")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function yt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function St(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("span")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function $t(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function vt(e) {
    let n, a, r, o, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("ul")), f && f.c(), N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (r = !0),
          o ||
            ((l = [b((a = We.call(null, n, e[0]))), b(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!r || 32 & t) &&
          u(f, m, e, e[5], r ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (I = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        r || (se(f, e), (r = !0));
      },
      o(e) {
        re(f, e), (r = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (o = !1), i(l);
      },
    };
  }
  function Et(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n,
      { use: c = [] } = n;
    const l = ze(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (o = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  const xt = class extends he {
      constructor(e) {
        super(), fe(this, e, ut, dt, r, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    At = nt,
    Dt = class extends he {
      constructor(e) {
        super(), fe(this, e, mt, pt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Nt = class extends he {
      constructor(e) {
        super(), fe(this, e, ht, ft, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Pt = class extends he {
      constructor(e) {
        super(), fe(this, e, bt, It, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    _t = class extends he {
      constructor(e) {
        super(), fe(this, e, Tt, gt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ot = class extends he {
      constructor(e) {
        super(), fe(this, e, yt, Ct, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Lt = class extends he {
      constructor(e) {
        super(), fe(this, e, $t, St, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Rt = class extends he {
      constructor(e) {
        super(), fe(this, e, Et, vt, r, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var Mt = lt({ class: "mdc-top-app-bar__row", component: At });
  function kt(e) {
    let n, a, r, o, l, m;
    const f = e[9].default,
      h = c(f, e, e[8], null);
    let I = [
        {
          class: (a = Ve({
            [e[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === e[2],
            "mdc-top-app-bar__section--align-end": "end" === e[2],
          })),
        },
        e[3] ? { role: "toolbar" } : {},
        e[6],
      ],
      g = {};
    for (let e = 0; e < I.length; e += 1) g = t(g, I[e]);
    return {
      c() {
        (n = S("section")), h && h.c(), N(n, g);
      },
      m(t, a) {
        T(t, n, a),
          h && h.m(n, null),
          e[10](n),
          (o = !0),
          l ||
            ((m = [b((r = We.call(null, n, e[0]))), b(e[5].call(null, n))]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 256 & t) &&
          u(h, f, e, e[8], o ? d(f, e[8], t, null) : p(e[8]), null),
          N(
            n,
            (g = ce(I, [
              (!o ||
                (6 & t &&
                  a !==
                    (a = Ve({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: a },
              8 & t && (e[3] ? { role: "toolbar" } : {}),
              64 & t && e[6],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        re(h, e), (o = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[10](null), (l = !1), i(m);
      },
    };
  }
  function Ft(e, n, a) {
    const i = ["use", "class", "align", "toolbar", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { align: p = "start" } = n,
      { toolbar: h = !1 } = n;
    return (
      w(
        "SMUI:icon-button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      w(
        "SMUI:button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(6, (s = f(n, i))),
          "use" in e && a(0, (d = e.use)),
          "class" in e && a(1, (u = e.class)),
          "align" in e && a(2, (p = e.align)),
          "toolbar" in e && a(3, (h = e.toolbar)),
          "$$scope" in e && a(8, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        h,
        l,
        c,
        s,
        function () {
          return l;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(4, l);
          });
        },
      ]
    );
  }
  var Bt = lt({ class: "mdc-top-app-bar__title", component: Lt });
  const wt = class extends he {
    constructor(e) {
      super(),
        fe(this, e, Ft, kt, r, {
          use: 0,
          class: 1,
          align: 2,
          toolbar: 3,
          getElement: 7,
        });
    }
    get getElement() {
      return this.$$.ctx[7];
    }
  };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Ht = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Vt = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.shakeAnimationEndHandler = function () {
            a.handleShakeAnimationEnd();
          }),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ht;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              getWidth: function () {
                return 0;
              },
              registerInteractionHandler: function () {},
              deregisterInteractionHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          this.adapter.registerInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler(
            "animationend",
            this.shakeAnimationEndHandler
          );
        }),
        (t.prototype.getWidth = function () {
          return this.adapter.getWidth();
        }),
        (t.prototype.shake = function (e) {
          var n = t.cssClasses.LABEL_SHAKE;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.float = function (e) {
          var n = t.cssClasses,
            a = n.LABEL_FLOAT_ABOVE,
            i = n.LABEL_SHAKE;
          e
            ? this.adapter.addClass(a)
            : (this.adapter.removeClass(a), this.adapter.removeClass(i));
        }),
        (t.prototype.setRequired = function (e) {
          var n = t.cssClasses.LABEL_REQUIRED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.handleShakeAnimationEnd = function () {
          var e = t.cssClasses.LABEL_SHAKE;
          this.adapter.removeClass(e);
        }),
        t
      );
    })(Ce),
    Ut = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Gt = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.transitionEndHandler = function (e) {
            a.handleTransitionEnd(e);
          }),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ut;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setStyle: function () {},
              registerEventHandler: function () {},
              deregisterEventHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          this.adapter.registerEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterEventHandler(
            "transitionend",
            this.transitionEndHandler
          );
        }),
        (t.prototype.activate = function () {
          this.adapter.removeClass(Ut.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Ut.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(Ut.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(Ut.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(Ut.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Ut.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Ce),
    jt = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    qt = { NOTCH_ELEMENT_PADDING: 8 },
    zt = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    Qt = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        be(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return jt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return zt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return qt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              setNotchWidthProperty: function () {},
              removeNotchWidthProperty: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.notch = function (e) {
          var n = t.cssClasses.OUTLINE_NOTCHED;
          e > 0 && (e += qt.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Ce),
    Wt = {
      ARIA_CONTROLS: "aria-controls",
      ARIA_DESCRIBEDBY: "aria-describedby",
      INPUT_SELECTOR: ".mdc-text-field__input",
      LABEL_SELECTOR: ".mdc-floating-label",
      LEADING_ICON_SELECTOR: ".mdc-text-field__icon--leading",
      LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
      OUTLINE_SELECTOR: ".mdc-notched-outline",
      PREFIX_SELECTOR: ".mdc-text-field__affix--prefix",
      SUFFIX_SELECTOR: ".mdc-text-field__affix--suffix",
      TRAILING_ICON_SELECTOR: ".mdc-text-field__icon--trailing",
    },
    Kt = {
      DISABLED: "mdc-text-field--disabled",
      FOCUSED: "mdc-text-field--focused",
      HELPER_LINE: "mdc-text-field-helper-line",
      INVALID: "mdc-text-field--invalid",
      LABEL_FLOATING: "mdc-text-field--label-floating",
      NO_LABEL: "mdc-text-field--no-label",
      OUTLINED: "mdc-text-field--outlined",
      ROOT: "mdc-text-field",
      TEXTAREA: "mdc-text-field--textarea",
      WITH_LEADING_ICON: "mdc-text-field--with-leading-icon",
      WITH_TRAILING_ICON: "mdc-text-field--with-trailing-icon",
      WITH_INTERNAL_COUNTER: "mdc-text-field--with-internal-counter",
    },
    Xt = { LABEL_SCALE: 0.75 },
    Yt = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    Zt = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    Jt = ["mousedown", "touchstart"],
    en = ["click", "keydown"],
    tn = (function (e) {
      function t(n, a) {
        void 0 === a && (a = {});
        var i = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.isFocused = !1),
          (i.receivedUserInput = !1),
          (i.valid = !0),
          (i.useNativeValidation = !0),
          (i.validateOnValueChange = !0),
          (i.helperText = a.helperText),
          (i.characterCounter = a.characterCounter),
          (i.leadingIcon = a.leadingIcon),
          (i.trailingIcon = a.trailingIcon),
          (i.inputFocusHandler = function () {
            i.activateFocus();
          }),
          (i.inputBlurHandler = function () {
            i.deactivateFocus();
          }),
          (i.inputInputHandler = function () {
            i.handleInput();
          }),
          (i.setPointerXOffset = function (e) {
            i.setTransformOrigin(e);
          }),
          (i.textFieldInteractionHandler = function () {
            i.handleTextFieldInteraction();
          }),
          (i.validationAttributeChangeHandler = function (e) {
            i.handleValidationAttributeChange(e);
          }),
          i
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Kt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Wt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Xt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return Zt.indexOf(e) >= 0;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldFloat", {
          get: function () {
            return (
              this.shouldAlwaysFloat ||
              this.isFocused ||
              !!this.getValue() ||
              this.isBadInput()
            );
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldShake", {
          get: function () {
            return !this.isFocused && !this.isValid() && !!this.getValue();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !0;
              },
              setInputAttr: function () {},
              removeInputAttr: function () {},
              registerTextFieldInteractionHandler: function () {},
              deregisterTextFieldInteractionHandler: function () {},
              registerInputInteractionHandler: function () {},
              deregisterInputInteractionHandler: function () {},
              registerValidationAttributeChangeHandler: function () {
                return new MutationObserver(function () {});
              },
              deregisterValidationAttributeChangeHandler: function () {},
              getNativeInput: function () {
                return null;
              },
              isFocused: function () {
                return !1;
              },
              activateLineRipple: function () {},
              deactivateLineRipple: function () {},
              setLineRippleTransformOrigin: function () {},
              shakeLabel: function () {},
              floatLabel: function () {},
              setLabelRequired: function () {},
              hasLabel: function () {
                return !1;
              },
              getLabelWidth: function () {
                return 0;
              },
              hasOutline: function () {
                return !1;
              },
              notchOutline: function () {},
              closeOutline: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          var e, t, n, a;
          this.adapter.hasLabel() &&
            this.getNativeInput().required &&
            this.adapter.setLabelRequired(!0),
            this.adapter.isFocused()
              ? this.inputFocusHandler()
              : this.adapter.hasLabel() &&
                this.shouldFloat &&
                (this.notchOutline(!0),
                this.adapter.floatLabel(!0),
                this.styleFloating(!0)),
            this.adapter.registerInputInteractionHandler(
              "focus",
              this.inputFocusHandler
            ),
            this.adapter.registerInputInteractionHandler(
              "blur",
              this.inputBlurHandler
            ),
            this.adapter.registerInputInteractionHandler(
              "input",
              this.inputInputHandler
            );
          try {
            for (var i = Te(Jt), s = i.next(); !s.done; s = i.next()) {
              var r = s.value;
              this.adapter.registerInputInteractionHandler(
                r,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = i.return) && t.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Te(en), c = o.next(); !c.done; c = o.next()) {
              r = c.value;
              this.adapter.registerTextFieldInteractionHandler(
                r,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              c && !c.done && (a = o.return) && a.call(o);
            } finally {
              if (n) throw n.error;
            }
          }
          (this.validationObserver =
            this.adapter.registerValidationAttributeChangeHandler(
              this.validationAttributeChangeHandler
            )),
            this.setcharacterCounter(this.getValue().length);
        }),
        (t.prototype.destroy = function () {
          var e, t, n, a;
          this.adapter.deregisterInputInteractionHandler(
            "focus",
            this.inputFocusHandler
          ),
            this.adapter.deregisterInputInteractionHandler(
              "blur",
              this.inputBlurHandler
            ),
            this.adapter.deregisterInputInteractionHandler(
              "input",
              this.inputInputHandler
            );
          try {
            for (var i = Te(Jt), s = i.next(); !s.done; s = i.next()) {
              var r = s.value;
              this.adapter.deregisterInputInteractionHandler(
                r,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = i.return) && t.call(i);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Te(en), c = o.next(); !c.done; c = o.next()) {
              r = c.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                r,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              c && !c.done && (a = o.return) && a.call(o);
            } finally {
              if (n) throw n.error;
            }
          }
          this.adapter.deregisterValidationAttributeChangeHandler(
            this.validationObserver
          );
        }),
        (t.prototype.handleTextFieldInteraction = function () {
          var e = this.adapter.getNativeInput();
          (e && e.disabled) || (this.receivedUserInput = !0);
        }),
        (t.prototype.handleValidationAttributeChange = function (e) {
          var t = this;
          e.some(function (e) {
            return (
              Yt.indexOf(e) > -1 &&
              (t.styleValidity(!0),
              t.adapter.setLabelRequired(t.getNativeInput().required),
              !0)
            );
          }),
            e.indexOf("maxlength") > -1 &&
              this.setcharacterCounter(this.getValue().length);
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline() && this.adapter.hasLabel())
            if (e) {
              var t = this.adapter.getLabelWidth() * Xt.LABEL_SCALE;
              this.adapter.notchOutline(t);
            } else this.adapter.closeOutline();
        }),
        (t.prototype.activateFocus = function () {
          (this.isFocused = !0),
            this.styleFocused(this.isFocused),
            this.adapter.activateLineRipple(),
            this.adapter.hasLabel() &&
              (this.notchOutline(this.shouldFloat),
              this.adapter.floatLabel(this.shouldFloat),
              this.styleFloating(this.shouldFloat),
              this.adapter.shakeLabel(this.shouldShake)),
            !this.helperText ||
              (!this.helperText.isPersistent() &&
                this.helperText.isValidation() &&
                this.valid) ||
              this.helperText.showToScreenReader();
        }),
        (t.prototype.setTransformOrigin = function (e) {
          if (!this.isDisabled() && !this.adapter.hasOutline()) {
            var t = e.touches,
              n = t ? t[0] : e,
              a = n.target.getBoundingClientRect(),
              i = n.clientX - a.left;
            this.adapter.setLineRippleTransformOrigin(i);
          }
        }),
        (t.prototype.handleInput = function () {
          this.autoCompleteFocus(),
            this.setcharacterCounter(this.getValue().length);
        }),
        (t.prototype.autoCompleteFocus = function () {
          this.receivedUserInput || this.activateFocus();
        }),
        (t.prototype.deactivateFocus = function () {
          (this.isFocused = !1), this.adapter.deactivateLineRipple();
          var e = this.isValid();
          this.styleValidity(e),
            this.styleFocused(this.isFocused),
            this.adapter.hasLabel() &&
              (this.notchOutline(this.shouldFloat),
              this.adapter.floatLabel(this.shouldFloat),
              this.styleFloating(this.shouldFloat),
              this.adapter.shakeLabel(this.shouldShake)),
            this.shouldFloat || (this.receivedUserInput = !1);
        }),
        (t.prototype.getValue = function () {
          return this.getNativeInput().value;
        }),
        (t.prototype.setValue = function (e) {
          if (
            (this.getValue() !== e && (this.getNativeInput().value = e),
            this.setcharacterCounter(e.length),
            this.validateOnValueChange)
          ) {
            var t = this.isValid();
            this.styleValidity(t);
          }
          this.adapter.hasLabel() &&
            (this.notchOutline(this.shouldFloat),
            this.adapter.floatLabel(this.shouldFloat),
            this.styleFloating(this.shouldFloat),
            this.validateOnValueChange &&
              this.adapter.shakeLabel(this.shouldShake));
        }),
        (t.prototype.isValid = function () {
          return this.useNativeValidation
            ? this.isNativeInputValid()
            : this.valid;
        }),
        (t.prototype.setValid = function (e) {
          (this.valid = e), this.styleValidity(e);
          var t = !e && !this.isFocused && !!this.getValue();
          this.adapter.hasLabel() && this.adapter.shakeLabel(t);
        }),
        (t.prototype.setValidateOnValueChange = function (e) {
          this.validateOnValueChange = e;
        }),
        (t.prototype.getValidateOnValueChange = function () {
          return this.validateOnValueChange;
        }),
        (t.prototype.setUseNativeValidation = function (e) {
          this.useNativeValidation = e;
        }),
        (t.prototype.isDisabled = function () {
          return this.getNativeInput().disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.getNativeInput().disabled = e), this.styleDisabled(e);
        }),
        (t.prototype.setHelperTextContent = function (e) {
          this.helperText && this.helperText.setContent(e);
        }),
        (t.prototype.setLeadingIconAriaLabel = function (e) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(e);
        }),
        (t.prototype.setLeadingIconContent = function (e) {
          this.leadingIcon && this.leadingIcon.setContent(e);
        }),
        (t.prototype.setTrailingIconAriaLabel = function (e) {
          this.trailingIcon && this.trailingIcon.setAriaLabel(e);
        }),
        (t.prototype.setTrailingIconContent = function (e) {
          this.trailingIcon && this.trailingIcon.setContent(e);
        }),
        (t.prototype.setcharacterCounter = function (e) {
          if (this.characterCounter) {
            var t = this.getNativeInput().maxLength;
            if (-1 === t)
              throw new Error(
                "MDCTextFieldFoundation: Expected maxlength html property on text input or textarea."
              );
            this.characterCounter.setCounterValue(e, t);
          }
        }),
        (t.prototype.isBadInput = function () {
          return this.getNativeInput().validity.badInput || !1;
        }),
        (t.prototype.isNativeInputValid = function () {
          return this.getNativeInput().validity.valid;
        }),
        (t.prototype.styleValidity = function (e) {
          var n = t.cssClasses.INVALID;
          if (
            (e ? this.adapter.removeClass(n) : this.adapter.addClass(n),
            this.helperText)
          ) {
            if (
              (this.helperText.setValidity(e), !this.helperText.isValidation())
            )
              return;
            var a = this.helperText.isVisible(),
              i = this.helperText.getId();
            a && i
              ? this.adapter.setInputAttr(Wt.ARIA_DESCRIBEDBY, i)
              : this.adapter.removeInputAttr(Wt.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.styleFocused = function (e) {
          var n = t.cssClasses.FOCUSED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.styleDisabled = function (e) {
          var n = t.cssClasses,
            a = n.DISABLED,
            i = n.INVALID;
          e
            ? (this.adapter.addClass(a), this.adapter.removeClass(i))
            : this.adapter.removeClass(a),
            this.leadingIcon && this.leadingIcon.setDisabled(e),
            this.trailingIcon && this.trailingIcon.setDisabled(e);
        }),
        (t.prototype.styleFloating = function (e) {
          var n = t.cssClasses.LABEL_FLOATING;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.getNativeInput = function () {
          return (
            (this.adapter ? this.adapter.getNativeInput() : null) || {
              disabled: !1,
              maxLength: -1,
              required: !1,
              type: "input",
              validity: { badInput: !1, valid: !0 },
              value: "",
            }
          );
        }),
        t
      );
    })(Ce),
    nn = "mdc-dom-focus-sentinel",
    an = (function () {
      function e(e, t) {
        void 0 === t && (t = {}),
          (this.root = e),
          (this.options = t),
          (this.elFocusedBeforeTrapFocus = null);
      }
      return (
        (e.prototype.trapFocus = function () {
          var e = this.getFocusableElements(this.root);
          if (0 === e.length)
            throw new Error(
              "FocusTrap: Element must have at least one focusable child."
            );
          (this.elFocusedBeforeTrapFocus =
            document.activeElement instanceof HTMLElement
              ? document.activeElement
              : null),
            this.wrapTabFocus(this.root),
            this.options.skipInitialFocus ||
              this.focusInitialElement(e, this.options.initialFocusEl);
        }),
        (e.prototype.releaseFocus = function () {
          [].slice
            .call(this.root.querySelectorAll("." + nn))
            .forEach(function (e) {
              e.parentElement.removeChild(e);
            }),
            !this.options.skipRestoreFocus &&
              this.elFocusedBeforeTrapFocus &&
              this.elFocusedBeforeTrapFocus.focus();
        }),
        (e.prototype.wrapTabFocus = function (e) {
          var t = this,
            n = this.createSentinel(),
            a = this.createSentinel();
          n.addEventListener("focus", function () {
            var n = t.getFocusableElements(e);
            n.length > 0 && n[n.length - 1].focus();
          }),
            a.addEventListener("focus", function () {
              var n = t.getFocusableElements(e);
              n.length > 0 && n[0].focus();
            }),
            e.insertBefore(n, e.children[0]),
            e.appendChild(a);
        }),
        (e.prototype.focusInitialElement = function (e, t) {
          var n = 0;
          t && (n = Math.max(e.indexOf(t), 0)), e[n].focus();
        }),
        (e.prototype.getFocusableElements = function (e) {
          return [].slice
            .call(
              e.querySelectorAll(
                "[autofocus], [tabindex], a, input, textarea, select, button"
              )
            )
            .filter(function (e) {
              var t =
                  "true" === e.getAttribute("aria-disabled") ||
                  null != e.getAttribute("disabled") ||
                  null != e.getAttribute("hidden") ||
                  "true" === e.getAttribute("aria-hidden"),
                n =
                  e.tabIndex >= 0 &&
                  e.getBoundingClientRect().width > 0 &&
                  !e.classList.contains(nn) &&
                  !t,
                a = !1;
              if (n) {
                var i = getComputedStyle(e);
                a = "none" === i.display || "hidden" === i.visibility;
              }
              return n && !a;
            });
        }),
        (e.prototype.createSentinel = function () {
          var e = document.createElement("div");
          return (
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-hidden", "true"),
            e.classList.add(nn),
            e
          );
        }),
        e
      );
    })(),
    sn = Object.freeze({ __proto__: null, FocusTrap: an }),
    rn = "Unknown",
    on = "Backspace",
    cn = "Enter",
    ln = "Spacebar",
    dn = "PageUp",
    un = "PageDown",
    pn = "End",
    mn = "Home",
    fn = "ArrowLeft",
    hn = "ArrowUp",
    In = "ArrowRight",
    bn = "ArrowDown",
    gn = "Delete",
    Tn = "Escape",
    Cn = "Tab",
    yn = new Set();
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ yn.add(on),
    yn.add(cn),
    yn.add(ln),
    yn.add(dn),
    yn.add(un),
    yn.add(pn),
    yn.add(mn),
    yn.add(fn),
    yn.add(hn),
    yn.add(In),
    yn.add(bn),
    yn.add(gn),
    yn.add(Tn),
    yn.add(Cn);
  var Sn = 8,
    $n = 13,
    vn = 32,
    En = 33,
    xn = 34,
    An = 35,
    Dn = 36,
    Nn = 37,
    Pn = 38,
    _n = 39,
    On = 40,
    Ln = 46,
    Rn = 27,
    Mn = 9,
    kn = new Map();
  kn.set(Sn, on),
    kn.set($n, cn),
    kn.set(vn, ln),
    kn.set(En, dn),
    kn.set(xn, un),
    kn.set(An, pn),
    kn.set(Dn, mn),
    kn.set(Nn, fn),
    kn.set(Pn, hn),
    kn.set(_n, In),
    kn.set(On, bn),
    kn.set(Ln, gn),
    kn.set(Rn, Tn),
    kn.set(Mn, Cn);
  var Fn = new Set();
  function Bn(e) {
    var t = e.key;
    if (yn.has(t)) return t;
    var n = kn.get(e.keyCode);
    return n || rn;
  }
  function wn(e) {
    let t;
    const n = e[4].default,
      a = c(n, e, e[3], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, [i]) {
        a &&
          a.p &&
          (!t || 8 & i) &&
          u(a, n, e, e[3], t ? d(n, e[3], i, null) : p(e[3]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Hn(e, t, n) {
    let a,
      { $$slots: i = {}, $$scope: s } = t,
      { key: r } = t,
      { value: c } = t;
    const l = He(c);
    return (
      o(e, l, (e) => n(5, (a = e))),
      w(r, l),
      F(() => {
        l.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (r = e.key)),
          "value" in e && n(2, (c = e.value)),
          "$$scope" in e && n(3, (s = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && I(l, (a = c), a);
      }),
      [l, r, c, s, i]
    );
  }
  Fn.add(dn),
    Fn.add(un),
    Fn.add(pn),
    Fn.add(mn),
    Fn.add(fn),
    Fn.add(hn),
    Fn.add(In),
    Fn.add(bn);
  class Vn extends he {
    constructor(e) {
      super(), fe(this, e, Hn, wn, r, { key: 1, value: 2 });
    }
  }
  const { applyPassive: Un } = ye,
    { matches: Gn } = ve;
  function jn(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: a = !1,
      disabled: i = !1,
      color: s,
      active: r,
      rippleElement: o,
      eventTarget: c,
      activeTarget: l,
      addClass: d = (t) => e.classList.add(t),
      removeClass: u = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: m = Promise.resolve(),
    } = {}
  ) {
    let f,
      h,
      I = H("SMUI:addLayoutListener"),
      b = r,
      g = c,
      T = l;
    function C() {
      n
        ? (d("mdc-ripple-surface"),
          "primary" === s
            ? (d("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary"))
            : "secondary" === s
            ? (u("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary"))
            : (u("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary")))
        : (u("mdc-ripple-surface"),
          u("smui-ripple-surface--primary"),
          u("smui-ripple-surface--secondary")),
        f &&
          b !== r &&
          ((b = r), r ? f.activate() : !1 === r && f.deactivate()),
        t && !f
          ? ((f = new _e({
              addClass: d,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    a = e.CSS;
                  if ("boolean" == typeof $e && !t) return $e;
                  if (!a || "function" != typeof a.supports) return !1;
                  var i = a.supports("--css-vars", "yes"),
                    s =
                      a.supports("(--css-vars: yes)") &&
                      a.supports("color", "#00000000");
                  return (n = i || s), t || ($e = n), n;
                })(window),
              computeBoundingRect: () => (o || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, Un()),
              deregisterInteractionHandler: (t, n) =>
                (c || e).removeEventListener(t, n, Un()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == r ? Gn(l || e, ":active") : r),
              isSurfaceDisabled: () => !!i,
              isUnbounded: () => !!a,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, Un()),
              registerInteractionHandler: (t, n) =>
                (c || e).addEventListener(t, n, Un()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: u,
              updateCssVariable: p,
            })),
            m.then(() => {
              f && (f.init(), f.setUnbounded(a));
            }))
          : f &&
            !t &&
            m.then(() => {
              f && (f.destroy(), (f = void 0));
            }),
        !f ||
          (g === c && T === l) ||
          ((g = c),
          (T = l),
          f.destroy(),
          requestAnimationFrame(() => {
            f && (f.init(), f.setUnbounded(a));
          })),
        !t && a && d("mdc-ripple-upgraded--unbounded");
    }
    return (
      C(),
      I &&
        (h = I(function () {
          f && f.layout();
        })),
      {
        update(f) {
          ({
            ripple: t,
            surface: n,
            unbounded: a,
            disabled: i,
            color: s,
            active: r,
            rippleElement: o,
            eventTarget: c,
            activeTarget: l,
            addClass: d,
            removeClass: u,
            addStyle: p,
            initPromise: m,
          } = Object.assign(
            {
              ripple: !0,
              surface: !1,
              unbounded: !1,
              disabled: !1,
              color: void 0,
              active: void 0,
              rippleElement: void 0,
              eventTarget: void 0,
              activeTarget: void 0,
              addClass: (t) => e.classList.add(t),
              removeClass: (t) => e.classList.remove(t),
              addStyle: (t, n) => e.style.setProperty(t, n),
              initPromise: Promise.resolve(),
            },
            f
          )),
            C();
        },
        destroy() {
          f &&
            (f.destroy(),
            (f = void 0),
            u("mdc-ripple-surface"),
            u("smui-ripple-surface--primary"),
            u("smui-ripple-surface--secondary")),
            h && h();
        },
      }
    );
  }
  function qn(e) {
    let n, a, r, o, l, m, f, h;
    const I = e[22].default,
      g = c(I, e, e[21], null);
    let y = [
        {
          class: (a = Ve({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(Kn).concat([e[4]]).join(" ")) },
        { for: (o = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      $ = {};
    for (let e = 0; e < y.length; e += 1) $ = t($, y[e]);
    return {
      c() {
        (n = S("label")), g && g.c(), N(n, $);
      },
      m(t, a) {
        T(t, n, a),
          g && g.m(n, null),
          e[24](n),
          (m = !0),
          f ||
            ((h = [b((l = We.call(null, n, e[2]))), b(e[10].call(null, n))]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!m || 2097152 & t) &&
          u(g, I, e, e[21], m ? d(I, e[21], t, null) : p(e[21]), null),
          N(
            n,
            ($ = ce(y, [
              (!m ||
                (267 & t &&
                  a !==
                    (a = Ve({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: a },
              (!m ||
                (528 & t &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(Kn)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              (!m ||
                (32 & t &&
                  o !== (o = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: o,
              },
              4096 & t && e[12],
            ]))
          ),
          l && s(l.update) && 4 & t && l.update.call(null, e[2]);
      },
      i(e) {
        m || (se(g, e), (m = !0));
      },
      o(e) {
        re(g, e), (m = !1);
      },
      d(t) {
        t && C(n), g && g.d(t), e[24](null), (f = !1), i(h);
      },
    };
  }
  function zn(e) {
    let n, a, r, o, l, m, f;
    const h = e[22].default,
      I = c(h, e, e[21], null);
    let g = [
        {
          class: (a = Ve({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(Wn).concat([e[4]]).join(" ")) },
        e[12],
      ],
      y = {};
    for (let e = 0; e < g.length; e += 1) y = t(y, g[e]);
    return {
      c() {
        (n = S("span")), I && I.c(), N(n, y);
      },
      m(t, a) {
        T(t, n, a),
          I && I.m(n, null),
          e[23](n),
          (l = !0),
          m ||
            ((f = [b((o = We.call(null, n, e[2]))), b(e[10].call(null, n))]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!l || 2097152 & t) &&
          u(I, h, e, e[21], l ? d(h, e[21], t, null) : p(e[21]), null),
          N(
            n,
            (y = ce(g, [
              (!l ||
                (267 & t &&
                  a !==
                    (a = Ve({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: a },
              (!l ||
                (528 & t &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(Wn)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              4096 & t && e[12],
            ]))
          ),
          o && s(o.update) && 4 & t && o.update.call(null, e[2]);
      },
      i(e) {
        l || (se(I, e), (l = !0));
      },
      o(e) {
        re(I, e), (l = !1);
      },
      d(t) {
        t && C(n), I && I.d(t), e[23](null), (m = !1), i(f);
      },
    };
  }
  function Qn(e) {
    let t, n, a, i;
    const s = [zn, qn],
      r = [];
    function o(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = o(e)),
      (n = r[t] = s[t](e)),
      {
        c() {
          n.c(), (a = x());
        },
        m(e, n) {
          r[t].m(e, n), T(e, a, n), (i = !0);
        },
        p(e, [i]) {
          let c = t;
          (t = o(e)),
            t === c
              ? r[t].p(e, i)
              : (ae(),
                re(r[c], 1, 1, () => {
                  r[c] = null;
                }),
                ie(),
                (n = r[t]),
                n ? n.p(e, i) : ((n = r[t] = s[t](e)), n.c()),
                se(n, 1),
                n.m(a.parentNode, a));
        },
        i(e) {
          i || (se(n), (i = !0));
        },
        o(e) {
          re(n), (i = !1);
        },
        d(e) {
          r[t].d(e), e && C(a);
        },
      }
    );
  }
  const Wn = ([e, t]) => `${e}: ${t};`,
    Kn = ([e, t]) => `${e}: ${t};`;
  function Xn(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "for",
      "floatAbove",
      "required",
      "wrapped",
      "shake",
      "float",
      "setRequired",
      "getWidth",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    var c;
    const l = ze(M());
    let d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { style: I = "" } = n,
      { for: b } = n,
      { floatAbove: g = !1 } = n,
      { required: T = !1 } = n,
      { wrapped: C = !1 } = n,
      y = {},
      S = {},
      $ = null !== (c = H("SMUI:generic:input:props")) && void 0 !== c ? c : {},
      v = g,
      E = T;
    function x(e) {
      y[e] || a(8, (y[e] = !0), y);
    }
    function A(e) {
      (e in y && !y[e]) || a(8, (y[e] = !1), y);
    }
    function D(e, t) {
      S[e] != t &&
        ("" === t || null == t ? (delete S[e], a(9, S)) : a(9, (S[e] = t), S));
    }
    function N(e) {
      e in S && (delete S[e], a(9, S));
    }
    function P() {
      return d;
    }
    return (
      k(() => {
        a(
          18,
          (u = new Vt({
            addClass: x,
            removeClass: A,
            getWidth: () => {
              var e, t;
              const n = P(),
                a = n.cloneNode(!0);
              null === (e = n.parentNode) || void 0 === e || e.appendChild(a),
                a.classList.add("smui-floating-label--remove-transition"),
                a.classList.add("smui-floating-label--force-size"),
                a.classList.remove("mdc-floating-label--float-above");
              const i = a.scrollWidth;
              return (
                null === (t = n.parentNode) || void 0 === t || t.removeChild(a),
                i
              );
            },
            registerInteractionHandler: (e, t) => P().addEventListener(e, t),
            deregisterInteractionHandler: (e, t) =>
              P().removeEventListener(e, t),
          }))
        );
        const e = {
          get element() {
            return P();
          },
          addStyle: D,
          removeStyle: N,
        };
        return (
          Ue(d, "SMUIFloatingLabel:mount", e),
          u.init(),
          () => {
            Ue(d, "SMUIFloatingLabel:unmount", e), u.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(12, (s = f(n, i))),
          "use" in e && a(2, (p = e.use)),
          "class" in e && a(3, (h = e.class)),
          "style" in e && a(4, (I = e.style)),
          "for" in e && a(5, (b = e.for)),
          "floatAbove" in e && a(0, (g = e.floatAbove)),
          "required" in e && a(1, (T = e.required)),
          "wrapped" in e && a(6, (C = e.wrapped)),
          "$$scope" in e && a(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && u && v !== g && (a(19, (v = g)), u.float(g)),
          1310722 & e.$$.dirty &&
            u &&
            E !== T &&
            (a(20, (E = T)), u.setRequired(T));
      }),
      [
        g,
        T,
        p,
        h,
        I,
        b,
        C,
        d,
        y,
        S,
        l,
        $,
        s,
        function (e) {
          u.shake(e);
        },
        function (e) {
          a(0, (g = e));
        },
        function (e) {
          a(1, (T = e));
        },
        function () {
          return u.getWidth();
        },
        P,
        u,
        v,
        E,
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(7, d);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(7, d);
          });
        },
      ]
    );
  }
  class Yn extends he {
    constructor(e) {
      super(),
        fe(this, e, Xn, Qn, r, {
          use: 2,
          class: 3,
          style: 4,
          for: 5,
          floatAbove: 0,
          required: 1,
          wrapped: 6,
          shake: 13,
          float: 14,
          setRequired: 15,
          getWidth: 16,
          getElement: 17,
        });
    }
    get shake() {
      return this.$$.ctx[13];
    }
    get float() {
      return this.$$.ctx[14];
    }
    get setRequired() {
      return this.$$.ctx[15];
    }
    get getWidth() {
      return this.$$.ctx[16];
    }
    get getElement() {
      return this.$$.ctx[17];
    }
  }
  function Zn(n) {
    let a,
      r,
      o,
      c,
      l,
      d,
      u = [
        {
          class: (r = Ve({
            [n[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": n[3],
            ...n[5],
          })),
        },
        { style: (o = Object.entries(n[6]).map(Jn).concat([n[2]]).join(" ")) },
        n[8],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (a = S("div")), N(a, p);
      },
      m(e, t) {
        T(e, a, t),
          n[13](a),
          l ||
            ((d = [b((c = We.call(null, a, n[0]))), b(n[7].call(null, a))]),
            (l = !0));
      },
      p(e, [t]) {
        N(
          a,
          (p = ce(u, [
            42 & t &&
              r !==
                (r = Ve({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: r },
            68 & t &&
              o !==
                (o = Object.entries(e[6]).map(Jn).concat([e[2]]).join(" ")) && {
                style: o,
              },
            256 & t && e[8],
          ]))
        ),
          c && s(c.update) && 1 & t && c.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[13](null), (l = !1), i(d);
      },
    };
  }
  const Jn = ([e, t]) => `${e}: ${t};`;
  function ea(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let s = f(n, i);
    const r = ze(M());
    let o,
      c,
      { use: l = [] } = n,
      { class: d = "" } = n,
      { style: u = "" } = n,
      { active: p = !1 } = n,
      h = {},
      I = {};
    function b(e) {
      return e in h ? h[e] : y().classList.contains(e);
    }
    function g(e) {
      h[e] || a(5, (h[e] = !0), h);
    }
    function T(e) {
      (e in h && !h[e]) || a(5, (h[e] = !1), h);
    }
    function C(e, t) {
      I[e] != t &&
        ("" === t || null == t ? (delete I[e], a(6, I)) : a(6, (I[e] = t), I));
    }
    function y() {
      return o;
    }
    return (
      k(
        () => (
          (c = new Gt({
            addClass: g,
            removeClass: T,
            hasClass: b,
            setStyle: C,
            registerEventHandler: (e, t) => y().addEventListener(e, t),
            deregisterEventHandler: (e, t) => y().removeEventListener(e, t),
          })),
          c.init(),
          () => {
            c.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(8, (s = f(n, i))),
          "use" in e && a(0, (l = e.use)),
          "class" in e && a(1, (d = e.class)),
          "style" in e && a(2, (u = e.style)),
          "active" in e && a(3, (p = e.active));
      }),
      [
        l,
        d,
        u,
        p,
        o,
        h,
        I,
        r,
        s,
        function () {
          c.activate();
        },
        function () {
          c.deactivate();
        },
        function (e) {
          c.setRippleCenter(e);
        },
        y,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (o = e), a(4, o);
          });
        },
      ]
    );
  }
  class ta extends he {
    constructor(e) {
      super(),
        fe(this, e, ea, Zn, r, {
          use: 0,
          class: 1,
          style: 2,
          active: 3,
          activate: 9,
          deactivate: 10,
          setRippleCenter: 11,
          getElement: 12,
        });
    }
    get activate() {
      return this.$$.ctx[9];
    }
    get deactivate() {
      return this.$$.ctx[10];
    }
    get setRippleCenter() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  function na(e) {
    let t, n, a;
    const i = e[14].default,
      s = c(i, e, e[13], null);
    return {
      c() {
        (t = S("div")),
          s && s.c(),
          D(t, "class", "mdc-notched-outline__notch"),
          D(t, "style", (n = Object.entries(e[7]).map(ia).join(" ")));
      },
      m(e, n) {
        T(e, t, n), s && s.m(t, null), (a = !0);
      },
      p(e, r) {
        s &&
          s.p &&
          (!a || 8192 & r) &&
          u(s, i, e, e[13], a ? d(i, e[13], r, null) : p(e[13]), null),
          (!a ||
            (128 & r && n !== (n = Object.entries(e[7]).map(ia).join(" ")))) &&
            D(t, "style", n);
      },
      i(e) {
        a || (se(s, e), (a = !0));
      },
      o(e) {
        re(s, e), (a = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function aa(e) {
    let n,
      a,
      r,
      o,
      c,
      l,
      d,
      u,
      p,
      m,
      f = !e[3] && na(e),
      h = [
        {
          class: (l = Ve({
            [e[1]]: !0,
            "mdc-notched-outline": !0,
            "mdc-notched-outline--notched": e[2],
            "mdc-notched-outline--no-label": e[3],
            ...e[6],
          })),
        },
        e[9],
      ],
      I = {};
    for (let e = 0; e < h.length; e += 1) I = t(I, h[e]);
    return {
      c() {
        (n = S("div")),
          (a = S("div")),
          (r = E()),
          f && f.c(),
          (o = E()),
          (c = S("div")),
          D(a, "class", "mdc-notched-outline__leading"),
          D(c, "class", "mdc-notched-outline__trailing"),
          N(n, I);
      },
      m(t, i) {
        T(t, n, i),
          g(n, a),
          g(n, r),
          f && f.m(n, null),
          g(n, o),
          g(n, c),
          e[15](n),
          (u = !0),
          p ||
            ((m = [
              b((d = We.call(null, n, e[0]))),
              b(e[8].call(null, n)),
              A(n, "SMUIFloatingLabel:mount", e[16]),
              A(n, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [t]) {
        e[3]
          ? f &&
            (ae(),
            re(f, 1, 1, () => {
              f = null;
            }),
            ie())
          : f
          ? (f.p(e, t), 8 & t && se(f, 1))
          : ((f = na(e)), f.c(), se(f, 1), f.m(n, o)),
          N(
            n,
            (I = ce(h, [
              (!u ||
                (78 & t &&
                  l !==
                    (l = Ve({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: l },
              512 & t && e[9],
            ]))
          ),
          d && s(d.update) && 1 & t && d.update.call(null, e[0]);
      },
      i(e) {
        u || (se(f), (u = !0));
      },
      o(e) {
        re(f), (u = !1);
      },
      d(t) {
        t && C(n), f && f.d(), e[15](null), (p = !1), i(m);
      },
    };
  }
  const ia = ([e, t]) => `${e}: ${t};`;
  function sa(e, n, a) {
    const i = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { notched: I = !1 } = n,
      { noLabel: b = !1 } = n,
      g = {},
      T = {};
    function C(e) {
      g[e] || a(6, (g[e] = !0), g);
    }
    function y(e) {
      (e in g && !g[e]) || a(6, (g[e] = !1), g);
    }
    k(
      () => (
        (d = new Qt({
          addClass: C,
          removeClass: y,
          setNotchWidthProperty: (e) => {
            return (
              (n = e + "px"),
              void (
                T[(t = "width")] != n &&
                ("" === n || null == n
                  ? (delete T[t], a(7, T))
                  : a(7, (T[t] = n), T))
              )
            );
            var t, n;
          },
          removeNotchWidthProperty: () => {
            var e;
            (e = "width") in T && (delete T[e], a(7, T));
          },
        })),
        d.init(),
        () => {
          d.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(9, (s = f(n, i))),
          "use" in e && a(0, (p = e.use)),
          "class" in e && a(1, (h = e.class)),
          "notched" in e && a(2, (I = e.notched)),
          "noLabel" in e && a(3, (b = e.noLabel)),
          "$$scope" in e && a(13, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (u
            ? (u.addStyle("transition-duration", "0s"),
              C("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                u && u.removeStyle("transition-duration");
              }))
            : y("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        h,
        I,
        b,
        u,
        l,
        g,
        T,
        c,
        s,
        function (e) {
          d.notch(e);
        },
        function () {
          d.closeNotch();
        },
        function () {
          return l;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(5, l);
          });
        },
        (e) => a(4, (u = e.detail)),
        () => a(4, (u = void 0)),
      ]
    );
  }
  class ra extends he {
    constructor(e) {
      super(),
        fe(this, e, sa, aa, r, {
          use: 0,
          class: 1,
          notched: 2,
          noLabel: 3,
          notch: 10,
          closeNotch: 11,
          getElement: 12,
        });
    }
    get notch() {
      return this.$$.ctx[10];
    }
    get closeNotch() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  var oa = lt({ class: "mdc-text-field-helper-line", component: At }),
    ca = lt({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: Lt,
    }),
    la = lt({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: Lt,
    });
  function da(n) {
    let a,
      r,
      o,
      c,
      l,
      d = [
        { class: (r = Ve({ [n[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: n[2] },
        { placeholder: n[3] },
        n[4],
        n[6],
        n[10],
      ],
      u = {};
    for (let e = 0; e < d.length; e += 1) u = t(u, d[e]);
    return {
      c() {
        (a = S("input")), N(a, u);
      },
      m(e, t) {
        T(e, a, t),
          a.autofocus && a.focus(),
          n[26](a),
          c ||
            ((l = [
              b((o = We.call(null, a, n[0]))),
              b(n[7].call(null, a)),
              A(a, "input", n[27]),
              A(a, "change", n[9]),
              A(a, "blur", n[24]),
              A(a, "focus", n[25]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        N(
          a,
          (u = ce(d, [
            2 & t &&
              r !== (r = Ve({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          o && s(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[26](null), (c = !1), i(l);
      },
    };
  }
  function ua(e, n, a) {
    const i = [
      "use",
      "class",
      "type",
      "placeholder",
      "value",
      "files",
      "dirty",
      "invalid",
      "updateInvalid",
      "emptyValueNull",
      "emptyValueUndefined",
      "getAttr",
      "addAttr",
      "removeAttr",
      "focus",
      "blur",
      "getElement",
    ];
    let s = f(n, i);
    const r = ze(M());
    let o = () => {};
    let { use: c = [] } = n,
      { class: l = "" } = n,
      { type: d = "text" } = n,
      { placeholder: u = " " } = n,
      { value: p = o } = n;
    const h = (function (e) {
      return e === o;
    })(p);
    h && (p = "");
    let { files: I = null } = n,
      { dirty: b = !1 } = n,
      { invalid: g = !1 } = n,
      { updateInvalid: T = !0 } = n,
      { emptyValueNull: C = null === p } = n;
    h && C && (p = null);
    let y,
      { emptyValueUndefined: S = void 0 === p } = n;
    h && S && (p = void 0);
    let $ = {},
      v = {};
    function E(e) {
      if ("file" !== d)
        if ("" === e.currentTarget.value && C) a(11, (p = null));
        else if ("" === e.currentTarget.value && S) a(11, (p = void 0));
        else
          switch (d) {
            case "number":
            case "range":
              a(
                11,
                (p = (function (e) {
                  if ("" === e) {
                    const e = new Number(Number.NaN);
                    return (e.length = 0), e;
                  }
                  return +e;
                })(e.currentTarget.value))
              );
              break;
            default:
              a(11, (p = e.currentTarget.value));
          }
      else a(12, (I = e.currentTarget.files));
    }
    function x() {
      return y;
    }
    k(() => {
      T && a(14, (g = y.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(10, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "class" in e && a(1, (l = e.class)),
          "type" in e && a(2, (d = e.type)),
          "placeholder" in e && a(3, (u = e.placeholder)),
          "value" in e && a(11, (p = e.value)),
          "files" in e && a(12, (I = e.files)),
          "dirty" in e && a(13, (b = e.dirty)),
          "invalid" in e && a(14, (g = e.invalid)),
          "updateInvalid" in e && a(15, (T = e.updateInvalid)),
          "emptyValueNull" in e && a(16, (C = e.emptyValueNull)),
          "emptyValueUndefined" in e && a(17, (S = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
          ("file" === d
            ? (delete v.value, a(4, v), a(2, d), a(11, p))
            : a(4, (v.value = null == p ? "" : p), v));
      }),
      [
        c,
        l,
        d,
        u,
        v,
        y,
        $,
        r,
        E,
        function (e) {
          ("file" !== d && "range" !== d) || E(e),
            a(13, (b = !0)),
            T && a(14, (g = y.matches(":invalid")));
        },
        s,
        p,
        I,
        b,
        g,
        T,
        C,
        S,
        function (e) {
          var t;
          return e in $
            ? null !== (t = $[e]) && void 0 !== t
              ? t
              : null
            : x().getAttribute(e);
        },
        function (e, t) {
          $[e] !== t && a(6, ($[e] = t), $);
        },
        function (e) {
          (e in $ && null == $[e]) || a(6, ($[e] = void 0), $);
        },
        function () {
          x().focus();
        },
        function () {
          x().blur();
        },
        x,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (y = e), a(5, y);
          });
        },
        (e) => "file" !== d && E(e),
      ]
    );
  }
  class pa extends he {
    constructor(e) {
      super(),
        fe(this, e, ua, da, r, {
          use: 0,
          class: 1,
          type: 2,
          placeholder: 3,
          value: 11,
          files: 12,
          dirty: 13,
          invalid: 14,
          updateInvalid: 15,
          emptyValueNull: 16,
          emptyValueUndefined: 17,
          getAttr: 18,
          addAttr: 19,
          removeAttr: 20,
          focus: 21,
          blur: 22,
          getElement: 23,
        });
    }
    get getAttr() {
      return this.$$.ctx[18];
    }
    get addAttr() {
      return this.$$.ctx[19];
    }
    get removeAttr() {
      return this.$$.ctx[20];
    }
    get focus() {
      return this.$$.ctx[21];
    }
    get blur() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  function ma(n) {
    let a,
      r,
      o,
      c,
      l,
      d,
      u = [
        { class: (r = Ve({ [n[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (o = `${n[4] ? "" : "resize: none; "}${n[3]}`) },
        n[6],
        n[9],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (a = S("textarea")), N(a, p);
      },
      m(e, t) {
        T(e, a, t),
          a.autofocus && a.focus(),
          n[21](a),
          _(a, n[0]),
          l ||
            ((d = [
              b((c = We.call(null, a, n[1]))),
              b(n[7].call(null, a)),
              A(a, "change", n[8]),
              A(a, "blur", n[19]),
              A(a, "focus", n[20]),
              A(a, "input", n[22]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        N(
          a,
          (p = ce(u, [
            4 & t &&
              r !== (r = Ve({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            24 & t &&
              o !== (o = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: o,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          c && s(c.update) && 2 & t && c.update.call(null, e[1]),
          1 & t && _(a, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[21](null), (l = !1), i(d);
      },
    };
  }
  function fa(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "value",
      "dirty",
      "invalid",
      "updateInvalid",
      "resizable",
      "getAttr",
      "addAttr",
      "removeAttr",
      "focus",
      "blur",
      "getElement",
    ];
    let s = f(n, i);
    const r = ze(M());
    let o,
      { use: c = [] } = n,
      { class: l = "" } = n,
      { style: d = "" } = n,
      { value: u = "" } = n,
      { dirty: p = !1 } = n,
      { invalid: h = !1 } = n,
      { updateInvalid: I = !0 } = n,
      { resizable: b = !0 } = n,
      g = {};
    function T() {
      return o;
    }
    return (
      k(() => {
        I && a(11, (h = o.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(9, (s = f(n, i))),
          "use" in e && a(1, (c = e.use)),
          "class" in e && a(2, (l = e.class)),
          "style" in e && a(3, (d = e.style)),
          "value" in e && a(0, (u = e.value)),
          "dirty" in e && a(10, (p = e.dirty)),
          "invalid" in e && a(11, (h = e.invalid)),
          "updateInvalid" in e && a(12, (I = e.updateInvalid)),
          "resizable" in e && a(4, (b = e.resizable));
      }),
      [
        u,
        c,
        l,
        d,
        b,
        o,
        g,
        r,
        function () {
          a(10, (p = !0)), I && a(11, (h = o.matches(":invalid")));
        },
        s,
        p,
        h,
        I,
        function (e) {
          var t;
          return e in g
            ? null !== (t = g[e]) && void 0 !== t
              ? t
              : null
            : T().getAttribute(e);
        },
        function (e, t) {
          g[e] !== t && a(6, (g[e] = t), g);
        },
        function (e) {
          (e in g && null == g[e]) || a(6, (g[e] = void 0), g);
        },
        function () {
          T().focus();
        },
        function () {
          T().blur();
        },
        T,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (o = e), a(5, o);
          });
        },
        function () {
          (u = this.value), a(0, u);
        },
      ]
    );
  }
  class ha extends he {
    constructor(e) {
      super(),
        fe(this, e, fa, ma, r, {
          use: 1,
          class: 2,
          style: 3,
          value: 0,
          dirty: 10,
          invalid: 11,
          updateInvalid: 12,
          resizable: 4,
          getAttr: 13,
          addAttr: 14,
          removeAttr: 15,
          focus: 16,
          blur: 17,
          getElement: 18,
        });
    }
    get getAttr() {
      return this.$$.ctx[13];
    }
    get addAttr() {
      return this.$$.ctx[14];
    }
    get removeAttr() {
      return this.$$.ctx[15];
    }
    get focus() {
      return this.$$.ctx[16];
    }
    get blur() {
      return this.$$.ctx[17];
    }
    get getElement() {
      return this.$$.ctx[18];
    }
  }
  const Ia = (e) => ({}),
    ba = (e) => ({}),
    ga = (e) => ({}),
    Ta = (e) => ({}),
    Ca = (e) => ({}),
    ya = (e) => ({}),
    Sa = (e) => ({}),
    $a = (e) => ({}),
    va = (e) => ({}),
    Ea = (e) => ({}),
    xa = (e) => ({}),
    Aa = (e) => ({}),
    Da = (e) => ({}),
    Na = (e) => ({}),
    Pa = (e) => ({}),
    _a = (e) => ({}),
    Oa = (e) => ({}),
    La = (e) => ({}),
    Ra = (e) => ({}),
    Ma = (e) => ({}),
    ka = (e) => ({}),
    Fa = (e) => ({}),
    Ba = (e) => ({}),
    wa = (e) => ({});
  function Ha(e) {
    let n, a, r, o, l, m, f, h, I, y, $, v, x, D;
    const P = e[51].label,
      _ = c(P, e, e[90], Ea);
    r = new Vn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Ua] },
        $$scope: { ctx: e },
      },
    });
    const O = e[51].default,
      L = c(O, e, e[90], null);
    m = new Vn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [Ga] },
        $$scope: { ctx: e },
      },
    });
    const R = e[51].ripple,
      M = c(R, e, e[90], Ta);
    let k = [
        {
          class: (h = Ve({
            [e[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": e[12],
            "mdc-text-field--textarea": e[14],
            "mdc-text-field--filled": "filled" === e[15],
            "mdc-text-field--outlined": "outlined" === e[15],
            "smui-text-field--standard": "standard" === e[15] && !e[14],
            "mdc-text-field--no-label": e[16] || !e[42].label,
            "mdc-text-field--with-leading-icon": e[42].leadingIcon,
            "mdc-text-field--with-trailing-icon": e[42].trailingIcon,
            "mdc-text-field--invalid": e[1],
            ...e[25],
          })),
        },
        {
          style: (I = Object.entries(e[26]).map(ui).concat([e[10]]).join(" ")),
        },
        Ge(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      F = {};
    for (let e = 0; e < k.length; e += 1) F = t(F, k[e]);
    return {
      c() {
        (n = S("div")),
          _ && _.c(),
          (a = E()),
          ue(r.$$.fragment),
          (o = E()),
          L && L.c(),
          (l = E()),
          ue(m.$$.fragment),
          (f = E()),
          M && M.c(),
          N(n, F);
      },
      m(t, i) {
        T(t, n, i),
          _ && _.m(n, null),
          g(n, a),
          pe(r, n, null),
          g(n, o),
          L && L.m(n, null),
          g(n, l),
          pe(m, n, null),
          g(n, f),
          M && M.m(n, null),
          e[80](n),
          (v = !0),
          x ||
            ((D = [
              b(
                (y = jn.call(null, n, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              b(($ = We.call(null, n, e[8]))),
              b(e[34].call(null, n)),
              A(n, "SMUITextfieldLeadingIcon:mount", e[81]),
              A(n, "SMUITextfieldLeadingIcon:unmount", e[82]),
              A(n, "SMUITextfieldTrailingIcon:mount", e[83]),
              A(n, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (x = !0));
      },
      p(e, t) {
        _ &&
          _.p &&
          (!v || 268435456 & t[2]) &&
          u(_, P, e, e[90], v ? d(P, e[90], t, va) : p(e[90]), Ea);
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          r.$set(a),
          L &&
            L.p &&
            (!v || 268435456 & t[2]) &&
            u(L, O, e, e[90], v ? d(O, e[90], t, null) : p(e[90]), null);
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          m.$set(i),
          M &&
            M.p &&
            (!v || 268435456 & t[2]) &&
            u(M, R, e, e[90], v ? d(R, e[90], t, ga) : p(e[90]), Ta),
          N(
            n,
            (F = ce(k, [
              (!v ||
                ((33673730 & t[0]) | (2048 & t[1]) &&
                  h !==
                    (h = Ve({
                      [e[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": e[12],
                      "mdc-text-field--textarea": e[14],
                      "mdc-text-field--filled": "filled" === e[15],
                      "mdc-text-field--outlined": "outlined" === e[15],
                      "smui-text-field--standard":
                        "standard" === e[15] && !e[14],
                      "mdc-text-field--no-label": e[16] || !e[42].label,
                      "mdc-text-field--with-leading-icon": e[42].leadingIcon,
                      "mdc-text-field--with-trailing-icon": e[42].trailingIcon,
                      "mdc-text-field--invalid": e[1],
                      ...e[25],
                    })))) && { class: h },
              (!v ||
                (67109888 & t[0] &&
                  I !==
                    (I = Object.entries(e[26])
                      .map(ui)
                      .concat([e[10]])
                      .join(" ")))) && { style: I },
              1024 & t[1] &&
                Ge(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          y &&
            s(y.update) &&
            2048 & t[0] &&
            y.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          $ && s($.update) && 256 & t[0] && $.update.call(null, e[8]);
      },
      i(e) {
        v ||
          (se(_, e),
          se(r.$$.fragment, e),
          se(L, e),
          se(m.$$.fragment, e),
          se(M, e),
          (v = !0));
      },
      o(e) {
        re(_, e),
          re(r.$$.fragment, e),
          re(L, e),
          re(m.$$.fragment, e),
          re(M, e),
          (v = !1);
      },
      d(t) {
        t && C(n),
          _ && _.d(t),
          me(r),
          L && L.d(t),
          me(m),
          M && M.d(t),
          e[80](null),
          (x = !1),
          i(D);
      },
    };
  }
  function Va(e) {
    let n,
      a,
      r,
      o,
      l,
      m,
      f,
      h,
      I,
      y,
      $,
      v,
      x,
      D,
      P,
      _,
      O,
      L,
      R = !e[14] && "outlined" !== e[15] && ja(e),
      M = (e[14] || "outlined" === e[15]) && Wa(e);
    o = new Vn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Za] },
        $$scope: { ctx: e },
      },
    });
    const k = e[51].default,
      F = c(k, e, e[90], null),
      B = [ei, Ja],
      w = [];
    function H(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (f = H(e)),
      (h = w[f] = B[f](e)),
      (y = new Vn({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [si] },
          $$scope: { ctx: e },
        },
      }));
    let V = !e[14] && "outlined" !== e[15] && e[11] && ri(e),
      U = [
        {
          class: (v = Ve({
            [e[9]]: !0,
            "mdc-text-field": !0,
            "mdc-text-field--disabled": e[12],
            "mdc-text-field--textarea": e[14],
            "mdc-text-field--filled": "filled" === e[15],
            "mdc-text-field--outlined": "outlined" === e[15],
            "smui-text-field--standard": "standard" === e[15] && !e[14],
            "mdc-text-field--no-label":
              e[16] || (null == e[17] && !e[42].label),
            "mdc-text-field--label-floating":
              e[28] || (null != e[0] && "" !== e[0]),
            "mdc-text-field--with-leading-icon": e[35](e[22])
              ? e[42].leadingIcon
              : e[22],
            "mdc-text-field--with-trailing-icon": e[35](e[23])
              ? e[42].trailingIcon
              : e[23],
            "mdc-text-field--with-internal-counter":
              e[14] && e[42].internalCounter,
            "mdc-text-field--invalid": e[1],
            ...e[25],
          })),
        },
        {
          style: (x = Object.entries(e[26]).map(di).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        Ge(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      G = {};
    for (let e = 0; e < U.length; e += 1) G = t(G, U[e]);
    return {
      c() {
        (n = S("label")),
          R && R.c(),
          (a = E()),
          M && M.c(),
          (r = E()),
          ue(o.$$.fragment),
          (l = E()),
          F && F.c(),
          (m = E()),
          h.c(),
          (I = E()),
          ue(y.$$.fragment),
          ($ = E()),
          V && V.c(),
          N(n, G);
      },
      m(t, i) {
        T(t, n, i),
          R && R.m(n, null),
          g(n, a),
          M && M.m(n, null),
          g(n, r),
          pe(o, n, null),
          g(n, l),
          F && F.m(n, null),
          g(n, m),
          w[f].m(n, null),
          g(n, I),
          pe(y, n, null),
          g(n, $),
          V && V.m(n, null),
          e[73](n),
          (_ = !0),
          O ||
            ((L = [
              b(
                (D = jn.call(null, n, {
                  ripple: !e[14] && "filled" === e[15],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                  eventTarget: e[33],
                  activeTarget: e[33],
                  initPromise: e[37],
                }))
              ),
              b((P = We.call(null, n, e[8]))),
              b(e[34].call(null, n)),
              A(n, "SMUITextfieldLeadingIcon:mount", e[74]),
              A(n, "SMUITextfieldLeadingIcon:unmount", e[75]),
              A(n, "SMUITextfieldTrailingIcon:mount", e[76]),
              A(n, "SMUITextfieldTrailingIcon:unmount", e[77]),
              A(n, "SMUITextfieldCharacterCounter:mount", e[78]),
              A(n, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (O = !0));
      },
      p(e, t) {
        e[14] || "outlined" === e[15]
          ? R &&
            (ae(),
            re(R, 1, 1, () => {
              R = null;
            }),
            ie())
          : R
          ? (R.p(e, t), 49152 & t[0] && se(R, 1))
          : ((R = ja(e)), R.c(), se(R, 1), R.m(n, a)),
          e[14] || "outlined" === e[15]
            ? M
              ? (M.p(e, t), 49152 & t[0] && se(M, 1))
              : ((M = Wa(e)), M.c(), se(M, 1), M.m(n, r))
            : M &&
              (ae(),
              re(M, 1, 1, () => {
                M = null;
              }),
              ie());
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          o.$set(i),
          F &&
            F.p &&
            (!_ || 268435456 & t[2]) &&
            u(F, k, e, e[90], _ ? d(k, e[90], t, null) : p(e[90]), null);
        let c = f;
        (f = H(e)),
          f === c
            ? w[f].p(e, t)
            : (ae(),
              re(w[c], 1, 1, () => {
                w[c] = null;
              }),
              ie(),
              (h = w[f]),
              h ? h.p(e, t) : ((h = w[f] = B[f](e)), h.c()),
              se(h, 1),
              h.m(n, I));
        const l = {};
        268435456 & t[2] && (l.$$scope = { dirty: t, ctx: e }),
          y.$set(l),
          !e[14] && "outlined" !== e[15] && e[11]
            ? V
              ? (V.p(e, t), 51200 & t[0] && se(V, 1))
              : ((V = ri(e)), V.c(), se(V, 1), V.m(n, null))
            : V &&
              (ae(),
              re(V, 1, 1, () => {
                V = null;
              }),
              ie()),
          N(
            n,
            (G = ce(U, [
              (!_ ||
                ((314823171 & t[0]) | (2048 & t[1]) &&
                  v !==
                    (v = Ve({
                      [e[9]]: !0,
                      "mdc-text-field": !0,
                      "mdc-text-field--disabled": e[12],
                      "mdc-text-field--textarea": e[14],
                      "mdc-text-field--filled": "filled" === e[15],
                      "mdc-text-field--outlined": "outlined" === e[15],
                      "smui-text-field--standard":
                        "standard" === e[15] && !e[14],
                      "mdc-text-field--no-label":
                        e[16] || (null == e[17] && !e[42].label),
                      "mdc-text-field--label-floating":
                        e[28] || (null != e[0] && "" !== e[0]),
                      "mdc-text-field--with-leading-icon": e[35](e[22])
                        ? e[42].leadingIcon
                        : e[22],
                      "mdc-text-field--with-trailing-icon": e[35](e[23])
                        ? e[42].trailingIcon
                        : e[23],
                      "mdc-text-field--with-internal-counter":
                        e[14] && e[42].internalCounter,
                      "mdc-text-field--invalid": e[1],
                      ...e[25],
                    })))) && { class: v },
              (!_ ||
                (67109888 & t[0] &&
                  x !==
                    (x = Object.entries(e[26])
                      .map(di)
                      .concat([e[10]])
                      .join(" ")))) && { style: x },
              { for: void 0 },
              1024 & t[1] &&
                Ge(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          D &&
            s(D.update) &&
            (49152 & t[0]) | (4 & t[1]) &&
            D.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          P && s(P.update) && 256 & t[0] && P.update.call(null, e[8]);
      },
      i(e) {
        _ ||
          (se(R),
          se(M),
          se(o.$$.fragment, e),
          se(F, e),
          se(h),
          se(y.$$.fragment, e),
          se(V),
          (_ = !0));
      },
      o(e) {
        re(R),
          re(M),
          re(o.$$.fragment, e),
          re(F, e),
          re(h),
          re(y.$$.fragment, e),
          re(V),
          (_ = !1);
      },
      d(t) {
        t && C(n),
          R && R.d(),
          M && M.d(),
          me(o),
          F && F.d(t),
          w[f].d(),
          me(y),
          V && V.d(),
          e[73](null),
          (O = !1),
          i(L);
      },
    };
  }
  function Ua(e) {
    let t;
    const n = e[51].leadingIcon,
      a = c(n, e, e[90], $a);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 268435456 & i[2]) &&
          u(a, n, e, e[90], t ? d(n, e[90], i, Sa) : p(e[90]), $a);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Ga(e) {
    let t;
    const n = e[51].trailingIcon,
      a = c(n, e, e[90], ya);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 268435456 & i[2]) &&
          u(a, n, e, e[90], t ? d(n, e[90], i, Ca) : p(e[90]), ya);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function ja(e) {
    let t,
      n,
      a,
      i = "filled" === e[15] && qa(),
      s = !e[16] && (null != e[17] || e[42].label) && za(e);
    return {
      c() {
        i && i.c(), (t = E()), s && s.c(), (n = x());
      },
      m(e, r) {
        i && i.m(e, r), T(e, t, r), s && s.m(e, r), T(e, n, r), (a = !0);
      },
      p(e, a) {
        "filled" === e[15]
          ? i || ((i = qa()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? s &&
              (ae(),
              re(s, 1, 1, () => {
                s = null;
              }),
              ie())
            : s
            ? (s.p(e, a), (196608 & a[0]) | (2048 & a[1]) && se(s, 1))
            : ((s = za(e)), s.c(), se(s, 1), s.m(n.parentNode, n));
      },
      i(e) {
        a || (se(s), (a = !0));
      },
      o(e) {
        re(s), (a = !1);
      },
      d(e) {
        i && i.d(e), e && C(t), s && s.d(e), e && C(n);
      },
    };
  }
  function qa(e) {
    let t;
    return {
      c() {
        (t = S("span")), D(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        T(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function za(e) {
    let n, a;
    const i = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Qe(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Qa] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Yn({ props: s })),
      e[52](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (268443649 & t[0]) | (1024 & t[1])
              ? ce(i, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  i[2],
                  1024 & t[1] && le(Qe(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[52](null), me(n, t);
        },
      }
    );
  }
  function Qa(e) {
    let t,
      n,
      a = (null == e[17] ? "" : e[17]) + "";
    const i = e[51].label,
      s = c(i, e, e[90], wa);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        T(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, r) {
        (!n || 131072 & r[0]) &&
          a !== (a = (null == e[17] ? "" : e[17]) + "") &&
          P(t, a),
          s &&
            s.p &&
            (!n || 268435456 & r[2]) &&
            u(s, i, e, e[90], n ? d(i, e[90], r, Ba) : p(e[90]), wa);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        re(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function Wa(e) {
    let n, a;
    const i = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      Qe(e[41], "outline$"),
    ];
    let s = { $$slots: { default: [Ya] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ra({ props: s })),
      e[54](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (196608 & t[0]) | (3072 & t[1])
              ? ce(i, [
                  (196608 & t[0]) | (2048 & t[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & t[1] && le(Qe(e[41], "outline$")),
                ])
              : {};
          (268640289 & t[0]) | (3072 & t[1]) | (268435456 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[54](null), me(n, t);
        },
      }
    );
  }
  function Ka(e) {
    let n, a;
    const i = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Qe(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Xa] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Yn({ props: s })),
      e[53](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (268443649 & t[0]) | (1024 & t[1])
              ? ce(i, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  i[2],
                  1024 & t[1] && le(Qe(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[53](null), me(n, t);
        },
      }
    );
  }
  function Xa(e) {
    let t,
      n,
      a = (null == e[17] ? "" : e[17]) + "";
    const i = e[51].label,
      s = c(i, e, e[90], Fa);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        T(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, r) {
        (!n || 131072 & r[0]) &&
          a !== (a = (null == e[17] ? "" : e[17]) + "") &&
          P(t, a),
          s &&
            s.p &&
            (!n || 268435456 & r[2]) &&
            u(s, i, e, e[90], n ? d(i, e[90], r, ka) : p(e[90]), Fa);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        re(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function Ya(e) {
    let t,
      n,
      a = !e[16] && (null != e[17] || e[42].label) && Ka(e);
    return {
      c() {
        a && a.c(), (t = x());
      },
      m(e, i) {
        a && a.m(e, i), T(e, t, i), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? a &&
            (ae(),
            re(a, 1, 1, () => {
              a = null;
            }),
            ie())
          : a
          ? (a.p(e, n), (196608 & n[0]) | (2048 & n[1]) && se(a, 1))
          : ((a = Ka(e)), a.c(), se(a, 1), a.m(t.parentNode, t));
      },
      i(e) {
        n || (se(a), (n = !0));
      },
      o(e) {
        re(a), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t);
      },
    };
  }
  function Za(e) {
    let t;
    const n = e[51].leadingIcon,
      a = c(n, e, e[90], Ma);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 268435456 & i[2]) &&
          u(a, n, e, e[90], t ? d(n, e[90], i, Ra) : p(e[90]), Ma);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Ja(e) {
    let n, a, i, s, r, o, l, m, f, h;
    const I = e[51].prefix,
      b = c(I, e, e[90], _a);
    let g = null != e[20] && ti(e);
    const y = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      Qe(e[41], "input$"),
    ];
    function S(t) {
      e[64](t);
    }
    function $(t) {
      e[65](t);
    }
    function v(t) {
      e[66](t);
    }
    function x(t) {
      e[67](t);
    }
    let A = {};
    for (let e = 0; e < y.length; e += 1) A = t(A, y[e]);
    void 0 !== e[0] && (A.value = e[0]),
      void 0 !== e[3] && (A.files = e[3]),
      void 0 !== e[4] && (A.dirty = e[4]),
      void 0 !== e[1] && (A.invalid = e[1]),
      (i = new pa({ props: A })),
      e[63](i),
      G.push(() => de(i, "value", S)),
      G.push(() => de(i, "files", $)),
      G.push(() => de(i, "dirty", v)),
      G.push(() => de(i, "invalid", x)),
      i.$on("blur", e[68]),
      i.$on("focus", e[69]),
      i.$on("blur", e[70]),
      i.$on("focus", e[71]);
    let D = null != e[21] && ai(e);
    const N = e[51].suffix,
      P = c(N, e, e[90], Na);
    return {
      c() {
        b && b.c(),
          (n = E()),
          g && g.c(),
          (a = E()),
          ue(i.$$.fragment),
          (m = E()),
          D && D.c(),
          (f = E()),
          P && P.c();
      },
      m(e, t) {
        b && b.m(e, t),
          T(e, n, t),
          g && g.m(e, t),
          T(e, a, t),
          pe(i, e, t),
          T(e, m, t),
          D && D.m(e, t),
          T(e, f, t),
          P && P.m(e, t),
          (h = !0);
      },
      p(e, t) {
        b &&
          b.p &&
          (!h || 268435456 & t[2]) &&
          u(b, I, e, e[90], h ? d(I, e[90], t, Pa) : p(e[90]), _a),
          null != e[20]
            ? g
              ? (g.p(e, t), 1048576 & t[0] && se(g, 1))
              : ((g = ti(e)), g.c(), se(g, 1), g.m(a.parentNode, a))
            : g &&
              (ae(),
              re(g, 1, 1, () => {
                g = null;
              }),
              ie());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? ce(y, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  le(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && le(Qe(e[41], "input$")),
              ])
            : {};
        !s && 1 & t[0] && ((s = !0), (n.value = e[0]), X(() => (s = !1))),
          !r && 8 & t[0] && ((r = !0), (n.files = e[3]), X(() => (r = !1))),
          !o && 16 & t[0] && ((o = !0), (n.dirty = e[4]), X(() => (o = !1))),
          !l && 2 & t[0] && ((l = !0), (n.invalid = e[1]), X(() => (l = !1))),
          i.$set(n),
          null != e[21]
            ? D
              ? (D.p(e, t), 2097152 & t[0] && se(D, 1))
              : ((D = ai(e)), D.c(), se(D, 1), D.m(f.parentNode, f))
            : D &&
              (ae(),
              re(D, 1, 1, () => {
                D = null;
              }),
              ie()),
          P &&
            P.p &&
            (!h || 268435456 & t[2]) &&
            u(P, N, e, e[90], h ? d(N, e[90], t, Da) : p(e[90]), Na);
      },
      i(e) {
        h || (se(b, e), se(g), se(i.$$.fragment, e), se(D), se(P, e), (h = !0));
      },
      o(e) {
        re(b, e), re(g), re(i.$$.fragment, e), re(D), re(P, e), (h = !1);
      },
      d(t) {
        b && b.d(t),
          t && C(n),
          g && g.d(t),
          t && C(a),
          e[63](null),
          me(i, t),
          t && C(m),
          D && D.d(t),
          t && C(f),
          P && P.d(t);
      },
    };
  }
  function ei(e) {
    let n, a, i, s, r, o, l, m;
    const f = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      Qe(e[41], "input$"),
    ];
    function h(t) {
      e[56](t);
    }
    function I(t) {
      e[57](t);
    }
    function b(t) {
      e[58](t);
    }
    let y = {};
    for (let e = 0; e < f.length; e += 1) y = t(y, f[e]);
    void 0 !== e[0] && (y.value = e[0]),
      void 0 !== e[4] && (y.dirty = e[4]),
      void 0 !== e[1] && (y.invalid = e[1]),
      (a = new ha({ props: y })),
      e[55](a),
      G.push(() => de(a, "value", h)),
      G.push(() => de(a, "dirty", I)),
      G.push(() => de(a, "invalid", b)),
      a.$on("blur", e[59]),
      a.$on("focus", e[60]),
      a.$on("blur", e[61]),
      a.$on("focus", e[62]);
    const $ = e[51].internalCounter,
      v = c($, e, e[90], La);
    return {
      c() {
        (n = S("span")),
          ue(a.$$.fragment),
          (o = E()),
          v && v.c(),
          D(
            n,
            "class",
            (l = Ve({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, t) {
        T(e, n, t), pe(a, n, null), g(n, o), v && v.m(n, null), (m = !0);
      },
      p(e, t) {
        const o =
          (134754304 & t[0]) | (1024 & t[1])
            ? ce(f, [
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                1024 & t[1] && le(Qe(e[41], "input$")),
              ])
            : {};
        !i && 1 & t[0] && ((i = !0), (o.value = e[0]), X(() => (i = !1))),
          !s && 16 & t[0] && ((s = !0), (o.dirty = e[4]), X(() => (s = !1))),
          !r && 2 & t[0] && ((r = !0), (o.invalid = e[1]), X(() => (r = !1))),
          a.$set(o),
          v &&
            v.p &&
            (!m || 268435456 & t[2]) &&
            u(v, $, e, e[90], m ? d($, e[90], t, Oa) : p(e[90]), La),
          (!m ||
            (1024 & t[1] &&
              l !==
                (l = Ve({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            D(n, "class", l);
      },
      i(e) {
        m || (se(a.$$.fragment, e), se(v, e), (m = !0));
      },
      o(e) {
        re(a.$$.fragment, e), re(v, e), (m = !1);
      },
      d(t) {
        t && C(n), e[55](null), me(a), v && v.d(t);
      },
    };
  }
  function ti(e) {
    let t, n;
    return (
      (t = new ca({
        props: { $$slots: { default: [ni] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function ni(e) {
    let t;
    return {
      c() {
        t = v(e[20]);
      },
      m(e, n) {
        T(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && P(t, e[20]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function ai(e) {
    let t, n;
    return (
      (t = new la({
        props: { $$slots: { default: [ii] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function ii(e) {
    let t;
    return {
      c() {
        t = v(e[21]);
      },
      m(e, n) {
        T(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && P(t, e[21]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function si(e) {
    let t;
    const n = e[51].trailingIcon,
      a = c(n, e, e[90], Aa);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 268435456 & i[2]) &&
          u(a, n, e, e[90], t ? d(n, e[90], i, xa) : p(e[90]), Aa);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function ri(e) {
    let n, a;
    const i = [Qe(e[41], "ripple$")];
    let s = {};
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ta({ props: s })),
      e[72](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 1024 & t[1] ? ce(i, [le(Qe(e[41], "ripple$"))]) : {};
          n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[72](null), me(n, t);
        },
      }
    );
  }
  function oi(e) {
    let n, a;
    const i = [Qe(e[41], "helperLine$")];
    let s = { $$slots: { default: [ci] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new oa({ props: s })),
      n.$on("SMUITextfieldHelperText:id", e[85]),
      n.$on("SMUITextfieldHelperText:mount", e[86]),
      n.$on("SMUITextfieldHelperText:unmount", e[87]),
      n.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      n.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 1024 & t[1] ? ce(i, [le(Qe(e[41], "helperLine$"))]) : {};
          268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function ci(e) {
    let t;
    const n = e[51].helper,
      a = c(n, e, e[90], ba);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 268435456 & i[2]) &&
          u(a, n, e, e[90], t ? d(n, e[90], i, Ia) : p(e[90]), ba);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function li(e) {
    let t, n, a, i, s;
    const r = [Va, Ha],
      o = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = o[t] = r[t](e));
    let c = e[42].helper && oi(e);
    return {
      c() {
        n.c(), (a = E()), c && c.c(), (i = x());
      },
      m(e, n) {
        o[t].m(e, n), T(e, a, n), c && c.m(e, n), T(e, i, n), (s = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? c
              ? (c.p(e, t), 2048 & t[1] && se(c, 1))
              : ((c = oi(e)), c.c(), se(c, 1), c.m(i.parentNode, i))
            : c &&
              (ae(),
              re(c, 1, 1, () => {
                c = null;
              }),
              ie());
      },
      i(e) {
        s || (se(n), se(c), (s = !0));
      },
      o(e) {
        re(n), re(c), (s = !1);
      },
      d(e) {
        o[t].d(e), e && C(a), c && c.d(e), e && C(i);
      },
    };
  }
  const di = ([e, t]) => `${e}: ${t};`,
    ui = ([e, t]) => `${e}: ${t};`;
  function pi(e, n, a) {
    let i;
    const s = [
      "use",
      "class",
      "style",
      "ripple",
      "disabled",
      "required",
      "textarea",
      "variant",
      "noLabel",
      "label",
      "type",
      "value",
      "files",
      "invalid",
      "updateInvalid",
      "dirty",
      "prefix",
      "suffix",
      "validateOnValueChange",
      "useNativeValidation",
      "withLeadingIcon",
      "withTrailingIcon",
      "input",
      "floatingLabel",
      "lineRipple",
      "notchedOutline",
      "focus",
      "blur",
      "layout",
      "getElement",
    ];
    let r = f(n, s),
      { $$slots: o = {}, $$scope: c } = n;
    const l = h(o),
      { applyPassive: d } = ye,
      u = ze(M());
    let p = () => {};
    function I(e) {
      return e === p;
    }
    let { use: b = [] } = n,
      { class: g = "" } = n,
      { style: T = "" } = n,
      { ripple: C = !0 } = n,
      { disabled: y = !1 } = n,
      { required: S = !1 } = n,
      { textarea: $ = !1 } = n,
      { variant: v = $ ? "outlined" : "standard" } = n,
      { noLabel: E = !1 } = n,
      { label: x } = n,
      { type: A = "text" } = n,
      { value: D = r.input$emptyValueUndefined ? void 0 : p } = n,
      { files: N = p } = n;
    const P = !I(D) || !I(N);
    I(D) && (D = void 0), I(N) && (N = null);
    let { invalid: _ = p } = n,
      { updateInvalid: O = I(_) } = n;
    I(_) && (_ = !1);
    let L,
      R,
      B,
      w,
      V,
      U,
      j,
      q,
      Q,
      { dirty: K = !1 } = n,
      { prefix: X } = n,
      { suffix: Y } = n,
      { validateOnValueChange: Z = O } = n,
      { useNativeValidation: J = O } = n,
      { withLeadingIcon: ee = p } = n,
      { withTrailingIcon: te = p } = n,
      { input: ne } = n,
      { floatingLabel: ae } = n,
      { lineRipple: ie } = n,
      { notchedOutline: se } = n,
      re = {},
      oe = {},
      ce = !1,
      le = H("SMUI:addLayoutListener"),
      de = new Promise((e) => (V = e)),
      ue = D;
    function pe(e) {
      var t;
      return e in re
        ? null !== (t = re[e]) && void 0 !== t
          ? t
          : null
        : Ie().classList.contains(e);
    }
    function me(e) {
      re[e] || a(25, (re[e] = !0), re);
    }
    function fe(e) {
      (e in re && !re[e]) || a(25, (re[e] = !1), re);
    }
    function he() {
      if (R) {
        const e = R.shouldFloat;
        R.notchOutline(e);
      }
    }
    function Ie() {
      return L;
    }
    le && (w = le(he)),
      k(() => {
        if (
          (a(
            49,
            (R = new tn(
              {
                addClass: me,
                removeClass: fe,
                hasClass: pe,
                registerTextFieldInteractionHandler: (e, t) =>
                  Ie().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  Ie().removeEventListener(e, t),
                registerValidationAttributeChangeHandler: (e) => {
                  const t = new MutationObserver((t) => {
                      J &&
                        e(
                          ((e) =>
                            e.map((e) => e.attributeName).filter((e) => e))(t)
                        );
                    }),
                    n = { attributes: !0 };
                  return ne && t.observe(ne.getElement(), n), t;
                },
                deregisterValidationAttributeChangeHandler: (e) => {
                  e.disconnect();
                },
                getNativeInput: () => {
                  var e;
                  return null !== (e = null == ne ? void 0 : ne.getElement()) &&
                    void 0 !== e
                    ? e
                    : null;
                },
                setInputAttr: (e, t) => {
                  null == ne || ne.addAttr(e, t);
                },
                removeInputAttr: (e) => {
                  null == ne || ne.removeAttr(e);
                },
                isFocused: () =>
                  document.activeElement ===
                  (null == ne ? void 0 : ne.getElement()),
                registerInputInteractionHandler: (e, t) => {
                  null == ne || ne.getElement().addEventListener(e, t, d());
                },
                deregisterInputInteractionHandler: (e, t) => {
                  null == ne || ne.getElement().removeEventListener(e, t, d());
                },
                floatLabel: (e) => ae && ae.float(e),
                getLabelWidth: () => (ae ? ae.getWidth() : 0),
                hasLabel: () => !!ae,
                shakeLabel: (e) => ae && ae.shake(e),
                setLabelRequired: (e) => ae && ae.setRequired(e),
                activateLineRipple: () => ie && ie.activate(),
                deactivateLineRipple: () => ie && ie.deactivate(),
                setLineRippleTransformOrigin: (e) =>
                  ie && ie.setRippleCenter(e),
                closeOutline: () => se && se.closeNotch(),
                hasOutline: () => !!se,
                notchOutline: (e) => se && se.notch(e),
              },
              {
                get helperText() {
                  return q;
                },
                get characterCounter() {
                  return Q;
                },
                get leadingIcon() {
                  return U;
                },
                get trailingIcon() {
                  return j;
                },
              }
            ))
          ),
          P)
        ) {
          if (null == ne)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          R.init();
        } else
          (W(), z).then(() => {
            if (null == ne)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            R.init();
          });
        return (
          V(),
          () => {
            R.destroy();
          }
        );
      }),
      F(() => {
        w && w();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(41, (r = f(n, s))),
          "use" in e && a(8, (b = e.use)),
          "class" in e && a(9, (g = e.class)),
          "style" in e && a(10, (T = e.style)),
          "ripple" in e && a(11, (C = e.ripple)),
          "disabled" in e && a(12, (y = e.disabled)),
          "required" in e && a(13, (S = e.required)),
          "textarea" in e && a(14, ($ = e.textarea)),
          "variant" in e && a(15, (v = e.variant)),
          "noLabel" in e && a(16, (E = e.noLabel)),
          "label" in e && a(17, (x = e.label)),
          "type" in e && a(18, (A = e.type)),
          "value" in e && a(0, (D = e.value)),
          "files" in e && a(3, (N = e.files)),
          "invalid" in e && a(1, (_ = e.invalid)),
          "updateInvalid" in e && a(19, (O = e.updateInvalid)),
          "dirty" in e && a(4, (K = e.dirty)),
          "prefix" in e && a(20, (X = e.prefix)),
          "suffix" in e && a(21, (Y = e.suffix)),
          "validateOnValueChange" in e && a(43, (Z = e.validateOnValueChange)),
          "useNativeValidation" in e && a(44, (J = e.useNativeValidation)),
          "withLeadingIcon" in e && a(22, (ee = e.withLeadingIcon)),
          "withTrailingIcon" in e && a(23, (te = e.withTrailingIcon)),
          "input" in e && a(2, (ne = e.input)),
          "floatingLabel" in e && a(5, (ae = e.floatingLabel)),
          "lineRipple" in e && a(6, (ie = e.lineRipple)),
          "notchedOutline" in e && a(7, (se = e.notchedOutline)),
          "$$scope" in e && a(90, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && a(33, (i = ne && ne.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            R &&
            R.isValid() !== !_ &&
            (O ? a(1, (_ = !R.isValid())) : R.setValid(!_)),
          266240 & e.$$.dirty[1] &&
            R &&
            R.getValidateOnValueChange() !== Z &&
            R.setValidateOnValueChange(!I(Z) && Z),
          270336 & e.$$.dirty[1] && R && R.setUseNativeValidation(!!I(J) || J),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            R &&
            R.setDisabled(y),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && R && P && ue !== D)
        ) {
          a(50, (ue = D));
          const e = `${D}`;
          R.getValue() !== e && R.setValue(e);
        }
      }),
      [
        D,
        _,
        ne,
        N,
        K,
        ae,
        ie,
        se,
        b,
        g,
        T,
        C,
        y,
        S,
        $,
        v,
        E,
        x,
        A,
        O,
        X,
        Y,
        ee,
        te,
        L,
        re,
        oe,
        B,
        ce,
        U,
        j,
        q,
        Q,
        i,
        u,
        I,
        P,
        de,
        me,
        fe,
        function (e, t) {
          oe[e] != t &&
            ("" === t || null == t
              ? (delete oe[e], a(26, oe))
              : a(26, (oe[e] = t), oe));
        },
        r,
        l,
        Z,
        J,
        function () {
          null == ne || ne.focus();
        },
        function () {
          null == ne || ne.blur();
        },
        he,
        Ie,
        R,
        ue,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (ae = e), a(5, ae);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (ae = e), a(5, ae);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (se = e), a(7, se);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (ne = e), a(2, ne);
          });
        },
        function (e) {
          (D = e), a(0, D);
        },
        function (e) {
          (K = e), a(4, K);
        },
        function (e) {
          (_ = e), a(1, _), a(49, R), a(19, O);
        },
        () => a(28, (ce = !1)),
        () => a(28, (ce = !0)),
        (e) => Ue(L, "blur", e),
        (e) => Ue(L, "focus", e),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (ne = e), a(2, ne);
          });
        },
        function (e) {
          (D = e), a(0, D);
        },
        function (e) {
          (N = e), a(3, N);
        },
        function (e) {
          (K = e), a(4, K);
        },
        function (e) {
          (_ = e), a(1, _), a(49, R), a(19, O);
        },
        () => a(28, (ce = !1)),
        () => a(28, (ce = !0)),
        (e) => Ue(L, "blur", e),
        (e) => Ue(L, "focus", e),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (ie = e), a(6, ie);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (L = e), a(24, L);
          });
        },
        (e) => a(29, (U = e.detail)),
        () => a(29, (U = void 0)),
        (e) => a(30, (j = e.detail)),
        () => a(30, (j = void 0)),
        (e) => a(32, (Q = e.detail)),
        () => a(32, (Q = void 0)),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (L = e), a(24, L);
          });
        },
        (e) => a(29, (U = e.detail)),
        () => a(29, (U = void 0)),
        (e) => a(30, (j = e.detail)),
        () => a(30, (j = void 0)),
        (e) => a(27, (B = e.detail)),
        (e) => a(31, (q = e.detail)),
        () => {
          a(27, (B = void 0)), a(31, (q = void 0));
        },
        (e) => a(32, (Q = e.detail)),
        () => a(32, (Q = void 0)),
        c,
      ]
    );
  }
  class mi extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          pi,
          li,
          r,
          {
            use: 8,
            class: 9,
            style: 10,
            ripple: 11,
            disabled: 12,
            required: 13,
            textarea: 14,
            variant: 15,
            noLabel: 16,
            label: 17,
            type: 18,
            value: 0,
            files: 3,
            invalid: 1,
            updateInvalid: 19,
            dirty: 4,
            prefix: 20,
            suffix: 21,
            validateOnValueChange: 43,
            useNativeValidation: 44,
            withLeadingIcon: 22,
            withTrailingIcon: 23,
            input: 2,
            floatingLabel: 5,
            lineRipple: 6,
            notchedOutline: 7,
            focus: 45,
            blur: 46,
            layout: 47,
            getElement: 48,
          },
          null,
          [-1, -1, -1, -1]
        );
    }
    get focus() {
      return this.$$.ctx[45];
    }
    get blur() {
      return this.$$.ctx[46];
    }
    get layout() {
      return this.$$.ctx[47];
    }
    get getElement() {
      return this.$$.ctx[48];
    }
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var fi,
    hi,
    Ii = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((fi = {})["" + Ii.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (fi["" + Ii.LIST_ITEM_CLASS] = "mdc-list-item"),
    (fi["" + Ii.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (fi["" + Ii.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (fi["" + Ii.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (fi["" + Ii.ROOT] = "mdc-list");
  var bi =
      (((hi = {})["" + Ii.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (hi["" + Ii.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (hi["" + Ii.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (hi["" + Ii.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (hi["" + Ii.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (hi["" + Ii.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (hi["" + Ii.ROOT] = "mdc-deprecated-list"),
      hi),
    gi = {
      ACTION_EVENT: "MDCList:action",
      ARIA_CHECKED: "aria-checked",
      ARIA_CHECKED_CHECKBOX_SELECTOR: '[role="checkbox"][aria-checked="true"]',
      ARIA_CHECKED_RADIO_SELECTOR: '[role="radio"][aria-checked="true"]',
      ARIA_CURRENT: "aria-current",
      ARIA_DISABLED: "aria-disabled",
      ARIA_ORIENTATION: "aria-orientation",
      ARIA_ORIENTATION_HORIZONTAL: "horizontal",
      ARIA_ROLE_CHECKBOX_SELECTOR: '[role="checkbox"]',
      ARIA_SELECTED: "aria-selected",
      ARIA_INTERACTIVE_ROLES_SELECTOR: '[role="listbox"], [role="menu"]',
      ARIA_MULTI_SELECTABLE_SELECTOR: '[aria-multiselectable="true"]',
      CHECKBOX_RADIO_SELECTOR: 'input[type="checkbox"], input[type="radio"]',
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      CHILD_ELEMENTS_TO_TOGGLE_TABINDEX:
        "\n    ." +
        Ii.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ii.LIST_ITEM_CLASS +
        " a,\n    ." +
        bi[Ii.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        bi[Ii.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        Ii.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ii.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ii.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ii.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        bi[Ii.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        bi[Ii.LIST_ITEM_CLASS] +
        " a,\n    ." +
        bi[Ii.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        bi[Ii.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Ti = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Ci = ["input", "button", "textarea", "select"],
    yi = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Ci.indexOf(n) && e.preventDefault();
      }
    };
  function Si(e, t) {
    var n,
      a = e.nextChar,
      i = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      r = e.focusedItemIndex,
      o = e.skipFocus,
      c = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        vi(t);
      }, Ti.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + a),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, a) {
              var i = a.typeaheadBuffer[0],
                s = e.get(i);
              if (!s) return -1;
              if (
                i === a.currentFirstChar &&
                s[a.sortedIndexCursor].index === t
              ) {
                a.sortedIndexCursor = (a.sortedIndexCursor + 1) % s.length;
                var r = s[a.sortedIndexCursor].index;
                if (!n(r)) return r;
              }
              a.currentFirstChar = i;
              var o,
                c = -1;
              for (o = 0; o < s.length; o++)
                if (!n(s[o].index)) {
                  c = o;
                  break;
                }
              for (; o < s.length; o++)
                if (s[o].index > t && !n(s[o].index)) {
                  c = o;
                  break;
                }
              if (-1 !== c)
                return (a.sortedIndexCursor = c), s[a.sortedIndexCursor].index;
              return -1;
            })(s, r, c, t)
          : (function (e, t, n) {
              var a = n.typeaheadBuffer[0],
                i = e.get(a);
              if (!i) return -1;
              var s = i[n.sortedIndexCursor];
              if (0 === s.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(s.index))
                return s.index;
              var r = (n.sortedIndexCursor + 1) % i.length,
                o = -1;
              for (; r !== n.sortedIndexCursor; ) {
                var c = i[r],
                  l = 0 === c.text.lastIndexOf(n.typeaheadBuffer, 0),
                  d = !t(c.index);
                if (l && d) {
                  o = r;
                  break;
                }
                r = (r + 1) % i.length;
              }
              if (-1 !== o)
                return (n.sortedIndexCursor = o), i[n.sortedIndexCursor].index;
              return -1;
            })(s, c, t)),
      -1 === n || o || i(n),
      n
    );
  }
  function $i(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function vi(e) {
    e.typeaheadBuffer = "";
  }
  function Ei(e, t) {
    var n = e.event,
      a = e.isTargetListItem,
      i = e.focusedItemIndex,
      s = e.focusItemAtIndex,
      r = e.sortedIndexByFirstChar,
      o = e.isItemAtIndexDisabled,
      c = "ArrowLeft" === Bn(n),
      l = "ArrowUp" === Bn(n),
      d = "ArrowRight" === Bn(n),
      u = "ArrowDown" === Bn(n),
      p = "Home" === Bn(n),
      m = "End" === Bn(n),
      f = "Enter" === Bn(n),
      h = "Spacebar" === Bn(n);
    return n.ctrlKey || n.metaKey || c || l || d || u || p || m || f
      ? -1
      : h || 1 !== n.key.length
      ? h
        ? (a && yi(n),
          a && $i(t)
            ? Si(
                {
                  focusItemAtIndex: s,
                  focusedItemIndex: i,
                  nextChar: " ",
                  sortedIndexByFirstChar: r,
                  skipFocus: !1,
                  isItemAtIndexDisabled: o,
                },
                t
              )
            : -1)
        : -1
      : (yi(n),
        Si(
          {
            focusItemAtIndex: s,
            focusedItemIndex: i,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: r,
            skipFocus: !1,
            isItemAtIndexDisabled: o,
          },
          t
        ));
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var xi = (function (e) {
    function t(n) {
      var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      return (
        (a.wrapFocus = !1),
        (a.isVertical = !0),
        (a.isSingleSelectionList = !1),
        (a.selectedIndex = Ti.UNSET_INDEX),
        (a.focusedItemIndex = Ti.UNSET_INDEX),
        (a.useActivatedClass = !1),
        (a.useSelectedAttr = !1),
        (a.ariaCurrentAttrValue = null),
        (a.isCheckboxList = !1),
        (a.isRadioList = !1),
        (a.hasTypeahead = !1),
        (a.typeaheadState = {
          bufferClearTimeout: 0,
          currentFirstChar: "",
          sortedIndexCursor: 0,
          typeaheadBuffer: "",
        }),
        (a.sortedIndexByFirstChar = new Map()),
        a
      );
    }
    return (
      be(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return gi;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Ii;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ti;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "defaultAdapter", {
        get: function () {
          return {
            addClassForElementIndex: function () {},
            focusItemAtIndex: function () {},
            getAttributeForElementIndex: function () {
              return null;
            },
            getFocusedElementIndex: function () {
              return 0;
            },
            getListItemCount: function () {
              return 0;
            },
            hasCheckboxAtIndex: function () {
              return !1;
            },
            hasRadioAtIndex: function () {
              return !1;
            },
            isCheckboxCheckedAtIndex: function () {
              return !1;
            },
            isFocusInsideList: function () {
              return !1;
            },
            isRootFocused: function () {
              return !1;
            },
            listItemAtIndexHasClass: function () {
              return !1;
            },
            notifyAction: function () {},
            removeClassForElementIndex: function () {},
            setAttributeForElementIndex: function () {},
            setCheckedCheckboxOrRadioAtIndex: function () {},
            setTabIndexForListItemChildren: function () {},
            getPrimaryTextAtIndex: function () {
              return "";
            },
          };
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.layout = function () {
        0 !== this.adapter.getListItemCount() &&
          (this.adapter.hasCheckboxAtIndex(0)
            ? (this.isCheckboxList = !0)
            : this.adapter.hasRadioAtIndex(0)
            ? (this.isRadioList = !0)
            : this.maybeInitializeSingleSelection(),
          this.hasTypeahead &&
            (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex()));
      }),
      (t.prototype.getFocusedItemIndex = function () {
        return this.focusedItemIndex;
      }),
      (t.prototype.setWrapFocus = function (e) {
        this.wrapFocus = e;
      }),
      (t.prototype.setVerticalOrientation = function (e) {
        this.isVertical = e;
      }),
      (t.prototype.setSingleSelection = function (e) {
        (this.isSingleSelectionList = e),
          e &&
            (this.maybeInitializeSingleSelection(),
            (this.selectedIndex = this.getSelectedIndexFromDOM()));
      }),
      (t.prototype.maybeInitializeSingleSelection = function () {
        var e = this.getSelectedIndexFromDOM();
        e !== Ti.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ii.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = Ti.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var a = this.adapter.listItemAtIndexHasClass(
              n,
              Ii.LIST_ITEM_SELECTED_CLASS
            ),
            i = this.adapter.listItemAtIndexHasClass(
              n,
              Ii.LIST_ITEM_ACTIVATED_CLASS
            );
          if (a || i) {
            e = n;
            break;
          }
        }
        return e;
      }),
      (t.prototype.setHasTypeahead = function (e) {
        (this.hasTypeahead = e),
          e && (this.sortedIndexByFirstChar = this.typeaheadInitSortedIndex());
      }),
      (t.prototype.isTypeaheadInProgress = function () {
        return this.hasTypeahead && $i(this.typeaheadState);
      }),
      (t.prototype.setUseActivatedClass = function (e) {
        this.useActivatedClass = e;
      }),
      (t.prototype.setUseSelectedAttribute = function (e) {
        this.useSelectedAttr = e;
      }),
      (t.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
      }),
      (t.prototype.setSelectedIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        this.isIndexValid(e) &&
          (this.isCheckboxList
            ? this.setCheckboxAtIndex(e)
            : this.isRadioList
            ? this.setRadioAtIndex(e)
            : this.setSingleSelectionAtIndex(e, { forceUpdate: n }));
      }),
      (t.prototype.handleFocusIn = function (e) {
        e >= 0 &&
          ((this.focusedItemIndex = e),
          this.adapter.setAttributeForElementIndex(e, "tabindex", "0"),
          this.adapter.setTabIndexForListItemChildren(e, "0"));
      }),
      (t.prototype.handleFocusOut = function (e) {
        var t = this;
        e >= 0 &&
          (this.adapter.setAttributeForElementIndex(e, "tabindex", "-1"),
          this.adapter.setTabIndexForListItemChildren(e, "-1")),
          setTimeout(function () {
            t.adapter.isFocusInsideList() ||
              t.setTabindexToFirstSelectedOrFocusedItem();
          }, 0);
      }),
      (t.prototype.handleKeydown = function (e, t, n) {
        var a = this,
          i = "ArrowLeft" === Bn(e),
          s = "ArrowUp" === Bn(e),
          r = "ArrowRight" === Bn(e),
          o = "ArrowDown" === Bn(e),
          c = "Home" === Bn(e),
          l = "End" === Bn(e),
          d = "Enter" === Bn(e),
          u = "Spacebar" === Bn(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          s || l
            ? (e.preventDefault(), this.focusLastElement())
            : (o || c) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              Ei(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    a.focusItemAtIndex(e);
                  },
                  focusedItemIndex: -1,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return a.adapter.listItemAtIndexHasClass(
                      e,
                      Ii.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var m = this.adapter.getFocusedElementIndex();
          if (!(-1 === m && (m = n) < 0)) {
            if ((this.isVertical && o) || (!this.isVertical && r))
              yi(e), this.focusNextElement(m);
            else if ((this.isVertical && s) || (!this.isVertical && i))
              yi(e), this.focusPrevElement(m);
            else if (c) yi(e), this.focusFirstElement();
            else if (l) yi(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Ti.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((d || u) && t) {
              var f = e.target;
              if (f && "A" === f.tagName && d) return;
              if (
                (yi(e),
                this.adapter.listItemAtIndexHasClass(
                  m,
                  Ii.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(m),
                this.adapter.notifyAction(m));
            }
            if (this.hasTypeahead)
              Ei(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    a.focusItemAtIndex(e);
                  },
                  focusedItemIndex: this.focusedItemIndex,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return a.adapter.listItemAtIndexHasClass(
                      e,
                      Ii.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== Ti.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ii.LIST_ITEM_DISABLED_CLASS
          ) ||
            (this.isSelectableList() && this.setSelectedIndexOnAction(e, t),
            this.adapter.notifyAction(e)));
      }),
      (t.prototype.focusNextElement = function (e) {
        var t = e + 1;
        if (t >= this.adapter.getListItemCount()) {
          if (!this.wrapFocus) return e;
          t = 0;
        }
        return this.focusItemAtIndex(t), t;
      }),
      (t.prototype.focusPrevElement = function (e) {
        var t = e - 1;
        if (t < 0) {
          if (!this.wrapFocus) return e;
          t = this.adapter.getListItemCount() - 1;
        }
        return this.focusItemAtIndex(t), t;
      }),
      (t.prototype.focusFirstElement = function () {
        return this.focusItemAtIndex(0), 0;
      }),
      (t.prototype.focusLastElement = function () {
        var e = this.adapter.getListItemCount() - 1;
        return this.focusItemAtIndex(e), e;
      }),
      (t.prototype.focusInitialElement = function () {
        var e = this.getFirstSelectedOrFocusedItemIndex();
        return this.focusItemAtIndex(e), e;
      }),
      (t.prototype.setEnabled = function (e, t) {
        this.isIndexValid(e) &&
          (t
            ? (this.adapter.removeClassForElementIndex(
                e,
                Ii.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                gi.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                Ii.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                gi.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var a = Ii.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (a = Ii.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Ti.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, a),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== Ti.UNSET_INDEX && this.adapter.addClassForElementIndex(e, a),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === Ti.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            gi.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? gi.ARIA_CURRENT : gi.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Ti.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== Ti.UNSET_INDEX)
        ) {
          var a = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, a);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? gi.ARIA_SELECTED : gi.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== Ti.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              t,
              "false"
            ),
          this.adapter.setAttributeForElementIndex(e, t, "true"),
          (this.selectedIndex = e);
      }),
      (t.prototype.setCheckboxAtIndex = function (e) {
        for (
          var t = this.getSelectionAttribute(), n = 0;
          n < this.adapter.getListItemCount();
          n++
        ) {
          var a = !1;
          e.indexOf(n) >= 0 && (a = !0),
            this.adapter.setCheckedCheckboxOrRadioAtIndex(n, a),
            this.adapter.setAttributeForElementIndex(
              n,
              t,
              a ? "true" : "false"
            );
        }
        this.selectedIndex = e;
      }),
      (t.prototype.setTabindexAtIndex = function (e) {
        this.focusedItemIndex === Ti.UNSET_INDEX && 0 !== e
          ? this.adapter.setAttributeForElementIndex(0, "tabindex", "-1")
          : this.focusedItemIndex >= 0 &&
            this.focusedItemIndex !== e &&
            this.adapter.setAttributeForElementIndex(
              this.focusedItemIndex,
              "tabindex",
              "-1"
            ),
          this.selectedIndex instanceof Array ||
            this.selectedIndex === e ||
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              "tabindex",
              "-1"
            ),
          e !== Ti.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(e, "tabindex", "0");
      }),
      (t.prototype.isSelectableList = function () {
        return (
          this.isSingleSelectionList || this.isCheckboxList || this.isRadioList
        );
      }),
      (t.prototype.setTabindexToFirstSelectedOrFocusedItem = function () {
        var e = this.getFirstSelectedOrFocusedItemIndex();
        this.setTabindexAtIndex(e);
      }),
      (t.prototype.getFirstSelectedOrFocusedItemIndex = function () {
        return this.isSelectableList()
          ? "number" == typeof this.selectedIndex &&
            this.selectedIndex !== Ti.UNSET_INDEX
            ? this.selectedIndex
            : this.selectedIndex instanceof Array &&
              this.selectedIndex.length > 0
            ? this.selectedIndex.reduce(function (e, t) {
                return Math.min(e, t);
              })
            : 0
          : Math.max(this.focusedItemIndex, 0);
      }),
      (t.prototype.isIndexValid = function (e) {
        var t = this;
        if (e instanceof Array) {
          if (!this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Array of index is only supported for checkbox based list"
            );
          return (
            0 === e.length ||
            e.some(function (e) {
              return t.isIndexInRange(e);
            })
          );
        }
        if ("number" == typeof e) {
          if (this.isCheckboxList)
            throw new Error(
              "MDCListFoundation: Expected array of index for checkbox based list but got number: " +
                e
            );
          return (
            this.isIndexInRange(e) ||
            (this.isSingleSelectionList && e === Ti.UNSET_INDEX)
          );
        }
        return !1;
      }),
      (t.prototype.isIndexInRange = function (e) {
        var t = this.adapter.getListItemCount();
        return e >= 0 && e < t;
      }),
      (t.prototype.setSelectedIndexOnAction = function (e, t) {
        void 0 === t && (t = !0),
          this.isCheckboxList
            ? this.toggleCheckboxAtIndex(e, t)
            : this.setSelectedIndex(e);
      }),
      (t.prototype.toggleCheckboxAtIndex = function (e, t) {
        var n = this.getSelectionAttribute(),
          a = this.adapter.isCheckboxCheckedAtIndex(e);
        t && ((a = !a), this.adapter.setCheckedCheckboxOrRadioAtIndex(e, a)),
          this.adapter.setAttributeForElementIndex(e, n, a ? "true" : "false");
        var i =
          this.selectedIndex === Ti.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        a
          ? i.push(e)
          : (i = i.filter(function (t) {
              return t !== e;
            })),
          (this.selectedIndex = i);
      }),
      (t.prototype.focusItemAtIndex = function (e) {
        this.adapter.focusItemAtIndex(e), (this.focusedItemIndex = e);
      }),
      (t.prototype.toggleAll = function (e) {
        var t = this.adapter.getListItemCount();
        if (e.length === t) this.setCheckboxAtIndex([]);
        else {
          for (var n = [], a = 0; a < t; a++)
            (!this.adapter.listItemAtIndexHasClass(
              a,
              Ii.LIST_ITEM_DISABLED_CLASS
            ) ||
              e.indexOf(a) > -1) &&
              n.push(a);
          this.setCheckboxAtIndex(n);
        }
      }),
      (t.prototype.typeaheadMatchItem = function (e, t, n) {
        var a = this;
        return (
          void 0 === n && (n = !1),
          Si(
            {
              focusItemAtIndex: function (e) {
                a.focusItemAtIndex(e);
              },
              focusedItemIndex: t || this.focusedItemIndex,
              nextChar: e,
              sortedIndexByFirstChar: this.sortedIndexByFirstChar,
              skipFocus: n,
              isItemAtIndexDisabled: function (e) {
                return a.adapter.listItemAtIndexHasClass(
                  e,
                  Ii.LIST_ITEM_DISABLED_CLASS
                );
              },
            },
            this.typeaheadState
          )
        );
      }),
      (t.prototype.typeaheadInitSortedIndex = function () {
        return (function (e, t) {
          for (var n = new Map(), a = 0; a < e; a++) {
            var i = t(a).trim();
            if (i) {
              var s = i[0].toLowerCase();
              n.has(s) || n.set(s, []),
                n.get(s).push({ text: i.toLowerCase(), index: a });
            }
          }
          return (
            n.forEach(function (e) {
              e.sort(function (e, t) {
                return e.index - t.index;
              });
            }),
            n
          );
        })(this.adapter.getListItemCount(), this.adapter.getPrimaryTextAtIndex);
      }),
      (t.prototype.clearTypeaheadBuffer = function () {
        vi(this.typeaheadState);
      }),
      t
    );
  })(Ce);
  function Ai(e) {
    let t;
    const n = e[37].default,
      a = c(n, e, e[43], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 4096 & i[1]) &&
          u(a, n, e, e[43], t ? d(n, e[43], i, null) : p(e[43]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Di(e) {
    let n, a, i;
    const s = [
      { use: [e[17], ...e[0]] },
      {
        class: Ve({
          [e[1]]: !0,
          "mdc-deprecated-list": !0,
          "mdc-deprecated-list--non-interactive": e[2],
          "mdc-deprecated-list--dense": e[3],
          "mdc-deprecated-list--textual-list": e[4],
          "mdc-deprecated-list--avatar-list": e[5] || e[18],
          "mdc-deprecated-list--icon-list": e[6],
          "mdc-deprecated-list--image-list": e[7],
          "mdc-deprecated-list--thumbnail-list": e[8],
          "mdc-deprecated-list--video-list": e[9],
          "mdc-deprecated-list--two-line": e[10],
          "smui-list--three-line": e[11] && !e[10],
        }),
      },
      { role: e[15] },
      e[23],
    ];
    var r = e[12];
    function o(e) {
      let n = { $$slots: { default: [Ai] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r &&
        ((n = new r(o(e))),
        e[38](n),
        n.$on("keydown", e[39]),
        n.$on("focusin", e[40]),
        n.$on("focusout", e[41]),
        n.$on("click", e[42]),
        n.$on("SMUIListItem:mount", e[19]),
        n.$on("SMUIListItem:unmount", e[20]),
        n.$on("SMUI:action", e[21])),
      {
        c() {
          n && ue(n.$$.fragment), (a = x());
        },
        m(e, t) {
          n && pe(n, e, t), T(e, a, t), (i = !0);
        },
        p(e, t) {
          const i =
            8818687 & t[0]
              ? ce(s, [
                  131073 & t[0] && { use: [e[17], ...e[0]] },
                  266238 & t[0] && {
                    class: Ve({
                      [e[1]]: !0,
                      "mdc-deprecated-list": !0,
                      "mdc-deprecated-list--non-interactive": e[2],
                      "mdc-deprecated-list--dense": e[3],
                      "mdc-deprecated-list--textual-list": e[4],
                      "mdc-deprecated-list--avatar-list": e[5] || e[18],
                      "mdc-deprecated-list--icon-list": e[6],
                      "mdc-deprecated-list--image-list": e[7],
                      "mdc-deprecated-list--thumbnail-list": e[8],
                      "mdc-deprecated-list--video-list": e[9],
                      "mdc-deprecated-list--two-line": e[10],
                      "smui-list--three-line": e[11] && !e[10],
                    }),
                  },
                  32768 & t[0] && { role: e[15] },
                  8388608 & t[0] && le(e[23]),
                ])
              : {};
          if (
            (4096 & t[1] && (i.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              re(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            r
              ? ((n = new r(o(e))),
                e[38](n),
                n.$on("keydown", e[39]),
                n.$on("focusin", e[40]),
                n.$on("focusout", e[41]),
                n.$on("click", e[42]),
                n.$on("SMUIListItem:mount", e[19]),
                n.$on("SMUIListItem:unmount", e[20]),
                n.$on("SMUI:action", e[21]),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else r && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && re(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[38](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  function Ni(e, n, a) {
    const i = [
      "use",
      "class",
      "nonInteractive",
      "dense",
      "textualList",
      "avatarList",
      "iconList",
      "imageList",
      "thumbnailList",
      "videoList",
      "twoLine",
      "threeLine",
      "vertical",
      "wrapFocus",
      "singleSelection",
      "selectedIndex",
      "radioList",
      "checkList",
      "hasTypeahead",
      "component",
      "layout",
      "setEnabled",
      "getTypeaheadInProgress",
      "getSelectedIndex",
      "getFocusedItemIndex",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    var c;
    const { closest: l, matches: d } = ve,
      u = ze(M());
    let p,
      h,
      { use: I = [] } = n,
      { class: b = "" } = n,
      { nonInteractive: g = !1 } = n,
      { dense: T = !1 } = n,
      { textualList: C = !1 } = n,
      { avatarList: y = !1 } = n,
      { iconList: S = !1 } = n,
      { imageList: $ = !1 } = n,
      { thumbnailList: v = !1 } = n,
      { videoList: E = !1 } = n,
      { twoLine: x = !1 } = n,
      { threeLine: A = !1 } = n,
      { vertical: D = !0 } = n,
      {
        wrapFocus: N = null !== (c = H("SMUI:list:wrapFocus")) &&
          void 0 !== c &&
          c,
      } = n,
      { singleSelection: P = !1 } = n,
      { selectedIndex: _ = -1 } = n,
      { radioList: O = !1 } = n,
      { checkList: L = !1 } = n,
      { hasTypeahead: R = !1 } = n,
      B = [],
      V = H("SMUI:list:role"),
      U = H("SMUI:list:nav");
    const j = new WeakMap();
    let q,
      z = H("SMUI:dialog:selection"),
      Q = H("SMUI:addLayoutListener"),
      { component: W = U ? Ot : Rt } = n;
    function K() {
      return null == p
        ? []
        : [...oe().children]
            .map((e) => j.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function X(e) {
      const t = K()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function Y(e, t) {
      var n;
      const a = K()[e];
      return null !== (n = a && a.hasClass(t)) && void 0 !== n && n;
    }
    function Z(e, t) {
      const n = K()[e];
      n && n.addClass(t);
    }
    function J(e, t) {
      const n = K()[e];
      n && n.removeClass(t);
    }
    function ee(e, t, n) {
      const a = K()[e];
      a && a.addAttr(t, n);
    }
    function te(e, t) {
      const n = K()[e];
      n && n.removeAttr(t);
    }
    function ne(e, t) {
      const n = K()[e];
      return n ? n.getAttr(t) : null;
    }
    function ae(e) {
      var t;
      const n = K()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function ie(e) {
      const t = l(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && d(t, ".mdc-deprecated-list-item")
        ? K()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function se() {
      return h.layout();
    }
    function re() {
      return h.getSelectedIndex();
    }
    function oe() {
      return p.getElement();
    }
    w("SMUI:list:nonInteractive", g),
      w("SMUI:separator:context", "list"),
      V ||
        (P
          ? ((V = "listbox"), w("SMUI:list:item:role", "option"))
          : O
          ? ((V = "radiogroup"), w("SMUI:list:item:role", "radio"))
          : L
          ? ((V = "group"), w("SMUI:list:item:role", "checkbox"))
          : ((V = "list"), w("SMUI:list:item:role", void 0))),
      Q && (q = Q(se)),
      k(() => {
        a(
          13,
          (h = new xi({
            addClassForElementIndex: Z,
            focusItemAtIndex: X,
            getAttributeForElementIndex: (e, t) => {
              var n, a;
              return null !==
                (a =
                  null === (n = K()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== a
                ? a
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? K()
                    .map((e) => e.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => B.length,
            getPrimaryTextAtIndex: ae,
            hasCheckboxAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = K()[e]) || void 0 === t
                      ? void 0
                      : t.hasCheckbox) &&
                void 0 !== n &&
                n
              );
            },
            hasRadioAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = K()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = K()[e];
              return (
                null !==
                  (t = (null == n ? void 0 : n.hasCheckbox) && n.checked) &&
                void 0 !== t &&
                t
              );
            },
            isFocusInsideList: () =>
              null != p &&
              oe() !== document.activeElement &&
              oe().contains(document.activeElement),
            isRootFocused: () => null != p && document.activeElement === oe(),
            listItemAtIndexHasClass: Y,
            notifyAction: (e) => {
              a(24, (_ = e)),
                null != p &&
                  Ue(oe(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: J,
            setAttributeForElementIndex: ee,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              K()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = K()[e];
              Array.prototype.forEach.call(
                n.element.querySelectorAll("button:not(:disabled), a"),
                (e) => {
                  e.setAttribute("tabindex", t);
                }
              );
            },
          }))
        );
        const e = {
          get element() {
            return oe();
          },
          get items() {
            return B;
          },
          get typeaheadInProgress() {
            return h.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => h.typeaheadMatchItem(e, t, !0),
          getOrderedList: K,
          focusItemAtIndex: X,
          addClassForElementIndex: Z,
          removeClassForElementIndex: J,
          setAttributeForElementIndex: ee,
          removeAttributeForElementIndex: te,
          getAttributeFromElementIndex: ne,
          getPrimaryTextAtIndex: ae,
        };
        return (
          Ue(oe(), "SMUIList:mount", e),
          h.init(),
          () => {
            h.destroy();
          }
        );
      }),
      F(() => {
        q && q();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(23, (s = f(n, i))),
          "use" in e && a(0, (I = e.use)),
          "class" in e && a(1, (b = e.class)),
          "nonInteractive" in e && a(2, (g = e.nonInteractive)),
          "dense" in e && a(3, (T = e.dense)),
          "textualList" in e && a(4, (C = e.textualList)),
          "avatarList" in e && a(5, (y = e.avatarList)),
          "iconList" in e && a(6, (S = e.iconList)),
          "imageList" in e && a(7, ($ = e.imageList)),
          "thumbnailList" in e && a(8, (v = e.thumbnailList)),
          "videoList" in e && a(9, (E = e.videoList)),
          "twoLine" in e && a(10, (x = e.twoLine)),
          "threeLine" in e && a(11, (A = e.threeLine)),
          "vertical" in e && a(25, (D = e.vertical)),
          "wrapFocus" in e && a(26, (N = e.wrapFocus)),
          "singleSelection" in e && a(27, (P = e.singleSelection)),
          "selectedIndex" in e && a(24, (_ = e.selectedIndex)),
          "radioList" in e && a(28, (O = e.radioList)),
          "checkList" in e && a(29, (L = e.checkList)),
          "hasTypeahead" in e && a(30, (R = e.hasTypeahead)),
          "component" in e && a(12, (W = e.component)),
          "$$scope" in e && a(43, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && h && h.setVerticalOrientation(D),
          67117056 & e.$$.dirty[0] && h && h.setWrapFocus(N),
          1073750016 & e.$$.dirty[0] && h && h.setHasTypeahead(R),
          134225920 & e.$$.dirty[0] && h && h.setSingleSelection(P),
          151003136 & e.$$.dirty[0] &&
            h &&
            P &&
            re() !== _ &&
            h.setSelectedIndex(_);
      }),
      [
        I,
        b,
        g,
        T,
        C,
        y,
        S,
        $,
        v,
        E,
        x,
        A,
        W,
        h,
        p,
        V,
        d,
        u,
        z,
        function (e) {
          B.push(e.detail),
            j.set(e.detail.element, e.detail),
            P && e.detail.selected && a(24, (_ = ie(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && B.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (B.splice(n, 1), j.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (O || L) {
            const t = ie(e.target);
            if (-1 !== t) {
              const e = K()[t];
              e &&
                ((O && !e.checked) || L) &&
                ((e.checked = !e.checked),
                e.activateRipple(),
                window.requestAnimationFrame(() => {
                  e.deactivateRipple();
                }));
            }
          }
        },
        ie,
        s,
        _,
        D,
        N,
        P,
        O,
        L,
        R,
        se,
        function (e, t) {
          return h.setEnabled(e, t);
        },
        function () {
          return h.isTypeaheadInProgress();
        },
        re,
        function () {
          return h.getFocusedItemIndex();
        },
        oe,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e), a(14, p);
          });
        },
        (e) =>
          h &&
          h.handleKeydown(
            e,
            e.target.classList.contains("mdc-deprecated-list-item"),
            ie(e.target)
          ),
        (e) => h && h.handleFocusIn(ie(e.target)),
        (e) => h && h.handleFocusOut(ie(e.target)),
        (e) =>
          h &&
          h.handleClick(
            ie(e.target),
            !d(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        o,
      ]
    );
  }
  class Pi extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Ni,
          Di,
          r,
          {
            use: 0,
            class: 1,
            nonInteractive: 2,
            dense: 3,
            textualList: 4,
            avatarList: 5,
            iconList: 6,
            imageList: 7,
            thumbnailList: 8,
            videoList: 9,
            twoLine: 10,
            threeLine: 11,
            vertical: 25,
            wrapFocus: 26,
            singleSelection: 27,
            selectedIndex: 24,
            radioList: 28,
            checkList: 29,
            hasTypeahead: 30,
            component: 12,
            layout: 31,
            setEnabled: 32,
            getTypeaheadInProgress: 33,
            getSelectedIndex: 34,
            getFocusedItemIndex: 35,
            getElement: 36,
          },
          null,
          [-1, -1]
        );
    }
    get layout() {
      return this.$$.ctx[31];
    }
    get setEnabled() {
      return this.$$.ctx[32];
    }
    get getTypeaheadInProgress() {
      return this.$$.ctx[33];
    }
    get getSelectedIndex() {
      return this.$$.ctx[34];
    }
    get getFocusedItemIndex() {
      return this.$$.ctx[35];
    }
    get getElement() {
      return this.$$.ctx[36];
    }
  }
  function _i(e) {
    let t;
    return {
      c() {
        (t = S("span")), D(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        T(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Oi(e) {
    let t,
      n,
      a = e[7] && _i();
    const i = e[32].default,
      s = c(i, e, e[35], null);
    return {
      c() {
        a && a.c(), (t = x()), s && s.c();
      },
      m(e, i) {
        a && a.m(e, i), T(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, r) {
        e[7]
          ? a || ((a = _i()), a.c(), a.m(t.parentNode, t))
          : a && (a.d(1), (a = null)),
          s &&
            s.p &&
            (!n || 16 & r[1]) &&
            u(s, i, e, e[35], n ? d(i, e[35], r, null) : p(e[35]), null);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        re(s, e), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t), s && s.d(e);
      },
    };
  }
  function Li(e) {
    let n, a, i;
    const s = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  jn,
                  {
                    ripple: !e[14],
                    unbounded: !1,
                    color: (e[1] || e[0]) && null == e[5] ? "primary" : e[5],
                    disabled: e[9],
                    addClass: e[22],
                    removeClass: e[23],
                    addStyle: e[24],
                  },
                ],
              ]),
          e[20],
          ...e[2],
        ],
      },
      {
        class: Ve({
          [e[3]]: !0,
          "mdc-deprecated-list-item": !0,
          "mdc-deprecated-list-item--activated": e[1],
          "mdc-deprecated-list-item--selected": e[0],
          "mdc-deprecated-list-item--disabled": e[9],
          "mdc-menu-item--selected": !e[21] && "menuitem" === e[8] && e[0],
          "smui-menu-item--non-interactive": e[6],
          ...e[16],
        }),
      },
      { style: Object.entries(e[17]).map(Mi).concat([e[4]]).join(" ") },
      e[21] && e[1] ? { "aria-current": "page" } : {},
      e[21] ? {} : { role: e[8] },
      e[21] || "option" !== e[8]
        ? {}
        : { "aria-selected": e[0] ? "true" : "false" },
      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
        ? {}
        : { "aria-checked": e[14] && e[14].checked ? "true" : "false" },
      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" },
      { "data-menu-item-skip-restore-focus": e[10] || void 0 },
      { tabindex: e[19] },
      { href: e[11] },
      e[18],
      e[27],
    ];
    var r = e[12];
    function o(e) {
      let n = { $$slots: { default: [Oi] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      r &&
        ((n = new r(o(e))),
        e[33](n),
        n.$on("click", e[13]),
        n.$on("keydown", e[25]),
        n.$on("SMUIGenericInput:mount", e[26]),
        n.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          n && ue(n.$$.fragment), (a = x());
        },
        m(e, t) {
          n && pe(n, e, t), T(e, a, t), (i = !0);
        },
        p(e, t) {
          const i =
            167726975 & t[0]
              ? ce(s, [
                  30425703 & t[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              jn,
                              {
                                ripple: !e[14],
                                unbounded: !1,
                                color:
                                  (e[1] || e[0]) && null == e[5]
                                    ? "primary"
                                    : e[5],
                                disabled: e[9],
                                addClass: e[22],
                                removeClass: e[23],
                                addStyle: e[24],
                              },
                            ],
                          ]),
                      e[20],
                      ...e[2],
                    ],
                  },
                  2163531 & t[0] && {
                    class: Ve({
                      [e[3]]: !0,
                      "mdc-deprecated-list-item": !0,
                      "mdc-deprecated-list-item--activated": e[1],
                      "mdc-deprecated-list-item--selected": e[0],
                      "mdc-deprecated-list-item--disabled": e[9],
                      "mdc-menu-item--selected":
                        !e[21] && "menuitem" === e[8] && e[0],
                      "smui-menu-item--non-interactive": e[6],
                      ...e[16],
                    }),
                  },
                  131088 & t[0] && {
                    style: Object.entries(e[17])
                      .map(Mi)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & t[0] &&
                    le(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & t[0] && le(e[21] ? {} : { role: e[8] }),
                  2097409 & t[0] &&
                    le(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & t[0] &&
                    le(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & t[0] &&
                    le(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & t[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & t[0] && { tabindex: e[19] },
                  2048 & t[0] && { href: e[11] },
                  262144 & t[0] && le(e[18]),
                  134217728 & t[0] && le(e[27]),
                ])
              : {};
          if (
            ((128 & t[0]) | (16 & t[1]) && (i.$$scope = { dirty: t, ctx: e }),
            r !== (r = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              re(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            r
              ? ((n = new r(o(e))),
                e[33](n),
                n.$on("click", e[13]),
                n.$on("keydown", e[25]),
                n.$on("SMUIGenericInput:mount", e[26]),
                n.$on("SMUIGenericInput:unmount", e[34]),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else r && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && re(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[33](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  let Ri = 0;
  const Mi = ([e, t]) => `${e}: ${t};`;
  function ki(e, n, a) {
    let i;
    const s = [
      "use",
      "class",
      "style",
      "color",
      "nonInteractive",
      "ripple",
      "activated",
      "role",
      "selected",
      "disabled",
      "skipRestoreFocus",
      "tabindex",
      "inputId",
      "href",
      "component",
      "action",
      "getPrimaryText",
      "getElement",
    ];
    let r = f(n, s),
      { $$slots: o = {}, $$scope: c } = n;
    var l;
    const d = ze(M());
    let u = () => {};
    let { use: p = [] } = n,
      { class: h = "" } = n,
      { style: I = "" } = n,
      { color: b } = n,
      {
        nonInteractive: g = null !== (l = H("SMUI:list:nonInteractive")) &&
          void 0 !== l &&
          l,
      } = n;
    w("SMUI:list:nonInteractive", void 0);
    let { ripple: T = !g } = n,
      { activated: C = !1 } = n,
      { role: y = H("SMUI:list:item:role") } = n;
    w("SMUI:list:item:role", void 0);
    let S,
      $,
      v,
      { selected: E = !1 } = n,
      { disabled: x = !1 } = n,
      { skipRestoreFocus: A = !1 } = n,
      { tabindex: D = u } = n,
      { inputId: N = "SMUI-form-field-list-" + Ri++ } = n,
      { href: P } = n,
      _ = {},
      O = {},
      L = {},
      R = H("SMUI:list:item:nav"),
      { component: B = R ? (P ? xt : Lt) : _t } = n;
    function V(e) {
      return e in _ ? _[e] : Y().classList.contains(e);
    }
    function U(e) {
      _[e] || a(16, (_[e] = !0), _);
    }
    function j(e) {
      (e in _ && !_[e]) || a(16, (_[e] = !1), _);
    }
    function q(e) {
      var t;
      return e in L
        ? null !== (t = L[e]) && void 0 !== t
          ? t
          : null
        : Y().getAttribute(e);
    }
    function z(e, t) {
      L[e] !== t && a(18, (L[e] = t), L);
    }
    function Q(e) {
      (e in L && null == L[e]) || a(18, (L[e] = void 0), L);
    }
    function W() {
      let e = !0,
        t = S.getElement();
      for (; t.nextElementSibling; )
        if (
          ((t = t.nextElementSibling),
          1 === t.nodeType && t.classList.contains("mdc-deprecated-list-item"))
        ) {
          const n = t.attributes.getNamedItem("tabindex");
          if (n && "0" === n.value) {
            e = !1;
            break;
          }
        }
      e && a(19, (i = 0));
    }
    function K(e) {
      x || Ue(Y(), "SMUI:action", e);
    }
    function X() {
      var e, t, n;
      const a = Y(),
        i = a.querySelector(".mdc-deprecated-list-item__primary-text");
      if (i) return null !== (e = i.textContent) && void 0 !== e ? e : "";
      const s = a.querySelector(".mdc-deprecated-list-item__text");
      return s
        ? null !== (t = s.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = a.textContent) && void 0 !== n
        ? n
        : "";
    }
    function Y() {
      return S.getElement();
    }
    w("SMUI:generic:input:props", { id: N }),
      w("SMUI:separator:context", void 0),
      k(() => {
        if (!E && !g) {
          let e = !0,
            t = S;
          for (; t.previousSibling; )
            if (
              ((t = t.previousSibling),
              1 === t.nodeType &&
                t.classList.contains("mdc-deprecated-list-item") &&
                !t.classList.contains("mdc-deprecated-list-item--disabled"))
            ) {
              e = !1;
              break;
            }
          e && (v = window.requestAnimationFrame(W));
        }
        const e = {
          _smui_list_item_accessor: !0,
          get element() {
            return Y();
          },
          get selected() {
            return E;
          },
          set selected(e) {
            a(0, (E = e));
          },
          hasClass: V,
          addClass: U,
          removeClass: j,
          getAttr: q,
          addAttr: z,
          removeAttr: Q,
          getPrimaryText: X,
          get checked() {
            var e;
            return null !== (e = $ && $.checked) && void 0 !== e && e;
          },
          set checked(e) {
            $ && a(14, ($.checked = !!e), $);
          },
          get hasCheckbox() {
            return !(!$ || !("_smui_checkbox_accessor" in $));
          },
          get hasRadio() {
            return !(!$ || !("_smui_radio_accessor" in $));
          },
          activateRipple() {
            $ && $.activateRipple();
          },
          deactivateRipple() {
            $ && $.deactivateRipple();
          },
          getValue: () => r.value,
          action: K,
          get tabindex() {
            return i;
          },
          set tabindex(e) {
            a(28, (D = e));
          },
          get disabled() {
            return x;
          },
          get activated() {
            return C;
          },
          set activated(e) {
            a(1, (C = e));
          },
        };
        return (
          Ue(Y(), "SMUIListItem:mount", e),
          () => {
            Ue(Y(), "SMUIListItem:unmount", e);
          }
        );
      }),
      F(() => {
        v && window.cancelAnimationFrame(v);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(27, (r = f(n, s))),
          "use" in e && a(2, (p = e.use)),
          "class" in e && a(3, (h = e.class)),
          "style" in e && a(4, (I = e.style)),
          "color" in e && a(5, (b = e.color)),
          "nonInteractive" in e && a(6, (g = e.nonInteractive)),
          "ripple" in e && a(7, (T = e.ripple)),
          "activated" in e && a(1, (C = e.activated)),
          "role" in e && a(8, (y = e.role)),
          "selected" in e && a(0, (E = e.selected)),
          "disabled" in e && a(9, (x = e.disabled)),
          "skipRestoreFocus" in e && a(10, (A = e.skipRestoreFocus)),
          "tabindex" in e && a(28, (D = e.tabindex)),
          "inputId" in e && a(29, (N = e.inputId)),
          "href" in e && a(11, (P = e.href)),
          "component" in e && a(12, (B = e.component)),
          "$$scope" in e && a(35, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          a(
            19,
            (i = D === u ? (g || x || !(E || ($ && $.checked)) ? -1 : 0) : D)
          );
      }),
      [
        E,
        C,
        p,
        h,
        I,
        b,
        g,
        T,
        y,
        x,
        A,
        P,
        B,
        K,
        $,
        S,
        _,
        O,
        L,
        i,
        d,
        R,
        U,
        j,
        function (e, t) {
          O[e] != t &&
            ("" === t || null == t
              ? (delete O[e], a(17, O))
              : a(17, (O[e] = t), O));
        },
        function (e) {
          const t = "Enter" === e.key,
            n = "Space" === e.key;
          (t || n) && K(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            a(14, ($ = e.detail));
        },
        r,
        D,
        N,
        X,
        Y,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (S = e), a(15, S);
          });
        },
        () => a(14, ($ = void 0)),
        c,
      ]
    );
  }
  var Fi = lt({ class: "mdc-deprecated-list-item__text", component: Lt }),
    Bi = lt({ class: "mdc-deprecated-list-item__primary-text", component: Lt }),
    wi = lt({
      class: "mdc-deprecated-list-item__secondary-text",
      component: Lt,
    });
  function Hi(e) {
    let n, a, r, o, l, m;
    const f = e[8].default,
      h = c(f, e, e[7], null);
    let I = [
        {
          class: (a = Ve({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      g = {};
    for (let e = 0; e < I.length; e += 1) g = t(g, I[e]);
    return {
      c() {
        (n = S("span")), h && h.c(), N(n, g);
      },
      m(t, a) {
        T(t, n, a),
          h && h.m(n, null),
          e[9](n),
          (o = !0),
          l ||
            ((m = [b((r = We.call(null, n, e[0]))), b(e[3].call(null, n))]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 128 & t) &&
          u(h, f, e, e[7], o ? d(f, e[7], t, null) : p(e[7]), null),
          N(
            n,
            (g = ce(I, [
              (!o ||
                (2 & t &&
                  a !==
                    (a = Ve({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: a },
              32 & t && e[5],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        re(h, e), (o = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[9](null), (l = !1), i(m);
      },
    };
  }
  function Vi(e, n, a) {
    const i = ["use", "class", "getElement"];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l,
      { use: d = [] } = n,
      { class: u = "" } = n,
      p = H("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(5, (s = f(n, i))),
          "use" in e && a(0, (d = e.use)),
          "class" in e && a(1, (u = e.class)),
          "$$scope" in e && a(7, (o = e.$$scope));
      }),
      [
        d,
        u,
        l,
        c,
        p,
        s,
        function () {
          return l;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(2, l);
          });
        },
      ]
    );
  }
  lt({ class: "mdc-deprecated-list-item__meta", component: Lt }),
    lt({ class: "mdc-deprecated-list-group", component: At }),
    lt({ class: "mdc-deprecated-list-group__subheader", component: Pt });
  const Ui = class extends he {
      constructor(e) {
        super(),
          fe(
            this,
            e,
            ki,
            Li,
            r,
            {
              use: 2,
              class: 3,
              style: 4,
              color: 5,
              nonInteractive: 6,
              ripple: 7,
              activated: 1,
              role: 8,
              selected: 0,
              disabled: 9,
              skipRestoreFocus: 10,
              tabindex: 28,
              inputId: 29,
              href: 11,
              component: 12,
              action: 13,
              getPrimaryText: 30,
              getElement: 31,
            },
            null,
            [-1, -1]
          );
      }
      get action() {
        return this.$$.ctx[13];
      }
      get getPrimaryText() {
        return this.$$.ctx[30];
      }
      get getElement() {
        return this.$$.ctx[31];
      }
    },
    Gi = class extends he {
      constructor(e) {
        super(), fe(this, e, Vi, Hi, r, { use: 0, class: 1, getElement: 6 });
      }
      get getElement() {
        return this.$$.ctx[6];
      }
    };
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var ji = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    qi = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    zi = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (a.animationFrame = 0), (a.animationTimer = 0), a;
      }
      return (
        be(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return qi;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ji;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              elementHasClass: function () {
                return !1;
              },
              notifyClose: function () {},
              notifyOpen: function () {},
              saveFocus: function () {},
              restoreFocus: function () {},
              focusActiveNavigationItem: function () {},
              trapFocus: function () {},
              releaseFocus: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.destroy = function () {
          this.animationFrame && cancelAnimationFrame(this.animationFrame),
            this.animationTimer && clearTimeout(this.animationTimer);
        }),
        (t.prototype.open = function () {
          var e = this;
          this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            (this.adapter.addClass(ji.OPEN),
            this.adapter.addClass(ji.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(ji.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(ji.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(ji.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(ji.OPENING) ||
            this.adapter.hasClass(ji.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(ji.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = ji.OPENING,
            n = ji.CLOSING,
            a = ji.OPEN,
            i = ji.ANIMATE,
            s = ji.ROOT;
          this.isElement(e.target) &&
            this.adapter.elementHasClass(e.target, s) &&
            (this.isClosing()
              ? (this.adapter.removeClass(a),
                this.closed(),
                this.adapter.restoreFocus(),
                this.adapter.notifyClose())
              : (this.adapter.focusActiveNavigationItem(),
                this.opened(),
                this.adapter.notifyOpen()),
            this.adapter.removeClass(i),
            this.adapter.removeClass(t),
            this.adapter.removeClass(n));
        }),
        (t.prototype.opened = function () {}),
        (t.prototype.closed = function () {}),
        (t.prototype.runNextAnimationFrame = function (e) {
          var t = this;
          cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = requestAnimationFrame(function () {
              (t.animationFrame = 0),
                clearTimeout(t.animationTimer),
                (t.animationTimer = setTimeout(e, 0));
            }));
        }),
        (t.prototype.isElement = function (e) {
          return Boolean(e.classList);
        }),
        t
      );
    })(Ce),
    Qi = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        be(t, e),
        (t.prototype.handleScrimClick = function () {
          this.close();
        }),
        (t.prototype.opened = function () {
          this.adapter.trapFocus();
        }),
        (t.prototype.closed = function () {
          this.adapter.releaseFocus();
        }),
        t
      );
    })(zi);
  function Wi(e) {
    let n, a, r, o, l, m;
    const f = e[15].default,
      h = c(f, e, e[14], null);
    let I = [
        {
          class: (a = Ve({
            [e[1]]: !0,
            "mdc-drawer": !0,
            "mdc-drawer--dismissible": "dismissible" === e[2],
            "mdc-drawer--modal": "modal" === e[2],
            "smui-drawer__absolute": "modal" === e[2] && !e[3],
            ...e[6],
          })),
        },
        e[8],
      ],
      g = {};
    for (let e = 0; e < I.length; e += 1) g = t(g, I[e]);
    return {
      c() {
        (n = S("aside")), h && h.c(), N(n, g);
      },
      m(t, a) {
        T(t, n, a),
          h && h.m(n, null),
          e[16](n),
          (o = !0),
          l ||
            ((m = [
              b((r = We.call(null, n, e[0]))),
              b(e[7].call(null, n)),
              A(n, "keydown", e[17]),
              A(n, "transitionend", e[18]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 16384 & t) &&
          u(h, f, e, e[14], o ? d(f, e[14], t, null) : p(e[14]), null),
          N(
            n,
            (g = ce(I, [
              (!o ||
                (78 & t &&
                  a !==
                    (a = Ve({
                      [e[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === e[2],
                      "mdc-drawer--modal": "modal" === e[2],
                      "smui-drawer__absolute": "modal" === e[2] && !e[3],
                      ...e[6],
                    })))) && { class: a },
              256 & t && e[8],
            ]))
          ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        re(h, e), (o = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[16](null), (l = !1), i(m);
      },
    };
  }
  function Ki(e, n, a) {
    const i = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const { FocusTrap: c } = sn,
      l = ze(M());
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: I = "" } = n,
      { variant: b } = n,
      { open: g = !1 } = n,
      { fixed: T = !0 } = n,
      C = {},
      y = null,
      S = !1;
    w("SMUI:list:nav", !0),
      w("SMUI:list:item:nav", !0),
      w("SMUI:list:wrapFocus", !0);
    let $ = b;
    function v() {
      var e, t;
      S && S.removeEventListener("SMUIDrawerScrim:click", D),
        "modal" === b &&
          ((S =
            null !==
              (t =
                null === (e = d.parentNode) || void 0 === e
                  ? void 0
                  : e.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== t &&
            t),
          S && S.addEventListener("SMUIDrawerScrim:click", D));
      const n = "dismissible" === b ? zi : "modal" === b ? Qi : void 0;
      return n
        ? new n({
            addClass: x,
            removeClass: A,
            hasClass: E,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (y = document.activeElement),
            restoreFocus: () => {
              y &&
                "focus" in y &&
                d.contains(document.activeElement) &&
                y.focus();
            },
            focusActiveNavigationItem: () => {
              const e = d.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              a(9, (g = !1)), Ue(d, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              a(9, (g = !0)), Ue(d, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function E(e) {
      return e in C ? C[e] : N().classList.contains(e);
    }
    function x(e) {
      C[e] || a(6, (C[e] = !0), C);
    }
    function A(e) {
      (e in C && !C[e]) || a(6, (C[e] = !1), C);
    }
    function D() {
      u && "handleScrimClick" in u && u.handleScrimClick();
    }
    function N() {
      return d;
    }
    k(() => {
      (p = new c(d, { skipInitialFocus: !0 })), a(4, (u = v())), u && u.init();
    }),
      F(() => {
        u && u.destroy(),
          S && S.removeEventListener("SMUIDrawerScrim:click", D);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(8, (s = f(n, i))),
          "use" in e && a(0, (h = e.use)),
          "class" in e && a(1, (I = e.class)),
          "variant" in e && a(2, (b = e.variant)),
          "open" in e && a(9, (g = e.open)),
          "fixed" in e && a(3, (T = e.fixed)),
          "$$scope" in e && a(14, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8212 & e.$$.dirty &&
          $ !== b &&
          (a(13, ($ = b)),
          u && u.destroy(),
          a(6, (C = {})),
          a(4, (u = v())),
          u && u.init()),
          528 & e.$$.dirty &&
            u &&
            u.isOpen() !== g &&
            (g ? u.open() : u.close());
      }),
      [
        h,
        I,
        b,
        T,
        u,
        d,
        C,
        l,
        s,
        g,
        function (e) {
          a(9, (g = e));
        },
        function () {
          return g;
        },
        N,
        $,
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(5, d);
          });
        },
        (e) => u && u.handleKeydown(e),
        (e) => u && u.handleTransitionEnd(e),
      ]
    );
  }
  class Xi extends he {
    constructor(e) {
      super(),
        fe(this, e, Ki, Wi, r, {
          use: 0,
          class: 1,
          variant: 2,
          open: 9,
          fixed: 3,
          setOpen: 10,
          isOpen: 11,
          getElement: 12,
        });
    }
    get setOpen() {
      return this.$$.ctx[10];
    }
    get isOpen() {
      return this.$$.ctx[11];
    }
    get getElement() {
      return this.$$.ctx[12];
    }
  }
  var Yi = lt({ class: "mdc-drawer-app-content", component: At }),
    Zi = lt({ class: "mdc-drawer__content", component: At });
  lt({ class: "mdc-drawer__header", component: At }),
    lt({ class: "mdc-drawer__title", component: Dt }),
    lt({ class: "mdc-drawer__subtitle", component: Nt });
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var Ji = {
      ANIM_CHECKED_INDETERMINATE: "mdc-checkbox--anim-checked-indeterminate",
      ANIM_CHECKED_UNCHECKED: "mdc-checkbox--anim-checked-unchecked",
      ANIM_INDETERMINATE_CHECKED: "mdc-checkbox--anim-indeterminate-checked",
      ANIM_INDETERMINATE_UNCHECKED:
        "mdc-checkbox--anim-indeterminate-unchecked",
      ANIM_UNCHECKED_CHECKED: "mdc-checkbox--anim-unchecked-checked",
      ANIM_UNCHECKED_INDETERMINATE:
        "mdc-checkbox--anim-unchecked-indeterminate",
      BACKGROUND: "mdc-checkbox__background",
      CHECKED: "mdc-checkbox--checked",
      CHECKMARK: "mdc-checkbox__checkmark",
      CHECKMARK_PATH: "mdc-checkbox__checkmark-path",
      DISABLED: "mdc-checkbox--disabled",
      INDETERMINATE: "mdc-checkbox--indeterminate",
      MIXEDMARK: "mdc-checkbox__mixedmark",
      NATIVE_CONTROL: "mdc-checkbox__native-control",
      ROOT: "mdc-checkbox",
      SELECTED: "mdc-checkbox--selected",
      UPGRADED: "mdc-checkbox--upgraded",
    },
    es = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    ts = { ANIM_END_LATCH_MS: 250 },
    ns = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.currentCheckState = es.TRANSITION_STATE_INIT),
          (a.currentAnimationClass = ""),
          (a.animEndLatchTimer = 0),
          (a.enableAnimationEndHandler = !1),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ji;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return es;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return ts;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              forceLayout: function () {},
              hasNativeControl: function () {
                return !1;
              },
              isAttachedToDOM: function () {
                return !1;
              },
              isChecked: function () {
                return !1;
              },
              isIndeterminate: function () {
                return !1;
              },
              removeClass: function () {},
              removeNativeControlAttr: function () {},
              setNativeControlAttr: function () {},
              setNativeControlDisabled: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          (this.currentCheckState = this.determineCheckState()),
            this.updateAriaChecked(),
            this.adapter.addClass(Ji.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(Ji.DISABLED)
              : this.adapter.removeClass(Ji.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, ts.ANIM_END_LATCH_MS)));
        }),
        (t.prototype.handleChange = function () {
          this.transitionCheckState();
        }),
        (t.prototype.transitionCheckState = function () {
          if (this.adapter.hasNativeControl()) {
            var e = this.currentCheckState,
              t = this.determineCheckState();
            if (e !== t) {
              this.updateAriaChecked();
              var n = Ji.SELECTED;
              t === es.TRANSITION_STATE_UNCHECKED
                ? this.adapter.removeClass(n)
                : this.adapter.addClass(n),
                this.currentAnimationClass.length > 0 &&
                  (clearTimeout(this.animEndLatchTimer),
                  this.adapter.forceLayout(),
                  this.adapter.removeClass(this.currentAnimationClass)),
                (this.currentAnimationClass = this.getTransitionAnimationClass(
                  e,
                  t
                )),
                (this.currentCheckState = t),
                this.adapter.isAttachedToDOM() &&
                  this.currentAnimationClass.length > 0 &&
                  (this.adapter.addClass(this.currentAnimationClass),
                  (this.enableAnimationEndHandler = !0));
            }
          }
        }),
        (t.prototype.determineCheckState = function () {
          var e = es.TRANSITION_STATE_INDETERMINATE,
            t = es.TRANSITION_STATE_CHECKED,
            n = es.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var a = es.TRANSITION_STATE_INIT,
            i = es.TRANSITION_STATE_CHECKED,
            s = es.TRANSITION_STATE_UNCHECKED,
            r = t.cssClasses,
            o = r.ANIM_UNCHECKED_CHECKED,
            c = r.ANIM_UNCHECKED_INDETERMINATE,
            l = r.ANIM_CHECKED_UNCHECKED,
            d = r.ANIM_CHECKED_INDETERMINATE,
            u = r.ANIM_INDETERMINATE_CHECKED,
            p = r.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case a:
              return n === s ? "" : n === i ? u : p;
            case s:
              return n === i ? o : c;
            case i:
              return n === s ? l : d;
            default:
              return n === i ? u : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                es.ARIA_CHECKED_ATTR,
                es.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(es.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Ce);
  function as(n) {
    let a,
      r,
      o,
      c,
      l,
      d,
      u,
      p,
      m,
      f,
      h,
      I,
      y,
      $,
      v,
      x,
      P = [
        { class: (o = Ve({ [n[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        n[20],
        { disabled: n[1] },
        { __value: (c = n[19](n[7]) ? n[6] : n[7]) },
        { "data-indeterminate": (l = !n[19](n[0]) && n[0] ? "true" : void 0) },
        n[16],
        Qe(n[26], "input$"),
      ],
      _ = {};
    for (let e = 0; e < P.length; e += 1) _ = t(_, P[e]);
    let O = [
        {
          class: (h = Ve({
            [n[3]]: !0,
            "mdc-checkbox": !0,
            "mdc-checkbox--disabled": n[1],
            "mdc-checkbox--touch": n[5],
            "mdc-data-table__header-row-checkbox":
              "data-table" === n[21] && n[22],
            "mdc-data-table__row-checkbox": "data-table" === n[21] && !n[22],
            ...n[14],
          })),
        },
        { style: (I = Object.entries(n[15]).map(is).concat([n[4]]).join(" ")) },
        Ge(n[26], ["input$"]),
      ],
      L = {};
    for (let e = 0; e < O.length; e += 1) L = t(L, O[e]);
    return {
      c() {
        (a = S("div")),
          (r = S("input")),
          (u = E()),
          (p = S("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (m = E()),
          (f = S("div")),
          N(r, _),
          D(p, "class", "mdc-checkbox__background"),
          D(f, "class", "mdc-checkbox__ripple"),
          N(a, L);
      },
      m(e, t) {
        T(e, a, t),
          g(a, r),
          r.autofocus && r.focus(),
          n[36](r),
          (r.checked = n[12]),
          g(a, u),
          g(a, p),
          g(a, m),
          g(a, f),
          n[38](a),
          v ||
            ((x = [
              b((d = We.call(null, r, n[8]))),
              A(r, "change", n[37]),
              A(r, "blur", n[34]),
              A(r, "focus", n[35]),
              b((y = We.call(null, a, n[2]))),
              b(n[18].call(null, a)),
              b(
                ($ = jn.call(null, a, {
                  unbounded: !0,
                  addClass: n[23],
                  removeClass: n[24],
                  addStyle: n[25],
                  active: n[17],
                  eventTarget: n[11],
                }))
              ),
              A(a, "animationend", n[39]),
            ]),
            (v = !0));
      },
      p(e, t) {
        N(
          r,
          (_ = ce(P, [
            512 & t[0] &&
              o !==
                (o = Ve({
                  [e[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: o },
            { type: "checkbox" },
            e[20],
            2 & t[0] && { disabled: e[1] },
            192 & t[0] &&
              c !== (c = e[19](e[7]) ? e[6] : e[7]) && { __value: c },
            1 & t[0] &&
              l !== (l = !e[19](e[0]) && e[0] ? "true" : void 0) && {
                "data-indeterminate": l,
              },
            65536 & t[0] && e[16],
            67108864 & t[0] && Qe(e[26], "input$"),
          ]))
        ),
          d && s(d.update) && 256 & t[0] && d.update.call(null, e[8]),
          4096 & t[0] && (r.checked = e[12]),
          N(
            a,
            (L = ce(O, [
              16426 & t[0] &&
                h !==
                  (h = Ve({
                    [e[3]]: !0,
                    "mdc-checkbox": !0,
                    "mdc-checkbox--disabled": e[1],
                    "mdc-checkbox--touch": e[5],
                    "mdc-data-table__header-row-checkbox":
                      "data-table" === e[21] && e[22],
                    "mdc-data-table__row-checkbox":
                      "data-table" === e[21] && !e[22],
                    ...e[14],
                  })) && { class: h },
              32784 & t[0] &&
                I !==
                  (I = Object.entries(e[15])
                    .map(is)
                    .concat([e[4]])
                    .join(" ")) && { style: I },
              67108864 & t[0] && Ge(e[26], ["input$"]),
            ]))
          ),
          y && s(y.update) && 4 & t[0] && y.update.call(null, e[2]),
          $ &&
            s($.update) &&
            133120 & t[0] &&
            $.update.call(null, {
              unbounded: !0,
              addClass: e[23],
              removeClass: e[24],
              addStyle: e[25],
              active: e[17],
              eventTarget: e[11],
            });
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[36](null), n[38](null), (v = !1), i(x);
      },
    };
  }
  const is = ([e, t]) => `${e}: ${t};`;
  function ss(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "disabled",
      "touch",
      "indeterminate",
      "group",
      "checked",
      "value",
      "valueKey",
      "input$use",
      "input$class",
      "getId",
      "getElement",
    ];
    let s = f(n, i);
    var r;
    const o = ze(M());
    let c = () => {};
    function l(e) {
      return e === c;
    }
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: I = "" } = n,
      { style: b = "" } = n,
      { disabled: g = !1 } = n,
      { touch: T = !1 } = n,
      { indeterminate: C = c } = n,
      { group: y = c } = n,
      { checked: S = c } = n,
      { value: $ = null } = n,
      { valueKey: v = c } = n,
      { input$use: E = [] } = n,
      { input$class: x = "" } = n,
      A = {},
      D = {},
      N = {},
      P = !1,
      _ = null !== (r = H("SMUI:generic:input:props")) && void 0 !== r ? r : {},
      O = l(y) ? !l(S) && (null != S ? S : void 0) : -1 !== y.indexOf($),
      L = H("SMUI:checkbox:context"),
      R = H("SMUI:data-table:row:header"),
      F = S,
      B = l(y) ? [] : [...y],
      w = O;
    function U(e) {
      A[e] || a(14, (A[e] = !0), A);
    }
    function j(e) {
      (e in A && !A[e]) || a(14, (A[e] = !1), A);
    }
    function q(e, t) {
      N[e] !== t && a(16, (N[e] = t), N);
    }
    function z(e) {
      (e in N && null == N[e]) || a(16, (N[e] = void 0), N);
    }
    function Q() {
      return d;
    }
    k(() => {
      a(11, (p.indeterminate = !l(C) && C), p),
        a(
          10,
          (u = new ns({
            addClass: U,
            forceLayout: () => d.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(d.parentNode),
            isChecked: () => null != O && O,
            isIndeterminate: () => !l(C) && C,
            removeClass: j,
            removeNativeControlAttr: z,
            setNativeControlAttr: q,
            setNativeControlDisabled: (e) => a(1, (g = e)),
          }))
        );
      const e = {
        _smui_checkbox_accessor: !0,
        get element() {
          return Q();
        },
        get checked() {
          return null != O && O;
        },
        set checked(e) {
          O !== e && a(12, (O = e));
        },
        get indeterminate() {
          return !l(C) && C;
        },
        set indeterminate(e) {
          a(0, (C = e));
        },
        activateRipple() {
          g || a(17, (P = !0));
        },
        deactivateRipple() {
          a(17, (P = !1));
        },
      };
      return (
        Ue(d, "SMUIGenericInput:mount", e),
        Ue(d, "SMUICheckbox:mount", e),
        u.init(),
        () => {
          Ue(d, "SMUIGenericInput:unmount", e),
            Ue(d, "SMUICheckbox:unmount", e),
            u.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(26, (s = f(n, i))),
          "use" in e && a(2, (h = e.use)),
          "class" in e && a(3, (I = e.class)),
          "style" in e && a(4, (b = e.style)),
          "disabled" in e && a(1, (g = e.disabled)),
          "touch" in e && a(5, (T = e.touch)),
          "indeterminate" in e && a(0, (C = e.indeterminate)),
          "group" in e && a(27, (y = e.group)),
          "checked" in e && a(28, (S = e.checked)),
          "value" in e && a(6, ($ = e.value)),
          "valueKey" in e && a(7, (v = e.valueKey)),
          "input$use" in e && a(8, (E = e.input$use)),
          "input$class" in e && a(9, (x = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!l(y))
            if (w !== O) {
              const t = y.indexOf($);
              O && -1 === t
                ? (y.push($),
                  a(27, y),
                  a(33, w),
                  a(12, O),
                  a(6, $),
                  a(32, B),
                  a(28, S),
                  a(31, F),
                  a(0, C),
                  a(11, p),
                  a(10, u))
                : O ||
                  -1 === t ||
                  (y.splice(t, 1),
                  a(27, y),
                  a(33, w),
                  a(12, O),
                  a(6, $),
                  a(32, B),
                  a(28, S),
                  a(31, F),
                  a(0, C),
                  a(11, p),
                  a(10, u)),
                (e = !0);
            } else {
              const t = B.indexOf($),
                n = y.indexOf($);
              t > -1 && -1 === n
                ? (a(12, (O = !1)), (e = !0))
                : n > -1 && -1 === t && (a(12, (O = !0)), (e = !0));
            }
          l(S)
            ? !!w != !!O && (e = !0)
            : S !== (null != O ? O : null) &&
              (S === F
                ? (a(28, (S = null != O ? O : null)), l(C) || a(0, (C = !1)))
                : a(12, (O = null != S ? S : void 0)),
              (e = !0)),
            p &&
              (l(C)
                ? p.indeterminate &&
                  (a(11, (p.indeterminate = !1), p), (e = !0))
                : !C && p.indeterminate
                ? (a(11, (p.indeterminate = !1), p), (e = !0))
                : C &&
                  !p.indeterminate &&
                  (a(11, (p.indeterminate = !0), p), (e = !0))),
            a(31, (F = S)),
            a(32, (B = l(y) ? [] : [...y])),
            a(33, (w = O)),
            e && u && u.handleChange();
        }
      }),
      [
        C,
        g,
        h,
        I,
        b,
        T,
        $,
        v,
        E,
        x,
        u,
        p,
        O,
        d,
        A,
        D,
        N,
        P,
        o,
        l,
        _,
        L,
        R,
        U,
        j,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], a(15, D))
              : a(15, (D[e] = t), D));
        },
        s,
        y,
        S,
        function () {
          return _ && _.id;
        },
        Q,
        F,
        B,
        w,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e),
              a(11, p),
              a(27, y),
              a(33, w),
              a(12, O),
              a(6, $),
              a(32, B),
              a(28, S),
              a(31, F),
              a(0, C),
              a(10, u);
          });
        },
        function () {
          (O = this.checked),
            a(12, O),
            a(27, y),
            a(33, w),
            a(6, $),
            a(32, B),
            a(28, S),
            a(31, F),
            a(0, C),
            a(11, p),
            a(10, u);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(13, d);
          });
        },
        () => u && u.handleAnimationEnd(),
      ]
    );
  }
  class rs extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          ss,
          as,
          r,
          {
            use: 2,
            class: 3,
            style: 4,
            disabled: 1,
            touch: 5,
            indeterminate: 0,
            group: 27,
            checked: 28,
            value: 6,
            valueKey: 7,
            input$use: 8,
            input$class: 9,
            getId: 29,
            getElement: 30,
          },
          null,
          [-1, -1]
        );
    }
    get getId() {
      return this.$$.ctx[29];
    }
    get getElement() {
      return this.$$.ctx[30];
    }
  }
  /**
   * @license
   * Copyright 2017 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var os = { ROOT: "mdc-form-field" },
    cs = { LABEL_SELECTOR: ".mdc-form-field > label" },
    ls = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.click = function () {
            a.handleClick();
          }),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return os;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return cs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              activateInputRipple: function () {},
              deactivateInputRipple: function () {},
              deregisterInteractionHandler: function () {},
              registerInteractionHandler: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          this.adapter.registerInteractionHandler("click", this.click);
        }),
        (t.prototype.destroy = function () {
          this.adapter.deregisterInteractionHandler("click", this.click);
        }),
        (t.prototype.handleClick = function () {
          var e = this;
          this.adapter.activateInputRipple(),
            requestAnimationFrame(function () {
              e.adapter.deactivateInputRipple();
            });
        }),
        t
      );
    })(Ce);
  const ds = (e) => ({}),
    us = (e) => ({});
  function ps(e) {
    let n, a, r, o, l, m, f, h, I;
    const y = e[13].default,
      $ = c(y, e, e[12], null),
      v = e[13].label,
      x = c(v, e, e[12], us);
    let D = [{ for: e[4] }, Qe(e[10], "label$")],
      P = {};
    for (let e = 0; e < D.length; e += 1) P = t(P, D[e]);
    let _ = [
        {
          class: (l = Ve({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        Ge(e[10], ["label$"]),
      ],
      O = {};
    for (let e = 0; e < _.length; e += 1) O = t(O, _[e]);
    return {
      c() {
        (n = S("div")),
          $ && $.c(),
          (a = E()),
          (r = S("label")),
          x && x.c(),
          N(r, P),
          N(n, O);
      },
      m(t, i) {
        T(t, n, i),
          $ && $.m(n, null),
          g(n, a),
          g(n, r),
          x && x.m(r, null),
          e[14](r),
          e[15](n),
          (f = !0),
          h ||
            ((I = [
              b((o = We.call(null, r, e[5]))),
              b((m = We.call(null, n, e[0]))),
              b(e[9].call(null, n)),
              A(n, "SMUIGenericInput:mount", e[16]),
              A(n, "SMUIGenericInput:unmount", e[17]),
            ]),
            (h = !0));
      },
      p(e, [t]) {
        $ &&
          $.p &&
          (!f || 4096 & t) &&
          u($, y, e, e[12], f ? d(y, e[12], t, null) : p(e[12]), null),
          x &&
            x.p &&
            (!f || 4096 & t) &&
            u(x, v, e, e[12], f ? d(v, e[12], t, ds) : p(e[12]), us),
          N(
            r,
            (P = ce(D, [
              (!f || 16 & t) && { for: e[4] },
              1024 & t && Qe(e[10], "label$"),
            ]))
          ),
          o && s(o.update) && 32 & t && o.update.call(null, e[5]),
          N(
            n,
            (O = ce(_, [
              (!f ||
                (14 & t &&
                  l !==
                    (l = Ve({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: l },
              1024 & t && Ge(e[10], ["label$"]),
            ]))
          ),
          m && s(m.update) && 1 & t && m.update.call(null, e[0]);
      },
      i(e) {
        f || (se($, e), se(x, e), (f = !0));
      },
      o(e) {
        re($, e), re(x, e), (f = !1);
      },
      d(t) {
        t && C(n),
          $ && $.d(t),
          x && x.d(t),
          e[14](null),
          e[15](null),
          (h = !1),
          i(I);
      },
    };
  }
  let ms = 0;
  function fs(e, n, a) {
    const i = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l,
      d,
      u,
      p,
      { use: h = [] } = n,
      { class: I = "" } = n,
      { align: b = "start" } = n,
      { noWrap: g = !1 } = n,
      { inputId: T = "SMUI-form-field-" + ms++ } = n,
      { label$use: C = [] } = n;
    w("SMUI:generic:input:props", { id: T }),
      k(
        () => (
          (d = new ls({
            activateInputRipple: () => {
              p && p.activateRipple();
            },
            deactivateInputRipple: () => {
              p && p.deactivateRipple();
            },
            deregisterInteractionHandler: (e, t) => {
              u.removeEventListener(e, t);
            },
            registerInteractionHandler: (e, t) => {
              u.addEventListener(e, t);
            },
          })),
          d.init(),
          () => {
            d.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(10, (s = f(n, i))),
          "use" in e && a(0, (h = e.use)),
          "class" in e && a(1, (I = e.class)),
          "align" in e && a(2, (b = e.align)),
          "noWrap" in e && a(3, (g = e.noWrap)),
          "inputId" in e && a(4, (T = e.inputId)),
          "label$use" in e && a(5, (C = e.label$use)),
          "$$scope" in e && a(12, (o = e.$$scope));
      }),
      [
        h,
        I,
        b,
        g,
        T,
        C,
        l,
        u,
        p,
        c,
        s,
        function () {
          return l;
        },
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (u = e), a(7, u);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(6, l);
          });
        },
        (e) => a(8, (p = e.detail)),
        () => a(8, (p = void 0)),
      ]
    );
  }
  class hs extends he {
    constructor(e) {
      super(),
        fe(this, e, fs, ps, r, {
          use: 0,
          class: 1,
          align: 2,
          noWrap: 3,
          inputId: 4,
          label$use: 5,
          getElement: 11,
        });
    }
    get getElement() {
      return this.$$.ctx[11];
    }
  }
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ var Is,
    bs,
    gs = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Ts = {
      CLOSED_EVENT: "MDCMenuSurface:closed",
      CLOSING_EVENT: "MDCMenuSurface:closing",
      OPENED_EVENT: "MDCMenuSurface:opened",
      FOCUSABLE_ELEMENTS: [
        "button:not(:disabled)",
        '[href]:not([aria-disabled="true"])',
        "input:not(:disabled)",
        "select:not(:disabled)",
        "textarea:not(:disabled)",
        '[tabindex]:not([tabindex="-1"]):not([aria-disabled="true"])',
      ].join(", "),
    },
    Cs = {
      TRANSITION_OPEN_DURATION: 120,
      TRANSITION_CLOSE_DURATION: 75,
      MARGIN_TO_EDGE: 32,
      ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO: 0.67,
      TOUCH_EVENT_WAIT_MS: 30,
    };
  !(function (e) {
    (e[(e.BOTTOM = 1)] = "BOTTOM"),
      (e[(e.CENTER = 2)] = "CENTER"),
      (e[(e.RIGHT = 4)] = "RIGHT"),
      (e[(e.FLIP_RTL = 8)] = "FLIP_RTL");
  })(Is || (Is = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(bs || (bs = {}));
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var ys,
    Ss = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.isSurfaceOpen = !1),
          (a.isQuickOpen = !1),
          (a.isHoistedElement = !1),
          (a.isFixedPosition = !1),
          (a.isHorizontallyCenteredOnViewport = !1),
          (a.maxHeight = 0),
          (a.openAnimationEndTimerId = 0),
          (a.closeAnimationEndTimerId = 0),
          (a.animationRequestId = 0),
          (a.anchorCorner = bs.TOP_START),
          (a.originCorner = bs.TOP_START),
          (a.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (a.position = { x: 0, y: 0 }),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return gs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ts;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Cs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return bs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              hasAnchor: function () {
                return !1;
              },
              isElementInContainer: function () {
                return !1;
              },
              isFocused: function () {
                return !1;
              },
              isRtl: function () {
                return !1;
              },
              getInnerDimensions: function () {
                return { height: 0, width: 0 };
              },
              getAnchorDimensions: function () {
                return null;
              },
              getWindowDimensions: function () {
                return { height: 0, width: 0 };
              },
              getBodyDimensions: function () {
                return { height: 0, width: 0 };
              },
              getWindowScroll: function () {
                return { x: 0, y: 0 };
              },
              setPosition: function () {},
              setMaxHeight: function () {},
              setTransformOrigin: function () {},
              saveFocus: function () {},
              restoreFocus: function () {},
              notifyClose: function () {},
              notifyOpen: function () {},
              notifyClosing: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          var e = t.cssClasses,
            n = e.ROOT,
            a = e.OPEN;
          if (!this.adapter.hasClass(n))
            throw new Error(n + " class required in root element.");
          this.adapter.hasClass(a) && (this.isSurfaceOpen = !0);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.openAnimationEndTimerId),
            clearTimeout(this.closeAnimationEndTimerId),
            cancelAnimationFrame(this.animationRequestId);
        }),
        (t.prototype.setAnchorCorner = function (e) {
          this.anchorCorner = e;
        }),
        (t.prototype.flipCornerHorizontally = function () {
          this.originCorner = this.originCorner ^ Is.RIGHT;
        }),
        (t.prototype.setAnchorMargin = function (e) {
          (this.anchorMargin.top = e.top || 0),
            (this.anchorMargin.right = e.right || 0),
            (this.anchorMargin.bottom = e.bottom || 0),
            (this.anchorMargin.left = e.left || 0);
        }),
        (t.prototype.setIsHoisted = function (e) {
          this.isHoistedElement = e;
        }),
        (t.prototype.setFixedPosition = function (e) {
          this.isFixedPosition = e;
        }),
        (t.prototype.isFixed = function () {
          return this.isFixedPosition;
        }),
        (t.prototype.setAbsolutePosition = function (e, t) {
          (this.position.x = this.isFinite(e) ? e : 0),
            (this.position.y = this.isFinite(t) ? t : 0);
        }),
        (t.prototype.setIsHorizontallyCenteredOnViewport = function (e) {
          this.isHorizontallyCenteredOnViewport = e;
        }),
        (t.prototype.setQuickOpen = function (e) {
          this.isQuickOpen = e;
        }),
        (t.prototype.setMaxHeight = function (e) {
          this.maxHeight = e;
        }),
        (t.prototype.isOpen = function () {
          return this.isSurfaceOpen;
        }),
        (t.prototype.open = function () {
          var e = this;
          this.isSurfaceOpen ||
            (this.adapter.saveFocus(),
            this.isQuickOpen
              ? ((this.isSurfaceOpen = !0),
                this.adapter.addClass(t.cssClasses.OPEN),
                (this.dimensions = this.adapter.getInnerDimensions()),
                this.autoposition(),
                this.adapter.notifyOpen())
              : (this.adapter.addClass(t.cssClasses.ANIMATING_OPEN),
                (this.animationRequestId = requestAnimationFrame(function () {
                  (e.dimensions = e.adapter.getInnerDimensions()),
                    e.autoposition(),
                    e.adapter.addClass(t.cssClasses.OPEN),
                    (e.openAnimationEndTimerId = setTimeout(function () {
                      (e.openAnimationEndTimerId = 0),
                        e.adapter.removeClass(t.cssClasses.ANIMATING_OPEN),
                        e.adapter.notifyOpen();
                    }, Cs.TRANSITION_OPEN_DURATION));
                })),
                (this.isSurfaceOpen = !0)));
        }),
        (t.prototype.close = function (e) {
          var n = this;
          if ((void 0 === e && (e = !1), this.isSurfaceOpen)) {
            if ((this.adapter.notifyClosing(), this.isQuickOpen))
              return (
                (this.isSurfaceOpen = !1),
                e || this.maybeRestoreFocus(),
                this.adapter.removeClass(t.cssClasses.OPEN),
                this.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                void this.adapter.notifyClose()
              );
            this.adapter.addClass(t.cssClasses.ANIMATING_CLOSED),
              requestAnimationFrame(function () {
                n.adapter.removeClass(t.cssClasses.OPEN),
                  n.adapter.removeClass(t.cssClasses.IS_OPEN_BELOW),
                  (n.closeAnimationEndTimerId = setTimeout(function () {
                    (n.closeAnimationEndTimerId = 0),
                      n.adapter.removeClass(t.cssClasses.ANIMATING_CLOSED),
                      n.adapter.notifyClose();
                  }, Cs.TRANSITION_CLOSE_DURATION));
              }),
              (this.isSurfaceOpen = !1),
              e || this.maybeRestoreFocus();
          }
        }),
        (t.prototype.handleBodyClick = function (e) {
          var t = e.target;
          this.adapter.isElementInContainer(t) || this.close();
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.autoposition = function () {
          var e;
          this.measurements = this.getAutoLayoutmeasurements();
          var n = this.getoriginCorner(),
            a = this.getMenuSurfaceMaxHeight(n),
            i = this.hasBit(n, Is.BOTTOM) ? "bottom" : "top",
            s = this.hasBit(n, Is.RIGHT) ? "right" : "left",
            r = this.getHorizontalOriginOffset(n),
            o = this.getVerticalOriginOffset(n),
            c = this.measurements,
            l = c.anchorSize,
            d = c.surfaceSize,
            u = (((e = {})[s] = r), (e[i] = o), e);
          l.width / d.width > Cs.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (s = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(u),
            this.adapter.setTransformOrigin(s + " " + i),
            this.adapter.setPosition(u),
            this.adapter.setMaxHeight(a ? a + "px" : ""),
            this.hasBit(n, Is.BOTTOM) ||
              this.adapter.addClass(t.cssClasses.IS_OPEN_BELOW);
        }),
        (t.prototype.getAutoLayoutmeasurements = function () {
          var e = this.adapter.getAnchorDimensions(),
            t = this.adapter.getBodyDimensions(),
            n = this.adapter.getWindowDimensions(),
            a = this.adapter.getWindowScroll();
          return (
            e ||
              (e = {
                top: this.position.y,
                right: this.position.x,
                bottom: this.position.y,
                left: this.position.x,
                width: 0,
                height: 0,
              }),
            {
              anchorSize: e,
              bodySize: t,
              surfaceSize: this.dimensions,
              viewportDistance: {
                top: e.top,
                right: n.width - e.right,
                bottom: n.height - e.bottom,
                left: e.left,
              },
              viewportSize: n,
              windowScroll: a,
            }
          );
        }),
        (t.prototype.getoriginCorner = function () {
          var e,
            n,
            a = this.originCorner,
            i = this.measurements,
            s = i.viewportDistance,
            r = i.anchorSize,
            o = i.surfaceSize,
            c = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Is.BOTTOM)
            ? ((e = s.top - c + this.anchorMargin.bottom),
              (n = s.bottom - c - this.anchorMargin.bottom))
            : ((e = s.top - c + this.anchorMargin.top),
              (n = s.bottom - c + r.height - this.anchorMargin.top)),
            !(n - o.height > 0) && e > n && (a = this.setBit(a, Is.BOTTOM));
          var l,
            d,
            u = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Is.FLIP_RTL),
            m =
              this.hasBit(this.anchorCorner, Is.RIGHT) ||
              this.hasBit(a, Is.RIGHT),
            f = !1;
          (f = u && p ? !m : m)
            ? ((l = s.left + r.width + this.anchorMargin.right),
              (d = s.right - this.anchorMargin.right))
            : ((l = s.left + this.anchorMargin.left),
              (d = s.right + r.width - this.anchorMargin.left));
          var h = l - o.width > 0,
            I = d - o.width > 0,
            b = this.hasBit(a, Is.FLIP_RTL) && this.hasBit(a, Is.RIGHT);
          return (
            (I && b && u) || (!h && b)
              ? (a = this.unsetBit(a, Is.RIGHT))
              : ((h && f && u) || (h && !f && m) || (!I && l >= d)) &&
                (a = this.setBit(a, Is.RIGHT)),
            a
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            a = 0,
            i = this.hasBit(e, Is.BOTTOM),
            s = this.hasBit(this.anchorCorner, Is.BOTTOM),
            r = t.numbers.MARGIN_TO_EDGE;
          return (
            i
              ? ((a = n.top + this.anchorMargin.top - r),
                s || (a += this.measurements.anchorSize.height))
              : ((a =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  r),
                s && (a -= this.measurements.anchorSize.height)),
            a
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Is.RIGHT),
            a = this.hasBit(this.anchorCorner, Is.RIGHT);
          if (n) {
            var i = a
              ? t.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? i -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : i;
          }
          return a ? t.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (t.prototype.getVerticalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Is.BOTTOM),
            a = this.hasBit(this.anchorCorner, Is.BOTTOM);
          return n
            ? a
              ? t.height - this.anchorMargin.top
              : -this.anchorMargin.bottom
            : a
            ? t.height + this.anchorMargin.bottom
            : this.anchorMargin.top;
        }),
        (t.prototype.adjustPositionForHoistedElement = function (e) {
          var t,
            n,
            a = this.measurements,
            i = a.windowScroll,
            s = a.viewportDistance,
            r = a.surfaceSize,
            o = a.viewportSize,
            c = Object.keys(e);
          try {
            for (var l = Te(c), d = l.next(); !d.done; d = l.next()) {
              var u = d.value,
                p = e[u] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== u && "right" !== u)
                ? ((p += s[u]),
                  this.isFixedPosition ||
                    ("top" === u
                      ? (p += i.y)
                      : "bottom" === u
                      ? (p -= i.y)
                      : "left" === u
                      ? (p += i.x)
                      : (p -= i.x)),
                  (e[u] = p))
                : (e[u] = (o.width - r.width) / 2);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              d && !d.done && (n = l.return) && n.call(l);
            } finally {
              if (t) throw t.error;
            }
          }
        }),
        (t.prototype.maybeRestoreFocus = function () {
          var e = this,
            t = this.adapter.isFocused(),
            n =
              document.activeElement &&
              this.adapter.isElementInContainer(document.activeElement);
          (t || n) &&
            setTimeout(function () {
              e.adapter.restoreFocus();
            }, Cs.TOUCH_EVENT_WAIT_MS);
        }),
        (t.prototype.hasBit = function (e, t) {
          return Boolean(e & t);
        }),
        (t.prototype.setBit = function (e, t) {
          return e | t;
        }),
        (t.prototype.unsetBit = function (e, t) {
          return e ^ t;
        }),
        (t.prototype.isFinite = function (e) {
          return "number" == typeof e && isFinite(e);
        }),
        t
      );
    })(Ce),
    $s = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    vs = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    Es = { FOCUS_ROOT_INDEX: -1 };
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ !(function (e) {
    (e[(e.NONE = 0)] = "NONE"),
      (e[(e.LIST_ROOT = 1)] = "LIST_ROOT"),
      (e[(e.FIRST_ITEM = 2)] = "FIRST_ITEM"),
      (e[(e.LAST_ITEM = 3)] = "LAST_ITEM");
  })(ys || (ys = {}));
  /**
   * @license
   * Copyright 2018 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */
  var xs = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.closeAnimationEndTimerId = 0),
          (a.defaultFocusState = ys.LIST_ROOT),
          (a.selectedIndex = -1),
          a
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return $s;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return vs;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Es;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClassToElementAtIndex: function () {},
              removeClassFromElementAtIndex: function () {},
              addAttributeToElementAtIndex: function () {},
              removeAttributeFromElementAtIndex: function () {},
              getAttributeFromElementAtIndex: function () {
                return null;
              },
              elementContainsClass: function () {
                return !1;
              },
              closeSurface: function () {},
              getElementIndex: function () {
                return -1;
              },
              notifySelected: function () {},
              getMenuItemCount: function () {
                return 0;
              },
              focusItemAtIndex: function () {},
              focusListRoot: function () {},
              getSelectedSiblingOfItemAtIndex: function () {
                return -1;
              },
              isSelectableItemAtIndex: function () {
                return !1;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.destroy = function () {
          this.closeAnimationEndTimerId &&
            clearTimeout(this.closeAnimationEndTimerId),
            this.adapter.closeSurface();
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.key,
            n = e.keyCode;
          ("Tab" === t || 9 === n) && this.adapter.closeSurface(!0);
        }),
        (t.prototype.handleItemAction = function (e) {
          var t = this,
            n = this.adapter.getElementIndex(e);
          if (!(n < 0)) {
            this.adapter.notifySelected({ index: n });
            var a =
              "true" ===
              this.adapter.getAttributeFromElementAtIndex(
                n,
                vs.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(a),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Ss.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case ys.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case ys.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case ys.NONE:
              break;
            default:
              this.adapter.focusListRoot();
          }
        }),
        (t.prototype.setDefaultFocusState = function (e) {
          this.defaultFocusState = e;
        }),
        (t.prototype.getSelectedIndex = function () {
          return this.selectedIndex;
        }),
        (t.prototype.setSelectedIndex = function (e) {
          if (
            (this.validatedIndex(e), !this.adapter.isSelectableItemAtIndex(e))
          )
            throw new Error(
              "MDCMenuFoundation: No selection group at specified index."
            );
          var t = this.adapter.getSelectedSiblingOfItemAtIndex(e);
          t >= 0 &&
            (this.adapter.removeAttributeFromElementAtIndex(
              t,
              vs.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              $s.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              $s.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              vs.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  Ii.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  vs.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  Ii.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  vs.ARIA_DISABLED_ATTR,
                  "true"
                ));
        }),
        (t.prototype.validatedIndex = function (e) {
          var t = this.adapter.getMenuItemCount();
          if (!(e >= 0 && e < t))
            throw new Error(
              "MDCMenuFoundation: No list item at specified index."
            );
        }),
        t
      );
    })(Ce),
    As = {
      ACTIVATED: "mdc-select--activated",
      DISABLED: "mdc-select--disabled",
      FOCUSED: "mdc-select--focused",
      INVALID: "mdc-select--invalid",
      MENU_INVALID: "mdc-select__menu--invalid",
      OUTLINED: "mdc-select--outlined",
      REQUIRED: "mdc-select--required",
      ROOT: "mdc-select",
      WITH_LEADING_ICON: "mdc-select--with-leading-icon",
    },
    Ds = {
      ARIA_CONTROLS: "aria-controls",
      ARIA_DESCRIBEDBY: "aria-describedby",
      ARIA_SELECTED_ATTR: "aria-selected",
      CHANGE_EVENT: "MDCSelect:change",
      HIDDEN_INPUT_SELECTOR: 'input[type="hidden"]',
      LABEL_SELECTOR: ".mdc-floating-label",
      LEADING_ICON_SELECTOR: ".mdc-select__icon",
      LINE_RIPPLE_SELECTOR: ".mdc-line-ripple",
      MENU_SELECTOR: ".mdc-select__menu",
      OUTLINE_SELECTOR: ".mdc-notched-outline",
      SELECTED_TEXT_SELECTOR: ".mdc-select__selected-text",
      SELECT_ANCHOR_SELECTOR: ".mdc-select__anchor",
      VALUE_ATTR: "data-value",
    },
    Ns = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    Ps = (function (e) {
      function t(n, a) {
        void 0 === a && (a = {});
        var i = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.disabled = !1),
          (i.isMenuOpen = !1),
          (i.useDefaultValidation = !0),
          (i.customValidity = !0),
          (i.lastSelectedIndex = Ns.UNSET_INDEX),
          (i.clickDebounceTimeout = 0),
          (i.recentlyClicked = !1),
          (i.leadingIcon = a.leadingIcon),
          (i.helperText = a.helperText),
          i
        );
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return As;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ns;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ds;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              activateBottomLine: function () {},
              deactivateBottomLine: function () {},
              getSelectedIndex: function () {
                return -1;
              },
              setSelectedIndex: function () {},
              hasLabel: function () {
                return !1;
              },
              floatLabel: function () {},
              getLabelWidth: function () {
                return 0;
              },
              setLabelRequired: function () {},
              hasOutline: function () {
                return !1;
              },
              notchOutline: function () {},
              closeOutline: function () {},
              setRippleCenter: function () {},
              notifyChange: function () {},
              setSelectedText: function () {},
              isSelectAnchorFocused: function () {
                return !1;
              },
              getSelectAnchorAttr: function () {
                return "";
              },
              setSelectAnchorAttr: function () {},
              removeSelectAnchorAttr: function () {},
              addMenuClass: function () {},
              removeMenuClass: function () {},
              openMenu: function () {},
              closeMenu: function () {},
              getAnchorElement: function () {
                return null;
              },
              setMenuAnchorElement: function () {},
              setMenuAnchorCorner: function () {},
              setMenuWrapFocus: function () {},
              focusMenuItemAtIndex: function () {},
              getMenuItemCount: function () {
                return 0;
              },
              getMenuItemValues: function () {
                return [];
              },
              getMenuItemTextAtIndex: function () {
                return "";
              },
              isTypeaheadInProgress: function () {
                return !1;
              },
              typeaheadMatchItem: function () {
                return -1;
              },
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getSelectedIndex = function () {
          return this.adapter.getSelectedIndex();
        }),
        (t.prototype.setSelectedIndex = function (e, t, n) {
          void 0 === t && (t = !1),
            void 0 === n && (n = !1),
            e >= this.adapter.getMenuItemCount() ||
              (e === Ns.UNSET_INDEX
                ? this.adapter.setSelectedText("")
                : this.adapter.setSelectedText(
                    this.adapter.getMenuItemTextAtIndex(e).trim()
                  ),
              this.adapter.setSelectedIndex(e),
              t && this.adapter.closeMenu(),
              n || this.lastSelectedIndex === e || this.handleChange(),
              (this.lastSelectedIndex = e));
        }),
        (t.prototype.setValue = function (e, t) {
          void 0 === t && (t = !1);
          var n = this.adapter.getMenuItemValues().indexOf(e);
          this.setSelectedIndex(n, !1, t);
        }),
        (t.prototype.getValue = function () {
          var e = this.adapter.getSelectedIndex(),
            t = this.adapter.getMenuItemValues();
          return e !== Ns.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(As.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(As.DISABLED),
            this.leadingIcon && this.leadingIcon.setDisabled(this.disabled),
            this.disabled
              ? this.adapter.removeSelectAnchorAttr("tabindex")
              : this.adapter.setSelectAnchorAttr("tabindex", "0"),
            this.adapter.setSelectAnchorAttr(
              "aria-disabled",
              this.disabled.toString()
            );
        }),
        (t.prototype.openMenu = function () {
          this.adapter.addClass(As.ACTIVATED),
            this.adapter.openMenu(),
            (this.isMenuOpen = !0),
            this.adapter.setSelectAnchorAttr("aria-expanded", "true");
        }),
        (t.prototype.setHelperTextContent = function (e) {
          this.helperText && this.helperText.setContent(e);
        }),
        (t.prototype.layout = function () {
          if (this.adapter.hasLabel()) {
            var e = this.getValue().length > 0,
              t = this.adapter.hasClass(As.FOCUSED),
              n = e || t,
              a = this.adapter.hasClass(As.REQUIRED);
            this.notchOutline(n),
              this.adapter.floatLabel(n),
              this.adapter.setLabelRequired(a);
          }
        }),
        (t.prototype.layoutOptions = function () {
          var e = this.adapter.getMenuItemValues().indexOf(this.getValue());
          this.setSelectedIndex(e, !1, !0);
        }),
        (t.prototype.handleMenuOpened = function () {
          if (0 !== this.adapter.getMenuItemValues().length) {
            var e = this.getSelectedIndex(),
              t = e >= 0 ? e : 0;
            this.adapter.focusMenuItemAtIndex(t);
          }
        }),
        (t.prototype.handleMenuClosing = function () {
          this.adapter.setSelectAnchorAttr("aria-expanded", "false");
        }),
        (t.prototype.handleMenuClosed = function () {
          this.adapter.removeClass(As.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(As.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(As.FOCUSED),
            this.layout(),
            this.adapter.activateBottomLine();
        }),
        (t.prototype.handleBlur = function () {
          this.isMenuOpen || this.blur();
        }),
        (t.prototype.handleClick = function (e) {
          this.disabled ||
            this.recentlyClicked ||
            (this.setClickDebounceTimeout(),
            this.isMenuOpen
              ? this.adapter.closeMenu()
              : (this.adapter.setRippleCenter(e), this.openMenu()));
        }),
        (t.prototype.handleKeydown = function (e) {
          if (!this.isMenuOpen && this.adapter.hasClass(As.FOCUSED)) {
            var t = Bn(e) === cn,
              n = Bn(e) === ln,
              a = Bn(e) === hn,
              i = Bn(e) === bn;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var s = n ? " " : e.key,
                r = this.adapter.typeaheadMatchItem(s, this.getSelectedIndex());
              return (
                r >= 0 && this.setSelectedIndex(r), void e.preventDefault()
              );
            }
            (t || n || a || i) &&
              (a && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : i &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              e.preventDefault());
          }
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(As.FOCUSED);
            if (e) {
              var n = Ns.LABEL_SCALE,
                a = this.adapter.getLabelWidth() * n;
              this.adapter.notchOutline(a);
            } else t || this.adapter.closeOutline();
          }
        }),
        (t.prototype.setLeadingIconAriaLabel = function (e) {
          this.leadingIcon && this.leadingIcon.setAriaLabel(e);
        }),
        (t.prototype.setLeadingIconContent = function (e) {
          this.leadingIcon && this.leadingIcon.setContent(e);
        }),
        (t.prototype.getUseDefaultValidation = function () {
          return this.useDefaultValidation;
        }),
        (t.prototype.setUseDefaultValidation = function (e) {
          this.useDefaultValidation = e;
        }),
        (t.prototype.setValid = function (e) {
          this.useDefaultValidation || (this.customValidity = e),
            this.adapter.setSelectAnchorAttr("aria-invalid", (!e).toString()),
            e
              ? (this.adapter.removeClass(As.INVALID),
                this.adapter.removeMenuClass(As.MENU_INVALID))
              : (this.adapter.addClass(As.INVALID),
                this.adapter.addMenuClass(As.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(As.REQUIRED) &&
            !this.adapter.hasClass(As.DISABLED)
            ? this.getSelectedIndex() !== Ns.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(As.REQUIRED)
            : this.adapter.removeClass(As.REQUIRED),
            this.adapter.setSelectAnchorAttr("aria-required", e.toString()),
            this.adapter.setLabelRequired(e);
        }),
        (t.prototype.getRequired = function () {
          return "true" === this.adapter.getSelectAnchorAttr("aria-required");
        }),
        (t.prototype.init = function () {
          var e = this.adapter.getAnchorElement();
          e &&
            (this.adapter.setMenuAnchorElement(e),
            this.adapter.setMenuAnchorCorner(bs.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(As.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(As.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(As.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(As.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(Ds.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(Ds.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, Ns.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Ce),
    _s = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    Os = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    Ls = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        be(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Os;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return _s;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              removeClass: function () {},
              hasClass: function () {
                return !1;
              },
              setAttr: function () {},
              getAttr: function () {
                return null;
              },
              removeAttr: function () {},
              setContent: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.getId = function () {
          return this.adapter.getAttr("id");
        }),
        (t.prototype.isVisible = function () {
          return "true" !== this.adapter.getAttr(_s.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(Os.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(Os.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(Os.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                Os.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(Os.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              Os.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(_s.ROLE)
                  : this.adapter.setAttr(_s.ROLE, "alert"))
              );
            this.adapter.removeAttr(_s.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(_s.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(_s.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Ce);
  /**
   * @license
   * Copyright 2016 Google Inc.
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */ const { document: Rs } = oe;
  function Ms(e) {
    let n, a, r, o, l, m, f, h;
    const I = e[31].default,
      g = c(I, e, e[30], null);
    let y = [
        {
          class: (r = Ve({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (o = Object.entries(e[11]).map(ks).concat([e[3]]).join(" ")) },
        e[13],
      ],
      $ = {};
    for (let e = 0; e < y.length; e += 1) $ = t($, y[e]);
    return {
      c() {
        (n = E()), (a = S("div")), g && g.c(), N(a, $);
      },
      m(t, i) {
        T(t, n, i),
          T(t, a, i),
          g && g.m(a, null),
          e[33](a),
          (m = !0),
          f ||
            ((h = [
              A(Rs.body, "click", e[32], !0),
              b((l = We.call(null, a, e[1]))),
              b(e[12].call(null, a)),
              A(a, "keydown", e[34]),
            ]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!m || 1073741824 & t[0]) &&
          u(g, I, e, e[30], m ? d(I, e[30], t, null) : p(e[30]), null),
          N(
            a,
            ($ = ce(y, [
              (!m ||
                (1204 & t[0] &&
                  r !==
                    (r = Ve({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: r },
              (!m ||
                (2056 & t[0] &&
                  o !==
                    (o = Object.entries(e[11])
                      .map(ks)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              8192 & t[0] && e[13],
            ]))
          ),
          l && s(l.update) && 2 & t[0] && l.update.call(null, e[1]);
      },
      i(e) {
        m || (se(g, e), (m = !0));
      },
      o(e) {
        re(g, e), (m = !1);
      },
      d(t) {
        t && C(n), t && C(a), g && g.d(t), e[33](null), (f = !1), i(h);
      },
    };
  }
  const ks = ([e, t]) => `${e}: ${t};`;
  function Fs(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "static",
      "anchor",
      "fixed",
      "open",
      "managed",
      "fullWidth",
      "quickOpen",
      "anchorElement",
      "anchorCorner",
      "anchorMargin",
      "maxHeight",
      "horizontallyCenteredOnViewport",
      "isOpen",
      "setOpen",
      "setAbsolutePosition",
      "setIsHoisted",
      "isFixed",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    var c, l, d;
    const u = ze(M());
    let p,
      h,
      I,
      { use: b = [] } = n,
      { class: g = "" } = n,
      { style: T = "" } = n,
      { static: C = !1 } = n,
      { anchor: y = !0 } = n,
      { fixed: S = !1 } = n,
      { open: $ = C } = n,
      { managed: v = !1 } = n,
      { fullWidth: E = !1 } = n,
      { quickOpen: x = !1 } = n,
      { anchorElement: A } = n,
      { anchorCorner: D } = n,
      { anchorMargin: N = { top: 0, right: 0, bottom: 0, left: 0 } } = n,
      { maxHeight: P = 0 } = n,
      { horizontallyCenteredOnViewport: _ = !1 } = n,
      O = {},
      L = {};
    w("SMUI:list:role", "menu"), w("SMUI:list:item:role", "menuitem");
    const R = bs;
    function B(e) {
      return e in O ? O[e] : j().classList.contains(e);
    }
    function H(e) {
      O[e] || a(10, (O[e] = !0), O);
    }
    function V(e) {
      (e in O && !O[e]) || a(10, (O[e] = !1), O);
    }
    function U(e) {
      h.close(e), a(0, ($ = !1));
    }
    function j() {
      return p;
    }
    k(() => {
      a(
        9,
        (h = new Ss({
          addClass: H,
          removeClass: V,
          hasClass: B,
          hasAnchor: () => !!A,
          notifyClose: () => {
            v || a(0, ($ = C)),
              $ || Ue(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            v || a(0, ($ = C)),
              $ || Ue(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            v || a(0, ($ = !0)),
              $ && Ue(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
          },
          isElementInContainer: (e) => p.contains(e),
          isRtl: () =>
            "rtl" === getComputedStyle(p).getPropertyValue("direction"),
          setTransformOrigin: (e) => {
            a(11, (L["transform-origin"] = e), L);
          },
          isFocused: () => document.activeElement === p,
          saveFocus: () => {
            var e;
            I =
              null !== (e = document.activeElement) && void 0 !== e
                ? e
                : void 0;
          },
          restoreFocus: () => {
            (!p || p.contains(document.activeElement)) &&
              I &&
              document.contains(I) &&
              "focus" in I &&
              I.focus();
          },
          getInnerDimensions: () => ({
            width: p.offsetWidth,
            height: p.offsetHeight,
          }),
          getAnchorDimensions: () => (A ? A.getBoundingClientRect() : null),
          getWindowDimensions: () => ({
            width: window.innerWidth,
            height: window.innerHeight,
          }),
          getBodyDimensions: () => ({
            width: document.body.clientWidth,
            height: document.body.clientHeight,
          }),
          getWindowScroll: () => ({
            x: window.pageXOffset,
            y: window.pageYOffset,
          }),
          setPosition: (e) => {
            a(11, (L.left = "left" in e ? `${e.left}px` : ""), L),
              a(11, (L.right = "right" in e ? `${e.right}px` : ""), L),
              a(11, (L.top = "top" in e ? `${e.top}px` : ""), L),
              a(11, (L.bottom = "bottom" in e ? `${e.bottom}px` : ""), L);
          },
          setMaxHeight: (e) => {
            a(11, (L["max-height"] = e), L);
          },
        }))
      );
      return (
        Ue(p, "SMUIMenuSurface:mount", {
          get open() {
            return $;
          },
          set open(e) {
            a(0, ($ = e));
          },
          closeProgrammatic: U,
        }),
        h.init(),
        () => {
          var e;
          const t = h.isHoistedElement;
          h.destroy(),
            t &&
              (null === (e = p.parentNode) || void 0 === e || e.removeChild(p));
        }
      );
    }),
      F(() => {
        var e;
        y &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(13, (s = f(n, i))),
          "use" in e && a(1, (b = e.use)),
          "class" in e && a(2, (g = e.class)),
          "style" in e && a(3, (T = e.style)),
          "static" in e && a(4, (C = e.static)),
          "anchor" in e && a(15, (y = e.anchor)),
          "fixed" in e && a(5, (S = e.fixed)),
          "open" in e && a(0, ($ = e.open)),
          "managed" in e && a(6, (v = e.managed)),
          "fullWidth" in e && a(7, (E = e.fullWidth)),
          "quickOpen" in e && a(16, (x = e.quickOpen)),
          "anchorElement" in e && a(14, (A = e.anchorElement)),
          "anchorCorner" in e && a(17, (D = e.anchorCorner)),
          "anchorMargin" in e && a(18, (N = e.anchorMargin)),
          "maxHeight" in e && a(19, (P = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            a(20, (_ = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && a(30, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
          p &&
          y &&
          !(null === a(27, (c = p.parentElement)) || void 0 === c
            ? void 0
            : c.classList.contains("mdc-menu-surface--anchor")) &&
          (null === a(28, (l = p.parentElement)) ||
            void 0 === l ||
            l.classList.add("mdc-menu-surface--anchor"),
          a(
            14,
            (A =
              null !== a(29, (d = p.parentElement)) && void 0 !== d
                ? d
                : void 0)
          )),
          513 & e.$$.dirty[0] &&
            h &&
            h.isOpen() !== $ &&
            ($ ? h.open() : h.close()),
          66048 & e.$$.dirty[0] && h && h.setQuickOpen(x),
          544 & e.$$.dirty[0] && h && h.setFixedPosition(S),
          524800 & e.$$.dirty[0] && h && h.setMaxHeight(P),
          1049088 & e.$$.dirty[0] &&
            h &&
            h.setIsHorizontallyCenteredOnViewport(_),
          131584 & e.$$.dirty[0] &&
            h &&
            null != D &&
            ("string" == typeof D
              ? h.setAnchorCorner(R[D])
              : h.setAnchorCorner(D)),
          262656 & e.$$.dirty[0] && h && h.setAnchorMargin(N);
      }),
      [
        $,
        b,
        g,
        T,
        C,
        S,
        v,
        E,
        p,
        h,
        O,
        L,
        u,
        s,
        A,
        y,
        x,
        D,
        N,
        P,
        _,
        function () {
          return $;
        },
        function (e) {
          a(0, ($ = e));
        },
        function (e, t) {
          return h.setAbsolutePosition(e, t);
        },
        function (e) {
          return h.setIsHoisted(e);
        },
        function () {
          return h.isFixed();
        },
        j,
        c,
        l,
        d,
        o,
        r,
        (e) => h && $ && !v && h.handleBodyClick(e),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e), a(8, p);
          });
        },
        (e) => h && h.handleKeydown(e),
      ]
    );
  }
  class Bs extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Fs,
          Ms,
          r,
          {
            use: 1,
            class: 2,
            style: 3,
            static: 4,
            anchor: 15,
            fixed: 5,
            open: 0,
            managed: 6,
            fullWidth: 7,
            quickOpen: 16,
            anchorElement: 14,
            anchorCorner: 17,
            anchorMargin: 18,
            maxHeight: 19,
            horizontallyCenteredOnViewport: 20,
            isOpen: 21,
            setOpen: 22,
            setAbsolutePosition: 23,
            setIsHoisted: 24,
            isFixed: 25,
            getElement: 26,
          },
          null,
          [-1, -1]
        );
    }
    get isOpen() {
      return this.$$.ctx[21];
    }
    get setOpen() {
      return this.$$.ctx[22];
    }
    get setAbsolutePosition() {
      return this.$$.ctx[23];
    }
    get setIsHoisted() {
      return this.$$.ctx[24];
    }
    get isFixed() {
      return this.$$.ctx[25];
    }
    get getElement() {
      return this.$$.ctx[26];
    }
  }
  function ws(
    e,
    {
      addClass: t = (t) => e.classList.add(t),
      removeClass: n = (t) => e.classList.remove(t),
    } = {}
  ) {
    return (
      t("mdc-menu-surface--anchor"),
      {
        destroy() {
          n("mdc-menu-surface--anchor");
        },
      }
    );
  }
  function Hs(e) {
    let t;
    const n = e[16].default,
      a = c(n, e, e[21], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 2097152 & i) &&
          u(a, n, e, e[21], t ? d(n, e[21], i, null) : p(e[21]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Vs(e) {
    let n, a, i;
    const s = [
      { use: e[5] },
      { class: Ve({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function r(t) {
      e[18](t);
    }
    let o = { $$slots: { default: [Hs] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = t(o, s[e]);
    return (
      void 0 !== e[0] && (o.open = e[0]),
      (n = new Bs({ props: o })),
      e[17](n),
      G.push(() => de(n, "open", r)),
      n.$on("SMUIMenuSurface:mount", e[7]),
      n.$on("SMUIList:mount", e[8]),
      n.$on("SMUIMenuSurface:opened", e[19]),
      n.$on("keydown", e[6]),
      n.$on("SMUIList:action", e[20]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            546 & t
              ? ce(s, [
                  32 & t && { use: e[5] },
                  2 & t && { class: Ve({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & t && le(e[9]),
                ])
              : {};
          2097152 & t && (i.$$scope = { dirty: t, ctx: e }),
            !a && 1 & t && ((a = !0), (i.open = e[0]), X(() => (a = !1))),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[17](null), me(n, t);
        },
      }
    );
  }
  function Us(e, n, a) {
    let i;
    const s = [
      "use",
      "class",
      "open",
      "isOpen",
      "setOpen",
      "setDefaultFocusState",
      "getSelectedIndex",
      "getElement",
    ];
    let r = f(n, s),
      { $$slots: o = {}, $$scope: c } = n;
    const { closest: l } = ve,
      d = ze(M());
    let u,
      p,
      h,
      I,
      { use: b = [] } = n,
      { class: g = "" } = n,
      { open: T = !1 } = n;
    function C() {
      return u.getElement();
    }
    k(
      () => (
        a(
          3,
          (p = new xs({
            addClassToElementAtIndex: (e, t) => {
              I.addClassForElementIndex(e, t);
            },
            removeClassFromElementAtIndex: (e, t) => {
              I.removeClassForElementIndex(e, t);
            },
            addAttributeToElementAtIndex: (e, t, n) => {
              I.setAttributeForElementIndex(e, t, n);
            },
            removeAttributeFromElementAtIndex: (e, t) => {
              I.removeAttributeForElementIndex(e, t);
            },
            getAttributeFromElementAtIndex: (e, t) =>
              I.getAttributeFromElementIndex(e, t),
            elementContainsClass: (e, t) => e.classList.contains(t),
            closeSurface: (e) => h.closeProgrammatic(e),
            getElementIndex: (e) =>
              I.getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              Ue(
                C(),
                "SMUIMenu:selected",
                { index: e.index, item: I.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => I.items.length,
            focusItemAtIndex: (e) => I.focusItemAtIndex(e),
            focusListRoot: () => "focus" in I.element && I.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!l(I.getOrderedList()[e].element, `.${$s.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = I.getOrderedList(),
                n = l(t[e].element, `.${$s.MENU_SELECTION_GROUP}`),
                a =
                  null == n
                    ? void 0
                    : n.querySelector(`.${$s.MENU_SELECTED_LIST_ITEM}`);
              return a ? t.map((e) => e.element).indexOf(a) : -1;
            },
          }))
        ),
        Ue(C(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(9, (r = f(n, s))),
          "use" in e && a(10, (b = e.use)),
          "class" in e && a(1, (g = e.class)),
          "open" in e && a(0, (T = e.open)),
          "$$scope" in e && a(21, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && a(5, (i = [d, ...b]));
      }),
      [
        T,
        g,
        u,
        p,
        I,
        i,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          h || (h = e.detail);
        },
        function (e) {
          I || a(4, (I = e.detail));
        },
        r,
        b,
        function () {
          return T;
        },
        function (e) {
          a(0, (T = e));
        },
        function (e) {
          p.setDefaultFocusState(e);
        },
        function () {
          return p.getSelectedIndex();
        },
        C,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (u = e), a(2, u);
          });
        },
        function (e) {
          (T = e), a(0, T);
        },
        () => p && p.handleMenuSurfaceOpened(),
        (e) =>
          p && p.handleItemAction(I.getOrderedList()[e.detail.index].element),
        c,
      ]
    );
  }
  class Gs extends he {
    constructor(e) {
      super(),
        fe(this, e, Us, Vs, r, {
          use: 10,
          class: 1,
          open: 0,
          isOpen: 11,
          setOpen: 12,
          setDefaultFocusState: 13,
          getSelectedIndex: 14,
          getElement: 15,
        });
    }
    get isOpen() {
      return this.$$.ctx[11];
    }
    get setOpen() {
      return this.$$.ctx[12];
    }
    get setDefaultFocusState() {
      return this.$$.ctx[13];
    }
    get getSelectedIndex() {
      return this.$$.ctx[14];
    }
    get getElement() {
      return this.$$.ctx[15];
    }
  }
  function js(t) {
    let n;
    return {
      c() {
        n = v(t[8]);
      },
      m(e, t) {
        T(e, n, t);
      },
      p(e, t) {
        256 & t && P(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function qs(e) {
    let t;
    const n = e[13].default,
      a = c(n, e, e[12], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 4096 & i) &&
          u(a, n, e, e[12], t ? d(n, e[12], i, null) : p(e[12]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function zs(e) {
    let n, a, r, o, c, l, d, u, p;
    const m = [qs, js],
      f = [];
    function h(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (a = h(e)), (r = f[a] = m[a](e));
    let I = [
        {
          class: (o = Ve({
            [e[1]]: !0,
            "mdc-select-helper-text": !0,
            "mdc-select-helper-text--validation-msg": e[4],
            "mdc-select-helper-text--validation-msg-persistent": e[3],
            ...e[6],
          })),
        },
        { "aria-hidden": (c = e[3] ? void 0 : "true") },
        { id: e[2] },
        e[7],
        e[10],
      ],
      g = {};
    for (let e = 0; e < I.length; e += 1) g = t(g, I[e]);
    return {
      c() {
        (n = S("div")), r.c(), N(n, g);
      },
      m(t, i) {
        T(t, n, i),
          f[a].m(n, null),
          e[14](n),
          (d = !0),
          u ||
            ((p = [b((l = We.call(null, n, e[0]))), b(e[9].call(null, n))]),
            (u = !0));
      },
      p(e, [t]) {
        let i = a;
        (a = h(e)),
          a === i
            ? f[a].p(e, t)
            : (ae(),
              re(f[i], 1, 1, () => {
                f[i] = null;
              }),
              ie(),
              (r = f[a]),
              r ? r.p(e, t) : ((r = f[a] = m[a](e)), r.c()),
              se(r, 1),
              r.m(n, null)),
          N(
            n,
            (g = ce(I, [
              (!d ||
                (90 & t &&
                  o !==
                    (o = Ve({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: o },
              (!d || (8 & t && c !== (c = e[3] ? void 0 : "true"))) && {
                "aria-hidden": c,
              },
              (!d || 4 & t) && { id: e[2] },
              128 & t && e[7],
              1024 & t && e[10],
            ]))
          ),
          l && s(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i(e) {
        d || (se(r), (d = !0));
      },
      o(e) {
        re(r), (d = !1);
      },
      d(t) {
        t && C(n), f[a].d(), e[14](null), (u = !1), i(p);
      },
    };
  }
  lt({ class: "mdc-menu__selection-group-icon", component: Gi });
  let Qs = 0;
  function Ws(e, n, a) {
    const i = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: r = {}, $$scope: o } = n;
    const c = ze(M());
    let l,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { id: I = "SMUI-select-helper-text-" + Qs++ } = n,
      { persistent: b = !1 } = n,
      { validationMsg: g = !1 } = n,
      T = {},
      C = {};
    function y(e) {
      return e in T ? T[e] : A().classList.contains(e);
    }
    function S(e) {
      T[e] || a(6, (T[e] = !0), T);
    }
    function $(e) {
      (e in T && !T[e]) || a(6, (T[e] = !1), T);
    }
    function v(e) {
      var t;
      return e in C
        ? null !== (t = C[e]) && void 0 !== t
          ? t
          : null
        : A().getAttribute(e);
    }
    function E(e, t) {
      C[e] !== t && a(7, (C[e] = t), C);
    }
    function x(e) {
      (e in C && null == C[e]) || a(7, (C[e] = void 0), C);
    }
    function A() {
      return l;
    }
    return (
      k(
        () => (
          (d = new Ls({
            addClass: S,
            removeClass: $,
            hasClass: y,
            getAttr: v,
            setAttr: E,
            removeAttr: x,
            setContent: (e) => {
              a(8, (u = e));
            },
          })),
          I.startsWith("SMUI-select-helper-text-") &&
            Ue(A(), "SMUISelectHelperText:id", I),
          Ue(A(), "SMUISelectHelperText:mount", d),
          d.init(),
          () => {
            Ue(A(), "SMUISelectHelperText:unmount", d), d.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(10, (s = f(n, i))),
          "use" in e && a(0, (p = e.use)),
          "class" in e && a(1, (h = e.class)),
          "id" in e && a(2, (I = e.id)),
          "persistent" in e && a(3, (b = e.persistent)),
          "validationMsg" in e && a(4, (g = e.validationMsg)),
          "$$scope" in e && a(12, (o = e.$$scope));
      }),
      [
        p,
        h,
        I,
        b,
        g,
        l,
        T,
        C,
        u,
        c,
        s,
        A,
        o,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(5, l);
          });
        },
      ]
    );
  }
  class Ks extends he {
    constructor(e) {
      super(),
        fe(this, e, Ws, zs, r, {
          use: 0,
          class: 1,
          id: 2,
          persistent: 3,
          validationMsg: 4,
          getElement: 11,
        });
    }
    get getElement() {
      return this.$$.ctx[11];
    }
  }
  const Xs = (e) => ({}),
    Ys = (e) => ({}),
    Zs = (e) => ({}),
    Js = (e) => ({}),
    er = (e) => ({}),
    tr = (e) => ({}),
    nr = (e) => ({}),
    ar = (e) => ({});
  function ir(e) {
    let n,
      a = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        Qe(e[53], "input$"),
      ],
      i = {};
    for (let e = 0; e < a.length; e += 1) i = t(i, a[e]);
    return {
      c() {
        (n = S("input")), N(n, i);
      },
      m(e, t) {
        T(e, n, t), n.autofocus && n.focus();
      },
      p(e, t) {
        N(
          n,
          (i = ce(a, [
            { type: "hidden" },
            1024 & t[0] && { required: e[10] },
            64 & t[0] && { disabled: e[6] },
            1 & t[0] && { value: e[0] },
            4194304 & t[1] && Qe(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && C(n);
      },
    };
  }
  function sr(e) {
    let t;
    return {
      c() {
        (t = S("span")), D(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        T(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function rr(e) {
    let n, a;
    const i = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Qe(e[53], "label$"),
    ];
    let s = { $$slots: { default: [or] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Yn({ props: s })),
      e[66](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (3072 & t[0]) | (4198400 & t[1])
              ? ce(i, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && le(Qe(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[66](null), me(n, t);
        },
      }
    );
  }
  function or(e) {
    let t,
      n,
      a = (null == e[9] ? "" : e[9]) + "";
    const i = e[63].label,
      s = c(i, e, e[89], ar);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        T(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, r) {
        (!n || 512 & r[0]) &&
          a !== (a = (null == e[9] ? "" : e[9]) + "") &&
          P(t, a),
          s &&
            s.p &&
            (!n || 134217728 & r[2]) &&
            u(s, i, e, e[89], n ? d(i, e[89], r, nr) : p(e[89]), ar);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        re(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function cr(e) {
    let n, a;
    const i = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      Qe(e[53], "outline$"),
    ];
    let s = { $$slots: { default: [ur] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ra({ props: s })),
      e[68](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (768 & t[0]) | (6291456 & t[1])
              ? ce(i, [
                  (768 & t[0]) | (2097152 & t[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & t[1] && le(Qe(e[53], "outline$")),
                ])
              : {};
          (3840 & t[0]) | (6296064 & t[1]) | (134217728 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[68](null), me(n, t);
        },
      }
    );
  }
  function lr(e) {
    let n, a;
    const i = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Qe(e[53], "label$"),
    ];
    let s = { $$slots: { default: [dr] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Yn({ props: s })),
      e[67](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            (3072 & t[0]) | (4198400 & t[1])
              ? ce(i, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && le(Qe(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[67](null), me(n, t);
        },
      }
    );
  }
  function dr(e) {
    let t,
      n,
      a = (null == e[9] ? "" : e[9]) + "";
    const i = e[63].label,
      s = c(i, e, e[89], tr);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        T(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, r) {
        (!n || 512 & r[0]) &&
          a !== (a = (null == e[9] ? "" : e[9]) + "") &&
          P(t, a),
          s &&
            s.p &&
            (!n || 134217728 & r[2]) &&
            u(s, i, e, e[89], n ? d(i, e[89], r, er) : p(e[89]), tr);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        re(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function ur(e) {
    let t,
      n,
      a = !e[8] && (null != e[9] || e[52].label) && lr(e);
    return {
      c() {
        a && a.c(), (t = x());
      },
      m(e, i) {
        a && a.m(e, i), T(e, t, i), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? a &&
            (ae(),
            re(a, 1, 1, () => {
              a = null;
            }),
            ie())
          : a
          ? (a.p(e, n), (768 & n[0]) | (2097152 & n[1]) && se(a, 1))
          : ((a = lr(e)), a.c(), se(a, 1), a.m(t.parentNode, t));
      },
      i(e) {
        n || (se(a), (n = !0));
      },
      o(e) {
        re(a), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t);
      },
    };
  }
  function pr(e) {
    let n, a;
    const i = [Qe(e[53], "ripple$")];
    let s = {};
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ta({ props: s })),
      e[70](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 4194304 & t[1] ? ce(i, [le(Qe(e[53], "ripple$"))]) : {};
          n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[70](null), me(n, t);
        },
      }
    );
  }
  function mr(e) {
    let t;
    const n = e[63].default,
      a = c(n, e, e[89], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 134217728 & i[2]) &&
          u(a, n, e, e[89], t ? d(n, e[89], i, null) : p(e[89]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function fr(e) {
    let n, a, i;
    const s = [{ role: "listbox" }, { wrapFocus: e[36] }, Qe(e[53], "list$")];
    function r(t) {
      e[76](t);
    }
    let o = { $$slots: { default: [mr] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = t(o, s[e]);
    return (
      void 0 !== e[24] && (o.selectedIndex = e[24]),
      (n = new Pi({ props: o })),
      G.push(() => de(n, "selectedIndex", r)),
      n.$on("SMUIList:mount", e[77]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            4194336 & t[1]
              ? ce(s, [
                  s[0],
                  32 & t[1] && { wrapFocus: e[36] },
                  4194304 & t[1] && le(Qe(e[53], "list$")),
                ])
              : {};
          134217728 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
            !a &&
              16777216 & t[0] &&
              ((a = !0), (i.selectedIndex = e[24]), X(() => (a = !1))),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function hr(e) {
    let n, a;
    const i = [Qe(e[53], "helperText$")];
    let s = { $$slots: { default: [Ir] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Ks({ props: s })),
      n.$on("SMUISelectHelperText:id", e[86]),
      n.$on("SMUISelectHelperText:mount", e[87]),
      n.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 4194304 & t[1] ? ce(i, [le(Qe(e[53], "helperText$"))]) : {};
          134217728 & t[2] && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function Ir(e) {
    let t;
    const n = e[63].helperText,
      a = c(n, e, e[89], Ys);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 134217728 & i[2]) &&
          u(a, n, e, e[89], t ? d(n, e[89], i, Xs) : p(e[89]), Ys);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function br(e) {
    let n,
      a,
      r,
      o,
      l,
      m,
      f,
      h,
      I,
      y,
      _,
      O,
      L,
      R,
      M,
      k,
      F,
      B,
      w,
      H,
      V,
      U,
      j,
      q,
      z,
      Q,
      W,
      K,
      Y,
      Z,
      J,
      ee,
      te,
      ne,
      oe,
      fe,
      he,
      Ie,
      be,
      ge,
      Te = e[12] && ir(e),
      Ce = "filled" === e[7] && sr(),
      ye =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && rr(e),
      Se = "outlined" === e[7] && cr(e);
    const $e = e[63].leadingIcon,
      ve = c($e, e, e[89], Js);
    let Ee = [
        { id: (_ = e[11] + "-smui-selected-text") },
        { class: (O = Ve({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (L = e[11] + "-smui-label") },
        Qe(e[53], "selectedText$"),
      ],
      xe = {};
    for (let e = 0; e < Ee.length; e += 1) xe = t(xe, Ee[e]);
    let Ae = [
        {
          class: (M = Ve({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        Qe(e[53], "selectedTextContainer$"),
      ],
      De = {};
    for (let e = 0; e < Ae.length; e += 1) De = t(De, Ae[e]);
    let Ne = [
        { class: (U = Ve({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        Qe(e[53], "dropdownIcon$"),
      ],
      Pe = {};
    for (let e = 0; e < Ne.length; e += 1) Pe = t(Pe, Ne[e]);
    let _e = "outlined" !== e[7] && e[5] && pr(e),
      Oe = [
        { class: (z = Ve({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (Q = e[10] ? "true" : void 0) },
        { "aria-disabled": (W = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        Qe(e[53], "anchor$"),
      ],
      Le = {};
    for (let e = 0; e < Oe.length; e += 1) Le = t(Le, Oe[e]);
    const Re = [
      { class: Ve({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      Qe(e[53], "menu$"),
    ];
    function Me(t) {
      e[78](t);
    }
    let ke = { $$slots: { default: [fr] }, $$scope: { ctx: e } };
    for (let e = 0; e < Re.length; e += 1) ke = t(ke, Re[e]);
    void 0 !== e[32] && (ke.open = e[32]),
      (Z = new Gs({ props: ke })),
      G.push(() => de(Z, "open", Me)),
      Z.$on("SMUIMenu:selected", e[79]),
      Z.$on("SMUIMenuSurface:closing", e[80]),
      Z.$on("SMUIMenuSurface:closed", e[81]),
      Z.$on("SMUIMenuSurface:opened", e[82]);
    let Fe = [
        {
          class: (ee = Ve({
            [e[3]]: !0,
            "mdc-select": !0,
            "mdc-select--required": e[10],
            "mdc-select--disabled": e[6],
            "mdc-select--filled": "filled" === e[7],
            "mdc-select--outlined": "outlined" === e[7],
            "smui-select--standard": "standard" === e[7],
            "mdc-select--with-leading-icon": e[45](e[13])
              ? e[52].leadingIcon
              : e[13],
            "mdc-select--no-label": e[8] || (null == e[9] && !e[52].label),
            "mdc-select--invalid": e[1],
            "mdc-select--activated": e[32],
            "mdc-data-table__pagination-rows-per-page-select":
              "data-table:pagination" === e[46],
            ...e[26],
          })),
        },
        {
          style: (te = Object.entries(e[27]).map(Tr).concat([e[4]]).join(" ")),
        },
        Ge(e[53], [
          "input$",
          "anchor$",
          "label$",
          "outline$",
          "selectedTextContainer$",
          "selectedText$",
          "dropdownIcon$",
          "ripple$",
          "menu$",
          "list$",
          "helperText$",
        ]),
      ],
      Be = {};
    for (let e = 0; e < Fe.length; e += 1) Be = t(Be, Fe[e]);
    let we = e[52].helperText && hr(e);
    return {
      c() {
        (n = S("div")),
          Te && Te.c(),
          (a = E()),
          (r = S("div")),
          Ce && Ce.c(),
          (o = E()),
          ye && ye.c(),
          (l = E()),
          Se && Se.c(),
          (m = E()),
          ve && ve.c(),
          (f = E()),
          (h = S("span")),
          (I = S("span")),
          (y = v(e[43])),
          (F = E()),
          (B = S("span")),
          (w = $("svg")),
          (H = $("polygon")),
          (V = $("polygon")),
          (q = E()),
          _e && _e.c(),
          (Y = E()),
          ue(Z.$$.fragment),
          (fe = E()),
          we && we.c(),
          (he = x()),
          N(I, xe),
          N(h, De),
          D(H, "class", "mdc-select__dropdown-icon-inactive"),
          D(H, "stroke", "none"),
          D(H, "fill-rule", "evenodd"),
          D(H, "points", "7 10 12 15 17 10"),
          D(V, "class", "mdc-select__dropdown-icon-active"),
          D(V, "stroke", "none"),
          D(V, "fill-rule", "evenodd"),
          D(V, "points", "7 15 12 10 17 15"),
          D(w, "class", "mdc-select__dropdown-icon-graphic"),
          D(w, "viewBox", "7 10 10 5"),
          D(w, "focusable", "false"),
          N(B, Pe),
          N(r, Le),
          N(n, Be);
      },
      m(t, i) {
        T(t, n, i),
          Te && Te.m(n, null),
          g(n, a),
          g(n, r),
          Ce && Ce.m(r, null),
          g(r, o),
          ye && ye.m(r, null),
          g(r, l),
          Se && Se.m(r, null),
          g(r, m),
          ve && ve.m(r, null),
          g(r, f),
          g(r, h),
          g(h, I),
          g(I, y),
          e[69](I),
          g(r, F),
          g(r, B),
          g(B, w),
          g(w, H),
          g(w, V),
          g(r, q),
          _e && _e.m(r, null),
          e[71](r),
          g(n, Y),
          pe(Z, n, null),
          e[83](n),
          T(t, fe, i),
          we && we.m(t, i),
          T(t, he, i),
          (Ie = !0),
          be ||
            ((ge = [
              b((R = We.call(null, I, e[18]))),
              b((k = We.call(null, h, e[16]))),
              b((j = We.call(null, B, e[20]))),
              b((K = We.call(null, r, e[14]))),
              A(r, "focus", e[72]),
              A(r, "blur", e[73]),
              A(r, "click", e[74]),
              A(r, "keydown", e[75]),
              A(r, "focus", e[64]),
              A(r, "blur", e[65]),
              b(
                (ne = jn.call(null, n, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              b(ws.call(null, n, { addClass: e[49], removeClass: e[50] })),
              b((oe = We.call(null, n, e[2]))),
              b(e[44].call(null, n)),
              A(n, "SMUISelectLeadingIcon:mount", e[84]),
              A(n, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            (be = !0));
      },
      p(e, t) {
        e[12]
          ? Te
            ? Te.p(e, t)
            : ((Te = ir(e)), Te.c(), Te.m(n, a))
          : Te && (Te.d(1), (Te = null)),
          "filled" === e[7]
            ? Ce || ((Ce = sr()), Ce.c(), Ce.m(r, o))
            : Ce && (Ce.d(1), (Ce = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? ye &&
              (ae(),
              re(ye, 1, 1, () => {
                ye = null;
              }),
              ie())
            : ye
            ? (ye.p(e, t), (896 & t[0]) | (2097152 & t[1]) && se(ye, 1))
            : ((ye = rr(e)), ye.c(), se(ye, 1), ye.m(r, l)),
          "outlined" === e[7]
            ? Se
              ? (Se.p(e, t), 128 & t[0] && se(Se, 1))
              : ((Se = cr(e)), Se.c(), se(Se, 1), Se.m(r, m))
            : Se &&
              (ae(),
              re(Se, 1, 1, () => {
                Se = null;
              }),
              ie()),
          ve &&
            ve.p &&
            (!Ie || 134217728 & t[2]) &&
            u(ve, $e, e, e[89], Ie ? d($e, e[89], t, Zs) : p(e[89]), Js),
          (!Ie || 4096 & t[1]) && P(y, e[43]),
          N(
            I,
            (xe = ce(Ee, [
              (!Ie ||
                (2048 & t[0] && _ !== (_ = e[11] + "-smui-selected-text"))) && {
                id: _,
              },
              (!Ie ||
                (524288 & t[0] &&
                  O !==
                    (O = Ve({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: O },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!Ie || (2048 & t[0] && L !== (L = e[11] + "-smui-label"))) && {
                "aria-labelledby": L,
              },
              4194304 & t[1] && Qe(e[53], "selectedText$"),
            ]))
          ),
          R && s(R.update) && 262144 & t[0] && R.update.call(null, e[18]),
          N(
            h,
            (De = ce(Ae, [
              (!Ie ||
                (131072 & t[0] &&
                  M !==
                    (M = Ve({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: M },
              4194304 & t[1] && Qe(e[53], "selectedTextContainer$"),
            ]))
          ),
          k && s(k.update) && 65536 & t[0] && k.update.call(null, e[16]),
          N(
            B,
            (Pe = ce(Ne, [
              (!Ie ||
                (2097152 & t[0] &&
                  U !==
                    (U = Ve({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: U },
              4194304 & t[1] && Qe(e[53], "dropdownIcon$"),
            ]))
          ),
          j && s(j.update) && 1048576 & t[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? _e
              ? (_e.p(e, t), 160 & t[0] && se(_e, 1))
              : ((_e = pr(e)), _e.c(), se(_e, 1), _e.m(r, null))
            : _e &&
              (ae(),
              re(_e, 1, 1, () => {
                _e = null;
              }),
              ie()),
          N(
            r,
            (Le = ce(Oe, [
              (!Ie ||
                (32768 & t[0] &&
                  z !==
                    (z = Ve({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: z,
              },
              (!Ie || (1024 & t[0] && Q !== (Q = e[10] ? "true" : void 0))) && {
                "aria-required": Q,
              },
              (!Ie || (64 & t[0] && W !== (W = e[6] ? "true" : void 0))) && {
                "aria-disabled": W,
              },
              (!Ie || 1 & t[1]) && { "aria-controls": e[31] },
              (!Ie || 1 & t[1]) && { "aria-describedby": e[31] },
              536870912 & t[0] && e[29],
              4194304 & t[1] && Qe(e[53], "anchor$"),
            ]))
          ),
          K && s(K.update) && 16384 & t[0] && K.update.call(null, e[14]);
        const i =
          (4194304 & t[0]) | (4194332 & t[1])
            ? ce(Re, [
                (4194304 & t[0]) | (4 & t[1]) && {
                  class: Ve({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Re[1],
                Re[2],
                8 & t[1] && { anchorElement: e[34] },
                16 & t[1] && { anchorCorner: e[35] },
                4194304 & t[1] && le(Qe(e[53], "menu$")),
              ])
            : {};
        (16777216 & t[0]) | (4194400 & t[1]) | (134217728 & t[2]) &&
          (i.$$scope = { dirty: t, ctx: e }),
          !J && 2 & t[1] && ((J = !0), (i.open = e[32]), X(() => (J = !1))),
          Z.$set(i),
          N(
            n,
            (Be = ce(Fe, [
              (!Ie ||
                ((67119050 & t[0]) | (2097154 & t[1]) &&
                  ee !==
                    (ee = Ve({
                      [e[3]]: !0,
                      "mdc-select": !0,
                      "mdc-select--required": e[10],
                      "mdc-select--disabled": e[6],
                      "mdc-select--filled": "filled" === e[7],
                      "mdc-select--outlined": "outlined" === e[7],
                      "smui-select--standard": "standard" === e[7],
                      "mdc-select--with-leading-icon": e[45](e[13])
                        ? e[52].leadingIcon
                        : e[13],
                      "mdc-select--no-label":
                        e[8] || (null == e[9] && !e[52].label),
                      "mdc-select--invalid": e[1],
                      "mdc-select--activated": e[32],
                      "mdc-data-table__pagination-rows-per-page-select":
                        "data-table:pagination" === e[46],
                      ...e[26],
                    })))) && { class: ee },
              (!Ie ||
                (134217744 & t[0] &&
                  te !==
                    (te = Object.entries(e[27])
                      .map(Tr)
                      .concat([e[4]])
                      .join(" ")))) && { style: te },
              4194304 & t[1] &&
                Ge(e[53], [
                  "input$",
                  "anchor$",
                  "label$",
                  "outline$",
                  "selectedTextContainer$",
                  "selectedText$",
                  "dropdownIcon$",
                  "ripple$",
                  "menu$",
                  "list$",
                  "helperText$",
                ]),
            ]))
          ),
          ne &&
            s(ne.update) &&
            128 & t[0] &&
            ne.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          oe && s(oe.update) && 4 & t[0] && oe.update.call(null, e[2]),
          e[52].helperText
            ? we
              ? (we.p(e, t), 2097152 & t[1] && se(we, 1))
              : ((we = hr(e)), we.c(), se(we, 1), we.m(he.parentNode, he))
            : we &&
              (ae(),
              re(we, 1, 1, () => {
                we = null;
              }),
              ie());
      },
      i(e) {
        Ie ||
          (se(ye),
          se(Se),
          se(ve, e),
          se(_e),
          se(Z.$$.fragment, e),
          se(we),
          (Ie = !0));
      },
      o(e) {
        re(ye),
          re(Se),
          re(ve, e),
          re(_e),
          re(Z.$$.fragment, e),
          re(we),
          (Ie = !1);
      },
      d(t) {
        t && C(n),
          Te && Te.d(),
          Ce && Ce.d(),
          ye && ye.d(),
          Se && Se.d(),
          ve && ve.d(t),
          e[69](null),
          _e && _e.d(),
          e[71](null),
          me(Z),
          e[83](null),
          t && C(fe),
          we && we.d(t),
          t && C(he),
          (be = !1),
          i(ge);
      },
    };
  }
  let gr = 0;
  const Tr = ([e, t]) => `${e}: ${t};`;
  function Cr(e, n, a) {
    const i = [
      "use",
      "class",
      "style",
      "ripple",
      "disabled",
      "variant",
      "noLabel",
      "label",
      "value",
      "key",
      "dirty",
      "invalid",
      "updateInvalid",
      "required",
      "inputId",
      "hiddenInput",
      "withLeadingIcon",
      "anchor$use",
      "anchor$class",
      "selectedTextContainer$use",
      "selectedTextContainer$class",
      "selectedText$use",
      "selectedText$class",
      "dropdownIcon$use",
      "dropdownIcon$class",
      "menu$class",
      "getUseDefaultValidation",
      "setUseDefaultValidation",
      "focus",
      "layout",
      "getElement",
    ];
    let s,
      r,
      c = f(n, i),
      { $$slots: l = {}, $$scope: d } = n;
    const u = h(l),
      p = ze(M());
    let b = () => {};
    function g(e) {
      return e === b;
    }
    let { use: T = [] } = n,
      { class: C = "" } = n,
      { style: y = "" } = n,
      { ripple: S = !0 } = n,
      { disabled: $ = !1 } = n,
      { variant: v = "standard" } = n,
      { noLabel: E = !1 } = n,
      { label: x } = n,
      { value: A = "" } = n,
      { key: D = (e) => e } = n,
      { dirty: N = !1 } = n,
      { invalid: P = b } = n,
      { updateInvalid: _ = g(P) } = n;
    const O = g(P);
    g(P) && (P = !1);
    let L,
      R,
      B,
      U,
      j,
      q,
      z,
      Q,
      W,
      K,
      X,
      Y,
      Z,
      J,
      { required: ee = !1 } = n,
      { inputId: te = "SMUI-select-" + gr++ } = n,
      { hiddenInput: ne = !1 } = n,
      { withLeadingIcon: ae = b } = n,
      { anchor$use: ie = [] } = n,
      { anchor$class: se = "" } = n,
      { selectedTextContainer$use: re = [] } = n,
      { selectedTextContainer$class: oe = "" } = n,
      { selectedText$use: ce = [] } = n,
      { selectedText$class: le = "" } = n,
      { dropdownIcon$use: de = [] } = n,
      { dropdownIcon$class: ue = "" } = n,
      { menu$class: pe = "" } = n,
      me = {},
      fe = {},
      he = {},
      Ie = -1,
      be = H("SMUI:addLayoutListener"),
      ge = !1,
      Te = {},
      Ce = !1,
      ye = H("SMUI:select:context");
    w("SMUI:list:role", ""), w("SMUI:list:nav", !1);
    const Se = He("");
    o(e, Se, (e) => a(43, (s = e))), w("SMUI:select:selectedText", Se);
    const $e = He(A);
    o(e, $e, (e) => a(91, (r = e))), w("SMUI:select:value", $e);
    let ve = Ie;
    function Ee(e) {
      return e in me ? me[e] : ke().classList.contains(e);
    }
    function xe(e) {
      me[e] || a(26, (me[e] = !0), me);
    }
    function Ae(e) {
      (e in me && !me[e]) || a(26, (me[e] = !1), me);
    }
    function De(e) {
      Te[e] || a(33, (Te[e] = !0), Te);
    }
    function Ne(e) {
      (e in Te && !Te[e]) || a(33, (Te[e] = !1), Te);
    }
    function Pe(e) {
      var t;
      return e in he
        ? null !== (t = he[e]) && void 0 !== t
          ? t
          : null
        : ke().getAttribute(e);
    }
    function _e(e, t) {
      he[e] !== t && a(29, (he[e] = t), he);
    }
    function Oe(e) {
      (e in he && null == he[e]) || a(29, (he[e] = void 0), he);
    }
    function Le() {
      return W.getOrderedList().map((e) => e.getValue());
    }
    function Re(e) {
      R.setUseDefaultValidation(e);
    }
    function Me() {
      R.layout();
    }
    function ke() {
      return L;
    }
    be && (q = be(Me)),
      k(
        () => (
          a(
            23,
            (R = new Ps(
              {
                setSelectedText: (e) => {
                  I(Se, (s = e), s);
                },
                isSelectAnchorFocused: () => document.activeElement === B,
                getSelectAnchorAttr: Pe,
                setSelectAnchorAttr: _e,
                removeSelectAnchorAttr: Oe,
                addMenuClass: De,
                removeMenuClass: Ne,
                openMenu: () => {
                  a(32, (ge = !0));
                },
                closeMenu: () => {
                  a(32, (ge = !1));
                },
                getAnchorElement: () => B,
                setMenuAnchorElement: (e) => {
                  a(34, (z = e));
                },
                setMenuAnchorCorner: (e) => {
                  a(35, (Q = e));
                },
                setMenuWrapFocus: (e) => {
                  a(36, (Ce = e));
                },
                getSelectedIndex: () => Ie,
                setSelectedIndex: (e) => {
                  a(62, (ve = e)), a(24, (Ie = e)), a(0, (A = Le()[Ie]));
                },
                focusMenuItemAtIndex: (e) => {
                  W.focusItemAtIndex(e);
                },
                getMenuItemCount: () => W.items.length,
                getMenuItemValues: () => Le().map(D),
                getMenuItemTextAtIndex: (e) => W.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => W.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => W.typeaheadMatchItem(e, t),
                addClass: xe,
                removeClass: Ae,
                hasClass: Ee,
                setRippleCenter: (e) => Z && Z.setRippleCenter(e),
                activateBottomLine: () => Z && Z.activate(),
                deactivateBottomLine: () => Z && Z.deactivate(),
                notifyChange: (e) => {
                  a(54, (N = !0)),
                    _ && a(1, (P = !R.isValid())),
                    Ue(
                      ke(),
                      "SMUISelect:change",
                      { value: A, index: Ie },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!J,
                notchOutline: (e) => J && J.notch(e),
                closeOutline: () => J && J.closeNotch(),
                hasLabel: () => !!Y,
                floatLabel: (e) => Y && Y.float(e),
                getLabelWidth: () => (Y ? Y.getWidth() : 0),
                setLabelRequired: (e) => Y && Y.setRequired(e),
              },
              {
                get helperText() {
                  return X;
                },
                get leadingIcon() {
                  return K;
                },
              }
            ))
          ),
          a(24, (Ie = Le().indexOf(A))),
          R.init(),
          Re(O),
          () => {
            R.destroy();
          }
        )
      ),
      F(() => {
        q && q();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(53, (c = f(n, i))),
          "use" in e && a(2, (T = e.use)),
          "class" in e && a(3, (C = e.class)),
          "style" in e && a(4, (y = e.style)),
          "ripple" in e && a(5, (S = e.ripple)),
          "disabled" in e && a(6, ($ = e.disabled)),
          "variant" in e && a(7, (v = e.variant)),
          "noLabel" in e && a(8, (E = e.noLabel)),
          "label" in e && a(9, (x = e.label)),
          "value" in e && a(0, (A = e.value)),
          "key" in e && a(55, (D = e.key)),
          "dirty" in e && a(54, (N = e.dirty)),
          "invalid" in e && a(1, (P = e.invalid)),
          "updateInvalid" in e && a(56, (_ = e.updateInvalid)),
          "required" in e && a(10, (ee = e.required)),
          "inputId" in e && a(11, (te = e.inputId)),
          "hiddenInput" in e && a(12, (ne = e.hiddenInput)),
          "withLeadingIcon" in e && a(13, (ae = e.withLeadingIcon)),
          "anchor$use" in e && a(14, (ie = e.anchor$use)),
          "anchor$class" in e && a(15, (se = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            a(16, (re = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            a(17, (oe = e.selectedTextContainer$class)),
          "selectedText$use" in e && a(18, (ce = e.selectedText$use)),
          "selectedText$class" in e && a(19, (le = e.selectedText$class)),
          "dropdownIcon$use" in e && a(20, (de = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && a(21, (ue = e.dropdownIcon$class)),
          "menu$class" in e && a(22, (pe = e.menu$class)),
          "$$scope" in e && a(89, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && ve !== Ie)
          if ((a(62, (ve = Ie)), R)) R.setSelectedIndex(Ie, !1, !0);
          else {
            const e = Le();
            A !== e[Ie] && a(0, (A = e[Ie]));
          }
        1 & e.$$.dirty[0] && I($e, (r = A), r),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            R &&
            R.getValue() !== D(A) &&
            R.setValue(D(A)),
          8388672 & e.$$.dirty[0] &&
            R &&
            R.getDisabled() !== $ &&
            R.setDisabled($),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            R &&
            N &&
            R.isValid() !== !P &&
            (_ ? a(1, (P = !R.isValid())) : R.setValid(!P)),
          8389632 & e.$$.dirty[0] &&
            R &&
            R.getRequired() !== ee &&
            R.setRequired(ee);
      }),
      [
        A,
        P,
        T,
        C,
        y,
        S,
        $,
        v,
        E,
        x,
        ee,
        te,
        ne,
        ae,
        ie,
        se,
        re,
        oe,
        ce,
        le,
        de,
        ue,
        pe,
        R,
        Ie,
        L,
        me,
        fe,
        B,
        he,
        U,
        j,
        ge,
        Te,
        z,
        Q,
        Ce,
        W,
        K,
        X,
        Y,
        Z,
        J,
        s,
        p,
        g,
        ye,
        Se,
        $e,
        xe,
        Ae,
        function (e, t) {
          fe[e] != t &&
            ("" === t || null == t
              ? (delete fe[e], a(27, fe))
              : a(27, (fe[e] = t), fe));
        },
        u,
        c,
        N,
        D,
        _,
        function () {
          return R.getUseDefaultValidation();
        },
        Re,
        function () {
          B.focus();
        },
        Me,
        ke,
        ve,
        l,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (Y = e), a(40, Y);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (Y = e), a(40, Y);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (J = e), a(42, J);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (U = e), a(30, U);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (Z = e), a(41, Z);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (B = e), a(28, B);
          });
        },
        () => R && R.handleFocus(),
        () => R && R.handleBlur(),
        (e) => {
          B.focus(),
            R &&
              R.handleClick(
                (function (e) {
                  const t = e.currentTarget.getBoundingClientRect();
                  return (
                    ((function (e) {
                      return "touches" in e;
                    })(e)
                      ? e.touches[0].clientX
                      : e.clientX) - t.left
                  );
                })(e)
              );
        },
        (e) => R && R.handleKeydown(e),
        function (e) {
          (Ie = e), a(24, Ie);
        },
        (e) => a(37, (W = e.detail)),
        function (e) {
          (ge = e), a(32, ge);
        },
        (e) => R && R.handleMenuItemAction(e.detail.index),
        () => R && R.handleMenuClosing(),
        () => R && R.handleMenuClosed(),
        () => R && R.handleMenuOpened(),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (L = e), a(25, L);
          });
        },
        (e) => a(38, (K = e.detail)),
        () => a(38, (K = void 0)),
        (e) => a(31, (j = e.detail)),
        (e) => a(39, (X = e.detail)),
        () => {
          a(31, (j = void 0)), a(39, (X = void 0));
        },
        d,
      ]
    );
  }
  class yr extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Cr,
          br,
          r,
          {
            use: 2,
            class: 3,
            style: 4,
            ripple: 5,
            disabled: 6,
            variant: 7,
            noLabel: 8,
            label: 9,
            value: 0,
            key: 55,
            dirty: 54,
            invalid: 1,
            updateInvalid: 56,
            required: 10,
            inputId: 11,
            hiddenInput: 12,
            withLeadingIcon: 13,
            anchor$use: 14,
            anchor$class: 15,
            selectedTextContainer$use: 16,
            selectedTextContainer$class: 17,
            selectedText$use: 18,
            selectedText$class: 19,
            dropdownIcon$use: 20,
            dropdownIcon$class: 21,
            menu$class: 22,
            getUseDefaultValidation: 57,
            setUseDefaultValidation: 58,
            focus: 59,
            layout: 60,
            getElement: 61,
          },
          null,
          [-1, -1, -1, -1]
        );
    }
    get getUseDefaultValidation() {
      return this.$$.ctx[57];
    }
    get setUseDefaultValidation() {
      return this.$$.ctx[58];
    }
    get focus() {
      return this.$$.ctx[59];
    }
    get layout() {
      return this.$$.ctx[60];
    }
    get getElement() {
      return this.$$.ctx[61];
    }
  }
  function Sr(e) {
    let t;
    const n = e[11].default,
      a = c(n, e, e[13], null);
    return {
      c() {
        a && a.c();
      },
      m(e, n) {
        a && a.m(e, n), (t = !0);
      },
      p(e, i) {
        a &&
          a.p &&
          (!t || 8192 & i) &&
          u(a, n, e, e[13], t ? d(n, e[13], i, null) : p(e[13]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        re(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function $r(e) {
    let n, a;
    const i = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let s = { $$slots: { default: [Sr] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Ui({ props: s })),
      e[12](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            77 & t
              ? ce(i, [
                  8 & t && { use: e[3] },
                  1 & t && { "data-value": e[0] },
                  1 & t && { value: e[0] },
                  4 & t && { selected: e[2] },
                  64 & t && le(e[6]),
                ])
              : {};
          8192 & t && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[12](null), me(n, t);
        },
      }
    );
  }
  function vr(e, n, a) {
    let i, s;
    const r = ["use", "class", "value", "getElement"];
    let c,
      l,
      d = f(n, r),
      { $$slots: u = {}, $$scope: p } = n;
    const h = ze(M());
    let { use: b = [] } = n;
    let g,
      { value: T = "" } = n;
    const C = H("SMUI:select:selectedText");
    o(e, C, (e) => a(14, (c = e)));
    const y = H("SMUI:select:value");
    function S() {
      s && g && I(C, (c = g.getPrimaryText()), c);
    }
    return (
      o(e, y, (e) => a(10, (l = e))),
      w("SMUI:list:item:role", "option"),
      k(S),
      F(S),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(6, (d = f(n, r))),
          "use" in e && a(7, (b = e.use)),
          "value" in e && a(0, (T = e.value)),
          "$$scope" in e && a(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && a(3, (i = [h, ...b])),
          1025 & e.$$.dirty && a(2, (s = null != T && "" !== T && l === T));
      }),
      [
        T,
        g,
        s,
        i,
        C,
        y,
        d,
        b,
        "",
        function () {
          return g.getElement();
        },
        l,
        u,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (g = e), a(1, g);
          });
        },
        p,
      ]
    );
  }
  const Er = class extends he {
    constructor(e) {
      super(),
        fe(this, e, vr, $r, r, { use: 7, class: 8, value: 0, getElement: 9 });
    }
    get class() {
      return this.$$.ctx[8];
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  };
  function xr(e, t, n) {
    const a = e.slice();
    return (a[17] = t[n]), a;
  }
  function Ar(e, t, n) {
    const a = e.slice();
    return (a[17] = t[n]), a;
  }
  function Dr(e) {
    let t, n;
    return (
      (t = new hs({
        props: { $$slots: { label: [Lr], default: [Or] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          4194308 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Nr(e) {
    let t, n;
    return (
      (t = new hs({
        props: { $$slots: { default: [Fr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          4194316 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Pr(e) {
    let t, n;
    return (
      (t = new hs({
        props: { $$slots: { default: [Br] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          4194316 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function _r(e) {
    let t, n;
    return (
      (t = new hs({
        props: { $$slots: { default: [wr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          4194316 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Or(e) {
    let t, n, a;
    function i(t) {
      e[14](t);
    }
    let s = { indeterminate: null === e[2] };
    return (
      void 0 !== e[2] && (s.checked = e[2]),
      (t = new rs({ props: s })),
      G.push(() => de(t, "checked", i)),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), (a = !0);
        },
        p(e, a) {
          const i = {};
          4 & a && (i.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (i.checked = e[2]), X(() => (n = !1))),
            t.$set(i);
        },
        i(e) {
          a || (se(t.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Lr(t) {
    let n;
    return {
      c() {
        (n = S("span")), (n.textContent = `${t[5]}`), D(n, "slot", "label");
      },
      m(e, t) {
        T(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function Rr(t) {
    let n,
      a = t[17].name + "";
    return {
      c() {
        n = v(a);
      },
      m(e, t) {
        T(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function Mr(e) {
    let t, n;
    return (
      (t = new Er({
        props: {
          value: e[17].id,
          $$slots: { default: [Rr] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          4194304 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function kr(e) {
    let t,
      n,
      a = e[6],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Mr(Ar(e, a, t));
    const s = (e) =>
      re(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = x();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        T(e, t, a), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let r;
          for (a = e[6], r = 0; r < a.length; r += 1) {
            const s = Ar(e, a, r);
            i[r]
              ? (i[r].p(s, n), se(i[r], 1))
              : ((i[r] = Mr(s)),
                i[r].c(),
                se(i[r], 1),
                i[r].m(t.parentNode, t));
          }
          for (ae(), r = a.length; r < i.length; r += 1) s(r);
          ie();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < a.length; e += 1) se(i[e]);
          n = !0;
        }
      },
      o(e) {
        i = i.filter(Boolean);
        for (let e = 0; e < i.length; e += 1) re(i[e]);
        n = !1;
      },
      d(e) {
        y(i, e), e && C(t);
      },
    };
  }
  function Fr(e) {
    let t, n, a, i, s, r;
    function o(t) {
      e[12](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[13](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new rs({ props: c })),
      G.push(() => de(t, "checked", o));
    let d = { label: e[5], $$slots: { default: [kr] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new yr({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), T(e, a, n), pe(i, e, n), (r = !0);
        },
        p(e, a) {
          const r = {};
          4 & a && (r.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (r.checked = e[2]), X(() => (n = !1))),
            t.$set(r);
          const o = {};
          4194304 & a && (o.$$scope = { dirty: a, ctx: e }),
            !s && 8 & a && ((s = !0), (o.value = e[3]), X(() => (s = !1))),
            i.$set(o);
        },
        i(e) {
          r || (se(t.$$.fragment, e), se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          re(t.$$.fragment, e), re(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function Br(e) {
    let t, n, a, i, s, r;
    function o(t) {
      e[10](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[11](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new rs({ props: c })),
      G.push(() => de(t, "checked", o));
    let d = { label: e[5], type: "number" };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new mi({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), T(e, a, n), pe(i, e, n), (r = !0);
        },
        p(e, a) {
          const r = {};
          4 & a && (r.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (r.checked = e[2]), X(() => (n = !1))),
            t.$set(r);
          const o = {};
          !s && 8 & a && ((s = !0), (o.value = e[3]), X(() => (s = !1))),
            i.$set(o);
        },
        i(e) {
          r || (se(t.$$.fragment, e), se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          re(t.$$.fragment, e), re(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function wr(e) {
    let t, n, a, i, s, r;
    function o(t) {
      e[8](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[9](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new rs({ props: c })),
      G.push(() => de(t, "checked", o));
    let d = { label: e[5] };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new mi({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), T(e, a, n), pe(i, e, n), (r = !0);
        },
        p(e, a) {
          const r = {};
          4 & a && (r.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (r.checked = e[2]), X(() => (n = !1))),
            t.$set(r);
          const o = {};
          !s && 8 & a && ((s = !0), (o.value = e[3]), X(() => (s = !1))),
            i.$set(o);
        },
        i(e) {
          r || (se(t.$$.fragment, e), se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          re(t.$$.fragment, e), re(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function Hr(e) {
    let t,
      n,
      a,
      i,
      s,
      r,
      o = e[1] && Vr(e);
    return {
      c() {
        (t = S("div")),
          (t.textContent = "▶"),
          (n = E()),
          o && o.c(),
          (a = x()),
          D(t, "class", "arrow svelte-6wwn9g"),
          O(t, "arrowDown", e[4]);
      },
      m(c, l) {
        T(c, t, l),
          T(c, n, l),
          o && o.m(c, l),
          T(c, a, l),
          (i = !0),
          s || ((r = A(t, "click", e[7])), (s = !0));
      },
      p(e, n) {
        16 & n && O(t, "arrowDown", e[4]),
          e[1]
            ? o
              ? (o.p(e, n), 2 & n && se(o, 1))
              : ((o = Vr(e)), o.c(), se(o, 1), o.m(a.parentNode, a))
            : o &&
              (ae(),
              re(o, 1, 1, () => {
                o = null;
              }),
              ie());
      },
      i(e) {
        i || (se(o), (i = !0));
      },
      o(e) {
        re(o), (i = !1);
      },
      d(e) {
        e && C(t), e && C(n), o && o.d(e), e && C(a), (s = !1), r();
      },
    };
  }
  function Vr(e) {
    let t,
      n,
      a = e[6],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Ur(xr(e, a, t));
    const s = (e) =>
      re(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = x();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        T(e, t, a), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let r;
          for (a = e[6], r = 0; r < a.length; r += 1) {
            const s = xr(e, a, r);
            i[r]
              ? (i[r].p(s, n), se(i[r], 1))
              : ((i[r] = Ur(s)),
                i[r].c(),
                se(i[r], 1),
                i[r].m(t.parentNode, t));
          }
          for (ae(), r = a.length; r < i.length; r += 1) s(r);
          ie();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < a.length; e += 1) se(i[e]);
          n = !0;
        }
      },
      o(e) {
        i = i.filter(Boolean);
        for (let e = 0; e < i.length; e += 1) re(i[e]);
        n = !1;
      },
      d(e) {
        y(i, e), e && C(t);
      },
    };
  }
  function Ur(t) {
    let n, a;
    return (
      (n = new zr({ props: { tree: t[17] } })),
      n.$on("change", t[15]),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p: e,
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function Gr(e) {
    let t, n, a, i, s, r;
    const o = [_r, Pr, Nr, Dr],
      c = [];
    function l(e, t) {
      return "TextField" === e[0].type
        ? 0
        : "IntegerField" === e[0].type
        ? 1
        : "EnumField" === e[0].type
        ? 2
        : 3;
    }
    (a = l(e)), (i = c[a] = o[a](e));
    let d = e[6].length > 0 && "EnumField" !== e[0].type && Hr(e);
    return {
      c() {
        (t = S("ul")),
          (n = S("li")),
          i.c(),
          (s = E()),
          d && d.c(),
          D(t, "class", "svelte-6wwn9g");
      },
      m(e, i) {
        T(e, t, i),
          g(t, n),
          c[a].m(n, null),
          g(n, s),
          d && d.m(n, null),
          (r = !0);
      },
      p(e, [t]) {
        let r = a;
        (a = l(e)),
          a === r
            ? c[a].p(e, t)
            : (ae(),
              re(c[r], 1, 1, () => {
                c[r] = null;
              }),
              ie(),
              (i = c[a]),
              i ? i.p(e, t) : ((i = c[a] = o[a](e)), i.c()),
              se(i, 1),
              i.m(n, s)),
          e[6].length > 0 && "EnumField" !== e[0].type
            ? d
              ? (d.p(e, t), 1 & t && se(d, 1))
              : ((d = Hr(e)), d.c(), se(d, 1), d.m(n, null))
            : d &&
              (ae(),
              re(d, 1, 1, () => {
                d = null;
              }),
              ie());
      },
      i(e) {
        r || (se(i), se(d), (r = !0));
      },
      o(e) {
        re(i), re(d), (r = !1);
      },
      d(e) {
        e && C(t), c[a].d(), d && d.d();
      },
    };
  }
  const jr = {};
  function qr(e, t, n) {
    let a,
      { tree: i } = t;
    const { name: s, children: r } = i;
    let o = jr[s] || !1;
    let c = void 0 !== i.selected && i.selected;
    const l = B();
    let d = null;
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (i = e.tree));
      }),
      (e.$$.update = () => {
        2 & e.$$.dirty && n(4, (a = o)),
          5 & e.$$.dirty &&
            (console.log("checked:", c),
            n(0, (i.selected = c), i),
            l("change", { tree: i })),
          8 & e.$$.dirty && n(0, (i.value = d), i);
      }),
      [
        i,
        o,
        c,
        d,
        a,
        s,
        r,
        () => {
          n(1, (o = jr[s] = !o));
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (d = e), n(3, d);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (d = e), n(3, d);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (e) {
          (d = e), n(3, d);
        },
        function (e) {
          (c = e), n(2, c);
        },
        function (t) {
          V.call(this, e, t);
        },
      ]
    );
  }
  class zr extends he {
    constructor(e) {
      super(), fe(this, e, qr, Gr, r, { tree: 0 });
    }
  }
  function Qr(e, t, n) {
    const a = e.slice();
    return (a[3] = t[n]), a;
  }
  function Wr(e) {
    let t, n;
    return (
      (t = new zr({ props: { tree: e[3] } })),
      t.$on("change", e[1]),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          1 & n && (a.tree = e[3]), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Kr(e) {
    let t,
      n,
      a = e[0],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Wr(Qr(e, a, t));
    const s = (e) =>
      re(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        t = S("main");
        for (let e = 0; e < i.length; e += 1) i[e].c();
      },
      m(e, a) {
        T(e, t, a);
        for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let r;
          for (a = e[0], r = 0; r < a.length; r += 1) {
            const s = Qr(e, a, r);
            i[r]
              ? (i[r].p(s, n), se(i[r], 1))
              : ((i[r] = Wr(s)), i[r].c(), se(i[r], 1), i[r].m(t, null));
          }
          for (ae(), r = a.length; r < i.length; r += 1) s(r);
          ie();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < a.length; e += 1) se(i[e]);
          n = !0;
        }
      },
      o(e) {
        i = i.filter(Boolean);
        for (let e = 0; e < i.length; e += 1) re(i[e]);
        n = !1;
      },
      d(e) {
        e && C(t), y(i, e);
      },
    };
  }
  function Xr(e) {
    const t = e.children.flatMap(Xr);
    return e.selected && t.push(e), t;
  }
  function Yr(e, t, n) {
    let { trees: a } = t;
    const i = B();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (a = e.trees));
      }),
      [
        a,
        function () {
          const e = a.flatMap(Xr);
          i("change", { filterTags: e });
        },
      ]
    );
  }
  class Zr extends he {
    constructor(e) {
      super(), fe(this, e, Yr, Kr, r, { trees: 0 });
    }
  }
  var Jr;
  !(function (e) {
    (e.Term = "Term"),
      (e.IntegerField = "IntegerField"),
      (e.TextField = "TextField");
  })(Jr || (Jr = {}));
  const eo = {
      id: "b0126ab6-7c6d-9770-3a84-b312fe381fdb",
      name: "Taxonomy",
      type: "Taxonomy",
      children: [
        {
          id: "273c57b2-f06a-3ea9-6d40-cfc3d4d76bf9",
          name: "Digital Phenotyping",
          type: "Vocabulary",
          children: [
            {
              id: "26f6428a-b724-e601-0f4e-d636111948e2",
              name: "Data Type",
              type: "Term",
              children: [
                {
                  id: "d79c3938-643c-715a-fe0a-1912e42a653e",
                  name: "Face/Video Recording",
                  type: "Term",
                  children: [
                    {
                      id: "36424611-3d48-264e-0f14-b6703a34dae6",
                      name: "Video",
                      type: "EnumField",
                      children: [
                        {
                          id: "36083d40-2abd-2f38-fa09-0d3f04477c60",
                          name: "No",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "bb7cefad-75ea-e9cd-e3e5-5490d33bc313",
                          name: "Yes",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "604e21a0-68af-8a1f-c0a0-ae4aa0f0db50",
                      name: "Recording Software",
                      type: "EnumField",
                      children: [
                        {
                          id: "046a3e1c-1ebe-5ac3-423a-4d21347d9067",
                          name: "Zoom",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "3f793af0-c11e-28c9-478c-72505c7d4bae",
                      name: "Transcript",
                      type: "EnumField",
                      children: [
                        {
                          id: "ee13be57-8c38-73f4-c120-5cf08709cd28",
                          name: "Transcript Me",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "1d9c3b4a-e77d-6844-b9c4-ad308ce88fdf",
                          name: "None",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "e4e4377f-ef31-6982-1273-4deea1149eb2",
                      name: "Setting",
                      type: "Term",
                      children: [],
                    },
                    {
                      id: "b4bd7c41-0d2e-9b16-1302-e49662659cc3",
                      name: "Assessment Instrument",
                      type: "Term",
                      children: [],
                    },
                  ],
                },
                {
                  id: "ebe2da19-10c0-0892-11b4-750686996c03",
                  name: "Ecological Momentary Assessment",
                  type: "Term",
                  children: [
                    {
                      id: "57fe689d-ef38-6118-ce91-2843ad83aa8c",
                      name: "Platform",
                      type: "EnumField",
                      children: [
                        {
                          id: "a22eb76b-410c-20f4-22e6-0071b78ab31f",
                          name: "Twilio",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "6d84ae0f-55a5-d019-3282-d115e946eab8",
                          name: "Iphone",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "c9834bdc-10bc-e168-5d1c-323b8a06ed25",
                          name: "REDCap",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "ffcf9cc0-5317-5545-73a3-f5b3208f41a6",
                      name: "Assessment Instrument",
                      type: "TextField",
                      children: [],
                    },
                  ],
                },
                {
                  id: "73c620ac-fdd0-e67b-6b9d-688f11c4bf07",
                  name: "Actigraphy",
                  type: "Term",
                  children: [
                    {
                      id: "06b13b3b-34fc-7d0b-92d6-144d5f3e0741",
                      name: "Processing Pipeline",
                      type: "EnumField",
                      children: [
                        {
                          id: "7744617d-5dc6-27cd-09ae-2a9a9d9e0c70",
                          name: "none",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "9eb22164-2928-ce77-3369-739326d5e419",
                          name: "dpsleep",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                    {
                      id: "03dbb70a-25bb-30a7-5a44-730c1895ef1a",
                      name: "Device",
                      type: "EnumField",
                      children: [
                        {
                          id: "2e45794f-bcb4-ed66-094a-f8b7ff2a9829",
                          name: "Apple Watch",
                          type: "EnumOption",
                          children: [],
                        },
                        {
                          id: "3aa26e56-e5b7-d7f4-e214-1bfee7258f55",
                          name: "GENEActiv",
                          type: "EnumOption",
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: "91817e29-792d-a023-e541-bd931fcfcb0b",
              name: "Study",
              type: "Term",
              children: [
                {
                  id: "1dbcf8ca-0bf8-a6f4-6573-d695d30d1e0d",
                  name: "Code",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "d9a3e3b3-3a27-ea69-60bc-98a9c892cc35",
                  name: "Center",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "b767ea1f-5df1-295a-a07d-39a0d8800a2c",
                  name: "Extract",
                  type: "Term",
                  children: [
                    {
                      id: "d4b8c7ab-2526-0bb3-a341-7c1b0bcb4511",
                      name: "Notes",
                      type: "TextField",
                      children: [],
                    },
                    {
                      id: "38c40073-1509-a062-c511-e0e9527673bb",
                      name: "Time",
                      type: "TextField",
                      children: [],
                    },
                    {
                      id: "d1ef49c4-78e7-744e-ef25-2642f116f3ac",
                      name: "Operator ID",
                      type: "TextField",
                      children: [],
                    },
                  ],
                },
                {
                  id: "644c7b95-8427-c01e-076d-391cfae54c65",
                  name: "Config",
                  type: "Term",
                  children: [
                    {
                      id: "f1f12c92-740a-16dc-b9b6-e243f0cbcc90",
                      name: "Operator ID",
                      type: "TextField",
                      children: [],
                    },
                    {
                      id: "271e5715-9c86-fa6b-d476-643e5e95aebd",
                      name: "Notes",
                      type: "TextField",
                      children: [],
                    },
                    {
                      id: "f47a00fb-4fd6-b09d-3ccb-69863565103e",
                      name: "Time",
                      type: "TextField",
                      children: [],
                    },
                  ],
                },
                {
                  id: "13991312-052a-9b0b-f6e7-dd2ded09a111",
                  name: "Investigator ID",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "8a2a08b6-385d-d838-f6ba-5b616cdb8fff",
              name: "Subject",
              type: "Term",
              children: [
                {
                  id: "24f97d53-eec9-8430-c904-011a8514b95f",
                  name: "Height",
                  type: "IntegerField",
                  children: [],
                },
                {
                  id: "7213bd9d-e20d-fdbb-9374-a97568fc89bd",
                  name: "Sex",
                  type: "EnumField",
                  children: [
                    {
                      id: "fc6680ba-be3c-e979-bf94-9b33c79b11e1",
                      name: "Female",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "35068c09-55c9-d634-d88d-634bc0079312",
                      name: "Other",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "dab52028-eec9-d7fe-12e2-c46effa507dc",
                      name: "Male",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "877c8cca-26bb-8522-1aad-ce6346ef29ac",
                  name: "Date of Birth",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "1c260390-c770-32d8-1693-8a5cbfb42cfb",
                  name: "Handedness",
                  type: "EnumField",
                  children: [
                    {
                      id: "cfa609f8-ce03-a223-ceab-d530b08aab26",
                      name: "Right",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "80ad8943-9709-f701-5157-766ffd320443",
                      name: "Ambidextrious",
                      type: "EnumOption",
                      children: [],
                    },
                    {
                      id: "49330075-7d2d-7a74-b778-34288b31adc6",
                      name: "Left",
                      type: "EnumOption",
                      children: [],
                    },
                  ],
                },
                {
                  id: "6ab19632-217f-9d92-c7f0-c1487fcad205",
                  name: "Weight",
                  type: "IntegerField",
                  children: [],
                },
                {
                  id: "27c62295-00b8-c098-e500-3c5bde60f8fe",
                  name: "Location",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "589ba005-8522-7e4a-3e66-215e9b9b74b5",
              name: "Collection Time",
              type: "Term",
              children: [
                {
                  id: "47c67f13-47b2-6c35-097f-9458d53614a5",
                  name: "End DateTime",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "8d56c5a3-3d81-fbdc-2890-55330744d344",
                  name: "Start DateTime",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "6df83c75-e4b1-3174-3153-af11d7f8c6a0",
                  name: "Frequency",
                  type: "TextField",
                  children: [],
                },
              ],
            },
            {
              id: "a0b2b4cc-ad70-2c77-db2b-ef0e34e4d29e",
              name: "Collection Site",
              type: "Term",
              children: [
                {
                  id: "9f67a75d-69b2-4bc9-fc81-e9121ee107a7",
                  name: "State",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "bd443f29-cf04-c0e9-7395-c1646a7594c3",
                  name: "City",
                  type: "TextField",
                  children: [],
                },
                {
                  id: "b817d0f8-b987-d02e-40ae-331e9f90a034",
                  name: "Country",
                  type: "TextField",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
    to = [
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 0,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2021-11-05T05:52:56.63+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "9a370ecc-1a20-4087-9712-4c811b26d5b2",
            Collection: { DateCollected: "2021-11-04T00:00:00-07:00" },
            Type: 0,
            Label: "John Doe Dataset",
            Status: 0,
            Quantity: 1,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            SpeciesConfirmed: !0,
            Sex: 3,
            Notes: "Eggs collected in Harris County, TX",
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 1,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2021-11-05T06:55:13.278+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "bb89882b-3aec-4e1c-9758-5b9d49753996",
            Status: 0,
            Collection: {
              Location: "Premonition lab 123",
              City: "Redmond, WA",
              Collector: "Mike Reddy",
            },
            Type: 1,
            Sources: ["9a370ecc-1a20-4087-9712-4c811b26d5b2"],
            Label: "Larval001",
            Quantity: 1,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            SpeciesConfirmed: !1,
            History: [
              { Action: "Created", Time: "2021-11-05T06:55:13.278+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 2,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2021-11-05T07:08:05.761+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "1be528a6-b5c0-457d-aa98-ea92bfa93267",
            Status: 0,
            Collection: {},
            Sources: ["bb89882b-3aec-4e1c-9758-5b9d49753996"],
            Type: 2,
            Label: "CageA",
            Notes: "test test test",
            History: [
              { Action: "Created", Time: "2021-11-05T07:08:05.761+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 3,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2021-11-11T21:24:17.115+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "cc51003c-1d20-4a50-8fc2-0ea32a107ed7",
            Status: 0,
            Collection: { City: "Houston, TX" },
            Type: 0,
            Label: "TireEgg",
            History: [
              { Action: "Created", Time: "2021-11-11T21:24:17.115+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 4,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2021-11-11T22:51:39.456+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "effe6c45-a15e-490b-91d0-837f8206e615",
            Status: 0,
            Collection: {},
            Type: 1,
            Label: "TireLarval",
            Sources: ["cc51003c-1d20-4a50-8fc2-0ea32a107ed7"],
            Quantity: 1,
            History: [
              { Action: "Created", Time: "2021-11-11T22:51:39.456+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 5,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2022-01-25T01:47:57.003+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "5cc61bea-82d9-4f09-94f8-b6a79b49ffd3",
            Status: 0,
            SpeciesList: [
              {
                Name: "aedes",
                Rank: "genus",
                Parent: {
                  Name: "culicidae",
                  Rank: "family",
                  Parent: {
                    Name: "diptera",
                    Rank: "order",
                    Parent: {
                      Name: "insecta",
                      Rank: "class",
                      Parent: null,
                      SourceIDs: { NCBI: 260538 },
                    },
                    SourceIDs: { NCBI: 265461 },
                  },
                  SourceIDs: { NCBI: 342889 },
                },
                SourceIDs: { NCBI: 1806188 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Type: 3,
            Sources: ["bb89882b-3aec-4e1c-9758-5b9d49753996"],
            Label: "Larval001-Aedes-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-01-25T01:47:57.003+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 6,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2022-01-25T01:47:57.262+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "7ba6de47-c953-42bf-ae89-390decc57482",
            Status: 0,
            SpeciesList: [
              {
                Name: "culex",
                Rank: "genus",
                Parent: {
                  Name: "culicidae",
                  Rank: "family",
                  Parent: {
                    Name: "diptera",
                    Rank: "order",
                    Parent: {
                      Name: "insecta",
                      Rank: "class",
                      Parent: null,
                      SourceIDs: { NCBI: 260538 },
                    },
                    SourceIDs: { NCBI: 265461 },
                  },
                  SourceIDs: { NCBI: 342889 },
                },
                SourceIDs: { NCBI: 2007271 },
              },
            ],
            Sex: 2,
            Quantity: 1,
            Type: 3,
            Sources: ["bb89882b-3aec-4e1c-9758-5b9d49753996"],
            Label: "Larval001-Culex-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-01-25T01:47:57.262+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 7,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2022-01-25T01:47:57.542+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "04287e73-0fea-40cc-bdd0-db42f1193bcf",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 2,
            Quantity: 1,
            Type: 3,
            Sources: ["bb89882b-3aec-4e1c-9758-5b9d49753996"],
            Label: "Larval001-Aedes_aegypti-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-01-25T01:47:57.542+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 8,
        Version: 0,
        ObserverId: "b92dfdef-f13e-48f3-a56f-07f161f3aac2",
        StartTime: "2022-01-31T21:31:31.287+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "58de6567-5749-46d0-82a1-06284cfb0437",
            Status: 1,
            Collection: {},
            Attachments: ["1536884011.svg"],
            Type: 2,
            Quantity: 1,
            Sex: 0,
            Notes: "Test",
            Label: "vutest1",
            History: [
              { Action: "Created", Time: "2022-01-31T21:31:31.287+00:00" },
            ],
          },
        ],
        DataFiles: ["58de6567-5749-46d0-82a1-06284cfb0437/1536884011.svg"],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 9,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:27:10.944+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "51b5ae96-bcf4-4b92-a499-53d9b3780ff2",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Bag01",
            Quantity: 0,
            Notes: "Designation for bag to distinguished from others. ",
            History: [
              { Action: "Created", Time: "2022-02-03T01:27:10.944+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 10,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:28:06.721+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "acdeaae0-fe37-4565-83a5-984e79436b32",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "2022-02-02_CapturedBugs",
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Quantity: 200,
            History: [
              { Action: "Created", Time: "2022-02-03T01:28:06.721+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 11,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:32:31.163+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "13b943d3-ac39-4a41-bfca-7864702c1abb",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 15,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:32:31.163+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 12,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:32:31.307+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "4a6f21c8-98ae-483a-9286-91f2a657d0c8",
            Status: 0,
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Sex: 1,
            Quantity: 25,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:32:31.307+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 13,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:32:31.443+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ef61e12e-0a84-4d2d-ab24-60f330aec818",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 2,
            Quantity: 3,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Aedes_aegypti-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:32:31.443+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 14,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:32:31.557+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "b88750c3-0df3-48c2-a274-d2d9f807f272",
            Status: 0,
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Sex: 2,
            Quantity: 6,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Culex_quinquefasciatus-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:32:31.557+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 15,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:32:31.68+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "dee8bb79-8081-4424-98be-ee9e6b790e43",
            Status: 0,
            SpeciesList: [
              {
                Name: "blattodea",
                Rank: "order",
                Parent: {
                  Name: "insecta",
                  Rank: "class",
                  Parent: null,
                  SourceIDs: { NCBI: 260538 },
                },
                SourceIDs: { NCBI: 85823 },
              },
            ],
            Sex: 1,
            Quantity: 1,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Blattodea-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:32:31.68+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 16,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-03T01:36:19.079+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "4d11531d-244b-4c0d-baed-5d7056f9071c",
            Status: 0,
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 4,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-03T01:36:19.079+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 17,
        Version: 0,
        ObserverId: "b92dfdef-f13e-48f3-a56f-07f161f3aac2",
        StartTime: "2022-02-03T22:04:30.015+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "0d06882f-4b03-44f7-a020-ac4f53d27d0d",
            Status: 0,
            Collection: {},
            Type: 2,
            Label: "vutest1",
            Attachments: ["Climat-Houston.svg.png"],
            History: [
              { Action: "Created", Time: "2022-02-03T22:04:30.015+00:00" },
            ],
          },
        ],
        DataFiles: [
          "0d06882f-4b03-44f7-a020-ac4f53d27d0d/Climat-Houston.svg.png",
        ],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 18,
        Version: 0,
        ObserverId: "b92dfdef-f13e-48f3-a56f-07f161f3aac2",
        StartTime: "2022-02-03T22:09:43.579+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a8726953-0cff-489a-a2d8-b22dcb8aba1d",
            Status: 0,
            Collection: {},
            Type: 2,
            Label: "vutest1",
            Attachments: ["Climat-Houston.svg.png"],
            History: [
              { Action: "Created", Time: "2022-02-03T22:09:43.579+00:00" },
            ],
          },
        ],
        DataFiles: [
          "a8726953-0cff-489a-a2d8-b22dcb8aba1d/Climat-Houston.svg.png",
        ],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 19,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:10:48.023+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "b3873c46-3bbd-441e-944b-7c09cd924b70",
            Status: 0,
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Sex: 1,
            Quantity: 82,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:10:48.023+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 20,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:10:48.486+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "366598cb-b811-46f3-bacb-ad458ccb80a8",
            Status: 0,
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 23,
            Type: 6,
            Sources: ["51b5ae96-bcf4-4b92-a499-53d9b3780ff2"],
            Label: "Bag01-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:10:48.486+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 21,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:22:17.214+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "d2de37dd-03a9-4f63-90cf-4c1dbfcc5c36",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Bag04",
            Quantity: 0,
            History: [
              { Action: "Created", Time: "2022-02-14T21:22:17.214+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 22,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:24:33.275+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "98b19ad3-f9cd-4e0b-a689-10beae54446c",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "2022-06-22_PREMO-TRAPP0300-00001",
            Sources: ["d2de37dd-03a9-4f63-90cf-4c1dbfcc5c36"],
            Quantity: 0,
            History: [
              { Action: "Created", Time: "2022-02-14T21:24:33.275+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 23,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:26:28.305+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "54efd8ee-268c-4038-a3e0-87c8d5b4f8da",
            Status: 0,
            SpeciesList: [
              {
                Name: "nigripalpus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 42429 },
              },
            ],
            Sex: 1,
            Quantity: 19,
            Type: 6,
            Sources: ["98b19ad3-f9cd-4e0b-a689-10beae54446c"],
            Label: "2022-06-22_PREMO-TRAPP0300-00001-Culex_nigripalpus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:26:28.305+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 24,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:31:41.888+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a07979f6-17fc-4cbf-8c35-fab63d893f2d",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "2022-07-04_PREMO-TRAPP0200-00001",
            History: [
              { Action: "Created", Time: "2022-02-14T21:31:41.888+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 25,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:33:37.764+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "139bdee8-6107-45c4-9420-46c7e9eb59f3",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 19,
            Type: 6,
            Sources: ["a07979f6-17fc-4cbf-8c35-fab63d893f2d"],
            Label: "2022-07-04_PREMO-TRAPP0200-00001-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:33:37.764+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 26,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:33:38.076+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c126ed77-cb48-4e4d-a98b-aff442f73ecd",
            Status: 0,
            SpeciesList: [
              {
                Name: "titillans",
                Rank: "species",
                Parent: {
                  Name: "mansonia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "mansonia",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1147728 },
                  },
                  SourceIDs: { NCBI: 308734 },
                },
                SourceIDs: { NCBI: 869066 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Type: 6,
            Sources: ["a07979f6-17fc-4cbf-8c35-fab63d893f2d"],
            Label: "2022-07-04_PREMO-TRAPP0200-00001-Mansonia_titillans-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:33:38.076+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 27,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T21:36:41.465+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "f42fb030-9432-4b59-aa0f-5d16e61811a4",
            Status: 0,
            SpeciesList: [
              {
                Name: "triseriatus",
                Rank: "species",
                Parent: {
                  Name: "protomacleaya",
                  Rank: "subgenus",
                  Parent: {
                    Name: "ochlerotatus",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "culicoidea",
                        Rank: "superfamily",
                        Parent: {
                          Name: "diptera",
                          Rank: "order",
                          Parent: {
                            Name: "insecta",
                            Rank: "class",
                            Parent: null,
                            SourceIDs: { NCBI: 260538 },
                          },
                          SourceIDs: { NCBI: 265461 },
                        },
                        SourceIDs: { NCBI: 41827 },
                      },
                      SourceIDs: {},
                    },
                    SourceIDs: { NCBI: 1125803 },
                  },
                  SourceIDs: { NCBI: 119225 },
                },
                SourceIDs: { NCBI: 7162 },
              },
            ],
            Sex: 1,
            Quantity: 2,
            Type: 6,
            Sources: ["a07979f6-17fc-4cbf-8c35-fab63d893f2d"],
            Label:
              "2022-07-04_PREMO-TRAPP0200-00001-Ochlerotatus_triseriatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T21:36:41.465+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 28,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T23:33:03.877+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "7de83a94-693a-4f07-b91f-ff30164d8c36",
            Status: 0,
            Collection: {},
            Type: 6,
            Sources: ["d2de37dd-03a9-4f63-90cf-4c1dbfcc5c36"],
            Label: "2022-07-04_PREMO_TRAPP03-00005",
            History: [
              { Action: "Created", Time: "2022-02-14T23:33:03.877+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 29,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T23:36:17.776+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "3b04a18b-a43d-4e20-8c96-cdd94e333be9",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 14,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            Label: "2022-07-04_PREMO_TRAPP03-00005-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T23:36:17.776+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 30,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-14T23:36:17.92+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c0f670a3-e70c-4028-a193-a0251f6613b5",
            Status: 0,
            SpeciesList: [
              {
                Name: "mitchellii",
                Rank: "species",
                Parent: {
                  Name: "wyeomyia",
                  Rank: "genus",
                  Parent: {
                    Name: "culicidae",
                    Rank: "family",
                    Parent: {
                      Name: "diptera",
                      Rank: "order",
                      Parent: {
                        Name: "insecta",
                        Rank: "class",
                        Parent: null,
                        SourceIDs: { NCBI: 260538 },
                      },
                      SourceIDs: { NCBI: 265461 },
                    },
                    SourceIDs: { NCBI: 342889 },
                  },
                  SourceIDs: { NCBI: 2631130 },
                },
                SourceIDs: { NCBI: 857316 },
              },
            ],
            Sex: 1,
            Quantity: 24,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            Label: "2022-07-04_PREMO_TRAPP03-00005-Wyeomyia_mitchellii-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-14T23:36:17.92+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 31,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-15T20:32:36.017+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "09d28de6-f1dc-43a7-ae1e-869c9f42a3b2",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Bag05",
            Notes: "New bag added 2022-02-15.",
            History: [
              { Action: "Created", Time: "2022-02-15T20:32:36.017+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 32,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-15T20:34:32.853+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "fb170c76-2f6b-49a4-a5de-8c925b365f7d",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "2022-02-16_PREMO-TRAPP03-00007",
            History: [
              { Action: "Created", Time: "2022-02-15T20:34:32.853+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 33,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-15T20:36:32.307+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a9728a4c-fe01-40be-871d-e02941d20528",
            Status: 0,
            SpeciesList: [
              {
                Name: "tritaeniorhynchus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7178 },
              },
            ],
            Sex: 1,
            Quantity: 45,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label:
              "2022-02-16_PREMO-TRAPP03-00007-Culex_tritaeniorhynchus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-15T20:36:32.307+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 34,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-15T20:36:32.46+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "b3448d5e-aece-4429-b26b-07d526fce1a1",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 12,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label: "2022-02-16_PREMO-TRAPP03-00007-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-02-15T20:36:32.46+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 35,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-26T00:39:11.169+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "414f6c0d-3982-4c00-81e1-d186fd3a4616",
            Status: 1,
            Collection: {},
            Type: 3,
            Label: "2022-02-25_Cx.tritaen",
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Quantity: 5,
            SpeciesList: [
              {
                Name: "tritaeniorhynchus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7178 },
              },
            ],
            SpeciesConfirmed: !0,
            Strain: "wild",
            Stage: "adult",
            Sex: 1,
            History: [
              { Action: "Created", Time: "2022-02-26T00:39:11.169+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 36,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-26T00:40:11.434+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c9f5d85b-dfad-4f20-b933-e71b70db36a1",
            Status: 1,
            Collection: {},
            Type: 3,
            Label: "2022-02-25_Ma.tittilans",
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Quantity: 14,
            SpeciesList: [
              {
                Name: "titillans",
                Rank: "species",
                Parent: {
                  Name: "mansonia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "mansonia",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1147728 },
                  },
                  SourceIDs: { NCBI: 308734 },
                },
                SourceIDs: { NCBI: 869066 },
              },
            ],
            SpeciesConfirmed: !0,
            Strain: "wild",
            Stage: "adult",
            Sex: 1,
            History: [
              { Action: "Created", Time: "2022-02-26T00:40:11.434+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 37,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-02-26T00:40:58.644+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "b100407b-f50c-4b57-a96c-521e611666d8",
            Status: 1,
            Collection: {},
            Type: 3,
            Label: "2022-02-25_Cx.que",
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Quantity: 76,
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            SpeciesConfirmed: !0,
            Strain: "wild",
            Stage: "adult",
            Sex: 1,
            History: [
              { Action: "Created", Time: "2022-02-26T00:40:58.644+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 38,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-03-14T23:11:47.213+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c09205e5-418b-4d82-b0ee-328ce092de92",
            Status: 0,
            SpeciesList: [
              {
                Name: "mantodea",
                Rank: "order",
                Parent: {
                  Name: "insecta",
                  Rank: "class",
                  Parent: null,
                  SourceIDs: { NCBI: 260538 },
                },
                SourceIDs: { NCBI: 253120 },
              },
            ],
            Sex: 0,
            Quantity: 2,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label: "2022-02-16_PREMO-TRAPP03-00007-Mantodea-unknown",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-03-14T23:11:47.213+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 39,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-03-14T23:11:47.539+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "1a34bda7-b2fb-454f-9d97-784a28158157",
            Status: 0,
            SpeciesList: [
              {
                Name: "blattodea",
                Rank: "order",
                Parent: {
                  Name: "insecta",
                  Rank: "class",
                  Parent: null,
                  SourceIDs: { NCBI: 260538 },
                },
                SourceIDs: { NCBI: 85823 },
              },
            ],
            Sex: 1,
            Quantity: 1,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label: "2022-02-16_PREMO-TRAPP03-00007-Blattodea-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-03-14T23:11:47.539+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 40,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-03-14T23:11:47.674+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "34f1c91b-6a64-45c7-9e42-0c0aa72cb099",
            Status: 0,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 4,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label: "2022-02-16_PREMO-TRAPP03-00007-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-03-14T23:11:47.674+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 41,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-03-14T23:11:47.79+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a6fb32d1-ecf6-43e9-b9d0-45f7f459ebdc",
            Status: 0,
            SpeciesList: [
              {
                Name: "sapphirina",
                Rank: "species",
                Parent: {
                  Name: "uranotaenia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "uranotaenia",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2448165 },
                  },
                  SourceIDs: { NCBI: 325429 },
                },
                SourceIDs: { NCBI: 139056 },
              },
            ],
            Sex: 0,
            Quantity: 6,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            Label:
              "2022-02-16_PREMO-TRAPP03-00007-Uranotaenia_sapphirina-unknown",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-03-14T23:11:47.79+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 42,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-13T18:27:42.594+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "3be8b485-e2f6-4d3d-9a7b-0fa5552b1677",
            Status: 0,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            SpeciesList: [
              {
                Name: "gambiae",
                Rank: "species",
                Parent: {
                  Name: "cellia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 2730094 },
                },
                SourceIDs: { NCBI: 7165 },
              },
            ],
            Sex: 1,
            Quantity: 25,
            Label: "2022-02-16_PREMO-TRAPP03-00007-Anopheles_gambiae-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-13T18:27:42.594+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 43,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-13T18:27:43.205+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "b419fb56-378a-49b9-98b8-e9aac9cb1570",
            Status: 0,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            SpeciesList: [
              {
                Name: "funestus",
                Rank: "species",
                Parent: {
                  Name: "cellia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 2730094 },
                },
                SourceIDs: { NCBI: 62324 },
              },
            ],
            Sex: 1,
            Quantity: 20,
            Label: "2022-02-16_PREMO-TRAPP03-00007-Anopheles_funestus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-13T18:27:43.205+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 44,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-13T18:27:43.504+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "f24eef8b-f453-414c-be14-eada52aa9c11",
            Status: 0,
            Type: 3,
            Sources: ["fb170c76-2f6b-49a4-a5de-8c925b365f7d"],
            SpeciesList: [
              {
                Name: "stephensi",
                Rank: "species",
                Parent: {
                  Name: "cellia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 2730094 },
                },
                SourceIDs: { NCBI: 30069 },
              },
            ],
            Sex: 1,
            Quantity: 23,
            Label: "2022-02-16_PREMO-TRAPP03-00007-Anopheles_stephensi-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-13T18:27:43.504+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 45,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: "2022-05-17T22:19:44.07+00:00",
        EndTime: "2022-05-17T22:19:44.07+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "80228671-c33c-45f3-a4bf-f05148e09902",
            Type: 6,
            Label: "Bag04-2022-05-17",
            Status: 0,
            Sources: ["d2de37dd-03a9-4f63-90cf-4c1dbfcc5c36"],
            Notes: "Generated by trap-service app",
            Collection: {
              Longitude: -122.36384561471792,
              Latitude: 47.66078934006621,
              Collector: "Xiaoji Chen",
            },
            History: [
              { Action: "Created", Time: "2022-05-17T22:19:44.07+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 46,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-05-18T22:13:20.201+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "32c516c8-0b57-4c5f-9035-b583cc626186",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Casper",
            History: [
              { Action: "Created", Time: "2022-05-18T22:13:20.201+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 47,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-05-18T22:19:36.414+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a3348c74-96bc-4f2f-9afa-bc55d7fda401",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Graverler",
            History: [
              { Action: "Created", Time: "2022-05-18T22:19:36.414+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 48,
        Version: 0,
        ObserverId: "fe061a57-daf4-4804-9403-095e46b7768b",
        StartTime: null,
        EndTime: "2022-05-18T22:23:01.319+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "0b029f87-01c2-4090-ab61-6c84814d0c59",
            Type: 6,
            Label: "Graverler-2022-05-18",
            Status: 0,
            Sources: ["a3348c74-96bc-4f2f-9afa-bc55d7fda401"],
            Notes: "Generated by trap-service app. Installed duration: unknown",
            Collection: {
              Collector: "NepalDroid01@premonitionweb.onmicrosoft.com",
            },
            History: [
              { Action: "Created", Time: "2022-05-18T22:23:01.319+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 49,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-19T00:31:21.044+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "bee14028-dd5a-4048-8115-0eff9bba3456",
            Status: 0,
            Type: 3,
            Sources: ["0b029f87-01c2-4090-ab61-6c84814d0c59"],
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 31,
            Label: "Graverler-2022-05-18-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-19T00:31:21.044+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 50,
        Version: 0,
        ObserverId: "fe061a57-daf4-4804-9403-095e46b7768b",
        StartTime: null,
        EndTime: "2022-05-25T23:08:50.74+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "e5db12c6-cccc-4cd2-8601-c3fa9fa6a822",
            Type: 6,
            Label: "Graverler-2022-05-25",
            Status: 0,
            Sources: ["a3348c74-96bc-4f2f-9afa-bc55d7fda401"],
            Notes: "Generated by trap-service app. Installed duration: unknown",
            Collection: {
              Collector: "NepalDroid01@premonitionweb.onmicrosoft.com",
            },
            History: [
              { Action: "Created", Time: "2022-05-25T23:08:50.74+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 51,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-25T23:16:55.407+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ac88c516-3f3e-418b-aba6-3b69f9cbeca8",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Sex: 1,
            Quantity: 20,
            Label: "Graverler-2022-05-25-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-25T23:16:55.407+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 52,
        Version: 0,
        ObserverId: "25d86336-068d-4a04-9937-d8d91c79a79b",
        StartTime: "2022-05-25T23:16:55.872+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "7efe7731-4c4d-488e-85ce-491b653a1ba7",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 10,
            Label: "Graverler-2022-05-25-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-05-25T23:16:55.872+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 53,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-05-26T00:25:40.339+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "5b650c74-86bd-4b13-830e-9eeeb7880007",
            Status: 0,
            Collection: {},
            Type: 3,
            SpeciesList: [
              {
                Name: "ceratopogonidae",
                Rank: "family",
                Parent: {
                  Name: "diptera",
                  Rank: "order",
                  Parent: {
                    Name: "insecta",
                    Rank: "class",
                    Parent: null,
                    SourceIDs: { NCBI: 260538 },
                  },
                  SourceIDs: { NCBI: 265461 },
                },
                SourceIDs: { NCBI: 333807 },
              },
            ],
            Label: "212",
            History: [
              { Action: "Created", Time: "2022-05-26T00:25:40.339+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 54,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-05-27T19:57:56.947+00:00",
        EndTime: null,
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "e1598edb-05f9-4dde-9d2b-1c034739c9f4",
            Status: 0,
            Collection: {},
            Type: 3,
            Label: "Box08",
            Sources: [
              "bee14028-dd5a-4048-8115-0eff9bba3456",
              "1a34bda7-b2fb-454f-9d97-784a28158157",
              "a6fb32d1-ecf6-43e9-b9d0-45f7f459ebdc",
              "7efe7731-4c4d-488e-85ce-491b653a1ba7",
              "f24eef8b-f453-414c-be14-eada52aa9c11",
              "a9728a4c-fe01-40be-871d-e02941d20528",
            ],
            Quantity: 6,
            Notes:
              "Box of bugs to send for molecular sequencing, COI and other barcoding. ",
            History: [
              { Action: "Created", Time: "2022-05-27T19:57:56.947+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 55,
        Version: 0,
        ObserverId: "95862b95-a22b-4d0b-bd5c-2fb5fca18841",
        StartTime: null,
        EndTime: "2022-05-31T22:19:57.823+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "f12329a0-d312-4c28-9789-4cf812b3a9a6",
            Type: 3,
            Label: "181_AN.QUA",
            Status: 1,
            Sources: ["3ea9b14f-d933-4ce5-9918-d233f0afa20e"],
            Quantity: 1,
            Species: null,
            SpeciesList: [
              {
                Name: "quadrimaculatus",
                Rank: "species",
                Parent: {
                  Name: "anopheles",
                  Rank: "genus",
                  Parent: {
                    Name: "culicidae",
                    Rank: "family",
                    Parent: {
                      Name: "diptera",
                      Rank: "order",
                      Parent: {
                        Name: "insecta",
                        Rank: "class",
                        Parent: {
                          Name: "arthropoda",
                          Rank: "phylum",
                          Parent: {
                            Name: "animalia",
                            Rank: "kingdom",
                            Parent: null,
                            SourceIDs: { COL: 54767744 },
                          },
                          SourceIDs: { NCBI: 1597404, COL: 54767749 },
                        },
                        SourceIDs: { NCBI: 260538, COL: 54767750 },
                      },
                      SourceIDs: { NCBI: 265461, COL: 54767890 },
                    },
                    SourceIDs: { NCBI: 342889, COL: 54767914 },
                  },
                  SourceIDs: { NCBI: 63365, COL: 54799091 },
                },
                SourceIDs: { COL: 8668065 },
              },
            ],
            SpeciesConfirmed: !1,
            Strain: null,
            Stage: "adult",
            Sex: 1,
            Notes:
              "ECS on 75%RH at 28C. Good flier, though would hang inside bowtie on occasion, requiring a poke with a wooden dowel. \r\nWB_2021-05-21T15.44.46-07_WB_2021-05-21T16.12.58-07",
            Collection: {
              City: null,
              Location: "box03 vial 181",
              Habitat: null,
              Collector: null,
              Longitude: null,
              Latitude: null,
              DateCollected: null,
              DateShipped: null,
            },
            History: [
              { Action: "Disposed", Time: "2021-05-21T18:31:09.8239824-07:00" },
              { Action: "Created", Time: "2021-05-21T16:14:44.2320774-07:00" },
            ],
            Attachments: [
              "f12329a0-d312-4c28-9789-4cf812b3a9a6_image01.jpg",
              "f12329a0-d312-4c28-9789-4cf812b3a9a6_image02.jpg",
              "f12329a0-d312-4c28-9789-4cf812b3a9a6_image03.jpg",
              "f12329a0-d312-4c28-9789-4cf812b3a9a6_image04.jpg",
            ],
            Deleted: null,
          },
        ],
        DataFiles: [
          "f12329a0-d312-4c28-9789-4cf812b3a9a6/f12329a0-d312-4c28-9789-4cf812b3a9a6_image01.jpg",
          "f12329a0-d312-4c28-9789-4cf812b3a9a6/f12329a0-d312-4c28-9789-4cf812b3a9a6_image02.jpg",
          "f12329a0-d312-4c28-9789-4cf812b3a9a6/f12329a0-d312-4c28-9789-4cf812b3a9a6_image03.jpg",
          "f12329a0-d312-4c28-9789-4cf812b3a9a6/f12329a0-d312-4c28-9789-4cf812b3a9a6_image04.jpg",
        ],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 56,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-02T21:47:38.797+00:00",
        EndTime: "2022-06-02T21:47:38.797+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "a0b508c2-dd5b-4f42-8379-89cbade06d1e",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 23,
            Label: "Graverler-2022-05-25-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-02T21:47:38.797+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 57,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-02T21:47:39.212+00:00",
        EndTime: "2022-06-02T21:47:39.212+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "9ff12aa6-9b82-41c5-92f1-02855afd16dd",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "kalotermitidae",
                Rank: "family",
                Parent: {
                  Name: "blattoidea",
                  Rank: "superfamily",
                  Parent: {
                    Name: "blattodea",
                    Rank: "order",
                    Parent: {
                      Name: "insecta",
                      Rank: "class",
                      Parent: null,
                      SourceIDs: { NCBI: 260538 },
                    },
                    SourceIDs: { NCBI: 85823 },
                  },
                  SourceIDs: { NCBI: 1049657 },
                },
                SourceIDs: { NCBI: 359185 },
              },
            ],
            Sex: 0,
            Quantity: 100,
            Label: "Graverler-2022-05-25-Kalotermitidae-unknown",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-02T21:47:39.212+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 58,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-09T20:16:44.835+00:00",
        EndTime: "2022-06-09T20:16:44.835+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "586faa2d-3aa0-40d6-a94e-11a84688679d",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 15,
            Label: "Graverler-2022-05-25-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-09T20:16:44.835+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 59,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-09T20:16:45.174+00:00",
        EndTime: "2022-06-09T20:16:45.174+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ce0709c1-4eec-4c70-a414-57bc5792e3de",
            Status: 0,
            Type: 3,
            Sources: ["e5db12c6-cccc-4cd2-8601-c3fa9fa6a822"],
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Sex: 1,
            Quantity: 120,
            Label: "Graverler-2022-05-25-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-09T20:16:45.174+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 60,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-09T20:42:54.324+00:00",
        EndTime: "2022-06-09T20:42:54.324+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "86ac7fbf-4ba6-4813-ac9d-7f3d8bb78be5",
            Status: 0,
            Collection: {},
            Type: 3,
            Label: "50",
            Sources: ["586faa2d-3aa0-40d6-a94e-11a84688679d"],
            Quantity: 50,
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            SpeciesConfirmed: !0,
            Strain: "wild",
            Stage: "adults",
            Sex: 1,
            Notes: "pooled 50 for sequencing.",
            History: [
              { Action: "Created", Time: "2022-06-09T20:42:54.324+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 61,
        Version: 0,
        ObserverId: "0bae3000-96c0-4f2a-a7e9-73f363263c5e",
        StartTime: "2022-05-25T16:08:54.5504507-07:00",
        EndTime: "2022-06-10T18:34:36.47+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "2de2b042-71a9-4eb4-bac9-1a48013d08af",
            Type: 6,
            Label: "Casper-2022-06-10",
            Status: 0,
            Sources: ["32c516c8-0b57-4c5f-9035-b583cc626186"],
            Notes:
              "Generated by trap-service app. Installed duration: 379h 26m",
            Collection: {
              Collector: "labdevice02@premonitionweb.onmicrosoft.com",
            },
            History: [
              { Action: "Created", Time: "2022-06-10T18:34:36.47+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 62,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:00:05.04+00:00",
        EndTime: "2022-06-13T21:00:05.04+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "4692d4a8-b030-48d7-9bda-a3eba026e492",
            Status: 0,
            Collection: {},
            Type: 5,
            Label: "Fido",
            History: [
              { Action: "Created", Time: "2022-06-13T21:00:05.04+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 63,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:12:35.02+00:00",
        EndTime: "2022-06-13T21:12:35.02+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "099de340-d426-400b-8cc7-ab5d20ff15a6",
            Status: 0,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            SpeciesList: [
              {
                Name: "stephensi",
                Rank: "species",
                Parent: {
                  Name: "cellia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 2730094 },
                },
                SourceIDs: { NCBI: 30069 },
              },
            ],
            Sex: 1,
            Quantity: 56,
            Label: "2022-07-04_PREMO_TRAPP03-00005-Anopheles_stephensi-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:12:35.02+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 64,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:12:35.221+00:00",
        EndTime: "2022-06-13T21:12:35.221+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c7ad8d25-5013-44a4-91f6-b9fb174039db",
            Status: 0,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            SpeciesList: [
              {
                Name: "nigripalpus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 42429 },
              },
            ],
            Quantity: 4,
            Sex: 1,
            Label: "2022-07-04_PREMO_TRAPP03-00005-Culex_nigripalpus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:12:35.221+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 65,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:12:35.354+00:00",
        EndTime: "2022-06-13T21:12:35.354+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "999f3655-05b2-4c1b-9bb5-ed01dd89da1e",
            Status: 0,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            SpeciesList: [
              {
                Name: "mantodea",
                Rank: "order",
                Parent: {
                  Name: "insecta",
                  Rank: "class",
                  Parent: null,
                  SourceIDs: { NCBI: 260538 },
                },
                SourceIDs: { NCBI: 253120 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Label: "2022-07-04_PREMO_TRAPP03-00005-Mantodea-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:12:35.354+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 66,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:12:35.463+00:00",
        EndTime: "2022-06-13T21:12:35.463+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ab7003f6-e9c5-4bc6-b605-8c21c9b48f46",
            Status: 0,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            SpeciesList: [
              {
                Name: "mitchellii",
                Rank: "species",
                Parent: {
                  Name: "wyeomyia",
                  Rank: "genus",
                  Parent: {
                    Name: "culicidae",
                    Rank: "family",
                    Parent: {
                      Name: "diptera",
                      Rank: "order",
                      Parent: {
                        Name: "insecta",
                        Rank: "class",
                        Parent: null,
                        SourceIDs: { NCBI: 260538 },
                      },
                      SourceIDs: { NCBI: 265461 },
                    },
                    SourceIDs: { NCBI: 342889 },
                  },
                  SourceIDs: { NCBI: 2631130 },
                },
                SourceIDs: { NCBI: 857316 },
              },
            ],
            Sex: 1,
            Quantity: 2,
            Label: "2022-07-04_PREMO_TRAPP03-00005-Wyeomyia_mitchellii-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:12:35.463+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 67,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:12:35.581+00:00",
        EndTime: "2022-06-13T21:12:35.581+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "559c1646-8c05-4872-a7bd-f65437e68397",
            Status: 0,
            Type: 3,
            Sources: ["7de83a94-693a-4f07-b91f-ff30164d8c36"],
            SpeciesList: [
              {
                Name: "deinocerites",
                Rank: "genus",
                Parent: {
                  Name: "culicidae",
                  Rank: "family",
                  Parent: {
                    Name: "diptera",
                    Rank: "order",
                    Parent: {
                      Name: "insecta",
                      Rank: "class",
                      Parent: null,
                      SourceIDs: { NCBI: 260538 },
                    },
                    SourceIDs: { NCBI: 265461 },
                  },
                  SourceIDs: { NCBI: 342889 },
                },
                SourceIDs: { NCBI: 53524 },
              },
            ],
            Sex: 3,
            Quantity: 5,
            Label: "2022-07-04_PREMO_TRAPP03-00005-Deinocerites-both",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:12:35.581+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 68,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:35:11.646+00:00",
        EndTime: "2022-06-13T21:35:11.646+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ca617d61-8752-4362-aa7a-963224c34608",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "Test_2022-06-13",
            History: [
              { Action: "Created", Time: "2022-06-13T21:35:11.646+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 69,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:00.501+00:00",
        EndTime: "2022-06-13T21:39:00.501+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "7aade5f5-6782-494a-91b9-d55887828457",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Label: "Test_2022-06-13-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:00.501+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 70,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:00.649+00:00",
        EndTime: "2022-06-13T21:39:00.649+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "d757b0ac-799b-47b3-9708-d3c114173798",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 1,
            Quantity: 4,
            Label: "Test_2022-06-13-Aedes_albopictus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:00.649+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 71,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:00.754+00:00",
        EndTime: "2022-06-13T21:39:00.754+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "51e019ee-13e9-42b3-b57d-042415375a53",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 2,
            Quantity: 2,
            Label: "Test_2022-06-13-Aedes_aegypti-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:00.754+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 72,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:00.878+00:00",
        EndTime: "2022-06-13T21:39:00.878+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "3d30243b-fb6b-464d-9d0f-df8ade37b77e",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "quadrimaculatus",
                Rank: "species",
                Parent: {
                  Name: "anopheles",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 190374 },
                },
                SourceIDs: { NCBI: 7166 },
              },
            ],
            Sex: 1,
            Quantity: 1,
            Label: "Test_2022-06-13-Anopheles_quadrimaculatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:00.878+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 73,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:01.04+00:00",
        EndTime: "2022-06-13T21:39:01.04+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "dd922eef-6326-4778-83b0-755e532d2923",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "crucians",
                Rank: "species",
                Parent: {
                  Name: "anopheles",
                  Rank: "subgenus",
                  Parent: {
                    Name: "anopheles",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 63365 },
                  },
                  SourceIDs: { NCBI: 190374 },
                },
                SourceIDs: { NCBI: 869064 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Label: "Test_2022-06-13-Anopheles_crucians-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:01.04+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 74,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:01.151+00:00",
        EndTime: "2022-06-13T21:39:01.151+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "c73f0c4f-4861-4a27-99e5-6ccf1957ba0b",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "coronator",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 526217 },
              },
            ],
            Sex: 1,
            Quantity: 3,
            Label: "Test_2022-06-13-Culex_coronator-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:01.151+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 75,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:01.265+00:00",
        EndTime: "2022-06-13T21:39:01.265+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "031e6f3b-378c-4e32-b0aa-d8578a868f2a",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "erraticus",
                Rank: "species",
                Parent: {
                  Name: "melanoconion",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 53535 },
                },
                SourceIDs: { NCBI: 42427 },
              },
            ],
            Sex: 1,
            Quantity: 2,
            Label: "Test_2022-06-13-Culex_erraticus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:01.265+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 76,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:01.394+00:00",
        EndTime: "2022-06-13T21:39:01.394+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "8314e6c9-d764-40a6-a620-67fb4930f33a",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "tarsalis",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7177 },
              },
            ],
            Sex: 1,
            Quantity: 1,
            Label: "Test_2022-06-13-Culex_tarsalis-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:01.394+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 77,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:39:01.513+00:00",
        EndTime: "2022-06-13T21:39:01.513+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "f9212010-b27d-4821-8971-8a5cbc6f4229",
            Status: 0,
            Type: 3,
            Sources: ["ca617d61-8752-4362-aa7a-963224c34608"],
            SpeciesList: [
              {
                Name: "ferox",
                Rank: "species",
                Parent: {
                  Name: "psorophora",
                  Rank: "genus",
                  Parent: {
                    Name: "culicidae",
                    Rank: "family",
                    Parent: {
                      Name: "diptera",
                      Rank: "order",
                      Parent: {
                        Name: "insecta",
                        Rank: "class",
                        Parent: null,
                        SourceIDs: { NCBI: 260538 },
                      },
                      SourceIDs: { NCBI: 265461 },
                    },
                    SourceIDs: { NCBI: 342889 },
                  },
                  SourceIDs: { NCBI: 7182 },
                },
                SourceIDs: { NCBI: 7183 },
              },
            ],
            Sex: 1,
            Quantity: 2,
            Label: "Test_2022-06-13-Psorophora_ferox-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:39:01.513+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 78,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:42:37.08+00:00",
        EndTime: "2022-06-13T21:42:37.08+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "50d001fa-4413-4a7a-b773-7c9e460a7b70",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "Test_2022-06-13-14-42",
            History: [
              { Action: "Created", Time: "2022-06-13T21:42:37.08+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 79,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:46:49.53+00:00",
        EndTime: "2022-06-13T21:46:49.53+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "e2f8c399-977e-4c0b-8bde-57068bee95fe",
            Status: 0,
            Type: 3,
            Sources: ["50d001fa-4413-4a7a-b773-7c9e460a7b70"],
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 1,
            Quantity: 2,
            Label: "Test_2022-06-13-14-42-Aedes_aegypti-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:46:49.53+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 80,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:46:49.785+00:00",
        EndTime: "2022-06-13T21:46:49.785+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "6642e19f-34c6-4f21-93c8-31f3c44f9728",
            Status: 0,
            Type: 3,
            Sources: ["50d001fa-4413-4a7a-b773-7c9e460a7b70"],
            SpeciesList: [
              {
                Name: "taeniorhynchus",
                Rank: "species",
                Parent: {
                  Name: "ochlerotatus",
                  Rank: "subgenus",
                  Parent: {
                    Name: "ochlerotatus",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "culicoidea",
                        Rank: "superfamily",
                        Parent: {
                          Name: "diptera",
                          Rank: "order",
                          Parent: {
                            Name: "insecta",
                            Rank: "class",
                            Parent: null,
                            SourceIDs: { NCBI: 260538 },
                          },
                          SourceIDs: { NCBI: 265461 },
                        },
                        SourceIDs: { NCBI: 41827 },
                      },
                      SourceIDs: {},
                    },
                    SourceIDs: { NCBI: 1125803 },
                  },
                  SourceIDs: { NCBI: 53545 },
                },
                SourceIDs: { NCBI: 329105 },
              },
            ],
            Sex: 2,
            Quantity: 2,
            Label: "Test_2022-06-13-14-42-Ochlerotatus_taeniorhynchus-male",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-13T21:46:49.785+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 81,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T21:54:54.758+00:00",
        EndTime: "2022-06-13T21:54:54.758+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "dbbc37bc-f562-4278-9326-4b8e81ea49b2",
            Status: 0,
            Collection: {},
            Type: 3,
            Sources: ["50d001fa-4413-4a7a-b773-7c9e460a7b70"],
            SpeciesList: [
              {
                Name: "apidae",
                Rank: "family",
                Parent: {
                  Name: "apoidea",
                  Rank: "superfamily",
                  Parent: {
                    Name: "hymenoptera",
                    Rank: "order",
                    Parent: {
                      Name: "insecta",
                      Rank: "class",
                      Parent: null,
                      SourceIDs: { NCBI: 260538 },
                    },
                    SourceIDs: { NCBI: 7399 },
                  },
                  SourceIDs: { NCBI: 889157 },
                },
                SourceIDs: { NCBI: 7458 },
              },
            ],
            Quantity: 1,
            History: [
              { Action: "Created", Time: "2022-06-13T21:54:54.758+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 82,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-13T22:07:42.227+00:00",
        EndTime: "2022-06-13T22:07:42.227+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "35126360-8d5b-48b4-9e78-a2e149a9446a",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "Test_2022-06-13-15-07",
            History: [
              { Action: "Created", Time: "2022-06-13T22:07:42.227+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 83,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-14T00:28:44.058+00:00",
        EndTime: "2022-06-14T00:28:44.058+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "8092dde8-3a88-4344-b830-adf914913433",
            Status: 0,
            Collection: {},
            Type: 6,
            Label: "Test_2022-06-13-17-30",
            History: [
              { Action: "Created", Time: "2022-06-14T00:28:44.058+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 84,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-14T00:31:25.406+00:00",
        EndTime: "2022-06-14T00:31:25.406+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "89da7291-98b0-4a46-a65d-bc22cc6d21cd",
            Status: 0,
            Type: 3,
            Sources: ["8092dde8-3a88-4344-b830-adf914913433"],
            SpeciesList: [
              {
                Name: "aegypti",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7159 },
              },
            ],
            Sex: 0,
            Quantity: 3,
            Label: "Test_2022-06-13-17-30-Aedes_aegypti-unknown",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-14T00:31:25.406+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 85,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-14T00:31:25.63+00:00",
        EndTime: "2022-06-14T00:31:25.63+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "34e34173-cfa7-43bc-b03b-e451da2b17ed",
            Status: 0,
            Type: 3,
            Sources: ["8092dde8-3a88-4344-b830-adf914913433"],
            SpeciesList: [
              {
                Name: "albopictus",
                Rank: "species",
                Parent: {
                  Name: "stegomyia",
                  Rank: "subgenus",
                  Parent: {
                    Name: "aedes",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 1806188 },
                  },
                  SourceIDs: { NCBI: 53541 },
                },
                SourceIDs: { NCBI: 7160 },
              },
            ],
            Sex: 3,
            Quantity: 34,
            Label: "Test_2022-06-13-17-30-Aedes_albopictus-both",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-14T00:31:25.63+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 86,
        Version: 0,
        ObserverId: "0bae3000-96c0-4f2a-a7e9-73f363263c5e",
        StartTime: "2022-06-10T11:34:33.4191574-07:00",
        EndTime: "2022-06-14T18:17:23.816+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "8384df37-c2d9-4a4f-a537-ebd4b76d685d",
            Type: 6,
            Label: "Graverler-2022-06-14",
            Status: 0,
            Sources: ["a3348c74-96bc-4f2f-9afa-bc55d7fda401"],
            Notes: "Generated by trap-service app. Installed duration: 95h 43m",
            Collection: {
              Collector: "labdevice02@premonitionweb.onmicrosoft.com",
            },
            History: [
              { Action: "Created", Time: "2022-06-14T18:17:23.816+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 87,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-14T18:59:51.898+00:00",
        EndTime: "2022-06-14T18:59:51.898+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "ba7810c1-ead0-44d4-b2ff-e2150fac319f",
            Status: 0,
            Sex: 1,
            Type: 3,
            Sources: ["8384df37-c2d9-4a4f-a537-ebd4b76d685d"],
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Quantity: 7,
            Stage: "adult",
            Notes: "Seabring strain",
            Label: "Graverler-2022-06-14-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-14T18:59:51.898+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 88,
        Version: 0,
        ObserverId: "0bae3000-96c0-4f2a-a7e9-73f363263c5e",
        StartTime: "2022-06-14T11:17:20.2830729-07:00",
        EndTime: "2022-06-15T18:37:14.338+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "971fe35d-5142-4ce7-8344-2950693337ef",
            Type: 6,
            Label: "Casper-2022-06-15",
            Status: 0,
            Sources: ["32c516c8-0b57-4c5f-9035-b583cc626186"],
            Notes: "Generated by trap-service app. Installed duration: 24h 20m",
            Collection: {
              Collector: "labdevice02@premonitionweb.onmicrosoft.com",
            },
            History: [
              { Action: "Created", Time: "2022-06-15T18:37:14.338+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
      {
        $type:
          "Premonition.Common.Meta.Data.Observation, Premonition.Common.Meta",
        IsFunction: !1,
        ProcessType: "labassets",
        ProcessId: "abc03682-d5bd-490c-b088-c2a0ab5cf07a",
        IsMeasure: !1,
        Index: 89,
        Version: 0,
        ObserverId: "245e222e-64e7-4837-ba36-7ae20548c7b7",
        StartTime: "2022-06-16T01:10:44.69+00:00",
        EndTime: "2022-06-16T01:10:44.69+00:00",
        ApplicationDependencies: [],
        ProcessDependencies: [],
        Data: [
          {
            Guid: "f998715a-f1b8-4984-8f32-51d9134789d1",
            Status: 0,
            Sex: 1,
            Type: 3,
            Sources: ["971fe35d-5142-4ce7-8344-2950693337ef"],
            SpeciesList: [
              {
                Name: "quinquefasciatus",
                Rank: "species",
                Parent: {
                  Name: "culex",
                  Rank: "subgenus",
                  Parent: {
                    Name: "culex",
                    Rank: "genus",
                    Parent: {
                      Name: "culicidae",
                      Rank: "family",
                      Parent: {
                        Name: "diptera",
                        Rank: "order",
                        Parent: {
                          Name: "insecta",
                          Rank: "class",
                          Parent: null,
                          SourceIDs: { NCBI: 260538 },
                        },
                        SourceIDs: { NCBI: 265461 },
                      },
                      SourceIDs: { NCBI: 342889 },
                    },
                    SourceIDs: { NCBI: 2007271 },
                  },
                  SourceIDs: { NCBI: 518105 },
                },
                SourceIDs: { NCBI: 7176 },
              },
            ],
            Quantity: 3,
            Label: "Casper-2022-06-15-Culex_quinquefasciatus-female",
            Collection: {},
            History: [
              { Action: "Created", Time: "2022-06-16T01:10:44.69+00:00" },
            ],
          },
        ],
        DataFiles: [],
      },
    ];
  function no(e, t = 1) {
    return Math.floor(Math.random() * e) + t;
  }
  function ao(e) {
    return e[no(e.length - 1, 0)];
  }
  function io(e) {
    const t = (function (e, ...t) {
      return Object.keys(e)
        .filter((e) => !t.includes(e))
        .reduce((t, n) => ((t[n] = e[n]), t), {});
    })(e, "children");
    return (
      "TextField" === t.type
        ? (t.value = "SomeValue " + no(10))
        : "IntegerField" === t.type
        ? (t.value = no(100))
        : "EnumField" === t.type && (t.value = ao(e.children).id),
      t
    );
  }
  function so(e) {
    return Math.random() < 0.1
      ? [io(e)]
      : "EnumField" !== e.type
      ? e.children.flatMap(so)
      : [];
  }
  let ro = 1;
  function oo() {
    return {
      label: `Subject #${ro++} Data from ${ao([
        "McLean",
        "Pitt",
        "UCLA",
        "Mt. Sinai",
      ])}`,
      taxonomyTags: eo.children[0].children.flatMap(so),
    };
  }
  function co(e, t, n) {
    const a = e.slice();
    return (a[9] = t[n]), a;
  }
  function lo(e) {
    let t;
    return {
      c() {
        t = v(e[0]);
      },
      m(e, n) {
        T(e, t, n);
      },
      p(e, n) {
        1 & n && P(t, e[0]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function uo(e) {
    let t, n;
    return (
      (t = new Bt({
        props: { $$slots: { default: [lo] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          32769 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function po(e) {
    let t, n;
    return (
      (t = new wt({
        props: { $$slots: { default: [uo] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          32769 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function mo(e) {
    let t, n;
    return (
      (t = new Mt({
        props: { $$slots: { default: [po] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          32769 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function fo(e) {
    let t, n, a, i, s, r, o;
    function c(t) {
      e[5](t);
    }
    let l = { label: "Search..." };
    return (
      void 0 !== e[1] && (l.value = e[1]),
      (t = new mi({ props: l })),
      G.push(() => de(t, "value", c)),
      (r = new Zr({ props: { trees: e[2] } })),
      r.$on("change", e[6]),
      {
        c() {
          ue(t.$$.fragment),
            (a = E()),
            (i = S("span")),
            (i.textContent = "Advanced Filters"),
            (s = E()),
            ue(r.$$.fragment),
            D(i, "class", "filter-header svelte-189na6l");
        },
        m(e, n) {
          pe(t, e, n),
            T(e, a, n),
            T(e, i, n),
            T(e, s, n),
            pe(r, e, n),
            (o = !0);
        },
        p(e, a) {
          const i = {};
          !n && 2 & a && ((n = !0), (i.value = e[1]), X(() => (n = !1))),
            t.$set(i);
          const s = {};
          4 & a && (s.trees = e[2]), r.$set(s);
        },
        i(e) {
          o || (se(t.$$.fragment, e), se(r.$$.fragment, e), (o = !0));
        },
        o(e) {
          re(t.$$.fragment, e), re(r.$$.fragment, e), (o = !1);
        },
        d(e) {
          me(t, e), e && C(a), e && C(i), e && C(s), me(r, e);
        },
      }
    );
  }
  function ho(e) {
    let t, n;
    return (
      (t = new Zi({
        props: { $$slots: { default: [fo] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          32774 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Io(e) {
    let t,
      n = e[9].Data[0].label + "";
    return {
      c() {
        t = v(n);
      },
      m(e, n) {
        T(e, t, n);
      },
      p(e, a) {
        8 & a && n !== (n = e[9].Data[0].label + "") && P(t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function bo(e) {
    let t,
      n,
      a,
      i = e[9].Version + 1 + "";
    return {
      c() {
        (t = v(i)),
          (n = v(" revisions. ")),
          (a = S("a")),
          (a.textContent = "Earlier versions."),
          D(a, "class", "svelte-189na6l");
      },
      m(e, i) {
        T(e, t, i), T(e, n, i), T(e, a, i);
      },
      p(e, n) {
        8 & n && i !== (i = e[9].Version + 1 + "") && P(t, i);
      },
      d(e) {
        e && C(t), e && C(n), e && C(a);
      },
    };
  }
  function go(e) {
    let t, n, a, i;
    return (
      (t = new Bi({
        props: { $$slots: { default: [Io] }, $$scope: { ctx: e } },
      })),
      (a = new wi({
        props: { $$slots: { default: [bo] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = E()), ue(a.$$.fragment);
        },
        m(e, s) {
          pe(t, e, s), T(e, n, s), pe(a, e, s), (i = !0);
        },
        p(e, n) {
          const i = {};
          32776 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
          const s = {};
          32776 & n && (s.$$scope = { dirty: n, ctx: e }), a.$set(s);
        },
        i(e) {
          i || (se(t.$$.fragment, e), se(a.$$.fragment, e), (i = !0));
        },
        o(e) {
          re(t.$$.fragment, e), re(a.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), me(a, e);
        },
      }
    );
  }
  function To(e) {
    let t, n, a, i;
    return (
      (t = new Fi({
        props: { $$slots: { default: [go] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = E()), (a = E());
        },
        m(e, s) {
          pe(t, e, s), T(e, n, s), T(e, a, s), (i = !0);
        },
        p(e, n) {
          const a = {};
          32776 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          i || (se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), e && C(a);
        },
      }
    );
  }
  function Co(e) {
    let t, n;
    return (
      (t = new Ui({
        props: { $$slots: { default: [To] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          32776 & n && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          re(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function yo(e) {
    let t,
      n,
      a = e[3],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Co(co(e, a, t));
    const s = (e) =>
      re(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = x();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        T(e, t, a), (n = !0);
      },
      p(e, n) {
        if (8 & n) {
          let r;
          for (a = e[3], r = 0; r < a.length; r += 1) {
            const s = co(e, a, r);
            i[r]
              ? (i[r].p(s, n), se(i[r], 1))
              : ((i[r] = Co(s)),
                i[r].c(),
                se(i[r], 1),
                i[r].m(t.parentNode, t));
          }
          for (ae(), r = a.length; r < i.length; r += 1) s(r);
          ie();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < a.length; e += 1) se(i[e]);
          n = !0;
        }
      },
      o(e) {
        i = i.filter(Boolean);
        for (let e = 0; e < i.length; e += 1) re(i[e]);
        n = !1;
      },
      d(e) {
        y(i, e), e && C(t);
      },
    };
  }
  function So(e) {
    let t, n, a;
    return (
      (n = new Pi({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [yo] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = S("main")), ue(n.$$.fragment), D(t, "class", "svelte-189na6l");
        },
        m(e, i) {
          T(e, t, i), pe(n, t, null), (a = !0);
        },
        p(e, t) {
          const a = {};
          32776 & t && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          re(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          e && C(t), me(n);
        },
      }
    );
  }
  function $o(e) {
    let t, n, a, i, s, r, o, c, l, d, u, p, m, f, h, I, b;
    return (
      (document.title = t = e[0]),
      (a = new Je({
        props: {
          variant: "static",
          $$slots: { default: [mo] },
          $$scope: { ctx: e },
        },
      })),
      (r = new Xi({
        props: {
          style: "width: 360px",
          $$slots: { default: [ho] },
          $$scope: { ctx: e },
        },
      })),
      (c = new Yi({
        props: { $$slots: { default: [So] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = E()),
            ue(a.$$.fragment),
            (i = E()),
            (s = S("div")),
            ue(r.$$.fragment),
            (o = E()),
            ue(c.$$.fragment),
            (l = E()),
            (d = S("link")),
            (u = E()),
            (p = S("link")),
            (m = E()),
            (f = S("link")),
            (h = E()),
            (I = S("link")),
            D(s, "class", "drawer-container svelte-189na6l"),
            D(d, "rel", "stylesheet"),
            D(
              d,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            D(d, "class", "svelte-189na6l"),
            D(p, "rel", "stylesheet"),
            D(
              p,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            D(p, "class", "svelte-189na6l"),
            D(f, "rel", "stylesheet"),
            D(f, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            D(f, "class", "svelte-189na6l"),
            D(I, "rel", "stylesheet"),
            D(I, "href", "build/smui.css"),
            D(I, "class", "svelte-189na6l");
        },
        m(e, t) {
          T(e, n, t),
            pe(a, e, t),
            T(e, i, t),
            T(e, s, t),
            pe(r, s, null),
            g(s, o),
            pe(c, s, null),
            T(e, l, t),
            T(e, d, t),
            T(e, u, t),
            T(e, p, t),
            T(e, m, t),
            T(e, f, t),
            T(e, h, t),
            T(e, I, t),
            (b = !0);
        },
        p(e, [n]) {
          (!b || 1 & n) && t !== (t = e[0]) && (document.title = t);
          const i = {};
          32769 & n && (i.$$scope = { dirty: n, ctx: e }), a.$set(i);
          const s = {};
          32774 & n && (s.$$scope = { dirty: n, ctx: e }), r.$set(s);
          const o = {};
          32776 & n && (o.$$scope = { dirty: n, ctx: e }), c.$set(o);
        },
        i(e) {
          b ||
            (se(a.$$.fragment, e),
            se(r.$$.fragment, e),
            se(c.$$.fragment, e),
            (b = !0));
        },
        o(e) {
          re(a.$$.fragment, e),
            re(r.$$.fragment, e),
            re(c.$$.fragment, e),
            (b = !1);
        },
        d(e) {
          e && C(n),
            me(a, e),
            e && C(i),
            e && C(s),
            me(r),
            me(c),
            e && C(l),
            e && C(d),
            e && C(u),
            e && C(p),
            e && C(m),
            e && C(f),
            e && C(h),
            e && C(I);
        },
      }
    );
  }
  function vo(e, t, n) {
    let { title: a = "Digital Phenotyping Dashboard " } = t,
      i = "",
      s = [],
      r = to;
    function o(e) {
      console.log("filter updated!", e),
        n(
          3,
          (r = to.filter((t) =>
            ((t) => {
              const [{ label: n, taxonomyTags: a }] = t.Data;
              return (
                !!e.every(
                  (e) =>
                    !!a.find((t) =>
                      (function (e, t) {
                        return e.id === t.id && t.value == e.value;
                      })(t, e)
                    )
                ) &&
                (!i || n.toLowerCase().includes(i.toLowerCase()))
              );
            })(t)
          ))
        );
    }
    !(async function () {
      n(
        2,
        (s = await (async function () {
          const e = window.location.href.split("/");
          e.pop(), e.pop();
          const t = e.join("/") + "/taxonomy.json",
            n = await fetch(t),
            a = await n.json();
          return console.log({ taxonomy: a }), a.children[0].children;
        })())
      );
    })();
    return (
      (e.$$set = (e) => {
        "title" in e && n(0, (a = e.title));
      }),
      [
        a,
        i,
        s,
        r,
        o,
        function (e) {
          (i = e), n(1, i);
        },
        (e) => o(e.detail.filterTags),
      ]
    );
  }
  to.forEach((e) => {
    (e.Data = [oo()]), console.log(e.Data[0].taxonomyTags);
    const t = Math.random();
    t < 0.3 && (e.Version += 1), t < 0.1 && (e.Version += 1);
  });
  return new (class extends he {
    constructor(e) {
      super(), fe(this, e, vo, $o, r, { title: 0 });
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
