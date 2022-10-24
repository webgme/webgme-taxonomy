var app = (function () {
  "use strict";
  function e() {}
  const t = (e) => e;
  function n(e, t) {
    for (const n in t) e[n] = t[n];
    return e;
  }
  function i(e) {
    return e();
  }
  function r() {
    return Object.create(null);
  }
  function s(e) {
    e.forEach(i);
  }
  function a(e) {
    return "function" == typeof e;
  }
  function o(e, t) {
    return e != e
      ? t == t
      : e !== t || (e && "object" == typeof e) || "function" == typeof e;
  }
  function l(t, n, i) {
    t.$$.on_destroy.push(
      (function (t, ...n) {
        if (null == t) return e;
        const i = t.subscribe(...n);
        return i.unsubscribe ? () => i.unsubscribe() : i;
      })(n, i)
    );
  }
  function c(e, t, n, i) {
    if (e) {
      const r = d(e, t, n, i);
      return e[0](r);
    }
  }
  function d(e, t, i, r) {
    return e[1] && r ? n(i.ctx.slice(), e[1](r(t))) : i.ctx;
  }
  function u(e, t, n, i) {
    if (e[2] && i) {
      const r = e[2](i(n));
      if (void 0 === t.dirty) return r;
      if ("object" == typeof r) {
        const e = [],
          n = Math.max(t.dirty.length, r.length);
        for (let i = 0; i < n; i += 1) e[i] = t.dirty[i] | r[i];
        return e;
      }
      return t.dirty | r;
    }
    return t.dirty;
  }
  function p(e, t, n, i, r, s) {
    if (r) {
      const a = d(t, n, i, s);
      e.p(a, r);
    }
  }
  function f(e) {
    if (e.ctx.length > 32) {
      const t = [],
        n = e.ctx.length / 32;
      for (let e = 0; e < n; e++) t[e] = -1;
      return t;
    }
    return -1;
  }
  function h(e) {
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
  function g(e) {
    const t = {};
    for (const n in e) t[n] = !0;
    return t;
  }
  function $(e) {
    return null == e ? "" : e;
  }
  function I(e, t, n) {
    return e.set(n), t;
  }
  function v(t) {
    return t && a(t.destroy) ? t.destroy : e;
  }
  const y = "undefined" != typeof window;
  let b = y ? () => window.performance.now() : () => Date.now(),
    E = y ? (e) => requestAnimationFrame(e) : e;
  const A = new Set();
  function x(e) {
    A.forEach((t) => {
      t.c(e) || (A.delete(t), t.f());
    }),
      0 !== A.size && E(x);
  }
  function C(e) {
    let t;
    return (
      0 === A.size && E(x),
      {
        promise: new Promise((n) => {
          A.add((t = { c: e, f: n }));
        }),
        abort() {
          A.delete(t);
        },
      }
    );
  }
  function S(e, t) {
    e.appendChild(t);
  }
  function _(e) {
    if (!e) return document;
    const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
    return t && t.host ? t : e.ownerDocument;
  }
  function T(e) {
    const t = D("style");
    return (
      (function (e, t) {
        S(e.head || e, t);
      })(_(e), t),
      t.sheet
    );
  }
  function O(e, t, n) {
    e.insertBefore(t, n || null);
  }
  function L(e) {
    e.parentNode.removeChild(e);
  }
  function w(e, t) {
    for (let n = 0; n < e.length; n += 1) e[n] && e[n].d(t);
  }
  function D(e) {
    return document.createElement(e);
  }
  function N(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function R(e) {
    return document.createTextNode(e);
  }
  function M() {
    return R(" ");
  }
  function F() {
    return R("");
  }
  function k(e, t, n, i) {
    return e.addEventListener(t, n, i), () => e.removeEventListener(t, n, i);
  }
  function U(e, t, n) {
    null == n
      ? e.removeAttribute(t)
      : e.getAttribute(t) !== n && e.setAttribute(t, n);
  }
  function H(e, t) {
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
        : U(e, i, t[i]);
  }
  function P(e, t) {
    (t = "" + t), e.wholeText !== t && (e.data = t);
  }
  function B(e, t) {
    e.value = null == t ? "" : t;
  }
  function V(e, t, n, i) {
    null === n
      ? e.style.removeProperty(t)
      : e.style.setProperty(t, n, i ? "important" : "");
  }
  function j(e, t, n) {
    e.classList[n ? "add" : "remove"](t);
  }
  function z(e, t, { bubbles: n = !1, cancelable: i = !1 } = {}) {
    const r = document.createEvent("CustomEvent");
    return r.initCustomEvent(e, n, i, t), r;
  }
  class G {
    constructor(e = !1) {
      (this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
    }
    c(e) {
      this.h(e);
    }
    m(e, t, n = null) {
      this.e ||
        (this.is_svg ? (this.e = N(t.nodeName)) : (this.e = D(t.nodeName)),
        (this.t = t),
        this.c(e)),
        this.i(n);
    }
    h(e) {
      (this.e.innerHTML = e), (this.n = Array.from(this.e.childNodes));
    }
    i(e) {
      for (let t = 0; t < this.n.length; t += 1) O(this.t, this.n[t], e);
    }
    p(e) {
      this.d(), this.h(e), this.i(this.a);
    }
    d() {
      this.n.forEach(L);
    }
  }
  const q = new Map();
  let K,
    W = 0;
  function X(e, t, n, i, r, s, a, o = 0) {
    const l = 16.666 / i;
    let c = "{\n";
    for (let e = 0; e <= 1; e += l) {
      const i = t + (n - t) * s(e);
      c += 100 * e + `%{${a(i, 1 - i)}}\n`;
    }
    const d = c + `100% {${a(n, 1 - n)}}\n}`,
      u = `__svelte_${(function (e) {
        let t = 5381,
          n = e.length;
        for (; n--; ) t = ((t << 5) - t) ^ e.charCodeAt(n);
        return t >>> 0;
      })(d)}_${o}`,
      p = _(e),
      { stylesheet: f, rules: h } =
        q.get(p) ||
        (function (e, t) {
          const n = { stylesheet: T(t), rules: {} };
          return q.set(e, n), n;
        })(p, e);
    h[u] ||
      ((h[u] = !0), f.insertRule(`@keyframes ${u} ${d}`, f.cssRules.length));
    const m = e.style.animation || "";
    return (
      (e.style.animation = `${
        m ? `${m}, ` : ""
      }${u} ${i}ms linear ${r}ms 1 both`),
      (W += 1),
      u
    );
  }
  function Y(e, t) {
    const n = (e.style.animation || "").split(", "),
      i = n.filter(
        t ? (e) => e.indexOf(t) < 0 : (e) => -1 === e.indexOf("__svelte")
      ),
      r = n.length - i.length;
    r &&
      ((e.style.animation = i.join(", ")),
      (W -= r),
      W ||
        E(() => {
          W ||
            (q.forEach((e) => {
              const { stylesheet: t } = e;
              let n = t.cssRules.length;
              for (; n--; ) t.deleteRule(n);
              e.rules = {};
            }),
            q.clear());
        }));
  }
  function Q(e, t) {
    const n = e.getBoundingClientRect();
    if (t.left !== n.left || t.top !== n.top) {
      const i = getComputedStyle(e),
        r = "none" === i.transform ? "" : i.transform;
      e.style.transform = `${r} translate(${t.left - n.left}px, ${
        t.top - n.top
      }px)`;
    }
  }
  function J(e) {
    K = e;
  }
  function Z() {
    if (!K) throw new Error("Function called outside component initialization");
    return K;
  }
  function ee(e) {
    Z().$$.on_mount.push(e);
  }
  function te(e) {
    Z().$$.on_destroy.push(e);
  }
  function ne() {
    const e = Z();
    return (t, n, { cancelable: i = !1 } = {}) => {
      const r = e.$$.callbacks[t];
      if (r) {
        const s = z(t, n, { cancelable: i });
        return (
          r.slice().forEach((t) => {
            t.call(e, s);
          }),
          !s.defaultPrevented
        );
      }
      return !0;
    };
  }
  function ie(e, t) {
    return Z().$$.context.set(e, t), t;
  }
  function re(e) {
    return Z().$$.context.get(e);
  }
  function se(e, t) {
    const n = e.$$.callbacks[t.type];
    n && n.slice().forEach((e) => e.call(this, t));
  }
  const ae = [],
    oe = [],
    le = [],
    ce = [],
    de = Promise.resolve();
  let ue = !1;
  function pe() {
    ue || ((ue = !0), de.then(Ie));
  }
  function fe(e) {
    le.push(e);
  }
  function he(e) {
    ce.push(e);
  }
  const me = new Set();
  let ge,
    $e = 0;
  function Ie() {
    const e = K;
    do {
      for (; $e < ae.length; ) {
        const e = ae[$e];
        $e++, J(e), ve(e.$$);
      }
      for (J(null), ae.length = 0, $e = 0; oe.length; ) oe.pop()();
      for (let e = 0; e < le.length; e += 1) {
        const t = le[e];
        me.has(t) || (me.add(t), t());
      }
      le.length = 0;
    } while (ae.length);
    for (; ce.length; ) ce.pop()();
    (ue = !1), me.clear(), J(e);
  }
  function ve(e) {
    if (null !== e.fragment) {
      e.update(), s(e.before_update);
      const t = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, t),
        e.after_update.forEach(fe);
    }
  }
  function ye() {
    return (
      ge ||
        ((ge = Promise.resolve()),
        ge.then(() => {
          ge = null;
        })),
      ge
    );
  }
  function be(e, t, n) {
    e.dispatchEvent(z(`${t ? "intro" : "outro"}${n}`));
  }
  const Ee = new Set();
  let Ae;
  function xe() {
    Ae = { r: 0, c: [], p: Ae };
  }
  function Ce() {
    Ae.r || s(Ae.c), (Ae = Ae.p);
  }
  function Se(e, t) {
    e && e.i && (Ee.delete(e), e.i(t));
  }
  function _e(e, t, n, i) {
    if (e && e.o) {
      if (Ee.has(e)) return;
      Ee.add(e),
        Ae.c.push(() => {
          Ee.delete(e), i && (n && e.d(1), i());
        }),
        e.o(t);
    } else i && i();
  }
  const Te = { duration: 0 };
  const Oe =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof globalThis
      ? globalThis
      : global;
  function Le(e, t) {
    _e(e, 1, 1, () => {
      t.delete(e.key);
    });
  }
  function we(e, t) {
    e.f(), Le(e, t);
  }
  function De(e, t, n, i, r, s, a, o, l, c, d, u) {
    let p = e.length,
      f = s.length,
      h = p;
    const m = {};
    for (; h--; ) m[e[h].key] = h;
    const g = [],
      $ = new Map(),
      I = new Map();
    for (h = f; h--; ) {
      const e = u(r, s, h),
        o = n(e);
      let l = a.get(o);
      l ? i && l.p(e, t) : ((l = c(o, e)), l.c()),
        $.set(o, (g[h] = l)),
        o in m && I.set(o, Math.abs(h - m[o]));
    }
    const v = new Set(),
      y = new Set();
    function b(e) {
      Se(e, 1), e.m(o, d), a.set(e.key, e), (d = e.first), f--;
    }
    for (; p && f; ) {
      const t = g[f - 1],
        n = e[p - 1],
        i = t.key,
        r = n.key;
      t === n
        ? ((d = t.first), p--, f--)
        : $.has(r)
        ? !a.has(i) || v.has(i)
          ? b(t)
          : y.has(r)
          ? p--
          : I.get(i) > I.get(r)
          ? (y.add(i), b(t))
          : (v.add(r), p--)
        : (l(n, a), p--);
    }
    for (; p--; ) {
      const t = e[p];
      $.has(t.key) || l(t, a);
    }
    for (; f; ) b(g[f - 1]);
    return g;
  }
  function Ne(e, t) {
    const n = {},
      i = {},
      r = { $$scope: 1 };
    let s = e.length;
    for (; s--; ) {
      const a = e[s],
        o = t[s];
      if (o) {
        for (const e in a) e in o || (i[e] = 1);
        for (const e in o) r[e] || ((n[e] = o[e]), (r[e] = 1));
        e[s] = o;
      } else for (const e in a) r[e] = 1;
    }
    for (const e in i) e in n || (n[e] = void 0);
    return n;
  }
  function Re(e) {
    return "object" == typeof e && null !== e ? e : {};
  }
  function Me(e, t, n) {
    const i = e.$$.props[t];
    void 0 !== i && ((e.$$.bound[i] = n), n(e.$$.ctx[i]));
  }
  function Fe(e) {
    e && e.c();
  }
  function ke(e, t, n, r) {
    const { fragment: o, on_mount: l, on_destroy: c, after_update: d } = e.$$;
    o && o.m(t, n),
      r ||
        fe(() => {
          const t = l.map(i).filter(a);
          c ? c.push(...t) : s(t), (e.$$.on_mount = []);
        }),
      d.forEach(fe);
  }
  function Ue(e, t) {
    const n = e.$$;
    null !== n.fragment &&
      (s(n.on_destroy),
      n.fragment && n.fragment.d(t),
      (n.on_destroy = n.fragment = null),
      (n.ctx = []));
  }
  function He(t, n, i, a, o, l, c, d = [-1]) {
    const u = K;
    J(t);
    const p = (t.$$ = {
      fragment: null,
      ctx: null,
      props: l,
      update: e,
      not_equal: o,
      bound: r(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (u ? u.$$.context : [])),
      callbacks: r(),
      dirty: d,
      skip_bound: !1,
      root: n.target || u.$$.root,
    });
    c && c(p.root);
    let f = !1;
    if (
      ((p.ctx = i
        ? i(t, n.props || {}, (e, n, ...i) => {
            const r = i.length ? i[0] : n;
            return (
              p.ctx &&
                o(p.ctx[e], (p.ctx[e] = r)) &&
                (!p.skip_bound && p.bound[e] && p.bound[e](r),
                f &&
                  (function (e, t) {
                    -1 === e.$$.dirty[0] &&
                      (ae.push(e), pe(), e.$$.dirty.fill(0)),
                      (e.$$.dirty[(t / 31) | 0] |= 1 << t % 31);
                  })(t, e)),
              n
            );
          })
        : []),
      p.update(),
      (f = !0),
      s(p.before_update),
      (p.fragment = !!a && a(p.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        const e = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        p.fragment && p.fragment.l(e), e.forEach(L);
      } else p.fragment && p.fragment.c();
      n.intro && Se(t.$$.fragment),
        ke(t, n.target, n.anchor, n.customElement),
        Ie();
    }
    J(u);
  }
  class Pe {
    $destroy() {
      Ue(this, 1), (this.$destroy = e);
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
  class Be {
    constructor(e, t) {
      (this.id = e), (this.value = t);
    }
  }
  class Ve {
    constructor(e, t, n, i, r) {
      (this.value = null),
        (this.selected = !1),
        (this.expanded = !1),
        (this.id = e),
        (this.name = t),
        (this.type = n),
        (this.value = i),
        (this.children = r);
    }
    select() {
      this.selected = !0;
    }
    expand() {
      this.expanded = !0;
    }
    findPath(e) {
      const t =
        this.id === e
          ? []
          : this.children.reduce((t, n) => t || n.findPath(e), null);
      return t && t.unshift(this), t;
    }
    isMatch(e) {
      if (e.ID === this.id && e.value == this.value) return !0;
      return e.hasOwnProperty(this.id) && e[this.id] === this.value;
    }
    lean() {
      return new Be(this.id, this.value);
    }
    static fromDict(e) {
      const t = e.children.map(Ve.fromDict);
      return new Ve(e.id, e.name, e.type, e.value, t);
    }
  }
  var je = function (e, t) {
    return (
      (je =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }),
      je(e, t)
    );
  };
  function ze(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Class extends value " + String(t) + " is not a constructor or null"
      );
    function n() {
      this.constructor = e;
    }
    je(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((n.prototype = t.prototype), new n()));
  }
  var Ge = function () {
    return (
      (Ge =
        Object.assign ||
        function (e) {
          for (var t, n = 1, i = arguments.length; n < i; n++)
            for (var r in (t = arguments[n]))
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          return e;
        }),
      Ge.apply(this, arguments)
    );
  };
  function qe(e, t, n, i) {
    return new (n || (n = Promise))(function (r, s) {
      function a(e) {
        try {
          l(i.next(e));
        } catch (e) {
          s(e);
        }
      }
      function o(e) {
        try {
          l(i.throw(e));
        } catch (e) {
          s(e);
        }
      }
      function l(e) {
        var t;
        e.done
          ? r(e.value)
          : ((t = e.value),
            t instanceof n
              ? t
              : new n(function (e) {
                  e(t);
                })).then(a, o);
      }
      l((i = i.apply(e, t || [])).next());
    });
  }
  function Ke(e, t) {
    var n,
      i,
      r,
      s,
      a = {
        label: 0,
        sent: function () {
          if (1 & r[0]) throw r[1];
          return r[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (s = { next: o(0), throw: o(1), return: o(2) }),
      "function" == typeof Symbol &&
        (s[Symbol.iterator] = function () {
          return this;
        }),
      s
    );
    function o(s) {
      return function (o) {
        return (function (s) {
          if (n) throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (
                ((n = 1),
                i &&
                  (r =
                    2 & s[0]
                      ? i.return
                      : s[0]
                      ? i.throw || ((r = i.return) && r.call(i), 0)
                      : i.next) &&
                  !(r = r.call(i, s[1])).done)
              )
                return r;
              switch (((i = 0), r && (s = [2 & s[0], r.value]), s[0])) {
                case 0:
                case 1:
                  r = s;
                  break;
                case 4:
                  return a.label++, { value: s[1], done: !1 };
                case 5:
                  a.label++, (i = s[1]), (s = [0]);
                  continue;
                case 7:
                  (s = a.ops.pop()), a.trys.pop();
                  continue;
                default:
                  if (
                    !((r = a.trys),
                    (r = r.length > 0 && r[r.length - 1]) ||
                      (6 !== s[0] && 2 !== s[0]))
                  ) {
                    a = 0;
                    continue;
                  }
                  if (3 === s[0] && (!r || (s[1] > r[0] && s[1] < r[3]))) {
                    a.label = s[1];
                    break;
                  }
                  if (6 === s[0] && a.label < r[1]) {
                    (a.label = r[1]), (r = s);
                    break;
                  }
                  if (r && a.label < r[2]) {
                    (a.label = r[2]), a.ops.push(s);
                    break;
                  }
                  r[2] && a.ops.pop(), a.trys.pop();
                  continue;
              }
              s = t.call(e, a);
            } catch (e) {
              (s = [6, e]), (i = 0);
            } finally {
              n = r = 0;
            }
          if (5 & s[0]) throw s[1];
          return { value: s[0] ? s[1] : void 0, done: !0 };
        })([s, o]);
      };
    }
  }
  function We(e) {
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
  function Xe(e, t) {
    var n = "function" == typeof Symbol && e[Symbol.iterator];
    if (!n) return e;
    var i,
      r,
      s = n.call(e),
      a = [];
    try {
      for (; (void 0 === t || t-- > 0) && !(i = s.next()).done; )
        a.push(i.value);
    } catch (e) {
      r = { error: e };
    } finally {
      try {
        i && !i.done && (n = s.return) && n.call(s);
      } finally {
        if (r) throw r.error;
      }
    }
    return a;
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
  var Ye = (function () {
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
   */ var Qe = Object.freeze({
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
   */ function Je(e, t) {
    return (e.matches || e.webkitMatchesSelector || e.msMatchesSelector).call(
      e,
      t
    );
  }
  var Ze,
    et = Object.freeze({
      __proto__: null,
      closest: function (e, t) {
        if (e.closest) return e.closest(t);
        for (var n = e; n; ) {
          if (Je(n, t)) return n;
          n = n.parentElement;
        }
        return null;
      },
      matches: Je,
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
    tt = {
      BG_FOCUSED: "mdc-ripple-upgraded--background-focused",
      FG_ACTIVATION: "mdc-ripple-upgraded--foreground-activation",
      FG_DEACTIVATION: "mdc-ripple-upgraded--foreground-deactivation",
      ROOT: "mdc-ripple-upgraded",
      UNBOUNDED: "mdc-ripple-upgraded--unbounded",
    },
    nt = {
      VAR_FG_SCALE: "--mdc-ripple-fg-scale",
      VAR_FG_SIZE: "--mdc-ripple-fg-size",
      VAR_FG_TRANSLATE_END: "--mdc-ripple-fg-translate-end",
      VAR_FG_TRANSLATE_START: "--mdc-ripple-fg-translate-start",
      VAR_LEFT: "--mdc-ripple-left",
      VAR_TOP: "--mdc-ripple-top",
    },
    it = {
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
  var rt = ["touchstart", "pointerdown", "mousedown", "keydown"],
    st = ["touchend", "pointerup", "mouseup", "contextmenu"],
    at = [],
    ot = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
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
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return tt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return nt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return it;
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
              r = i.ROOT,
              s = i.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.addClass(r),
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
              i = n.ROOT,
              r = n.UNBOUNDED;
            requestAnimationFrame(function () {
              e.adapter.removeClass(i),
                e.adapter.removeClass(r),
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
              for (var i = We(rt), r = i.next(); !r.done; r = i.next()) {
                var s = r.value;
                this.adapter.registerInteractionHandler(
                  s,
                  this.activateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
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
              for (var i = We(st), r = i.next(); !r.done; r = i.next()) {
                var s = r.value;
                this.adapter.registerDocumentInteractionHandler(
                  s,
                  this.deactivateHandler
                );
              }
            } catch (e) {
              t = { error: e };
            } finally {
              try {
                r && !r.done && (n = i.return) && n.call(i);
              } finally {
                if (t) throw t.error;
              }
            }
        }),
        (t.prototype.deregisterRootHandlers = function () {
          var e, t;
          try {
            for (var n = We(rt), i = n.next(); !i.done; i = n.next()) {
              var r = i.value;
              this.adapter.deregisterInteractionHandler(
                r,
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
            for (var n = We(st), i = n.next(); !i.done; i = n.next()) {
              var r = i.value;
              this.adapter.deregisterDocumentInteractionHandler(
                r,
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
                  at.length > 0 &&
                  at.some(function (e) {
                    return t.adapter.containsEventTarget(e);
                  })
                    ? this.resetActivationState()
                    : (void 0 !== e &&
                        (at.push(e.target),
                        this.registerDeactivationHandlers(e)),
                      (n.wasElementMadeActive = this.checkElementMadeActive(e)),
                      n.wasElementMadeActive && this.animateActivation(),
                      requestAnimationFrame(function () {
                        (at = []),
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
            r = n.VAR_FG_TRANSLATE_END,
            s = t.cssClasses,
            a = s.FG_DEACTIVATION,
            o = s.FG_ACTIVATION,
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
            this.adapter.updateCssVariable(r, d),
            clearTimeout(this.activationTimer),
            clearTimeout(this.fgDeactivationRemovalTimer),
            this.rmBoundedActivationClasses(),
            this.adapter.removeClass(a),
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
                        r,
                        s = t.x,
                        a = t.y,
                        o = s + n.left,
                        l = a + n.top;
                      if ("touchstart" === e.type) {
                        var c = e;
                        (i = c.changedTouches[0].pageX - o),
                          (r = c.changedTouches[0].pageY - l);
                      } else {
                        var d = e;
                        (i = d.pageX - o), (r = d.pageY - l);
                      }
                      return { x: i, y: r };
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
            r = i.hasDeactivationUXRun,
            s = i.isActivated;
          (r || !s) &&
            this.activationAnimationHasEnded &&
            (this.rmBoundedActivationClasses(),
            this.adapter.addClass(n),
            (this.fgDeactivationRemovalTimer = setTimeout(function () {
              e.adapter.removeClass(n);
            }, it.FG_DEACTIVATION_MS)));
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
            var n = Ge({}, t);
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
            r = e.VAR_TOP,
            s = e.VAR_FG_SCALE;
          this.adapter.updateCssVariable(n, this.initialSize + "px"),
            this.adapter.updateCssVariable(s, this.fgScale),
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
                r,
                this.unboundedCoords.top + "px"
              ));
        }),
        t
      );
    })(Ye),
    lt = {
      FIXED_CLASS: "mdc-top-app-bar--fixed",
      FIXED_SCROLLED_CLASS: "mdc-top-app-bar--fixed-scrolled",
      SHORT_CLASS: "mdc-top-app-bar--short",
      SHORT_COLLAPSED_CLASS: "mdc-top-app-bar--short-collapsed",
      SHORT_HAS_ACTION_ITEM_CLASS: "mdc-top-app-bar--short-has-action-item",
    },
    ct = { DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100, MAX_TOP_APP_BAR_HEIGHT: 128 },
    dt = {
      ACTION_ITEM_SELECTOR: ".mdc-top-app-bar__action-item",
      NAVIGATION_EVENT: "MDCTopAppBar:nav",
      NAVIGATION_ICON_SELECTOR: ".mdc-top-app-bar__navigation-icon",
      ROOT_SELECTOR: ".mdc-top-app-bar",
      TITLE_SELECTOR: ".mdc-top-app-bar__title",
    },
    ut = (function (e) {
      function t(n) {
        return e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return dt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return lt;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return ct;
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
    })(Ye),
    pt = (function (e) {
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
        ze(t, e),
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
            }, ct.DEBOUNCE_THROTTLE_RESIZE_TIME_MS)),
            (this.isCurrentlyBeingResized = !0),
            this.resizeDebounceId && clearTimeout(this.resizeDebounceId),
            (this.resizeDebounceId = setTimeout(function () {
              e.handleTargetScroll(),
                (e.isCurrentlyBeingResized = !1),
                (e.resizeDebounceId = 0);
            }, ct.DEBOUNCE_THROTTLE_RESIZE_TIME_MS));
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
              (e = -ct.MAX_TOP_APP_BAR_HEIGHT),
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
    })(ut),
    ft = (function (e) {
      function t() {
        var t = (null !== e && e.apply(this, arguments)) || this;
        return (t.wasScrolled = !1), t;
      }
      return (
        ze(t, e),
        (t.prototype.handleTargetScroll = function () {
          this.adapter.getViewportScrollY() <= 0
            ? this.wasScrolled &&
              (this.adapter.removeClass(lt.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !1))
            : this.wasScrolled ||
              (this.adapter.addClass(lt.FIXED_SCROLLED_CLASS),
              (this.wasScrolled = !0));
        }),
        t
      );
    })(pt),
    ht = (function (e) {
      function t(t) {
        var n = e.call(this, t) || this;
        return (n.collapsed = !1), (n.isAlwaysCollapsed = !1), n;
      }
      return (
        ze(t, e),
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
              this.adapter.addClass(lt.SHORT_HAS_ACTION_ITEM_CLASS),
            this.setAlwaysCollapsed(
              this.adapter.hasClass(lt.SHORT_COLLAPSED_CLASS)
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
          this.adapter.removeClass(lt.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !1);
        }),
        (t.prototype.collapse = function () {
          this.adapter.addClass(lt.SHORT_COLLAPSED_CLASS),
            (this.collapsed = !0);
        }),
        t
      );
    })(ut);
  const mt = [];
  function gt(t, n = e) {
    let i;
    const r = new Set();
    function s(e) {
      if (o(t, e) && ((t = e), i)) {
        const e = !mt.length;
        for (const e of r) e[1](), mt.push(e, t);
        if (e) {
          for (let e = 0; e < mt.length; e += 2) mt[e][0](mt[e + 1]);
          mt.length = 0;
        }
      }
    }
    return {
      set: s,
      update: function (e) {
        s(e(t));
      },
      subscribe: function (a, o = e) {
        const l = [a, o];
        return (
          r.add(l),
          1 === r.size && (i = n(s) || e),
          a(t),
          () => {
            r.delete(l), 0 === r.size && (i(), (i = null));
          }
        );
      },
    };
  }
  function $t(e) {
    return Object.entries(e)
      .filter(([e, t]) => "" !== e && t)
      .map(([e]) => e)
      .join(" ");
  }
  function It(e, t, n, i = { bubbles: !0 }, r = !1) {
    if ("undefined" != typeof Event && e) {
      const s = new CustomEvent(
        t,
        Object.assign(Object.assign({}, i), { detail: n })
      );
      if ((null == e || e.dispatchEvent(s), r && t.startsWith("SMUI"))) {
        const r = new CustomEvent(
          t.replace(/^SMUI/g, () => "MDC"),
          Object.assign(Object.assign({}, i), { detail: n })
        );
        null == e || e.dispatchEvent(r),
          r.defaultPrevented && s.preventDefault();
      }
      return s;
    }
  }
  function vt(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let r = 0; r < n.length; r++) {
      const s = n[r],
        a = s.indexOf("$");
      (-1 !== a && -1 !== t.indexOf(s.substring(0, a + 1))) ||
        (-1 === t.indexOf(s) && (i[s] = e[s]));
    }
    return i;
  }
  const yt =
      /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/,
    bt =
      /^[^$]+(?:\$(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;
  function Et(e) {
    let t,
      n = [];
    function i(t) {
      se(e, t);
    }
    return (
      (e.$on = (e, i) => {
        let r = e,
          s = () => {};
        t ? (s = t(r, i)) : n.push([r, i]);
        return (
          r.match(yt) &&
            console &&
            console.warn(
              'Event modifiers in SMUI now use "$" instead of ":", so that all events can be bound with modifiers. Please update your event binding: ',
              r
            ),
          () => {
            s();
          }
        );
      }),
      (e) => {
        const r = [],
          s = {};
        t = (t, n) => {
          let a = t,
            o = n,
            l = !1;
          const c = a.match(yt),
            d = a.match(bt),
            u = c || d;
          if (a.match(/^SMUI:\w+:/)) {
            const e = a.split(":");
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
              `The event ${a.split("$")[0]} has been renamed to ${
                t.split("$")[0]
              }.`
            ),
              (a = t);
          }
          if (u) {
            const e = a.split(c ? ":" : "$");
            a = e[0];
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
          const f = k(e, a, o, l),
            h = () => {
              f();
              const e = r.indexOf(h);
              e > -1 && r.splice(e, 1);
            };
          return r.push(h), a in s || (s[a] = k(e, a, i)), h;
        };
        for (let e = 0; e < n.length; e++) t(n[e][0], n[e][1]);
        return {
          destroy: () => {
            for (let e = 0; e < r.length; e++) r[e]();
            for (let e of Object.entries(s)) e[1]();
          },
        };
      }
    );
  }
  function At(e, t) {
    let n = Object.getOwnPropertyNames(e);
    const i = {};
    for (let r = 0; r < n.length; r++) {
      const s = n[r];
      s.substring(0, t.length) === t && (i[s.substring(t.length)] = e[s]);
    }
    return i;
  }
  function xt(e, t) {
    let n = [];
    if (t)
      for (let i = 0; i < t.length; i++) {
        const r = t[i],
          s = Array.isArray(r) ? r[0] : r;
        Array.isArray(r) && r.length > 1 ? n.push(s(e, r[1])) : n.push(s(e));
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
  const { window: Ct } = Oe;
  function St(e) {
    let t, i, r, o, l, d, h;
    const m = e[22].default,
      g = c(m, e, e[21], null);
    let $ = [
        {
          class: (i = $t({
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
        { style: (r = Object.entries(e[12]).map(_t).concat([e[3]]).join(" ")) },
        e[15],
      ],
      I = {};
    for (let e = 0; e < $.length; e += 1) I = n(I, $[e]);
    return {
      c() {
        (t = D("header")), g && g.c(), H(t, I);
      },
      m(n, i) {
        O(n, t, i),
          g && g.m(t, null),
          e[25](t),
          (l = !0),
          d ||
            ((h = [
              k(Ct, "resize", e[23]),
              k(Ct, "scroll", e[24]),
              v((o = xt.call(null, t, e[1]))),
              v(e[13].call(null, t)),
              k(t, "SMUITopAppBarIconButton:nav", e[26]),
            ]),
            (d = !0));
      },
      p(e, n) {
        g &&
          g.p &&
          (!l || 2097152 & n[0]) &&
          p(g, m, e, e[21], l ? u(m, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (I = Ne($, [
              (!l ||
                (2293 & n[0] &&
                  i !==
                    (i = $t({
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
              (!l ||
                (4104 & n[0] &&
                  r !==
                    (r = Object.entries(e[12])
                      .map(_t)
                      .concat([e[3]])
                      .join(" ")))) && { style: r },
              32768 & n[0] && e[15],
            ]))
          ),
          o && a(o.update) && 2 & n[0] && o.update.call(null, e[1]);
      },
      i(e) {
        l || (Se(g, e), (l = !0));
      },
      o(e) {
        _e(g, e), (l = !1);
      },
      d(n) {
        n && L(t), g && g.d(n), e[25](null), (d = !1), s(h);
      },
    };
  }
  const _t = ([e, t]) => `${e}: ${t};`;
  function Tt(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c = () => {};
    function d(e) {
      return e === c;
    }
    let { use: u = [] } = t,
      { class: p = "" } = t,
      { style: f = "" } = t,
      { variant: g = "standard" } = t,
      { color: $ = "primary" } = t,
      { collapsed: I = c } = t;
    const v = !d(I) && !!I;
    d(I) && (I = !1);
    let y,
      b,
      E,
      { prominent: A = !1 } = t,
      { dense: x = !1 } = t,
      { scrollTarget: C } = t,
      S = {},
      _ = {},
      T = {
        subscribe: gt({ variant: g, prominent: A, dense: x }, (e) => {
          i(18, (E = e));
        }).subscribe,
      };
    let O,
      L = g;
    function w() {
      return new ({ static: ut, short: ht, fixed: ft }[g] || pt)({
        hasClass: D,
        addClass: N,
        removeClass: R,
        setStyle: M,
        getTopAppBarHeight: () => y.clientHeight,
        notifyNavigationIconClicked: () =>
          It(y, "SMUITopAppBar:nav", void 0, void 0, !0),
        getViewportScrollY: () =>
          null == C ? window.pageYOffset : C.scrollTop,
        getTotalActionItems: () =>
          y.querySelectorAll(".mdc-top-app-bar__action-item").length,
      });
    }
    function D(e) {
      return e in S ? S[e] : k().classList.contains(e);
    }
    function N(e) {
      S[e] || i(11, (S[e] = !0), S);
    }
    function R(e) {
      (e in S && !S[e]) || i(11, (S[e] = !1), S);
    }
    function M(e, t) {
      _[e] != t &&
        ("" === t || null == t
          ? (delete _[e], i(12, _), i(20, L), i(4, g), i(9, b))
          : i(12, (_[e] = t), _));
    }
    function F() {
      b &&
        (b.handleTargetScroll(),
        "short" === g && i(0, (I = "isCollapsed" in b && b.isCollapsed)));
    }
    function k() {
      return y;
    }
    ee(
      () => (
        i(9, (b = w())),
        b.init(),
        () => {
          b.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(15, (s = m(t, r))),
          "use" in e && i(1, (u = e.use)),
          "class" in e && i(2, (p = e.class)),
          "style" in e && i(3, (f = e.style)),
          "variant" in e && i(4, (g = e.variant)),
          "color" in e && i(5, ($ = e.color)),
          "collapsed" in e && i(0, (I = e.collapsed)),
          "prominent" in e && i(6, (A = e.prominent)),
          "dense" in e && i(7, (x = e.dense)),
          "scrollTarget" in e && i(8, (C = e.scrollTarget)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        262352 & e.$$.dirty[0] &&
          E &&
          E({ variant: g, prominent: A, dense: x }),
          1049104 & e.$$.dirty[0] &&
            L !== g &&
            b &&
            (i(20, (L = g)),
            b.destroy(),
            i(11, (S = {})),
            i(12, (_ = {})),
            i(9, (b = w())),
            b.init()),
          528 & e.$$.dirty[0] &&
            b &&
            "short" === g &&
            "setAlwaysCollapsed" in b &&
            b.setAlwaysCollapsed(v),
          524544 & e.$$.dirty[0] &&
            O !== C &&
            (O && O.removeEventListener("scroll", F),
            C && C.addEventListener("scroll", F),
            i(19, (O = C)));
      }),
      [
        I,
        u,
        p,
        f,
        g,
        $,
        A,
        x,
        C,
        b,
        y,
        S,
        _,
        l,
        F,
        s,
        function () {
          return T;
        },
        k,
        E,
        O,
        L,
        o,
        a,
        () => "short" !== g && "fixed" !== g && b && b.handleWindowResize(),
        () => null == C && F(),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (y = e), i(10, y);
          });
        },
        () => b && b.handleNavigationClick(),
      ]
    );
  }
  class Ot extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Tt,
          St,
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
  function Lt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("div")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function wt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class Dt extends Pe {
    constructor(e) {
      super(), He(this, e, wt, Lt, o, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function Nt(e) {
    let t;
    const n = e[10].default,
      i = c(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r) &&
          p(i, n, e, e[12], t ? u(n, e[12], r, null) : f(e[12]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Rt(e) {
    let t, i, r;
    const s = [
      { use: [e[7], ...e[0]] },
      { class: $t({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
      e[6],
      e[8],
    ];
    var a = e[2];
    function o(e) {
      let t = { $$slots: { default: [Nt] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a && ((t = new a(o(e))), e[11](t)),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            499 & n
              ? Ne(s, [
                  129 & n && { use: [e[7], ...e[0]] },
                  50 & n && { class: $t({ [e[1]]: !0, [e[5]]: !0, ...e[4] }) },
                  64 & n && Re(e[6]),
                  256 & n && Re(e[8]),
                ])
              : {};
          if (
            (4096 & n && (r.$$scope = { dirty: n, ctx: e }), a !== (a = e[2]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[11](t),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[11](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  const Mt = {
    component: Dt,
    class: "",
    classMap: {},
    contexts: {},
    props: {},
  };
  function Ft(e, t, i) {
    const r = ["use", "class", "component", "getElement"];
    let s,
      a = m(t, r),
      { $$slots: o = {}, $$scope: l } = t,
      { use: c = [] } = t,
      { class: d = "" } = t;
    const u = Mt.class,
      p = {},
      f = [],
      g = Mt.contexts,
      $ = Mt.props;
    let { component: I = Mt.component } = t;
    Object.entries(Mt.classMap).forEach(([e, t]) => {
      const n = re(t);
      n &&
        "subscribe" in n &&
        f.push(
          n.subscribe((t) => {
            i(4, (p[e] = t), p);
          })
        );
    });
    const v = Et(Z());
    for (let e in g) g.hasOwnProperty(e) && ie(e, g[e]);
    return (
      te(() => {
        for (const e of f) e();
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (a = m(t, r))),
          "use" in e && i(0, (c = e.use)),
          "class" in e && i(1, (d = e.class)),
          "component" in e && i(2, (I = e.component)),
          "$$scope" in e && i(12, (l = e.$$scope));
      }),
      [
        c,
        d,
        I,
        s,
        p,
        u,
        $,
        v,
        a,
        function () {
          return s.getElement();
        },
        o,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (s = e), i(3, s);
          });
        },
        l,
      ]
    );
  }
  class kt extends Pe {
    constructor(e) {
      super(),
        He(this, e, Ft, Rt, o, {
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
  const Ut = Object.assign({}, Mt);
  function Ht(e) {
    return new Proxy(kt, {
      construct: function (t, n) {
        return Object.assign(Mt, Ut, e), new t(...n);
      },
      get: function (t, n) {
        return Object.assign(Mt, Ut, e), t[n];
      },
    });
  }
  function Pt(e) {
    let t, i, r, o, l;
    const d = e[7].default,
      h = c(d, e, e[6], null);
    let m = [{ href: e[1] }, e[4]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("a")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[8](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[3].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 64 & n) &&
          p(h, d, e, e[6], r ? u(d, e[6], n, null) : f(e[6]), null),
          H(t, (g = Ne(m, [(!r || 2 & n) && { href: e[1] }, 16 & n && e[4]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[8](null), (o = !1), s(l);
      },
    };
  }
  function Bt(e, t, i) {
    const r = ["use", "href", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t,
      { href: c = "javascript:void(0);" } = t;
    const d = Et(Z());
    let u;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(4, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "href" in e && i(1, (c = e.href)),
          "$$scope" in e && i(6, (o = e.$$scope));
      }),
      [
        l,
        c,
        u,
        d,
        s,
        function () {
          return u;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (u = e), i(2, u);
          });
        },
      ]
    );
  }
  function Vt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("button")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          t.autofocus && t.focus(),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function jt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function zt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("h1")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function Gt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function qt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("h2")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function Kt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Wt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("h3")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function Xt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Yt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("li")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function Qt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function Jt(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("nav")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function Zt(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  function en(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("span")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function tn(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  class nn extends Pe {
    constructor(e) {
      super(), He(this, e, tn, en, o, { use: 0, getElement: 4 });
    }
    get getElement() {
      return this.$$.ctx[4];
    }
  }
  function rn(e) {
    let t, i, r, o, l;
    const d = e[6].default,
      h = c(d, e, e[5], null);
    let m = [e[3]],
      g = {};
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("ul")), h && h.c(), H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          h && h.m(t, null),
          e[7](t),
          (r = !0),
          o ||
            ((l = [v((i = xt.call(null, t, e[0]))), v(e[2].call(null, t))]),
            (o = !0));
      },
      p(e, [n]) {
        h &&
          h.p &&
          (!r || 32 & n) &&
          p(h, d, e, e[5], r ? u(d, e[5], n, null) : f(e[5]), null),
          H(t, (g = Ne(m, [8 & n && e[3]]))),
          i && a(i.update) && 1 & n && i.update.call(null, e[0]);
      },
      i(e) {
        r || (Se(h, e), (r = !0));
      },
      o(e) {
        _e(h, e), (r = !1);
      },
      d(n) {
        n && L(t), h && h.d(n), e[7](null), (o = !1), s(l);
      },
    };
  }
  function sn(e, t, i) {
    const r = ["use", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t,
      { use: l = [] } = t;
    const c = Et(Z());
    let d;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(3, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "$$scope" in e && i(5, (o = e.$$scope));
      }),
      [
        l,
        d,
        c,
        s,
        function () {
          return d;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(1, d);
          });
        },
      ]
    );
  }
  const an = class extends Pe {
      constructor(e) {
        super(), He(this, e, Bt, Pt, o, { use: 0, href: 1, getElement: 5 });
      }
      get getElement() {
        return this.$$.ctx[5];
      }
    },
    on = class extends Pe {
      constructor(e) {
        super(), He(this, e, jt, Vt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    ln = Dt,
    cn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Gt, zt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    dn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Kt, qt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    un = class extends Pe {
      constructor(e) {
        super(), He(this, e, Xt, Wt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    pn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Qt, Yt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    fn = class extends Pe {
      constructor(e) {
        super(), He(this, e, Zt, Jt, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    },
    hn = nn,
    mn = class extends Pe {
      constructor(e) {
        super(), He(this, e, sn, rn, o, { use: 0, getElement: 4 });
      }
      get getElement() {
        return this.$$.ctx[4];
      }
    };
  var gn = Ht({ class: "mdc-top-app-bar__row", component: ln });
  function $n(e) {
    let t, i, r, o, l, d;
    const h = e[9].default,
      m = c(h, e, e[8], null);
    let g = [
        {
          class: (i = $t({
            [e[1]]: !0,
            "mdc-top-app-bar__section": !0,
            "mdc-top-app-bar__section--align-start": "start" === e[2],
            "mdc-top-app-bar__section--align-end": "end" === e[2],
          })),
        },
        e[3] ? { role: "toolbar" } : {},
        e[6],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("section")), m && m.c(), H(t, $);
      },
      m(n, i) {
        O(n, t, i),
          m && m.m(t, null),
          e[10](t),
          (o = !0),
          l ||
            ((d = [v((r = xt.call(null, t, e[0]))), v(e[5].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!o || 256 & n) &&
          p(m, h, e, e[8], o ? u(h, e[8], n, null) : f(e[8]), null),
          H(
            t,
            ($ = Ne(g, [
              (!o ||
                (6 & n &&
                  i !==
                    (i = $t({
                      [e[1]]: !0,
                      "mdc-top-app-bar__section": !0,
                      "mdc-top-app-bar__section--align-start": "start" === e[2],
                      "mdc-top-app-bar__section--align-end": "end" === e[2],
                    })))) && { class: i },
              8 & n && (e[3] ? { role: "toolbar" } : {}),
              64 & n && e[6],
            ]))
          ),
          r && a(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        o || (Se(m, e), (o = !0));
      },
      o(e) {
        _e(m, e), (o = !1);
      },
      d(n) {
        n && L(t), m && m.d(n), e[10](null), (l = !1), s(d);
      },
    };
  }
  function In(e, t, i) {
    const r = ["use", "class", "align", "toolbar", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      { use: d = [] } = t,
      { class: u = "" } = t,
      { align: p = "start" } = t,
      { toolbar: f = !1 } = t;
    return (
      ie(
        "SMUI:icon-button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      ie(
        "SMUI:button:context",
        f ? "top-app-bar:action" : "top-app-bar:navigation"
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (s = m(t, r))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "align" in e && i(2, (p = e.align)),
          "toolbar" in e && i(3, (f = e.toolbar)),
          "$$scope" in e && i(8, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        f,
        c,
        l,
        s,
        function () {
          return c;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  var vn = Ht({ class: "mdc-top-app-bar__title", component: hn });
  const yn = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, In, $n, o, {
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
  class bn {
    constructor(e, t) {
      (this._value = e), (this._error = t);
    }
    map(e) {
      if (this._error) return new bn(null, this._error);
      {
        const t = e(this._value);
        return new bn(t, null);
      }
    }
    mapError(e) {
      if (this._error) {
        const t = e(this._error);
        return new bn(null, t);
      }
      return new bn(this._value, null);
    }
    unwrap() {
      if (this._error) throw this._error;
      return this._value;
    }
  }
  function En(e, t) {
    return e.reduce((e, n) => {
      const i = t(n);
      return void 0 !== i && e.push(i), e;
    }, []);
  }
  function An(e) {
    return e[0].toUpperCase() + e.substring(1);
  }
  function xn(e) {
    const t = document.createElement("a");
    t.setAttribute("href", e), t.setAttribute("target", "_blank"), t.click();
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
  var Cn = {
      LABEL_FLOAT_ABOVE: "mdc-floating-label--float-above",
      LABEL_REQUIRED: "mdc-floating-label--required",
      LABEL_SHAKE: "mdc-floating-label--shake",
      ROOT: "mdc-floating-label",
    },
    Sn = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.shakeAnimationEndHandler = function () {
            i.handleShakeAnimationEnd();
          }),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Cn;
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
            r = n.LABEL_SHAKE;
          e
            ? this.adapter.addClass(i)
            : (this.adapter.removeClass(i), this.adapter.removeClass(r));
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
    })(Ye),
    _n = {
      LINE_RIPPLE_ACTIVE: "mdc-line-ripple--active",
      LINE_RIPPLE_DEACTIVATING: "mdc-line-ripple--deactivating",
    },
    Tn = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.transitionEndHandler = function (e) {
            i.handleTransitionEnd(e);
          }),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return _n;
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
          this.adapter.removeClass(_n.LINE_RIPPLE_DEACTIVATING),
            this.adapter.addClass(_n.LINE_RIPPLE_ACTIVE);
        }),
        (t.prototype.setRippleCenter = function (e) {
          this.adapter.setStyle("transform-origin", e + "px center");
        }),
        (t.prototype.deactivate = function () {
          this.adapter.addClass(_n.LINE_RIPPLE_DEACTIVATING);
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = this.adapter.hasClass(_n.LINE_RIPPLE_DEACTIVATING);
          "opacity" === e.propertyName &&
            t &&
            (this.adapter.removeClass(_n.LINE_RIPPLE_ACTIVE),
            this.adapter.removeClass(_n.LINE_RIPPLE_DEACTIVATING));
        }),
        t
      );
    })(Ye),
    On = { NOTCH_ELEMENT_SELECTOR: ".mdc-notched-outline__notch" },
    Ln = { NOTCH_ELEMENT_PADDING: 8 },
    wn = {
      NO_LABEL: "mdc-notched-outline--no-label",
      OUTLINE_NOTCHED: "mdc-notched-outline--notched",
      OUTLINE_UPGRADED: "mdc-notched-outline--upgraded",
    },
    Dn = (function (e) {
      function t(n) {
        return e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return On;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return wn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ln;
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
          e > 0 && (e += Ln.NOTCH_ELEMENT_PADDING),
            this.adapter.setNotchWidthProperty(e),
            this.adapter.addClass(n);
        }),
        (t.prototype.closeNotch = function () {
          var e = t.cssClasses.OUTLINE_NOTCHED;
          this.adapter.removeClass(e), this.adapter.removeNotchWidthProperty();
        }),
        t
      );
    })(Ye),
    Nn = {
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
    Rn = {
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
    Mn = { LABEL_SCALE: 0.75 },
    Fn = [
      "pattern",
      "min",
      "max",
      "required",
      "step",
      "minlength",
      "maxlength",
    ],
    kn = ["color", "date", "datetime-local", "month", "range", "time", "week"],
    Un = ["mousedown", "touchstart"],
    Hn = ["click", "keydown"],
    Pn = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var r = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (r.isFocused = !1),
          (r.receivedUserInput = !1),
          (r.valid = !0),
          (r.useNativeValidation = !0),
          (r.validateOnValueChange = !0),
          (r.helperText = i.helperText),
          (r.characterCounter = i.characterCounter),
          (r.leadingIcon = i.leadingIcon),
          (r.trailingIcon = i.trailingIcon),
          (r.inputFocusHandler = function () {
            r.activateFocus();
          }),
          (r.inputBlurHandler = function () {
            r.deactivateFocus();
          }),
          (r.inputInputHandler = function () {
            r.handleInput();
          }),
          (r.setPointerXOffset = function (e) {
            r.setTransformOrigin(e);
          }),
          (r.textFieldInteractionHandler = function () {
            r.handleTextFieldInteraction();
          }),
          (r.validationAttributeChangeHandler = function (e) {
            r.handleValidationAttributeChange(e);
          }),
          r
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Rn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Nn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Mn;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "shouldAlwaysFloat", {
          get: function () {
            var e = this.getNativeInput().type;
            return kn.indexOf(e) >= 0;
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
            for (var r = We(Un), s = r.next(); !s.done; s = r.next()) {
              var a = s.value;
              this.adapter.registerInputInteractionHandler(
                a,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = r.return) && t.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = We(Hn), l = o.next(); !l.done; l = o.next()) {
              a = l.value;
              this.adapter.registerTextFieldInteractionHandler(
                a,
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
            for (var r = We(Un), s = r.next(); !s.done; s = r.next()) {
              var a = s.value;
              this.adapter.deregisterInputInteractionHandler(
                a,
                this.setPointerXOffset
              );
            }
          } catch (t) {
            e = { error: t };
          } finally {
            try {
              s && !s.done && (t = r.return) && t.call(r);
            } finally {
              if (e) throw e.error;
            }
          }
          try {
            for (var o = We(Hn), l = o.next(); !l.done; l = o.next()) {
              a = l.value;
              this.adapter.deregisterTextFieldInteractionHandler(
                a,
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
              Fn.indexOf(e) > -1 &&
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
              var t = this.adapter.getLabelWidth() * Mn.LABEL_SCALE;
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
              r = n.clientX - i.left;
            this.adapter.setLineRippleTransformOrigin(r);
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
              r = this.helperText.getId();
            i && r
              ? this.adapter.setInputAttr(Nn.ARIA_DESCRIBEDBY, r)
              : this.adapter.removeInputAttr(Nn.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.styleFocused = function (e) {
          var n = t.cssClasses.FOCUSED;
          e ? this.adapter.addClass(n) : this.adapter.removeClass(n);
        }),
        (t.prototype.styleDisabled = function (e) {
          var n = t.cssClasses,
            i = n.DISABLED,
            r = n.INVALID;
          e
            ? (this.adapter.addClass(i), this.adapter.removeClass(r))
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
    })(Ye),
    Bn = "mdc-dom-focus-sentinel",
    Vn = (function () {
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
            .call(this.root.querySelectorAll("." + Bn))
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
                  !e.classList.contains(Bn) &&
                  !t,
                i = !1;
              if (n) {
                var r = getComputedStyle(e);
                i = "none" === r.display || "hidden" === r.visibility;
              }
              return n && !i;
            });
        }),
        (e.prototype.createSentinel = function () {
          var e = document.createElement("div");
          return (
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-hidden", "true"),
            e.classList.add(Bn),
            e
          );
        }),
        e
      );
    })(),
    jn = Object.freeze({ __proto__: null, FocusTrap: Vn }),
    zn = "Unknown",
    Gn = "Backspace",
    qn = "Enter",
    Kn = "Spacebar",
    Wn = "PageUp",
    Xn = "PageDown",
    Yn = "End",
    Qn = "Home",
    Jn = "ArrowLeft",
    Zn = "ArrowUp",
    ei = "ArrowRight",
    ti = "ArrowDown",
    ni = "Delete",
    ii = "Escape",
    ri = "Tab",
    si = new Set();
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
   */ si.add(Gn),
    si.add(qn),
    si.add(Kn),
    si.add(Wn),
    si.add(Xn),
    si.add(Yn),
    si.add(Qn),
    si.add(Jn),
    si.add(Zn),
    si.add(ei),
    si.add(ti),
    si.add(ni),
    si.add(ii),
    si.add(ri);
  var ai = 8,
    oi = 13,
    li = 32,
    ci = 33,
    di = 34,
    ui = 35,
    pi = 36,
    fi = 37,
    hi = 38,
    mi = 39,
    gi = 40,
    $i = 46,
    Ii = 27,
    vi = 9,
    yi = new Map();
  yi.set(ai, Gn),
    yi.set(oi, qn),
    yi.set(li, Kn),
    yi.set(ci, Wn),
    yi.set(di, Xn),
    yi.set(ui, Yn),
    yi.set(pi, Qn),
    yi.set(fi, Jn),
    yi.set(hi, Zn),
    yi.set(mi, ei),
    yi.set(gi, ti),
    yi.set($i, ni),
    yi.set(Ii, ii),
    yi.set(vi, ri);
  var bi = new Set();
  function Ei(e) {
    var t = e.key;
    if (si.has(t)) return t;
    var n = yi.get(e.keyCode);
    return n || zn;
  }
  function Ai(e) {
    let t;
    const n = e[9].default,
      i = c(n, e, e[11], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 2048 & r) &&
          p(i, n, e, e[11], t ? u(n, e[11], r, null) : f(e[11]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function xi(e) {
    let t, i, r;
    const s = [
      { use: [e[4], ...e[0]] },
      {
        class: $t({
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
    var a = e[2];
    function o(e) {
      let t = { $$slots: { default: [Ai] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a && ((t = new a(o(e))), e[10](t)),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            243 & n
              ? Ne(s, [
                  17 & n && { use: [e[4], ...e[0]] },
                  34 & n && {
                    class: $t({
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
                  32 & n &&
                    Re("snackbar" === e[5] ? { "aria-atomic": "false" } : {}),
                  64 & n && { tabindex: e[6] },
                  128 & n && Re(e[7]),
                ])
              : {};
          if (
            (2048 & n && (r.$$scope = { dirty: n, ctx: e }), a !== (a = e[2]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[10](t),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[10](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  function Ci(e, t, i) {
    const r = ["use", "class", "component", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      { use: d = [] } = t,
      { class: u = "" } = t,
      { component: p = nn } = t;
    const f = re("SMUI:label:context"),
      g = re("SMUI:label:tabindex");
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(7, (s = m(t, r))),
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
        f,
        g,
        s,
        function () {
          return c.getElement();
        },
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
        o,
      ]
    );
  }
  bi.add(Wn),
    bi.add(Xn),
    bi.add(Yn),
    bi.add(Qn),
    bi.add(Jn),
    bi.add(Zn),
    bi.add(ei),
    bi.add(ti);
  function Si(e) {
    let t;
    const n = e[4].default,
      i = c(n, e, e[3], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, [r]) {
        i &&
          i.p &&
          (!t || 8 & r) &&
          p(i, n, e, e[3], t ? u(n, e[3], r, null) : f(e[3]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function _i(e, t, n) {
    let i,
      { $$slots: r = {}, $$scope: s } = t,
      { key: a } = t,
      { value: o } = t;
    const c = gt(o);
    return (
      l(e, c, (e) => n(5, (i = e))),
      ie(a, c),
      te(() => {
        c.set(void 0);
      }),
      (e.$$set = (e) => {
        "key" in e && n(1, (a = e.key)),
          "value" in e && n(2, (o = e.value)),
          "$$scope" in e && n(3, (s = e.$$scope));
      }),
      (e.$$.update = () => {
        4 & e.$$.dirty && I(c, (i = o), i);
      }),
      [c, a, o, s, r]
    );
  }
  class Ti extends Pe {
    constructor(e) {
      super(), He(this, e, _i, Si, o, { key: 1, value: 2 });
    }
  }
  const Oi = class extends Pe {
      constructor(e) {
        super(),
          He(this, e, Ci, xi, o, {
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
    { applyPassive: Li } = Qe,
    { matches: wi } = et;
  function Di(
    e,
    {
      ripple: t = !0,
      surface: n = !1,
      unbounded: i = !1,
      disabled: r = !1,
      color: s,
      active: a,
      rippleElement: o,
      eventTarget: l,
      activeTarget: c,
      addClass: d = (t) => e.classList.add(t),
      removeClass: u = (t) => e.classList.remove(t),
      addStyle: p = (t, n) => e.style.setProperty(t, n),
      initPromise: f = Promise.resolve(),
    } = {}
  ) {
    let h,
      m,
      g = re("SMUI:addLayoutListener"),
      $ = a,
      I = l,
      v = c;
    function y() {
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
        h &&
          $ !== a &&
          (($ = a), a ? h.activate() : !1 === a && h.deactivate()),
        t && !h
          ? ((h = new ot({
              addClass: d,
              browserSupportsCssVars: () =>
                (function (e, t) {
                  void 0 === t && (t = !1);
                  var n,
                    i = e.CSS;
                  if ("boolean" == typeof Ze && !t) return Ze;
                  if (!i || "function" != typeof i.supports) return !1;
                  var r = i.supports("--css-vars", "yes"),
                    s =
                      i.supports("(--css-vars: yes)") &&
                      i.supports("color", "#00000000");
                  return (n = r || s), t || (Ze = n), n;
                })(window),
              computeBoundingRect: () => (o || e).getBoundingClientRect(),
              containsEventTarget: (t) => e.contains(t),
              deregisterDocumentInteractionHandler: (e, t) =>
                document.documentElement.removeEventListener(e, t, Li()),
              deregisterInteractionHandler: (t, n) =>
                (l || e).removeEventListener(t, n, Li()),
              deregisterResizeHandler: (e) =>
                window.removeEventListener("resize", e),
              getWindowPageOffset: () => ({
                x: window.pageXOffset,
                y: window.pageYOffset,
              }),
              isSurfaceActive: () => (null == a ? wi(c || e, ":active") : a),
              isSurfaceDisabled: () => !!r,
              isUnbounded: () => !!i,
              registerDocumentInteractionHandler: (e, t) =>
                document.documentElement.addEventListener(e, t, Li()),
              registerInteractionHandler: (t, n) =>
                (l || e).addEventListener(t, n, Li()),
              registerResizeHandler: (e) =>
                window.addEventListener("resize", e),
              removeClass: u,
              updateCssVariable: p,
            })),
            f.then(() => {
              h && (h.init(), h.setUnbounded(i));
            }))
          : h &&
            !t &&
            f.then(() => {
              h && (h.destroy(), (h = void 0));
            }),
        !h ||
          (I === l && v === c) ||
          ((I = l),
          (v = c),
          h.destroy(),
          requestAnimationFrame(() => {
            h && (h.init(), h.setUnbounded(i));
          })),
        !t && i && d("mdc-ripple-upgraded--unbounded");
    }
    return (
      y(),
      g &&
        (m = g(function () {
          h && h.layout();
        })),
      {
        update(h) {
          ({
            ripple: t,
            surface: n,
            unbounded: i,
            disabled: r,
            color: s,
            active: a,
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
            h
          )),
            y();
        },
        destroy() {
          h &&
            (h.destroy(),
            (h = void 0),
            u("mdc-ripple-surface"),
            u("smui-ripple-surface--primary"),
            u("smui-ripple-surface--secondary")),
            m && m();
        },
      }
    );
  }
  function Ni(e) {
    let t, i, r, o, l, d, h, m;
    const g = e[22].default,
      $ = c(g, e, e[21], null);
    let I = [
        {
          class: (i = $t({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(ki).concat([e[4]]).join(" ")) },
        { for: (o = e[5] || (e[11] ? e[11].id : void 0)) },
        e[12],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = n(y, I[e]);
    return {
      c() {
        (t = D("label")), $ && $.c(), H(t, y);
      },
      m(n, i) {
        O(n, t, i),
          $ && $.m(t, null),
          e[24](t),
          (d = !0),
          h ||
            ((m = [v((l = xt.call(null, t, e[2]))), v(e[10].call(null, t))]),
            (h = !0));
      },
      p(e, n) {
        $ &&
          $.p &&
          (!d || 2097152 & n) &&
          p($, g, e, e[21], d ? u(g, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (y = Ne(I, [
              (!d ||
                (267 & n &&
                  i !==
                    (i = $t({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!d ||
                (528 & n &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(ki)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              (!d ||
                (32 & n &&
                  o !== (o = e[5] || (e[11] ? e[11].id : void 0)))) && {
                for: o,
              },
              4096 & n && e[12],
            ]))
          ),
          l && a(l.update) && 4 & n && l.update.call(null, e[2]);
      },
      i(e) {
        d || (Se($, e), (d = !0));
      },
      o(e) {
        _e($, e), (d = !1);
      },
      d(n) {
        n && L(t), $ && $.d(n), e[24](null), (h = !1), s(m);
      },
    };
  }
  function Ri(e) {
    let t, i, r, o, l, d, h;
    const m = e[22].default,
      g = c(m, e, e[21], null);
    let $ = [
        {
          class: (i = $t({
            [e[3]]: !0,
            "mdc-floating-label": !0,
            "mdc-floating-label--float-above": e[0],
            "mdc-floating-label--required": e[1],
            ...e[8],
          })),
        },
        { style: (r = Object.entries(e[9]).map(Fi).concat([e[4]]).join(" ")) },
        e[12],
      ],
      I = {};
    for (let e = 0; e < $.length; e += 1) I = n(I, $[e]);
    return {
      c() {
        (t = D("span")), g && g.c(), H(t, I);
      },
      m(n, i) {
        O(n, t, i),
          g && g.m(t, null),
          e[23](t),
          (l = !0),
          d ||
            ((h = [v((o = xt.call(null, t, e[2]))), v(e[10].call(null, t))]),
            (d = !0));
      },
      p(e, n) {
        g &&
          g.p &&
          (!l || 2097152 & n) &&
          p(g, m, e, e[21], l ? u(m, e[21], n, null) : f(e[21]), null),
          H(
            t,
            (I = Ne($, [
              (!l ||
                (267 & n &&
                  i !==
                    (i = $t({
                      [e[3]]: !0,
                      "mdc-floating-label": !0,
                      "mdc-floating-label--float-above": e[0],
                      "mdc-floating-label--required": e[1],
                      ...e[8],
                    })))) && { class: i },
              (!l ||
                (528 & n &&
                  r !==
                    (r = Object.entries(e[9])
                      .map(Fi)
                      .concat([e[4]])
                      .join(" ")))) && { style: r },
              4096 & n && e[12],
            ]))
          ),
          o && a(o.update) && 4 & n && o.update.call(null, e[2]);
      },
      i(e) {
        l || (Se(g, e), (l = !0));
      },
      o(e) {
        _e(g, e), (l = !1);
      },
      d(n) {
        n && L(t), g && g.d(n), e[23](null), (d = !1), s(h);
      },
    };
  }
  function Mi(e) {
    let t, n, i, r;
    const s = [Ri, Ni],
      a = [];
    function o(e, t) {
      return e[6] ? 0 : 1;
    }
    return (
      (t = o(e)),
      (n = a[t] = s[t](e)),
      {
        c() {
          n.c(), (i = F());
        },
        m(e, n) {
          a[t].m(e, n), O(e, i, n), (r = !0);
        },
        p(e, [r]) {
          let l = t;
          (t = o(e)),
            t === l
              ? a[t].p(e, r)
              : (xe(),
                _e(a[l], 1, 1, () => {
                  a[l] = null;
                }),
                Ce(),
                (n = a[t]),
                n ? n.p(e, r) : ((n = a[t] = s[t](e)), n.c()),
                Se(n, 1),
                n.m(i.parentNode, i));
        },
        i(e) {
          r || (Se(n), (r = !0));
        },
        o(e) {
          _e(n), (r = !1);
        },
        d(e) {
          a[t].d(e), e && L(i);
        },
      }
    );
  }
  const Fi = ([e, t]) => `${e}: ${t};`,
    ki = ([e, t]) => `${e}: ${t};`;
  function Ui(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    var l;
    const c = Et(Z());
    let d,
      u,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { style: g = "" } = t,
      { for: $ } = t,
      { floatAbove: I = !1 } = t,
      { required: v = !1 } = t,
      { wrapped: y = !1 } = t,
      b = {},
      E = {},
      A =
        null !== (l = re("SMUI:generic:input:props")) && void 0 !== l ? l : {},
      x = I,
      C = v;
    function S(e) {
      b[e] || i(8, (b[e] = !0), b);
    }
    function _(e) {
      (e in b && !b[e]) || i(8, (b[e] = !1), b);
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
      ee(() => {
        i(
          18,
          (u = new Sn({
            addClass: S,
            removeClass: _,
            getWidth: () => {
              var e, t;
              const n = L(),
                i = n.cloneNode(!0);
              null === (e = n.parentNode) || void 0 === e || e.appendChild(i),
                i.classList.add("smui-floating-label--remove-transition"),
                i.classList.add("smui-floating-label--force-size"),
                i.classList.remove("mdc-floating-label--float-above");
              const r = i.scrollWidth;
              return (
                null === (t = n.parentNode) || void 0 === t || t.removeChild(i),
                r
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
          It(d, "SMUIFloatingLabel:mount", e),
          u.init(),
          () => {
            It(d, "SMUIFloatingLabel:unmount", e), u.destroy();
          }
        );
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(12, (s = m(t, r))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (f = e.class)),
          "style" in e && i(4, (g = e.style)),
          "for" in e && i(5, ($ = e.for)),
          "floatAbove" in e && i(0, (I = e.floatAbove)),
          "required" in e && i(1, (v = e.required)),
          "wrapped" in e && i(6, (y = e.wrapped)),
          "$$scope" in e && i(21, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        786433 & e.$$.dirty && u && x !== I && (i(19, (x = I)), u.float(I)),
          1310722 & e.$$.dirty &&
            u &&
            C !== v &&
            (i(20, (C = v)), u.setRequired(v));
      }),
      [
        I,
        v,
        p,
        f,
        g,
        $,
        y,
        d,
        b,
        E,
        c,
        A,
        s,
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
        x,
        C,
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(7, d);
          });
        },
      ]
    );
  }
  class Hi extends Pe {
    constructor(e) {
      super(),
        He(this, e, Ui, Mi, o, {
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
  function Pi(t) {
    let i,
      r,
      o,
      l,
      c,
      d,
      u = [
        {
          class: (r = $t({
            [t[1]]: !0,
            "mdc-line-ripple": !0,
            "mdc-line-ripple--active": t[3],
            ...t[5],
          })),
        },
        { style: (o = Object.entries(t[6]).map(Bi).concat([t[2]]).join(" ")) },
        t[8],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = n(p, u[e]);
    return {
      c() {
        (i = D("div")), H(i, p);
      },
      m(e, n) {
        O(e, i, n),
          t[13](i),
          c ||
            ((d = [v((l = xt.call(null, i, t[0]))), v(t[7].call(null, i))]),
            (c = !0));
      },
      p(e, [t]) {
        H(
          i,
          (p = Ne(u, [
            42 & t &&
              r !==
                (r = $t({
                  [e[1]]: !0,
                  "mdc-line-ripple": !0,
                  "mdc-line-ripple--active": e[3],
                  ...e[5],
                })) && { class: r },
            68 & t &&
              o !==
                (o = Object.entries(e[6]).map(Bi).concat([e[2]]).join(" ")) && {
                style: o,
              },
            256 & t && e[8],
          ]))
        ),
          l && a(l.update) && 1 & t && l.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && L(i), t[13](null), (c = !1), s(d);
      },
    };
  }
  const Bi = ([e, t]) => `${e}: ${t};`;
  function Vi(e, t, i) {
    const r = [
      "use",
      "class",
      "style",
      "active",
      "activate",
      "deactivate",
      "setRippleCenter",
      "getElement",
    ];
    let s = m(t, r);
    const a = Et(Z());
    let o,
      l,
      { use: c = [] } = t,
      { class: d = "" } = t,
      { style: u = "" } = t,
      { active: p = !1 } = t,
      f = {},
      g = {};
    function $(e) {
      return e in f ? f[e] : b().classList.contains(e);
    }
    function I(e) {
      f[e] || i(5, (f[e] = !0), f);
    }
    function v(e) {
      (e in f && !f[e]) || i(5, (f[e] = !1), f);
    }
    function y(e, t) {
      g[e] != t &&
        ("" === t || null == t ? (delete g[e], i(6, g)) : i(6, (g[e] = t), g));
    }
    function b() {
      return o;
    }
    return (
      ee(
        () => (
          (l = new Tn({
            addClass: I,
            removeClass: v,
            hasClass: $,
            setStyle: y,
            registerEventHandler: (e, t) => b().addEventListener(e, t),
            deregisterEventHandler: (e, t) => b().removeEventListener(e, t),
          })),
          l.init(),
          () => {
            l.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (s = m(t, r))),
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
        f,
        g,
        a,
        s,
        function () {
          l.activate();
        },
        function () {
          l.deactivate();
        },
        function (e) {
          l.setRippleCenter(e);
        },
        b,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (o = e), i(4, o);
          });
        },
      ]
    );
  }
  class ji extends Pe {
    constructor(e) {
      super(),
        He(this, e, Vi, Pi, o, {
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
  function zi(e) {
    let t, n, i;
    const r = e[14].default,
      s = c(r, e, e[13], null);
    return {
      c() {
        (t = D("div")),
          s && s.c(),
          U(t, "class", "mdc-notched-outline__notch"),
          U(t, "style", (n = Object.entries(e[7]).map(qi).join(" ")));
      },
      m(e, n) {
        O(e, t, n), s && s.m(t, null), (i = !0);
      },
      p(e, a) {
        s &&
          s.p &&
          (!i || 8192 & a) &&
          p(s, r, e, e[13], i ? u(r, e[13], a, null) : f(e[13]), null),
          (!i ||
            (128 & a && n !== (n = Object.entries(e[7]).map(qi).join(" ")))) &&
            U(t, "style", n);
      },
      i(e) {
        i || (Se(s, e), (i = !0));
      },
      o(e) {
        _e(s, e), (i = !1);
      },
      d(e) {
        e && L(t), s && s.d(e);
      },
    };
  }
  function Gi(e) {
    let t,
      i,
      r,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h = !e[3] && zi(e),
      m = [
        {
          class: (c = $t({
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
    for (let e = 0; e < m.length; e += 1) g = n(g, m[e]);
    return {
      c() {
        (t = D("div")),
          (i = D("div")),
          (r = M()),
          h && h.c(),
          (o = M()),
          (l = D("div")),
          U(i, "class", "mdc-notched-outline__leading"),
          U(l, "class", "mdc-notched-outline__trailing"),
          H(t, g);
      },
      m(n, s) {
        O(n, t, s),
          S(t, i),
          S(t, r),
          h && h.m(t, null),
          S(t, o),
          S(t, l),
          e[15](t),
          (u = !0),
          p ||
            ((f = [
              v((d = xt.call(null, t, e[0]))),
              v(e[8].call(null, t)),
              k(t, "SMUIFloatingLabel:mount", e[16]),
              k(t, "SMUIFloatingLabel:unmount", e[17]),
            ]),
            (p = !0));
      },
      p(e, [n]) {
        e[3]
          ? h &&
            (xe(),
            _e(h, 1, 1, () => {
              h = null;
            }),
            Ce())
          : h
          ? (h.p(e, n), 8 & n && Se(h, 1))
          : ((h = zi(e)), h.c(), Se(h, 1), h.m(t, o)),
          H(
            t,
            (g = Ne(m, [
              (!u ||
                (78 & n &&
                  c !==
                    (c = $t({
                      [e[1]]: !0,
                      "mdc-notched-outline": !0,
                      "mdc-notched-outline--notched": e[2],
                      "mdc-notched-outline--no-label": e[3],
                      ...e[6],
                    })))) && { class: c },
              512 & n && e[9],
            ]))
          ),
          d && a(d.update) && 1 & n && d.update.call(null, e[0]);
      },
      i(e) {
        u || (Se(h), (u = !0));
      },
      o(e) {
        _e(h), (u = !1);
      },
      d(n) {
        n && L(t), h && h.d(), e[15](null), (p = !1), s(f);
      },
    };
  }
  const qi = ([e, t]) => `${e}: ${t};`;
  function Ki(e, t, i) {
    const r = [
      "use",
      "class",
      "notched",
      "noLabel",
      "notch",
      "closeNotch",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      d,
      u,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { notched: g = !1 } = t,
      { noLabel: $ = !1 } = t,
      I = {},
      v = {};
    function y(e) {
      I[e] || i(6, (I[e] = !0), I);
    }
    function b(e) {
      (e in I && !I[e]) || i(6, (I[e] = !1), I);
    }
    ee(
      () => (
        (d = new Dn({
          addClass: y,
          removeClass: b,
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
        (t = n(n({}, t), h(e))),
          i(9, (s = m(t, r))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (f = e.class)),
          "notched" in e && i(2, (g = e.notched)),
          "noLabel" in e && i(3, ($ = e.noLabel)),
          "$$scope" in e && i(13, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty &&
          (u
            ? (u.addStyle("transition-duration", "0s"),
              y("mdc-notched-outline--upgraded"),
              requestAnimationFrame(() => {
                u && u.removeStyle("transition-duration");
              }))
            : b("mdc-notched-outline--upgraded"));
      }),
      [
        p,
        f,
        g,
        $,
        u,
        c,
        I,
        v,
        l,
        s,
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
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
        (e) => i(4, (u = e.detail)),
        () => i(4, (u = void 0)),
      ]
    );
  }
  class Wi extends Pe {
    constructor(e) {
      super(),
        He(this, e, Ki, Gi, o, {
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
  var Xi = Ht({ class: "mdc-text-field-helper-line", component: ln }),
    Yi = Ht({
      class: "mdc-text-field__affix mdc-text-field__affix--prefix",
      component: hn,
    }),
    Qi = Ht({
      class: "mdc-text-field__affix mdc-text-field__affix--suffix",
      component: hn,
    });
  function Ji(t) {
    let i,
      r,
      o,
      l,
      c,
      d = [
        { class: (r = $t({ [t[1]]: !0, "mdc-text-field__input": !0 })) },
        { type: t[2] },
        { placeholder: t[3] },
        t[4],
        t[6],
        t[10],
      ],
      u = {};
    for (let e = 0; e < d.length; e += 1) u = n(u, d[e]);
    return {
      c() {
        (i = D("input")), H(i, u);
      },
      m(e, n) {
        O(e, i, n),
          i.autofocus && i.focus(),
          t[26](i),
          l ||
            ((c = [
              v((o = xt.call(null, i, t[0]))),
              v(t[7].call(null, i)),
              k(i, "input", t[27]),
              k(i, "change", t[9]),
              k(i, "blur", t[24]),
              k(i, "focus", t[25]),
            ]),
            (l = !0));
      },
      p(e, [t]) {
        H(
          i,
          (u = Ne(d, [
            2 & t &&
              r !== (r = $t({ [e[1]]: !0, "mdc-text-field__input": !0 })) && {
                class: r,
              },
            4 & t && { type: e[2] },
            8 & t && { placeholder: e[3] },
            16 & t && e[4],
            64 & t && e[6],
            1024 & t && e[10],
          ]))
        ),
          o && a(o.update) && 1 & t && o.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && L(i), t[26](null), (l = !1), s(c);
      },
    };
  }
  function Zi(e, t, i) {
    const r = [
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
    let s = m(t, r);
    const a = Et(Z());
    let o = () => {};
    let { use: l = [] } = t,
      { class: c = "" } = t,
      { type: d = "text" } = t,
      { placeholder: u = " " } = t,
      { value: p = o } = t;
    const f = (function (e) {
      return e === o;
    })(p);
    f && (p = "");
    let { files: g = null } = t,
      { dirty: $ = !1 } = t,
      { invalid: I = !1 } = t,
      { updateInvalid: v = !0 } = t,
      { emptyValueNull: y = null === p } = t;
    f && y && (p = null);
    let b,
      { emptyValueUndefined: E = void 0 === p } = t;
    f && E && (p = void 0);
    let A = {},
      x = {};
    function C(e) {
      if ("file" !== d)
        if ("" === e.currentTarget.value && y) i(11, (p = null));
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
    function S() {
      return b;
    }
    ee(() => {
      v && i(14, (I = b.matches(":invalid")));
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (l = e.use)),
          "class" in e && i(1, (c = e.class)),
          "type" in e && i(2, (d = e.type)),
          "placeholder" in e && i(3, (u = e.placeholder)),
          "value" in e && i(11, (p = e.value)),
          "files" in e && i(12, (g = e.files)),
          "dirty" in e && i(13, ($ = e.dirty)),
          "invalid" in e && i(14, (I = e.invalid)),
          "updateInvalid" in e && i(15, (v = e.updateInvalid)),
          "emptyValueNull" in e && i(16, (y = e.emptyValueNull)),
          "emptyValueUndefined" in e && i(17, (E = e.emptyValueUndefined));
      }),
      (e.$$.update = () => {
        2068 & e.$$.dirty &&
          ("file" === d
            ? (delete x.value, i(4, x), i(2, d), i(11, p))
            : i(4, (x.value = null == p ? "" : p), x));
      }),
      [
        l,
        c,
        d,
        u,
        x,
        b,
        A,
        a,
        C,
        function (e) {
          ("file" !== d && "range" !== d) || C(e),
            i(13, ($ = !0)),
            v && i(14, (I = b.matches(":invalid")));
        },
        s,
        p,
        g,
        $,
        I,
        v,
        y,
        E,
        function (e) {
          var t;
          return e in A
            ? null !== (t = A[e]) && void 0 !== t
              ? t
              : null
            : S().getAttribute(e);
        },
        function (e, t) {
          A[e] !== t && i(6, (A[e] = t), A);
        },
        function (e) {
          (e in A && null == A[e]) || i(6, (A[e] = void 0), A);
        },
        function () {
          S().focus();
        },
        function () {
          S().blur();
        },
        S,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (b = e), i(5, b);
          });
        },
        (e) => "file" !== d && C(e),
      ]
    );
  }
  class er extends Pe {
    constructor(e) {
      super(),
        He(this, e, Zi, Ji, o, {
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
  function tr(t) {
    let i,
      r,
      o,
      l,
      c,
      d,
      u = [
        { class: (r = $t({ [t[2]]: !0, "mdc-text-field__input": !0 })) },
        { style: (o = `${t[4] ? "" : "resize: none; "}${t[3]}`) },
        t[6],
        t[9],
      ],
      p = {};
    for (let e = 0; e < u.length; e += 1) p = n(p, u[e]);
    return {
      c() {
        (i = D("textarea")), H(i, p);
      },
      m(e, n) {
        O(e, i, n),
          i.autofocus && i.focus(),
          t[21](i),
          B(i, t[0]),
          c ||
            ((d = [
              v((l = xt.call(null, i, t[1]))),
              v(t[7].call(null, i)),
              k(i, "change", t[8]),
              k(i, "blur", t[19]),
              k(i, "focus", t[20]),
              k(i, "input", t[22]),
            ]),
            (c = !0));
      },
      p(e, [t]) {
        H(
          i,
          (p = Ne(u, [
            4 & t &&
              r !== (r = $t({ [e[2]]: !0, "mdc-text-field__input": !0 })) && {
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
          l && a(l.update) && 2 & t && l.update.call(null, e[1]),
          1 & t && B(i, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && L(i), t[21](null), (c = !1), s(d);
      },
    };
  }
  function nr(e, t, i) {
    const r = [
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
    let s = m(t, r);
    const a = Et(Z());
    let o,
      { use: l = [] } = t,
      { class: c = "" } = t,
      { style: d = "" } = t,
      { value: u = "" } = t,
      { dirty: p = !1 } = t,
      { invalid: f = !1 } = t,
      { updateInvalid: g = !0 } = t,
      { resizable: $ = !0 } = t,
      I = {};
    function v() {
      return o;
    }
    return (
      ee(() => {
        g && i(11, (f = o.matches(":invalid")));
      }),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(9, (s = m(t, r))),
          "use" in e && i(1, (l = e.use)),
          "class" in e && i(2, (c = e.class)),
          "style" in e && i(3, (d = e.style)),
          "value" in e && i(0, (u = e.value)),
          "dirty" in e && i(10, (p = e.dirty)),
          "invalid" in e && i(11, (f = e.invalid)),
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
        a,
        function () {
          i(10, (p = !0)), g && i(11, (f = o.matches(":invalid")));
        },
        s,
        p,
        f,
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
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (o = e), i(5, o);
          });
        },
        function () {
          (u = this.value), i(0, u);
        },
      ]
    );
  }
  class ir extends Pe {
    constructor(e) {
      super(),
        He(this, e, nr, tr, o, {
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
  const rr = (e) => ({}),
    sr = (e) => ({}),
    ar = (e) => ({}),
    or = (e) => ({}),
    lr = (e) => ({}),
    cr = (e) => ({}),
    dr = (e) => ({}),
    ur = (e) => ({}),
    pr = (e) => ({}),
    fr = (e) => ({}),
    hr = (e) => ({}),
    mr = (e) => ({}),
    gr = (e) => ({}),
    $r = (e) => ({}),
    Ir = (e) => ({}),
    vr = (e) => ({}),
    yr = (e) => ({}),
    br = (e) => ({}),
    Er = (e) => ({}),
    Ar = (e) => ({}),
    xr = (e) => ({}),
    Cr = (e) => ({}),
    Sr = (e) => ({}),
    _r = (e) => ({});
  function Tr(e) {
    let t, i, r, o, l, d, h, m, g, $, I, y, b, E;
    const A = e[51].label,
      x = c(A, e, e[90], fr);
    r = new Ti({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Lr] },
        $$scope: { ctx: e },
      },
    });
    const C = e[51].default,
      _ = c(C, e, e[90], null);
    d = new Ti({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !1,
        $$slots: { default: [wr] },
        $$scope: { ctx: e },
      },
    });
    const T = e[51].ripple,
      w = c(T, e, e[90], or);
    let N = [
        {
          class: (m = $t({
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
          style: (g = Object.entries(e[26]).map(Zr).concat([e[10]]).join(" ")),
        },
        vt(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      R = {};
    for (let e = 0; e < N.length; e += 1) R = n(R, N[e]);
    return {
      c() {
        (t = D("div")),
          x && x.c(),
          (i = M()),
          Fe(r.$$.fragment),
          (o = M()),
          _ && _.c(),
          (l = M()),
          Fe(d.$$.fragment),
          (h = M()),
          w && w.c(),
          H(t, R);
      },
      m(n, s) {
        O(n, t, s),
          x && x.m(t, null),
          S(t, i),
          ke(r, t, null),
          S(t, o),
          _ && _.m(t, null),
          S(t, l),
          ke(d, t, null),
          S(t, h),
          w && w.m(t, null),
          e[80](t),
          (y = !0),
          b ||
            ((E = [
              v(
                ($ = Di.call(null, t, {
                  ripple: e[11],
                  unbounded: !1,
                  addClass: e[38],
                  removeClass: e[39],
                  addStyle: e[40],
                }))
              ),
              v((I = xt.call(null, t, e[8]))),
              v(e[34].call(null, t)),
              k(t, "SMUITextfieldLeadingIcon:mount", e[81]),
              k(t, "SMUITextfieldLeadingIcon:unmount", e[82]),
              k(t, "SMUITextfieldTrailingIcon:mount", e[83]),
              k(t, "SMUITextfieldTrailingIcon:unmount", e[84]),
            ]),
            (b = !0));
      },
      p(e, n) {
        x &&
          x.p &&
          (!y || 268435456 & n[2]) &&
          p(x, A, e, e[90], y ? u(A, e[90], n, pr) : f(e[90]), fr);
        const i = {};
        268435456 & n[2] && (i.$$scope = { dirty: n, ctx: e }),
          r.$set(i),
          _ &&
            _.p &&
            (!y || 268435456 & n[2]) &&
            p(_, C, e, e[90], y ? u(C, e[90], n, null) : f(e[90]), null);
        const s = {};
        268435456 & n[2] && (s.$$scope = { dirty: n, ctx: e }),
          d.$set(s),
          w &&
            w.p &&
            (!y || 268435456 & n[2]) &&
            p(w, T, e, e[90], y ? u(T, e[90], n, ar) : f(e[90]), or),
          H(
            t,
            (R = Ne(N, [
              (!y ||
                ((33673730 & n[0]) | (2048 & n[1]) &&
                  m !==
                    (m = $t({
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
                    })))) && { class: m },
              (!y ||
                (67109888 & n[0] &&
                  g !==
                    (g = Object.entries(e[26])
                      .map(Zr)
                      .concat([e[10]])
                      .join(" ")))) && { style: g },
              1024 & n[1] &&
                vt(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          $ &&
            a($.update) &&
            2048 & n[0] &&
            $.update.call(null, {
              ripple: e[11],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
            }),
          I && a(I.update) && 256 & n[0] && I.update.call(null, e[8]);
      },
      i(e) {
        y ||
          (Se(x, e),
          Se(r.$$.fragment, e),
          Se(_, e),
          Se(d.$$.fragment, e),
          Se(w, e),
          (y = !0));
      },
      o(e) {
        _e(x, e),
          _e(r.$$.fragment, e),
          _e(_, e),
          _e(d.$$.fragment, e),
          _e(w, e),
          (y = !1);
      },
      d(n) {
        n && L(t),
          x && x.d(n),
          Ue(r),
          _ && _.d(n),
          Ue(d),
          w && w.d(n),
          e[80](null),
          (b = !1),
          s(E);
      },
    };
  }
  function Or(e) {
    let t,
      i,
      r,
      o,
      l,
      d,
      h,
      m,
      g,
      $,
      I,
      y,
      b,
      E,
      A,
      x,
      C,
      _,
      T = !e[14] && "outlined" !== e[15] && Dr(e),
      w = (e[14] || "outlined" === e[15]) && Fr(e);
    o = new Ti({
      props: {
        key: "SMUI:textfield:icon:leading",
        value: !0,
        $$slots: { default: [Pr] },
        $$scope: { ctx: e },
      },
    });
    const N = e[51].default,
      R = c(N, e, e[90], null),
      F = [Vr, Br],
      U = [];
    function P(e, t) {
      return e[14] && "string" == typeof e[0] ? 0 : 1;
    }
    (h = P(e)),
      (m = U[h] = F[h](e)),
      ($ = new Ti({
        props: {
          key: "SMUI:textfield:icon:leading",
          value: !1,
          $$slots: { default: [Kr] },
          $$scope: { ctx: e },
        },
      }));
    let B = !e[14] && "outlined" !== e[15] && e[11] && Wr(e),
      V = [
        {
          class: (y = $t({
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
          style: (b = Object.entries(e[26]).map(Jr).concat([e[10]]).join(" ")),
        },
        { for: void 0 },
        vt(e[41], ["input$", "label$", "ripple$", "outline$", "helperLine$"]),
      ],
      j = {};
    for (let e = 0; e < V.length; e += 1) j = n(j, V[e]);
    return {
      c() {
        (t = D("label")),
          T && T.c(),
          (i = M()),
          w && w.c(),
          (r = M()),
          Fe(o.$$.fragment),
          (l = M()),
          R && R.c(),
          (d = M()),
          m.c(),
          (g = M()),
          Fe($.$$.fragment),
          (I = M()),
          B && B.c(),
          H(t, j);
      },
      m(n, s) {
        O(n, t, s),
          T && T.m(t, null),
          S(t, i),
          w && w.m(t, null),
          S(t, r),
          ke(o, t, null),
          S(t, l),
          R && R.m(t, null),
          S(t, d),
          U[h].m(t, null),
          S(t, g),
          ke($, t, null),
          S(t, I),
          B && B.m(t, null),
          e[73](t),
          (x = !0),
          C ||
            ((_ = [
              v(
                (E = Di.call(null, t, {
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
              v((A = xt.call(null, t, e[8]))),
              v(e[34].call(null, t)),
              k(t, "SMUITextfieldLeadingIcon:mount", e[74]),
              k(t, "SMUITextfieldLeadingIcon:unmount", e[75]),
              k(t, "SMUITextfieldTrailingIcon:mount", e[76]),
              k(t, "SMUITextfieldTrailingIcon:unmount", e[77]),
              k(t, "SMUITextfieldCharacterCounter:mount", e[78]),
              k(t, "SMUITextfieldCharacterCounter:unmount", e[79]),
            ]),
            (C = !0));
      },
      p(e, n) {
        e[14] || "outlined" === e[15]
          ? T &&
            (xe(),
            _e(T, 1, 1, () => {
              T = null;
            }),
            Ce())
          : T
          ? (T.p(e, n), 49152 & n[0] && Se(T, 1))
          : ((T = Dr(e)), T.c(), Se(T, 1), T.m(t, i)),
          e[14] || "outlined" === e[15]
            ? w
              ? (w.p(e, n), 49152 & n[0] && Se(w, 1))
              : ((w = Fr(e)), w.c(), Se(w, 1), w.m(t, r))
            : w &&
              (xe(),
              _e(w, 1, 1, () => {
                w = null;
              }),
              Ce());
        const s = {};
        268435456 & n[2] && (s.$$scope = { dirty: n, ctx: e }),
          o.$set(s),
          R &&
            R.p &&
            (!x || 268435456 & n[2]) &&
            p(R, N, e, e[90], x ? u(N, e[90], n, null) : f(e[90]), null);
        let l = h;
        (h = P(e)),
          h === l
            ? U[h].p(e, n)
            : (xe(),
              _e(U[l], 1, 1, () => {
                U[l] = null;
              }),
              Ce(),
              (m = U[h]),
              m ? m.p(e, n) : ((m = U[h] = F[h](e)), m.c()),
              Se(m, 1),
              m.m(t, g));
        const c = {};
        268435456 & n[2] && (c.$$scope = { dirty: n, ctx: e }),
          $.$set(c),
          !e[14] && "outlined" !== e[15] && e[11]
            ? B
              ? (B.p(e, n), 51200 & n[0] && Se(B, 1))
              : ((B = Wr(e)), B.c(), Se(B, 1), B.m(t, null))
            : B &&
              (xe(),
              _e(B, 1, 1, () => {
                B = null;
              }),
              Ce()),
          H(
            t,
            (j = Ne(V, [
              (!x ||
                ((314823171 & n[0]) | (2048 & n[1]) &&
                  y !==
                    (y = $t({
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
                    })))) && { class: y },
              (!x ||
                (67109888 & n[0] &&
                  b !==
                    (b = Object.entries(e[26])
                      .map(Jr)
                      .concat([e[10]])
                      .join(" ")))) && { style: b },
              { for: void 0 },
              1024 & n[1] &&
                vt(e[41], [
                  "input$",
                  "label$",
                  "ripple$",
                  "outline$",
                  "helperLine$",
                ]),
            ]))
          ),
          E &&
            a(E.update) &&
            (49152 & n[0]) | (4 & n[1]) &&
            E.update.call(null, {
              ripple: !e[14] && "filled" === e[15],
              unbounded: !1,
              addClass: e[38],
              removeClass: e[39],
              addStyle: e[40],
              eventTarget: e[33],
              activeTarget: e[33],
              initPromise: e[37],
            }),
          A && a(A.update) && 256 & n[0] && A.update.call(null, e[8]);
      },
      i(e) {
        x ||
          (Se(T),
          Se(w),
          Se(o.$$.fragment, e),
          Se(R, e),
          Se(m),
          Se($.$$.fragment, e),
          Se(B),
          (x = !0));
      },
      o(e) {
        _e(T),
          _e(w),
          _e(o.$$.fragment, e),
          _e(R, e),
          _e(m),
          _e($.$$.fragment, e),
          _e(B),
          (x = !1);
      },
      d(n) {
        n && L(t),
          T && T.d(),
          w && w.d(),
          Ue(o),
          R && R.d(n),
          U[h].d(),
          Ue($),
          B && B.d(),
          e[73](null),
          (C = !1),
          s(_);
      },
    };
  }
  function Lr(e) {
    let t;
    const n = e[51].leadingIcon,
      i = c(n, e, e[90], ur);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? u(n, e[90], r, dr) : f(e[90]), ur);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function wr(e) {
    let t;
    const n = e[51].trailingIcon,
      i = c(n, e, e[90], cr);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? u(n, e[90], r, lr) : f(e[90]), cr);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Dr(e) {
    let t,
      n,
      i,
      r = "filled" === e[15] && Nr(),
      s = !e[16] && (null != e[17] || e[42].label) && Rr(e);
    return {
      c() {
        r && r.c(), (t = M()), s && s.c(), (n = F());
      },
      m(e, a) {
        r && r.m(e, a), O(e, t, a), s && s.m(e, a), O(e, n, a), (i = !0);
      },
      p(e, i) {
        "filled" === e[15]
          ? r || ((r = Nr()), r.c(), r.m(t.parentNode, t))
          : r && (r.d(1), (r = null)),
          e[16] || (null == e[17] && !e[42].label)
            ? s &&
              (xe(),
              _e(s, 1, 1, () => {
                s = null;
              }),
              Ce())
            : s
            ? (s.p(e, i), (196608 & i[0]) | (2048 & i[1]) && Se(s, 1))
            : ((s = Rr(e)), s.c(), Se(s, 1), s.m(n.parentNode, n));
      },
      i(e) {
        i || (Se(s), (i = !0));
      },
      o(e) {
        _e(s), (i = !1);
      },
      d(e) {
        r && r.d(e), e && L(t), s && s.d(e), e && L(n);
      },
    };
  }
  function Nr(e) {
    let t;
    return {
      c() {
        (t = D("span")), U(t, "class", "mdc-text-field__ripple");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Rr(e) {
    let t, i;
    const r = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      At(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Mr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Hi({ props: s })),
      e[52](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Ne(r, [
                  268435457 & n[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & n[0] && { required: e[13] },
                  r[2],
                  1024 & n[1] && Re(At(e[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[52](null), Ue(t, n);
        },
      }
    );
  }
  function Mr(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const r = e[51].label,
      s = c(r, e, e[90], _r);
    return {
      c() {
        (t = R(i)), s && s.c();
      },
      m(e, i) {
        O(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, a) {
        (!n || 131072 & a[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 268435456 & a[2]) &&
            p(s, r, e, e[90], n ? u(r, e[90], a, Sr) : f(e[90]), _r);
      },
      i(e) {
        n || (Se(s, e), (n = !0));
      },
      o(e) {
        _e(s, e), (n = !1);
      },
      d(e) {
        e && L(t), s && s.d(e);
      },
    };
  }
  function Fr(e) {
    let t, i;
    const r = [
      { noLabel: e[16] || (null == e[17] && !e[42].label) },
      At(e[41], "outline$"),
    ];
    let s = { $$slots: { default: [Hr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Wi({ props: s })),
      e[54](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (196608 & n[0]) | (3072 & n[1])
              ? Ne(r, [
                  (196608 & n[0]) | (2048 & n[1]) && {
                    noLabel: e[16] || (null == e[17] && !e[42].label),
                  },
                  1024 & n[1] && Re(At(e[41], "outline$")),
                ])
              : {};
          (268640289 & n[0]) | (3072 & n[1]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[54](null), Ue(t, n);
        },
      }
    );
  }
  function kr(e) {
    let t, i;
    const r = [
      { floatAbove: e[28] || (null != e[0] && "" !== e[0]) },
      { required: e[13] },
      { wrapped: !0 },
      At(e[41], "label$"),
    ];
    let s = { $$slots: { default: [Ur] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Hi({ props: s })),
      e[53](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (268443649 & n[0]) | (1024 & n[1])
              ? Ne(r, [
                  268435457 & n[0] && {
                    floatAbove: e[28] || (null != e[0] && "" !== e[0]),
                  },
                  8192 & n[0] && { required: e[13] },
                  r[2],
                  1024 & n[1] && Re(At(e[41], "label$")),
                ])
              : {};
          (131072 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[53](null), Ue(t, n);
        },
      }
    );
  }
  function Ur(e) {
    let t,
      n,
      i = (null == e[17] ? "" : e[17]) + "";
    const r = e[51].label,
      s = c(r, e, e[90], Cr);
    return {
      c() {
        (t = R(i)), s && s.c();
      },
      m(e, i) {
        O(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, a) {
        (!n || 131072 & a[0]) &&
          i !== (i = (null == e[17] ? "" : e[17]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 268435456 & a[2]) &&
            p(s, r, e, e[90], n ? u(r, e[90], a, xr) : f(e[90]), Cr);
      },
      i(e) {
        n || (Se(s, e), (n = !0));
      },
      o(e) {
        _e(s, e), (n = !1);
      },
      d(e) {
        e && L(t), s && s.d(e);
      },
    };
  }
  function Hr(e) {
    let t,
      n,
      i = !e[16] && (null != e[17] || e[42].label) && kr(e);
    return {
      c() {
        i && i.c(), (t = F());
      },
      m(e, r) {
        i && i.m(e, r), O(e, t, r), (n = !0);
      },
      p(e, n) {
        e[16] || (null == e[17] && !e[42].label)
          ? i &&
            (xe(),
            _e(i, 1, 1, () => {
              i = null;
            }),
            Ce())
          : i
          ? (i.p(e, n), (196608 & n[0]) | (2048 & n[1]) && Se(i, 1))
          : ((i = kr(e)), i.c(), Se(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (Se(i), (n = !0));
      },
      o(e) {
        _e(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && L(t);
      },
    };
  }
  function Pr(e) {
    let t;
    const n = e[51].leadingIcon,
      i = c(n, e, e[90], Ar);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? u(n, e[90], r, Er) : f(e[90]), Ar);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Br(e) {
    let t, i, r, s, a, o, l, d, h, m;
    const g = e[51].prefix,
      $ = c(g, e, e[90], vr);
    let I = null != e[20] && jr(e);
    const v = [
      { type: e[18] },
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      e[16] && null != e[17] ? { placeholder: e[17] } : {},
      At(e[41], "input$"),
    ];
    function y(t) {
      e[64](t);
    }
    function b(t) {
      e[65](t);
    }
    function E(t) {
      e[66](t);
    }
    function A(t) {
      e[67](t);
    }
    let x = {};
    for (let e = 0; e < v.length; e += 1) x = n(x, v[e]);
    void 0 !== e[0] && (x.value = e[0]),
      void 0 !== e[3] && (x.files = e[3]),
      void 0 !== e[4] && (x.dirty = e[4]),
      void 0 !== e[1] && (x.invalid = e[1]),
      (r = new er({ props: x })),
      e[63](r),
      oe.push(() => Me(r, "value", y)),
      oe.push(() => Me(r, "files", b)),
      oe.push(() => Me(r, "dirty", E)),
      oe.push(() => Me(r, "invalid", A)),
      r.$on("blur", e[68]),
      r.$on("focus", e[69]),
      r.$on("blur", e[70]),
      r.$on("focus", e[71]);
    let C = null != e[21] && Gr(e);
    const S = e[51].suffix,
      _ = c(S, e, e[90], $r);
    return {
      c() {
        $ && $.c(),
          (t = M()),
          I && I.c(),
          (i = M()),
          Fe(r.$$.fragment),
          (d = M()),
          C && C.c(),
          (h = M()),
          _ && _.c();
      },
      m(e, n) {
        $ && $.m(e, n),
          O(e, t, n),
          I && I.m(e, n),
          O(e, i, n),
          ke(r, e, n),
          O(e, d, n),
          C && C.m(e, n),
          O(e, h, n),
          _ && _.m(e, n),
          (m = !0);
      },
      p(e, t) {
        $ &&
          $.p &&
          (!m || 268435456 & t[2]) &&
          p($, g, e, e[90], m ? u(g, e[90], t, Ir) : f(e[90]), vr),
          null != e[20]
            ? I
              ? (I.p(e, t), 1048576 & t[0] && Se(I, 1))
              : ((I = jr(e)), I.c(), Se(I, 1), I.m(i.parentNode, i))
            : I &&
              (xe(),
              _e(I, 1, 1, () => {
                I = null;
              }),
              Ce());
        const n =
          (135213056 & t[0]) | (1024 & t[1])
            ? Ne(v, [
                262144 & t[0] && { type: e[18] },
                4096 & t[0] && { disabled: e[12] },
                8192 & t[0] && { required: e[13] },
                524288 & t[0] && { updateInvalid: e[19] },
                134217728 & t[0] && { "aria-controls": e[27] },
                134217728 & t[0] && { "aria-describedby": e[27] },
                196608 & t[0] &&
                  Re(e[16] && null != e[17] ? { placeholder: e[17] } : {}),
                1024 & t[1] && Re(At(e[41], "input$")),
              ])
            : {};
        !s && 1 & t[0] && ((s = !0), (n.value = e[0]), he(() => (s = !1))),
          !a && 8 & t[0] && ((a = !0), (n.files = e[3]), he(() => (a = !1))),
          !o && 16 & t[0] && ((o = !0), (n.dirty = e[4]), he(() => (o = !1))),
          !l && 2 & t[0] && ((l = !0), (n.invalid = e[1]), he(() => (l = !1))),
          r.$set(n),
          null != e[21]
            ? C
              ? (C.p(e, t), 2097152 & t[0] && Se(C, 1))
              : ((C = Gr(e)), C.c(), Se(C, 1), C.m(h.parentNode, h))
            : C &&
              (xe(),
              _e(C, 1, 1, () => {
                C = null;
              }),
              Ce()),
          _ &&
            _.p &&
            (!m || 268435456 & t[2]) &&
            p(_, S, e, e[90], m ? u(S, e[90], t, gr) : f(e[90]), $r);
      },
      i(e) {
        m || (Se($, e), Se(I), Se(r.$$.fragment, e), Se(C), Se(_, e), (m = !0));
      },
      o(e) {
        _e($, e), _e(I), _e(r.$$.fragment, e), _e(C), _e(_, e), (m = !1);
      },
      d(n) {
        $ && $.d(n),
          n && L(t),
          I && I.d(n),
          n && L(i),
          e[63](null),
          Ue(r, n),
          n && L(d),
          C && C.d(n),
          n && L(h),
          _ && _.d(n);
      },
    };
  }
  function Vr(e) {
    let t, i, r, s, a, o, l, d;
    const h = [
      { disabled: e[12] },
      { required: e[13] },
      { updateInvalid: e[19] },
      { "aria-controls": e[27] },
      { "aria-describedby": e[27] },
      At(e[41], "input$"),
    ];
    function m(t) {
      e[56](t);
    }
    function g(t) {
      e[57](t);
    }
    function $(t) {
      e[58](t);
    }
    let I = {};
    for (let e = 0; e < h.length; e += 1) I = n(I, h[e]);
    void 0 !== e[0] && (I.value = e[0]),
      void 0 !== e[4] && (I.dirty = e[4]),
      void 0 !== e[1] && (I.invalid = e[1]),
      (i = new ir({ props: I })),
      e[55](i),
      oe.push(() => Me(i, "value", m)),
      oe.push(() => Me(i, "dirty", g)),
      oe.push(() => Me(i, "invalid", $)),
      i.$on("blur", e[59]),
      i.$on("focus", e[60]),
      i.$on("blur", e[61]),
      i.$on("focus", e[62]);
    const v = e[51].internalCounter,
      y = c(v, e, e[90], br);
    return {
      c() {
        (t = D("span")),
          Fe(i.$$.fragment),
          (o = M()),
          y && y.c(),
          U(
            t,
            "class",
            (l = $t({
              "mdc-text-field__resizer":
                !("input$resizable" in e[41]) || e[41].input$resizable,
            }))
          );
      },
      m(e, n) {
        O(e, t, n), ke(i, t, null), S(t, o), y && y.m(t, null), (d = !0);
      },
      p(e, n) {
        const o =
          (134754304 & n[0]) | (1024 & n[1])
            ? Ne(h, [
                4096 & n[0] && { disabled: e[12] },
                8192 & n[0] && { required: e[13] },
                524288 & n[0] && { updateInvalid: e[19] },
                134217728 & n[0] && { "aria-controls": e[27] },
                134217728 & n[0] && { "aria-describedby": e[27] },
                1024 & n[1] && Re(At(e[41], "input$")),
              ])
            : {};
        !r && 1 & n[0] && ((r = !0), (o.value = e[0]), he(() => (r = !1))),
          !s && 16 & n[0] && ((s = !0), (o.dirty = e[4]), he(() => (s = !1))),
          !a && 2 & n[0] && ((a = !0), (o.invalid = e[1]), he(() => (a = !1))),
          i.$set(o),
          y &&
            y.p &&
            (!d || 268435456 & n[2]) &&
            p(y, v, e, e[90], d ? u(v, e[90], n, yr) : f(e[90]), br),
          (!d ||
            (1024 & n[1] &&
              l !==
                (l = $t({
                  "mdc-text-field__resizer":
                    !("input$resizable" in e[41]) || e[41].input$resizable,
                })))) &&
            U(t, "class", l);
      },
      i(e) {
        d || (Se(i.$$.fragment, e), Se(y, e), (d = !0));
      },
      o(e) {
        _e(i.$$.fragment, e), _e(y, e), (d = !1);
      },
      d(n) {
        n && L(t), e[55](null), Ue(i), y && y.d(n);
      },
    };
  }
  function jr(e) {
    let t, n;
    return (
      (t = new Yi({
        props: { $$slots: { default: [zr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (1048576 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function zr(e) {
    let t;
    return {
      c() {
        t = R(e[20]);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, n) {
        1048576 & n[0] && P(t, e[20]);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Gr(e) {
    let t, n;
    return (
      (t = new Qi({
        props: { $$slots: { default: [qr] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (2097152 & n[0]) | (268435456 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function qr(e) {
    let t;
    return {
      c() {
        t = R(e[21]);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, n) {
        2097152 & n[0] && P(t, e[21]);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Kr(e) {
    let t;
    const n = e[51].trailingIcon,
      i = c(n, e, e[90], mr);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? u(n, e[90], r, hr) : f(e[90]), mr);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Wr(e) {
    let t, i;
    const r = [At(e[41], "ripple$")];
    let s = {};
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new ji({ props: s })),
      e[72](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 1024 & n[1] ? Ne(r, [Re(At(e[41], "ripple$"))]) : {};
          t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[72](null), Ue(t, n);
        },
      }
    );
  }
  function Xr(e) {
    let t, i;
    const r = [At(e[41], "helperLine$")];
    let s = { $$slots: { default: [Yr] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Xi({ props: s })),
      t.$on("SMUITextfieldHelperText:id", e[85]),
      t.$on("SMUITextfieldHelperText:mount", e[86]),
      t.$on("SMUITextfieldHelperText:unmount", e[87]),
      t.$on("SMUITextfieldCharacterCounter:mount", e[88]),
      t.$on("SMUITextfieldCharacterCounter:unmount", e[89]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 1024 & n[1] ? Ne(r, [Re(At(e[41], "helperLine$"))]) : {};
          268435456 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Yr(e) {
    let t;
    const n = e[51].helper,
      i = c(n, e, e[90], sr);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 268435456 & r[2]) &&
          p(i, n, e, e[90], t ? u(n, e[90], r, rr) : f(e[90]), sr);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Qr(e) {
    let t, n, i, r, s;
    const a = [Or, Tr],
      o = [];
    (t = (function (e, t) {
      return e[36] ? 0 : 1;
    })(e)),
      (n = o[t] = a[t](e));
    let l = e[42].helper && Xr(e);
    return {
      c() {
        n.c(), (i = M()), l && l.c(), (r = F());
      },
      m(e, n) {
        o[t].m(e, n), O(e, i, n), l && l.m(e, n), O(e, r, n), (s = !0);
      },
      p(e, t) {
        n.p(e, t),
          e[42].helper
            ? l
              ? (l.p(e, t), 2048 & t[1] && Se(l, 1))
              : ((l = Xr(e)), l.c(), Se(l, 1), l.m(r.parentNode, r))
            : l &&
              (xe(),
              _e(l, 1, 1, () => {
                l = null;
              }),
              Ce());
      },
      i(e) {
        s || (Se(n), Se(l), (s = !0));
      },
      o(e) {
        _e(n), _e(l), (s = !1);
      },
      d(e) {
        o[t].d(e), e && L(i), l && l.d(e), e && L(r);
      },
    };
  }
  const Jr = ([e, t]) => `${e}: ${t};`,
    Zr = ([e, t]) => `${e}: ${t};`;
  function es(e, t, i) {
    let r;
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
    let a = m(t, s),
      { $$slots: o = {}, $$scope: l } = t;
    const c = g(o),
      { applyPassive: d } = Qe,
      u = Et(Z());
    let p = () => {};
    function f(e) {
      return e === p;
    }
    let { use: $ = [] } = t,
      { class: I = "" } = t,
      { style: v = "" } = t,
      { ripple: y = !0 } = t,
      { disabled: b = !1 } = t,
      { required: E = !1 } = t,
      { textarea: A = !1 } = t,
      { variant: x = A ? "outlined" : "standard" } = t,
      { noLabel: C = !1 } = t,
      { label: S } = t,
      { type: _ = "text" } = t,
      { value: T = a.input$emptyValueUndefined ? void 0 : p } = t,
      { files: O = p } = t;
    const L = !f(T) || !f(O);
    f(T) && (T = void 0), f(O) && (O = null);
    let { invalid: w = p } = t,
      { updateInvalid: D = f(w) } = t;
    f(w) && (w = !1);
    let N,
      R,
      M,
      F,
      k,
      U,
      H,
      P,
      B,
      { dirty: V = !1 } = t,
      { prefix: j } = t,
      { suffix: z } = t,
      { validateOnValueChange: G = D } = t,
      { useNativeValidation: q = D } = t,
      { withLeadingIcon: K = p } = t,
      { withTrailingIcon: W = p } = t,
      { input: X } = t,
      { floatingLabel: Y } = t,
      { lineRipple: Q } = t,
      { notchedOutline: J } = t,
      ne = {},
      ie = {},
      se = !1,
      ae = re("SMUI:addLayoutListener"),
      le = new Promise((e) => (k = e)),
      ce = T;
    function ue(e) {
      var t;
      return e in ne
        ? null !== (t = ne[e]) && void 0 !== t
          ? t
          : null
        : ge().classList.contains(e);
    }
    function fe(e) {
      ne[e] || i(25, (ne[e] = !0), ne);
    }
    function he(e) {
      (e in ne && !ne[e]) || i(25, (ne[e] = !1), ne);
    }
    function me() {
      if (R) {
        const e = R.shouldFloat;
        R.notchOutline(e);
      }
    }
    function ge() {
      return N;
    }
    ae && (F = ae(me)),
      ee(() => {
        if (
          (i(
            49,
            (R = new Pn(
              {
                addClass: fe,
                removeClass: he,
                hasClass: ue,
                registerTextFieldInteractionHandler: (e, t) =>
                  ge().addEventListener(e, t),
                deregisterTextFieldInteractionHandler: (e, t) =>
                  ge().removeEventListener(e, t),
                registerValidationAttributeChangeHandler: (e) => {
                  const t = new MutationObserver((t) => {
                      q &&
                        e(
                          ((e) =>
                            e.map((e) => e.attributeName).filter((e) => e))(t)
                        );
                    }),
                    n = { attributes: !0 };
                  return X && t.observe(X.getElement(), n), t;
                },
                deregisterValidationAttributeChangeHandler: (e) => {
                  e.disconnect();
                },
                getNativeInput: () => {
                  var e;
                  return null !== (e = null == X ? void 0 : X.getElement()) &&
                    void 0 !== e
                    ? e
                    : null;
                },
                setInputAttr: (e, t) => {
                  null == X || X.addAttr(e, t);
                },
                removeInputAttr: (e) => {
                  null == X || X.removeAttr(e);
                },
                isFocused: () =>
                  document.activeElement ===
                  (null == X ? void 0 : X.getElement()),
                registerInputInteractionHandler: (e, t) => {
                  null == X || X.getElement().addEventListener(e, t, d());
                },
                deregisterInputInteractionHandler: (e, t) => {
                  null == X || X.getElement().removeEventListener(e, t, d());
                },
                floatLabel: (e) => Y && Y.float(e),
                getLabelWidth: () => (Y ? Y.getWidth() : 0),
                hasLabel: () => !!Y,
                shakeLabel: (e) => Y && Y.shake(e),
                setLabelRequired: (e) => Y && Y.setRequired(e),
                activateLineRipple: () => Q && Q.activate(),
                deactivateLineRipple: () => Q && Q.deactivate(),
                setLineRippleTransformOrigin: (e) => Q && Q.setRippleCenter(e),
                closeOutline: () => J && J.closeNotch(),
                hasOutline: () => !!J,
                notchOutline: (e) => J && J.notch(e),
              },
              {
                get helperText() {
                  return P;
                },
                get characterCounter() {
                  return B;
                },
                get leadingIcon() {
                  return U;
                },
                get trailingIcon() {
                  return H;
                },
              }
            ))
          ),
          L)
        ) {
          if (null == X)
            throw new Error(
              "SMUI Textfield initialized without Input component."
            );
          R.init();
        } else
          (pe(), de).then(() => {
            if (null == X)
              throw new Error(
                "SMUI Textfield initialized without Input component."
              );
            R.init();
          });
        return (
          k(),
          () => {
            R.destroy();
          }
        );
      }),
      te(() => {
        F && F();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(41, (a = m(t, s))),
          "use" in e && i(8, ($ = e.use)),
          "class" in e && i(9, (I = e.class)),
          "style" in e && i(10, (v = e.style)),
          "ripple" in e && i(11, (y = e.ripple)),
          "disabled" in e && i(12, (b = e.disabled)),
          "required" in e && i(13, (E = e.required)),
          "textarea" in e && i(14, (A = e.textarea)),
          "variant" in e && i(15, (x = e.variant)),
          "noLabel" in e && i(16, (C = e.noLabel)),
          "label" in e && i(17, (S = e.label)),
          "type" in e && i(18, (_ = e.type)),
          "value" in e && i(0, (T = e.value)),
          "files" in e && i(3, (O = e.files)),
          "invalid" in e && i(1, (w = e.invalid)),
          "updateInvalid" in e && i(19, (D = e.updateInvalid)),
          "dirty" in e && i(4, (V = e.dirty)),
          "prefix" in e && i(20, (j = e.prefix)),
          "suffix" in e && i(21, (z = e.suffix)),
          "validateOnValueChange" in e && i(43, (G = e.validateOnValueChange)),
          "useNativeValidation" in e && i(44, (q = e.useNativeValidation)),
          "withLeadingIcon" in e && i(22, (K = e.withLeadingIcon)),
          "withTrailingIcon" in e && i(23, (W = e.withTrailingIcon)),
          "input" in e && i(2, (X = e.input)),
          "floatingLabel" in e && i(5, (Y = e.floatingLabel)),
          "lineRipple" in e && i(6, (Q = e.lineRipple)),
          "notchedOutline" in e && i(7, (J = e.notchedOutline)),
          "$$scope" in e && i(90, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4 & e.$$.dirty[0] && i(33, (r = X && X.getElement())),
          (524290 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            R &&
            R.isValid() !== !w &&
            (D ? i(1, (w = !R.isValid())) : R.setValid(!w)),
          266240 & e.$$.dirty[1] &&
            R &&
            R.getValidateOnValueChange() !== G &&
            R.setValidateOnValueChange(!f(G) && G),
          270336 & e.$$.dirty[1] && R && R.setUseNativeValidation(!!f(q) || q),
          (4096 & e.$$.dirty[0]) | (262144 & e.$$.dirty[1]) &&
            R &&
            R.setDisabled(b),
          (1 & e.$$.dirty[0]) | (786432 & e.$$.dirty[1]) && R && L && ce !== T)
        ) {
          i(50, (ce = T));
          const e = `${T}`;
          R.getValue() !== e && R.setValue(e);
        }
      }),
      [
        T,
        w,
        X,
        O,
        V,
        Y,
        Q,
        J,
        $,
        I,
        v,
        y,
        b,
        E,
        A,
        x,
        C,
        S,
        _,
        D,
        j,
        z,
        K,
        W,
        N,
        ne,
        ie,
        M,
        se,
        U,
        H,
        P,
        B,
        r,
        u,
        f,
        L,
        le,
        fe,
        he,
        function (e, t) {
          ie[e] != t &&
            ("" === t || null == t
              ? (delete ie[e], i(26, ie))
              : i(26, (ie[e] = t), ie));
        },
        a,
        c,
        G,
        q,
        function () {
          null == X || X.focus();
        },
        function () {
          null == X || X.blur();
        },
        me,
        ge,
        R,
        ce,
        o,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (Y = e), i(5, Y);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (Y = e), i(5, Y);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (J = e), i(7, J);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (X = e), i(2, X);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (V = e), i(4, V);
        },
        function (e) {
          (w = e), i(1, w), i(49, R), i(19, D);
        },
        () => i(28, (se = !1)),
        () => i(28, (se = !0)),
        (e) => It(N, "blur", e),
        (e) => It(N, "focus", e),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (X = e), i(2, X);
          });
        },
        function (e) {
          (T = e), i(0, T);
        },
        function (e) {
          (O = e), i(3, O);
        },
        function (e) {
          (V = e), i(4, V);
        },
        function (e) {
          (w = e), i(1, w), i(49, R), i(19, D);
        },
        () => i(28, (se = !1)),
        () => i(28, (se = !0)),
        (e) => It(N, "blur", e),
        (e) => It(N, "focus", e),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (Q = e), i(6, Q);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (U = e.detail)),
        () => i(29, (U = void 0)),
        (e) => i(30, (H = e.detail)),
        () => i(30, (H = void 0)),
        (e) => i(32, (B = e.detail)),
        () => i(32, (B = void 0)),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (N = e), i(24, N);
          });
        },
        (e) => i(29, (U = e.detail)),
        () => i(29, (U = void 0)),
        (e) => i(30, (H = e.detail)),
        () => i(30, (H = void 0)),
        (e) => i(27, (M = e.detail)),
        (e) => i(31, (P = e.detail)),
        () => {
          i(27, (M = void 0)), i(31, (P = void 0));
        },
        (e) => i(32, (B = e.detail)),
        () => i(32, (B = void 0)),
        l,
      ]
    );
  }
  class ts extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          es,
          Qr,
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
   */ var ns = {
      ICON_BUTTON_ON: "mdc-icon-button--on",
      ROOT: "mdc-icon-button",
    },
    is = {
      ARIA_LABEL: "aria-label",
      ARIA_PRESSED: "aria-pressed",
      DATA_ARIA_LABEL_OFF: "data-aria-label-off",
      DATA_ARIA_LABEL_ON: "data-aria-label-on",
      CHANGE_EVENT: "MDCIconButtonToggle:change",
    },
    rs = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (i.hasToggledAriaLabel = !1), i;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ns;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return is;
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
          var e = this.adapter.getAttr(is.DATA_ARIA_LABEL_ON),
            t = this.adapter.getAttr(is.DATA_ARIA_LABEL_OFF);
          if (e && t) {
            if (null !== this.adapter.getAttr(is.ARIA_PRESSED))
              throw new Error(
                "MDCIconButtonToggleFoundation: Button should not set `aria-pressed` if it has a toggled aria label."
              );
            this.hasToggledAriaLabel = !0;
          } else this.adapter.setAttr(is.ARIA_PRESSED, String(this.isOn()));
        }),
        (t.prototype.handleClick = function () {
          this.toggle(), this.adapter.notifyChange({ isOn: this.isOn() });
        }),
        (t.prototype.isOn = function () {
          return this.adapter.hasClass(ns.ICON_BUTTON_ON);
        }),
        (t.prototype.toggle = function (e) {
          if (
            (void 0 === e && (e = !this.isOn()),
            e
              ? this.adapter.addClass(ns.ICON_BUTTON_ON)
              : this.adapter.removeClass(ns.ICON_BUTTON_ON),
            this.hasToggledAriaLabel)
          ) {
            var t = e
              ? this.adapter.getAttr(is.DATA_ARIA_LABEL_ON)
              : this.adapter.getAttr(is.DATA_ARIA_LABEL_OFF);
            this.adapter.setAttr(is.ARIA_LABEL, t || "");
          } else this.adapter.setAttr(is.ARIA_PRESSED, "" + e);
        }),
        t
      );
    })(Ye);
  function ss(e) {
    let t;
    return {
      c() {
        (t = D("div")), U(t, "class", "mdc-icon-button__touch");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function as(e) {
    let t, n, i, r;
    const s = e[32].default,
      a = c(s, e, e[36], null);
    let o = e[8] && ss();
    return {
      c() {
        (t = D("div")),
          (n = M()),
          a && a.c(),
          o && o.c(),
          (i = F()),
          U(t, "class", "mdc-icon-button__ripple");
      },
      m(e, s) {
        O(e, t, s),
          O(e, n, s),
          a && a.m(e, s),
          o && o.m(e, s),
          O(e, i, s),
          (r = !0);
      },
      p(e, t) {
        a &&
          a.p &&
          (!r || 32 & t[1]) &&
          p(a, s, e, e[36], r ? u(s, e[36], t, null) : f(e[36]), null),
          e[8]
            ? o || ((o = ss()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        r || (Se(a, e), (r = !0));
      },
      o(e) {
        _e(a, e), (r = !1);
      },
      d(e) {
        e && L(t), e && L(n), a && a.d(e), o && o.d(e), e && L(i);
      },
    };
  }
  function os(e) {
    let t, i, r;
    const s = [
      {
        use: [
          [
            Di,
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
        class: $t({
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
      { style: Object.entries(e[18]).map(ls).concat([e[3]]).join(" ") },
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
    var a = e[13];
    function o(e) {
      let t = { $$slots: { default: [as] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a &&
        ((t = new a(o(e))),
        e[33](t),
        t.$on("click", e[34]),
        t.$on("click", e[35])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            536748031 & n[0]
              ? Ne(s, [
                  505413682 & n[0] && {
                    use: [
                      [
                        Di,
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
                  12719877 & n[0] && {
                    class: $t({
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
                  262152 & n[0] && {
                    style: Object.entries(e[18])
                      .map(ls)
                      .concat([e[3]])
                      .join(" "),
                  },
                  4194305 & n[0] && {
                    "aria-pressed": e[22](e[0])
                      ? null
                      : e[0]
                      ? "true"
                      : "false",
                  },
                  193 & n[0] && { "aria-label": e[0] ? e[6] : e[7] },
                  64 & n[0] && { "data-aria-label-on": e[6] },
                  128 & n[0] && { "data-aria-label-off": e[7] },
                  16777216 & n[0] && { "aria-describedby": e[24] },
                  2048 & n[0] && { href: e[11] },
                  1048576 & n[0] && Re(e[20]),
                  524288 & n[0] && Re(e[19]),
                  268435456 & n[0] && Re(e[28]),
                ])
              : {};
          if (
            ((256 & n[0]) | (32 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            a !== (a = e[13]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[33](t),
                t.$on("click", e[34]),
                t.$on("click", e[35]),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[33](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  const ls = ([e, t]) => `${e}: ${t};`;
  function cs(e, t, i) {
    let r;
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
    let a = m(t, s),
      { $$slots: o = {}, $$scope: l } = t;
    const c = Et(Z());
    let d = () => {};
    function u(e) {
      return e === d;
    }
    let p,
      f,
      { use: g = [] } = t,
      { class: $ = "" } = t,
      { style: I = "" } = t,
      { ripple: v = !0 } = t,
      { color: y } = t,
      { toggle: b = !1 } = t,
      { pressed: E = d } = t,
      { ariaLabelOn: A } = t,
      { ariaLabelOff: x } = t,
      { touch: C = !1 } = t,
      { displayFlex: S = !0 } = t,
      { size: _ = "normal" } = t,
      { href: T } = t,
      { action: O } = t,
      L = {},
      w = {},
      D = {},
      N = re("SMUI:icon-button:context"),
      R = re("SMUI:icon-button:aria-describedby"),
      { component: M = null == T ? on : an } = t,
      F = a.disabled;
    ie("SMUI:icon:context", "icon-button");
    let k = null;
    function U(e) {
      return e in L ? L[e] : j().classList.contains(e);
    }
    function H(e) {
      L[e] || i(17, (L[e] = !0), L);
    }
    function P(e) {
      (e in L && !L[e]) || i(17, (L[e] = !1), L);
    }
    function B(e) {
      var t;
      return e in D
        ? null !== (t = D[e]) && void 0 !== t
          ? t
          : null
        : j().getAttribute(e);
    }
    function V(e, t) {
      D[e] !== t && i(19, (D[e] = t), D);
    }
    function j() {
      return p.getElement();
    }
    te(() => {
      f && f.destroy();
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(28, (a = m(t, s))),
          "use" in e && i(1, (g = e.use)),
          "class" in e && i(2, ($ = e.class)),
          "style" in e && i(3, (I = e.style)),
          "ripple" in e && i(4, (v = e.ripple)),
          "color" in e && i(5, (y = e.color)),
          "toggle" in e && i(29, (b = e.toggle)),
          "pressed" in e && i(0, (E = e.pressed)),
          "ariaLabelOn" in e && i(6, (A = e.ariaLabelOn)),
          "ariaLabelOff" in e && i(7, (x = e.ariaLabelOff)),
          "touch" in e && i(8, (C = e.touch)),
          "displayFlex" in e && i(9, (S = e.displayFlex)),
          "size" in e && i(10, (_ = e.size)),
          "href" in e && i(11, (T = e.href)),
          "action" in e && i(12, (O = e.action)),
          "component" in e && i(13, (M = e.component)),
          "$$scope" in e && i(36, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        if (
          (4096 & e.$$.dirty[0] &&
            i(
              20,
              (r = (() => {
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
          F !== a.disabled)
        ) {
          const e = j();
          "blur" in e && e.blur(), i(30, (F = a.disabled));
        }
        (536969216 & e.$$.dirty[0]) | (1 & e.$$.dirty[1]) &&
          p &&
          j() &&
          b !== k &&
          (b && !f
            ? (i(
                16,
                (f = new rs({
                  addClass: H,
                  hasClass: U,
                  notifyChange: (e) => {
                    !(function (e) {
                      i(0, (E = e.isOn));
                    })(e),
                      It(j(), "SMUIIconButtonToggle:change", e, void 0, !0);
                  },
                  removeClass: P,
                  getAttr: B,
                  setAttr: V,
                }))
              ),
              f.init())
            : !b &&
              f &&
              (f.destroy(),
              i(16, (f = void 0)),
              i(17, (L = {})),
              i(19, (D = {}))),
          i(31, (k = b))),
          65537 & e.$$.dirty[0] && f && !u(E) && f.isOn() !== E && f.toggle(E);
      }),
      [
        E,
        g,
        $,
        I,
        v,
        y,
        A,
        x,
        C,
        S,
        _,
        T,
        O,
        M,
        j,
        p,
        f,
        L,
        w,
        D,
        r,
        c,
        u,
        N,
        R,
        H,
        P,
        function (e, t) {
          w[e] != t &&
            ("" === t || null == t
              ? (delete w[e], i(18, w))
              : i(18, (w[e] = t), w));
        },
        a,
        b,
        F,
        k,
        o,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (p = e), i(15, p);
          });
        },
        () => f && f.handleClick(),
        () =>
          "top-app-bar:navigation" === N &&
          It(j(), "SMUITopAppBarIconButton:nav"),
        l,
      ]
    );
  }
  class ds extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          cs,
          os,
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
  function us(e) {
    const t = e - 1;
    return t * t * t + 1;
  }
  function ps(e, { delay: n = 0, duration: i = 400, easing: r = t } = {}) {
    const s = +getComputedStyle(e).opacity;
    return {
      delay: n,
      duration: i,
      easing: r,
      css: (e) => "opacity: " + e * s,
    };
  }
  function fs(
    e,
    {
      delay: t = 0,
      duration: n = 400,
      easing: i = us,
      x: r = 0,
      y: s = 0,
      opacity: a = 0,
    } = {}
  ) {
    const o = getComputedStyle(e),
      l = +o.opacity,
      c = "none" === o.transform ? "" : o.transform,
      d = l * (1 - a);
    return {
      delay: t,
      duration: n,
      easing: i,
      css: (e, t) =>
        `\n\t\t\ttransform: ${c} translate(${(1 - e) * r}px, ${
          (1 - e) * s
        }px);\n\t\t\topacity: ${l - d * t}`,
    };
  }
  function hs(e, { from: t, to: n }, i = {}) {
    const r = getComputedStyle(e),
      s = "none" === r.transform ? "" : r.transform,
      [o, l] = r.transformOrigin.split(" ").map(parseFloat),
      c = t.left + (t.width * o) / n.width - (n.left + o),
      d = t.top + (t.height * l) / n.height - (n.top + l),
      {
        delay: u = 0,
        duration: p = (e) => 120 * Math.sqrt(e),
        easing: f = us,
      } = i;
    return {
      delay: u,
      duration: a(p) ? p(Math.sqrt(c * c + d * d)) : p,
      easing: f,
      css: (e, i) => {
        const r = i * c,
          a = i * d,
          o = e + (i * t.width) / n.width,
          l = e + (i * t.height) / n.height;
        return `transform: ${s} translate(${r}px, ${a}px) scale(${o}, ${l});`;
      },
    };
  }
  const ms = {
      duration: 4e3,
      initial: 1,
      next: 0,
      pausable: !1,
      dismissable: !0,
      reversed: !1,
      intro: { x: 256 },
    },
    gs = (() => {
      const { subscribe: e, update: t } = gt([]);
      let n = 0;
      const i = {},
        r = (e) => e instanceof Object;
      return {
        subscribe: e,
        push: (e, s = {}) => {
          const a = { target: "default", ...(r(e) ? e : { ...s, msg: e }) },
            o = i[a.target] || {},
            l = {
              ...ms,
              ...o,
              ...a,
              theme: { ...o.theme, ...a.theme },
              classes: [...(o.classes || []), ...(a.classes || [])],
              id: ++n,
            };
          return t((e) => (l.reversed ? [...e, l] : [l, ...e])), n;
        },
        pop: (e) => {
          t((t) => {
            if (!t.length || 0 === e) return [];
            if (r(e)) return t.filter((t) => e(t));
            const n = e || Math.max(...t.map((e) => e.id));
            return t.filter((e) => e.id !== n);
          });
        },
        set: (e, n = {}) => {
          const i = r(e) ? { ...e } : { ...n, id: e };
          t((e) => {
            const t = e.findIndex((e) => e.id === i.id);
            return t > -1 && (e[t] = { ...e[t], ...i }), e;
          });
        },
        _init: (e = "default", t = {}) => ((i[e] = t), i),
      };
    })();
  function $s(e) {
    return "[object Date]" === Object.prototype.toString.call(e);
  }
  function Is(e, t) {
    if (e === t || e != e) return () => e;
    const n = typeof e;
    if (n !== typeof t || Array.isArray(e) !== Array.isArray(t))
      throw new Error("Cannot interpolate values of different type");
    if (Array.isArray(e)) {
      const n = t.map((t, n) => Is(e[n], t));
      return (e) => n.map((t) => t(e));
    }
    if ("object" === n) {
      if (!e || !t) throw new Error("Object cannot be null");
      if ($s(e) && $s(t)) {
        e = e.getTime();
        const n = (t = t.getTime()) - e;
        return (t) => new Date(e + t * n);
      }
      const n = Object.keys(t),
        i = {};
      return (
        n.forEach((n) => {
          i[n] = Is(e[n], t[n]);
        }),
        (e) => {
          const t = {};
          return (
            n.forEach((n) => {
              t[n] = i[n](e);
            }),
            t
          );
        }
      );
    }
    if ("number" === n) {
      const n = t - e;
      return (t) => e + t * n;
    }
    throw new Error(`Cannot interpolate ${n} values`);
  }
  function vs(t) {
    let n,
      i,
      r = t[0].msg + "";
    return {
      c() {
        (n = new G(!1)), (i = F()), (n.a = i);
      },
      m(e, t) {
        n.m(r, e, t), O(e, i, t);
      },
      p(e, t) {
        1 & t && r !== (r = e[0].msg + "") && n.p(r);
      },
      i: e,
      o: e,
      d(e) {
        e && L(i), e && n.d();
      },
    };
  }
  function ys(e) {
    let t, i, r;
    const s = [e[6]()];
    var a = e[0].component.src;
    function o(e) {
      let t = {};
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a && (t = new a(o())),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, n) {
          const r = 64 & n ? Ne(s, [Re(e[6]())]) : {};
          if (a !== (a = e[0].component.src)) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o())),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && L(i), t && Ue(t, e);
        },
      }
    );
  }
  function bs(t) {
    let n, i, r;
    return {
      c() {
        (n = D("div")),
          (n.textContent = "✕"),
          U(n, "class", "_toastBtn pe svelte-5er0t9"),
          U(n, "role", "button"),
          U(n, "tabindex", "-1");
      },
      m(e, s) {
        O(e, n, s), i || ((r = k(n, "click", t[3])), (i = !0));
      },
      p: e,
      d(e) {
        e && L(n), (i = !1), r();
      },
    };
  }
  function Es(e) {
    let t, n, i, r, a, o, l, c, d, u;
    const p = [ys, vs],
      f = [];
    function h(e, t) {
      return e[0].component ? 0 : 1;
    }
    (i = h(e)), (r = f[i] = p[i](e));
    let m = e[0].dismissable && bs(e);
    return {
      c() {
        (t = D("div")),
          (n = D("div")),
          r.c(),
          (a = M()),
          m && m.c(),
          (o = M()),
          (l = D("progress")),
          U(n, "role", "status"),
          U(n, "class", "_toastMsg svelte-5er0t9"),
          j(n, "pe", e[0].component),
          U(l, "class", "_toastBar svelte-5er0t9"),
          (l.value = e[1]),
          U(t, "class", "_toastItem svelte-5er0t9"),
          j(t, "pe", e[0].pausable);
      },
      m(r, s) {
        O(r, t, s),
          S(t, n),
          f[i].m(n, null),
          S(t, a),
          m && m.m(t, null),
          S(t, o),
          S(t, l),
          (c = !0),
          d ||
            ((u = [k(t, "mouseenter", e[4]), k(t, "mouseleave", e[5])]),
            (d = !0));
      },
      p(e, [s]) {
        let a = i;
        (i = h(e)),
          i === a
            ? f[i].p(e, s)
            : (xe(),
              _e(f[a], 1, 1, () => {
                f[a] = null;
              }),
              Ce(),
              (r = f[i]),
              r ? r.p(e, s) : ((r = f[i] = p[i](e)), r.c()),
              Se(r, 1),
              r.m(n, null)),
          1 & s && j(n, "pe", e[0].component),
          e[0].dismissable
            ? m
              ? m.p(e, s)
              : ((m = bs(e)), m.c(), m.m(t, o))
            : m && (m.d(1), (m = null)),
          (!c || 2 & s) && (l.value = e[1]),
          1 & s && j(t, "pe", e[0].pausable);
      },
      i(e) {
        c || (Se(r), (c = !0));
      },
      o(e) {
        _e(r), (c = !1);
      },
      d(e) {
        e && L(t), f[i].d(), m && m.d(), (d = !1), s(u);
      },
    };
  }
  function As(e, i, r) {
    let s,
      { item: a } = i;
    const o = (function (e, i = {}) {
      const r = gt(e);
      let s,
        a = e;
      function o(o, l) {
        if (null == e) return r.set((e = o)), Promise.resolve();
        a = o;
        let c = s,
          d = !1,
          {
            delay: u = 0,
            duration: p = 400,
            easing: f = t,
            interpolate: h = Is,
          } = n(n({}, i), l);
        if (0 === p)
          return (
            c && (c.abort(), (c = null)), r.set((e = a)), Promise.resolve()
          );
        const m = b() + u;
        let g;
        return (
          (s = C((t) => {
            if (t < m) return !0;
            d ||
              ((g = h(e, o)),
              "function" == typeof p && (p = p(e, o)),
              (d = !0)),
              c && (c.abort(), (c = null));
            const n = t - m;
            return n > p
              ? (r.set((e = o)), !1)
              : (r.set((e = g(f(n / p)))), !0);
          })),
          s.promise
        );
      }
      return {
        set: o,
        update: (t, n) => o(t(a, e), n),
        subscribe: r.subscribe,
      };
    })(a.initial, { duration: a.duration, easing: t });
    l(e, o, (e) => r(1, (s = e)));
    const c = () => gs.pop(a.id),
      d = () => {
        (1 !== s && 0 !== s) || c();
      };
    let u = a.initial,
      p = u,
      f = !1;
    return (
      te(() => {
        "function" == typeof a.onpop && a.onpop(a.id);
      }),
      (e.$$set = (e) => {
        "item" in e && r(0, (a = e.item));
      }),
      (e.$$.update = () => {
        1 & e.$$.dirty &&
          void 0 !== a.progress &&
          r(0, (a.next = a.progress), a),
          131 & e.$$.dirty &&
            u !== a.next &&
            (r(7, (u = a.next)), (p = s), (f = !1), o.set(u).then(d));
      }),
      [
        a,
        s,
        o,
        c,
        () => {
          a.pausable && !f && s !== u && (o.set(s, { duration: 0 }), (f = !0));
        },
        () => {
          if (f) {
            const e = a.duration,
              t = e - e * ((s - p) / (u - p));
            o.set(u, { duration: t }).then(d), (f = !1);
          }
        },
        () => {
          const { props: e = {}, sendIdTo: t } = a.component;
          return t && (e[t] = a.id), e;
        },
        u,
      ]
    );
  }
  class xs extends Pe {
    constructor(e) {
      super(), He(this, e, As, Es, o, { item: 0 });
    }
  }
  function Cs(e, t, n) {
    const i = e.slice();
    return (i[5] = t[n]), i;
  }
  function Ss(n, i) {
    let r,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m = e;
    return (
      (o = new xs({ props: { item: i[5] } })),
      {
        key: n,
        first: null,
        c() {
          (r = D("li")),
            Fe(o.$$.fragment),
            (l = M()),
            U(r, "class", (c = $(i[5].classes.join(" ")) + " svelte-yh90az")),
            U(r, "style", (d = i[1](i[5].theme))),
            (this.first = r);
        },
        m(e, t) {
          O(e, r, t), ke(o, r, null), S(r, l), (h = !0);
        },
        p(e, t) {
          i = e;
          const n = {};
          1 & t && (n.item = i[5]),
            o.$set(n),
            (!h ||
              (1 & t &&
                c !== (c = $(i[5].classes.join(" ")) + " svelte-yh90az"))) &&
              U(r, "class", c),
            (!h || (1 & t && d !== (d = i[1](i[5].theme)))) && U(r, "style", d);
        },
        r() {
          f = r.getBoundingClientRect();
        },
        f() {
          !(function (e) {
            const t = getComputedStyle(e);
            if ("absolute" !== t.position && "fixed" !== t.position) {
              const { width: n, height: i } = t,
                r = e.getBoundingClientRect();
              (e.style.position = "absolute"),
                (e.style.width = n),
                (e.style.height = i),
                Q(e, r);
            }
          })(r),
            m(),
            Q(r, f);
        },
        a() {
          m(),
            (m = (function (n, i, r, s) {
              if (!i) return e;
              const a = n.getBoundingClientRect();
              if (
                i.left === a.left &&
                i.right === a.right &&
                i.top === a.top &&
                i.bottom === a.bottom
              )
                return e;
              const {
                delay: o = 0,
                duration: l = 300,
                easing: c = t,
                start: d = b() + o,
                end: u = d + l,
                tick: p = e,
                css: f,
              } = r(n, { from: i, to: a }, s);
              let h,
                m = !0,
                g = !1;
              function $() {
                f && Y(n, h), (m = !1);
              }
              return (
                C((e) => {
                  if (
                    (!g && e >= d && (g = !0),
                    g && e >= u && (p(1, 0), $()),
                    !m)
                  )
                    return !1;
                  if (g) {
                    const t = 0 + 1 * c((e - d) / l);
                    p(t, 1 - t);
                  }
                  return !0;
                }),
                f && (h = X(n, 0, 1, l, o, c, f)),
                o || (g = !0),
                p(0, 1),
                $
              );
            })(r, f, hs, { duration: 200 }));
        },
        i(n) {
          h ||
            (Se(o.$$.fragment, n),
            fe(() => {
              p && p.end(1),
                (u = (function (n, i, r) {
                  let s,
                    o,
                    l = i(n, r),
                    c = !1,
                    d = 0;
                  function u() {
                    s && Y(n, s);
                  }
                  function p() {
                    const {
                      delay: i = 0,
                      duration: r = 300,
                      easing: a = t,
                      tick: p = e,
                      css: f,
                    } = l || Te;
                    f && (s = X(n, 0, 1, r, i, a, f, d++)), p(0, 1);
                    const h = b() + i,
                      m = h + r;
                    o && o.abort(),
                      (c = !0),
                      fe(() => be(n, !0, "start")),
                      (o = C((e) => {
                        if (c) {
                          if (e >= m)
                            return p(1, 0), be(n, !0, "end"), u(), (c = !1);
                          if (e >= h) {
                            const t = a((e - h) / r);
                            p(t, 1 - t);
                          }
                        }
                        return c;
                      }));
                  }
                  let f = !1;
                  return {
                    start() {
                      f ||
                        ((f = !0),
                        Y(n),
                        a(l) ? ((l = l()), ye().then(p)) : p());
                    },
                    invalidate() {
                      f = !1;
                    },
                    end() {
                      c && (u(), (c = !1));
                    },
                  };
                })(r, fs, i[5].intro)),
                u.start();
            }),
            (h = !0));
        },
        o(n) {
          _e(o.$$.fragment, n),
            u && u.invalidate(),
            (p = (function (n, i, r) {
              let o,
                l = i(n, r),
                c = !0;
              const d = Ae;
              function u() {
                const {
                  delay: i = 0,
                  duration: r = 300,
                  easing: a = t,
                  tick: u = e,
                  css: p,
                } = l || Te;
                p && (o = X(n, 1, 0, r, i, a, p));
                const f = b() + i,
                  h = f + r;
                fe(() => be(n, !1, "start")),
                  C((e) => {
                    if (c) {
                      if (e >= h)
                        return u(0, 1), be(n, !1, "end"), --d.r || s(d.c), !1;
                      if (e >= f) {
                        const t = a((e - f) / r);
                        u(1 - t, t);
                      }
                    }
                    return c;
                  });
              }
              return (
                (d.r += 1),
                a(l)
                  ? ye().then(() => {
                      (l = l()), u();
                    })
                  : u(),
                {
                  end(e) {
                    e && l.tick && l.tick(1, 0), c && (o && Y(n, o), (c = !1));
                  },
                }
              );
            })(r, ps, {})),
            (h = !1);
        },
        d(e) {
          e && L(r), Ue(o), e && p && p.end();
        },
      }
    );
  }
  function _s(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[0];
    const a = (e) => e[5].id;
    for (let t = 0; t < s.length; t += 1) {
      let n = Cs(e, s, t),
        o = a(n);
      r.set(o, (i[t] = Ss(o, n)));
    }
    return {
      c() {
        t = D("ul");
        for (let e = 0; e < i.length; e += 1) i[e].c();
        U(t, "class", "_toastContainer svelte-yh90az");
      },
      m(e, r) {
        O(e, t, r);
        for (let e = 0; e < i.length; e += 1) i[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          (s = e[0]), xe();
          for (let e = 0; e < i.length; e += 1) i[e].r();
          i = De(i, n, a, 1, e, s, r, t, we, Ss, null, Cs);
          for (let e = 0; e < i.length; e += 1) i[e].a();
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) Se(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) _e(i[e]);
        n = !1;
      },
      d(e) {
        e && L(t);
        for (let e = 0; e < i.length; e += 1) i[e].d();
      },
    };
  }
  function Ts(e, t, n) {
    let i;
    l(e, gs, (e) => n(4, (i = e)));
    let r,
      { options: s = {} } = t,
      { target: a = "default" } = t;
    return (
      (e.$$set = (e) => {
        "options" in e && n(2, (s = e.options)),
          "target" in e && n(3, (a = e.target));
      }),
      (e.$$.update = () => {
        12 & e.$$.dirty && gs._init(a, s),
          24 & e.$$.dirty && n(0, (r = i.filter((e) => e.target === a)));
      }),
      [
        r,
        (e) => Object.keys(e).reduce((t, n) => `${t}${n}:${e[n]};`, ""),
        s,
        a,
        i,
      ]
    );
  }
  class Os extends Pe {
    constructor(e) {
      super(), He(this, e, Ts, _s, o, { options: 2, target: 3 });
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
   */ var Ls,
    ws,
    Ds = {
      LIST_ITEM_ACTIVATED_CLASS: "mdc-list-item--activated",
      LIST_ITEM_CLASS: "mdc-list-item",
      LIST_ITEM_DISABLED_CLASS: "mdc-list-item--disabled",
      LIST_ITEM_SELECTED_CLASS: "mdc-list-item--selected",
      LIST_ITEM_TEXT_CLASS: "mdc-list-item__text",
      LIST_ITEM_PRIMARY_TEXT_CLASS: "mdc-list-item__primary-text",
      ROOT: "mdc-list",
    };
  ((Ls = {})["" + Ds.LIST_ITEM_ACTIVATED_CLASS] = "mdc-list-item--activated"),
    (Ls["" + Ds.LIST_ITEM_CLASS] = "mdc-list-item"),
    (Ls["" + Ds.LIST_ITEM_DISABLED_CLASS] = "mdc-list-item--disabled"),
    (Ls["" + Ds.LIST_ITEM_SELECTED_CLASS] = "mdc-list-item--selected"),
    (Ls["" + Ds.LIST_ITEM_PRIMARY_TEXT_CLASS] = "mdc-list-item__primary-text"),
    (Ls["" + Ds.ROOT] = "mdc-list");
  var Ns =
      (((ws = {})["" + Ds.LIST_ITEM_ACTIVATED_CLASS] =
        "mdc-deprecated-list-item--activated"),
      (ws["" + Ds.LIST_ITEM_CLASS] = "mdc-deprecated-list-item"),
      (ws["" + Ds.LIST_ITEM_DISABLED_CLASS] =
        "mdc-deprecated-list-item--disabled"),
      (ws["" + Ds.LIST_ITEM_SELECTED_CLASS] =
        "mdc-deprecated-list-item--selected"),
      (ws["" + Ds.LIST_ITEM_TEXT_CLASS] = "mdc-deprecated-list-item__text"),
      (ws["" + Ds.LIST_ITEM_PRIMARY_TEXT_CLASS] =
        "mdc-deprecated-list-item__primary-text"),
      (ws["" + Ds.ROOT] = "mdc-deprecated-list"),
      ws),
    Rs = {
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
        Ds.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ds.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ns[Ds.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ns[Ds.LIST_ITEM_CLASS] +
        " a\n  ",
      DEPRECATED_SELECTOR: ".mdc-deprecated-list",
      FOCUSABLE_CHILD_ELEMENTS:
        "\n    ." +
        Ds.LIST_ITEM_CLASS +
        " button:not(:disabled),\n    ." +
        Ds.LIST_ITEM_CLASS +
        " a,\n    ." +
        Ds.LIST_ITEM_CLASS +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ds.LIST_ITEM_CLASS +
        ' input[type="checkbox"]:not(:disabled),\n    .' +
        Ns[Ds.LIST_ITEM_CLASS] +
        " button:not(:disabled),\n    ." +
        Ns[Ds.LIST_ITEM_CLASS] +
        " a,\n    ." +
        Ns[Ds.LIST_ITEM_CLASS] +
        ' input[type="radio"]:not(:disabled),\n    .' +
        Ns[Ds.LIST_ITEM_CLASS] +
        ' input[type="checkbox"]:not(:disabled)\n  ',
      RADIO_SELECTOR: 'input[type="radio"]',
      SELECTED_ITEM_SELECTOR: '[aria-selected="true"], [aria-current="true"]',
    },
    Ms = { UNSET_INDEX: -1, TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS: 300 },
    Fs = ["input", "button", "textarea", "select"],
    ks = function (e) {
      var t = e.target;
      if (t) {
        var n = ("" + t.tagName).toLowerCase();
        -1 === Fs.indexOf(n) && e.preventDefault();
      }
    };
  function Us(e, t) {
    var n,
      i = e.nextChar,
      r = e.focusItemAtIndex,
      s = e.sortedIndexByFirstChar,
      a = e.focusedItemIndex,
      o = e.skipFocus,
      l = e.isItemAtIndexDisabled;
    return (
      clearTimeout(t.bufferClearTimeout),
      (t.bufferClearTimeout = setTimeout(function () {
        Ps(t);
      }, Ms.TYPEAHEAD_BUFFER_CLEAR_TIMEOUT_MS)),
      (t.typeaheadBuffer = t.typeaheadBuffer + i),
      (n =
        1 === t.typeaheadBuffer.length
          ? (function (e, t, n, i) {
              var r = i.typeaheadBuffer[0],
                s = e.get(r);
              if (!s) return -1;
              if (
                r === i.currentFirstChar &&
                s[i.sortedIndexCursor].index === t
              ) {
                i.sortedIndexCursor = (i.sortedIndexCursor + 1) % s.length;
                var a = s[i.sortedIndexCursor].index;
                if (!n(a)) return a;
              }
              i.currentFirstChar = r;
              var o,
                l = -1;
              for (o = 0; o < s.length; o++)
                if (!n(s[o].index)) {
                  l = o;
                  break;
                }
              for (; o < s.length; o++)
                if (s[o].index > t && !n(s[o].index)) {
                  l = o;
                  break;
                }
              if (-1 !== l)
                return (i.sortedIndexCursor = l), s[i.sortedIndexCursor].index;
              return -1;
            })(s, a, l, t)
          : (function (e, t, n) {
              var i = n.typeaheadBuffer[0],
                r = e.get(i);
              if (!r) return -1;
              var s = r[n.sortedIndexCursor];
              if (0 === s.text.lastIndexOf(n.typeaheadBuffer, 0) && !t(s.index))
                return s.index;
              var a = (n.sortedIndexCursor + 1) % r.length,
                o = -1;
              for (; a !== n.sortedIndexCursor; ) {
                var l = r[a],
                  c = 0 === l.text.lastIndexOf(n.typeaheadBuffer, 0),
                  d = !t(l.index);
                if (c && d) {
                  o = a;
                  break;
                }
                a = (a + 1) % r.length;
              }
              if (-1 !== o)
                return (n.sortedIndexCursor = o), r[n.sortedIndexCursor].index;
              return -1;
            })(s, l, t)),
      -1 === n || o || r(n),
      n
    );
  }
  function Hs(e) {
    return e.typeaheadBuffer.length > 0;
  }
  function Ps(e) {
    e.typeaheadBuffer = "";
  }
  function Bs(e, t) {
    var n = e.event,
      i = e.isTargetListItem,
      r = e.focusedItemIndex,
      s = e.focusItemAtIndex,
      a = e.sortedIndexByFirstChar,
      o = e.isItemAtIndexDisabled,
      l = "ArrowLeft" === Ei(n),
      c = "ArrowUp" === Ei(n),
      d = "ArrowRight" === Ei(n),
      u = "ArrowDown" === Ei(n),
      p = "Home" === Ei(n),
      f = "End" === Ei(n),
      h = "Enter" === Ei(n),
      m = "Spacebar" === Ei(n);
    return n.ctrlKey || n.metaKey || l || c || d || u || p || f || h
      ? -1
      : m || 1 !== n.key.length
      ? m
        ? (i && ks(n),
          i && Hs(t)
            ? Us(
                {
                  focusItemAtIndex: s,
                  focusedItemIndex: r,
                  nextChar: " ",
                  sortedIndexByFirstChar: a,
                  skipFocus: !1,
                  isItemAtIndexDisabled: o,
                },
                t
              )
            : -1)
        : -1
      : (ks(n),
        Us(
          {
            focusItemAtIndex: s,
            focusedItemIndex: r,
            nextChar: n.key.toLowerCase(),
            sortedIndexByFirstChar: a,
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
   */ var Vs = (function (e) {
    function t(n) {
      var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
      return (
        (i.wrapFocus = !1),
        (i.isVertical = !0),
        (i.isSingleSelectionList = !1),
        (i.selectedIndex = Ms.UNSET_INDEX),
        (i.focusedItemIndex = Ms.UNSET_INDEX),
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
      ze(t, e),
      Object.defineProperty(t, "strings", {
        get: function () {
          return Rs;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Ds;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ms;
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
        e !== Ms.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ds.LIST_ITEM_ACTIVATED_CLASS
          ) && this.setUseActivatedClass(!0),
          (this.isSingleSelectionList = !0),
          (this.selectedIndex = e));
      }),
      (t.prototype.getSelectedIndexFromDOM = function () {
        for (
          var e = Ms.UNSET_INDEX, t = this.adapter.getListItemCount(), n = 0;
          n < t;
          n++
        ) {
          var i = this.adapter.listItemAtIndexHasClass(
              n,
              Ds.LIST_ITEM_SELECTED_CLASS
            ),
            r = this.adapter.listItemAtIndexHasClass(
              n,
              Ds.LIST_ITEM_ACTIVATED_CLASS
            );
          if (i || r) {
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
        return this.hasTypeahead && Hs(this.typeaheadState);
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
          r = "ArrowLeft" === Ei(e),
          s = "ArrowUp" === Ei(e),
          a = "ArrowRight" === Ei(e),
          o = "ArrowDown" === Ei(e),
          l = "Home" === Ei(e),
          c = "End" === Ei(e),
          d = "Enter" === Ei(e),
          u = "Spacebar" === Ei(e),
          p = "A" === e.key || "a" === e.key;
        if (this.adapter.isRootFocused()) {
          s || c
            ? (e.preventDefault(), this.focusLastElement())
            : (o || l) && (e.preventDefault(), this.focusFirstElement()),
            this.hasTypeahead &&
              Bs(
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
                      Ds.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
        } else {
          var f = this.adapter.getFocusedElementIndex();
          if (!(-1 === f && (f = n) < 0)) {
            if ((this.isVertical && o) || (!this.isVertical && a))
              ks(e), this.focusNextElement(f);
            else if ((this.isVertical && s) || (!this.isVertical && r))
              ks(e), this.focusPrevElement(f);
            else if (l) ks(e), this.focusFirstElement();
            else if (c) ks(e), this.focusLastElement();
            else if (p && e.ctrlKey && this.isCheckboxList)
              e.preventDefault(),
                this.toggleAll(
                  this.selectedIndex === Ms.UNSET_INDEX
                    ? []
                    : this.selectedIndex
                );
            else if ((d || u) && t) {
              var h = e.target;
              if (h && "A" === h.tagName && d) return;
              if (
                (ks(e),
                this.adapter.listItemAtIndexHasClass(
                  f,
                  Ds.LIST_ITEM_DISABLED_CLASS
                ))
              )
                return;
              this.isTypeaheadInProgress() ||
                (this.isSelectableList() && this.setSelectedIndexOnAction(f),
                this.adapter.notifyAction(f));
            }
            if (this.hasTypeahead)
              Bs(
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
                      Ds.LIST_ITEM_DISABLED_CLASS
                    );
                  },
                },
                this.typeaheadState
              );
          }
        }
      }),
      (t.prototype.handleClick = function (e, t) {
        e !== Ms.UNSET_INDEX &&
          (this.adapter.listItemAtIndexHasClass(
            e,
            Ds.LIST_ITEM_DISABLED_CLASS
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
                Ds.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Rs.ARIA_DISABLED,
                "false"
              ))
            : (this.adapter.addClassForElementIndex(
                e,
                Ds.LIST_ITEM_DISABLED_CLASS
              ),
              this.adapter.setAttributeForElementIndex(
                e,
                Rs.ARIA_DISABLED,
                "true"
              )));
      }),
      (t.prototype.setSingleSelectionAtIndex = function (e, t) {
        var n = (void 0 === t ? {} : t).forceUpdate;
        if (this.selectedIndex !== e || n) {
          var i = Ds.LIST_ITEM_SELECTED_CLASS;
          this.useActivatedClass && (i = Ds.LIST_ITEM_ACTIVATED_CLASS),
            this.selectedIndex !== Ms.UNSET_INDEX &&
              this.adapter.removeClassForElementIndex(this.selectedIndex, i),
            this.setAriaForSingleSelectionAtIndex(e),
            this.setTabindexAtIndex(e),
            e !== Ms.UNSET_INDEX && this.adapter.addClassForElementIndex(e, i),
            (this.selectedIndex = e);
        }
      }),
      (t.prototype.setAriaForSingleSelectionAtIndex = function (e) {
        this.selectedIndex === Ms.UNSET_INDEX &&
          (this.ariaCurrentAttrValue = this.adapter.getAttributeForElementIndex(
            e,
            Rs.ARIA_CURRENT
          ));
        var t = null !== this.ariaCurrentAttrValue,
          n = t ? Rs.ARIA_CURRENT : Rs.ARIA_SELECTED;
        if (
          (this.selectedIndex !== Ms.UNSET_INDEX &&
            this.adapter.setAttributeForElementIndex(
              this.selectedIndex,
              n,
              "false"
            ),
          e !== Ms.UNSET_INDEX)
        ) {
          var i = t ? this.ariaCurrentAttrValue : "true";
          this.adapter.setAttributeForElementIndex(e, n, i);
        }
      }),
      (t.prototype.getSelectionAttribute = function () {
        return this.useSelectedAttr ? Rs.ARIA_SELECTED : Rs.ARIA_CHECKED;
      }),
      (t.prototype.setRadioAtIndex = function (e) {
        var t = this.getSelectionAttribute();
        this.adapter.setCheckedCheckboxOrRadioAtIndex(e, !0),
          this.selectedIndex !== Ms.UNSET_INDEX &&
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
        this.focusedItemIndex === Ms.UNSET_INDEX && 0 !== e
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
          e !== Ms.UNSET_INDEX &&
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
            this.selectedIndex !== Ms.UNSET_INDEX
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
            (this.isSingleSelectionList && e === Ms.UNSET_INDEX)
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
        var r =
          this.selectedIndex === Ms.UNSET_INDEX
            ? []
            : this.selectedIndex.slice();
        i
          ? r.push(e)
          : (r = r.filter(function (t) {
              return t !== e;
            })),
          (this.selectedIndex = r);
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
              Ds.LIST_ITEM_DISABLED_CLASS
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
          Us(
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
                  Ds.LIST_ITEM_DISABLED_CLASS
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
            var r = t(i).trim();
            if (r) {
              var s = r[0].toLowerCase();
              n.has(s) || n.set(s, []),
                n.get(s).push({ text: r.toLowerCase(), index: i });
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
        Ps(this.typeaheadState);
      }),
      t
    );
  })(Ye);
  function js(e) {
    let t;
    const n = e[37].default,
      i = c(n, e, e[43], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r[1]) &&
          p(i, n, e, e[43], t ? u(n, e[43], r, null) : f(e[43]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function zs(e) {
    let t, i, r;
    const s = [
      { use: [e[17], ...e[0]] },
      {
        class: $t({
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
    var a = e[12];
    function o(e) {
      let t = { $$slots: { default: [js] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a &&
        ((t = new a(o(e))),
        e[38](t),
        t.$on("keydown", e[39]),
        t.$on("focusin", e[40]),
        t.$on("focusout", e[41]),
        t.$on("click", e[42]),
        t.$on("SMUIListItem:mount", e[19]),
        t.$on("SMUIListItem:unmount", e[20]),
        t.$on("SMUI:action", e[21])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            8818687 & n[0]
              ? Ne(s, [
                  131073 & n[0] && { use: [e[17], ...e[0]] },
                  266238 & n[0] && {
                    class: $t({
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
                  32768 & n[0] && { role: e[15] },
                  8388608 & n[0] && Re(e[23]),
                ])
              : {};
          if (
            (4096 & n[1] && (r.$$scope = { dirty: n, ctx: e }),
            a !== (a = e[12]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[38](t),
                t.$on("keydown", e[39]),
                t.$on("focusin", e[40]),
                t.$on("focusout", e[41]),
                t.$on("click", e[42]),
                t.$on("SMUIListItem:mount", e[19]),
                t.$on("SMUIListItem:unmount", e[20]),
                t.$on("SMUI:action", e[21]),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[38](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  function Gs(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    var l;
    const { closest: c, matches: d } = et,
      u = Et(Z());
    let p,
      f,
      { use: g = [] } = t,
      { class: $ = "" } = t,
      { nonInteractive: I = !1 } = t,
      { dense: v = !1 } = t,
      { textualList: y = !1 } = t,
      { avatarList: b = !1 } = t,
      { iconList: E = !1 } = t,
      { imageList: A = !1 } = t,
      { thumbnailList: x = !1 } = t,
      { videoList: C = !1 } = t,
      { twoLine: S = !1 } = t,
      { threeLine: _ = !1 } = t,
      { vertical: T = !0 } = t,
      {
        wrapFocus: O = null !== (l = re("SMUI:list:wrapFocus")) &&
          void 0 !== l &&
          l,
      } = t,
      { singleSelection: L = !1 } = t,
      { selectedIndex: w = -1 } = t,
      { radioList: D = !1 } = t,
      { checkList: N = !1 } = t,
      { hasTypeahead: R = !1 } = t,
      M = [],
      F = re("SMUI:list:role"),
      k = re("SMUI:list:nav");
    const U = new WeakMap();
    let H,
      P = re("SMUI:dialog:selection"),
      B = re("SMUI:addLayoutListener"),
      { component: V = k ? fn : mn } = t;
    function j() {
      return null == p
        ? []
        : [...ae().children]
            .map((e) => U.get(e))
            .filter((e) => e && e._smui_list_item_accessor);
    }
    function z(e) {
      const t = j()[e];
      t && "focus" in t.element && t.element.focus();
    }
    function G(e, t) {
      var n;
      const i = j()[e];
      return null !== (n = i && i.hasClass(t)) && void 0 !== n && n;
    }
    function q(e, t) {
      const n = j()[e];
      n && n.addClass(t);
    }
    function K(e, t) {
      const n = j()[e];
      n && n.removeClass(t);
    }
    function W(e, t, n) {
      const i = j()[e];
      i && i.addAttr(t, n);
    }
    function X(e, t) {
      const n = j()[e];
      n && n.removeAttr(t);
    }
    function Y(e, t) {
      const n = j()[e];
      return n ? n.getAttr(t) : null;
    }
    function Q(e) {
      var t;
      const n = j()[e];
      return null !== (t = n && n.getPrimaryText()) && void 0 !== t ? t : "";
    }
    function J(e) {
      const t = c(e, ".mdc-deprecated-list-item, .mdc-deprecated-list");
      return t && d(t, ".mdc-deprecated-list-item")
        ? j()
            .map((e) => (null == e ? void 0 : e.element))
            .indexOf(t)
        : -1;
    }
    function ne() {
      return f.layout();
    }
    function se() {
      return f.getSelectedIndex();
    }
    function ae() {
      return p.getElement();
    }
    ie("SMUI:list:nonInteractive", I),
      ie("SMUI:separator:context", "list"),
      F ||
        (L
          ? ((F = "listbox"), ie("SMUI:list:item:role", "option"))
          : D
          ? ((F = "radiogroup"), ie("SMUI:list:item:role", "radio"))
          : N
          ? ((F = "group"), ie("SMUI:list:item:role", "checkbox"))
          : ((F = "list"), ie("SMUI:list:item:role", void 0))),
      B && (H = B(ne)),
      ee(() => {
        i(
          13,
          (f = new Vs({
            addClassForElementIndex: q,
            focusItemAtIndex: z,
            getAttributeForElementIndex: (e, t) => {
              var n, i;
              return null !==
                (i =
                  null === (n = j()[e]) || void 0 === n
                    ? void 0
                    : n.getAttr(t)) && void 0 !== i
                ? i
                : null;
            },
            getFocusedElementIndex: () =>
              document.activeElement
                ? j()
                    .map((e) => e.element)
                    .indexOf(document.activeElement)
                : -1,
            getListItemCount: () => M.length,
            getPrimaryTextAtIndex: Q,
            hasCheckboxAtIndex: (e) => {
              var t, n;
              return (
                null !==
                  (n =
                    null === (t = j()[e]) || void 0 === t
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
                    null === (t = j()[e]) || void 0 === t
                      ? void 0
                      : t.hasRadio) &&
                void 0 !== n &&
                n
              );
            },
            isCheckboxCheckedAtIndex: (e) => {
              var t;
              const n = j()[e];
              return (
                null !==
                  (t = (null == n ? void 0 : n.hasCheckbox) && n.checked) &&
                void 0 !== t &&
                t
              );
            },
            isFocusInsideList: () =>
              null != p &&
              ae() !== document.activeElement &&
              ae().contains(document.activeElement),
            isRootFocused: () => null != p && document.activeElement === ae(),
            listItemAtIndexHasClass: G,
            notifyAction: (e) => {
              i(24, (w = e)),
                null != p &&
                  It(ae(), "SMUIList:action", { index: e }, void 0, !0);
            },
            removeClassForElementIndex: K,
            setAttributeForElementIndex: W,
            setCheckedCheckboxOrRadioAtIndex: (e, t) => {
              j()[e].checked = t;
            },
            setTabIndexForListItemChildren: (e, t) => {
              const n = j()[e];
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
            return ae();
          },
          get items() {
            return M;
          },
          get typeaheadInProgress() {
            return f.isTypeaheadInProgress();
          },
          typeaheadMatchItem: (e, t) => f.typeaheadMatchItem(e, t, !0),
          getOrderedList: j,
          focusItemAtIndex: z,
          addClassForElementIndex: q,
          removeClassForElementIndex: K,
          setAttributeForElementIndex: W,
          removeAttributeForElementIndex: X,
          getAttributeFromElementIndex: Y,
          getPrimaryTextAtIndex: Q,
        };
        return (
          It(ae(), "SMUIList:mount", e),
          f.init(),
          () => {
            f.destroy();
          }
        );
      }),
      te(() => {
        H && H();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(23, (s = m(t, r))),
          "use" in e && i(0, (g = e.use)),
          "class" in e && i(1, ($ = e.class)),
          "nonInteractive" in e && i(2, (I = e.nonInteractive)),
          "dense" in e && i(3, (v = e.dense)),
          "textualList" in e && i(4, (y = e.textualList)),
          "avatarList" in e && i(5, (b = e.avatarList)),
          "iconList" in e && i(6, (E = e.iconList)),
          "imageList" in e && i(7, (A = e.imageList)),
          "thumbnailList" in e && i(8, (x = e.thumbnailList)),
          "videoList" in e && i(9, (C = e.videoList)),
          "twoLine" in e && i(10, (S = e.twoLine)),
          "threeLine" in e && i(11, (_ = e.threeLine)),
          "vertical" in e && i(25, (T = e.vertical)),
          "wrapFocus" in e && i(26, (O = e.wrapFocus)),
          "singleSelection" in e && i(27, (L = e.singleSelection)),
          "selectedIndex" in e && i(24, (w = e.selectedIndex)),
          "radioList" in e && i(28, (D = e.radioList)),
          "checkList" in e && i(29, (N = e.checkList)),
          "hasTypeahead" in e && i(30, (R = e.hasTypeahead)),
          "component" in e && i(12, (V = e.component)),
          "$$scope" in e && i(43, (o = e.$$scope));
      }),
      (e.$$.update = () => {
        33562624 & e.$$.dirty[0] && f && f.setVerticalOrientation(T),
          67117056 & e.$$.dirty[0] && f && f.setWrapFocus(O),
          1073750016 & e.$$.dirty[0] && f && f.setHasTypeahead(R),
          134225920 & e.$$.dirty[0] && f && f.setSingleSelection(L),
          151003136 & e.$$.dirty[0] &&
            f &&
            L &&
            se() !== w &&
            f.setSelectedIndex(w);
      }),
      [
        g,
        $,
        I,
        v,
        y,
        b,
        E,
        A,
        x,
        C,
        S,
        _,
        V,
        f,
        p,
        F,
        d,
        u,
        P,
        function (e) {
          M.push(e.detail),
            U.set(e.detail.element, e.detail),
            L && e.detail.selected && i(24, (w = J(e.detail.element))),
            e.stopPropagation();
        },
        function (e) {
          var t;
          const n =
            null !== (t = e.detail && M.indexOf(e.detail)) && void 0 !== t
              ? t
              : -1;
          -1 !== n && (M.splice(n, 1), U.delete(e.detail.element)),
            e.stopPropagation();
        },
        function (e) {
          if (D || N) {
            const t = J(e.target);
            if (-1 !== t) {
              const e = j()[t];
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
        J,
        s,
        w,
        T,
        O,
        L,
        D,
        N,
        R,
        ne,
        function (e, t) {
          return f.setEnabled(e, t);
        },
        function () {
          return f.isTypeaheadInProgress();
        },
        se,
        function () {
          return f.getFocusedItemIndex();
        },
        ae,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (p = e), i(14, p);
          });
        },
        (e) =>
          f &&
          f.handleKeydown(
            e,
            e.target.classList.contains("mdc-deprecated-list-item"),
            J(e.target)
          ),
        (e) => f && f.handleFocusIn(J(e.target)),
        (e) => f && f.handleFocusOut(J(e.target)),
        (e) =>
          f &&
          f.handleClick(
            J(e.target),
            !d(e.target, 'input[type="checkbox"], input[type="radio"]')
          ),
        o,
      ]
    );
  }
  class qs extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Gs,
          zs,
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
  function Ks(e) {
    let t;
    return {
      c() {
        (t = D("span")), U(t, "class", "mdc-deprecated-list-item__ripple");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Ws(e) {
    let t,
      n,
      i = e[7] && Ks();
    const r = e[32].default,
      s = c(r, e, e[35], null);
    return {
      c() {
        i && i.c(), (t = F()), s && s.c();
      },
      m(e, r) {
        i && i.m(e, r), O(e, t, r), s && s.m(e, r), (n = !0);
      },
      p(e, a) {
        e[7]
          ? i || ((i = Ks()), i.c(), i.m(t.parentNode, t))
          : i && (i.d(1), (i = null)),
          s &&
            s.p &&
            (!n || 16 & a[1]) &&
            p(s, r, e, e[35], n ? u(r, e[35], a, null) : f(e[35]), null);
      },
      i(e) {
        n || (Se(s, e), (n = !0));
      },
      o(e) {
        _e(s, e), (n = !1);
      },
      d(e) {
        i && i.d(e), e && L(t), s && s.d(e);
      },
    };
  }
  function Xs(e) {
    let t, i, r;
    const s = [
      {
        use: [
          ...(e[6]
            ? []
            : [
                [
                  Di,
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
        class: $t({
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
      { style: Object.entries(e[17]).map(Qs).concat([e[4]]).join(" ") },
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
    var a = e[12];
    function o(e) {
      let t = { $$slots: { default: [Ws] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a &&
        ((t = new a(o(e))),
        e[33](t),
        t.$on("click", e[13]),
        t.$on("keydown", e[25]),
        t.$on("SMUIGenericInput:mount", e[26]),
        t.$on("SMUIGenericInput:unmount", e[34])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, n) {
          const r =
            167726975 & n[0]
              ? Ne(s, [
                  30425703 & n[0] && {
                    use: [
                      ...(e[6]
                        ? []
                        : [
                            [
                              Di,
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
                  2163531 & n[0] && {
                    class: $t({
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
                  131088 & n[0] && {
                    style: Object.entries(e[17])
                      .map(Qs)
                      .concat([e[4]])
                      .join(" "),
                  },
                  2097154 & n[0] &&
                    Re(e[21] && e[1] ? { "aria-current": "page" } : {}),
                  2097408 & n[0] && Re(e[21] ? {} : { role: e[8] }),
                  2097409 & n[0] &&
                    Re(
                      e[21] || "option" !== e[8]
                        ? {}
                        : { "aria-selected": e[0] ? "true" : "false" }
                    ),
                  2113792 & n[0] &&
                    Re(
                      e[21] || ("radio" !== e[8] && "checkbox" !== e[8])
                        ? {}
                        : {
                            "aria-checked":
                              e[14] && e[14].checked ? "true" : "false",
                          }
                    ),
                  2097664 & n[0] &&
                    Re(
                      e[21] ? {} : { "aria-disabled": e[9] ? "true" : "false" }
                    ),
                  1024 & n[0] && {
                    "data-menu-item-skip-restore-focus": e[10] || void 0,
                  },
                  524288 & n[0] && { tabindex: e[19] },
                  2048 & n[0] && { href: e[11] },
                  262144 & n[0] && Re(e[18]),
                  134217728 & n[0] && Re(e[27]),
                ])
              : {};
          if (
            ((128 & n[0]) | (16 & n[1]) && (r.$$scope = { dirty: n, ctx: e }),
            a !== (a = e[12]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[33](t),
                t.$on("click", e[13]),
                t.$on("keydown", e[25]),
                t.$on("SMUIGenericInput:mount", e[26]),
                t.$on("SMUIGenericInput:unmount", e[34]),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[33](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  let Ys = 0;
  const Qs = ([e, t]) => `${e}: ${t};`;
  function Js(e, t, i) {
    let r;
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
    let a = m(t, s),
      { $$slots: o = {}, $$scope: l } = t;
    var c;
    const d = Et(Z());
    let u = () => {};
    let { use: p = [] } = t,
      { class: f = "" } = t,
      { style: g = "" } = t,
      { color: $ } = t,
      {
        nonInteractive: I = null !== (c = re("SMUI:list:nonInteractive")) &&
          void 0 !== c &&
          c,
      } = t;
    ie("SMUI:list:nonInteractive", void 0);
    let { ripple: v = !I } = t,
      { activated: y = !1 } = t,
      { role: b = re("SMUI:list:item:role") } = t;
    ie("SMUI:list:item:role", void 0);
    let E,
      A,
      x,
      { selected: C = !1 } = t,
      { disabled: S = !1 } = t,
      { skipRestoreFocus: _ = !1 } = t,
      { tabindex: T = u } = t,
      { inputId: O = "SMUI-form-field-list-" + Ys++ } = t,
      { href: L } = t,
      w = {},
      D = {},
      N = {},
      R = re("SMUI:list:item:nav"),
      { component: M = R ? (L ? an : hn) : pn } = t;
    function F(e) {
      return e in w ? w[e] : G().classList.contains(e);
    }
    function k(e) {
      w[e] || i(16, (w[e] = !0), w);
    }
    function U(e) {
      (e in w && !w[e]) || i(16, (w[e] = !1), w);
    }
    function H(e) {
      var t;
      return e in N
        ? null !== (t = N[e]) && void 0 !== t
          ? t
          : null
        : G().getAttribute(e);
    }
    function P(e, t) {
      N[e] !== t && i(18, (N[e] = t), N);
    }
    function B(e) {
      (e in N && null == N[e]) || i(18, (N[e] = void 0), N);
    }
    function V() {
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
      e && i(19, (r = 0));
    }
    function j(e) {
      S || It(G(), "SMUI:action", e);
    }
    function z() {
      var e, t, n;
      const i = G(),
        r = i.querySelector(".mdc-deprecated-list-item__primary-text");
      if (r) return null !== (e = r.textContent) && void 0 !== e ? e : "";
      const s = i.querySelector(".mdc-deprecated-list-item__text");
      return s
        ? null !== (t = s.textContent) && void 0 !== t
          ? t
          : ""
        : null !== (n = i.textContent) && void 0 !== n
        ? n
        : "";
    }
    function G() {
      return E.getElement();
    }
    ie("SMUI:generic:input:props", { id: O }),
      ie("SMUI:separator:context", void 0),
      ee(() => {
        if (!C && !I) {
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
          e && (x = window.requestAnimationFrame(V));
        }
        const e = {
          _smui_list_item_accessor: !0,
          get element() {
            return G();
          },
          get selected() {
            return C;
          },
          set selected(e) {
            i(0, (C = e));
          },
          hasClass: F,
          addClass: k,
          removeClass: U,
          getAttr: H,
          addAttr: P,
          removeAttr: B,
          getPrimaryText: z,
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
          getValue: () => a.value,
          action: j,
          get tabindex() {
            return r;
          },
          set tabindex(e) {
            i(28, (T = e));
          },
          get disabled() {
            return S;
          },
          get activated() {
            return y;
          },
          set activated(e) {
            i(1, (y = e));
          },
        };
        return (
          It(G(), "SMUIListItem:mount", e),
          () => {
            It(G(), "SMUIListItem:unmount", e);
          }
        );
      }),
      te(() => {
        x && window.cancelAnimationFrame(x);
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(27, (a = m(t, s))),
          "use" in e && i(2, (p = e.use)),
          "class" in e && i(3, (f = e.class)),
          "style" in e && i(4, (g = e.style)),
          "color" in e && i(5, ($ = e.color)),
          "nonInteractive" in e && i(6, (I = e.nonInteractive)),
          "ripple" in e && i(7, (v = e.ripple)),
          "activated" in e && i(1, (y = e.activated)),
          "role" in e && i(8, (b = e.role)),
          "selected" in e && i(0, (C = e.selected)),
          "disabled" in e && i(9, (S = e.disabled)),
          "skipRestoreFocus" in e && i(10, (_ = e.skipRestoreFocus)),
          "tabindex" in e && i(28, (T = e.tabindex)),
          "inputId" in e && i(29, (O = e.inputId)),
          "href" in e && i(11, (L = e.href)),
          "component" in e && i(12, (M = e.component)),
          "$$scope" in e && i(35, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        268452417 & e.$$.dirty[0] &&
          i(
            19,
            (r = T === u ? (I || S || !(C || (A && A.checked)) ? -1 : 0) : T)
          );
      }),
      [
        C,
        y,
        p,
        f,
        g,
        $,
        I,
        v,
        b,
        S,
        _,
        L,
        M,
        j,
        A,
        E,
        w,
        D,
        N,
        r,
        d,
        R,
        k,
        U,
        function (e, t) {
          D[e] != t &&
            ("" === t || null == t
              ? (delete D[e], i(17, D))
              : i(17, (D[e] = t), D));
        },
        function (e) {
          const t = "Enter" === e.key,
            n = "Space" === e.key;
          (t || n) && j(e);
        },
        function (e) {
          ("_smui_checkbox_accessor" in e.detail ||
            "_smui_radio_accessor" in e.detail) &&
            i(14, (A = e.detail));
        },
        a,
        T,
        O,
        z,
        G,
        o,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (E = e), i(15, E);
          });
        },
        () => i(14, (A = void 0)),
        l,
      ]
    );
  }
  var Zs = Ht({ class: "mdc-deprecated-list-item__text", component: hn }),
    ea = Ht({ class: "mdc-deprecated-list-item__primary-text", component: hn }),
    ta = Ht({
      class: "mdc-deprecated-list-item__secondary-text",
      component: hn,
    });
  function na(e) {
    let t, i, r, o, l, d;
    const h = e[8].default,
      m = c(h, e, e[7], null);
    let g = [
        {
          class: (i = $t({
            [e[1]]: !0,
            "mdc-deprecated-list-item__graphic": !0,
            "mdc-menu__selection-group-icon": e[4],
          })),
        },
        e[5],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("span")), m && m.c(), H(t, $);
      },
      m(n, i) {
        O(n, t, i),
          m && m.m(t, null),
          e[9](t),
          (o = !0),
          l ||
            ((d = [v((r = xt.call(null, t, e[0]))), v(e[3].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!o || 128 & n) &&
          p(m, h, e, e[7], o ? u(h, e[7], n, null) : f(e[7]), null),
          H(
            t,
            ($ = Ne(g, [
              (!o ||
                (2 & n &&
                  i !==
                    (i = $t({
                      [e[1]]: !0,
                      "mdc-deprecated-list-item__graphic": !0,
                      "mdc-menu__selection-group-icon": e[4],
                    })))) && { class: i },
              32 & n && e[5],
            ]))
          ),
          r && a(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        o || (Se(m, e), (o = !0));
      },
      o(e) {
        _e(m, e), (o = !1);
      },
      d(n) {
        n && L(t), m && m.d(n), e[9](null), (l = !1), s(d);
      },
    };
  }
  function ia(e, t, i) {
    const r = ["use", "class", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      { use: d = [] } = t,
      { class: u = "" } = t,
      p = re("SMUI:list:graphic:menu-selection-group");
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(5, (s = m(t, r))),
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
        s,
        function () {
          return c;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(2, c);
          });
        },
      ]
    );
  }
  var ra = Ht({ class: "mdc-deprecated-list-item__meta", component: hn });
  Ht({ class: "mdc-deprecated-list-group", component: ln }),
    Ht({ class: "mdc-deprecated-list-group__subheader", component: un });
  const sa = class extends Pe {
      constructor(e) {
        super(),
          He(
            this,
            e,
            Js,
            Xs,
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
    aa = class extends Pe {
      constructor(e) {
        super(), He(this, e, ia, na, o, { use: 0, class: 1, getElement: 6 });
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
  var oa = {
      ANIMATE: "mdc-drawer--animate",
      CLOSING: "mdc-drawer--closing",
      DISMISSIBLE: "mdc-drawer--dismissible",
      MODAL: "mdc-drawer--modal",
      OPEN: "mdc-drawer--open",
      OPENING: "mdc-drawer--opening",
      ROOT: "mdc-drawer",
    },
    la = {
      APP_CONTENT_SELECTOR: ".mdc-drawer-app-content",
      CLOSE_EVENT: "MDCDrawer:closed",
      OPEN_EVENT: "MDCDrawer:opened",
      SCRIM_SELECTOR: ".mdc-drawer-scrim",
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      LIST_ITEM_ACTIVATED_SELECTOR:
        ".mdc-list-item--activated,.mdc-deprecated-list-item--activated",
    },
    ca = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (i.animationFrame = 0), (i.animationTimer = 0), i;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "strings", {
          get: function () {
            return la;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return oa;
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
            (this.adapter.addClass(oa.OPEN),
            this.adapter.addClass(oa.ANIMATE),
            this.runNextAnimationFrame(function () {
              e.adapter.addClass(oa.OPENING);
            }),
            this.adapter.saveFocus());
        }),
        (t.prototype.close = function () {
          !this.isOpen() ||
            this.isOpening() ||
            this.isClosing() ||
            this.adapter.addClass(oa.CLOSING);
        }),
        (t.prototype.isOpen = function () {
          return this.adapter.hasClass(oa.OPEN);
        }),
        (t.prototype.isOpening = function () {
          return (
            this.adapter.hasClass(oa.OPENING) ||
            this.adapter.hasClass(oa.ANIMATE)
          );
        }),
        (t.prototype.isClosing = function () {
          return this.adapter.hasClass(oa.CLOSING);
        }),
        (t.prototype.handleKeydown = function (e) {
          var t = e.keyCode;
          ("Escape" === e.key || 27 === t) && this.close();
        }),
        (t.prototype.handleTransitionEnd = function (e) {
          var t = oa.OPENING,
            n = oa.CLOSING,
            i = oa.OPEN,
            r = oa.ANIMATE,
            s = oa.ROOT;
          this.isElement(e.target) &&
            this.adapter.elementHasClass(e.target, s) &&
            (this.isClosing()
              ? (this.adapter.removeClass(i),
                this.closed(),
                this.adapter.restoreFocus(),
                this.adapter.notifyClose())
              : (this.adapter.focusActiveNavigationItem(),
                this.opened(),
                this.adapter.notifyOpen()),
            this.adapter.removeClass(r),
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
    })(Ye),
    da = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        ze(t, e),
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
    })(ca);
  function ua(e) {
    let t, i, r, o, l, d;
    const h = e[15].default,
      m = c(h, e, e[14], null);
    let g = [
        {
          class: (i = $t({
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
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("aside")), m && m.c(), H(t, $);
      },
      m(n, i) {
        O(n, t, i),
          m && m.m(t, null),
          e[16](t),
          (o = !0),
          l ||
            ((d = [
              v((r = xt.call(null, t, e[0]))),
              v(e[7].call(null, t)),
              k(t, "keydown", e[17]),
              k(t, "transitionend", e[18]),
            ]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!o || 16384 & n) &&
          p(m, h, e, e[14], o ? u(h, e[14], n, null) : f(e[14]), null),
          H(
            t,
            ($ = Ne(g, [
              (!o ||
                (78 & n &&
                  i !==
                    (i = $t({
                      [e[1]]: !0,
                      "mdc-drawer": !0,
                      "mdc-drawer--dismissible": "dismissible" === e[2],
                      "mdc-drawer--modal": "modal" === e[2],
                      "smui-drawer__absolute": "modal" === e[2] && !e[3],
                      ...e[6],
                    })))) && { class: i },
              256 & n && e[8],
            ]))
          ),
          r && a(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        o || (Se(m, e), (o = !0));
      },
      o(e) {
        _e(m, e), (o = !1);
      },
      d(n) {
        n && L(t), m && m.d(n), e[16](null), (l = !1), s(d);
      },
    };
  }
  function pa(e, t, i) {
    const r = [
      "use",
      "class",
      "variant",
      "open",
      "fixed",
      "setOpen",
      "isOpen",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const { FocusTrap: l } = jn,
      c = Et(Z());
    let d,
      u,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { variant: $ } = t,
      { open: I = !1 } = t,
      { fixed: v = !0 } = t,
      y = {},
      b = null,
      E = !1;
    ie("SMUI:list:nav", !0),
      ie("SMUI:list:item:nav", !0),
      ie("SMUI:list:wrapFocus", !0);
    let A = $;
    function x() {
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
      const n = "dismissible" === $ ? ca : "modal" === $ ? da : void 0;
      return n
        ? new n({
            addClass: S,
            removeClass: _,
            hasClass: C,
            elementHasClass: (e, t) => e.classList.contains(t),
            saveFocus: () => (b = document.activeElement),
            restoreFocus: () => {
              b &&
                "focus" in b &&
                d.contains(document.activeElement) &&
                b.focus();
            },
            focusActiveNavigationItem: () => {
              const e = d.querySelector(
                ".mdc-list-item--activated,.mdc-deprecated-list-item--activated"
              );
              e && e.focus();
            },
            notifyClose: () => {
              i(9, (I = !1)), It(d, "SMUIDrawer:closed", void 0, void 0, !0);
            },
            notifyOpen: () => {
              i(9, (I = !0)), It(d, "SMUIDrawer:opened", void 0, void 0, !0);
            },
            trapFocus: () => p.trapFocus(),
            releaseFocus: () => p.releaseFocus(),
          })
        : void 0;
    }
    function C(e) {
      return e in y ? y[e] : O().classList.contains(e);
    }
    function S(e) {
      y[e] || i(6, (y[e] = !0), y);
    }
    function _(e) {
      (e in y && !y[e]) || i(6, (y[e] = !1), y);
    }
    function T() {
      u && "handleScrimClick" in u && u.handleScrimClick();
    }
    function O() {
      return d;
    }
    ee(() => {
      (p = new l(d, { skipInitialFocus: !0 })), i(4, (u = x())), u && u.init();
    }),
      te(() => {
        u && u.destroy(),
          E && E.removeEventListener("SMUIDrawerScrim:click", T);
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(8, (s = m(t, r))),
          "use" in e && i(0, (f = e.use)),
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
          i(6, (y = {})),
          i(4, (u = x())),
          u && u.init()),
          528 & e.$$.dirty &&
            u &&
            u.isOpen() !== I &&
            (I ? u.open() : u.close());
      }),
      [
        f,
        g,
        $,
        v,
        u,
        d,
        y,
        c,
        s,
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
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(5, d);
          });
        },
        (e) => u && u.handleKeydown(e),
        (e) => u && u.handleTransitionEnd(e),
      ]
    );
  }
  class fa extends Pe {
    constructor(e) {
      super(),
        He(this, e, pa, ua, o, {
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
  var ha = Ht({ class: "mdc-drawer-app-content", component: ln }),
    ma = Ht({ class: "mdc-drawer__content", component: ln });
  Ht({ class: "mdc-drawer__header", component: ln }),
    Ht({ class: "mdc-drawer__title", component: cn }),
    Ht({ class: "mdc-drawer__subtitle", component: dn });
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
  var ga = {
    animation: { prefixed: "-webkit-animation", standard: "animation" },
    transform: { prefixed: "-webkit-transform", standard: "transform" },
    transition: { prefixed: "-webkit-transition", standard: "transition" },
  };
  function $a(e, t) {
    if (
      (function (e) {
        return (
          Boolean(e.document) && "function" == typeof e.document.createElement
        );
      })(e) &&
      t in ga
    ) {
      var n = e.document.createElement("div"),
        i = ga[t],
        r = i.standard,
        s = i.prefixed;
      return r in n.style ? r : s;
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
   */ var Ia = {
      CLOSED_CLASS: "mdc-linear-progress--closed",
      CLOSED_ANIMATION_OFF_CLASS: "mdc-linear-progress--closed-animation-off",
      INDETERMINATE_CLASS: "mdc-linear-progress--indeterminate",
      REVERSED_CLASS: "mdc-linear-progress--reversed",
      ANIMATION_READY_CLASS: "mdc-linear-progress--animation-ready",
    },
    va = {
      ARIA_HIDDEN: "aria-hidden",
      ARIA_VALUEMAX: "aria-valuemax",
      ARIA_VALUEMIN: "aria-valuemin",
      ARIA_VALUENOW: "aria-valuenow",
      BUFFER_BAR_SELECTOR: ".mdc-linear-progress__buffer-bar",
      FLEX_BASIS: "flex-basis",
      PRIMARY_BAR_SELECTOR: ".mdc-linear-progress__primary-bar",
    },
    ya = 0.8367142,
    ba = 2.00611057,
    Ea = 0.37651913,
    Aa = 0.84386165,
    xa = 1.60277782,
    Ca = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (i.observer = null), i;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ia;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return va;
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
          (this.determinate = !this.adapter.hasClass(Ia.INDETERMINATE_CLASS)),
            this.adapter.addClass(Ia.ANIMATION_READY_CLASS),
            (this.progress = 0),
            (this.buffer = 1),
            (this.observer = this.adapter.attachResizeObserver(function (t) {
              var n, i;
              if (!e.determinate)
                try {
                  for (var r = We(t), s = r.next(); !s.done; s = r.next()) {
                    var a = s.value;
                    a.contentRect &&
                      e.calculateAndSetDimensions(a.contentRect.width);
                  }
                } catch (e) {
                  n = { error: e };
                } finally {
                  try {
                    s && !s.done && (i = r.return) && i.call(r);
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
              this.adapter.removeClass(Ia.INDETERMINATE_CLASS),
              this.adapter.setAttribute(
                va.ARIA_VALUENOW,
                this.progress.toString()
              ),
              this.adapter.setAttribute(va.ARIA_VALUEMAX, "1"),
              this.adapter.setAttribute(va.ARIA_VALUEMIN, "0"),
              this.setPrimaryBarProgress(this.progress),
              void this.setBufferBarProgress(this.buffer)
            );
          this.observer &&
            this.calculateAndSetDimensions(this.adapter.getWidth()),
            this.adapter.addClass(Ia.INDETERMINATE_CLASS),
            this.adapter.removeAttribute(va.ARIA_VALUENOW),
            this.adapter.removeAttribute(va.ARIA_VALUEMAX),
            this.adapter.removeAttribute(va.ARIA_VALUEMIN),
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
              this.adapter.setAttribute(va.ARIA_VALUENOW, e.toString()));
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
          this.adapter.removeClass(Ia.CLOSED_CLASS),
            this.adapter.removeClass(Ia.CLOSED_ANIMATION_OFF_CLASS),
            this.adapter.removeAttribute(va.ARIA_HIDDEN);
        }),
        (t.prototype.close = function () {
          this.adapter.addClass(Ia.CLOSED_CLASS),
            this.adapter.setAttribute(va.ARIA_HIDDEN, "true");
        }),
        (t.prototype.isClosed = function () {
          return this.adapter.hasClass(Ia.CLOSED_CLASS);
        }),
        (t.prototype.handleTransitionEnd = function () {
          this.adapter.hasClass(Ia.CLOSED_CLASS) &&
            this.adapter.addClass(Ia.CLOSED_ANIMATION_OFF_CLASS);
        }),
        (t.prototype.destroy = function () {
          e.prototype.destroy.call(this),
            this.observer && this.observer.disconnect();
        }),
        (t.prototype.restartAnimation = function () {
          this.adapter.removeClass(Ia.ANIMATION_READY_CLASS),
            this.adapter.forceLayout(),
            this.adapter.addClass(Ia.ANIMATION_READY_CLASS);
        }),
        (t.prototype.setPrimaryBarProgress = function (e) {
          var t = "scaleX(" + e + ")",
            n =
              "undefined" != typeof window
                ? $a(window, "transform")
                : "transform";
          this.adapter.setPrimaryBarStyle(n, t);
        }),
        (t.prototype.setBufferBarProgress = function (e) {
          var t = 100 * e + "%";
          this.adapter.setBufferBarStyle(va.FLEX_BASIS, t);
        }),
        (t.prototype.calculateAndSetDimensions = function (e) {
          var t = e * ya,
            n = e * ba,
            i = e * Ea,
            r = e * Aa,
            s = e * xa;
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
              r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-half-neg",
              -r + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full",
              s + "px"
            ),
            this.adapter.setStyle(
              "--mdc-linear-progress-secondary-full-neg",
              -s + "px"
            ),
            this.restartAnimation();
        }),
        t
      );
    })(Ye);
  function Sa(t) {
    let i,
      r,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g,
      $,
      I,
      y,
      b,
      E,
      A,
      x,
      C,
      _ = [
        {
          class: ($ = $t({
            [t[1]]: !0,
            "mdc-linear-progress": !0,
            "mdc-linear-progress--indeterminate": t[3],
            "mdc-linear-progress--closed": t[4],
            "mdc-data-table__linear-progress": "data-table" === t[14],
            ...t[8],
          })),
        },
        { style: (I = Object.entries(t[10]).map(Oa).concat([t[2]]).join(" ")) },
        { role: "progressbar" },
        { "aria-valuemin": (y = 0) },
        { "aria-valuemax": (b = 1) },
        { "aria-valuenow": (E = t[3] ? void 0 : t[5]) },
        t[9],
        t[16],
      ],
      T = {};
    for (let e = 0; e < _.length; e += 1) T = n(T, _[e]);
    return {
      c() {
        (i = D("div")),
          (r = D("div")),
          (o = D("div")),
          (c = M()),
          (d = D("div")),
          (u = M()),
          (p = D("div")),
          (f = D("span")),
          (m = M()),
          (g = D("div")),
          (g.innerHTML =
            '<span class="mdc-linear-progress__bar-inner"></span>'),
          U(o, "class", "mdc-linear-progress__buffer-bar"),
          U(o, "style", (l = Object.entries(t[11]).map(_a).join(" "))),
          U(d, "class", "mdc-linear-progress__buffer-dots"),
          U(r, "class", "mdc-linear-progress__buffer"),
          U(f, "class", "mdc-linear-progress__bar-inner"),
          U(
            p,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__primary-bar"
          ),
          U(p, "style", (h = Object.entries(t[12]).map(Ta).join(" "))),
          U(
            g,
            "class",
            "mdc-linear-progress__bar mdc-linear-progress__secondary-bar"
          ),
          H(i, T);
      },
      m(e, n) {
        O(e, i, n),
          S(i, r),
          S(r, o),
          S(r, c),
          S(r, d),
          S(i, u),
          S(i, p),
          S(p, f),
          S(i, m),
          S(i, g),
          t[19](i),
          x ||
            ((C = [
              v((A = xt.call(null, i, t[0]))),
              v(t[13].call(null, i)),
              k(i, "transitionend", t[20]),
            ]),
            (x = !0));
      },
      p(e, [t]) {
        2048 & t &&
          l !== (l = Object.entries(e[11]).map(_a).join(" ")) &&
          U(o, "style", l),
          4096 & t &&
            h !== (h = Object.entries(e[12]).map(Ta).join(" ")) &&
            U(p, "style", h),
          H(
            i,
            (T = Ne(_, [
              282 & t &&
                $ !==
                  ($ = $t({
                    [e[1]]: !0,
                    "mdc-linear-progress": !0,
                    "mdc-linear-progress--indeterminate": e[3],
                    "mdc-linear-progress--closed": e[4],
                    "mdc-data-table__linear-progress": "data-table" === e[14],
                    ...e[8],
                  })) && { class: $ },
              1028 & t &&
                I !==
                  (I = Object.entries(e[10])
                    .map(Oa)
                    .concat([e[2]])
                    .join(" ")) && { style: I },
              { role: "progressbar" },
              { "aria-valuemin": 0 },
              { "aria-valuemax": 1 },
              40 & t &&
                E !== (E = e[3] ? void 0 : e[5]) && { "aria-valuenow": E },
              512 & t && e[9],
              65536 & t && e[16],
            ]))
          ),
          A && a(A.update) && 1 & t && A.update.call(null, e[0]);
      },
      i: e,
      o: e,
      d(e) {
        e && L(i), t[19](null), (x = !1), s(C);
      },
    };
  }
  const _a = ([e, t]) => `${e}: ${t};`,
    Ta = ([e, t]) => `${e}: ${t};`,
    Oa = ([e, t]) => `${e}: ${t};`;
  function La(e, t, i) {
    const r = [
      "use",
      "class",
      "style",
      "indeterminate",
      "closed",
      "progress",
      "buffer",
      "getElement",
    ];
    let s,
      a = m(t, r);
    const o = Et(Z());
    let c,
      d,
      { use: u = [] } = t,
      { class: p = "" } = t,
      { style: f = "" } = t,
      { indeterminate: g = !1 } = t,
      { closed: $ = !1 } = t,
      { progress: v = 0 } = t,
      { buffer: y } = t,
      b = {},
      E = {},
      A = {},
      x = {},
      C = {},
      S = re("SMUI:linear-progress:context"),
      _ = re("SMUI:linear-progress:closed");
    function T(e) {
      return e in b ? b[e] : F().classList.contains(e);
    }
    function O(e) {
      b[e] || i(8, (b[e] = !0), b);
    }
    function L(e) {
      (e in b && !b[e]) || i(8, (b[e] = !1), b);
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
    function R(e, t) {
      x[e] != t &&
        ("" === t || null == t
          ? (delete x[e], i(11, x))
          : i(11, (x[e] = t), x));
    }
    function M(e, t) {
      C[e] != t &&
        ("" === t || null == t
          ? (delete C[e], i(12, C))
          : i(12, (C[e] = t), C));
    }
    function F() {
      return c;
    }
    l(e, _, (e) => i(21, (s = e))),
      ee(
        () => (
          i(
            6,
            (d = new Ca({
              addClass: O,
              forceLayout: () => {
                F().getBoundingClientRect();
              },
              setBufferBarStyle: R,
              setPrimaryBarStyle: M,
              hasClass: T,
              removeAttribute: D,
              removeClass: L,
              setAttribute: w,
              setStyle: N,
              attachResizeObserver: (e) => {
                const t = window.ResizeObserver;
                if (t) {
                  const n = new t(e);
                  return n.observe(F()), n;
                }
                return null;
              },
              getWidth: () => F().offsetWidth,
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
        (t = n(n({}, t), h(e))),
          i(16, (a = m(t, r))),
          "use" in e && i(0, (u = e.use)),
          "class" in e && i(1, (p = e.class)),
          "style" in e && i(2, (f = e.style)),
          "indeterminate" in e && i(3, (g = e.indeterminate)),
          "closed" in e && i(4, ($ = e.closed)),
          "progress" in e && i(5, (v = e.progress)),
          "buffer" in e && i(17, (y = e.buffer));
      }),
      (e.$$.update = () => {
        16 & e.$$.dirty && _ && I(_, (s = $), s),
          72 & e.$$.dirty &&
            d &&
            d.isDeterminate() !== !g &&
            d.setDeterminate(!g),
          96 & e.$$.dirty && d && d.getProgress() !== v && d.setProgress(v),
          131136 & e.$$.dirty &&
            d &&
            (null == y ? d.setBuffer(1) : d.setBuffer(y)),
          80 & e.$$.dirty && d && ($ ? d.close() : d.open());
      }),
      [
        u,
        p,
        f,
        g,
        $,
        v,
        d,
        c,
        b,
        E,
        A,
        x,
        C,
        o,
        S,
        _,
        a,
        y,
        F,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(7, c);
          });
        },
        () => d && d.handleTransitionEnd(),
      ]
    );
  }
  class wa extends Pe {
    constructor(e) {
      super(),
        He(this, e, La, Sa, o, {
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
   */ var Da,
    Na,
    Ra = {
      ANCHOR: "mdc-menu-surface--anchor",
      ANIMATING_CLOSED: "mdc-menu-surface--animating-closed",
      ANIMATING_OPEN: "mdc-menu-surface--animating-open",
      FIXED: "mdc-menu-surface--fixed",
      IS_OPEN_BELOW: "mdc-menu-surface--is-open-below",
      OPEN: "mdc-menu-surface--open",
      ROOT: "mdc-menu-surface",
    },
    Ma = {
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
    Fa = {
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
  })(Da || (Da = {})),
    (function (e) {
      (e[(e.TOP_LEFT = 0)] = "TOP_LEFT"),
        (e[(e.TOP_RIGHT = 4)] = "TOP_RIGHT"),
        (e[(e.BOTTOM_LEFT = 1)] = "BOTTOM_LEFT"),
        (e[(e.BOTTOM_RIGHT = 5)] = "BOTTOM_RIGHT"),
        (e[(e.TOP_START = 8)] = "TOP_START"),
        (e[(e.TOP_END = 12)] = "TOP_END"),
        (e[(e.BOTTOM_START = 9)] = "BOTTOM_START"),
        (e[(e.BOTTOM_END = 13)] = "BOTTOM_END");
    })(Na || (Na = {}));
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
  var ka,
    Ua = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
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
          (i.anchorCorner = Na.TOP_START),
          (i.originCorner = Na.TOP_START),
          (i.anchorMargin = { top: 0, right: 0, bottom: 0, left: 0 }),
          (i.position = { x: 0, y: 0 }),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ra;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ma;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Fa;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "Corner", {
          get: function () {
            return Na;
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
          this.originCorner = this.originCorner ^ Da.RIGHT;
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
                    }, Fa.TRANSITION_OPEN_DURATION));
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
                  }, Fa.TRANSITION_CLOSE_DURATION));
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
            r = this.hasBit(n, Da.BOTTOM) ? "bottom" : "top",
            s = this.hasBit(n, Da.RIGHT) ? "right" : "left",
            a = this.getHorizontalOriginOffset(n),
            o = this.getVerticalOriginOffset(n),
            l = this.measurements,
            c = l.anchorSize,
            d = l.surfaceSize,
            u = (((e = {})[s] = a), (e[r] = o), e);
          c.width / d.width > Fa.ANCHOR_TO_MENU_SURFACE_WIDTH_RATIO &&
            (s = "center"),
            (this.isHoistedElement || this.isFixedPosition) &&
              this.adjustPositionForHoistedElement(u),
            this.adapter.setTransformOrigin(s + " " + r),
            this.adapter.setPosition(u),
            this.adapter.setMaxHeight(i ? i + "px" : ""),
            this.hasBit(n, Da.BOTTOM) ||
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
            r = this.measurements,
            s = r.viewportDistance,
            a = r.anchorSize,
            o = r.surfaceSize,
            l = t.numbers.MARGIN_TO_EDGE;
          this.hasBit(this.anchorCorner, Da.BOTTOM)
            ? ((e = s.top - l + this.anchorMargin.bottom),
              (n = s.bottom - l - this.anchorMargin.bottom))
            : ((e = s.top - l + this.anchorMargin.top),
              (n = s.bottom - l + a.height - this.anchorMargin.top)),
            !(n - o.height > 0) && e > n && (i = this.setBit(i, Da.BOTTOM));
          var c,
            d,
            u = this.adapter.isRtl(),
            p = this.hasBit(this.anchorCorner, Da.FLIP_RTL),
            f =
              this.hasBit(this.anchorCorner, Da.RIGHT) ||
              this.hasBit(i, Da.RIGHT),
            h = !1;
          (h = u && p ? !f : f)
            ? ((c = s.left + a.width + this.anchorMargin.right),
              (d = s.right - this.anchorMargin.right))
            : ((c = s.left + this.anchorMargin.left),
              (d = s.right + a.width - this.anchorMargin.left));
          var m = c - o.width > 0,
            g = d - o.width > 0,
            $ = this.hasBit(i, Da.FLIP_RTL) && this.hasBit(i, Da.RIGHT);
          return (
            (g && $ && u) || (!m && $)
              ? (i = this.unsetBit(i, Da.RIGHT))
              : ((m && h && u) || (m && !h && f) || (!g && c >= d)) &&
                (i = this.setBit(i, Da.RIGHT)),
            i
          );
        }),
        (t.prototype.getMenuSurfaceMaxHeight = function (e) {
          if (this.maxHeight > 0) return this.maxHeight;
          var n = this.measurements.viewportDistance,
            i = 0,
            r = this.hasBit(e, Da.BOTTOM),
            s = this.hasBit(this.anchorCorner, Da.BOTTOM),
            a = t.numbers.MARGIN_TO_EDGE;
          return (
            r
              ? ((i = n.top + this.anchorMargin.top - a),
                s || (i += this.measurements.anchorSize.height))
              : ((i =
                  n.bottom -
                  this.anchorMargin.bottom +
                  this.measurements.anchorSize.height -
                  a),
                s && (i -= this.measurements.anchorSize.height)),
            i
          );
        }),
        (t.prototype.getHorizontalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Da.RIGHT),
            i = this.hasBit(this.anchorCorner, Da.RIGHT);
          if (n) {
            var r = i
              ? t.width - this.anchorMargin.left
              : this.anchorMargin.right;
            return this.isHoistedElement || this.isFixedPosition
              ? r -
                  (this.measurements.viewportSize.width -
                    this.measurements.bodySize.width)
              : r;
          }
          return i ? t.width - this.anchorMargin.right : this.anchorMargin.left;
        }),
        (t.prototype.getVerticalOriginOffset = function (e) {
          var t = this.measurements.anchorSize,
            n = this.hasBit(e, Da.BOTTOM),
            i = this.hasBit(this.anchorCorner, Da.BOTTOM);
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
            r = i.windowScroll,
            s = i.viewportDistance,
            a = i.surfaceSize,
            o = i.viewportSize,
            l = Object.keys(e);
          try {
            for (var c = We(l), d = c.next(); !d.done; d = c.next()) {
              var u = d.value,
                p = e[u] || 0;
              !this.isHorizontallyCenteredOnViewport ||
              ("left" !== u && "right" !== u)
                ? ((p += s[u]),
                  this.isFixedPosition ||
                    ("top" === u
                      ? (p += r.y)
                      : "bottom" === u
                      ? (p -= r.y)
                      : "left" === u
                      ? (p += r.x)
                      : (p -= r.x)),
                  (e[u] = p))
                : (e[u] = (o.width - a.width) / 2);
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
            }, Fa.TOUCH_EVENT_WAIT_MS);
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
    })(Ye),
    Ha = {
      MENU_SELECTED_LIST_ITEM: "mdc-menu-item--selected",
      MENU_SELECTION_GROUP: "mdc-menu__selection-group",
      ROOT: "mdc-menu",
    },
    Pa = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_DISABLED_ATTR: "aria-disabled",
      CHECKBOX_SELECTOR: 'input[type="checkbox"]',
      LIST_SELECTOR: ".mdc-list,.mdc-deprecated-list",
      SELECTED_EVENT: "MDCMenu:selected",
      SKIP_RESTORE_FOCUS: "data-menu-item-skip-restore-focus",
    },
    Ba = { FOCUS_ROOT_INDEX: -1 };
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
  })(ka || (ka = {}));
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
  var Va = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.closeAnimationEndTimerId = 0),
          (i.defaultFocusState = ka.LIST_ROOT),
          (i.selectedIndex = -1),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ha;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Pa;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ba;
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
                Pa.SKIP_RESTORE_FOCUS
              );
            this.adapter.closeSurface(i),
              (this.closeAnimationEndTimerId = setTimeout(function () {
                var n = t.adapter.getElementIndex(e);
                n >= 0 &&
                  t.adapter.isSelectableItemAtIndex(n) &&
                  t.setSelectedIndex(n);
              }, Ua.numbers.TRANSITION_CLOSE_DURATION));
          }
        }),
        (t.prototype.handleMenuSurfaceOpened = function () {
          switch (this.defaultFocusState) {
            case ka.FIRST_ITEM:
              this.adapter.focusItemAtIndex(0);
              break;
            case ka.LAST_ITEM:
              this.adapter.focusItemAtIndex(
                this.adapter.getMenuItemCount() - 1
              );
              break;
            case ka.NONE:
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
              Pa.ARIA_CHECKED_ATTR
            ),
            this.adapter.removeClassFromElementAtIndex(
              t,
              Ha.MENU_SELECTED_LIST_ITEM
            )),
            this.adapter.addClassToElementAtIndex(
              e,
              Ha.MENU_SELECTED_LIST_ITEM
            ),
            this.adapter.addAttributeToElementAtIndex(
              e,
              Pa.ARIA_CHECKED_ATTR,
              "true"
            ),
            (this.selectedIndex = e);
        }),
        (t.prototype.setEnabled = function (e, t) {
          this.validatedIndex(e),
            t
              ? (this.adapter.removeClassFromElementAtIndex(
                  e,
                  Ds.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Pa.ARIA_DISABLED_ATTR,
                  "false"
                ))
              : (this.adapter.addClassToElementAtIndex(
                  e,
                  Ds.LIST_ITEM_DISABLED_CLASS
                ),
                this.adapter.addAttributeToElementAtIndex(
                  e,
                  Pa.ARIA_DISABLED_ATTR,
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
    })(Ye),
    ja = {
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
    za = {
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
    Ga = { LABEL_SCALE: 0.75, UNSET_INDEX: -1, CLICK_DEBOUNCE_TIMEOUT_MS: 330 },
    qa = (function (e) {
      function t(n, i) {
        void 0 === i && (i = {});
        var r = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (r.disabled = !1),
          (r.isMenuOpen = !1),
          (r.useDefaultValidation = !0),
          (r.customValidity = !0),
          (r.lastSelectedIndex = Ga.UNSET_INDEX),
          (r.clickDebounceTimeout = 0),
          (r.recentlyClicked = !1),
          (r.leadingIcon = i.leadingIcon),
          (r.helperText = i.helperText),
          r
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ja;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Ga;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return za;
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
              (e === Ga.UNSET_INDEX
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
          return e !== Ga.UNSET_INDEX ? t[e] : "";
        }),
        (t.prototype.getDisabled = function () {
          return this.disabled;
        }),
        (t.prototype.setDisabled = function (e) {
          (this.disabled = e),
            this.disabled
              ? (this.adapter.addClass(ja.DISABLED), this.adapter.closeMenu())
              : this.adapter.removeClass(ja.DISABLED),
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
          this.adapter.addClass(ja.ACTIVATED),
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
              t = this.adapter.hasClass(ja.FOCUSED),
              n = e || t,
              i = this.adapter.hasClass(ja.REQUIRED);
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
          this.adapter.removeClass(ja.ACTIVATED),
            (this.isMenuOpen = !1),
            this.adapter.isSelectAnchorFocused() || this.blur();
        }),
        (t.prototype.handleChange = function () {
          this.layout(),
            this.adapter.notifyChange(this.getValue()),
            this.adapter.hasClass(ja.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.handleMenuItemAction = function (e) {
          this.setSelectedIndex(e, !0);
        }),
        (t.prototype.handleFocus = function () {
          this.adapter.addClass(ja.FOCUSED),
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
          if (!this.isMenuOpen && this.adapter.hasClass(ja.FOCUSED)) {
            var t = Ei(e) === qn,
              n = Ei(e) === Kn,
              i = Ei(e) === Zn,
              r = Ei(e) === ti;
            if (
              !(e.ctrlKey || e.metaKey) &&
              ((!n && e.key && 1 === e.key.length) ||
                (n && this.adapter.isTypeaheadInProgress()))
            ) {
              var s = n ? " " : e.key,
                a = this.adapter.typeaheadMatchItem(s, this.getSelectedIndex());
              return (
                a >= 0 && this.setSelectedIndex(a), void e.preventDefault()
              );
            }
            (t || n || i || r) &&
              (i && this.getSelectedIndex() > 0
                ? this.setSelectedIndex(this.getSelectedIndex() - 1)
                : r &&
                  this.getSelectedIndex() <
                    this.adapter.getMenuItemCount() - 1 &&
                  this.setSelectedIndex(this.getSelectedIndex() + 1),
              this.openMenu(),
              e.preventDefault());
          }
        }),
        (t.prototype.notchOutline = function (e) {
          if (this.adapter.hasOutline()) {
            var t = this.adapter.hasClass(ja.FOCUSED);
            if (e) {
              var n = Ga.LABEL_SCALE,
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
              ? (this.adapter.removeClass(ja.INVALID),
                this.adapter.removeMenuClass(ja.MENU_INVALID))
              : (this.adapter.addClass(ja.INVALID),
                this.adapter.addMenuClass(ja.MENU_INVALID)),
            this.syncHelperTextValidity(e);
        }),
        (t.prototype.isValid = function () {
          return this.useDefaultValidation &&
            this.adapter.hasClass(ja.REQUIRED) &&
            !this.adapter.hasClass(ja.DISABLED)
            ? this.getSelectedIndex() !== Ga.UNSET_INDEX &&
                (0 !== this.getSelectedIndex() || Boolean(this.getValue()))
            : this.customValidity;
        }),
        (t.prototype.setRequired = function (e) {
          e
            ? this.adapter.addClass(ja.REQUIRED)
            : this.adapter.removeClass(ja.REQUIRED),
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
            this.adapter.setMenuAnchorCorner(Na.BOTTOM_START)),
            this.adapter.setMenuWrapFocus(!1),
            this.setDisabled(this.adapter.hasClass(ja.DISABLED)),
            this.syncHelperTextValidity(!this.adapter.hasClass(ja.INVALID)),
            this.layout(),
            this.layoutOptions();
        }),
        (t.prototype.blur = function () {
          this.adapter.removeClass(ja.FOCUSED),
            this.layout(),
            this.adapter.deactivateBottomLine(),
            this.adapter.hasClass(ja.REQUIRED) &&
              this.useDefaultValidation &&
              this.setValid(this.isValid());
        }),
        (t.prototype.syncHelperTextValidity = function (e) {
          if (this.helperText) {
            this.helperText.setValidity(e);
            var t = this.helperText.isVisible(),
              n = this.helperText.getId();
            t && n
              ? this.adapter.setSelectAnchorAttr(za.ARIA_DESCRIBEDBY, n)
              : this.adapter.removeSelectAnchorAttr(za.ARIA_DESCRIBEDBY);
          }
        }),
        (t.prototype.setClickDebounceTimeout = function () {
          var e = this;
          clearTimeout(this.clickDebounceTimeout),
            (this.clickDebounceTimeout = setTimeout(function () {
              e.recentlyClicked = !1;
            }, Ga.CLICK_DEBOUNCE_TIMEOUT_MS)),
            (this.recentlyClicked = !0);
        }),
        t
      );
    })(Ye),
    Ka = { ARIA_HIDDEN: "aria-hidden", ROLE: "role" },
    Wa = {
      HELPER_TEXT_VALIDATION_MSG: "mdc-select-helper-text--validation-msg",
      HELPER_TEXT_VALIDATION_MSG_PERSISTENT:
        "mdc-select-helper-text--validation-msg-persistent",
    },
    Xa = (function (e) {
      function t(n) {
        return e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Wa;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Ka;
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
          return "true" !== this.adapter.getAttr(Ka.ARIA_HIDDEN);
        }),
        (t.prototype.setContent = function (e) {
          this.adapter.setContent(e);
        }),
        (t.prototype.setValidation = function (e) {
          e
            ? this.adapter.addClass(Wa.HELPER_TEXT_VALIDATION_MSG)
            : this.adapter.removeClass(Wa.HELPER_TEXT_VALIDATION_MSG);
        }),
        (t.prototype.setValidationMsgPersistent = function (e) {
          e
            ? this.adapter.addClass(Wa.HELPER_TEXT_VALIDATION_MSG_PERSISTENT)
            : this.adapter.removeClass(
                Wa.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
              );
        }),
        (t.prototype.setValidity = function (e) {
          if (this.adapter.hasClass(Wa.HELPER_TEXT_VALIDATION_MSG)) {
            var t = this.adapter.hasClass(
              Wa.HELPER_TEXT_VALIDATION_MSG_PERSISTENT
            );
            if (!e || t)
              return (
                this.showToScreenReader(),
                void (e
                  ? this.adapter.removeAttr(Ka.ROLE)
                  : this.adapter.setAttr(Ka.ROLE, "alert"))
              );
            this.adapter.removeAttr(Ka.ROLE), this.hide();
          }
        }),
        (t.prototype.showToScreenReader = function () {
          this.adapter.removeAttr(Ka.ARIA_HIDDEN);
        }),
        (t.prototype.hide = function () {
          this.adapter.setAttr(Ka.ARIA_HIDDEN, "true");
        }),
        t
      );
    })(Ye);
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
   */ const { document: Ya } = Oe;
  function Qa(e) {
    let t, i, r, o, l, d, h, m;
    const g = e[31].default,
      $ = c(g, e, e[30], null);
    let I = [
        {
          class: (r = $t({
            [e[2]]: !0,
            "mdc-menu-surface": !0,
            "mdc-menu-surface--fixed": e[5],
            "mdc-menu-surface--open": e[4],
            "smui-menu-surface--static": e[4],
            "mdc-menu-surface--fullwidth": e[7],
            ...e[10],
          })),
        },
        { style: (o = Object.entries(e[11]).map(Ja).concat([e[3]]).join(" ")) },
        e[13],
      ],
      y = {};
    for (let e = 0; e < I.length; e += 1) y = n(y, I[e]);
    return {
      c() {
        (t = M()), (i = D("div")), $ && $.c(), H(i, y);
      },
      m(n, r) {
        O(n, t, r),
          O(n, i, r),
          $ && $.m(i, null),
          e[33](i),
          (d = !0),
          h ||
            ((m = [
              k(Ya.body, "click", e[32], !0),
              v((l = xt.call(null, i, e[1]))),
              v(e[12].call(null, i)),
              k(i, "keydown", e[34]),
            ]),
            (h = !0));
      },
      p(e, t) {
        $ &&
          $.p &&
          (!d || 1073741824 & t[0]) &&
          p($, g, e, e[30], d ? u(g, e[30], t, null) : f(e[30]), null),
          H(
            i,
            (y = Ne(I, [
              (!d ||
                (1204 & t[0] &&
                  r !==
                    (r = $t({
                      [e[2]]: !0,
                      "mdc-menu-surface": !0,
                      "mdc-menu-surface--fixed": e[5],
                      "mdc-menu-surface--open": e[4],
                      "smui-menu-surface--static": e[4],
                      "mdc-menu-surface--fullwidth": e[7],
                      ...e[10],
                    })))) && { class: r },
              (!d ||
                (2056 & t[0] &&
                  o !==
                    (o = Object.entries(e[11])
                      .map(Ja)
                      .concat([e[3]])
                      .join(" ")))) && { style: o },
              8192 & t[0] && e[13],
            ]))
          ),
          l && a(l.update) && 2 & t[0] && l.update.call(null, e[1]);
      },
      i(e) {
        d || (Se($, e), (d = !0));
      },
      o(e) {
        _e($, e), (d = !1);
      },
      d(n) {
        n && L(t), n && L(i), $ && $.d(n), e[33](null), (h = !1), s(m);
      },
    };
  }
  const Ja = ([e, t]) => `${e}: ${t};`;
  function Za(e, t, i) {
    const r = [
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
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    var l, c, d;
    const u = Et(Z());
    let p,
      f,
      g,
      { use: $ = [] } = t,
      { class: I = "" } = t,
      { style: v = "" } = t,
      { static: y = !1 } = t,
      { anchor: b = !0 } = t,
      { fixed: E = !1 } = t,
      { open: A = y } = t,
      { managed: x = !1 } = t,
      { fullWidth: C = !1 } = t,
      { quickOpen: S = !1 } = t,
      { anchorElement: _ } = t,
      { anchorCorner: T } = t,
      { anchorMargin: O = { top: 0, right: 0, bottom: 0, left: 0 } } = t,
      { maxHeight: L = 0 } = t,
      { horizontallyCenteredOnViewport: w = !1 } = t,
      D = {},
      N = {};
    ie("SMUI:list:role", "menu"), ie("SMUI:list:item:role", "menuitem");
    const R = Na;
    function M(e) {
      return e in D ? D[e] : H().classList.contains(e);
    }
    function F(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function k(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function U(e) {
      f.close(e), i(0, (A = !1));
    }
    function H() {
      return p;
    }
    ee(() => {
      i(
        9,
        (f = new Ua({
          addClass: F,
          removeClass: k,
          hasClass: M,
          hasAnchor: () => !!_,
          notifyClose: () => {
            x || i(0, (A = y)),
              A || It(p, "SMUIMenuSurface:closed", void 0, void 0, !0);
          },
          notifyClosing: () => {
            x || i(0, (A = y)),
              A || It(p, "SMUIMenuSurface:closing", void 0, void 0, !0);
          },
          notifyOpen: () => {
            x || i(0, (A = !0)),
              A && It(p, "SMUIMenuSurface:opened", void 0, void 0, !0);
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
          getAnchorDimensions: () => (_ ? _.getBoundingClientRect() : null),
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
        It(p, "SMUIMenuSurface:mount", {
          get open() {
            return A;
          },
          set open(e) {
            i(0, (A = e));
          },
          closeProgrammatic: U,
        }),
        f.init(),
        () => {
          var e;
          const t = f.isHoistedElement;
          f.destroy(),
            t &&
              (null === (e = p.parentNode) || void 0 === e || e.removeChild(p));
        }
      );
    }),
      te(() => {
        var e;
        b &&
          p &&
          (null === (e = p.parentElement) ||
            void 0 === e ||
            e.classList.remove("mdc-menu-surface--anchor"));
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(13, (s = m(t, r))),
          "use" in e && i(1, ($ = e.use)),
          "class" in e && i(2, (I = e.class)),
          "style" in e && i(3, (v = e.style)),
          "static" in e && i(4, (y = e.static)),
          "anchor" in e && i(15, (b = e.anchor)),
          "fixed" in e && i(5, (E = e.fixed)),
          "open" in e && i(0, (A = e.open)),
          "managed" in e && i(6, (x = e.managed)),
          "fullWidth" in e && i(7, (C = e.fullWidth)),
          "quickOpen" in e && i(16, (S = e.quickOpen)),
          "anchorElement" in e && i(14, (_ = e.anchorElement)),
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
          b &&
          !(null === i(27, (l = p.parentElement)) || void 0 === l
            ? void 0
            : l.classList.contains("mdc-menu-surface--anchor")) &&
          (null === i(28, (c = p.parentElement)) ||
            void 0 === c ||
            c.classList.add("mdc-menu-surface--anchor"),
          i(
            14,
            (_ =
              null !== i(29, (d = p.parentElement)) && void 0 !== d
                ? d
                : void 0)
          )),
          513 & e.$$.dirty[0] &&
            f &&
            f.isOpen() !== A &&
            (A ? f.open() : f.close()),
          66048 & e.$$.dirty[0] && f && f.setQuickOpen(S),
          544 & e.$$.dirty[0] && f && f.setFixedPosition(E),
          524800 & e.$$.dirty[0] && f && f.setMaxHeight(L),
          1049088 & e.$$.dirty[0] &&
            f &&
            f.setIsHorizontallyCenteredOnViewport(w),
          131584 & e.$$.dirty[0] &&
            f &&
            null != T &&
            ("string" == typeof T
              ? f.setAnchorCorner(R[T])
              : f.setAnchorCorner(T)),
          262656 & e.$$.dirty[0] && f && f.setAnchorMargin(O);
      }),
      [
        A,
        $,
        I,
        v,
        y,
        E,
        x,
        C,
        p,
        f,
        D,
        N,
        u,
        s,
        _,
        b,
        S,
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
          return f.setAbsolutePosition(e, t);
        },
        function (e) {
          return f.setIsHoisted(e);
        },
        function () {
          return f.isFixed();
        },
        H,
        l,
        c,
        d,
        o,
        a,
        (e) => f && A && !x && f.handleBodyClick(e),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (p = e), i(8, p);
          });
        },
        (e) => f && f.handleKeydown(e),
      ]
    );
  }
  class eo extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Za,
          Qa,
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
  function to(
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
  function no(e) {
    let t;
    const n = e[16].default,
      i = c(n, e, e[21], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 2097152 & r) &&
          p(i, n, e, e[21], t ? u(n, e[21], r, null) : f(e[21]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function io(e) {
    let t, i, r;
    const s = [
      { use: e[5] },
      { class: $t({ [e[1]]: !0, "mdc-menu": !0 }) },
      e[9],
    ];
    function a(t) {
      e[18](t);
    }
    let o = { $$slots: { default: [no] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = n(o, s[e]);
    return (
      void 0 !== e[0] && (o.open = e[0]),
      (t = new eo({ props: o })),
      e[17](t),
      oe.push(() => Me(t, "open", a)),
      t.$on("SMUIMenuSurface:mount", e[7]),
      t.$on("SMUIList:mount", e[8]),
      t.$on("SMUIMenuSurface:opened", e[19]),
      t.$on("keydown", e[6]),
      t.$on("SMUIList:action", e[20]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            546 & n
              ? Ne(s, [
                  32 & n && { use: e[5] },
                  2 & n && { class: $t({ [e[1]]: !0, "mdc-menu": !0 }) },
                  512 & n && Re(e[9]),
                ])
              : {};
          2097152 & n && (r.$$scope = { dirty: n, ctx: e }),
            !i && 1 & n && ((i = !0), (r.open = e[0]), he(() => (i = !1))),
            t.$set(r);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[17](null), Ue(t, n);
        },
      }
    );
  }
  function ro(e, t, i) {
    let r;
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
    let a = m(t, s),
      { $$slots: o = {}, $$scope: l } = t;
    const { closest: c } = et,
      d = Et(Z());
    let u,
      p,
      f,
      g,
      { use: $ = [] } = t,
      { class: I = "" } = t,
      { open: v = !1 } = t;
    function y() {
      return u.getElement();
    }
    ee(
      () => (
        i(
          3,
          (p = new Va({
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
            closeSurface: (e) => f.closeProgrammatic(e),
            getElementIndex: (e) =>
              g
                .getOrderedList()
                .map((e) => e.element)
                .indexOf(e),
            notifySelected: (e) =>
              It(
                y(),
                "SMUIMenu:selected",
                { index: e.index, item: g.getOrderedList()[e.index].element },
                void 0,
                !0
              ),
            getMenuItemCount: () => g.items.length,
            focusItemAtIndex: (e) => g.focusItemAtIndex(e),
            focusListRoot: () => "focus" in g.element && g.element.focus(),
            isSelectableItemAtIndex: (e) =>
              !!c(g.getOrderedList()[e].element, `.${Ha.MENU_SELECTION_GROUP}`),
            getSelectedSiblingOfItemAtIndex: (e) => {
              const t = g.getOrderedList(),
                n = c(t[e].element, `.${Ha.MENU_SELECTION_GROUP}`),
                i =
                  null == n
                    ? void 0
                    : n.querySelector(`.${Ha.MENU_SELECTED_LIST_ITEM}`);
              return i ? t.map((e) => e.element).indexOf(i) : -1;
            },
          }))
        ),
        It(y(), "SMUIMenu:mount", p),
        p.init(),
        () => {
          p.destroy();
        }
      )
    );
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(9, (a = m(t, s))),
          "use" in e && i(10, ($ = e.use)),
          "class" in e && i(1, (I = e.class)),
          "open" in e && i(0, (v = e.open)),
          "$$scope" in e && i(21, (l = e.$$scope));
      }),
      (e.$$.update = () => {
        1024 & e.$$.dirty && i(5, (r = [d, ...$]));
      }),
      [
        v,
        I,
        u,
        p,
        g,
        r,
        function (e) {
          p && p.handleKeydown(e);
        },
        function (e) {
          f || (f = e.detail);
        },
        function (e) {
          g || i(4, (g = e.detail));
        },
        a,
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
        y,
        o,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
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
  class so extends Pe {
    constructor(e) {
      super(),
        He(this, e, ro, io, o, {
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
  function ao(t) {
    let n;
    return {
      c() {
        n = R(t[8]);
      },
      m(e, t) {
        O(e, n, t);
      },
      p(e, t) {
        256 & t && P(n, e[8]);
      },
      i: e,
      o: e,
      d(e) {
        e && L(n);
      },
    };
  }
  function oo(e) {
    let t;
    const n = e[13].default,
      i = c(n, e, e[12], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 4096 & r) &&
          p(i, n, e, e[12], t ? u(n, e[12], r, null) : f(e[12]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function lo(e) {
    let t, i, r, o, l, c, d, u, p;
    const f = [oo, ao],
      h = [];
    function m(e, t) {
      return null == e[8] ? 0 : 1;
    }
    (i = m(e)), (r = h[i] = f[i](e));
    let g = [
        {
          class: (o = $t({
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
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("div")), r.c(), H(t, $);
      },
      m(n, r) {
        O(n, t, r),
          h[i].m(t, null),
          e[14](t),
          (d = !0),
          u ||
            ((p = [v((c = xt.call(null, t, e[0]))), v(e[9].call(null, t))]),
            (u = !0));
      },
      p(e, [n]) {
        let s = i;
        (i = m(e)),
          i === s
            ? h[i].p(e, n)
            : (xe(),
              _e(h[s], 1, 1, () => {
                h[s] = null;
              }),
              Ce(),
              (r = h[i]),
              r ? r.p(e, n) : ((r = h[i] = f[i](e)), r.c()),
              Se(r, 1),
              r.m(t, null)),
          H(
            t,
            ($ = Ne(g, [
              (!d ||
                (90 & n &&
                  o !==
                    (o = $t({
                      [e[1]]: !0,
                      "mdc-select-helper-text": !0,
                      "mdc-select-helper-text--validation-msg": e[4],
                      "mdc-select-helper-text--validation-msg-persistent": e[3],
                      ...e[6],
                    })))) && { class: o },
              (!d || (8 & n && l !== (l = e[3] ? void 0 : "true"))) && {
                "aria-hidden": l,
              },
              (!d || 4 & n) && { id: e[2] },
              128 & n && e[7],
              1024 & n && e[10],
            ]))
          ),
          c && a(c.update) && 1 & n && c.update.call(null, e[0]);
      },
      i(e) {
        d || (Se(r), (d = !0));
      },
      o(e) {
        _e(r), (d = !1);
      },
      d(n) {
        n && L(t), h[i].d(), e[14](null), (u = !1), s(p);
      },
    };
  }
  Ht({ class: "mdc-menu__selection-group-icon", component: aa });
  let co = 0;
  function uo(e, t, i) {
    const r = [
      "use",
      "class",
      "id",
      "persistent",
      "validationMsg",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      d,
      u,
      { use: p = [] } = t,
      { class: f = "" } = t,
      { id: g = "SMUI-select-helper-text-" + co++ } = t,
      { persistent: $ = !1 } = t,
      { validationMsg: I = !1 } = t,
      v = {},
      y = {};
    function b(e) {
      return e in v ? v[e] : _().classList.contains(e);
    }
    function E(e) {
      v[e] || i(6, (v[e] = !0), v);
    }
    function A(e) {
      (e in v && !v[e]) || i(6, (v[e] = !1), v);
    }
    function x(e) {
      var t;
      return e in y
        ? null !== (t = y[e]) && void 0 !== t
          ? t
          : null
        : _().getAttribute(e);
    }
    function C(e, t) {
      y[e] !== t && i(7, (y[e] = t), y);
    }
    function S(e) {
      (e in y && null == y[e]) || i(7, (y[e] = void 0), y);
    }
    function _() {
      return c;
    }
    return (
      ee(
        () => (
          (d = new Xa({
            addClass: E,
            removeClass: A,
            hasClass: b,
            getAttr: x,
            setAttr: C,
            removeAttr: S,
            setContent: (e) => {
              i(8, (u = e));
            },
          })),
          g.startsWith("SMUI-select-helper-text-") &&
            It(_(), "SMUISelectHelperText:id", g),
          It(_(), "SMUISelectHelperText:mount", d),
          d.init(),
          () => {
            It(_(), "SMUISelectHelperText:unmount", d), d.destroy();
          }
        )
      ),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (p = e.use)),
          "class" in e && i(1, (f = e.class)),
          "id" in e && i(2, (g = e.id)),
          "persistent" in e && i(3, ($ = e.persistent)),
          "validationMsg" in e && i(4, (I = e.validationMsg)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        p,
        f,
        g,
        $,
        I,
        c,
        v,
        y,
        u,
        l,
        s,
        _,
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(5, c);
          });
        },
      ]
    );
  }
  class po extends Pe {
    constructor(e) {
      super(),
        He(this, e, uo, lo, o, {
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
  const fo = (e) => ({}),
    ho = (e) => ({}),
    mo = (e) => ({}),
    go = (e) => ({}),
    $o = (e) => ({}),
    Io = (e) => ({}),
    vo = (e) => ({}),
    yo = (e) => ({});
  function bo(e) {
    let t,
      i = [
        { type: "hidden" },
        { required: e[10] },
        { disabled: e[6] },
        { value: e[0] },
        At(e[53], "input$"),
      ],
      r = {};
    for (let e = 0; e < i.length; e += 1) r = n(r, i[e]);
    return {
      c() {
        (t = D("input")), H(t, r);
      },
      m(e, n) {
        O(e, t, n), t.autofocus && t.focus();
      },
      p(e, n) {
        H(
          t,
          (r = Ne(i, [
            { type: "hidden" },
            1024 & n[0] && { required: e[10] },
            64 & n[0] && { disabled: e[6] },
            1 & n[0] && { value: e[0] },
            4194304 & n[1] && At(e[53], "input$"),
          ]))
        );
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Eo(e) {
    let t;
    return {
      c() {
        (t = D("span")), U(t, "class", "mdc-select__ripple");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Ao(e) {
    let t, i;
    const r = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      At(e[53], "label$"),
    ];
    let s = { $$slots: { default: [xo] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Hi({ props: s })),
      e[66](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Ne(r, [
                  2048 & n[0] && { id: e[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== e[43] },
                  1024 & n[0] && { required: e[10] },
                  4194304 & n[1] && Re(At(e[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[66](null), Ue(t, n);
        },
      }
    );
  }
  function xo(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const r = e[63].label,
      s = c(r, e, e[89], yo);
    return {
      c() {
        (t = R(i)), s && s.c();
      },
      m(e, i) {
        O(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, a) {
        (!n || 512 & a[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 134217728 & a[2]) &&
            p(s, r, e, e[89], n ? u(r, e[89], a, vo) : f(e[89]), yo);
      },
      i(e) {
        n || (Se(s, e), (n = !0));
      },
      o(e) {
        _e(s, e), (n = !1);
      },
      d(e) {
        e && L(t), s && s.d(e);
      },
    };
  }
  function Co(e) {
    let t, i;
    const r = [
      { noLabel: e[8] || (null == e[9] && !e[52].label) },
      At(e[53], "outline$"),
    ];
    let s = { $$slots: { default: [To] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Wi({ props: s })),
      e[68](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (768 & n[0]) | (6291456 & n[1])
              ? Ne(r, [
                  (768 & n[0]) | (2097152 & n[1]) && {
                    noLabel: e[8] || (null == e[9] && !e[52].label),
                  },
                  4194304 & n[1] && Re(At(e[53], "outline$")),
                ])
              : {};
          (3840 & n[0]) | (6296064 & n[1]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[68](null), Ue(t, n);
        },
      }
    );
  }
  function So(e) {
    let t, i;
    const r = [
      { id: e[11] + "-smui-label" },
      { floatAbove: "" !== e[43] },
      { required: e[10] },
      At(e[53], "label$"),
    ];
    let s = { $$slots: { default: [_o] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new Hi({ props: s })),
      e[67](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i =
            (3072 & n[0]) | (4198400 & n[1])
              ? Ne(r, [
                  2048 & n[0] && { id: e[11] + "-smui-label" },
                  4096 & n[1] && { floatAbove: "" !== e[43] },
                  1024 & n[0] && { required: e[10] },
                  4194304 & n[1] && Re(At(e[53], "label$")),
                ])
              : {};
          (512 & n[0]) | (134217728 & n[2]) &&
            (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[67](null), Ue(t, n);
        },
      }
    );
  }
  function _o(e) {
    let t,
      n,
      i = (null == e[9] ? "" : e[9]) + "";
    const r = e[63].label,
      s = c(r, e, e[89], Io);
    return {
      c() {
        (t = R(i)), s && s.c();
      },
      m(e, i) {
        O(e, t, i), s && s.m(e, i), (n = !0);
      },
      p(e, a) {
        (!n || 512 & a[0]) &&
          i !== (i = (null == e[9] ? "" : e[9]) + "") &&
          P(t, i),
          s &&
            s.p &&
            (!n || 134217728 & a[2]) &&
            p(s, r, e, e[89], n ? u(r, e[89], a, $o) : f(e[89]), Io);
      },
      i(e) {
        n || (Se(s, e), (n = !0));
      },
      o(e) {
        _e(s, e), (n = !1);
      },
      d(e) {
        e && L(t), s && s.d(e);
      },
    };
  }
  function To(e) {
    let t,
      n,
      i = !e[8] && (null != e[9] || e[52].label) && So(e);
    return {
      c() {
        i && i.c(), (t = F());
      },
      m(e, r) {
        i && i.m(e, r), O(e, t, r), (n = !0);
      },
      p(e, n) {
        e[8] || (null == e[9] && !e[52].label)
          ? i &&
            (xe(),
            _e(i, 1, 1, () => {
              i = null;
            }),
            Ce())
          : i
          ? (i.p(e, n), (768 & n[0]) | (2097152 & n[1]) && Se(i, 1))
          : ((i = So(e)), i.c(), Se(i, 1), i.m(t.parentNode, t));
      },
      i(e) {
        n || (Se(i), (n = !0));
      },
      o(e) {
        _e(i), (n = !1);
      },
      d(e) {
        i && i.d(e), e && L(t);
      },
    };
  }
  function Oo(e) {
    let t, i;
    const r = [At(e[53], "ripple$")];
    let s = {};
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new ji({ props: s })),
      e[70](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 4194304 & n[1] ? Ne(r, [Re(At(e[53], "ripple$"))]) : {};
          t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[70](null), Ue(t, n);
        },
      }
    );
  }
  function Lo(e) {
    let t;
    const n = e[63].default,
      i = c(n, e, e[89], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 134217728 & r[2]) &&
          p(i, n, e, e[89], t ? u(n, e[89], r, null) : f(e[89]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function wo(e) {
    let t, i, r;
    const s = [{ role: "listbox" }, { wrapFocus: e[36] }, At(e[53], "list$")];
    function a(t) {
      e[76](t);
    }
    let o = { $$slots: { default: [Lo] }, $$scope: { ctx: e } };
    for (let e = 0; e < s.length; e += 1) o = n(o, s[e]);
    return (
      void 0 !== e[24] && (o.selectedIndex = e[24]),
      (t = new qs({ props: o })),
      oe.push(() => Me(t, "selectedIndex", a)),
      t.$on("SMUIList:mount", e[77]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, n) {
          const r =
            4194336 & n[1]
              ? Ne(s, [
                  s[0],
                  32 & n[1] && { wrapFocus: e[36] },
                  4194304 & n[1] && Re(At(e[53], "list$")),
                ])
              : {};
          134217728 & n[2] && (r.$$scope = { dirty: n, ctx: e }),
            !i &&
              16777216 & n[0] &&
              ((i = !0), (r.selectedIndex = e[24]), he(() => (i = !1))),
            t.$set(r);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Do(e) {
    let t, i;
    const r = [At(e[53], "helperText$")];
    let s = { $$slots: { default: [No] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new po({ props: s })),
      t.$on("SMUISelectHelperText:id", e[86]),
      t.$on("SMUISelectHelperText:mount", e[87]),
      t.$on("SMUISelectHelperText:unmount", e[88]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, n) {
          const i = 4194304 & n[1] ? Ne(r, [Re(At(e[53], "helperText$"))]) : {};
          134217728 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function No(e) {
    let t;
    const n = e[63].helperText,
      i = c(n, e, e[89], ho);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 134217728 & r[2]) &&
          p(i, n, e, e[89], t ? u(n, e[89], r, fo) : f(e[89]), ho);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Ro(e) {
    let t,
      i,
      r,
      o,
      l,
      d,
      h,
      m,
      g,
      $,
      I,
      y,
      b,
      E,
      A,
      x,
      C,
      _,
      T,
      w,
      B,
      V,
      j,
      z,
      G,
      q,
      K,
      W,
      X,
      Y,
      Q,
      J,
      Z,
      ee,
      te,
      ne,
      ie,
      re,
      se,
      ae,
      le = e[12] && bo(e),
      ce = "filled" === e[7] && Eo(),
      de =
        "outlined" !== e[7] && !e[8] && (null != e[9] || e[52].label) && Ao(e),
      ue = "outlined" === e[7] && Co(e);
    const pe = e[63].leadingIcon,
      fe = c(pe, e, e[89], go);
    let me = [
        { id: (I = e[11] + "-smui-selected-text") },
        { class: (y = $t({ [e[19]]: !0, "mdc-select__selected-text": !0 })) },
        { role: "button" },
        { "aria-haspopup": "listbox" },
        { "aria-labelledby": (b = e[11] + "-smui-label") },
        At(e[53], "selectedText$"),
      ],
      ge = {};
    for (let e = 0; e < me.length; e += 1) ge = n(ge, me[e]);
    let $e = [
        {
          class: (A = $t({
            [e[17]]: !0,
            "mdc-select__selected-text-container": !0,
          })),
        },
        At(e[53], "selectedTextContainer$"),
      ],
      Ie = {};
    for (let e = 0; e < $e.length; e += 1) Ie = n(Ie, $e[e]);
    let ve = [
        { class: (V = $t({ [e[21]]: !0, "mdc-select__dropdown-icon": !0 })) },
        At(e[53], "dropdownIcon$"),
      ],
      ye = {};
    for (let e = 0; e < ve.length; e += 1) ye = n(ye, ve[e]);
    let be = "outlined" !== e[7] && e[5] && Oo(e),
      Ee = [
        { class: (G = $t({ [e[15]]: !0, "mdc-select__anchor": !0 })) },
        { "aria-required": (q = e[10] ? "true" : void 0) },
        { "aria-disabled": (K = e[6] ? "true" : void 0) },
        { "aria-controls": e[31] },
        { "aria-describedby": e[31] },
        e[29],
        At(e[53], "anchor$"),
      ],
      Ae = {};
    for (let e = 0; e < Ee.length; e += 1) Ae = n(Ae, Ee[e]);
    const Te = [
      { class: $t({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }) },
      { fullWidth: !0 },
      { anchor: !1 },
      { anchorElement: e[34] },
      { anchorCorner: e[35] },
      At(e[53], "menu$"),
    ];
    function Oe(t) {
      e[78](t);
    }
    let Le = { $$slots: { default: [wo] }, $$scope: { ctx: e } };
    for (let e = 0; e < Te.length; e += 1) Le = n(Le, Te[e]);
    void 0 !== e[32] && (Le.open = e[32]),
      (Y = new so({ props: Le })),
      oe.push(() => Me(Y, "open", Oe)),
      Y.$on("SMUIMenu:selected", e[79]),
      Y.$on("SMUIMenuSurface:closing", e[80]),
      Y.$on("SMUIMenuSurface:closed", e[81]),
      Y.$on("SMUIMenuSurface:opened", e[82]);
    let we = [
        {
          class: (J = $t({
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
        { style: (Z = Object.entries(e[27]).map(Fo).concat([e[4]]).join(" ")) },
        vt(e[53], [
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
      De = {};
    for (let e = 0; e < we.length; e += 1) De = n(De, we[e]);
    let He = e[52].helperText && Do(e);
    return {
      c() {
        (t = D("div")),
          le && le.c(),
          (i = M()),
          (r = D("div")),
          ce && ce.c(),
          (o = M()),
          de && de.c(),
          (l = M()),
          ue && ue.c(),
          (d = M()),
          fe && fe.c(),
          (h = M()),
          (m = D("span")),
          (g = D("span")),
          ($ = R(e[43])),
          (C = M()),
          (_ = D("span")),
          (T = N("svg")),
          (w = N("polygon")),
          (B = N("polygon")),
          (z = M()),
          be && be.c(),
          (X = M()),
          Fe(Y.$$.fragment),
          (ne = M()),
          He && He.c(),
          (ie = F()),
          H(g, ge),
          H(m, Ie),
          U(w, "class", "mdc-select__dropdown-icon-inactive"),
          U(w, "stroke", "none"),
          U(w, "fill-rule", "evenodd"),
          U(w, "points", "7 10 12 15 17 10"),
          U(B, "class", "mdc-select__dropdown-icon-active"),
          U(B, "stroke", "none"),
          U(B, "fill-rule", "evenodd"),
          U(B, "points", "7 15 12 10 17 15"),
          U(T, "class", "mdc-select__dropdown-icon-graphic"),
          U(T, "viewBox", "7 10 10 5"),
          U(T, "focusable", "false"),
          H(_, ye),
          H(r, Ae),
          H(t, De);
      },
      m(n, s) {
        O(n, t, s),
          le && le.m(t, null),
          S(t, i),
          S(t, r),
          ce && ce.m(r, null),
          S(r, o),
          de && de.m(r, null),
          S(r, l),
          ue && ue.m(r, null),
          S(r, d),
          fe && fe.m(r, null),
          S(r, h),
          S(r, m),
          S(m, g),
          S(g, $),
          e[69](g),
          S(r, C),
          S(r, _),
          S(_, T),
          S(T, w),
          S(T, B),
          S(r, z),
          be && be.m(r, null),
          e[71](r),
          S(t, X),
          ke(Y, t, null),
          e[83](t),
          O(n, ne, s),
          He && He.m(n, s),
          O(n, ie, s),
          (re = !0),
          se ||
            ((ae = [
              v((E = xt.call(null, g, e[18]))),
              v((x = xt.call(null, m, e[16]))),
              v((j = xt.call(null, _, e[20]))),
              v((W = xt.call(null, r, e[14]))),
              k(r, "focus", e[72]),
              k(r, "blur", e[73]),
              k(r, "click", e[74]),
              k(r, "keydown", e[75]),
              k(r, "focus", e[64]),
              k(r, "blur", e[65]),
              v(
                (ee = Di.call(null, t, {
                  ripple: "filled" === e[7],
                  unbounded: !1,
                  addClass: e[49],
                  removeClass: e[50],
                  addStyle: e[51],
                }))
              ),
              v(to.call(null, t, { addClass: e[49], removeClass: e[50] })),
              v((te = xt.call(null, t, e[2]))),
              v(e[44].call(null, t)),
              k(t, "SMUISelectLeadingIcon:mount", e[84]),
              k(t, "SMUISelectLeadingIcon:unmount", e[85]),
            ]),
            (se = !0));
      },
      p(e, n) {
        e[12]
          ? le
            ? le.p(e, n)
            : ((le = bo(e)), le.c(), le.m(t, i))
          : le && (le.d(1), (le = null)),
          "filled" === e[7]
            ? ce || ((ce = Eo()), ce.c(), ce.m(r, o))
            : ce && (ce.d(1), (ce = null)),
          "outlined" === e[7] || e[8] || (null == e[9] && !e[52].label)
            ? de &&
              (xe(),
              _e(de, 1, 1, () => {
                de = null;
              }),
              Ce())
            : de
            ? (de.p(e, n), (896 & n[0]) | (2097152 & n[1]) && Se(de, 1))
            : ((de = Ao(e)), de.c(), Se(de, 1), de.m(r, l)),
          "outlined" === e[7]
            ? ue
              ? (ue.p(e, n), 128 & n[0] && Se(ue, 1))
              : ((ue = Co(e)), ue.c(), Se(ue, 1), ue.m(r, d))
            : ue &&
              (xe(),
              _e(ue, 1, 1, () => {
                ue = null;
              }),
              Ce()),
          fe &&
            fe.p &&
            (!re || 134217728 & n[2]) &&
            p(fe, pe, e, e[89], re ? u(pe, e[89], n, mo) : f(e[89]), go),
          (!re || 4096 & n[1]) && P($, e[43]),
          H(
            g,
            (ge = Ne(me, [
              (!re ||
                (2048 & n[0] && I !== (I = e[11] + "-smui-selected-text"))) && {
                id: I,
              },
              (!re ||
                (524288 & n[0] &&
                  y !==
                    (y = $t({
                      [e[19]]: !0,
                      "mdc-select__selected-text": !0,
                    })))) && { class: y },
              { role: "button" },
              { "aria-haspopup": "listbox" },
              (!re || (2048 & n[0] && b !== (b = e[11] + "-smui-label"))) && {
                "aria-labelledby": b,
              },
              4194304 & n[1] && At(e[53], "selectedText$"),
            ]))
          ),
          E && a(E.update) && 262144 & n[0] && E.update.call(null, e[18]),
          H(
            m,
            (Ie = Ne($e, [
              (!re ||
                (131072 & n[0] &&
                  A !==
                    (A = $t({
                      [e[17]]: !0,
                      "mdc-select__selected-text-container": !0,
                    })))) && { class: A },
              4194304 & n[1] && At(e[53], "selectedTextContainer$"),
            ]))
          ),
          x && a(x.update) && 65536 & n[0] && x.update.call(null, e[16]),
          H(
            _,
            (ye = Ne(ve, [
              (!re ||
                (2097152 & n[0] &&
                  V !==
                    (V = $t({
                      [e[21]]: !0,
                      "mdc-select__dropdown-icon": !0,
                    })))) && { class: V },
              4194304 & n[1] && At(e[53], "dropdownIcon$"),
            ]))
          ),
          j && a(j.update) && 1048576 & n[0] && j.update.call(null, e[20]),
          "outlined" !== e[7] && e[5]
            ? be
              ? (be.p(e, n), 160 & n[0] && Se(be, 1))
              : ((be = Oo(e)), be.c(), Se(be, 1), be.m(r, null))
            : be &&
              (xe(),
              _e(be, 1, 1, () => {
                be = null;
              }),
              Ce()),
          H(
            r,
            (Ae = Ne(Ee, [
              (!re ||
                (32768 & n[0] &&
                  G !==
                    (G = $t({ [e[15]]: !0, "mdc-select__anchor": !0 })))) && {
                class: G,
              },
              (!re || (1024 & n[0] && q !== (q = e[10] ? "true" : void 0))) && {
                "aria-required": q,
              },
              (!re || (64 & n[0] && K !== (K = e[6] ? "true" : void 0))) && {
                "aria-disabled": K,
              },
              (!re || 1 & n[1]) && { "aria-controls": e[31] },
              (!re || 1 & n[1]) && { "aria-describedby": e[31] },
              536870912 & n[0] && e[29],
              4194304 & n[1] && At(e[53], "anchor$"),
            ]))
          ),
          W && a(W.update) && 16384 & n[0] && W.update.call(null, e[14]);
        const s =
          (4194304 & n[0]) | (4194332 & n[1])
            ? Ne(Te, [
                (4194304 & n[0]) | (4 & n[1]) && {
                  class: $t({ [e[22]]: !0, "mdc-select__menu": !0, ...e[33] }),
                },
                Te[1],
                Te[2],
                8 & n[1] && { anchorElement: e[34] },
                16 & n[1] && { anchorCorner: e[35] },
                4194304 & n[1] && Re(At(e[53], "menu$")),
              ])
            : {};
        (16777216 & n[0]) | (4194400 & n[1]) | (134217728 & n[2]) &&
          (s.$$scope = { dirty: n, ctx: e }),
          !Q && 2 & n[1] && ((Q = !0), (s.open = e[32]), he(() => (Q = !1))),
          Y.$set(s),
          H(
            t,
            (De = Ne(we, [
              (!re ||
                ((67119050 & n[0]) | (2097154 & n[1]) &&
                  J !==
                    (J = $t({
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
                    })))) && { class: J },
              (!re ||
                (134217744 & n[0] &&
                  Z !==
                    (Z = Object.entries(e[27])
                      .map(Fo)
                      .concat([e[4]])
                      .join(" ")))) && { style: Z },
              4194304 & n[1] &&
                vt(e[53], [
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
          ee &&
            a(ee.update) &&
            128 & n[0] &&
            ee.update.call(null, {
              ripple: "filled" === e[7],
              unbounded: !1,
              addClass: e[49],
              removeClass: e[50],
              addStyle: e[51],
            }),
          te && a(te.update) && 4 & n[0] && te.update.call(null, e[2]),
          e[52].helperText
            ? He
              ? (He.p(e, n), 2097152 & n[1] && Se(He, 1))
              : ((He = Do(e)), He.c(), Se(He, 1), He.m(ie.parentNode, ie))
            : He &&
              (xe(),
              _e(He, 1, 1, () => {
                He = null;
              }),
              Ce());
      },
      i(e) {
        re ||
          (Se(de),
          Se(ue),
          Se(fe, e),
          Se(be),
          Se(Y.$$.fragment, e),
          Se(He),
          (re = !0));
      },
      o(e) {
        _e(de),
          _e(ue),
          _e(fe, e),
          _e(be),
          _e(Y.$$.fragment, e),
          _e(He),
          (re = !1);
      },
      d(n) {
        n && L(t),
          le && le.d(),
          ce && ce.d(),
          de && de.d(),
          ue && ue.d(),
          fe && fe.d(n),
          e[69](null),
          be && be.d(),
          e[71](null),
          Ue(Y),
          e[83](null),
          n && L(ne),
          He && He.d(n),
          n && L(ie),
          (se = !1),
          s(ae);
      },
    };
  }
  let Mo = 0;
  const Fo = ([e, t]) => `${e}: ${t};`;
  function ko(e, t, i) {
    const r = [
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
      a,
      o = m(t, r),
      { $$slots: c = {}, $$scope: d } = t;
    const u = g(c),
      p = Et(Z());
    let f = () => {};
    function $(e) {
      return e === f;
    }
    let { use: v = [] } = t,
      { class: y = "" } = t,
      { style: b = "" } = t,
      { ripple: E = !0 } = t,
      { disabled: A = !1 } = t,
      { variant: x = "standard" } = t,
      { noLabel: C = !1 } = t,
      { label: S } = t,
      { value: _ = "" } = t,
      { key: T = (e) => e } = t,
      { dirty: O = !1 } = t,
      { invalid: L = f } = t,
      { updateInvalid: w = $(L) } = t;
    const D = $(L);
    $(L) && (L = !1);
    let N,
      R,
      M,
      F,
      k,
      U,
      H,
      P,
      B,
      V,
      j,
      z,
      G,
      q,
      { required: K = !1 } = t,
      { inputId: W = "SMUI-select-" + Mo++ } = t,
      { hiddenInput: X = !1 } = t,
      { withLeadingIcon: Y = f } = t,
      { anchor$use: Q = [] } = t,
      { anchor$class: J = "" } = t,
      { selectedTextContainer$use: ne = [] } = t,
      { selectedTextContainer$class: ae = "" } = t,
      { selectedText$use: le = [] } = t,
      { selectedText$class: ce = "" } = t,
      { dropdownIcon$use: de = [] } = t,
      { dropdownIcon$class: ue = "" } = t,
      { menu$class: pe = "" } = t,
      fe = {},
      he = {},
      me = {},
      ge = -1,
      $e = re("SMUI:addLayoutListener"),
      Ie = !1,
      ve = {},
      ye = !1,
      be = re("SMUI:select:context");
    ie("SMUI:list:role", ""), ie("SMUI:list:nav", !1);
    const Ee = gt("");
    l(e, Ee, (e) => i(43, (s = e))), ie("SMUI:select:selectedText", Ee);
    const Ae = gt(_);
    l(e, Ae, (e) => i(91, (a = e))), ie("SMUI:select:value", Ae);
    let xe = ge;
    function Ce(e) {
      return e in fe ? fe[e] : Fe().classList.contains(e);
    }
    function Se(e) {
      fe[e] || i(26, (fe[e] = !0), fe);
    }
    function _e(e) {
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
      return e in me
        ? null !== (t = me[e]) && void 0 !== t
          ? t
          : null
        : Fe().getAttribute(e);
    }
    function we(e, t) {
      me[e] !== t && i(29, (me[e] = t), me);
    }
    function De(e) {
      (e in me && null == me[e]) || i(29, (me[e] = void 0), me);
    }
    function Ne() {
      return B.getOrderedList().map((e) => e.getValue());
    }
    function Re(e) {
      R.setUseDefaultValidation(e);
    }
    function Me() {
      R.layout();
    }
    function Fe() {
      return N;
    }
    $e && (U = $e(Me)),
      ee(
        () => (
          i(
            23,
            (R = new qa(
              {
                setSelectedText: (e) => {
                  I(Ee, (s = e), s);
                },
                isSelectAnchorFocused: () => document.activeElement === M,
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
                getAnchorElement: () => M,
                setMenuAnchorElement: (e) => {
                  i(34, (H = e));
                },
                setMenuAnchorCorner: (e) => {
                  i(35, (P = e));
                },
                setMenuWrapFocus: (e) => {
                  i(36, (ye = e));
                },
                getSelectedIndex: () => ge,
                setSelectedIndex: (e) => {
                  i(62, (xe = e)), i(24, (ge = e)), i(0, (_ = Ne()[ge]));
                },
                focusMenuItemAtIndex: (e) => {
                  B.focusItemAtIndex(e);
                },
                getMenuItemCount: () => B.items.length,
                getMenuItemValues: () => Ne().map(T),
                getMenuItemTextAtIndex: (e) => B.getPrimaryTextAtIndex(e),
                isTypeaheadInProgress: () => B.typeaheadInProgress,
                typeaheadMatchItem: (e, t) => B.typeaheadMatchItem(e, t),
                addClass: Se,
                removeClass: _e,
                hasClass: Ce,
                setRippleCenter: (e) => G && G.setRippleCenter(e),
                activateBottomLine: () => G && G.activate(),
                deactivateBottomLine: () => G && G.deactivate(),
                notifyChange: (e) => {
                  i(54, (O = !0)),
                    w && i(1, (L = !R.isValid())),
                    It(
                      Fe(),
                      "SMUISelect:change",
                      { value: _, index: ge },
                      void 0,
                      !0
                    );
                },
                hasOutline: () => !!q,
                notchOutline: (e) => q && q.notch(e),
                closeOutline: () => q && q.closeNotch(),
                hasLabel: () => !!z,
                floatLabel: (e) => z && z.float(e),
                getLabelWidth: () => (z ? z.getWidth() : 0),
                setLabelRequired: (e) => z && z.setRequired(e),
              },
              {
                get helperText() {
                  return j;
                },
                get leadingIcon() {
                  return V;
                },
              }
            ))
          ),
          i(24, (ge = Ne().indexOf(_))),
          R.init(),
          Re(D),
          () => {
            R.destroy();
          }
        )
      ),
      te(() => {
        U && U();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(53, (o = m(t, r))),
          "use" in e && i(2, (v = e.use)),
          "class" in e && i(3, (y = e.class)),
          "style" in e && i(4, (b = e.style)),
          "ripple" in e && i(5, (E = e.ripple)),
          "disabled" in e && i(6, (A = e.disabled)),
          "variant" in e && i(7, (x = e.variant)),
          "noLabel" in e && i(8, (C = e.noLabel)),
          "label" in e && i(9, (S = e.label)),
          "value" in e && i(0, (_ = e.value)),
          "key" in e && i(55, (T = e.key)),
          "dirty" in e && i(54, (O = e.dirty)),
          "invalid" in e && i(1, (L = e.invalid)),
          "updateInvalid" in e && i(56, (w = e.updateInvalid)),
          "required" in e && i(10, (K = e.required)),
          "inputId" in e && i(11, (W = e.inputId)),
          "hiddenInput" in e && i(12, (X = e.hiddenInput)),
          "withLeadingIcon" in e && i(13, (Y = e.withLeadingIcon)),
          "anchor$use" in e && i(14, (Q = e.anchor$use)),
          "anchor$class" in e && i(15, (J = e.anchor$class)),
          "selectedTextContainer$use" in e &&
            i(16, (ne = e.selectedTextContainer$use)),
          "selectedTextContainer$class" in e &&
            i(17, (ae = e.selectedTextContainer$class)),
          "selectedText$use" in e && i(18, (le = e.selectedText$use)),
          "selectedText$class" in e && i(19, (ce = e.selectedText$class)),
          "dropdownIcon$use" in e && i(20, (de = e.dropdownIcon$use)),
          "dropdownIcon$class" in e && i(21, (ue = e.dropdownIcon$class)),
          "menu$class" in e && i(22, (pe = e.menu$class)),
          "$$scope" in e && i(89, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        if ((25165825 & e.$$.dirty[0]) | (1 & e.$$.dirty[2]) && xe !== ge)
          if ((i(62, (xe = ge)), R)) R.setSelectedIndex(ge, !1, !0);
          else {
            const e = Ne();
            _ !== e[ge] && i(0, (_ = e[ge]));
          }
        1 & e.$$.dirty[0] && I(Ae, (a = _), a),
          (8388609 & e.$$.dirty[0]) | (16777216 & e.$$.dirty[1]) &&
            R &&
            R.getValue() !== T(_) &&
            R.setValue(T(_)),
          8388672 & e.$$.dirty[0] &&
            R &&
            R.getDisabled() !== A &&
            R.setDisabled(A),
          (8388610 & e.$$.dirty[0]) | (41943040 & e.$$.dirty[1]) &&
            R &&
            O &&
            R.isValid() !== !L &&
            (w ? i(1, (L = !R.isValid())) : R.setValid(!L)),
          8389632 & e.$$.dirty[0] &&
            R &&
            R.getRequired() !== K &&
            R.setRequired(K);
      }),
      [
        _,
        L,
        v,
        y,
        b,
        E,
        A,
        x,
        C,
        S,
        K,
        W,
        X,
        Y,
        Q,
        J,
        ne,
        ae,
        le,
        ce,
        de,
        ue,
        pe,
        R,
        ge,
        N,
        fe,
        he,
        M,
        me,
        F,
        k,
        Ie,
        ve,
        H,
        P,
        ye,
        B,
        V,
        j,
        z,
        G,
        q,
        s,
        p,
        $,
        be,
        Ee,
        Ae,
        Se,
        _e,
        function (e, t) {
          he[e] != t &&
            ("" === t || null == t
              ? (delete he[e], i(27, he))
              : i(27, (he[e] = t), he));
        },
        u,
        o,
        O,
        T,
        w,
        function () {
          return R.getUseDefaultValidation();
        },
        Re,
        function () {
          M.focus();
        },
        Me,
        Fe,
        xe,
        c,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (z = e), i(40, z);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (z = e), i(40, z);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (q = e), i(42, q);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (F = e), i(30, F);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (G = e), i(41, G);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (M = e), i(28, M);
          });
        },
        () => R && R.handleFocus(),
        () => R && R.handleBlur(),
        (e) => {
          M.focus(),
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
          (ge = e), i(24, ge);
        },
        (e) => i(37, (B = e.detail)),
        function (e) {
          (Ie = e), i(32, Ie);
        },
        (e) => R && R.handleMenuItemAction(e.detail.index),
        () => R && R.handleMenuClosing(),
        () => R && R.handleMenuClosed(),
        () => R && R.handleMenuOpened(),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (N = e), i(25, N);
          });
        },
        (e) => i(38, (V = e.detail)),
        () => i(38, (V = void 0)),
        (e) => i(31, (k = e.detail)),
        (e) => i(39, (j = e.detail)),
        () => {
          i(31, (k = void 0)), i(39, (j = void 0));
        },
        d,
      ]
    );
  }
  class Uo extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          ko,
          Ro,
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
  function Ho(e) {
    let t;
    const n = e[11].default,
      i = c(n, e, e[13], null);
    return {
      c() {
        i && i.c();
      },
      m(e, n) {
        i && i.m(e, n), (t = !0);
      },
      p(e, r) {
        i &&
          i.p &&
          (!t || 8192 & r) &&
          p(i, n, e, e[13], t ? u(n, e[13], r, null) : f(e[13]), null);
      },
      i(e) {
        t || (Se(i, e), (t = !0));
      },
      o(e) {
        _e(i, e), (t = !1);
      },
      d(e) {
        i && i.d(e);
      },
    };
  }
  function Po(e) {
    let t, i;
    const r = [
      { use: e[3] },
      { "data-value": e[0] },
      { value: e[0] },
      { selected: e[2] },
      e[6],
    ];
    let s = { $$slots: { default: [Ho] }, $$scope: { ctx: e } };
    for (let e = 0; e < r.length; e += 1) s = n(s, r[e]);
    return (
      (t = new sa({ props: s })),
      e[12](t),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, [n]) {
          const i =
            77 & n
              ? Ne(r, [
                  8 & n && { use: e[3] },
                  1 & n && { "data-value": e[0] },
                  1 & n && { value: e[0] },
                  4 & n && { selected: e[2] },
                  64 & n && Re(e[6]),
                ])
              : {};
          8192 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(n) {
          e[12](null), Ue(t, n);
        },
      }
    );
  }
  function Bo(e, t, i) {
    let r, s;
    const a = ["use", "class", "value", "getElement"];
    let o,
      c,
      d = m(t, a),
      { $$slots: u = {}, $$scope: p } = t;
    const f = Et(Z());
    let { use: g = [] } = t;
    let $,
      { value: v = "" } = t;
    const y = re("SMUI:select:selectedText");
    l(e, y, (e) => i(14, (o = e)));
    const b = re("SMUI:select:value");
    function E() {
      s && $ && I(y, (o = $.getPrimaryText()), o);
    }
    return (
      l(e, b, (e) => i(10, (c = e))),
      ie("SMUI:list:item:role", "option"),
      ee(E),
      te(E),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (d = m(t, a))),
          "use" in e && i(7, (g = e.use)),
          "value" in e && i(0, (v = e.value)),
          "$$scope" in e && i(13, (p = e.$$scope));
      }),
      (e.$$.update = () => {
        128 & e.$$.dirty && i(3, (r = [f, ...g])),
          1025 & e.$$.dirty && i(2, (s = null != v && "" !== v && c === v));
      }),
      [
        v,
        $,
        s,
        r,
        y,
        b,
        d,
        g,
        "",
        function () {
          return $.getElement();
        },
        c,
        u,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            ($ = e), i(1, $);
          });
        },
        p,
      ]
    );
  }
  const Vo = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, Bo, Po, o, { use: 7, class: 8, value: 0, getElement: 9 });
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
  var jo,
    zo = (function () {
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
    Go = {
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
    qo = {
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
    Ko = {
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
  })(jo || (jo = {}));
  var Wo = (function (e) {
    function t(n) {
      var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
      return (
        (i.dialogOpen = !1),
        (i.isFullscreen = !1),
        (i.animationFrame = 0),
        (i.animationTimer = 0),
        (i.escapeKeyAction = qo.CLOSE_ACTION),
        (i.scrimClickAction = qo.CLOSE_ACTION),
        (i.autoStackButtons = !0),
        (i.areButtonsStacked = !1),
        (i.suppressDefaultPressSelector = qo.SUPPRESS_DEFAULT_PRESS_SELECTOR),
        (i.animFrame = new zo()),
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
      ze(t, e),
      Object.defineProperty(t, "cssClasses", {
        get: function () {
          return Go;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "strings", {
        get: function () {
          return qo;
        },
        enumerable: !1,
        configurable: !0,
      }),
      Object.defineProperty(t, "numbers", {
        get: function () {
          return Ko;
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
        this.adapter.hasClass(Go.STACKED) && this.setAutoStackButtons(!1),
          (this.isFullscreen = this.adapter.hasClass(Go.FULLSCREEN));
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
          this.adapter.addClass(Go.OPENING),
          this.isFullscreen &&
            this.adapter.registerContentEventHandler(
              "scroll",
              this.contentScrollHandler
            ),
          e &&
            e.isAboveFullscreenDialog &&
            this.adapter.addClass(Go.SCRIM_HIDDEN),
          this.adapter.registerWindowEventHandler(
            "resize",
            this.windowResizeHandler
          ),
          this.adapter.registerWindowEventHandler(
            "orientationchange",
            this.windowOrientationChangeHandler
          ),
          this.runNextAnimationFrame(function () {
            t.adapter.addClass(Go.OPEN),
              t.adapter.addBodyClass(Go.SCROLL_LOCK),
              t.layout(),
              (t.animationTimer = setTimeout(function () {
                t.handleAnimationTimerEnd(),
                  t.adapter.trapFocus(t.adapter.getInitialFocusEl()),
                  t.adapter.notifyOpened();
              }, Ko.DIALOG_ANIMATION_OPEN_TIME_MS));
          });
      }),
      (t.prototype.close = function (e) {
        var t = this;
        void 0 === e && (e = ""),
          this.dialogOpen &&
            ((this.dialogOpen = !1),
            this.adapter.notifyClosing(e),
            this.adapter.addClass(Go.CLOSING),
            this.adapter.removeClass(Go.OPEN),
            this.adapter.removeBodyClass(Go.SCROLL_LOCK),
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
            }, Ko.DIALOG_ANIMATION_CLOSE_TIME_MS)));
      }),
      (t.prototype.showSurfaceScrim = function () {
        var e = this;
        this.adapter.addClass(Go.SURFACE_SCRIM_SHOWING),
          this.runNextAnimationFrame(function () {
            e.adapter.addClass(Go.SURFACE_SCRIM_SHOWN);
          });
      }),
      (t.prototype.hideSurfaceScrim = function () {
        this.adapter.removeClass(Go.SURFACE_SCRIM_SHOWN),
          this.adapter.addClass(Go.SURFACE_SCRIM_HIDING);
      }),
      (t.prototype.handleSurfaceScrimTransitionEnd = function () {
        this.adapter.removeClass(Go.SURFACE_SCRIM_HIDING),
          this.adapter.removeClass(Go.SURFACE_SCRIM_SHOWING);
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
        this.animFrame.request(jo.POLL_LAYOUT_CHANGE, function () {
          e.layoutInternal();
        });
      }),
      (t.prototype.handleClick = function (e) {
        if (
          this.adapter.eventTargetMatches(e.target, qo.SCRIM_SELECTOR) &&
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
        this.animFrame.request(jo.POLL_SCROLL_POS, function () {
          e.toggleScrollDividerHeader(), e.toggleScrollDividerFooter();
        });
      }),
      (t.prototype.layoutInternal = function () {
        this.autoStackButtons && this.detectStackedButtons(),
          this.toggleScrollableClasses();
      }),
      (t.prototype.handleAnimationTimerEnd = function () {
        (this.animationTimer = 0),
          this.adapter.removeClass(Go.OPENING),
          this.adapter.removeClass(Go.CLOSING);
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
        this.adapter.removeClass(Go.STACKED);
        var e = this.adapter.areButtonsStacked();
        e && this.adapter.addClass(Go.STACKED),
          e !== this.areButtonsStacked &&
            (this.adapter.reverseButtons(), (this.areButtonsStacked = e));
      }),
      (t.prototype.toggleScrollableClasses = function () {
        this.adapter.removeClass(Go.SCROLLABLE),
          this.adapter.isContentScrollable() &&
            (this.adapter.addClass(Go.SCROLLABLE),
            this.isFullscreen &&
              (this.toggleScrollDividerHeader(),
              this.toggleScrollDividerFooter()));
      }),
      (t.prototype.toggleScrollDividerHeader = function () {
        this.adapter.isScrollableContentAtTop()
          ? this.adapter.hasClass(Go.SCROLL_DIVIDER_HEADER) &&
            this.adapter.removeClass(Go.SCROLL_DIVIDER_HEADER)
          : this.adapter.addClass(Go.SCROLL_DIVIDER_HEADER);
      }),
      (t.prototype.toggleScrollDividerFooter = function () {
        this.adapter.isScrollableContentAtBottom()
          ? this.adapter.hasClass(Go.SCROLL_DIVIDER_FOOTER) &&
            this.adapter.removeClass(Go.SCROLL_DIVIDER_FOOTER)
          : this.adapter.addClass(Go.SCROLL_DIVIDER_FOOTER);
      }),
      t
    );
  })(Ye);
  const { document: Xo, window: Yo } = Oe,
    Qo = (e) => ({}),
    Jo = (e) => ({});
  function Zo(t) {
    let n, i, r;
    return {
      c() {
        (n = D("div")), U(n, "class", "mdc-dialog__surface-scrim");
      },
      m(e, s) {
        O(e, n, s), i || ((r = k(n, "transitionend", t[31])), (i = !0));
      },
      p: e,
      d(e) {
        e && L(n), (i = !1), r();
      },
    };
  }
  function el(e) {
    let t, i, r, o, l, d, h, m, g, $, I, y, b, E, A;
    const x = e[27].default,
      C = c(x, e, e[26], null);
    let _ = e[5] && Zo(e),
      T = [
        { class: (d = $t({ [e[7]]: !0, "mdc-dialog__surface": !0 })) },
        { role: "alertdialog" },
        { "aria-modal": "true" },
        At(e[17], "surface$"),
      ],
      w = {};
    for (let e = 0; e < T.length; e += 1) w = n(w, T[e]);
    let N = [
        { class: (h = $t({ [e[6]]: !0, "mdc-dialog__container": !0 })) },
        At(e[17], "container$"),
      ],
      R = {};
    for (let e = 0; e < N.length; e += 1) R = n(R, N[e]);
    let F = [
        {
          class: ($ = $t({
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
        vt(e[17], ["container$", "surface$"]),
      ],
      P = {};
    for (let e = 0; e < F.length; e += 1) P = n(P, F[e]);
    const B = e[27].over,
      V = c(B, e, e[26], Jo);
    return {
      c() {
        (t = M()),
          (i = D("div")),
          (r = D("div")),
          (o = D("div")),
          C && C.c(),
          (l = M()),
          _ && _.c(),
          (m = M()),
          (g = D("div")),
          (y = M()),
          V && V.c(),
          H(o, w),
          H(r, R),
          U(g, "class", "mdc-dialog__scrim"),
          H(i, P);
      },
      m(n, s) {
        O(n, t, s),
          O(n, i, s),
          S(i, r),
          S(r, o),
          C && C.m(o, null),
          S(o, l),
          _ && _.m(o, null),
          S(i, m),
          S(i, g),
          e[32](i),
          O(n, y, s),
          V && V.m(n, s),
          (b = !0),
          E ||
            ((A = [
              k(Yo, "resize", e[28]),
              k(Yo, "orientationchange", e[29]),
              k(Xo.body, "keydown", e[30]),
              v((I = xt.call(null, i, e[1]))),
              v(e[11].call(null, i)),
              k(i, "SMUIDialog:opening", e[14]),
              k(i, "SMUIDialog:opened", e[15]),
              k(i, "SMUIDialog:closed", e[16]),
              k(i, "click", e[33]),
              k(i, "keydown", e[34]),
            ]),
            (E = !0));
      },
      p(e, t) {
        C &&
          C.p &&
          (!b || 67108864 & t[0]) &&
          p(C, x, e, e[26], b ? u(x, e[26], t, null) : f(e[26]), null),
          e[5]
            ? _
              ? _.p(e, t)
              : ((_ = Zo(e)), _.c(), _.m(o, null))
            : _ && (_.d(1), (_ = null)),
          H(
            o,
            (w = Ne(T, [
              (!b ||
                (128 & t[0] &&
                  d !==
                    (d = $t({ [e[7]]: !0, "mdc-dialog__surface": !0 })))) && {
                class: d,
              },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && At(e[17], "surface$"),
            ]))
          ),
          H(
            r,
            (R = Ne(N, [
              (!b ||
                (64 & t[0] &&
                  h !==
                    (h = $t({ [e[6]]: !0, "mdc-dialog__container": !0 })))) && {
                class: h,
              },
              131072 & t[0] && At(e[17], "container$"),
            ]))
          ),
          H(
            i,
            (P = Ne(F, [
              (!b ||
                (1084 & t[0] &&
                  $ !==
                    ($ = $t({
                      [e[2]]: !0,
                      "mdc-dialog": !0,
                      "mdc-dialog--stacked": !e[4],
                      "mdc-dialog--fullscreen": e[5],
                      "smui-dialog--selection": e[3],
                      ...e[10],
                    })))) && { class: $ },
              { role: "alertdialog" },
              { "aria-modal": "true" },
              131072 & t[0] && vt(e[17], ["container$", "surface$"]),
            ]))
          ),
          I && a(I.update) && 2 & t[0] && I.update.call(null, e[1]),
          V &&
            V.p &&
            (!b || 67108864 & t[0]) &&
            p(V, B, e, e[26], b ? u(B, e[26], t, Qo) : f(e[26]), Jo);
      },
      i(e) {
        b || (Se(C, e), Se(V, e), (b = !0));
      },
      o(e) {
        _e(C, e), _e(V, e), (b = !1);
      },
      d(n) {
        n && L(t),
          n && L(i),
          C && C.d(n),
          _ && _.d(),
          e[32](null),
          n && L(y),
          V && V.d(n),
          (E = !1),
          s(A);
      },
    };
  }
  function tl(e, t, i) {
    const r = [
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
      a,
      o = m(t, r),
      { $$slots: c = {}, $$scope: d } = t;
    var u;
    const { FocusTrap: p } = jn,
      { closest: f, matches: g } = et,
      $ = Et(Z());
    let v,
      y,
      b,
      { use: E = [] } = t,
      { class: A = "" } = t,
      { open: x = !1 } = t,
      { selection: C = !1 } = t,
      { escapeKeyAction: S = "close" } = t,
      { scrimClickAction: _ = "close" } = t,
      { autoStackButtons: T = !0 } = t,
      { fullscreen: O = !1 } = t,
      { container$class: L = "" } = t,
      { surface$class: w = "" } = t,
      D = {},
      N = gt(!1);
    l(e, N, (e) => i(38, (a = e)));
    let R = re("SMUI:dialog:aboveFullscreen"),
      M =
        null !== (u = re("SMUI:dialog:aboveFullscreenShown")) && void 0 !== u
          ? u
          : gt(!1);
    l(e, M, (e) => i(25, (s = e)));
    let F,
      k = re("SMUI:addLayoutListener"),
      U = [];
    ie("SMUI:dialog:actions:reversed", N),
      ie(
        "SMUI:addLayoutListener",
        (e) => (
          U.push(e),
          () => {
            const t = U.indexOf(e);
            t >= 0 && U.splice(t, 1);
          }
        )
      ),
      ie("SMUI:dialog:selection", C),
      ie("SMUI:dialog:aboveFullscreen", R || O),
      ie("SMUI:dialog:aboveFullscreenShown", M),
      k && (F = k(G));
    let H = s;
    function P(e) {
      return e in D ? D[e] : q().classList.contains(e);
    }
    function B(e) {
      D[e] || i(10, (D[e] = !0), D);
    }
    function V(e) {
      (e in D && !D[e]) || i(10, (D[e] = !1), D);
    }
    function j() {
      return v.querySelector(".mdc-dialog__content");
    }
    function z() {
      return v.querySelector("[data-mdc-dialog-initial-focus]");
    }
    function G() {
      return y.layout();
    }
    function q() {
      return v;
    }
    ee(() => {
      var e;
      return (
        (b = new p(v, {
          initialFocusEl: null !== (e = z()) && void 0 !== e ? e : void 0,
        })),
        i(
          8,
          (y = new Wo({
            addBodyClass: (e) => document.body.classList.add(e),
            addClass: B,
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
            eventTargetMatches: (e, t) => !!e && g(e, t),
            getActionFromEvent: (e) => {
              if (!e.target) return "";
              const t = f(e.target, "[data-mdc-dialog-action]");
              return t && t.getAttribute("data-mdc-dialog-action");
            },
            getInitialFocusEl: z,
            hasClass: P,
            isContentScrollable: () => {
              return !!(e = j()) && e.scrollHeight > e.offsetHeight;
              var e;
            },
            notifyClosed: (e) => {
              i(0, (x = !1)),
                It(
                  q(),
                  "SMUIDialog:closed",
                  e ? { action: e } : {},
                  void 0,
                  !0
                );
            },
            notifyClosing: (e) =>
              It(q(), "SMUIDialog:closing", e ? { action: e } : {}, void 0, !0),
            notifyOpened: () => It(q(), "SMUIDialog:opened", {}, void 0, !0),
            notifyOpening: () => It(q(), "SMUIDialog:opening", {}, void 0, !0),
            releaseFocus: () => b.releaseFocus(),
            removeBodyClass: (e) => document.body.classList.remove(e),
            removeClass: V,
            reverseButtons: () => {
              I(N, (a = !0), a);
            },
            trapFocus: () => b.trapFocus(),
            registerContentEventHandler: (e, t) => {
              const n = j();
              n instanceof HTMLElement && n.addEventListener(e, t);
            },
            deregisterContentEventHandler: (e, t) => {
              const n = j();
              n instanceof HTMLElement && n.removeEventListener(e, t);
            },
            isScrollableContentAtTop: () => {
              return !!(e = j()) && 0 === e.scrollTop;
              var e;
            },
            isScrollableContentAtBottom: () => {
              return (
                !!(e = j()) &&
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
        y.init(),
        () => {
          y.destroy();
        }
      );
    }),
      te(() => {
        F && F();
      });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(17, (o = m(t, r))),
          "use" in e && i(1, (E = e.use)),
          "class" in e && i(2, (A = e.class)),
          "open" in e && i(0, (x = e.open)),
          "selection" in e && i(3, (C = e.selection)),
          "escapeKeyAction" in e && i(18, (S = e.escapeKeyAction)),
          "scrimClickAction" in e && i(19, (_ = e.scrimClickAction)),
          "autoStackButtons" in e && i(4, (T = e.autoStackButtons)),
          "fullscreen" in e && i(5, (O = e.fullscreen)),
          "container$class" in e && i(6, (L = e.container$class)),
          "surface$class" in e && i(7, (w = e.surface$class)),
          "$$scope" in e && i(26, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        262400 & e.$$.dirty[0] &&
          y &&
          y.getEscapeKeyAction() !== S &&
          y.setEscapeKeyAction(S),
          524544 & e.$$.dirty[0] &&
            y &&
            y.getScrimClickAction() !== _ &&
            y.setScrimClickAction(_),
          272 & e.$$.dirty[0] &&
            y &&
            y.getAutoStackButtons() !== T &&
            y.setAutoStackButtons(T),
          16 & e.$$.dirty[0] && (T || I(N, (a = !0), a)),
          257 & e.$$.dirty[0] &&
            y &&
            y.isOpen() !== x &&
            (x ? y.open({ isAboveFullscreenDialog: !!R }) : y.close()),
          50331936 & e.$$.dirty[0] &&
            O &&
            y &&
            H !== s &&
            (i(24, (H = s)), s ? y.showSurfaceScrim() : y.hideSurfaceScrim());
      }),
      [
        x,
        E,
        A,
        C,
        T,
        O,
        L,
        w,
        y,
        v,
        D,
        $,
        N,
        M,
        function () {
          R && I(M, (s = !0), s),
            requestAnimationFrame(() => {
              U.forEach((e) => e());
            });
        },
        function () {
          U.forEach((e) => e());
        },
        function () {
          R && I(M, (s = !1), s);
        },
        o,
        S,
        _,
        function () {
          return x;
        },
        function (e) {
          i(0, (x = e));
        },
        G,
        q,
        H,
        s,
        d,
        c,
        () => x && y && y.layout(),
        () => x && y && y.layout(),
        (e) => x && y && y.handleDocumentKeydown(e),
        () => y && y.handleSurfaceScrimTransitionEnd(),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (v = e), i(9, v);
          });
        },
        (e) => y && y.handleClick(e),
        (e) => y && y.handleKeydown(e),
      ]
    );
  }
  class nl extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          tl,
          el,
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
  Ht({
    class: "mdc-dialog__header",
    component: ln,
    contexts: { "SMUI:icon-button:context": "dialog:header" },
  });
  var il = Ht({ class: "mdc-dialog__title", component: dn }),
    rl = Ht({ class: "mdc-dialog__content", component: ln }),
    sl = Ht({
      class: "mdc-dialog__actions",
      component: ln,
      classMap: {
        "smui-dialog__actions--reversed": "SMUI:dialog:actions:reversed",
      },
      contexts: { "SMUI:button:context": "dialog:action" },
    });
  function al(e) {
    let t;
    return {
      c() {
        (t = D("div")), U(t, "class", "mdc-button__touch");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function ol(e) {
    let t, n, i, r;
    const s = e[27].default,
      a = c(s, e, e[29], null);
    let o = e[6] && al();
    return {
      c() {
        (t = D("div")),
          (n = M()),
          a && a.c(),
          o && o.c(),
          (i = F()),
          U(t, "class", "mdc-button__ripple");
      },
      m(e, s) {
        O(e, t, s),
          O(e, n, s),
          a && a.m(e, s),
          o && o.m(e, s),
          O(e, i, s),
          (r = !0);
      },
      p(e, t) {
        a &&
          a.p &&
          (!r || 536870912 & t) &&
          p(a, s, e, e[29], r ? u(s, e[29], t, null) : f(e[29]), null),
          e[6]
            ? o || ((o = al()), o.c(), o.m(i.parentNode, i))
            : o && (o.d(1), (o = null));
      },
      i(e) {
        r || (Se(a, e), (r = !0));
      },
      o(e) {
        _e(a, e), (r = !1);
      },
      d(e) {
        e && L(t), e && L(n), a && a.d(e), o && o.d(e), e && L(i);
      },
    };
  }
  function ll(e) {
    let t, i, r;
    const s = [
      {
        use: [
          [
            Di,
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
        class: $t({
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
      { style: Object.entries(e[12]).map(cl).concat([e[2]]).join(" ") },
      e[15],
      e[14],
      e[13],
      { href: e[7] },
      e[22],
    ];
    var a = e[9];
    function o(e) {
      let t = { $$slots: { default: [ol] }, $$scope: { ctx: e } };
      for (let e = 0; e < s.length; e += 1) t = n(t, s[e]);
      return { props: t };
    }
    return (
      a && ((t = new a(o(e))), e[28](t), t.$on("click", e[21])),
      {
        c() {
          t && Fe(t.$$.fragment), (i = F());
        },
        m(e, n) {
          t && ke(t, e, n), O(e, i, n), (r = !0);
        },
        p(e, [n]) {
          const r =
            6289919 & n
              ? Ne(s, [
                  6094873 & n && {
                    use: [
                      [
                        Di,
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
                  133490 & n && {
                    class: $t({
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
                  4100 & n && {
                    style: Object.entries(e[12])
                      .map(cl)
                      .concat([e[2]])
                      .join(" "),
                  },
                  32768 & n && Re(e[15]),
                  16384 & n && Re(e[14]),
                  8192 & n && Re(e[13]),
                  128 & n && { href: e[7] },
                  4194304 & n && Re(e[22]),
                ])
              : {};
          if (
            (536870976 & n && (r.$$scope = { dirty: n, ctx: e }),
            a !== (a = e[9]))
          ) {
            if (t) {
              xe();
              const e = t;
              _e(e.$$.fragment, 1, 0, () => {
                Ue(e, 1);
              }),
                Ce();
            }
            a
              ? ((t = new a(o(e))),
                e[28](t),
                t.$on("click", e[21]),
                Fe(t.$$.fragment),
                Se(t.$$.fragment, 1),
                ke(t, i.parentNode, i))
              : (t = null);
          } else a && t.$set(r);
        },
        i(e) {
          r || (t && Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          t && _e(t.$$.fragment, e), (r = !1);
        },
        d(n) {
          e[28](null), n && L(i), t && Ue(t, n);
        },
      }
    );
  }
  const cl = ([e, t]) => `${e}: ${t};`;
  function dl(e, t, i) {
    let r, s, a;
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
    let l = m(t, o),
      { $$slots: c = {}, $$scope: d } = t;
    const u = Et(Z());
    let p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { style: $ = "" } = t,
      { ripple: I = !0 } = t,
      { color: v = "primary" } = t,
      { variant: y = "text" } = t,
      { touch: b = !1 } = t,
      { href: E } = t,
      { action: A = "close" } = t,
      { defaultAction: x = !1 } = t,
      { secondary: C = !1 } = t,
      S = {},
      _ = {},
      T = re("SMUI:button:context"),
      { component: O = null == E ? on : an } = t,
      L = l.disabled;
    function w() {
      return p.getElement();
    }
    return (
      ie("SMUI:label:context", "button"),
      ie("SMUI:icon:context", "button"),
      (e.$$set = (e) => {
        i(30, (t = n(n({}, t), h(e)))),
          i(22, (l = m(t, o))),
          "use" in e && i(0, (f = e.use)),
          "class" in e && i(1, (g = e.class)),
          "style" in e && i(2, ($ = e.style)),
          "ripple" in e && i(3, (I = e.ripple)),
          "color" in e && i(4, (v = e.color)),
          "variant" in e && i(5, (y = e.variant)),
          "touch" in e && i(6, (b = e.touch)),
          "href" in e && i(7, (E = e.href)),
          "action" in e && i(23, (A = e.action)),
          "defaultAction" in e && i(24, (x = e.defaultAction)),
          "secondary" in e && i(8, (C = e.secondary)),
          "component" in e && i(9, (O = e.component)),
          "$$scope" in e && i(29, (d = e.$$scope));
      }),
      (e.$$.update = () => {
        i(
          15,
          (r =
            "dialog:action" === T && null != A
              ? { "data-mdc-dialog-action": A }
              : { action: t.action })
        ),
          i(
            14,
            (s =
              "dialog:action" === T && x
                ? { "data-mdc-dialog-button-default": "" }
                : { default: t.default })
          ),
          i(13, (a = "banner" === T ? {} : { secondary: t.secondary })),
          L !== l.disabled && (w().blur(), i(26, (L = l.disabled)));
      }),
      (t = h(t)),
      [
        f,
        g,
        $,
        I,
        v,
        y,
        b,
        E,
        C,
        O,
        p,
        S,
        _,
        a,
        s,
        r,
        u,
        T,
        function (e) {
          S[e] || i(11, (S[e] = !0), S);
        },
        function (e) {
          (e in S && !S[e]) || i(11, (S[e] = !1), S);
        },
        function (e, t) {
          _[e] != t &&
            ("" === t || null == t
              ? (delete _[e], i(12, _))
              : i(12, (_[e] = t), _));
        },
        function () {
          "banner" === T &&
            It(
              w(),
              C
                ? "SMUIBannerButton:secondaryActionClick"
                : "SMUIBannerButton:primaryActionClick"
            );
        },
        l,
        A,
        x,
        w,
        L,
        c,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (p = e), i(10, p);
          });
        },
        d,
      ]
    );
  }
  class ul extends Pe {
    constructor(e) {
      super(),
        He(this, e, dl, ll, o, {
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
  var pl = new Map([
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
  function fl(e, t) {
    var n = (function (e) {
      var t = e.name;
      if (t && -1 !== t.lastIndexOf(".") && !e.type) {
        var n = t.split(".").pop().toLowerCase(),
          i = pl.get(n);
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
  var hl = [".DS_Store", "Thumbs.db"];
  function ml(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [
          2,
          ((n = e),
          n.dataTransfer && e.dataTransfer
            ? $l(e.dataTransfer, e.type)
            : gl(e)),
        ];
        var n;
      });
    });
  }
  function gl(e) {
    return (null !== e.target && e.target.files ? vl(e.target.files) : []).map(
      function (e) {
        return fl(e);
      }
    );
  }
  function $l(e, t) {
    return qe(this, void 0, void 0, function () {
      var n;
      return Ke(this, function (i) {
        switch (i.label) {
          case 0:
            return e.items
              ? ((n = vl(e.items).filter(function (e) {
                  return "file" === e.kind;
                })),
                "drop" !== t ? [2, n] : [4, Promise.all(n.map(yl))])
              : [3, 2];
          case 1:
            return [2, Il(bl(i.sent()))];
          case 2:
            return [
              2,
              Il(
                vl(e.files).map(function (e) {
                  return fl(e);
                })
              ),
            ];
        }
      });
    });
  }
  function Il(e) {
    return e.filter(function (e) {
      return -1 === hl.indexOf(e.name);
    });
  }
  function vl(e) {
    for (var t = [], n = 0; n < e.length; n++) {
      var i = e[n];
      t.push(i);
    }
    return t;
  }
  function yl(e) {
    if ("function" != typeof e.webkitGetAsEntry) return El(e);
    var t = e.webkitGetAsEntry();
    return t && t.isDirectory ? xl(t) : El(e);
  }
  function bl(e) {
    return e.reduce(function (e, t) {
      return (function () {
        for (var e = [], t = 0; t < arguments.length; t++)
          e = e.concat(Xe(arguments[t]));
        return e;
      })(e, Array.isArray(t) ? bl(t) : [t]);
    }, []);
  }
  function El(e) {
    var t = e.getAsFile();
    if (!t) return Promise.reject(e + " is not a File");
    var n = fl(t);
    return Promise.resolve(n);
  }
  function Al(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [2, e.isDirectory ? xl(e) : Cl(e)];
      });
    });
  }
  function xl(e) {
    var t = e.createReader();
    return new Promise(function (e, n) {
      var i = [];
      !(function r() {
        var s = this;
        t.readEntries(
          function (t) {
            return qe(s, void 0, void 0, function () {
              var s, a, o;
              return Ke(this, function (l) {
                switch (l.label) {
                  case 0:
                    if (t.length) return [3, 5];
                    l.label = 1;
                  case 1:
                    return l.trys.push([1, 3, , 4]), [4, Promise.all(i)];
                  case 2:
                    return (s = l.sent()), e(s), [3, 4];
                  case 3:
                    return (a = l.sent()), n(a), [3, 4];
                  case 4:
                    return [3, 6];
                  case 5:
                    (o = Promise.all(t.map(Al))), i.push(o), r(), (l.label = 6);
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
  function Cl(e) {
    return qe(this, void 0, void 0, function () {
      return Ke(this, function (t) {
        return [
          2,
          new Promise(function (t, n) {
            e.file(
              function (n) {
                var i = fl(n, e.fullPath);
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
  const Sl = (e) => {
      e = Array.isArray(e) && 1 === e.length ? e[0] : e;
      return {
        code: "file-invalid-type",
        message: `File type must be ${
          Array.isArray(e) ? `one of ${e.join(", ")}` : e
        }`,
      };
    },
    _l = (e) => ({
      code: "file-too-large",
      message: `File is larger than ${e} bytes`,
    }),
    Tl = (e) => ({
      code: "file-too-small",
      message: `File is smaller than ${e} bytes`,
    }),
    Ol = { code: "too-many-files", message: "Too many files" };
  function Ll(e, t) {
    const n =
      "application/x-moz-file" === e.type ||
      (function (e, t) {
        if (e && t) {
          const n = Array.isArray(t) ? t : t.split(","),
            i = e.name || "",
            r = (e.type || "").toLowerCase(),
            s = r.replace(/\/.*$/, "");
          return n.some((e) => {
            const t = e.trim().toLowerCase();
            return "." === t.charAt(0)
              ? i.toLowerCase().endsWith(t)
              : t.endsWith("/*")
              ? s === t.replace(/\/.*$/, "")
              : r === t;
          });
        }
        return !0;
      })(e, t);
    return [n, n ? null : Sl(t)];
  }
  function wl(e) {
    return null != e;
  }
  function Dl(e) {
    return "function" == typeof e.isPropagationStopped
      ? e.isPropagationStopped()
      : void 0 !== e.cancelBubble && e.cancelBubble;
  }
  function Nl(e) {
    return e.dataTransfer
      ? Array.prototype.some.call(
          e.dataTransfer.types,
          (e) => "Files" === e || "application/x-moz-file" === e
        )
      : !!e.target && !!e.target.files;
  }
  function Rl(t) {
    let n, i, r, a, o, l, d;
    const h = t[32].default,
      m = c(h, t, t[31], null),
      g =
        m ||
        (function (t) {
          let n;
          return {
            c() {
              (n = D("p")),
                (n.textContent =
                  "Drag 'n' drop some files here, or click to select files");
            },
            m(e, t) {
              O(e, n, t);
            },
            p: e,
            d(e) {
              e && L(n);
            },
          };
        })();
    return {
      c() {
        (n = D("div")),
          (i = D("input")),
          (r = M()),
          g && g.c(),
          U(i, "accept", t[0]),
          (i.multiple = t[1]),
          U(i, "type", "file"),
          U(i, "name", t[5]),
          U(i, "autocomplete", "off"),
          U(i, "tabindex", "-1"),
          V(i, "display", "none"),
          U(n, "tabindex", "0"),
          U(
            n,
            "class",
            (a = (t[4] ? "" : "dropzone") + " " + t[2] + " svelte-817dg2")
          ),
          U(n, "style", t[3]);
      },
      m(e, s) {
        O(e, n, s),
          S(n, i),
          t[33](i),
          S(n, r),
          g && g.m(n, null),
          t[34](n),
          (o = !0),
          l ||
            ((d = [
              k(window, "focus", t[21]),
              k(window, "dragover", t[19]),
              k(window, "drop", t[20]),
              k(i, "change", t[15]),
              k(i, "click", Ml),
              k(n, "keydown", t[17](t[8])),
              k(n, "focus", t[17](t[9])),
              k(n, "blur", t[17](t[10])),
              k(n, "click", t[16](t[11])),
              k(n, "dragenter", t[18](t[12])),
              k(n, "dragover", t[18](t[13])),
              k(n, "dragleave", t[18](t[14])),
              k(n, "drop", t[18](t[15])),
            ]),
            (l = !0));
      },
      p(e, t) {
        (!o || 1 & t[0]) && U(i, "accept", e[0]),
          (!o || 2 & t[0]) && (i.multiple = e[1]),
          (!o || 32 & t[0]) && U(i, "name", e[5]),
          m &&
            m.p &&
            (!o || 1 & t[1]) &&
            p(m, h, e, e[31], o ? u(h, e[31], t, null) : f(e[31]), null),
          (!o ||
            (20 & t[0] &&
              a !==
                (a =
                  (e[4] ? "" : "dropzone") + " " + e[2] + " svelte-817dg2"))) &&
            U(n, "class", a),
          (!o || 8 & t[0]) && U(n, "style", e[3]);
      },
      i(e) {
        o || (Se(g, e), (o = !0));
      },
      o(e) {
        _e(g, e), (o = !1);
      },
      d(e) {
        e && L(n), t[33](null), g && g.d(e), t[34](null), (l = !1), s(d);
      },
    };
  }
  function Ml(e) {
    e.stopPropagation();
  }
  function Fl(e, t, n) {
    let { $$slots: i = {}, $$scope: r } = t,
      { accept: s } = t,
      { disabled: a = !1 } = t,
      { getFilesFromEvent: o = ml } = t,
      { maxSize: l = 1 / 0 } = t,
      { minSize: c = 0 } = t,
      { multiple: d = !0 } = t,
      { preventDropOnDocument: u = !0 } = t,
      { noClick: p = !1 } = t,
      { noKeyboard: f = !1 } = t,
      { noDrag: h = !1 } = t,
      { noDragEventsBubbling: m = !1 } = t,
      { containerClasses: g = "" } = t,
      { containerStyles: $ = "" } = t,
      { disableDefaultStyles: I = !1 } = t,
      { name: v = "" } = t;
    const y = ne();
    let b,
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
    function x() {
      E && (n(7, (E.value = null), E), (A.isFileDialogActive = !0), E.click());
    }
    function C(e) {
      return a ? null : e;
    }
    function S(e) {
      m && e.stopPropagation();
    }
    let _ = [];
    return (
      te(() => {
        n(7, (E = null));
      }),
      (e.$$set = (e) => {
        "accept" in e && n(0, (s = e.accept)),
          "disabled" in e && n(22, (a = e.disabled)),
          "getFilesFromEvent" in e && n(23, (o = e.getFilesFromEvent)),
          "maxSize" in e && n(24, (l = e.maxSize)),
          "minSize" in e && n(25, (c = e.minSize)),
          "multiple" in e && n(1, (d = e.multiple)),
          "preventDropOnDocument" in e && n(26, (u = e.preventDropOnDocument)),
          "noClick" in e && n(27, (p = e.noClick)),
          "noKeyboard" in e && n(28, (f = e.noKeyboard)),
          "noDrag" in e && n(29, (h = e.noDrag)),
          "noDragEventsBubbling" in e && n(30, (m = e.noDragEventsBubbling)),
          "containerClasses" in e && n(2, (g = e.containerClasses)),
          "containerStyles" in e && n(3, ($ = e.containerStyles)),
          "disableDefaultStyles" in e && n(4, (I = e.disableDefaultStyles)),
          "name" in e && n(5, (v = e.name)),
          "$$scope" in e && n(31, (r = e.$$scope));
      }),
      [
        s,
        d,
        g,
        $,
        I,
        v,
        b,
        E,
        function (e) {
          b &&
            b.isEqualNode(e.target) &&
            ((32 !== e.keyCode && 13 !== e.keyCode) ||
              (e.preventDefault(), x()));
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
              ? x()
              : setTimeout(x, 0));
        },
        function (e) {
          e.preventDefault(),
            S(e),
            (_ = [..._, e.target]),
            Nl(e) &&
              Promise.resolve(o(e)).then((t) => {
                (Dl(e) && !m) ||
                  ((A.draggedFiles = t),
                  (A.isDragActive = !0),
                  y("dragenter", { dragEvent: e }));
              });
        },
        function (e) {
          if ((e.preventDefault(), S(e), e.dataTransfer))
            try {
              e.dataTransfer.dropEffect = "copy";
            } catch {}
          return Nl(e) && y("dragover", { dragEvent: e }), !1;
        },
        function (e) {
          e.preventDefault(), S(e);
          const t = _.filter((e) => b && b.contains(e)),
            n = t.indexOf(e.target);
          -1 !== n && t.splice(n, 1),
            (_ = t),
            t.length > 0 ||
              ((A.isDragActive = !1),
              (A.draggedFiles = []),
              Nl(e) && y("dragleave", { dragEvent: e }));
        },
        function (e) {
          e.preventDefault(),
            S(e),
            (_ = []),
            Nl(e) &&
              (y("filedropped", { event: e }),
              Promise.resolve(o(e)).then((t) => {
                if (Dl(e) && !m) return;
                const n = [],
                  i = [];
                t.forEach((e) => {
                  const [t, r] = Ll(e, s),
                    [a, o] = (function (e, t, n) {
                      if (wl(e.size))
                        if (wl(t) && wl(n)) {
                          if (e.size > n) return [!1, _l(n)];
                          if (e.size < t) return [!1, Tl(t)];
                        } else {
                          if (wl(t) && e.size < t) return [!1, Tl(t)];
                          if (wl(n) && e.size > n) return [!1, _l(n)];
                        }
                      return [!0, null];
                    })(e, c, l);
                  if (t && a) n.push(e);
                  else {
                    const t = [r, o].filter((e) => e);
                    i.push({ file: e, errors: t });
                  }
                }),
                  !d &&
                    n.length > 1 &&
                    (n.forEach((e) => {
                      i.push({ file: e, errors: [Ol] });
                    }),
                    n.splice(0)),
                  (A.acceptedFiles = n),
                  (A.fileRejections = i),
                  y("drop", { acceptedFiles: n, fileRejections: i, event: e }),
                  i.length > 0 &&
                    y("droprejected", { fileRejections: i, event: e }),
                  n.length > 0 &&
                    y("dropaccepted", { acceptedFiles: n, event: e });
              })),
            (A.isFileDialogActive = !1),
            (A.isDragActive = !1),
            (A.draggedFiles = []),
            (A.acceptedFiles = []),
            (A.fileRejections = []);
        },
        C,
        function (e) {
          return f ? null : C(e);
        },
        function (e) {
          return h ? null : C(e);
        },
        function (e) {
          u && e.preventDefault();
        },
        function (e) {
          u && ((b && b.contains(e.target)) || (e.preventDefault(), (_ = [])));
        },
        function () {
          A.isFileDialogActive &&
            setTimeout(() => {
              if (E) {
                const { files: e } = E;
                e.length ||
                  ((A.isFileDialogActive = !1), y("filedialogcancel"));
              }
            }, 300);
        },
        a,
        o,
        l,
        c,
        u,
        p,
        f,
        h,
        m,
        r,
        i,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (E = e), n(7, E);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (b = e), n(6, b);
          });
        },
      ]
    );
  }
  class kl extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          Fl,
          Rl,
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
   */ var Ul = {
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
    Hl = {
      ARIA_CHECKED_ATTR: "aria-checked",
      ARIA_CHECKED_INDETERMINATE_VALUE: "mixed",
      DATA_INDETERMINATE_ATTR: "data-indeterminate",
      NATIVE_CONTROL_SELECTOR: ".mdc-checkbox__native-control",
      TRANSITION_STATE_CHECKED: "checked",
      TRANSITION_STATE_INDETERMINATE: "indeterminate",
      TRANSITION_STATE_INIT: "init",
      TRANSITION_STATE_UNCHECKED: "unchecked",
    },
    Pl = { ANIM_END_LATCH_MS: 250 },
    Bl = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.currentCheckState = Hl.TRANSITION_STATE_INIT),
          (i.currentAnimationClass = ""),
          (i.animEndLatchTimer = 0),
          (i.enableAnimationEndHandler = !1),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return Ul;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Hl;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "numbers", {
          get: function () {
            return Pl;
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
            this.adapter.addClass(Ul.UPGRADED);
        }),
        (t.prototype.destroy = function () {
          clearTimeout(this.animEndLatchTimer);
        }),
        (t.prototype.setDisabled = function (e) {
          this.adapter.setNativeControlDisabled(e),
            e
              ? this.adapter.addClass(Ul.DISABLED)
              : this.adapter.removeClass(Ul.DISABLED);
        }),
        (t.prototype.handleAnimationEnd = function () {
          var e = this;
          this.enableAnimationEndHandler &&
            (clearTimeout(this.animEndLatchTimer),
            (this.animEndLatchTimer = setTimeout(function () {
              e.adapter.removeClass(e.currentAnimationClass),
                (e.enableAnimationEndHandler = !1);
            }, Pl.ANIM_END_LATCH_MS)));
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
              var n = Ul.SELECTED;
              t === Hl.TRANSITION_STATE_UNCHECKED
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
          var e = Hl.TRANSITION_STATE_INDETERMINATE,
            t = Hl.TRANSITION_STATE_CHECKED,
            n = Hl.TRANSITION_STATE_UNCHECKED;
          return this.adapter.isIndeterminate()
            ? e
            : this.adapter.isChecked()
            ? t
            : n;
        }),
        (t.prototype.getTransitionAnimationClass = function (e, n) {
          var i = Hl.TRANSITION_STATE_INIT,
            r = Hl.TRANSITION_STATE_CHECKED,
            s = Hl.TRANSITION_STATE_UNCHECKED,
            a = t.cssClasses,
            o = a.ANIM_UNCHECKED_CHECKED,
            l = a.ANIM_UNCHECKED_INDETERMINATE,
            c = a.ANIM_CHECKED_UNCHECKED,
            d = a.ANIM_CHECKED_INDETERMINATE,
            u = a.ANIM_INDETERMINATE_CHECKED,
            p = a.ANIM_INDETERMINATE_UNCHECKED;
          switch (e) {
            case i:
              return n === s ? "" : n === r ? u : p;
            case s:
              return n === r ? o : l;
            case r:
              return n === s ? c : d;
            default:
              return n === r ? u : p;
          }
        }),
        (t.prototype.updateAriaChecked = function () {
          this.adapter.isIndeterminate()
            ? this.adapter.setNativeControlAttr(
                Hl.ARIA_CHECKED_ATTR,
                Hl.ARIA_CHECKED_INDETERMINATE_VALUE
              )
            : this.adapter.removeNativeControlAttr(Hl.ARIA_CHECKED_ATTR);
        }),
        t
      );
    })(Ye);
  function Vl(t) {
    let i,
      r,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g,
      $,
      I,
      y,
      b,
      E = [
        { class: (o = $t({ [t[9]]: !0, "mdc-checkbox__native-control": !0 })) },
        { type: "checkbox" },
        t[20],
        { disabled: t[1] },
        { __value: (l = t[19](t[7]) ? t[6] : t[7]) },
        { "data-indeterminate": (c = !t[19](t[0]) && t[0] ? "true" : void 0) },
        t[16],
        At(t[26], "input$"),
      ],
      A = {};
    for (let e = 0; e < E.length; e += 1) A = n(A, E[e]);
    let x = [
        {
          class: (m = $t({
            [t[3]]: !0,
            "mdc-checkbox": !0,
            "mdc-checkbox--disabled": t[1],
            "mdc-checkbox--touch": t[5],
            "mdc-data-table__header-row-checkbox":
              "data-table" === t[21] && t[22],
            "mdc-data-table__row-checkbox": "data-table" === t[21] && !t[22],
            ...t[14],
          })),
        },
        { style: (g = Object.entries(t[15]).map(jl).concat([t[4]]).join(" ")) },
        vt(t[26], ["input$"]),
      ],
      C = {};
    for (let e = 0; e < x.length; e += 1) C = n(C, x[e]);
    return {
      c() {
        (i = D("div")),
          (r = D("input")),
          (u = M()),
          (p = D("div")),
          (p.innerHTML =
            '<svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"><path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path></svg> \n    <div class="mdc-checkbox__mixedmark"></div>'),
          (f = M()),
          (h = D("div")),
          H(r, A),
          U(p, "class", "mdc-checkbox__background"),
          U(h, "class", "mdc-checkbox__ripple"),
          H(i, C);
      },
      m(e, n) {
        O(e, i, n),
          S(i, r),
          r.autofocus && r.focus(),
          t[36](r),
          (r.checked = t[12]),
          S(i, u),
          S(i, p),
          S(i, f),
          S(i, h),
          t[38](i),
          y ||
            ((b = [
              v((d = xt.call(null, r, t[8]))),
              k(r, "change", t[37]),
              k(r, "blur", t[34]),
              k(r, "focus", t[35]),
              v(($ = xt.call(null, i, t[2]))),
              v(t[18].call(null, i)),
              v(
                (I = Di.call(null, i, {
                  unbounded: !0,
                  addClass: t[23],
                  removeClass: t[24],
                  addStyle: t[25],
                  active: t[17],
                  eventTarget: t[11],
                }))
              ),
              k(i, "animationend", t[39]),
            ]),
            (y = !0));
      },
      p(e, t) {
        H(
          r,
          (A = Ne(E, [
            512 & t[0] &&
              o !==
                (o = $t({
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
            67108864 & t[0] && At(e[26], "input$"),
          ]))
        ),
          d && a(d.update) && 256 & t[0] && d.update.call(null, e[8]),
          4096 & t[0] && (r.checked = e[12]),
          H(
            i,
            (C = Ne(x, [
              16426 & t[0] &&
                m !==
                  (m = $t({
                    [e[3]]: !0,
                    "mdc-checkbox": !0,
                    "mdc-checkbox--disabled": e[1],
                    "mdc-checkbox--touch": e[5],
                    "mdc-data-table__header-row-checkbox":
                      "data-table" === e[21] && e[22],
                    "mdc-data-table__row-checkbox":
                      "data-table" === e[21] && !e[22],
                    ...e[14],
                  })) && { class: m },
              32784 & t[0] &&
                g !==
                  (g = Object.entries(e[15])
                    .map(jl)
                    .concat([e[4]])
                    .join(" ")) && { style: g },
              67108864 & t[0] && vt(e[26], ["input$"]),
            ]))
          ),
          $ && a($.update) && 4 & t[0] && $.update.call(null, e[2]),
          I &&
            a(I.update) &&
            133120 & t[0] &&
            I.update.call(null, {
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
        e && L(i), t[36](null), t[38](null), (y = !1), s(b);
      },
    };
  }
  const jl = ([e, t]) => `${e}: ${t};`;
  function zl(e, t, i) {
    const r = [
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
    let s = m(t, r);
    var a;
    const o = Et(Z());
    let l = () => {};
    function c(e) {
      return e === l;
    }
    let d,
      u,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { style: $ = "" } = t,
      { disabled: I = !1 } = t,
      { touch: v = !1 } = t,
      { indeterminate: y = l } = t,
      { group: b = l } = t,
      { checked: E = l } = t,
      { value: A = null } = t,
      { valueKey: x = l } = t,
      { input$use: C = [] } = t,
      { input$class: S = "" } = t,
      _ = {},
      T = {},
      O = {},
      L = !1,
      w =
        null !== (a = re("SMUI:generic:input:props")) && void 0 !== a ? a : {},
      D = c(b) ? !c(E) && (null != E ? E : void 0) : -1 !== b.indexOf(A),
      N = re("SMUI:checkbox:context"),
      R = re("SMUI:data-table:row:header"),
      M = E,
      F = c(b) ? [] : [...b],
      k = D;
    function U(e) {
      _[e] || i(14, (_[e] = !0), _);
    }
    function H(e) {
      (e in _ && !_[e]) || i(14, (_[e] = !1), _);
    }
    function P(e, t) {
      O[e] !== t && i(16, (O[e] = t), O);
    }
    function B(e) {
      (e in O && null == O[e]) || i(16, (O[e] = void 0), O);
    }
    function V() {
      return d;
    }
    ee(() => {
      i(11, (p.indeterminate = !c(y) && y), p),
        i(
          10,
          (u = new Bl({
            addClass: U,
            forceLayout: () => d.offsetWidth,
            hasNativeControl: () => !0,
            isAttachedToDOM: () => Boolean(d.parentNode),
            isChecked: () => null != D && D,
            isIndeterminate: () => !c(y) && y,
            removeClass: H,
            removeNativeControlAttr: B,
            setNativeControlAttr: P,
            setNativeControlDisabled: (e) => i(1, (I = e)),
          }))
        );
      const e = {
        _smui_checkbox_accessor: !0,
        get element() {
          return V();
        },
        get checked() {
          return null != D && D;
        },
        set checked(e) {
          D !== e && i(12, (D = e));
        },
        get indeterminate() {
          return !c(y) && y;
        },
        set indeterminate(e) {
          i(0, (y = e));
        },
        activateRipple() {
          I || i(17, (L = !0));
        },
        deactivateRipple() {
          i(17, (L = !1));
        },
      };
      return (
        It(d, "SMUIGenericInput:mount", e),
        It(d, "SMUICheckbox:mount", e),
        u.init(),
        () => {
          It(d, "SMUIGenericInput:unmount", e),
            It(d, "SMUICheckbox:unmount", e),
            u.destroy();
        }
      );
    });
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(26, (s = m(t, r))),
          "use" in e && i(2, (f = e.use)),
          "class" in e && i(3, (g = e.class)),
          "style" in e && i(4, ($ = e.style)),
          "disabled" in e && i(1, (I = e.disabled)),
          "touch" in e && i(5, (v = e.touch)),
          "indeterminate" in e && i(0, (y = e.indeterminate)),
          "group" in e && i(27, (b = e.group)),
          "checked" in e && i(28, (E = e.checked)),
          "value" in e && i(6, (A = e.value)),
          "valueKey" in e && i(7, (x = e.valueKey)),
          "input$use" in e && i(8, (C = e.input$use)),
          "input$class" in e && i(9, (S = e.input$class));
      }),
      (e.$$.update = () => {
        if ((402660417 & e.$$.dirty[0]) | (7 & e.$$.dirty[1])) {
          let e = !1;
          if (!c(b))
            if (k !== D) {
              const t = b.indexOf(A);
              D && -1 === t
                ? (b.push(A),
                  i(27, b),
                  i(33, k),
                  i(12, D),
                  i(6, A),
                  i(32, F),
                  i(28, E),
                  i(31, M),
                  i(0, y),
                  i(11, p),
                  i(10, u))
                : D ||
                  -1 === t ||
                  (b.splice(t, 1),
                  i(27, b),
                  i(33, k),
                  i(12, D),
                  i(6, A),
                  i(32, F),
                  i(28, E),
                  i(31, M),
                  i(0, y),
                  i(11, p),
                  i(10, u)),
                (e = !0);
            } else {
              const t = F.indexOf(A),
                n = b.indexOf(A);
              t > -1 && -1 === n
                ? (i(12, (D = !1)), (e = !0))
                : n > -1 && -1 === t && (i(12, (D = !0)), (e = !0));
            }
          c(E)
            ? !!k != !!D && (e = !0)
            : E !== (null != D ? D : null) &&
              (E === M
                ? (i(28, (E = null != D ? D : null)), c(y) || i(0, (y = !1)))
                : i(12, (D = null != E ? E : void 0)),
              (e = !0)),
            p &&
              (c(y)
                ? p.indeterminate &&
                  (i(11, (p.indeterminate = !1), p), (e = !0))
                : !y && p.indeterminate
                ? (i(11, (p.indeterminate = !1), p), (e = !0))
                : y &&
                  !p.indeterminate &&
                  (i(11, (p.indeterminate = !0), p), (e = !0))),
            i(31, (M = E)),
            i(32, (F = c(b) ? [] : [...b])),
            i(33, (k = D)),
            e && u && u.handleChange();
        }
      }),
      [
        y,
        I,
        f,
        g,
        $,
        v,
        A,
        x,
        C,
        S,
        u,
        p,
        D,
        d,
        _,
        T,
        O,
        L,
        o,
        c,
        w,
        N,
        R,
        U,
        H,
        function (e, t) {
          T[e] != t &&
            ("" === t || null == t
              ? (delete T[e], i(15, T))
              : i(15, (T[e] = t), T));
        },
        s,
        b,
        E,
        function () {
          return w && w.id;
        },
        V,
        M,
        F,
        k,
        function (t) {
          se.call(this, e, t);
        },
        function (t) {
          se.call(this, e, t);
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (p = e),
              i(11, p),
              i(27, b),
              i(33, k),
              i(12, D),
              i(6, A),
              i(32, F),
              i(28, E),
              i(31, M),
              i(0, y),
              i(10, u);
          });
        },
        function () {
          (D = this.checked),
            i(12, D),
            i(27, b),
            i(33, k),
            i(6, A),
            i(32, F),
            i(28, E),
            i(31, M),
            i(0, y),
            i(11, p),
            i(10, u);
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (d = e), i(13, d);
          });
        },
        () => u && u.handleAnimationEnd(),
      ]
    );
  }
  class Gl extends Pe {
    constructor(e) {
      super(),
        He(
          this,
          e,
          zl,
          Vl,
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
   */ var ql = { ROOT: "mdc-form-field" },
    Kl = { LABEL_SELECTOR: ".mdc-form-field > label" },
    Wl = (function (e) {
      function t(n) {
        var i = e.call(this, Ge(Ge({}, t.defaultAdapter), n)) || this;
        return (
          (i.click = function () {
            i.handleClick();
          }),
          i
        );
      }
      return (
        ze(t, e),
        Object.defineProperty(t, "cssClasses", {
          get: function () {
            return ql;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t, "strings", {
          get: function () {
            return Kl;
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
    })(Ye);
  const Xl = (e) => ({}),
    Yl = (e) => ({});
  function Ql(e) {
    let t, i, r, o, l, d, h, m, g;
    const $ = e[13].default,
      I = c($, e, e[12], null),
      y = e[13].label,
      b = c(y, e, e[12], Yl);
    let E = [{ for: e[4] }, At(e[10], "label$")],
      A = {};
    for (let e = 0; e < E.length; e += 1) A = n(A, E[e]);
    let x = [
        {
          class: (l = $t({
            [e[1]]: !0,
            "mdc-form-field": !0,
            "mdc-form-field--align-end": "end" === e[2],
            "mdc-form-field--nowrap": e[3],
          })),
        },
        vt(e[10], ["label$"]),
      ],
      C = {};
    for (let e = 0; e < x.length; e += 1) C = n(C, x[e]);
    return {
      c() {
        (t = D("div")),
          I && I.c(),
          (i = M()),
          (r = D("label")),
          b && b.c(),
          H(r, A),
          H(t, C);
      },
      m(n, s) {
        O(n, t, s),
          I && I.m(t, null),
          S(t, i),
          S(t, r),
          b && b.m(r, null),
          e[14](r),
          e[15](t),
          (h = !0),
          m ||
            ((g = [
              v((o = xt.call(null, r, e[5]))),
              v((d = xt.call(null, t, e[0]))),
              v(e[9].call(null, t)),
              k(t, "SMUIGenericInput:mount", e[16]),
              k(t, "SMUIGenericInput:unmount", e[17]),
            ]),
            (m = !0));
      },
      p(e, [n]) {
        I &&
          I.p &&
          (!h || 4096 & n) &&
          p(I, $, e, e[12], h ? u($, e[12], n, null) : f(e[12]), null),
          b &&
            b.p &&
            (!h || 4096 & n) &&
            p(b, y, e, e[12], h ? u(y, e[12], n, Xl) : f(e[12]), Yl),
          H(
            r,
            (A = Ne(E, [
              (!h || 16 & n) && { for: e[4] },
              1024 & n && At(e[10], "label$"),
            ]))
          ),
          o && a(o.update) && 32 & n && o.update.call(null, e[5]),
          H(
            t,
            (C = Ne(x, [
              (!h ||
                (14 & n &&
                  l !==
                    (l = $t({
                      [e[1]]: !0,
                      "mdc-form-field": !0,
                      "mdc-form-field--align-end": "end" === e[2],
                      "mdc-form-field--nowrap": e[3],
                    })))) && { class: l },
              1024 & n && vt(e[10], ["label$"]),
            ]))
          ),
          d && a(d.update) && 1 & n && d.update.call(null, e[0]);
      },
      i(e) {
        h || (Se(I, e), Se(b, e), (h = !0));
      },
      o(e) {
        _e(I, e), _e(b, e), (h = !1);
      },
      d(n) {
        n && L(t),
          I && I.d(n),
          b && b.d(n),
          e[14](null),
          e[15](null),
          (m = !1),
          s(g);
      },
    };
  }
  let Jl = 0;
  function Zl(e, t, i) {
    const r = [
      "use",
      "class",
      "align",
      "noWrap",
      "inputId",
      "label$use",
      "getElement",
    ];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      d,
      u,
      p,
      { use: f = [] } = t,
      { class: g = "" } = t,
      { align: $ = "start" } = t,
      { noWrap: I = !1 } = t,
      { inputId: v = "SMUI-form-field-" + Jl++ } = t,
      { label$use: y = [] } = t;
    ie("SMUI:generic:input:props", { id: v }),
      ee(
        () => (
          (d = new Wl({
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
        (t = n(n({}, t), h(e))),
          i(10, (s = m(t, r))),
          "use" in e && i(0, (f = e.use)),
          "class" in e && i(1, (g = e.class)),
          "align" in e && i(2, ($ = e.align)),
          "noWrap" in e && i(3, (I = e.noWrap)),
          "inputId" in e && i(4, (v = e.inputId)),
          "label$use" in e && i(5, (y = e.label$use)),
          "$$scope" in e && i(12, (o = e.$$scope));
      }),
      [
        f,
        g,
        $,
        I,
        v,
        y,
        c,
        u,
        p,
        l,
        s,
        function () {
          return c;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (u = e), i(7, u);
          });
        },
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(6, c);
          });
        },
        (e) => i(8, (p = e.detail)),
        () => i(8, (p = void 0)),
      ]
    );
  }
  class ec extends Pe {
    constructor(e) {
      super(),
        He(this, e, Zl, Ql, o, {
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
  function tc(e, t, n) {
    const i = e.slice();
    return (i[16] = t[n]), i;
  }
  function nc(e, t, n) {
    const i = e.slice();
    return (i[16] = t[n]), i;
  }
  function ic(e) {
    let t, n;
    return (
      (t = new ec({
        props: { $$slots: { label: [lc], default: [oc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097154 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function rc(e) {
    let t, n;
    return (
      (t = new ec({
        props: { $$slots: { default: [pc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function sc(e) {
    let t, n;
    return (
      (t = new ec({
        props: { $$slots: { default: [fc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function ac(e) {
    let t, n;
    return (
      (t = new ec({
        props: { $$slots: { default: [hc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097158 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function oc(e) {
    let t, n, i;
    function r(t) {
      e[13](t);
    }
    let s = { indeterminate: null === e[1] };
    return (
      void 0 !== e[1] && (s.checked = e[1]),
      (t = new Gl({ props: s })),
      oe.push(() => Me(t, "checked", r)),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, i) {
          const r = {};
          2 & i && (r.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (r.checked = e[1]), he(() => (n = !1))),
            t.$set(r);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function lc(t) {
    let n;
    return {
      c() {
        (n = D("span")), (n.textContent = `${t[4]}`), U(n, "slot", "label");
      },
      m(e, t) {
        O(e, n, t);
      },
      p: e,
      d(e) {
        e && L(n);
      },
    };
  }
  function cc(t) {
    let n,
      i = t[16].name + "";
    return {
      c() {
        n = R(i);
      },
      m(e, t) {
        O(e, n, t);
      },
      p: e,
      d(e) {
        e && L(n);
      },
    };
  }
  function dc(e) {
    let t, n;
    return (
      (t = new Vo({
        props: {
          value: e[16].name,
          $$slots: { default: [cc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2097152 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function uc(e) {
    let t,
      n,
      i = e[5],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = dc(nc(e, i, t));
    const s = (e) =>
      _e(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = F();
      },
      m(e, i) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
        O(e, t, i), (n = !0);
      },
      p(e, n) {
        if (32 & n) {
          let a;
          for (i = e[5], a = 0; a < i.length; a += 1) {
            const s = nc(e, i, a);
            r[a]
              ? (r[a].p(s, n), Se(r[a], 1))
              : ((r[a] = dc(s)),
                r[a].c(),
                Se(r[a], 1),
                r[a].m(t.parentNode, t));
          }
          for (xe(), a = i.length; a < r.length; a += 1) s(a);
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) Se(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) _e(r[e]);
        n = !1;
      },
      d(e) {
        w(r, e), e && L(t);
      },
    };
  }
  function pc(e) {
    let t, n, i, r, s, a;
    function o(t) {
      e[11](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[12](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new Gl({ props: l })),
      oe.push(() => Me(t, "checked", o));
    let d = { label: e[4], $$slots: { default: [uc] }, $$scope: { ctx: e } };
    return (
      void 0 !== e[2] && (d.value = e[2]),
      (r = new Uo({ props: d })),
      oe.push(() => Me(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = M()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), O(e, i, n), ke(r, e, n), (a = !0);
        },
        p(e, i) {
          const a = {};
          2 & i && (a.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (a.checked = e[1]), he(() => (n = !1))),
            t.$set(a);
          const o = {};
          2097152 & i && (o.$$scope = { dirty: i, ctx: e }),
            !s && 4 & i && ((s = !0), (o.value = e[2]), he(() => (s = !1))),
            r.$set(o);
        },
        i(e) {
          a || (Se(t.$$.fragment, e), Se(r.$$.fragment, e), (a = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(r.$$.fragment, e), (a = !1);
        },
        d(e) {
          Ue(t, e), e && L(i), Ue(r, e);
        },
      }
    );
  }
  function fc(e) {
    let t, n, i, r, s, a;
    function o(t) {
      e[9](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[10](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new Gl({ props: l })),
      oe.push(() => Me(t, "checked", o));
    let d = { label: e[4], type: "number" };
    return (
      void 0 !== e[2] && (d.value = e[2]),
      (r = new ts({ props: d })),
      oe.push(() => Me(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = M()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), O(e, i, n), ke(r, e, n), (a = !0);
        },
        p(e, i) {
          const a = {};
          2 & i && (a.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (a.checked = e[1]), he(() => (n = !1))),
            t.$set(a);
          const o = {};
          !s && 4 & i && ((s = !0), (o.value = e[2]), he(() => (s = !1))),
            r.$set(o);
        },
        i(e) {
          a || (Se(t.$$.fragment, e), Se(r.$$.fragment, e), (a = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(r.$$.fragment, e), (a = !1);
        },
        d(e) {
          Ue(t, e), e && L(i), Ue(r, e);
        },
      }
    );
  }
  function hc(e) {
    let t, n, i, r, s, a;
    function o(t) {
      e[7](t);
    }
    let l = { indeterminate: null === e[1] };
    function c(t) {
      e[8](t);
    }
    void 0 !== e[1] && (l.checked = e[1]),
      (t = new Gl({ props: l })),
      oe.push(() => Me(t, "checked", o));
    let d = { label: e[4] };
    return (
      void 0 !== e[2] && (d.value = e[2]),
      (r = new ts({ props: d })),
      oe.push(() => Me(r, "value", c)),
      {
        c() {
          Fe(t.$$.fragment), (i = M()), Fe(r.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), O(e, i, n), ke(r, e, n), (a = !0);
        },
        p(e, i) {
          const a = {};
          2 & i && (a.indeterminate = null === e[1]),
            !n && 2 & i && ((n = !0), (a.checked = e[1]), he(() => (n = !1))),
            t.$set(a);
          const o = {};
          !s && 4 & i && ((s = !0), (o.value = e[2]), he(() => (s = !1))),
            r.$set(o);
        },
        i(e) {
          a || (Se(t.$$.fragment, e), Se(r.$$.fragment, e), (a = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(r.$$.fragment, e), (a = !1);
        },
        d(e) {
          Ue(t, e), e && L(i), Ue(r, e);
        },
      }
    );
  }
  function mc(e) {
    let t,
      n,
      i,
      r,
      s,
      a,
      o = e[0].expanded && gc(e);
    return {
      c() {
        (t = D("div")),
          (t.textContent = "▶"),
          (n = M()),
          o && o.c(),
          (i = F()),
          U(t, "class", "arrow svelte-7av3ky"),
          j(t, "arrowDown", e[3]);
      },
      m(l, c) {
        O(l, t, c),
          O(l, n, c),
          o && o.m(l, c),
          O(l, i, c),
          (r = !0),
          s || ((a = k(t, "click", e[6])), (s = !0));
      },
      p(e, n) {
        8 & n && j(t, "arrowDown", e[3]),
          e[0].expanded
            ? o
              ? (o.p(e, n), 1 & n && Se(o, 1))
              : ((o = gc(e)), o.c(), Se(o, 1), o.m(i.parentNode, i))
            : o &&
              (xe(),
              _e(o, 1, 1, () => {
                o = null;
              }),
              Ce());
      },
      i(e) {
        r || (Se(o), (r = !0));
      },
      o(e) {
        _e(o), (r = !1);
      },
      d(e) {
        e && L(t), e && L(n), o && o.d(e), e && L(i), (s = !1), a();
      },
    };
  }
  function gc(e) {
    let t,
      n,
      i = e[5],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = $c(tc(e, i, t));
    const s = (e) =>
      _e(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        for (let e = 0; e < r.length; e += 1) r[e].c();
        t = F();
      },
      m(e, i) {
        for (let t = 0; t < r.length; t += 1) r[t].m(e, i);
        O(e, t, i), (n = !0);
      },
      p(e, n) {
        if (32 & n) {
          let a;
          for (i = e[5], a = 0; a < i.length; a += 1) {
            const s = tc(e, i, a);
            r[a]
              ? (r[a].p(s, n), Se(r[a], 1))
              : ((r[a] = $c(s)),
                r[a].c(),
                Se(r[a], 1),
                r[a].m(t.parentNode, t));
          }
          for (xe(), a = i.length; a < r.length; a += 1) s(a);
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) Se(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) _e(r[e]);
        n = !1;
      },
      d(e) {
        w(r, e), e && L(t);
      },
    };
  }
  function $c(t) {
    let n, i;
    return (
      (n = new yc({ props: { tree: t[16] } })),
      n.$on("change", t[14]),
      {
        c() {
          Fe(n.$$.fragment);
        },
        m(e, t) {
          ke(n, e, t), (i = !0);
        },
        p: e,
        i(e) {
          i || (Se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(n, e);
        },
      }
    );
  }
  function Ic(e) {
    let t, n, i, r, s, a;
    const o = [ac, sc, rc, ic],
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
    (i = c(e)), (r = l[i] = o[i](e));
    let d = e[5].length > 0 && "EnumField" !== e[0].type && mc(e);
    return {
      c() {
        (t = D("ul")),
          (n = D("li")),
          r.c(),
          (s = M()),
          d && d.c(),
          U(t, "class", "svelte-7av3ky");
      },
      m(e, r) {
        O(e, t, r),
          S(t, n),
          l[i].m(n, null),
          S(n, s),
          d && d.m(n, null),
          (a = !0);
      },
      p(e, [t]) {
        let a = i;
        (i = c(e)),
          i === a
            ? l[i].p(e, t)
            : (xe(),
              _e(l[a], 1, 1, () => {
                l[a] = null;
              }),
              Ce(),
              (r = l[i]),
              r ? r.p(e, t) : ((r = l[i] = o[i](e)), r.c()),
              Se(r, 1),
              r.m(n, s)),
          e[5].length > 0 && "EnumField" !== e[0].type
            ? d
              ? (d.p(e, t), 1 & t && Se(d, 1))
              : ((d = mc(e)), d.c(), Se(d, 1), d.m(n, null))
            : d &&
              (xe(),
              _e(d, 1, 1, () => {
                d = null;
              }),
              Ce());
      },
      i(e) {
        a || (Se(r), Se(d), (a = !0));
      },
      o(e) {
        _e(r), _e(d), (a = !1);
      },
      d(e) {
        e && L(t), l[i].d(), d && d.d();
      },
    };
  }
  function vc(e, t, n) {
    let i,
      { tree: r } = t;
    const { name: s, children: a } = r;
    let o = void 0 !== r.selected && r.selected,
      l = r.value || null;
    const c = ne();
    return (
      (e.$$set = (e) => {
        "tree" in e && n(0, (r = e.tree));
      }),
      (e.$$.update = () => {
        7 & e.$$.dirty &&
          (console.log("checked:", o),
          n(0, (r.selected = o), r),
          n(0, (r.value = l), r),
          c("change", { tree: r })),
          1 & e.$$.dirty && n(3, (i = r.expanded));
      }),
      [
        r,
        o,
        l,
        i,
        s,
        a,
        () => {
          n(0, (r.expanded = !r.expanded), r);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (e) {
          (l = e), n(2, l);
        },
        function (e) {
          (o = e), n(1, o);
        },
        function (t) {
          se.call(this, e, t);
        },
      ]
    );
  }
  class yc extends Pe {
    constructor(e) {
      super(), He(this, e, vc, Ic, o, { tree: 0 });
    }
  }
  function bc(e, t, n) {
    const i = e.slice();
    return (i[3] = t[n]), i;
  }
  function Ec(e) {
    let t, n;
    return (
      (t = new yc({ props: { tree: e[3] } })),
      t.$on("change", e[1]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          1 & n && (i.tree = e[3]), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Ac(e) {
    let t,
      n,
      i = e[0],
      r = [];
    for (let t = 0; t < i.length; t += 1) r[t] = Ec(bc(e, i, t));
    const s = (e) =>
      _e(r[e], 1, 1, () => {
        r[e] = null;
      });
    return {
      c() {
        t = D("main");
        for (let e = 0; e < r.length; e += 1) r[e].c();
      },
      m(e, i) {
        O(e, t, i);
        for (let e = 0; e < r.length; e += 1) r[e].m(t, null);
        n = !0;
      },
      p(e, [n]) {
        if (3 & n) {
          let a;
          for (i = e[0], a = 0; a < i.length; a += 1) {
            const s = bc(e, i, a);
            r[a]
              ? (r[a].p(s, n), Se(r[a], 1))
              : ((r[a] = Ec(s)), r[a].c(), Se(r[a], 1), r[a].m(t, null));
          }
          for (xe(), a = i.length; a < r.length; a += 1) s(a);
          Ce();
        }
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < i.length; e += 1) Se(r[e]);
          n = !0;
        }
      },
      o(e) {
        r = r.filter(Boolean);
        for (let e = 0; e < r.length; e += 1) _e(r[e]);
        n = !1;
      },
      d(e) {
        e && L(t), w(r, e);
      },
    };
  }
  function xc(e) {
    const t = e.children.flatMap(xc);
    return e.selected && t.push(e), t;
  }
  function Cc(e, t, n) {
    let { trees: i } = t;
    const r = ne();
    return (
      (e.$$set = (e) => {
        "trees" in e && n(0, (i = e.trees));
      }),
      [
        i,
        function () {
          const e = i.flatMap(xc);
          r("change", { filterTags: e });
        },
      ]
    );
  }
  class Sc extends Pe {
    constructor(e) {
      super(), He(this, e, Cc, Ac, o, { trees: 0 });
    }
  }
  function _c(e) {
    let t, i, r, o, l, d;
    const h = e[9].default,
      m = c(h, e, e[8], null);
    let g = [
        {
          class: (i = $t({
            [e[1]]: !0,
            "mdc-card": !0,
            "mdc-card--outlined": "outlined" === e[2],
            "smui-card--padded": e[3],
          })),
        },
        e[6],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("div")), m && m.c(), H(t, $);
      },
      m(n, i) {
        O(n, t, i),
          m && m.m(t, null),
          e[10](t),
          (o = !0),
          l ||
            ((d = [v((r = xt.call(null, t, e[0]))), v(e[5].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!o || 256 & n) &&
          p(m, h, e, e[8], o ? u(h, e[8], n, null) : f(e[8]), null),
          H(
            t,
            ($ = Ne(g, [
              (!o ||
                (14 & n &&
                  i !==
                    (i = $t({
                      [e[1]]: !0,
                      "mdc-card": !0,
                      "mdc-card--outlined": "outlined" === e[2],
                      "smui-card--padded": e[3],
                    })))) && { class: i },
              64 & n && e[6],
            ]))
          ),
          r && a(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        o || (Se(m, e), (o = !0));
      },
      o(e) {
        _e(m, e), (o = !1);
      },
      d(n) {
        n && L(t), m && m.d(n), e[10](null), (l = !1), s(d);
      },
    };
  }
  function Tc(e, t, i) {
    const r = ["use", "class", "variant", "padded", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      { use: d = [] } = t,
      { class: u = "" } = t,
      { variant: p = "raised" } = t,
      { padded: f = !1 } = t;
    return (
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(6, (s = m(t, r))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "variant" in e && i(2, (p = e.variant)),
          "padded" in e && i(3, (f = e.padded)),
          "$$scope" in e && i(8, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        f,
        c,
        l,
        s,
        function () {
          return c;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(4, c);
          });
        },
      ]
    );
  }
  class Oc extends Pe {
    constructor(e) {
      super(),
        He(this, e, Tc, _c, o, {
          use: 0,
          class: 1,
          variant: 2,
          padded: 3,
          getElement: 7,
        });
    }
    get getElement() {
      return this.$$.ctx[7];
    }
  }
  var Lc = Ht({ class: "smui-card__content", component: ln });
  function wc(e) {
    let t, i, r, o, l, d;
    const h = e[8].default,
      m = c(h, e, e[7], null);
    let g = [
        {
          class: (i = $t({
            [e[1]]: !0,
            "mdc-card__actions": !0,
            "mdc-card__actions--full-bleed": e[2],
          })),
        },
        e[5],
      ],
      $ = {};
    for (let e = 0; e < g.length; e += 1) $ = n($, g[e]);
    return {
      c() {
        (t = D("div")), m && m.c(), H(t, $);
      },
      m(n, i) {
        O(n, t, i),
          m && m.m(t, null),
          e[9](t),
          (o = !0),
          l ||
            ((d = [v((r = xt.call(null, t, e[0]))), v(e[4].call(null, t))]),
            (l = !0));
      },
      p(e, [n]) {
        m &&
          m.p &&
          (!o || 128 & n) &&
          p(m, h, e, e[7], o ? u(h, e[7], n, null) : f(e[7]), null),
          H(
            t,
            ($ = Ne(g, [
              (!o ||
                (6 & n &&
                  i !==
                    (i = $t({
                      [e[1]]: !0,
                      "mdc-card__actions": !0,
                      "mdc-card__actions--full-bleed": e[2],
                    })))) && { class: i },
              32 & n && e[5],
            ]))
          ),
          r && a(r.update) && 1 & n && r.update.call(null, e[0]);
      },
      i(e) {
        o || (Se(m, e), (o = !0));
      },
      o(e) {
        _e(m, e), (o = !1);
      },
      d(n) {
        n && L(t), m && m.d(n), e[9](null), (l = !1), s(d);
      },
    };
  }
  function Dc(e, t, i) {
    const r = ["use", "class", "fullBleed", "getElement"];
    let s = m(t, r),
      { $$slots: a = {}, $$scope: o } = t;
    const l = Et(Z());
    let c,
      { use: d = [] } = t,
      { class: u = "" } = t,
      { fullBleed: p = !1 } = t;
    return (
      ie("SMUI:button:context", "card:action"),
      ie("SMUI:icon-button:context", "card:action"),
      (e.$$set = (e) => {
        (t = n(n({}, t), h(e))),
          i(5, (s = m(t, r))),
          "use" in e && i(0, (d = e.use)),
          "class" in e && i(1, (u = e.class)),
          "fullBleed" in e && i(2, (p = e.fullBleed)),
          "$$scope" in e && i(7, (o = e.$$scope));
      }),
      [
        d,
        u,
        p,
        c,
        l,
        s,
        function () {
          return c;
        },
        o,
        a,
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (c = e), i(3, c);
          });
        },
      ]
    );
  }
  Ht({ class: "mdc-card__media-content", component: ln });
  Ht({ class: "mdc-card__action-buttons", component: ln }),
    Ht({ class: "mdc-card__action-icons", component: ln });
  const Nc = class extends Pe {
    constructor(e) {
      super(),
        He(this, e, Dc, wc, o, {
          use: 0,
          class: 1,
          fullBleed: 2,
          getElement: 6,
        });
    }
    get getElement() {
      return this.$$.ctx[6];
    }
  };
  function Rc(e, t, n) {
    const i = e.slice();
    return (i[16] = t[n]), i;
  }
  function Mc(e) {
    let t;
    return {
      c() {
        t = R("more_vert");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Fc(e) {
    let t;
    return {
      c() {
        t = R("Show more...");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function kc(e) {
    let t, n;
    return (
      (t = new Zs({
        props: { $$slots: { default: [Fc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          524288 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Uc(e) {
    let t;
    return {
      c() {
        t = R("Show all...");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Hc(e) {
    let t, n;
    return (
      (t = new Zs({
        props: { $$slots: { default: [Uc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          524288 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Pc(e) {
    let t, n, i, r;
    return (
      (t = new sa({
        props: { $$slots: { default: [kc] }, $$scope: { ctx: e } },
      })),
      t.$on("SMUI:action", e[10]),
      (i = new sa({
        props: { $$slots: { default: [Hc] }, $$scope: { ctx: e } },
      })),
      i.$on("SMUI:action", e[11]),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          524288 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          524288 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function Bc(e) {
    let t,
      n = e[16].displayName + "";
    return {
      c() {
        t = R(n);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, i) {
        8 & i && n !== (n = e[16].displayName + "") && P(t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Vc(e) {
    let t,
      n = e[16].time ? "Uploaded on " + nd(e[16].time) : "";
    return {
      c() {
        t = R(n);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, i) {
        8 & i &&
          n !== (n = e[16].time ? "Uploaded on " + nd(e[16].time) : "") &&
          P(t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function jc(e) {
    let t, n, i, r;
    return (
      (t = new ea({
        props: { $$slots: { default: [Bc] }, $$scope: { ctx: e } },
      })),
      (i = new ta({
        props: { $$slots: { default: [Vc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          524296 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          524296 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function zc(e) {
    let t, n;
    return (
      (t = new Gl({ props: { checked: e[4].has(e[16].id), value: e[16].id } })),
      t.$on("change", e[8]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          24 & n && (i.checked = e[4].has(e[16].id)),
            8 & n && (i.value = e[16].id),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Gc(e) {
    let t, n, i, r, s;
    return (
      (t = new Zs({
        props: { $$slots: { default: [jc] }, $$scope: { ctx: e } },
      })),
      (i = new ra({
        props: { $$slots: { default: [zc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment), (r = M());
        },
        m(e, a) {
          ke(t, e, a), O(e, n, a), ke(i, e, a), O(e, r, a), (s = !0);
        },
        p(e, n) {
          const r = {};
          524296 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          524312 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          s || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (s = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (s = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e), e && L(r);
        },
      }
    );
  }
  function qc(e, t) {
    let n, i, r;
    return (
      (i = new sa({
        props: { $$slots: { default: [Gc] }, $$scope: { ctx: t } },
      })),
      {
        key: e,
        first: null,
        c() {
          (n = F()), Fe(i.$$.fragment), (this.first = n);
        },
        m(e, t) {
          O(e, n, t), ke(i, e, t), (r = !0);
        },
        p(e, n) {
          t = e;
          const r = {};
          524312 & n && (r.$$scope = { dirty: n, ctx: t }), i.$set(r);
        },
        i(e) {
          r || (Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && L(n), Ue(i, e);
        },
      }
    );
  }
  function Kc(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[3];
    const a = (e) => e[16].id;
    for (let t = 0; t < s.length; t += 1) {
      let n = Rc(e, s, t),
        o = a(n);
      r.set(o, (i[t] = qc(o, n)));
    }
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = F();
      },
      m(e, r) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, r);
        O(e, t, r), (n = !0);
      },
      p(e, n) {
        280 & n &&
          ((s = e[3]),
          xe(),
          (i = De(i, n, a, 1, e, s, r, t.parentNode, Le, qc, t, Rc)),
          Ce());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) Se(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) _e(i[e]);
        n = !1;
      },
      d(e) {
        for (let t = 0; t < i.length; t += 1) i[t].d(e);
        e && L(t);
      },
    };
  }
  function Wc(e) {
    let t,
      n,
      i,
      r,
      s,
      a,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g,
      $,
      I,
      v,
      y = An(e[1]) + "",
      b = e[0].displayName + "",
      E = Math.min(1, e[2]) + "",
      A = e[0].children.length + "";
    return (
      (h = new ds({
        props: {
          class: "material-icons",
          style: "vertical-align: middle; margin: 0; padding: 0;",
          title: "Options",
          $$slots: { default: [Mc] },
          $$scope: { ctx: e },
        },
      })),
      h.$on("click", e[9]),
      (g = new so({
        props: {
          anchorCorner: "BOTTOM_RIGHT",
          $$slots: { default: [Pc] },
          $$scope: { ctx: e },
        },
      })),
      e[12](g),
      (I = new qs({
        props: {
          checkList: !0,
          $$slots: { default: [Kc] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          (t = D("h2")),
            (n = R(y)),
            (i = R("s in ")),
            (r = R(b)),
            (s = M()),
            (a = D("h4")),
            (o = R("Showing ")),
            (l = R(E)),
            (c = R("-")),
            (d = R(e[2])),
            (u = R(" of ")),
            (p = R(A)),
            (f = M()),
            Fe(h.$$.fragment),
            (m = M()),
            Fe(g.$$.fragment),
            ($ = M()),
            Fe(I.$$.fragment),
            U(t, "class", "mdc-typography--headline6"),
            V(t, "margin", "0"),
            U(a, "class", "mdc-typography--subtitle3"),
            V(a, "margin", "0"),
            V(a, "color", "#888"),
            V(a, "text-align", "right");
        },
        m(e, y) {
          O(e, t, y),
            S(t, n),
            S(t, i),
            S(t, r),
            O(e, s, y),
            O(e, a, y),
            S(a, o),
            S(a, l),
            S(a, c),
            S(a, d),
            S(a, u),
            S(a, p),
            S(a, f),
            ke(h, a, null),
            S(a, m),
            ke(g, a, null),
            O(e, $, y),
            ke(I, e, y),
            (v = !0);
        },
        p(e, t) {
          (!v || 2 & t) && y !== (y = An(e[1]) + "") && P(n, y),
            (!v || 1 & t) && b !== (b = e[0].displayName + "") && P(r, b),
            (!v || 4 & t) && E !== (E = Math.min(1, e[2]) + "") && P(l, E),
            (!v || 4 & t) && P(d, e[2]),
            (!v || 1 & t) && A !== (A = e[0].children.length + "") && P(p, A);
          const i = {};
          524288 & t && (i.$$scope = { dirty: t, ctx: e }), h.$set(i);
          const s = {};
          524300 & t && (s.$$scope = { dirty: t, ctx: e }), g.$set(s);
          const a = {};
          524312 & t && (a.$$scope = { dirty: t, ctx: e }), I.$set(a);
        },
        i(e) {
          v ||
            (Se(h.$$.fragment, e),
            Se(g.$$.fragment, e),
            Se(I.$$.fragment, e),
            (v = !0));
        },
        o(e) {
          _e(h.$$.fragment, e),
            _e(g.$$.fragment, e),
            _e(I.$$.fragment, e),
            (v = !1);
        },
        d(n) {
          n && L(t),
            n && L(s),
            n && L(a),
            Ue(h),
            e[12](null),
            Ue(g),
            n && L($),
            Ue(I, n);
        },
      }
    );
  }
  function Xc(e) {
    let t;
    return {
      c() {
        t = R("Upload");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Yc(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Xc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          524288 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Qc(e) {
    let t;
    return {
      c() {
        t = R("Download");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Jc(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Qc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          524288 & n && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Zc(e) {
    let t, n, i, r;
    return (
      (t = new ul({
        props: { $$slots: { default: [Yc] }, $$scope: { ctx: e } },
      })),
      t.$on("click", e[7]),
      (i = new ul({
        props: {
          disabled: 0 == e[4].size,
          $$slots: { default: [Jc] },
          $$scope: { ctx: e },
        },
      })),
      i.$on("click", e[6]),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          524288 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          16 & n && (s.disabled = 0 == e[4].size),
            524288 & n && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function ed(e) {
    let t, n, i, r;
    return (
      (t = new Lc({
        props: { $$slots: { default: [Wc] }, $$scope: { ctx: e } },
      })),
      (i = new Nc({
        props: { $$slots: { default: [Zc] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          524351 & n && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          524304 & n && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function td(e) {
    let t, n, i;
    return (
      (n = new Oc({
        props: { $$slots: { default: [ed] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (t = D("div")),
            Fe(n.$$.fragment),
            V(t, "display", "inline-block"),
            V(t, "vertical-align", "top");
        },
        m(e, r) {
          O(e, t, r), ke(n, t, null), (i = !0);
        },
        p(e, [t]) {
          const i = {};
          524351 & t && (i.$$scope = { dirty: t, ctx: e }), n.$set(i);
        },
        i(e) {
          i || (Se(n.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(n.$$.fragment, e), (i = !1);
        },
        d(e) {
          e && L(t), Ue(n);
        },
      }
    );
  }
  function nd(e) {
    return new Date(e).toLocaleDateString("en-us", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  }
  function id(e, t, n) {
    let i,
      { artifactSet: r } = t,
      { contentType: s = "artifact" } = t,
      a = 10,
      o = [],
      l = new Set();
    const c = ne();
    let d = null;
    function u() {
      if (r && d !== r.hash) {
        const e = r.children.length - a;
        n(3, (o = r.children.slice(e, e + a))),
          console.log({ artifacts: o }),
          n(4, (l = new Set())),
          n(2, (a = Math.min(o.length, 10))),
          (d = r.hash);
      }
    }
    u();
    return (
      (e.$$set = (e) => {
        "artifactSet" in e && n(0, (r = e.artifactSet)),
          "contentType" in e && n(1, (s = e.contentType));
      }),
      (e.$$.update = () => {
        1 & e.$$.dirty && u();
      }),
      [
        r,
        s,
        a,
        o,
        l,
        i,
        async function () {
          c("download", { artifactSet: r, artifactIds: [...l] });
        },
        async function () {
          c("upload", { artifactSet: r });
        },
        function (e) {
          const t = e.target.checked,
            i = e.target.defaultValue;
          t ? l.add(i) : l.delete(i), console.log("selected:", l), n(4, l);
        },
        () => i.setOpen(!0),
        () => n(2, (a = Math.min(o.length, a + 10))),
        () => n(2, (a = o.length)),
        function (e) {
          oe[e ? "unshift" : "push"](() => {
            (i = e), n(5, i);
          });
        },
      ]
    );
  }
  class rd extends Pe {
    constructor(e) {
      super(), He(this, e, id, td, o, { artifactSet: 0, contentType: 1 });
    }
  }
  class sd {
    constructor(e, t) {
      (this.id = e), (this.version = t);
    }
    supports(e) {
      return this.id === e.id && this.version.supports(e.version);
    }
    static from(e) {
      let t;
      if (e.tag) t = new od(e.commit, e.tag);
      else if (e.branch) t = new ld(e.commit, e.branch);
      else {
        if (!e.commit) {
          const t = JSON.stringify(e);
          throw new Error(`Could not find tag, branch, or commit in ${t}`);
        }
        t = new ad(e.commit);
      }
      return new sd(e.id, t);
    }
  }
  class ad {
    constructor(e) {
      this.hash = e;
    }
    supports(e) {
      return e.hash === this.hash;
    }
  }
  class od extends ad {
    constructor(e, t) {
      super(e), (this.version = dd.parse(t));
    }
    supports(e) {
      return e instanceof od
        ? this.version.major === e.version.major && this.version.gte(e.version)
        : super.supports(e);
    }
  }
  class ld extends ad {
    constructor(e, t) {
      super(e), (this.name = t);
    }
    supports(e) {
      return e instanceof ld ? e.name === this.name : super.supports(e);
    }
  }
  class cd extends Error {
    constructor(e) {
      super(`Unable to parse: ${e}`);
    }
  }
  class dd {
    constructor(e, t = 0, n = 0) {
      (this.major = e), (this.minor = t), (this.patch = n);
    }
    gte(e) {
      return (
        !(this.major < e.major) &&
        !(this.minor < e.minor) &&
        !(this.patch < e.patch)
      );
    }
    static parse(e) {
      e = e.replace(/^v?/, "");
      const [t, n = 0, i = 0] = e.split(".").map((t) => {
        if (!/\d+/.test(t)) throw new cd(e);
        return parseInt(t);
      });
      return new dd(t, n, i);
    }
  }
  class ud {
    constructor() {
      this.baseUrl = window.location.href
        .replace("Search", "TagFormat")
        .replace(/static.*$/, "human");
    }
    async toHumanFormat(e) {
      const t = encodeURIComponent(JSON.stringify(e)),
        n = `${this.baseUrl}?tags=${t}`,
        i = await fetch(n);
      if (i.status > 399) throw new pd(await i.text());
      return await i.json();
    }
  }
  class pd extends Error {}
  class fd {
    constructor() {
      const e = window.location.href.split("/");
      e.pop(), e.pop(), (this.baseUrl = e.join("/") + "/artifacts/");
    }
    async listArtifacts() {
      const e = (await this._fetchJson(this.baseUrl)).mapError(
        (e) => new gd(e.message)
      );
      return En(await e.unwrap(), (e) =>
        class {
          static tryFrom(e) {
            if (e.displayName) {
              const t = [e.id, ...e.children.map((e) => e.id).sort()].join("/");
              return (
                (e.hash = t),
                (e.children = e.children.map(
                  (e) => (e.taxonomy && (e.taxonomy = sd.from(e.taxonomy)), e)
                )),
                e
              );
            }
            console.log("Found malformed data. Filtering out. Data:", e);
          }
        }.tryFrom(e)
      );
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
        .mapError((e) => new Id(e.message))
        .unwrap();
    }
    async appendArtifact(e, t, n) {
      console.log({ action: "append", metadata: t, files: n });
      const i = (function (e) {
          return (
            e.children.sort((e, t) =>
              e.time === t.time
                ? e.displayName < t.displayName
                  ? -1
                  : 1
                : e.time < t.time
                ? -1
                : 1
            ),
            e.children[e.children.length - 1]
          );
        })(e),
        r = i && i.id,
        s = r ? "?lastId=" + encodeURIComponent(r) : "",
        a = this.baseUrl + e.id + "/uploadUrl" + s,
        o = n.map((e) => e.name),
        l = {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ metadata: t, filenames: o }),
        },
        c = (
          await (await this._fetchJson(a, l))
            .mapError((e) => new Id(e.message))
            .unwrap()
        ).map(async (e) => {
          const t = e.name.substring(4),
            i = n.find((e) => e.name == t);
          !(function (e, t) {
            if (!e) throw t;
          })(!!i, new Id("Could not find upload URL for " + t)),
            await this.pushArtifact(i, e.sasUrl);
        });
      await Promise.all(c), console.log("Append artifact:", t, n);
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
        .mapError((e) => new $d(e.message))
        .unwrap();
    }
    async _fetch(e, t = null) {
      const n = await fetch(e, t);
      let i = null;
      return n.status > 399 && (i = new hd(await n.text())), new bn(n, i);
    }
    async _fetchJson(e, t = null) {
      return (await this._fetch(e, t)).map((e) => e.json());
    }
  }
  class hd extends Error {
    constructor(e) {
      super(e);
    }
  }
  class md extends hd {
    constructor(e, t) {
      super(`Unable to ${e}: ${t}`);
    }
  }
  class gd extends md {
    constructor(e) {
      super("list artifacts", e);
    }
  }
  class $d extends md {
    constructor(e) {
      super("create", e);
    }
  }
  class Id extends md {
    constructor(e) {
      super("append", e);
    }
  }
  function vd(e, t, n) {
    const i = e.slice();
    return (i[64] = t[n]), i;
  }
  function yd(e, t, n) {
    const i = e.slice();
    return (i[70] = t[n]), i;
  }
  function bd(e) {
    let t,
      n,
      i = (e[9] && e[9].displayName) + "";
    return {
      c() {
        (t = R("Append data to ")), (n = R(i));
      },
      m(e, i) {
        O(e, t, i), O(e, n, i);
      },
      p(e, t) {
        512 & t[0] && i !== (i = (e[9] && e[9].displayName) + "") && P(n, i);
      },
      d(e) {
        e && L(t), e && L(n);
      },
    };
  }
  function Ed(e) {
    let t,
      n,
      i = e[70].name + "";
    return {
      c() {
        (t = D("li")), (n = R(i)), U(t, "class", "svelte-z7sp86");
      },
      m(e, i) {
        O(e, t, i), S(t, n);
      },
      p(e, t) {
        256 & t[0] && i !== (i = e[70].name + "") && P(n, i);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Ad(t) {
    let n;
    return {
      c() {
        (n = D("p")),
          (n.textContent = "Select dataset to upload."),
          U(n, "class", "svelte-z7sp86");
      },
      m(e, t) {
        O(e, n, t);
      },
      p: e,
      d(e) {
        e && L(n);
      },
    };
  }
  function xd(t) {
    let n;
    return {
      c() {
        (n = D("p")),
          (n.textContent = "Select tags file for dataset."),
          U(n, "class", "svelte-z7sp86");
      },
      m(e, t) {
        O(e, n, t);
      },
      p: e,
      d(e) {
        e && L(n);
      },
    };
  }
  function Cd(e) {
    let t,
      n,
      i,
      r,
      s,
      a,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g,
      $,
      I,
      v,
      y,
      b,
      E,
      A,
      x,
      C = (e[10] ? e[10].taxonomyTags.map(ru).join(", ") : "") + "";
    function _(t) {
      e[23](t);
    }
    let T = { label: "Name" };
    void 0 !== e[11] && (T.value = e[11]),
      (t = new ts({ props: T })),
      oe.push(() => Me(t, "value", _));
    let N = e[8],
      F = [];
    for (let t = 0; t < N.length; t += 1) F[t] = Ed(yd(e, N, t));
    return (
      (d = new kl({
        props: {
          multiple: !0,
          $$slots: { default: [Ad] },
          $$scope: { ctx: e },
        },
      })),
      d.$on("drop", e[17]),
      (y = new kl({
        props: {
          accept: ".json",
          $$slots: { default: [xd] },
          $$scope: { ctx: e },
        },
      })),
      y.$on("drop", e[18]),
      {
        c() {
          Fe(t.$$.fragment),
            (i = M()),
            (r = D("p")),
            (s = R(e[0])),
            (a = R(" file(s):")),
            (o = M()),
            (l = D("ul"));
          for (let e = 0; e < F.length; e += 1) F[e].c();
          (c = M()),
            Fe(d.$$.fragment),
            (u = M()),
            (p = D("p")),
            (f = R("Taxonomy Terms ")),
            (h = D("span")),
            (h.textContent = "(optional)"),
            (m = R(":")),
            (g = D("br")),
            ($ = M()),
            (I = R(C)),
            (v = M()),
            Fe(y.$$.fragment),
            (b = M()),
            (E = D("a")),
            (A = R("Click to select tags for your dataset.")),
            U(r, "class", "svelte-z7sp86"),
            U(l, "class", "svelte-z7sp86"),
            V(h, "font-style", "italic"),
            U(h, "class", "svelte-z7sp86"),
            U(g, "class", "svelte-z7sp86"),
            U(p, "class", "svelte-z7sp86"),
            U(E, "target", "_blank"),
            U(
              E,
              "href",
              window.location.href.replace("/Search/", "/TagCreator/")
            ),
            U(E, "class", "svelte-z7sp86");
        },
        m(e, n) {
          ke(t, e, n),
            O(e, i, n),
            O(e, r, n),
            S(r, s),
            S(r, a),
            O(e, o, n),
            O(e, l, n);
          for (let e = 0; e < F.length; e += 1) F[e].m(l, null);
          O(e, c, n),
            ke(d, e, n),
            O(e, u, n),
            O(e, p, n),
            S(p, f),
            S(p, h),
            S(p, m),
            S(p, g),
            S(p, $),
            S(p, I),
            O(e, v, n),
            ke(y, e, n),
            O(e, b, n),
            O(e, E, n),
            S(E, A),
            (x = !0);
        },
        p(e, i) {
          const r = {};
          if (
            (!n &&
              2048 & i[0] &&
              ((n = !0), (r.value = e[11]), he(() => (n = !1))),
            t.$set(r),
            (!x || 1 & i[0]) && P(s, e[0]),
            256 & i[0])
          ) {
            let t;
            for (N = e[8], t = 0; t < N.length; t += 1) {
              const n = yd(e, N, t);
              F[t] ? F[t].p(n, i) : ((F[t] = Ed(n)), F[t].c(), F[t].m(l, null));
            }
            for (; t < F.length; t += 1) F[t].d(1);
            F.length = N.length;
          }
          const a = {};
          2048 & i[2] && (a.$$scope = { dirty: i, ctx: e }),
            d.$set(a),
            (!x || 1024 & i[0]) &&
              C !==
                (C =
                  (e[10] ? e[10].taxonomyTags.map(ru).join(", ") : "") + "") &&
              P(I, C);
          const o = {};
          2048 & i[2] && (o.$$scope = { dirty: i, ctx: e }), y.$set(o);
        },
        i(e) {
          x ||
            (Se(t.$$.fragment, e),
            Se(d.$$.fragment, e),
            Se(y.$$.fragment, e),
            (x = !0));
        },
        o(e) {
          _e(t.$$.fragment, e),
            _e(d.$$.fragment, e),
            _e(y.$$.fragment, e),
            (x = !1);
        },
        d(e) {
          Ue(t, e),
            e && L(i),
            e && L(r),
            e && L(o),
            e && L(l),
            w(F, e),
            e && L(c),
            Ue(d, e),
            e && L(u),
            e && L(p),
            e && L(v),
            Ue(y, e),
            e && L(b),
            e && L(E);
        },
      }
    );
  }
  function Sd(e) {
    let t;
    return {
      c() {
        t = R("Cancel");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function _d(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Sd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Td(e) {
    let t;
    return {
      c() {
        t = R("Upload");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Od(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Td] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Ld(e) {
    let t, n, i, r;
    return (
      (t = new ul({
        props: { $$slots: { default: [_d] }, $$scope: { ctx: e } },
      })),
      (i = new ul({
        props: { $$slots: { default: [Od] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[24]),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          2048 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          2048 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function wd(e) {
    let t, n, i, r, s, a;
    return (
      (t = new il({
        props: { id: "title", $$slots: { default: [bd] }, $$scope: { ctx: e } },
      })),
      (i = new rl({
        props: {
          id: "content",
          $$slots: { default: [Cd] },
          $$scope: { ctx: e },
        },
      })),
      (s = new sl({
        props: { $$slots: { default: [Ld] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment),
            (n = M()),
            Fe(i.$$.fragment),
            (r = M()),
            Fe(s.$$.fragment);
        },
        m(e, o) {
          ke(t, e, o),
            O(e, n, o),
            ke(i, e, o),
            O(e, r, o),
            ke(s, e, o),
            (a = !0);
        },
        p(e, n) {
          const r = {};
          (512 & n[0]) | (2048 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            t.$set(r);
          const a = {};
          (3329 & n[0]) | (2048 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            i.$set(a);
          const o = {};
          2048 & n[2] && (o.$$scope = { dirty: n, ctx: e }), s.$set(o);
        },
        i(e) {
          a ||
            (Se(t.$$.fragment, e),
            Se(i.$$.fragment, e),
            Se(s.$$.fragment, e),
            (a = !0));
        },
        o(e) {
          _e(t.$$.fragment, e),
            _e(i.$$.fragment, e),
            _e(s.$$.fragment, e),
            (a = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e), e && L(r), Ue(s, e);
        },
      }
    );
  }
  function Dd(e) {
    let t;
    return {
      c() {
        t = R("Create new dataset");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Nd(e) {
    let t, n, i;
    function r(t) {
      e[26](t);
    }
    let s = { label: "Name" };
    return (
      void 0 !== e[13] && (s.value = e[13]),
      (t = new ts({ props: s })),
      oe.push(() => Me(t, "value", r)),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (i = !0);
        },
        p(e, i) {
          const r = {};
          !n &&
            8192 & i[0] &&
            ((n = !0), (r.value = e[13]), he(() => (n = !1))),
            t.$set(r);
        },
        i(e) {
          i || (Se(t.$$.fragment, e), (i = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (i = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Rd(e) {
    let t;
    return {
      c() {
        t = R("Cancel");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Md(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Rd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Fd(e) {
    let t;
    return {
      c() {
        t = R("Submit");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function kd(e) {
    let t, n;
    return (
      (t = new Oi({
        props: { $$slots: { default: [Fd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          2048 & n[2] && (i.$$scope = { dirty: n, ctx: e }), t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Ud(e) {
    let t, n, i, r;
    return (
      (t = new ul({
        props: { $$slots: { default: [Md] }, $$scope: { ctx: e } },
      })),
      (i = new ul({
        props: { $$slots: { default: [kd] }, $$scope: { ctx: e } },
      })),
      i.$on("click", e[27]),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          2048 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          2048 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function Hd(e) {
    let t, n, i, r, s, a;
    return (
      (t = new il({
        props: { id: "title", $$slots: { default: [Dd] }, $$scope: { ctx: e } },
      })),
      (i = new rl({
        props: {
          id: "content",
          $$slots: { default: [Nd] },
          $$scope: { ctx: e },
        },
      })),
      (s = new sl({
        props: { $$slots: { default: [Ud] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment),
            (n = M()),
            Fe(i.$$.fragment),
            (r = M()),
            Fe(s.$$.fragment);
        },
        m(e, o) {
          ke(t, e, o),
            O(e, n, o),
            ke(i, e, o),
            O(e, r, o),
            ke(s, e, o),
            (a = !0);
        },
        p(e, n) {
          const r = {};
          2048 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const a = {};
          (8192 & n[0]) | (2048 & n[2]) && (a.$$scope = { dirty: n, ctx: e }),
            i.$set(a);
          const o = {};
          2048 & n[2] && (o.$$scope = { dirty: n, ctx: e }), s.$set(o);
        },
        i(e) {
          a ||
            (Se(t.$$.fragment, e),
            Se(i.$$.fragment, e),
            Se(s.$$.fragment, e),
            (a = !0));
        },
        o(e) {
          _e(t.$$.fragment, e),
            _e(i.$$.fragment, e),
            _e(s.$$.fragment, e),
            (a = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e), e && L(r), Ue(s, e);
        },
      }
    );
  }
  function Pd(e) {
    let t;
    return {
      c() {
        t = R(e[4]);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, n) {
        16 & n[0] && P(t, e[4]);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Bd(e) {
    let t, n;
    return (
      (t = new vn({
        props: { $$slots: { default: [Pd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (16 & n[0]) | (2048 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Vd(e) {
    let t;
    return {
      c() {
        t = R("file_upload");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function jd(e) {
    let t;
    return {
      c() {
        t = R("open_in_new");
      },
      m(e, n) {
        O(e, t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function zd(e) {
    let t, n, i, r;
    return (
      (t = new ds({
        props: {
          class: "material-icons",
          "aria-label": "Upload dataset",
          ripple: !1,
          $$slots: { default: [Vd] },
          $$scope: { ctx: e },
        },
      })),
      t.$on("click", e[29]),
      (i = new ds({
        props: {
          class: "material-icons",
          "aria-label": "Edit taxonomy",
          ripple: !1,
          $$slots: { default: [jd] },
          $$scope: { ctx: e },
        },
      })),
      i.$on("click", e[22]),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          2048 & n[2] && (r.$$scope = { dirty: n, ctx: e }), t.$set(r);
          const s = {};
          2048 & n[2] && (s.$$scope = { dirty: n, ctx: e }), i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function Gd(e) {
    let t, n, i, r;
    return (
      (t = new yn({
        props: { $$slots: { default: [Bd] }, $$scope: { ctx: e } },
      })),
      (i = new yn({
        props: {
          align: "end",
          toolbar: !0,
          $$slots: { default: [zd] },
          $$scope: { ctx: e },
        },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const r = {};
          (16 & n[0]) | (2048 & n[2]) && (r.$$scope = { dirty: n, ctx: e }),
            t.$set(r);
          const s = {};
          (4096 & n[0]) | (2048 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            i.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function qd(e) {
    let t, n;
    return (
      (t = new gn({
        props: { $$slots: { default: [Gd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (4112 & n[0]) | (2048 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Kd(e) {
    let t, n;
    return (
      (t = new wa({ props: { indeterminate: !0 } })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Wd(e) {
    let t, n, i, r, s, a, o;
    function l(t) {
      e[30](t);
    }
    let c = { label: "Search..." };
    return (
      void 0 !== e[2] && (c.value = e[2]),
      (t = new ts({ props: c })),
      oe.push(() => Me(t, "value", l)),
      (a = new Sc({ props: { trees: e[5] } })),
      a.$on("change", e[31]),
      {
        c() {
          Fe(t.$$.fragment),
            (i = M()),
            (r = D("span")),
            (r.textContent = "Advanced Filters"),
            (s = M()),
            Fe(a.$$.fragment),
            U(r, "class", "filter-header svelte-z7sp86");
        },
        m(e, n) {
          ke(t, e, n),
            O(e, i, n),
            O(e, r, n),
            O(e, s, n),
            ke(a, e, n),
            (o = !0);
        },
        p(e, i) {
          const r = {};
          !n && 4 & i[0] && ((n = !0), (r.value = e[2]), he(() => (n = !1))),
            t.$set(r);
          const s = {};
          32 & i[0] && (s.trees = e[5]), a.$set(s);
        },
        i(e) {
          o || (Se(t.$$.fragment, e), Se(a.$$.fragment, e), (o = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(a.$$.fragment, e), (o = !1);
        },
        d(e) {
          Ue(t, e), e && L(i), e && L(r), e && L(s), Ue(a, e);
        },
      }
    );
  }
  function Xd(e) {
    let t, n;
    return (
      (t = new ma({
        props: { $$slots: { default: [Wd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, i) {
          ke(t, e, i), (n = !0);
        },
        p(e, n) {
          const i = {};
          (44 & n[0]) | (2048 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          n || (Se(t.$$.fragment, e), (n = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (n = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function Yd(e) {
    let t,
      n = e[64].displayName + "";
    return {
      c() {
        t = R(n);
      },
      m(e, n) {
        O(e, t, n);
      },
      p(e, i) {
        2 & i[0] && n !== (n = e[64].displayName + "") && P(t, n);
      },
      d(e) {
        e && L(t);
      },
    };
  }
  function Qd(e) {
    let t, n, i, r;
    return (
      (t = new ea({
        props: { $$slots: { default: [Yd] }, $$scope: { ctx: e } },
      })),
      (i = new ta({})),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), Fe(i.$$.fragment);
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), ke(i, e, s), (r = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (2048 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), Ue(i, e);
        },
      }
    );
  }
  function Jd(e) {
    let t, n, i, r;
    return (
      (t = new Zs({
        props: { $$slots: { default: [Qd] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          Fe(t.$$.fragment), (n = M()), (i = M());
        },
        m(e, s) {
          ke(t, e, s), O(e, n, s), O(e, i, s), (r = !0);
        },
        p(e, n) {
          const i = {};
          (2 & n[0]) | (2048 & n[2]) && (i.$$scope = { dirty: n, ctx: e }),
            t.$set(i);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e), e && L(n), e && L(i);
        },
      }
    );
  }
  function Zd(e, t) {
    let n, i, r;
    return (
      (i = new sa({
        props: { $$slots: { default: [Jd] }, $$scope: { ctx: t } },
      })),
      i.$on("SMUI:action", function () {
        return t[32](t[64]);
      }),
      {
        key: e,
        first: null,
        c() {
          (n = F()), Fe(i.$$.fragment), (this.first = n);
        },
        m(e, t) {
          O(e, n, t), ke(i, e, t), (r = !0);
        },
        p(e, n) {
          t = e;
          const r = {};
          (2 & n[0]) | (2048 & n[2]) && (r.$$scope = { dirty: n, ctx: t }),
            i.$set(r);
        },
        i(e) {
          r || (Se(i.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(i.$$.fragment, e), (r = !1);
        },
        d(e) {
          e && L(n), Ue(i, e);
        },
      }
    );
  }
  function eu(e) {
    let t,
      n,
      i = [],
      r = new Map(),
      s = e[1];
    const a = (e) => e[64].hash;
    for (let t = 0; t < s.length; t += 1) {
      let n = vd(e, s, t),
        o = a(n);
      r.set(o, (i[t] = Zd(o, n)));
    }
    return {
      c() {
        for (let e = 0; e < i.length; e += 1) i[e].c();
        t = F();
      },
      m(e, r) {
        for (let t = 0; t < i.length; t += 1) i[t].m(e, r);
        O(e, t, r), (n = !0);
      },
      p(e, n) {
        32770 & n[0] &&
          ((s = e[1]),
          xe(),
          (i = De(i, n, a, 1, e, s, r, t.parentNode, Le, Zd, t, vd)),
          Ce());
      },
      i(e) {
        if (!n) {
          for (let e = 0; e < s.length; e += 1) Se(i[e]);
          n = !0;
        }
      },
      o(e) {
        for (let e = 0; e < i.length; e += 1) _e(i[e]);
        n = !1;
      },
      d(e) {
        for (let t = 0; t < i.length; t += 1) i[t].d(e);
        e && L(t);
      },
    };
  }
  function tu(e) {
    let t, n, i, r;
    function s(t) {
      e[33](t);
    }
    function a(t) {
      e[34](t);
    }
    let o = {};
    return (
      void 0 !== e[14] && (o.artifactSet = e[14]),
      void 0 !== e[0] && (o.contentType = e[0]),
      (t = new rd({ props: o })),
      oe.push(() => Me(t, "artifactSet", s)),
      oe.push(() => Me(t, "contentType", a)),
      t.$on("download", e[35]),
      t.$on("upload", e[36]),
      {
        c() {
          Fe(t.$$.fragment);
        },
        m(e, n) {
          ke(t, e, n), (r = !0);
        },
        p(e, r) {
          const s = {};
          !n &&
            16384 & r[0] &&
            ((n = !0), (s.artifactSet = e[14]), he(() => (n = !1))),
            !i &&
              1 & r[0] &&
              ((i = !0), (s.contentType = e[0]), he(() => (i = !1))),
            t.$set(s);
        },
        i(e) {
          r || (Se(t.$$.fragment, e), (r = !0));
        },
        o(e) {
          _e(t.$$.fragment, e), (r = !1);
        },
        d(e) {
          Ue(t, e);
        },
      }
    );
  }
  function nu(e) {
    let t, n, i, r, s;
    n = new qs({
      props: {
        twoLine: !0,
        avatarList: !0,
        $$slots: { default: [eu] },
        $$scope: { ctx: e },
      },
    });
    let a = e[14] && tu(e);
    return {
      c() {
        (t = D("main")),
          Fe(n.$$.fragment),
          (i = M()),
          a && a.c(),
          (r = F()),
          V(t, "display", "inline-block"),
          V(t, "vertical-align", "top"),
          U(t, "class", "svelte-z7sp86");
      },
      m(e, o) {
        O(e, t, o),
          ke(n, t, null),
          O(e, i, o),
          a && a.m(e, o),
          O(e, r, o),
          (s = !0);
      },
      p(e, t) {
        const i = {};
        (2 & t[0]) | (2048 & t[2]) && (i.$$scope = { dirty: t, ctx: e }),
          n.$set(i),
          e[14]
            ? a
              ? (a.p(e, t), 16384 & t[0] && Se(a, 1))
              : ((a = tu(e)), a.c(), Se(a, 1), a.m(r.parentNode, r))
            : a &&
              (xe(),
              _e(a, 1, 1, () => {
                a = null;
              }),
              Ce());
      },
      i(e) {
        s || (Se(n.$$.fragment, e), Se(a), (s = !0));
      },
      o(e) {
        _e(n.$$.fragment, e), _e(a), (s = !1);
      },
      d(e) {
        e && L(t), Ue(n), e && L(i), a && a.d(e), e && L(r);
      },
    };
  }
  function iu(e) {
    let t,
      n,
      i,
      r,
      s,
      a,
      o,
      l,
      c,
      d,
      u,
      p,
      f,
      h,
      m,
      g,
      $,
      I,
      v,
      y,
      b,
      E,
      A,
      x,
      C,
      _;
    function T(t) {
      e[25](t);
    }
    document.title = t = e[4];
    let w = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [wd] },
      $$scope: { ctx: e },
    };
    function N(t) {
      e[28](t);
    }
    void 0 !== e[7] && (w.open = e[7]),
      (i = new nl({ props: w })),
      oe.push(() => Me(i, "open", T));
    let R = {
      "aria-labelledby": "title",
      "aria-describedby": "content",
      $$slots: { default: [Hd] },
      $$scope: { ctx: e },
    };
    void 0 !== e[12] && (R.open = e[12]),
      (a = new nl({ props: R })),
      oe.push(() => Me(a, "open", N)),
      (c = new Ot({
        props: {
          variant: "static",
          $$slots: { default: [qd] },
          $$scope: { ctx: e },
        },
      }));
    let F = e[6] && Kd();
    return (
      (p = new Os({ props: { options: { classes: ["log"] } } })),
      (m = new fa({
        props: {
          style: "width: 360px",
          $$slots: { default: [Xd] },
          $$scope: { ctx: e },
        },
      })),
      ($ = new ha({
        props: { $$slots: { default: [nu] }, $$scope: { ctx: e } },
      })),
      {
        c() {
          (n = M()),
            Fe(i.$$.fragment),
            (s = M()),
            Fe(a.$$.fragment),
            (l = M()),
            Fe(c.$$.fragment),
            (d = M()),
            F && F.c(),
            (u = M()),
            Fe(p.$$.fragment),
            (f = M()),
            (h = D("div")),
            Fe(m.$$.fragment),
            (g = M()),
            Fe($.$$.fragment),
            (I = M()),
            (v = D("link")),
            (y = M()),
            (b = D("link")),
            (E = M()),
            (A = D("link")),
            (x = M()),
            (C = D("link")),
            U(h, "class", "drawer-container svelte-z7sp86"),
            U(v, "rel", "stylesheet"),
            U(
              v,
              "href",
              "https://fonts.googleapis.com/icon?family=Material+Icons"
            ),
            U(v, "class", "svelte-z7sp86"),
            U(b, "rel", "stylesheet"),
            U(
              b,
              "href",
              "https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
            ),
            U(b, "class", "svelte-z7sp86"),
            U(A, "rel", "stylesheet"),
            U(A, "href", "https://fonts.googleapis.com/css?family=Roboto+Mono"),
            U(A, "class", "svelte-z7sp86"),
            U(C, "rel", "stylesheet"),
            U(C, "href", "build/smui.css"),
            U(C, "class", "svelte-z7sp86");
        },
        m(e, t) {
          O(e, n, t),
            ke(i, e, t),
            O(e, s, t),
            ke(a, e, t),
            O(e, l, t),
            ke(c, e, t),
            O(e, d, t),
            F && F.m(e, t),
            O(e, u, t),
            ke(p, e, t),
            O(e, f, t),
            O(e, h, t),
            ke(m, h, null),
            S(h, g),
            ke($, h, null),
            O(e, I, t),
            O(e, v, t),
            O(e, y, t),
            O(e, b, t),
            O(e, E, t),
            O(e, A, t),
            O(e, x, t),
            O(e, C, t),
            (_ = !0);
        },
        p(e, n) {
          (!_ || 16 & n[0]) && t !== (t = e[4]) && (document.title = t);
          const s = {};
          (3841 & n[0]) | (2048 & n[2]) && (s.$$scope = { dirty: n, ctx: e }),
            !r && 128 & n[0] && ((r = !0), (s.open = e[7]), he(() => (r = !1))),
            i.$set(s);
          const l = {};
          (8192 & n[0]) | (2048 & n[2]) && (l.$$scope = { dirty: n, ctx: e }),
            !o &&
              4096 & n[0] &&
              ((o = !0), (l.open = e[12]), he(() => (o = !1))),
            a.$set(l);
          const d = {};
          (4112 & n[0]) | (2048 & n[2]) && (d.$$scope = { dirty: n, ctx: e }),
            c.$set(d),
            e[6]
              ? F
                ? 64 & n[0] && Se(F, 1)
                : ((F = Kd()), F.c(), Se(F, 1), F.m(u.parentNode, u))
              : F &&
                (xe(),
                _e(F, 1, 1, () => {
                  F = null;
                }),
                Ce());
          const p = {};
          (44 & n[0]) | (2048 & n[2]) && (p.$$scope = { dirty: n, ctx: e }),
            m.$set(p);
          const f = {};
          (16387 & n[0]) | (2048 & n[2]) && (f.$$scope = { dirty: n, ctx: e }),
            $.$set(f);
        },
        i(e) {
          _ ||
            (Se(i.$$.fragment, e),
            Se(a.$$.fragment, e),
            Se(c.$$.fragment, e),
            Se(F),
            Se(p.$$.fragment, e),
            Se(m.$$.fragment, e),
            Se($.$$.fragment, e),
            (_ = !0));
        },
        o(e) {
          _e(i.$$.fragment, e),
            _e(a.$$.fragment, e),
            _e(c.$$.fragment, e),
            _e(F),
            _e(p.$$.fragment, e),
            _e(m.$$.fragment, e),
            _e($.$$.fragment, e),
            (_ = !1);
        },
        d(e) {
          e && L(n),
            Ue(i, e),
            e && L(s),
            Ue(a, e),
            e && L(l),
            Ue(c, e),
            e && L(d),
            F && F.d(e),
            e && L(u),
            Ue(p, e),
            e && L(f),
            e && L(h),
            Ue(m),
            Ue($),
            e && L(I),
            e && L(v),
            e && L(y),
            e && L(b),
            e && L(E),
            e && L(A),
            e && L(x),
            e && L(C);
        },
      }
    );
  }
  const ru = (e) => e.Tag;
  function su(e, t, n) {
    let i,
      r = "Data",
      s = [];
    const a = new fd();
    let o = [],
      l = [];
    const c = new URLSearchParams(location.search);
    let d = c.get("searchQuery") || "",
      u = [];
    function p(e, t) {
      n(
        1,
        (l = o.filter((n) =>
          ((n) => {
            const { displayName: i, taxonomyTags: r } = n;
            return (
              !!t.every((e) => !!r.find((t) => e.isMatch(t))) &&
              (!e || i.toLowerCase().includes(e.toLowerCase()))
            );
          })(n)
        ))
      );
      const i = new URLSearchParams();
      i.set("searchQuery", e);
      const r = t.map((e) => e.lean());
      i.set("filterTags", JSON.stringify(r)),
        (function (e) {
          const t = new URLSearchParams(location.search);
          [...e.entries()].forEach(([e, n]) => t.set(e, n)),
            window.history.replaceState(
              {},
              "",
              `${location.pathname}?${t.toString()}`
            );
        })(i);
    }
    function f(e) {
      gs.push(e, { classes: ["warn"] });
    }
    function h(e) {
      gs.push(e, { classes: ["info"] });
    }
    let m,
      g,
      $ = !1;
    async function I() {
      n(6, ($ = !0));
      try {
        console.log({ currentTaxonomy: g }),
          (o = await a.listArtifacts()),
          o.forEach((e) => {
            const t = e.children.filter((e) => {
              if (e.taxonomy)
                return (
                  console.log(
                    g,
                    ".supports(",
                    e.taxonomy,
                    ")",
                    g.supports(e.taxonomy)
                  ),
                  g.supports(e.taxonomy)
                );
            });
            console.log(
              e.id,
              ":",
              e.children.map((e) => e.taxonomy)
            ),
              (e.children = t);
          });
      } catch (e) {
        if (
          (f(
            e instanceof hd
              ? e.message
              : "An error occurred. Please try again later"
          ),
          !(e instanceof hd))
        )
          throw e;
      }
      n(6, ($ = !1)), console.log({ allItems: o }), p(d, u);
    }
    class v extends class {
      constructor(e, t) {
        (this.type = e), (this.data = t);
      }
    } {
      constructor(e) {
        super("ItemSelected", e);
      }
    }
    const y = [];
    let b;
    function E(e) {
      console.log("onItemClicked", e),
        (b = e),
        y.forEach(([t, n]) => t.postMessage(new v(e), n)),
        n(14, (M = e));
    }
    window.addEventListener(
      "message",
      function (e) {
        const { data: t } = e;
        "subscribe" === t.type &&
          (y.push([e.source, e.origin]),
          b && e.source.postMessage(new v(b), e.origin));
      },
      !1
    ),
      (async function () {
        (m = await (async function () {
          const e = window.location.href.split("/");
          e.pop(), e.pop();
          const t = e.join("/") + "/configuration.json";
          try {
            const e = await fetch(t);
            return await e.json();
          } catch (e) {
            throw (
              (f(
                "An error occurred. Please double check the URL and try again."
              ),
              e)
            );
          }
        })()),
          (g = sd.from(m.project));
        const e = Ve.fromDict(m.taxonomy);
        n(
          5,
          (s = (function (e) {
            let t = [e];
            for (; 1 === t.length; ) t = t[0].children;
            return t;
          })(e))
        ),
          n(
            3,
            (u = (function (e) {
              if (e)
                return En(JSON.parse(e), (e) => {
                  const t = s.reduce((t, n) => t || n.findPath(e.id), null);
                  if (!t) return void console.warn("Could not find tag for", e);
                  const n = t.pop();
                  return (
                    (n.value = e.value),
                    n.select(),
                    t.forEach((e) => e.expand()),
                    n
                  );
                });
              return [];
            })(c.get("filterTags")))
          ),
          n(0, (r = m.name)),
          I();
      })();
    let A,
      x,
      C = !1,
      S = [],
      _ = "",
      T = new ud();
    async function O(e) {
      n(9, (A = e)), n(11, (_ = A.displayName));
      try {
        n(10, (x = { taxonomyTags: await T.toHumanFormat(A.taxonomyTags) }));
      } catch (e) {
        e instanceof pd
          ? console.warn(
              "Latest artifact has invalid taxonomy tags:",
              e.message
            )
          : console.error(
              "An error occurred while setting default tags",
              e.stack
            );
      }
      n(7, (C = !0));
    }
    async function L() {
      if (!S) return f(`${r} file required.`);
      const e = x;
      e.displayName = _;
      const t = (function (e, t = 6e4) {
        return gs.push(e, { classes: ["info"], dismissable: !1, duration: t });
      })("Upload in progress");
      try {
        await a.appendArtifact(A, e, S), h("Upload complete!"), I();
      } catch (e) {
        console.log(e), f(`Unable to upload: ${e.message}`);
      }
      var n;
      (n = t), gs.pop(n);
    }
    var w;
    let D =
        "create" ===
        ((w = window.location.href),
        Object.fromEntries(
          (w.split("?")[1] || "").split("&").map((e) => e.split("="))
        )).action,
      N = [];
    async function R() {
      await a.createArtifact({ displayName: F }, N),
        f("Submitted creation request.");
    }
    let M,
      F = "";
    async function k(e) {
      const { artifactSet: t, artifactIds: n } = e;
      try {
        if (0 === n.length) return f("Nothing to download: No data found.");
        h(`Downloading ${n.length} from ${t.displayName}...`);
        xn(await a.getDownloadUrl(t.id, ...n));
      } catch (e) {
        return f(e.message);
      }
    }
    return (
      (e.$$.update = () => {
        1 & e.$$.dirty[0] && n(4, (i = `${r} Dashboard`)),
          12 & e.$$.dirty[0] && p(d, u),
          e.$$.dirty[0];
      }),
      [
        r,
        l,
        d,
        u,
        i,
        s,
        $,
        C,
        S,
        A,
        x,
        _,
        D,
        F,
        M,
        E,
        O,
        function (e) {
          const { acceptedFiles: t } = e.detail;
          t.length && n(8, (S = t));
        },
        async function (e) {
          const [t] = e.detail.acceptedFiles;
          t &&
            n(
              10,
              (x = JSON.parse(
                await (async function (e) {
                  return new Promise((t, n) => {
                    const i = new FileReader();
                    (i.onload = () =>
                      i.error
                        ? (console.log("error:", i.error), n(i.error))
                        : t(i.result)),
                      i.readAsText(e);
                  });
                })(t)
              ))
            );
        },
        L,
        R,
        k,
        function () {
          var e;
          xn(
            window.location.href.replace(/routers\/Search.*/, "") +
              "?" +
              ((e = {
                project: m.project.id,
                commit: m.project.commit,
                node: m.contentTypePath,
              }),
              Object.entries(e)
                .map(([e, t]) => `${e}=${encodeURIComponent(t)}`)
                .join("&"))
          );
        },
        function (e) {
          (_ = e), n(11, _);
        },
        () => L(),
        function (e) {
          (C = e), n(7, C);
        },
        function (e) {
          (F = e), n(13, F);
        },
        () => R(),
        function (e) {
          (D = e), n(12, D);
        },
        () => n(12, (D = !0)),
        function (e) {
          (d = e), n(2, d);
        },
        (e) => n(3, (u = e.detail.filterTags.map(Ve.fromDict))),
        (e) => E(e),
        function (e) {
          (M = e), n(14, M);
        },
        function (e) {
          (r = e), n(0, r);
        },
        (e) => k(e.detail),
        (e) => O(e.detail.artifactSet),
      ]
    );
  }
  return new (class extends Pe {
    constructor(e) {
      super(), He(this, e, su, iu, o, {}, null, [-1, -1, -1]);
    }
  })({ target: document.body, props: { name: "world" } });
})();
//# sourceMappingURL=bundle.js.map
