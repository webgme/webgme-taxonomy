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
  function o(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function r(t, n, a) {
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
      const o = l(t, n, a, s);
      e.p(o, i);
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
  function b(e, t, n) {
    return e.set(n), t;
  }
  function I(t) {
    return t && s(t.destroy) ? t.destroy : e;
  }
  function g(e, t) {
    e.appendChild(t);
  }
  function y(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function C(e) {
    e.parentNode.removeChild(e);
  }
  function T(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function $(e) {
    return document.createElement(e);
  }
  function S(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function v(e) {
    return document.createTextNode(e);
  }
  function E() {
    return v(" ");
  }
  function A() {
    return v("");
  }
  function x(e, t, n, a) {
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
  function _(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function P(e, t) {
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
  function U(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const V = [],
    G = [],
    j = [],
    q = [],
    z = Promise.resolve();
  let K = !1;
  function W() {
    K || ((K = !0), z.then(J));
  }
  function Q(e) {
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
      for (; Z < V.length; ) {
        const e = V[Z];
        Z++, R(e), ee(e.$$);
      }
      for (R(null), V.length = 0, Z = 0; G.length; ) G.pop()();
      for (let e = 0; e < j.length; e += 1) {
        const t = j[e];
        Y.has(t) || (Y.add(t), t());
      }
      j.length = 0;
    } while (V.length);
    for (; q.length; ) q.pop()();
    (K = !1), Y.clear(), R(e);
  }
  function ee(e) {
    if (null !== e.fragment) {
      e.update(), i(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(Q);
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
  function oe(e, t, n, a) {
    if (e && e.o) {
      if (te.has(e)) return;
      te.add(e),
        ne.c.push(() => {
          te.delete(e), a && (n && e.d(1), a());
        }),
        e.o(t);
    } else a && a();
  }
  const re =
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
      const o = e[s],
        r = t[s];
      if (r) {
        for (const e in o) e in r || (a[e] = 1);
        for (const e in r) i[e] || ((n[e] = r[e]), (i[e] = 1));
        e[s] = r;
      } else for (const e in o) i[e] = 1;
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
  function pe(e, t, a, o) {
    const { fragment: r, on_mount: c, on_destroy: l, after_update: d } = e.$$;
    r && r.m(t, a),
      o ||
        Q(() => {
          const t = c.map(n).filter(s);
          l ? l.push(...t) : i(t), (e.$$.on_mount = []);
        }),
      d.forEach(Q);
  }
  function me(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (i(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function fe(t, n, s, o, r, c, l, d = [-1]) {
    const u = L;
    R(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: c,
      update: e,
      not_equal: r,
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
                r(p.ctx[e], (p.ctx[e] = i)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](i),
                m &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (V.push(e), W(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (m = !0),
      i(p.before_update),
      (p.fragment = !!o && o(p.ctx)),
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
  var be = function (e, t) {
    return (
      (be =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      be(e, t)
    );
  };
  function Ie(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    be(e, t),
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
  function ye(e, t, n, a) {
    return new (n || (n = Promise))(function (i, s) {
      function o(e) {
        try {
          c(a.next(e));
        } catch (e) {
          s(e);
        }
      }
      function r(e) {
        try {
          c(a.throw(e));
        } catch (e) {
          s(e);
        }
      }
      function c(e) {
        var t;
        e.done
          ? i(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(o, r);
      }
      c((a = a.apply(e, t || [])).next());
    });
  }
  function Ce(e, t) {
    var n,
      a,
      i,
      s,
      o = {
        label: 0,
        sent: function () {
          if (1 & i[0]) throw i[1];
          return i[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (s = { next: r(0), throw: r(1), return: r(2) }),
      "function" == typeof Symbol &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function r(s) {
      return function (r) {
        return (function (s) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; o; )
            try {
              if (
                ((n = 1),
                a &&
                  (i =
                    2 & s[0]
                      ? a.return
                      : s[0]
                      ? a.throw || ((i = a.return) && i.call(a), 0)
                      : a.next) &&
                  !(i = i.call(a, s[1])).done)
              )
                return i;
              switch (((a = 0), i && (s = [2 & s[0], i.value]), s[0])) {
                case 0:
                case 1:
                  i = s;
                  break;
                case 4:
                  return o.label++, { value: s[1], done: !1 };
                case 5:
                  o.label++, (a = s[1]), (s = [0]);
                  continue;
                case 7:
                  (s = o.ops.pop()), o.trys.pop();
                  continue;
                default:
                  if (
                    !((i = o.trys),
                    (i = i.length > 0 && i[i.length - 1]) ||
                      (6 !== s[0] && 2 !== s[0]))
                  ) {
                    o = 0;
                    continue;
                  }
                  if (3 === s[0] && (!i || (s[1] > i[0] && s[1] < i[3]))) {
                    o.label = s[1];
                    break;
                  }
                  if (6 === s[0] && o.label < i[1]) {
                    (o.label = i[1]), (i = s);
                    break;
                  }
                  if (i && o.label < i[2]) {
                    (o.label = i[2]), o.ops.push(s);
                    break;
                  }
                  i[2] && o.ops.pop(), o.trys.pop();
                  continue;
              }
              s = t.call(e, o);
            } catch (e) {
              (s = [6, e]), (a = 0);
            } finally {
              n = i = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        })([s, r]);
      };
    }
  }
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
  function $e(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var a,
      i,
      s = n.call(e),
      o = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(a = s.next()).done; )
        o.push(a.value);
    } catch (e) {
      i = { error: e };
    } finally {
      try {
        a && !a.done && (n = s.return) && n.call(s);
      } finally {
        if (i) throw i.error;
      }
    }
    return o;
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
   */
  var Se = (function () {
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
   */ var ve = Object.freeze({
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
   */ function Ee(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var Ae,
    xe = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (Ee(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: Ee,
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
    De = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    Ne = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    _e = {
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
  var Pe = ["touchstart", "pointerdown", "mousedown", "keydown"],
    Oe = ["touchend", "pointerup", "mouseup", "contextmenu"],
    Le = [],
    Re = (function (e) {
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
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return De;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ne;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return _e;
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
              for (var a = Te(Pe), i = a.next(); !i.done; i = a.next()) {
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
              for (var a = Te(Oe), i = a.next(); !i.done; i = a.next()) {
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
            for (var n = Te(Pe), a = n.next(); !a.done; a = n.next()) {
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
            for (var n = Te(Oe), a = n.next(); !a.done; a = n.next()) {
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
                  Le.length > 0 &&
                  Le.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (Le.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (Le = []),
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
            o = s.FG_DEACTIVATION,
            r = s.FG_ACTIVATION,
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
            this.adapter.removeClass(o),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(r),
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
                        o = t.y,
                        r = s + n.left,
                        c = o + n.top;
                      if ("touchstart" === e.type) {
                        var l = e;
                        (a = l.changedTouches[0].pageX - r),
                          (i = l.changedTouches[0].pageY - c);
                      } else {
                        var d = e;
                        (a = d.pageX - r), (i = d.pageY - c);
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
            }, _e.FG_DEACTIVATION_MS)));
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
    })(Se),
    Me = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    ke = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    Fe = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Be = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Fe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Me;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return ke;
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
    })(Se),
    we = (function (e) {
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
        Ie(t, e),
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
            }, ke.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, ke.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
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
              (e = -ke.MAX_TOP_APP_BAR_HEIGHT),
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
    })(Be),
    He = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        Ie(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(Me.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(Me.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(we),
    Ue = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        Ie(t, e),
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
              this.adapter.addClass(Me.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(Me.SHORT_COLLAPSED_CLASS)
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
          this.adapter.removeClass(Me.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(Me.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(Be);
  const Ve = [];
  function Ge(t, n = e) {
    let a;
    const i = new Set();
    function s(e) {
      if (o(t, e) && ((t = e), a)) {
        const e = !Ve.length;
        for (const e of i) e[1](), Ve.push(e, t);
        if (e) {
          for (let e = 0; e < Ve.length; e += 2) Ve[e][0](Ve[e + 1]);
          Ve.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (o, r = e) {
        const c = [o, r];
        return (
          i.add(c),
          1 === i.size && (a = n(s) || e),
          o(t),
          () => {
            i.delete(c), 0 === i.size && (a(), (a = null));
          }
        );
      },
    };
  }
  function je(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function qe(e, t, n, a = { bubbles: !0 }, i = !1) {
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
  function ze(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const a = {};
    for (let i = 0; i < n.length; i++) {
      const s = n[i],
        o = s.indexOf("$");
      (-1 !== o && -1 !== t.indexOf(s.substring(0, o + 1))) ||
        (-1 === t.indexOf(s) && (a[s] = e[s]));
    }
    return a;
  }
  const Ke =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    We =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function Qe(e) {
    let t,
      n = [];
    function a(t) {
      U(e, t);
    }
    return (
      (e.$on = (e, a) => {
        let i = e,
          s = () => {};
        t ? (s = t(i, a)) : n.push([i, a]);
        return (
          i.match(Ke) &&
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
          let o = t,
            r = n,
            c = !1;
          const l = o.match(Ke),
            d = o.match(We),
            u = l || d;
          if (o.match(/^SMUI:\w+:/)) {
            const e = o.split(":");
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
              `The event ${o.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (o = t);
          }
          if (u) {
            const e = o.split(l ? ":" : "$");
            o = e[0];
            const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
            t.passive && ((c = c || {}), (c.passive = !0)),
              t.nonpassive && ((c = c || {}), (c.passive = !1)),
              t.capture && ((c = c || {}), (c.capture = !0)),
              t.once && ((c = c || {}), (c.once = !0)),
              t.preventDefault &&
                ((p = r),
                (r = function (e) {
                  return e.preventDefault(), p.call(this, e);
                })),
              t.stopPropagation &&
                (r = (function (e) {
                  return function (t) {
                    return t.stopPropagation(), e.call(this, t);
                  };
                })(r));
          }
          var p;
          const m = x(e, o, r, c),
            f = () => {
              m();
              const e = i.indexOf(f);
              e > -1 && i.splice(e, 1);
            };
          return i.push(f), o in s || (s[o] = x(e, o, a)), f;
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
  function Xe(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const a = {};
    for (let i = 0; i < n.length; i++) {
      const s = n[i];
      s.substring(0, t.length) === t && (a[s.substring(t.length)] = e[s]);
    }
    return a;
  }
  function Ye(e, t) {
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
  const { window: Ze } = re;
  function Je(e) {
    let n, a, o, r, l, m, f;
    const h = e[22].default,
      b = c(h, e, e[21], null);
    let g = [
        {
          class: (a = je({
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
        { style: (o = Object.entries(e[12]).map(et).concat([e[3]]).join(" ")) },
        e[15],
      ],
      T = {};
    for (let e = 0; e < g.length; e += 1) T = t(T, g[e]);
    return {
      c() {
        (n = $("header")), b && b.c(), N(n, T);
      },
      m(t, a) {
        y(t, n, a),
          b && b.m(n, null),
          e[25](n),
          (l = !0),
          m ||
            ((f = [
              x(Ze, "resize", e[23]),
              x(Ze, "scroll", e[24]),
              I((r = Ye.call(null, n, e[1]))),
              I(e[13].call(null, n)),
              x(n, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (m = !0));
      },
      p(e, t) {
        b &&
          b.p &&
          (!l || 2097152 & t[0]) &&
          u(b, h, e, e[21], l ? d(h, e[21], t, null) : p(e[21]), null),
          N(
            n,
            (T = ce(g, [
              (!l ||
                (2293 & t[0] &&
                  a !==
                    (a = je({
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
                  o !==
                    (o = Object.entries(e[12])
                      .map(et)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              32768 & t[0] && e[15],
            ]))
          ),
          r && s(r.update) && 2 & t[0] && r.update.call(null, e[1]);
      },
      i(e) {
        l || (se(b, e), (l = !0));
      },
      o(e) {
        oe(b, e), (l = !1);
      },
      d(t) {
        t && C(n), b && b.d(t), e[25](null), (m = !1), i(f);
      },
    };
  }
  const et = ([e, t]) => `${e}: ${t};`;
  function tt(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
    let l = () => {};
    function d(e) {
      return e === l;
    }
    let { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { variant: b = "standard" } = n,
      { color: I = "primary" } = n,
      { collapsed: g = l } = n;
    const y = !d(g) && !!g;
    d(g) && (g = !1);
    let C,
      T,
      $,
      { prominent: S = !1 } = n,
      { dense: v = !1 } = n,
      { scrollTarget: E } = n,
      A = {},
      x = {},
      D = {
        subscribe: Ge({ variant: b, prominent: S, dense: v }, (e) => {
          a(18, ($ = e));
        }).subscribe,
      };
    let N,
      _ = b;
    function P() {
      return new ({ static: Be, short: Ue, fixed: He }[b] || we)({
        hasClass: O,
        addClass: L,
        removeClass: R,
        setStyle: F,
        getTopAppBarHeight: () => C.clientHeight,
        notifyNavigationIconClicked: () =>
          qe(C, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == E ? window.pageYOffset : E.scrollTop,
        getTotalActionItems: () =>
          C.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function O(e) {
      return e in A ? A[e] : w().classList.contains(e);
    }
    function L(e) {
      A[e] || a(11, (A[e] = !0), A);
    }
    function R(e) {
      (e in A && !A[e]) || a(11, (A[e] = !1), A);
    }
    function F(e, t) {
      x[e] != t &&
        ("" === t || null == t
          ? (delete x[e], a(12, x), a(20, _), a(4, b), a(9, T))
          : a(12, (x[e] = t), x));
    }
    function B() {
      T &&
        (T.handleTargetScroll(),
        "short" === b && a(0, (g = "isCollapsed" in T && T.isCollapsed)));
    }
    function w() {
      return C;
    }
    k(
      () => (
        a(9, (T = P())),
        T.init(),
        () => {
          T.destroy();
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
          "variant" in e && a(4, (b = e.variant)),
          "color" in e && a(5, (I = e.color)),
          "collapsed" in e && a(0, (g = e.collapsed)),
          "prominent" in e && a(6, (S = e.prominent)),
          "dense" in e && a(7, (v = e.dense)),
          "scrollTarget" in e && a(8, (E = e.scrollTarget)),
          "$$scope" in e && a(21, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          $ &&
          $({ variant: b, prominent: S, dense: v }),
          1049104 & e.$$.dirty[0] &&
            _ !== b &&
            T &&
            (a(20, (_ = b)),
            T.destroy(),
            a(11, (A = {})),
            a(12, (x = {})),
            a(9, (T = P())),
            T.init()),
          528 & e.$$.dirty[0] &&
            T &&
            "short" === b &&
            "setAlwaysCollapsed" in T &&
            T.setAlwaysCollapsed(y),
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
        b,
        I,
        S,
        v,
        E,
        T,
        C,
        A,
        x,
        c,
        B,
        s,
        function () {
          return D;
        },
        w,
        $,
        N,
        _,
        r,
        o,
        () => "short" !== b && "fixed" !== b && T && T.handleWindowResize(),
        () => null == E && B(),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (C = e), a(10, C);
          });
        },
        () => T && T.handleNavigationClick(),
      ]
    );
  }
  class nt extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          tt,
          Je,
          o,
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
  function at(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("div")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function it(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  class st extends he {
    constructor(e) {
      super(), fe(this, e, it, at, o, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function ot(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function rt(e) {
    let n, a, i;
    const s = [
      { use: [e[7], ...e[0]] },
      { class: je({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var o = e[2];
    function r(e) {
      let n = { $$slots: { default: [ot] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o && ((n = new o(r(e))), e[11](n)),
      {
        c() {
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            499 & t
              ? ce(s, [
                  129 & t && { use: [e[7], ...e[0]] },
                  50 & t && { class: je({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & t && le(e[6]),
                  256 & t && le(e[8]),
                ])
              : {};
          if (
            (4096 & t && (i.$$scope = { dirty: t, ctx: e }), o !== (o = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
                e[11](n),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[11](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  const ct = {
    component: st,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function lt(e, n, a) {
    const i = ["use", "class", "component", "getElement"];
    let s,
      o = f(n, i),
      { $$slots: r = {}, $$scope: c } = n,
      { use: l = [] } = n,
      { class: d = "" } = n;
    const u = ct.class,
      p = {},
      h = [],
      b = ct.contexts,
      I = ct.props;
    let { component: g = ct.component } = n;
    Object.entries(ct.classMap).forEach(([e, t]) => {
      const n = H(t);
      n &&
        "subscribe" in n &&
        h.push(
          n.subscribe((t) => {
            a(4, (p[e] = t), p);
          })
        );
    });
    const y = Qe(M());
    for (let e in b) b.hasOwnProperty(e) && w(e, b[e]);
    return (
      F(() => {
        for (const e of h) e();
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(8, (o = f(n, i))),
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
        I,
        y,
        o,
        function () {
          return s.getElement();
        },
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (s = e), a(3, s);
          });
        },
        c,
      ]
    );
  }
  class dt extends he {
    constructor(e) {
      super(),
        fe(this, e, lt, rt, o, {
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
  const ut = Object.assign({}, ct);
  function pt(e) {
    return new Proxy(dt, {
      construct: function (t, n) {
        return Object.assign(ct, ut, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(ct, ut, e), t[n];
      },
    });
  }
  function mt(e) {
    let n, a, o, r, l;
    const m = e[7].default,
      f = c(m, e, e[6], null);
    let h = [{ href: e[1] }, e[4]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("a")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[8](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[3].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 64 & t) &&
          u(f, m, e, e[6], o ? d(m, e[6], t, null) : p(e[6]), null),
          N(n, (b = ce(h, [(!o || 2 & t) && { href: e[1] }, 16 & t && e[4]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[8](null), (r = !1), i(l);
      },
    };
  }
  function ft(e, n, a) {
    const i = ["use", "href", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n,
      { href: l = "javascript:void(0);" } = n;
    const d = Qe(M());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(4, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "href" in e && a(1, (l = e.href)),
          "$$scope" in e && a(6, (r = e.$$scope));
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
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (u = e), a(2, u);
          });
        },
      ]
    );
  }
  function ht(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("button")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          n.autofocus && n.focus(),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function bt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function It(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("h1")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function gt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function yt(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("h2")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function Ct(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function Tt(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("h3")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function $t(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function St(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("li")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function vt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function Et(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("nav")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function At(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  function xt(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("span")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function Dt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  class Nt extends he {
    constructor(e) {
      super(), fe(this, e, Dt, xt, o, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function _t(e) {
    let n, a, o, r, l;
    const m = e[6].default,
      f = c(m, e, e[5], null);
    let h = [e[3]],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("ul")), f && f.c(), N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          f && f.m(n, null),
          e[7](n),
          (o = !0),
          r ||
            ((l = [I((a = Ye.call(null, n, e[0]))), I(e[2].call(null, n))]),
            (r = !0));
      },
      p(e, [t]) {
        f &&
          f.p &&
          (!o || 32 & t) &&
          u(f, m, e, e[5], o ? d(m, e[5], t, null) : p(e[5]), null),
          N(n, (b = ce(h, [8 & t && e[3]]))),
          a && s(a.update) && 1 & t && a.update.call(null, e[0]);
      },
      i(e) {
        o || (se(f, e), (o = !0));
      },
      o(e) {
        oe(f, e), (o = !1);
      },
      d(t) {
        t && C(n), f && f.d(t), e[7](null), (r = !1), i(l);
      },
    };
  }
  function Pt(e, n, a) {
    const i = ["use", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n,
      { use: c = [] } = n;
    const l = Qe(M());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(3, (s = f(n, i))),
          "use" in e && a(0, (c = e.use)),
          "$$scope" in e && a(5, (r = e.$$scope));
      }),
      [
        c,
        d,
        l,
        s,
        function () {
          return d;
        },
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (d = e), a(1, d);
          });
        },
      ]
    );
  }
  const Ot = class extends he {
      constructor(e) {
        super(), fe(this, e, ft, mt, o, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    Lt = class extends he {
      constructor(e) {
        super(), fe(this, e, bt, ht, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Rt = st,
    Mt = class extends he {
      constructor(e) {
        super(), fe(this, e, gt, It, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    kt = class extends he {
      constructor(e) {
        super(), fe(this, e, Ct, yt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ft = class extends he {
      constructor(e) {
        super(), fe(this, e, $t, Tt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Bt = class extends he {
      constructor(e) {
        super(), fe(this, e, vt, St, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    wt = class extends he {
      constructor(e) {
        super(), fe(this, e, At, Et, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ht = Nt,
    Ut = class extends he {
      constructor(e) {
        super(), fe(this, e, Pt, _t, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var Vt = pt({ class: "mdc-top-app-bar__row", component: Rt });
  function Gt(e) {
    let n, a, o, r, l, m;
    const f = e[9].default,
      h = c(f, e, e[8], null);
    let b = [
        {
          class: (a = je({
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
    for (let e = 0; e < b.length; e += 1) g = t(g, b[e]);
    return {
      c() {
        (n = $("section")), h && h.c(), N(n, g);
      },
      m(t, a) {
        y(t, n, a),
          h && h.m(n, null),
          e[10](n),
          (r = !0),
          l ||
            ((m = [I((o = Ye.call(null, n, e[0]))), I(e[5].call(null, n))]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!r || 256 & t) &&
          u(h, f, e, e[8], r ? d(f, e[8], t, null) : p(e[8]), null),
          N(
            n,
            (g = ce(b, [
              (!r ||
                (6 & t &&
                  a !==
                    (a = je({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: a },
              8 & t && (e[3] ? { role: "toolbar" } : {}),
              64 & t && e[6],
            ]))
          ),
          o && s(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i(e) {
        r || (se(h, e), (r = !0));
      },
      o(e) {
        oe(h, e), (r = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[10](null), (l = !1), i(m);
      },
    };
  }
  function jt(e, n, a) {
    const i = ["use", "class", "align", "toolbar", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
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
          "$$scope" in e && a(8, (r = e.$$scope));
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
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(4, l);
          });
        },
      ]
    );
  }
  var qt = pt({ class: "mdc-top-app-bar__title", component: Ht });
  const zt = class extends he {
    constructor(e) {
      super(),
        fe(this, e, jt, Gt, o, {
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
   */ var Kt = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Wt = (function (e) {
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
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Kt;
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
    })(Se),
    Qt = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Xt = (function (e) {
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
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Qt;
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
          this.adapter.removeClass(Qt.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Qt.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(Qt.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(Qt.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(Qt.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Qt.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Se),
    Yt = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    Zt = { NOTCH_ELEMENT_PADDING: 8 },
    Jt = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    en = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Yt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Jt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Zt;
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
          e > 0 && (e += Zt.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Se),
    tn = {
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
    nn = {
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
    an = { LABEL_SCALE: 0.75 },
    sn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    on = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    rn = ["mousedown", "touchstart"],
    cn = ["click", "keydown"],
    ln = (function (e) {
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
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return nn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return tn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return an;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return on.indexOf(e) >= 0;
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
            for (var i = Te(rn), s = i.next(); !s.done; s = i.next()) {
              var o = s.value;
              this.adapter.registerInputInteractionHandler(
                o,
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
            for (var r = Te(cn), c = r.next(); !c.done; c = r.next()) {
              o = c.value;
              this.adapter.registerTextFieldInteractionHandler(
                o,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              c && !c.done && (a = r.return) && a.call(r);
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
            for (var i = Te(rn), s = i.next(); !s.done; s = i.next()) {
              var o = s.value;
              this.adapter.deregisterInputInteractionHandler(
                o,
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
            for (var r = Te(cn), c = r.next(); !c.done; c = r.next()) {
              o = c.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                o,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              c && !c.done && (a = r.return) && a.call(r);
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
              sn.indexOf(e) > -1 &&
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
              var t = this.adapter.getLabelWidth() * an.LABEL_SCALE;
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
              ? this.adapter.setInputAttr(tn.ARIA_DESCRIBEDBY, i)
              : this.adapter.removeInputAttr(tn.ARIA_DESCRIBEDBY);
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
    })(Se),
    dn = "mdc-dom-focus-sentinel",
    un = (function () {
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
            .call(this.root.querySelectorAll("." + dn))
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
                  !e.classList.contains(dn) &&
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
            e.classList.add(dn),
            e
          );
        }),
        e
      );
    })(),
    pn = Object.freeze({ __proto__: null, FocusTrap: un }),
    mn = "Unknown",
    fn = "Backspace",
    hn = "Enter",
    bn = "Spacebar",
    In = "PageUp",
    gn = "PageDown",
    yn = "End",
    Cn = "Home",
    Tn = "ArrowLeft",
    $n = "ArrowUp",
    Sn = "ArrowRight",
    vn = "ArrowDown",
    En = "Delete",
    An = "Escape",
    xn = "Tab",
    Dn = new Set();
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
   */ Dn.add(fn),
    Dn.add(hn),
    Dn.add(bn),
    Dn.add(In),
    Dn.add(gn),
    Dn.add(yn),
    Dn.add(Cn),
    Dn.add(Tn),
    Dn.add($n),
    Dn.add(Sn),
    Dn.add(vn),
    Dn.add(En),
    Dn.add(An),
    Dn.add(xn);
  var Nn = 8,
    _n = 13,
    Pn = 32,
    On = 33,
    Ln = 34,
    Rn = 35,
    Mn = 36,
    kn = 37,
    Fn = 38,
    Bn = 39,
    wn = 40,
    Hn = 46,
    Un = 27,
    Vn = 9,
    Gn = new Map();
  Gn.set(Nn, fn),
    Gn.set(_n, hn),
    Gn.set(Pn, bn),
    Gn.set(On, In),
    Gn.set(Ln, gn),
    Gn.set(Rn, yn),
    Gn.set(Mn, Cn),
    Gn.set(kn, Tn),
    Gn.set(Fn, $n),
    Gn.set(Bn, Sn),
    Gn.set(wn, vn),
    Gn.set(Hn, En),
    Gn.set(Un, An),
    Gn.set(Vn, xn);
  var jn = new Set();
  function qn(e) {
    var t = e.key;
    if (Dn.has(t)) return t;
    var n = Gn.get(e.keyCode);
    return n || mn;
  }
  function zn(e) {
    let t;
    const n = e[9].default,
      a = c(n, e, e[11], null);
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
          (!t || 2048 & i) &&
          u(a, n, e, e[11], t ? d(n, e[11], i, null) : p(e[11]), null);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Kn(e) {
    let n, a, i;
    const s = [
      { use: [e[4], ...e[0]] },
      {
        class: je({
          [e[1]]: !0,
          "mdc-button__label": "button" === e[5],
          "mdc-fab__label": "fab" === e[5],
          "mdc-tab__text-label": "tab" === e[5],
          "mdc-image-list__label": "image-list" === e[5],
          "mdc-snackbar__label": "snackbar" === e[5],
          "mdc-banner__text": "banner" === e[5],
          "mdc-segmented-button__label": "segmented-button" === e[5],
          "mdc-data-table__pagination-rows-per-page-label":
            "data-table:pagination" === e[5],
          "mdc-data-table__header-cell-label":
            "data-table:sortable-header-cell" === e[5],
        }),
      },
      "snackbar" === e[5] ? { "aria-atomic": "false" } : {},
      { tabindex: e[6] },
      e[7],
    ];
    var o = e[2];
    function r(e) {
      let n = { $$slots: { default: [zn] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o && ((n = new o(r(e))), e[10](n)),
      {
        c() {
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            243 & t
              ? ce(s, [
                  17 & t && { use: [e[4], ...e[0]] },
                  34 & t && {
                    class: je({
                      [e[1]]: !0,
                      "mdc-button__label": "button" === e[5],
                      "mdc-fab__label": "fab" === e[5],
                      "mdc-tab__text-label": "tab" === e[5],
                      "mdc-image-list__label": "image-list" === e[5],
                      "mdc-snackbar__label": "snackbar" === e[5],
                      "mdc-banner__text": "banner" === e[5],
                      "mdc-segmented-button__label":
                        "segmented-button" === e[5],
                      "mdc-data-table__pagination-rows-per-page-label":
                        "data-table:pagination" === e[5],
                      "mdc-data-table__header-cell-label":
                        "data-table:sortable-header-cell" === e[5],
                    }),
                  },
                  32 & t &&
                    le("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & t && { tabindex: e[6] },
                  128 & t && le(e[7]),
                ])
              : {};
          if (
            (2048 & t && (i.$$scope = { dirty: t, ctx: e }), o !== (o = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
                e[10](n),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[10](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  function Wn(e, n, a) {
    const i = ["use", "class", "component", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
    let l,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { component: p = Nt } = n;
    const h = H("SMUI:label:context"),
      b = H("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(7, (s = f(n, i))),
          "use" in e && a(0, (d = e.use)),
          "class" in e && a(1, (u = e.class)),
          "component" in e && a(2, (p = e.component)),
          "$$scope" in e && a(11, (r = e.$$scope));
      }),
      [
        d,
        u,
        p,
        l,
        c,
        h,
        b,
        s,
        function () {
          return l.getElement();
        },
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(3, l);
          });
        },
        r,
      ]
    );
  }
  jn.add(In),
    jn.add(gn),
    jn.add(yn),
    jn.add(Cn),
    jn.add(Tn),
    jn.add($n),
    jn.add(Sn),
    jn.add(vn);
  function Qn(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Xn(e, t, n) {
    let a,
      { $$slots: i = {}, $$scope: s } = t,
      { key: o } = t,
      { value: c } = t;
    const l = Ge(c);
    return (
      r(e, l, (e) => n(5, (a = e))),
      w(o, l),
      F(() => {
        l.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (o = e.key)),
          "value" in e && n(2, (c = e.value)),
          "$$scope" in e && n(3, (s = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && b(l, (a = c), a);
      }),
      [l, o, c, s, i]
    );
  }
  class Yn extends he {
    constructor(e) {
      super(), fe(this, e, Xn, Qn, o, { key: 1, value: 2 });
    }
  }
  const Zn = class extends he {
      constructor(e) {
        super(),
          fe(this, e, Wn, Kn, o, {
            use: 0,
            class: 1,
            component: 2,
            getElement: 8,
          });
      }
      get getElement() {
        return this.$$.ctx[8];
      }
    },
    { applyPassive: Jn } = ve,
    { matches: ea } = xe;
  function ta(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: a = !1,
      disabled: i = !1,
      color: s,
      active: o,
      rippleElement: r,
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
      b = H("SMUI:addLayoutListener"),
      I = o,
      g = c,
      y = l;
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
          I !== o &&
          ((I = o), o ? f.activate() : !1 === o && f.deactivate()),
        t && !f
          ? ((f = new Re({
              addClass: d,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    a = e.CSS;
                  if ("boolean" == typeof Ae && !t) return Ae;
                  if (!a || "function" != typeof a.supports) return !1;
                  var i = a.supports("--css-vars", "yes"),
                    s =
                      a.supports("(--css-vars: yes)") &&
                      a.supports("color", "#00000000");
                  return (n = i || s), t || (Ae = n), n;
                })(window),
              computeBoundingRect: () => (r || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, Jn()),
              deregisterInteractionHandler: (t, n) =>
                (c || e).removeEventListener(t, n, Jn()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == o ? ea(l || e, ":active") : o),
              isSurfaceDisabled: () => !!i,
              isUnbounded: () => !!a,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, Jn()),
              registerInteractionHandler: (t, n) =>
                (c || e).addEventListener(t, n, Jn()),
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
          (g === c && y === l) ||
          ((g = c),
          (y = l),
          f.destroy(),
          requestAnimationFrame(() => {
            f && (f.init(), f.setUnbounded(a));
          })),
        !t && a && d("mdc-ripple-upgraded--unbounded");
    }
    return (
      C(),
      b &&
        (h = b(function () {
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
            active: o,
            rippleElement: r,
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
  function na(e) {
    let n, a, o, r, l, m, f, h;
    const b = e[22].default,
      g = c(b, e, e[21], null);
    let T = [
        {
          class: (a = je({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (o = Object.entries(e[9]).map(oa).concat([e[4]]).join(" ")) },
        { for: (r = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      S = {};
    for (let e = 0; e < T.length; e += 1) S = t(S, T[e]);
    return {
      c() {
        (n = $("label")), g && g.c(), N(n, S);
      },
      m(t, a) {
        y(t, n, a),
          g && g.m(n, null),
          e[24](n),
          (m = !0),
          f ||
            ((h = [I((l = Ye.call(null, n, e[2]))), I(e[10].call(null, n))]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!m || 2097152 & t) &&
          u(g, b, e, e[21], m ? d(b, e[21], t, null) : p(e[21]), null),
          N(
            n,
            (S = ce(T, [
              (!m ||
                (267 & t &&
                  a !==
                    (a = je({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: a },
              (!m ||
                (528 & t &&
                  o !==
                    (o = Object.entries(e[9])
                      .map(oa)
                      .concat([e[4]])
                      .join(" ")))) && { style: o },
              (!m ||
                (32 & t &&
                  r !== (r = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: r,
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
        oe(g, e), (m = !1);
      },
      d(t) {
        t && C(n), g && g.d(t), e[24](null), (f = !1), i(h);
      },
    };
  }
  function aa(e) {
    let n, a, o, r, l, m, f;
    const h = e[22].default,
      b = c(h, e, e[21], null);
    let g = [
        {
          class: (a = je({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (o = Object.entries(e[9]).map(sa).concat([e[4]]).join(" ")) },
        e[12],
      ],
      T = {};
    for (let e = 0; e < g.length; e += 1) T = t(T, g[e]);
    return {
      c() {
        (n = $("span")), b && b.c(), N(n, T);
      },
      m(t, a) {
        y(t, n, a),
          b && b.m(n, null),
          e[23](n),
          (l = !0),
          m ||
            ((f = [I((r = Ye.call(null, n, e[2]))), I(e[10].call(null, n))]),
            (m = !0));
      },
      p(e, t) {
        b &&
          b.p &&
          (!l || 2097152 & t) &&
          u(b, h, e, e[21], l ? d(h, e[21], t, null) : p(e[21]), null),
          N(
            n,
            (T = ce(g, [
              (!l ||
                (267 & t &&
                  a !==
                    (a = je({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: a },
              (!l ||
                (528 & t &&
                  o !==
                    (o = Object.entries(e[9])
                      .map(sa)
                      .concat([e[4]])
                      .join(" ")))) && { style: o },
              4096 & t && e[12],
            ]))
          ),
          r && s(r.update) && 4 & t && r.update.call(null, e[2]);
      },
      i(e) {
        l || (se(b, e), (l = !0));
      },
      o(e) {
        oe(b, e), (l = !1);
      },
      d(t) {
        t && C(n), b && b.d(t), e[23](null), (m = !1), i(f);
      },
    };
  }
  function ia(e) {
    let t, n, a, i;
    const s = [aa, na],
      o = [];
    function r(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = r(e)),
      (n = o[t] = s[t](e)),
      {
        c() {
          n.c(), (a = A());
        },
        m(e, n) {
          o[t].m(e, n), y(e, a, n), (i = !0);
        },
        p(e, [i]) {
          let c = t;
          (t = r(e)),
            t === c
              ? o[t].p(e, i)
              : (ae(),
                oe(o[c], 1, 1, () => {
                  o[c] = null;
                }),
                ie(),
                (n = o[t]),
                n ? n.p(e, i) : ((n = o[t] = s[t](e)), n.c()),
                se(n, 1),
                n.m(a.parentNode, a));
        },
        i(e) {
          i || (se(n), (i = !0));
        },
        o(e) {
          oe(n), (i = !1);
        },
        d(e) {
          o[t].d(e), e && C(a);
        },
      }
    );
  }
  const sa = ([e, t]) => `${e}: ${t};`,
    oa = ([e, t]) => `${e}: ${t};`;
  function ra(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    var c;
    const l = Qe(M());
    let d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { style: b = "" } = n,
      { for: I } = n,
      { floatAbove: g = !1 } = n,
      { required: y = !1 } = n,
      { wrapped: C = !1 } = n,
      T = {},
      $ = {},
      S = null !== (c = H("SMUI:generic:input:props")) && void 0 !== c ? c : {},
      v = g,
      E = y;
    function A(e) {
      T[e] || a(8, (T[e] = !0), T);
    }
    function x(e) {
      (e in T && !T[e]) || a(8, (T[e] = !1), T);
    }
    function D(e, t) {
      $[e] != t &&
        ("" === t || null == t ? (delete $[e], a(9, $)) : a(9, ($[e] = t), $));
    }
    function N(e) {
      e in $ && (delete $[e], a(9, $));
    }
    function _() {
      return d;
    }
    return (
      k(() => {
        a(
          18,
          (u = new Wt({
            addClass: A,
            removeClass: x,
            getWidth: () => {
              var e, t;
              const n = _(),
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
            registerInteractionHandler: (e, t) => _().addEventListener(e, t),
            deregisterInteractionHandler: (e, t) =>
              _().removeEventListener(e, t),
          }))
        );
        const e = {
          get element() {
            return _();
          },
          addStyle: D,
          removeStyle: N,
        };
        return (
          qe(d, "SMUIFloatingLabel:mount", e),
          u.init(),
          () => {
            qe(d, "SMUIFloatingLabel:unmount", e), u.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(12, (s = f(n, i))),
          "use" in e && a(2, (p = e.use)),
          "class" in e && a(3, (h = e.class)),
          "style" in e && a(4, (b = e.style)),
          "for" in e && a(5, (I = e.for)),
          "floatAbove" in e && a(0, (g = e.floatAbove)),
          "required" in e && a(1, (y = e.required)),
          "wrapped" in e && a(6, (C = e.wrapped)),
          "$$scope" in e && a(21, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && u && v !== g && (a(19, (v = g)), u.float(g)),
          1310722 & e.$$.dirty &&
            u &&
            E !== y &&
            (a(20, (E = y)), u.setRequired(y));
      }),
      [
        g,
        y,
        p,
        h,
        b,
        I,
        C,
        d,
        T,
        $,
        l,
        S,
        s,
        function (e) {
          u.shake(e);
        },
        function (e) {
          a(0, (g = e));
        },
        function (e) {
          a(1, (y = e));
        },
        function () {
          return u.getWidth();
        },
        _,
        u,
        v,
        E,
        r,
        o,
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
  class ca extends he {
    constructor(e) {
      super(),
        fe(this, e, ra, ia, o, {
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
  function la(n) {
    let a,
      o,
      r,
      c,
      l,
      d,
      u = [
        {
          class: (o = je({
            [n[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": n[3],
            ...n[5],
          })),
        },
        { style: (r = Object.entries(n[6]).map(da).concat([n[2]]).join(" ")) },
        n[8],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (a = $("div")), N(a, p);
      },
      m(e, t) {
        y(e, a, t),
          n[13](a),
          l ||
            ((d = [I((c = Ye.call(null, a, n[0]))), I(n[7].call(null, a))]),
            (l = !0));
      },
      p(e, [t]) {
        N(
          a,
          (p = ce(u, [
            42 & t &&
              o !==
                (o = je({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: o },
            68 & t &&
              r !==
                (r = Object.entries(e[6]).map(da).concat([e[2]]).join(" ")) && {
                style: r,
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
  const da = ([e, t]) => `${e}: ${t};`;
  function ua(e, n, a) {
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
    const o = Qe(M());
    let r,
      c,
      { use: l = [] } = n,
      { class: d = "" } = n,
      { style: u = "" } = n,
      { active: p = !1 } = n,
      h = {},
      b = {};
    function I(e) {
      return e in h ? h[e] : T().classList.contains(e);
    }
    function g(e) {
      h[e] || a(5, (h[e] = !0), h);
    }
    function y(e) {
      (e in h && !h[e]) || a(5, (h[e] = !1), h);
    }
    function C(e, t) {
      b[e] != t &&
        ("" === t || null == t ? (delete b[e], a(6, b)) : a(6, (b[e] = t), b));
    }
    function T() {
      return r;
    }
    return (
      k(
        () => (
          (c = new Xt({
            addClass: g,
            removeClass: y,
            hasClass: I,
            setStyle: C,
            registerEventHandler: (e, t) => T().addEventListener(e, t),
            deregisterEventHandler: (e, t) => T().removeEventListener(e, t),
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
        r,
        h,
        b,
        o,
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
        T,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (r = e), a(4, r);
          });
        },
      ]
    );
  }
  class pa extends he {
    constructor(e) {
      super(),
        fe(this, e, ua, la, o, {
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
  function ma(e) {
    let t, n, a;
    const i = e[14].default,
      s = c(i, e, e[13], null);
    return {
      c() {
        (t = $("div")),
          s && s.c(),
          D(t, "class", "mdc-notched-outline__notch"),
          D(t, "style", (n = Object.entries(e[7]).map(ha).join(" ")));
      },
      m(e, n) {
        y(e, t, n), s && s.m(t, null), (a = !0);
      },
      p(e, o) {
        s &&
          s.p &&
          (!a || 8192 & o) &&
          u(s, i, e, e[13], a ? d(i, e[13], o, null) : p(e[13]), null),
          (!a ||
            (128 & o && n !== (n = Object.entries(e[7]).map(ha).join(" ")))) &&
            D(t, "style", n);
      },
      i(e) {
        a || (se(s, e), (a = !0));
      },
      o(e) {
        oe(s, e), (a = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function fa(e) {
    let n,
      a,
      o,
      r,
      c,
      l,
      d,
      u,
      p,
      m,
      f = !e[3] && ma(e),
      h = [
        {
          class: (l = je({
            [e[1]]: !0,
            "mdc-notched-outline": !0,
            "mdc-notched-outline--notched": e[2],
            "mdc-notched-outline--no-label": e[3],
            ...e[6],
          })),
        },
        e[9],
      ],
      b = {};
    for (let e = 0; e < h.length; e += 1) b = t(b, h[e]);
    return {
      c() {
        (n = $("div")),
          (a = $("div")),
          (o = E()),
          f && f.c(),
          (r = E()),
          (c = $("div")),
          D(a, "class", "mdc-notched-outline__leading"),
          D(c, "class", "mdc-notched-outline__trailing"),
          N(n, b);
      },
      m(t, i) {
        y(t, n, i),
          g(n, a),
          g(n, o),
          f && f.m(n, null),
          g(n, r),
          g(n, c),
          e[15](n),
          (u = !0),
          p ||
            ((m = [
              I((d = Ye.call(null, n, e[0]))),
              I(e[8].call(null, n)),
              x(n, "SMUIFloatingLabel:mount", e[16]),
              x(n, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [t]) {
        e[3]
          ? f &&
            (ae(),
            oe(f, 1, 1, () => {
              f = null;
            }),
            ie())
          : f
          ? (f.p(e, t), 8 & t && se(f, 1))
          : ((f = ma(e)), f.c(), se(f, 1), f.m(n, r)),
          N(
            n,
            (b = ce(h, [
              (!u ||
                (78 & t &&
                  l !==
                    (l = je({
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
        oe(f), (u = !1);
      },
      d(t) {
        t && C(n), f && f.d(), e[15](null), (p = !1), i(m);
      },
    };
  }
  const ha = ([e, t]) => `${e}: ${t};`;
  function ba(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
    let l,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { notched: b = !1 } = n,
      { noLabel: I = !1 } = n,
      g = {},
      y = {};
    function C(e) {
      g[e] || a(6, (g[e] = !0), g);
    }
    function T(e) {
      (e in g && !g[e]) || a(6, (g[e] = !1), g);
    }
    k(
      () => (
        (d = new en({
          addClass: C,
          removeClass: T,
          setNotchWidthProperty: (e) => {
            return (
              (n = e + "px"),
              void (
                y[(t = "width")] != n &&
                ("" === n || null == n
                  ? (delete y[t], a(7, y))
                  : a(7, (y[t] = n), y))
              )
            );
            var t, n;
          },
          removeNotchWidthProperty: () => {
            var e;
            (e = "width") in y && (delete y[e], a(7, y));
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
          "notched" in e && a(2, (b = e.notched)),
          "noLabel" in e && a(3, (I = e.noLabel)),
          "$$scope" in e && a(13, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (u
            ? (u.addStyle("transition-duration", "0s"),
              C("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                u && u.removeStyle("transition-duration");
              }))
            : T("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        h,
        b,
        I,
        u,
        l,
        g,
        y,
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
        r,
        o,
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
  class Ia extends he {
    constructor(e) {
      super(),
        fe(this, e, ba, fa, o, {
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
  var ga = pt({ class: "mdc-text-field-helper-line", component: Rt }),
    ya = pt({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: Ht,
    }),
    Ca = pt({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: Ht,
    });
  function Ta(n) {
    let a,
      o,
      r,
      c,
      l,
      d = [
        { class: (o = je({ [n[1]]: !0, "mdc-text-field__input": !0 })) },
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
        (a = $("input")), N(a, u);
      },
      m(e, t) {
        y(e, a, t),
          a.autofocus && a.focus(),
          n[26](a),
          c ||
            ((l = [
              I((r = Ye.call(null, a, n[0]))),
              I(n[7].call(null, a)),
              x(a, "input", n[27]),
              x(a, "change", n[9]),
              x(a, "blur", n[24]),
              x(a, "focus", n[25]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        N(
          a,
          (u = ce(d, [
            2 & t &&
              o !== (o = je({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: o,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          r && s(r.update) && 1 & t && r.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[26](null), (c = !1), i(l);
      },
    };
  }
  function $a(e, n, a) {
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
    const o = Qe(M());
    let r = () => {};
    let { use: c = [] } = n,
      { class: l = "" } = n,
      { type: d = "text" } = n,
      { placeholder: u = " " } = n,
      { value: p = r } = n;
    const h = (function (e) {
      return e === r;
    })(p);
    h && (p = "");
    let { files: b = null } = n,
      { dirty: I = !1 } = n,
      { invalid: g = !1 } = n,
      { updateInvalid: y = !0 } = n,
      { emptyValueNull: C = null === p } = n;
    h && C && (p = null);
    let T,
      { emptyValueUndefined: $ = void 0 === p } = n;
    h && $ && (p = void 0);
    let S = {},
      v = {};
    function E(e) {
      if ("file" !== d)
        if ("" === e.currentTarget.value && C) a(11, (p = null));
        else if ("" === e.currentTarget.value && $) a(11, (p = void 0));
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
      else a(12, (b = e.currentTarget.files));
    }
    function A() {
      return T;
    }
    k(() => {
      y && a(14, (g = T.matches(":invalid")));
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
          "files" in e && a(12, (b = e.files)),
          "dirty" in e && a(13, (I = e.dirty)),
          "invalid" in e && a(14, (g = e.invalid)),
          "updateInvalid" in e && a(15, (y = e.updateInvalid)),
          "emptyValueNull" in e && a(16, (C = e.emptyValueNull)),
          "emptyValueUndefined" in e && a(17, ($ = e.emptyValueUndefined));
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
        T,
        S,
        o,
        E,
        function (e) {
          ("file" !== d && "range" !== d) || E(e),
            a(13, (I = !0)),
            y && a(14, (g = T.matches(":invalid")));
        },
        s,
        p,
        b,
        I,
        g,
        y,
        C,
        $,
        function (e) {
          var t;
          return e in S
            ? null !== (t = S[e]) && void 0 !== t
              ? t
              : null
            : A().getAttribute(e);
        },
        function (e, t) {
          S[e] !== t && a(6, (S[e] = t), S);
        },
        function (e) {
          (e in S && null == S[e]) || a(6, (S[e] = void 0), S);
        },
        function () {
          A().focus();
        },
        function () {
          A().blur();
        },
        A,
        function (t) {
          U.call(this, e, t);
        },
        function (t) {
          U.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (T = e), a(5, T);
          });
        },
        (e) => "file" !== d && E(e),
      ]
    );
  }
  class Sa extends he {
    constructor(e) {
      super(),
        fe(this, e, $a, Ta, o, {
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
  function va(n) {
    let a,
      o,
      r,
      c,
      l,
      d,
      u = [
        { class: (o = je({ [n[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (r = `${n[4] ? "" : "resize: none; "}${n[3]}`) },
        n[6],
        n[9],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (a = $("textarea")), N(a, p);
      },
      m(e, t) {
        y(e, a, t),
          a.autofocus && a.focus(),
          n[21](a),
          P(a, n[0]),
          l ||
            ((d = [
              I((c = Ye.call(null, a, n[1]))),
              I(n[7].call(null, a)),
              x(a, "change", n[8]),
              x(a, "blur", n[19]),
              x(a, "focus", n[20]),
              x(a, "input", n[22]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        N(
          a,
          (p = ce(u, [
            4 & t &&
              o !== (o = je({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: o,
              },
            24 & t &&
              r !== (r = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: r,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          c && s(c.update) && 2 & t && c.update.call(null, e[1]),
          1 & t && P(a, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(a), n[21](null), (l = !1), i(d);
      },
    };
  }
  function Ea(e, n, a) {
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
    const o = Qe(M());
    let r,
      { use: c = [] } = n,
      { class: l = "" } = n,
      { style: d = "" } = n,
      { value: u = "" } = n,
      { dirty: p = !1 } = n,
      { invalid: h = !1 } = n,
      { updateInvalid: b = !0 } = n,
      { resizable: I = !0 } = n,
      g = {};
    function y() {
      return r;
    }
    return (
      k(() => {
        b && a(11, (h = r.matches(":invalid")));
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
          "updateInvalid" in e && a(12, (b = e.updateInvalid)),
          "resizable" in e && a(4, (I = e.resizable));
      }),
      [
        u,
        c,
        l,
        d,
        I,
        r,
        g,
        o,
        function () {
          a(10, (p = !0)), b && a(11, (h = r.matches(":invalid")));
        },
        s,
        p,
        h,
        b,
        function (e) {
          var t;
          return e in g
            ? null !== (t = g[e]) && void 0 !== t
              ? t
              : null
            : y().getAttribute(e);
        },
        function (e, t) {
          g[e] !== t && a(6, (g[e] = t), g);
        },
        function (e) {
          (e in g && null == g[e]) || a(6, (g[e] = void 0), g);
        },
        function () {
          y().focus();
        },
        function () {
          y().blur();
        },
        y,
        function (t) {
          U.call(this, e, t);
        },
        function (t) {
          U.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (r = e), a(5, r);
          });
        },
        function () {
          (u = this.value), a(0, u);
        },
      ]
    );
  }
  class Aa extends he {
    constructor(e) {
      super(),
        fe(this, e, Ea, va, o, {
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
  const xa = (e) => ({}),
    Da = (e) => ({}),
    Na = (e) => ({}),
    _a = (e) => ({}),
    Pa = (e) => ({}),
    Oa = (e) => ({}),
    La = (e) => ({}),
    Ra = (e) => ({}),
    Ma = (e) => ({}),
    ka = (e) => ({}),
    Fa = (e) => ({}),
    Ba = (e) => ({}),
    wa = (e) => ({}),
    Ha = (e) => ({}),
    Ua = (e) => ({}),
    Va = (e) => ({}),
    Ga = (e) => ({}),
    ja = (e) => ({}),
    qa = (e) => ({}),
    za = (e) => ({}),
    Ka = (e) => ({}),
    Wa = (e) => ({}),
    Qa = (e) => ({}),
    Xa = (e) => ({});
  function Ya(e) {
    let n, a, o, r, l, m, f, h, b, T, S, v, A, D;
    const _ = e[51].label,
      P = c(_, e, e[90], ka);
    o = new Yn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Ja] },
        $$scope: { ctx: e },
      },
    });
    const O = e[51].default,
      L = c(O, e, e[90], null);
    m = new Yn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [ei] },
        $$scope: { ctx: e },
      },
    });
    const R = e[51].ripple,
      M = c(R, e, e[90], _a);
    let k = [
        {
          class: (h = je({
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
          style: (b = Object.entries(e[26]).map($i).concat([e[10]]).join(" ")),
        },
        ze(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      F = {};
    for (let e = 0; e < k.length; e += 1) F = t(F, k[e]);
    return {
      c() {
        (n = $("div")),
          P && P.c(),
          (a = E()),
          ue(o.$$.fragment),
          (r = E()),
          L && L.c(),
          (l = E()),
          ue(m.$$.fragment),
          (f = E()),
          M && M.c(),
          N(n, F);
      },
      m(t, i) {
        y(t, n, i),
          P && P.m(n, null),
          g(n, a),
          pe(o, n, null),
          g(n, r),
          L && L.m(n, null),
          g(n, l),
          pe(m, n, null),
          g(n, f),
          M && M.m(n, null),
          e[80](n),
          (v = !0),
          A ||
            ((D = [
              I(
                (T = ta.call(null, n, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              I((S = Ye.call(null, n, e[8]))),
              I(e[34].call(null, n)),
              x(n, "SMUITextfieldLeadingIcon:mount", e[81]),
              x(n, "SMUITextfieldLeadingIcon:unmount", e[82]),
              x(n, "SMUITextfieldTrailingIcon:mount", e[83]),
              x(n, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (A = !0));
      },
      p(e, t) {
        P &&
          P.p &&
          (!v || 268435456 & t[2]) &&
          u(P, _, e, e[90], v ? d(_, e[90], t, Ma) : p(e[90]), ka);
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          o.$set(a),
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
            u(M, R, e, e[90], v ? d(R, e[90], t, Na) : p(e[90]), _a),
          N(
            n,
            (F = ce(k, [
              (!v ||
                ((33673730 & t[0]) | (2048 & t[1]) &&
                  h !==
                    (h = je({
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
                  b !==
                    (b = Object.entries(e[26])
                      .map($i)
                      .concat([e[10]])
                      .join(" ")))) && { style: b },
              1024 & t[1] &&
                ze(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          T &&
            s(T.update) &&
            2048 & t[0] &&
            T.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          S && s(S.update) && 256 & t[0] && S.update.call(null, e[8]);
      },
      i(e) {
        v ||
          (se(P, e),
          se(o.$$.fragment, e),
          se(L, e),
          se(m.$$.fragment, e),
          se(M, e),
          (v = !0));
      },
      o(e) {
        oe(P, e),
          oe(o.$$.fragment, e),
          oe(L, e),
          oe(m.$$.fragment, e),
          oe(M, e),
          (v = !1);
      },
      d(t) {
        t && C(n),
          P && P.d(t),
          me(o),
          L && L.d(t),
          me(m),
          M && M.d(t),
          e[80](null),
          (A = !1),
          i(D);
      },
    };
  }
  function Za(e) {
    let n,
      a,
      o,
      r,
      l,
      m,
      f,
      h,
      b,
      T,
      S,
      v,
      A,
      D,
      _,
      P,
      O,
      L,
      R = !e[14] && "outlined" !== e[15] && ti(e),
      M = (e[14] || "outlined" === e[15]) && si(e);
    r = new Yn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [li] },
        $$scope: { ctx: e },
      },
    });
    const k = e[51].default,
      F = c(k, e, e[90], null),
      B = [ui, di],
      w = [];
    function H(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (f = H(e)),
      (h = w[f] = B[f](e)),
      (T = new Yn({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [bi] },
          $$scope: { ctx: e },
        },
      }));
    let U = !e[14] && "outlined" !== e[15] && e[11] && Ii(e),
      V = [
        {
          class: (v = je({
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
          style: (A = Object.entries(e[26]).map(Ti).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        ze(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      G = {};
    for (let e = 0; e < V.length; e += 1) G = t(G, V[e]);
    return {
      c() {
        (n = $("label")),
          R && R.c(),
          (a = E()),
          M && M.c(),
          (o = E()),
          ue(r.$$.fragment),
          (l = E()),
          F && F.c(),
          (m = E()),
          h.c(),
          (b = E()),
          ue(T.$$.fragment),
          (S = E()),
          U && U.c(),
          N(n, G);
      },
      m(t, i) {
        y(t, n, i),
          R && R.m(n, null),
          g(n, a),
          M && M.m(n, null),
          g(n, o),
          pe(r, n, null),
          g(n, l),
          F && F.m(n, null),
          g(n, m),
          w[f].m(n, null),
          g(n, b),
          pe(T, n, null),
          g(n, S),
          U && U.m(n, null),
          e[73](n),
          (P = !0),
          O ||
            ((L = [
              I(
                (D = ta.call(null, n, {
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
              I((_ = Ye.call(null, n, e[8]))),
              I(e[34].call(null, n)),
              x(n, "SMUITextfieldLeadingIcon:mount", e[74]),
              x(n, "SMUITextfieldLeadingIcon:unmount", e[75]),
              x(n, "SMUITextfieldTrailingIcon:mount", e[76]),
              x(n, "SMUITextfieldTrailingIcon:unmount", e[77]),
              x(n, "SMUITextfieldCharacterCounter:mount", e[78]),
              x(n, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (O = !0));
      },
      p(e, t) {
        e[14] || "outlined" === e[15]
          ? R &&
            (ae(),
            oe(R, 1, 1, () => {
              R = null;
            }),
            ie())
          : R
          ? (R.p(e, t), 49152 & t[0] && se(R, 1))
          : ((R = ti(e)), R.c(), se(R, 1), R.m(n, a)),
          e[14] || "outlined" === e[15]
            ? M
              ? (M.p(e, t), 49152 & t[0] && se(M, 1))
              : ((M = si(e)), M.c(), se(M, 1), M.m(n, o))
            : M &&
              (ae(),
              oe(M, 1, 1, () => {
                M = null;
              }),
              ie());
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          r.$set(i),
          F &&
            F.p &&
            (!P || 268435456 & t[2]) &&
            u(F, k, e, e[90], P ? d(k, e[90], t, null) : p(e[90]), null);
        let c = f;
        (f = H(e)),
          f === c
            ? w[f].p(e, t)
            : (ae(),
              oe(w[c], 1, 1, () => {
                w[c] = null;
              }),
              ie(),
              (h = w[f]),
              h ? h.p(e, t) : ((h = w[f] = B[f](e)), h.c()),
              se(h, 1),
              h.m(n, b));
        const l = {};
        268435456 & t[2] && (l.$$scope = { dirty: t, ctx: e }),
          T.$set(l),
          !e[14] && "outlined" !== e[15] && e[11]
            ? U
              ? (U.p(e, t), 51200 & t[0] && se(U, 1))
              : ((U = Ii(e)), U.c(), se(U, 1), U.m(n, null))
            : U &&
              (ae(),
              oe(U, 1, 1, () => {
                U = null;
              }),
              ie()),
          N(
            n,
            (G = ce(V, [
              (!P ||
                ((314823171 & t[0]) | (2048 & t[1]) &&
                  v !==
                    (v = je({
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
              (!P ||
                (67109888 & t[0] &&
                  A !==
                    (A = Object.entries(e[26])
                      .map(Ti)
                      .concat([e[10]])
                      .join(" ")))) && { style: A },
              { for: void 0 },
              1024 & t[1] &&
                ze(e[41], [
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
          _ && s(_.update) && 256 & t[0] && _.update.call(null, e[8]);
      },
      i(e) {
        P ||
          (se(R),
          se(M),
          se(r.$$.fragment, e),
          se(F, e),
          se(h),
          se(T.$$.fragment, e),
          se(U),
          (P = !0));
      },
      o(e) {
        oe(R),
          oe(M),
          oe(r.$$.fragment, e),
          oe(F, e),
          oe(h),
          oe(T.$$.fragment, e),
          oe(U),
          (P = !1);
      },
      d(t) {
        t && C(n),
          R && R.d(),
          M && M.d(),
          me(r),
          F && F.d(t),
          w[f].d(),
          me(T),
          U && U.d(),
          e[73](null),
          (O = !1),
          i(L);
      },
    };
  }
  function Ja(e) {
    let t;
    const n = e[51].leadingIcon,
      a = c(n, e, e[90], Ra);
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
          u(a, n, e, e[90], t ? d(n, e[90], i, La) : p(e[90]), Ra);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function ei(e) {
    let t;
    const n = e[51].trailingIcon,
      a = c(n, e, e[90], Oa);
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
          u(a, n, e, e[90], t ? d(n, e[90], i, Pa) : p(e[90]), Oa);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function ti(e) {
    let t,
      n,
      a,
      i = "filled" === e[15] && ni(),
      s = !e[16] && (null != e[17] || e[42].label) && ai(e);
    return {
      c() {
        i && i.c(), (t = E()), s && s.c(), (n = A());
      },
      m(e, o) {
        i && i.m(e, o), y(e, t, o), s && s.m(e, o), y(e, n, o), (a = !0);
      },
      p(e, a) {
        "filled" === e[15]
          ? i || ((i = ni()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? s &&
              (ae(),
              oe(s, 1, 1, () => {
                s = null;
              }),
              ie())
            : s
            ? (s.p(e, a), (196608 & a[0]) | (2048 & a[1]) && se(s, 1))
            : ((s = ai(e)), s.c(), se(s, 1), s.m(n.parentNode, n));
      },
      i(e) {
        a || (se(s), (a = !0));
      },
      o(e) {
        oe(s), (a = !1);
      },
      d(e) {
        i && i.d(e), e && C(t), s && s.d(e), e && C(n);
      },
    };
  }
  function ni(e) {
    let t;
    return {
      c() {
        (t = $("span")), D(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function ai(e) {
    let n, a;
    const i = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Xe(e[41], "label$"),
    ];
    let s = { $$slots: { default: [ii] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ca({ props: s })),
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
                  1024 & t[1] && le(Xe(e[41], "label$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[52](null), me(n, t);
        },
      }
    );
  }
  function ii(e) {
    let t,
      n,
      a = (null == e[17] ? "" : e[17]) + "";
    const i = e[51].label,
      s = c(i, e, e[90], Xa);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        y(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, o) {
        (!n || 131072 & o[0]) &&
          a !== (a = (null == e[17] ? "" : e[17]) + "") &&
          _(t, a),
          s &&
            s.p &&
            (!n || 268435456 & o[2]) &&
            u(s, i, e, e[90], n ? d(i, e[90], o, Qa) : p(e[90]), Xa);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function si(e) {
    let n, a;
    const i = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      Xe(e[41], "outline$"),
    ];
    let s = { $$slots: { default: [ci] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Ia({ props: s })),
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
                  1024 & t[1] && le(Xe(e[41], "outline$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[54](null), me(n, t);
        },
      }
    );
  }
  function oi(e) {
    let n, a;
    const i = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Xe(e[41], "label$"),
    ];
    let s = { $$slots: { default: [ri] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ca({ props: s })),
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
                  1024 & t[1] && le(Xe(e[41], "label$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[53](null), me(n, t);
        },
      }
    );
  }
  function ri(e) {
    let t,
      n,
      a = (null == e[17] ? "" : e[17]) + "";
    const i = e[51].label,
      s = c(i, e, e[90], Wa);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        y(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, o) {
        (!n || 131072 & o[0]) &&
          a !== (a = (null == e[17] ? "" : e[17]) + "") &&
          _(t, a),
          s &&
            s.p &&
            (!n || 268435456 & o[2]) &&
            u(s, i, e, e[90], n ? d(i, e[90], o, Ka) : p(e[90]), Wa);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function ci(e) {
    let t,
      n,
      a = !e[16] && (null != e[17] || e[42].label) && oi(e);
    return {
      c() {
        a && a.c(), (t = A());
      },
      m(e, i) {
        a && a.m(e, i), y(e, t, i), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? a &&
            (ae(),
            oe(a, 1, 1, () => {
              a = null;
            }),
            ie())
          : a
          ? (a.p(e, n), (196608 & n[0]) | (2048 & n[1]) && se(a, 1))
          : ((a = oi(e)), a.c(), se(a, 1), a.m(t.parentNode, t));
      },
      i(e) {
        n || (se(a), (n = !0));
      },
      o(e) {
        oe(a), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t);
      },
    };
  }
  function li(e) {
    let t;
    const n = e[51].leadingIcon,
      a = c(n, e, e[90], za);
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
          u(a, n, e, e[90], t ? d(n, e[90], i, qa) : p(e[90]), za);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function di(e) {
    let n, a, i, s, o, r, l, m, f, h;
    const b = e[51].prefix,
      I = c(b, e, e[90], Va);
    let g = null != e[20] && pi(e);
    const T = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      Xe(e[41], "input$"),
    ];
    function $(t) {
      e[64](t);
    }
    function S(t) {
      e[65](t);
    }
    function v(t) {
      e[66](t);
    }
    function A(t) {
      e[67](t);
    }
    let x = {};
    for (let e = 0; e < T.length; e += 1) x = t(x, T[e]);
    void 0 !== e[0] && (x.value = e[0]),
      void 0 !== e[3] && (x.files = e[3]),
      void 0 !== e[4] && (x.dirty = e[4]),
      void 0 !== e[1] && (x.invalid = e[1]),
      (i = new Sa({ props: x })),
      e[63](i),
      G.push(() => de(i, "value", $)),
      G.push(() => de(i, "files", S)),
      G.push(() => de(i, "dirty", v)),
      G.push(() => de(i, "invalid", A)),
      i.$on("blur", e[68]),
      i.$on("focus", e[69]),
      i.$on("blur", e[70]),
      i.$on("focus", e[71]);
    let D = null != e[21] && fi(e);
    const N = e[51].suffix,
      _ = c(N, e, e[90], Ha);
    return {
      c() {
        I && I.c(),
          (n = E()),
          g && g.c(),
          (a = E()),
          ue(i.$$.fragment),
          (m = E()),
          D && D.c(),
          (f = E()),
          _ && _.c();
      },
      m(e, t) {
        I && I.m(e, t),
          y(e, n, t),
          g && g.m(e, t),
          y(e, a, t),
          pe(i, e, t),
          y(e, m, t),
          D && D.m(e, t),
          y(e, f, t),
          _ && _.m(e, t),
          (h = !0);
      },
      p(e, t) {
        I &&
          I.p &&
          (!h || 268435456 & t[2]) &&
          u(I, b, e, e[90], h ? d(b, e[90], t, Ua) : p(e[90]), Va),
          null != e[20]
            ? g
              ? (g.p(e, t), 1048576 & t[0] && se(g, 1))
              : ((g = pi(e)), g.c(), se(g, 1), g.m(a.parentNode, a))
            : g &&
              (ae(),
              oe(g, 1, 1, () => {
                g = null;
              }),
              ie());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? ce(T, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  le(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && le(Xe(e[41], "input$")),
              ])
            : {};
        !s && 1 & t[0] && ((s = !0), (n.value = e[0]), X(() => (s = !1))),
          !o && 8 & t[0] && ((o = !0), (n.files = e[3]), X(() => (o = !1))),
          !r && 16 & t[0] && ((r = !0), (n.dirty = e[4]), X(() => (r = !1))),
          !l && 2 & t[0] && ((l = !0), (n.invalid = e[1]), X(() => (l = !1))),
          i.$set(n),
          null != e[21]
            ? D
              ? (D.p(e, t), 2097152 & t[0] && se(D, 1))
              : ((D = fi(e)), D.c(), se(D, 1), D.m(f.parentNode, f))
            : D &&
              (ae(),
              oe(D, 1, 1, () => {
                D = null;
              }),
              ie()),
          _ &&
            _.p &&
            (!h || 268435456 & t[2]) &&
            u(_, N, e, e[90], h ? d(N, e[90], t, wa) : p(e[90]), Ha);
      },
      i(e) {
        h || (se(I, e), se(g), se(i.$$.fragment, e), se(D), se(_, e), (h = !0));
      },
      o(e) {
        oe(I, e), oe(g), oe(i.$$.fragment, e), oe(D), oe(_, e), (h = !1);
      },
      d(t) {
        I && I.d(t),
          t && C(n),
          g && g.d(t),
          t && C(a),
          e[63](null),
          me(i, t),
          t && C(m),
          D && D.d(t),
          t && C(f),
          _ && _.d(t);
      },
    };
  }
  function ui(e) {
    let n, a, i, s, o, r, l, m;
    const f = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      Xe(e[41], "input$"),
    ];
    function h(t) {
      e[56](t);
    }
    function b(t) {
      e[57](t);
    }
    function I(t) {
      e[58](t);
    }
    let T = {};
    for (let e = 0; e < f.length; e += 1) T = t(T, f[e]);
    void 0 !== e[0] && (T.value = e[0]),
      void 0 !== e[4] && (T.dirty = e[4]),
      void 0 !== e[1] && (T.invalid = e[1]),
      (a = new Aa({ props: T })),
      e[55](a),
      G.push(() => de(a, "value", h)),
      G.push(() => de(a, "dirty", b)),
      G.push(() => de(a, "invalid", I)),
      a.$on("blur", e[59]),
      a.$on("focus", e[60]),
      a.$on("blur", e[61]),
      a.$on("focus", e[62]);
    const S = e[51].internalCounter,
      v = c(S, e, e[90], ja);
    return {
      c() {
        (n = $("span")),
          ue(a.$$.fragment),
          (r = E()),
          v && v.c(),
          D(
            n,
            "class",
            (l = je({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, t) {
        y(e, n, t), pe(a, n, null), g(n, r), v && v.m(n, null), (m = !0);
      },
      p(e, t) {
        const r =
          (134754304 & t[0]) | (1024 & t[1])
            ? ce(f, [
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                1024 & t[1] && le(Xe(e[41], "input$")),
              ])
            : {};
        !i && 1 & t[0] && ((i = !0), (r.value = e[0]), X(() => (i = !1))),
          !s && 16 & t[0] && ((s = !0), (r.dirty = e[4]), X(() => (s = !1))),
          !o && 2 & t[0] && ((o = !0), (r.invalid = e[1]), X(() => (o = !1))),
          a.$set(r),
          v &&
            v.p &&
            (!m || 268435456 & t[2]) &&
            u(v, S, e, e[90], m ? d(S, e[90], t, Ga) : p(e[90]), ja),
          (!m ||
            (1024 & t[1] &&
              l !==
                (l = je({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            D(n, "class", l);
      },
      i(e) {
        m || (se(a.$$.fragment, e), se(v, e), (m = !0));
      },
      o(e) {
        oe(a.$$.fragment, e), oe(v, e), (m = !1);
      },
      d(t) {
        t && C(n), e[55](null), me(a), v && v.d(t);
      },
    };
  }
  function pi(e) {
    let t, n;
    return (
      (t = new ya({
        props: { $$slots: { default: [mi] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function mi(e) {
    let t;
    return {
      c() {
        t = v(e[20]);
      },
      m(e, n) {
        y(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && _(t, e[20]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function fi(e) {
    let t, n;
    return (
      (t = new Ca({
        props: { $$slots: { default: [hi] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function hi(e) {
    let t;
    return {
      c() {
        t = v(e[21]);
      },
      m(e, n) {
        y(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && _(t, e[21]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function bi(e) {
    let t;
    const n = e[51].trailingIcon,
      a = c(n, e, e[90], Ba);
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
          u(a, n, e, e[90], t ? d(n, e[90], i, Fa) : p(e[90]), Ba);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Ii(e) {
    let n, a;
    const i = [Xe(e[41], "ripple$")];
    let s = {};
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new pa({ props: s })),
      e[72](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 1024 & t[1] ? ce(i, [le(Xe(e[41], "ripple$"))]) : {};
          n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[72](null), me(n, t);
        },
      }
    );
  }
  function gi(e) {
    let n, a;
    const i = [Xe(e[41], "helperLine$")];
    let s = { $$slots: { default: [yi] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ga({ props: s })),
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
          const a = 1024 & t[1] ? ce(i, [le(Xe(e[41], "helperLine$"))]) : {};
          268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function yi(e) {
    let t;
    const n = e[51].helper,
      a = c(n, e, e[90], Da);
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
          u(a, n, e, e[90], t ? d(n, e[90], i, xa) : p(e[90]), Da);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Ci(e) {
    let t, n, a, i, s;
    const o = [Za, Ya],
      r = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = r[t] = o[t](e));
    let c = e[42].helper && gi(e);
    return {
      c() {
        n.c(), (a = E()), c && c.c(), (i = A());
      },
      m(e, n) {
        r[t].m(e, n), y(e, a, n), c && c.m(e, n), y(e, i, n), (s = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? c
              ? (c.p(e, t), 2048 & t[1] && se(c, 1))
              : ((c = gi(e)), c.c(), se(c, 1), c.m(i.parentNode, i))
            : c &&
              (ae(),
              oe(c, 1, 1, () => {
                c = null;
              }),
              ie());
      },
      i(e) {
        s || (se(n), se(c), (s = !0));
      },
      o(e) {
        oe(n), oe(c), (s = !1);
      },
      d(e) {
        r[t].d(e), e && C(a), c && c.d(e), e && C(i);
      },
    };
  }
  const Ti = ([e, t]) => `${e}: ${t};`,
    $i = ([e, t]) => `${e}: ${t};`;
  function Si(e, n, a) {
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
    let o = f(n, s),
      { $$slots: r = {}, $$scope: c } = n;
    const l = h(r),
      { applyPassive: d } = ve,
      u = Qe(M());
    let p = () => {};
    function b(e) {
      return e === p;
    }
    let { use: I = [] } = n,
      { class: g = "" } = n,
      { style: y = "" } = n,
      { ripple: C = !0 } = n,
      { disabled: T = !1 } = n,
      { required: $ = !1 } = n,
      { textarea: S = !1 } = n,
      { variant: v = S ? "outlined" : "standard" } = n,
      { noLabel: E = !1 } = n,
      { label: A } = n,
      { type: x = "text" } = n,
      { value: D = o.input$emptyValueUndefined ? void 0 : p } = n,
      { files: N = p } = n;
    const _ = !b(D) || !b(N);
    b(D) && (D = void 0), b(N) && (N = null);
    let { invalid: P = p } = n,
      { updateInvalid: O = b(P) } = n;
    b(P) && (P = !1);
    let L,
      R,
      B,
      w,
      U,
      V,
      j,
      q,
      K,
      { dirty: Q = !1 } = n,
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
      oe = {},
      re = {},
      ce = !1,
      le = H("SMUI:addLayoutListener"),
      de = new Promise((e) => (U = e)),
      ue = D;
    function pe(e) {
      var t;
      return e in oe
        ? null !== (t = oe[e]) && void 0 !== t
          ? t
          : null
        : be().classList.contains(e);
    }
    function me(e) {
      oe[e] || a(25, (oe[e] = !0), oe);
    }
    function fe(e) {
      (e in oe && !oe[e]) || a(25, (oe[e] = !1), oe);
    }
    function he() {
      if (R) {
        const e = R.shouldFloat;
        R.notchOutline(e);
      }
    }
    function be() {
      return L;
    }
    le && (w = le(he)),
      k(() => {
        if (
          (a(
            49,
            (R = new ln(
              {
                addClass: me,
                removeClass: fe,
                hasClass: pe,
                registerTextFieldInteractionHandler: (e, t) =>
                  be().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  be().removeEventListener(e, t),
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
                  return K;
                },
                get leadingIcon() {
                  return V;
                },
                get trailingIcon() {
                  return j;
                },
              }
            ))
          ),
          _)
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
          U(),
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
          a(41, (o = f(n, s))),
          "use" in e && a(8, (I = e.use)),
          "class" in e && a(9, (g = e.class)),
          "style" in e && a(10, (y = e.style)),
          "ripple" in e && a(11, (C = e.ripple)),
          "disabled" in e && a(12, (T = e.disabled)),
          "required" in e && a(13, ($ = e.required)),
          "textarea" in e && a(14, (S = e.textarea)),
          "variant" in e && a(15, (v = e.variant)),
          "noLabel" in e && a(16, (E = e.noLabel)),
          "label" in e && a(17, (A = e.label)),
          "type" in e && a(18, (x = e.type)),
          "value" in e && a(0, (D = e.value)),
          "files" in e && a(3, (N = e.files)),
          "invalid" in e && a(1, (P = e.invalid)),
          "updateInvalid" in e && a(19, (O = e.updateInvalid)),
          "dirty" in e && a(4, (Q = e.dirty)),
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
            R.isValid() !== !P &&
            (O ? a(1, (P = !R.isValid())) : R.setValid(!P)),
          266240 & e.$$.dirty[1] &&
            R &&
            R.getValidateOnValueChange() !== Z &&
            R.setValidateOnValueChange(!b(Z) && Z),
          270336 & e.$$.dirty[1] && R && R.setUseNativeValidation(!!b(J) || J),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            R &&
            R.setDisabled(T),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && R && _ && ue !== D)
        ) {
          a(50, (ue = D));
          const e = `${D}`;
          R.getValue() !== e && R.setValue(e);
        }
      }),
      [
        D,
        P,
        ne,
        N,
        Q,
        ae,
        ie,
        se,
        I,
        g,
        y,
        C,
        T,
        $,
        S,
        v,
        E,
        A,
        x,
        O,
        X,
        Y,
        ee,
        te,
        L,
        oe,
        re,
        B,
        ce,
        V,
        j,
        q,
        K,
        i,
        u,
        b,
        _,
        de,
        me,
        fe,
        function (e, t) {
          re[e] != t &&
            ("" === t || null == t
              ? (delete re[e], a(26, re))
              : a(26, (re[e] = t), re));
        },
        o,
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
        be,
        R,
        ue,
        r,
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
          (Q = e), a(4, Q);
        },
        function (e) {
          (P = e), a(1, P), a(49, R), a(19, O);
        },
        () => a(28, (ce = !1)),
        () => a(28, (ce = !0)),
        (e) => qe(L, "blur", e),
        (e) => qe(L, "focus", e),
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
          (Q = e), a(4, Q);
        },
        function (e) {
          (P = e), a(1, P), a(49, R), a(19, O);
        },
        () => a(28, (ce = !1)),
        () => a(28, (ce = !0)),
        (e) => qe(L, "blur", e),
        (e) => qe(L, "focus", e),
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
        (e) => a(29, (V = e.detail)),
        () => a(29, (V = void 0)),
        (e) => a(30, (j = e.detail)),
        () => a(30, (j = void 0)),
        (e) => a(32, (K = e.detail)),
        () => a(32, (K = void 0)),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (L = e), a(24, L);
          });
        },
        (e) => a(29, (V = e.detail)),
        () => a(29, (V = void 0)),
        (e) => a(30, (j = e.detail)),
        () => a(30, (j = void 0)),
        (e) => a(27, (B = e.detail)),
        (e) => a(31, (q = e.detail)),
        () => {
          a(27, (B = void 0)), a(31, (q = void 0));
        },
        (e) => a(32, (K = e.detail)),
        () => a(32, (K = void 0)),
        c,
      ]
    );
  }
  class vi extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Si,
          Ci,
          o,
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
   */ var Ei = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    Ai = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    xi = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (a.hasToggledAriaLabel = !1), a;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ei;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ai;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              hasClass: function () {
                return !1;
              },
              notifyChange: function () {},
              removeClass: function () {},
              getAttr: function () {
                return null;
              },
              setAttr: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          var e = this.adapter.getAttr(Ai.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(Ai.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(Ai.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(Ai.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(Ei.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(Ei.ICON_BUTTON_ON)
              : this.adapter.removeClass(Ei.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(Ai.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(Ai.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(Ai.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(Ai.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Se);
  function Di(e) {
    let t;
    return {
      c() {
        (t = $("div")), D(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Ni(e) {
    let t, n, a, i;
    const s = e[32].default,
      o = c(s, e, e[36], null);
    let r = e[8] && Di();
    return {
      c() {
        (t = $("div")),
          (n = E()),
          o && o.c(),
          r && r.c(),
          (a = A()),
          D(t, "class", "mdc-icon-button__ripple");
      },
      m(e, s) {
        y(e, t, s),
          y(e, n, s),
          o && o.m(e, s),
          r && r.m(e, s),
          y(e, a, s),
          (i = !0);
      },
      p(e, t) {
        o &&
          o.p &&
          (!i || 32 & t[1]) &&
          u(o, s, e, e[36], i ? d(s, e[36], t, null) : p(e[36]), null),
          e[8]
            ? r || ((r = Di()), r.c(), r.m(a.parentNode, a))
            : r && (r.d(1), (r = null));
      },
      i(e) {
        i || (se(o, e), (i = !0));
      },
      o(e) {
        oe(o, e), (i = !1);
      },
      d(e) {
        e && C(t), e && C(n), o && o.d(e), r && r.d(e), e && C(a);
      },
    };
  }
  function _i(e) {
    let n, a, i;
    const s = [
      {
        use: [
          [
            ta,
            {
              ripple: e[4],
              unbounded: !0,
              color: e[5],
              disabled: !!e[28].disabled,
              addClass: e[25],
              removeClass: e[26],
              addStyle: e[27],
            },
          ],
          e[21],
          ...e[1],
        ],
      },
      {
        class: je({
          [e[2]]: !0,
          "mdc-icon-button": !0,
          "mdc-icon-button--on": !e[22](e[0]) && e[0],
          "mdc-icon-button--touch": e[8],
          "mdc-icon-button--display-flex": e[9],
          "smui-icon-button--size-button": "button" === e[10],
          "mdc-icon-button--reduced-size":
            "mini" === e[10] || "button" === e[10],
          "mdc-card__action": "card:action" === e[23],
          "mdc-card__action--icon": "card:action" === e[23],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === e[23],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === e[23],
          "mdc-snackbar__dismiss": "snackbar:actions" === e[23],
          "mdc-data-table__pagination-button":
            "data-table:pagination" === e[23],
          "mdc-data-table__sort-icon-button":
            "data-table:sortable-header-cell" === e[23],
          "mdc-dialog__close": "dialog:header" === e[23] && "close" === e[12],
          ...e[17],
        }),
      },
      { style: Object.entries(e[18]).map(Pi).concat([e[3]]).join(" ") },
      { "aria-pressed": e[22](e[0]) ? null : e[0] ? "true" : "false" },
      { "aria-label": e[0] ? e[6] : e[7] },
      { "data-aria-label-on": e[6] },
      { "data-aria-label-off": e[7] },
      { "aria-describedby": e[24] },
      { href: e[11] },
      e[20],
      e[19],
      e[28],
    ];
    var o = e[13];
    function r(e) {
      let n = { $$slots: { default: [Ni] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o &&
        ((n = new o(r(e))),
        e[33](n),
        n.$on("click", e[34]),
        n.$on("click", e[35])),
      {
        c() {
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
        },
        p(e, t) {
          const i =
            536748031 & t[0]
              ? ce(s, [
                  505413682 & t[0] && {
                    use: [
                      [
                        ta,
                        {
                          ripple: e[4],
                          unbounded: !0,
                          color: e[5],
                          disabled: !!e[28].disabled,
                          addClass: e[25],
                          removeClass: e[26],
                          addStyle: e[27],
                        },
                      ],
                      e[21],
                      ...e[1],
                    ],
                  },
                  12719877 & t[0] && {
                    class: je({
                      [e[2]]: !0,
                      "mdc-icon-button": !0,
                      "mdc-icon-button--on": !e[22](e[0]) && e[0],
                      "mdc-icon-button--touch": e[8],
                      "mdc-icon-button--display-flex": e[9],
                      "smui-icon-button--size-button": "button" === e[10],
                      "mdc-icon-button--reduced-size":
                        "mini" === e[10] || "button" === e[10],
                      "mdc-card__action": "card:action" === e[23],
                      "mdc-card__action--icon": "card:action" === e[23],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === e[23],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === e[23],
                      "mdc-snackbar__dismiss": "snackbar:actions" === e[23],
                      "mdc-data-table__pagination-button":
                        "data-table:pagination" === e[23],
                      "mdc-data-table__sort-icon-button":
                        "data-table:sortable-header-cell" === e[23],
                      "mdc-dialog__close":
                        "dialog:header" === e[23] && "close" === e[12],
                      ...e[17],
                    }),
                  },
                  262152 & t[0] && {
                    style: Object.entries(e[18])
                      .map(Pi)
                      .concat([e[3]])
                      .join(" "),
                  },
                  4194305 & t[0] && {
                    "aria-pressed": e[22](e[0])
                      ? null
                      : e[0]
                      ? "true"
                      : "false",
                  },
                  193 & t[0] && { "aria-label": e[0] ? e[6] : e[7] },
                  64 & t[0] && { "data-aria-label-on": e[6] },
                  128 & t[0] && { "data-aria-label-off": e[7] },
                  16777216 & t[0] && { "aria-describedby": e[24] },
                  2048 & t[0] && { href: e[11] },
                  1048576 & t[0] && le(e[20]),
                  524288 & t[0] && le(e[19]),
                  268435456 & t[0] && le(e[28]),
                ])
              : {};
          if (
            ((256 & t[0]) | (32 & t[1]) && (i.$$scope = { dirty: t, ctx: e }),
            o !== (o = e[13]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
                e[33](n),
                n.$on("click", e[34]),
                n.$on("click", e[35]),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[33](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  const Pi = ([e, t]) => `${e}: ${t};`;
  function Oi(e, n, a) {
    let i;
    const s = [
      "use",
      "class",
      "style",
      "ripple",
      "color",
      "toggle",
      "pressed",
      "ariaLabelOn",
      "ariaLabelOff",
      "touch",
      "displayFlex",
      "size",
      "href",
      "action",
      "component",
      "getElement",
    ];
    let o = f(n, s),
      { $$slots: r = {}, $$scope: c } = n;
    const l = Qe(M());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      h,
      { use: b = [] } = n,
      { class: I = "" } = n,
      { style: g = "" } = n,
      { ripple: y = !0 } = n,
      { color: C } = n,
      { toggle: T = !1 } = n,
      { pressed: $ = d } = n,
      { ariaLabelOn: S } = n,
      { ariaLabelOff: v } = n,
      { touch: E = !1 } = n,
      { displayFlex: A = !0 } = n,
      { size: x = "normal" } = n,
      { href: D } = n,
      { action: N } = n,
      _ = {},
      P = {},
      O = {},
      L = H("SMUI:icon-button:context"),
      R = H("SMUI:icon-button:aria-describedby"),
      { component: k = null == D ? Lt : Ot } = n,
      B = o.disabled;
    w("SMUI:icon:context", "icon-button");
    let U = null;
    function V(e) {
      return e in _ ? _[e] : W().classList.contains(e);
    }
    function j(e) {
      _[e] || a(17, (_[e] = !0), _);
    }
    function q(e) {
      (e in _ && !_[e]) || a(17, (_[e] = !1), _);
    }
    function z(e) {
      var t;
      return e in O
        ? null !== (t = O[e]) && void 0 !== t
          ? t
          : null
        : W().getAttribute(e);
    }
    function K(e, t) {
      O[e] !== t && a(19, (O[e] = t), O);
    }
    function W() {
      return p.getElement();
    }
    F(() => {
      h && h.destroy();
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(28, (o = f(n, s))),
          "use" in e && a(1, (b = e.use)),
          "class" in e && a(2, (I = e.class)),
          "style" in e && a(3, (g = e.style)),
          "ripple" in e && a(4, (y = e.ripple)),
          "color" in e && a(5, (C = e.color)),
          "toggle" in e && a(29, (T = e.toggle)),
          "pressed" in e && a(0, ($ = e.pressed)),
          "ariaLabelOn" in e && a(6, (S = e.ariaLabelOn)),
          "ariaLabelOff" in e && a(7, (v = e.ariaLabelOff)),
          "touch" in e && a(8, (E = e.touch)),
          "displayFlex" in e && a(9, (A = e.displayFlex)),
          "size" in e && a(10, (x = e.size)),
          "href" in e && a(11, (D = e.href)),
          "action" in e && a(12, (N = e.action)),
          "component" in e && a(13, (k = e.component)),
          "$$scope" in e && a(36, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            a(
              20,
              (i = (() => {
                if ("data-table:pagination" !== L)
                  return "dialog:header" === L
                    ? { "data-mdc-dialog-action": N }
                    : { action: N };
                switch (N) {
                  case "first-page":
                    return { "data-first-page": "true" };
                  case "prev-page":
                    return { "data-prev-page": "true" };
                  case "next-page":
                    return { "data-next-page": "true" };
                  case "last-page":
                    return { "data-last-page": "true" };
                  default:
                    return { "data-action": "true" };
                }
              })())
            ),
          B !== o.disabled)
        ) {
          const e = W();
          "blur" in e && e.blur(), a(30, (B = o.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          W() &&
          T !== U &&
          (T && !h
            ? (a(
                16,
                (h = new xi({
                  addClass: j,
                  hasClass: V,
                  notifyChange: (e) => {
                    !(function (e) {
                      a(0, ($ = e.isOn));
                    })(e),
                      qe(W(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: q,
                  getAttr: z,
                  setAttr: K,
                }))
              ),
              h.init())
            : !T &&
              h &&
              (h.destroy(),
              a(16, (h = void 0)),
              a(17, (_ = {})),
              a(19, (O = {}))),
          a(31, (U = T))),
          65537 & e.$$.dirty[0] && h && !u($) && h.isOn() !== $ && h.toggle($);
      }),
      [
        $,
        b,
        I,
        g,
        y,
        C,
        S,
        v,
        E,
        A,
        x,
        D,
        N,
        k,
        W,
        p,
        h,
        _,
        P,
        O,
        i,
        l,
        u,
        L,
        R,
        j,
        q,
        function (e, t) {
          P[e] != t &&
            ("" === t || null == t
              ? (delete P[e], a(18, P))
              : a(18, (P[e] = t), P));
        },
        o,
        T,
        B,
        U,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e), a(15, p);
          });
        },
        () => h && h.handleClick(),
        () =>
          "top-app-bar:navigation" === L &&
          qe(W(), "SMUITopAppBarIconButton:nav"),
        c,
      ]
    );
  }
  class Li extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Oi,
          _i,
          o,
          {
            use: 1,
            class: 2,
            style: 3,
            ripple: 4,
            color: 5,
            toggle: 29,
            pressed: 0,
            ariaLabelOn: 6,
            ariaLabelOff: 7,
            touch: 8,
            displayFlex: 9,
            size: 10,
            href: 11,
            action: 12,
            component: 13,
            getElement: 14,
          },
          null,
          [-1, -1]
        );
    }
    get getElement() {
      return this.$$.ctx[14];
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
   */ var Ri,
    Mi,
    ki = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((Ri = {})["" + ki.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (Ri["" + ki.LIST_ITEM_CLASS] = "mdc-list-item"),
    (Ri["" + ki.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (Ri["" + ki.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (Ri["" + ki.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (Ri["" + ki.ROOT] = "mdc-list");
  var Fi =
      (((Mi = {})["" + ki.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Mi["" + ki.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Mi["" + ki.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Mi["" + ki.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Mi["" + ki.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Mi["" + ki.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Mi["" + ki.ROOT] = "mdc-deprecated-list"),
      Mi),
    Bi = {
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
        ki.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ki.LIST_ITEM_CLASS +
        " a,\n    ." +
        Fi[ki.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Fi[ki.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        ki.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ki.LIST_ITEM_CLASS +
        " a,\n    ." +
        ki.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        ki.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        Fi[ki.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Fi[ki.LIST_ITEM_CLASS] +
        " a,\n    ." +
        Fi[ki.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Fi[ki.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    wi = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Hi = ["input", "button", "textarea", "select"],
    Ui = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Hi.indexOf(n) && e.preventDefault();
      }
    };
  function Vi(e, t) {
    var n,
      a = e.nextChar,
      i = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      o = e.focusedItemIndex,
      r = e.skipFocus,
      c = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        ji(t);
      }, wi.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
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
                var o = s[a.sortedIndexCursor].index;
                if (!n(o)) return o;
              }
              a.currentFirstChar = i;
              var r,
                c = -1;
              for (r = 0; r < s.length; r++)
                if (!n(s[r].index)) {
                  c = r;
                  break;
                }
              for (; r < s.length; r++)
                if (s[r].index > t && !n(s[r].index)) {
                  c = r;
                  break;
                }
              if (-1 !== c)
                return (a.sortedIndexCursor = c), s[a.sortedIndexCursor].index;
              return -1;
            })(s, o, c, t)
          : (function (e, t, n) {
              var a = n.typeaheadBuffer[0],
                i = e.get(a);
              if (!i) return -1;
              var s = i[n.sortedIndexCursor];
              if (0 === s.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(s.index))
                return s.index;
              var o = (n.sortedIndexCursor + 1) % i.length,
                r = -1;
              for (; o !== n.sortedIndexCursor; ) {
                var c = i[o],
                  l = 0 === c.text.lastIndexOf(n.typeaheadBuffer, 0),
                  d = !t(c.index);
                if (l && d) {
                  r = o;
                  break;
                }
                o = (o + 1) % i.length;
              }
              if (-1 !== r)
                return (n.sortedIndexCursor = r), i[n.sortedIndexCursor].index;
              return -1;
            })(s, c, t)),
      -1 === n || r || i(n),
      n
    );
  }
  function Gi(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function ji(e) {
    e.typeaheadBuffer = "";
  }
  function qi(e, t) {
    var n = e.event,
      a = e.isTargetListItem,
      i = e.focusedItemIndex,
      s = e.focusItemAtIndex,
      o = e.sortedIndexByFirstChar,
      r = e.isItemAtIndexDisabled,
      c = "ArrowLeft" === qn(n),
      l = "ArrowUp" === qn(n),
      d = "ArrowRight" === qn(n),
      u = "ArrowDown" === qn(n),
      p = "Home" === qn(n),
      m = "End" === qn(n),
      f = "Enter" === qn(n),
      h = "Spacebar" === qn(n);
    return n.ctrlKey || n.metaKey || c || l || d || u || p || m || f
      ? -1
      : h || 1 !== n.key.length
      ? h
        ? (a && Ui(n),
          a && Gi(t)
            ? Vi(
                {
                  focusItemAtIndex: s,
                  focusedItemIndex: i,
                  nextChar: " ",
                  sortedIndexByFirstChar: o,
                  skipFocus: !1,
                  isItemAtIndexDisabled: r,
                },
                t
              )
            : -1)
        : -1
      : (Ui(n),
        Vi(
          {
            focusItemAtIndex: s,
            focusedItemIndex: i,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: o,
            skipFocus: !1,
            isItemAtIndexDisabled: r,
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
   */ var zi = (function (e) {
    function t(n) {
      var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      return (
        (a.wrapFocus = !1),
        (a.isVertical = !0),
        (a.isSingleSelectionList = !1),
        (a.selectedIndex = wi.UNSET_INDEX),
        (a.focusedItemIndex = wi.UNSET_INDEX),
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
      Ie(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Bi;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return ki;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return wi;
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
        e !== wi.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ki.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = wi.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var a = this.adapter.listItemAtIndexHasClass(
              n,
              ki.LIST_ITEM_SELECTED_CLASS
            ),
            i = this.adapter.listItemAtIndexHasClass(
              n,
              ki.LIST_ITEM_ACTIVATED_CLASS
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
        return this.hasTypeahead && Gi(this.typeaheadState);
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
          i = "ArrowLeft" === qn(e),
          s = "ArrowUp" === qn(e),
          o = "ArrowRight" === qn(e),
          r = "ArrowDown" === qn(e),
          c = "Home" === qn(e),
          l = "End" === qn(e),
          d = "Enter" === qn(e),
          u = "Spacebar" === qn(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          s || l
            ? (e.preventDefault(), this.focusLastElement())
            : (r || c) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              qi(
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
                      ki.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var m = this.adapter.getFocusedElementIndex();
          if (!(-1 === m && (m = n) < 0)) {
            if ((this.isVertical && r) || (!this.isVertical && o))
              Ui(e), this.focusNextElement(m);
            else if ((this.isVertical && s) || (!this.isVertical && i))
              Ui(e), this.focusPrevElement(m);
            else if (c) Ui(e), this.focusFirstElement();
            else if (l) Ui(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === wi.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((d || u) && t) {
              var f = e.target;
              if (f && "A" === f.tagName && d) return;
              if (
                (Ui(e),
                this.adapter.listItemAtIndexHasClass(
                  m,
                  ki.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(m),
                this.adapter.notifyAction(m));
            }
            if (this.hasTypeahead)
              qi(
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
                      ki.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== wi.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ki.LIST_ITEM_DISABLED_CLASS
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
                ki.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Bi.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                ki.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Bi.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var a = ki.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (a = ki.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== wi.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, a),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== wi.UNSET_INDEX && this.adapter.addClassForElementIndex(e, a),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === wi.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Bi.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Bi.ARIA_CURRENT : Bi.ARIA_SELECTED;
        if (
          (this.selectedIndex !== wi.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== wi.UNSET_INDEX)
        ) {
          var a = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, a);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Bi.ARIA_SELECTED : Bi.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== wi.UNSET_INDEX &&
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
        this.focusedItemIndex === wi.UNSET_INDEX && 0 !== e
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
          e !== wi.UNSET_INDEX &&
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
            this.selectedIndex !== wi.UNSET_INDEX
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
            (this.isSingleSelectionList && e === wi.UNSET_INDEX)
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
          this.selectedIndex === wi.UNSET_INDEX
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
              ki.LIST_ITEM_DISABLED_CLASS
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
          Vi(
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
                  ki.LIST_ITEM_DISABLED_CLASS
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
        ji(this.typeaheadState);
      }),
      t
    );
  })(Se);
  function Ki(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Wi(e) {
    let n, a, i;
    const s = [
      { use: [e[17], ...e[0]] },
      {
        class: je({
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
    var o = e[12];
    function r(e) {
      let n = { $$slots: { default: [Ki] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o &&
        ((n = new o(r(e))),
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
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
        },
        p(e, t) {
          const i =
            8818687 & t[0]
              ? ce(s, [
                  131073 & t[0] && { use: [e[17], ...e[0]] },
                  266238 & t[0] && {
                    class: je({
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
            o !== (o = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
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
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[38](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  function Qi(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    var c;
    const { closest: l, matches: d } = xe,
      u = Qe(M());
    let p,
      h,
      { use: b = [] } = n,
      { class: I = "" } = n,
      { nonInteractive: g = !1 } = n,
      { dense: y = !1 } = n,
      { textualList: C = !1 } = n,
      { avatarList: T = !1 } = n,
      { iconList: $ = !1 } = n,
      { imageList: S = !1 } = n,
      { thumbnailList: v = !1 } = n,
      { videoList: E = !1 } = n,
      { twoLine: A = !1 } = n,
      { threeLine: x = !1 } = n,
      { vertical: D = !0 } = n,
      {
        wrapFocus: N = null !== (c = H("SMUI:list:wrapFocus")) &&
          void 0 !== c &&
          c,
      } = n,
      { singleSelection: _ = !1 } = n,
      { selectedIndex: P = -1 } = n,
      { radioList: O = !1 } = n,
      { checkList: L = !1 } = n,
      { hasTypeahead: R = !1 } = n,
      B = [],
      U = H("SMUI:list:role"),
      V = H("SMUI:list:nav");
    const j = new WeakMap();
    let q,
      z = H("SMUI:dialog:selection"),
      K = H("SMUI:addLayoutListener"),
      { component: W = V ? wt : Ut } = n;
    function Q() {
      return null == p
        ? []
        : [...re().children]
            .map((e) => j.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function X(e) {
      const t = Q()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function Y(e, t) {
      var n;
      const a = Q()[e];
      return null !== (n = a && a.hasClass(t)) && void 0 !== n && n;
    }
    function Z(e, t) {
      const n = Q()[e];
      n && n.addClass(t);
    }
    function J(e, t) {
      const n = Q()[e];
      n && n.removeClass(t);
    }
    function ee(e, t, n) {
      const a = Q()[e];
      a && a.addAttr(t, n);
    }
    function te(e, t) {
      const n = Q()[e];
      n && n.removeAttr(t);
    }
    function ne(e, t) {
      const n = Q()[e];
      return n ? n.getAttr(t) : null;
    }
    function ae(e) {
      var t;
      const n = Q()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function ie(e) {
      const t = l(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && d(t, ".mdc-deprecated-list-item")
        ? Q()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function se() {
      return h.layout();
    }
    function oe() {
      return h.getSelectedIndex();
    }
    function re() {
      return p.getElement();
    }
    w("SMUI:list:nonInteractive", g),
      w("SMUI:separator:context", "list"),
      U ||
        (_
          ? ((U = "listbox"), w("SMUI:list:item:role", "option"))
          : O
          ? ((U = "radiogroup"), w("SMUI:list:item:role", "radio"))
          : L
          ? ((U = "group"), w("SMUI:list:item:role", "checkbox"))
          : ((U = "list"), w("SMUI:list:item:role", void 0))),
      K && (q = K(se)),
      k(() => {
        a(
          13,
          (h = new zi({
            addClassForElementIndex: Z,
            focusItemAtIndex: X,
            getAttributeForElementIndex: (e, t) => {
              var n, a;
              return null !==
                (a =
                  null === (n = Q()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== a
                ? a
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? Q()
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
                    null === (t = Q()[e]) || void 0 === t
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
                    null === (t = Q()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = Q()[e];
              return (
                null !==
                  (t = (null == n ? void 0 : n.hasCheckbox) && n.checked) &&
                void 0 !== t &&
                t
              );
            },
            isFocusInsideList: () =>
              null != p &&
              re() !== document.activeElement &&
              re().contains(document.activeElement),
            isRootFocused: () => null != p && document.activeElement === re(),
            listItemAtIndexHasClass: Y,
            notifyAction: (e) => {
              a(24, (P = e)),
                null != p &&
                  qe(re(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: J,
            setAttributeForElementIndex: ee,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              Q()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = Q()[e];
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
            return re();
          },
          get items() {
            return B;
          },
          get typeaheadInProgress() {
            return h.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => h.typeaheadMatchItem(e, t, !0),
          getOrderedList: Q,
          focusItemAtIndex: X,
          addClassForElementIndex: Z,
          removeClassForElementIndex: J,
          setAttributeForElementIndex: ee,
          removeAttributeForElementIndex: te,
          getAttributeFromElementIndex: ne,
          getPrimaryTextAtIndex: ae,
        };
        return (
          qe(re(), "SMUIList:mount", e),
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
          "use" in e && a(0, (b = e.use)),
          "class" in e && a(1, (I = e.class)),
          "nonInteractive" in e && a(2, (g = e.nonInteractive)),
          "dense" in e && a(3, (y = e.dense)),
          "textualList" in e && a(4, (C = e.textualList)),
          "avatarList" in e && a(5, (T = e.avatarList)),
          "iconList" in e && a(6, ($ = e.iconList)),
          "imageList" in e && a(7, (S = e.imageList)),
          "thumbnailList" in e && a(8, (v = e.thumbnailList)),
          "videoList" in e && a(9, (E = e.videoList)),
          "twoLine" in e && a(10, (A = e.twoLine)),
          "threeLine" in e && a(11, (x = e.threeLine)),
          "vertical" in e && a(25, (D = e.vertical)),
          "wrapFocus" in e && a(26, (N = e.wrapFocus)),
          "singleSelection" in e && a(27, (_ = e.singleSelection)),
          "selectedIndex" in e && a(24, (P = e.selectedIndex)),
          "radioList" in e && a(28, (O = e.radioList)),
          "checkList" in e && a(29, (L = e.checkList)),
          "hasTypeahead" in e && a(30, (R = e.hasTypeahead)),
          "component" in e && a(12, (W = e.component)),
          "$$scope" in e && a(43, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && h && h.setVerticalOrientation(D),
          67117056 & e.$$.dirty[0] && h && h.setWrapFocus(N),
          1073750016 & e.$$.dirty[0] && h && h.setHasTypeahead(R),
          134225920 & e.$$.dirty[0] && h && h.setSingleSelection(_),
          151003136 & e.$$.dirty[0] &&
            h &&
            _ &&
            oe() !== P &&
            h.setSelectedIndex(P);
      }),
      [
        b,
        I,
        g,
        y,
        C,
        T,
        $,
        S,
        v,
        E,
        A,
        x,
        W,
        h,
        p,
        U,
        d,
        u,
        z,
        function (e) {
          B.push(e.detail),
            j.set(e.detail.element, e.detail),
            _ && e.detail.selected && a(24, (P = ie(e.detail.element))),
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
              const e = Q()[t];
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
        P,
        D,
        N,
        _,
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
        oe,
        function () {
          return h.getFocusedItemIndex();
        },
        re,
        o,
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
        r,
      ]
    );
  }
  class Xi extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Qi,
          Wi,
          o,
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
  function Yi(e) {
    let t;
    return {
      c() {
        (t = $("span")), D(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Zi(e) {
    let t,
      n,
      a = e[7] && Yi();
    const i = e[32].default,
      s = c(i, e, e[35], null);
    return {
      c() {
        a && a.c(), (t = A()), s && s.c();
      },
      m(e, i) {
        a && a.m(e, i), y(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, o) {
        e[7]
          ? a || ((a = Yi()), a.c(), a.m(t.parentNode, t))
          : a && (a.d(1), (a = null)),
          s &&
            s.p &&
            (!n || 16 & o[1]) &&
            u(s, i, e, e[35], n ? d(i, e[35], o, null) : p(e[35]), null);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t), s && s.d(e);
      },
    };
  }
  function Ji(e) {
    let n, a, i;
    const s = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  ta,
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
        class: je({
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
      { style: Object.entries(e[17]).map(ts).concat([e[4]]).join(" ") },
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
    var o = e[12];
    function r(e) {
      let n = { $$slots: { default: [Zi] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o &&
        ((n = new o(r(e))),
        e[33](n),
        n.$on("click", e[13]),
        n.$on("keydown", e[25]),
        n.$on("SMUIGenericInput:mount", e[26]),
        n.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
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
                              ta,
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
                    class: je({
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
                      .map(ts)
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
            o !== (o = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
                e[33](n),
                n.$on("click", e[13]),
                n.$on("keydown", e[25]),
                n.$on("SMUIGenericInput:mount", e[26]),
                n.$on("SMUIGenericInput:unmount", e[34]),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[33](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  let es = 0;
  const ts = ([e, t]) => `${e}: ${t};`;
  function ns(e, n, a) {
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
    let o = f(n, s),
      { $$slots: r = {}, $$scope: c } = n;
    var l;
    const d = Qe(M());
    let u = () => {};
    let { use: p = [] } = n,
      { class: h = "" } = n,
      { style: b = "" } = n,
      { color: I } = n,
      {
        nonInteractive: g = null !== (l = H("SMUI:list:nonInteractive")) &&
          void 0 !== l &&
          l,
      } = n;
    w("SMUI:list:nonInteractive", void 0);
    let { ripple: y = !g } = n,
      { activated: C = !1 } = n,
      { role: T = H("SMUI:list:item:role") } = n;
    w("SMUI:list:item:role", void 0);
    let $,
      S,
      v,
      { selected: E = !1 } = n,
      { disabled: A = !1 } = n,
      { skipRestoreFocus: x = !1 } = n,
      { tabindex: D = u } = n,
      { inputId: N = "SMUI-form-field-list-" + es++ } = n,
      { href: _ } = n,
      P = {},
      O = {},
      L = {},
      R = H("SMUI:list:item:nav"),
      { component: B = R ? (_ ? Ot : Ht) : Bt } = n;
    function U(e) {
      return e in P ? P[e] : Y().classList.contains(e);
    }
    function V(e) {
      P[e] || a(16, (P[e] = !0), P);
    }
    function j(e) {
      (e in P && !P[e]) || a(16, (P[e] = !1), P);
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
    function K(e) {
      (e in L && null == L[e]) || a(18, (L[e] = void 0), L);
    }
    function W() {
      let e = !0,
        t = $.getElement();
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
    function Q(e) {
      A || qe(Y(), "SMUI:action", e);
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
      return $.getElement();
    }
    w("SMUI:generic:input:props", { id: N }),
      w("SMUI:separator:context", void 0),
      k(() => {
        if (!E && !g) {
          let e = !0,
            t = $;
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
          hasClass: U,
          addClass: V,
          removeClass: j,
          getAttr: q,
          addAttr: z,
          removeAttr: K,
          getPrimaryText: X,
          get checked() {
            var e;
            return null !== (e = S && S.checked) && void 0 !== e && e;
          },
          set checked(e) {
            S && a(14, (S.checked = !!e), S);
          },
          get hasCheckbox() {
            return !(!S || !("_smui_checkbox_accessor" in S));
          },
          get hasRadio() {
            return !(!S || !("_smui_radio_accessor" in S));
          },
          activateRipple() {
            S && S.activateRipple();
          },
          deactivateRipple() {
            S && S.deactivateRipple();
          },
          getValue: () => o.value,
          action: Q,
          get tabindex() {
            return i;
          },
          set tabindex(e) {
            a(28, (D = e));
          },
          get disabled() {
            return A;
          },
          get activated() {
            return C;
          },
          set activated(e) {
            a(1, (C = e));
          },
        };
        return (
          qe(Y(), "SMUIListItem:mount", e),
          () => {
            qe(Y(), "SMUIListItem:unmount", e);
          }
        );
      }),
      F(() => {
        v && window.cancelAnimationFrame(v);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(27, (o = f(n, s))),
          "use" in e && a(2, (p = e.use)),
          "class" in e && a(3, (h = e.class)),
          "style" in e && a(4, (b = e.style)),
          "color" in e && a(5, (I = e.color)),
          "nonInteractive" in e && a(6, (g = e.nonInteractive)),
          "ripple" in e && a(7, (y = e.ripple)),
          "activated" in e && a(1, (C = e.activated)),
          "role" in e && a(8, (T = e.role)),
          "selected" in e && a(0, (E = e.selected)),
          "disabled" in e && a(9, (A = e.disabled)),
          "skipRestoreFocus" in e && a(10, (x = e.skipRestoreFocus)),
          "tabindex" in e && a(28, (D = e.tabindex)),
          "inputId" in e && a(29, (N = e.inputId)),
          "href" in e && a(11, (_ = e.href)),
          "component" in e && a(12, (B = e.component)),
          "$$scope" in e && a(35, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          a(
            19,
            (i = D === u ? (g || A || !(E || (S && S.checked)) ? -1 : 0) : D)
          );
      }),
      [
        E,
        C,
        p,
        h,
        b,
        I,
        g,
        y,
        T,
        A,
        x,
        _,
        B,
        Q,
        S,
        $,
        P,
        O,
        L,
        i,
        d,
        R,
        V,
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
          (t || n) && Q(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            a(14, (S = e.detail));
        },
        o,
        D,
        N,
        X,
        Y,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            ($ = e), a(15, $);
          });
        },
        () => a(14, (S = void 0)),
        c,
      ]
    );
  }
  var as = pt({ class: "mdc-deprecated-list-item__text", component: Ht }),
    is = pt({ class: "mdc-deprecated-list-item__primary-text", component: Ht }),
    ss = pt({
      class: "mdc-deprecated-list-item__secondary-text",
      component: Ht,
    });
  function os(e) {
    let n, a, o, r, l, m;
    const f = e[8].default,
      h = c(f, e, e[7], null);
    let b = [
        {
          class: (a = je({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      g = {};
    for (let e = 0; e < b.length; e += 1) g = t(g, b[e]);
    return {
      c() {
        (n = $("span")), h && h.c(), N(n, g);
      },
      m(t, a) {
        y(t, n, a),
          h && h.m(n, null),
          e[9](n),
          (r = !0),
          l ||
            ((m = [I((o = Ye.call(null, n, e[0]))), I(e[3].call(null, n))]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!r || 128 & t) &&
          u(h, f, e, e[7], r ? d(f, e[7], t, null) : p(e[7]), null),
          N(
            n,
            (g = ce(b, [
              (!r ||
                (2 & t &&
                  a !==
                    (a = je({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: a },
              32 & t && e[5],
            ]))
          ),
          o && s(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i(e) {
        r || (se(h, e), (r = !0));
      },
      o(e) {
        oe(h, e), (r = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[9](null), (l = !1), i(m);
      },
    };
  }
  function rs(e, n, a) {
    const i = ["use", "class", "getElement"];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
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
          "$$scope" in e && a(7, (r = e.$$scope));
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
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(2, l);
          });
        },
      ]
    );
  }
  pt({ class: "mdc-deprecated-list-item__meta", component: Ht }),
    pt({ class: "mdc-deprecated-list-group", component: Rt }),
    pt({ class: "mdc-deprecated-list-group__subheader", component: Ft });
  const cs = class extends he {
      constructor(e) {
        super(),
          fe(
            this,
            e,
            ns,
            Ji,
            o,
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
    ls = class extends he {
      constructor(e) {
        super(), fe(this, e, rs, os, o, { use: 0, class: 1, getElement: 6 });
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
  var ds = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    us = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    ps = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (a.animationFrame = 0), (a.animationTimer = 0), a;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return us;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ds;
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
            (this.adapter.addClass(ds.OPEN),
            this.adapter.addClass(ds.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(ds.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(ds.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(ds.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(ds.OPENING) ||
            this.adapter.hasClass(ds.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(ds.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = ds.OPENING,
            n = ds.CLOSING,
            a = ds.OPEN,
            i = ds.ANIMATE,
            s = ds.ROOT;
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
    })(Se),
    ms = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        Ie(t, e),
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
    })(ps);
  function fs(e) {
    let n, a, o, r, l, m;
    const f = e[15].default,
      h = c(f, e, e[14], null);
    let b = [
        {
          class: (a = je({
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
    for (let e = 0; e < b.length; e += 1) g = t(g, b[e]);
    return {
      c() {
        (n = $("aside")), h && h.c(), N(n, g);
      },
      m(t, a) {
        y(t, n, a),
          h && h.m(n, null),
          e[16](n),
          (r = !0),
          l ||
            ((m = [
              I((o = Ye.call(null, n, e[0]))),
              I(e[7].call(null, n)),
              x(n, "keydown", e[17]),
              x(n, "transitionend", e[18]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!r || 16384 & t) &&
          u(h, f, e, e[14], r ? d(f, e[14], t, null) : p(e[14]), null),
          N(
            n,
            (g = ce(b, [
              (!r ||
                (78 & t &&
                  a !==
                    (a = je({
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
          o && s(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i(e) {
        r || (se(h, e), (r = !0));
      },
      o(e) {
        oe(h, e), (r = !1);
      },
      d(t) {
        t && C(n), h && h.d(t), e[16](null), (l = !1), i(m);
      },
    };
  }
  function hs(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    const { FocusTrap: c } = pn,
      l = Qe(M());
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: b = "" } = n,
      { variant: I } = n,
      { open: g = !1 } = n,
      { fixed: y = !0 } = n,
      C = {},
      T = null,
      $ = !1;
    w("SMUI:list:nav", !0),
      w("SMUI:list:item:nav", !0),
      w("SMUI:list:wrapFocus", !0);
    let S = I;
    function v() {
      var e, t;
      $ && $.removeEventListener("SMUIDrawerScrim:click", D),
        "modal" === I &&
          (($ =
            null !==
              (t =
                null === (e = d.parentNode) || void 0 === e
                  ? void 0
                  : e.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== t &&
            t),
          $ && $.addEventListener("SMUIDrawerScrim:click", D));
      const n = "dismissible" === I ? ps : "modal" === I ? ms : void 0;
      return n
        ? new n({
            addClass: A,
            removeClass: x,
            hasClass: E,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (T = document.activeElement),
            restoreFocus: () => {
              T &&
                "focus" in T &&
                d.contains(document.activeElement) &&
                T.focus();
            },
            focusActiveNavigationItem: () => {
              const e = d.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              a(9, (g = !1)), qe(d, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              a(9, (g = !0)), qe(d, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function E(e) {
      return e in C ? C[e] : N().classList.contains(e);
    }
    function A(e) {
      C[e] || a(6, (C[e] = !0), C);
    }
    function x(e) {
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
          $ && $.removeEventListener("SMUIDrawerScrim:click", D);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(8, (s = f(n, i))),
          "use" in e && a(0, (h = e.use)),
          "class" in e && a(1, (b = e.class)),
          "variant" in e && a(2, (I = e.variant)),
          "open" in e && a(9, (g = e.open)),
          "fixed" in e && a(3, (y = e.fixed)),
          "$$scope" in e && a(14, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        8212 & e.$$.dirty &&
          S !== I &&
          (a(13, (S = I)),
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
        b,
        I,
        y,
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
        S,
        r,
        o,
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
  class bs extends he {
    constructor(e) {
      super(),
        fe(this, e, hs, fs, o, {
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
  var Is = pt({ class: "mdc-drawer-app-content", component: Rt }),
    gs = pt({ class: "mdc-drawer__content", component: Rt });
  pt({ class: "mdc-drawer__header", component: Rt }),
    pt({ class: "mdc-drawer__title", component: Mt }),
    pt({ class: "mdc-drawer__subtitle", component: kt });
  /**
   * @license
   * Copyright 2020 Google Inc.
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
    Cs = (function () {
      function e() {
        this.rafIDs = new Map();
      }
      return (
        (e.prototype.request = function (e, t) {
          var n = this;
          this.cancel(e);
          var a = requestAnimationFrame(function (a) {
            n.rafIDs.delete(e), t(a);
          });
          this.rafIDs.set(e, a);
        }),
        (e.prototype.cancel = function (e) {
          var t = this.rafIDs.get(e);
          t && (cancelAnimationFrame(t), this.rafIDs.delete(e));
        }),
        (e.prototype.cancelAll = function () {
          var e = this;
          this.rafIDs.forEach(function (t, n) {
            e.cancel(n);
          });
        }),
        (e.prototype.getQueue = function () {
          var e = [];
          return (
            this.rafIDs.forEach(function (t, n) {
              e.push(n);
            }),
            e
          );
        }),
        e
      );
    })(),
    Ts = {
      CLOSING: "mdc-dialog--closing",
      OPEN: "mdc-dialog--open",
      OPENING: "mdc-dialog--opening",
      SCROLLABLE: "mdc-dialog--scrollable",
      SCROLL_LOCK: "mdc-dialog-scroll-lock",
      STACKED: "mdc-dialog--stacked",
      FULLSCREEN: "mdc-dialog--fullscreen",
      SCROLL_DIVIDER_HEADER: "mdc-dialog-scroll-divider-header",
      SCROLL_DIVIDER_FOOTER: "mdc-dialog-scroll-divider-footer",
      SURFACE_SCRIM_SHOWN: "mdc-dialog__surface-scrim--shown",
      SURFACE_SCRIM_SHOWING: "mdc-dialog__surface-scrim--showing",
      SURFACE_SCRIM_HIDING: "mdc-dialog__surface-scrim--hiding",
      SCRIM_HIDDEN: "mdc-dialog__scrim--hidden",
    },
    $s = {
      ACTION_ATTRIBUTE: "data-mdc-dialog-action",
      BUTTON_DEFAULT_ATTRIBUTE: "data-mdc-dialog-button-default",
      BUTTON_SELECTOR: ".mdc-dialog__button",
      CLOSED_EVENT: "MDCDialog:closed",
      CLOSE_ACTION: "close",
      CLOSING_EVENT: "MDCDialog:closing",
      CONTAINER_SELECTOR: ".mdc-dialog__container",
      CONTENT_SELECTOR: ".mdc-dialog__content",
      DESTROY_ACTION: "destroy",
      INITIAL_FOCUS_ATTRIBUTE: "data-mdc-dialog-initial-focus",
      OPENED_EVENT: "MDCDialog:opened",
      OPENING_EVENT: "MDCDialog:opening",
      SCRIM_SELECTOR: ".mdc-dialog__scrim",
      SUPPRESS_DEFAULT_PRESS_SELECTOR: [
        "textarea",
        ".mdc-menu .mdc-list-item",
        ".mdc-menu .mdc-deprecated-list-item",
      ].join(", "),
      SURFACE_SELECTOR: ".mdc-dialog__surface",
    },
    Ss = {
      DIALOG_ANIMATION_CLOSE_TIME_MS: 75,
      DIALOG_ANIMATION_OPEN_TIME_MS: 150,
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
   */ !(function (e) {
    (e.POLL_SCROLL_POS = "poll_scroll_position"),
      (e.POLL_LAYOUT_CHANGE = "poll_layout_change");
  })(ys || (ys = {}));
  var vs = (function (e) {
    function t(n) {
      var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      return (
        (a.dialogOpen = !1),
        (a.isFullscreen = !1),
        (a.animationFrame = 0),
        (a.animationTimer = 0),
        (a.escapeKeyAction = $s.CLOSE_ACTION),
        (a.scrimClickAction = $s.CLOSE_ACTION),
        (a.autoStackButtons = !0),
        (a.areButtonsStacked = !1),
        (a.suppressDefaultPressSelector = $s.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (a.animFrame = new Cs()),
        (a.contentScrollHandler = function () {
          a.handleScrollEvent();
        }),
        (a.windowResizeHandler = function () {
          a.layout();
        }),
        (a.windowOrientationChangeHandler = function () {
          a.layout();
        }),
        a
      );
    }
    return (
      Ie(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Ts;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return $s;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ss;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "defaultAdapter", {
        get: function () {
          return {
            addBodyClass: function () {},
            addClass: function () {},
            areButtonsStacked: function () {
              return !1;
            },
            clickDefaultButton: function () {},
            eventTargetMatches: function () {
              return !1;
            },
            getActionFromEvent: function () {
              return "";
            },
            getInitialFocusEl: function () {
              return null;
            },
            hasClass: function () {
              return !1;
            },
            isContentScrollable: function () {
              return !1;
            },
            notifyClosed: function () {},
            notifyClosing: function () {},
            notifyOpened: function () {},
            notifyOpening: function () {},
            releaseFocus: function () {},
            removeBodyClass: function () {},
            removeClass: function () {},
            reverseButtons: function () {},
            trapFocus: function () {},
            registerContentEventHandler: function () {},
            deregisterContentEventHandler: function () {},
            isScrollableContentAtTop: function () {
              return !1;
            },
            isScrollableContentAtBottom: function () {
              return !1;
            },
            registerWindowEventHandler: function () {},
            deregisterWindowEventHandler: function () {},
          };
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype.init = function () {
        this.adapter.hasClass(Ts.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(Ts.FULLSCREEN));
      }),
      (t.prototype.destroy = function () {
        this.animationTimer &&
          (clearTimeout(this.animationTimer), this.handleAnimationTimerEnd()),
          this.isFullscreen &&
            this.adapter.deregisterContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          this.animFrame.cancelAll(),
          this.adapter.deregisterWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.deregisterWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          );
      }),
      (t.prototype.open = function (e) {
        var t = this;
        (this.dialogOpen = !0),
          this.adapter.notifyOpening(),
          this.adapter.addClass(Ts.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(Ts.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(Ts.OPEN),
              t.adapter.addBodyClass(Ts.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, Ss.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(Ts.CLOSING),
            this.adapter.removeClass(Ts.OPEN),
            this.adapter.removeBodyClass(Ts.SCROLL_LOCK),
            this.isFullscreen &&
              this.adapter.deregisterContentEventHandler(
                "scroll",
                this.contentScrollHandler
              ),
            this.adapter.deregisterWindowEventHandler(
              "resize",
              this.windowResizeHandler
            ),
            this.adapter.deregisterWindowEventHandler(
              "orientationchange",
              this.windowOrientationChangeHandler
            ),
            cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = 0),
            clearTimeout(this.animationTimer),
            (this.animationTimer = setTimeout(function () {
              t.adapter.releaseFocus(),
                t.handleAnimationTimerEnd(),
                t.adapter.notifyClosed(e);
            }, Ss.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(Ts.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(Ts.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(Ts.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(Ts.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(Ts.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(Ts.SURFACE_SCRIM_SHOWING);
      }),
      (t.prototype.isOpen = function () {
        return this.dialogOpen;
      }),
      (t.prototype.getEscapeKeyAction = function () {
        return this.escapeKeyAction;
      }),
      (t.prototype.setEscapeKeyAction = function (e) {
        this.escapeKeyAction = e;
      }),
      (t.prototype.getScrimClickAction = function () {
        return this.scrimClickAction;
      }),
      (t.prototype.setScrimClickAction = function (e) {
        this.scrimClickAction = e;
      }),
      (t.prototype.getAutoStackButtons = function () {
        return this.autoStackButtons;
      }),
      (t.prototype.setAutoStackButtons = function (e) {
        this.autoStackButtons = e;
      }),
      (t.prototype.getSuppressDefaultPressSelector = function () {
        return this.suppressDefaultPressSelector;
      }),
      (t.prototype.setSuppressDefaultPressSelector = function (e) {
        this.suppressDefaultPressSelector = e;
      }),
      (t.prototype.layout = function () {
        var e = this;
        this.animFrame.request(ys.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, $s.SCRIM_SELECTOR) &&
          "" !== this.scrimClickAction
        )
          this.close(this.scrimClickAction);
        else {
          var t = this.adapter.getActionFromEvent(e);
          t && this.close(t);
        }
      }),
      (t.prototype.handleKeydown = function (e) {
        var t = "Enter" === e.key || 13 === e.keyCode;
        if (t && !this.adapter.getActionFromEvent(e)) {
          var n = e.composedPath ? e.composedPath()[0] : e.target,
            a =
              !this.suppressDefaultPressSelector ||
              !this.adapter.eventTargetMatches(
                n,
                this.suppressDefaultPressSelector
              );
          t && a && this.adapter.clickDefaultButton();
        }
      }),
      (t.prototype.handleDocumentKeydown = function (e) {
        ("Escape" === e.key || 27 === e.keyCode) &&
          "" !== this.escapeKeyAction &&
          this.close(this.escapeKeyAction);
      }),
      (t.prototype.handleScrollEvent = function () {
        var e = this;
        this.animFrame.request(ys.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(Ts.OPENING),
          this.adapter.removeClass(Ts.CLOSING);
      }),
      (t.prototype.runNextAnimationFrame = function (e) {
        var t = this;
        cancelAnimationFrame(this.animationFrame),
          (this.animationFrame = requestAnimationFrame(function () {
            (t.animationFrame = 0),
              clearTimeout(t.animationTimer),
              (t.animationTimer = setTimeout(e, 0));
          }));
      }),
      (t.prototype.detectStackedButtons = function () {
        this.adapter.removeClass(Ts.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(Ts.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(Ts.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(Ts.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(Ts.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(Ts.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(Ts.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(Ts.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(Ts.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(Ts.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Se);
  const { document: Es, window: As } = re,
    xs = (e) => ({}),
    Ds = (e) => ({});
  function Ns(t) {
    let n, a, i;
    return {
      c() {
        (n = $("div")), D(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, s) {
        y(e, n, s), a || ((i = x(n, "transitionend", t[31])), (a = !0));
      },
      p: e,
      d(e) {
        e && C(n), (a = !1), i();
      },
    };
  }
  function _s(e) {
    let n, a, o, r, l, m, f, h, b, T, S, v, A, _, P;
    const O = e[27].default,
      L = c(O, e, e[26], null);
    let R = e[5] && Ns(e),
      M = [
        { class: (m = je({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        Xe(e[17], "surface$"),
      ],
      k = {};
    for (let e = 0; e < M.length; e += 1) k = t(k, M[e]);
    let F = [
        { class: (f = je({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        Xe(e[17], "container$"),
      ],
      B = {};
    for (let e = 0; e < F.length; e += 1) B = t(B, F[e]);
    let w = [
        {
          class: (T = je({
            [e[2]]: !0,
            "mdc-dialog": !0,
            "mdc-dialog--stacked": !e[4],
            "mdc-dialog--fullscreen": e[5],
            "smui-dialog--selection": e[3],
            ...e[10],
          })),
        },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        ze(e[17], ["container$", "surface$"]),
      ],
      H = {};
    for (let e = 0; e < w.length; e += 1) H = t(H, w[e]);
    const U = e[27].over,
      V = c(U, e, e[26], Ds);
    return {
      c() {
        (n = E()),
          (a = $("div")),
          (o = $("div")),
          (r = $("div")),
          L && L.c(),
          (l = E()),
          R && R.c(),
          (h = E()),
          (b = $("div")),
          (v = E()),
          V && V.c(),
          N(r, k),
          N(o, B),
          D(b, "class", "mdc-dialog__scrim"),
          N(a, H);
      },
      m(t, i) {
        y(t, n, i),
          y(t, a, i),
          g(a, o),
          g(o, r),
          L && L.m(r, null),
          g(r, l),
          R && R.m(r, null),
          g(a, h),
          g(a, b),
          e[32](a),
          y(t, v, i),
          V && V.m(t, i),
          (A = !0),
          _ ||
            ((P = [
              x(As, "resize", e[28]),
              x(As, "orientationchange", e[29]),
              x(Es.body, "keydown", e[30]),
              I((S = Ye.call(null, a, e[1]))),
              I(e[11].call(null, a)),
              x(a, "SMUIDialog:opening", e[14]),
              x(a, "SMUIDialog:opened", e[15]),
              x(a, "SMUIDialog:closed", e[16]),
              x(a, "click", e[33]),
              x(a, "keydown", e[34]),
            ]),
            (_ = !0));
      },
      p(e, t) {
        L &&
          L.p &&
          (!A || 67108864 & t[0]) &&
          u(L, O, e, e[26], A ? d(O, e[26], t, null) : p(e[26]), null),
          e[5]
            ? R
              ? R.p(e, t)
              : ((R = Ns(e)), R.c(), R.m(r, null))
            : R && (R.d(1), (R = null)),
          N(
            r,
            (k = ce(M, [
              (!A ||
                (128 & t[0] &&
                  m !==
                    (m = je({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: m,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && Xe(e[17], "surface$"),
            ]))
          ),
          N(
            o,
            (B = ce(F, [
              (!A ||
                (64 & t[0] &&
                  f !==
                    (f = je({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: f,
              },
              131072 & t[0] && Xe(e[17], "container$"),
            ]))
          ),
          N(
            a,
            (H = ce(w, [
              (!A ||
                (1084 & t[0] &&
                  T !==
                    (T = je({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: T },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && ze(e[17], ["container$", "surface$"]),
            ]))
          ),
          S && s(S.update) && 2 & t[0] && S.update.call(null, e[1]),
          V &&
            V.p &&
            (!A || 67108864 & t[0]) &&
            u(V, U, e, e[26], A ? d(U, e[26], t, xs) : p(e[26]), Ds);
      },
      i(e) {
        A || (se(L, e), se(V, e), (A = !0));
      },
      o(e) {
        oe(L, e), oe(V, e), (A = !1);
      },
      d(t) {
        t && C(n),
          t && C(a),
          L && L.d(t),
          R && R.d(),
          e[32](null),
          t && C(v),
          V && V.d(t),
          (_ = !1),
          i(P);
      },
    };
  }
  function Ps(e, n, a) {
    const i = [
      "use",
      "class",
      "open",
      "selection",
      "escapeKeyAction",
      "scrimClickAction",
      "autoStackButtons",
      "fullscreen",
      "container$class",
      "surface$class",
      "isOpen",
      "setOpen",
      "layout",
      "getElement",
    ];
    let s,
      o,
      c = f(n, i),
      { $$slots: l = {}, $$scope: d } = n;
    var u;
    const { FocusTrap: p } = pn,
      { closest: h, matches: I } = xe,
      g = Qe(M());
    let y,
      C,
      T,
      { use: $ = [] } = n,
      { class: S = "" } = n,
      { open: v = !1 } = n,
      { selection: E = !1 } = n,
      { escapeKeyAction: A = "close" } = n,
      { scrimClickAction: x = "close" } = n,
      { autoStackButtons: D = !0 } = n,
      { fullscreen: N = !1 } = n,
      { container$class: _ = "" } = n,
      { surface$class: P = "" } = n,
      O = {},
      L = Ge(!1);
    r(e, L, (e) => a(38, (o = e)));
    let R = H("SMUI:dialog:aboveFullscreen"),
      B =
        null !== (u = H("SMUI:dialog:aboveFullscreenShown")) && void 0 !== u
          ? u
          : Ge(!1);
    r(e, B, (e) => a(25, (s = e)));
    let U,
      V = H("SMUI:addLayoutListener"),
      j = [];
    w("SMUI:dialog:actions:reversed", L),
      w(
        "SMUI:addLayoutListener",
        (e) => (
          j.push(e),
          () => {
            const t = j.indexOf(e);
            t >= 0 && j.splice(t, 1);
          }
        )
      ),
      w("SMUI:dialog:selection", E),
      w("SMUI:dialog:aboveFullscreen", R || N),
      w("SMUI:dialog:aboveFullscreenShown", B),
      V && (U = V(Y));
    let q = s;
    function z(e) {
      return e in O ? O[e] : Z().classList.contains(e);
    }
    function K(e) {
      O[e] || a(10, (O[e] = !0), O);
    }
    function W(e) {
      (e in O && !O[e]) || a(10, (O[e] = !1), O);
    }
    function Q() {
      return y.querySelector(".mdc-dialog__content");
    }
    function X() {
      return y.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function Y() {
      return C.layout();
    }
    function Z() {
      return y;
    }
    k(() => {
      var e;
      return (
        (T = new p(y, {
          initialFocusEl: null !== (e = X()) && void 0 !== e ? e : void 0,
        })),
        a(
          8,
          (C = new vs({
            addBodyClass: (e) => document.body.classList.add(e),
            addClass: K,
            areButtonsStacked: () => {
              return (
                (e = [].slice.call(y.querySelectorAll(".mdc-dialog__button"))),
                (t = new Set()),
                [].forEach.call(e, function (e) {
                  return t.add(e.offsetTop);
                }),
                t.size > 1
              );
              var e, t;
            },
            clickDefaultButton: () => {
              const e = y.querySelector("[data-mdc-dialog-button-default");
              e && e.click();
            },
            eventTargetMatches: (e, t) => !!e && I(e, t),
            getActionFromEvent: (e) => {
              if (!e.target) return "";
              const t = h(e.target, "[data-mdc-dialog-action]");
              return t && t.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: X,
            hasClass: z,
            isContentScrollable: () => {
              return !!(e = Q()) && e.scrollHeight > e.offsetHeight;
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
              var e;
            },
            notifyClosed: (e) => {
              a(0, (v = !1)),
                qe(
                  Z(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              qe(Z(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => qe(Z(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => qe(Z(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => T.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: W,
            reverseButtons: () => {
              b(L, (o = !0), o);
            },
            trapFocus: () => T.trapFocus(),
            registerContentEventHandler: (e, t) => {
              const n = Q();
              n instanceof HTMLElement && n.addEventListener(e, t);
            },
            deregisterContentEventHandler: (e, t) => {
              const n = Q();
              n instanceof HTMLElement && n.removeEventListener(e, t);
            },
            isScrollableContentAtTop: () => {
              return !!(e = Q()) && 0 === e.scrollTop;
              var e;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(e = Q()) &&
                Math.ceil(e.scrollHeight - e.scrollTop) === e.clientHeight
              );
              var e;
            },
            registerWindowEventHandler: (e, t) => {
              window.addEventListener(e, t);
            },
            deregisterWindowEventHandler: (e, t) => {
              window.removeEventListener(e, t);
            },
          }))
        ),
        C.init(),
        () => {
          C.destroy();
        }
      );
    }),
      F(() => {
        U && U();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(17, (c = f(n, i))),
          "use" in e && a(1, ($ = e.use)),
          "class" in e && a(2, (S = e.class)),
          "open" in e && a(0, (v = e.open)),
          "selection" in e && a(3, (E = e.selection)),
          "escapeKeyAction" in e && a(18, (A = e.escapeKeyAction)),
          "scrimClickAction" in e && a(19, (x = e.scrimClickAction)),
          "autoStackButtons" in e && a(4, (D = e.autoStackButtons)),
          "fullscreen" in e && a(5, (N = e.fullscreen)),
          "container$class" in e && a(6, (_ = e.container$class)),
          "surface$class" in e && a(7, (P = e.surface$class)),
          "$$scope" in e && a(26, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          C &&
          C.getEscapeKeyAction() !== A &&
          C.setEscapeKeyAction(A),
          524544 & e.$$.dirty[0] &&
            C &&
            C.getScrimClickAction() !== x &&
            C.setScrimClickAction(x),
          272 & e.$$.dirty[0] &&
            C &&
            C.getAutoStackButtons() !== D &&
            C.setAutoStackButtons(D),
          16 & e.$$.dirty[0] && (D || b(L, (o = !0), o)),
          257 & e.$$.dirty[0] &&
            C &&
            C.isOpen() !== v &&
            (v ? C.open({ isAboveFullscreenDialog: !!R }) : C.close()),
          50331936 & e.$$.dirty[0] &&
            N &&
            C &&
            q !== s &&
            (a(24, (q = s)), s ? C.showSurfaceScrim() : C.hideSurfaceScrim());
      }),
      [
        v,
        $,
        S,
        E,
        D,
        N,
        _,
        P,
        C,
        y,
        O,
        g,
        L,
        B,
        function () {
          R && b(B, (s = !0), s),
            requestAnimationFrame(() => {
              j.forEach((e) => e());
            });
        },
        function () {
          j.forEach((e) => e());
        },
        function () {
          R && b(B, (s = !1), s);
        },
        c,
        A,
        x,
        function () {
          return v;
        },
        function (e) {
          a(0, (v = e));
        },
        Y,
        Z,
        q,
        s,
        d,
        l,
        () => v && C && C.layout(),
        () => v && C && C.layout(),
        (e) => v && C && C.handleDocumentKeydown(e),
        () => C && C.handleSurfaceScrimTransitionEnd(),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (y = e), a(9, y);
          });
        },
        (e) => C && C.handleClick(e),
        (e) => C && C.handleKeydown(e),
      ]
    );
  }
  class Os extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Ps,
          _s,
          o,
          {
            use: 1,
            class: 2,
            open: 0,
            selection: 3,
            escapeKeyAction: 18,
            scrimClickAction: 19,
            autoStackButtons: 4,
            fullscreen: 5,
            container$class: 6,
            surface$class: 7,
            isOpen: 20,
            setOpen: 21,
            layout: 22,
            getElement: 23,
          },
          null,
          [-1, -1]
        );
    }
    get isOpen() {
      return this.$$.ctx[20];
    }
    get setOpen() {
      return this.$$.ctx[21];
    }
    get layout() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  pt({
    class: "mdc-dialog__header",
    component: Rt,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var Ls = pt({ class: "mdc-dialog__title", component: kt }),
    Rs = pt({ class: "mdc-dialog__content", component: Rt }),
    Ms = pt({
      class: "mdc-dialog__actions",
      component: Rt,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    });
  function ks(e) {
    let t;
    return {
      c() {
        (t = $("div")), D(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Fs(e) {
    let t, n, a, i;
    const s = e[27].default,
      o = c(s, e, e[29], null);
    let r = e[6] && ks();
    return {
      c() {
        (t = $("div")),
          (n = E()),
          o && o.c(),
          r && r.c(),
          (a = A()),
          D(t, "class", "mdc-button__ripple");
      },
      m(e, s) {
        y(e, t, s),
          y(e, n, s),
          o && o.m(e, s),
          r && r.m(e, s),
          y(e, a, s),
          (i = !0);
      },
      p(e, t) {
        o &&
          o.p &&
          (!i || 536870912 & t) &&
          u(o, s, e, e[29], i ? d(s, e[29], t, null) : p(e[29]), null),
          e[6]
            ? r || ((r = ks()), r.c(), r.m(a.parentNode, a))
            : r && (r.d(1), (r = null));
      },
      i(e) {
        i || (se(o, e), (i = !0));
      },
      o(e) {
        oe(o, e), (i = !1);
      },
      d(e) {
        e && C(t), e && C(n), o && o.d(e), r && r.d(e), e && C(a);
      },
    };
  }
  function Bs(e) {
    let n, a, i;
    const s = [
      {
        use: [
          [
            ta,
            {
              ripple: e[3],
              unbounded: !1,
              color: e[4],
              disabled: !!e[22].disabled,
              addClass: e[18],
              removeClass: e[19],
              addStyle: e[20],
            },
          ],
          e[16],
          ...e[0],
        ],
      },
      {
        class: je({
          [e[1]]: !0,
          "mdc-button": !0,
          "mdc-button--raised": "raised" === e[5],
          "mdc-button--unelevated": "unelevated" === e[5],
          "mdc-button--outlined": "outlined" === e[5],
          "smui-button--color-secondary": "secondary" === e[4],
          "mdc-button--touch": e[6],
          "mdc-card__action": "card:action" === e[17],
          "mdc-card__action--button": "card:action" === e[17],
          "mdc-dialog__button": "dialog:action" === e[17],
          "mdc-top-app-bar__navigation-icon":
            "top-app-bar:navigation" === e[17],
          "mdc-top-app-bar__action-item": "top-app-bar:action" === e[17],
          "mdc-snackbar__action": "snackbar:actions" === e[17],
          "mdc-banner__secondary-action": "banner" === e[17] && e[8],
          "mdc-banner__primary-action": "banner" === e[17] && !e[8],
          "mdc-tooltip__action": "tooltip:rich-actions" === e[17],
          ...e[11],
        }),
      },
      { style: Object.entries(e[12]).map(ws).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var o = e[9];
    function r(e) {
      let n = { $$slots: { default: [Fs] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) n = t(n, s[e]);
      return { props: n };
    }
    return (
      o && ((n = new o(r(e))), e[28](n), n.$on("click", e[21])),
      {
        c() {
          n && ue(n.$$.fragment), (a = A());
        },
        m(e, t) {
          n && pe(n, e, t), y(e, a, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            6289919 & t
              ? ce(s, [
                  6094873 & t && {
                    use: [
                      [
                        ta,
                        {
                          ripple: e[3],
                          unbounded: !1,
                          color: e[4],
                          disabled: !!e[22].disabled,
                          addClass: e[18],
                          removeClass: e[19],
                          addStyle: e[20],
                        },
                      ],
                      e[16],
                      ...e[0],
                    ],
                  },
                  133490 & t && {
                    class: je({
                      [e[1]]: !0,
                      "mdc-button": !0,
                      "mdc-button--raised": "raised" === e[5],
                      "mdc-button--unelevated": "unelevated" === e[5],
                      "mdc-button--outlined": "outlined" === e[5],
                      "smui-button--color-secondary": "secondary" === e[4],
                      "mdc-button--touch": e[6],
                      "mdc-card__action": "card:action" === e[17],
                      "mdc-card__action--button": "card:action" === e[17],
                      "mdc-dialog__button": "dialog:action" === e[17],
                      "mdc-top-app-bar__navigation-icon":
                        "top-app-bar:navigation" === e[17],
                      "mdc-top-app-bar__action-item":
                        "top-app-bar:action" === e[17],
                      "mdc-snackbar__action": "snackbar:actions" === e[17],
                      "mdc-banner__secondary-action":
                        "banner" === e[17] && e[8],
                      "mdc-banner__primary-action": "banner" === e[17] && !e[8],
                      "mdc-tooltip__action": "tooltip:rich-actions" === e[17],
                      ...e[11],
                    }),
                  },
                  4100 & t && {
                    style: Object.entries(e[12])
                      .map(ws)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & t && le(e[15]),
                  16384 & t && le(e[14]),
                  8192 & t && le(e[13]),
                  128 & t && { href: e[7] },
                  4194304 & t && le(e[22]),
                ])
              : {};
          if (
            (536870976 & t && (i.$$scope = { dirty: t, ctx: e }),
            o !== (o = e[9]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                ie();
            }
            o
              ? ((n = new o(r(e))),
                e[28](n),
                n.$on("click", e[21]),
                ue(n.$$.fragment),
                se(n.$$.fragment, 1),
                pe(n, a.parentNode, a))
              : (n = null);
          } else o && n.$set(i);
        },
        i(e) {
          i || (n && se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[28](null), t && C(a), n && me(n, t);
        },
      }
    );
  }
  const ws = ([e, t]) => `${e}: ${t};`;
  function Hs(e, n, a) {
    let i, s, o;
    const r = [
      "use",
      "class",
      "style",
      "ripple",
      "color",
      "variant",
      "touch",
      "href",
      "action",
      "defaultAction",
      "secondary",
      "component",
      "getElement",
    ];
    let c = f(n, r),
      { $$slots: l = {}, $$scope: d } = n;
    const u = Qe(M());
    let p,
      { use: h = [] } = n,
      { class: b = "" } = n,
      { style: I = "" } = n,
      { ripple: g = !0 } = n,
      { color: y = "primary" } = n,
      { variant: C = "text" } = n,
      { touch: T = !1 } = n,
      { href: $ } = n,
      { action: S = "close" } = n,
      { defaultAction: v = !1 } = n,
      { secondary: E = !1 } = n,
      A = {},
      x = {},
      D = H("SMUI:button:context"),
      { component: N = null == $ ? Lt : Ot } = n,
      _ = c.disabled;
    function P() {
      return p.getElement();
    }
    return (
      w("SMUI:label:context", "button"),
      w("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        a(30, (n = t(t({}, n), m(e)))),
          a(22, (c = f(n, r))),
          "use" in e && a(0, (h = e.use)),
          "class" in e && a(1, (b = e.class)),
          "style" in e && a(2, (I = e.style)),
          "ripple" in e && a(3, (g = e.ripple)),
          "color" in e && a(4, (y = e.color)),
          "variant" in e && a(5, (C = e.variant)),
          "touch" in e && a(6, (T = e.touch)),
          "href" in e && a(7, ($ = e.href)),
          "action" in e && a(23, (S = e.action)),
          "defaultAction" in e && a(24, (v = e.defaultAction)),
          "secondary" in e && a(8, (E = e.secondary)),
          "component" in e && a(9, (N = e.component)),
          "$$scope" in e && a(29, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        a(
          15,
          (i =
            "dialog:action" === D && null != S
              ? { "data-mdc-dialog-action": S }
              : { action: n.action })
        ),
          a(
            14,
            (s =
              "dialog:action" === D && v
                ? { "data-mdc-dialog-button-default": "" }
                : { default: n.default })
          ),
          a(13, (o = "banner" === D ? {} : { secondary: n.secondary })),
          _ !== c.disabled && (P().blur(), a(26, (_ = c.disabled)));
      }),
      (n = m(n)),
      [
        h,
        b,
        I,
        g,
        y,
        C,
        T,
        $,
        E,
        N,
        p,
        A,
        x,
        o,
        s,
        i,
        u,
        D,
        function (e) {
          A[e] || a(11, (A[e] = !0), A);
        },
        function (e) {
          (e in A && !A[e]) || a(11, (A[e] = !1), A);
        },
        function (e, t) {
          x[e] != t &&
            ("" === t || null == t
              ? (delete x[e], a(12, x))
              : a(12, (x[e] = t), x));
        },
        function () {
          "banner" === D &&
            qe(
              P(),
              E
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        c,
        S,
        v,
        P,
        _,
        l,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e), a(10, p);
          });
        },
        d,
      ]
    );
  }
  class Us extends he {
    constructor(e) {
      super(),
        fe(this, e, Hs, Bs, o, {
          use: 0,
          class: 1,
          style: 2,
          ripple: 3,
          color: 4,
          variant: 5,
          touch: 6,
          href: 7,
          action: 23,
          defaultAction: 24,
          secondary: 8,
          component: 9,
          getElement: 25,
        });
    }
    get getElement() {
      return this.$$.ctx[25];
    }
  }
  var Vs = new Map([
    ["avi", "video/avi"],
    ["gif", "image/gif"],
    ["ico", "image/x-icon"],
    ["jpeg", "image/jpeg"],
    ["jpg", "image/jpeg"],
    ["mkv", "video/x-matroska"],
    ["mov", "video/quicktime"],
    ["mp4", "video/mp4"],
    ["pdf", "application/pdf"],
    ["png", "image/png"],
    ["zip", "application/zip"],
    ["doc", "application/msword"],
    [
      "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  ]);
  function Gs(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          a = Vs.get(n);
        a &&
          Object.defineProperty(e, "type", {
            value: a,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return e;
    })(e);
    if ("string" != typeof n.path) {
      var a = e.webkitRelativePath;
      Object.defineProperty(n, "path", {
        value:
          "string" == typeof t
            ? t
            : "string" == typeof a && a.length > 0
            ? a
            : e.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return n;
  }
  var js = [".DS_Store", "Thumbs.db"];
  function qs(e) {
    return ye(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? Ks(e.dataTransfer, e.type)
            : zs(e)),
        ];
        var n;
      });
    });
  }
  function zs(e) {
    return (null !== e.target && e.target.files ? Qs(e.target.files) : []).map(
      function (e) {
        return Gs(e);
      }
    );
  }
  function Ks(e, t) {
    return ye(this, void 0, void 0, function () {
      var n;
      return Ce(this, function (a) {
        switch (a.label) {
          case 0:
            return e.items
              ? ((n = Qs(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(Xs))])
              : [3, 2];
          case 1:
            return [2, Ws(Ys(a.sent()))];
          case 2:
            return [
              2,
              Ws(
                Qs(e.files).map(function (e) {
                  return Gs(e);
                })
              ),
            ];
        }
      });
    });
  }
  function Ws(e) {
    return e.filter(function (e) {
      return -1 === js.indexOf(e.name);
    });
  }
  function Qs(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var a = e[n];
      t.push(a);
    }
    return t;
  }
  function Xs(e) {
    if ("function" != typeof e.webkitGetAsEntry) return Zs(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? eo(t) : Zs(e);
  }
  function Ys(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat($e(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? Ys(t) : [t]);
    }, []);
  }
  function Zs(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = Gs(t);
    return Promise.resolve(n);
  }
  function Js(e) {
    return ye(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [2, e.isDirectory ? eo(e) : to(e)];
      });
    });
  }
  function eo(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var a = [];
      !(function i() {
        var s = this;
        t.readEntries(
          function (t) {
            return ye(s, void 0, void 0, function () {
              var s, o, r;
              return Ce(this, function (c) {
                switch (c.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    c.label = 1;
                  case 1:
                    return c.trys.push([1, 3, , 4]), [4, Promise.all(a)];
                  case 2:
                    return (s = c.sent()), e(s), [3, 4];
                  case 3:
                    return (o = c.sent()), n(o), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (r = Promise.all(t.map(Js))), a.push(r), i(), (c.label = 6);
                  case 6:
                    return [2];
                }
              });
            });
          },
          function (e) {
            n(e);
          }
        );
      })();
    });
  }
  function to(e) {
    return ye(this, void 0, void 0, function () {
      return Ce(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var a = Gs(n, e.fullPath);
                t(a);
              },
              function (e) {
                n(e);
              }
            );
          }),
        ];
      });
    });
  }
  const no = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    ao = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    io = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    so = { code: "too-many-files", message: "Too many files" };
  function oo(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            a = e.name || "",
            i = (e.type || "").toLowerCase(),
            s = i.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? a.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? s === t.replace(/\/.*$/, "")
              : i === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : no(t)];
  }
  function ro(e) {
    return null != e;
  }
  function co(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function lo(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function uo(t) {
    let n, a, s, o, r, l, m;
    const f = t[32].default,
      h = c(f, t, t[31], null),
      b =
        h ||
        (function (t) {
          let n;
          return {
            c() {
              (n = $("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(e, t) {
              y(e, n, t);
            },
            p: e,
            d(e) {
              e && C(n);
            },
          };
        })();
    return {
      c() {
        var e, i, r, c;
        (n = $("div")),
          (a = $("input")),
          (s = E()),
          b && b.c(),
          D(a, "accept", t[0]),
          (a.multiple = t[1]),
          D(a, "type", "file"),
          D(a, "name", t[5]),
          D(a, "autocomplete", "off"),
          D(a, "tabindex", "-1"),
          (e = a),
          (i = "display"),
          null === (r = "none")
            ? e.style.removeProperty(i)
            : e.style.setProperty(i, r, c ? "important" : ""),
          D(n, "tabindex", "0"),
          D(
            n,
            "class",
            (o = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          D(n, "style", t[3]);
      },
      m(e, i) {
        y(e, n, i),
          g(n, a),
          t[33](a),
          g(n, s),
          b && b.m(n, null),
          t[34](n),
          (r = !0),
          l ||
            ((m = [
              x(window, "focus", t[21]),
              x(window, "dragover", t[19]),
              x(window, "drop", t[20]),
              x(a, "change", t[15]),
              x(a, "click", po),
              x(n, "keydown", t[17](t[8])),
              x(n, "focus", t[17](t[9])),
              x(n, "blur", t[17](t[10])),
              x(n, "click", t[16](t[11])),
              x(n, "dragenter", t[18](t[12])),
              x(n, "dragover", t[18](t[13])),
              x(n, "dragleave", t[18](t[14])),
              x(n, "drop", t[18](t[15])),
            ]),
            (l = !0));
      },
      p(e, t) {
        (!r || 1 & t[0]) && D(a, "accept", e[0]),
          (!r || 2 & t[0]) && (a.multiple = e[1]),
          (!r || 32 & t[0]) && D(a, "name", e[5]),
          h &&
            h.p &&
            (!r || 1 & t[1]) &&
            u(h, f, e, e[31], r ? d(f, e[31], t, null) : p(e[31]), null),
          (!r ||
            (20 & t[0] &&
              o !==
                (o =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            D(n, "class", o),
          (!r || 8 & t[0]) && D(n, "style", e[3]);
      },
      i(e) {
        r || (se(b, e), (r = !0));
      },
      o(e) {
        oe(b, e), (r = !1);
      },
      d(e) {
        e && C(n), t[33](null), b && b.d(e), t[34](null), (l = !1), i(m);
      },
    };
  }
  function po(e) {
    e.stopPropagation();
  }
  function mo(e, t, n) {
    let { $$slots: a = {}, $$scope: i } = t,
      { accept: s } = t,
      { disabled: o = !1 } = t,
      { getFilesFromEvent: r = qs } = t,
      { maxSize: c = 1 / 0 } = t,
      { minSize: l = 0 } = t,
      { multiple: d = !0 } = t,
      { preventDropOnDocument: u = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: m = !1 } = t,
      { noDrag: f = !1 } = t,
      { noDragEventsBubbling: h = !1 } = t,
      { containerClasses: b = "" } = t,
      { containerStyles: I = "" } = t,
      { disableDefaultStyles: g = !1 } = t,
      { name: y = "" } = t;
    const C = B();
    let T,
      $,
      S = {
        isFocused: !1,
        isFileDialogActive: !1,
        isDragActive: !1,
        isDragAccept: !1,
        isDragReject: !1,
        draggedFiles: [],
        acceptedFiles: [],
        fileRejections: [],
      };
    function v() {
      $ && (n(7, ($.value = null), $), (S.isFileDialogActive = !0), $.click());
    }
    function E(e) {
      return o ? null : e;
    }
    function A(e) {
      h && e.stopPropagation();
    }
    let x = [];
    return (
      F(() => {
        n(7, ($ = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (s = e.accept)),
          "disabled" in e && n(22, (o = e.disabled)),
          "getFilesFromEvent" in e && n(23, (r = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (c = e.maxSize)),
          "minSize" in e && n(25, (l = e.minSize)),
          "multiple" in e && n(1, (d = e.multiple)),
          "preventDropOnDocument" in e && n(26, (u = e.preventDropOnDocument)),
          "noClick" in e && n(27, (p = e.noClick)),
          "noKeyboard" in e && n(28, (m = e.noKeyboard)),
          "noDrag" in e && n(29, (f = e.noDrag)),
          "noDragEventsBubbling" in e && n(30, (h = e.noDragEventsBubbling)),
          "containerClasses" in e && n(2, (b = e.containerClasses)),
          "containerStyles" in e && n(3, (I = e.containerStyles)),
          "disableDefaultStyles" in e && n(4, (g = e.disableDefaultStyles)),
          "name" in e && n(5, (y = e.name)),
          "$$scope" in e && n(31, (i = e.$$scope));
      }),
      [
        s,
        d,
        b,
        I,
        g,
        y,
        T,
        $,
        function (e) {
          T &&
            T.isEqualNode(e.target) &&
            ((32 !== e.keyCode && 13 !== e.keyCode) ||
              (e.preventDefault(), v()));
        },
        function () {
          S.isFocused = !0;
        },
        function () {
          S.isFocused = !1;
        },
        function () {
          p ||
            (!(function (e = window.navigator.userAgent) {
              return (
                (function (e) {
                  return (
                    -1 !== e.indexOf("MSIE") || -1 !== e.indexOf("Trident/")
                  );
                })(e) ||
                (function (e) {
                  return -1 !== e.indexOf("Edge/");
                })(e)
              );
            })()
              ? v()
              : setTimeout(v, 0));
        },
        function (e) {
          e.preventDefault(),
            A(e),
            (x = [...x, e.target]),
            lo(e) &&
              Promise.resolve(r(e)).then((t) => {
                (co(e) && !h) ||
                  ((S.draggedFiles = t),
                  (S.isDragActive = !0),
                  C("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), A(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return lo(e) && C("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), A(e);
          const t = x.filter((e) => T && T.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (x = t),
            t.length > 0 ||
              ((S.isDragActive = !1),
              (S.draggedFiles = []),
              lo(e) && C("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            A(e),
            (x = []),
            lo(e) &&
              (C("filedropped", { event: e }),
              Promise.resolve(r(e)).then((t) => {
                if (co(e) && !h) return;
                const n = [],
                  a = [];
                t.forEach((e) => {
                  const [t, i] = oo(e, s),
                    [o, r] = (function (e, t, n) {
                      if (ro(e.size))
                        if (ro(t) && ro(n)) {
                          if (e.size > n) return [!1, ao(n)];
                          if (e.size < t) return [!1, io(t)];
                        } else {
                          if (ro(t) && e.size < t) return [!1, io(t)];
                          if (ro(n) && e.size > n) return [!1, ao(n)];
                        }
                      return [!0, null];
                    })(e, l, c);
                  if (t && o) n.push(e);
                  else {
                    const t = [i, r].filter((e) => e);
                    a.push({ file: e, errors: t });
                  }
                }),
                  !d &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      a.push({ file: e, errors: [so] });
                    }),
                    n.splice(0)),
                  (S.acceptedFiles = n),
                  (S.fileRejections = a),
                  C("drop", { acceptedFiles: n, fileRejections: a, event: e }),
                  a.length > 0 &&
                    C("droprejected", { fileRejections: a, event: e }),
                  n.length > 0 &&
                    C("dropaccepted", { acceptedFiles: n, event: e });
              })),
            (S.isFileDialogActive = !1),
            (S.isDragActive = !1),
            (S.draggedFiles = []),
            (S.acceptedFiles = []),
            (S.fileRejections = []);
        },
        E,
        function (e) {
          return m ? null : E(e);
        },
        function (e) {
          return f ? null : E(e);
        },
        function (e) {
          u && e.preventDefault();
        },
        function (e) {
          u && ((T && T.contains(e.target)) || (e.preventDefault(), (x = [])));
        },
        function () {
          S.isFileDialogActive &&
            setTimeout(() => {
              if ($) {
                const { files: e } = $;
                e.length ||
                  ((S.isFileDialogActive = !1), C("filedialogcancel"));
              }
            }, 300);
        },
        o,
        r,
        c,
        l,
        u,
        p,
        m,
        f,
        h,
        i,
        a,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            ($ = e), n(7, $);
          });
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (T = e), n(6, T);
          });
        },
      ]
    );
  }
  class fo extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          mo,
          uo,
          o,
          {
            accept: 0,
            disabled: 22,
            getFilesFromEvent: 23,
            maxSize: 24,
            minSize: 25,
            multiple: 1,
            preventDropOnDocument: 26,
            noClick: 27,
            noKeyboard: 28,
            noDrag: 29,
            noDragEventsBubbling: 30,
            containerClasses: 2,
            containerStyles: 3,
            disableDefaultStyles: 4,
            name: 5,
          },
          null,
          [-1, -1]
        );
    }
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
   */ var ho = {
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
    bo = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    Io = { ANIM_END_LATCH_MS: 250 },
    go = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.currentCheckState = bo.TRANSITION_STATE_INIT),
          (a.currentAnimationClass = ""),
          (a.animEndLatchTimer = 0),
          (a.enableAnimationEndHandler = !1),
          a
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ho;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return bo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Io;
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
            this.adapter.addClass(ho.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(ho.DISABLED)
              : this.adapter.removeClass(ho.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, Io.ANIM_END_LATCH_MS)));
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
              var n = ho.SELECTED;
              t === bo.TRANSITION_STATE_UNCHECKED
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
          var e = bo.TRANSITION_STATE_INDETERMINATE,
            t = bo.TRANSITION_STATE_CHECKED,
            n = bo.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var a = bo.TRANSITION_STATE_INIT,
            i = bo.TRANSITION_STATE_CHECKED,
            s = bo.TRANSITION_STATE_UNCHECKED,
            o = t.cssClasses,
            r = o.ANIM_UNCHECKED_CHECKED,
            c = o.ANIM_UNCHECKED_INDETERMINATE,
            l = o.ANIM_CHECKED_UNCHECKED,
            d = o.ANIM_CHECKED_INDETERMINATE,
            u = o.ANIM_INDETERMINATE_CHECKED,
            p = o.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case a:
              return n === s ? "" : n === i ? u : p;
            case s:
              return n === i ? r : c;
            case i:
              return n === s ? l : d;
            default:
              return n === i ? u : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                bo.ARIA_CHECKED_ATTR,
                bo.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(bo.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Se);
  function yo(n) {
    let a,
      o,
      r,
      c,
      l,
      d,
      u,
      p,
      m,
      f,
      h,
      b,
      T,
      S,
      v,
      A,
      _ = [
        { class: (r = je({ [n[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        n[20],
        { disabled: n[1] },
        { __value: (c = n[19](n[7]) ? n[6] : n[7]) },
        { "data-indeterminate": (l = !n[19](n[0]) && n[0] ? "true" : void 0) },
        n[16],
        Xe(n[26], "input$"),
      ],
      P = {};
    for (let e = 0; e < _.length; e += 1) P = t(P, _[e]);
    let O = [
        {
          class: (h = je({
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
        { style: (b = Object.entries(n[15]).map(Co).concat([n[4]]).join(" ")) },
        ze(n[26], ["input$"]),
      ],
      L = {};
    for (let e = 0; e < O.length; e += 1) L = t(L, O[e]);
    return {
      c() {
        (a = $("div")),
          (o = $("input")),
          (u = E()),
          (p = $("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (m = E()),
          (f = $("div")),
          N(o, P),
          D(p, "class", "mdc-checkbox__background"),
          D(f, "class", "mdc-checkbox__ripple"),
          N(a, L);
      },
      m(e, t) {
        y(e, a, t),
          g(a, o),
          o.autofocus && o.focus(),
          n[36](o),
          (o.checked = n[12]),
          g(a, u),
          g(a, p),
          g(a, m),
          g(a, f),
          n[38](a),
          v ||
            ((A = [
              I((d = Ye.call(null, o, n[8]))),
              x(o, "change", n[37]),
              x(o, "blur", n[34]),
              x(o, "focus", n[35]),
              I((T = Ye.call(null, a, n[2]))),
              I(n[18].call(null, a)),
              I(
                (S = ta.call(null, a, {
                  unbounded: !0,
                  addClass: n[23],
                  removeClass: n[24],
                  addStyle: n[25],
                  active: n[17],
                  eventTarget: n[11],
                }))
              ),
              x(a, "animationend", n[39]),
            ]),
            (v = !0));
      },
      p(e, t) {
        N(
          o,
          (P = ce(_, [
            512 & t[0] &&
              r !==
                (r = je({
                  [e[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: r },
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
            67108864 & t[0] && Xe(e[26], "input$"),
          ]))
        ),
          d && s(d.update) && 256 & t[0] && d.update.call(null, e[8]),
          4096 & t[0] && (o.checked = e[12]),
          N(
            a,
            (L = ce(O, [
              16426 & t[0] &&
                h !==
                  (h = je({
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
                b !==
                  (b = Object.entries(e[15])
                    .map(Co)
                    .concat([e[4]])
                    .join(" ")) && { style: b },
              67108864 & t[0] && ze(e[26], ["input$"]),
            ]))
          ),
          T && s(T.update) && 4 & t[0] && T.update.call(null, e[2]),
          S &&
            s(S.update) &&
            133120 & t[0] &&
            S.update.call(null, {
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
        e && C(a), n[36](null), n[38](null), (v = !1), i(A);
      },
    };
  }
  const Co = ([e, t]) => `${e}: ${t};`;
  function To(e, n, a) {
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
    var o;
    const r = Qe(M());
    let c = () => {};
    function l(e) {
      return e === c;
    }
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: b = "" } = n,
      { style: I = "" } = n,
      { disabled: g = !1 } = n,
      { touch: y = !1 } = n,
      { indeterminate: C = c } = n,
      { group: T = c } = n,
      { checked: $ = c } = n,
      { value: S = null } = n,
      { valueKey: v = c } = n,
      { input$use: E = [] } = n,
      { input$class: A = "" } = n,
      x = {},
      D = {},
      N = {},
      _ = !1,
      P = null !== (o = H("SMUI:generic:input:props")) && void 0 !== o ? o : {},
      O = l(T) ? !l($) && (null != $ ? $ : void 0) : -1 !== T.indexOf(S),
      L = H("SMUI:checkbox:context"),
      R = H("SMUI:data-table:row:header"),
      F = $,
      B = l(T) ? [] : [...T],
      w = O;
    function V(e) {
      x[e] || a(14, (x[e] = !0), x);
    }
    function j(e) {
      (e in x && !x[e]) || a(14, (x[e] = !1), x);
    }
    function q(e, t) {
      N[e] !== t && a(16, (N[e] = t), N);
    }
    function z(e) {
      (e in N && null == N[e]) || a(16, (N[e] = void 0), N);
    }
    function K() {
      return d;
    }
    k(() => {
      a(11, (p.indeterminate = !l(C) && C), p),
        a(
          10,
          (u = new go({
            addClass: V,
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
          return K();
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
          g || a(17, (_ = !0));
        },
        deactivateRipple() {
          a(17, (_ = !1));
        },
      };
      return (
        qe(d, "SMUIGenericInput:mount", e),
        qe(d, "SMUICheckbox:mount", e),
        u.init(),
        () => {
          qe(d, "SMUIGenericInput:unmount", e),
            qe(d, "SMUICheckbox:unmount", e),
            u.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(26, (s = f(n, i))),
          "use" in e && a(2, (h = e.use)),
          "class" in e && a(3, (b = e.class)),
          "style" in e && a(4, (I = e.style)),
          "disabled" in e && a(1, (g = e.disabled)),
          "touch" in e && a(5, (y = e.touch)),
          "indeterminate" in e && a(0, (C = e.indeterminate)),
          "group" in e && a(27, (T = e.group)),
          "checked" in e && a(28, ($ = e.checked)),
          "value" in e && a(6, (S = e.value)),
          "valueKey" in e && a(7, (v = e.valueKey)),
          "input$use" in e && a(8, (E = e.input$use)),
          "input$class" in e && a(9, (A = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!l(T))
            if (w !== O) {
              const t = T.indexOf(S);
              O && -1 === t
                ? (T.push(S),
                  a(27, T),
                  a(33, w),
                  a(12, O),
                  a(6, S),
                  a(32, B),
                  a(28, $),
                  a(31, F),
                  a(0, C),
                  a(11, p),
                  a(10, u))
                : O ||
                  -1 === t ||
                  (T.splice(t, 1),
                  a(27, T),
                  a(33, w),
                  a(12, O),
                  a(6, S),
                  a(32, B),
                  a(28, $),
                  a(31, F),
                  a(0, C),
                  a(11, p),
                  a(10, u)),
                (e = !0);
            } else {
              const t = B.indexOf(S),
                n = T.indexOf(S);
              t > -1 && -1 === n
                ? (a(12, (O = !1)), (e = !0))
                : n > -1 && -1 === t && (a(12, (O = !0)), (e = !0));
            }
          l($)
            ? !!w != !!O && (e = !0)
            : $ !== (null != O ? O : null) &&
              ($ === F
                ? (a(28, ($ = null != O ? O : null)), l(C) || a(0, (C = !1)))
                : a(12, (O = null != $ ? $ : void 0)),
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
            a(31, (F = $)),
            a(32, (B = l(T) ? [] : [...T])),
            a(33, (w = O)),
            e && u && u.handleChange();
        }
      }),
      [
        C,
        g,
        h,
        b,
        I,
        y,
        S,
        v,
        E,
        A,
        u,
        p,
        O,
        d,
        x,
        D,
        N,
        _,
        r,
        l,
        P,
        L,
        R,
        V,
        j,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], a(15, D))
              : a(15, (D[e] = t), D));
        },
        s,
        T,
        $,
        function () {
          return P && P.id;
        },
        K,
        F,
        B,
        w,
        function (t) {
          U.call(this, e, t);
        },
        function (t) {
          U.call(this, e, t);
        },
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e),
              a(11, p),
              a(27, T),
              a(33, w),
              a(12, O),
              a(6, S),
              a(32, B),
              a(28, $),
              a(31, F),
              a(0, C),
              a(10, u);
          });
        },
        function () {
          (O = this.checked),
            a(12, O),
            a(27, T),
            a(33, w),
            a(6, S),
            a(32, B),
            a(28, $),
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
  class $o extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          To,
          yo,
          o,
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
   */ var So = { ROOT: "mdc-form-field" },
    vo = { LABEL_SELECTOR: ".mdc-form-field > label" },
    Eo = (function (e) {
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
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return So;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return vo;
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
    })(Se);
  const Ao = (e) => ({}),
    xo = (e) => ({});
  function Do(e) {
    let n, a, o, r, l, m, f, h, b;
    const T = e[13].default,
      S = c(T, e, e[12], null),
      v = e[13].label,
      A = c(v, e, e[12], xo);
    let D = [{ for: e[4] }, Xe(e[10], "label$")],
      _ = {};
    for (let e = 0; e < D.length; e += 1) _ = t(_, D[e]);
    let P = [
        {
          class: (l = je({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        ze(e[10], ["label$"]),
      ],
      O = {};
    for (let e = 0; e < P.length; e += 1) O = t(O, P[e]);
    return {
      c() {
        (n = $("div")),
          S && S.c(),
          (a = E()),
          (o = $("label")),
          A && A.c(),
          N(o, _),
          N(n, O);
      },
      m(t, i) {
        y(t, n, i),
          S && S.m(n, null),
          g(n, a),
          g(n, o),
          A && A.m(o, null),
          e[14](o),
          e[15](n),
          (f = !0),
          h ||
            ((b = [
              I((r = Ye.call(null, o, e[5]))),
              I((m = Ye.call(null, n, e[0]))),
              I(e[9].call(null, n)),
              x(n, "SMUIGenericInput:mount", e[16]),
              x(n, "SMUIGenericInput:unmount", e[17]),
            ]),
            (h = !0));
      },
      p(e, [t]) {
        S &&
          S.p &&
          (!f || 4096 & t) &&
          u(S, T, e, e[12], f ? d(T, e[12], t, null) : p(e[12]), null),
          A &&
            A.p &&
            (!f || 4096 & t) &&
            u(A, v, e, e[12], f ? d(v, e[12], t, Ao) : p(e[12]), xo),
          N(
            o,
            (_ = ce(D, [
              (!f || 16 & t) && { for: e[4] },
              1024 & t && Xe(e[10], "label$"),
            ]))
          ),
          r && s(r.update) && 32 & t && r.update.call(null, e[5]),
          N(
            n,
            (O = ce(P, [
              (!f ||
                (14 & t &&
                  l !==
                    (l = je({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: l },
              1024 & t && ze(e[10], ["label$"]),
            ]))
          ),
          m && s(m.update) && 1 & t && m.update.call(null, e[0]);
      },
      i(e) {
        f || (se(S, e), se(A, e), (f = !0));
      },
      o(e) {
        oe(S, e), oe(A, e), (f = !1);
      },
      d(t) {
        t && C(n),
          S && S.d(t),
          A && A.d(t),
          e[14](null),
          e[15](null),
          (h = !1),
          i(b);
      },
    };
  }
  let No = 0;
  function _o(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
    let l,
      d,
      u,
      p,
      { use: h = [] } = n,
      { class: b = "" } = n,
      { align: I = "start" } = n,
      { noWrap: g = !1 } = n,
      { inputId: y = "SMUI-form-field-" + No++ } = n,
      { label$use: C = [] } = n;
    w("SMUI:generic:input:props", { id: y }),
      k(
        () => (
          (d = new Eo({
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
          "class" in e && a(1, (b = e.class)),
          "align" in e && a(2, (I = e.align)),
          "noWrap" in e && a(3, (g = e.noWrap)),
          "inputId" in e && a(4, (y = e.inputId)),
          "label$use" in e && a(5, (C = e.label$use)),
          "$$scope" in e && a(12, (r = e.$$scope));
      }),
      [
        h,
        b,
        I,
        g,
        y,
        C,
        l,
        u,
        p,
        c,
        s,
        function () {
          return l;
        },
        r,
        o,
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
  class Po extends he {
    constructor(e) {
      super(),
        fe(this, e, _o, Do, o, {
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
   */ var Oo,
    Lo,
    Ro = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Mo = {
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
    ko = {
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
  })(Oo || (Oo = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(Lo || (Lo = {}));
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
  var Fo,
    Bo = (function (e) {
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
          (a.anchorCorner = Lo.TOP_START),
          (a.originCorner = Lo.TOP_START),
          (a.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (a.position = { x: 0, y: 0 }),
          a
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ro;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Mo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return ko;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return Lo;
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
          this.originCorner = this.originCorner ^ Oo.RIGHT;
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
                    }, ko.TRANSITION_OPEN_DURATION));
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
                  }, ko.TRANSITION_CLOSE_DURATION));
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
            i = this.hasBit(n, Oo.BOTTOM) ? "bottom" : "top",
            s = this.hasBit(n, Oo.RIGHT) ? "right" : "left",
            o = this.getHorizontalOriginOffset(n),
            r = this.getVerticalOriginOffset(n),
            c = this.measurements,
            l = c.anchorSize,
            d = c.surfaceSize,
            u = (((e = {})[s] = o), (e[i] = r), e);
          l.width / d.width > ko.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (s = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(u),
            this.adapter.setTransformOrigin(s + " " + i),
            this.adapter.setPosition(u),
            this.adapter.setMaxHeight(a ? a + "px" : ""),
            this.hasBit(n, Oo.BOTTOM) ||
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
            o = i.anchorSize,
            r = i.surfaceSize,
            c = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Oo.BOTTOM)
            ? ((e = s.top - c + this.anchorMargin.bottom),
              (n = s.bottom - c - this.anchorMargin.bottom))
            : ((e = s.top - c + this.anchorMargin.top),
              (n = s.bottom - c + o.height - this.anchorMargin.top)),
            !(n - r.height > 0) && e > n && (a = this.setBit(a, Oo.BOTTOM));
          var l,
            d,
            u = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Oo.FLIP_RTL),
            m =
              this.hasBit(this.anchorCorner, Oo.RIGHT) ||
              this.hasBit(a, Oo.RIGHT),
            f = !1;
          (f = u && p ? !m : m)
            ? ((l = s.left + o.width + this.anchorMargin.right),
              (d = s.right - this.anchorMargin.right))
            : ((l = s.left + this.anchorMargin.left),
              (d = s.right + o.width - this.anchorMargin.left));
          var h = l - r.width > 0,
            b = d - r.width > 0,
            I = this.hasBit(a, Oo.FLIP_RTL) && this.hasBit(a, Oo.RIGHT);
          return (
            (b && I && u) || (!h && I)
              ? (a = this.unsetBit(a, Oo.RIGHT))
              : ((h && f && u) || (h && !f && m) || (!b && l >= d)) &&
                (a = this.setBit(a, Oo.RIGHT)),
            a
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            a = 0,
            i = this.hasBit(e, Oo.BOTTOM),
            s = this.hasBit(this.anchorCorner, Oo.BOTTOM),
            o = t.numbers.MARGIN_TO_EDGE;
          return (
            i
              ? ((a = n.top + this.anchorMargin.top - o),
                s || (a += this.measurements.anchorSize.height))
              : ((a =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  o),
                s && (a -= this.measurements.anchorSize.height)),
            a
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Oo.RIGHT),
            a = this.hasBit(this.anchorCorner, Oo.RIGHT);
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
            n = this.hasBit(e, Oo.BOTTOM),
            a = this.hasBit(this.anchorCorner, Oo.BOTTOM);
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
            o = a.surfaceSize,
            r = a.viewportSize,
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
                : (e[u] = (r.width - o.width) / 2);
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
            }, ko.TOUCH_EVENT_WAIT_MS);
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
    })(Se),
    wo = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    Ho = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    Uo = { FOCUS_ROOT_INDEX: -1 };
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
  })(Fo || (Fo = {}));
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
  var Vo = (function (e) {
      function t(n) {
        var a = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (a.closeAnimationEndTimerId = 0),
          (a.defaultFocusState = Fo.LIST_ROOT),
          (a.selectedIndex = -1),
          a
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return wo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ho;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Uo;
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
                Ho.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(a),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Bo.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case Fo.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case Fo.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case Fo.NONE:
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
              Ho.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              wo.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              wo.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              Ho.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  ki.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Ho.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  ki.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Ho.ARIA_DISABLED_ATTR,
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
    })(Se),
    Go = {
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
    jo = {
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
    qo = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    zo = (function (e) {
      function t(n, a) {
        void 0 === a && (a = {});
        var i = e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.disabled = !1),
          (i.isMenuOpen = !1),
          (i.useDefaultValidation = !0),
          (i.customValidity = !0),
          (i.lastSelectedIndex = qo.UNSET_INDEX),
          (i.clickDebounceTimeout = 0),
          (i.recentlyClicked = !1),
          (i.leadingIcon = a.leadingIcon),
          (i.helperText = a.helperText),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Go;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return qo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return jo;
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
              (e === qo.UNSET_INDEX
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
          return e !== qo.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(Go.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(Go.DISABLED),
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
          this.adapter.addClass(Go.ACTIVATED),
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
              t = this.adapter.hasClass(Go.FOCUSED),
              n = e || t,
              a = this.adapter.hasClass(Go.REQUIRED);
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
          this.adapter.removeClass(Go.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(Go.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(Go.FOCUSED),
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
          if (!this.isMenuOpen && this.adapter.hasClass(Go.FOCUSED)) {
            var t = qn(e) === hn,
              n = qn(e) === bn,
              a = qn(e) === $n,
              i = qn(e) === vn;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var s = n ? " " : e.key,
                o = this.adapter.typeaheadMatchItem(s, this.getSelectedIndex());
              return (
                o >= 0 && this.setSelectedIndex(o), void e.preventDefault()
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
            var t = this.adapter.hasClass(Go.FOCUSED);
            if (e) {
              var n = qo.LABEL_SCALE,
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
              ? (this.adapter.removeClass(Go.INVALID),
                this.adapter.removeMenuClass(Go.MENU_INVALID))
              : (this.adapter.addClass(Go.INVALID),
                this.adapter.addMenuClass(Go.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(Go.REQUIRED) &&
            !this.adapter.hasClass(Go.DISABLED)
            ? this.getSelectedIndex() !== qo.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(Go.REQUIRED)
            : this.adapter.removeClass(Go.REQUIRED),
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
            this.adapter.setMenuAnchorCorner(Lo.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(Go.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(Go.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(Go.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(Go.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(jo.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(jo.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, qo.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Se),
    Ko = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    Wo = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    Qo = (function (e) {
      function t(n) {
        return e.call(this, ge(ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Wo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ko;
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
          return "true" !== this.adapter.getAttr(Ko.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(Wo.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(Wo.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(Wo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                Wo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(Wo.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              Wo.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(Ko.ROLE)
                  : this.adapter.setAttr(Ko.ROLE, "alert"))
              );
            this.adapter.removeAttr(Ko.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(Ko.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(Ko.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Se);
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
   */ const { document: Xo } = re;
  function Yo(e) {
    let n, a, o, r, l, m, f, h;
    const b = e[31].default,
      g = c(b, e, e[30], null);
    let T = [
        {
          class: (o = je({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (r = Object.entries(e[11]).map(Zo).concat([e[3]]).join(" ")) },
        e[13],
      ],
      S = {};
    for (let e = 0; e < T.length; e += 1) S = t(S, T[e]);
    return {
      c() {
        (n = E()), (a = $("div")), g && g.c(), N(a, S);
      },
      m(t, i) {
        y(t, n, i),
          y(t, a, i),
          g && g.m(a, null),
          e[33](a),
          (m = !0),
          f ||
            ((h = [
              x(Xo.body, "click", e[32], !0),
              I((l = Ye.call(null, a, e[1]))),
              I(e[12].call(null, a)),
              x(a, "keydown", e[34]),
            ]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!m || 1073741824 & t[0]) &&
          u(g, b, e, e[30], m ? d(b, e[30], t, null) : p(e[30]), null),
          N(
            a,
            (S = ce(T, [
              (!m ||
                (1204 & t[0] &&
                  o !==
                    (o = je({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: o },
              (!m ||
                (2056 & t[0] &&
                  r !==
                    (r = Object.entries(e[11])
                      .map(Zo)
                      .concat([e[3]])
                      .join(" ")))) && { style: r },
              8192 & t[0] && e[13],
            ]))
          ),
          l && s(l.update) && 2 & t[0] && l.update.call(null, e[1]);
      },
      i(e) {
        m || (se(g, e), (m = !0));
      },
      o(e) {
        oe(g, e), (m = !1);
      },
      d(t) {
        t && C(n), t && C(a), g && g.d(t), e[33](null), (f = !1), i(h);
      },
    };
  }
  const Zo = ([e, t]) => `${e}: ${t};`;
  function Jo(e, n, a) {
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
      { $$slots: o = {}, $$scope: r } = n;
    var c, l, d;
    const u = Qe(M());
    let p,
      h,
      b,
      { use: I = [] } = n,
      { class: g = "" } = n,
      { style: y = "" } = n,
      { static: C = !1 } = n,
      { anchor: T = !0 } = n,
      { fixed: $ = !1 } = n,
      { open: S = C } = n,
      { managed: v = !1 } = n,
      { fullWidth: E = !1 } = n,
      { quickOpen: A = !1 } = n,
      { anchorElement: x } = n,
      { anchorCorner: D } = n,
      { anchorMargin: N = { top: 0, right: 0, bottom: 0, left: 0 } } = n,
      { maxHeight: _ = 0 } = n,
      { horizontallyCenteredOnViewport: P = !1 } = n,
      O = {},
      L = {};
    w("SMUI:list:role", "menu"), w("SMUI:list:item:role", "menuitem");
    const R = Lo;
    function B(e) {
      return e in O ? O[e] : j().classList.contains(e);
    }
    function H(e) {
      O[e] || a(10, (O[e] = !0), O);
    }
    function U(e) {
      (e in O && !O[e]) || a(10, (O[e] = !1), O);
    }
    function V(e) {
      h.close(e), a(0, (S = !1));
    }
    function j() {
      return p;
    }
    k(() => {
      a(
        9,
        (h = new Bo({
          addClass: H,
          removeClass: U,
          hasClass: B,
          hasAnchor: () => !!x,
          notifyClose: () => {
            v || a(0, (S = C)),
              S || qe(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            v || a(0, (S = C)),
              S || qe(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            v || a(0, (S = !0)),
              S && qe(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
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
            b =
              null !== (e = document.activeElement) && void 0 !== e
                ? e
                : void 0;
          },
          restoreFocus: () => {
            (!p || p.contains(document.activeElement)) &&
              b &&
              document.contains(b) &&
              "focus" in b &&
              b.focus();
          },
          getInnerDimensions: () => ({
            width: p.offsetWidth,
            height: p.offsetHeight,
          }),
          getAnchorDimensions: () => (x ? x.getBoundingClientRect() : null),
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
        qe(p, "SMUIMenuSurface:mount", {
          get open() {
            return S;
          },
          set open(e) {
            a(0, (S = e));
          },
          closeProgrammatic: V,
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
        T &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(13, (s = f(n, i))),
          "use" in e && a(1, (I = e.use)),
          "class" in e && a(2, (g = e.class)),
          "style" in e && a(3, (y = e.style)),
          "static" in e && a(4, (C = e.static)),
          "anchor" in e && a(15, (T = e.anchor)),
          "fixed" in e && a(5, ($ = e.fixed)),
          "open" in e && a(0, (S = e.open)),
          "managed" in e && a(6, (v = e.managed)),
          "fullWidth" in e && a(7, (E = e.fullWidth)),
          "quickOpen" in e && a(16, (A = e.quickOpen)),
          "anchorElement" in e && a(14, (x = e.anchorElement)),
          "anchorCorner" in e && a(17, (D = e.anchorCorner)),
          "anchorMargin" in e && a(18, (N = e.anchorMargin)),
          "maxHeight" in e && a(19, (_ = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            a(20, (P = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && a(30, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
          p &&
          T &&
          !(null === a(27, (c = p.parentElement)) || void 0 === c
            ? void 0
            : c.classList.contains("mdc-menu-surface--anchor")) &&
          (null === a(28, (l = p.parentElement)) ||
            void 0 === l ||
            l.classList.add("mdc-menu-surface--anchor"),
          a(
            14,
            (x =
              null !== a(29, (d = p.parentElement)) && void 0 !== d
                ? d
                : void 0)
          )),
          513 & e.$$.dirty[0] &&
            h &&
            h.isOpen() !== S &&
            (S ? h.open() : h.close()),
          66048 & e.$$.dirty[0] && h && h.setQuickOpen(A),
          544 & e.$$.dirty[0] && h && h.setFixedPosition($),
          524800 & e.$$.dirty[0] && h && h.setMaxHeight(_),
          1049088 & e.$$.dirty[0] &&
            h &&
            h.setIsHorizontallyCenteredOnViewport(P),
          131584 & e.$$.dirty[0] &&
            h &&
            null != D &&
            ("string" == typeof D
              ? h.setAnchorCorner(R[D])
              : h.setAnchorCorner(D)),
          262656 & e.$$.dirty[0] && h && h.setAnchorMargin(N);
      }),
      [
        S,
        I,
        g,
        y,
        C,
        $,
        v,
        E,
        p,
        h,
        O,
        L,
        u,
        s,
        x,
        T,
        A,
        D,
        N,
        _,
        P,
        function () {
          return S;
        },
        function (e) {
          a(0, (S = e));
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
        r,
        o,
        (e) => h && S && !v && h.handleBodyClick(e),
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (p = e), a(8, p);
          });
        },
        (e) => h && h.handleKeydown(e),
      ]
    );
  }
  class er extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          Jo,
          Yo,
          o,
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
  function tr(
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
  function nr(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function ar(e) {
    let n, a, i;
    const s = [
      { use: e[5] },
      { class: je({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function o(t) {
      e[18](t);
    }
    let r = { $$slots: { default: [nr] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) r = t(r, s[e]);
    return (
      void 0 !== e[0] && (r.open = e[0]),
      (n = new er({ props: r })),
      e[17](n),
      G.push(() => de(n, "open", o)),
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
                  2 & t && { class: je({ [e[1]]: !0, "mdc-menu": !0 }) },
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
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[17](null), me(n, t);
        },
      }
    );
  }
  function ir(e, n, a) {
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
    let o = f(n, s),
      { $$slots: r = {}, $$scope: c } = n;
    const { closest: l } = xe,
      d = Qe(M());
    let u,
      p,
      h,
      b,
      { use: I = [] } = n,
      { class: g = "" } = n,
      { open: y = !1 } = n;
    function C() {
      return u.getElement();
    }
    k(
      () => (
        a(
          3,
          (p = new Vo({
            addClassToElementAtIndex: (e, t) => {
              b.addClassForElementIndex(e, t);
            },
            removeClassFromElementAtIndex: (e, t) => {
              b.removeClassForElementIndex(e, t);
            },
            addAttributeToElementAtIndex: (e, t, n) => {
              b.setAttributeForElementIndex(e, t, n);
            },
            removeAttributeFromElementAtIndex: (e, t) => {
              b.removeAttributeForElementIndex(e, t);
            },
            getAttributeFromElementAtIndex: (e, t) =>
              b.getAttributeFromElementIndex(e, t),
            elementContainsClass: (e, t) => e.classList.contains(t),
            closeSurface: (e) => h.closeProgrammatic(e),
            getElementIndex: (e) =>
              b
                .getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              qe(
                C(),
                "SMUIMenu:selected",
                { index: e.index, item: b.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => b.items.length,
            focusItemAtIndex: (e) => b.focusItemAtIndex(e),
            focusListRoot: () => "focus" in b.element && b.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!l(b.getOrderedList()[e].element, `.${wo.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = b.getOrderedList(),
                n = l(t[e].element, `.${wo.MENU_SELECTION_GROUP}`),
                a =
                  null == n
                    ? void 0
                    : n.querySelector(`.${wo.MENU_SELECTED_LIST_ITEM}`);
              return a ? t.map((e) => e.element).indexOf(a) : -1;
            },
          }))
        ),
        qe(C(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(9, (o = f(n, s))),
          "use" in e && a(10, (I = e.use)),
          "class" in e && a(1, (g = e.class)),
          "open" in e && a(0, (y = e.open)),
          "$$scope" in e && a(21, (c = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && a(5, (i = [d, ...I]));
      }),
      [
        y,
        g,
        u,
        p,
        b,
        i,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          h || (h = e.detail);
        },
        function (e) {
          b || a(4, (b = e.detail));
        },
        o,
        I,
        function () {
          return y;
        },
        function (e) {
          a(0, (y = e));
        },
        function (e) {
          p.setDefaultFocusState(e);
        },
        function () {
          return p.getSelectedIndex();
        },
        C,
        r,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (u = e), a(2, u);
          });
        },
        function (e) {
          (y = e), a(0, y);
        },
        () => p && p.handleMenuSurfaceOpened(),
        (e) =>
          p && p.handleItemAction(b.getOrderedList()[e.detail.index].element),
        c,
      ]
    );
  }
  class sr extends he {
    constructor(e) {
      super(),
        fe(this, e, ir, ar, o, {
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
  function or(t) {
    let n;
    return {
      c() {
        n = v(t[8]);
      },
      m(e, t) {
        y(e, n, t);
      },
      p(e, t) {
        256 & t && _(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function rr(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function cr(e) {
    let n, a, o, r, c, l, d, u, p;
    const m = [rr, or],
      f = [];
    function h(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (a = h(e)), (o = f[a] = m[a](e));
    let b = [
        {
          class: (r = je({
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
    for (let e = 0; e < b.length; e += 1) g = t(g, b[e]);
    return {
      c() {
        (n = $("div")), o.c(), N(n, g);
      },
      m(t, i) {
        y(t, n, i),
          f[a].m(n, null),
          e[14](n),
          (d = !0),
          u ||
            ((p = [I((l = Ye.call(null, n, e[0]))), I(e[9].call(null, n))]),
            (u = !0));
      },
      p(e, [t]) {
        let i = a;
        (a = h(e)),
          a === i
            ? f[a].p(e, t)
            : (ae(),
              oe(f[i], 1, 1, () => {
                f[i] = null;
              }),
              ie(),
              (o = f[a]),
              o ? o.p(e, t) : ((o = f[a] = m[a](e)), o.c()),
              se(o, 1),
              o.m(n, null)),
          N(
            n,
            (g = ce(b, [
              (!d ||
                (90 & t &&
                  r !==
                    (r = je({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: r },
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
        d || (se(o), (d = !0));
      },
      o(e) {
        oe(o), (d = !1);
      },
      d(t) {
        t && C(n), f[a].d(), e[14](null), (u = !1), i(p);
      },
    };
  }
  pt({ class: "mdc-menu__selection-group-icon", component: ls });
  let lr = 0;
  function dr(e, n, a) {
    const i = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let s = f(n, i),
      { $$slots: o = {}, $$scope: r } = n;
    const c = Qe(M());
    let l,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { id: b = "SMUI-select-helper-text-" + lr++ } = n,
      { persistent: I = !1 } = n,
      { validationMsg: g = !1 } = n,
      y = {},
      C = {};
    function T(e) {
      return e in y ? y[e] : x().classList.contains(e);
    }
    function $(e) {
      y[e] || a(6, (y[e] = !0), y);
    }
    function S(e) {
      (e in y && !y[e]) || a(6, (y[e] = !1), y);
    }
    function v(e) {
      var t;
      return e in C
        ? null !== (t = C[e]) && void 0 !== t
          ? t
          : null
        : x().getAttribute(e);
    }
    function E(e, t) {
      C[e] !== t && a(7, (C[e] = t), C);
    }
    function A(e) {
      (e in C && null == C[e]) || a(7, (C[e] = void 0), C);
    }
    function x() {
      return l;
    }
    return (
      k(
        () => (
          (d = new Qo({
            addClass: $,
            removeClass: S,
            hasClass: T,
            getAttr: v,
            setAttr: E,
            removeAttr: A,
            setContent: (e) => {
              a(8, (u = e));
            },
          })),
          b.startsWith("SMUI-select-helper-text-") &&
            qe(x(), "SMUISelectHelperText:id", b),
          qe(x(), "SMUISelectHelperText:mount", d),
          d.init(),
          () => {
            qe(x(), "SMUISelectHelperText:unmount", d), d.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(10, (s = f(n, i))),
          "use" in e && a(0, (p = e.use)),
          "class" in e && a(1, (h = e.class)),
          "id" in e && a(2, (b = e.id)),
          "persistent" in e && a(3, (I = e.persistent)),
          "validationMsg" in e && a(4, (g = e.validationMsg)),
          "$$scope" in e && a(12, (r = e.$$scope));
      }),
      [
        p,
        h,
        b,
        I,
        g,
        l,
        y,
        C,
        u,
        c,
        s,
        x,
        r,
        o,
        function (e) {
          G[e ? "unshift" : "push"](() => {
            (l = e), a(5, l);
          });
        },
      ]
    );
  }
  class ur extends he {
    constructor(e) {
      super(),
        fe(this, e, dr, cr, o, {
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
  const pr = (e) => ({}),
    mr = (e) => ({}),
    fr = (e) => ({}),
    hr = (e) => ({}),
    br = (e) => ({}),
    Ir = (e) => ({}),
    gr = (e) => ({}),
    yr = (e) => ({});
  function Cr(e) {
    let n,
      a = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        Xe(e[53], "input$"),
      ],
      i = {};
    for (let e = 0; e < a.length; e += 1) i = t(i, a[e]);
    return {
      c() {
        (n = $("input")), N(n, i);
      },
      m(e, t) {
        y(e, n, t), n.autofocus && n.focus();
      },
      p(e, t) {
        N(
          n,
          (i = ce(a, [
            { type: "hidden" },
            1024 & t[0] && { required: e[10] },
            64 & t[0] && { disabled: e[6] },
            1 & t[0] && { value: e[0] },
            4194304 & t[1] && Xe(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && C(n);
      },
    };
  }
  function Tr(e) {
    let t;
    return {
      c() {
        (t = $("span")), D(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function $r(e) {
    let n, a;
    const i = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Xe(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Sr] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ca({ props: s })),
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
                  4194304 & t[1] && le(Xe(e[53], "label$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[66](null), me(n, t);
        },
      }
    );
  }
  function Sr(e) {
    let t,
      n,
      a = (null == e[9] ? "" : e[9]) + "";
    const i = e[63].label,
      s = c(i, e, e[89], yr);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        y(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, o) {
        (!n || 512 & o[0]) &&
          a !== (a = (null == e[9] ? "" : e[9]) + "") &&
          _(t, a),
          s &&
            s.p &&
            (!n || 134217728 & o[2]) &&
            u(s, i, e, e[89], n ? d(i, e[89], o, gr) : p(e[89]), yr);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function vr(e) {
    let n, a;
    const i = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      Xe(e[53], "outline$"),
    ];
    let s = { $$slots: { default: [xr] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new Ia({ props: s })),
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
                  4194304 & t[1] && le(Xe(e[53], "outline$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[68](null), me(n, t);
        },
      }
    );
  }
  function Er(e) {
    let n, a;
    const i = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Xe(e[53], "label$"),
    ];
    let s = { $$slots: { default: [Ar] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ca({ props: s })),
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
                  4194304 & t[1] && le(Xe(e[53], "label$")),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[67](null), me(n, t);
        },
      }
    );
  }
  function Ar(e) {
    let t,
      n,
      a = (null == e[9] ? "" : e[9]) + "";
    const i = e[63].label,
      s = c(i, e, e[89], Ir);
    return {
      c() {
        (t = v(a)), s && s.c();
      },
      m(e, a) {
        y(e, t, a), s && s.m(e, a), (n = !0);
      },
      p(e, o) {
        (!n || 512 & o[0]) &&
          a !== (a = (null == e[9] ? "" : e[9]) + "") &&
          _(t, a),
          s &&
            s.p &&
            (!n || 134217728 & o[2]) &&
            u(s, i, e, e[89], n ? d(i, e[89], o, br) : p(e[89]), Ir);
      },
      i(e) {
        n || (se(s, e), (n = !0));
      },
      o(e) {
        oe(s, e), (n = !1);
      },
      d(e) {
        e && C(t), s && s.d(e);
      },
    };
  }
  function xr(e) {
    let t,
      n,
      a = !e[8] && (null != e[9] || e[52].label) && Er(e);
    return {
      c() {
        a && a.c(), (t = A());
      },
      m(e, i) {
        a && a.m(e, i), y(e, t, i), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? a &&
            (ae(),
            oe(a, 1, 1, () => {
              a = null;
            }),
            ie())
          : a
          ? (a.p(e, n), (768 & n[0]) | (2097152 & n[1]) && se(a, 1))
          : ((a = Er(e)), a.c(), se(a, 1), a.m(t.parentNode, t));
      },
      i(e) {
        n || (se(a), (n = !0));
      },
      o(e) {
        oe(a), (n = !1);
      },
      d(e) {
        a && a.d(e), e && C(t);
      },
    };
  }
  function Dr(e) {
    let n, a;
    const i = [Xe(e[53], "ripple$")];
    let s = {};
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new pa({ props: s })),
      e[70](n),
      {
        c() {
          ue(n.$$.fragment);
        },
        m(e, t) {
          pe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a = 4194304 & t[1] ? ce(i, [le(Xe(e[53], "ripple$"))]) : {};
          n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[70](null), me(n, t);
        },
      }
    );
  }
  function Nr(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function _r(e) {
    let n, a, i;
    const s = [{ role: "listbox" }, { wrapFocus: e[36] }, Xe(e[53], "list$")];
    function o(t) {
      e[76](t);
    }
    let r = { $$slots: { default: [Nr] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) r = t(r, s[e]);
    return (
      void 0 !== e[24] && (r.selectedIndex = e[24]),
      (n = new Xi({ props: r })),
      G.push(() => de(n, "selectedIndex", o)),
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
                  4194304 & t[1] && le(Xe(e[53], "list$")),
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
          oe(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function Pr(e) {
    let n, a;
    const i = [Xe(e[53], "helperText$")];
    let s = { $$slots: { default: [Or] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new ur({ props: s })),
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
          const a = 4194304 & t[1] ? ce(i, [le(Xe(e[53], "helperText$"))]) : {};
          134217728 & t[2] && (a.$$scope = { dirty: t, ctx: e }), n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function Or(e) {
    let t;
    const n = e[63].helperText,
      a = c(n, e, e[89], mr);
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
          u(a, n, e, e[89], t ? d(n, e[89], i, pr) : p(e[89]), mr);
      },
      i(e) {
        t || (se(a, e), (t = !0));
      },
      o(e) {
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function Lr(e) {
    let n,
      a,
      o,
      r,
      l,
      m,
      f,
      h,
      b,
      T,
      P,
      O,
      L,
      R,
      M,
      k,
      F,
      B,
      w,
      H,
      U,
      V,
      j,
      q,
      z,
      K,
      W,
      Q,
      Y,
      Z,
      J,
      ee,
      te,
      ne,
      re,
      fe,
      he,
      be,
      Ie,
      ge,
      ye = e[12] && Cr(e),
      Ce = "filled" === e[7] && Tr(),
      Te =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && $r(e),
      $e = "outlined" === e[7] && vr(e);
    const Se = e[63].leadingIcon,
      ve = c(Se, e, e[89], hr);
    let Ee = [
        { id: (P = e[11] + "-smui-selected-text") },
        { class: (O = je({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (L = e[11] + "-smui-label") },
        Xe(e[53], "selectedText$"),
      ],
      Ae = {};
    for (let e = 0; e < Ee.length; e += 1) Ae = t(Ae, Ee[e]);
    let xe = [
        {
          class: (M = je({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        Xe(e[53], "selectedTextContainer$"),
      ],
      De = {};
    for (let e = 0; e < xe.length; e += 1) De = t(De, xe[e]);
    let Ne = [
        { class: (V = je({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        Xe(e[53], "dropdownIcon$"),
      ],
      _e = {};
    for (let e = 0; e < Ne.length; e += 1) _e = t(_e, Ne[e]);
    let Pe = "outlined" !== e[7] && e[5] && Dr(e),
      Oe = [
        { class: (z = je({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (K = e[10] ? "true" : void 0) },
        { "aria-disabled": (W = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        Xe(e[53], "anchor$"),
      ],
      Le = {};
    for (let e = 0; e < Oe.length; e += 1) Le = t(Le, Oe[e]);
    const Re = [
      { class: je({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      Xe(e[53], "menu$"),
    ];
    function Me(t) {
      e[78](t);
    }
    let ke = { $$slots: { default: [_r] }, $$scope: { ctx: e } };
    for (let e = 0; e < Re.length; e += 1) ke = t(ke, Re[e]);
    void 0 !== e[32] && (ke.open = e[32]),
      (Z = new sr({ props: ke })),
      G.push(() => de(Z, "open", Me)),
      Z.$on("SMUIMenu:selected", e[79]),
      Z.$on("SMUIMenuSurface:closing", e[80]),
      Z.$on("SMUIMenuSurface:closed", e[81]),
      Z.$on("SMUIMenuSurface:opened", e[82]);
    let Fe = [
        {
          class: (ee = je({
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
          style: (te = Object.entries(e[27]).map(Mr).concat([e[4]]).join(" ")),
        },
        ze(e[53], [
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
    let we = e[52].helperText && Pr(e);
    return {
      c() {
        (n = $("div")),
          ye && ye.c(),
          (a = E()),
          (o = $("div")),
          Ce && Ce.c(),
          (r = E()),
          Te && Te.c(),
          (l = E()),
          $e && $e.c(),
          (m = E()),
          ve && ve.c(),
          (f = E()),
          (h = $("span")),
          (b = $("span")),
          (T = v(e[43])),
          (F = E()),
          (B = $("span")),
          (w = S("svg")),
          (H = S("polygon")),
          (U = S("polygon")),
          (q = E()),
          Pe && Pe.c(),
          (Y = E()),
          ue(Z.$$.fragment),
          (fe = E()),
          we && we.c(),
          (he = A()),
          N(b, Ae),
          N(h, De),
          D(H, "class", "mdc-select__dropdown-icon-inactive"),
          D(H, "stroke", "none"),
          D(H, "fill-rule", "evenodd"),
          D(H, "points", "7 10 12 15 17 10"),
          D(U, "class", "mdc-select__dropdown-icon-active"),
          D(U, "stroke", "none"),
          D(U, "fill-rule", "evenodd"),
          D(U, "points", "7 15 12 10 17 15"),
          D(w, "class", "mdc-select__dropdown-icon-graphic"),
          D(w, "viewBox", "7 10 10 5"),
          D(w, "focusable", "false"),
          N(B, _e),
          N(o, Le),
          N(n, Be);
      },
      m(t, i) {
        y(t, n, i),
          ye && ye.m(n, null),
          g(n, a),
          g(n, o),
          Ce && Ce.m(o, null),
          g(o, r),
          Te && Te.m(o, null),
          g(o, l),
          $e && $e.m(o, null),
          g(o, m),
          ve && ve.m(o, null),
          g(o, f),
          g(o, h),
          g(h, b),
          g(b, T),
          e[69](b),
          g(o, F),
          g(o, B),
          g(B, w),
          g(w, H),
          g(w, U),
          g(o, q),
          Pe && Pe.m(o, null),
          e[71](o),
          g(n, Y),
          pe(Z, n, null),
          e[83](n),
          y(t, fe, i),
          we && we.m(t, i),
          y(t, he, i),
          (be = !0),
          Ie ||
            ((ge = [
              I((R = Ye.call(null, b, e[18]))),
              I((k = Ye.call(null, h, e[16]))),
              I((j = Ye.call(null, B, e[20]))),
              I((Q = Ye.call(null, o, e[14]))),
              x(o, "focus", e[72]),
              x(o, "blur", e[73]),
              x(o, "click", e[74]),
              x(o, "keydown", e[75]),
              x(o, "focus", e[64]),
              x(o, "blur", e[65]),
              I(
                (ne = ta.call(null, n, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              I(tr.call(null, n, { addClass: e[49], removeClass: e[50] })),
              I((re = Ye.call(null, n, e[2]))),
              I(e[44].call(null, n)),
              x(n, "SMUISelectLeadingIcon:mount", e[84]),
              x(n, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            (Ie = !0));
      },
      p(e, t) {
        e[12]
          ? ye
            ? ye.p(e, t)
            : ((ye = Cr(e)), ye.c(), ye.m(n, a))
          : ye && (ye.d(1), (ye = null)),
          "filled" === e[7]
            ? Ce || ((Ce = Tr()), Ce.c(), Ce.m(o, r))
            : Ce && (Ce.d(1), (Ce = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? Te &&
              (ae(),
              oe(Te, 1, 1, () => {
                Te = null;
              }),
              ie())
            : Te
            ? (Te.p(e, t), (896 & t[0]) | (2097152 & t[1]) && se(Te, 1))
            : ((Te = $r(e)), Te.c(), se(Te, 1), Te.m(o, l)),
          "outlined" === e[7]
            ? $e
              ? ($e.p(e, t), 128 & t[0] && se($e, 1))
              : (($e = vr(e)), $e.c(), se($e, 1), $e.m(o, m))
            : $e &&
              (ae(),
              oe($e, 1, 1, () => {
                $e = null;
              }),
              ie()),
          ve &&
            ve.p &&
            (!be || 134217728 & t[2]) &&
            u(ve, Se, e, e[89], be ? d(Se, e[89], t, fr) : p(e[89]), hr),
          (!be || 4096 & t[1]) && _(T, e[43]),
          N(
            b,
            (Ae = ce(Ee, [
              (!be ||
                (2048 & t[0] && P !== (P = e[11] + "-smui-selected-text"))) && {
                id: P,
              },
              (!be ||
                (524288 & t[0] &&
                  O !==
                    (O = je({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: O },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!be || (2048 & t[0] && L !== (L = e[11] + "-smui-label"))) && {
                "aria-labelledby": L,
              },
              4194304 & t[1] && Xe(e[53], "selectedText$"),
            ]))
          ),
          R && s(R.update) && 262144 & t[0] && R.update.call(null, e[18]),
          N(
            h,
            (De = ce(xe, [
              (!be ||
                (131072 & t[0] &&
                  M !==
                    (M = je({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: M },
              4194304 & t[1] && Xe(e[53], "selectedTextContainer$"),
            ]))
          ),
          k && s(k.update) && 65536 & t[0] && k.update.call(null, e[16]),
          N(
            B,
            (_e = ce(Ne, [
              (!be ||
                (2097152 & t[0] &&
                  V !==
                    (V = je({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & t[1] && Xe(e[53], "dropdownIcon$"),
            ]))
          ),
          j && s(j.update) && 1048576 & t[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? Pe
              ? (Pe.p(e, t), 160 & t[0] && se(Pe, 1))
              : ((Pe = Dr(e)), Pe.c(), se(Pe, 1), Pe.m(o, null))
            : Pe &&
              (ae(),
              oe(Pe, 1, 1, () => {
                Pe = null;
              }),
              ie()),
          N(
            o,
            (Le = ce(Oe, [
              (!be ||
                (32768 & t[0] &&
                  z !==
                    (z = je({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: z,
              },
              (!be || (1024 & t[0] && K !== (K = e[10] ? "true" : void 0))) && {
                "aria-required": K,
              },
              (!be || (64 & t[0] && W !== (W = e[6] ? "true" : void 0))) && {
                "aria-disabled": W,
              },
              (!be || 1 & t[1]) && { "aria-controls": e[31] },
              (!be || 1 & t[1]) && { "aria-describedby": e[31] },
              536870912 & t[0] && e[29],
              4194304 & t[1] && Xe(e[53], "anchor$"),
            ]))
          ),
          Q && s(Q.update) && 16384 & t[0] && Q.update.call(null, e[14]);
        const i =
          (4194304 & t[0]) | (4194332 & t[1])
            ? ce(Re, [
                (4194304 & t[0]) | (4 & t[1]) && {
                  class: je({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Re[1],
                Re[2],
                8 & t[1] && { anchorElement: e[34] },
                16 & t[1] && { anchorCorner: e[35] },
                4194304 & t[1] && le(Xe(e[53], "menu$")),
              ])
            : {};
        (16777216 & t[0]) | (4194400 & t[1]) | (134217728 & t[2]) &&
          (i.$$scope = { dirty: t, ctx: e }),
          !J && 2 & t[1] && ((J = !0), (i.open = e[32]), X(() => (J = !1))),
          Z.$set(i),
          N(
            n,
            (Be = ce(Fe, [
              (!be ||
                ((67119050 & t[0]) | (2097154 & t[1]) &&
                  ee !==
                    (ee = je({
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
              (!be ||
                (134217744 & t[0] &&
                  te !==
                    (te = Object.entries(e[27])
                      .map(Mr)
                      .concat([e[4]])
                      .join(" ")))) && { style: te },
              4194304 & t[1] &&
                ze(e[53], [
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
          re && s(re.update) && 4 & t[0] && re.update.call(null, e[2]),
          e[52].helperText
            ? we
              ? (we.p(e, t), 2097152 & t[1] && se(we, 1))
              : ((we = Pr(e)), we.c(), se(we, 1), we.m(he.parentNode, he))
            : we &&
              (ae(),
              oe(we, 1, 1, () => {
                we = null;
              }),
              ie());
      },
      i(e) {
        be ||
          (se(Te),
          se($e),
          se(ve, e),
          se(Pe),
          se(Z.$$.fragment, e),
          se(we),
          (be = !0));
      },
      o(e) {
        oe(Te),
          oe($e),
          oe(ve, e),
          oe(Pe),
          oe(Z.$$.fragment, e),
          oe(we),
          (be = !1);
      },
      d(t) {
        t && C(n),
          ye && ye.d(),
          Ce && Ce.d(),
          Te && Te.d(),
          $e && $e.d(),
          ve && ve.d(t),
          e[69](null),
          Pe && Pe.d(),
          e[71](null),
          me(Z),
          e[83](null),
          t && C(fe),
          we && we.d(t),
          t && C(he),
          (Ie = !1),
          i(ge);
      },
    };
  }
  let Rr = 0;
  const Mr = ([e, t]) => `${e}: ${t};`;
  function kr(e, n, a) {
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
      o,
      c = f(n, i),
      { $$slots: l = {}, $$scope: d } = n;
    const u = h(l),
      p = Qe(M());
    let I = () => {};
    function g(e) {
      return e === I;
    }
    let { use: y = [] } = n,
      { class: C = "" } = n,
      { style: T = "" } = n,
      { ripple: $ = !0 } = n,
      { disabled: S = !1 } = n,
      { variant: v = "standard" } = n,
      { noLabel: E = !1 } = n,
      { label: A } = n,
      { value: x = "" } = n,
      { key: D = (e) => e } = n,
      { dirty: N = !1 } = n,
      { invalid: _ = I } = n,
      { updateInvalid: P = g(_) } = n;
    const O = g(_);
    g(_) && (_ = !1);
    let L,
      R,
      B,
      V,
      j,
      q,
      z,
      K,
      W,
      Q,
      X,
      Y,
      Z,
      J,
      { required: ee = !1 } = n,
      { inputId: te = "SMUI-select-" + Rr++ } = n,
      { hiddenInput: ne = !1 } = n,
      { withLeadingIcon: ae = I } = n,
      { anchor$use: ie = [] } = n,
      { anchor$class: se = "" } = n,
      { selectedTextContainer$use: oe = [] } = n,
      { selectedTextContainer$class: re = "" } = n,
      { selectedText$use: ce = [] } = n,
      { selectedText$class: le = "" } = n,
      { dropdownIcon$use: de = [] } = n,
      { dropdownIcon$class: ue = "" } = n,
      { menu$class: pe = "" } = n,
      me = {},
      fe = {},
      he = {},
      be = -1,
      Ie = H("SMUI:addLayoutListener"),
      ge = !1,
      ye = {},
      Ce = !1,
      Te = H("SMUI:select:context");
    w("SMUI:list:role", ""), w("SMUI:list:nav", !1);
    const $e = Ge("");
    r(e, $e, (e) => a(43, (s = e))), w("SMUI:select:selectedText", $e);
    const Se = Ge(x);
    r(e, Se, (e) => a(91, (o = e))), w("SMUI:select:value", Se);
    let ve = be;
    function Ee(e) {
      return e in me ? me[e] : ke().classList.contains(e);
    }
    function Ae(e) {
      me[e] || a(26, (me[e] = !0), me);
    }
    function xe(e) {
      (e in me && !me[e]) || a(26, (me[e] = !1), me);
    }
    function De(e) {
      ye[e] || a(33, (ye[e] = !0), ye);
    }
    function Ne(e) {
      (e in ye && !ye[e]) || a(33, (ye[e] = !1), ye);
    }
    function _e(e) {
      var t;
      return e in he
        ? null !== (t = he[e]) && void 0 !== t
          ? t
          : null
        : ke().getAttribute(e);
    }
    function Pe(e, t) {
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
    Ie && (q = Ie(Me)),
      k(
        () => (
          a(
            23,
            (R = new zo(
              {
                setSelectedText: (e) => {
                  b($e, (s = e), s);
                },
                isSelectAnchorFocused: () => document.activeElement === B,
                getSelectAnchorAttr: _e,
                setSelectAnchorAttr: Pe,
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
                  a(35, (K = e));
                },
                setMenuWrapFocus: (e) => {
                  a(36, (Ce = e));
                },
                getSelectedIndex: () => be,
                setSelectedIndex: (e) => {
                  a(62, (ve = e)), a(24, (be = e)), a(0, (x = Le()[be]));
                },
                focusMenuItemAtIndex: (e) => {
                  W.focusItemAtIndex(e);
                },
                getMenuItemCount: () => W.items.length,
                getMenuItemValues: () => Le().map(D),
                getMenuItemTextAtIndex: (e) => W.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => W.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => W.typeaheadMatchItem(e, t),
                addClass: Ae,
                removeClass: xe,
                hasClass: Ee,
                setRippleCenter: (e) => Z && Z.setRippleCenter(e),
                activateBottomLine: () => Z && Z.activate(),
                deactivateBottomLine: () => Z && Z.deactivate(),
                notifyChange: (e) => {
                  a(54, (N = !0)),
                    P && a(1, (_ = !R.isValid())),
                    qe(
                      ke(),
                      "SMUISelect:change",
                      { value: x, index: be },
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
                  return Q;
                },
              }
            ))
          ),
          a(24, (be = Le().indexOf(x))),
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
          "use" in e && a(2, (y = e.use)),
          "class" in e && a(3, (C = e.class)),
          "style" in e && a(4, (T = e.style)),
          "ripple" in e && a(5, ($ = e.ripple)),
          "disabled" in e && a(6, (S = e.disabled)),
          "variant" in e && a(7, (v = e.variant)),
          "noLabel" in e && a(8, (E = e.noLabel)),
          "label" in e && a(9, (A = e.label)),
          "value" in e && a(0, (x = e.value)),
          "key" in e && a(55, (D = e.key)),
          "dirty" in e && a(54, (N = e.dirty)),
          "invalid" in e && a(1, (_ = e.invalid)),
          "updateInvalid" in e && a(56, (P = e.updateInvalid)),
          "required" in e && a(10, (ee = e.required)),
          "inputId" in e && a(11, (te = e.inputId)),
          "hiddenInput" in e && a(12, (ne = e.hiddenInput)),
          "withLeadingIcon" in e && a(13, (ae = e.withLeadingIcon)),
          "anchor$use" in e && a(14, (ie = e.anchor$use)),
          "anchor$class" in e && a(15, (se = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            a(16, (oe = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            a(17, (re = e.selectedTextContainer$class)),
          "selectedText$use" in e && a(18, (ce = e.selectedText$use)),
          "selectedText$class" in e && a(19, (le = e.selectedText$class)),
          "dropdownIcon$use" in e && a(20, (de = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && a(21, (ue = e.dropdownIcon$class)),
          "menu$class" in e && a(22, (pe = e.menu$class)),
          "$$scope" in e && a(89, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && ve !== be)
          if ((a(62, (ve = be)), R)) R.setSelectedIndex(be, !1, !0);
          else {
            const e = Le();
            x !== e[be] && a(0, (x = e[be]));
          }
        1 & e.$$.dirty[0] && b(Se, (o = x), o),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            R &&
            R.getValue() !== D(x) &&
            R.setValue(D(x)),
          8388672 & e.$$.dirty[0] &&
            R &&
            R.getDisabled() !== S &&
            R.setDisabled(S),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            R &&
            N &&
            R.isValid() !== !_ &&
            (P ? a(1, (_ = !R.isValid())) : R.setValid(!_)),
          8389632 & e.$$.dirty[0] &&
            R &&
            R.getRequired() !== ee &&
            R.setRequired(ee);
      }),
      [
        x,
        _,
        y,
        C,
        T,
        $,
        S,
        v,
        E,
        A,
        ee,
        te,
        ne,
        ae,
        ie,
        se,
        oe,
        re,
        ce,
        le,
        de,
        ue,
        pe,
        R,
        be,
        L,
        me,
        fe,
        B,
        he,
        V,
        j,
        ge,
        ye,
        z,
        K,
        Ce,
        W,
        Q,
        X,
        Y,
        Z,
        J,
        s,
        p,
        g,
        Te,
        $e,
        Se,
        Ae,
        xe,
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
        P,
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
          U.call(this, e, t);
        },
        function (t) {
          U.call(this, e, t);
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
            (V = e), a(30, V);
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
          (be = e), a(24, be);
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
        (e) => a(38, (Q = e.detail)),
        () => a(38, (Q = void 0)),
        (e) => a(31, (j = e.detail)),
        (e) => a(39, (X = e.detail)),
        () => {
          a(31, (j = void 0)), a(39, (X = void 0));
        },
        d,
      ]
    );
  }
  class Fr extends he {
    constructor(e) {
      super(),
        fe(
          this,
          e,
          kr,
          Lr,
          o,
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
  function Br(e) {
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
        oe(a, e), (t = !1);
      },
      d(e) {
        a && a.d(e);
      },
    };
  }
  function wr(e) {
    let n, a;
    const i = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let s = { $$slots: { default: [Br] }, $$scope: { ctx: e } };
    for (let e = 0; e < i.length; e += 1) s = t(s, i[e]);
    return (
      (n = new cs({ props: s })),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[12](null), me(n, t);
        },
      }
    );
  }
  function Hr(e, n, a) {
    let i, s;
    const o = ["use", "class", "value", "getElement"];
    let c,
      l,
      d = f(n, o),
      { $$slots: u = {}, $$scope: p } = n;
    const h = Qe(M());
    let { use: I = [] } = n;
    let g,
      { value: y = "" } = n;
    const C = H("SMUI:select:selectedText");
    r(e, C, (e) => a(14, (c = e)));
    const T = H("SMUI:select:value");
    function $() {
      s && g && b(C, (c = g.getPrimaryText()), c);
    }
    return (
      r(e, T, (e) => a(10, (l = e))),
      w("SMUI:list:item:role", "option"),
      k($),
      F($),
      (e.$$set = (e) => {
        (n = t(t({}, n), m(e))),
          a(6, (d = f(n, o))),
          "use" in e && a(7, (I = e.use)),
          "value" in e && a(0, (y = e.value)),
          "$$scope" in e && a(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && a(3, (i = [h, ...I])),
          1025 & e.$$.dirty && a(2, (s = null != y && "" !== y && l === y));
      }),
      [
        y,
        g,
        s,
        i,
        C,
        T,
        d,
        I,
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
  const Ur = class extends he {
    constructor(e) {
      super(),
        fe(this, e, Hr, wr, o, { use: 7, class: 8, value: 0, getElement: 9 });
    }
    get class() {
      return this.$$.ctx[8];
    }
    get getElement() {
      return this.$$.ctx[9];
    }
  };
  function Vr(e, t, n) {
    const a = e.slice();
    return (a[17] = t[n]), a;
  }
  function Gr(e, t, n) {
    const a = e.slice();
    return (a[17] = t[n]), a;
  }
  function jr(e) {
    let t, n;
    return (
      (t = new Po({
        props: { $$slots: { label: [Qr], default: [Wr] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function qr(e) {
    let t, n;
    return (
      (t = new Po({
        props: { $$slots: { default: [Jr] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function zr(e) {
    let t, n;
    return (
      (t = new Po({
        props: { $$slots: { default: [ec] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Kr(e) {
    let t, n;
    return (
      (t = new Po({
        props: { $$slots: { default: [tc] }, $$scope: { ctx: e } },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Wr(e) {
    let t, n, a;
    function i(t) {
      e[14](t);
    }
    let s = { indeterminate: null === e[2] };
    return (
      void 0 !== e[2] && (s.checked = e[2]),
      (t = new $o({ props: s })),
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
          oe(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Qr(t) {
    let n;
    return {
      c() {
        (n = $("span")), (n.textContent = `${t[5]}`), D(n, "slot", "label");
      },
      m(e, t) {
        y(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function Xr(t) {
    let n,
      a = t[17].name + "";
    return {
      c() {
        n = v(a);
      },
      m(e, t) {
        y(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function Yr(e) {
    let t, n;
    return (
      (t = new Ur({
        props: {
          value: e[17].id,
          $$slots: { default: [Xr] },
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Zr(e) {
    let t,
      n,
      a = e[6],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Yr(Gr(e, a, t));
    const s = (e) =>
      oe(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = A();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        y(e, t, a), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let o;
          for (a = e[6], o = 0; o < a.length; o += 1) {
            const s = Gr(e, a, o);
            i[o]
              ? (i[o].p(s, n), se(i[o], 1))
              : ((i[o] = Yr(s)),
                i[o].c(),
                se(i[o], 1),
                i[o].m(t.parentNode, t));
          }
          for (ae(), o = a.length; o < i.length; o += 1) s(o);
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
        for (let e = 0; e < i.length; e += 1) oe(i[e]);
        n = !1;
      },
      d(e) {
        T(i, e), e && C(t);
      },
    };
  }
  function Jr(e) {
    let t, n, a, i, s, o;
    function r(t) {
      e[12](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[13](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new $o({ props: c })),
      G.push(() => de(t, "checked", r));
    let d = { label: e[5], $$slots: { default: [Zr] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new Fr({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), y(e, a, n), pe(i, e, n), (o = !0);
        },
        p(e, a) {
          const o = {};
          4 & a && (o.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (o.checked = e[2]), X(() => (n = !1))),
            t.$set(o);
          const r = {};
          4194304 & a && (r.$$scope = { dirty: a, ctx: e }),
            !s && 8 & a && ((s = !0), (r.value = e[3]), X(() => (s = !1))),
            i.$set(r);
        },
        i(e) {
          o || (se(t.$$.fragment, e), se(i.$$.fragment, e), (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (o = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function ec(e) {
    let t, n, a, i, s, o;
    function r(t) {
      e[10](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[11](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new $o({ props: c })),
      G.push(() => de(t, "checked", r));
    let d = { label: e[5], type: "number" };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new vi({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), y(e, a, n), pe(i, e, n), (o = !0);
        },
        p(e, a) {
          const o = {};
          4 & a && (o.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (o.checked = e[2]), X(() => (n = !1))),
            t.$set(o);
          const r = {};
          !s && 8 & a && ((s = !0), (r.value = e[3]), X(() => (s = !1))),
            i.$set(r);
        },
        i(e) {
          o || (se(t.$$.fragment, e), se(i.$$.fragment, e), (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (o = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function tc(e) {
    let t, n, a, i, s, o;
    function r(t) {
      e[8](t);
    }
    let c = { indeterminate: null === e[2] };
    function l(t) {
      e[9](t);
    }
    void 0 !== e[2] && (c.checked = e[2]),
      (t = new $o({ props: c })),
      G.push(() => de(t, "checked", r));
    let d = { label: e[5] };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (i = new vi({ props: d })),
      G.push(() => de(i, "value", l)),
      {
        c() {
          ue(t.$$.fragment), (a = E()), ue(i.$$.fragment);
        },
        m(e, n) {
          pe(t, e, n), y(e, a, n), pe(i, e, n), (o = !0);
        },
        p(e, a) {
          const o = {};
          4 & a && (o.indeterminate = null === e[2]),
            !n && 4 & a && ((n = !0), (o.checked = e[2]), X(() => (n = !1))),
            t.$set(o);
          const r = {};
          !s && 8 & a && ((s = !0), (r.value = e[3]), X(() => (s = !1))),
            i.$set(r);
        },
        i(e) {
          o || (se(t.$$.fragment, e), se(i.$$.fragment, e), (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (o = !1);
        },
        d(e) {
          me(t, e), e && C(a), me(i, e);
        },
      }
    );
  }
  function nc(e) {
    let t,
      n,
      a,
      i,
      s,
      o,
      r = e[1] && ac(e);
    return {
      c() {
        (t = $("div")),
          (t.textContent = "▶"),
          (n = E()),
          r && r.c(),
          (a = A()),
          D(t, "class", "arrow svelte-6wwn9g"),
          O(t, "arrowDown", e[4]);
      },
      m(c, l) {
        y(c, t, l),
          y(c, n, l),
          r && r.m(c, l),
          y(c, a, l),
          (i = !0),
          s || ((o = x(t, "click", e[7])), (s = !0));
      },
      p(e, n) {
        16 & n && O(t, "arrowDown", e[4]),
          e[1]
            ? r
              ? (r.p(e, n), 2 & n && se(r, 1))
              : ((r = ac(e)), r.c(), se(r, 1), r.m(a.parentNode, a))
            : r &&
              (ae(),
              oe(r, 1, 1, () => {
                r = null;
              }),
              ie());
      },
      i(e) {
        i || (se(r), (i = !0));
      },
      o(e) {
        oe(r), (i = !1);
      },
      d(e) {
        e && C(t), e && C(n), r && r.d(e), e && C(a), (s = !1), o();
      },
    };
  }
  function ac(e) {
    let t,
      n,
      a = e[6],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = ic(Vr(e, a, t));
    const s = (e) =>
      oe(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = A();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        y(e, t, a), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let o;
          for (a = e[6], o = 0; o < a.length; o += 1) {
            const s = Vr(e, a, o);
            i[o]
              ? (i[o].p(s, n), se(i[o], 1))
              : ((i[o] = ic(s)),
                i[o].c(),
                se(i[o], 1),
                i[o].m(t.parentNode, t));
          }
          for (ae(), o = a.length; o < i.length; o += 1) s(o);
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
        for (let e = 0; e < i.length; e += 1) oe(i[e]);
        n = !1;
      },
      d(e) {
        T(i, e), e && C(t);
      },
    };
  }
  function ic(t) {
    let n, a;
    return (
      (n = new cc({ props: { tree: t[17] } })),
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
          oe(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(n, e);
        },
      }
    );
  }
  function sc(e) {
    let t, n, a, i, s, o;
    const r = [Kr, zr, qr, jr],
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
    (a = l(e)), (i = c[a] = r[a](e));
    let d = e[6].length > 0 && "EnumField" !== e[0].type && nc(e);
    return {
      c() {
        (t = $("ul")),
          (n = $("li")),
          i.c(),
          (s = E()),
          d && d.c(),
          D(t, "class", "svelte-6wwn9g");
      },
      m(e, i) {
        y(e, t, i),
          g(t, n),
          c[a].m(n, null),
          g(n, s),
          d && d.m(n, null),
          (o = !0);
      },
      p(e, [t]) {
        let o = a;
        (a = l(e)),
          a === o
            ? c[a].p(e, t)
            : (ae(),
              oe(c[o], 1, 1, () => {
                c[o] = null;
              }),
              ie(),
              (i = c[a]),
              i ? i.p(e, t) : ((i = c[a] = r[a](e)), i.c()),
              se(i, 1),
              i.m(n, s)),
          e[6].length > 0 && "EnumField" !== e[0].type
            ? d
              ? (d.p(e, t), 1 & t && se(d, 1))
              : ((d = nc(e)), d.c(), se(d, 1), d.m(n, null))
            : d &&
              (ae(),
              oe(d, 1, 1, () => {
                d = null;
              }),
              ie());
      },
      i(e) {
        o || (se(i), se(d), (o = !0));
      },
      o(e) {
        oe(i), oe(d), (o = !1);
      },
      d(e) {
        e && C(t), c[a].d(), d && d.d();
      },
    };
  }
  const oc = {};
  function rc(e, t, n) {
    let a,
      { tree: i } = t;
    const { name: s, children: o } = i;
    let r = oc[s] || !1;
    let c = void 0 !== i.selected && i.selected;
    const l = B();
    let d = null;
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (i = e.tree));
      }),
      (e.$$.update = () => {
        2 & e.$$.dirty && n(4, (a = r)),
          5 & e.$$.dirty &&
            (console.log("checked:", c),
            n(0, (i.selected = c), i),
            l("change", { tree: i })),
          8 & e.$$.dirty && n(0, (i.value = d), i);
      }),
      [
        i,
        r,
        c,
        d,
        a,
        s,
        o,
        () => {
          n(1, (r = oc[s] = !r));
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
          U.call(this, e, t);
        },
      ]
    );
  }
  class cc extends he {
    constructor(e) {
      super(), fe(this, e, rc, sc, o, { tree: 0 });
    }
  }
  function lc(e, t, n) {
    const a = e.slice();
    return (a[3] = t[n]), a;
  }
  function dc(e) {
    let t, n;
    return (
      (t = new cc({ props: { tree: e[3] } })),
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
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function uc(e) {
    let t,
      n,
      a = e[0],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = dc(lc(e, a, t));
    const s = (e) =>
      oe(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        t = $("main");
        for (let e = 0; e < i.length; e += 1) i[e].c();
      },
      m(e, a) {
        y(e, t, a);
        for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let o;
          for (a = e[0], o = 0; o < a.length; o += 1) {
            const s = lc(e, a, o);
            i[o]
              ? (i[o].p(s, n), se(i[o], 1))
              : ((i[o] = dc(s)), i[o].c(), se(i[o], 1), i[o].m(t, null));
          }
          for (ae(), o = a.length; o < i.length; o += 1) s(o);
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
        for (let e = 0; e < i.length; e += 1) oe(i[e]);
        n = !1;
      },
      d(e) {
        e && C(t), T(i, e);
      },
    };
  }
  function pc(e) {
    const t = e.children.flatMap(pc);
    return e.selected && t.push(e), t;
  }
  function mc(e, t, n) {
    let { trees: a } = t;
    const i = B();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (a = e.trees));
      }),
      [
        a,
        function () {
          const e = a.flatMap(pc);
          i("change", { filterTags: e });
        },
      ]
    );
  }
  class fc extends he {
    constructor(e) {
      super(), fe(this, e, mc, uc, o, { trees: 0 });
    }
  }
  const hc = {
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
    bc = [
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
  function Ic(e, t = 1) {
    return Math.floor(Math.random() * e) + t;
  }
  function gc(e) {
    return e[Ic(e.length - 1, 0)];
  }
  function yc(e) {
    const t = (function (e, ...t) {
      return Object.keys(e)
        .filter((e) => !t.includes(e))
        .reduce((t, n) => ((t[n] = e[n]), t), {});
    })(e, "children");
    return (
      "TextField" === t.type
        ? (t.value = "SomeValue " + Ic(10))
        : "IntegerField" === t.type
        ? (t.value = Ic(100))
        : "EnumField" === t.type && (t.value = gc(e.children).id),
      t
    );
  }
  function Cc(e) {
    return Math.random() < 0.1
      ? [yc(e)]
      : "EnumField" !== e.type
      ? e.children.flatMap(Cc)
      : [];
  }
  let Tc = 1;
  function $c() {
    return {
      label: `Subject #${Tc++} Data from ${gc([
        "McLean",
        "Pitt",
        "UCLA",
        "Mt. Sinai",
      ])}`,
      taxonomyTags: hc.children[0].children.flatMap(Cc),
    };
  }
  bc.forEach((e) => {
    e.Data = [$c()];
    const t = Math.random();
    t < 0.3 && (e.Version += 1), t < 0.1 && (e.Version += 1);
  });
  class Sc {
    constructor() {
      this.baseUrl = window.location.href.split("/");
    }
    async listArtifacts() {
      return console.log("Listing artifacts"), bc;
    }
    async downloadArtifact(e) {
      console.log("Downloading artifact:", e);
    }
    async updateArtifact(e, t) {
      console.log("Updating artifact:", e, t);
    }
    async createArtifact(e, t) {
      console.log("Creating artifact:", e, t);
    }
  }
  var vc,
    Ec,
    Ac =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  function xc(e, t, n) {
    const a = e.slice();
    return (a[29] = t[n]), a;
  }
  function Dc(e) {
    let t;
    return {
      c() {
        t = v("Create new dataset");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Nc(t) {
    let n;
    return {
      c() {
        (n = $("p")),
          (n.textContent = "Select dataset to upload."),
          D(n, "class", "svelte-189na6l");
      },
      m(e, t) {
        y(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function _c(t) {
    let n;
    return {
      c() {
        (n = $("p")),
          (n.textContent = "Select tags file for dataset."),
          D(n, "class", "svelte-189na6l");
      },
      m(e, t) {
        y(e, n, t);
      },
      p: e,
      d(e) {
        e && C(n);
      },
    };
  }
  function Pc(e) {
    let t,
      n,
      a,
      i,
      s,
      o,
      r,
      c,
      l,
      d,
      u,
      p,
      m,
      f,
      h,
      b,
      I,
      T = (e[5] ? e[5].name : "") + "",
      S = (e[6] ? e[6].taxonomyTags.map(el).join(", ") : "") + "";
    function A(t) {
      e[13](t);
    }
    let x = { label: "Name" };
    return (
      void 0 !== e[7] && (x.value = e[7]),
      (t = new vi({ props: x })),
      G.push(() => de(t, "value", A)),
      (c = new fo({
        props: { $$slots: { default: [Nc] }, $$scope: { ctx: e } },
      })),
      c.$on("drop", e[10]),
      (f = new fo({
        props: {
          accept: ".json",
          $$slots: { default: [_c] },
          $$scope: { ctx: e },
        },
      })),
      f.$on("drop", e[11]),
      {
        c() {
          ue(t.$$.fragment),
            (a = E()),
            (i = $("p")),
            (s = v("Dataset file: \n    ")),
            (o = v(T)),
            (r = E()),
            ue(c.$$.fragment),
            (l = E()),
            (d = $("p")),
            (u = v("Taxonomy Terms: \n  ")),
            (p = v(S)),
            (m = E()),
            ue(f.$$.fragment),
            (h = E()),
            (b = $("a")),
            (b.textContent = "Click to select tags for your dataset."),
            D(i, "class", "svelte-189na6l"),
            D(d, "class", "svelte-189na6l"),
            D(b, "class", "svelte-189na6l");
        },
        m(e, n) {
          pe(t, e, n),
            y(e, a, n),
            y(e, i, n),
            g(i, s),
            g(i, o),
            y(e, r, n),
            pe(c, e, n),
            y(e, l, n),
            y(e, d, n),
            g(d, u),
            g(d, p),
            y(e, m, n),
            pe(f, e, n),
            y(e, h, n),
            y(e, b, n),
            (I = !0);
        },
        p(e, a) {
          const i = {};
          !n && 128 & a[0] && ((n = !0), (i.value = e[7]), X(() => (n = !1))),
            t.$set(i),
            (!I || 32 & a[0]) &&
              T !== (T = (e[5] ? e[5].name : "") + "") &&
              _(o, T);
          const s = {};
          16 & a[1] && (s.$$scope = { dirty: a, ctx: e }),
            c.$set(s),
            (!I || 64 & a[0]) &&
              S !==
                (S = (e[6] ? e[6].taxonomyTags.map(el).join(", ") : "") + "") &&
              _(p, S);
          const r = {};
          16 & a[1] && (r.$$scope = { dirty: a, ctx: e }), f.$set(r);
        },
        i(e) {
          I ||
            (se(t.$$.fragment, e),
            se(c.$$.fragment, e),
            se(f.$$.fragment, e),
            (I = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(c.$$.fragment, e),
            oe(f.$$.fragment, e),
            (I = !1);
        },
        d(e) {
          me(t, e),
            e && C(a),
            e && C(i),
            e && C(r),
            me(c, e),
            e && C(l),
            e && C(d),
            e && C(m),
            me(f, e),
            e && C(h),
            e && C(b);
        },
      }
    );
  }
  function Oc(e) {
    let t;
    return {
      c() {
        t = v("Cancel");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Lc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [Oc] }, $$scope: { ctx: e } },
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
          16 & n[1] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Rc(e) {
    let t;
    return {
      c() {
        t = v("Upload");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Mc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [Rc] }, $$scope: { ctx: e } },
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
          16 & n[1] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function kc(e) {
    let t, n, a, i;
    return (
      (t = new Us({
        props: { $$slots: { default: [Lc] }, $$scope: { ctx: e } },
      })),
      (a = new Us({
        props: { $$slots: { default: [Mc] }, $$scope: { ctx: e } },
      })),
      a.$on("click", e[14]),
      {
        c() {
          ue(t.$$.fragment), (n = E()), ue(a.$$.fragment);
        },
        m(e, s) {
          pe(t, e, s), y(e, n, s), pe(a, e, s), (i = !0);
        },
        p(e, n) {
          const i = {};
          16 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
          const s = {};
          16 & n[1] && (s.$$scope = { dirty: n, ctx: e }), a.$set(s);
        },
        i(e) {
          i || (se(t.$$.fragment, e), se(a.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), me(a, e);
        },
      }
    );
  }
  function Fc(e) {
    let t, n, a, i, s, o;
    return (
      (t = new Ls({
        props: { id: "title", $$slots: { default: [Dc] }, $$scope: { ctx: e } },
      })),
      (a = new Rs({
        props: {
          id: "content",
          $$slots: { default: [Pc] },
          $$scope: { ctx: e },
        },
      })),
      (s = new Ms({
        props: { $$slots: { default: [kc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment),
            (n = E()),
            ue(a.$$.fragment),
            (i = E()),
            ue(s.$$.fragment);
        },
        m(e, r) {
          pe(t, e, r),
            y(e, n, r),
            pe(a, e, r),
            y(e, i, r),
            pe(s, e, r),
            (o = !0);
        },
        p(e, n) {
          const i = {};
          16 & n[1] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
          const o = {};
          (224 & n[0]) | (16 & n[1]) && (o.$$scope = { dirty: n, ctx: e }),
            a.$set(o);
          const r = {};
          16 & n[1] && (r.$$scope = { dirty: n, ctx: e }), s.$set(r);
        },
        i(e) {
          o ||
            (se(t.$$.fragment, e),
            se(a.$$.fragment, e),
            se(s.$$.fragment, e),
            (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(a.$$.fragment, e),
            oe(s.$$.fragment, e),
            (o = !1);
        },
        d(e) {
          me(t, e), e && C(n), me(a, e), e && C(i), me(s, e);
        },
      }
    );
  }
  function Bc(e) {
    let t;
    return {
      c() {
        t = v(e[0]);
      },
      m(e, n) {
        y(e, t, n);
      },
      p(e, n) {
        1 & n[0] && _(t, e[0]);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function wc(e) {
    let t, n;
    return (
      (t = new qt({
        props: { $$slots: { default: [Bc] }, $$scope: { ctx: e } },
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
          (1 & n[0]) | (16 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Hc(e) {
    let t;
    return {
      c() {
        t = v("file_upload");
      },
      m(e, n) {
        y(e, t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Uc(e) {
    let t, n;
    return (
      (t = new Li({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [Hc] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[16]),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(e, n) {
          const a = {};
          16 & n[1] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Vc(e) {
    let t, n, a, i;
    return (
      (t = new zt({
        props: { $$slots: { default: [wc] }, $$scope: { ctx: e } },
      })),
      (a = new zt({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [Uc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = E()), ue(a.$$.fragment);
        },
        m(e, s) {
          pe(t, e, s), y(e, n, s), pe(a, e, s), (i = !0);
        },
        p(e, n) {
          const i = {};
          (1 & n[0]) | (16 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
          const s = {};
          (16 & n[0]) | (16 & n[1]) && (s.$$scope = { dirty: n, ctx: e }),
            a.$set(s);
        },
        i(e) {
          i || (se(t.$$.fragment, e), se(a.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), me(a, e);
        },
      }
    );
  }
  function Gc(e) {
    let t, n;
    return (
      (t = new Vt({
        props: { $$slots: { default: [Vc] }, $$scope: { ctx: e } },
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
          (17 & n[0]) | (16 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function jc(e) {
    let t, n, a, i, s, o, r;
    function c(t) {
      e[17](t);
    }
    let l = { label: "Search..." };
    return (
      void 0 !== e[1] && (l.value = e[1]),
      (t = new vi({ props: l })),
      G.push(() => de(t, "value", c)),
      (o = new fc({ props: { trees: e[2] } })),
      o.$on("change", e[18]),
      {
        c() {
          ue(t.$$.fragment),
            (a = E()),
            (i = $("span")),
            (i.textContent = "Advanced Filters"),
            (s = E()),
            ue(o.$$.fragment),
            D(i, "class", "filter-header svelte-189na6l");
        },
        m(e, n) {
          pe(t, e, n),
            y(e, a, n),
            y(e, i, n),
            y(e, s, n),
            pe(o, e, n),
            (r = !0);
        },
        p(e, a) {
          const i = {};
          !n && 2 & a[0] && ((n = !0), (i.value = e[1]), X(() => (n = !1))),
            t.$set(i);
          const s = {};
          4 & a[0] && (s.trees = e[2]), o.$set(s);
        },
        i(e) {
          r || (se(t.$$.fragment, e), se(o.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(o.$$.fragment, e), (r = !1);
        },
        d(e) {
          me(t, e), e && C(a), e && C(i), e && C(s), me(o, e);
        },
      }
    );
  }
  function qc(e) {
    let t, n;
    return (
      (t = new gs({
        props: { $$slots: { default: [jc] }, $$scope: { ctx: e } },
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
          (6 & n[0]) | (16 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function zc(e) {
    let t,
      n = e[29].Data[0].label + "";
    return {
      c() {
        t = v(n);
      },
      m(e, n) {
        y(e, t, n);
      },
      p(e, a) {
        8 & a[0] && n !== (n = e[29].Data[0].label + "") && _(t, n);
      },
      d(e) {
        e && C(t);
      },
    };
  }
  function Kc(e) {
    let t,
      n,
      a,
      i = e[29].Version + 1 + "";
    return {
      c() {
        (t = v(i)),
          (n = v(" revisions. ")),
          (a = $("a")),
          (a.textContent = "Append data"),
          D(a, "class", "svelte-189na6l");
      },
      m(e, i) {
        y(e, t, i), y(e, n, i), y(e, a, i);
      },
      p(e, n) {
        8 & n[0] && i !== (i = e[29].Version + 1 + "") && _(t, i);
      },
      d(e) {
        e && C(t), e && C(n), e && C(a);
      },
    };
  }
  function Wc(e) {
    let t, n, a, i;
    return (
      (t = new is({
        props: { $$slots: { default: [zc] }, $$scope: { ctx: e } },
      })),
      (a = new ss({
        props: { $$slots: { default: [Kc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = E()), ue(a.$$.fragment);
        },
        m(e, s) {
          pe(t, e, s), y(e, n, s), pe(a, e, s), (i = !0);
        },
        p(e, n) {
          const i = {};
          (8 & n[0]) | (16 & n[1]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
          const s = {};
          (8 & n[0]) | (16 & n[1]) && (s.$$scope = { dirty: n, ctx: e }),
            a.$set(s);
        },
        i(e) {
          i || (se(t.$$.fragment, e), se(a.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), me(a, e);
        },
      }
    );
  }
  function Qc(e) {
    let t, n, a, i;
    return (
      (t = new as({
        props: { $$slots: { default: [Wc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          ue(t.$$.fragment), (n = E()), (a = E());
        },
        m(e, s) {
          pe(t, e, s), y(e, n, s), y(e, a, s), (i = !0);
        },
        p(e, n) {
          const a = {};
          (8 & n[0]) | (16 & n[1]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
        },
        i(e) {
          i || (se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e), e && C(n), e && C(a);
        },
      }
    );
  }
  function Xc(e) {
    let t, n;
    return (
      (t = new cs({
        props: { $$slots: { default: [Qc] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", function () {
        return e[19](e[29]);
      }),
      {
        c() {
          ue(t.$$.fragment);
        },
        m(e, a) {
          pe(t, e, a), (n = !0);
        },
        p(n, a) {
          e = n;
          const i = {};
          (8 & a[0]) | (16 & a[1]) && (i.$$scope = { dirty: a, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Yc(e) {
    let t,
      n,
      a = e[3],
      i = [];
    for (let t = 0; t < a.length; t += 1) i[t] = Xc(xc(e, a, t));
    const s = (e) =>
      oe(i[e], 1, 1, () => {
        i[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = A();
      },
      m(e, a) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, a);
        y(e, t, a), (n = !0);
      },
      p(e, n) {
        if (520 & n[0]) {
          let o;
          for (a = e[3], o = 0; o < a.length; o += 1) {
            const s = xc(e, a, o);
            i[o]
              ? (i[o].p(s, n), se(i[o], 1))
              : ((i[o] = Xc(s)),
                i[o].c(),
                se(i[o], 1),
                i[o].m(t.parentNode, t));
          }
          for (ae(), o = a.length; o < i.length; o += 1) s(o);
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
        for (let e = 0; e < i.length; e += 1) oe(i[e]);
        n = !1;
      },
      d(e) {
        T(i, e), e && C(t);
      },
    };
  }
  function Zc(e) {
    let t, n, a;
    return (
      (n = new Xi({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [Yc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = $("main")), ue(n.$$.fragment), D(t, "class", "svelte-189na6l");
        },
        m(e, i) {
          y(e, t, i), pe(n, t, null), (a = !0);
        },
        p(e, t) {
          const a = {};
          (8 & t[0]) | (16 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(e) {
          e && C(t), me(n);
        },
      }
    );
  }
  function Jc(e) {
    let t, n, a, i, s, o, r, c, l, d, u, p, m, f, h, b, I, T, S, v;
    function A(t) {
      e[15](t);
    }
    document.title = t = e[0];
    let x = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Fc] },
      $$scope: { ctx: e },
    };
    return (
      void 0 !== e[4] && (x.open = e[4]),
      (a = new Os({ props: x })),
      G.push(() => de(a, "open", A)),
      (o = new nt({
        props: {
          variant: "static",
          $$slots: { default: [Gc] },
          $$scope: { ctx: e },
        },
      })),
      (l = new bs({
        props: {
          style: "width: 360px",
          $$slots: { default: [qc] },
          $$scope: { ctx: e },
        },
      })),
      (u = new Is({
        props: { $$slots: { default: [Zc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = E()),
            ue(a.$$.fragment),
            (s = E()),
            ue(o.$$.fragment),
            (r = E()),
            (c = $("div")),
            ue(l.$$.fragment),
            (d = E()),
            ue(u.$$.fragment),
            (p = E()),
            (m = $("link")),
            (f = E()),
            (h = $("link")),
            (b = E()),
            (I = $("link")),
            (T = E()),
            (S = $("link")),
            D(c, "class", "drawer-container svelte-189na6l"),
            D(m, "rel", "stylesheet"),
            D(
              m,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            D(m, "class", "svelte-189na6l"),
            D(h, "rel", "stylesheet"),
            D(
              h,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            D(h, "class", "svelte-189na6l"),
            D(I, "rel", "stylesheet"),
            D(I, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            D(I, "class", "svelte-189na6l"),
            D(S, "rel", "stylesheet"),
            D(S, "href", "build/smui.css"),
            D(S, "class", "svelte-189na6l");
        },
        m(e, t) {
          y(e, n, t),
            pe(a, e, t),
            y(e, s, t),
            pe(o, e, t),
            y(e, r, t),
            y(e, c, t),
            pe(l, c, null),
            g(c, d),
            pe(u, c, null),
            y(e, p, t),
            y(e, m, t),
            y(e, f, t),
            y(e, h, t),
            y(e, b, t),
            y(e, I, t),
            y(e, T, t),
            y(e, S, t),
            (v = !0);
        },
        p(e, n) {
          (!v || 1 & n[0]) && t !== (t = e[0]) && (document.title = t);
          const s = {};
          (224 & n[0]) | (16 & n[1]) && (s.$$scope = { dirty: n, ctx: e }),
            !i && 16 & n[0] && ((i = !0), (s.open = e[4]), X(() => (i = !1))),
            a.$set(s);
          const r = {};
          (17 & n[0]) | (16 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            o.$set(r);
          const c = {};
          (6 & n[0]) | (16 & n[1]) && (c.$$scope = { dirty: n, ctx: e }),
            l.$set(c);
          const d = {};
          (8 & n[0]) | (16 & n[1]) && (d.$$scope = { dirty: n, ctx: e }),
            u.$set(d);
        },
        i(e) {
          v ||
            (se(a.$$.fragment, e),
            se(o.$$.fragment, e),
            se(l.$$.fragment, e),
            se(u.$$.fragment, e),
            (v = !0));
        },
        o(e) {
          oe(a.$$.fragment, e),
            oe(o.$$.fragment, e),
            oe(l.$$.fragment, e),
            oe(u.$$.fragment, e),
            (v = !1);
        },
        d(e) {
          e && C(n),
            me(a, e),
            e && C(s),
            me(o, e),
            e && C(r),
            e && C(c),
            me(l),
            me(u),
            e && C(p),
            e && C(m),
            e && C(f),
            e && C(h),
            e && C(b),
            e && C(I),
            e && C(T),
            e && C(S);
        },
      }
    );
  }
  (vc = function (e) {
    function t() {
      let e, t, n;
      class a {
        constructor(e) {
          this.root = t.createRoot(e);
        }
        render(t) {
          const a = n.default,
            { formatter: i } = t,
            s = e.createElement("div", null, [
              ...t.buttons,
              e.createElement(
                "button",
                {
                  type: "submit",
                  className: "btn btn-secondary",
                  onClick: async () => {
                    const e = await this.formatData(i, t.formData);
                    this.downloadJSON(e);
                  },
                },
                "Download"
              ),
            ]);
          this.root.render(e.createElement(a, t.getProperties(), s));
        }
        async formatData(e, t) {
          return (t.taxonomyTags = await e.toHumanFormat(t.taxonomyTags)), t;
        }
        downloadJSON(e, t = "tags") {
          const n =
              "data:text/json;charset=utf-8," +
              encodeURIComponent(JSON.stringify(e)),
            a = document.createElement("a");
          a.setAttribute("href", n),
            a.setAttribute("download", t + ".json"),
            document.body.appendChild(a),
            a.click(),
            a.remove();
        }
        static inject(a, i, s) {
          (e = a), (t = i), (n = s);
        }
      }
      const i = { toHumanFormat: (e) => e };
      return (
        (a.FormRenderData = class {
          constructor(e, t, n, a = i) {
            (this.schema = e),
              (this.uiSchema = t),
              (this.formData = n || { taxonomyTags: [] }),
              (this.formatter = a),
              (this.buttons = []);
          }
          addButton(t, n, a = "btn-info") {
            this.buttons.push(
              e.createElement(
                "button",
                {
                  type: "submit",
                  className: `btn ${a}`,
                  onClick: () => {
                    n(this.formData);
                  },
                },
                t
              )
            );
          }
          getProperties() {
            let e = this.formData;
            return {
              schema: this.schema,
              onChange: (e) => (this.formData = e.formData),
              uiSchema: this.uiSchema,
              formData: e,
            };
          }
        }),
        a
      );
    }
    if ("undefined" != typeof window) Ac.TagCreatorForm = t();
    else {
      const n = t();
      console.log({ TagCreatorForm: n }), (e.exports = n);
    }
  }),
    vc((Ec = { exports: {} }), Ec.exports);
  const el = (e) => e.Tag;
  function tl(e, t, n) {
    let { title: a = "Digital Phenotyping Dashboard " } = t,
      i = "",
      s = [];
    const o = new Sc();
    let r = [],
      c = [];
    function l(e = []) {
      n(
        3,
        (c = r.filter((t) =>
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
    class d extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const u = [];
    let p;
    function m(e) {
      (p = e), u.forEach(([t, n]) => t.postMessage(new d(e), n));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (u.push([e.source, e.origin]),
          p && e.source.postMessage(new d(p), e.origin));
      },
      !1
    ),
      (async function () {
        n(
          2,
          (s = await (async function () {
            const e = window.location.href.split("/");
            e.pop(), e.pop();
            const t = e.join("/") + "/taxonomy.json",
              n = await fetch(t);
            let a = [await n.json()];
            for (; 1 === a.length; ) a = a[0].children;
            return a;
          })())
        ),
          (r = await o.listArtifacts()),
          l();
      })();
    let f,
      h,
      b = !1;
    async function I() {
      await o.createArtifact(h, f);
    }
    let g = "";
    return (
      (e.$$set = (e) => {
        "title" in e && n(0, (a = e.title));
      }),
      [
        a,
        i,
        s,
        c,
        b,
        f,
        h,
        g,
        l,
        m,
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(5, (f = t[0]));
        },
        async function (e) {
          const [t] = e.detail.acceptedFiles;
          t &&
            (n(
              6,
              (h = JSON.parse(
                await (async function (e) {
                  return new Promise((t, n) => {
                    const a = new FileReader();
                    (a.onload = () =>
                      a.error
                        ? (console.log("error:", a.error), n(a.error))
                        : t(a.result)),
                      a.readAsText(e);
                  });
                })(t)
              ))
            ),
            console.log(h));
        },
        I,
        function (e) {
          (g = e), n(7, g);
        },
        () => I(),
        function (e) {
          (b = e), n(4, b);
        },
        () => n(4, (b = !0)),
        function (e) {
          (i = e), n(1, i);
        },
        (e) => l(e.detail.filterTags),
        (e) => m(e),
      ]
    );
  }
  return new (class extends he {
    constructor(e) {
      super(), fe(this, e, tl, Jc, o, { title: 0 }, null, [-1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
