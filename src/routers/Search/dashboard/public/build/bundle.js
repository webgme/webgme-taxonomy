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
  function i() {
    return Object.create(null);
  }
  function a(e) {
    e.forEach(n);
  }
  function r(e) {
    return "function" == typeof e;
  }
  function s(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function o(t, n, i) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const i = t.subscribe(...n);
        return i.unsubscribe ? () => i.unsubscribe() : i;
      })(n, i)
    );
  }
  function l(e, t, n, i) {
    if (e) {
      const a = c(e, t, n, i);
      return e[0](a);
    }
  }
  function c(e, n, i, a) {
    return e[1] && a ? t(i.ctx.slice(), e[1](a(n))) : i.ctx;
  }
  function d(e, t, n, i) {
    if (e[2] && i) {
      const a = e[2](i(n));
      if (void 0 === t.dirty) return a;
      if ("object" == typeof a) {
        const e = [],
          n = Math.max(t.dirty.length, a.length);
        for (let i = 0; i < n; i += 1) e[i] = t.dirty[i] | a[i];
        return e;
      }
      return t.dirty | a;
    }
    return t.dirty;
  }
  function u(e, t, n, i, a, r) {
    if (a) {
      const s = c(t, n, i, r);
      e.p(s, a);
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
  function f(e) {
    const t = {};
    for (const n in e) "$" !== n[0] && (t[n] = e[n]);
    return t;
  }
  function m(e, t) {
    const n = {};
    t = new Set(t);
    for (const i in e) t.has(i) || "$" === i[0] || (n[i] = e[i]);
    return n;
  }
  function h(e) {
    const t = {};
    for (const n in e) t[n] = !0;
    return t;
  }
  function g(e, t, n) {
    return e.set(n), t;
  }
  function $(t) {
    return t && r(t.destroy) ? t.destroy : e;
  }
  function I(e, t) {
    e.appendChild(t);
  }
  function v(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function b(e) {
    e.parentNode.removeChild(e);
  }
  function y(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function E(e) {
    return document.createElement(e);
  }
  function A(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function C(e) {
    return document.createTextNode(e);
  }
  function x() {
    return C(" ");
  }
  function _() {
    return C("");
  }
  function S(e, t, n, i) {
    return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
  }
  function T(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function O(e, t) {
    const n = Object.getOwnPropertyDescriptors(e.__proto__);
    for (const i in t)
      null == t[i]
        ? e.removeAttribute(i)
        : "style" === i
        ? (e.style.cssText = t[i])
        : "__value" === i
        ? (e.value = e[i] = t[i])
        : n[i] && n[i].set
        ? (e[i] = t[i])
        : T(e, i, t[i]);
  }
  function L(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function w(e, t) {
    e.value = null == t ? "" : t;
  }
  function D(e, t, n, i) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, i ? "important" : "");
  }
  function N(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  let M;
  function R(e) {
    M = e;
  }
  function F() {
    if (!M) throw new Error("Function called outside component initialization");
    return M;
  }
  function k(e) {
    F().$$.on_mount.push(e);
  }
  function U(e) {
    F().$$.on_destroy.push(e);
  }
  function P() {
    const e = F();
    return (t, n, { cancelable: i = !1 } = {}) => {
      const a = e.$$.callbacks[t];
      if (a) {
        const r = (function (
          e,
          t,
          { bubbles: n = !1, cancelable: i = !1 } = {}
        ) {
          const a = document.createEvent("CustomEvent");
          return a.initCustomEvent(e, n, i, t), a;
        })(t, n, { cancelable: i });
        return (
          a.slice().forEach((t) => {
            t.call(e, r);
          }),
          !r.defaultPrevented
        );
      }
      return !0;
    };
  }
  function H(e, t) {
    return F().$$.context.set(e, t), t;
  }
  function B(e) {
    return F().$$.context.get(e);
  }
  function V(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const j = [],
    z = [],
    G = [],
    q = [],
    K = Promise.resolve();
  let W = !1;
  function X() {
    W || ((W = !0), K.then(ee));
  }
  function Y(e) {
    G.push(e);
  }
  function Q(e) {
    q.push(e);
  }
  const J = new Set();
  let Z = 0;
  function ee() {
    const e = M;
    do {
      for (; Z < j.length; ) {
        const e = j[Z];
        Z++, R(e), te(e.$$);
      }
      for (R(null), j.length = 0, Z = 0; z.length; ) z.pop()();
      for (let e = 0; e < G.length; e += 1) {
        const t = G[e];
        J.has(t) || (J.add(t), t());
      }
      G.length = 0;
    } while (j.length);
    for (; q.length; ) q.pop()();
    (W = !1), J.clear(), R(e);
  }
  function te(e) {
    if (null !== e.fragment) {
      e.update(), a(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(Y);
    }
  }
  const ne = new Set();
  let ie;
  function ae() {
    ie = { r: 0, c: [], p: ie };
  }
  function re() {
    ie.r || a(ie.c), (ie = ie.p);
  }
  function se(e, t) {
    e && e.i && (ne.delete(e), e.i(t));
  }
  function oe(e, t, n, i) {
    if (e && e.o) {
      if (ne.has(e)) return;
      ne.add(e),
        ie.c.push(() => {
          ne.delete(e), i && (n && e.d(1), i());
        }),
        e.o(t);
    } else i && i();
  }
  const le =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function ce(e, t) {
    const n = {},
      i = {},
      a = { $$scope: 1 };
    let r = e.length;
    for (; r--; ) {
      const s = e[r],
        o = t[r];
      if (o) {
        for (const e in s) e in o || (i[e] = 1);
        for (const e in o) a[e] || ((n[e] = o[e]), (a[e] = 1));
        e[r] = o;
      } else for (const e in s) a[e] = 1;
    }
    for (const e in i) e in n || (n[e] = void 0);
    return n;
  }
  function de(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function ue(e, t, n) {
    const i = e.$$.props[t];
    void 0 !== i && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
  }
  function pe(e) {
    e && e.c();
  }
  function fe(e, t, i, s) {
    const { fragment: o, on_mount: l, on_destroy: c, after_update: d } = e.$$;
    o && o.m(t, i),
      s ||
        Y(() => {
          const t = l.map(n).filter(r);
          c ? c.push(...t) : a(t), (e.$$.on_mount = []);
        }),
      d.forEach(Y);
  }
  function me(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (a(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function he(t, n, r, s, o, l, c, d = [-1]) {
    const u = M;
    R(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: e,
      not_equal: o,
      bound: i(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (u ? u.$$.context : [])),
      callbacks: i(),
      dirty: d,
      skip_bound: !1,
      root: n.target || u.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = r
        ? r(t, n.props || {}, (e, n, ...i) => {
            const a = i.length ? i[0] : n;
            return (
              p.ctx &&
                o(p.ctx[e], (p.ctx[e] = a)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](a),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (j.push(e), X(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      a(p.before_update),
      (p.fragment = !!s && s(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(b);
      } else p.fragment && p.fragment.c();
      n.intro && se(t.$$.fragment),
        fe(t, n.target, n.anchor, n.customElement),
        ee();
    }
    R(u);
  }
  class ge {
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
  var $e = function (e, t) {
    return (
      ($e =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      $e(e, t)
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
    $e(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var ve = function () {
    return (
      (ve =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++)
            for (var a in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
          return e;
        }),
      ve.apply(this, arguments)
    );
  };
  function be(e, t, n, i) {
    return new (n || (n = Promise))(function (a, r) {
      function s(e) {
        try {
          l(i.next(e));
        } catch (e) {
          r(e);
        }
      }
      function o(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          r(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? a(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(s, o);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function ye(e, t) {
    var n,
      i,
      a,
      r,
      s = {
        label: 0,
        sent: function () {
          if (1 & a[0]) throw a[1];
          return a[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (r = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (r[Symbol.iterator] = function () {
          return this;
        }),
      r
    );
    function o(r) {
      return function (o) {
        return (function (r) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (
                ((n = 1),
                i &&
                  (a =
                    2 & r[0]
                      ? i.return
                      : r[0]
                      ? i.throw || ((a = i.return) && a.call(i), 0)
                      : i.next) &&
                  !(a = a.call(i, r[1])).done)
              )
                return a;
              switch (((i = 0), a && (r = [2 & r[0], a.value]), r[0])) {
                case 0:
                case 1:
                  a = r;
                  break;
                case 4:
                  return s.label++, { value: r[1], done: !1 };
                case 5:
                  s.label++, (i = r[1]), (r = [0]);
                  continue;
                case 7:
                  (r = s.ops.pop()), s.trys.pop();
                  continue;
                default:
                  if (
                    !((a = s.trys),
                    (a = a.length > 0 && a[a.length - 1]) ||
                      (6 !== r[0] && 2 !== r[0]))
                  ) {
                    s = 0;
                    continue;
                  }
                  if (3 === r[0] && (!a || (r[1] > a[0] && r[1] < a[3]))) {
                    s.label = r[1];
                    break;
                  }
                  if (6 === r[0] && s.label < a[1]) {
                    (s.label = a[1]), (a = r);
                    break;
                  }
                  if (a && s.label < a[2]) {
                    (s.label = a[2]), s.ops.push(r);
                    break;
                  }
                  a[2] && s.ops.pop(), s.trys.pop();
                  continue;
              }
              r = t.call(e, s);
            } catch (e) {
              (r = [6, e]), (i = 0);
            } finally {
              n = a = 0;
            }
          if (5 & r[0]) throw r[1];
          return { value: r[0] ? r[1] : void 0, done: !0 };
        })([r, o]);
      };
    }
  }
  function Ee(e) {
    var t = "function" == typeof Symbol && Symbol.iterator,
      n = t && e[t],
      i = 0;
    if (n) return n.call(e);
    if (e && "number" == typeof e.length)
      return {
        next: function () {
          return (
            e && i >= e.length && (e = void 0), { value: e && e[i++], done: !e }
          );
        },
      };
    throw new TypeError(
      t ? "Object is not iterable." : "Symbol.iterator is not defined."
    );
  }
  function Ae(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      a,
      r = n.call(e),
      s = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = r.next()).done; )
        s.push(i.value);
    } catch (e) {
      a = { error: e };
    } finally {
      try {
        i && !i.done && (n = r.return) && n.call(r);
      } finally {
        if (a) throw a.error;
      }
    }
    return s;
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
  var Ce = (function () {
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
   */ var xe = Object.freeze({
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
              i = function () {};
            e.document.addEventListener("test", i, n),
              e.document.removeEventListener("test", i, n);
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
   */ function _e(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var Se,
    Te = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (_e(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: _e,
      estimateScrollWidth: function (e) {
        var t = e;
        if (null !== t.offsetParent) return t.scrollWidth;
        var n = t.cloneNode(!0);
        n.style.setProperty("position", "absolute"),
          n.style.setProperty("transform", "translate(-9999px, -9999px)"),
          document.documentElement.appendChild(n);
        var i = n.scrollWidth;
        return document.documentElement.removeChild(n), i;
      },
    }),
    Oe = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    Le = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    we = {
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
    Me = [],
    Re = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.activationAnimationHasEnded = !1),
          (i.activationTimer = 0),
          (i.fgDeactivationRemovalTimer = 0),
          (i.fgScale = "0"),
          (i.frame = { width: 0, height: 0 }),
          (i.initialSize = 0),
          (i.layoutFrame = 0),
          (i.maxRadius = 0),
          (i.unboundedCoords = { left: 0, top: 0 }),
          (i.activationState = i.defaultActivationState()),
          (i.activationTimerCallback = function () {
            (i.activationAnimationHasEnded = !0),
              i.runDeactivationUXLogicIfReady();
          }),
          (i.activateHandler = function (e) {
            i.activateImpl(e);
          }),
          (i.deactivateHandler = function () {
            i.deactivateImpl();
          }),
          (i.focusHandler = function () {
            i.handleFocus();
          }),
          (i.blurHandler = function () {
            i.handleBlur();
          }),
          (i.resizeHandler = function () {
            i.layout();
          }),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Oe;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Le;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return we;
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
            var i = t.cssClasses,
              a = i.ROOT,
              r = i.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(a),
                e.adapter.isUnbounded() &&
                  (e.adapter.addClass(r), e.layoutInternal());
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
              i = n.ROOT,
              a = n.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.removeClass(i),
                e.adapter.removeClass(a),
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
              for (var i = Ee(De), a = i.next(); !a.done; a = i.next()) {
                var r = a.value;
                this.adapter.registerInteractionHandler(
                  r,
                  this.activateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                a && !a.done && (n = i.return) && n.call(i);
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
              for (var i = Ee(Ne), a = i.next(); !a.done; a = i.next()) {
                var r = a.value;
                this.adapter.registerDocumentInteractionHandler(
                  r,
                  this.deactivateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                a && !a.done && (n = i.return) && n.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
        }),
        (t.prototype.deregisterRootHandlers = function () {
          var e, t;
          try {
            for (var n = Ee(De), i = n.next(); !i.done; i = n.next()) {
              var a = i.value;
              this.adapter.deregisterInteractionHandler(
                a,
                this.activateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              i && !i.done && (t = n.return) && t.call(n);
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
            for (var n = Ee(Ne), i = n.next(); !i.done; i = n.next()) {
              var a = i.value;
              this.adapter.deregisterDocumentInteractionHandler(
                a,
                this.deactivateHandler
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              i && !i.done && (t = n.return) && t.call(n);
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
              var i = this.previousActivationEvent;
              if (!(i && void 0 !== e && i.type !== e.type))
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
                  Me.length > 0 &&
                  Me.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (Me.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (Me = []),
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
            i = n.VAR_FG_TRANSLATE_START,
            a = n.VAR_FG_TRANSLATE_END,
            r = t.cssClasses,
            s = r.FG_DEACTIVATION,
            o = r.FG_ACTIVATION,
            l = t.numbers.DEACTIVATION_TIMEOUT_MS;
          this.layoutInternal();
          var c = "",
            d = "";
          if (!this.adapter.isUnbounded()) {
            var u = this.getFgTranslationCoordinates(),
              p = u.startPoint,
              f = u.endPoint;
            (c = p.x + "px, " + p.y + "px"), (d = f.x + "px, " + f.y + "px");
          }
          this.adapter.updateCssVariable(i, c),
            this.adapter.updateCssVariable(a, d),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(s),
            this.adapter.computeBoundingRect(),
            this.adapter.addClass(o),
            (this.activationTimer = setTimeout(function () {
              e.activationTimerCallback();
            }, l));
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
                      var i,
                        a,
                        r = t.x,
                        s = t.y,
                        o = r + n.left,
                        l = s + n.top;
                      if ("touchstart" === e.type) {
                        var c = e;
                        (i = c.changedTouches[0].pageX - o),
                          (a = c.changedTouches[0].pageY - l);
                      } else {
                        var d = e;
                        (i = d.pageX - o), (a = d.pageY - l);
                      }
                      return { x: i, y: a };
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
            i = this.activationState,
            a = i.hasDeactivationUXRun,
            r = i.isActivated;
          (a || !r) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, we.FG_DEACTIVATION_MS)));
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
            var n = ve({}, t);
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
          var i = Math.floor(n * t.numbers.INITIAL_ORIGIN_SCALE);
          this.adapter.isUnbounded() && i % 2 != 0
            ? (this.initialSize = i - 1)
            : (this.initialSize = i),
            (this.fgScale = "" + this.maxRadius / this.initialSize),
            this.updateLayoutCssVars();
        }),
        (t.prototype.updateLayoutCssVars = function () {
          var e = t.strings,
            n = e.VAR_FG_SIZE,
            i = e.VAR_LEFT,
            a = e.VAR_TOP,
            r = e.VAR_FG_SCALE;
          this.adapter.updateCssVariable(n, this.initialSize + "px"),
            this.adapter.updateCssVariable(r, this.fgScale),
            this.adapter.isUnbounded() &&
              ((this.unboundedCoords = {
                left: Math.round(this.frame.width / 2 - this.initialSize / 2),
                top: Math.round(this.frame.height / 2 - this.initialSize / 2),
              }),
              this.adapter.updateCssVariable(
                i,
                this.unboundedCoords.left + "px"
              ),
              this.adapter.updateCssVariable(
                a,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Ce),
    Fe = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    ke = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    Ue = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    Pe = (function (e) {
      function t(n) {
        return e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ue;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Fe;
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
    })(Ce),
    He = (function (e) {
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
            i = t && n;
          if (i) this.wasDocked = !1;
          else {
            if (!this.wasDocked) return (this.wasDocked = !0), !0;
            if (this.isDockedShowing !== n)
              return (this.isDockedShowing = n), !0;
          }
          return i;
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
    })(Pe),
    Be = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        Ie(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(Fe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(Fe.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(He),
    Ve = (function (e) {
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
              this.adapter.addClass(Fe.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(Fe.SHORT_COLLAPSED_CLASS)
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
          this.adapter.removeClass(Fe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(Fe.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(Pe);
  const je = [];
  function ze(t, n = e) {
    let i;
    const a = new Set();
    function r(e) {
      if (s(t, e) && ((t = e), i)) {
        const e = !je.length;
        for (const e of a) e[1](), je.push(e, t);
        if (e) {
          for (let e = 0; e < je.length; e += 2) je[e][0](je[e + 1]);
          je.length = 0;
        }
      }
    }
    return {
      set: r,
      update: function (e) {
        r(e(t));
      },
      subscribe: function (s, o = e) {
        const l = [s, o];
        return (
          a.add(l),
          1 === a.size && (i = n(r) || e),
          s(t),
          () => {
            a.delete(l), 0 === a.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function Ge(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function qe(e, t, n, i = { bubbles: !0 }, a = !1) {
    if ("undefined" != typeof Event && e) {
      const r = new CustomEvent(
        t,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == e || e.dispatchEvent(r), a && t.startsWith("SMUI"))) {
        const a = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == e || e.dispatchEvent(a),
          a.defaultPrevented && r.preventDefault();
      }
      return r;
    }
  }
  function Ke(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const r = n[a],
        s = r.indexOf("$");
      (-1 !== s && -1 !== t.indexOf(r.substring(0, s + 1))) ||
        (-1 === t.indexOf(r) && (i[r] = e[r]));
    }
    return i;
  }
  const We =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    Xe =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function Ye(e) {
    let t,
      n = [];
    function i(t) {
      V(e, t);
    }
    return (
      (e.$on = (e, i) => {
        let a = e,
          r = () => {};
        t ? (r = t(a, i)) : n.push([a, i]);
        return (
          a.match(We) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              a
            ),
          () => {
            r();
          }
        );
      }),
      (e) => {
        const a = [],
          r = {};
        t = (t, n) => {
          let s = t,
            o = n,
            l = !1;
          const c = s.match(We),
            d = s.match(Xe),
            u = c || d;
          if (s.match(/^SMUI:\w+:/)) {
            const e = s.split(":");
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
              `The event ${s.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (s = t);
          }
          if (u) {
            const e = s.split(c ? ":" : "$");
            s = e[0];
            const t = Object.fromEntries(e.slice(1).map((e) => [e, !0]));
            t.passive && ((l = l || {}), (l.passive = !0)),
              t.nonpassive && ((l = l || {}), (l.passive = !1)),
              t.capture && ((l = l || {}), (l.capture = !0)),
              t.once && ((l = l || {}), (l.once = !0)),
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
          const f = S(e, s, o, l),
            m = () => {
              f();
              const e = a.indexOf(m);
              e > -1 && a.splice(e, 1);
            };
          return a.push(m), s in r || (r[s] = S(e, s, i)), m;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < a.length; e++) a[e]();
            for (let e of Object.entries(r)) e[1]();
          },
        };
      }
    );
  }
  function Qe(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let a = 0; a < n.length; a++) {
      const r = n[a];
      r.substring(0, t.length) === t && (i[r.substring(t.length)] = e[r]);
    }
    return i;
  }
  function Je(e, t) {
    let n = [];
    if (t)
      for (let i = 0; i < t.length; i++) {
        const a = t[i],
          r = Array.isArray(a) ? a[0] : a;
        Array.isArray(a) && a.length > 1 ? n.push(r(e, a[1])) : n.push(r(e));
      }
    return {
      update(e) {
        if (((e && e.length) || 0) != n.length)
          throw new Error(
            "You must not change the length of an actions array."
          );
        if (e)
          for (let t = 0; t < e.length; t++) {
            const i = n[t];
            if (i && i.update) {
              const n = e[t];
              Array.isArray(n) && n.length > 1 ? i.update(n[1]) : i.update();
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
  const { window: Ze } = le;
  function et(e) {
    let n, i, s, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = Ge({
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
        { style: (s = Object.entries(e[12]).map(tt).concat([e[3]]).join(" ")) },
        e[15],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = t(y, I[e]);
    return {
      c() {
        (n = E("header")), g && g.c(), O(n, y);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[25](n),
          (c = !0),
          f ||
            ((m = [
              S(Ze, "resize", e[23]),
              S(Ze, "scroll", e[24]),
              $((o = Je.call(null, n, e[1]))),
              $(e[13].call(null, n)),
              S(n, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t[0]) &&
          u(g, h, e, e[21], c ? d(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (y = ce(I, [
              (!c ||
                (2293 & t[0] &&
                  i !==
                    (i = Ge({
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
                    })))) && { class: i },
              (!c ||
                (4104 & t[0] &&
                  s !==
                    (s = Object.entries(e[12])
                      .map(tt)
                      .concat([e[3]])
                      .join(" ")))) && { style: s },
              32768 & t[0] && e[15],
            ]))
          ),
          o && r(o.update) && 2 & t[0] && o.update.call(null, e[1]);
      },
      i(e) {
        c || (se(g, e), (c = !0));
      },
      o(e) {
        oe(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[25](null), (f = !1), a(m);
      },
    };
  }
  const tt = ([e, t]) => `${e}: ${t};`;
  function nt(e, n, i) {
    const a = [
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c = () => {};
    function d(e) {
      return e === c;
    }
    let { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { variant: g = "standard" } = n,
      { color: $ = "primary" } = n,
      { collapsed: I = c } = n;
    const v = !d(I) && !!I;
    d(I) && (I = !1);
    let b,
      y,
      E,
      { prominent: A = !1 } = n,
      { dense: C = !1 } = n,
      { scrollTarget: x } = n,
      _ = {},
      S = {},
      T = {
        subscribe: ze({ variant: g, prominent: A, dense: C }, (e) => {
          i(18, (E = e));
        }).subscribe,
      };
    let O,
      L = g;
    function w() {
      return new ({ static: Pe, short: Ve, fixed: Be }[g] || He)({
        hasClass: D,
        addClass: N,
        removeClass: M,
        setStyle: R,
        getTopAppBarHeight: () => b.clientHeight,
        notifyNavigationIconClicked: () =>
          qe(b, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == x ? window.pageYOffset : x.scrollTop,
        getTotalActionItems: () =>
          b.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function D(e) {
      return e in _ ? _[e] : P().classList.contains(e);
    }
    function N(e) {
      _[e] || i(11, (_[e] = !0), _);
    }
    function M(e) {
      (e in _ && !_[e]) || i(11, (_[e] = !1), _);
    }
    function R(e, t) {
      S[e] != t &&
        ("" === t || null == t
          ? (delete S[e], i(12, S), i(20, L), i(4, g), i(9, y))
          : i(12, (S[e] = t), S));
    }
    function U() {
      y &&
        (y.handleTargetScroll(),
        "short" === g && i(0, (I = "isCollapsed" in y && y.isCollapsed)));
    }
    function P() {
      return b;
    }
    k(
      () => (
        i(9, (y = w())),
        y.init(),
        () => {
          y.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(15, (r = m(n, a))),
          "use" in e && i(1, (u = e.use)),
          "class" in e && i(2, (p = e.class)),
          "style" in e && i(3, (h = e.style)),
          "variant" in e && i(4, (g = e.variant)),
          "color" in e && i(5, ($ = e.color)),
          "collapsed" in e && i(0, (I = e.collapsed)),
          "prominent" in e && i(6, (A = e.prominent)),
          "dense" in e && i(7, (C = e.dense)),
          "scrollTarget" in e && i(8, (x = e.scrollTarget)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          E &&
          E({ variant: g, prominent: A, dense: C }),
          1049104 & e.$$.dirty[0] &&
            L !== g &&
            y &&
            (i(20, (L = g)),
            y.destroy(),
            i(11, (_ = {})),
            i(12, (S = {})),
            i(9, (y = w())),
            y.init()),
          528 & e.$$.dirty[0] &&
            y &&
            "short" === g &&
            "setAlwaysCollapsed" in y &&
            y.setAlwaysCollapsed(v),
          524544 & e.$$.dirty[0] &&
            O !== x &&
            (O && O.removeEventListener("scroll", U),
            x && x.addEventListener("scroll", U),
            i(19, (O = x)));
      }),
      [
        I,
        u,
        p,
        h,
        g,
        $,
        A,
        C,
        x,
        y,
        b,
        _,
        S,
        l,
        U,
        r,
        function () {
          return T;
        },
        P,
        E,
        O,
        L,
        o,
        s,
        () => "short" !== g && "fixed" !== g && y && y.handleWindowResize(),
        () => null == x && U(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (b = e), i(10, b);
          });
        },
        () => y && y.handleNavigationClick(),
      ]
    );
  }
  class it extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          nt,
          et,
          s,
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
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("div")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function rt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class st extends ge {
    constructor(e) {
      super(), he(this, e, rt, at, s, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function ot(e) {
    let t;
    const n = e[10].default,
      i = l(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a) &&
          u(i, n, e, e[12], t ? d(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function lt(e) {
    let n, i, a;
    const r = [
      { use: [e[7], ...e[0]] },
      { class: Ge({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var s = e[2];
    function o(e) {
      let n = { $$slots: { default: [ot] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[11](n)),
      {
        c() {
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            499 & t
              ? ce(r, [
                  129 & t && { use: [e[7], ...e[0]] },
                  50 & t && { class: Ge({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & t && de(e[6]),
                  256 & t && de(e[8]),
                ])
              : {};
          if (
            (4096 & t && (a.$$scope = { dirty: t, ctx: e }), s !== (s = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[11](n),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[11](null), t && b(i), n && me(n, t);
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
  function dt(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let r,
      s = m(n, a),
      { $$slots: o = {}, $$scope: l } = n,
      { use: c = [] } = n,
      { class: d = "" } = n;
    const u = ct.class,
      p = {},
      h = [],
      g = ct.contexts,
      $ = ct.props;
    let { component: I = ct.component } = n;
    Object.entries(ct.classMap).forEach(([e, t]) => {
      const n = B(t);
      n &&
        "subscribe" in n &&
        h.push(
          n.subscribe((t) => {
            i(4, (p[e] = t), p);
          })
        );
    });
    const v = Ye(F());
    for (let e in g) g.hasOwnProperty(e) && H(e, g[e]);
    return (
      U(() => {
        for (const e of h) e();
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (s = m(n, a))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (d = e.class)),
          "component" in e && i(2, (I = e.component)),
          "$$scope" in e && i(12, (l = e.$$scope));
      }),
      [
        c,
        d,
        I,
        r,
        p,
        u,
        $,
        v,
        s,
        function () {
          return r.getElement();
        },
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (r = e), i(3, r);
          });
        },
        l,
      ]
    );
  }
  class ut extends ge {
    constructor(e) {
      super(),
        he(this, e, dt, lt, s, {
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
  const pt = Object.assign({}, ct);
  function ft(e) {
    return new Proxy(ut, {
      construct: function (t, n) {
        return Object.assign(ct, pt, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(ct, pt, e), t[n];
      },
    });
  }
  function mt(e) {
    let n, i, s, o, c;
    const f = e[7].default,
      m = l(f, e, e[6], null);
    let h = [{ href: e[1] }, e[4]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("a")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[8](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 64 & t) &&
          u(m, f, e, e[6], s ? d(f, e[6], t, null) : p(e[6]), null),
          O(n, (g = ce(h, [(!s || 2 & t) && { href: e[1] }, 16 & t && e[4]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[8](null), (o = !1), a(c);
      },
    };
  }
  function ht(e, n, i) {
    const a = ["use", "href", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n,
      { href: c = "javascript:void(0);" } = n;
    const d = Ye(F());
    let u;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(4, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "href" in e && i(1, (c = e.href)),
          "$$scope" in e && i(6, (o = e.$$scope));
      }),
      [
        l,
        c,
        u,
        d,
        r,
        function () {
          return u;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(2, u);
          });
        },
      ]
    );
  }
  function gt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("button")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          n.autofocus && n.focus(),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function $t(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function It(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h1")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function vt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function bt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h2")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function yt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Et(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("h3")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function At(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Ct(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("li")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function xt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function _t(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("nav")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function St(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Tt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("span")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Ot(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class Lt extends ge {
    constructor(e) {
      super(), he(this, e, Ot, Tt, s, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function wt(e) {
    let n, i, s, o, c;
    const f = e[6].default,
      m = l(f, e, e[5], null);
    let h = [e[3]],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("ul")), m && m.c(), O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          m && m.m(n, null),
          e[7](n),
          (s = !0),
          o ||
            ((c = [$((i = Je.call(null, n, e[0]))), $(e[2].call(null, n))]),
            (o = !0));
      },
      p(e, [t]) {
        m &&
          m.p &&
          (!s || 32 & t) &&
          u(m, f, e, e[5], s ? d(f, e[5], t, null) : p(e[5]), null),
          O(n, (g = ce(h, [8 & t && e[3]]))),
          i && r(i.update) && 1 & t && i.update.call(null, e[0]);
      },
      i(e) {
        s || (se(m, e), (s = !0));
      },
      o(e) {
        oe(m, e), (s = !1);
      },
      d(t) {
        t && b(n), m && m.d(t), e[7](null), (o = !1), a(c);
      },
    };
  }
  function Dt(e, n, i) {
    const a = ["use", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n,
      { use: l = [] } = n;
    const c = Ye(F());
    let d;
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(3, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        r,
        function () {
          return d;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  const Nt = class extends ge {
      constructor(e) {
        super(), he(this, e, ht, mt, s, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    Mt = class extends ge {
      constructor(e) {
        super(), he(this, e, $t, gt, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Rt = st,
    Ft = class extends ge {
      constructor(e) {
        super(), he(this, e, vt, It, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    kt = class extends ge {
      constructor(e) {
        super(), he(this, e, yt, bt, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ut = class extends ge {
      constructor(e) {
        super(), he(this, e, At, Et, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Pt = class extends ge {
      constructor(e) {
        super(), he(this, e, xt, Ct, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Ht = class extends ge {
      constructor(e) {
        super(), he(this, e, St, _t, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    Bt = Lt,
    Vt = class extends ge {
      constructor(e) {
        super(), he(this, e, Dt, wt, s, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var jt = ft({ class: "mdc-top-app-bar__row", component: Rt });
  function zt(e) {
    let n, i, s, o, c, f;
    const m = e[9].default,
      h = l(m, e, e[8], null);
    let g = [
        {
          class: (i = Ge({
            [e[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === e[2],
            "mdc-top-app-bar__section--align-end": "end" === e[2],
          })),
        },
        e[3] ? { role: "toolbar" } : {},
        e[6],
      ],
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("section")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[10](n),
          (o = !0),
          c ||
            ((f = [$((s = Je.call(null, n, e[0]))), $(e[5].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 256 & t) &&
          u(h, m, e, e[8], o ? d(m, e[8], t, null) : p(e[8]), null),
          O(
            n,
            (I = ce(g, [
              (!o ||
                (6 & t &&
                  i !==
                    (i = Ge({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: i },
              8 & t && (e[3] ? { role: "toolbar" } : {}),
              64 & t && e[6],
            ]))
          ),
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[10](null), (c = !1), a(f);
      },
    };
  }
  function Gt(e, n, i) {
    const a = ["use", "class", "align", "toolbar", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { align: p = "start" } = n,
      { toolbar: h = !1 } = n;
    return (
      H(
        "SMUI:icon-button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      H(
        "SMUI:button:context",
        h ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "align" in e && i(2, (p = e.align)),
          "toolbar" in e && i(3, (h = e.toolbar)),
          "$$scope" in e && i(8, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        h,
        c,
        l,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  var qt = ft({ class: "mdc-top-app-bar__title", component: Bt });
  const Kt = class extends ge {
    constructor(e) {
      super(),
        he(this, e, Gt, zt, s, {
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
   */ var Wt = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Xt = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Wt;
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
            i = n.LABEL_FLOAT_ABOVE,
            a = n.LABEL_SHAKE;
          e
            ? this.adapter.addClass(i)
            : (this.adapter.removeClass(i), this.adapter.removeClass(a));
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
    Yt = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Qt = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (e) {
            i.handleTransitionEnd(e);
          }),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Yt;
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
          this.adapter.removeClass(Yt.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(Yt.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(Yt.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(Yt.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(Yt.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(Yt.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Ce),
    Jt = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    Zt = { NOTCH_ELEMENT_PADDING: 8 },
    en = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    tn = (function (e) {
      function t(n) {
        return e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Jt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return en;
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
    })(Ce),
    nn = {
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
    an = {
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
    rn = { LABEL_SCALE: 0.75 },
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
    ln = ["mousedown", "touchstart"],
    cn = ["click", "keydown"],
    dn = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (a.isFocused = !1),
          (a.receivedUserInput = !1),
          (a.valid = !0),
          (a.useNativeValidation = !0),
          (a.validateOnValueChange = !0),
          (a.helperText = i.helperText),
          (a.characterCounter = i.characterCounter),
          (a.leadingIcon = i.leadingIcon),
          (a.trailingIcon = i.trailingIcon),
          (a.inputFocusHandler = function () {
            a.activateFocus();
          }),
          (a.inputBlurHandler = function () {
            a.deactivateFocus();
          }),
          (a.inputInputHandler = function () {
            a.handleInput();
          }),
          (a.setPointerXOffset = function (e) {
            a.setTransformOrigin(e);
          }),
          (a.textFieldInteractionHandler = function () {
            a.handleTextFieldInteraction();
          }),
          (a.validationAttributeChangeHandler = function (e) {
            a.handleValidationAttributeChange(e);
          }),
          a
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return an;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return nn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return rn;
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
          var e, t, n, i;
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
            for (var a = Ee(ln), r = a.next(); !r.done; r = a.next()) {
              var s = r.value;
              this.adapter.registerInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              r && !r.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Ee(cn), l = o.next(); !l.done; l = o.next()) {
              s = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                s,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              l && !l.done && (i = o.return) && i.call(o);
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
          var e, t, n, i;
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
            for (var a = Ee(ln), r = a.next(); !r.done; r = a.next()) {
              var s = r.value;
              this.adapter.deregisterInputInteractionHandler(
                s,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              r && !r.done && (t = a.return) && t.call(a);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = Ee(cn), l = o.next(); !l.done; l = o.next()) {
              s = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                s,
                this.textFieldInteractionHandler
              );
            }
          } catch (e) {
            n = { error: e };
          } finally {
            try {
              l && !l.done && (i = o.return) && i.call(o);
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
              var t = this.adapter.getLabelWidth() * rn.LABEL_SCALE;
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
              i = n.target.getBoundingClientRect(),
              a = n.clientX - i.left;
            this.adapter.setLineRippleTransformOrigin(a);
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
            var i = this.helperText.isVisible(),
              a = this.helperText.getId();
            i && a
              ? this.adapter.setInputAttr(nn.ARIA_DESCRIBEDBY, a)
              : this.adapter.removeInputAttr(nn.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.styleFocused = function (e) {
          var n = t.cssClasses.FOCUSED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.styleDisabled = function (e) {
          var n = t.cssClasses,
            i = n.DISABLED,
            a = n.INVALID;
          e
            ? (this.adapter.addClass(i), this.adapter.removeClass(a))
            : this.adapter.removeClass(i),
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
    un = "mdc-dom-focus-sentinel",
    pn = (function () {
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
            .call(this.root.querySelectorAll("." + un))
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
            i = this.createSentinel();
          n.addEventListener("focus", function () {
            var n = t.getFocusableElements(e);
            n.length > 0 && n[n.length - 1].focus();
          }),
            i.addEventListener("focus", function () {
              var n = t.getFocusableElements(e);
              n.length > 0 && n[0].focus();
            }),
            e.insertBefore(n, e.children[0]),
            e.appendChild(i);
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
                  !e.classList.contains(un) &&
                  !t,
                i = !1;
              if (n) {
                var a = getComputedStyle(e);
                i = "none" === a.display || "hidden" === a.visibility;
              }
              return n && !i;
            });
        }),
        (e.prototype.createSentinel = function () {
          var e = document.createElement("div");
          return (
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-hidden", "true"),
            e.classList.add(un),
            e
          );
        }),
        e
      );
    })(),
    fn = Object.freeze({ __proto__: null, FocusTrap: pn }),
    mn = "Unknown",
    hn = "Backspace",
    gn = "Enter",
    $n = "Spacebar",
    In = "PageUp",
    vn = "PageDown",
    bn = "End",
    yn = "Home",
    En = "ArrowLeft",
    An = "ArrowUp",
    Cn = "ArrowRight",
    xn = "ArrowDown",
    _n = "Delete",
    Sn = "Escape",
    Tn = "Tab",
    On = new Set();
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
   */ On.add(hn),
    On.add(gn),
    On.add($n),
    On.add(In),
    On.add(vn),
    On.add(bn),
    On.add(yn),
    On.add(En),
    On.add(An),
    On.add(Cn),
    On.add(xn),
    On.add(_n),
    On.add(Sn),
    On.add(Tn);
  var Ln = 8,
    wn = 13,
    Dn = 32,
    Nn = 33,
    Mn = 34,
    Rn = 35,
    Fn = 36,
    kn = 37,
    Un = 38,
    Pn = 39,
    Hn = 40,
    Bn = 46,
    Vn = 27,
    jn = 9,
    zn = new Map();
  zn.set(Ln, hn),
    zn.set(wn, gn),
    zn.set(Dn, $n),
    zn.set(Nn, In),
    zn.set(Mn, vn),
    zn.set(Rn, bn),
    zn.set(Fn, yn),
    zn.set(kn, En),
    zn.set(Un, An),
    zn.set(Pn, Cn),
    zn.set(Hn, xn),
    zn.set(Bn, _n),
    zn.set(Vn, Sn),
    zn.set(jn, Tn);
  var Gn = new Set();
  function qn(e) {
    var t = e.key;
    if (On.has(t)) return t;
    var n = zn.get(e.keyCode);
    return n || mn;
  }
  function Kn(e) {
    let t;
    const n = e[9].default,
      i = l(n, e, e[11], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 2048 & a) &&
          u(i, n, e, e[11], t ? d(n, e[11], a, null) : p(e[11]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Wn(e) {
    let n, i, a;
    const r = [
      { use: [e[4], ...e[0]] },
      {
        class: Ge({
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
    var s = e[2];
    function o(e) {
      let n = { $$slots: { default: [Kn] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[10](n)),
      {
        c() {
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            243 & t
              ? ce(r, [
                  17 & t && { use: [e[4], ...e[0]] },
                  34 & t && {
                    class: Ge({
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
                    de("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & t && { tabindex: e[6] },
                  128 & t && de(e[7]),
                ])
              : {};
          if (
            (2048 & t && (a.$$scope = { dirty: t, ctx: e }), s !== (s = e[2]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[10](n),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[10](null), t && b(i), n && me(n, t);
        },
      }
    );
  }
  function Xn(e, n, i) {
    const a = ["use", "class", "component", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      { component: p = Lt } = n;
    const h = B("SMUI:label:context"),
      g = B("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(7, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "component" in e && i(2, (p = e.component)),
          "$$scope" in e && i(11, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        c,
        l,
        h,
        g,
        r,
        function () {
          return c.getElement();
        },
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
        o,
      ]
    );
  }
  Gn.add(In),
    Gn.add(vn),
    Gn.add(bn),
    Gn.add(yn),
    Gn.add(En),
    Gn.add(An),
    Gn.add(Cn),
    Gn.add(xn);
  function Yn(e) {
    let t;
    const n = e[4].default,
      i = l(n, e, e[3], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, [a]) {
        i &&
          i.p &&
          (!t || 8 & a) &&
          u(i, n, e, e[3], t ? d(n, e[3], a, null) : p(e[3]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Qn(e, t, n) {
    let i,
      { $$slots: a = {}, $$scope: r } = t,
      { key: s } = t,
      { value: l } = t;
    const c = ze(l);
    return (
      o(e, c, (e) => n(5, (i = e))),
      H(s, c),
      U(() => {
        c.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (s = e.key)),
          "value" in e && n(2, (l = e.value)),
          "$$scope" in e && n(3, (r = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && g(c, (i = l), i);
      }),
      [c, s, l, r, a]
    );
  }
  class Jn extends ge {
    constructor(e) {
      super(), he(this, e, Qn, Yn, s, { key: 1, value: 2 });
    }
  }
  const Zn = class extends ge {
      constructor(e) {
        super(),
          he(this, e, Xn, Wn, s, {
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
    { applyPassive: ei } = xe,
    { matches: ti } = Te;
  function ni(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: a = !1,
      color: r,
      active: s,
      rippleElement: o,
      eventTarget: l,
      activeTarget: c,
      addClass: d = (t) => e.classList.add(t),
      removeClass: u = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let m,
      h,
      g = B("SMUI:addLayoutListener"),
      $ = s,
      I = l,
      v = c;
    function b() {
      n
        ? (d("mdc-ripple-surface"),
          "primary" === r
            ? (d("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary"))
            : "secondary" === r
            ? (u("smui-ripple-surface--primary"),
              d("smui-ripple-surface--secondary"))
            : (u("smui-ripple-surface--primary"),
              u("smui-ripple-surface--secondary")))
        : (u("mdc-ripple-surface"),
          u("smui-ripple-surface--primary"),
          u("smui-ripple-surface--secondary")),
        m &&
          $ !== s &&
          (($ = s), s ? m.activate() : !1 === s && m.deactivate()),
        t && !m
          ? ((m = new Re({
              addClass: d,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    i = e.CSS;
                  if ("boolean" == typeof Se && !t) return Se;
                  if (!i || "function" != typeof i.supports) return !1;
                  var a = i.supports("--css-vars", "yes"),
                    r =
                      i.supports("(--css-vars: yes)") &&
                      i.supports("color", "#00000000");
                  return (n = a || r), t || (Se = n), n;
                })(window),
              computeBoundingRect: () => (o || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, ei()),
              deregisterInteractionHandler: (t, n) =>
                (l || e).removeEventListener(t, n, ei()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == s ? ti(c || e, ":active") : s),
              isSurfaceDisabled: () => !!a,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, ei()),
              registerInteractionHandler: (t, n) =>
                (l || e).addEventListener(t, n, ei()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: u,
              updateCssVariable: p,
            })),
            f.then(() => {
              m && (m.init(), m.setUnbounded(i));
            }))
          : m &&
            !t &&
            f.then(() => {
              m && (m.destroy(), (m = void 0));
            }),
        !m ||
          (I === l && v === c) ||
          ((I = l),
          (v = c),
          m.destroy(),
          requestAnimationFrame(() => {
            m && (m.init(), m.setUnbounded(i));
          })),
        !t && i && d("mdc-ripple-upgraded--unbounded");
    }
    return (
      b(),
      g &&
        (h = g(function () {
          m && m.layout();
        })),
      {
        update(m) {
          ({
            ripple: t,
            surface: n,
            unbounded: i,
            disabled: a,
            color: r,
            active: s,
            rippleElement: o,
            eventTarget: l,
            activeTarget: c,
            addClass: d,
            removeClass: u,
            addStyle: p,
            initPromise: f,
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
            m
          )),
            b();
        },
        destroy() {
          m &&
            (m.destroy(),
            (m = void 0),
            u("mdc-ripple-surface"),
            u("smui-ripple-surface--primary"),
            u("smui-ripple-surface--secondary")),
            h && h();
        },
      }
    );
  }
  function ii(e) {
    let n, i, s, o, c, f, m, h;
    const g = e[22].default,
      I = l(g, e, e[21], null);
    let y = [
        {
          class: (i = Ge({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (s = Object.entries(e[9]).map(oi).concat([e[4]]).join(" ")) },
        { for: (o = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      A = {};
    for (let e = 0; e < y.length; e += 1) A = t(A, y[e]);
    return {
      c() {
        (n = E("label")), I && I.c(), O(n, A);
      },
      m(t, i) {
        v(t, n, i),
          I && I.m(n, null),
          e[24](n),
          (f = !0),
          m ||
            ((h = [$((c = Je.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 2097152 & t) &&
          u(I, g, e, e[21], f ? d(g, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (A = ce(y, [
              (!f ||
                (267 & t &&
                  i !==
                    (i = Ge({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!f ||
                (528 & t &&
                  s !==
                    (s = Object.entries(e[9])
                      .map(oi)
                      .concat([e[4]])
                      .join(" ")))) && { style: s },
              (!f ||
                (32 & t &&
                  o !== (o = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: o,
              },
              4096 & t && e[12],
            ]))
          ),
          c && r(c.update) && 4 & t && c.update.call(null, e[2]);
      },
      i(e) {
        f || (se(I, e), (f = !0));
      },
      o(e) {
        oe(I, e), (f = !1);
      },
      d(t) {
        t && b(n), I && I.d(t), e[24](null), (m = !1), a(h);
      },
    };
  }
  function ai(e) {
    let n, i, s, o, c, f, m;
    const h = e[22].default,
      g = l(h, e, e[21], null);
    let I = [
        {
          class: (i = Ge({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (s = Object.entries(e[9]).map(si).concat([e[4]]).join(" ")) },
        e[12],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = t(y, I[e]);
    return {
      c() {
        (n = E("span")), g && g.c(), O(n, y);
      },
      m(t, i) {
        v(t, n, i),
          g && g.m(n, null),
          e[23](n),
          (c = !0),
          f ||
            ((m = [$((o = Je.call(null, n, e[2]))), $(e[10].call(null, n))]),
            (f = !0));
      },
      p(e, t) {
        g &&
          g.p &&
          (!c || 2097152 & t) &&
          u(g, h, e, e[21], c ? d(h, e[21], t, null) : p(e[21]), null),
          O(
            n,
            (y = ce(I, [
              (!c ||
                (267 & t &&
                  i !==
                    (i = Ge({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!c ||
                (528 & t &&
                  s !==
                    (s = Object.entries(e[9])
                      .map(si)
                      .concat([e[4]])
                      .join(" ")))) && { style: s },
              4096 & t && e[12],
            ]))
          ),
          o && r(o.update) && 4 & t && o.update.call(null, e[2]);
      },
      i(e) {
        c || (se(g, e), (c = !0));
      },
      o(e) {
        oe(g, e), (c = !1);
      },
      d(t) {
        t && b(n), g && g.d(t), e[23](null), (f = !1), a(m);
      },
    };
  }
  function ri(e) {
    let t, n, i, a;
    const r = [ai, ii],
      s = [];
    function o(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = o(e)),
      (n = s[t] = r[t](e)),
      {
        c() {
          n.c(), (i = _());
        },
        m(e, n) {
          s[t].m(e, n), v(e, i, n), (a = !0);
        },
        p(e, [a]) {
          let l = t;
          (t = o(e)),
            t === l
              ? s[t].p(e, a)
              : (ae(),
                oe(s[l], 1, 1, () => {
                  s[l] = null;
                }),
                re(),
                (n = s[t]),
                n ? n.p(e, a) : ((n = s[t] = r[t](e)), n.c()),
                se(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          a || (se(n), (a = !0));
        },
        o(e) {
          oe(n), (a = !1);
        },
        d(e) {
          s[t].d(e), e && b(i);
        },
      }
    );
  }
  const si = ([e, t]) => `${e}: ${t};`,
    oi = ([e, t]) => `${e}: ${t};`;
  function li(e, n, i) {
    const a = [
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l;
    const c = Ye(F());
    let d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { for: $ } = n,
      { floatAbove: I = !1 } = n,
      { required: v = !1 } = n,
      { wrapped: b = !1 } = n,
      y = {},
      E = {},
      A = null !== (l = B("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      C = I,
      x = v;
    function _(e) {
      y[e] || i(8, (y[e] = !0), y);
    }
    function S(e) {
      (e in y && !y[e]) || i(8, (y[e] = !1), y);
    }
    function T(e, t) {
      E[e] != t &&
        ("" === t || null == t ? (delete E[e], i(9, E)) : i(9, (E[e] = t), E));
    }
    function O(e) {
      e in E && (delete E[e], i(9, E));
    }
    function L() {
      return d;
    }
    return (
      k(() => {
        i(
          18,
          (u = new Xt({
            addClass: _,
            removeClass: S,
            getWidth: () => {
              var e, t;
              const n = L(),
                i = n.cloneNode(!0);
              null === (e = n.parentNode) || void 0 === e || e.appendChild(i),
                i.classList.add("smui-floating-label--remove-transition"),
                i.classList.add("smui-floating-label--force-size"),
                i.classList.remove("mdc-floating-label--float-above");
              const a = i.scrollWidth;
              return (
                null === (t = n.parentNode) || void 0 === t || t.removeChild(i),
                a
              );
            },
            registerInteractionHandler: (e, t) => L().addEventListener(e, t),
            deregisterInteractionHandler: (e, t) =>
              L().removeEventListener(e, t),
          }))
        );
        const e = {
          get element() {
            return L();
          },
          addStyle: T,
          removeStyle: O,
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
        (n = t(t({}, n), f(e))),
          i(12, (r = m(n, a))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (h = e.class)),
          "style" in e && i(4, (g = e.style)),
          "for" in e && i(5, ($ = e.for)),
          "floatAbove" in e && i(0, (I = e.floatAbove)),
          "required" in e && i(1, (v = e.required)),
          "wrapped" in e && i(6, (b = e.wrapped)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && u && C !== I && (i(19, (C = I)), u.float(I)),
          1310722 & e.$$.dirty &&
            u &&
            x !== v &&
            (i(20, (x = v)), u.setRequired(v));
      }),
      [
        I,
        v,
        p,
        h,
        g,
        $,
        b,
        d,
        y,
        E,
        c,
        A,
        r,
        function (e) {
          u.shake(e);
        },
        function (e) {
          i(0, (I = e));
        },
        function (e) {
          i(1, (v = e));
        },
        function () {
          return u.getWidth();
        },
        L,
        u,
        C,
        x,
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
      ]
    );
  }
  class ci extends ge {
    constructor(e) {
      super(),
        he(this, e, li, ri, s, {
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
  function di(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u = [
        {
          class: (s = Ge({
            [n[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": n[3],
            ...n[5],
          })),
        },
        { style: (o = Object.entries(n[6]).map(ui).concat([n[2]]).join(" ")) },
        n[8],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (i = E("div")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          n[13](i),
          c ||
            ((d = [$((l = Je.call(null, i, n[0]))), $(n[7].call(null, i))]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = ce(u, [
            42 & t &&
              s !==
                (s = Ge({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: s },
            68 & t &&
              o !==
                (o = Object.entries(e[6]).map(ui).concat([e[2]]).join(" ")) && {
                style: o,
              },
            256 & t && e[8],
          ]))
        ),
          l && r(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[13](null), (c = !1), a(d);
      },
    };
  }
  const ui = ([e, t]) => `${e}: ${t};`;
  function pi(e, n, i) {
    const a = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let r = m(n, a);
    const s = Ye(F());
    let o,
      l,
      { use: c = [] } = n,
      { class: d = "" } = n,
      { style: u = "" } = n,
      { active: p = !1 } = n,
      h = {},
      g = {};
    function $(e) {
      return e in h ? h[e] : y().classList.contains(e);
    }
    function I(e) {
      h[e] || i(5, (h[e] = !0), h);
    }
    function v(e) {
      (e in h && !h[e]) || i(5, (h[e] = !1), h);
    }
    function b(e, t) {
      g[e] != t &&
        ("" === t || null == t ? (delete g[e], i(6, g)) : i(6, (g[e] = t), g));
    }
    function y() {
      return o;
    }
    return (
      k(
        () => (
          (l = new Qt({
            addClass: I,
            removeClass: v,
            hasClass: $,
            setStyle: b,
            registerEventHandler: (e, t) => y().addEventListener(e, t),
            deregisterEventHandler: (e, t) => y().removeEventListener(e, t),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (r = m(n, a))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (d = e.class)),
          "style" in e && i(2, (u = e.style)),
          "active" in e && i(3, (p = e.active));
      }),
      [
        c,
        d,
        u,
        p,
        o,
        h,
        g,
        s,
        r,
        function () {
          l.activate();
        },
        function () {
          l.deactivate();
        },
        function (e) {
          l.setRippleCenter(e);
        },
        y,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (o = e), i(4, o);
          });
        },
      ]
    );
  }
  class fi extends ge {
    constructor(e) {
      super(),
        he(this, e, pi, di, s, {
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
  function mi(e) {
    let t, n, i;
    const a = e[14].default,
      r = l(a, e, e[13], null);
    return {
      c() {
        (t = E("div")),
          r && r.c(),
          T(t, "class", "mdc-notched-outline__notch"),
          T(t, "style", (n = Object.entries(e[7]).map(gi).join(" ")));
      },
      m(e, n) {
        v(e, t, n), r && r.m(t, null), (i = !0);
      },
      p(e, s) {
        r &&
          r.p &&
          (!i || 8192 & s) &&
          u(r, a, e, e[13], i ? d(a, e[13], s, null) : p(e[13]), null),
          (!i ||
            (128 & s && n !== (n = Object.entries(e[7]).map(gi).join(" ")))) &&
            T(t, "style", n);
      },
      i(e) {
        i || (se(r, e), (i = !0));
      },
      o(e) {
        oe(r, e), (i = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function hi(e) {
    let n,
      i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m = !e[3] && mi(e),
      h = [
        {
          class: (c = Ge({
            [e[1]]: !0,
            "mdc-notched-outline": !0,
            "mdc-notched-outline--notched": e[2],
            "mdc-notched-outline--no-label": e[3],
            ...e[6],
          })),
        },
        e[9],
      ],
      g = {};
    for (let e = 0; e < h.length; e += 1) g = t(g, h[e]);
    return {
      c() {
        (n = E("div")),
          (i = E("div")),
          (s = x()),
          m && m.c(),
          (o = x()),
          (l = E("div")),
          T(i, "class", "mdc-notched-outline__leading"),
          T(l, "class", "mdc-notched-outline__trailing"),
          O(n, g);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          I(n, s),
          m && m.m(n, null),
          I(n, o),
          I(n, l),
          e[15](n),
          (u = !0),
          p ||
            ((f = [
              $((d = Je.call(null, n, e[0]))),
              $(e[8].call(null, n)),
              S(n, "SMUIFloatingLabel:mount", e[16]),
              S(n, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [t]) {
        e[3]
          ? m &&
            (ae(),
            oe(m, 1, 1, () => {
              m = null;
            }),
            re())
          : m
          ? (m.p(e, t), 8 & t && se(m, 1))
          : ((m = mi(e)), m.c(), se(m, 1), m.m(n, o)),
          O(
            n,
            (g = ce(h, [
              (!u ||
                (78 & t &&
                  c !==
                    (c = Ge({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: c },
              512 & t && e[9],
            ]))
          ),
          d && r(d.update) && 1 & t && d.update.call(null, e[0]);
      },
      i(e) {
        u || (se(m), (u = !0));
      },
      o(e) {
        oe(m), (u = !1);
      },
      d(t) {
        t && b(n), m && m.d(), e[15](null), (p = !1), a(f);
      },
    };
  }
  const gi = ([e, t]) => `${e}: ${t};`;
  function $i(e, n, i) {
    const a = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { notched: g = !1 } = n,
      { noLabel: $ = !1 } = n,
      I = {},
      v = {};
    function b(e) {
      I[e] || i(6, (I[e] = !0), I);
    }
    function y(e) {
      (e in I && !I[e]) || i(6, (I[e] = !1), I);
    }
    k(
      () => (
        (d = new tn({
          addClass: b,
          removeClass: y,
          setNotchWidthProperty: (e) => {
            return (
              (n = e + "px"),
              void (
                v[(t = "width")] != n &&
                ("" === n || null == n
                  ? (delete v[t], i(7, v))
                  : i(7, (v[t] = n), v))
              )
            );
            var t, n;
          },
          removeNotchWidthProperty: () => {
            var e;
            (e = "width") in v && (delete v[e], i(7, v));
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
        (n = t(t({}, n), f(e))),
          i(9, (r = m(n, a))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (h = e.class)),
          "notched" in e && i(2, (g = e.notched)),
          "noLabel" in e && i(3, ($ = e.noLabel)),
          "$$scope" in e && i(13, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (u
            ? (u.addStyle("transition-duration", "0s"),
              b("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                u && u.removeStyle("transition-duration");
              }))
            : y("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        h,
        g,
        $,
        u,
        c,
        I,
        v,
        l,
        r,
        function (e) {
          d.notch(e);
        },
        function () {
          d.closeNotch();
        },
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
        (e) => i(4, (u = e.detail)),
        () => i(4, (u = void 0)),
      ]
    );
  }
  class Ii extends ge {
    constructor(e) {
      super(),
        he(this, e, $i, hi, s, {
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
  var vi = ft({ class: "mdc-text-field-helper-line", component: Rt }),
    bi = ft({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: Bt,
    }),
    yi = ft({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: Bt,
    });
  function Ei(n) {
    let i,
      s,
      o,
      l,
      c,
      d = [
        { class: (s = Ge({ [n[1]]: !0, "mdc-text-field__input": !0 })) },
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
        (i = E("input")), O(i, u);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[26](i),
          l ||
            ((c = [
              $((o = Je.call(null, i, n[0]))),
              $(n[7].call(null, i)),
              S(i, "input", n[27]),
              S(i, "change", n[9]),
              S(i, "blur", n[24]),
              S(i, "focus", n[25]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        O(
          i,
          (u = ce(d, [
            2 & t &&
              s !== (s = Ge({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: s,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          o && r(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[26](null), (l = !1), a(c);
      },
    };
  }
  function Ai(e, n, i) {
    const a = [
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
    let r = m(n, a);
    const s = Ye(F());
    let o = () => {};
    let { use: l = [] } = n,
      { class: c = "" } = n,
      { type: d = "text" } = n,
      { placeholder: u = " " } = n,
      { value: p = o } = n;
    const h = (function (e) {
      return e === o;
    })(p);
    h && (p = "");
    let { files: g = null } = n,
      { dirty: $ = !1 } = n,
      { invalid: I = !1 } = n,
      { updateInvalid: v = !0 } = n,
      { emptyValueNull: b = null === p } = n;
    h && b && (p = null);
    let y,
      { emptyValueUndefined: E = void 0 === p } = n;
    h && E && (p = void 0);
    let A = {},
      C = {};
    function x(e) {
      if ("file" !== d)
        if ("" === e.currentTarget.value && b) i(11, (p = null));
        else if ("" === e.currentTarget.value && E) i(11, (p = void 0));
        else
          switch (d) {
            case "number":
            case "range":
              i(
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
              i(11, (p = e.currentTarget.value));
          }
      else i(12, (g = e.currentTarget.files));
    }
    function _() {
      return y;
    }
    k(() => {
      v && i(14, (I = y.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
          "use" in e && i(0, (l = e.use)),
          "class" in e && i(1, (c = e.class)),
          "type" in e && i(2, (d = e.type)),
          "placeholder" in e && i(3, (u = e.placeholder)),
          "value" in e && i(11, (p = e.value)),
          "files" in e && i(12, (g = e.files)),
          "dirty" in e && i(13, ($ = e.dirty)),
          "invalid" in e && i(14, (I = e.invalid)),
          "updateInvalid" in e && i(15, (v = e.updateInvalid)),
          "emptyValueNull" in e && i(16, (b = e.emptyValueNull)),
          "emptyValueUndefined" in e && i(17, (E = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
          ("file" === d
            ? (delete C.value, i(4, C), i(2, d), i(11, p))
            : i(4, (C.value = null == p ? "" : p), C));
      }),
      [
        l,
        c,
        d,
        u,
        C,
        y,
        A,
        s,
        x,
        function (e) {
          ("file" !== d && "range" !== d) || x(e),
            i(13, ($ = !0)),
            v && i(14, (I = y.matches(":invalid")));
        },
        r,
        p,
        g,
        $,
        I,
        v,
        b,
        E,
        function (e) {
          var t;
          return e in A
            ? null !== (t = A[e]) && void 0 !== t
              ? t
              : null
            : _().getAttribute(e);
        },
        function (e, t) {
          A[e] !== t && i(6, (A[e] = t), A);
        },
        function (e) {
          (e in A && null == A[e]) || i(6, (A[e] = void 0), A);
        },
        function () {
          _().focus();
        },
        function () {
          _().blur();
        },
        _,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (y = e), i(5, y);
          });
        },
        (e) => "file" !== d && x(e),
      ]
    );
  }
  class Ci extends ge {
    constructor(e) {
      super(),
        he(this, e, Ai, Ei, s, {
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
  function xi(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u = [
        { class: (s = Ge({ [n[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (o = `${n[4] ? "" : "resize: none; "}${n[3]}`) },
        n[6],
        n[9],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = t(p, u[e]);
    return {
      c() {
        (i = E("textarea")), O(i, p);
      },
      m(e, t) {
        v(e, i, t),
          i.autofocus && i.focus(),
          n[21](i),
          w(i, n[0]),
          c ||
            ((d = [
              $((l = Je.call(null, i, n[1]))),
              $(n[7].call(null, i)),
              S(i, "change", n[8]),
              S(i, "blur", n[19]),
              S(i, "focus", n[20]),
              S(i, "input", n[22]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        O(
          i,
          (p = ce(u, [
            4 & t &&
              s !== (s = Ge({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
                class: s,
              },
            24 & t &&
              o !== (o = `${e[4] ? "" : "resize: none; "}${e[3]}`) && {
                style: o,
              },
            64 & t && e[6],
            512 & t && e[9],
          ]))
        ),
          l && r(l.update) && 2 & t && l.update.call(null, e[1]),
          1 & t && w(i, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[21](null), (c = !1), a(d);
      },
    };
  }
  function _i(e, n, i) {
    const a = [
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
    let r = m(n, a);
    const s = Ye(F());
    let o,
      { use: l = [] } = n,
      { class: c = "" } = n,
      { style: d = "" } = n,
      { value: u = "" } = n,
      { dirty: p = !1 } = n,
      { invalid: h = !1 } = n,
      { updateInvalid: g = !0 } = n,
      { resizable: $ = !0 } = n,
      I = {};
    function v() {
      return o;
    }
    return (
      k(() => {
        g && i(11, (h = o.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (r = m(n, a))),
          "use" in e && i(1, (l = e.use)),
          "class" in e && i(2, (c = e.class)),
          "style" in e && i(3, (d = e.style)),
          "value" in e && i(0, (u = e.value)),
          "dirty" in e && i(10, (p = e.dirty)),
          "invalid" in e && i(11, (h = e.invalid)),
          "updateInvalid" in e && i(12, (g = e.updateInvalid)),
          "resizable" in e && i(4, ($ = e.resizable));
      }),
      [
        u,
        l,
        c,
        d,
        $,
        o,
        I,
        s,
        function () {
          i(10, (p = !0)), g && i(11, (h = o.matches(":invalid")));
        },
        r,
        p,
        h,
        g,
        function (e) {
          var t;
          return e in I
            ? null !== (t = I[e]) && void 0 !== t
              ? t
              : null
            : v().getAttribute(e);
        },
        function (e, t) {
          I[e] !== t && i(6, (I[e] = t), I);
        },
        function (e) {
          (e in I && null == I[e]) || i(6, (I[e] = void 0), I);
        },
        function () {
          v().focus();
        },
        function () {
          v().blur();
        },
        v,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (o = e), i(5, o);
          });
        },
        function () {
          (u = this.value), i(0, u);
        },
      ]
    );
  }
  class Si extends ge {
    constructor(e) {
      super(),
        he(this, e, _i, xi, s, {
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
  const Ti = (e) => ({}),
    Oi = (e) => ({}),
    Li = (e) => ({}),
    wi = (e) => ({}),
    Di = (e) => ({}),
    Ni = (e) => ({}),
    Mi = (e) => ({}),
    Ri = (e) => ({}),
    Fi = (e) => ({}),
    ki = (e) => ({}),
    Ui = (e) => ({}),
    Pi = (e) => ({}),
    Hi = (e) => ({}),
    Bi = (e) => ({}),
    Vi = (e) => ({}),
    ji = (e) => ({}),
    zi = (e) => ({}),
    Gi = (e) => ({}),
    qi = (e) => ({}),
    Ki = (e) => ({}),
    Wi = (e) => ({}),
    Xi = (e) => ({}),
    Yi = (e) => ({}),
    Qi = (e) => ({});
  function Ji(e) {
    let n, i, s, o, c, f, m, h, g, y, A, C, _, T;
    const L = e[51].label,
      w = l(L, e, e[90], ki);
    s = new Jn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [ea] },
        $$scope: { ctx: e },
      },
    });
    const D = e[51].default,
      N = l(D, e, e[90], null);
    f = new Jn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [ta] },
        $$scope: { ctx: e },
      },
    });
    const M = e[51].ripple,
      R = l(M, e, e[90], wi);
    let F = [
        {
          class: (h = Ge({
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
          style: (g = Object.entries(e[26]).map(Aa).concat([e[10]]).join(" ")),
        },
        Ke(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      k = {};
    for (let e = 0; e < F.length; e += 1) k = t(k, F[e]);
    return {
      c() {
        (n = E("div")),
          w && w.c(),
          (i = x()),
          pe(s.$$.fragment),
          (o = x()),
          N && N.c(),
          (c = x()),
          pe(f.$$.fragment),
          (m = x()),
          R && R.c(),
          O(n, k);
      },
      m(t, a) {
        v(t, n, a),
          w && w.m(n, null),
          I(n, i),
          fe(s, n, null),
          I(n, o),
          N && N.m(n, null),
          I(n, c),
          fe(f, n, null),
          I(n, m),
          R && R.m(n, null),
          e[80](n),
          (C = !0),
          _ ||
            ((T = [
              $(
                (y = ni.call(null, n, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              $((A = Je.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              S(n, "SMUITextfieldLeadingIcon:mount", e[81]),
              S(n, "SMUITextfieldLeadingIcon:unmount", e[82]),
              S(n, "SMUITextfieldTrailingIcon:mount", e[83]),
              S(n, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (_ = !0));
      },
      p(e, t) {
        w &&
          w.p &&
          (!C || 268435456 & t[2]) &&
          u(w, L, e, e[90], C ? d(L, e[90], t, Fi) : p(e[90]), ki);
        const i = {};
        268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }),
          s.$set(i),
          N &&
            N.p &&
            (!C || 268435456 & t[2]) &&
            u(N, D, e, e[90], C ? d(D, e[90], t, null) : p(e[90]), null);
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          f.$set(a),
          R &&
            R.p &&
            (!C || 268435456 & t[2]) &&
            u(R, M, e, e[90], C ? d(M, e[90], t, Li) : p(e[90]), wi),
          O(
            n,
            (k = ce(F, [
              (!C ||
                ((33673730 & t[0]) | (2048 & t[1]) &&
                  h !==
                    (h = Ge({
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
              (!C ||
                (67109888 & t[0] &&
                  g !==
                    (g = Object.entries(e[26])
                      .map(Aa)
                      .concat([e[10]])
                      .join(" ")))) && { style: g },
              1024 & t[1] &&
                Ke(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          y &&
            r(y.update) &&
            2048 & t[0] &&
            y.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          A && r(A.update) && 256 & t[0] && A.update.call(null, e[8]);
      },
      i(e) {
        C ||
          (se(w, e),
          se(s.$$.fragment, e),
          se(N, e),
          se(f.$$.fragment, e),
          se(R, e),
          (C = !0));
      },
      o(e) {
        oe(w, e),
          oe(s.$$.fragment, e),
          oe(N, e),
          oe(f.$$.fragment, e),
          oe(R, e),
          (C = !1);
      },
      d(t) {
        t && b(n),
          w && w.d(t),
          me(s),
          N && N.d(t),
          me(f),
          R && R.d(t),
          e[80](null),
          (_ = !1),
          a(T);
      },
    };
  }
  function Zi(e) {
    let n,
      i,
      s,
      o,
      c,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      _,
      T,
      L,
      w,
      D,
      N,
      M = !e[14] && "outlined" !== e[15] && na(e),
      R = (e[14] || "outlined" === e[15]) && sa(e);
    o = new Jn({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [da] },
        $$scope: { ctx: e },
      },
    });
    const F = e[51].default,
      k = l(F, e, e[90], null),
      U = [pa, ua],
      P = [];
    function H(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (m = H(e)),
      (h = P[m] = U[m](e)),
      (y = new Jn({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [$a] },
          $$scope: { ctx: e },
        },
      }));
    let B = !e[14] && "outlined" !== e[15] && e[11] && Ia(e),
      V = [
        {
          class: (C = Ge({
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
          style: (_ = Object.entries(e[26]).map(Ea).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        Ke(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let e = 0; e < V.length; e += 1) j = t(j, V[e]);
    return {
      c() {
        (n = E("label")),
          M && M.c(),
          (i = x()),
          R && R.c(),
          (s = x()),
          pe(o.$$.fragment),
          (c = x()),
          k && k.c(),
          (f = x()),
          h.c(),
          (g = x()),
          pe(y.$$.fragment),
          (A = x()),
          B && B.c(),
          O(n, j);
      },
      m(t, a) {
        v(t, n, a),
          M && M.m(n, null),
          I(n, i),
          R && R.m(n, null),
          I(n, s),
          fe(o, n, null),
          I(n, c),
          k && k.m(n, null),
          I(n, f),
          P[m].m(n, null),
          I(n, g),
          fe(y, n, null),
          I(n, A),
          B && B.m(n, null),
          e[73](n),
          (w = !0),
          D ||
            ((N = [
              $(
                (T = ni.call(null, n, {
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
              $((L = Je.call(null, n, e[8]))),
              $(e[34].call(null, n)),
              S(n, "SMUITextfieldLeadingIcon:mount", e[74]),
              S(n, "SMUITextfieldLeadingIcon:unmount", e[75]),
              S(n, "SMUITextfieldTrailingIcon:mount", e[76]),
              S(n, "SMUITextfieldTrailingIcon:unmount", e[77]),
              S(n, "SMUITextfieldCharacterCounter:mount", e[78]),
              S(n, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (D = !0));
      },
      p(e, t) {
        e[14] || "outlined" === e[15]
          ? M &&
            (ae(),
            oe(M, 1, 1, () => {
              M = null;
            }),
            re())
          : M
          ? (M.p(e, t), 49152 & t[0] && se(M, 1))
          : ((M = na(e)), M.c(), se(M, 1), M.m(n, i)),
          e[14] || "outlined" === e[15]
            ? R
              ? (R.p(e, t), 49152 & t[0] && se(R, 1))
              : ((R = sa(e)), R.c(), se(R, 1), R.m(n, s))
            : R &&
              (ae(),
              oe(R, 1, 1, () => {
                R = null;
              }),
              re());
        const a = {};
        268435456 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
          o.$set(a),
          k &&
            k.p &&
            (!w || 268435456 & t[2]) &&
            u(k, F, e, e[90], w ? d(F, e[90], t, null) : p(e[90]), null);
        let l = m;
        (m = H(e)),
          m === l
            ? P[m].p(e, t)
            : (ae(),
              oe(P[l], 1, 1, () => {
                P[l] = null;
              }),
              re(),
              (h = P[m]),
              h ? h.p(e, t) : ((h = P[m] = U[m](e)), h.c()),
              se(h, 1),
              h.m(n, g));
        const c = {};
        268435456 & t[2] && (c.$$scope = { dirty: t, ctx: e }),
          y.$set(c),
          !e[14] && "outlined" !== e[15] && e[11]
            ? B
              ? (B.p(e, t), 51200 & t[0] && se(B, 1))
              : ((B = Ia(e)), B.c(), se(B, 1), B.m(n, null))
            : B &&
              (ae(),
              oe(B, 1, 1, () => {
                B = null;
              }),
              re()),
          O(
            n,
            (j = ce(V, [
              (!w ||
                ((314823171 & t[0]) | (2048 & t[1]) &&
                  C !==
                    (C = Ge({
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
                    })))) && { class: C },
              (!w ||
                (67109888 & t[0] &&
                  _ !==
                    (_ = Object.entries(e[26])
                      .map(Ea)
                      .concat([e[10]])
                      .join(" ")))) && { style: _ },
              { for: void 0 },
              1024 & t[1] &&
                Ke(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          T &&
            r(T.update) &&
            (49152 & t[0]) | (4 & t[1]) &&
            T.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          L && r(L.update) && 256 & t[0] && L.update.call(null, e[8]);
      },
      i(e) {
        w ||
          (se(M),
          se(R),
          se(o.$$.fragment, e),
          se(k, e),
          se(h),
          se(y.$$.fragment, e),
          se(B),
          (w = !0));
      },
      o(e) {
        oe(M),
          oe(R),
          oe(o.$$.fragment, e),
          oe(k, e),
          oe(h),
          oe(y.$$.fragment, e),
          oe(B),
          (w = !1);
      },
      d(t) {
        t && b(n),
          M && M.d(),
          R && R.d(),
          me(o),
          k && k.d(t),
          P[m].d(),
          me(y),
          B && B.d(),
          e[73](null),
          (D = !1),
          a(N);
      },
    };
  }
  function ea(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], Ri);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          u(i, n, e, e[90], t ? d(n, e[90], a, Mi) : p(e[90]), Ri);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ta(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Ni);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          u(i, n, e, e[90], t ? d(n, e[90], a, Di) : p(e[90]), Ni);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function na(e) {
    let t,
      n,
      i,
      a = "filled" === e[15] && ia(),
      r = !e[16] && (null != e[17] || e[42].label) && aa(e);
    return {
      c() {
        a && a.c(), (t = x()), r && r.c(), (n = _());
      },
      m(e, s) {
        a && a.m(e, s), v(e, t, s), r && r.m(e, s), v(e, n, s), (i = !0);
      },
      p(e, i) {
        "filled" === e[15]
          ? a || ((a = ia()), a.c(), a.m(t.parentNode, t))
          : a && (a.d(1), (a = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? r &&
              (ae(),
              oe(r, 1, 1, () => {
                r = null;
              }),
              re())
            : r
            ? (r.p(e, i), (196608 & i[0]) | (2048 & i[1]) && se(r, 1))
            : ((r = aa(e)), r.c(), se(r, 1), r.m(n.parentNode, n));
      },
      i(e) {
        i || (se(r), (i = !0));
      },
      o(e) {
        oe(r), (i = !1);
      },
      d(e) {
        a && a.d(e), e && b(t), r && r.d(e), e && b(n);
      },
    };
  }
  function ia(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function aa(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Qe(e[41], "label$"),
    ];
    let r = { $$slots: { default: [ra] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new ci({ props: r })),
      e[52](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? ce(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && de(Qe(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[52](null), me(n, t);
        },
      }
    );
  }
  function ra(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      r = l(a, e, e[90], Qi);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            u(r, a, e, e[90], n ? d(a, e[90], s, Yi) : p(e[90]), Qi);
      },
      i(e) {
        n || (se(r, e), (n = !0));
      },
      o(e) {
        oe(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function sa(e) {
    let n, i;
    const a = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      Qe(e[41], "outline$"),
    ];
    let r = { $$slots: { default: [ca] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new Ii({ props: r })),
      e[54](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (196608 & t[0]) | (3072 & t[1])
              ? ce(a, [
                  (196608 & t[0]) | (2048 & t[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & t[1] && de(Qe(e[41], "outline$")),
                ])
              : {};
          (268640289 & t[0]) | (3072 & t[1]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[54](null), me(n, t);
        },
      }
    );
  }
  function oa(e) {
    let n, i;
    const a = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      Qe(e[41], "label$"),
    ];
    let r = { $$slots: { default: [la] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new ci({ props: r })),
      e[53](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (268443649 & t[0]) | (1024 & t[1])
              ? ce(a, [
                  268435457 & t[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & t[0] && { required: e[13] },
                  a[2],
                  1024 & t[1] && de(Qe(e[41], "label$")),
                ])
              : {};
          (131072 & t[0]) | (268435456 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[53](null), me(n, t);
        },
      }
    );
  }
  function la(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const a = e[51].label,
      r = l(a, e, e[90], Xi);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 131072 & s[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 268435456 & s[2]) &&
            u(r, a, e, e[90], n ? d(a, e[90], s, Wi) : p(e[90]), Xi);
      },
      i(e) {
        n || (se(r, e), (n = !0));
      },
      o(e) {
        oe(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function ca(e) {
    let t,
      n,
      i = !e[16] && (null != e[17] || e[42].label) && oa(e);
    return {
      c() {
        i && i.c(), (t = _());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? i &&
            (ae(),
            oe(i, 1, 1, () => {
              i = null;
            }),
            re())
          : i
          ? (i.p(e, n), (196608 & n[0]) | (2048 & n[1]) && se(i, 1))
          : ((i = oa(e)), i.c(), se(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (se(i), (n = !0));
      },
      o(e) {
        oe(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function da(e) {
    let t;
    const n = e[51].leadingIcon,
      i = l(n, e, e[90], Ki);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          u(i, n, e, e[90], t ? d(n, e[90], a, qi) : p(e[90]), Ki);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ua(e) {
    let n, i, a, r, s, o, c, f, m, h;
    const g = e[51].prefix,
      $ = l(g, e, e[90], ji);
    let I = null != e[20] && fa(e);
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
    function E(t) {
      e[64](t);
    }
    function A(t) {
      e[65](t);
    }
    function C(t) {
      e[66](t);
    }
    function _(t) {
      e[67](t);
    }
    let S = {};
    for (let e = 0; e < y.length; e += 1) S = t(S, y[e]);
    void 0 !== e[0] && (S.value = e[0]),
      void 0 !== e[3] && (S.files = e[3]),
      void 0 !== e[4] && (S.dirty = e[4]),
      void 0 !== e[1] && (S.invalid = e[1]),
      (a = new Ci({ props: S })),
      e[63](a),
      z.push(() => ue(a, "value", E)),
      z.push(() => ue(a, "files", A)),
      z.push(() => ue(a, "dirty", C)),
      z.push(() => ue(a, "invalid", _)),
      a.$on("blur", e[68]),
      a.$on("focus", e[69]),
      a.$on("blur", e[70]),
      a.$on("focus", e[71]);
    let T = null != e[21] && ha(e);
    const O = e[51].suffix,
      L = l(O, e, e[90], Bi);
    return {
      c() {
        $ && $.c(),
          (n = x()),
          I && I.c(),
          (i = x()),
          pe(a.$$.fragment),
          (f = x()),
          T && T.c(),
          (m = x()),
          L && L.c();
      },
      m(e, t) {
        $ && $.m(e, t),
          v(e, n, t),
          I && I.m(e, t),
          v(e, i, t),
          fe(a, e, t),
          v(e, f, t),
          T && T.m(e, t),
          v(e, m, t),
          L && L.m(e, t),
          (h = !0);
      },
      p(e, t) {
        $ &&
          $.p &&
          (!h || 268435456 & t[2]) &&
          u($, g, e, e[90], h ? d(g, e[90], t, Vi) : p(e[90]), ji),
          null != e[20]
            ? I
              ? (I.p(e, t), 1048576 & t[0] && se(I, 1))
              : ((I = fa(e)), I.c(), se(I, 1), I.m(i.parentNode, i))
            : I &&
              (ae(),
              oe(I, 1, 1, () => {
                I = null;
              }),
              re());
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
                  de(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && de(Qe(e[41], "input$")),
              ])
            : {};
        !r && 1 & t[0] && ((r = !0), (n.value = e[0]), Q(() => (r = !1))),
          !s && 8 & t[0] && ((s = !0), (n.files = e[3]), Q(() => (s = !1))),
          !o && 16 & t[0] && ((o = !0), (n.dirty = e[4]), Q(() => (o = !1))),
          !c && 2 & t[0] && ((c = !0), (n.invalid = e[1]), Q(() => (c = !1))),
          a.$set(n),
          null != e[21]
            ? T
              ? (T.p(e, t), 2097152 & t[0] && se(T, 1))
              : ((T = ha(e)), T.c(), se(T, 1), T.m(m.parentNode, m))
            : T &&
              (ae(),
              oe(T, 1, 1, () => {
                T = null;
              }),
              re()),
          L &&
            L.p &&
            (!h || 268435456 & t[2]) &&
            u(L, O, e, e[90], h ? d(O, e[90], t, Hi) : p(e[90]), Bi);
      },
      i(e) {
        h || (se($, e), se(I), se(a.$$.fragment, e), se(T), se(L, e), (h = !0));
      },
      o(e) {
        oe($, e), oe(I), oe(a.$$.fragment, e), oe(T), oe(L, e), (h = !1);
      },
      d(t) {
        $ && $.d(t),
          t && b(n),
          I && I.d(t),
          t && b(i),
          e[63](null),
          me(a, t),
          t && b(f),
          T && T.d(t),
          t && b(m),
          L && L.d(t);
      },
    };
  }
  function pa(e) {
    let n, i, a, r, s, o, c, f;
    const m = [
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
    function g(t) {
      e[57](t);
    }
    function $(t) {
      e[58](t);
    }
    let y = {};
    for (let e = 0; e < m.length; e += 1) y = t(y, m[e]);
    void 0 !== e[0] && (y.value = e[0]),
      void 0 !== e[4] && (y.dirty = e[4]),
      void 0 !== e[1] && (y.invalid = e[1]),
      (i = new Si({ props: y })),
      e[55](i),
      z.push(() => ue(i, "value", h)),
      z.push(() => ue(i, "dirty", g)),
      z.push(() => ue(i, "invalid", $)),
      i.$on("blur", e[59]),
      i.$on("focus", e[60]),
      i.$on("blur", e[61]),
      i.$on("focus", e[62]);
    const A = e[51].internalCounter,
      C = l(A, e, e[90], Gi);
    return {
      c() {
        (n = E("span")),
          pe(i.$$.fragment),
          (o = x()),
          C && C.c(),
          T(
            n,
            "class",
            (c = Ge({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, t) {
        v(e, n, t), fe(i, n, null), I(n, o), C && C.m(n, null), (f = !0);
      },
      p(e, t) {
        const o =
          (134754304 & t[0]) | (1024 & t[1])
            ? ce(m, [
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                1024 & t[1] && de(Qe(e[41], "input$")),
              ])
            : {};
        !a && 1 & t[0] && ((a = !0), (o.value = e[0]), Q(() => (a = !1))),
          !r && 16 & t[0] && ((r = !0), (o.dirty = e[4]), Q(() => (r = !1))),
          !s && 2 & t[0] && ((s = !0), (o.invalid = e[1]), Q(() => (s = !1))),
          i.$set(o),
          C &&
            C.p &&
            (!f || 268435456 & t[2]) &&
            u(C, A, e, e[90], f ? d(A, e[90], t, zi) : p(e[90]), Gi),
          (!f ||
            (1024 & t[1] &&
              c !==
                (c = Ge({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            T(n, "class", c);
      },
      i(e) {
        f || (se(i.$$.fragment, e), se(C, e), (f = !0));
      },
      o(e) {
        oe(i.$$.fragment, e), oe(C, e), (f = !1);
      },
      d(t) {
        t && b(n), e[55](null), me(i), C && C.d(t);
      },
    };
  }
  function fa(e) {
    let t, n;
    return (
      (t = new bi({
        props: { $$slots: { default: [ma] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
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
  function ma(e) {
    let t;
    return {
      c() {
        t = C(e[20]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && L(t, e[20]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function ha(e) {
    let t, n;
    return (
      (t = new yi({
        props: { $$slots: { default: [ga] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
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
  function ga(e) {
    let t;
    return {
      c() {
        t = C(e[21]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && L(t, e[21]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function $a(e) {
    let t;
    const n = e[51].trailingIcon,
      i = l(n, e, e[90], Pi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          u(i, n, e, e[90], t ? d(n, e[90], a, Ui) : p(e[90]), Pi);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ia(e) {
    let n, i;
    const a = [Qe(e[41], "ripple$")];
    let r = {};
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new fi({ props: r })),
      e[72](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? ce(a, [de(Qe(e[41], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[72](null), me(n, t);
        },
      }
    );
  }
  function va(e) {
    let n, i;
    const a = [Qe(e[41], "helperLine$")];
    let r = { $$slots: { default: [ba] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new vi({ props: r })),
      n.$on("SMUITextfieldHelperText:id", e[85]),
      n.$on("SMUITextfieldHelperText:mount", e[86]),
      n.$on("SMUITextfieldHelperText:unmount", e[87]),
      n.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      n.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 1024 & t[1] ? ce(a, [de(Qe(e[41], "helperLine$"))]) : {};
          268435456 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
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
  function ba(e) {
    let t;
    const n = e[51].helper,
      i = l(n, e, e[90], Oi);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 268435456 & a[2]) &&
          u(i, n, e, e[90], t ? d(n, e[90], a, Ti) : p(e[90]), Oi);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ya(e) {
    let t, n, i, a, r;
    const s = [Zi, Ji],
      o = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = o[t] = s[t](e));
    let l = e[42].helper && va(e);
    return {
      c() {
        n.c(), (i = x()), l && l.c(), (a = _());
      },
      m(e, n) {
        o[t].m(e, n), v(e, i, n), l && l.m(e, n), v(e, a, n), (r = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? l
              ? (l.p(e, t), 2048 & t[1] && se(l, 1))
              : ((l = va(e)), l.c(), se(l, 1), l.m(a.parentNode, a))
            : l &&
              (ae(),
              oe(l, 1, 1, () => {
                l = null;
              }),
              re());
      },
      i(e) {
        r || (se(n), se(l), (r = !0));
      },
      o(e) {
        oe(n), oe(l), (r = !1);
      },
      d(e) {
        o[t].d(e), e && b(i), l && l.d(e), e && b(a);
      },
    };
  }
  const Ea = ([e, t]) => `${e}: ${t};`,
    Aa = ([e, t]) => `${e}: ${t};`;
  function Ca(e, n, i) {
    let a;
    const r = [
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const c = h(o),
      { applyPassive: d } = xe,
      u = Ye(F());
    let p = () => {};
    function g(e) {
      return e === p;
    }
    let { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { ripple: b = !0 } = n,
      { disabled: y = !1 } = n,
      { required: E = !1 } = n,
      { textarea: A = !1 } = n,
      { variant: C = A ? "outlined" : "standard" } = n,
      { noLabel: x = !1 } = n,
      { label: _ } = n,
      { type: S = "text" } = n,
      { value: T = s.input$emptyValueUndefined ? void 0 : p } = n,
      { files: O = p } = n;
    const L = !g(T) || !g(O);
    g(T) && (T = void 0), g(O) && (O = null);
    let { invalid: w = p } = n,
      { updateInvalid: D = g(w) } = n;
    g(w) && (w = !1);
    let N,
      M,
      R,
      P,
      H,
      V,
      j,
      G,
      q,
      { dirty: W = !1 } = n,
      { prefix: Y } = n,
      { suffix: Q } = n,
      { validateOnValueChange: J = D } = n,
      { useNativeValidation: Z = D } = n,
      { withLeadingIcon: ee = p } = n,
      { withTrailingIcon: te = p } = n,
      { input: ne } = n,
      { floatingLabel: ie } = n,
      { lineRipple: ae } = n,
      { notchedOutline: re } = n,
      se = {},
      oe = {},
      le = !1,
      ce = B("SMUI:addLayoutListener"),
      de = new Promise((e) => (H = e)),
      ue = T;
    function pe(e) {
      var t;
      return e in se
        ? null !== (t = se[e]) && void 0 !== t
          ? t
          : null
        : ge().classList.contains(e);
    }
    function fe(e) {
      se[e] || i(25, (se[e] = !0), se);
    }
    function me(e) {
      (e in se && !se[e]) || i(25, (se[e] = !1), se);
    }
    function he() {
      if (M) {
        const e = M.shouldFloat;
        M.notchOutline(e);
      }
    }
    function ge() {
      return N;
    }
    ce && (P = ce(he)),
      k(() => {
        if (
          (i(
            49,
            (M = new dn(
              {
                addClass: fe,
                removeClass: me,
                hasClass: pe,
                registerTextFieldInteractionHandler: (e, t) =>
                  ge().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  ge().removeEventListener(e, t),
                registerValidationAttributeChangeHandler: (e) => {
                  const t = new MutationObserver((t) => {
                      Z &&
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
                floatLabel: (e) => ie && ie.float(e),
                getLabelWidth: () => (ie ? ie.getWidth() : 0),
                hasLabel: () => !!ie,
                shakeLabel: (e) => ie && ie.shake(e),
                setLabelRequired: (e) => ie && ie.setRequired(e),
                activateLineRipple: () => ae && ae.activate(),
                deactivateLineRipple: () => ae && ae.deactivate(),
                setLineRippleTransformOrigin: (e) =>
                  ae && ae.setRippleCenter(e),
                closeOutline: () => re && re.closeNotch(),
                hasOutline: () => !!re,
                notchOutline: (e) => re && re.notch(e),
              },
              {
                get helperText() {
                  return G;
                },
                get characterCounter() {
                  return q;
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
          L)
        ) {
          if (null == ne)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          M.init();
        } else
          (X(), K).then(() => {
            if (null == ne)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            M.init();
          });
        return (
          H(),
          () => {
            M.destroy();
          }
        );
      }),
      U(() => {
        P && P();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(41, (s = m(n, r))),
          "use" in e && i(8, ($ = e.use)),
          "class" in e && i(9, (I = e.class)),
          "style" in e && i(10, (v = e.style)),
          "ripple" in e && i(11, (b = e.ripple)),
          "disabled" in e && i(12, (y = e.disabled)),
          "required" in e && i(13, (E = e.required)),
          "textarea" in e && i(14, (A = e.textarea)),
          "variant" in e && i(15, (C = e.variant)),
          "noLabel" in e && i(16, (x = e.noLabel)),
          "label" in e && i(17, (_ = e.label)),
          "type" in e && i(18, (S = e.type)),
          "value" in e && i(0, (T = e.value)),
          "files" in e && i(3, (O = e.files)),
          "invalid" in e && i(1, (w = e.invalid)),
          "updateInvalid" in e && i(19, (D = e.updateInvalid)),
          "dirty" in e && i(4, (W = e.dirty)),
          "prefix" in e && i(20, (Y = e.prefix)),
          "suffix" in e && i(21, (Q = e.suffix)),
          "validateOnValueChange" in e && i(43, (J = e.validateOnValueChange)),
          "useNativeValidation" in e && i(44, (Z = e.useNativeValidation)),
          "withLeadingIcon" in e && i(22, (ee = e.withLeadingIcon)),
          "withTrailingIcon" in e && i(23, (te = e.withTrailingIcon)),
          "input" in e && i(2, (ne = e.input)),
          "floatingLabel" in e && i(5, (ie = e.floatingLabel)),
          "lineRipple" in e && i(6, (ae = e.lineRipple)),
          "notchedOutline" in e && i(7, (re = e.notchedOutline)),
          "$$scope" in e && i(90, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && i(33, (a = ne && ne.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            M &&
            M.isValid() !== !w &&
            (D ? i(1, (w = !M.isValid())) : M.setValid(!w)),
          266240 & e.$$.dirty[1] &&
            M &&
            M.getValidateOnValueChange() !== J &&
            M.setValidateOnValueChange(!g(J) && J),
          270336 & e.$$.dirty[1] && M && M.setUseNativeValidation(!!g(Z) || Z),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            M &&
            M.setDisabled(y),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && M && L && ue !== T)
        ) {
          i(50, (ue = T));
          const e = `${T}`;
          M.getValue() !== e && M.setValue(e);
        }
      }),
      [
        T,
        w,
        ne,
        O,
        W,
        ie,
        ae,
        re,
        $,
        I,
        v,
        b,
        y,
        E,
        A,
        C,
        x,
        _,
        S,
        D,
        Y,
        Q,
        ee,
        te,
        N,
        se,
        oe,
        R,
        le,
        V,
        j,
        G,
        q,
        a,
        u,
        g,
        L,
        de,
        fe,
        me,
        function (e, t) {
          oe[e] != t &&
            ("" === t || null == t
              ? (delete oe[e], i(26, oe))
              : i(26, (oe[e] = t), oe));
        },
        s,
        c,
        J,
        Z,
        function () {
          null == ne || ne.focus();
        },
        function () {
          null == ne || ne.blur();
        },
        he,
        ge,
        M,
        ue,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ie = e), i(5, ie);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (re = e), i(7, re);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (W = e), i(4, W);
        },
        function (e) {
          (w = e), i(1, w), i(49, M), i(19, D);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => qe(N, "blur", e),
        (e) => qe(N, "focus", e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ne = e), i(2, ne);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (O = e), i(3, O);
        },
        function (e) {
          (W = e), i(4, W);
        },
        function (e) {
          (w = e), i(1, w), i(49, M), i(19, D);
        },
        () => i(28, (le = !1)),
        () => i(28, (le = !0)),
        (e) => qe(N, "blur", e),
        (e) => qe(N, "focus", e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (ae = e), i(6, ae);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (j = e.detail)),
        () => i(30, (j = void 0)),
        (e) => i(32, (q = e.detail)),
        () => i(32, (q = void 0)),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (V = e.detail)),
        () => i(29, (V = void 0)),
        (e) => i(30, (j = e.detail)),
        () => i(30, (j = void 0)),
        (e) => i(27, (R = e.detail)),
        (e) => i(31, (G = e.detail)),
        () => {
          i(27, (R = void 0)), i(31, (G = void 0));
        },
        (e) => i(32, (q = e.detail)),
        () => i(32, (q = void 0)),
        l,
      ]
    );
  }
  class xa extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          Ca,
          ya,
          s,
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
   */ var _a = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    Sa = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    Ta = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return _a;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Sa;
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
          var e = this.adapter.getAttr(Sa.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(Sa.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(Sa.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(Sa.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(_a.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(_a.ICON_BUTTON_ON)
              : this.adapter.removeClass(_a.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(Sa.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(Sa.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(Sa.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(Sa.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Ce);
  function Oa(e) {
    let t;
    return {
      c() {
        (t = E("div")), T(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function La(e) {
    let t, n, i, a;
    const r = e[32].default,
      s = l(r, e, e[36], null);
    let o = e[8] && Oa();
    return {
      c() {
        (t = E("div")),
          (n = x()),
          s && s.c(),
          o && o.c(),
          (i = _()),
          T(t, "class", "mdc-icon-button__ripple");
      },
      m(e, r) {
        v(e, t, r),
          v(e, n, r),
          s && s.m(e, r),
          o && o.m(e, r),
          v(e, i, r),
          (a = !0);
      },
      p(e, t) {
        s &&
          s.p &&
          (!a || 32 & t[1]) &&
          u(s, r, e, e[36], a ? d(r, e[36], t, null) : p(e[36]), null),
          e[8]
            ? o || ((o = Oa()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (se(s, e), (a = !0));
      },
      o(e) {
        oe(s, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), s && s.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function wa(e) {
    let n, i, a;
    const r = [
      {
        use: [
          [
            ni,
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
        class: Ge({
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
      { style: Object.entries(e[18]).map(Da).concat([e[3]]).join(" ") },
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
    var s = e[13];
    function o(e) {
      let n = { $$slots: { default: [La] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
        e[33](n),
        n.$on("click", e[34]),
        n.$on("click", e[35])),
      {
        c() {
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            536748031 & t[0]
              ? ce(r, [
                  505413682 & t[0] && {
                    use: [
                      [
                        ni,
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
                    class: Ge({
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
                      .map(Da)
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
                  1048576 & t[0] && de(e[20]),
                  524288 & t[0] && de(e[19]),
                  268435456 & t[0] && de(e[28]),
                ])
              : {};
          if (
            ((256 & t[0]) | (32 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[13]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[33](n),
                n.$on("click", e[34]),
                n.$on("click", e[35]),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && me(n, t);
        },
      }
    );
  }
  const Da = ([e, t]) => `${e}: ${t};`;
  function Na(e, n, i) {
    let a;
    const r = [
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const c = Ye(F());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { style: I = "" } = n,
      { ripple: v = !0 } = n,
      { color: b } = n,
      { toggle: y = !1 } = n,
      { pressed: E = d } = n,
      { ariaLabelOn: A } = n,
      { ariaLabelOff: C } = n,
      { touch: x = !1 } = n,
      { displayFlex: _ = !0 } = n,
      { size: S = "normal" } = n,
      { href: T } = n,
      { action: O } = n,
      L = {},
      w = {},
      D = {},
      N = B("SMUI:icon-button:context"),
      M = B("SMUI:icon-button:aria-describedby"),
      { component: R = null == T ? Mt : Nt } = n,
      k = s.disabled;
    H("SMUI:icon:context", "icon-button");
    let P = null;
    function V(e) {
      return e in L ? L[e] : W().classList.contains(e);
    }
    function j(e) {
      L[e] || i(17, (L[e] = !0), L);
    }
    function G(e) {
      (e in L && !L[e]) || i(17, (L[e] = !1), L);
    }
    function q(e) {
      var t;
      return e in D
        ? null !== (t = D[e]) && void 0 !== t
          ? t
          : null
        : W().getAttribute(e);
    }
    function K(e, t) {
      D[e] !== t && i(19, (D[e] = t), D);
    }
    function W() {
      return p.getElement();
    }
    U(() => {
      h && h.destroy();
    });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(28, (s = m(n, r))),
          "use" in e && i(1, (g = e.use)),
          "class" in e && i(2, ($ = e.class)),
          "style" in e && i(3, (I = e.style)),
          "ripple" in e && i(4, (v = e.ripple)),
          "color" in e && i(5, (b = e.color)),
          "toggle" in e && i(29, (y = e.toggle)),
          "pressed" in e && i(0, (E = e.pressed)),
          "ariaLabelOn" in e && i(6, (A = e.ariaLabelOn)),
          "ariaLabelOff" in e && i(7, (C = e.ariaLabelOff)),
          "touch" in e && i(8, (x = e.touch)),
          "displayFlex" in e && i(9, (_ = e.displayFlex)),
          "size" in e && i(10, (S = e.size)),
          "href" in e && i(11, (T = e.href)),
          "action" in e && i(12, (O = e.action)),
          "component" in e && i(13, (R = e.component)),
          "$$scope" in e && i(36, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            i(
              20,
              (a = (() => {
                if ("data-table:pagination" !== N)
                  return "dialog:header" === N
                    ? { "data-mdc-dialog-action": O }
                    : { action: O };
                switch (O) {
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
          k !== s.disabled)
        ) {
          const e = W();
          "blur" in e && e.blur(), i(30, (k = s.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          W() &&
          y !== P &&
          (y && !h
            ? (i(
                16,
                (h = new Ta({
                  addClass: j,
                  hasClass: V,
                  notifyChange: (e) => {
                    !(function (e) {
                      i(0, (E = e.isOn));
                    })(e),
                      qe(W(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: G,
                  getAttr: q,
                  setAttr: K,
                }))
              ),
              h.init())
            : !y &&
              h &&
              (h.destroy(),
              i(16, (h = void 0)),
              i(17, (L = {})),
              i(19, (D = {}))),
          i(31, (P = y))),
          65537 & e.$$.dirty[0] && h && !u(E) && h.isOn() !== E && h.toggle(E);
      }),
      [
        E,
        g,
        $,
        I,
        v,
        b,
        A,
        C,
        x,
        _,
        S,
        T,
        O,
        R,
        W,
        p,
        h,
        L,
        w,
        D,
        a,
        c,
        u,
        N,
        M,
        j,
        G,
        function (e, t) {
          w[e] != t &&
            ("" === t || null == t
              ? (delete w[e], i(18, w))
              : i(18, (w[e] = t), w));
        },
        s,
        y,
        k,
        P,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(15, p);
          });
        },
        () => h && h.handleClick(),
        () =>
          "top-app-bar:navigation" === N &&
          qe(W(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class Ma extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          Na,
          wa,
          s,
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
   */ var Ra,
    Fa,
    ka = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((Ra = {})["" + ka.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (Ra["" + ka.LIST_ITEM_CLASS] = "mdc-list-item"),
    (Ra["" + ka.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (Ra["" + ka.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (Ra["" + ka.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (Ra["" + ka.ROOT] = "mdc-list");
  var Ua =
      (((Fa = {})["" + ka.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (Fa["" + ka.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (Fa["" + ka.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (Fa["" + ka.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (Fa["" + ka.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (Fa["" + ka.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (Fa["" + ka.ROOT] = "mdc-deprecated-list"),
      Fa),
    Pa = {
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
        ka.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ka.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ua[ka.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ua[ka.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        ka.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        ka.LIST_ITEM_CLASS +
        " a,\n    ." +
        ka.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        ka.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        Ua[ka.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ua[ka.LIST_ITEM_CLASS] +
        " a,\n    ." +
        Ua[ka.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ua[ka.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Ha = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Ba = ["input", "button", "textarea", "select"],
    Va = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Ba.indexOf(n) && e.preventDefault();
      }
    };
  function ja(e, t) {
    var n,
      i = e.nextChar,
      a = e.focusItemAtIndex,
      r = e.sortedIndexByFirstChar,
      s = e.focusedItemIndex,
      o = e.skipFocus,
      l = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        Ga(t);
      }, Ha.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + i),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, i) {
              var a = i.typeaheadBuffer[0],
                r = e.get(a);
              if (!r) return -1;
              if (
                a === i.currentFirstChar &&
                r[i.sortedIndexCursor].index === t
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % r.length;
                var s = r[i.sortedIndexCursor].index;
                if (!n(s)) return s;
              }
              i.currentFirstChar = a;
              var o,
                l = -1;
              for (o = 0; o < r.length; o++)
                if (!n(r[o].index)) {
                  l = o;
                  break;
                }
              for (; o < r.length; o++)
                if (r[o].index > t && !n(r[o].index)) {
                  l = o;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), r[i.sortedIndexCursor].index;
              return -1;
            })(r, s, l, t)
          : (function (e, t, n) {
              var i = n.typeaheadBuffer[0],
                a = e.get(i);
              if (!a) return -1;
              var r = a[n.sortedIndexCursor];
              if (0 === r.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(r.index))
                return r.index;
              var s = (n.sortedIndexCursor + 1) % a.length,
                o = -1;
              for (; s !== n.sortedIndexCursor; ) {
                var l = a[s],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  d = !t(l.index);
                if (c && d) {
                  o = s;
                  break;
                }
                s = (s + 1) % a.length;
              }
              if (-1 !== o)
                return (n.sortedIndexCursor = o), a[n.sortedIndexCursor].index;
              return -1;
            })(r, l, t)),
      -1 === n || o || a(n),
      n
    );
  }
  function za(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function Ga(e) {
    e.typeaheadBuffer = "";
  }
  function qa(e, t) {
    var n = e.event,
      i = e.isTargetListItem,
      a = e.focusedItemIndex,
      r = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      o = e.isItemAtIndexDisabled,
      l = "ArrowLeft" === qn(n),
      c = "ArrowUp" === qn(n),
      d = "ArrowRight" === qn(n),
      u = "ArrowDown" === qn(n),
      p = "Home" === qn(n),
      f = "End" === qn(n),
      m = "Enter" === qn(n),
      h = "Spacebar" === qn(n);
    return n.ctrlKey || n.metaKey || l || c || d || u || p || f || m
      ? -1
      : h || 1 !== n.key.length
      ? h
        ? (i && Va(n),
          i && za(t)
            ? ja(
                {
                  focusItemAtIndex: r,
                  focusedItemIndex: a,
                  nextChar: " ",
                  sortedIndexByFirstChar: s,
                  skipFocus: !1,
                  isItemAtIndexDisabled: o,
                },
                t
              )
            : -1)
        : -1
      : (Va(n),
        ja(
          {
            focusItemAtIndex: r,
            focusedItemIndex: a,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: s,
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
   */ var Ka = (function (e) {
    function t(n) {
      var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = Ha.UNSET_INDEX),
        (i.focusedItemIndex = Ha.UNSET_INDEX),
        (i.useActivatedClass = !1),
        (i.useSelectedAttr = !1),
        (i.ariaCurrentAttrValue = null),
        (i.isCheckboxList = !1),
        (i.isRadioList = !1),
        (i.hasTypeahead = !1),
        (i.typeaheadState = {
          bufferClearTimeout: 0,
          currentFirstChar: "",
          sortedIndexCursor: 0,
          typeaheadBuffer: "",
        }),
        (i.sortedIndexByFirstChar = new Map()),
        i
      );
    }
    return (
      Ie(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Pa;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return ka;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ha;
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
        e !== Ha.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ka.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = Ha.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              ka.LIST_ITEM_SELECTED_CLASS
            ),
            a = this.adapter.listItemAtIndexHasClass(
              n,
              ka.LIST_ITEM_ACTIVATED_CLASS
            );
          if (i || a) {
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
        return this.hasTypeahead && za(this.typeaheadState);
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
        var i = this,
          a = "ArrowLeft" === qn(e),
          r = "ArrowUp" === qn(e),
          s = "ArrowRight" === qn(e),
          o = "ArrowDown" === qn(e),
          l = "Home" === qn(e),
          c = "End" === qn(e),
          d = "Enter" === qn(e),
          u = "Spacebar" === qn(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          r || c
            ? (e.preventDefault(), this.focusLastElement())
            : (o || l) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              qa(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    i.focusItemAtIndex(e);
                  },
                  focusedItemIndex: -1,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return i.adapter.listItemAtIndexHasClass(
                      e,
                      ka.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && o) || (!this.isVertical && s))
              Va(e), this.focusNextElement(f);
            else if ((this.isVertical && r) || (!this.isVertical && a))
              Va(e), this.focusPrevElement(f);
            else if (l) Va(e), this.focusFirstElement();
            else if (c) Va(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Ha.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((d || u) && t) {
              var m = e.target;
              if (m && "A" === m.tagName && d) return;
              if (
                (Va(e),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  ka.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              qa(
                {
                  event: e,
                  focusItemAtIndex: function (e) {
                    i.focusItemAtIndex(e);
                  },
                  focusedItemIndex: this.focusedItemIndex,
                  isTargetListItem: t,
                  sortedIndexByFirstChar: this.sortedIndexByFirstChar,
                  isItemAtIndexDisabled: function (e) {
                    return i.adapter.listItemAtIndexHasClass(
                      e,
                      ka.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== Ha.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            ka.LIST_ITEM_DISABLED_CLASS
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
                ka.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Pa.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                ka.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Pa.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var i = ka.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = ka.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Ha.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== Ha.UNSET_INDEX && this.adapter.addClassForElementIndex(e, i),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === Ha.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Pa.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Pa.ARIA_CURRENT : Pa.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Ha.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== Ha.UNSET_INDEX)
        ) {
          var i = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, i);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Pa.ARIA_SELECTED : Pa.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== Ha.UNSET_INDEX &&
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
          var i = !1;
          e.indexOf(n) >= 0 && (i = !0),
            this.adapter.setCheckedCheckboxOrRadioAtIndex(n, i),
            this.adapter.setAttributeForElementIndex(
              n,
              t,
              i ? "true" : "false"
            );
        }
        this.selectedIndex = e;
      }),
      (t.prototype.setTabindexAtIndex = function (e) {
        this.focusedItemIndex === Ha.UNSET_INDEX && 0 !== e
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
          e !== Ha.UNSET_INDEX &&
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
            this.selectedIndex !== Ha.UNSET_INDEX
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
            (this.isSingleSelectionList && e === Ha.UNSET_INDEX)
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
          i = this.adapter.isCheckboxCheckedAtIndex(e);
        t && ((i = !i), this.adapter.setCheckedCheckboxOrRadioAtIndex(e, i)),
          this.adapter.setAttributeForElementIndex(e, n, i ? "true" : "false");
        var a =
          this.selectedIndex === Ha.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        i
          ? a.push(e)
          : (a = a.filter(function (t) {
              return t !== e;
            })),
          (this.selectedIndex = a);
      }),
      (t.prototype.focusItemAtIndex = function (e) {
        this.adapter.focusItemAtIndex(e), (this.focusedItemIndex = e);
      }),
      (t.prototype.toggleAll = function (e) {
        var t = this.adapter.getListItemCount();
        if (e.length === t) this.setCheckboxAtIndex([]);
        else {
          for (var n = [], i = 0; i < t; i++)
            (!this.adapter.listItemAtIndexHasClass(
              i,
              ka.LIST_ITEM_DISABLED_CLASS
            ) ||
              e.indexOf(i) > -1) &&
              n.push(i);
          this.setCheckboxAtIndex(n);
        }
      }),
      (t.prototype.typeaheadMatchItem = function (e, t, n) {
        var i = this;
        return (
          void 0 === n && (n = !1),
          ja(
            {
              focusItemAtIndex: function (e) {
                i.focusItemAtIndex(e);
              },
              focusedItemIndex: t || this.focusedItemIndex,
              nextChar: e,
              sortedIndexByFirstChar: this.sortedIndexByFirstChar,
              skipFocus: n,
              isItemAtIndexDisabled: function (e) {
                return i.adapter.listItemAtIndexHasClass(
                  e,
                  ka.LIST_ITEM_DISABLED_CLASS
                );
              },
            },
            this.typeaheadState
          )
        );
      }),
      (t.prototype.typeaheadInitSortedIndex = function () {
        return (function (e, t) {
          for (var n = new Map(), i = 0; i < e; i++) {
            var a = t(i).trim();
            if (a) {
              var r = a[0].toLowerCase();
              n.has(r) || n.set(r, []),
                n.get(r).push({ text: a.toLowerCase(), index: i });
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
        Ga(this.typeaheadState);
      }),
      t
    );
  })(Ce);
  function Wa(e) {
    let t;
    const n = e[37].default,
      i = l(n, e, e[43], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a[1]) &&
          u(i, n, e, e[43], t ? d(n, e[43], a, null) : p(e[43]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Xa(e) {
    let n, i, a;
    const r = [
      { use: [e[17], ...e[0]] },
      {
        class: Ge({
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
    var s = e[12];
    function o(e) {
      let n = { $$slots: { default: [Wa] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
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
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            8818687 & t[0]
              ? ce(r, [
                  131073 & t[0] && { use: [e[17], ...e[0]] },
                  266238 & t[0] && {
                    class: Ge({
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
                  8388608 & t[0] && de(e[23]),
                ])
              : {};
          if (
            (4096 & t[1] && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[38](n),
                n.$on("keydown", e[39]),
                n.$on("focusin", e[40]),
                n.$on("focusout", e[41]),
                n.$on("click", e[42]),
                n.$on("SMUIListItem:mount", e[19]),
                n.$on("SMUIListItem:unmount", e[20]),
                n.$on("SMUI:action", e[21]),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[38](null), t && b(i), n && me(n, t);
        },
      }
    );
  }
  function Ya(e, n, i) {
    const a = [
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l;
    const { closest: c, matches: d } = Te,
      u = Ye(F());
    let p,
      h,
      { use: g = [] } = n,
      { class: $ = "" } = n,
      { nonInteractive: I = !1 } = n,
      { dense: v = !1 } = n,
      { textualList: b = !1 } = n,
      { avatarList: y = !1 } = n,
      { iconList: E = !1 } = n,
      { imageList: A = !1 } = n,
      { thumbnailList: C = !1 } = n,
      { videoList: x = !1 } = n,
      { twoLine: _ = !1 } = n,
      { threeLine: S = !1 } = n,
      { vertical: T = !0 } = n,
      {
        wrapFocus: O = null !== (l = B("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = n,
      { singleSelection: L = !1 } = n,
      { selectedIndex: w = -1 } = n,
      { radioList: D = !1 } = n,
      { checkList: N = !1 } = n,
      { hasTypeahead: M = !1 } = n,
      R = [],
      P = B("SMUI:list:role"),
      V = B("SMUI:list:nav");
    const j = new WeakMap();
    let G,
      q = B("SMUI:dialog:selection"),
      K = B("SMUI:addLayoutListener"),
      { component: W = V ? Ht : Vt } = n;
    function X() {
      return null == p
        ? []
        : [...oe().children]
            .map((e) => j.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function Y(e) {
      const t = X()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function Q(e, t) {
      var n;
      const i = X()[e];
      return null !== (n = i && i.hasClass(t)) && void 0 !== n && n;
    }
    function J(e, t) {
      const n = X()[e];
      n && n.addClass(t);
    }
    function Z(e, t) {
      const n = X()[e];
      n && n.removeClass(t);
    }
    function ee(e, t, n) {
      const i = X()[e];
      i && i.addAttr(t, n);
    }
    function te(e, t) {
      const n = X()[e];
      n && n.removeAttr(t);
    }
    function ne(e, t) {
      const n = X()[e];
      return n ? n.getAttr(t) : null;
    }
    function ie(e) {
      var t;
      const n = X()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function ae(e) {
      const t = c(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && d(t, ".mdc-deprecated-list-item")
        ? X()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function re() {
      return h.layout();
    }
    function se() {
      return h.getSelectedIndex();
    }
    function oe() {
      return p.getElement();
    }
    H("SMUI:list:nonInteractive", I),
      H("SMUI:separator:context", "list"),
      P ||
        (L
          ? ((P = "listbox"), H("SMUI:list:item:role", "option"))
          : D
          ? ((P = "radiogroup"), H("SMUI:list:item:role", "radio"))
          : N
          ? ((P = "group"), H("SMUI:list:item:role", "checkbox"))
          : ((P = "list"), H("SMUI:list:item:role", void 0))),
      K && (G = K(re)),
      k(() => {
        i(
          13,
          (h = new Ka({
            addClassForElementIndex: J,
            focusItemAtIndex: Y,
            getAttributeForElementIndex: (e, t) => {
              var n, i;
              return null !==
                (i =
                  null === (n = X()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== i
                ? i
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? X()
                    .map((e) => e.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => R.length,
            getPrimaryTextAtIndex: ie,
            hasCheckboxAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = X()[e]) || void 0 === t
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
                    null === (t = X()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = X()[e];
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
            listItemAtIndexHasClass: Q,
            notifyAction: (e) => {
              i(24, (w = e)),
                null != p &&
                  qe(oe(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: Z,
            setAttributeForElementIndex: ee,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              X()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = X()[e];
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
            return R;
          },
          get typeaheadInProgress() {
            return h.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => h.typeaheadMatchItem(e, t, !0),
          getOrderedList: X,
          focusItemAtIndex: Y,
          addClassForElementIndex: J,
          removeClassForElementIndex: Z,
          setAttributeForElementIndex: ee,
          removeAttributeForElementIndex: te,
          getAttributeFromElementIndex: ne,
          getPrimaryTextAtIndex: ie,
        };
        return (
          qe(oe(), "SMUIList:mount", e),
          h.init(),
          () => {
            h.destroy();
          }
        );
      }),
      U(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(23, (r = m(n, a))),
          "use" in e && i(0, (g = e.use)),
          "class" in e && i(1, ($ = e.class)),
          "nonInteractive" in e && i(2, (I = e.nonInteractive)),
          "dense" in e && i(3, (v = e.dense)),
          "textualList" in e && i(4, (b = e.textualList)),
          "avatarList" in e && i(5, (y = e.avatarList)),
          "iconList" in e && i(6, (E = e.iconList)),
          "imageList" in e && i(7, (A = e.imageList)),
          "thumbnailList" in e && i(8, (C = e.thumbnailList)),
          "videoList" in e && i(9, (x = e.videoList)),
          "twoLine" in e && i(10, (_ = e.twoLine)),
          "threeLine" in e && i(11, (S = e.threeLine)),
          "vertical" in e && i(25, (T = e.vertical)),
          "wrapFocus" in e && i(26, (O = e.wrapFocus)),
          "singleSelection" in e && i(27, (L = e.singleSelection)),
          "selectedIndex" in e && i(24, (w = e.selectedIndex)),
          "radioList" in e && i(28, (D = e.radioList)),
          "checkList" in e && i(29, (N = e.checkList)),
          "hasTypeahead" in e && i(30, (M = e.hasTypeahead)),
          "component" in e && i(12, (W = e.component)),
          "$$scope" in e && i(43, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && h && h.setVerticalOrientation(T),
          67117056 & e.$$.dirty[0] && h && h.setWrapFocus(O),
          1073750016 & e.$$.dirty[0] && h && h.setHasTypeahead(M),
          134225920 & e.$$.dirty[0] && h && h.setSingleSelection(L),
          151003136 & e.$$.dirty[0] &&
            h &&
            L &&
            se() !== w &&
            h.setSelectedIndex(w);
      }),
      [
        g,
        $,
        I,
        v,
        b,
        y,
        E,
        A,
        C,
        x,
        _,
        S,
        W,
        h,
        p,
        P,
        d,
        u,
        q,
        function (e) {
          R.push(e.detail),
            j.set(e.detail.element, e.detail),
            L && e.detail.selected && i(24, (w = ae(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && R.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (R.splice(n, 1), j.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (D || N) {
            const t = ae(e.target);
            if (-1 !== t) {
              const e = X()[t];
              e &&
                ((D && !e.checked) || N) &&
                ((e.checked = !e.checked),
                e.activateRipple(),
                window.requestAnimationFrame(() => {
                  e.deactivateRipple();
                }));
            }
          }
        },
        ae,
        r,
        w,
        T,
        O,
        L,
        D,
        N,
        M,
        re,
        function (e, t) {
          return h.setEnabled(e, t);
        },
        function () {
          return h.isTypeaheadInProgress();
        },
        se,
        function () {
          return h.getFocusedItemIndex();
        },
        oe,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(14, p);
          });
        },
        (e) =>
          h &&
          h.handleKeydown(
            e,
            e.target.classList.contains("mdc-deprecated-list-item"),
            ae(e.target)
          ),
        (e) => h && h.handleFocusIn(ae(e.target)),
        (e) => h && h.handleFocusOut(ae(e.target)),
        (e) =>
          h &&
          h.handleClick(
            ae(e.target),
            !d(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        o,
      ]
    );
  }
  class Qa extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          Ya,
          Xa,
          s,
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
  function Ja(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Za(e) {
    let t,
      n,
      i = e[7] && Ja();
    const a = e[32].default,
      r = l(a, e, e[35], null);
    return {
      c() {
        i && i.c(), (t = _()), r && r.c();
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), r && r.m(e, a), (n = !0);
      },
      p(e, s) {
        e[7]
          ? i || ((i = Ja()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          r &&
            r.p &&
            (!n || 16 & s[1]) &&
            u(r, a, e, e[35], n ? d(a, e[35], s, null) : p(e[35]), null);
      },
      i(e) {
        n || (se(r, e), (n = !0));
      },
      o(e) {
        oe(r, e), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t), r && r.d(e);
      },
    };
  }
  function er(e) {
    let n, i, a;
    const r = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  ni,
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
        class: Ge({
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
      { style: Object.entries(e[17]).map(nr).concat([e[4]]).join(" ") },
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
    var s = e[12];
    function o(e) {
      let n = { $$slots: { default: [Za] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s &&
        ((n = new s(o(e))),
        e[33](n),
        n.$on("click", e[13]),
        n.$on("keydown", e[25]),
        n.$on("SMUIGenericInput:mount", e[26]),
        n.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, t) {
          const a =
            167726975 & t[0]
              ? ce(r, [
                  30425703 & t[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              ni,
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
                    class: Ge({
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
                      .map(nr)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & t[0] &&
                    de(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & t[0] && de(e[21] ? {} : { role: e[8] }),
                  2097409 & t[0] &&
                    de(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & t[0] &&
                    de(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & t[0] &&
                    de(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & t[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & t[0] && { tabindex: e[19] },
                  2048 & t[0] && { href: e[11] },
                  262144 & t[0] && de(e[18]),
                  134217728 & t[0] && de(e[27]),
                ])
              : {};
          if (
            ((128 & t[0]) | (16 & t[1]) && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[12]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[33](n),
                n.$on("click", e[13]),
                n.$on("keydown", e[25]),
                n.$on("SMUIGenericInput:mount", e[26]),
                n.$on("SMUIGenericInput:unmount", e[34]),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[33](null), t && b(i), n && me(n, t);
        },
      }
    );
  }
  let tr = 0;
  const nr = ([e, t]) => `${e}: ${t};`;
  function ir(e, n, i) {
    let a;
    const r = [
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
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    var c;
    const d = Ye(F());
    let u = () => {};
    let { use: p = [] } = n,
      { class: h = "" } = n,
      { style: g = "" } = n,
      { color: $ } = n,
      {
        nonInteractive: I = null !== (c = B("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = n;
    H("SMUI:list:nonInteractive", void 0);
    let { ripple: v = !I } = n,
      { activated: b = !1 } = n,
      { role: y = B("SMUI:list:item:role") } = n;
    H("SMUI:list:item:role", void 0);
    let E,
      A,
      C,
      { selected: x = !1 } = n,
      { disabled: _ = !1 } = n,
      { skipRestoreFocus: S = !1 } = n,
      { tabindex: T = u } = n,
      { inputId: O = "SMUI-form-field-list-" + tr++ } = n,
      { href: L } = n,
      w = {},
      D = {},
      N = {},
      M = B("SMUI:list:item:nav"),
      { component: R = M ? (L ? Nt : Bt) : Pt } = n;
    function P(e) {
      return e in w ? w[e] : Q().classList.contains(e);
    }
    function V(e) {
      w[e] || i(16, (w[e] = !0), w);
    }
    function j(e) {
      (e in w && !w[e]) || i(16, (w[e] = !1), w);
    }
    function G(e) {
      var t;
      return e in N
        ? null !== (t = N[e]) && void 0 !== t
          ? t
          : null
        : Q().getAttribute(e);
    }
    function q(e, t) {
      N[e] !== t && i(18, (N[e] = t), N);
    }
    function K(e) {
      (e in N && null == N[e]) || i(18, (N[e] = void 0), N);
    }
    function W() {
      let e = !0,
        t = E.getElement();
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
      e && i(19, (a = 0));
    }
    function X(e) {
      _ || qe(Q(), "SMUI:action", e);
    }
    function Y() {
      var e, t, n;
      const i = Q(),
        a = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (a) return null !== (e = a.textContent) && void 0 !== e ? e : "";
      const r = i.querySelector(".mdc-deprecated-list-item__text");
      return r
        ? null !== (t = r.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function Q() {
      return E.getElement();
    }
    H("SMUI:generic:input:props", { id: O }),
      H("SMUI:separator:context", void 0),
      k(() => {
        if (!x && !I) {
          let e = !0,
            t = E;
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
          e && (C = window.requestAnimationFrame(W));
        }
        const e = {
          _smui_list_item_accessor: !0,
          get element() {
            return Q();
          },
          get selected() {
            return x;
          },
          set selected(e) {
            i(0, (x = e));
          },
          hasClass: P,
          addClass: V,
          removeClass: j,
          getAttr: G,
          addAttr: q,
          removeAttr: K,
          getPrimaryText: Y,
          get checked() {
            var e;
            return null !== (e = A && A.checked) && void 0 !== e && e;
          },
          set checked(e) {
            A && i(14, (A.checked = !!e), A);
          },
          get hasCheckbox() {
            return !(!A || !("_smui_checkbox_accessor" in A));
          },
          get hasRadio() {
            return !(!A || !("_smui_radio_accessor" in A));
          },
          activateRipple() {
            A && A.activateRipple();
          },
          deactivateRipple() {
            A && A.deactivateRipple();
          },
          getValue: () => s.value,
          action: X,
          get tabindex() {
            return a;
          },
          set tabindex(e) {
            i(28, (T = e));
          },
          get disabled() {
            return _;
          },
          get activated() {
            return b;
          },
          set activated(e) {
            i(1, (b = e));
          },
        };
        return (
          qe(Q(), "SMUIListItem:mount", e),
          () => {
            qe(Q(), "SMUIListItem:unmount", e);
          }
        );
      }),
      U(() => {
        C && window.cancelAnimationFrame(C);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(27, (s = m(n, r))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (h = e.class)),
          "style" in e && i(4, (g = e.style)),
          "color" in e && i(5, ($ = e.color)),
          "nonInteractive" in e && i(6, (I = e.nonInteractive)),
          "ripple" in e && i(7, (v = e.ripple)),
          "activated" in e && i(1, (b = e.activated)),
          "role" in e && i(8, (y = e.role)),
          "selected" in e && i(0, (x = e.selected)),
          "disabled" in e && i(9, (_ = e.disabled)),
          "skipRestoreFocus" in e && i(10, (S = e.skipRestoreFocus)),
          "tabindex" in e && i(28, (T = e.tabindex)),
          "inputId" in e && i(29, (O = e.inputId)),
          "href" in e && i(11, (L = e.href)),
          "component" in e && i(12, (R = e.component)),
          "$$scope" in e && i(35, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          i(
            19,
            (a = T === u ? (I || _ || !(x || (A && A.checked)) ? -1 : 0) : T)
          );
      }),
      [
        x,
        b,
        p,
        h,
        g,
        $,
        I,
        v,
        y,
        _,
        S,
        L,
        R,
        X,
        A,
        E,
        w,
        D,
        N,
        a,
        d,
        M,
        V,
        j,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], i(17, D))
              : i(17, (D[e] = t), D));
        },
        function (e) {
          const t = "Enter" === e.key,
            n = "Space" === e.key;
          (t || n) && X(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            i(14, (A = e.detail));
        },
        s,
        T,
        O,
        Y,
        Q,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (E = e), i(15, E);
          });
        },
        () => i(14, (A = void 0)),
        l,
      ]
    );
  }
  var ar = ft({ class: "mdc-deprecated-list-item__text", component: Bt }),
    rr = ft({ class: "mdc-deprecated-list-item__primary-text", component: Bt }),
    sr = ft({
      class: "mdc-deprecated-list-item__secondary-text",
      component: Bt,
    });
  function or(e) {
    let n, i, s, o, c, f;
    const m = e[8].default,
      h = l(m, e, e[7], null);
    let g = [
        {
          class: (i = Ge({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("span")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[9](n),
          (o = !0),
          c ||
            ((f = [$((s = Je.call(null, n, e[0]))), $(e[3].call(null, n))]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 128 & t) &&
          u(h, m, e, e[7], o ? d(m, e[7], t, null) : p(e[7]), null),
          O(
            n,
            (I = ce(g, [
              (!o ||
                (2 & t &&
                  i !==
                    (i = Ge({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: i },
              32 & t && e[5],
            ]))
          ),
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[9](null), (c = !1), a(f);
      },
    };
  }
  function lr(e, n, i) {
    const a = ["use", "class", "getElement"];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      { use: d = [] } = n,
      { class: u = "" } = n,
      p = B("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(5, (r = m(n, a))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "$$scope" in e && i(7, (o = e.$$scope));
      }),
      [
        d,
        u,
        c,
        l,
        p,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(2, c);
          });
        },
      ]
    );
  }
  ft({ class: "mdc-deprecated-list-item__meta", component: Bt }),
    ft({ class: "mdc-deprecated-list-group", component: Rt }),
    ft({ class: "mdc-deprecated-list-group__subheader", component: Ut });
  const cr = class extends ge {
      constructor(e) {
        super(),
          he(
            this,
            e,
            ir,
            er,
            s,
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
    dr = class extends ge {
      constructor(e) {
        super(), he(this, e, lr, or, s, { use: 0, class: 1, getElement: 6 });
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
  var ur = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    pr = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    fr = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return pr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ur;
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
            (this.adapter.addClass(ur.OPEN),
            this.adapter.addClass(ur.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(ur.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(ur.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(ur.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(ur.OPENING) ||
            this.adapter.hasClass(ur.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(ur.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = ur.OPENING,
            n = ur.CLOSING,
            i = ur.OPEN,
            a = ur.ANIMATE,
            r = ur.ROOT;
          this.isElement(e.target) &&
            this.adapter.elementHasClass(e.target, r) &&
            (this.isClosing()
              ? (this.adapter.removeClass(i),
                this.closed(),
                this.adapter.restoreFocus(),
                this.adapter.notifyClose())
              : (this.adapter.focusActiveNavigationItem(),
                this.opened(),
                this.adapter.notifyOpen()),
            this.adapter.removeClass(a),
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
    mr = (function (e) {
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
    })(fr);
  function hr(e) {
    let n, i, s, o, c, f;
    const m = e[15].default,
      h = l(m, e, e[14], null);
    let g = [
        {
          class: (i = Ge({
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
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("aside")), h && h.c(), O(n, I);
      },
      m(t, i) {
        v(t, n, i),
          h && h.m(n, null),
          e[16](n),
          (o = !0),
          c ||
            ((f = [
              $((s = Je.call(null, n, e[0]))),
              $(e[7].call(null, n)),
              S(n, "keydown", e[17]),
              S(n, "transitionend", e[18]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        h &&
          h.p &&
          (!o || 16384 & t) &&
          u(h, m, e, e[14], o ? d(m, e[14], t, null) : p(e[14]), null),
          O(
            n,
            (I = ce(g, [
              (!o ||
                (78 & t &&
                  i !==
                    (i = Ge({
                      [e[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === e[2],
                      "mdc-drawer--modal": "modal" === e[2],
                      "smui-drawer__absolute": "modal" === e[2] && !e[3],
                      ...e[6],
                    })))) && { class: i },
              256 & t && e[8],
            ]))
          ),
          s && r(s.update) && 1 & t && s.update.call(null, e[0]);
      },
      i(e) {
        o || (se(h, e), (o = !0));
      },
      o(e) {
        oe(h, e), (o = !1);
      },
      d(t) {
        t && b(n), h && h.d(t), e[16](null), (c = !1), a(f);
      },
    };
  }
  function gr(e, n, i) {
    const a = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const { FocusTrap: l } = fn,
      c = Ye(F());
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { variant: $ } = n,
      { open: I = !1 } = n,
      { fixed: v = !0 } = n,
      b = {},
      y = null,
      E = !1;
    H("SMUI:list:nav", !0),
      H("SMUI:list:item:nav", !0),
      H("SMUI:list:wrapFocus", !0);
    let A = $;
    function C() {
      var e, t;
      E && E.removeEventListener("SMUIDrawerScrim:click", T),
        "modal" === $ &&
          ((E =
            null !==
              (t =
                null === (e = d.parentNode) || void 0 === e
                  ? void 0
                  : e.querySelector(".mdc-drawer-scrim")) &&
            void 0 !== t &&
            t),
          E && E.addEventListener("SMUIDrawerScrim:click", T));
      const n = "dismissible" === $ ? fr : "modal" === $ ? mr : void 0;
      return n
        ? new n({
            addClass: _,
            removeClass: S,
            hasClass: x,
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
              i(9, (I = !1)), qe(d, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (I = !0)), qe(d, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function x(e) {
      return e in b ? b[e] : O().classList.contains(e);
    }
    function _(e) {
      b[e] || i(6, (b[e] = !0), b);
    }
    function S(e) {
      (e in b && !b[e]) || i(6, (b[e] = !1), b);
    }
    function T() {
      u && "handleScrimClick" in u && u.handleScrimClick();
    }
    function O() {
      return d;
    }
    k(() => {
      (p = new l(d, { skipInitialFocus: !0 })), i(4, (u = C())), u && u.init();
    }),
      U(() => {
        u && u.destroy(),
          E && E.removeEventListener("SMUIDrawerScrim:click", T);
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(8, (r = m(n, a))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "variant" in e && i(2, ($ = e.variant)),
          "open" in e && i(9, (I = e.open)),
          "fixed" in e && i(3, (v = e.fixed)),
          "$$scope" in e && i(14, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8212 & e.$$.dirty &&
          A !== $ &&
          (i(13, (A = $)),
          u && u.destroy(),
          i(6, (b = {})),
          i(4, (u = C())),
          u && u.init()),
          528 & e.$$.dirty &&
            u &&
            u.isOpen() !== I &&
            (I ? u.open() : u.close());
      }),
      [
        h,
        g,
        $,
        v,
        u,
        d,
        b,
        c,
        r,
        I,
        function (e) {
          i(9, (I = e));
        },
        function () {
          return I;
        },
        O,
        A,
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(5, d);
          });
        },
        (e) => u && u.handleKeydown(e),
        (e) => u && u.handleTransitionEnd(e),
      ]
    );
  }
  class $r extends ge {
    constructor(e) {
      super(),
        he(this, e, gr, hr, s, {
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
  var Ir = ft({ class: "mdc-drawer-app-content", component: Rt }),
    vr = ft({ class: "mdc-drawer__content", component: Rt });
  ft({ class: "mdc-drawer__header", component: Rt }),
    ft({ class: "mdc-drawer__title", component: Ft }),
    ft({ class: "mdc-drawer__subtitle", component: kt });
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
  var br = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function yr(e, t) {
    if (
      (function (e) {
        return (
          Boolean(e.document) && "function" == typeof e.document.createElement
        );
      })(e) &&
      t in br
    ) {
      var n = e.document.createElement("div"),
        i = br[t],
        a = i.standard,
        r = i.prefixed;
      return a in n.style ? a : r;
    }
    return t;
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
   */ var Er = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    Ar = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    Cr = 0.8367142,
    xr = 2.00611057,
    _r = 0.37651913,
    Sr = 0.84386165,
    Tr = 1.60277782,
    Or = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Er;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ar;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              attachResizeObserver: function () {
                return null;
              },
              forceLayout: function () {},
              getWidth: function () {
                return 0;
              },
              hasClass: function () {
                return !1;
              },
              setBufferBarStyle: function () {
                return null;
              },
              setPrimaryBarStyle: function () {
                return null;
              },
              setStyle: function () {},
              removeAttribute: function () {},
              removeClass: function () {},
              setAttribute: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.init = function () {
          var e = this;
          (this.determinate = !this.adapter.hasClass(Er.INDETERMINATE_CLASS)),
            this.adapter.addClass(Er.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (t) {
              var n, i;
              if (!e.determinate)
                try {
                  for (var a = Ee(t), r = a.next(); !r.done; r = a.next()) {
                    var s = r.value;
                    s.contentRect &&
                      e.calculateAndSetDimensions(s.contentRect.width);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    r && !r.done && (i = a.return) && i.call(a);
                  } finally {
                    if (n) throw n.error;
                  }
                }
            })),
            !this.determinate &&
              this.observer &&
              this.calculateAndSetDimensions(this.adapter.getWidth());
        }),
        (t.prototype.setDeterminate = function (e) {
          if (((this.determinate = e), this.determinate))
            return (
              this.adapter.removeClass(Er.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                Ar.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(Ar.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(Ar.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Er.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(Ar.ARIA_VALUENOW),
            this.adapter.removeAttribute(Ar.ARIA_VALUEMAX),
            this.adapter.removeAttribute(Ar.ARIA_VALUEMIN),
            this.setPrimaryBarProgress(1),
            this.setBufferBarProgress(1);
        }),
        (t.prototype.isDeterminate = function () {
          return this.determinate;
        }),
        (t.prototype.setProgress = function (e) {
          (this.progress = e),
            this.determinate &&
              (this.setPrimaryBarProgress(e),
              this.adapter.setAttribute(Ar.ARIA_VALUENOW, e.toString()));
        }),
        (t.prototype.getProgress = function () {
          return this.progress;
        }),
        (t.prototype.setBuffer = function (e) {
          (this.buffer = e), this.determinate && this.setBufferBarProgress(e);
        }),
        (t.prototype.getBuffer = function () {
          return this.buffer;
        }),
        (t.prototype.open = function () {
          this.adapter.removeClass(Er.CLOSED_CLASS),
            this.adapter.removeClass(Er.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(Ar.ARIA_HIDDEN);
        }),
        (t.prototype.close = function () {
          this.adapter.addClass(Er.CLOSED_CLASS),
            this.adapter.setAttribute(Ar.ARIA_HIDDEN, "true");
        }),
        (t.prototype.isClosed = function () {
          return this.adapter.hasClass(Er.CLOSED_CLASS);
        }),
        (t.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Er.CLOSED_CLASS) &&
            this.adapter.addClass(Er.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (t.prototype.restartAnimation = function () {
          this.adapter.removeClass(Er.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Er.ANIMATION_READY_CLASS);
        }),
        (t.prototype.setPrimaryBarProgress = function (e) {
          var t = "scaleX(" + e + ")",
            n =
              "undefined" != typeof window
                ? yr(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, t);
        }),
        (t.prototype.setBufferBarProgress = function (e) {
          var t = 100 * e + "%";
          this.adapter.setBufferBarStyle(Ar.FLEX_BASIS, t);
        }),
        (t.prototype.calculateAndSetDimensions = function (e) {
          var t = e * Cr,
            n = e * xr,
            i = e * _r,
            a = e * Sr,
            r = e * Tr;
          this.adapter.setStyle("--mdc-linear-progress-primary-half", t + "px"),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-half-neg",
              -t + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-full",
              n + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-primary-full-neg",
              -n + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-quarter",
              i + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-quarter-neg",
              -i + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half",
              a + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half-neg",
              -a + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full",
              r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full-neg",
              -r + "px"
            ),
            this.restartAnimation();
        }),
        t
      );
    })(Ce);
  function Lr(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      _,
      L,
      w,
      D,
      N,
      M = [
        {
          class: (y = Ge({
            [n[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": n[3],
            "mdc-linear-progress--closed": n[4],
            "mdc-data-table__linear-progress": "data-table" === n[14],
            ...n[8],
          })),
        },
        { style: (A = Object.entries(n[10]).map(Nr).concat([n[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (C = 0) },
        { "aria-valuemax": (_ = 1) },
        { "aria-valuenow": (L = n[3] ? void 0 : n[5]) },
        n[9],
        n[16],
      ],
      R = {};
    for (let e = 0; e < M.length; e += 1) R = t(R, M[e]);
    return {
      c() {
        (i = E("div")),
          (s = E("div")),
          (o = E("div")),
          (c = x()),
          (d = E("div")),
          (u = x()),
          (p = E("div")),
          (f = E("span")),
          (h = x()),
          (g = E("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          T(o, "class", "mdc-linear-progress__buffer-bar"),
          T(o, "style", (l = Object.entries(n[11]).map(wr).join(" "))),
          T(d, "class", "mdc-linear-progress__buffer-dots"),
          T(s, "class", "mdc-linear-progress__buffer"),
          T(f, "class", "mdc-linear-progress__bar-inner"),
          T(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          T(p, "style", (m = Object.entries(n[12]).map(Dr).join(" "))),
          T(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          O(i, R);
      },
      m(e, t) {
        v(e, i, t),
          I(i, s),
          I(s, o),
          I(s, c),
          I(s, d),
          I(i, u),
          I(i, p),
          I(p, f),
          I(i, h),
          I(i, g),
          n[19](i),
          D ||
            ((N = [
              $((w = Je.call(null, i, n[0]))),
              $(n[13].call(null, i)),
              S(i, "transitionend", n[20]),
            ]),
            (D = !0));
      },
      p(e, [t]) {
        2048 & t &&
          l !== (l = Object.entries(e[11]).map(wr).join(" ")) &&
          T(o, "style", l),
          4096 & t &&
            m !== (m = Object.entries(e[12]).map(Dr).join(" ")) &&
            T(p, "style", m),
          O(
            i,
            (R = ce(M, [
              282 & t &&
                y !==
                  (y = Ge({
                    [e[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": e[3],
                    "mdc-linear-progress--closed": e[4],
                    "mdc-data-table__linear-progress": "data-table" === e[14],
                    ...e[8],
                  })) && { class: y },
              1028 & t &&
                A !==
                  (A = Object.entries(e[10])
                    .map(Nr)
                    .concat([e[2]])
                    .join(" ")) && { style: A },
              { role: "progressbar" },
              { "aria-valuemin": 0 },
              { "aria-valuemax": 1 },
              40 & t &&
                L !== (L = e[3] ? void 0 : e[5]) && { "aria-valuenow": L },
              512 & t && e[9],
              65536 & t && e[16],
            ]))
          ),
          w && r(w.update) && 1 & t && w.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(i), n[19](null), (D = !1), a(N);
      },
    };
  }
  const wr = ([e, t]) => `${e}: ${t};`,
    Dr = ([e, t]) => `${e}: ${t};`,
    Nr = ([e, t]) => `${e}: ${t};`;
  function Mr(e, n, i) {
    const a = [
      "use",
      "class",
      "style",
      "indeterminate",
      "closed",
      "progress",
      "buffer",
      "getElement",
    ];
    let r,
      s = m(n, a);
    const l = Ye(F());
    let c,
      d,
      { use: u = [] } = n,
      { class: p = "" } = n,
      { style: h = "" } = n,
      { indeterminate: $ = !1 } = n,
      { closed: I = !1 } = n,
      { progress: v = 0 } = n,
      { buffer: b } = n,
      y = {},
      E = {},
      A = {},
      C = {},
      x = {},
      _ = B("SMUI:linear-progress:context"),
      S = B("SMUI:linear-progress:closed");
    function T(e) {
      return e in y ? y[e] : U().classList.contains(e);
    }
    function O(e) {
      y[e] || i(8, (y[e] = !0), y);
    }
    function L(e) {
      (e in y && !y[e]) || i(8, (y[e] = !1), y);
    }
    function w(e, t) {
      E[e] !== t && i(9, (E[e] = t), E);
    }
    function D(e) {
      (e in E && null == E[e]) || i(9, (E[e] = void 0), E);
    }
    function N(e, t) {
      A[e] != t &&
        ("" === t || null == t
          ? (delete A[e], i(10, A))
          : i(10, (A[e] = t), A));
    }
    function M(e, t) {
      C[e] != t &&
        ("" === t || null == t
          ? (delete C[e], i(11, C))
          : i(11, (C[e] = t), C));
    }
    function R(e, t) {
      x[e] != t &&
        ("" === t || null == t
          ? (delete x[e], i(12, x))
          : i(12, (x[e] = t), x));
    }
    function U() {
      return c;
    }
    o(e, S, (e) => i(21, (r = e))),
      k(
        () => (
          i(
            6,
            (d = new Or({
              addClass: O,
              forceLayout: () => {
                U().getBoundingClientRect();
              },
              setBufferBarStyle: M,
              setPrimaryBarStyle: R,
              hasClass: T,
              removeAttribute: D,
              removeClass: L,
              setAttribute: w,
              setStyle: N,
              attachResizeObserver: (e) => {
                const t = window.ResizeObserver;
                if (t) {
                  const n = new t(e);
                  return n.observe(U()), n;
                }
                return null;
              },
              getWidth: () => U().offsetWidth,
            }))
          ),
          d.init(),
          () => {
            d.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(16, (s = m(n, a))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (p = e.class)),
          "style" in e && i(2, (h = e.style)),
          "indeterminate" in e && i(3, ($ = e.indeterminate)),
          "closed" in e && i(4, (I = e.closed)),
          "progress" in e && i(5, (v = e.progress)),
          "buffer" in e && i(17, (b = e.buffer));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && S && g(S, (r = I), r),
          72 & e.$$.dirty &&
            d &&
            d.isDeterminate() !== !$ &&
            d.setDeterminate(!$),
          96 & e.$$.dirty && d && d.getProgress() !== v && d.setProgress(v),
          131136 & e.$$.dirty &&
            d &&
            (null == b ? d.setBuffer(1) : d.setBuffer(b)),
          80 & e.$$.dirty && d && (I ? d.close() : d.open());
      }),
      [
        u,
        p,
        h,
        $,
        I,
        v,
        d,
        c,
        y,
        E,
        A,
        C,
        x,
        l,
        _,
        S,
        s,
        b,
        U,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(7, c);
          });
        },
        () => d && d.handleTransitionEnd(),
      ]
    );
  }
  class Rr extends ge {
    constructor(e) {
      super(),
        he(this, e, Mr, Lr, s, {
          use: 0,
          class: 1,
          style: 2,
          indeterminate: 3,
          closed: 4,
          progress: 5,
          buffer: 17,
          getElement: 18,
        });
    }
    get getElement() {
      return this.$$.ctx[18];
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
   */ var Fr,
    kr,
    Ur = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Pr = {
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
    Hr = {
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
  })(Fr || (Fr = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(kr || (kr = {}));
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
  var Br,
    Vr = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.isSurfaceOpen = !1),
          (i.isQuickOpen = !1),
          (i.isHoistedElement = !1),
          (i.isFixedPosition = !1),
          (i.isHorizontallyCenteredOnViewport = !1),
          (i.maxHeight = 0),
          (i.openAnimationEndTimerId = 0),
          (i.closeAnimationEndTimerId = 0),
          (i.animationRequestId = 0),
          (i.anchorCorner = kr.TOP_START),
          (i.originCorner = kr.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ur;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Pr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Hr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return kr;
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
            i = e.OPEN;
          if (!this.adapter.hasClass(n))
            throw new Error(n + " class required in root element.");
          this.adapter.hasClass(i) && (this.isSurfaceOpen = !0);
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
          this.originCorner = this.originCorner ^ Fr.RIGHT;
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
                    }, Hr.TRANSITION_OPEN_DURATION));
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
                  }, Hr.TRANSITION_CLOSE_DURATION));
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
            i = this.getMenuSurfaceMaxHeight(n),
            a = this.hasBit(n, Fr.BOTTOM) ? "bottom" : "top",
            r = this.hasBit(n, Fr.RIGHT) ? "right" : "left",
            s = this.getHorizontalOriginOffset(n),
            o = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            d = l.surfaceSize,
            u = (((e = {})[r] = s), (e[a] = o), e);
          c.width / d.width > Hr.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (r = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(u),
            this.adapter.setTransformOrigin(r + " " + a),
            this.adapter.setPosition(u),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, Fr.BOTTOM) ||
              this.adapter.addClass(t.cssClasses.IS_OPEN_BELOW);
        }),
        (t.prototype.getAutoLayoutmeasurements = function () {
          var e = this.adapter.getAnchorDimensions(),
            t = this.adapter.getBodyDimensions(),
            n = this.adapter.getWindowDimensions(),
            i = this.adapter.getWindowScroll();
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
              windowScroll: i,
            }
          );
        }),
        (t.prototype.getoriginCorner = function () {
          var e,
            n,
            i = this.originCorner,
            a = this.measurements,
            r = a.viewportDistance,
            s = a.anchorSize,
            o = a.surfaceSize,
            l = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Fr.BOTTOM)
            ? ((e = r.top - l + this.anchorMargin.bottom),
              (n = r.bottom - l - this.anchorMargin.bottom))
            : ((e = r.top - l + this.anchorMargin.top),
              (n = r.bottom - l + s.height - this.anchorMargin.top)),
            !(n - o.height > 0) && e > n && (i = this.setBit(i, Fr.BOTTOM));
          var c,
            d,
            u = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Fr.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, Fr.RIGHT) ||
              this.hasBit(i, Fr.RIGHT),
            m = !1;
          (m = u && p ? !f : f)
            ? ((c = r.left + s.width + this.anchorMargin.right),
              (d = r.right - this.anchorMargin.right))
            : ((c = r.left + this.anchorMargin.left),
              (d = r.right + s.width - this.anchorMargin.left));
          var h = c - o.width > 0,
            g = d - o.width > 0,
            $ = this.hasBit(i, Fr.FLIP_RTL) && this.hasBit(i, Fr.RIGHT);
          return (
            (g && $ && u) || (!h && $)
              ? (i = this.unsetBit(i, Fr.RIGHT))
              : ((h && m && u) || (h && !m && f) || (!g && c >= d)) &&
                (i = this.setBit(i, Fr.RIGHT)),
            i
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            a = this.hasBit(e, Fr.BOTTOM),
            r = this.hasBit(this.anchorCorner, Fr.BOTTOM),
            s = t.numbers.MARGIN_TO_EDGE;
          return (
            a
              ? ((i = n.top + this.anchorMargin.top - s),
                r || (i += this.measurements.anchorSize.height))
              : ((i =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  s),
                r && (i -= this.measurements.anchorSize.height)),
            i
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Fr.RIGHT),
            i = this.hasBit(this.anchorCorner, Fr.RIGHT);
          if (n) {
            var a = i
              ? t.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? a -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : a;
          }
          return i ? t.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (t.prototype.getVerticalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Fr.BOTTOM),
            i = this.hasBit(this.anchorCorner, Fr.BOTTOM);
          return n
            ? i
              ? t.height - this.anchorMargin.top
              : -this.anchorMargin.bottom
            : i
            ? t.height + this.anchorMargin.bottom
            : this.anchorMargin.top;
        }),
        (t.prototype.adjustPositionForHoistedElement = function (e) {
          var t,
            n,
            i = this.measurements,
            a = i.windowScroll,
            r = i.viewportDistance,
            s = i.surfaceSize,
            o = i.viewportSize,
            l = Object.keys(e);
          try {
            for (var c = Ee(l), d = c.next(); !d.done; d = c.next()) {
              var u = d.value,
                p = e[u] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== u && "right" !== u)
                ? ((p += r[u]),
                  this.isFixedPosition ||
                    ("top" === u
                      ? (p += a.y)
                      : "bottom" === u
                      ? (p -= a.y)
                      : "left" === u
                      ? (p += a.x)
                      : (p -= a.x)),
                  (e[u] = p))
                : (e[u] = (o.width - s.width) / 2);
            }
          } catch (e) {
            t = { error: e };
          } finally {
            try {
              d && !d.done && (n = c.return) && n.call(c);
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
            }, Hr.TOUCH_EVENT_WAIT_MS);
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
    jr = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    zr = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    Gr = { FOCUS_ROOT_INDEX: -1 };
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
  })(Br || (Br = {}));
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
  var qr = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = Br.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return jr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return zr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Gr;
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
            var i =
              "true" ===
              this.adapter.getAttributeFromElementAtIndex(
                n,
                zr.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Vr.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case Br.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case Br.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case Br.NONE:
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
              zr.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              jr.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              jr.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              zr.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  ka.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  zr.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  ka.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  zr.ARIA_DISABLED_ATTR,
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
    Kr = {
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
    Wr = {
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
    Xr = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    Yr = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var a = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (a.disabled = !1),
          (a.isMenuOpen = !1),
          (a.useDefaultValidation = !0),
          (a.customValidity = !0),
          (a.lastSelectedIndex = Xr.UNSET_INDEX),
          (a.clickDebounceTimeout = 0),
          (a.recentlyClicked = !1),
          (a.leadingIcon = i.leadingIcon),
          (a.helperText = i.helperText),
          a
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Kr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Xr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Wr;
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
              (e === Xr.UNSET_INDEX
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
          return e !== Xr.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(Kr.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(Kr.DISABLED),
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
          this.adapter.addClass(Kr.ACTIVATED),
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
              t = this.adapter.hasClass(Kr.FOCUSED),
              n = e || t,
              i = this.adapter.hasClass(Kr.REQUIRED);
            this.notchOutline(n),
              this.adapter.floatLabel(n),
              this.adapter.setLabelRequired(i);
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
          this.adapter.removeClass(Kr.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(Kr.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(Kr.FOCUSED),
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
          if (!this.isMenuOpen && this.adapter.hasClass(Kr.FOCUSED)) {
            var t = qn(e) === gn,
              n = qn(e) === $n,
              i = qn(e) === An,
              a = qn(e) === xn;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var r = n ? " " : e.key,
                s = this.adapter.typeaheadMatchItem(r, this.getSelectedIndex());
              return (
                s >= 0 && this.setSelectedIndex(s), void e.preventDefault()
              );
            }
            (t || n || i || a) &&
              (i && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : a &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              e.preventDefault());
          }
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(Kr.FOCUSED);
            if (e) {
              var n = Xr.LABEL_SCALE,
                i = this.adapter.getLabelWidth() * n;
              this.adapter.notchOutline(i);
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
              ? (this.adapter.removeClass(Kr.INVALID),
                this.adapter.removeMenuClass(Kr.MENU_INVALID))
              : (this.adapter.addClass(Kr.INVALID),
                this.adapter.addMenuClass(Kr.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(Kr.REQUIRED) &&
            !this.adapter.hasClass(Kr.DISABLED)
            ? this.getSelectedIndex() !== Xr.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(Kr.REQUIRED)
            : this.adapter.removeClass(Kr.REQUIRED),
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
            this.adapter.setMenuAnchorCorner(kr.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(Kr.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(Kr.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(Kr.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(Kr.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(Wr.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(Wr.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, Xr.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Ce),
    Qr = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    Jr = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    Zr = (function (e) {
      function t(n) {
        return e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Jr;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Qr;
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
          return "true" !== this.adapter.getAttr(Qr.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(Jr.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(Jr.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(Jr.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                Jr.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(Jr.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              Jr.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(Qr.ROLE)
                  : this.adapter.setAttr(Qr.ROLE, "alert"))
              );
            this.adapter.removeAttr(Qr.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(Qr.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(Qr.ARIA_HIDDEN, "true");
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
   */ const { document: es } = le;
  function ts(e) {
    let n, i, s, o, c, f, m, h;
    const g = e[31].default,
      I = l(g, e, e[30], null);
    let y = [
        {
          class: (s = Ge({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (o = Object.entries(e[11]).map(ns).concat([e[3]]).join(" ")) },
        e[13],
      ],
      A = {};
    for (let e = 0; e < y.length; e += 1) A = t(A, y[e]);
    return {
      c() {
        (n = x()), (i = E("div")), I && I.c(), O(i, A);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I && I.m(i, null),
          e[33](i),
          (f = !0),
          m ||
            ((h = [
              S(es.body, "click", e[32], !0),
              $((c = Je.call(null, i, e[1]))),
              $(e[12].call(null, i)),
              S(i, "keydown", e[34]),
            ]),
            (m = !0));
      },
      p(e, t) {
        I &&
          I.p &&
          (!f || 1073741824 & t[0]) &&
          u(I, g, e, e[30], f ? d(g, e[30], t, null) : p(e[30]), null),
          O(
            i,
            (A = ce(y, [
              (!f ||
                (1204 & t[0] &&
                  s !==
                    (s = Ge({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: s },
              (!f ||
                (2056 & t[0] &&
                  o !==
                    (o = Object.entries(e[11])
                      .map(ns)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              8192 & t[0] && e[13],
            ]))
          ),
          c && r(c.update) && 2 & t[0] && c.update.call(null, e[1]);
      },
      i(e) {
        f || (se(I, e), (f = !0));
      },
      o(e) {
        oe(I, e), (f = !1);
      },
      d(t) {
        t && b(n), t && b(i), I && I.d(t), e[33](null), (m = !1), a(h);
      },
    };
  }
  const ns = ([e, t]) => `${e}: ${t};`;
  function is(e, n, i) {
    const a = [
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
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    var l, c, d;
    const u = Ye(F());
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { style: v = "" } = n,
      { static: b = !1 } = n,
      { anchor: y = !0 } = n,
      { fixed: E = !1 } = n,
      { open: A = b } = n,
      { managed: C = !1 } = n,
      { fullWidth: x = !1 } = n,
      { quickOpen: _ = !1 } = n,
      { anchorElement: S } = n,
      { anchorCorner: T } = n,
      { anchorMargin: O = { top: 0, right: 0, bottom: 0, left: 0 } } = n,
      { maxHeight: L = 0 } = n,
      { horizontallyCenteredOnViewport: w = !1 } = n,
      D = {},
      N = {};
    H("SMUI:list:role", "menu"), H("SMUI:list:item:role", "menuitem");
    const M = kr;
    function R(e) {
      return e in D ? D[e] : j().classList.contains(e);
    }
    function P(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function B(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function V(e) {
      h.close(e), i(0, (A = !1));
    }
    function j() {
      return p;
    }
    k(() => {
      i(
        9,
        (h = new Vr({
          addClass: P,
          removeClass: B,
          hasClass: R,
          hasAnchor: () => !!S,
          notifyClose: () => {
            C || i(0, (A = b)),
              A || qe(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            C || i(0, (A = b)),
              A || qe(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            C || i(0, (A = !0)),
              A && qe(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
          },
          isElementInContainer: (e) => p.contains(e),
          isRtl: () =>
            "rtl" === getComputedStyle(p).getPropertyValue("direction"),
          setTransformOrigin: (e) => {
            i(11, (N["transform-origin"] = e), N);
          },
          isFocused: () => document.activeElement === p,
          saveFocus: () => {
            var e;
            g =
              null !== (e = document.activeElement) && void 0 !== e
                ? e
                : void 0;
          },
          restoreFocus: () => {
            (!p || p.contains(document.activeElement)) &&
              g &&
              document.contains(g) &&
              "focus" in g &&
              g.focus();
          },
          getInnerDimensions: () => ({
            width: p.offsetWidth,
            height: p.offsetHeight,
          }),
          getAnchorDimensions: () => (S ? S.getBoundingClientRect() : null),
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
            i(11, (N.left = "left" in e ? `${e.left}px` : ""), N),
              i(11, (N.right = "right" in e ? `${e.right}px` : ""), N),
              i(11, (N.top = "top" in e ? `${e.top}px` : ""), N),
              i(11, (N.bottom = "bottom" in e ? `${e.bottom}px` : ""), N);
          },
          setMaxHeight: (e) => {
            i(11, (N["max-height"] = e), N);
          },
        }))
      );
      return (
        qe(p, "SMUIMenuSurface:mount", {
          get open() {
            return A;
          },
          set open(e) {
            i(0, (A = e));
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
      U(() => {
        var e;
        y &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(13, (r = m(n, a))),
          "use" in e && i(1, ($ = e.use)),
          "class" in e && i(2, (I = e.class)),
          "style" in e && i(3, (v = e.style)),
          "static" in e && i(4, (b = e.static)),
          "anchor" in e && i(15, (y = e.anchor)),
          "fixed" in e && i(5, (E = e.fixed)),
          "open" in e && i(0, (A = e.open)),
          "managed" in e && i(6, (C = e.managed)),
          "fullWidth" in e && i(7, (x = e.fullWidth)),
          "quickOpen" in e && i(16, (_ = e.quickOpen)),
          "anchorElement" in e && i(14, (S = e.anchorElement)),
          "anchorCorner" in e && i(17, (T = e.anchorCorner)),
          "anchorMargin" in e && i(18, (O = e.anchorMargin)),
          "maxHeight" in e && i(19, (L = e.maxHeight)),
          "horizontallyCenteredOnViewport" in e &&
            i(20, (w = e.horizontallyCenteredOnViewport)),
          "$$scope" in e && i(30, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        939557120 & e.$$.dirty[0] &&
          p &&
          y &&
          !(null === i(27, (l = p.parentElement)) || void 0 === l
            ? void 0
            : l.classList.contains("mdc-menu-surface--anchor")) &&
          (null === i(28, (c = p.parentElement)) ||
            void 0 === c ||
            c.classList.add("mdc-menu-surface--anchor"),
          i(
            14,
            (S =
              null !== i(29, (d = p.parentElement)) && void 0 !== d
                ? d
                : void 0)
          )),
          513 & e.$$.dirty[0] &&
            h &&
            h.isOpen() !== A &&
            (A ? h.open() : h.close()),
          66048 & e.$$.dirty[0] && h && h.setQuickOpen(_),
          544 & e.$$.dirty[0] && h && h.setFixedPosition(E),
          524800 & e.$$.dirty[0] && h && h.setMaxHeight(L),
          1049088 & e.$$.dirty[0] &&
            h &&
            h.setIsHorizontallyCenteredOnViewport(w),
          131584 & e.$$.dirty[0] &&
            h &&
            null != T &&
            ("string" == typeof T
              ? h.setAnchorCorner(M[T])
              : h.setAnchorCorner(T)),
          262656 & e.$$.dirty[0] && h && h.setAnchorMargin(O);
      }),
      [
        A,
        $,
        I,
        v,
        b,
        E,
        C,
        x,
        p,
        h,
        D,
        N,
        u,
        r,
        S,
        y,
        _,
        T,
        O,
        L,
        w,
        function () {
          return A;
        },
        function (e) {
          i(0, (A = e));
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
        l,
        c,
        d,
        o,
        s,
        (e) => h && A && !C && h.handleBodyClick(e),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(8, p);
          });
        },
        (e) => h && h.handleKeydown(e),
      ]
    );
  }
  class as extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          is,
          ts,
          s,
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
  function rs(
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
  function ss(e) {
    let t;
    const n = e[16].default,
      i = l(n, e, e[21], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 2097152 & a) &&
          u(i, n, e, e[21], t ? d(n, e[21], a, null) : p(e[21]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function os(e) {
    let n, i, a;
    const r = [
      { use: e[5] },
      { class: Ge({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function s(t) {
      e[18](t);
    }
    let o = { $$slots: { default: [ss] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) o = t(o, r[e]);
    return (
      void 0 !== e[0] && (o.open = e[0]),
      (n = new as({ props: o })),
      e[17](n),
      z.push(() => ue(n, "open", s)),
      n.$on("SMUIMenuSurface:mount", e[7]),
      n.$on("SMUIList:mount", e[8]),
      n.$on("SMUIMenuSurface:opened", e[19]),
      n.$on("keydown", e[6]),
      n.$on("SMUIList:action", e[20]),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            546 & t
              ? ce(r, [
                  32 & t && { use: e[5] },
                  2 & t && { class: Ge({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & t && de(e[9]),
                ])
              : {};
          2097152 & t && (a.$$scope = { dirty: t, ctx: e }),
            !i && 1 & t && ((i = !0), (a.open = e[0]), Q(() => (i = !1))),
            n.$set(a);
        },
        i(e) {
          a || (se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[17](null), me(n, t);
        },
      }
    );
  }
  function ls(e, n, i) {
    let a;
    const r = [
      "use",
      "class",
      "open",
      "isOpen",
      "setOpen",
      "setDefaultFocusState",
      "getSelectedIndex",
      "getElement",
    ];
    let s = m(n, r),
      { $$slots: o = {}, $$scope: l } = n;
    const { closest: c } = Te,
      d = Ye(F());
    let u,
      p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { open: v = !1 } = n;
    function b() {
      return u.getElement();
    }
    k(
      () => (
        i(
          3,
          (p = new qr({
            addClassToElementAtIndex: (e, t) => {
              g.addClassForElementIndex(e, t);
            },
            removeClassFromElementAtIndex: (e, t) => {
              g.removeClassForElementIndex(e, t);
            },
            addAttributeToElementAtIndex: (e, t, n) => {
              g.setAttributeForElementIndex(e, t, n);
            },
            removeAttributeFromElementAtIndex: (e, t) => {
              g.removeAttributeForElementIndex(e, t);
            },
            getAttributeFromElementAtIndex: (e, t) =>
              g.getAttributeFromElementIndex(e, t),
            elementContainsClass: (e, t) => e.classList.contains(t),
            closeSurface: (e) => h.closeProgrammatic(e),
            getElementIndex: (e) =>
              g
                .getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              qe(
                b(),
                "SMUIMenu:selected",
                { index: e.index, item: g.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => g.items.length,
            focusItemAtIndex: (e) => g.focusItemAtIndex(e),
            focusListRoot: () => "focus" in g.element && g.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!c(g.getOrderedList()[e].element, `.${jr.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = g.getOrderedList(),
                n = c(t[e].element, `.${jr.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${jr.MENU_SELECTED_LIST_ITEM}`);
              return i ? t.map((e) => e.element).indexOf(i) : -1;
            },
          }))
        ),
        qe(b(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(9, (s = m(n, r))),
          "use" in e && i(10, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "open" in e && i(0, (v = e.open)),
          "$$scope" in e && i(21, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && i(5, (a = [d, ...$]));
      }),
      [
        v,
        I,
        u,
        p,
        g,
        a,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          h || (h = e.detail);
        },
        function (e) {
          g || i(4, (g = e.detail));
        },
        s,
        $,
        function () {
          return v;
        },
        function (e) {
          i(0, (v = e));
        },
        function (e) {
          p.setDefaultFocusState(e);
        },
        function () {
          return p.getSelectedIndex();
        },
        b,
        o,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(2, u);
          });
        },
        function (e) {
          (v = e), i(0, v);
        },
        () => p && p.handleMenuSurfaceOpened(),
        (e) =>
          p && p.handleItemAction(g.getOrderedList()[e.detail.index].element),
        l,
      ]
    );
  }
  class cs extends ge {
    constructor(e) {
      super(),
        he(this, e, ls, os, s, {
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
  function ds(t) {
    let n;
    return {
      c() {
        n = C(t[8]);
      },
      m(e, t) {
        v(e, n, t);
      },
      p(e, t) {
        256 & t && L(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function us(e) {
    let t;
    const n = e[13].default,
      i = l(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 4096 & a) &&
          u(i, n, e, e[12], t ? d(n, e[12], a, null) : p(e[12]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ps(e) {
    let n, i, s, o, l, c, d, u, p;
    const f = [us, ds],
      m = [];
    function h(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (i = h(e)), (s = m[i] = f[i](e));
    let g = [
        {
          class: (o = Ge({
            [e[1]]: !0,
            "mdc-select-helper-text": !0,
            "mdc-select-helper-text--validation-msg": e[4],
            "mdc-select-helper-text--validation-msg-persistent": e[3],
            ...e[6],
          })),
        },
        { "aria-hidden": (l = e[3] ? void 0 : "true") },
        { id: e[2] },
        e[7],
        e[10],
      ],
      I = {};
    for (let e = 0; e < g.length; e += 1) I = t(I, g[e]);
    return {
      c() {
        (n = E("div")), s.c(), O(n, I);
      },
      m(t, a) {
        v(t, n, a),
          m[i].m(n, null),
          e[14](n),
          (d = !0),
          u ||
            ((p = [$((c = Je.call(null, n, e[0]))), $(e[9].call(null, n))]),
            (u = !0));
      },
      p(e, [t]) {
        let a = i;
        (i = h(e)),
          i === a
            ? m[i].p(e, t)
            : (ae(),
              oe(m[a], 1, 1, () => {
                m[a] = null;
              }),
              re(),
              (s = m[i]),
              s ? s.p(e, t) : ((s = m[i] = f[i](e)), s.c()),
              se(s, 1),
              s.m(n, null)),
          O(
            n,
            (I = ce(g, [
              (!d ||
                (90 & t &&
                  o !==
                    (o = Ge({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: o },
              (!d || (8 & t && l !== (l = e[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!d || 4 & t) && { id: e[2] },
              128 & t && e[7],
              1024 & t && e[10],
            ]))
          ),
          c && r(c.update) && 1 & t && c.update.call(null, e[0]);
      },
      i(e) {
        d || (se(s), (d = !0));
      },
      o(e) {
        oe(s), (d = !1);
      },
      d(t) {
        t && b(n), m[i].d(), e[14](null), (u = !1), a(p);
      },
    };
  }
  ft({ class: "mdc-menu__selection-group-icon", component: dr });
  let fs = 0;
  function ms(e, n, i) {
    const a = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      d,
      u,
      { use: p = [] } = n,
      { class: h = "" } = n,
      { id: g = "SMUI-select-helper-text-" + fs++ } = n,
      { persistent: $ = !1 } = n,
      { validationMsg: I = !1 } = n,
      v = {},
      b = {};
    function y(e) {
      return e in v ? v[e] : S().classList.contains(e);
    }
    function E(e) {
      v[e] || i(6, (v[e] = !0), v);
    }
    function A(e) {
      (e in v && !v[e]) || i(6, (v[e] = !1), v);
    }
    function C(e) {
      var t;
      return e in b
        ? null !== (t = b[e]) && void 0 !== t
          ? t
          : null
        : S().getAttribute(e);
    }
    function x(e, t) {
      b[e] !== t && i(7, (b[e] = t), b);
    }
    function _(e) {
      (e in b && null == b[e]) || i(7, (b[e] = void 0), b);
    }
    function S() {
      return c;
    }
    return (
      k(
        () => (
          (d = new Zr({
            addClass: E,
            removeClass: A,
            hasClass: y,
            getAttr: C,
            setAttr: x,
            removeAttr: _,
            setContent: (e) => {
              i(8, (u = e));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            qe(S(), "SMUISelectHelperText:id", g),
          qe(S(), "SMUISelectHelperText:mount", d),
          d.init(),
          () => {
            qe(S(), "SMUISelectHelperText:unmount", d), d.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (h = e.class)),
          "id" in e && i(2, (g = e.id)),
          "persistent" in e && i(3, ($ = e.persistent)),
          "validationMsg" in e && i(4, (I = e.validationMsg)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        p,
        h,
        g,
        $,
        I,
        c,
        v,
        b,
        u,
        l,
        r,
        S,
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
      ]
    );
  }
  class hs extends ge {
    constructor(e) {
      super(),
        he(this, e, ms, ps, s, {
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
  const gs = (e) => ({}),
    $s = (e) => ({}),
    Is = (e) => ({}),
    vs = (e) => ({}),
    bs = (e) => ({}),
    ys = (e) => ({}),
    Es = (e) => ({}),
    As = (e) => ({});
  function Cs(e) {
    let n,
      i = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        Qe(e[53], "input$"),
      ],
      a = {};
    for (let e = 0; e < i.length; e += 1) a = t(a, i[e]);
    return {
      c() {
        (n = E("input")), O(n, a);
      },
      m(e, t) {
        v(e, n, t), n.autofocus && n.focus();
      },
      p(e, t) {
        O(
          n,
          (a = ce(i, [
            { type: "hidden" },
            1024 & t[0] && { required: e[10] },
            64 & t[0] && { disabled: e[6] },
            1 & t[0] && { value: e[0] },
            4194304 & t[1] && Qe(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && b(n);
      },
    };
  }
  function xs(e) {
    let t;
    return {
      c() {
        (t = E("span")), T(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function _s(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Qe(e[53], "label$"),
    ];
    let r = { $$slots: { default: [Ss] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new ci({ props: r })),
      e[66](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? ce(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && de(Qe(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[66](null), me(n, t);
        },
      }
    );
  }
  function Ss(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      r = l(a, e, e[89], As);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            u(r, a, e, e[89], n ? d(a, e[89], s, Es) : p(e[89]), As);
      },
      i(e) {
        n || (se(r, e), (n = !0));
      },
      o(e) {
        oe(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function Ts(e) {
    let n, i;
    const a = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      Qe(e[53], "outline$"),
    ];
    let r = { $$slots: { default: [ws] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new Ii({ props: r })),
      e[68](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (768 & t[0]) | (6291456 & t[1])
              ? ce(a, [
                  (768 & t[0]) | (2097152 & t[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & t[1] && de(Qe(e[53], "outline$")),
                ])
              : {};
          (3840 & t[0]) | (6296064 & t[1]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[68](null), me(n, t);
        },
      }
    );
  }
  function Os(e) {
    let n, i;
    const a = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      Qe(e[53], "label$"),
    ];
    let r = { $$slots: { default: [Ls] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new ci({ props: r })),
      e[67](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i =
            (3072 & t[0]) | (4198400 & t[1])
              ? ce(a, [
                  2048 & t[0] && { id: e[11] + "-smui-label" },
                  4096 & t[1] && { floatAbove: "" !== e[43] },
                  1024 & t[0] && { required: e[10] },
                  4194304 & t[1] && de(Qe(e[53], "label$")),
                ])
              : {};
          (512 & t[0]) | (134217728 & t[2]) &&
            (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[67](null), me(n, t);
        },
      }
    );
  }
  function Ls(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const a = e[63].label,
      r = l(a, e, e[89], ys);
    return {
      c() {
        (t = C(i)), r && r.c();
      },
      m(e, i) {
        v(e, t, i), r && r.m(e, i), (n = !0);
      },
      p(e, s) {
        (!n || 512 & s[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          L(t, i),
          r &&
            r.p &&
            (!n || 134217728 & s[2]) &&
            u(r, a, e, e[89], n ? d(a, e[89], s, bs) : p(e[89]), ys);
      },
      i(e) {
        n || (se(r, e), (n = !0));
      },
      o(e) {
        oe(r, e), (n = !1);
      },
      d(e) {
        e && b(t), r && r.d(e);
      },
    };
  }
  function ws(e) {
    let t,
      n,
      i = !e[8] && (null != e[9] || e[52].label) && Os(e);
    return {
      c() {
        i && i.c(), (t = _());
      },
      m(e, a) {
        i && i.m(e, a), v(e, t, a), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? i &&
            (ae(),
            oe(i, 1, 1, () => {
              i = null;
            }),
            re())
          : i
          ? (i.p(e, n), (768 & n[0]) | (2097152 & n[1]) && se(i, 1))
          : ((i = Os(e)), i.c(), se(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (se(i), (n = !0));
      },
      o(e) {
        oe(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && b(t);
      },
    };
  }
  function Ds(e) {
    let n, i;
    const a = [Qe(e[53], "ripple$")];
    let r = {};
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new fi({ props: r })),
      e[70](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? ce(a, [de(Qe(e[53], "ripple$"))]) : {};
          n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[70](null), me(n, t);
        },
      }
    );
  }
  function Ns(e) {
    let t;
    const n = e[63].default,
      i = l(n, e, e[89], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 134217728 & a[2]) &&
          u(i, n, e, e[89], t ? d(n, e[89], a, null) : p(e[89]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ms(e) {
    let n, i, a;
    const r = [{ role: "listbox" }, { wrapFocus: e[36] }, Qe(e[53], "list$")];
    function s(t) {
      e[76](t);
    }
    let o = { $$slots: { default: [Ns] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) o = t(o, r[e]);
    return (
      void 0 !== e[24] && (o.selectedIndex = e[24]),
      (n = new Qa({ props: o })),
      z.push(() => ue(n, "selectedIndex", s)),
      n.$on("SMUIList:mount", e[77]),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (a = !0);
        },
        p(e, t) {
          const a =
            4194336 & t[1]
              ? ce(r, [
                  r[0],
                  32 & t[1] && { wrapFocus: e[36] },
                  4194304 & t[1] && de(Qe(e[53], "list$")),
                ])
              : {};
          134217728 & t[2] && (a.$$scope = { dirty: t, ctx: e }),
            !i &&
              16777216 & t[0] &&
              ((i = !0), (a.selectedIndex = e[24]), Q(() => (i = !1))),
            n.$set(a);
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
  function Rs(e) {
    let n, i;
    const a = [Qe(e[53], "helperText$")];
    let r = { $$slots: { default: [Fs] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new hs({ props: r })),
      n.$on("SMUISelectHelperText:id", e[86]),
      n.$on("SMUISelectHelperText:mount", e[87]),
      n.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, t) {
          const i = 4194304 & t[1] ? ce(a, [de(Qe(e[53], "helperText$"))]) : {};
          134217728 & t[2] && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
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
  function Fs(e) {
    let t;
    const n = e[63].helperText,
      i = l(n, e, e[89], $s);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 134217728 & a[2]) &&
          u(i, n, e, e[89], t ? d(n, e[89], a, gs) : p(e[89]), $s);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function ks(e) {
    let n,
      i,
      s,
      o,
      c,
      f,
      m,
      h,
      g,
      y,
      w,
      D,
      N,
      M,
      R,
      F,
      k,
      U,
      P,
      H,
      B,
      V,
      j,
      G,
      q,
      K,
      W,
      X,
      Y,
      J,
      Z,
      ee,
      te,
      ne,
      ie,
      le,
      he,
      ge,
      $e,
      Ie,
      ve = e[12] && Cs(e),
      be = "filled" === e[7] && xs(),
      ye =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && _s(e),
      Ee = "outlined" === e[7] && Ts(e);
    const Ae = e[63].leadingIcon,
      Ce = l(Ae, e, e[89], vs);
    let xe = [
        { id: (w = e[11] + "-smui-selected-text") },
        { class: (D = Ge({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (N = e[11] + "-smui-label") },
        Qe(e[53], "selectedText$"),
      ],
      _e = {};
    for (let e = 0; e < xe.length; e += 1) _e = t(_e, xe[e]);
    let Se = [
        {
          class: (R = Ge({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        Qe(e[53], "selectedTextContainer$"),
      ],
      Te = {};
    for (let e = 0; e < Se.length; e += 1) Te = t(Te, Se[e]);
    let Oe = [
        { class: (V = Ge({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        Qe(e[53], "dropdownIcon$"),
      ],
      Le = {};
    for (let e = 0; e < Oe.length; e += 1) Le = t(Le, Oe[e]);
    let we = "outlined" !== e[7] && e[5] && Ds(e),
      De = [
        { class: (q = Ge({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (K = e[10] ? "true" : void 0) },
        { "aria-disabled": (W = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        Qe(e[53], "anchor$"),
      ],
      Ne = {};
    for (let e = 0; e < De.length; e += 1) Ne = t(Ne, De[e]);
    const Me = [
      { class: Ge({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      Qe(e[53], "menu$"),
    ];
    function Re(t) {
      e[78](t);
    }
    let Fe = { $$slots: { default: [Ms] }, $$scope: { ctx: e } };
    for (let e = 0; e < Me.length; e += 1) Fe = t(Fe, Me[e]);
    void 0 !== e[32] && (Fe.open = e[32]),
      (J = new cs({ props: Fe })),
      z.push(() => ue(J, "open", Re)),
      J.$on("SMUIMenu:selected", e[79]),
      J.$on("SMUIMenuSurface:closing", e[80]),
      J.$on("SMUIMenuSurface:closed", e[81]),
      J.$on("SMUIMenuSurface:opened", e[82]);
    let ke = [
        {
          class: (ee = Ge({
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
          style: (te = Object.entries(e[27]).map(Ps).concat([e[4]]).join(" ")),
        },
        Ke(e[53], [
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
      Ue = {};
    for (let e = 0; e < ke.length; e += 1) Ue = t(Ue, ke[e]);
    let Pe = e[52].helperText && Rs(e);
    return {
      c() {
        (n = E("div")),
          ve && ve.c(),
          (i = x()),
          (s = E("div")),
          be && be.c(),
          (o = x()),
          ye && ye.c(),
          (c = x()),
          Ee && Ee.c(),
          (f = x()),
          Ce && Ce.c(),
          (m = x()),
          (h = E("span")),
          (g = E("span")),
          (y = C(e[43])),
          (k = x()),
          (U = E("span")),
          (P = A("svg")),
          (H = A("polygon")),
          (B = A("polygon")),
          (G = x()),
          we && we.c(),
          (Y = x()),
          pe(J.$$.fragment),
          (le = x()),
          Pe && Pe.c(),
          (he = _()),
          O(g, _e),
          O(h, Te),
          T(H, "class", "mdc-select__dropdown-icon-inactive"),
          T(H, "stroke", "none"),
          T(H, "fill-rule", "evenodd"),
          T(H, "points", "7 10 12 15 17 10"),
          T(B, "class", "mdc-select__dropdown-icon-active"),
          T(B, "stroke", "none"),
          T(B, "fill-rule", "evenodd"),
          T(B, "points", "7 15 12 10 17 15"),
          T(P, "class", "mdc-select__dropdown-icon-graphic"),
          T(P, "viewBox", "7 10 10 5"),
          T(P, "focusable", "false"),
          O(U, Le),
          O(s, Ne),
          O(n, Ue);
      },
      m(t, a) {
        v(t, n, a),
          ve && ve.m(n, null),
          I(n, i),
          I(n, s),
          be && be.m(s, null),
          I(s, o),
          ye && ye.m(s, null),
          I(s, c),
          Ee && Ee.m(s, null),
          I(s, f),
          Ce && Ce.m(s, null),
          I(s, m),
          I(s, h),
          I(h, g),
          I(g, y),
          e[69](g),
          I(s, k),
          I(s, U),
          I(U, P),
          I(P, H),
          I(P, B),
          I(s, G),
          we && we.m(s, null),
          e[71](s),
          I(n, Y),
          fe(J, n, null),
          e[83](n),
          v(t, le, a),
          Pe && Pe.m(t, a),
          v(t, he, a),
          (ge = !0),
          $e ||
            ((Ie = [
              $((M = Je.call(null, g, e[18]))),
              $((F = Je.call(null, h, e[16]))),
              $((j = Je.call(null, U, e[20]))),
              $((X = Je.call(null, s, e[14]))),
              S(s, "focus", e[72]),
              S(s, "blur", e[73]),
              S(s, "click", e[74]),
              S(s, "keydown", e[75]),
              S(s, "focus", e[64]),
              S(s, "blur", e[65]),
              $(
                (ne = ni.call(null, n, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              $(rs.call(null, n, { addClass: e[49], removeClass: e[50] })),
              $((ie = Je.call(null, n, e[2]))),
              $(e[44].call(null, n)),
              S(n, "SMUISelectLeadingIcon:mount", e[84]),
              S(n, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            ($e = !0));
      },
      p(e, t) {
        e[12]
          ? ve
            ? ve.p(e, t)
            : ((ve = Cs(e)), ve.c(), ve.m(n, i))
          : ve && (ve.d(1), (ve = null)),
          "filled" === e[7]
            ? be || ((be = xs()), be.c(), be.m(s, o))
            : be && (be.d(1), (be = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? ye &&
              (ae(),
              oe(ye, 1, 1, () => {
                ye = null;
              }),
              re())
            : ye
            ? (ye.p(e, t), (896 & t[0]) | (2097152 & t[1]) && se(ye, 1))
            : ((ye = _s(e)), ye.c(), se(ye, 1), ye.m(s, c)),
          "outlined" === e[7]
            ? Ee
              ? (Ee.p(e, t), 128 & t[0] && se(Ee, 1))
              : ((Ee = Ts(e)), Ee.c(), se(Ee, 1), Ee.m(s, f))
            : Ee &&
              (ae(),
              oe(Ee, 1, 1, () => {
                Ee = null;
              }),
              re()),
          Ce &&
            Ce.p &&
            (!ge || 134217728 & t[2]) &&
            u(Ce, Ae, e, e[89], ge ? d(Ae, e[89], t, Is) : p(e[89]), vs),
          (!ge || 4096 & t[1]) && L(y, e[43]),
          O(
            g,
            (_e = ce(xe, [
              (!ge ||
                (2048 & t[0] && w !== (w = e[11] + "-smui-selected-text"))) && {
                id: w,
              },
              (!ge ||
                (524288 & t[0] &&
                  D !==
                    (D = Ge({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: D },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!ge || (2048 & t[0] && N !== (N = e[11] + "-smui-label"))) && {
                "aria-labelledby": N,
              },
              4194304 & t[1] && Qe(e[53], "selectedText$"),
            ]))
          ),
          M && r(M.update) && 262144 & t[0] && M.update.call(null, e[18]),
          O(
            h,
            (Te = ce(Se, [
              (!ge ||
                (131072 & t[0] &&
                  R !==
                    (R = Ge({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: R },
              4194304 & t[1] && Qe(e[53], "selectedTextContainer$"),
            ]))
          ),
          F && r(F.update) && 65536 & t[0] && F.update.call(null, e[16]),
          O(
            U,
            (Le = ce(Oe, [
              (!ge ||
                (2097152 & t[0] &&
                  V !==
                    (V = Ge({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & t[1] && Qe(e[53], "dropdownIcon$"),
            ]))
          ),
          j && r(j.update) && 1048576 & t[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? we
              ? (we.p(e, t), 160 & t[0] && se(we, 1))
              : ((we = Ds(e)), we.c(), se(we, 1), we.m(s, null))
            : we &&
              (ae(),
              oe(we, 1, 1, () => {
                we = null;
              }),
              re()),
          O(
            s,
            (Ne = ce(De, [
              (!ge ||
                (32768 & t[0] &&
                  q !==
                    (q = Ge({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: q,
              },
              (!ge || (1024 & t[0] && K !== (K = e[10] ? "true" : void 0))) && {
                "aria-required": K,
              },
              (!ge || (64 & t[0] && W !== (W = e[6] ? "true" : void 0))) && {
                "aria-disabled": W,
              },
              (!ge || 1 & t[1]) && { "aria-controls": e[31] },
              (!ge || 1 & t[1]) && { "aria-describedby": e[31] },
              536870912 & t[0] && e[29],
              4194304 & t[1] && Qe(e[53], "anchor$"),
            ]))
          ),
          X && r(X.update) && 16384 & t[0] && X.update.call(null, e[14]);
        const a =
          (4194304 & t[0]) | (4194332 & t[1])
            ? ce(Me, [
                (4194304 & t[0]) | (4 & t[1]) && {
                  class: Ge({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Me[1],
                Me[2],
                8 & t[1] && { anchorElement: e[34] },
                16 & t[1] && { anchorCorner: e[35] },
                4194304 & t[1] && de(Qe(e[53], "menu$")),
              ])
            : {};
        (16777216 & t[0]) | (4194400 & t[1]) | (134217728 & t[2]) &&
          (a.$$scope = { dirty: t, ctx: e }),
          !Z && 2 & t[1] && ((Z = !0), (a.open = e[32]), Q(() => (Z = !1))),
          J.$set(a),
          O(
            n,
            (Ue = ce(ke, [
              (!ge ||
                ((67119050 & t[0]) | (2097154 & t[1]) &&
                  ee !==
                    (ee = Ge({
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
              (!ge ||
                (134217744 & t[0] &&
                  te !==
                    (te = Object.entries(e[27])
                      .map(Ps)
                      .concat([e[4]])
                      .join(" ")))) && { style: te },
              4194304 & t[1] &&
                Ke(e[53], [
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
            r(ne.update) &&
            128 & t[0] &&
            ne.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          ie && r(ie.update) && 4 & t[0] && ie.update.call(null, e[2]),
          e[52].helperText
            ? Pe
              ? (Pe.p(e, t), 2097152 & t[1] && se(Pe, 1))
              : ((Pe = Rs(e)), Pe.c(), se(Pe, 1), Pe.m(he.parentNode, he))
            : Pe &&
              (ae(),
              oe(Pe, 1, 1, () => {
                Pe = null;
              }),
              re());
      },
      i(e) {
        ge ||
          (se(ye),
          se(Ee),
          se(Ce, e),
          se(we),
          se(J.$$.fragment, e),
          se(Pe),
          (ge = !0));
      },
      o(e) {
        oe(ye),
          oe(Ee),
          oe(Ce, e),
          oe(we),
          oe(J.$$.fragment, e),
          oe(Pe),
          (ge = !1);
      },
      d(t) {
        t && b(n),
          ve && ve.d(),
          be && be.d(),
          ye && ye.d(),
          Ee && Ee.d(),
          Ce && Ce.d(t),
          e[69](null),
          we && we.d(),
          e[71](null),
          me(J),
          e[83](null),
          t && b(le),
          Pe && Pe.d(t),
          t && b(he),
          ($e = !1),
          a(Ie);
      },
    };
  }
  let Us = 0;
  const Ps = ([e, t]) => `${e}: ${t};`;
  function Hs(e, n, i) {
    const a = [
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
    let r,
      s,
      l = m(n, a),
      { $$slots: c = {}, $$scope: d } = n;
    const u = h(c),
      p = Ye(F());
    let $ = () => {};
    function I(e) {
      return e === $;
    }
    let { use: v = [] } = n,
      { class: b = "" } = n,
      { style: y = "" } = n,
      { ripple: E = !0 } = n,
      { disabled: A = !1 } = n,
      { variant: C = "standard" } = n,
      { noLabel: x = !1 } = n,
      { label: _ } = n,
      { value: S = "" } = n,
      { key: T = (e) => e } = n,
      { dirty: O = !1 } = n,
      { invalid: L = $ } = n,
      { updateInvalid: w = I(L) } = n;
    const D = I(L);
    I(L) && (L = !1);
    let N,
      M,
      R,
      P,
      j,
      G,
      q,
      K,
      W,
      X,
      Y,
      Q,
      J,
      Z,
      { required: ee = !1 } = n,
      { inputId: te = "SMUI-select-" + Us++ } = n,
      { hiddenInput: ne = !1 } = n,
      { withLeadingIcon: ie = $ } = n,
      { anchor$use: ae = [] } = n,
      { anchor$class: re = "" } = n,
      { selectedTextContainer$use: se = [] } = n,
      { selectedTextContainer$class: oe = "" } = n,
      { selectedText$use: le = [] } = n,
      { selectedText$class: ce = "" } = n,
      { dropdownIcon$use: de = [] } = n,
      { dropdownIcon$class: ue = "" } = n,
      { menu$class: pe = "" } = n,
      fe = {},
      me = {},
      he = {},
      ge = -1,
      $e = B("SMUI:addLayoutListener"),
      Ie = !1,
      ve = {},
      be = !1,
      ye = B("SMUI:select:context");
    H("SMUI:list:role", ""), H("SMUI:list:nav", !1);
    const Ee = ze("");
    o(e, Ee, (e) => i(43, (r = e))), H("SMUI:select:selectedText", Ee);
    const Ae = ze(S);
    o(e, Ae, (e) => i(91, (s = e))), H("SMUI:select:value", Ae);
    let Ce = ge;
    function xe(e) {
      return e in fe ? fe[e] : Fe().classList.contains(e);
    }
    function _e(e) {
      fe[e] || i(26, (fe[e] = !0), fe);
    }
    function Se(e) {
      (e in fe && !fe[e]) || i(26, (fe[e] = !1), fe);
    }
    function Te(e) {
      ve[e] || i(33, (ve[e] = !0), ve);
    }
    function Oe(e) {
      (e in ve && !ve[e]) || i(33, (ve[e] = !1), ve);
    }
    function Le(e) {
      var t;
      return e in he
        ? null !== (t = he[e]) && void 0 !== t
          ? t
          : null
        : Fe().getAttribute(e);
    }
    function we(e, t) {
      he[e] !== t && i(29, (he[e] = t), he);
    }
    function De(e) {
      (e in he && null == he[e]) || i(29, (he[e] = void 0), he);
    }
    function Ne() {
      return W.getOrderedList().map((e) => e.getValue());
    }
    function Me(e) {
      M.setUseDefaultValidation(e);
    }
    function Re() {
      M.layout();
    }
    function Fe() {
      return N;
    }
    $e && (G = $e(Re)),
      k(
        () => (
          i(
            23,
            (M = new Yr(
              {
                setSelectedText: (e) => {
                  g(Ee, (r = e), r);
                },
                isSelectAnchorFocused: () => document.activeElement === R,
                getSelectAnchorAttr: Le,
                setSelectAnchorAttr: we,
                removeSelectAnchorAttr: De,
                addMenuClass: Te,
                removeMenuClass: Oe,
                openMenu: () => {
                  i(32, (Ie = !0));
                },
                closeMenu: () => {
                  i(32, (Ie = !1));
                },
                getAnchorElement: () => R,
                setMenuAnchorElement: (e) => {
                  i(34, (q = e));
                },
                setMenuAnchorCorner: (e) => {
                  i(35, (K = e));
                },
                setMenuWrapFocus: (e) => {
                  i(36, (be = e));
                },
                getSelectedIndex: () => ge,
                setSelectedIndex: (e) => {
                  i(62, (Ce = e)), i(24, (ge = e)), i(0, (S = Ne()[ge]));
                },
                focusMenuItemAtIndex: (e) => {
                  W.focusItemAtIndex(e);
                },
                getMenuItemCount: () => W.items.length,
                getMenuItemValues: () => Ne().map(T),
                getMenuItemTextAtIndex: (e) => W.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => W.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => W.typeaheadMatchItem(e, t),
                addClass: _e,
                removeClass: Se,
                hasClass: xe,
                setRippleCenter: (e) => J && J.setRippleCenter(e),
                activateBottomLine: () => J && J.activate(),
                deactivateBottomLine: () => J && J.deactivate(),
                notifyChange: (e) => {
                  i(54, (O = !0)),
                    w && i(1, (L = !M.isValid())),
                    qe(
                      Fe(),
                      "SMUISelect:change",
                      { value: S, index: ge },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!Z,
                notchOutline: (e) => Z && Z.notch(e),
                closeOutline: () => Z && Z.closeNotch(),
                hasLabel: () => !!Q,
                floatLabel: (e) => Q && Q.float(e),
                getLabelWidth: () => (Q ? Q.getWidth() : 0),
                setLabelRequired: (e) => Q && Q.setRequired(e),
              },
              {
                get helperText() {
                  return Y;
                },
                get leadingIcon() {
                  return X;
                },
              }
            ))
          ),
          i(24, (ge = Ne().indexOf(S))),
          M.init(),
          Me(D),
          () => {
            M.destroy();
          }
        )
      ),
      U(() => {
        G && G();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(53, (l = m(n, a))),
          "use" in e && i(2, (v = e.use)),
          "class" in e && i(3, (b = e.class)),
          "style" in e && i(4, (y = e.style)),
          "ripple" in e && i(5, (E = e.ripple)),
          "disabled" in e && i(6, (A = e.disabled)),
          "variant" in e && i(7, (C = e.variant)),
          "noLabel" in e && i(8, (x = e.noLabel)),
          "label" in e && i(9, (_ = e.label)),
          "value" in e && i(0, (S = e.value)),
          "key" in e && i(55, (T = e.key)),
          "dirty" in e && i(54, (O = e.dirty)),
          "invalid" in e && i(1, (L = e.invalid)),
          "updateInvalid" in e && i(56, (w = e.updateInvalid)),
          "required" in e && i(10, (ee = e.required)),
          "inputId" in e && i(11, (te = e.inputId)),
          "hiddenInput" in e && i(12, (ne = e.hiddenInput)),
          "withLeadingIcon" in e && i(13, (ie = e.withLeadingIcon)),
          "anchor$use" in e && i(14, (ae = e.anchor$use)),
          "anchor$class" in e && i(15, (re = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            i(16, (se = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            i(17, (oe = e.selectedTextContainer$class)),
          "selectedText$use" in e && i(18, (le = e.selectedText$use)),
          "selectedText$class" in e && i(19, (ce = e.selectedText$class)),
          "dropdownIcon$use" in e && i(20, (de = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && i(21, (ue = e.dropdownIcon$class)),
          "menu$class" in e && i(22, (pe = e.menu$class)),
          "$$scope" in e && i(89, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && Ce !== ge)
          if ((i(62, (Ce = ge)), M)) M.setSelectedIndex(ge, !1, !0);
          else {
            const e = Ne();
            S !== e[ge] && i(0, (S = e[ge]));
          }
        1 & e.$$.dirty[0] && g(Ae, (s = S), s),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            M &&
            M.getValue() !== T(S) &&
            M.setValue(T(S)),
          8388672 & e.$$.dirty[0] &&
            M &&
            M.getDisabled() !== A &&
            M.setDisabled(A),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            M &&
            O &&
            M.isValid() !== !L &&
            (w ? i(1, (L = !M.isValid())) : M.setValid(!L)),
          8389632 & e.$$.dirty[0] &&
            M &&
            M.getRequired() !== ee &&
            M.setRequired(ee);
      }),
      [
        S,
        L,
        v,
        b,
        y,
        E,
        A,
        C,
        x,
        _,
        ee,
        te,
        ne,
        ie,
        ae,
        re,
        se,
        oe,
        le,
        ce,
        de,
        ue,
        pe,
        M,
        ge,
        N,
        fe,
        me,
        R,
        he,
        P,
        j,
        Ie,
        ve,
        q,
        K,
        be,
        W,
        X,
        Y,
        Q,
        J,
        Z,
        r,
        p,
        I,
        ye,
        Ee,
        Ae,
        _e,
        Se,
        function (e, t) {
          me[e] != t &&
            ("" === t || null == t
              ? (delete me[e], i(27, me))
              : i(27, (me[e] = t), me));
        },
        u,
        l,
        O,
        T,
        w,
        function () {
          return M.getUseDefaultValidation();
        },
        Me,
        function () {
          R.focus();
        },
        Re,
        Fe,
        Ce,
        c,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Q = e), i(40, Q);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (Z = e), i(42, Z);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (P = e), i(30, P);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (J = e), i(41, J);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (R = e), i(28, R);
          });
        },
        () => M && M.handleFocus(),
        () => M && M.handleBlur(),
        (e) => {
          R.focus(),
            M &&
              M.handleClick(
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
        (e) => M && M.handleKeydown(e),
        function (e) {
          (ge = e), i(24, ge);
        },
        (e) => i(37, (W = e.detail)),
        function (e) {
          (Ie = e), i(32, Ie);
        },
        (e) => M && M.handleMenuItemAction(e.detail.index),
        () => M && M.handleMenuClosing(),
        () => M && M.handleMenuClosed(),
        () => M && M.handleMenuOpened(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (N = e), i(25, N);
          });
        },
        (e) => i(38, (X = e.detail)),
        () => i(38, (X = void 0)),
        (e) => i(31, (j = e.detail)),
        (e) => i(39, (Y = e.detail)),
        () => {
          i(31, (j = void 0)), i(39, (Y = void 0));
        },
        d,
      ]
    );
  }
  class Bs extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          Hs,
          ks,
          s,
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
  function Vs(e) {
    let t;
    const n = e[11].default,
      i = l(n, e, e[13], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, a) {
        i &&
          i.p &&
          (!t || 8192 & a) &&
          u(i, n, e, e[13], t ? d(n, e[13], a, null) : p(e[13]), null);
      },
      i(e) {
        t || (se(i, e), (t = !0));
      },
      o(e) {
        oe(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function js(e) {
    let n, i;
    const a = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let r = { $$slots: { default: [Vs] }, $$scope: { ctx: e } };
    for (let e = 0; e < a.length; e += 1) r = t(r, a[e]);
    return (
      (n = new cr({ props: r })),
      e[12](n),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p(e, [t]) {
          const i =
            77 & t
              ? ce(a, [
                  8 & t && { use: e[3] },
                  1 & t && { "data-value": e[0] },
                  1 & t && { value: e[0] },
                  4 & t && { selected: e[2] },
                  64 & t && de(e[6]),
                ])
              : {};
          8192 & t && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), (i = !1);
        },
        d(t) {
          e[12](null), me(n, t);
        },
      }
    );
  }
  function zs(e, n, i) {
    let a, r;
    const s = ["use", "class", "value", "getElement"];
    let l,
      c,
      d = m(n, s),
      { $$slots: u = {}, $$scope: p } = n;
    const h = Ye(F());
    let { use: $ = [] } = n;
    let I,
      { value: v = "" } = n;
    const b = B("SMUI:select:selectedText");
    o(e, b, (e) => i(14, (l = e)));
    const y = B("SMUI:select:value");
    function E() {
      r && I && g(b, (l = I.getPrimaryText()), l);
    }
    return (
      o(e, y, (e) => i(10, (c = e))),
      H("SMUI:list:item:role", "option"),
      k(E),
      U(E),
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(6, (d = m(n, s))),
          "use" in e && i(7, ($ = e.use)),
          "value" in e && i(0, (v = e.value)),
          "$$scope" in e && i(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && i(3, (a = [h, ...$])),
          1025 & e.$$.dirty && i(2, (r = null != v && "" !== v && c === v));
      }),
      [
        v,
        I,
        r,
        a,
        b,
        y,
        d,
        $,
        "",
        function () {
          return I.getElement();
        },
        c,
        u,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (I = e), i(1, I);
          });
        },
        p,
      ]
    );
  }
  const Gs = class extends ge {
    constructor(e) {
      super(),
        he(this, e, zs, js, s, { use: 7, class: 8, value: 0, getElement: 9 });
    }
    get class() {
      return this.$$.ctx[8];
    }
    get getElement() {
      return this.$$.ctx[9];
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
  var qs,
    Ks = (function () {
      function e() {
        this.rafIDs = new Map();
      }
      return (
        (e.prototype.request = function (e, t) {
          var n = this;
          this.cancel(e);
          var i = requestAnimationFrame(function (i) {
            n.rafIDs.delete(e), t(i);
          });
          this.rafIDs.set(e, i);
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
    Ws = {
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
    Xs = {
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
    Ys = {
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
  })(qs || (qs = {}));
  var Qs = (function (e) {
    function t(n) {
      var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = Xs.CLOSE_ACTION),
        (i.scrimClickAction = Xs.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = Xs.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new Ks()),
        (i.contentScrollHandler = function () {
          i.handleScrollEvent();
        }),
        (i.windowResizeHandler = function () {
          i.layout();
        }),
        (i.windowOrientationChangeHandler = function () {
          i.layout();
        }),
        i
      );
    }
    return (
      Ie(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Ws;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Xs;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ys;
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
        this.adapter.hasClass(Ws.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(Ws.FULLSCREEN));
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
          this.adapter.addClass(Ws.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(Ws.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(Ws.OPEN),
              t.adapter.addBodyClass(Ws.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, Ys.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(Ws.CLOSING),
            this.adapter.removeClass(Ws.OPEN),
            this.adapter.removeBodyClass(Ws.SCROLL_LOCK),
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
            }, Ys.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(Ws.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(Ws.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(Ws.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(Ws.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(Ws.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(Ws.SURFACE_SCRIM_SHOWING);
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
        this.animFrame.request(qs.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, Xs.SCRIM_SELECTOR) &&
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
            i =
              !this.suppressDefaultPressSelector ||
              !this.adapter.eventTargetMatches(
                n,
                this.suppressDefaultPressSelector
              );
          t && i && this.adapter.clickDefaultButton();
        }
      }),
      (t.prototype.handleDocumentKeydown = function (e) {
        ("Escape" === e.key || 27 === e.keyCode) &&
          "" !== this.escapeKeyAction &&
          this.close(this.escapeKeyAction);
      }),
      (t.prototype.handleScrollEvent = function () {
        var e = this;
        this.animFrame.request(qs.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(Ws.OPENING),
          this.adapter.removeClass(Ws.CLOSING);
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
        this.adapter.removeClass(Ws.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(Ws.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(Ws.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(Ws.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(Ws.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(Ws.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(Ws.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(Ws.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(Ws.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(Ws.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Ce);
  const { document: Js, window: Zs } = le,
    eo = (e) => ({}),
    to = (e) => ({});
  function no(t) {
    let n, i, a;
    return {
      c() {
        (n = E("div")), T(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, r) {
        v(e, n, r), i || ((a = S(n, "transitionend", t[31])), (i = !0));
      },
      p: e,
      d(e) {
        e && b(n), (i = !1), a();
      },
    };
  }
  function io(e) {
    let n, i, s, o, c, f, m, h, g, y, A, C, _, L, w;
    const D = e[27].default,
      N = l(D, e, e[26], null);
    let M = e[5] && no(e),
      R = [
        { class: (f = Ge({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        Qe(e[17], "surface$"),
      ],
      F = {};
    for (let e = 0; e < R.length; e += 1) F = t(F, R[e]);
    let k = [
        { class: (m = Ge({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        Qe(e[17], "container$"),
      ],
      U = {};
    for (let e = 0; e < k.length; e += 1) U = t(U, k[e]);
    let P = [
        {
          class: (y = Ge({
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
        Ke(e[17], ["container$", "surface$"]),
      ],
      H = {};
    for (let e = 0; e < P.length; e += 1) H = t(H, P[e]);
    const B = e[27].over,
      V = l(B, e, e[26], to);
    return {
      c() {
        (n = x()),
          (i = E("div")),
          (s = E("div")),
          (o = E("div")),
          N && N.c(),
          (c = x()),
          M && M.c(),
          (h = x()),
          (g = E("div")),
          (C = x()),
          V && V.c(),
          O(o, F),
          O(s, U),
          T(g, "class", "mdc-dialog__scrim"),
          O(i, H);
      },
      m(t, a) {
        v(t, n, a),
          v(t, i, a),
          I(i, s),
          I(s, o),
          N && N.m(o, null),
          I(o, c),
          M && M.m(o, null),
          I(i, h),
          I(i, g),
          e[32](i),
          v(t, C, a),
          V && V.m(t, a),
          (_ = !0),
          L ||
            ((w = [
              S(Zs, "resize", e[28]),
              S(Zs, "orientationchange", e[29]),
              S(Js.body, "keydown", e[30]),
              $((A = Je.call(null, i, e[1]))),
              $(e[11].call(null, i)),
              S(i, "SMUIDialog:opening", e[14]),
              S(i, "SMUIDialog:opened", e[15]),
              S(i, "SMUIDialog:closed", e[16]),
              S(i, "click", e[33]),
              S(i, "keydown", e[34]),
            ]),
            (L = !0));
      },
      p(e, t) {
        N &&
          N.p &&
          (!_ || 67108864 & t[0]) &&
          u(N, D, e, e[26], _ ? d(D, e[26], t, null) : p(e[26]), null),
          e[5]
            ? M
              ? M.p(e, t)
              : ((M = no(e)), M.c(), M.m(o, null))
            : M && (M.d(1), (M = null)),
          O(
            o,
            (F = ce(R, [
              (!_ ||
                (128 & t[0] &&
                  f !==
                    (f = Ge({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: f,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && Qe(e[17], "surface$"),
            ]))
          ),
          O(
            s,
            (U = ce(k, [
              (!_ ||
                (64 & t[0] &&
                  m !==
                    (m = Ge({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: m,
              },
              131072 & t[0] && Qe(e[17], "container$"),
            ]))
          ),
          O(
            i,
            (H = ce(P, [
              (!_ ||
                (1084 & t[0] &&
                  y !==
                    (y = Ge({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: y },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && Ke(e[17], ["container$", "surface$"]),
            ]))
          ),
          A && r(A.update) && 2 & t[0] && A.update.call(null, e[1]),
          V &&
            V.p &&
            (!_ || 67108864 & t[0]) &&
            u(V, B, e, e[26], _ ? d(B, e[26], t, eo) : p(e[26]), to);
      },
      i(e) {
        _ || (se(N, e), se(V, e), (_ = !0));
      },
      o(e) {
        oe(N, e), oe(V, e), (_ = !1);
      },
      d(t) {
        t && b(n),
          t && b(i),
          N && N.d(t),
          M && M.d(),
          e[32](null),
          t && b(C),
          V && V.d(t),
          (L = !1),
          a(w);
      },
    };
  }
  function ao(e, n, i) {
    const a = [
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
    let r,
      s,
      l = m(n, a),
      { $$slots: c = {}, $$scope: d } = n;
    var u;
    const { FocusTrap: p } = fn,
      { closest: h, matches: $ } = Te,
      I = Ye(F());
    let v,
      b,
      y,
      { use: E = [] } = n,
      { class: A = "" } = n,
      { open: C = !1 } = n,
      { selection: x = !1 } = n,
      { escapeKeyAction: _ = "close" } = n,
      { scrimClickAction: S = "close" } = n,
      { autoStackButtons: T = !0 } = n,
      { fullscreen: O = !1 } = n,
      { container$class: L = "" } = n,
      { surface$class: w = "" } = n,
      D = {},
      N = ze(!1);
    o(e, N, (e) => i(38, (s = e)));
    let M = B("SMUI:dialog:aboveFullscreen"),
      R =
        null !== (u = B("SMUI:dialog:aboveFullscreenShown")) && void 0 !== u
          ? u
          : ze(!1);
    o(e, R, (e) => i(25, (r = e)));
    let P,
      V = B("SMUI:addLayoutListener"),
      j = [];
    H("SMUI:dialog:actions:reversed", N),
      H(
        "SMUI:addLayoutListener",
        (e) => (
          j.push(e),
          () => {
            const t = j.indexOf(e);
            t >= 0 && j.splice(t, 1);
          }
        )
      ),
      H("SMUI:dialog:selection", x),
      H("SMUI:dialog:aboveFullscreen", M || O),
      H("SMUI:dialog:aboveFullscreenShown", R),
      V && (P = V(Q));
    let G = r;
    function q(e) {
      return e in D ? D[e] : J().classList.contains(e);
    }
    function K(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function W(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function X() {
      return v.querySelector(".mdc-dialog__content");
    }
    function Y() {
      return v.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function Q() {
      return b.layout();
    }
    function J() {
      return v;
    }
    k(() => {
      var e;
      return (
        (y = new p(v, {
          initialFocusEl: null !== (e = Y()) && void 0 !== e ? e : void 0,
        })),
        i(
          8,
          (b = new Qs({
            addBodyClass: (e) => document.body.classList.add(e),
            addClass: K,
            areButtonsStacked: () => {
              return (
                (e = [].slice.call(v.querySelectorAll(".mdc-dialog__button"))),
                (t = new Set()),
                [].forEach.call(e, function (e) {
                  return t.add(e.offsetTop);
                }),
                t.size > 1
              );
              var e, t;
            },
            clickDefaultButton: () => {
              const e = v.querySelector("[data-mdc-dialog-button-default");
              e && e.click();
            },
            eventTargetMatches: (e, t) => !!e && $(e, t),
            getActionFromEvent: (e) => {
              if (!e.target) return "";
              const t = h(e.target, "[data-mdc-dialog-action]");
              return t && t.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: Y,
            hasClass: q,
            isContentScrollable: () => {
              return !!(e = X()) && e.scrollHeight > e.offsetHeight;
              var e;
            },
            notifyClosed: (e) => {
              i(0, (C = !1)),
                qe(
                  J(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              qe(J(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => qe(J(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => qe(J(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => y.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: W,
            reverseButtons: () => {
              g(N, (s = !0), s);
            },
            trapFocus: () => y.trapFocus(),
            registerContentEventHandler: (e, t) => {
              const n = X();
              n instanceof HTMLElement && n.addEventListener(e, t);
            },
            deregisterContentEventHandler: (e, t) => {
              const n = X();
              n instanceof HTMLElement && n.removeEventListener(e, t);
            },
            isScrollableContentAtTop: () => {
              return !!(e = X()) && 0 === e.scrollTop;
              var e;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(e = X()) &&
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
        b.init(),
        () => {
          b.destroy();
        }
      );
    }),
      U(() => {
        P && P();
      });
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(17, (l = m(n, a))),
          "use" in e && i(1, (E = e.use)),
          "class" in e && i(2, (A = e.class)),
          "open" in e && i(0, (C = e.open)),
          "selection" in e && i(3, (x = e.selection)),
          "escapeKeyAction" in e && i(18, (_ = e.escapeKeyAction)),
          "scrimClickAction" in e && i(19, (S = e.scrimClickAction)),
          "autoStackButtons" in e && i(4, (T = e.autoStackButtons)),
          "fullscreen" in e && i(5, (O = e.fullscreen)),
          "container$class" in e && i(6, (L = e.container$class)),
          "surface$class" in e && i(7, (w = e.surface$class)),
          "$$scope" in e && i(26, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          b &&
          b.getEscapeKeyAction() !== _ &&
          b.setEscapeKeyAction(_),
          524544 & e.$$.dirty[0] &&
            b &&
            b.getScrimClickAction() !== S &&
            b.setScrimClickAction(S),
          272 & e.$$.dirty[0] &&
            b &&
            b.getAutoStackButtons() !== T &&
            b.setAutoStackButtons(T),
          16 & e.$$.dirty[0] && (T || g(N, (s = !0), s)),
          257 & e.$$.dirty[0] &&
            b &&
            b.isOpen() !== C &&
            (C ? b.open({ isAboveFullscreenDialog: !!M }) : b.close()),
          50331936 & e.$$.dirty[0] &&
            O &&
            b &&
            G !== r &&
            (i(24, (G = r)), r ? b.showSurfaceScrim() : b.hideSurfaceScrim());
      }),
      [
        C,
        E,
        A,
        x,
        T,
        O,
        L,
        w,
        b,
        v,
        D,
        I,
        N,
        R,
        function () {
          M && g(R, (r = !0), r),
            requestAnimationFrame(() => {
              j.forEach((e) => e());
            });
        },
        function () {
          j.forEach((e) => e());
        },
        function () {
          M && g(R, (r = !1), r);
        },
        l,
        _,
        S,
        function () {
          return C;
        },
        function (e) {
          i(0, (C = e));
        },
        Q,
        J,
        G,
        r,
        d,
        c,
        () => C && b && b.layout(),
        () => C && b && b.layout(),
        (e) => C && b && b.handleDocumentKeydown(e),
        () => b && b.handleSurfaceScrimTransitionEnd(),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (v = e), i(9, v);
          });
        },
        (e) => b && b.handleClick(e),
        (e) => b && b.handleKeydown(e),
      ]
    );
  }
  class ro extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          ao,
          io,
          s,
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
  ft({
    class: "mdc-dialog__header",
    component: Rt,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var so = ft({ class: "mdc-dialog__title", component: kt }),
    oo = ft({ class: "mdc-dialog__content", component: Rt }),
    lo = ft({
      class: "mdc-dialog__actions",
      component: Rt,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    }),
    co = {
      CLOSING: "mdc-snackbar--closing",
      OPEN: "mdc-snackbar--open",
      OPENING: "mdc-snackbar--opening",
    },
    uo = {
      ACTION_SELECTOR: ".mdc-snackbar__action",
      ARIA_LIVE_LABEL_TEXT_ATTR: "data-mdc-snackbar-label-text",
      CLOSED_EVENT: "MDCSnackbar:closed",
      CLOSING_EVENT: "MDCSnackbar:closing",
      DISMISS_SELECTOR: ".mdc-snackbar__dismiss",
      LABEL_SELECTOR: ".mdc-snackbar__label",
      OPENED_EVENT: "MDCSnackbar:opened",
      OPENING_EVENT: "MDCSnackbar:opening",
      REASON_ACTION: "action",
      REASON_DISMISS: "dismiss",
      SURFACE_SELECTOR: ".mdc-snackbar__surface",
    },
    po = {
      DEFAULT_AUTO_DISMISS_TIMEOUT_MS: 5e3,
      INDETERMINATE: -1,
      MAX_AUTO_DISMISS_TIMEOUT_MS: 1e4,
      MIN_AUTO_DISMISS_TIMEOUT_MS: 4e3,
      SNACKBAR_ANIMATION_CLOSE_TIME_MS: 75,
      SNACKBAR_ANIMATION_OPEN_TIME_MS: 150,
      ARIA_LIVE_DELAY_MS: 1e3,
    },
    fo = po.ARIA_LIVE_DELAY_MS,
    mo = uo.ARIA_LIVE_LABEL_TEXT_ATTR;
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
  var ho = co.OPENING,
    go = co.OPEN,
    $o = co.CLOSING,
    Io = uo.REASON_ACTION,
    vo = uo.REASON_DISMISS,
    bo = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.opened = !1),
          (i.animationFrame = 0),
          (i.animationTimer = 0),
          (i.autoDismissTimer = 0),
          (i.autoDismissTimeoutMs = po.DEFAULT_AUTO_DISMISS_TIMEOUT_MS),
          (i.closeOnEscape = !0),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return co;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return uo;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return po;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "defaultAdapter", {
          get: function () {
            return {
              addClass: function () {},
              announce: function () {},
              notifyClosed: function () {},
              notifyClosing: function () {},
              notifyOpened: function () {},
              notifyOpening: function () {},
              removeClass: function () {},
            };
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.destroy = function () {
          this.clearAutoDismissTimer(),
            cancelAnimationFrame(this.animationFrame),
            (this.animationFrame = 0),
            clearTimeout(this.animationTimer),
            (this.animationTimer = 0),
            this.adapter.removeClass(ho),
            this.adapter.removeClass(go),
            this.adapter.removeClass($o);
        }),
        (t.prototype.open = function () {
          var e = this;
          this.clearAutoDismissTimer(),
            (this.opened = !0),
            this.adapter.notifyOpening(),
            this.adapter.removeClass($o),
            this.adapter.addClass(ho),
            this.adapter.announce(),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(go),
                (e.animationTimer = setTimeout(function () {
                  var t = e.getTimeoutMs();
                  e.handleAnimationTimerEnd(),
                    e.adapter.notifyOpened(),
                    t !== po.INDETERMINATE &&
                      (e.autoDismissTimer = setTimeout(function () {
                        e.close(vo);
                      }, t));
                }, po.SNACKBAR_ANIMATION_OPEN_TIME_MS));
            });
        }),
        (t.prototype.close = function (e) {
          var t = this;
          void 0 === e && (e = ""),
            this.opened &&
              (cancelAnimationFrame(this.animationFrame),
              (this.animationFrame = 0),
              this.clearAutoDismissTimer(),
              (this.opened = !1),
              this.adapter.notifyClosing(e),
              this.adapter.addClass(co.CLOSING),
              this.adapter.removeClass(co.OPEN),
              this.adapter.removeClass(co.OPENING),
              clearTimeout(this.animationTimer),
              (this.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(), t.adapter.notifyClosed(e);
              }, po.SNACKBAR_ANIMATION_CLOSE_TIME_MS)));
        }),
        (t.prototype.isOpen = function () {
          return this.opened;
        }),
        (t.prototype.getTimeoutMs = function () {
          return this.autoDismissTimeoutMs;
        }),
        (t.prototype.setTimeoutMs = function (e) {
          var t = po.MIN_AUTO_DISMISS_TIMEOUT_MS,
            n = po.MAX_AUTO_DISMISS_TIMEOUT_MS;
          if (!(e === po.INDETERMINATE || (e <= n && e >= t)))
            throw new Error(
              "\n        timeoutMs must be an integer in the range " +
                t +
                "–" +
                n +
                "\n        (or " +
                po.INDETERMINATE +
                " to disable), but got '" +
                e +
                "'"
            );
          this.autoDismissTimeoutMs = e;
        }),
        (t.prototype.getCloseOnEscape = function () {
          return this.closeOnEscape;
        }),
        (t.prototype.setCloseOnEscape = function (e) {
          this.closeOnEscape = e;
        }),
        (t.prototype.handleKeyDown = function (e) {
          ("Escape" === e.key || 27 === e.keyCode) &&
            this.getCloseOnEscape() &&
            this.close(vo);
        }),
        (t.prototype.handleActionButtonClick = function (e) {
          this.close(Io);
        }),
        (t.prototype.handleActionIconClick = function (e) {
          this.close(vo);
        }),
        (t.prototype.clearAutoDismissTimer = function () {
          clearTimeout(this.autoDismissTimer), (this.autoDismissTimer = 0);
        }),
        (t.prototype.handleAnimationTimerEnd = function () {
          (this.animationTimer = 0),
            this.adapter.removeClass(co.OPENING),
            this.adapter.removeClass(co.CLOSING);
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
        t
      );
    })(Ce);
  function yo(e) {
    let n, i, s, o, c, f, m, h, g;
    const y = e[25].default,
      A = l(y, e, e[24], null);
    let C = [
        { class: (s = Ge({ [e[4]]: !0, "mdc-snackbar__surface": !0 })) },
        { role: "status" },
        { "aria-relevant": "additions" },
        Qe(e[12], "surface$"),
      ],
      x = {};
    for (let e = 0; e < C.length; e += 1) x = t(x, C[e]);
    let _ = [
        {
          class: (c = Ge({
            [e[1]]: !0,
            "mdc-snackbar": !0,
            "mdc-snackbar--stacked": "stacked" === e[2],
            "mdc-snackbar--leading": e[3],
            ...e[8],
          })),
        },
        Ke(e[12], ["surface$"]),
      ],
      T = {};
    for (let e = 0; e < _.length; e += 1) T = t(T, _[e]);
    return {
      c() {
        (n = E("aside")), (i = E("div")), A && A.c(), O(i, x), O(n, T);
      },
      m(t, a) {
        v(t, n, a),
          I(n, i),
          A && A.m(i, null),
          e[26](n),
          (m = !0),
          h ||
            ((g = [
              $((o = Je.call(null, i, e[5]))),
              S(i, "click", e[10]),
              $((f = Je.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              S(n, "SMUISnackbar:closed", e[11]),
              S(n, "keydown", e[27]),
            ]),
            (h = !0));
      },
      p(e, t) {
        A &&
          A.p &&
          (!m || 16777216 & t[0]) &&
          u(A, y, e, e[24], m ? d(y, e[24], t, null) : p(e[24]), null),
          O(
            i,
            (x = ce(C, [
              (!m ||
                (16 & t[0] &&
                  s !==
                    (s = Ge({ [e[4]]: !0, "mdc-snackbar__surface": !0 })))) && {
                class: s,
              },
              { role: "status" },
              { "aria-relevant": "additions" },
              4096 & t[0] && Qe(e[12], "surface$"),
            ]))
          ),
          o && r(o.update) && 32 & t[0] && o.update.call(null, e[5]),
          O(
            n,
            (T = ce(_, [
              (!m ||
                (270 & t[0] &&
                  c !==
                    (c = Ge({
                      [e[1]]: !0,
                      "mdc-snackbar": !0,
                      "mdc-snackbar--stacked": "stacked" === e[2],
                      "mdc-snackbar--leading": e[3],
                      ...e[8],
                    })))) && { class: c },
              4096 & t[0] && Ke(e[12], ["surface$"]),
            ]))
          ),
          f && r(f.update) && 1 & t[0] && f.update.call(null, e[0]);
      },
      i(e) {
        m || (se(A, e), (m = !0));
      },
      o(e) {
        oe(A, e), (m = !1);
      },
      d(t) {
        t && b(n), A && A.d(t), e[26](null), (h = !1), a(g);
      },
    };
  }
  let Eo = Promise.resolve();
  function Ao(e, n, i) {
    const a = [
      "use",
      "class",
      "variant",
      "leading",
      "timeoutMs",
      "closeOnEscape",
      "labelText",
      "actionButtonText",
      "surface$class",
      "surface$use",
      "open",
      "forceOpen",
      "close",
      "isOpen",
      "getLabelElement",
      "getActionButtonElement",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const { closest: l } = Te,
      c = Ye(F());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      h,
      g,
      { use: $ = [] } = n,
      { class: I = "" } = n,
      { variant: v = "" } = n,
      { leading: b = !1 } = n,
      { timeoutMs: y = 5e3 } = n,
      { closeOnEscape: E = !0 } = n,
      { labelText: A = d } = n,
      { actionButtonText: C = d } = n,
      { surface$class: x = "" } = n,
      { surface$use: _ = [] } = n,
      S = {},
      T = new Promise((e) => (g = e));
    function O(e) {
      S[e] || i(8, (S[e] = !0), S);
    }
    function L(e) {
      (e in S && !S[e]) || i(8, (S[e] = !1), S);
    }
    function w() {
      var e;
      return null !== (e = N().querySelector(".mdc-snackbar__label")) &&
        void 0 !== e
        ? e
        : document.createElement("div");
    }
    function D() {
      var e;
      return null !== (e = N().querySelector(".mdc-snackbar__action")) &&
        void 0 !== e
        ? e
        : document.createElement("button");
    }
    function N() {
      return p;
    }
    H("SMUI:label:context", "snackbar"),
      k(
        () => (
          i(
            6,
            (h = new bo({
              addClass: O,
              announce: () =>
                (function (e, t) {
                  void 0 === t && (t = e);
                  var n = e.getAttribute("aria-live"),
                    i = t.textContent.trim();
                  i &&
                    n &&
                    (e.setAttribute("aria-live", "off"),
                    (t.textContent = ""),
                    (t.innerHTML =
                      '<span style="display: inline-block; width: 0; height: 1px;">&nbsp;</span>'),
                    t.setAttribute(mo, i),
                    setTimeout(function () {
                      e.setAttribute("aria-live", n),
                        t.removeAttribute(mo),
                        (t.textContent = i);
                    }, fo));
                })(w()),
              notifyClosed: (e) =>
                qe(
                  N(),
                  "SMUISnackbar:closed",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyClosing: (e) =>
                qe(
                  N(),
                  "SMUISnackbar:closing",
                  e ? { reason: e } : {},
                  void 0,
                  !0
                ),
              notifyOpened: () =>
                qe(N(), "SMUISnackbar:opened", void 0, void 0, !0),
              notifyOpening: () =>
                qe(N(), "SMUISnackbar:opening", void 0, void 0, !0),
              removeClass: L,
            }))
          ),
          h.init(),
          () => {
            h.destroy();
          }
        )
      );
    return (
      (e.$$set = (e) => {
        (n = t(t({}, n), f(e))),
          i(12, (r = m(n, a))),
          "use" in e && i(0, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "variant" in e && i(2, (v = e.variant)),
          "leading" in e && i(3, (b = e.leading)),
          "timeoutMs" in e && i(13, (y = e.timeoutMs)),
          "closeOnEscape" in e && i(14, (E = e.closeOnEscape)),
          "labelText" in e && i(15, (A = e.labelText)),
          "actionButtonText" in e && i(16, (C = e.actionButtonText)),
          "surface$class" in e && i(4, (x = e.surface$class)),
          "surface$use" in e && i(5, (_ = e.surface$use)),
          "$$scope" in e && i(24, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        8256 & e.$$.dirty[0] &&
          h &&
          h.getTimeoutMs() !== y &&
          h.setTimeoutMs(y),
          16448 & e.$$.dirty[0] &&
            h &&
            h.getCloseOnEscape() !== E &&
            h.setCloseOnEscape(E),
          32832 & e.$$.dirty[0] &&
            h &&
            !u(A) &&
            w().textContent !== A &&
            (w().textContent = A),
          65600 & e.$$.dirty[0] &&
            h &&
            !u(C) &&
            D().textContent !== C &&
            (D().textContent = C);
      }),
      [
        $,
        I,
        v,
        b,
        x,
        _,
        h,
        p,
        S,
        c,
        function (e) {
          const t = e.target;
          h &&
            (l(t, ".mdc-snackbar__action")
              ? h.handleActionButtonClick(e)
              : l(t, ".mdc-snackbar__dismiss") && h.handleActionIconClick(e));
        },
        function () {
          g(), (T = new Promise((e) => (g = e)));
        },
        r,
        y,
        E,
        A,
        C,
        function () {
          Eo = Eo.then(() => (h.open(), T));
        },
        function () {
          return h.open();
        },
        function (e) {
          return h.close(e);
        },
        function () {
          return h.isOpen();
        },
        w,
        D,
        N,
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(7, p);
          });
        },
        (e) => h && h.handleKeyDown(e),
      ]
    );
  }
  class Co extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          Ao,
          yo,
          s,
          {
            use: 0,
            class: 1,
            variant: 2,
            leading: 3,
            timeoutMs: 13,
            closeOnEscape: 14,
            labelText: 15,
            actionButtonText: 16,
            surface$class: 4,
            surface$use: 5,
            open: 17,
            forceOpen: 18,
            close: 19,
            isOpen: 20,
            getLabelElement: 21,
            getActionButtonElement: 22,
            getElement: 23,
          },
          null,
          [-1, -1]
        );
    }
    get open() {
      return this.$$.ctx[17];
    }
    get forceOpen() {
      return this.$$.ctx[18];
    }
    get close() {
      return this.$$.ctx[19];
    }
    get isOpen() {
      return this.$$.ctx[20];
    }
    get getLabelElement() {
      return this.$$.ctx[21];
    }
    get getActionButtonElement() {
      return this.$$.ctx[22];
    }
    get getElement() {
      return this.$$.ctx[23];
    }
  }
  var xo = ft({
    class: "mdc-snackbar__actions",
    props: { "aria-atomic": "true" },
    contexts: {
      "SMUI:button:context": "snackbar:actions",
      "SMUI:icon-button:context": "snackbar:actions",
      "SMUI:label:context": void 0,
    },
    component: Rt,
  });
  function _o(e) {
    let t;
    return {
      c() {
        (t = E("div")), T(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function So(e) {
    let t, n, i, a;
    const r = e[27].default,
      s = l(r, e, e[29], null);
    let o = e[6] && _o();
    return {
      c() {
        (t = E("div")),
          (n = x()),
          s && s.c(),
          o && o.c(),
          (i = _()),
          T(t, "class", "mdc-button__ripple");
      },
      m(e, r) {
        v(e, t, r),
          v(e, n, r),
          s && s.m(e, r),
          o && o.m(e, r),
          v(e, i, r),
          (a = !0);
      },
      p(e, t) {
        s &&
          s.p &&
          (!a || 536870912 & t) &&
          u(s, r, e, e[29], a ? d(r, e[29], t, null) : p(e[29]), null),
          e[6]
            ? o || ((o = _o()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        a || (se(s, e), (a = !0));
      },
      o(e) {
        oe(s, e), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), s && s.d(e), o && o.d(e), e && b(i);
      },
    };
  }
  function To(e) {
    let n, i, a;
    const r = [
      {
        use: [
          [
            ni,
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
        class: Ge({
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
      { style: Object.entries(e[12]).map(Oo).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var s = e[9];
    function o(e) {
      let n = { $$slots: { default: [So] }, $$scope: { ctx: e } };
      for (let e = 0; e < r.length; e += 1) n = t(n, r[e]);
      return { props: n };
    }
    return (
      s && ((n = new s(o(e))), e[28](n), n.$on("click", e[21])),
      {
        c() {
          n && pe(n.$$.fragment), (i = _());
        },
        m(e, t) {
          n && fe(n, e, t), v(e, i, t), (a = !0);
        },
        p(e, [t]) {
          const a =
            6289919 & t
              ? ce(r, [
                  6094873 & t && {
                    use: [
                      [
                        ni,
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
                    class: Ge({
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
                      .map(Oo)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & t && de(e[15]),
                  16384 & t && de(e[14]),
                  8192 & t && de(e[13]),
                  128 & t && { href: e[7] },
                  4194304 & t && de(e[22]),
                ])
              : {};
          if (
            (536870976 & t && (a.$$scope = { dirty: t, ctx: e }),
            s !== (s = e[9]))
          ) {
            if (n) {
              ae();
              const e = n;
              oe(e.$$.fragment, 1, 0, () => {
                me(e, 1);
              }),
                re();
            }
            s
              ? ((n = new s(o(e))),
                e[28](n),
                n.$on("click", e[21]),
                pe(n.$$.fragment),
                se(n.$$.fragment, 1),
                fe(n, i.parentNode, i))
              : (n = null);
          } else s && n.$set(a);
        },
        i(e) {
          a || (n && se(n.$$.fragment, e), (a = !0));
        },
        o(e) {
          n && oe(n.$$.fragment, e), (a = !1);
        },
        d(t) {
          e[28](null), t && b(i), n && me(n, t);
        },
      }
    );
  }
  const Oo = ([e, t]) => `${e}: ${t};`;
  function Lo(e, n, i) {
    let a, r, s;
    const o = [
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
    let l = m(n, o),
      { $$slots: c = {}, $$scope: d } = n;
    const u = Ye(F());
    let p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { ripple: I = !0 } = n,
      { color: v = "primary" } = n,
      { variant: b = "text" } = n,
      { touch: y = !1 } = n,
      { href: E } = n,
      { action: A = "close" } = n,
      { defaultAction: C = !1 } = n,
      { secondary: x = !1 } = n,
      _ = {},
      S = {},
      T = B("SMUI:button:context"),
      { component: O = null == E ? Mt : Nt } = n,
      L = l.disabled;
    function w() {
      return p.getElement();
    }
    return (
      H("SMUI:label:context", "button"),
      H("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        i(30, (n = t(t({}, n), f(e)))),
          i(22, (l = m(n, o))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "style" in e && i(2, ($ = e.style)),
          "ripple" in e && i(3, (I = e.ripple)),
          "color" in e && i(4, (v = e.color)),
          "variant" in e && i(5, (b = e.variant)),
          "touch" in e && i(6, (y = e.touch)),
          "href" in e && i(7, (E = e.href)),
          "action" in e && i(23, (A = e.action)),
          "defaultAction" in e && i(24, (C = e.defaultAction)),
          "secondary" in e && i(8, (x = e.secondary)),
          "component" in e && i(9, (O = e.component)),
          "$$scope" in e && i(29, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        i(
          15,
          (a =
            "dialog:action" === T && null != A
              ? { "data-mdc-dialog-action": A }
              : { action: n.action })
        ),
          i(
            14,
            (r =
              "dialog:action" === T && C
                ? { "data-mdc-dialog-button-default": "" }
                : { default: n.default })
          ),
          i(13, (s = "banner" === T ? {} : { secondary: n.secondary })),
          L !== l.disabled && (w().blur(), i(26, (L = l.disabled)));
      }),
      (n = f(n)),
      [
        h,
        g,
        $,
        I,
        v,
        b,
        y,
        E,
        x,
        O,
        p,
        _,
        S,
        s,
        r,
        a,
        u,
        T,
        function (e) {
          _[e] || i(11, (_[e] = !0), _);
        },
        function (e) {
          (e in _ && !_[e]) || i(11, (_[e] = !1), _);
        },
        function (e, t) {
          S[e] != t &&
            ("" === t || null == t
              ? (delete S[e], i(12, S))
              : i(12, (S[e] = t), S));
        },
        function () {
          "banner" === T &&
            qe(
              w(),
              x
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        l,
        A,
        C,
        w,
        L,
        c,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e), i(10, p);
          });
        },
        d,
      ]
    );
  }
  class wo extends ge {
    constructor(e) {
      super(),
        he(this, e, Lo, To, s, {
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
  var Do = new Map([
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
  function No(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          i = Do.get(n);
        i &&
          Object.defineProperty(e, "type", {
            value: i,
            writable: !1,
            configurable: !1,
            enumerable: !0,
          });
      }
      return e;
    })(e);
    if ("string" != typeof n.path) {
      var i = e.webkitRelativePath;
      Object.defineProperty(n, "path", {
        value:
          "string" == typeof t
            ? t
            : "string" == typeof i && i.length > 0
            ? i
            : e.name,
        writable: !1,
        configurable: !1,
        enumerable: !0,
      });
    }
    return n;
  }
  var Mo = [".DS_Store", "Thumbs.db"];
  function Ro(e) {
    return be(this, void 0, void 0, function () {
      return ye(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? ko(e.dataTransfer, e.type)
            : Fo(e)),
        ];
        var n;
      });
    });
  }
  function Fo(e) {
    return (null !== e.target && e.target.files ? Po(e.target.files) : []).map(
      function (e) {
        return No(e);
      }
    );
  }
  function ko(e, t) {
    return be(this, void 0, void 0, function () {
      var n;
      return ye(this, function (i) {
        switch (i.label) {
          case 0:
            return e.items
              ? ((n = Po(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(Ho))])
              : [3, 2];
          case 1:
            return [2, Uo(Bo(i.sent()))];
          case 2:
            return [
              2,
              Uo(
                Po(e.files).map(function (e) {
                  return No(e);
                })
              ),
            ];
        }
      });
    });
  }
  function Uo(e) {
    return e.filter(function (e) {
      return -1 === Mo.indexOf(e.name);
    });
  }
  function Po(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var i = e[n];
      t.push(i);
    }
    return t;
  }
  function Ho(e) {
    if ("function" != typeof e.webkitGetAsEntry) return Vo(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? zo(t) : Vo(e);
  }
  function Bo(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(Ae(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? Bo(t) : [t]);
    }, []);
  }
  function Vo(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = No(t);
    return Promise.resolve(n);
  }
  function jo(e) {
    return be(this, void 0, void 0, function () {
      return ye(this, function (t) {
        return [2, e.isDirectory ? zo(e) : Go(e)];
      });
    });
  }
  function zo(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function a() {
        var r = this;
        t.readEntries(
          function (t) {
            return be(r, void 0, void 0, function () {
              var r, s, o;
              return ye(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (r = l.sent()), e(r), [3, 4];
                  case 3:
                    return (s = l.sent()), n(s), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (o = Promise.all(t.map(jo))), i.push(o), a(), (l.label = 6);
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
  function Go(e) {
    return be(this, void 0, void 0, function () {
      return ye(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var i = No(n, e.fullPath);
                t(i);
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
  const qo = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    Ko = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    Wo = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    Xo = { code: "too-many-files", message: "Too many files" };
  function Yo(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            i = e.name || "",
            a = (e.type || "").toLowerCase(),
            r = a.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? i.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? r === t.replace(/\/.*$/, "")
              : a === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : qo(t)];
  }
  function Qo(e) {
    return null != e;
  }
  function Jo(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function Zo(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function el(t) {
    let n, i, r, s, o, c, f;
    const m = t[32].default,
      h = l(m, t, t[31], null),
      g =
        h ||
        (function (t) {
          let n;
          return {
            c() {
              (n = E("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(e, t) {
              v(e, n, t);
            },
            p: e,
            d(e) {
              e && b(n);
            },
          };
        })();
    return {
      c() {
        (n = E("div")),
          (i = E("input")),
          (r = x()),
          g && g.c(),
          T(i, "accept", t[0]),
          (i.multiple = t[1]),
          T(i, "type", "file"),
          T(i, "name", t[5]),
          T(i, "autocomplete", "off"),
          T(i, "tabindex", "-1"),
          D(i, "display", "none"),
          T(n, "tabindex", "0"),
          T(
            n,
            "class",
            (s = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          T(n, "style", t[3]);
      },
      m(e, a) {
        v(e, n, a),
          I(n, i),
          t[33](i),
          I(n, r),
          g && g.m(n, null),
          t[34](n),
          (o = !0),
          c ||
            ((f = [
              S(window, "focus", t[21]),
              S(window, "dragover", t[19]),
              S(window, "drop", t[20]),
              S(i, "change", t[15]),
              S(i, "click", tl),
              S(n, "keydown", t[17](t[8])),
              S(n, "focus", t[17](t[9])),
              S(n, "blur", t[17](t[10])),
              S(n, "click", t[16](t[11])),
              S(n, "dragenter", t[18](t[12])),
              S(n, "dragover", t[18](t[13])),
              S(n, "dragleave", t[18](t[14])),
              S(n, "drop", t[18](t[15])),
            ]),
            (c = !0));
      },
      p(e, t) {
        (!o || 1 & t[0]) && T(i, "accept", e[0]),
          (!o || 2 & t[0]) && (i.multiple = e[1]),
          (!o || 32 & t[0]) && T(i, "name", e[5]),
          h &&
            h.p &&
            (!o || 1 & t[1]) &&
            u(h, m, e, e[31], o ? d(m, e[31], t, null) : p(e[31]), null),
          (!o ||
            (20 & t[0] &&
              s !==
                (s =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            T(n, "class", s),
          (!o || 8 & t[0]) && T(n, "style", e[3]);
      },
      i(e) {
        o || (se(g, e), (o = !0));
      },
      o(e) {
        oe(g, e), (o = !1);
      },
      d(e) {
        e && b(n), t[33](null), g && g.d(e), t[34](null), (c = !1), a(f);
      },
    };
  }
  function tl(e) {
    e.stopPropagation();
  }
  function nl(e, t, n) {
    let { $$slots: i = {}, $$scope: a } = t,
      { accept: r } = t,
      { disabled: s = !1 } = t,
      { getFilesFromEvent: o = Ro } = t,
      { maxSize: l = 1 / 0 } = t,
      { minSize: c = 0 } = t,
      { multiple: d = !0 } = t,
      { preventDropOnDocument: u = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: f = !1 } = t,
      { noDrag: m = !1 } = t,
      { noDragEventsBubbling: h = !1 } = t,
      { containerClasses: g = "" } = t,
      { containerStyles: $ = "" } = t,
      { disableDefaultStyles: I = !1 } = t,
      { name: v = "" } = t;
    const b = P();
    let y,
      E,
      A = {
        isFocused: !1,
        isFileDialogActive: !1,
        isDragActive: !1,
        isDragAccept: !1,
        isDragReject: !1,
        draggedFiles: [],
        acceptedFiles: [],
        fileRejections: [],
      };
    function C() {
      E && (n(7, (E.value = null), E), (A.isFileDialogActive = !0), E.click());
    }
    function x(e) {
      return s ? null : e;
    }
    function _(e) {
      h && e.stopPropagation();
    }
    let S = [];
    return (
      U(() => {
        n(7, (E = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (r = e.accept)),
          "disabled" in e && n(22, (s = e.disabled)),
          "getFilesFromEvent" in e && n(23, (o = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (l = e.maxSize)),
          "minSize" in e && n(25, (c = e.minSize)),
          "multiple" in e && n(1, (d = e.multiple)),
          "preventDropOnDocument" in e && n(26, (u = e.preventDropOnDocument)),
          "noClick" in e && n(27, (p = e.noClick)),
          "noKeyboard" in e && n(28, (f = e.noKeyboard)),
          "noDrag" in e && n(29, (m = e.noDrag)),
          "noDragEventsBubbling" in e && n(30, (h = e.noDragEventsBubbling)),
          "containerClasses" in e && n(2, (g = e.containerClasses)),
          "containerStyles" in e && n(3, ($ = e.containerStyles)),
          "disableDefaultStyles" in e && n(4, (I = e.disableDefaultStyles)),
          "name" in e && n(5, (v = e.name)),
          "$$scope" in e && n(31, (a = e.$$scope));
      }),
      [
        r,
        d,
        g,
        $,
        I,
        v,
        y,
        E,
        function (e) {
          y &&
            y.isEqualNode(e.target) &&
            ((32 !== e.keyCode && 13 !== e.keyCode) ||
              (e.preventDefault(), C()));
        },
        function () {
          A.isFocused = !0;
        },
        function () {
          A.isFocused = !1;
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
              ? C()
              : setTimeout(C, 0));
        },
        function (e) {
          e.preventDefault(),
            _(e),
            (S = [...S, e.target]),
            Zo(e) &&
              Promise.resolve(o(e)).then((t) => {
                (Jo(e) && !h) ||
                  ((A.draggedFiles = t),
                  (A.isDragActive = !0),
                  b("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), _(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return Zo(e) && b("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), _(e);
          const t = S.filter((e) => y && y.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (S = t),
            t.length > 0 ||
              ((A.isDragActive = !1),
              (A.draggedFiles = []),
              Zo(e) && b("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            _(e),
            (S = []),
            Zo(e) &&
              (b("filedropped", { event: e }),
              Promise.resolve(o(e)).then((t) => {
                if (Jo(e) && !h) return;
                const n = [],
                  i = [];
                t.forEach((e) => {
                  const [t, a] = Yo(e, r),
                    [s, o] = (function (e, t, n) {
                      if (Qo(e.size))
                        if (Qo(t) && Qo(n)) {
                          if (e.size > n) return [!1, Ko(n)];
                          if (e.size < t) return [!1, Wo(t)];
                        } else {
                          if (Qo(t) && e.size < t) return [!1, Wo(t)];
                          if (Qo(n) && e.size > n) return [!1, Ko(n)];
                        }
                      return [!0, null];
                    })(e, c, l);
                  if (t && s) n.push(e);
                  else {
                    const t = [a, o].filter((e) => e);
                    i.push({ file: e, errors: t });
                  }
                }),
                  !d &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      i.push({ file: e, errors: [Xo] });
                    }),
                    n.splice(0)),
                  (A.acceptedFiles = n),
                  (A.fileRejections = i),
                  b("drop", { acceptedFiles: n, fileRejections: i, event: e }),
                  i.length > 0 &&
                    b("droprejected", { fileRejections: i, event: e }),
                  n.length > 0 &&
                    b("dropaccepted", { acceptedFiles: n, event: e });
              })),
            (A.isFileDialogActive = !1),
            (A.isDragActive = !1),
            (A.draggedFiles = []),
            (A.acceptedFiles = []),
            (A.fileRejections = []);
        },
        x,
        function (e) {
          return f ? null : x(e);
        },
        function (e) {
          return m ? null : x(e);
        },
        function (e) {
          u && e.preventDefault();
        },
        function (e) {
          u && ((y && y.contains(e.target)) || (e.preventDefault(), (S = [])));
        },
        function () {
          A.isFileDialogActive &&
            setTimeout(() => {
              if (E) {
                const { files: e } = E;
                e.length ||
                  ((A.isFileDialogActive = !1), b("filedialogcancel"));
              }
            }, 300);
        },
        s,
        o,
        l,
        c,
        u,
        p,
        f,
        m,
        h,
        a,
        i,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (E = e), n(7, E);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (y = e), n(6, y);
          });
        },
      ]
    );
  }
  class il extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          nl,
          el,
          s,
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
   */ var al = {
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
    rl = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    sl = { ANIM_END_LATCH_MS: 250 },
    ol = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = rl.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return al;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return rl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return sl;
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
            this.adapter.addClass(al.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(al.DISABLED)
              : this.adapter.removeClass(al.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, sl.ANIM_END_LATCH_MS)));
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
              var n = al.SELECTED;
              t === rl.TRANSITION_STATE_UNCHECKED
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
          var e = rl.TRANSITION_STATE_INDETERMINATE,
            t = rl.TRANSITION_STATE_CHECKED,
            n = rl.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var i = rl.TRANSITION_STATE_INIT,
            a = rl.TRANSITION_STATE_CHECKED,
            r = rl.TRANSITION_STATE_UNCHECKED,
            s = t.cssClasses,
            o = s.ANIM_UNCHECKED_CHECKED,
            l = s.ANIM_UNCHECKED_INDETERMINATE,
            c = s.ANIM_CHECKED_UNCHECKED,
            d = s.ANIM_CHECKED_INDETERMINATE,
            u = s.ANIM_INDETERMINATE_CHECKED,
            p = s.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case i:
              return n === r ? "" : n === a ? u : p;
            case r:
              return n === a ? o : l;
            case a:
              return n === r ? c : d;
            default:
              return n === a ? u : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                rl.ARIA_CHECKED_ATTR,
                rl.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(rl.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Ce);
  function ll(n) {
    let i,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      y,
      A,
      C,
      _,
      L = [
        { class: (o = Ge({ [n[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        n[20],
        { disabled: n[1] },
        { __value: (l = n[19](n[7]) ? n[6] : n[7]) },
        { "data-indeterminate": (c = !n[19](n[0]) && n[0] ? "true" : void 0) },
        n[16],
        Qe(n[26], "input$"),
      ],
      w = {};
    for (let e = 0; e < L.length; e += 1) w = t(w, L[e]);
    let D = [
        {
          class: (h = Ge({
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
        { style: (g = Object.entries(n[15]).map(cl).concat([n[4]]).join(" ")) },
        Ke(n[26], ["input$"]),
      ],
      N = {};
    for (let e = 0; e < D.length; e += 1) N = t(N, D[e]);
    return {
      c() {
        (i = E("div")),
          (s = E("input")),
          (u = x()),
          (p = E("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = x()),
          (m = E("div")),
          O(s, w),
          T(p, "class", "mdc-checkbox__background"),
          T(m, "class", "mdc-checkbox__ripple"),
          O(i, N);
      },
      m(e, t) {
        v(e, i, t),
          I(i, s),
          s.autofocus && s.focus(),
          n[36](s),
          (s.checked = n[12]),
          I(i, u),
          I(i, p),
          I(i, f),
          I(i, m),
          n[38](i),
          C ||
            ((_ = [
              $((d = Je.call(null, s, n[8]))),
              S(s, "change", n[37]),
              S(s, "blur", n[34]),
              S(s, "focus", n[35]),
              $((y = Je.call(null, i, n[2]))),
              $(n[18].call(null, i)),
              $(
                (A = ni.call(null, i, {
                  unbounded: !0,
                  addClass: n[23],
                  removeClass: n[24],
                  addStyle: n[25],
                  active: n[17],
                  eventTarget: n[11],
                }))
              ),
              S(i, "animationend", n[39]),
            ]),
            (C = !0));
      },
      p(e, t) {
        O(
          s,
          (w = ce(L, [
            512 & t[0] &&
              o !==
                (o = Ge({
                  [e[9]]: !0,
                  "mdc-checkbox__native-control": !0,
                })) && { class: o },
            { type: "checkbox" },
            e[20],
            2 & t[0] && { disabled: e[1] },
            192 & t[0] &&
              l !== (l = e[19](e[7]) ? e[6] : e[7]) && { __value: l },
            1 & t[0] &&
              c !== (c = !e[19](e[0]) && e[0] ? "true" : void 0) && {
                "data-indeterminate": c,
              },
            65536 & t[0] && e[16],
            67108864 & t[0] && Qe(e[26], "input$"),
          ]))
        ),
          d && r(d.update) && 256 & t[0] && d.update.call(null, e[8]),
          4096 & t[0] && (s.checked = e[12]),
          O(
            i,
            (N = ce(D, [
              16426 & t[0] &&
                h !==
                  (h = Ge({
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
                g !==
                  (g = Object.entries(e[15])
                    .map(cl)
                    .concat([e[4]])
                    .join(" ")) && { style: g },
              67108864 & t[0] && Ke(e[26], ["input$"]),
            ]))
          ),
          y && r(y.update) && 4 & t[0] && y.update.call(null, e[2]),
          A &&
            r(A.update) &&
            133120 & t[0] &&
            A.update.call(null, {
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
        e && b(i), n[36](null), n[38](null), (C = !1), a(_);
      },
    };
  }
  const cl = ([e, t]) => `${e}: ${t};`;
  function dl(e, n, i) {
    const a = [
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
    let r = m(n, a);
    var s;
    const o = Ye(F());
    let l = () => {};
    function c(e) {
      return e === l;
    }
    let d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { style: $ = "" } = n,
      { disabled: I = !1 } = n,
      { touch: v = !1 } = n,
      { indeterminate: b = l } = n,
      { group: y = l } = n,
      { checked: E = l } = n,
      { value: A = null } = n,
      { valueKey: C = l } = n,
      { input$use: x = [] } = n,
      { input$class: _ = "" } = n,
      S = {},
      T = {},
      O = {},
      L = !1,
      w = null !== (s = B("SMUI:generic:input:props")) && void 0 !== s ? s : {},
      D = c(y) ? !c(E) && (null != E ? E : void 0) : -1 !== y.indexOf(A),
      N = B("SMUI:checkbox:context"),
      M = B("SMUI:data-table:row:header"),
      R = E,
      U = c(y) ? [] : [...y],
      P = D;
    function H(e) {
      S[e] || i(14, (S[e] = !0), S);
    }
    function j(e) {
      (e in S && !S[e]) || i(14, (S[e] = !1), S);
    }
    function G(e, t) {
      O[e] !== t && i(16, (O[e] = t), O);
    }
    function q(e) {
      (e in O && null == O[e]) || i(16, (O[e] = void 0), O);
    }
    function K() {
      return d;
    }
    k(() => {
      i(11, (p.indeterminate = !c(b) && b), p),
        i(
          10,
          (u = new ol({
            addClass: H,
            forceLayout: () => d.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(d.parentNode),
            isChecked: () => null != D && D,
            isIndeterminate: () => !c(b) && b,
            removeClass: j,
            removeNativeControlAttr: q,
            setNativeControlAttr: G,
            setNativeControlDisabled: (e) => i(1, (I = e)),
          }))
        );
      const e = {
        _smui_checkbox_accessor: !0,
        get element() {
          return K();
        },
        get checked() {
          return null != D && D;
        },
        set checked(e) {
          D !== e && i(12, (D = e));
        },
        get indeterminate() {
          return !c(b) && b;
        },
        set indeterminate(e) {
          i(0, (b = e));
        },
        activateRipple() {
          I || i(17, (L = !0));
        },
        deactivateRipple() {
          i(17, (L = !1));
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
        (n = t(t({}, n), f(e))),
          i(26, (r = m(n, a))),
          "use" in e && i(2, (h = e.use)),
          "class" in e && i(3, (g = e.class)),
          "style" in e && i(4, ($ = e.style)),
          "disabled" in e && i(1, (I = e.disabled)),
          "touch" in e && i(5, (v = e.touch)),
          "indeterminate" in e && i(0, (b = e.indeterminate)),
          "group" in e && i(27, (y = e.group)),
          "checked" in e && i(28, (E = e.checked)),
          "value" in e && i(6, (A = e.value)),
          "valueKey" in e && i(7, (C = e.valueKey)),
          "input$use" in e && i(8, (x = e.input$use)),
          "input$class" in e && i(9, (_ = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!c(y))
            if (P !== D) {
              const t = y.indexOf(A);
              D && -1 === t
                ? (y.push(A),
                  i(27, y),
                  i(33, P),
                  i(12, D),
                  i(6, A),
                  i(32, U),
                  i(28, E),
                  i(31, R),
                  i(0, b),
                  i(11, p),
                  i(10, u))
                : D ||
                  -1 === t ||
                  (y.splice(t, 1),
                  i(27, y),
                  i(33, P),
                  i(12, D),
                  i(6, A),
                  i(32, U),
                  i(28, E),
                  i(31, R),
                  i(0, b),
                  i(11, p),
                  i(10, u)),
                (e = !0);
            } else {
              const t = U.indexOf(A),
                n = y.indexOf(A);
              t > -1 && -1 === n
                ? (i(12, (D = !1)), (e = !0))
                : n > -1 && -1 === t && (i(12, (D = !0)), (e = !0));
            }
          c(E)
            ? !!P != !!D && (e = !0)
            : E !== (null != D ? D : null) &&
              (E === R
                ? (i(28, (E = null != D ? D : null)), c(b) || i(0, (b = !1)))
                : i(12, (D = null != E ? E : void 0)),
              (e = !0)),
            p &&
              (c(b)
                ? p.indeterminate &&
                  (i(11, (p.indeterminate = !1), p), (e = !0))
                : !b && p.indeterminate
                ? (i(11, (p.indeterminate = !1), p), (e = !0))
                : b &&
                  !p.indeterminate &&
                  (i(11, (p.indeterminate = !0), p), (e = !0))),
            i(31, (R = E)),
            i(32, (U = c(y) ? [] : [...y])),
            i(33, (P = D)),
            e && u && u.handleChange();
        }
      }),
      [
        b,
        I,
        h,
        g,
        $,
        v,
        A,
        C,
        x,
        _,
        u,
        p,
        D,
        d,
        S,
        T,
        O,
        L,
        o,
        c,
        w,
        N,
        M,
        H,
        j,
        function (e, t) {
          T[e] != t &&
            ("" === t || null == t
              ? (delete T[e], i(15, T))
              : i(15, (T[e] = t), T));
        },
        r,
        y,
        E,
        function () {
          return w && w.id;
        },
        K,
        R,
        U,
        P,
        function (t) {
          V.call(this, e, t);
        },
        function (t) {
          V.call(this, e, t);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (p = e),
              i(11, p),
              i(27, y),
              i(33, P),
              i(12, D),
              i(6, A),
              i(32, U),
              i(28, E),
              i(31, R),
              i(0, b),
              i(10, u);
          });
        },
        function () {
          (D = this.checked),
            i(12, D),
            i(27, y),
            i(33, P),
            i(6, A),
            i(32, U),
            i(28, E),
            i(31, R),
            i(0, b),
            i(11, p),
            i(10, u);
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (d = e), i(13, d);
          });
        },
        () => u && u.handleAnimationEnd(),
      ]
    );
  }
  class ul extends ge {
    constructor(e) {
      super(),
        he(
          this,
          e,
          dl,
          ll,
          s,
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
   */ var pl = { ROOT: "mdc-form-field" },
    fl = { LABEL_SELECTOR: ".mdc-form-field > label" },
    ml = (function (e) {
      function t(n) {
        var i = e.call(this, ve(ve({}, t.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        Ie(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return pl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return fl;
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
  const hl = (e) => ({}),
    gl = (e) => ({});
  function $l(e) {
    let n, i, s, o, c, f, m, h, g;
    const y = e[13].default,
      A = l(y, e, e[12], null),
      C = e[13].label,
      _ = l(C, e, e[12], gl);
    let T = [{ for: e[4] }, Qe(e[10], "label$")],
      L = {};
    for (let e = 0; e < T.length; e += 1) L = t(L, T[e]);
    let w = [
        {
          class: (c = Ge({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        Ke(e[10], ["label$"]),
      ],
      D = {};
    for (let e = 0; e < w.length; e += 1) D = t(D, w[e]);
    return {
      c() {
        (n = E("div")),
          A && A.c(),
          (i = x()),
          (s = E("label")),
          _ && _.c(),
          O(s, L),
          O(n, D);
      },
      m(t, a) {
        v(t, n, a),
          A && A.m(n, null),
          I(n, i),
          I(n, s),
          _ && _.m(s, null),
          e[14](s),
          e[15](n),
          (m = !0),
          h ||
            ((g = [
              $((o = Je.call(null, s, e[5]))),
              $((f = Je.call(null, n, e[0]))),
              $(e[9].call(null, n)),
              S(n, "SMUIGenericInput:mount", e[16]),
              S(n, "SMUIGenericInput:unmount", e[17]),
            ]),
            (h = !0));
      },
      p(e, [t]) {
        A &&
          A.p &&
          (!m || 4096 & t) &&
          u(A, y, e, e[12], m ? d(y, e[12], t, null) : p(e[12]), null),
          _ &&
            _.p &&
            (!m || 4096 & t) &&
            u(_, C, e, e[12], m ? d(C, e[12], t, hl) : p(e[12]), gl),
          O(
            s,
            (L = ce(T, [
              (!m || 16 & t) && { for: e[4] },
              1024 & t && Qe(e[10], "label$"),
            ]))
          ),
          o && r(o.update) && 32 & t && o.update.call(null, e[5]),
          O(
            n,
            (D = ce(w, [
              (!m ||
                (14 & t &&
                  c !==
                    (c = Ge({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: c },
              1024 & t && Ke(e[10], ["label$"]),
            ]))
          ),
          f && r(f.update) && 1 & t && f.update.call(null, e[0]);
      },
      i(e) {
        m || (se(A, e), se(_, e), (m = !0));
      },
      o(e) {
        oe(A, e), oe(_, e), (m = !1);
      },
      d(t) {
        t && b(n),
          A && A.d(t),
          _ && _.d(t),
          e[14](null),
          e[15](null),
          (h = !1),
          a(g);
      },
    };
  }
  let Il = 0;
  function vl(e, n, i) {
    const a = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let r = m(n, a),
      { $$slots: s = {}, $$scope: o } = n;
    const l = Ye(F());
    let c,
      d,
      u,
      p,
      { use: h = [] } = n,
      { class: g = "" } = n,
      { align: $ = "start" } = n,
      { noWrap: I = !1 } = n,
      { inputId: v = "SMUI-form-field-" + Il++ } = n,
      { label$use: b = [] } = n;
    H("SMUI:generic:input:props", { id: v }),
      k(
        () => (
          (d = new ml({
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
        (n = t(t({}, n), f(e))),
          i(10, (r = m(n, a))),
          "use" in e && i(0, (h = e.use)),
          "class" in e && i(1, (g = e.class)),
          "align" in e && i(2, ($ = e.align)),
          "noWrap" in e && i(3, (I = e.noWrap)),
          "inputId" in e && i(4, (v = e.inputId)),
          "label$use" in e && i(5, (b = e.label$use)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        h,
        g,
        $,
        I,
        v,
        b,
        c,
        u,
        p,
        l,
        r,
        function () {
          return c;
        },
        o,
        s,
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (c = e), i(6, c);
          });
        },
        (e) => i(8, (p = e.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class bl extends ge {
    constructor(e) {
      super(),
        he(this, e, vl, $l, s, {
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
  function yl(e, t, n) {
    const i = e.slice();
    return (i[17] = t[n]), i;
  }
  function El(e, t, n) {
    const i = e.slice();
    return (i[17] = t[n]), i;
  }
  function Al(e) {
    let t, n;
    return (
      (t = new bl({
        props: { $$slots: { label: [Tl], default: [Sl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194308 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Cl(e) {
    let t, n;
    return (
      (t = new bl({
        props: { $$slots: { default: [Dl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function xl(e) {
    let t, n;
    return (
      (t = new bl({
        props: { $$slots: { default: [Nl] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function _l(e) {
    let t, n;
    return (
      (t = new bl({
        props: { $$slots: { default: [Ml] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194316 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Sl(e) {
    let t, n, i;
    function a(t) {
      e[14](t);
    }
    let r = { indeterminate: null === e[2] };
    return (
      void 0 !== e[2] && (r.checked = e[2]),
      (t = new ul({ props: r })),
      z.push(() => ue(t, "checked", a)),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, n) {
          fe(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          4 & i && (a.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (a.checked = e[2]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Tl(t) {
    let n;
    return {
      c() {
        (n = E("span")), (n.textContent = `${t[5]}`), T(n, "slot", "label");
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function Ol(t) {
    let n,
      i = t[17].name + "";
    return {
      c() {
        n = C(i);
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function Ll(e) {
    let t, n;
    return (
      (t = new Gs({
        props: {
          value: e[17].name,
          $$slots: { default: [Ol] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          4194304 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function wl(e) {
    let t,
      n,
      i = e[6],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Ll(El(e, i, t));
    const r = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = _();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let s;
          for (i = e[6], s = 0; s < i.length; s += 1) {
            const r = El(e, i, s);
            a[s]
              ? (a[s].p(r, n), se(a[s], 1))
              : ((a[s] = Ll(r)),
                a[s].c(),
                se(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ae(), s = i.length; s < a.length; s += 1) r(s);
          re();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) se(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function Dl(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[12](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[13](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new ul({ props: l })),
      z.push(() => ue(t, "checked", o));
    let d = { label: e[5], $$slots: { default: [wl] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new Bs({ props: d })),
      z.push(() => ue(a, "value", c)),
      {
        c() {
          pe(t.$$.fragment), (i = x()), pe(a.$$.fragment);
        },
        m(e, n) {
          fe(t, e, n), v(e, i, n), fe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Q(() => (n = !1))),
            t.$set(s);
          const o = {};
          4194304 & i && (o.$$scope = { dirty: i, ctx: e }),
            !r && 8 & i && ((r = !0), (o.value = e[3]), Q(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          me(t, e), e && b(i), me(a, e);
        },
      }
    );
  }
  function Nl(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[10](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[11](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new ul({ props: l })),
      z.push(() => ue(t, "checked", o));
    let d = { label: e[5], type: "number" };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new xa({ props: d })),
      z.push(() => ue(a, "value", c)),
      {
        c() {
          pe(t.$$.fragment), (i = x()), pe(a.$$.fragment);
        },
        m(e, n) {
          fe(t, e, n), v(e, i, n), fe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Q(() => (n = !1))),
            t.$set(s);
          const o = {};
          !r && 8 & i && ((r = !0), (o.value = e[3]), Q(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          me(t, e), e && b(i), me(a, e);
        },
      }
    );
  }
  function Ml(e) {
    let t, n, i, a, r, s;
    function o(t) {
      e[8](t);
    }
    let l = { indeterminate: null === e[2] };
    function c(t) {
      e[9](t);
    }
    void 0 !== e[2] && (l.checked = e[2]),
      (t = new ul({ props: l })),
      z.push(() => ue(t, "checked", o));
    let d = { label: e[5] };
    return (
      void 0 !== e[3] && (d.value = e[3]),
      (a = new xa({ props: d })),
      z.push(() => ue(a, "value", c)),
      {
        c() {
          pe(t.$$.fragment), (i = x()), pe(a.$$.fragment);
        },
        m(e, n) {
          fe(t, e, n), v(e, i, n), fe(a, e, n), (s = !0);
        },
        p(e, i) {
          const s = {};
          4 & i && (s.indeterminate = null === e[2]),
            !n && 4 & i && ((n = !0), (s.checked = e[2]), Q(() => (n = !1))),
            t.$set(s);
          const o = {};
          !r && 8 & i && ((r = !0), (o.value = e[3]), Q(() => (r = !1))),
            a.$set(o);
        },
        i(e) {
          s || (se(t.$$.fragment, e), se(a.$$.fragment, e), (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(a.$$.fragment, e), (s = !1);
        },
        d(e) {
          me(t, e), e && b(i), me(a, e);
        },
      }
    );
  }
  function Rl(e) {
    let t,
      n,
      i,
      a,
      r,
      s,
      o = e[1] && Fl(e);
    return {
      c() {
        (t = E("div")),
          (t.textContent = "▶"),
          (n = x()),
          o && o.c(),
          (i = _()),
          T(t, "class", "arrow svelte-7av3ky"),
          N(t, "arrowDown", e[4]);
      },
      m(l, c) {
        v(l, t, c),
          v(l, n, c),
          o && o.m(l, c),
          v(l, i, c),
          (a = !0),
          r || ((s = S(t, "click", e[7])), (r = !0));
      },
      p(e, n) {
        16 & n && N(t, "arrowDown", e[4]),
          e[1]
            ? o
              ? (o.p(e, n), 2 & n && se(o, 1))
              : ((o = Fl(e)), o.c(), se(o, 1), o.m(i.parentNode, i))
            : o &&
              (ae(),
              oe(o, 1, 1, () => {
                o = null;
              }),
              re());
      },
      i(e) {
        a || (se(o), (a = !0));
      },
      o(e) {
        oe(o), (a = !1);
      },
      d(e) {
        e && b(t), e && b(n), o && o.d(e), e && b(i), (r = !1), s();
      },
    };
  }
  function Fl(e) {
    let t,
      n,
      i = e[6],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = kl(yl(e, i, t));
    const r = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = _();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (64 & n) {
          let s;
          for (i = e[6], s = 0; s < i.length; s += 1) {
            const r = yl(e, i, s);
            a[s]
              ? (a[s].p(r, n), se(a[s], 1))
              : ((a[s] = kl(r)),
                a[s].c(),
                se(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ae(), s = i.length; s < a.length; s += 1) r(s);
          re();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) se(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function kl(t) {
    let n, i;
    return (
      (n = new Bl({ props: { tree: t[17] } })),
      n.$on("change", t[15]),
      {
        c() {
          pe(n.$$.fragment);
        },
        m(e, t) {
          fe(n, e, t), (i = !0);
        },
        p: e,
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
  function Ul(e) {
    let t, n, i, a, r, s;
    const o = [_l, xl, Cl, Al],
      l = [];
    function c(e, t) {
      return "TextField" === e[0].type
        ? 0
        : "IntegerField" === e[0].type
        ? 1
        : "EnumField" === e[0].type
        ? 2
        : 3;
    }
    (i = c(e)), (a = l[i] = o[i](e));
    let d = e[6].length > 0 && "EnumField" !== e[0].type && Rl(e);
    return {
      c() {
        (t = E("ul")),
          (n = E("li")),
          a.c(),
          (r = x()),
          d && d.c(),
          T(t, "class", "svelte-7av3ky");
      },
      m(e, a) {
        v(e, t, a),
          I(t, n),
          l[i].m(n, null),
          I(n, r),
          d && d.m(n, null),
          (s = !0);
      },
      p(e, [t]) {
        let s = i;
        (i = c(e)),
          i === s
            ? l[i].p(e, t)
            : (ae(),
              oe(l[s], 1, 1, () => {
                l[s] = null;
              }),
              re(),
              (a = l[i]),
              a ? a.p(e, t) : ((a = l[i] = o[i](e)), a.c()),
              se(a, 1),
              a.m(n, r)),
          e[6].length > 0 && "EnumField" !== e[0].type
            ? d
              ? (d.p(e, t), 1 & t && se(d, 1))
              : ((d = Rl(e)), d.c(), se(d, 1), d.m(n, null))
            : d &&
              (ae(),
              oe(d, 1, 1, () => {
                d = null;
              }),
              re());
      },
      i(e) {
        s || (se(a), se(d), (s = !0));
      },
      o(e) {
        oe(a), oe(d), (s = !1);
      },
      d(e) {
        e && b(t), l[i].d(), d && d.d();
      },
    };
  }
  const Pl = {};
  function Hl(e, t, n) {
    let i,
      { tree: a } = t;
    const { name: r, children: s } = a;
    let o = Pl[r] || !1;
    let l = void 0 !== a.selected && a.selected,
      c = null;
    const d = P();
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (a = e.tree));
      }),
      (e.$$.update = () => {
        2 & e.$$.dirty && n(4, (i = o)),
          13 & e.$$.dirty &&
            (console.log("checked:", l),
            n(0, (a.selected = l), a),
            n(0, (a.value = c), a),
            d("change", { tree: a }));
      }),
      [
        a,
        o,
        l,
        c,
        i,
        r,
        s,
        () => {
          n(1, (o = Pl[r] = !o));
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (c = e), n(3, c);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (t) {
          V.call(this, e, t);
        },
      ]
    );
  }
  class Bl extends ge {
    constructor(e) {
      super(), he(this, e, Hl, Ul, s, { tree: 0 });
    }
  }
  function Vl(e, t, n) {
    const i = e.slice();
    return (i[3] = t[n]), i;
  }
  function jl(e) {
    let t, n;
    return (
      (t = new Bl({ props: { tree: e[3] } })),
      t.$on("change", e[1]),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          1 & n && (i.tree = e[3]), t.$set(i);
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
  function zl(e) {
    let t,
      n,
      i = e[0],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = jl(Vl(e, i, t));
    const r = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        t = E("main");
        for (let e = 0; e < a.length; e += 1) a[e].c();
      },
      m(e, i) {
        v(e, t, i);
        for (let e = 0; e < a.length; e += 1) a[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let s;
          for (i = e[0], s = 0; s < i.length; s += 1) {
            const r = Vl(e, i, s);
            a[s]
              ? (a[s].p(r, n), se(a[s], 1))
              : ((a[s] = jl(r)), a[s].c(), se(a[s], 1), a[s].m(t, null));
          }
          for (ae(), s = i.length; s < a.length; s += 1) r(s);
          re();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) se(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        e && b(t), y(a, e);
      },
    };
  }
  function Gl(e) {
    const t = e.children.flatMap(Gl);
    return e.selected && t.push(e), t;
  }
  function ql(e, t, n) {
    let { trees: i } = t;
    const a = P();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (i = e.trees));
      }),
      [
        i,
        function () {
          const e = i.flatMap(Gl);
          a("change", { filterTags: e });
        },
      ]
    );
  }
  class Kl extends ge {
    constructor(e) {
      super(), he(this, e, ql, zl, s, { trees: 0 });
    }
  }
  class Wl {
    constructor(e, t) {
      (this._value = e), (this._error = t);
    }
    map(e) {
      if (this._error) return new Wl(null, this._error);
      {
        const t = e(this._value);
        return new Wl(t, null);
      }
    }
    mapError(e) {
      if (this._error) {
        const t = e(this._error);
        return new Wl(null, t);
      }
      return new Wl(this._value, null);
    }
    unwrap() {
      if (this._error) throw this._error;
      return this._value;
    }
  }
  class Xl {
    constructor() {
      const e = window.location.href.split("/");
      e.pop(), e.pop(), (this.baseUrl = e.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      const e = (await this._fetchJson(this.baseUrl)).mapError(
          (e) => new Jl(e.message)
        ),
        t = await e.unwrap();
      return (
        (n = (e) =>
          class {
            static tryFrom(e) {
              if (e.displayName) return e;
              console.log("Found malformed data. Filtering out. Data:", e);
            }
          }.tryFrom(e)),
        t.reduce((e, t) => {
          const i = n(t);
          return void 0 !== i && e.push(i), e;
        }, [])
      );
      var n;
    }
    async getDownloadUrl(e, ...t) {
      const n = `ids=${encodeURIComponent(JSON.stringify(t))}`;
      return this.baseUrl + e + `/download?${n}`;
    }
    async readFile(e) {
      return new Promise((t, n) => {
        const i = new FileReader();
        (i.onload = () =>
          i.error ? (console.log("error:", i.error), n(i.error)) : t(i.result)),
          i.readAsArrayBuffer(e);
      });
    }
    async pushArtifact(e, t) {
      console.log("Uploading to", t, e.name);
      const n = {
        method: "PUT",
        headers: {
          Accept: "application/xml",
          "Content-Type": "application/octet-stream",
          "x-ms-blob-type": "BlockBlob",
          "x-ms-encryption-algorithm": "AES256",
        },
        body: await this.readFile(e),
      };
      return (await this._fetch(t, n))
        .mapError((e) => new ec(e.message))
        .unwrap();
    }
    async appendArtifact(e, t) {
      const n = { displayName: e.displayName, taxonomyTags: e.taxonomyTags };
      console.log({ action: "append", metadata: n, files: t });
      const i = `${this.baseUrl}${e.parentId}/${e.id}/uploadUrl`,
        a = t.map((e) => e.name),
        r = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: n, filenames: a }),
        },
        s = (
          await (await this._fetchJson(i, r))
            .mapError((e) => new ec(e.message))
            .unwrap()
        ).map(async (e) => {
          const n = e.name.substring(4),
            i = t.find((e) => e.name == n);
          !(function (e, t) {
            if (!e) throw t;
          })(!!i, new ec("Could not find upload URL for " + n)),
            await this.pushArtifact(i, e.sasUrl);
        });
      await Promise.all(s), console.log("Append artifact:", n, t);
    }
    async updateArtifact(e, t) {
      console.log("Updating artifact:", e, t);
    }
    async createArtifact(e, t) {
      console.log("Creating artifact:", e, t);
      const n = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metadata: e }),
      };
      return (await this._fetchJson(this.baseUrl, n))
        .mapError((e) => new Zl(e.message))
        .unwrap();
    }
    async _fetch(e, t = null) {
      const n = await fetch(e, t);
      let i = null;
      return n.status > 399 && (i = new Yl(await n.text())), new Wl(n, i);
    }
    async _fetchJson(e, t = null) {
      return (await this._fetch(e, t)).map((e) => e.json());
    }
  }
  class Yl extends Error {
    constructor(e) {
      super(e);
    }
  }
  class Ql extends Yl {
    constructor(e, t) {
      super(`Unable to ${e}: ${t}`);
    }
  }
  class Jl extends Ql {
    constructor(e) {
      super("list artifacts", e);
    }
  }
  class Zl extends Ql {
    constructor(e) {
      super("create", e);
    }
  }
  class ec extends Ql {
    constructor(e) {
      super("append", e);
    }
  }
  const { document: tc } = le;
  function nc(e, t, n) {
    const i = e.slice();
    return (i[55] = t[n]), i;
  }
  function ic(e, t, n) {
    const i = e.slice();
    return (i[55] = t[n]), i;
  }
  function ac(e, t, n) {
    const i = e.slice();
    return (i[65] = t[n]), i;
  }
  function rc(t) {
    let n,
      i,
      a = (t[21] && t[21].displayName) + "";
    return {
      c() {
        (n = C("Download ")), (i = C(a));
      },
      m(e, t) {
        v(e, n, t), v(e, i, t);
      },
      p: e,
      d(e) {
        e && b(n), e && b(i);
      },
    };
  }
  function sc(e) {
    let t;
    return {
      c() {
        t = C("All Data");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function oc(e) {
    let t;
    return {
      c() {
        t = C("Latest Data");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function lc(e) {
    let t, n, i, a;
    return (
      (t = new Gs({
        props: {
          value: "all",
          $$slots: { default: [sc] },
          $$scope: { ctx: e },
        },
      })),
      (i = new Gs({
        props: {
          value: "latest",
          $$slots: { default: [oc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          64 & n[2] && (r.$$scope = { dirty: n, ctx: e }), i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function cc(e) {
    let t, n, i, a, r;
    function s(t) {
      e[23](t);
    }
    let o = { $$slots: { default: [lc] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[14] && (o.value = e[14]),
      (i = new Bs({ props: o })),
      z.push(() => ue(i, "value", s)),
      {
        c() {
          (t = E("p")),
            (t.textContent = "What uploads would you like to download?"),
            (n = x()),
            pe(i.$$.fragment),
            T(t, "class", "svelte-1l4jzu8");
        },
        m(e, a) {
          v(e, t, a), v(e, n, a), fe(i, e, a), (r = !0);
        },
        p(e, t) {
          const n = {};
          64 & t[2] && (n.$$scope = { dirty: t, ctx: e }),
            !a &&
              16384 & t[0] &&
              ((a = !0), (n.value = e[14]), Q(() => (a = !1))),
            i.$set(n);
        },
        i(e) {
          r || (se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && b(t), e && b(n), me(i, e);
        },
      }
    );
  }
  function dc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function uc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [dc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function pc(e) {
    let t;
    return {
      c() {
        t = C("Download");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function fc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [pc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function mc(e) {
    let t, n, i, a;
    return (
      (t = new wo({
        props: { $$slots: { default: [uc] }, $$scope: { ctx: e } },
      })),
      (i = new wo({
        props: { $$slots: { default: [fc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[24]),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          64 & n[2] && (r.$$scope = { dirty: n, ctx: e }), i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function hc(e) {
    let t, n, i, a, r, s;
    return (
      (t = new so({
        props: { id: "title", $$slots: { default: [rc] }, $$scope: { ctx: e } },
      })),
      (i = new oo({
        props: {
          id: "content",
          $$slots: { default: [cc] },
          $$scope: { ctx: e },
        },
      })),
      (r = new lo({
        props: { $$slots: { default: [mc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment),
            (n = x()),
            pe(i.$$.fragment),
            (a = x()),
            pe(r.$$.fragment);
        },
        m(e, o) {
          fe(t, e, o),
            v(e, n, o),
            fe(i, e, o),
            v(e, a, o),
            fe(r, e, o),
            (s = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          (16384 & n[0]) | (64 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
          const o = {};
          64 & n[2] && (o.$$scope = { dirty: n, ctx: e }), r.$set(o);
        },
        i(e) {
          s ||
            (se(t.$$.fragment, e),
            se(i.$$.fragment, e),
            se(r.$$.fragment, e),
            (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(r.$$.fragment, e),
            (s = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e), e && b(a), me(r, e);
        },
      }
    );
  }
  function gc(e) {
    let t,
      n,
      i = (e[10] && e[10].displayName) + "";
    return {
      c() {
        (t = C("Append data to ")), (n = C(i));
      },
      m(e, i) {
        v(e, t, i), v(e, n, i);
      },
      p(e, t) {
        1024 & t[0] && i !== (i = (e[10] && e[10].displayName) + "") && L(n, i);
      },
      d(e) {
        e && b(t), e && b(n);
      },
    };
  }
  function $c(e) {
    let t,
      n,
      i = e[65].name + "";
    return {
      c() {
        (t = E("li")), (n = C(i)), T(t, "class", "svelte-1l4jzu8");
      },
      m(e, i) {
        v(e, t, i), I(t, n);
      },
      p(e, t) {
        512 & t[0] && i !== (i = e[65].name + "") && L(n, i);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Ic(t) {
    let n;
    return {
      c() {
        (n = E("p")),
          (n.textContent = "Select dataset to upload."),
          T(n, "class", "svelte-1l4jzu8");
      },
      m(e, t) {
        v(e, n, t);
      },
      p: e,
      d(e) {
        e && b(n);
      },
    };
  }
  function vc(e) {
    let t,
      n,
      i,
      a,
      r,
      s,
      o = e[9],
      l = [];
    for (let t = 0; t < o.length; t += 1) l[t] = $c(ac(e, o, t));
    return (
      (r = new il({
        props: {
          multiple: !0,
          $$slots: { default: [Ic] },
          $$scope: { ctx: e },
        },
      })),
      r.$on("drop", e[18]),
      {
        c() {
          (t = E("p")),
            (t.textContent = "Dataset files:"),
            (n = x()),
            (i = E("ul"));
          for (let e = 0; e < l.length; e += 1) l[e].c();
          (a = x()),
            pe(r.$$.fragment),
            T(t, "class", "svelte-1l4jzu8"),
            T(i, "class", "svelte-1l4jzu8");
        },
        m(e, o) {
          v(e, t, o), v(e, n, o), v(e, i, o);
          for (let e = 0; e < l.length; e += 1) l[e].m(i, null);
          v(e, a, o), fe(r, e, o), (s = !0);
        },
        p(e, t) {
          if (512 & t[0]) {
            let n;
            for (o = e[9], n = 0; n < o.length; n += 1) {
              const a = ac(e, o, n);
              l[n] ? l[n].p(a, t) : ((l[n] = $c(a)), l[n].c(), l[n].m(i, null));
            }
            for (; n < l.length; n += 1) l[n].d(1);
            l.length = o.length;
          }
          const n = {};
          64 & t[2] && (n.$$scope = { dirty: t, ctx: e }), r.$set(n);
        },
        i(e) {
          s || (se(r.$$.fragment, e), (s = !0));
        },
        o(e) {
          oe(r.$$.fragment, e), (s = !1);
        },
        d(e) {
          e && b(t), e && b(n), e && b(i), y(l, e), e && b(a), me(r, e);
        },
      }
    );
  }
  function bc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function yc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [bc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Ec(e) {
    let t;
    return {
      c() {
        t = C("Upload");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Ac(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [Ec] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Cc(e) {
    let t, n, i, a;
    return (
      (t = new wo({
        props: { $$slots: { default: [yc] }, $$scope: { ctx: e } },
      })),
      (i = new wo({
        props: { $$slots: { default: [Ac] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[26]),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          64 & n[2] && (r.$$scope = { dirty: n, ctx: e }), i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function xc(e) {
    let t, n, i, a, r, s;
    return (
      (t = new so({
        props: { id: "title", $$slots: { default: [gc] }, $$scope: { ctx: e } },
      })),
      (i = new oo({
        props: {
          id: "content",
          $$slots: { default: [vc] },
          $$scope: { ctx: e },
        },
      })),
      (r = new lo({
        props: { $$slots: { default: [Cc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment),
            (n = x()),
            pe(i.$$.fragment),
            (a = x()),
            pe(r.$$.fragment);
        },
        m(e, o) {
          fe(t, e, o),
            v(e, n, o),
            fe(i, e, o),
            v(e, a, o),
            fe(r, e, o),
            (s = !0);
        },
        p(e, n) {
          const a = {};
          (1024 & n[0]) | (64 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const s = {};
          (512 & n[0]) | (64 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
          const o = {};
          64 & n[2] && (o.$$scope = { dirty: n, ctx: e }), r.$set(o);
        },
        i(e) {
          s ||
            (se(t.$$.fragment, e),
            se(i.$$.fragment, e),
            se(r.$$.fragment, e),
            (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(r.$$.fragment, e),
            (s = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e), e && b(a), me(r, e);
        },
      }
    );
  }
  function _c(e) {
    let t;
    return {
      c() {
        t = C("Create new dataset");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Sc(e) {
    let t, n, i;
    function a(t) {
      e[28](t);
    }
    let r = { label: "Name" };
    return (
      void 0 !== e[12] && (r.value = e[12]),
      (t = new xa({ props: r })),
      z.push(() => ue(t, "value", a)),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, n) {
          fe(t, e, n), (i = !0);
        },
        p(e, i) {
          const a = {};
          !n && 4096 & i[0] && ((n = !0), (a.value = e[12]), Q(() => (n = !1))),
            t.$set(a);
        },
        i(e) {
          i || (se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          me(t, e);
        },
      }
    );
  }
  function Tc(e) {
    let t;
    return {
      c() {
        t = C("Cancel");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Oc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [Tc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Lc(e) {
    let t;
    return {
      c() {
        t = C("Submit");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function wc(e) {
    let t, n;
    return (
      (t = new Zn({
        props: { $$slots: { default: [Lc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Dc(e) {
    let t, n, i, a;
    return (
      (t = new wo({
        props: { $$slots: { default: [Oc] }, $$scope: { ctx: e } },
      })),
      (i = new wo({
        props: { $$slots: { default: [wc] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[29]),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const r = {};
          64 & n[2] && (r.$$scope = { dirty: n, ctx: e }), i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function Nc(e) {
    let t, n, i, a, r, s;
    return (
      (t = new so({
        props: { id: "title", $$slots: { default: [_c] }, $$scope: { ctx: e } },
      })),
      (i = new oo({
        props: {
          id: "content",
          $$slots: { default: [Sc] },
          $$scope: { ctx: e },
        },
      })),
      (r = new lo({
        props: { $$slots: { default: [Dc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment),
            (n = x()),
            pe(i.$$.fragment),
            (a = x()),
            pe(r.$$.fragment);
        },
        m(e, o) {
          fe(t, e, o),
            v(e, n, o),
            fe(i, e, o),
            v(e, a, o),
            fe(r, e, o),
            (s = !0);
        },
        p(e, n) {
          const a = {};
          64 & n[2] && (a.$$scope = { dirty: n, ctx: e }), t.$set(a);
          const s = {};
          (4096 & n[0]) | (64 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
          const o = {};
          64 & n[2] && (o.$$scope = { dirty: n, ctx: e }), r.$set(o);
        },
        i(e) {
          s ||
            (se(t.$$.fragment, e),
            se(i.$$.fragment, e),
            se(r.$$.fragment, e),
            (s = !0));
        },
        o(e) {
          oe(t.$$.fragment, e),
            oe(i.$$.fragment, e),
            oe(r.$$.fragment, e),
            (s = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e), e && b(a), me(r, e);
        },
      }
    );
  }
  function Mc(e) {
    let t;
    return {
      c() {
        t = C(e[0]);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, n) {
        1 & n[0] && L(t, e[0]);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Rc(e) {
    let t, n;
    return (
      (t = new qt({
        props: { $$slots: { default: [Mc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1 & n[0]) | (64 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
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
  function Fc(e) {
    let t;
    return {
      c() {
        t = C("file_upload");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function kc(e) {
    let t, n;
    return (
      (t = new Ma({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [Fc] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[31]),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
  function Uc(e) {
    let t, n, i, a;
    return (
      (t = new Kt({
        props: { $$slots: { default: [Rc] }, $$scope: { ctx: e } },
      })),
      (i = new Kt({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [kc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          (1 & n[0]) | (64 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (2048 & n[0]) | (64 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function Pc(e) {
    let t, n;
    return (
      (t = new jt({
        props: { $$slots: { default: [Uc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (2049 & n[0]) | (64 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
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
  function Hc(e) {
    let t, n;
    return (
      (t = new Rr({ props: { indeterminate: !0 } })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
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
  function Bc(e) {
    let t;
    return {
      c() {
        t = C("close");
      },
      m(e, n) {
        v(e, t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Vc(e) {
    let t, n;
    return (
      (t = new Ma({
        props: {
          class: "material-icons",
          title: "Dismiss",
          $$slots: { default: [Bc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          64 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
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
    let t, n, i, a;
    return (
      (t = new Zn({})),
      (i = new xo({
        props: { $$slots: { default: [Vc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, t) {
          const n = {};
          64 & t[2] && (n.$$scope = { dirty: t, ctx: e }), i.$set(n);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function zc(e) {
    let t, n, i, a, r, s, o;
    function l(t) {
      e[33](t);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== e[2] && (c.value = e[2]),
      (t = new xa({ props: c })),
      z.push(() => ue(t, "value", l)),
      (s = new Kl({ props: { trees: e[6] } })),
      s.$on("change", e[34]),
      {
        c() {
          pe(t.$$.fragment),
            (i = x()),
            (a = E("span")),
            (a.textContent = "Advanced Filters"),
            (r = x()),
            pe(s.$$.fragment),
            T(a, "class", "filter-header svelte-1l4jzu8");
        },
        m(e, n) {
          fe(t, e, n),
            v(e, i, n),
            v(e, a, n),
            v(e, r, n),
            fe(s, e, n),
            (o = !0);
        },
        p(e, i) {
          const a = {};
          !n && 4 & i[0] && ((n = !0), (a.value = e[2]), Q(() => (n = !1))),
            t.$set(a);
          const r = {};
          64 & i[0] && (r.trees = e[6]), s.$set(r);
        },
        i(e) {
          o || (se(t.$$.fragment, e), se(s.$$.fragment, e), (o = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(s.$$.fragment, e), (o = !1);
        },
        d(e) {
          me(t, e), e && b(i), e && b(a), e && b(r), me(s, e);
        },
      }
    );
  }
  function Gc(e) {
    let t, n;
    return (
      (t = new vr({
        props: { $$slots: { default: [zc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (76 & n[0]) | (64 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
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
  function qc(e) {
    let t,
      n = e[55].displayName + "";
    return {
      c() {
        t = C(n);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, i) {
        32768 & i[0] && n !== (n = e[55].displayName + "") && L(t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Kc(e) {
    let t, n, i, s, o;
    return {
      c() {
        (t = E("a")),
          (t.textContent = "Download"),
          (n = x()),
          (i = E("a")),
          (i.textContent = "Append Data"),
          D(t, "margin-right", "15px"),
          T(t, "class", "svelte-1l4jzu8"),
          D(i, "margin-right", "15px"),
          T(i, "class", "svelte-1l4jzu8");
      },
      m(a, l) {
        v(a, t, l),
          v(a, n, l),
          v(a, i, l),
          s ||
            ((o = [
              S(t, "click", e[35]),
              S(i, "click", function () {
                r(e[17](e[55])) && e[17](e[55]).apply(this, arguments);
              }),
            ]),
            (s = !0));
      },
      p(t, n) {
        e = t;
      },
      d(e) {
        e && b(t), e && b(n), e && b(i), (s = !1), a(o);
      },
    };
  }
  function Wc(e) {
    let t, n, i, a;
    return (
      (t = new rr({
        props: { $$slots: { default: [qc] }, $$scope: { ctx: e } },
      })),
      (i = new sr({
        props: { $$slots: { default: [Kc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          (32768 & n[0]) | (64 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (40960 & n[0]) | (64 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function Xc(e) {
    let t, n, i, a;
    return (
      (t = new ar({
        props: { $$slots: { default: [Wc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), (i = x());
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), v(e, i, r), (a = !0);
        },
        p(e, n) {
          const i = {};
          (40960 & n[0]) | (64 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          a || (se(t.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), e && b(i);
        },
      }
    );
  }
  function Yc(e) {
    let t, n;
    return (
      (t = new cr({
        props: { $$slots: { default: [Xc] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", function () {
        return e[36](e[55]);
      }),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(n, i) {
          e = n;
          const a = {};
          (40960 & i[0]) | (64 & i[2]) && (a.$$scope = { dirty: i, ctx: e }),
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
  function Qc(e) {
    let t,
      n,
      i = e[15],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = Yc(ic(e, i, t));
    const r = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = _();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (237568 & n[0]) {
          let s;
          for (i = e[15], s = 0; s < i.length; s += 1) {
            const r = ic(e, i, s);
            a[s]
              ? (a[s].p(r, n), se(a[s], 1))
              : ((a[s] = Yc(r)),
                a[s].c(),
                se(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ae(), s = i.length; s < a.length; s += 1) r(s);
          re();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) se(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function Jc(e) {
    let t,
      n = e[55].displayName + "";
    return {
      c() {
        t = C(n);
      },
      m(e, n) {
        v(e, t, n);
      },
      p(e, i) {
        2 & i[0] && n !== (n = e[55].displayName + "") && L(t, n);
      },
      d(e) {
        e && b(t);
      },
    };
  }
  function Zc(e) {
    let t, n, i, s, o;
    return {
      c() {
        (t = E("a")),
          (t.textContent = "Download"),
          (n = x()),
          (i = E("a")),
          (i.textContent = "Append Data"),
          D(t, "margin-right", "15px"),
          T(t, "class", "svelte-1l4jzu8"),
          D(i, "margin-right", "15px"),
          T(i, "class", "svelte-1l4jzu8");
      },
      m(a, l) {
        v(a, t, l),
          v(a, n, l),
          v(a, i, l),
          s ||
            ((o = [
              S(t, "click", function () {
                r(onDownloadItem(e[55])) &&
                  onDownloadItem(e[55]).apply(this, arguments);
              }),
              S(i, "click", function () {
                r(e[17](e[55])) && e[17](e[55]).apply(this, arguments);
              }),
            ]),
            (s = !0));
      },
      p(t, n) {
        e = t;
      },
      d(e) {
        e && b(t), e && b(n), e && b(i), (s = !1), a(o);
      },
    };
  }
  function ed(e) {
    let t, n, i, a;
    return (
      (t = new rr({
        props: { $$slots: { default: [Jc] }, $$scope: { ctx: e } },
      })),
      (i = new sr({
        props: { $$slots: { default: [Zc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), pe(i.$$.fragment);
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), fe(i, e, r), (a = !0);
        },
        p(e, n) {
          const a = {};
          (2 & n[0]) | (64 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            t.$set(a);
          const r = {};
          (2 & n[0]) | (64 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            i.$set(r);
        },
        i(e) {
          a || (se(t.$$.fragment, e), se(i.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), oe(i.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), me(i, e);
        },
      }
    );
  }
  function td(e) {
    let t, n, i, a;
    return (
      (t = new ar({
        props: { $$slots: { default: [ed] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          pe(t.$$.fragment), (n = x()), (i = x());
        },
        m(e, r) {
          fe(t, e, r), v(e, n, r), v(e, i, r), (a = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (64 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          a || (se(t.$$.fragment, e), (a = !0));
        },
        o(e) {
          oe(t.$$.fragment, e), (a = !1);
        },
        d(e) {
          me(t, e), e && b(n), e && b(i);
        },
      }
    );
  }
  function nd(e) {
    let t, n;
    return (
      (t = new cr({
        props: { $$slots: { default: [td] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", function () {
        return e[37](e[55]);
      }),
      {
        c() {
          pe(t.$$.fragment);
        },
        m(e, i) {
          fe(t, e, i), (n = !0);
        },
        p(n, i) {
          e = n;
          const a = {};
          (2 & i[0]) | (64 & i[2]) && (a.$$scope = { dirty: i, ctx: e }),
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
  function id(e) {
    let t,
      n,
      i = e[1],
      a = [];
    for (let t = 0; t < i.length; t += 1) a[t] = nd(nc(e, i, t));
    const r = (e) =>
      oe(a[e], 1, 1, () => {
        a[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < a.length; e += 1) a[e].c();
        t = _();
      },
      m(e, i) {
        for (let t = 0; t < a.length; t += 1) a[t].m(e, i);
        v(e, t, i), (n = !0);
      },
      p(e, n) {
        if (196610 & n[0]) {
          let s;
          for (i = e[1], s = 0; s < i.length; s += 1) {
            const r = nc(e, i, s);
            a[s]
              ? (a[s].p(r, n), se(a[s], 1))
              : ((a[s] = nd(r)),
                a[s].c(),
                se(a[s], 1),
                a[s].m(t.parentNode, t));
          }
          for (ae(), s = i.length; s < a.length; s += 1) r(s);
          re();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) se(a[e]);
          n = !0;
        }
      },
      o(e) {
        a = a.filter(Boolean);
        for (let e = 0; e < a.length; e += 1) oe(a[e]);
        n = !1;
      },
      d(e) {
        y(a, e), e && b(t);
      },
    };
  }
  function ad(e) {
    let t, n, i, a, r;
    return (
      (n = new Qa({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [Qc] },
          $$scope: { ctx: e },
        },
      })),
      (a = new Qa({
        props: {
          twoLine: !0,
          avatarList: !0,
          $$slots: { default: [id] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = E("main")),
            pe(n.$$.fragment),
            (i = x()),
            pe(a.$$.fragment),
            T(t, "class", "svelte-1l4jzu8");
        },
        m(e, s) {
          v(e, t, s), fe(n, t, null), I(t, i), fe(a, t, null), (r = !0);
        },
        p(e, t) {
          const i = {};
          (40960 & t[0]) | (64 & t[2]) && (i.$$scope = { dirty: t, ctx: e }),
            n.$set(i);
          const r = {};
          (2 & t[0]) | (64 & t[2]) && (r.$$scope = { dirty: t, ctx: e }),
            a.$set(r);
        },
        i(e) {
          r || (se(n.$$.fragment, e), se(a.$$.fragment, e), (r = !0));
        },
        o(e) {
          oe(n.$$.fragment, e), oe(a.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && b(t), me(n), me(a);
        },
      }
    );
  }
  function rd(e) {
    let t,
      n,
      i,
      a,
      r,
      s,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      m,
      h,
      g,
      $,
      y,
      A,
      C,
      _,
      S,
      O,
      L,
      w,
      D,
      N,
      M,
      R;
    function F(t) {
      e[25](t);
    }
    tc.title = t = e[0];
    let k = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [hc] },
      $$scope: { ctx: e },
    };
    function U(t) {
      e[27](t);
    }
    void 0 !== e[13] && (k.open = e[13]),
      (i = new ro({ props: k })),
      z.push(() => ue(i, "open", F));
    let P = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [xc] },
      $$scope: { ctx: e },
    };
    function H(t) {
      e[30](t);
    }
    void 0 !== e[8] && (P.open = e[8]),
      (s = new ro({ props: P })),
      z.push(() => ue(s, "open", U));
    let B = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Nc] },
      $$scope: { ctx: e },
    };
    void 0 !== e[11] && (B.open = e[11]),
      (c = new ro({ props: B })),
      z.push(() => ue(c, "open", H)),
      (p = new it({
        props: {
          variant: "static",
          $$slots: { default: [Pc] },
          $$scope: { ctx: e },
        },
      }));
    let V = e[7] && Hc(),
      j = {
        labelText: e[5],
        timeoutMs: -1,
        $$slots: { default: [jc] },
        $$scope: { ctx: e },
      };
    return (
      (h = new Co({ props: j })),
      e[32](h),
      (y = new $r({
        props: {
          style: "width: 360px",
          $$slots: { default: [Gc] },
          $$scope: { ctx: e },
        },
      })),
      (C = new Ir({
        props: { $$slots: { default: [ad] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = x()),
            pe(i.$$.fragment),
            (r = x()),
            pe(s.$$.fragment),
            (l = x()),
            pe(c.$$.fragment),
            (u = x()),
            pe(p.$$.fragment),
            (f = x()),
            V && V.c(),
            (m = x()),
            pe(h.$$.fragment),
            (g = x()),
            ($ = E("div")),
            pe(y.$$.fragment),
            (A = x()),
            pe(C.$$.fragment),
            (_ = x()),
            (S = E("link")),
            (O = x()),
            (L = E("link")),
            (w = x()),
            (D = E("link")),
            (N = x()),
            (M = E("link")),
            T($, "class", "drawer-container svelte-1l4jzu8"),
            T(S, "rel", "stylesheet"),
            T(
              S,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            T(S, "class", "svelte-1l4jzu8"),
            T(L, "rel", "stylesheet"),
            T(
              L,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            T(L, "class", "svelte-1l4jzu8"),
            T(D, "rel", "stylesheet"),
            T(D, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            T(D, "class", "svelte-1l4jzu8"),
            T(M, "rel", "stylesheet"),
            T(M, "href", "build/smui.css"),
            T(M, "class", "svelte-1l4jzu8");
        },
        m(e, t) {
          v(e, n, t),
            fe(i, e, t),
            v(e, r, t),
            fe(s, e, t),
            v(e, l, t),
            fe(c, e, t),
            v(e, u, t),
            fe(p, e, t),
            v(e, f, t),
            V && V.m(e, t),
            v(e, m, t),
            fe(h, e, t),
            v(e, g, t),
            v(e, $, t),
            fe(y, $, null),
            I($, A),
            fe(C, $, null),
            v(e, _, t),
            v(e, S, t),
            v(e, O, t),
            v(e, L, t),
            v(e, w, t),
            v(e, D, t),
            v(e, N, t),
            v(e, M, t),
            (R = !0);
        },
        p(e, n) {
          (!R || 1 & n[0]) && t !== (t = e[0]) && (tc.title = t);
          const r = {};
          (16384 & n[0]) | (64 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            !a &&
              8192 & n[0] &&
              ((a = !0), (r.open = e[13]), Q(() => (a = !1))),
            i.$set(r);
          const l = {};
          (1536 & n[0]) | (64 & n[2]) && (l.$$scope = { dirty: n, ctx: e }),
            !o && 256 & n[0] && ((o = !0), (l.open = e[8]), Q(() => (o = !1))),
            s.$set(l);
          const u = {};
          (4096 & n[0]) | (64 & n[2]) && (u.$$scope = { dirty: n, ctx: e }),
            !d &&
              2048 & n[0] &&
              ((d = !0), (u.open = e[11]), Q(() => (d = !1))),
            c.$set(u);
          const f = {};
          (2049 & n[0]) | (64 & n[2]) && (f.$$scope = { dirty: n, ctx: e }),
            p.$set(f),
            e[7]
              ? V
                ? 128 & n[0] && se(V, 1)
                : ((V = Hc()), V.c(), se(V, 1), V.m(m.parentNode, m))
              : V &&
                (ae(),
                oe(V, 1, 1, () => {
                  V = null;
                }),
                re());
          const g = {};
          32 & n[0] && (g.labelText = e[5]),
            64 & n[2] && (g.$$scope = { dirty: n, ctx: e }),
            h.$set(g);
          const $ = {};
          (76 & n[0]) | (64 & n[2]) && ($.$$scope = { dirty: n, ctx: e }),
            y.$set($);
          const I = {};
          (40962 & n[0]) | (64 & n[2]) && (I.$$scope = { dirty: n, ctx: e }),
            C.$set(I);
        },
        i(e) {
          R ||
            (se(i.$$.fragment, e),
            se(s.$$.fragment, e),
            se(c.$$.fragment, e),
            se(p.$$.fragment, e),
            se(V),
            se(h.$$.fragment, e),
            se(y.$$.fragment, e),
            se(C.$$.fragment, e),
            (R = !0));
        },
        o(e) {
          oe(i.$$.fragment, e),
            oe(s.$$.fragment, e),
            oe(c.$$.fragment, e),
            oe(p.$$.fragment, e),
            oe(V),
            oe(h.$$.fragment, e),
            oe(y.$$.fragment, e),
            oe(C.$$.fragment, e),
            (R = !1);
        },
        d(t) {
          t && b(n),
            me(i, t),
            t && b(r),
            me(s, t),
            t && b(l),
            me(c, t),
            t && b(u),
            me(p, t),
            t && b(f),
            V && V.d(t),
            t && b(m),
            e[32](null),
            me(h, t),
            t && b(g),
            t && b($),
            me(y),
            me(C),
            t && b(_),
            t && b(S),
            t && b(O),
            t && b(L),
            t && b(w),
            t && b(D),
            t && b(N),
            t && b(M);
        },
      }
    );
  }
  function sd(e, t, n) {
    let { title: i = "Data Dashboard " } = t,
      a = [];
    const r = new Xl();
    let s,
      o,
      l = [],
      c = [],
      d = "",
      u = [];
    function p(e, t) {
      console.log({ filterTags: t, item: c[0] }),
        n(
          1,
          (c = l.filter((n) =>
            ((n) => {
              const { displayName: i, taxonomyTags: a } = n;
              return (
                !!t.every(
                  (e) =>
                    !!a.find((t) =>
                      (function (e, t) {
                        return (
                          (e.ID === t.id && t.value == e.value) ||
                          (e.hasOwnProperty(t.id) && e[t.id] === t.value)
                        );
                      })(t, e)
                    )
                ) &&
                (!e || i.toLowerCase().includes(e.toLowerCase()))
              );
            })(n)
          ))
        );
    }
    function f(e) {
      n(5, (o = e));
    }
    let m = !1;
    class h extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const g = [];
    let $;
    function I(e) {
      ($ = e), g.forEach(([t, n]) => t.postMessage(new h(e), n));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (g.push([e.source, e.origin]),
          $ && e.source.postMessage(new h($), e.origin));
      },
      !1
    ),
      (async function () {
        n(
          6,
          (a = await (async function () {
            const e = window.location.href.split("/");
            e.pop(), e.pop();
            const t = e.join("/") + "/configuration.json";
            try {
              const e = await fetch(t),
                n = await e.json(),
                { taxonomy: i } = n;
              let a = [i];
              for (; 1 === a.length; ) a = a[0].children;
              return a;
            } catch (e) {
              throw (
                (f(
                  "An error occurred. Please double check the URL and try again."
                ),
                e)
              );
            }
          })())
        ),
          n(7, (m = !0));
        try {
          l = await r.listArtifacts();
        } catch (e) {
          if (
            (f(
              e instanceof Yl
                ? e.message
                : "An error occurred. Please try again later"
            ),
            !(e instanceof Yl))
          )
            throw e;
        }
        n(7, (m = !1)), console.log({ allItems: l }), p(d, u);
      })();
    let v,
      b = !1,
      y = [];
    async function E() {
      if (!y) return f("Dataset file required.");
      await r.appendArtifact(v, y);
    }
    var A;
    let C =
        "create" ===
        ((A = window.location.href),
        Object.fromEntries(
          (A.split("?")[1] || "").split("&").map((e) => e.split("="))
        )).action,
      x = [];
    async function _() {
      await r.createArtifact({ displayName: T }, x),
        f("Submitted creation request.");
    }
    let S,
      T = "",
      O = !1,
      L = "all";
    async function w() {
      try {
        const e = [],
          t = await r.getDownloadUrl(S, ...e),
          n = document.createElement("a");
        n.setAttribute("href", t),
          n.setAttribute("target", "_blank"),
          n.click();
      } catch (e) {
        return f(e.message);
      }
    }
    let D = [];
    return (
      (e.$$set = (e) => {
        "title" in e && n(0, (i = e.title));
      }),
      (e.$$.update = () => {
        12 & e.$$.dirty[0] && p(d, u),
          48 & e.$$.dirty[0] && o && s.open(),
          2 & e.$$.dirty[0] && n(15, (D = []));
      }),
      [
        i,
        c,
        d,
        u,
        s,
        o,
        a,
        m,
        b,
        y,
        v,
        C,
        T,
        O,
        L,
        D,
        I,
        async function (e) {
          n(10, (v = e)), n(8, (b = !0));
        },
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(9, (y = t));
        },
        E,
        _,
        S,
        w,
        function (e) {
          (L = e), n(14, L);
        },
        () => w(),
        function (e) {
          (O = e), n(13, O);
        },
        () => E(),
        function (e) {
          (b = e), n(8, b);
        },
        function (e) {
          (T = e), n(12, T);
        },
        () => _(),
        function (e) {
          (C = e), n(11, C);
        },
        () => n(11, (C = !0)),
        function (e) {
          z[e ? "unshift" : "push"](() => {
            (s = e), n(4, s);
          });
        },
        function (e) {
          (d = e), n(2, d);
        },
        (e) => n(3, (u = e.detail.filterTags)),
        () => n(13, (O = !0)),
        (e) => I(e),
        (e) => I(e),
      ]
    );
  }
  return new (class extends ge {
    constructor(e) {
      super(), he(this, e, sd, rd, s, { title: 0 }, null, [-1, -1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
