window.XInstall = function (win, doc, xhr) {
    var VERSION = "1.0.1", ua = navigator.userAgent,
        isIos = -1 < ua.indexOf("iPhone") || -1 < ua.indexOf("iPad") || -1 < ua.indexOf("iPod"),
        isAd = -1 < ua.indexOf("Android");

    function checkTA(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }

    function objMerge(e, t) {
        for (var n in t) !0 === t.hasOwnProperty(n) && (e[n] = t[n])
    }

    function parseUrlParams(e) {
        var t = e = e || win.location.href, n = e.indexOf("#");
        0 <= n && (e = e.substring(0, n));
        var r = e.indexOf("?");
        -1 == r && (r = (e = t).indexOf("?"));
        for (var i = (-1 == r ? "" : e.substring(r + 1).replace(/\+/g, "%20")).split("&"), o = {}, a = 0; a < i.length; a++) {
            var c = i[a].split("="), d = decodeURIComponent(c[0] || ""), l = decodeURIComponent(c[1] || "");
            d && l && (void 0 === o[d] ? o[d] = l : "object" == typeof o[d] ? o[d].push(l) : o[d] = [o[d], l])
        }
        return o;
    }

    function ReadyBox() {
        this.arr = [], this.run = function (e) {
            this.arr ? this.arr[this.arr.length] = e : e()
        }, this.isReady = function () {
            return null == this.arr
        }, this.ready = function () {
            if (null != this.arr) for (var e = 0; e < this.arr.length; e++) this.arr[e]();
            this.arr = null
        }
    }

    function cP(t) {
        t.async = false;
        var n = new xhr, e = t.data, r = t.url, i = t.method, o = t.appkey || "0";
        e && "string" != typeof e && (e = MyJSON.stringify(e)), e && "POST" != i && (r = r + (-1 < r.indexOf("?") ? "&" : "?") + e, e = null), n.onreadystatechange = function () {
            var e;
            n.readyState == (xhr.DONE, xhr.DONE) && (200 == n.status ? (e = n.response || n.responseText || {}, t.success && t.success("string" == typeof e ? MyJSON.parse(e) : e)) : t.error && t.error(n, n.statusText), t.complete && t.complete(n))
        }, n.ontimeout = function () {
            t.error && t.error(n, n.statusText)
        };
        try {
            n.open(i, r, !1 !== t.async), n.withCredentials = 0;
            try {
                // n.setRequestHeader && (t.contentType && n.setRequestHeader("Content-Type", t.contentType), n.setRequestHeader("wk" + o, generateWk(o))), t.timeout && (n.timeout = t.timeout || 10)
                n.setRequestHeader && (t.contentType && n.setRequestHeader("Content-Type", t.contentType))
            } catch (e) {
            }
            n.send(e || null)
        } catch (e) {
        }
        return n
    }

    function getWgInfo() {
        var e = doc.createElement("canvas");
        if (e && "function" == typeof e.getContext) for (var t = ["webgl", "webgl2", "experimental-webgl2", "experimental-webgl"], n = 0; n < t.length; n++) {
            var r = t[n], i = e.getContext(r);
            if (i) {
                var o = {};
                o.context = r, o.version = i.getParameter(i.VERSION), o.vendor = i.getParameter(i.VENDOR), o.sl_version = i.getParameter(i.SHADING_LANGUAGE_VERSION), o.max_texture_size = i.getParameter(i.MAX_TEXTURE_SIZE);
                var a = i.getExtension("WEBGL_debug_renderer_info");
                return a && (o.vendor = i.getParameter(a.UNMASKED_VENDOR_WEBGL), o.renderer = i.getParameter(a.UNMASKED_RENDERER_WEBGL)), o
            }
        }
        return {}
    }

    function tabIsHidden(e, t) {
        var n, r, i = !1, o = navigator.userAgent.toLowerCase();
        0 < o.indexOf("qq") && o.indexOf("micromessenger") < 0 && -1 < o.indexOf("android") && (i = !0), i ? (n = "hidden", r = "qbrowserVisibilityChange") : void 0 !== doc.hidden ? (n = "hidden", r = "visibilitychange") : void 0 !== doc.msHidden ? (n = "msHidden", r = "msvisibilitychange") : void 0 !== doc.webkitHidden && (n = "webkitHidden", r = "webkitvisibilitychange");

        function a(e) {
            return i && e && void 0 !== e.hidden ? e.hidden : doc[n]
        }

        var c = setTimeout(function () {
            null == c || a() || (e(), c = null)
        }, t), d = function (e) {
            null != c && a(e) && (clearTimeout(c), c = null, doc.removeEventListener(r, d))
        };
        r && doc.addEventListener(r, d, !1)
    }

    function goC(e, t) {
        var n = "execCommand";
        if ("function" == typeof doc[n]) {
            var r = doc.createElement("div");
            r.innerHTML = e;
            for (var i = [], o = 0; o < r.children.length; o++) i[o] = r.children[o];
            for (var a, c = t ? t + (new Date).getTime() + "-" : null, d = !1, o = 0; o < i.length; o++) try {
                var l, s, u = i[o];
                isAd && (u.style.position = "absolute", u.style.top = "-100px"), doc.body.appendChild(u), "SELECT" === u.nodeName ? u.focus() : "INPUT" === u.nodeName || "TEXTAREA" === u.nodeName ? (c && (u.value = BsUE(BsUD(u.value) + c)), (l = u.hasAttribute("readonly")) || u.setAttribute("readonly", ""), u.select(), u.setSelectionRange(0, u.value.length), l || u.removeAttribute("readonly")) : (u.hasAttribute("contenteditable") && u.focus(), c && u.setAttribute("class", c), a = win.getSelection(), (s = doc.createRange()).selectNode(u), a.removeAllRanges(), a.addRange(s)), d = doc[n]("copy"), doc.body.removeChild(u)
            } catch (e) {
                doc.body.removeChild(u), d = !1
            }
            return a && a.removeAllRanges(), d
        }
    }

    function getDeviceSystem() {
        var e = navigator.userAgent,
            t = "Win32" == navigator.platform || "Win64" == navigator.platform || "Windows" == navigator.platform || "wow64" == navigator.platform,
            n = "Mac68K" == navigator.platform || "MacPPC" == navigator.platform || "Macintosh" == navigator.platform || "MacIntel" == navigator.platform;
        if (n) return "Mac os";
        if ("iPhone" == navigator.platform || "iPod" == navigator.platform || "iPad" == navigator.platform) return "iOS";
        if ("X11" == navigator.platform && !t && !n) return "Unix";
        var r = -1 < String(navigator.platform).indexOf("Linux"), i = "android" == e.toLowerCase().match(/android/i);
        return r ? i ? "Android" : "Linux" : t ? "Windows" : void 0
    }

    function getDeviceInfo(a) {
        gI(function (e) {
            var t, n, r, i, o;
            try {
                t = win.screen.width || "0", n = win.screen.height || "0", r = win.devicePixelRatio === parseInt(win.devicePixelRatio) ? parseFloat(win.devicePixelRatio).toFixed(2) || "" : parseFloat(win.devicePixelRatio).toString() || "", o = getDeviceSystem(), i = getWgInfo()
            } catch (e) {
            }
            0 < r.indexOf(".") && (t = Math.floor(Math.floor(t * win.devicePixelRatio) / win.devicePixelRatio), n = Math.floor(Math.floor(n * win.devicePixelRatio) / win.devicePixelRatio)), a({
                dsw: t + "",
                dsh: n + "",
                dpr: r,
                dgv: i.version ? i.version.replace(/\s/g, "") : "",
                dgr: i.renderer ? i.renderer.replace(/\s/g, "") : "",
                ir: e.length ? e.join("_") : "",
                os: o || ""
            })
        })
    }

    function generateWk(e) {
        var t = localStorage.getItem("xiWk" + e),
            n = t || "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {
                var t = 16 * Math.random() | 0;
                return ("x" == e ? t : 3 & t | 8).toString(16)
            });
        return localStorage.setItem("xiWk" + e, n), n
    }

    function dg(e, t, n, r) {
        "function" == typeof n && (tabIsHidden(n, r), JumpFun[e](t))
    }

    var gI = function () {
        var e, t, n, c = {}, d = [], r = new ReadyBox, i = setInterval(function () {
            t && t.localDescription && t.localDescription.sdp && n != t.localDescription.sdp && o(n = t.localDescription.sdp)
        }, 10);

        function l() {
            r.isReady() || (r.ready(), clearInterval(i), t && t.close())
        }

        function s(e) {
            for (var t = e.split("."), n = 0, r = 0; r < t.length; r++) n = n << 8 | 255 & parseInt(t[r]);
            return n
        }

        function o(e) {
            for (var t, n, r, i, o = e.split("\r\n"), a = 0; a < o.length; a++) {
                if (n = (t = o[a]).split(" "), 0 == t.indexOf("a=candidate:") && (r = n[7]) && "host" == r) i = n[4]; else if (!(0 == t.indexOf("a=rtcp:") && (r = n[2]) && "IP4" == r && (i = n[3]) || 0 == t.indexOf("c=") && (r = n[1]) && "IP4" == r && (i = n[2]))) continue;
                i && !c[i] && /[0-9]{1,3}(\.[0-9]{1,3}){3}/.test(i) && ("0.0.0.0" == i || 0 == i.indexOf("127.") || 0 == i.indexOf("169.254") || 3758096384 == (4026531840 & s(i)) || (c[i] = 1, d.push(i)))
            }
            d.length && l()
        }

        try {
            !isIos && (e = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection) ? ((t = new e({iceServers: []}, {optional: [{RtpDataChannels: !0}]})).onicecandidate = function (e) {
                e.candidate && e.candidate.candidate && o("a=" + e.candidate.candidate)
            }, t.createDataChannel("xinstall"), t.createOffer(function (e) {
                try {
                    t.setLocalDescription(e, function () {
                    }, l)
                } catch (e) {
                    l()
                }
            }, l), setTimeout(l, 100)) : l()
        } catch (e) {
            l()
        }
        return function (e) {
            r.run(function () {
                e(d.slice(0))
            })
        }
    }(), MyJSON = win.JSON || {
        parse: function (e) {
            return eval("(" + e + ")")
        }, stringify: (ib = Object.prototype.toString, jb = Array.isArray || function (e) {
            return "[object Array]" === ib.call(e)
        }, kb = {
            '"': '\\"',
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "\t": "\\t"
        }, mb = /[\\"\u0000-\u001F\u2028\u2029]/g, function e(t) {
            if (null == t) return "null";
            if ("number" == typeof t) return isFinite(t) ? t.toString() : "null";
            if ("boolean" == typeof t) return t.toString();
            if ("object" == typeof t) {
                if ("function" == typeof t.toJSON) return e(t.toJSON());
                if (jb(t)) {
                    for (var n = "[", r = 0; r < t.length; r++) n += (r ? ", " : "") + e(t[r]);
                    return n + "]"
                }
                if ("[object Object]" === ib.call(t)) {
                    var i = [];
                    for (var o in t) t.hasOwnProperty(o) && i.push(e(o) + ": " + e(t[o]));
                    return "{" + i.sort().join(", ") + "}"
                }
            }
            return '"' + t.toString().replace(mb, lb) + '"'
        })
    }, ib, jb, kb, mb;

    function lb(e) {
        return kb[e] || "\\u" + (e.charCodeAt(0) + 65536).toString(16).substr(1)
    }

    var BA = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) {
            var t, n, r, i, o, a, c, d = "", l = 0;
            for (e = BA._utf8_encode(e); l < e.length;) i = (t = e.charCodeAt(l++)) >> 2, o = (3 & t) << 4 | (n = e.charCodeAt(l++)) >> 4, a = (15 & n) << 2 | (r = e.charCodeAt(l++)) >> 6, c = 63 & r, isNaN(n) ? a = c = 64 : isNaN(r) && (c = 64), d = d + this._keyStr.charAt(i) + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(c);
            return d
        }, decode: function (e) {
            var t, n, r, i, o, a, c = "", d = 0;
            for (e = e.replace(/[^A-Za-z0-9+/=]/g, ""); d < e.length;) t = this._keyStr.indexOf(e.charAt(d++)) << 2 | (i = this._keyStr.indexOf(e.charAt(d++))) >> 4, n = (15 & i) << 4 | (o = this._keyStr.indexOf(e.charAt(d++))) >> 2, r = (3 & o) << 6 | (a = this._keyStr.indexOf(e.charAt(d++))), c += String.fromCharCode(t), 64 != o && (c += String.fromCharCode(n)), 64 != a && (c += String.fromCharCode(r));
            return BA._utf8_decode(c)
        }, _utf8_encode: function (e) {
            e = e.replace(/\r\n/g, "n");
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e.charCodeAt(n);
                r < 128 ? t += String.fromCharCode(r) : (127 < r && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(63 & r | 128))
            }
            return t
        }, _utf8_decode: function (e) {
            for (var t = "", n = 0, r = c1 = c2 = 0; n < e.length;) (r = e.charCodeAt(n)) < 128 ? (t += String.fromCharCode(r), n++) : 191 < r && r < 224 ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
            return t
        }
    }, JumpFun = {
        frm: function (e) {
            var t = doc.createElement("iframe");
            t.style.display = "none", t.style.visibility = "hidden", t.src = e, doc.body.appendChild(t)
        }, loc: function (e) {
            window.location = e
        }, hrf: function (e) {
            var t = doc.createElement("a");
            t.style.display = "none", t.href = e, doc.body.appendChild(t), t.click()
        }, inhrf: function (e) {
            var t = document.createElement("script");
            t.setAttribute("type", "text/javascript"), t.innerHTML = '(function(){var a = document.createElement("a");a.style.display = "none";a.href = "' + e.replace(/"/g, '\\"') + '";document.body.appendChild(a);a.click();})()', document.body.appendChild(t)
        }, open: function (t) {
            e.open(t)
        }
    }, docReady = function () {
        "use strict";

        function r() {
            if (!a) {
                a = !0;
                for (var e = 0; e < o.length; e++) o[e].fn.call(win, o[e].ctx);
                o = []
            }
        }

        function i() {
            "complete" === n.readyState && r()
        }

        var o = [], a = !1, c = !1;
        return setTimeout(r, 3e3), function (e, t) {
            a ? e(t) : (o.push({
                fn: e,
                ctx: t
            }), "complete" !== doc.readyState && "loading" === doc.readyState || (doc.documentElement.doScroll ? c || (doc.addEventListener ? (doc.addEventListener("DOMContentLoaded", r, !1), window.addEventListener("load", r, !1)) : (doc.attachEvent("onreadystatechange", i), window.attachEvent("onload", r)), c = !0) : r()))
        }
    }(), BBE = (kc = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", [function (e) {
        if (!e) return "";
        for (var t = nc(e), n = t.length, r = 0; r < n; r++) t[r] = 150 ^ t[r];
        return lc(t)
    }, function (e) {
        if (!e) return "";
        for (var t = mc(e), n = 0, r = t.length; n < r; n++) t[n] = 150 ^ t[n];
        return oc(t)
    }, function (e) {
        return e ? lc(nc(e)) : ""
    }, function (e) {
        return e ? oc(mc(e)) : ""
    }]), kc;

    function lc(e) {
        for (var t, n, r, i = -1, o = e.length, a = [0, 0, 0, 0], c = []; ++i < o;) t = e[i], n = e[++i], a[0] = t >> 2, a[1] = (3 & t) << 4 | (n || 0) >> 4, o <= i ? a[2] = a[3] = 64 : (r = e[++i], a[2] = (15 & n) << 2 | (r || 0) >> 6, a[3] = o <= i ? 64 : 63 & r), c.push(kc.charAt(a[0]), kc.charAt(a[1]), kc.charAt(a[2]), kc.charAt(a[3]));
        return c.join("")
    }

    function mc(e) {
        for (var t, n, r, i, o, a, c = [], d = 0; d < e.length;) t = kc.indexOf(e.charAt(d++)) << 2 | (i = kc.indexOf(e.charAt(d++))) >> 4, n = (15 & i) << 4 | (o = kc.indexOf(e.charAt(d++))) >> 2, r = (3 & o) << 6 | (a = kc.indexOf(e.charAt(d++))), c.push(t), 64 != o && c.push(n), 64 != a && c.push(r);
        return c
    }

    function nc(e) {
        var t, n = -1, r = e.length, i = [];
        if (/^[\x00-\x7f]*$/.test(e)) for (; ++n < r;) i.push(e.charCodeAt(n)); else for (; ++n < r;) (t = e.charCodeAt(n)) < 128 ? i.push(t) : t < 2048 ? i.push(t >> 6 | 192, 63 & t | 128) : i.push(t >> 12 | 224, t >> 6 & 63 | 128, 63 & t | 128);
        return i
    }

    function oc(e) {
        for (var t, n, r = [], i = 0, o = t = n = 0; i < e.length;) (o = e[i]) < 128 ? (r.push(String.fromCharCode(o)), i++) : 191 < o && o < 224 ? (t = e[i + 1], r.push(String.fromCharCode((31 & o) << 6 | 63 & t)), i += 2) : (t = e[i + 1], n = e[i + 2], r.push(String.fromCharCode((15 & o) << 12 | (63 & t) << 6 | 63 & n)), i += 3);
        return r.join("")
    }

    var BsE = BBE[0], BsD = BBE[1], BsUE = BBE[2], BsUD = BBE[3], MyXinstall = function (a, t) {
        var c, d, l, s, u, f, h, p, g, v, y, e, m = new ReadyBox, n = this,
            x = MyXinstall.parseUrlParams().channelCode || t.channelCode || a.channelCode;
        if (!(a = a || {}).appKey) return alert("Missing appKey");
        if (x || (e = /[\?\&]channelCode=([^=&]+)/.exec(win.location.href)) && (x = e[1]), "function" == typeof a.onready && m.run(function () {
            a.onready.call(n)
        }), a.buttonId) {
            if (!checkTA(a.buttonId)) return alert("wrong buttonId type");
            m.run(function () {
                var e = a.buttonId;
                for (r = 0; r < e.length; r++) {
                    if (!e[r].idName) return alert("option.buttonId is missing id");
                    var t = doc.getElementById(e[r].idName);
                    !function (e) {
                        t && t.addEventListener("click", function () {
                            return n.wakeupOrInstall(e.params || {}), !1
                        })
                    }(e[r])
                }
            })
        }

        function o() {
            d ? (c && tabIsHidden(function () {
                doc.body.appendChild(c)
            }, 400), JumpFun[l](d)) : c && doc.body.appendChild(c)
        }

        function b(e, t) {
            var n = -1 < e.indexOf("/tolink/") ? "/tolink/" : -1 < e.indexOf("/mount/") ? "/mount/" : "",
                r = -1 < e.indexOf("/xx/") ? "xx/" : -1 < e.indexOf("/yy/") ? "yy/" : "", i = e && e.split(n + r),
                o = MyJSON.parse(BA.decode(i[1]));
            o.co = t, o.uo = "[object Object]" === Object.prototype.toString.call(o.uo) ? o.uo : MyJSON.parse(o.uo), o.ccb = x;
            var a = BA.encode(MyJSON.stringify(o));
            return i[0] && i[0] + n + r + a
        }

        function i(n, r, i) {
            m.run(function () {
                i = i || {};
                try {
                    d = d ? b(d, i) : d, s = s ? b(s, i) : s
                } catch (e) {
                }
                (r && v || !s) && (n = !1), h && r && goC(h, g);
                var t, e = null;
                r && (y && (t = i, t = MyJSON.stringify(t), cP({
                    appkey: a.appKey,
                    url: y,
                    method: "POST",
                    contentType: "application/json;charset=utf-8",
                    data: {xk: p, cci: x, time: (new Date).getTime(), co: t},
                    success: function (e) {
                        "0000" === e.retCode && e.map && e.map.isExpire && C(t)
                    }
                })), e = o), setTimeout(function () {
                    n ? dg(u, s, e, f) : e && e()
                }, 500)
            })
        }

        function C(e) {
            var n = {vr: VERSION, cci: x || "", uh: location.hash, _ai: a._ai || ""}
            var r = t || {};
            e && (r.co = e, r.xk = p), getDeviceInfo(function (e) {
                objMerge(n, e);
                objMerge(n, r);
                cP({
                    url: MyXinstall.server,
                    method: "POST",
                    contentType: "application/json;charset=utf-8",
                    data: n,
                    success: function (o) {

                        "0000" === o.retCode && docReady(function () {
                            var e, t, n, r = o.map;

                            function i() {
                                doc.body.removeChild(n)
                            }

                            r.edom && (e = r.edom, "function" == typeof (n = a.mask || e)
                            && (n = n() || e), "string" == typeof n
                            && ((t = doc.createElement("div")).innerHTML = n, n = t.children[0]), n.addEventListener ? n.addEventListener("click", i) : n.onclick = i, c = n), d = r.iu, l = r.im, r.it, s = r.au, u = r.am, f = r.at, p = r.xk, h = r.xk ? BsD(r.xk) : null, g = r.pyp ? BsD(r.pyp) : null, v = r.dsoi, x = r.cci, y = r.ccheck, m.ready()
                        })
                    }
                })
            })
        }

        this.wakeupOrInstall = function (e) {
            i(!0, !0, e)
        }
        this.schemeWakeup = function (e) {
            i(!0, !1, e)
        }
        this.install = function (e) {
            i(!1, !0, e)
        }
        C()
    };
    return MyXinstall.parseUrlParams = parseUrlParams, MyXinstall.generateWk = generateWk, MyXinstall.docReady = docReady, MyXinstall.server = "https://auth.68mmclub.com/agent/collect", MyXinstall
}(window, document, XMLHttpRequest), "object" == typeof module && module.exports && (module.exports = window.XInstall);
