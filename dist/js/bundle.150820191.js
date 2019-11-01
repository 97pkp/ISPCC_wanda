!function (t) {
    var e = {};

    function i(n) {
        if (e[n]) return e[n].exports;
        var r = e[n] = {i: n, l: !1, exports: {}};
        return t[n].call(r.exports, r, r.exports, i), r.l = !0, r.exports
    }

    i.m = t, i.c = e, i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {configurable: !1, enumerable: !0, get: n})
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 13)
}([function (t, e, i) {
    var n, r, s, o;
    s = window, o = function (t, e) {
        "use strict";
        var i = {
            extend: function (t, e) {
                for (var i in e) t[i] = e[i];
                return t
            }, modulo: function (t, e) {
                return (t % e + e) % e
            }
        }, n = Array.prototype.slice;
        i.makeArray = function (t) {
            return Array.isArray(t) ? t : null === t || void 0 === t ? [] : "object" == typeof t && "number" == typeof t.length ? n.call(t) : [t]
        }, i.removeFrom = function (t, e) {
            var i = t.indexOf(e);
            -1 != i && t.splice(i, 1)
        }, i.getParent = function (t, i) {
            for (; t.parentNode && t != document.body;) if (t = t.parentNode, e(t, i)) return t
        }, i.getQueryElement = function (t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, i.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, i.filterFindElements = function (t, n) {
            var r = [];
            return (t = i.makeArray(t)).forEach(function (t) {
                if (t instanceof HTMLElement) if (n) {
                    e(t, n) && r.push(t);
                    for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++) r.push(i[s])
                } else r.push(t)
            }), r
        }, i.debounceMethod = function (t, e, i) {
            i = i || 100;
            var n = t.prototype[e], r = e + "Timeout";
            t.prototype[e] = function () {
                var t = this[r];
                clearTimeout(t);
                var e = arguments, s = this;
                this[r] = setTimeout(function () {
                    n.apply(s, e), delete s[r]
                }, i)
            }
        }, i.docReady = function (t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
        }, i.toDashed = function (t) {
            return t.replace(/(.)([A-Z])/g, function (t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var r = t.console;
        return i.htmlInit = function (e, n) {
            i.docReady(function () {
                var s = i.toDashed(n), o = "data-" + s, a = document.querySelectorAll("[" + o + "]"),
                    l = document.querySelectorAll(".js-" + s), h = i.makeArray(a).concat(i.makeArray(l)),
                    u = o + "-options", c = t.jQuery;
                h.forEach(function (t) {
                    var i, s = t.getAttribute(o) || t.getAttribute(u);
                    try {
                        i = s && JSON.parse(s)
                    } catch (e) {
                        return void (r && r.error("Error parsing " + o + " on " + t.className + ": " + e))
                    }
                    var a = new e(t, i);
                    c && c.data(t, n, a)
                })
            })
        }, i
    }, n = [i(24)], void 0 === (r = function (t) {
        return o(s, t)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s, o;
    s = window, o = function (t, e, i, n, r, s, o) {
        "use strict";
        var a = t.jQuery, l = t.getComputedStyle, h = t.console;

        function u(t, e) {
            for (t = n.makeArray(t); t.length;) e.appendChild(t.shift())
        }

        var c = 0, f = {};

        function d(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                if (this.element = i, this.element.flickityGUID) {
                    var r = f[this.element.flickityGUID];
                    return r.option(e), r
                }
                a && (this.$element = a(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), this._create()
            } else h && h.error("Bad element for Flickity: " + (i || t))
        }

        d.defaults = {
            accessibility: !0,
            cellAlign: "center",
            freeScrollFriction: .075,
            friction: .28,
            namespaceJQueryEvents: !0,
            percentPosition: !0,
            resize: !0,
            selectedAttraction: .025,
            setGallerySize: !0
        }, d.createMethods = [];
        var p = d.prototype;
        n.extend(p, e.prototype), p._create = function () {
            var e = this.guid = ++c;
            this.element.flickityGUID = e, f[e] = this, this.selectedIndex = 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), (this.options.resize || this.options.watchCSS) && t.addEventListener("resize", this);
            for (var i in this.options.on) {
                var n = this.options.on[i];
                this.on(i, n)
            }
            d.createMethods.forEach(function (t) {
                this[t]()
            }, this), this.options.watchCSS ? this.watchCSS() : this.activate()
        }, p.option = function (t) {
            n.extend(this.options, t)
        }, p.activate = function () {
            this.isActive || (this.isActive = !0, this.element.classList.add("flickity-enabled"), this.options.rightToLeft && this.element.classList.add("flickity-rtl"), this.getSize(), u(this._filterFindCellElements(this.element.children), this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.reloadCells(), this.options.accessibility && (this.element.tabIndex = 0, this.element.addEventListener("keydown", this)), this.emitEvent("activate"), this.selectInitialIndex(), this.isInitActivated = !0, this.dispatchEvent("ready"))
        }, p._createSlider = function () {
            var t = document.createElement("div");
            t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
        }, p._filterFindCellElements = function (t) {
            return n.filterFindElements(t, this.options.cellSelector)
        }, p.reloadCells = function () {
            this.cells = this._makeCells(this.slider.children), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize()
        }, p._makeCells = function (t) {
            return this._filterFindCellElements(t).map(function (t) {
                return new r(t, this)
            }, this)
        }, p.getLastCell = function () {
            return this.cells[this.cells.length - 1]
        }, p.getLastSlide = function () {
            return this.slides[this.slides.length - 1]
        }, p.positionCells = function () {
            this._sizeCells(this.cells), this._positionCells(0)
        }, p._positionCells = function (t) {
            t = t || 0, this.maxCellHeight = t && this.maxCellHeight || 0;
            var e = 0;
            if (t > 0) {
                var i = this.cells[t - 1];
                e = i.x + i.size.outerWidth
            }
            for (var n = this.cells.length, r = t; r < n; r++) {
                var s = this.cells[r];
                s.setPosition(e), e += s.size.outerWidth, this.maxCellHeight = Math.max(s.size.outerHeight, this.maxCellHeight)
            }
            this.slideableWidth = e, this.updateSlides(), this._containSlides(), this.slidesWidth = n ? this.getLastSlide().target - this.slides[0].target : 0
        }, p._sizeCells = function (t) {
            t.forEach(function (t) {
                t.getSize()
            })
        }, p.updateSlides = function () {
            if (this.slides = [], this.cells.length) {
                var t = new s(this);
                this.slides.push(t);
                var e = "left" == this.originSide ? "marginRight" : "marginLeft", i = this._getCanCellFit();
                this.cells.forEach(function (n, r) {
                    if (t.cells.length) {
                        var o = t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
                        i.call(this, r, o) ? t.addCell(n) : (t.updateTarget(), t = new s(this), this.slides.push(t), t.addCell(n))
                    } else t.addCell(n)
                }, this), t.updateTarget(), this.updateSelectedSlide()
            }
        }, p._getCanCellFit = function () {
            var t = this.options.groupCells;
            if (!t) return function () {
                return !1
            };
            if ("number" == typeof t) {
                var e = parseInt(t, 10);
                return function (t) {
                    return t % e != 0
                }
            }
            var i = "string" == typeof t && t.match(/^(\d+)%$/), n = i ? parseInt(i[1], 10) / 100 : 1;
            return function (t, e) {
                return e <= (this.size.innerWidth + 1) * n
            }
        }, p._init = p.reposition = function () {
            this.positionCells(), this.positionSliderAtSelected()
        }, p.getSize = function () {
            this.size = i(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
        };
        var m = {center: {left: .5, right: .5}, left: {left: 0, right: 1}, right: {right: 0, left: 1}};
        return p.setCellAlign = function () {
            var t = m[this.options.cellAlign];
            this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
        }, p.setGallerySize = function () {
            if (this.options.setGallerySize) {
                var t = this.options.adaptiveHeight && this.selectedSlide ? this.selectedSlide.height : this.maxCellHeight;
                this.viewport.style.height = t + "px"
            }
        }, p._getWrapShiftCells = function () {
            if (this.options.wrapAround) {
                this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
                var t = this.cursorPosition, e = this.cells.length - 1;
                this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
            }
        }, p._getGapCells = function (t, e, i) {
            for (var n = []; t > 0;) {
                var r = this.cells[e];
                if (!r) break;
                n.push(r), e += i, t -= r.size.outerWidth
            }
            return n
        }, p._containSlides = function () {
            if (this.options.contain && !this.options.wrapAround && this.cells.length) {
                var t = this.options.rightToLeft, e = t ? "marginRight" : "marginLeft",
                    i = t ? "marginLeft" : "marginRight", n = this.slideableWidth - this.getLastCell().size[i],
                    r = n < this.size.innerWidth, s = this.cursorPosition + this.cells[0].size[e],
                    o = n - this.size.innerWidth * (1 - this.cellAlign);
                this.slides.forEach(function (t) {
                    r ? t.target = n * this.cellAlign : (t.target = Math.max(t.target, s), t.target = Math.min(t.target, o))
                }, this)
            }
        }, p.dispatchEvent = function (t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), a && this.$element) {
                var r = t += this.options.namespaceJQueryEvents ? ".flickity" : "";
                if (e) {
                    var s = a.Event(e);
                    s.type = t, r = s
                }
                this.$element.trigger(r, i)
            }
        }, p.select = function (t, e, i) {
            if (this.isActive && (t = parseInt(t, 10), this._wrapSelect(t), (this.options.wrapAround || e) && (t = n.modulo(t, this.slides.length)), this.slides[t])) {
                var r = this.selectedIndex;
                this.selectedIndex = t, this.updateSelectedSlide(), i ? this.positionSliderAtSelected() : this.startAnimation(), this.options.adaptiveHeight && this.setGallerySize(), this.dispatchEvent("select", null, [t]), t != r && this.dispatchEvent("change", null, [t]), this.dispatchEvent("cellSelect")
            }
        }, p._wrapSelect = function (t) {
            var e = this.slides.length;
            if (!(this.options.wrapAround && e > 1)) return t;
            var i = n.modulo(t, e), r = Math.abs(i - this.selectedIndex), s = Math.abs(i + e - this.selectedIndex),
                o = Math.abs(i - e - this.selectedIndex);
            !this.isDragSelect && s < r ? t += e : !this.isDragSelect && o < r && (t -= e), t < 0 ? this.x -= this.slideableWidth : t >= e && (this.x += this.slideableWidth)
        }, p.previous = function (t, e) {
            this.select(this.selectedIndex - 1, t, e)
        }, p.next = function (t, e) {
            this.select(this.selectedIndex + 1, t, e)
        }, p.updateSelectedSlide = function () {
            var t = this.slides[this.selectedIndex];
            t && (this.unselectSelectedSlide(), this.selectedSlide = t, t.select(), this.selectedCells = t.cells, this.selectedElements = t.getCellElements(), this.selectedCell = t.cells[0], this.selectedElement = this.selectedElements[0])
        }, p.unselectSelectedSlide = function () {
            this.selectedSlide && this.selectedSlide.unselect()
        }, p.selectInitialIndex = function () {
            var t = this.options.initialIndex;
            if (this.isInitActivated) this.select(this.selectedIndex, !1, !0); else {
                if (t && "string" == typeof t) if (this.queryCell(t)) return void this.selectCell(t, !1, !0);
                var e = 0;
                t && this.slides[t] && (e = t), this.select(e, !1, !0)
            }
        }, p.selectCell = function (t, e, i) {
            var n = this.queryCell(t);
            if (n) {
                var r = this.getCellSlideIndex(n);
                this.select(r, e, i)
            }
        }, p.getCellSlideIndex = function (t) {
            for (var e = 0; e < this.slides.length; e++) {
                if (-1 != this.slides[e].cells.indexOf(t)) return e
            }
        }, p.getCell = function (t) {
            for (var e = 0; e < this.cells.length; e++) {
                var i = this.cells[e];
                if (i.element == t) return i
            }
        }, p.getCells = function (t) {
            var e = [];
            return (t = n.makeArray(t)).forEach(function (t) {
                var i = this.getCell(t);
                i && e.push(i)
            }, this), e
        }, p.getCellElements = function () {
            return this.cells.map(function (t) {
                return t.element
            })
        }, p.getParentCell = function (t) {
            var e = this.getCell(t);
            return e || (t = n.getParent(t, ".flickity-slider > *"), this.getCell(t))
        }, p.getAdjacentCellElements = function (t, e) {
            if (!t) return this.selectedSlide.getCellElements();
            e = void 0 === e ? this.selectedIndex : e;
            var i = this.slides.length;
            if (1 + 2 * t >= i) return this.getCellElements();
            for (var r = [], s = e - t; s <= e + t; s++) {
                var o = this.options.wrapAround ? n.modulo(s, i) : s, a = this.slides[o];
                a && (r = r.concat(a.getCellElements()))
            }
            return r
        }, p.queryCell = function (t) {
            if ("number" == typeof t) return this.cells[t];
            if ("string" == typeof t) {
                if (t.match(/^[#\.]?[\d\/]/)) return;
                t = this.element.querySelector(t)
            }
            return this.getCell(t)
        }, p.uiChange = function () {
            this.emitEvent("uiChange")
        }, p.childUIPointerDown = function (t) {
            "touchstart" != t.type && t.preventDefault(), this.focus()
        }, p.onresize = function () {
            this.watchCSS(), this.resize()
        }, n.debounceMethod(d, "onresize", 150), p.resize = function () {
            if (this.isActive) {
                this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setGallerySize(), this.emitEvent("resize");
                var t = this.selectedElements && this.selectedElements[0];
                this.selectCell(t, !1, !0)
            }
        }, p.watchCSS = function () {
            this.options.watchCSS && (-1 != l(this.element, ":after").content.indexOf("flickity") ? this.activate() : this.deactivate())
        }, p.onkeydown = function (t) {
            var e = document.activeElement && document.activeElement != this.element;
            if (this.options.accessibility && !e) {
                var i = d.keyboardHandlers[t.keyCode];
                i && i.call(this)
            }
        }, d.keyboardHandlers = {
            37: function () {
                var t = this.options.rightToLeft ? "next" : "previous";
                this.uiChange(), this[t]()
            }, 39: function () {
                var t = this.options.rightToLeft ? "previous" : "next";
                this.uiChange(), this[t]()
            }
        }, p.focus = function () {
            var e = t.pageYOffset;
            this.element.focus({preventScroll: !0}), t.pageYOffset != e && t.scrollTo(t.pageXOffset, e)
        }, p.deactivate = function () {
            this.isActive && (this.element.classList.remove("flickity-enabled"), this.element.classList.remove("flickity-rtl"), this.unselectSelectedSlide(), this.cells.forEach(function (t) {
                t.destroy()
            }), this.element.removeChild(this.viewport), u(this.slider.children, this.element), this.options.accessibility && (this.element.removeAttribute("tabIndex"), this.element.removeEventListener("keydown", this)), this.isActive = !1, this.emitEvent("deactivate"))
        }, p.destroy = function () {
            this.deactivate(), t.removeEventListener("resize", this), this.allOff(), this.emitEvent("destroy"), a && this.$element && a.removeData(this.element, "flickity"), delete this.element.flickityGUID, delete f[this.guid]
        }, n.extend(p, o), d.data = function (t) {
            var e = (t = n.getQueryElement(t)) && t.flickityGUID;
            return e && f[e]
        }, n.htmlInit(d, "flickity"), a && a.bridget && a.bridget("flickity", d), d.setJQuery = function (t) {
            a = t
        }, d.Cell = r, d.Slide = s, d
    }, n = [i(2), i(4), i(0), i(25), i(26), i(27)], void 0 === (r = function (t, e, i, n, r, a) {
        return o(s, t, e, i, n, r, a)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r;
    "undefined" != typeof window && window, void 0 === (r = "function" == typeof (n = function () {
        "use strict";

        function t() {
        }

        var e = t.prototype;
        return e.on = function (t, e) {
            if (t && e) {
                var i = this._events = this._events || {}, n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this
            }
        }, e.once = function (t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0, this
            }
        }, e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this
            }
        }, e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                i = i.slice(0), e = e || [];
                for (var n = this._onceEvents && this._onceEvents[t], r = 0; r < i.length; r++) {
                    var s = i[r];
                    n && n[s] && (this.off(t, s), delete n[s]), s.apply(this, e)
                }
                return this
            }
        }, e.allOff = function () {
            delete this._events, delete this._onceEvents
        }, t
    }) ? n.call(e, i, e, t) : n) || (t.exports = r)
}, function (t, e) {
    var i;
    i = function () {
        return this
    }();
    try {
        i = i || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (i = window)
    }
    t.exports = i
}, function (t, e, i) {
    var n, r;
    window, void 0 === (r = "function" == typeof (n = function () {
        "use strict";

        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e
        }

        var e = "undefined" == typeof console ? function () {
            } : function (t) {
                console.error(t)
            },
            i = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
            n = i.length;

        function r(t) {
            var i = getComputedStyle(t);
            return i || e("Style returned " + i + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), i
        }

        var s, o = !1;

        function a(e) {
            if (function () {
                if (!o) {
                    o = !0;
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                    var i = document.body || document.documentElement;
                    i.appendChild(e);
                    var n = r(e);
                    s = 200 == Math.round(t(n.width)), a.isBoxSizeOuter = s, i.removeChild(e)
                }
            }(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                var l = r(e);
                if ("none" == l.display) return function () {
                    for (var t = {
                        width: 0,
                        height: 0,
                        innerWidth: 0,
                        innerHeight: 0,
                        outerWidth: 0,
                        outerHeight: 0
                    }, e = 0; e < n; e++) t[i[e]] = 0;
                    return t
                }();
                var h = {};
                h.width = e.offsetWidth, h.height = e.offsetHeight;
                for (var u = h.isBorderBox = "border-box" == l.boxSizing, c = 0; c < n; c++) {
                    var f = i[c], d = l[f], p = parseFloat(d);
                    h[f] = isNaN(p) ? 0 : p
                }
                var m = h.paddingLeft + h.paddingRight, _ = h.paddingTop + h.paddingBottom,
                    g = h.marginLeft + h.marginRight, v = h.marginTop + h.marginBottom,
                    y = h.borderLeftWidth + h.borderRightWidth, b = h.borderTopWidth + h.borderBottomWidth, w = u && s,
                    T = t(l.width);
                !1 !== T && (h.width = T + (w ? 0 : m + y));
                var x = t(l.height);
                return !1 !== x && (h.height = x + (w ? 0 : _ + b)), h.innerWidth = h.width - (m + y), h.innerHeight = h.height - (_ + b), h.outerWidth = h.width + g, h.outerHeight = h.height + v, h
            }
        }

        return a
    }) ? n.call(e, i, e, t) : n) || (t.exports = r)
}, function (t, e) {
    var i, n;
    i = window, n = function (t, e) {
        "use strict";
        if (!e.getElementsByClassName) return;
        var i, n, r = e.documentElement, s = t.Date, o = t.HTMLPictureElement, a = "addEventListener",
            l = "getAttribute", h = t[a], u = t.setTimeout, c = t.requestAnimationFrame || u, f = t.requestIdleCallback,
            d = /^picture$/i, p = ["load", "error", "lazyincluded", "_lazyloaded"], m = {}, _ = Array.prototype.forEach,
            g = function (t, e) {
                return m[e] || (m[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), m[e].test(t[l]("class") || "") && m[e]
            }, v = function (t, e) {
                g(t, e) || t.setAttribute("class", (t[l]("class") || "").trim() + " " + e)
            }, y = function (t, e) {
                var i;
                (i = g(t, e)) && t.setAttribute("class", (t[l]("class") || "").replace(i, " "))
            }, b = function (t, e, i) {
                var n = i ? a : "removeEventListener";
                i && b(t, e), p.forEach(function (i) {
                    t[n](i, e)
                })
            }, w = function (t, n, r, s, o) {
                var a = e.createEvent("CustomEvent");
                return r || (r = {}), r.instance = i, a.initCustomEvent(n, !s, !o, r), t.dispatchEvent(a), a
            }, T = function (e, i) {
                var r;
                !o && (r = t.picturefill || n.pf) ? r({reevaluate: !0, elements: [e]}) : i && i.src && (e.src = i.src)
            }, x = function (t, e) {
                return (getComputedStyle(t, null) || {})[e]
            }, P = function (t, e, i) {
                for (i = i || t.offsetWidth; i < n.minSize && e && !t._lazysizesWidth;) i = e.offsetWidth, e = e.parentNode;
                return i
            }, S = (O = [], D = [], L = O, M = function () {
                var t = L;
                for (L = O.length ? D : O, C = !0, A = !1; t.length;) t.shift()();
                C = !1
            }, z = function (t, i) {
                C && !i ? t.apply(this, arguments) : (L.push(t), A || (A = !0, (e.hidden ? u : c)(M)))
            }, z._lsFlush = M, z), k = function (t, e) {
                return e ? function () {
                    S(t)
                } : function () {
                    var e = this, i = arguments;
                    S(function () {
                        t.apply(e, i)
                    })
                }
            }, E = function (t) {
                var e, i, n = function () {
                    e = null, t()
                }, r = function () {
                    var t = s.now() - i;
                    t < 99 ? u(r, 99 - t) : (f || n)(n)
                };
                return function () {
                    i = s.now(), e || (e = u(r, 99))
                }
            };
        var C, A, O, D, L, M, z;
        !function () {
            var e, i = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 300
            };
            n = t.lazySizesConfig || t.lazysizesConfig || {};
            for (e in i) e in n || (n[e] = i[e]);
            t.lazySizesConfig = n, u(function () {
                n.init && F()
            })
        }();
        var R = (lt = /^img$/i, ht = /^iframe$/i, ut = "onscroll" in t && !/glebot/.test(navigator.userAgent), ct = 0, ft = 0, dt = -1, pt = function (t) {
            ft--, t && t.target && b(t.target, pt), (!t || ft < 0 || !t.target) && (ft = 0)
        }, mt = function (t, i) {
            var n, s = t, o = "hidden" == x(e.body, "visibility") || "hidden" != x(t, "visibility");
            for ($ -= i, K += i, Q -= i, Z += i; o && (s = s.offsetParent) && s != e.body && s != r;) (o = (x(s, "opacity") || 1) > 0) && "visible" != x(s, "overflow") && (n = s.getBoundingClientRect(), o = Z > n.left && Q < n.right && K > n.top - 1 && $ < n.bottom + 1);
            return o
        }, _t = function () {
            var t, s, o, a, h, u, c, f, d, p = i.elements;
            if ((U = n.loadMode) && ft < 8 && (t = p.length)) {
                s = 0, dt++, null == tt && ("expand" in n || (n.expand = r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370), J = n.expand, tt = J * n.expFactor), ct < tt && ft < 1 && dt > 2 && U > 2 && !e.hidden ? (ct = tt, dt = 0) : ct = U > 1 && dt > 1 && ft < 6 ? J : 0;
                for (; s < t; s++) if (p[s] && !p[s]._lazyRace) if (ut) if ((f = p[s][l]("data-expand")) && (u = 1 * f) || (u = ct), d !== u && (V = innerWidth + u * et, G = innerHeight + u, c = -1 * u, d = u), o = p[s].getBoundingClientRect(), (K = o.bottom) >= c && ($ = o.top) <= G && (Z = o.right) >= c * et && (Q = o.left) <= V && (K || Z || Q || $) && (n.loadHidden || "hidden" != x(p[s], "visibility")) && (Y && ft < 3 && !f && (U < 3 || dt < 4) || mt(p[s], u))) {
                    if (xt(p[s]), h = !0, ft > 9) break
                } else !h && Y && !a && ft < 4 && dt < 4 && U > 2 && (X[0] || n.preloadAfterLoad) && (X[0] || !f && (K || Z || Q || $ || "auto" != p[s][l](n.sizesAttr))) && (a = X[0] || p[s]); else xt(p[s]);
                a && !h && xt(a)
            }
        }, it = _t, rt = 0, st = n.ricTimeout, ot = function () {
            nt = !1, rt = s.now(), it()
        }, at = f && n.ricTimeout ? function () {
            f(ot, {timeout: st}), st !== n.ricTimeout && (st = n.ricTimeout)
        } : k(function () {
            u(ot)
        }, !0), gt = function (t) {
            var e;
            (t = !0 === t) && (st = 33), nt || (nt = !0, (e = 125 - (s.now() - rt)) < 0 && (e = 0), t || e < 9 && f ? at() : u(at, e))
        }, vt = function (t) {
            v(t.target, n.loadedClass), y(t.target, n.loadingClass), b(t.target, bt), w(t.target, "lazyloaded")
        }, yt = k(vt), bt = function (t) {
            yt({target: t.target})
        }, wt = function (t) {
            var e, i = t[l](n.srcsetAttr);
            (e = n.customMedia[t[l]("data-media") || t[l]("media")]) && t.setAttribute("media", e), i && t.setAttribute("srcset", i)
        }, Tt = k(function (t, e, i, r, s) {
            var o, a, h, c, f, p;
            (f = w(t, "lazybeforeunveil", e)).defaultPrevented || (r && (i ? v(t, n.autosizesClass) : t.setAttribute("sizes", r)), a = t[l](n.srcsetAttr), o = t[l](n.srcAttr), s && (h = t.parentNode, c = h && d.test(h.nodeName || "")), p = e.firesLoad || "src" in t && (a || o || c), f = {target: t}, p && (b(t, pt, !0), clearTimeout(q), q = u(pt, 2500), v(t, n.loadingClass), b(t, bt, !0)), c && _.call(h.getElementsByTagName("source"), wt), a ? t.setAttribute("srcset", a) : o && !c && (ht.test(t.nodeName) ? function (t, e) {
                try {
                    t.contentWindow.location.replace(e)
                } catch (i) {
                    t.src = e
                }
            }(t, o) : t.src = o), s && (a || c) && T(t, {src: o})), t._lazyRace && delete t._lazyRace, y(t, n.lazyClass), S(function () {
                (!p || t.complete && t.naturalWidth > 1) && (p ? pt(f) : ft--, vt(f))
            }, !0)
        }), xt = function (t) {
            var e, i = lt.test(t.nodeName), r = i && (t[l](n.sizesAttr) || t[l]("sizes")), s = "auto" == r;
            (!s && Y || !i || !t[l]("src") && !t.srcset || t.complete || g(t, n.errorClass) || !g(t, n.lazyClass)) && (e = w(t, "lazyunveilread").detail, s && I.updateElem(t, !0, t.offsetWidth), t._lazyRace = !0, ft++, Tt(t, e, s, r, i))
        }, Pt = function () {
            if (!Y) if (s.now() - H < 999) u(Pt, 999); else {
                var t = E(function () {
                    n.loadMode = 3, gt()
                });
                Y = !0, n.loadMode = 3, gt(), h("scroll", function () {
                    3 == n.loadMode && (n.loadMode = 2), t()
                }, !0)
            }
        }, {
            _: function () {
                H = s.now(), i.elements = e.getElementsByClassName(n.lazyClass), X = e.getElementsByClassName(n.lazyClass + " " + n.preloadClass), et = n.hFac, h("scroll", gt, !0), h("resize", gt, !0), t.MutationObserver ? new MutationObserver(gt).observe(r, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0
                }) : (r[a]("DOMNodeInserted", gt, !0), r[a]("DOMAttrModified", gt, !0), setInterval(gt, 999)), h("hashchange", gt, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (t) {
                    e[a](t, gt, !0)
                }), /d$|^c/.test(e.readyState) ? Pt() : (h("load", Pt), e[a]("DOMContentLoaded", gt), u(Pt, 2e4)), i.elements.length ? (_t(), S._lsFlush()) : gt()
            }, checkElems: gt, unveil: xt
        }), I = (j = k(function (t, e, i, n) {
            var r, s, o;
            if (t._lazysizesWidth = n, n += "px", t.setAttribute("sizes", n), d.test(e.nodeName || "")) for (r = e.getElementsByTagName("source"), s = 0, o = r.length; s < o; s++) r[s].setAttribute("sizes", n);
            i.detail.dataAttr || T(t, i.detail)
        }), B = function (t, e, i) {
            var n, r = t.parentNode;
            r && (i = P(t, r, i), (n = w(t, "lazybeforesizes", {
                width: i,
                dataAttr: !!e
            })).defaultPrevented || (i = n.detail.width) && i !== t._lazysizesWidth && j(t, r, n, i))
        }, W = E(function () {
            var t, e = N.length;
            if (e) for (t = 0; t < e; t++) B(N[t])
        }), {
            _: function () {
                N = e.getElementsByClassName(n.autosizesClass), h("resize", W)
            }, checkElems: W, updateElem: B
        }), F = function () {
            F.i || (F.i = !0, I._(), R._())
        };
        var N, j, B, W;
        var X, Y, q, U, H, V, G, $, Q, Z, K, J, tt, et, it, nt, rt, st, ot, at, lt, ht, ut, ct, ft, dt, pt, mt, _t, gt,
            vt, yt, bt, wt, Tt, xt, Pt;
        return i = {cfg: n, autoSizer: I, loader: R, init: F, uP: T, aC: v, rC: y, hC: g, fire: w, gW: P, rAF: S}
    }(i, i.document), i.lazySizes = n, "object" == typeof t && t.exports && (t.exports = n)
}, function (t, e, i) {

    (function (i) {
        var n, r = void 0 !== t && t.exports && void 0 !== i ? i : this || window;
        (r._gsQueue || (r._gsQueue = [])).push(function () {
            "use strict";
            var t, e, i, n, s, o, a, l, h, u, c, f, d, p, m, _;
            r._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
                var n = function (t) {
                        var e, i = [], n = t.length;
                        for (e = 0; e !== n; i.push(t[e++])) ;
                        return i
                    }, r = function (t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    }, s = function (t, e, n) {
                        i.call(this, t, e, n), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._repeat && this._uncache(!0), this.render = s.prototype.render
                    }, o = 1e-10, a = i._internals, l = a.isSelector, h = a.isArray, u = s.prototype = i.to({}, .1, {}),
                    c = [];
                s.version = "1.20.3", u.constructor = s, u.kill()._gc = !1, s.killTweensOf = s.killDelayedCallsTo = i.killTweensOf, s.getTweensOf = i.getTweensOf, s.lagSmoothing = i.lagSmoothing, s.ticker = i.ticker, s.render = i.render, u.invalidate = function () {
                    return this._yoyo = !0 === this.vars.yoyo || !!this.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase = null, this._uncache(!0), i.prototype.invalidate.call(this)
                }, u.updateTo = function (t, e) {
                    var n, r = this.ratio, s = this.vars.immediateRender || t.immediateRender;
                    e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (n in t) this.vars[n] = t[n];
                    if (this._initted || s) if (e) this._initted = !1, s && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && i._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var o = this._totalTime;
                        this.render(0, !0, !1), this._initted = !1, this.render(o, !0, !1)
                    } else if (this._initted = !1, this._init(), this._time > 0 || s) for (var a, l = 1 / (1 - r), h = this._firstPT; h;) a = h.s + h.c, h.c *= l, h.s = a - h.c, h = h._next;
                    return this
                }, u.render = function (t, e, n) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var r, s, l, h, u, c, f, d, p, m = this._dirty ? this.totalDuration() : this._totalDuration,
                        _ = this._time, g = this._totalTime, v = this._cycle, y = this._duration, b = this._rawPrevTime;
                    if (t >= m - 1e-7 && t >= 0 ? (this._totalTime = m, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = y, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (r = !0, s = "onComplete", n = n || this._timeline.autoRemoveChildren), 0 === y && (this._initted || !this.vars.lazy || n) && (this._startTime === this._timeline._duration && (t = 0), (b < 0 || t <= 0 && t >= -1e-7 || b === o && "isPause" !== this.data) && b !== t && (n = !0, b > o && (s = "onReverseComplete")), this._rawPrevTime = d = !e || t || b === t ? t : o)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== g || 0 === y && b > 0) && (s = "onReverseComplete", r = this._reversed), t < 0 && (this._active = !1, 0 === y && (this._initted || !this.vars.lazy || n) && (b >= 0 && (n = !0), this._rawPrevTime = d = !e || t || b === t ? t : o)), this._initted || (n = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (h = y + this._repeatDelay, this._cycle = this._totalTime / h >> 0, 0 !== this._cycle && this._cycle === this._totalTime / h && g <= t && this._cycle--, this._time = this._totalTime - this._cycle * h, this._yoyo && 0 != (1 & this._cycle) && (this._time = y - this._time, (p = this._yoyoEase || this.vars.yoyoEase) && (this._yoyoEase || (!0 !== p || this._initted ? this._yoyoEase = p = !0 === p ? this._ease : p instanceof Ease ? p : Ease.map[p] : (p = this.vars.ease, this._yoyoEase = p = p ? p instanceof Ease ? p : "function" == typeof p ? new Ease(p, this.vars.easeParams) : Ease.map[p] || i.defaultEase : i.defaultEase)), this.ratio = p ? 1 - p.getRatio((y - this._time) / y) : 0)), this._time > y ? this._time = y : this._time < 0 && (this._time = 0)), this._easeType && !p ? (u = this._time / y, c = this._easeType, f = this._easePower, (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), 1 === c ? this.ratio = 1 - u : 2 === c ? this.ratio = u : this._time / y < .5 ? this.ratio = u / 2 : this.ratio = 1 - u / 2) : p || (this.ratio = this._ease.getRatio(this._time / y))), _ !== this._time || n || v !== this._cycle) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!n && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = _, this._totalTime = g, this._rawPrevTime = b, this._cycle = v, a.lazyTweens.push(this), void (this._lazy = [t, e]);
                            !this._time || r || p ? r && this._ease._calcEnd && !p && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this._time / y)
                        }
                        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== _ && t >= 0 && (this._active = !0), 0 === g && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, !0, n) : s || (s = "_dummyGS")), this.vars.onStart && (0 === this._totalTime && 0 !== y || e || this._callback("onStart"))), l = this._firstPT; l;) l.f ? l.t[l.p](l.c * this.ratio + l.s) : l.t[l.p] = l.c * this.ratio + l.s, l = l._next;
                        this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, !0, n), e || (this._totalTime !== g || s) && this._callback("onUpdate")), this._cycle !== v && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), s && (this._gc && !n || (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, !0, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[s] && this._callback(s), 0 === y && this._rawPrevTime === o && d !== o && (this._rawPrevTime = 0)))
                    } else g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
                }, s.to = function (t, e, i) {
                    return new s(t, e, i)
                }, s.from = function (t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new s(t, e, i)
                }, s.fromTo = function (t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new s(t, e, n)
                }, s.staggerTo = s.allTo = function (t, e, o, a, u, f, d) {
                    a = a || 0;
                    var p, m, _, g, v = 0, y = [], b = function () {
                        o.onComplete && o.onComplete.apply(o.onCompleteScope || this, arguments), u.apply(d || o.callbackScope || this, f || c)
                    }, w = o.cycle, T = o.startAt && o.startAt.cycle;
                    for (h(t) || ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t))), t = t || [], a < 0 && ((t = n(t)).reverse(), a *= -1), p = t.length - 1, _ = 0; _ <= p; _++) {
                        m = {};
                        for (g in o) m[g] = o[g];
                        if (w && (r(m, t, _), null != m.duration && (e = m.duration, delete m.duration)), T) {
                            T = m.startAt = {};
                            for (g in o.startAt) T[g] = o.startAt[g];
                            r(m.startAt, t, _)
                        }
                        m.delay = v + (m.delay || 0), _ === p && u && (m.onComplete = b), y[_] = new s(t[_], e, m), v += a
                    }
                    return y
                }, s.staggerFrom = s.allFrom = function (t, e, i, n, r, o, a) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, s.staggerTo(t, e, i, n, r, o, a)
                }, s.staggerFromTo = s.allFromTo = function (t, e, i, n, r, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, s.staggerTo(t, e, n, r, o, a, l)
                }, s.delayedCall = function (t, e, i, n, r) {
                    return new s(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, s.set = function (t, e) {
                    return new s(t, 0, e)
                }, s.isTweening = function (t) {
                    return i.getTweensOf(t, !0).length > 0
                };
                var f = function (t, e) {
                    for (var n = [], r = 0, s = t._first; s;) s instanceof i ? n[r++] = s : (e && (n[r++] = s), r = (n = n.concat(f(s, e))).length), s = s._next;
                    return n
                }, d = s.getAllTweens = function (e) {
                    return f(t._rootTimeline, e).concat(f(t._rootFramesTimeline, e))
                };
                s.killAll = function (t, i, n, r) {
                    null == i && (i = !0), null == n && (n = !0);
                    var s, o, a, l = d(0 != r), h = l.length, u = i && n && r;
                    for (a = 0; a < h; a++) o = l[a], (u || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && (t ? o.totalTime(o._reversed ? 0 : o.totalDuration()) : o._enabled(!1, !1))
                }, s.killChildTweensOf = function (t, e) {
                    if (null != t) {
                        var r, o, u, c, f, d = a.tweenLookup;
                        if ("string" == typeof t && (t = i.selector(t) || t), l(t) && (t = n(t)), h(t)) for (c = t.length; --c > -1;) s.killChildTweensOf(t[c], e); else {
                            r = [];
                            for (u in d) for (o = d[u].target.parentNode; o;) o === t && (r = r.concat(d[u].tweens)), o = o.parentNode;
                            for (f = r.length, c = 0; c < f; c++) e && r[c].totalTime(r[c].totalDuration()), r[c]._enabled(!1, !1)
                        }
                    }
                };
                var p = function (t, i, n, r) {
                    i = !1 !== i, n = !1 !== n;
                    for (var s, o, a = d(r = !1 !== r), l = i && n && r, h = a.length; --h > -1;) o = a[h], (l || o instanceof e || (s = o.target === o.vars.onComplete) && n || i && !s) && o.paused(t)
                };
                return s.pauseAll = function (t, e, i) {
                    p(!0, t, e, i)
                }, s.resumeAll = function (t, e, i) {
                    p(!1, t, e, i)
                }, s.globalTimeScale = function (e) {
                    var n = t._rootTimeline, r = i.ticker.time;
                    return arguments.length ? (e = e || o, n._startTime = r - (r - n._startTime) * n._timeScale / e, n = t._rootFramesTimeline, r = i.ticker.frame, n._startTime = r - (r - n._startTime) * n._timeScale / e, n._timeScale = t._rootTimeline._timeScale = e, e) : n._timeScale
                }, u.progress = function (t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
                }, u.totalProgress = function (t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
                }, u.time = function (t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, u.duration = function (e) {
                    return arguments.length ? t.prototype.duration.call(this, e) : this._duration
                }, u.totalDuration = function (t) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, u.repeat = function (t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, u.repeatDelay = function (t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, u.yoyo = function (t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, s
            }, !0), r._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, i) {
                var n = function (t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, n, r = this.vars;
                        for (n in r) i = r[n], h(i) && -1 !== i.join("").indexOf("{self}") && (r[n] = this._swapSelfInParams(i));
                        h(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    }, s = 1e-10, o = i._internals, a = n._internals = {}, l = o.isSelector, h = o.isArray,
                    u = o.lazyTweens, c = o.lazyRender, f = r._gsDefine.globals, d = function (t) {
                        var e, i = {};
                        for (e in t) i[e] = t[e];
                        return i
                    }, p = function (t, e, i) {
                        var n, r, s = t.cycle;
                        for (n in s) r = s[n], t[n] = "function" == typeof r ? r(i, e[i]) : r[i % r.length];
                        delete t.cycle
                    }, m = a.pauseCallback = function () {
                    }, _ = function (t) {
                        var e, i = [], n = t.length;
                        for (e = 0; e !== n; i.push(t[e++])) ;
                        return i
                    }, g = n.prototype = new e;
                return n.version = "1.20.3", g.constructor = n, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function (t, e, n, r) {
                    var s = n.repeat && f.TweenMax || i;
                    return e ? this.add(new s(t, e, n), r) : this.set(t, n, r)
                }, g.from = function (t, e, n, r) {
                    return this.add((n.repeat && f.TweenMax || i).from(t, e, n), r)
                }, g.fromTo = function (t, e, n, r, s) {
                    var o = r.repeat && f.TweenMax || i;
                    return e ? this.add(o.fromTo(t, e, n, r), s) : this.set(t, r, s)
                }, g.staggerTo = function (t, e, r, s, o, a, h, u) {
                    var c, f, m = new n({
                        onComplete: a,
                        onCompleteParams: h,
                        callbackScope: u,
                        smoothChildTiming: this.smoothChildTiming
                    }), g = r.cycle;
                    for ("string" == typeof t && (t = i.selector(t) || t), l(t = t || []) && (t = _(t)), (s = s || 0) < 0 && ((t = _(t)).reverse(), s *= -1), f = 0; f < t.length; f++) (c = d(r)).startAt && (c.startAt = d(c.startAt), c.startAt.cycle && p(c.startAt, t, f)), g && (p(c, t, f), null != c.duration && (e = c.duration, delete c.duration)), m.to(t[f], e, c, f * s);
                    return this.add(m, o)
                }, g.staggerFrom = function (t, e, i, n, r, s, o, a) {
                    return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, n, r, s, o, a)
                }, g.staggerFromTo = function (t, e, i, n, r, s, o, a, l) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, n, r, s, o, a, l)
                }, g.call = function (t, e, n, r) {
                    return this.add(i.delayedCall(0, t, e, n), r)
                }, g.set = function (t, e, n) {
                    return n = this._parseTimeOrLabel(n, 0, !0), null == e.immediateRender && (e.immediateRender = n === this._time && !this._paused), this.add(new i(t, 0, e), n)
                }, n.exportRoot = function (t, e) {
                    null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, s, o, a, l = new n(t), h = l._timeline;
                    for (null == e && (e = !0), h._remove(l, !0), l._startTime = 0, l._rawPrevTime = l._time = l._totalTime = h._time, o = h._first; o;) a = o._next, e && o instanceof i && o.target === o.vars.onComplete || ((s = o._startTime - o._delay) < 0 && (r = 1), l.add(o, s)), o = a;
                    return h.add(l, 0), r && l.totalDuration(), l
                }, g.add = function (r, s, o, a) {
                    var l, u, c, f, d, p;
                    if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && h(r)) {
                            for (o = o || "normal", a = a || 0, l = s, u = r.length, c = 0; c < u; c++) h(f = r[c]) && (f = new n({tweens: f})), this.add(f, l), "string" != typeof f && "function" != typeof f && ("sequence" === o ? l = f._startTime + f.totalDuration() / f._timeScale : "start" === o && (f._startTime -= f.delay())), l += a;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof r) return this.addLabel(r, s);
                        if ("function" != typeof r) throw"Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, s), r._time && r.render((this.rawTime() - r._startTime) * r._timeScale, !1, !1), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (p = (d = this).rawTime() > r._startTime; d._timeline;) p && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
                    return this
                }, g.remove = function (e) {
                    if (e instanceof t) {
                        this._remove(e, !1);
                        var i = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                        return e._startTime = (e._paused ? e._pauseTime : i._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
                    }
                    if (e instanceof Array || e && e.push && h(e)) {
                        for (var n = e.length; --n > -1;) this.remove(e[n]);
                        return this
                    }
                    return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
                }, g._remove = function (t, i) {
                    return e.prototype._remove.call(this, t, i), this._last ? this._time > this.duration() && (this._time = this._duration, this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, g.append = function (t, e) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
                }, g.insert = g.insertMultiple = function (t, e, i, n) {
                    return this.add(t, e || 0, i, n)
                }, g.appendMultiple = function (t, e, i, n) {
                    return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, n)
                }, g.addLabel = function (t, e) {
                    return this._labels[t] = this._parseTimeOrLabel(e), this
                }, g.addPause = function (t, e, n, r) {
                    var s = i.delayedCall(0, m, n, r || this);
                    return s.vars.onComplete = s.vars.onReverseComplete = e, s.data = "isPause", this._hasPause = !0, this.add(s, t)
                }, g.removeLabel = function (t) {
                    return delete this._labels[t], this
                }, g.getLabelTime = function (t) {
                    return null != this._labels[t] ? this._labels[t] : -1
                }, g._parseTimeOrLabel = function (e, i, n, r) {
                    var s, o;
                    if (r instanceof t && r.timeline === this) this.remove(r); else if (r && (r instanceof Array || r.push && h(r))) for (o = r.length; --o > -1;) r[o] instanceof t && r[o].timeline === this && this.remove(r[o]);
                    if (s = "number" != typeof e || i ? this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration : 0, "string" == typeof i) return this._parseTimeOrLabel(i, n && "number" == typeof e && null == this._labels[i] ? e - s : 0, n);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = s); else {
                        if (-1 === (o = e.indexOf("="))) return null == this._labels[e] ? n ? this._labels[e] = s + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, n) : s
                    }
                    return Number(e) + i
                }, g.seek = function (t, e) {
                    return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
                }, g.stop = function () {
                    return this.paused(!0)
                }, g.gotoAndPlay = function (t, e) {
                    return this.play(t, e)
                }, g.gotoAndStop = function (t, e) {
                    return this.pause(t, e)
                }, g.render = function (t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, r, o, a, l, h, f, d = this._time,
                        p = this._dirty ? this.totalDuration() : this._totalDuration, m = this._startTime,
                        _ = this._timeScale, g = this._paused;
                    if (d !== this._time && (t += this._time - d), t >= p - 1e-7 && t >= 0) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (r = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || this._rawPrevTime < 0 || this._rawPrevTime === s) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > s && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, t = p + 1e-4; else if (t < 1e-7) if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== s && (this._rawPrevTime > 0 || t < 0 && this._rawPrevTime >= 0)) && (a = "onReverseComplete", r = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = r = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t; else {
                        if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, 0 === t && r) for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
                        t = 0, this._initted || (l = !0)
                    } else {
                        if (this._hasPause && !this._forcingPlayhead && !e) {
                            if (t >= d) for (n = this._first; n && n._startTime <= t && !h;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (h = n), n = n._next; else for (n = this._last; n && n._startTime >= t && !h;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (h = n), n = n._prev;
                            h && (this._time = t = h._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                        }
                        this._totalTime = this._time = this._rawPrevTime = t
                    }
                    if (this._time !== d && this._first || i || l || h) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && (0 === this._time && this._duration || e || this._callback("onStart")), (f = this._time) >= d) for (n = this._first; n && (o = n._next, f === this._time && (!this._paused || g));) (n._active || n._startTime <= f && !n._paused && !n._gc) && (h === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o; else for (n = this._last; n && (o = n._prev, f === this._time && (!this._paused || g));) {
                            if (n._active || n._startTime <= d && !n._paused && !n._gc) {
                                if (h === n) {
                                    for (h = n._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (t - h._startTime) * h._timeScale : (t - h._startTime) * h._timeScale, e, i), h = h._prev;
                                    h = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = o
                        }
                        this._onUpdate && (e || (u.length && c(), this._callback("onUpdate"))), a && (this._gc || m !== this._startTime && _ === this._timeScale || (0 === this._time || p >= this.totalDuration()) && (r && (u.length && c(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
                    }
                }, g._hasPausedChild = function () {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof n && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, g.getChildren = function (t, e, n, r) {
                    r = r || -9999999999;
                    for (var s = [], o = this._first, a = 0; o;) o._startTime < r || (o instanceof i ? !1 !== e && (s[a++] = o) : (!1 !== n && (s[a++] = o), !1 !== t && (a = (s = s.concat(o.getChildren(!0, e, n))).length))), o = o._next;
                    return s
                }, g.getTweensOf = function (t, e) {
                    var n, r, s = this._gc, o = [], a = 0;
                    for (s && this._enabled(!0, !0), r = (n = i.getTweensOf(t)).length; --r > -1;) (n[r].timeline === this || e && this._contains(n[r])) && (o[a++] = n[r]);
                    return s && this._enabled(!1, !0), o
                }, g.recent = function () {
                    return this._recent
                }, g._contains = function (t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, g.shiftChildren = function (t, e, i) {
                    i = i || 0;
                    for (var n, r = this._first, s = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e) for (n in s) s[n] >= i && (s[n] += t);
                    return this._uncache(!0)
                }, g._kill = function (t, e) {
                    if (!t && !e) return this._enabled(!1, !1);
                    for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), n = i.length, r = !1; --n > -1;) i[n]._kill(t, e) && (r = !0);
                    return r
                }, g.clear = function (t) {
                    var e = this.getChildren(!1, !0, !0), i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return !1 !== t && (this._labels = {}), this._uncache(!0)
                }, g.invalidate = function () {
                    for (var e = this._first; e;) e.invalidate(), e = e._next;
                    return t.prototype.invalidate.call(this)
                }, g._enabled = function (t, i) {
                    if (t === this._gc) for (var n = this._first; n;) n._enabled(t, !0), n = n._next;
                    return e.prototype._enabled.call(this, t, i)
                }, g.totalTime = function (e, i, n) {
                    this._forcingPlayhead = !0;
                    var r = t.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, r
                }, g.duration = function (t) {
                    return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
                }, g.totalDuration = function (t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, n = 0, r = this._last, s = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > s && this._sortChildren && !r._paused && !this._calculatingDuration ? (this._calculatingDuration = 1, this.add(r, r._startTime - r._delay), this._calculatingDuration = 0) : s = r._startTime, r._startTime < 0 && !r._paused && (n -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale, this._time -= r._startTime, this._totalTime -= r._startTime, this._rawPrevTime -= r._startTime), this.shiftChildren(-r._startTime, !1, -9999999999), s = 0), (i = r._startTime + r._totalDuration / r._timeScale) > n && (n = i), r = e;
                            this._duration = this._totalDuration = n, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this
                }, g.paused = function (e) {
                    if (!e) for (var i = this._first, n = this._time; i;) i._startTime === n && "isPause" === i.data && (i._rawPrevTime = 0), i = i._next;
                    return t.prototype.paused.apply(this, arguments)
                }, g.usesFrames = function () {
                    for (var e = this._timeline; e._timeline;) e = e._timeline;
                    return e === t._rootFramesTimeline
                }, g.rawTime = function (t) {
                    return t && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() < 1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ? this._totalTime : (this._timeline.rawTime(t) - this._startTime) * this._timeScale
                }, n
            }, !0), r._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, i) {
                var n = function (e) {
                        t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
                    }, s = 1e-10, o = e._internals, a = o.lazyTweens, l = o.lazyRender, h = r._gsDefine.globals,
                    u = new i(null, null, 1, 0), c = n.prototype = new t;
                return c.constructor = n, c.kill()._gc = !1, n.version = "1.20.3", c.invalidate = function () {
                    return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
                }, c.addCallback = function (t, i, n, r) {
                    return this.add(e.delayedCall(0, t, n, r), i)
                }, c.removeCallback = function (t, e) {
                    if (t) if (null == e) this._kill(null, t); else for (var i = this.getTweensOf(t, !1), n = i.length, r = this._parseTimeOrLabel(e); --n > -1;) i[n]._startTime === r && i[n]._enabled(!1, !1);
                    return this
                }, c.removePause = function (e) {
                    return this.removeCallback(t._internals.pauseCallback, e)
                }, c.tweenTo = function (t, i) {
                    i = i || {};
                    var n, r, s, o = {ease: u, useFrames: this.usesFrames(), immediateRender: !1},
                        a = i.repeat && h.TweenMax || e;
                    for (r in i) o[r] = i[r];
                    return o.time = this._parseTimeOrLabel(t), n = Math.abs(Number(o.time) - this._time) / this._timeScale || .001, s = new a(this, n, o), o.onStart = function () {
                        s.target.paused(!0), s.vars.time !== s.target.time() && n === s.duration() && s.duration(Math.abs(s.vars.time - s.target.time()) / s.target._timeScale), i.onStart && i.onStart.apply(i.onStartScope || i.callbackScope || s, i.onStartParams || [])
                    }, s
                }, c.tweenFromTo = function (t, e, i) {
                    i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                        onComplete: this.seek,
                        onCompleteParams: [t],
                        callbackScope: this
                    }, i.immediateRender = !1 !== i.immediateRender;
                    var n = this.tweenTo(e, i);
                    return n.duration(Math.abs(n.vars.time - t) / this._timeScale || .001)
                }, c.render = function (t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var n, r, o, h, u, c, f, d, p = this._time,
                        m = this._dirty ? this.totalDuration() : this._totalDuration, _ = this._duration,
                        g = this._totalTime, v = this._startTime, y = this._timeScale, b = this._rawPrevTime,
                        w = this._paused, T = this._cycle;
                    if (p !== this._time && (t += this._time - p), t >= m - 1e-7 && t >= 0) this._locked || (this._totalTime = m, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (r = !0, h = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && t >= -1e-7 || b < 0 || b === s) && b !== t && this._first && (u = !0, b > s && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : s, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = _, t = _ + 1e-4); else if (t < 1e-7) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === _ && b !== s && (b > 0 || t < 0 && b >= 0) && !this._locked) && (h = "onReverseComplete", r = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = r = !0, h = "onReverseComplete") : b >= 0 && this._first && (u = !0), this._rawPrevTime = t; else {
                        if (this._rawPrevTime = _ || !e || t || this._rawPrevTime === t ? t : s, 0 === t && r) for (n = this._first; n && 0 === n._startTime;) n._duration || (r = !1), n = n._next;
                        t = 0, this._initted || (u = !0)
                    } else if (0 === _ && b < 0 && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = _ + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && g <= t && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 != (1 & this._cycle) && (this._time = _ - this._time), this._time > _ ? (this._time = _, t = _ + 1e-4) : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                        if ((t = this._time) >= p || this._repeat && T !== this._cycle) for (n = this._first; n && n._startTime <= t && !f;) n._duration || "isPause" !== n.data || n.ratio || 0 === n._startTime && 0 === this._rawPrevTime || (f = n), n = n._next; else for (n = this._last; n && n._startTime >= t && !f;) n._duration || "isPause" === n.data && n._rawPrevTime > 0 && (f = n), n = n._prev;
                        f && f._startTime < _ && (this._time = t = f._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                    }
                    if (this._cycle !== T && !this._locked) {
                        var x = this._yoyo && 0 != (1 & T), P = x === (this._yoyo && 0 != (1 & this._cycle)),
                            S = this._totalTime, k = this._cycle, E = this._rawPrevTime, C = this._time;
                        if (this._totalTime = T * _, this._cycle < T ? x = !x : this._totalTime += _, this._time = p, this._rawPrevTime = 0 === _ ? b - 1e-4 : b, this._cycle = T, this._locked = !0, p = x ? 0 : _, this.render(p, e, 0 === _), e || this._gc || this.vars.onRepeat && (this._cycle = k, this._locked = !1, this._callback("onRepeat")), p !== this._time) return;
                        if (P && (this._cycle = T, this._locked = !0, p = x ? _ + 1e-4 : -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !w) return;
                        this._time = C, this._totalTime = S, this._cycle = k, this._rawPrevTime = E
                    }
                    if (this._time !== p && this._first || i || u || f) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && (0 === this._totalTime && this._totalDuration || e || this._callback("onStart")), (d = this._time) >= p) for (n = this._first; n && (o = n._next, d === this._time && (!this._paused || w));) (n._active || n._startTime <= this._time && !n._paused && !n._gc) && (f === n && this.pause(), n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = o; else for (n = this._last; n && (o = n._prev, d === this._time && (!this._paused || w));) {
                            if (n._active || n._startTime <= p && !n._paused && !n._gc) {
                                if (f === n) {
                                    for (f = n._prev; f && f.endTime() > this._time;) f.render(f._reversed ? f.totalDuration() - (t - f._startTime) * f._timeScale : (t - f._startTime) * f._timeScale, e, i), f = f._prev;
                                    f = null, this.pause()
                                }
                                n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)
                            }
                            n = o
                        }
                        this._onUpdate && (e || (a.length && l(), this._callback("onUpdate"))), h && (this._locked || this._gc || v !== this._startTime && y === this._timeScale || (0 === this._time || m >= this.totalDuration()) && (r && (a.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
                    } else g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
                }, c.getActive = function (t, e, i) {
                    null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
                    var n, r, s = [], o = this.getChildren(t, e, i), a = 0, l = o.length;
                    for (n = 0; n < l; n++) (r = o[n]).isActive() && (s[a++] = r);
                    return s
                }, c.getLabelAfter = function (t) {
                    t || 0 !== t && (t = this._time);
                    var e, i = this.getLabelsArray(), n = i.length;
                    for (e = 0; e < n; e++) if (i[e].time > t) return i[e].name;
                    return null
                }, c.getLabelBefore = function (t) {
                    null == t && (t = this._time);
                    for (var e = this.getLabelsArray(), i = e.length; --i > -1;) if (e[i].time < t) return e[i].name;
                    return null
                }, c.getLabelsArray = function () {
                    var t, e = [], i = 0;
                    for (t in this._labels) e[i++] = {time: this._labels[t], name: t};
                    return e.sort(function (t, e) {
                        return t.time - e.time
                    }), e
                }, c.invalidate = function () {
                    return this._locked = !1, t.prototype.invalidate.call(this)
                }, c.progress = function (t, e) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration() || 0
                }, c.totalProgress = function (t, e) {
                    return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration() || 0
                }, c.totalDuration = function (e) {
                    return arguments.length ? -1 !== this._repeat && e ? this.timeScale(this.totalDuration() / e) : this : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, c.time = function (t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
                }, c.repeat = function (t) {
                    return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
                }, c.repeatDelay = function (t) {
                    return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
                }, c.yoyo = function (t) {
                    return arguments.length ? (this._yoyo = t, this) : this._yoyo
                }, c.currentLabel = function (t) {
                    return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
                }, n
            }, !0), t = 180 / Math.PI, e = [], i = [], n = [], s = {}, o = r._gsDefine.globals, a = function (t, e, i, n) {
                i === n && (i = n - (n - e) / 1e6), t === e && (e = t + (i - t) / 1e6), this.a = t, this.b = e, this.c = i, this.d = n, this.da = n - t, this.ca = i - t, this.ba = e - t
            }, l = function (t, e, i, n) {
                var r = {a: t}, s = {}, o = {}, a = {c: n}, l = (t + e) / 2, h = (e + i) / 2, u = (i + n) / 2,
                    c = (l + h) / 2, f = (h + u) / 2, d = (f - c) / 8;
                return r.b = l + (t - l) / 4, s.b = c + d, r.c = s.a = (r.b + s.b) / 2, s.c = o.a = (c + f) / 2, o.b = f - d, a.b = u + (n - u) / 4, o.c = a.a = (o.b + a.b) / 2, [r, s, o, a]
            }, h = function (t, r, s, o, a) {
                var h, u, c, f, d, p, m, _, g, v, y, b, w, T = t.length - 1, x = 0, P = t[0].a;
                for (h = 0; h < T; h++) u = (d = t[x]).a, c = d.d, f = t[x + 1].d, a ? (y = e[h], w = ((b = i[h]) + y) * r * .25 / (o ? .5 : n[h] || .5), _ = c - ((p = c - (c - u) * (o ? .5 * r : 0 !== y ? w / y : 0)) + (((m = c + (f - c) * (o ? .5 * r : 0 !== b ? w / b : 0)) - p) * (3 * y / (y + b) + .5) / 4 || 0))) : _ = c - ((p = c - (c - u) * r * .5) + (m = c + (f - c) * r * .5)) / 2, p += _, m += _, d.c = g = p, d.b = 0 !== h ? P : P = d.a + .6 * (d.c - d.a), d.da = c - u, d.ca = g - u, d.ba = P - u, s ? (v = l(u, P, g, c), t.splice(x, 1, v[0], v[1], v[2], v[3]), x += 4) : x++, P = m;
                (d = t[x]).b = P, d.c = P + .4 * (d.d - P), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = P - d.a, s && (v = l(d.a, P, d.c, d.d), t.splice(x, 1, v[0], v[1], v[2], v[3]))
            }, u = function (t, n, r, s) {
                var o, l, h, u, c, f, d = [];
                if (s) for (l = (t = [s].concat(t)).length; --l > -1;) "string" == typeof (f = t[l][n]) && "=" === f.charAt(1) && (t[l][n] = s[n] + Number(f.charAt(0) + f.substr(2)));
                if ((o = t.length - 2) < 0) return d[0] = new a(t[0][n], 0, 0, t[0][n]), d;
                for (l = 0; l < o; l++) h = t[l][n], u = t[l + 1][n], d[l] = new a(h, 0, 0, u), r && (c = t[l + 2][n], e[l] = (e[l] || 0) + (u - h) * (u - h), i[l] = (i[l] || 0) + (c - u) * (c - u));
                return d[l] = new a(t[l][n], 0, 0, t[l + 1][n]), d
            }, c = function (t, r, o, a, l, c) {
                var f, d, p, m, _, g, v, y, b = {}, w = [], T = c || t[0];
                l = "string" == typeof l ? "," + l + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == r && (r = 1);
                for (d in t[0]) w.push(d);
                if (t.length > 1) {
                    for (y = t[t.length - 1], v = !0, f = w.length; --f > -1;) if (d = w[f], Math.abs(T[d] - y[d]) > .05) {
                        v = !1;
                        break
                    }
                    v && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
                }
                for (e.length = i.length = n.length = 0, f = w.length; --f > -1;) d = w[f], s[d] = -1 !== l.indexOf("," + d + ","), b[d] = u(t, d, s[d], c);
                for (f = e.length; --f > -1;) e[f] = Math.sqrt(e[f]), i[f] = Math.sqrt(i[f]);
                if (!a) {
                    for (f = w.length; --f > -1;) if (s[d]) for (g = (p = b[w[f]]).length - 1, m = 0; m < g; m++) _ = p[m + 1].da / i[m] + p[m].da / e[m] || 0, n[m] = (n[m] || 0) + _ * _;
                    for (f = n.length; --f > -1;) n[f] = Math.sqrt(n[f])
                }
                for (f = w.length, m = o ? 4 : 1; --f > -1;) p = b[d = w[f]], h(p, r, o, a, s[d]), v && (p.splice(0, m), p.splice(p.length - m, m));
                return b
            }, f = function (t, e, i) {
                for (var n, r, s, o, a, l, h, u, c, f, d, p = 1 / i, m = t.length; --m > -1;) for (s = (f = t[m]).a, o = f.d - s, a = f.c - s, l = f.b - s, n = r = 0, u = 1; u <= i; u++) n = r - (r = ((h = p * u) * h * o + 3 * (c = 1 - h) * (h * a + c * l)) * h), e[d = m * i + u - 1] = (e[d] || 0) + n * n
            }, d = r._gsDefine.plugin({
                propName: "bezier", priority: -1, version: "1.3.8", API: 2, global: !0, init: function (t, e, i) {
                    this._target = t, e instanceof Array && (e = {values: e}), this._func = {}, this._mod = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var n, r, s, o, l, h = e.values || [], u = {}, d = h[0], p = e.autoRotate || i.vars.orientToBezier;
                    this._autoRotate = p ? p instanceof Array ? p : [["x", "y", "rotation", !0 === p ? 0 : Number(p) || 0]] : null;
                    for (n in d) this._props.push(n);
                    for (s = this._props.length; --s > -1;) n = this._props[s], this._overwriteProps.push(n), r = this._func[n] = "function" == typeof t[n], u[n] = r ? t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)]() : parseFloat(t[n]), l || u[n] !== h[0][n] && (l = u);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? c(h, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, l) : function (t, e, i) {
                        var n, r, s, o, l, h, u, c, f, d, p, m = {}, _ = "cubic" === (e = e || "soft") ? 3 : 2,
                            g = "soft" === e, v = [];
                        if (g && i && (t = [i].concat(t)), null == t || t.length < _ + 1) throw"invalid Bezier data";
                        for (f in t[0]) v.push(f);
                        for (h = v.length; --h > -1;) {
                            for (m[f = v[h]] = l = [], d = 0, c = t.length, u = 0; u < c; u++) n = null == i ? t[u][f] : "string" == typeof (p = t[u][f]) && "=" === p.charAt(1) ? i[f] + Number(p.charAt(0) + p.substr(2)) : Number(p), g && u > 1 && u < c - 1 && (l[d++] = (n + l[d - 2]) / 2), l[d++] = n;
                            for (c = d - _ + 1, d = 0, u = 0; u < c; u += _) n = l[u], r = l[u + 1], s = l[u + 2], o = 2 === _ ? 0 : l[u + 3], l[d++] = p = 3 === _ ? new a(n, r, s, o) : new a(n, (2 * r + n) / 3, (2 * r + s) / 3, s);
                            l.length = d
                        }
                        return m
                    }(h, e.type, u), this._segCount = this._beziers[n].length, this._timeRes) {
                        var m = function (t, e) {
                            var i, n, r, s, o = [], a = [], l = 0, h = 0, u = (e = e >> 0 || 6) - 1, c = [], d = [];
                            for (i in t) f(t[i], o, e);
                            for (r = o.length, n = 0; n < r; n++) l += Math.sqrt(o[n]), d[s = n % e] = l, s === u && (h += l, c[s = n / e >> 0] = d, a[s] = h, l = 0, d = []);
                            return {length: h, lengths: a, segments: c}
                        }(this._beziers, this._timeRes);
                        this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (p = this._autoRotate) for (this._initialRotations = [], p[0] instanceof Array || (this._autoRotate = p = [p]), s = p.length; --s > -1;) {
                        for (o = 0; o < 3; o++) n = p[s][o], this._func[n] = "function" == typeof t[n] && t[n.indexOf("set") || "function" != typeof t["get" + n.substr(3)] ? n : "get" + n.substr(3)];
                        n = p[s][2], this._initialRotations[s] = (this._func[n] ? this._func[n].call(this._target) : this._target[n]) || 0, this._overwriteProps.push(n)
                    }
                    return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
                }, set: function (e) {
                    var i, n, r, s, o, a, l, h, u, c, f = this._segCount, d = this._func, p = this._target,
                        m = e !== this._startRatio;
                    if (this._timeRes) {
                        if (u = this._lengths, c = this._curSeg, e *= this._length, r = this._li, e > this._l2 && r < f - 1) {
                            for (h = f - 1; r < h && (this._l2 = u[++r]) <= e;) ;
                            this._l1 = u[r - 1], this._li = r, this._curSeg = c = this._segments[r], this._s2 = c[this._s1 = this._si = 0]
                        } else if (e < this._l1 && r > 0) {
                            for (; r > 0 && (this._l1 = u[--r]) >= e;) ;
                            0 === r && e < this._l1 ? this._l1 = 0 : r++, this._l2 = u[r], this._li = r, this._curSeg = c = this._segments[r], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                        }
                        if (i = r, e -= this._l1, r = this._si, e > this._s2 && r < c.length - 1) {
                            for (h = c.length - 1; r < h && (this._s2 = c[++r]) <= e;) ;
                            this._s1 = c[r - 1], this._si = r
                        } else if (e < this._s1 && r > 0) {
                            for (; r > 0 && (this._s1 = c[--r]) >= e;) ;
                            0 === r && e < this._s1 ? this._s1 = 0 : r++, this._s2 = c[r], this._si = r
                        }
                        a = (r + (e - this._s1) / (this._s2 - this._s1)) * this._prec || 0
                    } else a = (e - (i = e < 0 ? 0 : e >= 1 ? f - 1 : f * e >> 0) * (1 / f)) * f;
                    for (n = 1 - a, r = this._props.length; --r > -1;) s = this._props[r], l = (a * a * (o = this._beziers[s][i]).da + 3 * n * (a * o.ca + n * o.ba)) * a + o.a, this._mod[s] && (l = this._mod[s](l, p)), d[s] ? p[s](l) : p[s] = l;
                    if (this._autoRotate) {
                        var _, g, v, y, b, w, T, x = this._autoRotate;
                        for (r = x.length; --r > -1;) s = x[r][2], w = x[r][3] || 0, T = !0 === x[r][4] ? 1 : t, o = this._beziers[x[r][0]], _ = this._beziers[x[r][1]], o && _ && (o = o[i], _ = _[i], g = o.a + (o.b - o.a) * a, g += ((y = o.b + (o.c - o.b) * a) - g) * a, y += (o.c + (o.d - o.c) * a - y) * a, v = _.a + (_.b - _.a) * a, v += ((b = _.b + (_.c - _.b) * a) - v) * a, b += (_.c + (_.d - _.c) * a - b) * a, l = m ? Math.atan2(b - v, y - g) * T + w : this._initialRotations[r], this._mod[s] && (l = this._mod[s](l, p)), d[s] ? p[s](l) : p[s] = l)
                    }
                }
            }), p = d.prototype, d.bezierThrough = c, d.cubicToQuadratic = l, d._autoCSS = !0, d.quadraticToCubic = function (t, e, i) {
                return new a(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
            }, d._cssRegister = function () {
                var t = o.CSSPlugin;
                if (t) {
                    var e = t._internals, i = e._parseToProxy, n = e._setPluginRatio, r = e.CSSPropTween;
                    e._registerComplexSpecialProp("bezier", {
                        parser: function (t, e, s, o, a, l) {
                            e instanceof Array && (e = {values: e}), l = new d;
                            var h, u, c, f = e.values, p = f.length - 1, m = [], _ = {};
                            if (p < 0) return a;
                            for (h = 0; h <= p; h++) c = i(t, f[h], o, a, l, p !== h), m[h] = c.end;
                            for (u in e) _[u] = e[u];
                            return _.values = m, (a = new r(t, "bezier", 0, 0, c.pt, 2)).data = c, a.plugin = l, a.setRatio = n, 0 === _.autoRotate && (_.autoRotate = !0), !_.autoRotate || _.autoRotate instanceof Array || (h = !0 === _.autoRotate ? 0 : Number(_.autoRotate), _.autoRotate = null != c.end.left ? [["left", "top", "rotation", h, !1]] : null != c.end.x && [["x", "y", "rotation", h, !1]]), _.autoRotate && (o._transform || o._enableTransforms(!1), c.autoRotate = o._target._gsTransform, c.proxy.rotation = c.autoRotate.rotation || 0, o._overwriteProps.push("rotation")), l._onInitTween(c.proxy, _, o._tween), a
                        }
                    })
                }
            }, p._mod = function (t) {
                for (var e, i = this._overwriteProps, n = i.length; --n > -1;) (e = t[i[n]]) && "function" == typeof e && (this._mod[i[n]] = e)
            }, p._kill = function (t) {
                var e, i, n = this._props;
                for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], i = n.length; --i > -1;) n[i] === e && n.splice(i, 1);
                if (n = this._autoRotate) for (i = n.length; --i > -1;) t[n[i][2]] && n.splice(i, 1);
                return this._super._kill.call(this, t)
            }, r._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
                var i, n, s, o, a = function () {
                    t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = a.prototype.setRatio
                }, l = r._gsDefine.globals, h = {}, u = a.prototype = new t("css");
                u.constructor = a, a.version = "1.20.3", a.API = 2, a.defaultTransformPerspective = 0, a.defaultSkewType = "compensated", a.defaultSmoothOrigin = !0, u = "px", a.suffixMap = {
                    top: u,
                    right: u,
                    bottom: u,
                    left: u,
                    width: u,
                    height: u,
                    fontSize: u,
                    padding: u,
                    margin: u,
                    perspective: u,
                    lineHeight: ""
                };
                var c, f, d, p, m, _, g, v, y, b, w = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
                    T = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    x = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    P = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, S = /(?:\d|\-|\+|=|#|\.)*/g,
                    k = /opacity *= *([^)]*)/i, E = /opacity:([^;]*)/i, C = /alpha\(opacity *=.+?\)/i, A = /^(rgb|hsl)/,
                    O = /([A-Z])/g, D = /-([a-z])/gi, L = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    M = function (t, e) {
                        return e.toUpperCase()
                    }, z = /(?:Left|Right|Width)/i, R = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    I = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, F = /,(?=[^\)]*(?:\(|$))/gi,
                    N = /[\s,\(]/i, j = Math.PI / 180, B = 180 / Math.PI, W = {}, X = {style: {}}, Y = r.document || {
                        createElement: function () {
                            return X
                        }
                    }, q = function (t, e) {
                        return Y.createElementNS ? Y.createElementNS(e || "http://www.w3.org/1999/xhtml", t) : Y.createElement(t)
                    }, U = q("div"), H = q("img"), V = a._internals = {_specialProps: h},
                    G = (r.navigator || {}).userAgent || "",
                    $ = (y = G.indexOf("Android"), b = q("a"), d = -1 !== G.indexOf("Safari") && -1 === G.indexOf("Chrome") && (-1 === y || parseFloat(G.substr(y + 8, 2)) > 3), m = d && parseFloat(G.substr(G.indexOf("Version/") + 8, 2)) < 6, p = -1 !== G.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(G) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(G)) && (_ = parseFloat(RegExp.$1)), !!b && (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity))),
                    Q = function (t) {
                        return k.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    }, Z = function (t) {
                        r.console && console.log(t)
                    }, K = "", J = "", tt = function (t, e) {
                        var i, n, r = (e = e || U).style;
                        if (void 0 !== r[t]) return t;
                        for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], n = 5; --n > -1 && void 0 === r[i[n] + t];) ;
                        return n >= 0 ? (K = "-" + (J = 3 === n ? "ms" : i[n]).toLowerCase() + "-", J + t) : null
                    }, et = Y.defaultView ? Y.defaultView.getComputedStyle : function () {
                    }, it = a.getStyle = function (t, e, i, n, r) {
                        var s;
                        return $ || "opacity" !== e ? (!n && t.style[e] ? s = t.style[e] : (i = i || et(t)) ? s = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(O, "-$1").toLowerCase()) : t.currentStyle && (s = t.currentStyle[e]), null == r || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : r) : Q(t)
                    }, nt = V.convertToPixels = function (t, i, n, r, s) {
                        if ("px" === r || !r && "lineHeight" !== i) return n;
                        if ("auto" === r || !n) return 0;
                        var o, l, h, u = z.test(i), c = t, f = U.style, d = n < 0, p = 1 === n;
                        if (d && (n = -n), p && (n *= 100), "lineHeight" !== i || r) if ("%" === r && -1 !== i.indexOf("border")) o = n / 100 * (u ? t.clientWidth : t.clientHeight); else {
                            if (f.cssText = "border:0 solid red;position:" + it(t, "position") + ";line-height:0;", "%" !== r && c.appendChild && "v" !== r.charAt(0) && "rem" !== r) f[u ? "borderLeftWidth" : "borderTopWidth"] = n + r; else {
                                if (c = t.parentNode || Y.body, -1 !== it(c, "display").indexOf("flex") && (f.position = "absolute"), l = c._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * n / 100;
                                f[u ? "width" : "height"] = n + r
                            }
                            c.appendChild(U), o = parseFloat(U[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(U), u && "%" === r && !1 !== a.cacheWidths && ((l = c._gsCache = c._gsCache || {}).time = h, l.width = o / n * 100), 0 !== o || s || (o = nt(t, i, n, r, !0))
                        } else l = et(t).lineHeight, t.style.lineHeight = n, o = parseFloat(et(t).lineHeight), t.style.lineHeight = l;
                        return p && (o /= 100), d ? -o : o
                    }, rt = V.calculateOffset = function (t, e, i) {
                        if ("absolute" !== it(t, "position", i)) return 0;
                        var n = "left" === e ? "Left" : "Top", r = it(t, "margin" + n, i);
                        return t["offset" + n] - (nt(t, e, parseFloat(r), r.replace(S, "")) || 0)
                    }, st = function (t, e) {
                        var i, n, r, s = {};
                        if (e = e || et(t, null)) if (i = e.length) for (; --i > -1;) -1 !== (r = e[i]).indexOf("-transform") && It !== r || (s[r.replace(D, M)] = e.getPropertyValue(r)); else for (i in e) -1 !== i.indexOf("Transform") && Rt !== i || (s[i] = e[i]); else if (e = t.currentStyle || t.style) for (i in e) "string" == typeof i && void 0 === s[i] && (s[i.replace(D, M)] = e[i]);
                        return $ || (s.opacity = Q(t)), n = $t(t, e, !1), s.rotation = n.rotation, s.skewX = n.skewX, s.scaleX = n.scaleX, s.scaleY = n.scaleY, s.x = n.x, s.y = n.y, Nt && (s.z = n.z, s.rotationX = n.rotationX, s.rotationY = n.rotationY, s.scaleZ = n.scaleZ), s.filters && delete s.filters, s
                    }, ot = function (t, e, i, n, r) {
                        var s, o, a, l = {}, h = t.style;
                        for (o in i) "cssText" !== o && "length" !== o && isNaN(o) && (e[o] !== (s = i[o]) || r && r[o]) && -1 === o.indexOf("Origin") && ("number" != typeof s && "string" != typeof s || (l[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof e[o] || "" === e[o].replace(P, "") ? s : 0 : rt(t, o), void 0 !== h[o] && (a = new wt(h, o, h[o], a))));
                        if (n) for (o in n) "className" !== o && (l[o] = n[o]);
                        return {difs: l, firstMPT: a}
                    }, at = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
                    lt = ["marginLeft", "marginRight", "marginTop", "marginBottom"], ht = function (t, e, i) {
                        if ("svg" === (t.nodeName + "").toLowerCase()) return (i || et(t))[e] || 0;
                        if (t.getCTM && Ht(t)) return t.getBBox()[e] || 0;
                        var n = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), r = at[e], s = r.length;
                        for (i = i || et(t, null); --s > -1;) n -= parseFloat(it(t, "padding" + r[s], i, !0)) || 0, n -= parseFloat(it(t, "border" + r[s] + "Width", i, !0)) || 0;
                        return n
                    }, ut = function (t, e) {
                        if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                        null != t && "" !== t || (t = "0 0");
                        var i, n = t.split(" "),
                            r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : n[0],
                            s = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : n[1];
                        if (n.length > 3 && !e) {
                            for (n = t.split(", ").join(",").split(","), t = [], i = 0; i < n.length; i++) t.push(ut(n[i]));
                            return t.join(",")
                        }
                        return null == s ? s = "center" === r ? "50%" : "0" : "center" === s && (s = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + s + (n.length > 2 ? " " + n[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== s.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === s.charAt(1), e.ox = parseFloat(r.replace(P, "")), e.oy = parseFloat(s.replace(P, "")), e.v = t), e || t
                    }, ct = function (t, e) {
                        return "function" == typeof t && (t = t(v, g)), "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
                    }, ft = function (t, e) {
                        return "function" == typeof t && (t = t(v, g)), null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
                    }, dt = function (t, e, i, n) {
                        var r, s, o, a, l;
                        return "function" == typeof t && (t = t(v, g)), null == t ? a = e : "number" == typeof t ? a = t : (r = 360, s = t.split("_"), o = ((l = "=" === t.charAt(1)) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(s[0].substr(2)) : parseFloat(s[0])) * (-1 === t.indexOf("rad") ? 1 : B) - (l ? 0 : e), s.length && (n && (n[i] = e + o), -1 !== t.indexOf("short") && (o %= r) !== o % (r / 2) && (o = o < 0 ? o + r : o - r), -1 !== t.indexOf("_cw") && o < 0 ? o = (o + 9999999999 * r) % r - (o / r | 0) * r : -1 !== t.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * r) % r - (o / r | 0) * r)), a = e + o), a < 1e-6 && a > -1e-6 && (a = 0), a
                    }, pt = {
                        aqua: [0, 255, 255],
                        lime: [0, 255, 0],
                        silver: [192, 192, 192],
                        black: [0, 0, 0],
                        maroon: [128, 0, 0],
                        teal: [0, 128, 128],
                        blue: [0, 0, 255],
                        navy: [0, 0, 128],
                        white: [255, 255, 255],
                        fuchsia: [255, 0, 255],
                        olive: [128, 128, 0],
                        yellow: [255, 255, 0],
                        orange: [255, 165, 0],
                        gray: [128, 128, 128],
                        purple: [128, 0, 128],
                        green: [0, 128, 0],
                        red: [255, 0, 0],
                        pink: [255, 192, 203],
                        cyan: [0, 255, 255],
                        transparent: [255, 255, 255, 0]
                    }, mt = function (t, e, i) {
                        return 255 * (6 * (t = t < 0 ? t + 1 : t > 1 ? t - 1 : t) < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
                    }, _t = a.parseColor = function (t, e) {
                        var i, n, r, s, o, a, l, h, u, c, f;
                        if (t) if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t]; else {
                            if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), pt[t]) i = pt[t]; else if ("#" === t.charAt(0)) 4 === t.length && (t = "#" + (n = t.charAt(1)) + n + (r = t.charAt(2)) + r + (s = t.charAt(3)) + s), i = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t]; else if ("hsl" === t.substr(0, 3)) if (i = f = t.match(w), e) {
                                if (-1 !== t.indexOf("=")) return t.match(T)
                            } else o = Number(i[0]) % 360 / 360, a = Number(i[1]) / 100, n = 2 * (l = Number(i[2]) / 100) - (r = l <= .5 ? l * (a + 1) : l + a - l * a), i.length > 3 && (i[3] = Number(i[3])), i[0] = mt(o + 1 / 3, n, r), i[1] = mt(o, n, r), i[2] = mt(o - 1 / 3, n, r); else i = t.match(w) || pt.transparent;
                            i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), i.length > 3 && (i[3] = Number(i[3]))
                        } else i = pt.black;
                        return e && !f && (n = i[0] / 255, r = i[1] / 255, s = i[2] / 255, l = ((h = Math.max(n, r, s)) + (u = Math.min(n, r, s))) / 2, h === u ? o = a = 0 : (c = h - u, a = l > .5 ? c / (2 - h - u) : c / (h + u), o = h === n ? (r - s) / c + (r < s ? 6 : 0) : h === r ? (s - n) / c + 2 : (n - r) / c + 4, o *= 60), i[0] = o + .5 | 0, i[1] = 100 * a + .5 | 0, i[2] = 100 * l + .5 | 0), i
                    }, gt = function (t, e) {
                        var i, n, r, s = t.match(vt) || [], o = 0, a = "";
                        if (!s.length) return t;
                        for (i = 0; i < s.length; i++) n = s[i], o += (r = t.substr(o, t.indexOf(n, o) - o)).length + n.length, 3 === (n = _t(n, e)).length && n.push(1), a += r + (e ? "hsla(" + n[0] + "," + n[1] + "%," + n[2] + "%," + n[3] : "rgba(" + n.join(",")) + ")";
                        return a + t.substr(o)
                    }, vt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
                for (u in pt) vt += "|" + u + "\\b";
                vt = new RegExp(vt + ")", "gi"), a.colorStringFilter = function (t) {
                    var e, i = t[0] + " " + t[1];
                    vt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = gt(t[0], e), t[1] = gt(t[1], e)), vt.lastIndex = 0
                }, e.defaultStringFilter || (e.defaultStringFilter = a.colorStringFilter);
                var yt = function (t, e, i, n) {
                    if (null == t) return function (t) {
                        return t
                    };
                    var r, s = e ? (t.match(vt) || [""])[0] : "", o = t.split(s).join("").match(x) || [],
                        a = t.substr(0, t.indexOf(o[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "",
                        h = -1 !== t.indexOf(" ") ? " " : ",", u = o.length, c = u > 0 ? o[0].replace(w, "") : "";
                    return u ? r = e ? function (t) {
                        var e, f, d, p;
                        if ("number" == typeof t) t += c; else if (n && F.test(t)) {
                            for (p = t.replace(F, "|").split("|"), d = 0; d < p.length; d++) p[d] = r(p[d]);
                            return p.join(",")
                        }
                        if (e = (t.match(vt) || [s])[0], d = (f = t.split(e).join("").match(x) || []).length, u > d--) for (; ++d < u;) f[d] = i ? f[(d - 1) / 2 | 0] : o[d];
                        return a + f.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
                    } : function (t) {
                        var e, s, f;
                        if ("number" == typeof t) t += c; else if (n && F.test(t)) {
                            for (s = t.replace(F, "|").split("|"), f = 0; f < s.length; f++) s[f] = r(s[f]);
                            return s.join(",")
                        }
                        if (f = (e = t.match(x) || []).length, u > f--) for (; ++f < u;) e[f] = i ? e[(f - 1) / 2 | 0] : o[f];
                        return a + e.join(h) + l
                    } : function (t) {
                        return t
                    }
                }, bt = function (t) {
                    return t = t.split(","), function (e, i, n, r, s, o, a) {
                        var l, h = (i + "").split(" ");
                        for (a = {}, l = 0; l < 4; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                        return r.parse(e, a, s, o)
                    }
                }, wt = (V._setPluginRatio = function (t) {
                    this.plugin.setRatio(t);
                    for (var e, i, n, r, s, o = this.data, a = o.proxy, l = o.firstMPT; l;) e = a[l.v], l.r ? e = Math.round(e) : e < 1e-6 && e > -1e-6 && (e = 0), l.t[l.p] = e, l = l._next;
                    if (o.autoRotate && (o.autoRotate.rotation = o.mod ? o.mod(a.rotation, this.t) : a.rotation), 1 === t || 0 === t) for (l = o.firstMPT, s = 1 === t ? "e" : "b"; l;) {
                        if ((i = l.t).type) {
                            if (1 === i.type) {
                                for (r = i.xs0 + i.s + i.xs1, n = 1; n < i.l; n++) r += i["xn" + n] + i["xs" + (n + 1)];
                                i[s] = r
                            }
                        } else i[s] = i.s + i.xs0;
                        l = l._next
                    }
                }, function (t, e, i, n, r) {
                    this.t = t, this.p = e, this.v = i, this.r = r, n && (n._prev = this, this._next = n)
                }), Tt = (V._parseToProxy = function (t, e, i, n, r, s) {
                    var o, a, l, h, u, c = n, f = {}, d = {}, p = i._transform, m = W;
                    for (i._transform = null, W = e, n = u = i.parse(t, e, n, r), W = m, s && (i._transform = p, c && (c._prev = null, c._prev && (c._prev._next = null))); n && n !== c;) {
                        if (n.type <= 1 && (d[a = n.p] = n.s + n.c, f[a] = n.s, s || (h = new wt(n, "s", a, h, n.r), n.c = 0), 1 === n.type)) for (o = n.l; --o > 0;) l = "xn" + o, d[a = n.p + "_" + l] = n.data[l], f[a] = n[l], s || (h = new wt(n, l, a, h, n.rxp[l]));
                        n = n._next
                    }
                    return {proxy: f, end: d, firstMPT: h, pt: u}
                }, V.CSSPropTween = function (t, e, n, r, s, a, l, h, u, c, f) {
                    this.t = t, this.p = e, this.s = n, this.c = r, this.n = l || e, t instanceof Tt || o.push(this.n), this.r = h, this.type = a || 0, u && (this.pr = u, i = !0), this.b = void 0 === c ? n : c, this.e = void 0 === f ? n + r : f, s && (this._next = s, s._prev = this)
                }), xt = function (t, e, i, n, r, s) {
                    var o = new Tt(t, e, i, n - i, r, -1, s);
                    return o.b = i, o.e = o.xs0 = n, o
                }, Pt = a.parseComplex = function (t, e, i, n, r, s, o, l, h, u) {
                    i = i || s || "", "function" == typeof n && (n = n(v, g)), o = new Tt(t, e, 0, 0, o, u ? 2 : 1, null, !1, l, i, n), n += "", r && vt.test(n + i) && (n = [i, n], a.colorStringFilter(n), i = n[0], n = n[1]);
                    var f, d, p, m, _, y, b, x, P, S, k, E, C, A = i.split(", ").join(",").split(" "),
                        O = n.split(", ").join(",").split(" "), D = A.length, L = !1 !== c;
                    for (-1 === n.indexOf(",") && -1 === i.indexOf(",") || (-1 !== (n + i).indexOf("rgb") || -1 !== (n + i).indexOf("hsl") ? (A = A.join(" ").replace(F, ", ").split(" "), O = O.join(" ").replace(F, ", ").split(" ")) : (A = A.join(" ").split(",").join(", ").split(" "), O = O.join(" ").split(",").join(", ").split(" ")), D = A.length), D !== O.length && (D = (A = (s || "").split(" ")).length), o.plugin = h, o.setRatio = u, vt.lastIndex = 0, f = 0; f < D; f++) if (m = A[f], _ = O[f], (x = parseFloat(m)) || 0 === x) o.appendXtra("", x, ct(_, x), _.replace(T, ""), L && -1 !== _.indexOf("px"), !0); else if (r && vt.test(m)) E = ")" + ((E = _.indexOf(")") + 1) ? _.substr(E) : ""), C = -1 !== _.indexOf("hsl") && $, S = _, m = _t(m, C), _ = _t(_, C), (P = m.length + _.length > 6) && !$ && 0 === _[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(O[f]).join("transparent")) : ($ || (P = !1), C ? o.appendXtra(S.substr(0, S.indexOf("hsl")) + (P ? "hsla(" : "hsl("), m[0], ct(_[0], m[0]), ",", !1, !0).appendXtra("", m[1], ct(_[1], m[1]), "%,", !1).appendXtra("", m[2], ct(_[2], m[2]), P ? "%," : "%" + E, !1) : o.appendXtra(S.substr(0, S.indexOf("rgb")) + (P ? "rgba(" : "rgb("), m[0], _[0] - m[0], ",", !0, !0).appendXtra("", m[1], _[1] - m[1], ",", !0).appendXtra("", m[2], _[2] - m[2], P ? "," : E, !0), P && (m = m.length < 4 ? 1 : m[3], o.appendXtra("", m, (_.length < 4 ? 1 : _[3]) - m, E, !1))), vt.lastIndex = 0; else if (y = m.match(w)) {
                        if (!(b = _.match(T)) || b.length !== y.length) return o;
                        for (p = 0, d = 0; d < y.length; d++) k = y[d], S = m.indexOf(k, p), o.appendXtra(m.substr(p, S - p), Number(k), ct(b[d], k), "", L && "px" === m.substr(S + k.length, 2), 0 === d), p = S + k.length;
                        o["xs" + o.l] += m.substr(p)
                    } else o["xs" + o.l] += o.l || o["xs" + o.l] ? " " + _ : _;
                    if (-1 !== n.indexOf("=") && o.data) {
                        for (E = o.xs0 + o.data.s, f = 1; f < o.l; f++) E += o["xs" + f] + o.data["xn" + f];
                        o.e = E + o["xs" + f]
                    }
                    return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
                }, St = 9;
                for ((u = Tt.prototype).l = u.pr = 0; --St > 0;) u["xn" + St] = 0, u["xs" + St] = "";
                u.xs0 = "", u._next = u._prev = u.xfirst = u.data = u.plugin = u.setRatio = u.rxp = null, u.appendXtra = function (t, e, i, n, r, s) {
                    var o = this, a = o.l;
                    return o["xs" + a] += s && (a || o["xs" + a]) ? " " + t : t || "", i || 0 === a || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = n || "", a > 0 ? (o.data["xn" + a] = e + i, o.rxp["xn" + a] = r, o["xn" + a] = e, o.plugin || (o.xfirst = new Tt(o, "xn" + a, e, i, o.xfirst || o, 0, o.n, r, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {s: e + i}, o.rxp = {}, o.s = e, o.c = i, o.r = r, o)) : (o["xs" + a] += e + (n || ""), o)
                };
                var kt = function (t, e) {
                    e = e || {}, this.p = e.prefix && tt(t) || t, h[t] = h[this.p] = this, this.format = e.formatter || yt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
                }, Et = V._registerComplexSpecialProp = function (t, e, i) {
                    "object" != typeof e && (e = {parser: i});
                    var n, r = t.split(","), s = e.defaultValue;
                    for (i = i || [s], n = 0; n < r.length; n++) e.prefix = 0 === n && e.prefix, e.defaultValue = i[n] || s, new kt(r[n], e)
                }, Ct = V._registerPluginProp = function (t) {
                    if (!h[t]) {
                        var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                        Et(t, {
                            parser: function (t, i, n, r, s, o, a) {
                                var u = l.com.greensock.plugins[e];
                                return u ? (u._cssRegister(), h[n].parse(t, i, n, r, s, o, a)) : (Z("Error: " + e + " js file not loaded."), s)
                            }
                        })
                    }
                };
                (u = kt.prototype).parseComplex = function (t, e, i, n, r, s) {
                    var o, a, l, h, u, c, f = this.keyword;
                    if (this.multi && (F.test(i) || F.test(e) ? (a = e.replace(F, "|").split("|"), l = i.replace(F, "|").split("|")) : f && (a = [e], l = [i])), l) {
                        for (h = l.length > a.length ? l.length : a.length, o = 0; o < h; o++) e = a[o] = a[o] || this.dflt, i = l[o] = l[o] || this.dflt, f && (u = e.indexOf(f)) !== (c = i.indexOf(f)) && (-1 === c ? a[o] = a[o].split(f).join("") : -1 === u && (a[o] += " " + f));
                        e = a.join(", "), i = l.join(", ")
                    }
                    return Pt(t, this.p, e, i, this.clrs, this.dflt, n, this.pr, r, s)
                }, u.parse = function (t, e, i, n, r, o, a) {
                    return this.parseComplex(t.style, this.format(it(t, this.p, s, !1, this.dflt)), this.format(e), r, o)
                }, a.registerSpecialProp = function (t, e, i) {
                    Et(t, {
                        parser: function (t, n, r, s, o, a, l) {
                            var h = new Tt(t, r, 0, 0, o, 2, r, !1, i);
                            return h.plugin = a, h.setRatio = e(t, n, s._tween, r), h
                        }, priority: i
                    })
                }, a.useSVGTransformAttr = !0;
                var At, Ot, Dt, Lt, Mt,
                    zt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    Rt = tt("transform"), It = K + "transform", Ft = tt("transformOrigin"),
                    Nt = null !== tt("perspective"), jt = V.Transform = function () {
                        this.perspective = parseFloat(a.defaultTransformPerspective) || 0, this.force3D = !(!1 === a.defaultForce3D || !Nt) && (a.defaultForce3D || "auto")
                    }, Bt = r.SVGElement, Wt = function (t, e, i) {
                        var n, r = Y.createElementNS("http://www.w3.org/2000/svg", t), s = /([a-z])([A-Z])/g;
                        for (n in i) r.setAttributeNS(null, n.replace(s, "$1-$2").toLowerCase(), i[n]);
                        return e.appendChild(r), r
                    }, Xt = Y.documentElement || {},
                    Yt = (Mt = _ || /Android/i.test(G) && !r.chrome, Y.createElementNS && !Mt && (Ot = Wt("svg", Xt), Lt = (Dt = Wt("rect", Ot, {
                        width: 100,
                        height: 50,
                        x: 100
                    })).getBoundingClientRect().width, Dt.style[Ft] = "50% 50%", Dt.style[Rt] = "scaleX(0.5)", Mt = Lt === Dt.getBoundingClientRect().width && !(p && Nt), Xt.removeChild(Ot)), Mt),
                    qt = function (t, e, i, n, r, s) {
                        var o, l, h, u, c, f, d, p, m, _, g, v, y, b, w = t._gsTransform, T = Gt(t, !0);
                        w && (y = w.xOrigin, b = w.yOrigin), (!n || (o = n.split(" ")).length < 2) && (0 === (d = t.getBBox()).x && 0 === d.y && d.width + d.height === 0 && (d = {
                            x: parseFloat(t.hasAttribute("x") ? t.getAttribute("x") : t.hasAttribute("cx") ? t.getAttribute("cx") : 0) || 0,
                            y: parseFloat(t.hasAttribute("y") ? t.getAttribute("y") : t.hasAttribute("cy") ? t.getAttribute("cy") : 0) || 0,
                            width: 0,
                            height: 0
                        }), o = [(-1 !== (e = ut(e).split(" "))[0].indexOf("%") ? parseFloat(e[0]) / 100 * d.width : parseFloat(e[0])) + d.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * d.height : parseFloat(e[1])) + d.y]), i.xOrigin = u = parseFloat(o[0]), i.yOrigin = c = parseFloat(o[1]), n && T !== Vt && (f = T[0], d = T[1], p = T[2], m = T[3], _ = T[4], g = T[5], (v = f * m - d * p) && (l = u * (m / v) + c * (-p / v) + (p * g - m * _) / v, h = u * (-d / v) + c * (f / v) - (f * g - d * _) / v, u = i.xOrigin = o[0] = l, c = i.yOrigin = o[1] = h)), w && (s && (i.xOffset = w.xOffset, i.yOffset = w.yOffset, w = i), r || !1 !== r && !1 !== a.defaultSmoothOrigin ? (l = u - y, h = c - b, w.xOffset += l * T[0] + h * T[2] - l, w.yOffset += l * T[1] + h * T[3] - h) : w.xOffset = w.yOffset = 0), s || t.setAttribute("data-svg-origin", o.join(" "))
                    }, Ut = function (t) {
                        var e,
                            i = q("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
                            n = this.parentNode, r = this.nextSibling, s = this.style.cssText;
                        if (Xt.appendChild(i), i.appendChild(this), this.style.display = "block", t) try {
                            e = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ut
                        } catch (t) {
                        } else this._originalGetBBox && (e = this._originalGetBBox());
                        return r ? n.insertBefore(this, r) : n.appendChild(this), Xt.removeChild(i), this.style.cssText = s, e
                    }, Ht = function (t) {
                        return !(!Bt || !t.getCTM || t.parentNode && !t.ownerSVGElement || !function (t) {
                            try {
                                return t.getBBox()
                            } catch (e) {
                                return Ut.call(t, !0)
                            }
                        }(t))
                    }, Vt = [1, 0, 0, 1, 0, 0], Gt = function (t, e) {
                        var i, n, r, s, o, a, l = t._gsTransform || new jt, h = t.style;
                        if (Rt ? n = it(t, It, null, !0) : t.currentStyle && (n = (n = t.currentStyle.filter.match(R)) && 4 === n.length ? [n[0].substr(4), Number(n[2].substr(4)), Number(n[1].substr(4)), n[3].substr(4), l.x || 0, l.y || 0].join(",") : ""), i = !n || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, !Rt || !(a = !et(t) || "none" === et(t).display) && t.parentNode || (a && (s = h.display, h.display = "block"), t.parentNode || (o = 1, Xt.appendChild(t)), i = !(n = it(t, It, null, !0)) || "none" === n || "matrix(1, 0, 0, 1, 0, 0)" === n, s ? h.display = s : a && Jt(h, "display"), o && Xt.removeChild(t)), (l.svg || t.getCTM && Ht(t)) && (i && -1 !== (h[Rt] + "").indexOf("matrix") && (n = h[Rt], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (n = r, i = 0) : -1 !== r.indexOf("translate") && (n = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Vt;
                        for (r = (n || "").match(w) || [], St = r.length; --St > -1;) s = Number(r[St]), r[St] = (o = s - (s |= 0)) ? (1e5 * o + (o < 0 ? -.5 : .5) | 0) / 1e5 + s : s;
                        return e && r.length > 6 ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
                    }, $t = V.getTransform = function (t, i, n, r) {
                        if (t._gsTransform && n && !r) return t._gsTransform;
                        var s, o, l, h, u, c, f = n && t._gsTransform || new jt, d = f.scaleX < 0,
                            p = Nt && (parseFloat(it(t, Ft, i, !1, "0 0 0").split(" ")[2]) || f.zOrigin) || 0,
                            m = parseFloat(a.defaultTransformPerspective) || 0;
                        if (f.svg = !(!t.getCTM || !Ht(t)), f.svg && (qt(t, it(t, Ft, i, !1, "50% 50%") + "", f, t.getAttribute("data-svg-origin")), At = a.useSVGTransformAttr || Yt), (s = Gt(t)) !== Vt) {
                            if (16 === s.length) {
                                var _, g, v, y, b, w = s[0], T = s[1], x = s[2], P = s[3], S = s[4], k = s[5], E = s[6],
                                    C = s[7], A = s[8], O = s[9], D = s[10], L = s[12], M = s[13], z = s[14], R = s[11],
                                    I = Math.atan2(E, D);
                                f.zOrigin && (L = A * (z = -f.zOrigin) - s[12], M = O * z - s[13], z = D * z + f.zOrigin - s[14]), f.rotationX = I * B, I && (_ = S * (y = Math.cos(-I)) + A * (b = Math.sin(-I)), g = k * y + O * b, v = E * y + D * b, A = S * -b + A * y, O = k * -b + O * y, D = E * -b + D * y, R = C * -b + R * y, S = _, k = g, E = v), I = Math.atan2(-x, D), f.rotationY = I * B, I && (g = T * (y = Math.cos(-I)) - O * (b = Math.sin(-I)), v = x * y - D * b, O = T * b + O * y, D = x * b + D * y, R = P * b + R * y, w = _ = w * y - A * b, T = g, x = v), I = Math.atan2(T, w), f.rotation = I * B, I && (_ = w * (y = Math.cos(I)) + T * (b = Math.sin(I)), g = S * y + k * b, v = A * y + O * b, T = T * y - w * b, k = k * y - S * b, O = O * y - A * b, w = _, S = g, A = v), f.rotationX && Math.abs(f.rotationX) + Math.abs(f.rotation) > 359.9 && (f.rotationX = f.rotation = 0, f.rotationY = 180 - f.rotationY), I = Math.atan2(S, k), f.scaleX = (1e5 * Math.sqrt(w * w + T * T + x * x) + .5 | 0) / 1e5, f.scaleY = (1e5 * Math.sqrt(k * k + E * E) + .5 | 0) / 1e5, f.scaleZ = (1e5 * Math.sqrt(A * A + O * O + D * D) + .5 | 0) / 1e5, w /= f.scaleX, S /= f.scaleY, T /= f.scaleX, k /= f.scaleY, Math.abs(I) > 2e-5 ? (f.skewX = I * B, S = 0, "simple" !== f.skewType && (f.scaleY *= 1 / Math.cos(I))) : f.skewX = 0, f.perspective = R ? 1 / (R < 0 ? -R : R) : 0, f.x = L, f.y = M, f.z = z, f.svg && (f.x -= f.xOrigin - (f.xOrigin * w - f.yOrigin * S), f.y -= f.yOrigin - (f.yOrigin * T - f.xOrigin * k))
                            } else if (!Nt || r || !s.length || f.x !== s[4] || f.y !== s[5] || !f.rotationX && !f.rotationY) {
                                var F = s.length >= 6, N = F ? s[0] : 1, j = s[1] || 0, W = s[2] || 0, X = F ? s[3] : 1;
                                f.x = s[4] || 0, f.y = s[5] || 0, l = Math.sqrt(N * N + j * j), h = Math.sqrt(X * X + W * W), u = N || j ? Math.atan2(j, N) * B : f.rotation || 0, c = W || X ? Math.atan2(W, X) * B + u : f.skewX || 0, f.scaleX = l, f.scaleY = h, f.rotation = u, f.skewX = c, Nt && (f.rotationX = f.rotationY = f.z = 0, f.perspective = m, f.scaleZ = 1), f.svg && (f.x -= f.xOrigin - (f.xOrigin * N + f.yOrigin * W), f.y -= f.yOrigin - (f.xOrigin * j + f.yOrigin * X))
                            }
                            Math.abs(f.skewX) > 90 && Math.abs(f.skewX) < 270 && (d ? (f.scaleX *= -1, f.skewX += f.rotation <= 0 ? 180 : -180, f.rotation += f.rotation <= 0 ? 180 : -180) : (f.scaleY *= -1, f.skewX += f.skewX <= 0 ? 180 : -180)), f.zOrigin = p;
                            for (o in f) f[o] < 2e-5 && f[o] > -2e-5 && (f[o] = 0)
                        }
                        return n && (t._gsTransform = f, f.svg && (At && t.style[Rt] ? e.delayedCall(.001, function () {
                            Jt(t.style, Rt)
                        }) : !At && t.getAttribute("transform") && e.delayedCall(.001, function () {
                            t.removeAttribute("transform")
                        }))), f
                    }, Qt = function (t) {
                        var e, i, n = this.data, r = -n.rotation * j, s = r + n.skewX * j, o = 1e5,
                            a = (Math.cos(r) * n.scaleX * o | 0) / o, l = (Math.sin(r) * n.scaleX * o | 0) / o,
                            h = (Math.sin(s) * -n.scaleY * o | 0) / o, u = (Math.cos(s) * n.scaleY * o | 0) / o,
                            c = this.t.style, f = this.t.currentStyle;
                        if (f) {
                            i = l, l = -h, h = -i, e = f.filter, c.filter = "";
                            var d, p, m = this.t.offsetWidth, g = this.t.offsetHeight, v = "absolute" !== f.position,
                                y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                                b = n.x + m * n.xPercent / 100, w = n.y + g * n.yPercent / 100;
                            if (null != n.ox && (b += (d = (n.oxp ? m * n.ox * .01 : n.ox) - m / 2) - (d * a + (p = (n.oyp ? g * n.oy * .01 : n.oy) - g / 2) * l), w += p - (d * h + p * u)), y += v ? ", Dx=" + ((d = m / 2) - (d * a + (p = g / 2) * l) + b) + ", Dy=" + (p - (d * h + p * u) + w) + ")" : ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = e.replace(I, y) : c.filter = y + " " + e, 0 !== t && 1 !== t || 1 === a && 0 === l && 0 === h && 1 === u && (v && -1 === y.indexOf("Dx=0, Dy=0") || k.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !v) {
                                var T, x, P, E = _ < 8 ? 1 : -1;
                                for (d = n.ieOffsetX || 0, p = n.ieOffsetY || 0, n.ieOffsetX = Math.round((m - ((a < 0 ? -a : a) * m + (l < 0 ? -l : l) * g)) / 2 + b), n.ieOffsetY = Math.round((g - ((u < 0 ? -u : u) * g + (h < 0 ? -h : h) * m)) / 2 + w), St = 0; St < 4; St++) P = (i = -1 !== (T = f[x = lt[St]]).indexOf("px") ? parseFloat(T) : nt(this.t, x, parseFloat(T), T.replace(S, "")) || 0) !== n[x] ? St < 2 ? -n.ieOffsetX : -n.ieOffsetY : St < 2 ? d - n.ieOffsetX : p - n.ieOffsetY, c[x] = (n[x] = Math.round(i - P * (0 === St || 2 === St ? 1 : E))) + "px"
                            }
                        }
                    }, Zt = V.set3DTransformRatio = V.setTransformRatio = function (t) {
                        var e, i, n, r, s, o, a, l, h, u, c, f, d, m, _, g, v, y, b, w, T, x, P, S = this.data,
                            k = this.t.style, E = S.rotation, C = S.rotationX, A = S.rotationY, O = S.scaleX, D = S.scaleY,
                            L = S.scaleZ, M = S.x, z = S.y, R = S.z, I = S.svg, F = S.perspective, N = S.force3D,
                            B = S.skewY, W = S.skewX;
                        if (B && (W += B, E += B), !((1 !== t && 0 !== t || "auto" !== N || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && N || R || F || A || C || 1 !== L) || At && I || !Nt) E || W || I ? (E *= j, x = W * j, P = 1e5, i = Math.cos(E) * O, s = Math.sin(E) * O, n = Math.sin(E - x) * -D, o = Math.cos(E - x) * D, x && "simple" === S.skewType && (e = Math.tan(x - B * j), n *= e = Math.sqrt(1 + e * e), o *= e, B && (e = Math.tan(B * j), i *= e = Math.sqrt(1 + e * e), s *= e)), I && (M += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, z += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset, At && (S.xPercent || S.yPercent) && (_ = this.t.getBBox(), M += .01 * S.xPercent * _.width, z += .01 * S.yPercent * _.height), M < (_ = 1e-6) && M > -_ && (M = 0), z < _ && z > -_ && (z = 0)), b = (i * P | 0) / P + "," + (s * P | 0) / P + "," + (n * P | 0) / P + "," + (o * P | 0) / P + "," + M + "," + z + ")", I && At ? this.t.setAttribute("transform", "matrix(" + b) : k[Rt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + b) : k[Rt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + O + ",0,0," + D + "," + M + "," + z + ")"; else {
                            if (p && (O < (_ = 1e-4) && O > -_ && (O = L = 2e-5), D < _ && D > -_ && (D = L = 2e-5), !F || S.z || S.rotationX || S.rotationY || (F = 0)), E || W) E *= j, g = i = Math.cos(E), v = s = Math.sin(E), W && (E -= W * j, g = Math.cos(E), v = Math.sin(E), "simple" === S.skewType && (e = Math.tan((W - B) * j), g *= e = Math.sqrt(1 + e * e), v *= e, S.skewY && (e = Math.tan(B * j), i *= e = Math.sqrt(1 + e * e), s *= e))), n = -v, o = g; else {
                                if (!(A || C || 1 !== L || F || I)) return void (k[Rt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + M + "px," + z + "px," + R + "px)" + (1 !== O || 1 !== D ? " scale(" + O + "," + D + ")" : ""));
                                i = o = 1, n = s = 0
                            }
                            u = 1, r = a = l = h = c = f = 0, d = F ? -1 / F : 0, m = S.zOrigin, _ = 1e-6, w = ",", T = "0", (E = A * j) && (g = Math.cos(E), l = -(v = Math.sin(E)), c = d * -v, r = i * v, a = s * v, u = g, d *= g, i *= g, s *= g), (E = C * j) && (e = n * (g = Math.cos(E)) + r * (v = Math.sin(E)), y = o * g + a * v, h = u * v, f = d * v, r = n * -v + r * g, a = o * -v + a * g, u *= g, d *= g, n = e, o = y), 1 !== L && (r *= L, a *= L, u *= L, d *= L), 1 !== D && (n *= D, o *= D, h *= D, f *= D), 1 !== O && (i *= O, s *= O, l *= O, c *= O), (m || I) && (m && (M += r * -m, z += a * -m, R += u * -m + m), I && (M += S.xOrigin - (S.xOrigin * i + S.yOrigin * n) + S.xOffset, z += S.yOrigin - (S.xOrigin * s + S.yOrigin * o) + S.yOffset), M < _ && M > -_ && (M = T), z < _ && z > -_ && (z = T), R < _ && R > -_ && (R = 0)), b = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", b += (i < _ && i > -_ ? T : i) + w + (s < _ && s > -_ ? T : s) + w + (l < _ && l > -_ ? T : l), b += w + (c < _ && c > -_ ? T : c) + w + (n < _ && n > -_ ? T : n) + w + (o < _ && o > -_ ? T : o), C || A || 1 !== L ? (b += w + (h < _ && h > -_ ? T : h) + w + (f < _ && f > -_ ? T : f) + w + (r < _ && r > -_ ? T : r), b += w + (a < _ && a > -_ ? T : a) + w + (u < _ && u > -_ ? T : u) + w + (d < _ && d > -_ ? T : d) + w) : b += ",0,0,0,0,1,0,", b += M + w + z + w + R + w + (F ? 1 + -R / F : 1) + ")", k[Rt] = b
                        }
                    };
                (u = jt.prototype).x = u.y = u.z = u.skewX = u.skewY = u.rotation = u.rotationX = u.rotationY = u.zOrigin = u.xPercent = u.yPercent = u.xOffset = u.yOffset = 0, u.scaleX = u.scaleY = u.scaleZ = 1, Et("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
                    parser: function (t, e, i, n, r, o, l) {
                        if (n._lastParsedTransform === l) return r;
                        n._lastParsedTransform = l;
                        var h, u = l.scale && "function" == typeof l.scale ? l.scale : 0;
                        "function" == typeof l[i] && (h = l[i], l[i] = e), u && (l.scale = u(v, t));
                        var c, f, d, p, m, _, y, b, w, T = t._gsTransform, x = t.style, P = zt.length, S = l, k = {},
                            E = "transformOrigin", C = $t(t, s, !0, S.parseTransform),
                            A = S.transform && ("function" == typeof S.transform ? S.transform(v, g) : S.transform);
                        if (C.skewType = S.skewType || C.skewType || a.defaultSkewType, n._transform = C, A && "string" == typeof A && Rt) (f = U.style)[Rt] = A, f.display = "block", f.position = "absolute", Y.body.appendChild(U), c = $t(U, null, !1), "simple" === C.skewType && (c.scaleY *= Math.cos(c.skewX * j)), C.svg && (_ = C.xOrigin, y = C.yOrigin, c.x -= C.xOffset, c.y -= C.yOffset, (S.transformOrigin || S.svgOrigin) && (A = {}, qt(t, ut(S.transformOrigin), A, S.svgOrigin, S.smoothOrigin, !0), _ = A.xOrigin, y = A.yOrigin, c.x -= A.xOffset - C.xOffset, c.y -= A.yOffset - C.yOffset), (_ || y) && (b = Gt(U, !0), c.x -= _ - (_ * b[0] + y * b[2]), c.y -= y - (_ * b[1] + y * b[3]))), Y.body.removeChild(U), c.perspective || (c.perspective = C.perspective), null != S.xPercent && (c.xPercent = ft(S.xPercent, C.xPercent)), null != S.yPercent && (c.yPercent = ft(S.yPercent, C.yPercent)); else if ("object" == typeof S) {
                            if (c = {
                                scaleX: ft(null != S.scaleX ? S.scaleX : S.scale, C.scaleX),
                                scaleY: ft(null != S.scaleY ? S.scaleY : S.scale, C.scaleY),
                                scaleZ: ft(S.scaleZ, C.scaleZ),
                                x: ft(S.x, C.x),
                                y: ft(S.y, C.y),
                                z: ft(S.z, C.z),
                                xPercent: ft(S.xPercent, C.xPercent),
                                yPercent: ft(S.yPercent, C.yPercent),
                                perspective: ft(S.transformPerspective, C.perspective)
                            }, null != (m = S.directionalRotation)) if ("object" == typeof m) for (f in m) S[f] = m[f]; else S.rotation = m;
                            "string" == typeof S.x && -1 !== S.x.indexOf("%") && (c.x = 0, c.xPercent = ft(S.x, C.xPercent)), "string" == typeof S.y && -1 !== S.y.indexOf("%") && (c.y = 0, c.yPercent = ft(S.y, C.yPercent)), c.rotation = dt("rotation" in S ? S.rotation : "shortRotation" in S ? S.shortRotation + "_short" : "rotationZ" in S ? S.rotationZ : C.rotation, C.rotation, "rotation", k), Nt && (c.rotationX = dt("rotationX" in S ? S.rotationX : "shortRotationX" in S ? S.shortRotationX + "_short" : C.rotationX || 0, C.rotationX, "rotationX", k), c.rotationY = dt("rotationY" in S ? S.rotationY : "shortRotationY" in S ? S.shortRotationY + "_short" : C.rotationY || 0, C.rotationY, "rotationY", k)), c.skewX = dt(S.skewX, C.skewX), c.skewY = dt(S.skewY, C.skewY)
                        }
                        for (Nt && null != S.force3D && (C.force3D = S.force3D, p = !0), (d = C.force3D || C.z || C.rotationX || C.rotationY || c.z || c.rotationX || c.rotationY || c.perspective) || null == S.scale || (c.scaleZ = 1); --P > -1;) ((A = c[w = zt[P]] - C[w]) > 1e-6 || A < -1e-6 || null != S[w] || null != W[w]) && (p = !0, r = new Tt(C, w, C[w], A, r), w in k && (r.e = k[w]), r.xs0 = 0, r.plugin = o, n._overwriteProps.push(r.n));
                        return A = S.transformOrigin, C.svg && (A || S.svgOrigin) && (_ = C.xOffset, y = C.yOffset, qt(t, ut(A), c, S.svgOrigin, S.smoothOrigin), r = xt(C, "xOrigin", (T ? C : c).xOrigin, c.xOrigin, r, E), r = xt(C, "yOrigin", (T ? C : c).yOrigin, c.yOrigin, r, E), _ === C.xOffset && y === C.yOffset || (r = xt(C, "xOffset", T ? _ : C.xOffset, C.xOffset, r, E), r = xt(C, "yOffset", T ? y : C.yOffset, C.yOffset, r, E)), A = "0px 0px"), (A || Nt && d && C.zOrigin) && (Rt ? (p = !0, w = Ft, A = (A || it(t, w, s, !1, "50% 50%")) + "", (r = new Tt(x, w, 0, 0, r, -1, E)).b = x[w], r.plugin = o, Nt ? (f = C.zOrigin, A = A.split(" "), C.zOrigin = (A.length > 2 && (0 === f || "0px" !== A[2]) ? parseFloat(A[2]) : f) || 0, r.xs0 = r.e = A[0] + " " + (A[1] || "50%") + " 0px", (r = new Tt(C, "zOrigin", 0, 0, r, -1, r.n)).b = f, r.xs0 = r.e = C.zOrigin) : r.xs0 = r.e = A) : ut(A + "", C)), p && (n._transformType = C.svg && At || !d && 3 !== this._transformType ? 2 : 3), h && (l[i] = h), u && (l.scale = u), r
                    }, prefix: !0
                }), Et("boxShadow", {
                    defaultValue: "0px 0px 0px 0px #999",
                    prefix: !0,
                    color: !0,
                    multi: !0,
                    keyword: "inset"
                }), Et("borderRadius", {
                    defaultValue: "0px", parser: function (t, e, i, r, o, a) {
                        e = this.format(e);
                        var l, h, u, c, f, d, p, m, _, g, v, y, b, w, T, x,
                            P = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            S = t.style;
                        for (_ = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), l = e.split(" "), h = 0; h < P.length; h++) this.p.indexOf("border") && (P[h] = tt(P[h])), -1 !== (f = c = it(t, P[h], s, !1, "0px")).indexOf(" ") && (f = (c = f.split(" "))[0], c = c[1]), d = u = l[h], p = parseFloat(f), y = f.substr((p + "").length), (b = "=" === d.charAt(1)) ? (m = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), m *= parseFloat(d), v = d.substr((m + "").length - (m < 0 ? 1 : 0)) || "") : (m = parseFloat(d), v = d.substr((m + "").length)), "" === v && (v = n[i] || y), v !== y && (w = nt(t, "borderLeft", p, y), T = nt(t, "borderTop", p, y), "%" === v ? (f = w / _ * 100 + "%", c = T / g * 100 + "%") : "em" === v ? (f = w / (x = nt(t, "borderLeft", 1, "em")) + "em", c = T / x + "em") : (f = w + "px", c = T + "px"), b && (d = parseFloat(f) + m + v, u = parseFloat(c) + m + v)), o = Pt(S, P[h], f + " " + c, d + " " + u, !1, "0px", o);
                        return o
                    }, prefix: !0, formatter: yt("0px 0px 0px 0px", !1, !0)
                }), Et("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
                    defaultValue: "0px",
                    parser: function (t, e, i, n, r, o) {
                        return Pt(t.style, i, this.format(it(t, i, s, !1, "0px 0px")), this.format(e), !1, "0px", r)
                    },
                    prefix: !0,
                    formatter: yt("0px 0px", !1, !0)
                }), Et("backgroundPosition", {
                    defaultValue: "0 0", parser: function (t, e, i, n, r, o) {
                        var a, l, h, u, c, f, d = "background-position", p = s || et(t, null),
                            m = this.format((p ? _ ? p.getPropertyValue(d + "-x") + " " + p.getPropertyValue(d + "-y") : p.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                            g = this.format(e);
                        if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && g.split(",").length < 2 && (f = it(t, "backgroundImage").replace(L, "")) && "none" !== f) {
                            for (a = m.split(" "), l = g.split(" "), H.setAttribute("src", f), h = 2; --h > -1;) (u = -1 !== (m = a[h]).indexOf("%")) !== (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - H.width : t.offsetHeight - H.height, a[h] = u ? parseFloat(m) / 100 * c + "px" : parseFloat(m) / c * 100 + "%");
                            m = a.join(" ")
                        }
                        return this.parseComplex(t.style, m, g, r, o)
                    }, formatter: ut
                }), Et("backgroundSize", {
                    defaultValue: "0 0", formatter: function (t) {
                        return ut(-1 === (t += "").indexOf(" ") ? t + " " + t : t)
                    }
                }), Et("perspective", {
                    defaultValue: "0px",
                    prefix: !0
                }), Et("perspectiveOrigin", {
                    defaultValue: "50% 50%",
                    prefix: !0
                }), Et("transformStyle", {prefix: !0}), Et("backfaceVisibility", {prefix: !0}), Et("userSelect", {prefix: !0}), Et("margin", {parser: bt("marginTop,marginRight,marginBottom,marginLeft")}), Et("padding", {parser: bt("paddingTop,paddingRight,paddingBottom,paddingLeft")}), Et("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function (t, e, i, n, r, o) {
                        var a, l, h;
                        return _ < 9 ? (l = t.currentStyle, h = _ < 8 ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(it(t, this.p, s, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, r, o)
                    }
                }), Et("textShadow", {
                    defaultValue: "0px 0px 0px #999",
                    color: !0,
                    multi: !0
                }), Et("autoRound,strictUnits", {
                    parser: function (t, e, i, n, r) {
                        return r
                    }
                }), Et("border", {
                    defaultValue: "0px solid #000", parser: function (t, e, i, n, r, o) {
                        var a = it(t, "borderTopWidth", s, !1, "0px"), l = this.format(e).split(" "),
                            h = l[0].replace(S, "");
                        return "px" !== h && (a = parseFloat(a) / nt(t, "borderTopWidth", 1, h) + h), this.parseComplex(t.style, this.format(a + " " + it(t, "borderTopStyle", s, !1, "solid") + " " + it(t, "borderTopColor", s, !1, "#000")), l.join(" "), r, o)
                    }, color: !0, formatter: function (t) {
                        var e = t.split(" ");
                        return e[0] + " " + (e[1] || "solid") + " " + (t.match(vt) || ["#000"])[0]
                    }
                }), Et("borderWidth", {parser: bt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), Et("float,cssFloat,styleFloat", {
                    parser: function (t, e, i, n, r, s) {
                        var o = t.style, a = "cssFloat" in o ? "cssFloat" : "styleFloat";
                        return new Tt(o, a, 0, 0, r, -1, i, !1, 0, o[a], e)
                    }
                });
                var Kt = function (t) {
                    var e, i = this.t, n = i.filter || it(this.data, "filter") || "", r = this.s + this.c * t | 0;
                    100 === r && (-1 === n.indexOf("atrix(") && -1 === n.indexOf("radient(") && -1 === n.indexOf("oader(") ? (i.removeAttribute("filter"), e = !it(this.data, "filter")) : (i.filter = n.replace(C, ""), e = !0)), e || (this.xn1 && (i.filter = n = n || "alpha(opacity=" + r + ")"), -1 === n.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = n + " alpha(opacity=" + r + ")") : i.filter = n.replace(k, "opacity=" + r))
                };
                Et("opacity,alpha,autoAlpha", {
                    defaultValue: "1", parser: function (t, e, i, n, r, o) {
                        var a = parseFloat(it(t, "opacity", s, !1, "1")), l = t.style, h = "autoAlpha" === i;
                        return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === it(t, "visibility", s) && 0 !== e && (a = 0), $ ? r = new Tt(l, "opacity", a, e - a, r) : ((r = new Tt(l, "opacity", 100 * a, 100 * (e - a), r)).xn1 = h ? 1 : 0, l.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = t, r.plugin = o, r.setRatio = Kt), h && ((r = new Tt(l, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit")).xs0 = "inherit", n._overwriteProps.push(r.n), n._overwriteProps.push(i)), r
                    }
                });
                var Jt = function (t, e) {
                    e && (t.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), t.removeProperty(e.replace(O, "-$1").toLowerCase())) : t.removeAttribute(e))
                }, te = function (t) {
                    if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                        this.t.setAttribute("class", 0 === t ? this.b : this.e);
                        for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Jt(i, e.p), e = e._next;
                        1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                    } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                };
                Et("className", {
                    parser: function (t, e, n, r, o, a, l) {
                        var h, u, c, f, d, p = t.getAttribute("class") || "", m = t.style.cssText;
                        if ((o = r._classNamePT = new Tt(t, n, 0, 0, o, 2)).setRatio = te, o.pr = -11, i = !0, o.b = p, u = st(t, s), c = t._gsClassPT) {
                            for (f = {}, d = c.data; d;) f[d.p] = 1, d = d._next;
                            c.setRatio(1)
                        }
                        return t._gsClassPT = o, o.e = "=" !== e.charAt(1) ? e : p.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", o.e), h = ot(t, u, st(t), l, f), t.setAttribute("class", p), o.data = h.firstMPT, t.style.cssText = m, o = o.xfirst = r.parse(t, h.difs, o, a)
                    }
                });
                var ee = function (t) {
                    if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var e, i, n, r, s, o = this.t.style, a = h.transform.parse;
                        if ("all" === this.e) o.cssText = "", r = !0; else for (n = (e = this.e.split(" ").join("").split(",")).length; --n > -1;) i = e[n], h[i] && (h[i].parse === a ? r = !0 : i = "transformOrigin" === i ? Ft : h[i].p), Jt(o, i);
                        r && (Jt(o, Rt), (s = this.t._gsTransform) && (s.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
                    }
                };
                for (Et("clearProps", {
                    parser: function (t, e, n, r, s) {
                        return (s = new Tt(t, n, 0, 0, s, 2)).setRatio = ee, s.e = e, s.pr = -10, s.data = r._tween, i = !0, s
                    }
                }), u = "bezier,throwProps,physicsProps,physics2D".split(","), St = u.length; St--;) Ct(u[St]);
                (u = a.prototype)._firstPT = u._lastParsedTransform = u._transform = null, u._onInitTween = function (t, e, r, l) {
                    if (!t.nodeType) return !1;
                    this._target = g = t, this._tween = r, this._vars = e, v = l, c = e.autoRound, i = !1, n = e.suffixMap || a.suffixMap, s = et(t, ""), o = this._overwriteProps;
                    var u, p, _, y, b, w, T, x, P, S = t.style;
                    if (f && "" === S.zIndex && ("auto" !== (u = it(t, "zIndex", s)) && "" !== u || this._addLazySet(S, "zIndex", 0)), "string" == typeof e && (y = S.cssText, u = st(t, s), S.cssText = y + ";" + e, u = ot(t, u, st(t)).difs, !$ && E.test(e) && (u.opacity = parseFloat(RegExp.$1)), e = u, S.cssText = y), e.className ? this._firstPT = p = h.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = p = this.parse(t, e, null), this._transformType) {
                        for (P = 3 === this._transformType, Rt ? d && (f = !0, "" === S.zIndex && ("auto" !== (T = it(t, "zIndex", s)) && "" !== T || this._addLazySet(S, "zIndex", 0)), m && this._addLazySet(S, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (P ? "visible" : "hidden"))) : S.zoom = 1, _ = p; _ && _._next;) _ = _._next;
                        x = new Tt(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, _), x.setRatio = Rt ? Zt : Qt, x.data = this._transform || $t(t, s, !0), x.tween = r, x.pr = -1, o.pop()
                    }
                    if (i) {
                        for (; p;) {
                            for (w = p._next, _ = y; _ && _.pr > p.pr;) _ = _._next;
                            (p._prev = _ ? _._prev : b) ? p._prev._next = p : y = p, (p._next = _) ? _._prev = p : b = p, p = w
                        }
                        this._firstPT = y
                    }
                    return !0
                }, u.parse = function (t, e, i, r) {
                    var o, a, l, u, f, d, p, m, _, y, b = t.style;
                    for (o in e) {
                        if ("function" == typeof (d = e[o]) && (d = d(v, g)), a = h[o]) i = a.parse(t, d, o, this, i, r, e); else {
                            if ("--" === o.substr(0, 2)) {
                                this._tween._propLookup[o] = this._addTween.call(this._tween, t.style, "setProperty", et(t).getPropertyValue(o) + "", d + "", o, !1, o);
                                continue
                            }
                            f = it(t, o, s) + "", _ = "string" == typeof d, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || _ && A.test(d) ? (_ || (d = ((d = _t(d)).length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), i = Pt(b, o, f, d, !0, "transparent", i, 0, r)) : _ && N.test(d) ? i = Pt(b, o, f, d, !0, null, i, 0, r) : (p = (l = parseFloat(f)) || 0 === l ? f.substr((l + "").length) : "", "" !== f && "auto" !== f || ("width" === o || "height" === o ? (l = ht(t, o, s), p = "px") : "left" === o || "top" === o ? (l = rt(t, o, s), p = "px") : (l = "opacity" !== o ? 0 : 1, p = "")), (y = _ && "=" === d.charAt(1)) ? (u = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), u *= parseFloat(d), m = d.replace(S, "")) : (u = parseFloat(d), m = _ ? d.replace(S, "") : ""), "" === m && (m = o in n ? n[o] : p), d = u || 0 === u ? (y ? u + l : u) + m : e[o], p !== m && ("" === m && "lineHeight" !== o || (u || 0 === u) && l && (l = nt(t, o, l, p), "%" === m ? (l /= nt(t, o, 100, "%") / 100, !0 !== e.strictUnits && (f = l + "%")) : "em" === m || "rem" === m || "vw" === m || "vh" === m ? l /= nt(t, o, 1, m) : "px" !== m && (u = nt(t, o, u, m), m = "px"), y && (u || 0 === u) && (d = u + l + m))), y && (u += l), !l && 0 !== l || !u && 0 !== u ? void 0 !== b[o] && (d || d + "" != "NaN" && null != d) ? (i = new Tt(b, o, u || l || 0, 0, i, -1, o, !1, 0, f, d)).xs0 = "none" !== d || "display" !== o && -1 === o.indexOf("Style") ? d : f : Z("invalid " + o + " tween value: " + e[o]) : (i = new Tt(b, o, l, u - l, i, 0, o, !1 !== c && ("px" === m || "zIndex" === o), 0, f, d)).xs0 = m)
                        }
                        r && i && !i.plugin && (i.plugin = r)
                    }
                    return i
                }, u.setRatio = function (t) {
                    var e, i, n, r = this._firstPT;
                    if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime) for (; r;) {
                        if (e = r.c * t + r.s, r.r ? e = Math.round(e) : e < 1e-6 && e > -1e-6 && (e = 0), r.type) if (1 === r.type) if (2 === (n = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2; else if (3 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3; else if (4 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4; else if (5 === n) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5; else {
                            for (i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                            r.t[r.p] = i
                        } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t); else r.t[r.p] = e + r.xs0;
                        r = r._next
                    } else for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next; else for (; r;) {
                        if (2 !== r.type) if (r.r && -1 !== r.type) if (e = Math.round(r.s + r.c), r.type) {
                            if (1 === r.type) {
                                for (n = r.l, i = r.xs0 + e + r.xs1, n = 1; n < r.l; n++) i += r["xn" + n] + r["xs" + (n + 1)];
                                r.t[r.p] = i
                            }
                        } else r.t[r.p] = e + r.xs0; else r.t[r.p] = r.e; else r.setRatio(t);
                        r = r._next
                    }
                }, u._enableTransforms = function (t) {
                    this._transform = this._transform || $t(this._target, s, !0), this._transformType = this._transform.svg && At || !t && 3 !== this._transformType ? 2 : 3
                };
                var ie = function (t) {
                    this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
                };
                u._addLazySet = function (t, e, i) {
                    var n = this._firstPT = new Tt(t, e, 0, 0, this._firstPT, 2);
                    n.e = i, n.setRatio = ie, n.data = this
                }, u._linkCSSP = function (t, e, i, n) {
                    return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, n = !0), i ? i._next = t : n || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
                }, u._mod = function (t) {
                    for (var e = this._firstPT; e;) "function" == typeof t[e.p] && t[e.p] === Math.round && (e.r = 1), e = e._next
                }, u._kill = function (e) {
                    var i, n, r, s = e;
                    if (e.autoAlpha || e.alpha) {
                        s = {};
                        for (n in e) s[n] = e[n];
                        s.opacity = 1, s.autoAlpha && (s.visibility = 1)
                    }
                    for (e.className && (i = this._classNamePT) && ((r = i.xfirst) && r._prev ? this._linkCSSP(r._prev, i._next, r._prev._prev) : r === this._firstPT && (this._firstPT = i._next), i._next && this._linkCSSP(i._next, i._next._next, r._prev), this._classNamePT = null), i = this._firstPT; i;) i.plugin && i.plugin !== n && i.plugin._kill && (i.plugin._kill(e), n = i.plugin), i = i._next;
                    return t.prototype._kill.call(this, s)
                };
                var ne = function (t, e, i) {
                    var n, r, s, o;
                    if (t.slice) for (r = t.length; --r > -1;) ne(t[r], e, i); else for (r = (n = t.childNodes).length; --r > -1;) o = (s = n[r]).type, s.style && (e.push(st(s)), i && i.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || ne(s, e, i)
                };
                return a.cascadeTo = function (t, i, n) {
                    var r, s, o, a, l = e.to(t, i, n), h = [l], u = [], c = [], f = [], d = e._internals.reservedProps;
                    for (t = l._targets || l.target, ne(t, u, f), l.render(i, !0, !0), ne(t, c), l.render(0, !0, !0), l._enabled(!0), r = f.length; --r > -1;) if ((s = ot(f[r], u[r], c[r])).firstMPT) {
                        s = s.difs;
                        for (o in n) d[o] && (s[o] = n[o]);
                        a = {};
                        for (o in s) a[o] = u[r][o];
                        h.push(e.fromTo(f[r], i, a, s))
                    }
                    return h
                }, t.activate([a]), a
            }, !0), m = function (t) {
                for (; t;) t.f || t.blob || (t.m = Math.round), t = t._next
            }, (_ = r._gsDefine.plugin({
                propName: "roundProps",
                version: "1.6.0",
                priority: -1,
                API: 2,
                init: function (t, e, i) {
                    return this._tween = i, !0
                }
            }).prototype)._onInitAllProps = function () {
                for (var t, e, i, n = this._tween, r = n.vars.roundProps.join ? n.vars.roundProps : n.vars.roundProps.split(","), s = r.length, o = {}, a = n._propLookup.roundProps; --s > -1;) o[r[s]] = Math.round;
                for (s = r.length; --s > -1;) for (t = r[s], e = n._firstPT; e;) i = e._next, e.pg ? e.t._mod(o) : e.n === t && (2 === e.f && e.t ? m(e.t._firstPT) : (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : n._firstPT === e && (n._firstPT = i), e._next = e._prev = null, n._propLookup[t] = a)), e = i;
                return !1
            }, _._add = function (t, e, i, n) {
                this._addTween(t, e, i, i + n, e, Math.round), this._overwriteProps.push(e)
            }, r._gsDefine.plugin({
                propName: "attr", API: 2, version: "0.6.1", init: function (t, e, i, n) {
                    var r, s;
                    if ("function" != typeof t.setAttribute) return !1;
                    for (r in e) "function" == typeof (s = e[r]) && (s = s(n, t)), this._addTween(t, "setAttribute", t.getAttribute(r) + "", s + "", r, !1, r), this._overwriteProps.push(r);
                    return !0
                }
            }), r._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.3.1",
                API: 2,
                init: function (t, e, i, n) {
                    "object" != typeof e && (e = {rotation: e}), this.finals = {};
                    var r, s, o, a, l, h, u = !0 === e.useRadians ? 2 * Math.PI : 360;
                    for (r in e) "useRadians" !== r && ("function" == typeof (a = e[r]) && (a = a(n, t)), s = (h = (a + "").split("_"))[0], o = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), l = (a = this.finals[r] = "string" == typeof s && "=" === s.charAt(1) ? o + parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2)) : Number(s) || 0) - o, h.length && (-1 !== (s = h.join("_")).indexOf("short") && (l %= u) !== l % (u / 2) && (l = l < 0 ? l + u : l - u), -1 !== s.indexOf("_cw") && l < 0 ? l = (l + 9999999999 * u) % u - (l / u | 0) * u : -1 !== s.indexOf("ccw") && l > 0 && (l = (l - 9999999999 * u) % u - (l / u | 0) * u)), (l > 1e-6 || l < -1e-6) && (this._addTween(t, r, o, o + l, r), this._overwriteProps.push(r)));
                    return !0
                },
                set: function (t) {
                    var e;
                    if (1 !== t) this._super.setRatio.call(this, t); else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
                }
            })._autoCSS = !0, r._gsDefine("easing.Back", ["easing.Ease"], function (t) {
                var e, i, n, s = r.GreenSockGlobals || r, o = s.com.greensock, a = 2 * Math.PI, l = Math.PI / 2,
                    h = o._class, u = function (e, i) {
                        var n = h("easing." + e, function () {
                        }, !0), r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, n
                    }, c = t.register || function () {
                    }, f = function (t, e, i, n, r) {
                        var s = h("easing." + t, {easeOut: new e, easeIn: new i, easeInOut: new n}, !0);
                        return c(s, t), s
                    }, d = function (t, e, i) {
                        this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t)
                    }, p = function (e, i) {
                        var n = h("easing." + e, function (t) {
                            this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                        }, !0), r = n.prototype = new t;
                        return r.constructor = n, r.getRatio = i, r.config = function (t) {
                            return new n(t)
                        }, n
                    }, m = f("Back", p("BackOut", function (t) {
                        return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
                    }), p("BackIn", function (t) {
                        return t * t * ((this._p1 + 1) * t - this._p1)
                    }), p("BackInOut", function (t) {
                        return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
                    })), _ = h("easing.SlowMo", function (t, e, i) {
                        e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
                    }, !0), g = _.prototype = new t;
                return g.constructor = _, g.getRatio = function (t) {
                    var e = t + (.5 - t) * this._p;
                    return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 === t ? 0 : 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
                }, _.ease = new _(.7, .7), g.config = _.config = function (t, e, i) {
                    return new _(t, e, i)
                }, (g = (e = h("easing.SteppedEase", function (t, e) {
                    t = t || 1, this._p1 = 1 / t, this._p2 = t + (e ? 0 : 1), this._p3 = e ? 1 : 0
                }, !0)).prototype = new t).constructor = e, g.getRatio = function (t) {
                    return t < 0 ? t = 0 : t >= 1 && (t = .999999999), ((this._p2 * t | 0) + this._p3) * this._p1
                }, g.config = e.config = function (t, i) {
                    return new e(t, i)
                }, (g = (i = h("easing.RoughEase", function (e) {
                    for (var i, n, r, s, o, a, l = (e = e || {}).taper || "none", h = [], u = 0, c = 0 | (e.points || 20), f = c, p = !1 !== e.randomize, m = !0 === e.clamp, _ = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --f > -1;) i = p ? Math.random() : 1 / c * f, n = _ ? _.getRatio(i) : i, r = "none" === l ? g : "out" === l ? (s = 1 - i) * s * g : "in" === l ? i * i * g : i < .5 ? (s = 2 * i) * s * .5 * g : (s = 2 * (1 - i)) * s * .5 * g, p ? n += Math.random() * r - .5 * r : f % 2 ? n += .5 * r : n -= .5 * r, m && (n > 1 ? n = 1 : n < 0 && (n = 0)), h[u++] = {
                        x: i,
                        y: n
                    };
                    for (h.sort(function (t, e) {
                        return t.x - e.x
                    }), a = new d(1, 1, null), f = c; --f > -1;) o = h[f], a = new d(o.x, o.y, a);
                    this._prev = new d(0, 0, 0 !== a.t ? a : a.next)
                }, !0)).prototype = new t).constructor = i, g.getRatio = function (t) {
                    var e = this._prev;
                    if (t > e.t) {
                        for (; e.next && t >= e.t;) e = e.next;
                        e = e.prev
                    } else for (; e.prev && t <= e.t;) e = e.prev;
                    return this._prev = e, e.v + (t - e.t) / e.gap * e.c
                }, g.config = function (t) {
                    return new i(t)
                }, i.ease = new i, f("Bounce", u("BounceOut", function (t) {
                    return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                }), u("BounceIn", function (t) {
                    return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
                }), u("BounceInOut", function (t) {
                    var e = t < .5;
                    return (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
                })), f("Circ", u("CircOut", function (t) {
                    return Math.sqrt(1 - (t -= 1) * t)
                }), u("CircIn", function (t) {
                    return -(Math.sqrt(1 - t * t) - 1)
                }), u("CircInOut", function (t) {
                    return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
                })), f("Elastic", (n = function (e, i, n) {
                    var r = h("easing." + e, function (t, e) {
                        this._p1 = t >= 1 ? t : 1, this._p2 = (e || n) / (t < 1 ? t : 1), this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0), this._p2 = a / this._p2
                    }, !0), s = r.prototype = new t;
                    return s.constructor = r, s.getRatio = i, s.config = function (t, e) {
                        return new r(t, e)
                    }, r
                })("ElasticOut", function (t) {
                    return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
                }, .3), n("ElasticIn", function (t) {
                    return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
                }, .3), n("ElasticInOut", function (t) {
                    return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
                }, .45)), f("Expo", u("ExpoOut", function (t) {
                    return 1 - Math.pow(2, -10 * t)
                }), u("ExpoIn", function (t) {
                    return Math.pow(2, 10 * (t - 1)) - .001
                }), u("ExpoInOut", function (t) {
                    return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
                })), f("Sine", u("SineOut", function (t) {
                    return Math.sin(t * l)
                }), u("SineIn", function (t) {
                    return 1 - Math.cos(t * l)
                }), u("SineInOut", function (t) {
                    return -.5 * (Math.cos(Math.PI * t) - 1)
                })), h("easing.EaseLookup", {
                    find: function (e) {
                        return t.map[e]
                    }
                }, !0), c(s.SlowMo, "SlowMo", "ease,"), c(i, "RoughEase", "ease,"), c(e, "SteppedEase", "ease,"), m
            }, !0)
        }), r._gsDefine && r._gsQueue.pop()(), function (i, r) {
            "use strict";
            var s = {}, o = i.document, a = i.GreenSockGlobals = i.GreenSockGlobals || i;
            if (!a.TweenLite) {
                var l, h, u, c, f, d, p, m = function (t) {
                    var e, i = t.split("."), n = a;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                }, _ = m("com.greensock"), g = 1e-10, v = function (t) {
                    var e, i = [], n = t.length;
                    for (e = 0; e !== n; i.push(t[e++])) ;
                    return i
                }, y = function () {
                }, b = (d = Object.prototype.toString, p = d.call([]), function (t) {
                    return null != t && (t instanceof Array || "object" == typeof t && !!t.push && d.call(t) === p)
                }), w = {}, T = function (i, o, l, h) {
                    this.sc = w[i] ? w[i].sc : [], w[i] = this, this.gsClass = null, this.func = l;
                    var u = [];
                    this.check = function (c) {
                        for (var f, d, p, _, g = o.length, v = g; --g > -1;) (f = w[o[g]] || new T(o[g], [])).gsClass ? (u[g] = f.gsClass, v--) : c && f.sc.push(this);
                        if (0 === v && l) {
                            if (p = (d = ("com.greensock." + i).split(".")).pop(), _ = m(d.join("."))[p] = this.gsClass = l.apply(l, u), h) if (a[p] = s[p] = _, void 0 !== t && t.exports) if (i === r) {
                                t.exports = s[r] = _;
                                for (g in s) _[g] = s[g]
                            } else s[r] && (s[r][p] = _); else void 0 === (n = function () {
                                return _
                            }.apply(e, [])) || (t.exports = n);
                            for (g = 0; g < this.sc.length; g++) this.sc[g].check()
                        }
                    }, this.check(!0)
                }, x = i._gsDefine = function (t, e, i, n) {
                    return new T(t, e, i, n)
                }, P = _._class = function (t, e, i) {
                    return e = e || function () {
                    }, x(t, [], function () {
                        return e
                    }, i), e
                };
                x.globals = a;
                var S = [0, 0, 1, 1], k = P("easing.Ease", function (t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? S.concat(e) : S
                }, !0), E = k.map = {}, C = k.register = function (t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;) for (s = l[h], r = n ? P("easing." + s, null, !0) : _.easing[s] || {}, o = u.length; --o > -1;) a = u[o], E[s + "." + a] = E[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
                for ((u = k.prototype)._calcEnd = !1, u.getRatio = function (t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type, i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                }, h = (l = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --h > -1;) u = l[h] + ",Power" + h, C(new k(null, null, 1, h), u, "easeOut", !0), C(new k(null, null, 2, h), u, "easeIn" + (0 === h ? ",easeNone" : "")), C(new k(null, null, 3, h), u, "easeInOut");
                E.linear = _.easing.Linear.easeIn, E.swing = _.easing.Quad.easeInOut;
                var A = P("events.EventDispatcher", function (t) {
                    this._listeners = {}, this._eventTarget = t || this
                });
                (u = A.prototype).addEventListener = function (t, e, i, n, r) {
                    r = r || 0;
                    var s, o, a = this._listeners[t], l = 0;
                    for (this !== c || f || c.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) (s = a[o]).c === e && s.s === i ? a.splice(o, 1) : 0 === l && s.pr < r && (l = o + 1);
                    a.splice(l, 0, {c: e, s: i, up: n, pr: r})
                }, u.removeEventListener = function (t, e) {
                    var i, n = this._listeners[t];
                    if (n) for (i = n.length; --i > -1;) if (n[i].c === e) return void n.splice(i, 1)
                }, u.dispatchEvent = function (t) {
                    var e, i, n, r = this._listeners[t];
                    if (r) for ((e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) (n = r[e]) && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
                };
                var O = i.requestAnimationFrame, D = i.cancelAnimationFrame, L = Date.now || function () {
                    return (new Date).getTime()
                }, M = L();
                for (h = (l = ["ms", "moz", "webkit", "o"]).length; --h > -1 && !O;) O = i[l[h] + "RequestAnimationFrame"], D = i[l[h] + "CancelAnimationFrame"] || i[l[h] + "CancelRequestAnimationFrame"];
                P("Ticker", function (t, e) {
                    var i, n, r, s, a, l = this, h = L(), u = !(!1 === e || !O) && "auto", d = 500, p = 33,
                        m = function (t) {
                            var e, o, u = L() - M;
                            u > d && (h += u - p), M += u, l.time = (M - h) / 1e3, e = l.time - a, (!i || e > 0 || !0 === t) && (l.frame++, a += e + (e >= s ? .004 : s - e), o = !0), !0 !== t && (r = n(m)), o && l.dispatchEvent("tick")
                        };
                    A.call(l), l.time = l.frame = 0, l.tick = function () {
                        m(!0)
                    }, l.lagSmoothing = function (t, e) {
                        if (!arguments.length) return d < 1e10;
                        d = t || 1e10, p = Math.min(e, d, 0)
                    }, l.sleep = function () {
                        null != r && (u && D ? D(r) : clearTimeout(r), n = y, r = null, l === c && (f = !1))
                    }, l.wake = function (t) {
                        null !== r ? l.sleep() : t ? h += -M + (M = L()) : l.frame > 10 && (M = L() - d + 5), n = 0 === i ? y : u && O ? O : function (t) {
                            return setTimeout(t, 1e3 * (a - l.time) + 1 | 0)
                        }, l === c && (f = !0), m(2)
                    }, l.fps = function (t) {
                        if (!arguments.length) return i;
                        s = 1 / ((i = t) || 60), a = this.time + s, l.wake()
                    }, l.useRAF = function (t) {
                        if (!arguments.length) return u;
                        l.sleep(), u = t, l.fps(i)
                    }, l.fps(t), setTimeout(function () {
                        "auto" === u && l.frame < 5 && "hidden" !== o.visibilityState && l.useRAF(!1)
                    }, 1500)
                }), (u = _.Ticker.prototype = new _.events.EventDispatcher).constructor = _.Ticker;
                var z = P("core.Animation", function (t, e) {
                    if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, J) {
                        f || c.wake();
                        var i = this.vars.useFrames ? K : J;
                        i.add(this, i._time), this.vars.paused && this.paused(!0)
                    }
                });
                c = z.ticker = new _.Ticker, (u = z.prototype)._dirty = u._gc = u._initted = u._paused = !1, u._totalTime = u._time = 0, u._rawPrevTime = -1, u._next = u._last = u._onUpdate = u._timeline = u.timeline = null, u._paused = !1;
                var R = function () {
                    f && L() - M > 2e3 && ("hidden" !== o.visibilityState || !c.lagSmoothing()) && c.wake();
                    var t = setTimeout(R, 2e3);
                    t.unref && t.unref()
                };
                R(), u.play = function (t, e) {
                    return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                }, u.pause = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!0)
                }, u.resume = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!1)
                }, u.seek = function (t, e) {
                    return this.totalTime(Number(t), !1 !== e)
                }, u.restart = function (t, e) {
                    return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
                }, u.reverse = function (t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                }, u.render = function (t, e, i) {
                }, u.invalidate = function () {
                    return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
                }, u.isActive = function () {
                    var t, e = this._timeline, i = this._startTime;
                    return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
                }, u._enabled = function (t, e) {
                    return f || c.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                }, u._kill = function (t, e) {
                    return this._enabled(!1, !1)
                }, u.kill = function (t, e) {
                    return this._kill(t, e), this
                }, u._uncache = function (t) {
                    for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                    return this
                }, u._swapSelfInParams = function (t) {
                    for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                    return i
                }, u._callback = function (t) {
                    var e = this.vars, i = e[t], n = e[t + "Params"], r = e[t + "Scope"] || e.callbackScope || this;
                    switch (n ? n.length : 0) {
                        case 0:
                            i.call(r);
                            break;
                        case 1:
                            i.call(r, n[0]);
                            break;
                        case 2:
                            i.call(r, n[0], n[1]);
                            break;
                        default:
                            i.apply(r, n)
                    }
                }, u.eventCallback = function (t, e, i, n) {
                    if ("on" === (t || "").substr(0, 2)) {
                        var r = this.vars;
                        if (1 === arguments.length) return r[t];
                        null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = b(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                    }
                    return this
                }, u.delay = function (t) {
                    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                }, u.duration = function (t) {
                    return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                }, u.totalDuration = function (t) {
                    return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                }, u.time = function (t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                }, u.totalTime = function (t, e, i) {
                    if (f || c.wake(), !arguments.length) return this._totalTime;
                    if (this._timeline) {
                        if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                            this._dirty && this.totalDuration();
                            var n = this._totalDuration, r = this._timeline;
                            if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                        }
                        this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (j.length && et(), this.render(t, e, !1), j.length && et())
                    }
                    return this
                }, u.progress = u.totalProgress = function (t, e) {
                    var i = this.duration();
                    return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
                }, u.startTime = function (t) {
                    return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                }, u.endTime = function (t) {
                    return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                }, u.timeScale = function (t) {
                    if (!arguments.length) return this._timeScale;
                    var e, i;
                    for (t = t || g, this._timeline && this._timeline.smoothChildTiming && (i = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), this._timeScale = t, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;
                    return this
                }, u.reversed = function (t) {
                    return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                }, u.paused = function (t) {
                    if (!arguments.length) return this._paused;
                    var e, i, n = this._timeline;
                    return t != this._paused && n && (f || t || c.wake(), i = (e = n.rawTime()) - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
                };
                var I = P("core.SimpleTimeline", function (t) {
                    z.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                });
                (u = I.prototype = new z).constructor = I, u.kill()._gc = !1, u._first = u._last = u._recent = null, u._sortChildren = !1, u.add = u.insert = function (t, e, i, n) {
                    var r, s;
                    if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren) for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                    return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
                }, u._remove = function (t, e) {
                    return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                }, u.render = function (t, e, i) {
                    var n, r = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
                }, u.rawTime = function () {
                    return f || c.wake(), this._totalTime
                };
                var F = P("TweenLite", function (t, e, n) {
                    if (z.call(this, e, n), this.render = F.prototype.render, null == t) throw"Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : F.selector(t) || t;
                    var r, s, o,
                        a = t.jquery || t.length && t !== i && t[0] && (t[0] === i || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Z[F.defaultOverwrite] : "number" == typeof l ? l >> 0 : Z[l], (a || t instanceof Array || t.push && b(t)) && "number" != typeof t[0]) for (this._targets = o = v(t), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) (s = o[r]) ? "string" != typeof s ? s.length && s !== i && s[0] && (s[0] === i || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(v(s))) : (this._siblings[r] = it(s, this, !1), 1 === l && this._siblings[r].length > 1 && rt(s, this, null, 1, this._siblings[r])) : "string" == typeof (s = o[r--] = F.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1); else this._propLookup = {}, this._siblings = it(t, this, !1), 1 === l && this._siblings.length > 1 && rt(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === e && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -g, this.render(Math.min(0, -this._delay)))
                }, !0), N = function (t) {
                    return t && t.length && t !== i && t[0] && (t[0] === i || t[0].nodeType && t[0].style && !t.nodeType)
                };
                (u = F.prototype = new z).constructor = F, u.kill()._gc = !1, u.ratio = 0, u._firstPT = u._targets = u._overwrittenProps = u._startAt = null, u._notifyPluginsOfEnabled = u._lazy = !1, F.version = "1.20.3", F.defaultEase = u._ease = new k(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = c, F.autoSleep = 120, F.lagSmoothing = function (t, e) {
                    c.lagSmoothing(t, e)
                }, F.selector = i.$ || i.jQuery || function (t) {
                    var e = i.$ || i.jQuery;
                    return e ? (F.selector = e, e(t)) : void 0 === o ? t : o.querySelectorAll ? o.querySelectorAll(t) : o.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
                };
                var j = [], B = {}, W = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, X = /[\+-]=-?[\.\d]/,
                    Y = function (t) {
                        for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : e < 1e-6 && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                    }, q = function (t, e, i, n) {
                        var r, s, o, a, l, h, u, c = [], f = 0, d = "", p = 0;
                        for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", i && (i(c), t = c[0], e = c[1]), c.length = 0, r = t.match(W) || [], s = e.match(W) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, a = 0; a < l; a++) u = s[a], d += (h = e.substr(f, e.indexOf(u, f) - f)) || !a ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), u === r[a] || r.length <= a ? d += u : (d && (c.push(d), d = ""), o = parseFloat(r[a]), c.push(o), c._firstPT = {
                            _next: c._firstPT,
                            t: c,
                            p: c.length - 1,
                            s: o,
                            c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
                            f: 0,
                            m: p && p < 4 ? Math.round : 0
                        }), f += u.length;
                        return (d += e.substr(f)) && c.push(d), c.setRatio = Y, X.test(e) && (c.end = null), c
                    }, U = function (t, e, i, n, r, s, o, a, l) {
                        "function" == typeof n && (n = n(l || 0, t));
                        var h = typeof t[e],
                            u = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                            c = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                            f = "string" == typeof n && "=" === n.charAt(1), d = {
                                t: t,
                                p: e,
                                s: c,
                                f: "function" === h,
                                pg: 0,
                                n: r || e,
                                m: s ? "function" == typeof s ? s : Math.round : 0,
                                pr: 0,
                                c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - c || 0
                            };
                        if (("number" != typeof c || "number" != typeof n && !f) && (o || isNaN(c) || !f && isNaN(n) || "boolean" == typeof c || "boolean" == typeof n ? (d.fp = o, d = {
                            t: q(c, f ? parseFloat(d.s) + d.c : n, a || F.defaultStringFilter, d),
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || e,
                            pr: 0,
                            m: 0
                        }) : (d.s = parseFloat(c), f || (d.c = parseFloat(n) - d.s || 0))), d.c) return (d._next = this._firstPT) && (d._next._prev = d), this._firstPT = d, d
                    }, H = F._internals = {isArray: b, isSelector: N, lazyTweens: j, blobDif: q}, V = F._plugins = {},
                    G = H.tweenLookup = {}, $ = 0, Q = H.reservedProps = {
                        ease: 1,
                        delay: 1,
                        overwrite: 1,
                        onComplete: 1,
                        onCompleteParams: 1,
                        onCompleteScope: 1,
                        useFrames: 1,
                        runBackwards: 1,
                        startAt: 1,
                        onUpdate: 1,
                        onUpdateParams: 1,
                        onUpdateScope: 1,
                        onStart: 1,
                        onStartParams: 1,
                        onStartScope: 1,
                        onReverseComplete: 1,
                        onReverseCompleteParams: 1,
                        onReverseCompleteScope: 1,
                        onRepeat: 1,
                        onRepeatParams: 1,
                        onRepeatScope: 1,
                        easeParams: 1,
                        yoyo: 1,
                        immediateRender: 1,
                        repeat: 1,
                        repeatDelay: 1,
                        data: 1,
                        paused: 1,
                        reversed: 1,
                        autoCSS: 1,
                        lazy: 1,
                        onOverwrite: 1,
                        callbackScope: 1,
                        stringFilter: 1,
                        id: 1,
                        yoyoEase: 1
                    }, Z = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0},
                    K = z._rootFramesTimeline = new I, J = z._rootTimeline = new I, tt = 30,
                    et = H.lazyRender = function () {
                        var t, e = j.length;
                        for (B = {}; --e > -1;) (t = j[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                        j.length = 0
                    };
                J._startTime = c.time, K._startTime = c.frame, J._active = K._active = !0, setTimeout(et, 1), z._updateRoot = F.render = function () {
                    var t, e, i;
                    if (j.length && et(), J.render((c.time - J._startTime) * J._timeScale, !1, !1), K.render((c.frame - K._startTime) * K._timeScale, !1, !1), j.length && et(), c.frame >= tt) {
                        tt = c.frame + (parseInt(F.autoSleep, 10) || 120);
                        for (i in G) {
                            for (t = (e = G[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                            0 === e.length && delete G[i]
                        }
                        if ((!(i = J._first) || i._paused) && F.autoSleep && !K._first && 1 === c._listeners.tick.length) {
                            for (; i && i._paused;) i = i._next;
                            i || c.sleep()
                        }
                    }
                }, c.addEventListener("tick", z._updateRoot);
                var it = function (t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (G[s || (t._gsTweenID = s = "t" + $++)] || (G[s] = {
                        target: t,
                        tweens: []
                    }), e && ((n = G[s].tweens)[r = n.length] = e, i)) for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return G[s].tweens
                }, nt = function (t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), (o = F.onOverwrite) && (s = o(t, e, i, n)), !1 !== r && !1 !== s
                }, rt = function (t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++) if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0); else if (5 === n) break;
                        return o
                    }
                    var h, u = e._startTime + g, c = [], f = 0, d = 0 === e._duration;
                    for (s = r.length; --s > -1;) (a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || st(e, 0, d), 0 === st(a, h, d) && (c[f++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((d || !a._initted) && u - a._startTime <= 2e-10 || (c[f++] = a)));
                    for (s = f; --s > -1;) if (a = c[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                        if (2 !== n && !nt(a, e)) continue;
                        a._enabled(!1, !1) && (o = !0)
                    }
                    return o
                }, st = function (t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return (s /= r) > e ? s - e : i && s === e || !t._initted && s - e < 2 * g ? g : (s += t.totalDuration() / t._timeScale / r) > e + g ? 0 : s - e - g
                };
                u._init = function () {
                    var t, e, i, n, r, s, o = this.vars, a = this._overwrittenProps, l = this._duration,
                        h = !!o.immediateRender, u = o.ease;
                    if (o.startAt) {
                        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                        for (n in o.startAt) r[n] = o.startAt[n];
                        if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== o.lazy, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = F.to(this.target, 0, r), h) if (this._time > 0) this._startAt = null; else if (0 !== l) return
                    } else if (o.runBackwards && 0 !== l) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) Q[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== o.lazy, i.immediateRender = h, this._startAt = F.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                    if (this._ease = u = u ? u instanceof k ? u : "function" == typeof u ? new k(u, o.easeParams) : E[u] || F.defaultEase : F.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                    if (e && F._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                    this._onUpdate = o.onUpdate, this._initted = !0
                }, u._initProps = function (t, e, n, r, s) {
                    var o, a, l, h, u, c;
                    if (null == t) return !1;
                    B[t._gsTweenID] && et(), this.vars.css || t.style && t !== i && t.nodeType && V.css && !1 !== this.vars.autoCSS && function (t, e) {
                        var i, n = {};
                        for (i in t) Q[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!V[i] || V[i] && V[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                        t.css = n
                    }(this.vars, t);
                    for (o in this.vars) if (c = this.vars[o], Q[o]) c && (c instanceof Array || c.push && b(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this)); else if (V[o] && (h = new V[o])._onInitTween(t, this.vars[o], this, s)) {
                        for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) e[h._overwriteProps[a]] = this._firstPT;
                        (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                    } else e[o] = U.call(this, t, o, "get", c, o, 0, null, this.vars.stringFilter, s);
                    return r && this._kill(r, t) ? this._initProps(t, e, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && rt(t, this, e, this._overwrite, n) ? (this._kill(e, t), this._initProps(t, e, n, r, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (B[t._gsTweenID] = !0), l)
                }, u.render = function (t, e, i) {
                    var n, r, s, o, a = this._time, l = this._duration, h = this._rawPrevTime;
                    if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || h === g && "isPause" !== this.data) && h !== t && (i = !0, h > g && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : g); else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== g || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : g)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                        var u = t / l, c = this._easeType, f = this._easePower;
                        (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : t / l < .5 ? u / 2 : 1 - u / 2
                    } else this.ratio = this._ease.getRatio(t / l);
                    if (this._time !== a || i) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, j.push(this), void (this._lazy = [t, e]);
                            this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                        this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === g && o !== g && (this._rawPrevTime = 0)))
                    }
                }, u._kill = function (t, e, i) {
                    if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                    e = "string" != typeof e ? e || this._targets || this.target : F.selector(e) || e;
                    var n, r, s, o, a, l, h, u, c,
                        f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                    if ((b(e) || N(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0); else {
                        if (this._targets) {
                            for (n = this._targets.length; --n > -1;) if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                        } else {
                            if (e !== this.target) return !1;
                            a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                        }
                        if (a) {
                            if (h = t || a, u = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (F.onOverwrite || this.vars.onOverwrite)) {
                                for (s in h) a[s] && (c || (c = []), c.push(s));
                                if ((c || !t) && !nt(this, i, e, c)) return !1
                            }
                            for (s in h) (o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return l
                }, u.invalidate = function () {
                    return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], z.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -g, this.render(Math.min(0, -this._delay))), this
                }, u._enabled = function (t, e) {
                    if (f || c.wake(), t && this._gc) {
                        var i, n = this._targets;
                        if (n) for (i = n.length; --i > -1;) this._siblings[i] = it(n[i], this, !0); else this._siblings = it(this.target, this, !0)
                    }
                    return z.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && F._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
                }, F.to = function (t, e, i) {
                    return new F(t, e, i)
                }, F.from = function (t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new F(t, e, i)
                }, F.fromTo = function (t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new F(t, e, n)
                }, F.delayedCall = function (t, e, i, n, r) {
                    return new F(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        lazy: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, F.set = function (t, e) {
                    return new F(t, 0, e)
                }, F.getTweensOf = function (t, e) {
                    if (null == t) return [];
                    var i, n, r, s;
                    if (t = "string" != typeof t ? t : F.selector(t) || t, (b(t) || N(t)) && "number" != typeof t[0]) {
                        for (i = t.length, n = []; --i > -1;) n = n.concat(F.getTweensOf(t[i], e));
                        for (i = n.length; --i > -1;) for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                    } else if (t._gsTweenID) for (i = (n = it(t).concat()).length; --i > -1;) (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                    return n || []
                }, F.killTweensOf = F.killDelayedCallsTo = function (t, e, i) {
                    "object" == typeof e && (i = e, e = !1);
                    for (var n = F.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
                };
                var ot = P("plugins.TweenPlugin", function (t, e) {
                    this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = ot.prototype
                }, !0);
                if (u = ot.prototype, ot.version = "1.19.0", ot.API = 2, u._firstPT = null, u._addTween = U, u.setRatio = Y, u._kill = function (t) {
                    var e, i = this._overwriteProps, n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, u._mod = u._roundProps = function (t) {
                    for (var e, i = this._firstPT; i;) (e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, F._onPluginEvent = function (t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a : r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, ot.activate = function (t) {
                    for (var e = t.length; --e > -1;) t[e].API === ot.API && (V[(new t[e])._propName] = t[e]);
                    return !0
                }, x.plugin = function (t) {
                    if (!(t && t.propName && t.init && t.API)) throw"illegal plugin definition.";
                    var e, i = t.propName, n = t.priority || 0, r = t.overwriteProps, s = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_mod",
                        mod: "_mod",
                        initAll: "_onInitAllProps"
                    }, o = P("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                        ot.call(this, i, n), this._overwriteProps = r || []
                    }, !0 === t.global), a = o.prototype = new ot(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, ot.activate([o]), o
                }, l = i._gsQueue) {
                    for (h = 0; h < l.length; h++) l[h]();
                    for (u in w) w[u].func || i.console.log("GSAP encountered missing dependency: " + u)
                }
                f = !1
            }
        }(void 0 !== t && t.exports && void 0 !== i ? i : this || window, "TweenMax")
    }).call(e, i(3))
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.controller = function () {
        c(), n.contextualBinds(), r.runSnap(), s.init(), o.bindUI(), a.init(), l.init(), h.init()
    }, e.beforeDestroy = function () {
    }, e.bindWindowListener = function (t, e) {
        if (!t || !e) return;
        window.addEventListener(t, e), f.push({method: t, action: e})
    }, e.unbindWindowListener = function (t, e) {
        if (!t || !e) return;
        window.removeEventListener(t, e), f.find(function (i, n) {
            i.action === e && i.method === t && f.splice(n, 1)
        })
    }, e.unbindWindowListeners = function () {
        if (f.length) {
            for (var t = f.length - 1; t >= 0; t--) window.removeEventListener(f[t].method, f[t].action);
            f = []
        }
    };
    var n = u(i(8)), r = u(i(11)), s = u(i(21)), o = u(i(36)), a = u(i(37)), l = u(i(38)), h = u(i(43));

    function u(t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e.default = t, e
    }

    var c = i(47), f = []
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.menuOpen = void 0, e.closeNav = l, e.openNav = h, e.contextualBinds = function () {
        for (var t = document.querySelectorAll("[data-sidebar-trigger]"), e = t.length - 1; e >= 0; e--) t[e].addEventListener("click", function (t) {
            "A" !== t.target.tagName && !1 === a && h()
        })
    }, e.globalBinds = function () {
        if (!r) return;
        r.addEventListener("click", function () {
            !1 === a && h()
        }), s.addEventListener("click", function () {
            !0 === a && l()
        }), o.addEventListener("click", function () {
            !0 === a && l()
        })
    };
    var n = i(6),
        r = document.querySelector("[data-sidebar]"),
        s = document.querySelector("[data-sidebar-handle]"),
        o = document.querySelector("[data-sidebar-backdrop]"),
        a = e.menuOpen = !1;
// 左侧动画,点击时菜单弹出和收回;

    function l() {
        console.log("close")
        n.TweenMax.isTweening(r) || (r.classList.remove("is-open"),
            r.classList.add("is-animating"),
            n.TweenMax.from(r, .5, {
                x: "0%",
                clearProps: "all",
                ease: Power2.easeInOut,
                onComplete: function () {
                    r.classList.remove("is-animating"), e.menuOpen = a = !1
                }
            }))
    }

    function h() {
        console.log("open")
        n.TweenMax.isTweening(r) || (r.classList.add("is-animating"), n.TweenMax.to(r, .5, {
            x: "0%",
            clearProps: "all",
            ease: Power2.easeInOut,
            onComplete: function () {
                e.menuOpen = a = !0, r.classList.add("is-open"), r.classList.remove("is-animating")
            }
        }))
    }
}, function (t, e, i) {
    var n, r, s, o;
    s = window, o = function (t, e) {
        "use strict";

        function i() {
        }

        var n = i.prototype = Object.create(e.prototype);
        n.bindStartEvent = function (t) {
            this._bindStartEvent(t, !0)
        }, n.unbindStartEvent = function (t) {
            this._bindStartEvent(t, !1)
        }, n._bindStartEvent = function (e, i) {
            var n = (i = void 0 === i || i) ? "addEventListener" : "removeEventListener", r = "mousedown";
            t.PointerEvent ? r = "pointerdown" : "ontouchstart" in t && (r = "touchstart"), e[n](r, this)
        }, n.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, n.getTouch = function (t) {
            for (var e = 0; e < t.length; e++) {
                var i = t[e];
                if (i.identifier == this.pointerIdentifier) return i
            }
        }, n.onmousedown = function (t) {
            var e = t.button;
            e && 0 !== e && 1 !== e || this._pointerDown(t, t)
        }, n.ontouchstart = function (t) {
            this._pointerDown(t, t.changedTouches[0])
        }, n.onpointerdown = function (t) {
            this._pointerDown(t, t)
        }, n._pointerDown = function (t, e) {
            t.button || this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== e.pointerId ? e.pointerId : e.identifier, this.pointerDown(t, e))
        }, n.pointerDown = function (t, e) {
            this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e])
        };
        var r = {
            mousedown: ["mousemove", "mouseup"],
            touchstart: ["touchmove", "touchend", "touchcancel"],
            pointerdown: ["pointermove", "pointerup", "pointercancel"]
        };
        return n._bindPostStartEvents = function (e) {
            if (e) {
                var i = r[e.type];
                i.forEach(function (e) {
                    t.addEventListener(e, this)
                }, this), this._boundPointerEvents = i
            }
        }, n._unbindPostStartEvents = function () {
            this._boundPointerEvents && (this._boundPointerEvents.forEach(function (e) {
                t.removeEventListener(e, this)
            }, this), delete this._boundPointerEvents)
        }, n.onmousemove = function (t) {
            this._pointerMove(t, t)
        }, n.onpointermove = function (t) {
            t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
        }, n.ontouchmove = function (t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerMove(t, e)
        }, n._pointerMove = function (t, e) {
            this.pointerMove(t, e)
        }, n.pointerMove = function (t, e) {
            this.emitEvent("pointerMove", [t, e])
        }, n.onmouseup = function (t) {
            this._pointerUp(t, t)
        }, n.onpointerup = function (t) {
            t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
        }, n.ontouchend = function (t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerUp(t, e)
        }, n._pointerUp = function (t, e) {
            this._pointerDone(), this.pointerUp(t, e)
        }, n.pointerUp = function (t, e) {
            this.emitEvent("pointerUp", [t, e])
        }, n._pointerDone = function () {
            this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone()
        }, n._pointerReset = function () {
            this.isPointerDown = !1, delete this.pointerIdentifier
        }, n.pointerDone = function () {
        }, n.onpointercancel = function (t) {
            t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t)
        }, n.ontouchcancel = function (t) {
            var e = this.getTouch(t.changedTouches);
            e && this._pointerCancel(t, e)
        }, n._pointerCancel = function (t, e) {
            this._pointerDone(), this.pointerCancel(t, e)
        }, n.pointerCancel = function (t, e) {
            this.emitEvent("pointerCancel", [t, e])
        }, i.getPointerPoint = function (t) {
            return {x: t.pageX, y: t.pageY}
        }, i
    }, n = [i(2)], void 0 === (r = function (t) {
        return o(s, t)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.directAjaxRequest = function (t) {
        if (!0 === l.isLoading) return;
        Modernizr.history ? (event && event.preventDefault(), history.pushState({}, null, t), g(t)) : location = t
    }, e.bindHistoryLinks = v, e.default = function () {
        var t = void 0;
        v(h), window.onload = function () {
            t = !0, setTimeout(function () {
                t = !1
            }, 0)
        }, window.onpopstate = function (e) {
            t ? t = !1 : g(document.location.pathname)
        }
    };
    var n, r = i(6), s = (n = r) && n.__esModule ? n : {default: n}, o = i(7), a = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e.default = t, e
    }(i(8));
    var l = {isLoading: !1, closeUrl: null},
        h = document.querySelectorAll('a:not(.prevent-history):not([href^="mailto"]), [data-nav] a'),
        u = document.querySelector("[data-content]"),
        c = document.querySelectorAll("[data-nav] li"),
        f = document.querySelector("#loader"),
        d = document.body,
        p = (document.documentElement, function (t) {
            return 0 === t.indexOf("//") && (t = location.protocol + t), t.toLowerCase().replace(/([a-z])?:\/\//, "$1").split("/")[0]
        }), m = function (t) {
            return (t.indexOf(":") > -1 || t.indexOf("//") > -1) && p(location.href) !== p(t)
        };

    function _(t) {
        var e = t.target;
        if (!0 !== l.isLoading) {
            "a" !== e.tagName.toLowerCase() && (e = e.closest("a"));
            var i = e.getAttribute("href");    //i: projects/index.html
            if (!m(i)) {
                if (!0 === a.menuOpen && a.closeNav(), i !== window.location.href) {
                    if (Modernizr.history) {
                        var n = {prevUrl: window.location.hash ? window.location.pathname + window.location.hash : window.location.pathname};
                        // t.preventDefault()
                        //     history.pushState(n, null, i)
                        //     g(i, n)
                    }
                } else {
                    t.preventDefault()
                }
            }
        }
    }

    function g(t, e) {
        //点击切换菜单，请求html源码数据
        var i, n = new XMLHttpRequest;
        e = e || {};

        //ruturn原因：当处于“联系”页面时，再次点击联系，会出现一直加载的情况，
        //           因为存在ajax请求，故进行跳出，禁止掉网络请求
        return

        function r() {
            s.default.to(u, .35, {opacity: 1, delay: .1, ease: Power1.easeOut, onComplete: o.controller})
        }

        function a() {
            if (i) {
                var n = i.responseXML,    //DOM页面
                    r = n.querySelector("[data-content]"),     //main主体
                    s = n.querySelectorAll("[data-nav] li"),   //弹窗几个选项菜单
                    a = n.querySelector("body"),               //body主体
                    h = a.getAttribute("class") || "",     //空
                    f = a.getAttribute("style") || "",     //空
                    p = r.innerHTML,                                    //main主体内的信息详情
                    m = r.getAttribute("class") || "",     //content
                    _ = n.querySelector("title").innerText;     //title标题

                t || location.pathname,
                window.ga && ga.loaded && ga("send", "pageview", location.pathname),
                    document.title = _,
                    d.setAttribute("class", h),
                    d.setAttribute("style", f);

                for (var g = c.length - 1; g >= 0; g--) c[g].className = s[g].className;

                (0, o.beforeDestroy)(),
                    u.innerHTML = p,
                    u.setAttribute("class", m);

                var y = document.querySelector("[data-page-return]");
                if (y && null !== l.closeUrl && y.setAttribute("href", l.closeUrl), !e.hasOwnProperty("transition") || !0 === e.transition) if (document.location.hash) {
                    var b = document.location.hash.replace("/", "").replace("#", ""), w = document.getElementById(b);
                    if (w) {
                        var T = w.getBoundingClientRect(), x = window.pageYOffset || document.documentElement.scrollTop;
                        window.scrollTo(0, T.top + x)
                    }
                } else window.scrollTo(0, 0);
                v(u.querySelectorAll('a:not(.prevent-history):not([href^="mailto"])'))
            }
        }
        n.open("GET", t), n.responseType = "document", f.classList.add("is-loading"), l.isLoading = !0, (0, o.unbindWindowListeners)(), e.prevUrl ? l.closeUrl = e.prevUrl : l.closeUrl = null, e.hasOwnProperty("transition") && !1 === e.transition ? a() : s.default.to(u, .35, {
            opacity: 0,
            ease: Power2.easeOut,
            onComplete: function () {
                !1 === l.isLoading && (a(), r())
            }
        }), n.onload = function () {
            200 === n.status ? (i = this, f.classList.remove("is-loading"), l.isLoading = !1, s.default.isTweening(u) || (a(), r())) : location = t
        }, n.send()
    }
    function v(t) {
        if (void 0 !== t.length) for (var e = 0; e < t.length; e++) t[e].addEventListener("click", _, !1); else t.addEventListener("click", _, !1)
    }
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0});
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    e.runSnap = function () {
        p = [], c = document.querySelectorAll("[data-snap-section]"), f = document.querySelectorAll("[data-snap-proceed]"), v(), function () {
            for (var t = function (t) {
                f[t].addEventListener("click", function () {
                    var e = f[t].closest("[data-snap-section]");
                    e && function (t) {
                        var e = Array.prototype.slice.call(c).indexOf(t);
                        p[e + 1];
                        i = e + 1, n = p[i], n && a.TweenMax.to(window, .75, {
                            scrollTo: {y: n[0]},
                            ease: Power2.easeOut
                        }), u = "down";
                        var i, n
                    }(e)
                })
            }, e = f.length - 1; e >= 0; e--) t(e);
            var i = (0, l.debounce)(g, 25), n = (0, l.debounce)(v, 100);
            (0, h.bindWindowListener)("scroll", i), (0, h.bindWindowListener)("resize", n), (0, h.bindWindowListener)("touchend", i)
        }()
    }, e.bindWheel = function () {
        var t = 0;
        new o.default({
            callback: function (t) {
                u = t.direction
            }, preventMouse: !1
        });
        window.addEventListener("touchstart", function (e) {
            t = e.touches[0].clientY, m = !0
        }), window.addEventListener("touchmove", function (e) {
            var i = e.changedTouches[0].clientY;
            u = t > i ? "down" : "up"
        }), window.addEventListener("touchend", function () {
            m = !1
        })
    };
    var r, s = i(18), o = (r = s) && r.__esModule ? r : {default: r}, a = i(6), l = i(19), h = i(7);
    i(20);
    document.querySelector("[data-content]");
    var u = null, c = null, f = null, d = .75, p = [], m = !1, _ = void 0;

    function g(t) {
        var e = window.scrollY, i = e + window.innerHeight;
        if (!(a.TweenMax.isTweening(window) || !0 === m || _ < 1024)) {
            var r = function (t) {
                var n = p[t][0], r = p[t][1];
                if (e > n && e < r) {
                    if (i < r) return {v: void 0};
                    var s = p[t + 1], o = function () {
                        return s && "down" == u ? {
                            target: s[0],
                            speed: r / i * d
                        } : "up" == u ? {target: r - window.innerHeight, speed: d} : null
                    };
                    return null !== o() && a.TweenMax.to(window, o().speed, {
                        scrollTo: {y: o().target},
                        ease: Power2.easeOut
                    }), "break"
                }
            };
            t:for (var s = p.length - 1; s >= 0; s--) {
                var o = r(s);
                switch (o) {
                    case"break":
                        break t;
                    default:
                        if ("object" === (void 0 === o ? "undefined" : n(o))) return o.v
                }
            }
        }
    }

    function v() {
        _ = window.innerWidth;
        for (var t = 0; t < c.length; t++) {
            var e = c[t],
                i = (void 0, void 0, void 0, r = e.getBoundingClientRect(), s = window.pageXOffset || document.documentElement.scrollLeft, o = window.pageYOffset || document.documentElement.scrollTop, {
                    top: r.top + o,
                    left: r.left + s
                }).top, n = i + e.clientHeight;
            p[t] = [i, n]
        }
        var r, s, o
    }
}, function (t, e, i) {

    (function (i) {
        var n;
        !function (i, r) {
            "use strict";
            var s = {}, o = i.document, a = i.GreenSockGlobals = i.GreenSockGlobals || i;
            if (!a.TweenLite) {
                var l, h, u, c, f, d, p, m = function (t) {
                    var e, i = t.split("."), n = a;
                    for (e = 0; e < i.length; e++) n[i[e]] = n = n[i[e]] || {};
                    return n
                }, _ = m("com.greensock"), g = 1e-10, v = function (t) {
                    var e, i = [], n = t.length;
                    for (e = 0; e !== n; i.push(t[e++])) ;
                    return i
                }, y = function () {
                }, b = (d = Object.prototype.toString, p = d.call([]), function (t) {
                    return null != t && (t instanceof Array || "object" == typeof t && !!t.push && d.call(t) === p)
                }), w = {}, T = function (i, o, l, h) {
                    this.sc = w[i] ? w[i].sc : [], w[i] = this, this.gsClass = null, this.func = l;
                    var u = [];
                    this.check = function (c) {
                        for (var f, d, p, _, g = o.length, v = g; --g > -1;) (f = w[o[g]] || new T(o[g], [])).gsClass ? (u[g] = f.gsClass, v--) : c && f.sc.push(this);
                        if (0 === v && l) {
                            if (p = (d = ("com.greensock." + i).split(".")).pop(), _ = m(d.join("."))[p] = this.gsClass = l.apply(l, u), h) if (a[p] = s[p] = _, void 0 !== t && t.exports) if (i === r) {
                                t.exports = s[r] = _;
                                for (g in s) _[g] = s[g]
                            } else s[r] && (s[r][p] = _); else void 0 === (n = function () {
                                return _
                            }.apply(e, [])) || (t.exports = n);
                            for (g = 0; g < this.sc.length; g++) this.sc[g].check()
                        }
                    }, this.check(!0)
                }, x = i._gsDefine = function (t, e, i, n) {
                    return new T(t, e, i, n)
                }, P = _._class = function (t, e, i) {
                    return e = e || function () {
                    }, x(t, [], function () {
                        return e
                    }, i), e
                };
                x.globals = a;
                var S = [0, 0, 1, 1], k = P("easing.Ease", function (t, e, i, n) {
                    this._func = t, this._type = i || 0, this._power = n || 0, this._params = e ? S.concat(e) : S
                }, !0), E = k.map = {}, C = k.register = function (t, e, i, n) {
                    for (var r, s, o, a, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --h > -1;) for (s = l[h], r = n ? P("easing." + s, null, !0) : _.easing[s] || {}, o = u.length; --o > -1;) a = u[o], E[s + "." + a] = E[a + s] = r[a] = t.getRatio ? t : t[a] || new t
                };
                for ((u = k.prototype)._calcEnd = !1, u.getRatio = function (t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type, i = this._power,
                        n = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                    return 1 === i ? n *= n : 2 === i ? n *= n * n : 3 === i ? n *= n * n * n : 4 === i && (n *= n * n * n * n), 1 === e ? 1 - n : 2 === e ? n : t < .5 ? n / 2 : 1 - n / 2
                }, h = (l = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --h > -1;) u = l[h] + ",Power" + h, C(new k(null, null, 1, h), u, "easeOut", !0), C(new k(null, null, 2, h), u, "easeIn" + (0 === h ? ",easeNone" : "")), C(new k(null, null, 3, h), u, "easeInOut");
                E.linear = _.easing.Linear.easeIn, E.swing = _.easing.Quad.easeInOut;
                var A = P("events.EventDispatcher", function (t) {
                    this._listeners = {}, this._eventTarget = t || this
                });
                (u = A.prototype).addEventListener = function (t, e, i, n, r) {
                    r = r || 0;
                    var s, o, a = this._listeners[t], l = 0;
                    for (this !== c || f || c.wake(), null == a && (this._listeners[t] = a = []), o = a.length; --o > -1;) (s = a[o]).c === e && s.s === i ? a.splice(o, 1) : 0 === l && s.pr < r && (l = o + 1);
                    a.splice(l, 0, {c: e, s: i, up: n, pr: r})
                }, u.removeEventListener = function (t, e) {
                    var i, n = this._listeners[t];
                    if (n) for (i = n.length; --i > -1;) if (n[i].c === e) return void n.splice(i, 1)
                }, u.dispatchEvent = function (t) {
                    var e, i, n, r = this._listeners[t];
                    if (r) for ((e = r.length) > 1 && (r = r.slice(0)), i = this._eventTarget; --e > -1;) (n = r[e]) && (n.up ? n.c.call(n.s || i, {
                        type: t,
                        target: i
                    }) : n.c.call(n.s || i))
                };
                var O = i.requestAnimationFrame, D = i.cancelAnimationFrame, L = Date.now || function () {
                    return (new Date).getTime()
                }, M = L();
                for (h = (l = ["ms", "moz", "webkit", "o"]).length; --h > -1 && !O;) O = i[l[h] + "RequestAnimationFrame"], D = i[l[h] + "CancelAnimationFrame"] || i[l[h] + "CancelRequestAnimationFrame"];
                P("Ticker", function (t, e) {
                    var i, n, r, s, a, l = this, h = L(), u = !(!1 === e || !O) && "auto", d = 500, p = 33,
                        m = function (t) {
                            var e, o, u = L() - M;
                            u > d && (h += u - p), M += u, l.time = (M - h) / 1e3, e = l.time - a, (!i || e > 0 || !0 === t) && (l.frame++, a += e + (e >= s ? .004 : s - e), o = !0), !0 !== t && (r = n(m)), o && l.dispatchEvent("tick")
                        };
                    A.call(l), l.time = l.frame = 0, l.tick = function () {
                        m(!0)
                    }, l.lagSmoothing = function (t, e) {
                        if (!arguments.length) return d < 1e10;
                        d = t || 1e10, p = Math.min(e, d, 0)
                    }, l.sleep = function () {
                        null != r && (u && D ? D(r) : clearTimeout(r), n = y, r = null, l === c && (f = !1))
                    }, l.wake = function (t) {
                        null !== r ? l.sleep() : t ? h += -M + (M = L()) : l.frame > 10 && (M = L() - d + 5), n = 0 === i ? y : u && O ? O : function (t) {
                            return setTimeout(t, 1e3 * (a - l.time) + 1 | 0)
                        }, l === c && (f = !0), m(2)
                    }, l.fps = function (t) {
                        if (!arguments.length) return i;
                        s = 1 / ((i = t) || 60), a = this.time + s, l.wake()
                    }, l.useRAF = function (t) {
                        if (!arguments.length) return u;
                        l.sleep(), u = t, l.fps(i)
                    }, l.fps(t), setTimeout(function () {
                        "auto" === u && l.frame < 5 && "hidden" !== o.visibilityState && l.useRAF(!1)
                    }, 1500)
                }), (u = _.Ticker.prototype = new _.events.EventDispatcher).constructor = _.Ticker;
                var z = P("core.Animation", function (t, e) {
                    if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, J) {
                        f || c.wake();
                        var i = this.vars.useFrames ? K : J;
                        i.add(this, i._time), this.vars.paused && this.paused(!0)
                    }
                });
                c = z.ticker = new _.Ticker, (u = z.prototype)._dirty = u._gc = u._initted = u._paused = !1, u._totalTime = u._time = 0, u._rawPrevTime = -1, u._next = u._last = u._onUpdate = u._timeline = u.timeline = null, u._paused = !1;
                var R = function () {
                    f && L() - M > 2e3 && ("hidden" !== o.visibilityState || !c.lagSmoothing()) && c.wake();
                    var t = setTimeout(R, 2e3);
                    t.unref && t.unref()
                };
                R(), u.play = function (t, e) {
                    return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
                }, u.pause = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!0)
                }, u.resume = function (t, e) {
                    return null != t && this.seek(t, e), this.paused(!1)
                }, u.seek = function (t, e) {
                    return this.totalTime(Number(t), !1 !== e)
                }, u.restart = function (t, e) {
                    return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
                }, u.reverse = function (t, e) {
                    return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
                }, u.render = function (t, e, i) {
                }, u.invalidate = function () {
                    return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, !this._gc && this.timeline || this._enabled(!0), this
                }, u.isActive = function () {
                    var t, e = this._timeline, i = this._startTime;
                    return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime(!0)) >= i && t < i + this.totalDuration() / this._timeScale - 1e-7
                }, u._enabled = function (t, e) {
                    return f || c.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
                }, u._kill = function (t, e) {
                    return this._enabled(!1, !1)
                }, u.kill = function (t, e) {
                    return this._kill(t, e), this
                }, u._uncache = function (t) {
                    for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                    return this
                }, u._swapSelfInParams = function (t) {
                    for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this);
                    return i
                }, u._callback = function (t) {
                    var e = this.vars, i = e[t], n = e[t + "Params"], r = e[t + "Scope"] || e.callbackScope || this;
                    switch (n ? n.length : 0) {
                        case 0:
                            i.call(r);
                            break;
                        case 1:
                            i.call(r, n[0]);
                            break;
                        case 2:
                            i.call(r, n[0], n[1]);
                            break;
                        default:
                            i.apply(r, n)
                    }
                }, u.eventCallback = function (t, e, i, n) {
                    if ("on" === (t || "").substr(0, 2)) {
                        var r = this.vars;
                        if (1 === arguments.length) return r[t];
                        null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = b(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = n), "onUpdate" === t && (this._onUpdate = e)
                    }
                    return this
                }, u.delay = function (t) {
                    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
                }, u.duration = function (t) {
                    return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
                }, u.totalDuration = function (t) {
                    return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
                }, u.time = function (t, e) {
                    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
                }, u.totalTime = function (t, e, i) {
                    if (f || c.wake(), !arguments.length) return this._totalTime;
                    if (this._timeline) {
                        if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                            this._dirty && this.totalDuration();
                            var n = this._totalDuration, r = this._timeline;
                            if (t > n && !i && (t = n), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? n - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline) for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                        }
                        this._gc && this._enabled(!0, !1), this._totalTime === t && 0 !== this._duration || (j.length && et(), this.render(t, e, !1), j.length && et())
                    }
                    return this
                }, u.progress = u.totalProgress = function (t, e) {
                    var i = this.duration();
                    return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
                }, u.startTime = function (t) {
                    return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
                }, u.endTime = function (t) {
                    return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
                }, u.timeScale = function (t) {
                    if (!arguments.length) return this._timeScale;
                    var e, i;
                    for (t = t || g, this._timeline && this._timeline.smoothChildTiming && (i = (e = this._pauseTime) || 0 === e ? e : this._timeline.totalTime(), this._startTime = i - (i - this._startTime) * this._timeScale / t), this._timeScale = t, i = this.timeline; i && i.timeline;) i._dirty = !0, i.totalDuration(), i = i.timeline;
                    return this
                }, u.reversed = function (t) {
                    return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
                }, u.paused = function (t) {
                    if (!arguments.length) return this._paused;
                    var e, i, n = this._timeline;
                    return t != this._paused && n && (f || t || c.wake(), i = (e = n.rawTime()) - this._pauseTime, !t && n.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = n.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
                };
                var I = P("core.SimpleTimeline", function (t) {
                    z.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
                });
                (u = I.prototype = new z).constructor = I, u.kill()._gc = !1, u._first = u._last = u._recent = null, u._sortChildren = !1, u.add = u.insert = function (t, e, i, n) {
                    var r, s;
                    if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren) for (s = t._startTime; r && r._startTime > s;) r = r._prev;
                    return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
                }, u._remove = function (t, e) {
                    return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
                }, u.render = function (t, e, i) {
                    var n, r = this._first;
                    for (this._totalTime = this._time = this._rawPrevTime = t; r;) n = r._next, (r._active || t >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = n
                }, u.rawTime = function () {
                    return f || c.wake(), this._totalTime
                };
                var F = P("TweenLite", function (t, e, n) {
                    if (z.call(this, e, n), this.render = F.prototype.render, null == t) throw"Cannot tween a null target.";
                    this.target = t = "string" != typeof t ? t : F.selector(t) || t;
                    var r, s, o,
                        a = t.jquery || t.length && t !== i && t[0] && (t[0] === i || t[0].nodeType && t[0].style && !t.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Z[F.defaultOverwrite] : "number" == typeof l ? l >> 0 : Z[l], (a || t instanceof Array || t.push && b(t)) && "number" != typeof t[0]) for (this._targets = o = v(t), this._propLookup = [], this._siblings = [], r = 0; r < o.length; r++) (s = o[r]) ? "string" != typeof s ? s.length && s !== i && s[0] && (s[0] === i || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(r--, 1), this._targets = o = o.concat(v(s))) : (this._siblings[r] = it(s, this, !1), 1 === l && this._siblings[r].length > 1 && rt(s, this, null, 1, this._siblings[r])) : "string" == typeof (s = o[r--] = F.selector(s)) && o.splice(r + 1, 1) : o.splice(r--, 1); else this._propLookup = {}, this._siblings = it(t, this, !1), 1 === l && this._siblings.length > 1 && rt(t, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === e && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -g, this.render(Math.min(0, -this._delay)))
                }, !0), N = function (t) {
                    return t && t.length && t !== i && t[0] && (t[0] === i || t[0].nodeType && t[0].style && !t.nodeType)
                };
                (u = F.prototype = new z).constructor = F, u.kill()._gc = !1, u.ratio = 0, u._firstPT = u._targets = u._overwrittenProps = u._startAt = null, u._notifyPluginsOfEnabled = u._lazy = !1, F.version = "1.20.3", F.defaultEase = u._ease = new k(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = c, F.autoSleep = 120, F.lagSmoothing = function (t, e) {
                    c.lagSmoothing(t, e)
                }, F.selector = i.$ || i.jQuery || function (t) {
                    var e = i.$ || i.jQuery;
                    return e ? (F.selector = e, e(t)) : void 0 === o ? t : o.querySelectorAll ? o.querySelectorAll(t) : o.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
                };
                var j = [], B = {}, W = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, X = /[\+-]=-?[\.\d]/,
                    Y = function (t) {
                        for (var e, i = this._firstPT; i;) e = i.blob ? 1 === t && null != this.end ? this.end : t ? this.join("") : this.start : i.c * t + i.s, i.m ? e = i.m(e, this._target || i.t) : e < 1e-6 && e > -1e-6 && !i.blob && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                    }, q = function (t, e, i, n) {
                        var r, s, o, a, l, h, u, c = [], f = 0, d = "", p = 0;
                        for (c.start = t, c.end = e, t = c[0] = t + "", e = c[1] = e + "", i && (i(c), t = c[0], e = c[1]), c.length = 0, r = t.match(W) || [], s = e.match(W) || [], n && (n._next = null, n.blob = 1, c._firstPT = c._applyPT = n), l = s.length, a = 0; a < l; a++) u = s[a], d += (h = e.substr(f, e.indexOf(u, f) - f)) || !a ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), u === r[a] || r.length <= a ? d += u : (d && (c.push(d), d = ""), o = parseFloat(r[a]), c.push(o), c._firstPT = {
                            _next: c._firstPT,
                            t: c,
                            p: c.length - 1,
                            s: o,
                            c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - o) || 0,
                            f: 0,
                            m: p && p < 4 ? Math.round : 0
                        }), f += u.length;
                        return (d += e.substr(f)) && c.push(d), c.setRatio = Y, X.test(e) && (c.end = null), c
                    }, U = function (t, e, i, n, r, s, o, a, l) {
                        "function" == typeof n && (n = n(l || 0, t));
                        var h = typeof t[e],
                            u = "function" !== h ? "" : e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3),
                            c = "get" !== i ? i : u ? o ? t[u](o) : t[u]() : t[e],
                            f = "string" == typeof n && "=" === n.charAt(1), d = {
                                t: t,
                                p: e,
                                s: c,
                                f: "function" === h,
                                pg: 0,
                                n: r || e,
                                m: s ? "function" == typeof s ? s : Math.round : 0,
                                pr: 0,
                                c: f ? parseInt(n.charAt(0) + "1", 10) * parseFloat(n.substr(2)) : parseFloat(n) - c || 0
                            };
                        if (("number" != typeof c || "number" != typeof n && !f) && (o || isNaN(c) || !f && isNaN(n) || "boolean" == typeof c || "boolean" == typeof n ? (d.fp = o, d = {
                            t: q(c, f ? parseFloat(d.s) + d.c : n, a || F.defaultStringFilter, d),
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 2,
                            pg: 0,
                            n: r || e,
                            pr: 0,
                            m: 0
                        }) : (d.s = parseFloat(c), f || (d.c = parseFloat(n) - d.s || 0))), d.c) return (d._next = this._firstPT) && (d._next._prev = d), this._firstPT = d, d
                    }, H = F._internals = {isArray: b, isSelector: N, lazyTweens: j, blobDif: q}, V = F._plugins = {},
                    G = H.tweenLookup = {}, $ = 0, Q = H.reservedProps = {
                        ease: 1,
                        delay: 1,
                        overwrite: 1,
                        onComplete: 1,
                        onCompleteParams: 1,
                        onCompleteScope: 1,
                        useFrames: 1,
                        runBackwards: 1,
                        startAt: 1,
                        onUpdate: 1,
                        onUpdateParams: 1,
                        onUpdateScope: 1,
                        onStart: 1,
                        onStartParams: 1,
                        onStartScope: 1,
                        onReverseComplete: 1,
                        onReverseCompleteParams: 1,
                        onReverseCompleteScope: 1,
                        onRepeat: 1,
                        onRepeatParams: 1,
                        onRepeatScope: 1,
                        easeParams: 1,
                        yoyo: 1,
                        immediateRender: 1,
                        repeat: 1,
                        repeatDelay: 1,
                        data: 1,
                        paused: 1,
                        reversed: 1,
                        autoCSS: 1,
                        lazy: 1,
                        onOverwrite: 1,
                        callbackScope: 1,
                        stringFilter: 1,
                        id: 1,
                        yoyoEase: 1
                    }, Z = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0},
                    K = z._rootFramesTimeline = new I, J = z._rootTimeline = new I, tt = 30,
                    et = H.lazyRender = function () {
                        var t, e = j.length;
                        for (B = {}; --e > -1;) (t = j[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                        j.length = 0
                    };
                J._startTime = c.time, K._startTime = c.frame, J._active = K._active = !0, setTimeout(et, 1), z._updateRoot = F.render = function () {
                    var t, e, i;
                    if (j.length && et(), J.render((c.time - J._startTime) * J._timeScale, !1, !1), K.render((c.frame - K._startTime) * K._timeScale, !1, !1), j.length && et(), c.frame >= tt) {
                        tt = c.frame + (parseInt(F.autoSleep, 10) || 120);
                        for (i in G) {
                            for (t = (e = G[i].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                            0 === e.length && delete G[i]
                        }
                        if ((!(i = J._first) || i._paused) && F.autoSleep && !K._first && 1 === c._listeners.tick.length) {
                            for (; i && i._paused;) i = i._next;
                            i || c.sleep()
                        }
                    }
                }, c.addEventListener("tick", z._updateRoot);
                var it = function (t, e, i) {
                    var n, r, s = t._gsTweenID;
                    if (G[s || (t._gsTweenID = s = "t" + $++)] || (G[s] = {
                        target: t,
                        tweens: []
                    }), e && ((n = G[s].tweens)[r = n.length] = e, i)) for (; --r > -1;) n[r] === e && n.splice(r, 1);
                    return G[s].tweens
                }, nt = function (t, e, i, n) {
                    var r, s, o = t.vars.onOverwrite;
                    return o && (r = o(t, e, i, n)), (o = F.onOverwrite) && (s = o(t, e, i, n)), !1 !== r && !1 !== s
                }, rt = function (t, e, i, n, r) {
                    var s, o, a, l;
                    if (1 === n || n >= 4) {
                        for (l = r.length, s = 0; s < l; s++) if ((a = r[s]) !== e) a._gc || a._kill(null, t, e) && (o = !0); else if (5 === n) break;
                        return o
                    }
                    var h, u = e._startTime + g, c = [], f = 0, d = 0 === e._duration;
                    for (s = r.length; --s > -1;) (a = r[s]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || st(e, 0, d), 0 === st(a, h, d) && (c[f++] = a)) : a._startTime <= u && a._startTime + a.totalDuration() / a._timeScale > u && ((d || !a._initted) && u - a._startTime <= 2e-10 || (c[f++] = a)));
                    for (s = f; --s > -1;) if (a = c[s], 2 === n && a._kill(i, t, e) && (o = !0), 2 !== n || !a._firstPT && a._initted) {
                        if (2 !== n && !nt(a, e)) continue;
                        a._enabled(!1, !1) && (o = !0)
                    }
                    return o
                }, st = function (t, e, i) {
                    for (var n = t._timeline, r = n._timeScale, s = t._startTime; n._timeline;) {
                        if (s += n._startTime, r *= n._timeScale, n._paused) return -100;
                        n = n._timeline
                    }
                    return (s /= r) > e ? s - e : i && s === e || !t._initted && s - e < 2 * g ? g : (s += t.totalDuration() / t._timeScale / r) > e + g ? 0 : s - e - g
                };
                u._init = function () {
                    var t, e, i, n, r, s, o = this.vars, a = this._overwrittenProps, l = this._duration,
                        h = !!o.immediateRender, u = o.ease;
                    if (o.startAt) {
                        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {};
                        for (n in o.startAt) r[n] = o.startAt[n];
                        if (r.data = "isStart", r.overwrite = !1, r.immediateRender = !0, r.lazy = h && !1 !== o.lazy, r.startAt = r.delay = null, r.onUpdate = o.onUpdate, r.onUpdateParams = o.onUpdateParams, r.onUpdateScope = o.onUpdateScope || o.callbackScope || this, this._startAt = F.to(this.target, 0, r), h) if (this._time > 0) this._startAt = null; else if (0 !== l) return
                    } else if (o.runBackwards && 0 !== l) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                        0 !== this._time && (h = !1), i = {};
                        for (n in o) Q[n] && "autoCSS" !== n || (i[n] = o[n]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = h && !1 !== o.lazy, i.immediateRender = h, this._startAt = F.to(this.target, 0, i), h) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                    if (this._ease = u = u ? u instanceof k ? u : "function" == typeof u ? new k(u, o.easeParams) : E[u] || F.defaultEase : F.defaultEase, o.easeParams instanceof Array && u.config && (this._ease = u.config.apply(u, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (s = this._targets.length, t = 0; t < s; t++) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null, t) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, a, 0);
                    if (e && F._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards) for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                    this._onUpdate = o.onUpdate, this._initted = !0
                }, u._initProps = function (t, e, n, r, s) {
                    var o, a, l, h, u, c;
                    if (null == t) return !1;
                    B[t._gsTweenID] && et(), this.vars.css || t.style && t !== i && t.nodeType && V.css && !1 !== this.vars.autoCSS && function (t, e) {
                        var i, n = {};
                        for (i in t) Q[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!V[i] || V[i] && V[i]._autoCSS) || (n[i] = t[i], delete t[i]);
                        t.css = n
                    }(this.vars, t);
                    for (o in this.vars) if (c = this.vars[o], Q[o]) c && (c instanceof Array || c.push && b(c)) && -1 !== c.join("").indexOf("{self}") && (this.vars[o] = c = this._swapSelfInParams(c, this)); else if (V[o] && (h = new V[o])._onInitTween(t, this.vars[o], this, s)) {
                        for (this._firstPT = u = {
                            _next: this._firstPT,
                            t: h,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: o,
                            pg: 1,
                            pr: h._priority,
                            m: 0
                        }, a = h._overwriteProps.length; --a > -1;) e[h._overwriteProps[a]] = this._firstPT;
                        (h._priority || h._onInitAllProps) && (l = !0), (h._onDisable || h._onEnable) && (this._notifyPluginsOfEnabled = !0), u._next && (u._next._prev = u)
                    } else e[o] = U.call(this, t, o, "get", c, o, 0, null, this.vars.stringFilter, s);
                    return r && this._kill(r, t) ? this._initProps(t, e, n, r, s) : this._overwrite > 1 && this._firstPT && n.length > 1 && rt(t, this, e, this._overwrite, n) ? (this._kill(e, t), this._initProps(t, e, n, r, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (B[t._gsTweenID] = !0), l)
                }, u.render = function (t, e, i) {
                    var n, r, s, o, a = this._time, l = this._duration, h = this._rawPrevTime;
                    if (t >= l - 1e-7 && t >= 0) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (n = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && t >= -1e-7 || h === g && "isPause" !== this.data) && h !== t && (i = !0, h > g && (r = "onReverseComplete")), this._rawPrevTime = o = !e || t || h === t ? t : g); else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (r = "onReverseComplete", n = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (h !== g || "isPause" !== this.data) && (i = !0), this._rawPrevTime = o = !e || t || h === t ? t : g)), (!this._initted || this._startAt && this._startAt.progress()) && (i = !0); else if (this._totalTime = this._time = t, this._easeType) {
                        var u = t / l, c = this._easeType, f = this._easePower;
                        (1 === c || 3 === c && u >= .5) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : t / l < .5 ? u / 2 : 1 - u / 2
                    } else this.ratio = this._ease.getRatio(t / l);
                    if (this._time !== a || i) {
                        if (!this._initted) {
                            if (this._init(), !this._initted || this._gc) return;
                            if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, j.push(this), void (this._lazy = [t, e]);
                            this._time && !n ? this.ratio = this._ease.getRatio(this._time / l) : n && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                        }
                        for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, !0, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 === this._time && 0 !== l || e || this._callback("onStart"))), s = this._firstPT; s;) s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                        this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, !0, i), e || (this._time !== a || n || i) && this._callback("onUpdate")), r && (this._gc && !i || (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, !0, i), n && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === g && o !== g && (this._rawPrevTime = 0)))
                    }
                }, u._kill = function (t, e, i) {
                    if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                    e = "string" != typeof e ? e || this._targets || this.target : F.selector(e) || e;
                    var n, r, s, o, a, l, h, u, c,
                        f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                    if ((b(e) || N(e)) && "number" != typeof e[0]) for (n = e.length; --n > -1;) this._kill(t, e[n], i) && (l = !0); else {
                        if (this._targets) {
                            for (n = this._targets.length; --n > -1;) if (e === this._targets[n]) {
                                a = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = t ? this._overwrittenProps[n] || {} : "all";
                                break
                            }
                        } else {
                            if (e !== this.target) return !1;
                            a = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                        }
                        if (a) {
                            if (h = t || a, u = t !== r && "all" !== r && t !== a && ("object" != typeof t || !t._tempKill), i && (F.onOverwrite || this.vars.onOverwrite)) {
                                for (s in h) a[s] && (c || (c = []), c.push(s));
                                if ((c || !t) && !nt(this, i, e, c)) return !1
                            }
                            for (s in h) (o = a[s]) && (f && (o.f ? o.t[o.p](o.s) : o.t[o.p] = o.s, l = !0), o.pg && o.t._kill(h) && (l = !0), o.pg && 0 !== o.t._overwriteProps.length || (o._prev ? o._prev._next = o._next : o === this._firstPT && (this._firstPT = o._next), o._next && (o._next._prev = o._prev), o._next = o._prev = null), delete a[s]), u && (r[s] = 1);
                            !this._firstPT && this._initted && this._enabled(!1, !1)
                        }
                    }
                    return l
                }, u.invalidate = function () {
                    return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], z.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -g, this.render(Math.min(0, -this._delay))), this
                }, u._enabled = function (t, e) {
                    if (f || c.wake(), t && this._gc) {
                        var i, n = this._targets;
                        if (n) for (i = n.length; --i > -1;) this._siblings[i] = it(n[i], this, !0); else this._siblings = it(this.target, this, !0)
                    }
                    return z.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && F._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
                }, F.to = function (t, e, i) {
                    return new F(t, e, i)
                }, F.from = function (t, e, i) {
                    return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new F(t, e, i)
                }, F.fromTo = function (t, e, i, n) {
                    return n.startAt = i, n.immediateRender = 0 != n.immediateRender && 0 != i.immediateRender, new F(t, e, n)
                }, F.delayedCall = function (t, e, i, n, r) {
                    return new F(e, 0, {
                        delay: t,
                        onComplete: e,
                        onCompleteParams: i,
                        callbackScope: n,
                        onReverseComplete: e,
                        onReverseCompleteParams: i,
                        immediateRender: !1,
                        lazy: !1,
                        useFrames: r,
                        overwrite: 0
                    })
                }, F.set = function (t, e) {
                    return new F(t, 0, e)
                }, F.getTweensOf = function (t, e) {
                    if (null == t) return [];
                    var i, n, r, s;
                    if (t = "string" != typeof t ? t : F.selector(t) || t, (b(t) || N(t)) && "number" != typeof t[0]) {
                        for (i = t.length, n = []; --i > -1;) n = n.concat(F.getTweensOf(t[i], e));
                        for (i = n.length; --i > -1;) for (s = n[i], r = i; --r > -1;) s === n[r] && n.splice(i, 1)
                    } else if (t._gsTweenID) for (i = (n = it(t).concat()).length; --i > -1;) (n[i]._gc || e && !n[i].isActive()) && n.splice(i, 1);
                    return n || []
                }, F.killTweensOf = F.killDelayedCallsTo = function (t, e, i) {
                    "object" == typeof e && (i = e, e = !1);
                    for (var n = F.getTweensOf(t, e), r = n.length; --r > -1;) n[r]._kill(i, t)
                };
                var ot = P("plugins.TweenPlugin", function (t, e) {
                    this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = ot.prototype
                }, !0);
                if (u = ot.prototype, ot.version = "1.19.0", ot.API = 2, u._firstPT = null, u._addTween = U, u.setRatio = Y, u._kill = function (t) {
                    var e, i = this._overwriteProps, n = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = []; else for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; n;) null != t[n.n] && (n._next && (n._next._prev = n._prev), n._prev ? (n._prev._next = n._next, n._prev = null) : this._firstPT === n && (this._firstPT = n._next)), n = n._next;
                    return !1
                }, u._mod = u._roundProps = function (t) {
                    for (var e, i = this._firstPT; i;) (e = t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && "function" == typeof e && (2 === i.f ? i.t._applyPT.m = e : i.m = e), i = i._next
                }, F._onPluginEvent = function (t, e) {
                    var i, n, r, s, o, a = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; a;) {
                            for (o = a._next, n = r; n && n.pr > a.pr;) n = n._next;
                            (a._prev = n ? n._prev : s) ? a._prev._next = a : r = a, (a._next = n) ? n._prev = a : s = a, a = o
                        }
                        a = e._firstPT = r
                    }
                    for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (i = !0), a = a._next;
                    return i
                }, ot.activate = function (t) {
                    for (var e = t.length; --e > -1;) t[e].API === ot.API && (V[(new t[e])._propName] = t[e]);
                    return !0
                }, x.plugin = function (t) {
                    if (!(t && t.propName && t.init && t.API)) throw"illegal plugin definition.";
                    var e, i = t.propName, n = t.priority || 0, r = t.overwriteProps, s = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_mod",
                        mod: "_mod",
                        initAll: "_onInitAllProps"
                    }, o = P("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                        ot.call(this, i, n), this._overwriteProps = r || []
                    }, !0 === t.global), a = o.prototype = new ot(i);
                    a.constructor = o, o.API = t.API;
                    for (e in s) "function" == typeof t[e] && (a[s[e]] = t[e]);
                    return o.version = t.version, ot.activate([o]), o
                }, l = i._gsQueue) {
                    for (h = 0; h < l.length; h++) l[h]();
                    for (u in w) w[u].func || i.console.log("GSAP encountered missing dependency: " + u)
                }
                f = !1
            }
        }(void 0 !== t && t.exports && void 0 !== i ? i : this || window, "TweenLite")
    }).call(e, i(3))
}, function (t, e, i) {
    "use strict";
    i(14), i(15), i(5);
    var n = h(i(16)), r = i(17), s = i(7), o = function (t) {
        if (t && t.__esModule) return t;
        var e = {};
        if (null != t) for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e.default = t, e
    }(i(8)), a = h(i(10)), l = i(11);

    function h(t) {
        return t && t.__esModule ? t : {default: t}
    }

    i(48)("ios-gap");
    n.default.attach(document.body), (0, r.lazyLoadPages)(), o.globalBinds(), (0, s.controller)(), (0, a.default)(), (0, l.bindWheel)()
}, function (t, e, i) {
    var n, r, s;
    n = window, s = function (t) {
        r(n.lazySizes, t), n.removeEventListener("lazyunveilread", s, !0)
    }, r = (r = function (t, e, i, n) {
        "use strict";
        var r = e.createElement("a").style, s = "objectFit" in r, o = /object-fit["']*\s*:\s*["']*(contain|cover)/,
            a = /object-position["']*\s*:\s*["']*(.+?)(?=($|,|'|"|;))/,
            l = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", h = /\(|\)|'/,
            u = {center: "center", "50% 50%": "center"};
        if (!s || !(s && "objectPosition" in r)) {
            var c = function (t) {
                if (t.detail.instance == i) {
                    var e, n, r, c, f, d, p, m, _, g, v, y, b = t.target,
                        w = (e = (getComputedStyle(b, null) || {}).fontFamily || "", n = e.match(o) || "", (r = n && e.match(a) || "") && (r = r[1]), {
                            fit: n && n[1] || "",
                            position: u[r] || r || "center"
                        });
                    !w.fit || s && "center" == w.position || (c = b, f = w, m = i.cfg, _ = c.cloneNode(!1), g = _.style, v = function () {
                        var t = c.currentSrc || c.src;
                        t && p !== t && (p = t, g.backgroundImage = "url(" + (h.test(t) ? JSON.stringify(t) : t) + ")", d || (d = !0, i.rC(_, m.loadingClass), i.aC(_, m.loadedClass)))
                    }, y = function () {
                        i.rAF(v)
                    }, c._lazysizesParentFit = f.fit, c.addEventListener("lazyloaded", y, !0), c.addEventListener("load", y, !0), _.addEventListener("load", function () {
                        var t = _.currentSrc || _.src;
                        t && t != l && (_.src = l, _.srcset = "")
                    }), i.rAF(function () {
                        var t = c, e = c.parentNode;
                        "PICTURE" == e.nodeName.toUpperCase() && (t = e, e = e.parentNode), i.rC(_, m.loadedClass), i.rC(_, m.lazyClass), i.aC(_, m.loadingClass), i.aC(_, m.objectFitClass || "lazysizes-display-clone"), _.getAttribute(m.srcsetAttr) && _.setAttribute(m.srcsetAttr, ""), _.getAttribute(m.srcAttr) && _.setAttribute(m.srcAttr, ""), _.src = l, _.srcset = "", g.backgroundRepeat = "no-repeat", g.backgroundPosition = f.position, g.backgroundSize = f.fit, t.style.display = "none", c.setAttribute("data-parent-fit", f.fit), c.setAttribute("data-parent-container", "prev"), e.insertBefore(_, t), c._lazysizesParentFit && delete c._lazysizesParentFit, c.complete && v()
                    }))
                }
            };
            t.addEventListener("lazyunveilread", c, !0), n && n.detail && c(n)
        }
    }).bind(null, n, n.document), "object" == typeof t && t.exports ? r(i(5)) : n.lazySizes ? s() : n.addEventListener("lazyunveilread", s, !0)
}, function (t, e, i) {
    var n, r, s;
    n = window, s = function () {
        r(n.lazySizes), n.removeEventListener("lazyunveilread", s, !0)
    }, r = (r = function (t, e, i) {
        "use strict";
        if (t.addEventListener) {
            var n = /\s+(\d+)(w|h)\s+(\d+)(w|h)/, r = /parent-fit["']*\s*:\s*["']*(contain|cover|width)/,
                s = /parent-container["']*\s*:\s*["']*(.+?)(?=(\s|$|,|'|"|;))/, o = /^picture$/i, a = {
                    getParent: function (e, i) {
                        var n = e, r = e.parentNode;
                        return i && "prev" != i || !r || !o.test(r.nodeName || "") || (r = r.parentNode), "self" != i && (n = "prev" == i ? e.previousElementSibling : i && (r.closest || t.jQuery) && (r.closest ? r.closest(i) : jQuery(r).closest(i)[0]) || r), n
                    }, getFit: function (t) {
                        var e, i, n = getComputedStyle(t, null) || {}, o = n.content || n.fontFamily,
                            l = {fit: t._lazysizesParentFit || t.getAttribute("data-parent-fit")};
                        return !l.fit && o && (e = o.match(r)) && (l.fit = e[1]), l.fit ? (!(i = t._lazysizesParentContainer || t.getAttribute("data-parent-container")) && o && (e = o.match(s)) && (i = e[1]), l.parent = a.getParent(t, i)) : l.fit = n.objectFit, l
                    }, getImageRatio: function (e) {
                        var i, r, s, a, l = e.parentNode,
                            h = l && o.test(l.nodeName || "") ? l.querySelectorAll("source, img") : [e];
                        for (i = 0; i < h.length; i++) if (r = (e = h[i]).getAttribute(lazySizesConfig.srcsetAttr) || e.getAttribute("srcset") || e.getAttribute("data-pfsrcset") || e.getAttribute("data-risrcset") || "", s = e._lsMedia || e.getAttribute("media"), s = lazySizesConfig.customMedia[e.getAttribute("data-media") || s] || s, r && (!s || (t.matchMedia && matchMedia(s) || {}).matches)) {
                            !(a = parseFloat(e.getAttribute("data-aspectratio"))) && r.match(n) && (a = "w" == RegExp.$2 ? RegExp.$1 / RegExp.$3 : RegExp.$3 / RegExp.$1);
                            break
                        }
                        return a
                    }, calculateSize: function (t, e) {
                        var i, n, r, s, o = this.getFit(t), a = o.fit, l = o.parent;
                        return "width" == a || ("contain" == a || "cover" == a) && (r = this.getImageRatio(t)) ? (l ? e = l.clientWidth : l = t, s = e, "width" == a ? s = e : (n = l.clientHeight) > 40 && (i = e / n) && ("cover" == a && i < r || "contain" == a && i > r) && (s = e * (r / i)), s) : e
                    }
                };
            i.parentFit = a, e.addEventListener("lazybeforesizes", function (t) {
                if (!t.defaultPrevented && t.detail.instance == i) {
                    var e = t.target;
                    t.detail.width = a.calculateSize(e, t.detail.width)
                }
            })
        }
    }).bind(null, n, n.document), "object" == typeof t && t.exports ? r(i(5)) : n.lazySizes ? s() : n.addEventListener("lazyunveilread", s, !0)
}, function (t, e, i) {
    var n;
    !function () {
        "use strict";

        function r(t, e) {
            var i;
            if (e = e || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = e.touchBoundary || 10, this.layer = t, this.tapDelay = e.tapDelay || 200, this.tapTimeout = e.tapTimeout || 700, !r.notNeeded(t)) {
                for (var n = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], s = 0, a = n.length; s < a; s++) this[n[s]] = l(this[n[s]], this);
                o && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function (e, i, n) {
                    var r = Node.prototype.removeEventListener;
                    "click" === e ? r.call(t, e, i.hijacked || i, n) : r.call(t, e, i, n)
                }, t.addEventListener = function (e, i, n) {
                    var r = Node.prototype.addEventListener;
                    "click" === e ? r.call(t, e, i.hijacked || (i.hijacked = function (t) {
                        t.propagationStopped || i(t)
                    }), n) : r.call(t, e, i, n)
                }), "function" == typeof t.onclick && (i = t.onclick, t.addEventListener("click", function (t) {
                    i(t)
                }, !1), t.onclick = null)
            }

            function l(t, e) {
                return function () {
                    return t.apply(e, arguments)
                }
            }
        }

        var s = navigator.userAgent.indexOf("Windows Phone") >= 0, o = navigator.userAgent.indexOf("Android") > 0 && !s,
            a = /iP(ad|hone|od)/.test(navigator.userAgent) && !s, l = a && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            h = a && /OS [6-7]_\d/.test(navigator.userAgent), u = navigator.userAgent.indexOf("BB10") > 0;
        r.prototype.needsClick = function (t) {
            switch (t.nodeName.toLowerCase()) {
                case"button":
                case"select":
                case"textarea":
                    if (t.disabled) return !0;
                    break;
                case"input":
                    if (a && "file" === t.type || t.disabled) return !0;
                    break;
                case"label":
                case"iframe":
                case"video":
                    return !0
            }
            return /\bneedsclick\b/.test(t.className)
        }, r.prototype.needsFocus = function (t) {
            switch (t.nodeName.toLowerCase()) {
                case"textarea":
                    return !0;
                case"select":
                    return !o;
                case"input":
                    switch (t.type) {
                        case"button":
                        case"checkbox":
                        case"file":
                        case"image":
                        case"radio":
                        case"submit":
                            return !1
                    }
                    return !t.disabled && !t.readOnly;
                default:
                    return /\bneedsfocus\b/.test(t.className)
            }
        }, r.prototype.sendClick = function (t, e) {
            var i, n;
            document.activeElement && document.activeElement !== t && document.activeElement.blur(), n = e.changedTouches[0], (i = document.createEvent("MouseEvents")).initMouseEvent(this.determineEventType(t), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, t.dispatchEvent(i)
        }, r.prototype.determineEventType = function (t) {
            return o && "select" === t.tagName.toLowerCase() ? "mousedown" : "click"
        }, r.prototype.focus = function (t) {
            var e;
            a && t.setSelectionRange && 0 !== t.type.indexOf("date") && "time" !== t.type && "month" !== t.type ? (e = t.value.length, t.setSelectionRange(e, e)) : t.focus()
        }, r.prototype.updateScrollParent = function (t) {
            var e, i;
            if (!(e = t.fastClickScrollParent) || !e.contains(t)) {
                i = t;
                do {
                    if (i.scrollHeight > i.offsetHeight) {
                        e = i, t.fastClickScrollParent = i;
                        break
                    }
                    i = i.parentElement
                } while (i)
            }
            e && (e.fastClickLastScrollTop = e.scrollTop)
        }, r.prototype.getTargetElementFromEventTarget = function (t) {
            return t.nodeType === Node.TEXT_NODE ? t.parentNode : t
        }, r.prototype.onTouchStart = function (t) {
            var e, i, n;
            if (t.targetTouches.length > 1) return !0;
            if (e = this.getTargetElementFromEventTarget(t.target), i = t.targetTouches[0], a) {
                if ((n = window.getSelection()).rangeCount && !n.isCollapsed) return !0;
                if (!l) {
                    if (i.identifier && i.identifier === this.lastTouchIdentifier) return t.preventDefault(), !1;
                    this.lastTouchIdentifier = i.identifier, this.updateScrollParent(e)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = t.timeStamp, this.targetElement = e, this.touchStartX = i.pageX, this.touchStartY = i.pageY, t.timeStamp - this.lastClickTime < this.tapDelay && t.preventDefault(), !0
        }, r.prototype.touchHasMoved = function (t) {
            var e = t.changedTouches[0], i = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > i || Math.abs(e.pageY - this.touchStartY) > i
        }, r.prototype.onTouchMove = function (t) {
            return !this.trackingClick || ((this.targetElement !== this.getTargetElementFromEventTarget(t.target) || this.touchHasMoved(t)) && (this.trackingClick = !1, this.targetElement = null), !0)
        }, r.prototype.findControl = function (t) {
            return void 0 !== t.control ? t.control : t.htmlFor ? document.getElementById(t.htmlFor) : t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, r.prototype.onTouchEnd = function (t) {
            var e, i, n, r, s, u = this.targetElement;
            if (!this.trackingClick) return !0;
            if (t.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (t.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = t.timeStamp, i = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, h && (s = t.changedTouches[0], (u = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset) || u).fastClickScrollParent = this.targetElement.fastClickScrollParent), "label" === (n = u.tagName.toLowerCase())) {
                if (e = this.findControl(u)) {
                    if (this.focus(u), o) return !1;
                    u = e
                }
            } else if (this.needsFocus(u)) return t.timeStamp - i > 100 || a && window.top !== window && "input" === n ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, t), a && "select" === n || (this.targetElement = null, t.preventDefault()), !1);
            return !(!a || l || !(r = u.fastClickScrollParent) || r.fastClickLastScrollTop === r.scrollTop) || (this.needsClick(u) || (t.preventDefault(), this.sendClick(u, t)), !1)
        }, r.prototype.onTouchCancel = function () {
            this.trackingClick = !1, this.targetElement = null
        }, r.prototype.onMouse = function (t) {
            return !this.targetElement || (!!t.forwardedTouchEvent || (!t.cancelable || (!(!this.needsClick(this.targetElement) || this.cancelNextClick) || (t.stopImmediatePropagation ? t.stopImmediatePropagation() : t.propagationStopped = !0, t.stopPropagation(), t.preventDefault(), !1))))
        }, r.prototype.onClick = function (t) {
            var e;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === t.target.type && 0 === t.detail || ((e = this.onMouse(t)) || (this.targetElement = null), e)
        }, r.prototype.destroy = function () {
            var t = this.layer;
            o && (t.removeEventListener("mouseover", this.onMouse, !0), t.removeEventListener("mousedown", this.onMouse, !0), t.removeEventListener("mouseup", this.onMouse, !0)), t.removeEventListener("click", this.onClick, !0), t.removeEventListener("touchstart", this.onTouchStart, !1), t.removeEventListener("touchmove", this.onTouchMove, !1), t.removeEventListener("touchend", this.onTouchEnd, !1), t.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, r.notNeeded = function (t) {
            var e, i, n;
            if (void 0 === window.ontouchstart) return !0;
            if (i = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!o) return !0;
                if (e = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                    if (i > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (u && (n = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/))[1] >= 10 && n[2] >= 3 && (e = document.querySelector("meta[name=viewport]"))) {
                if (-1 !== e.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === t.style.msTouchAction || "manipulation" === t.style.touchAction || (!!(+(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1] >= 27 && (e = document.querySelector("meta[name=viewport]")) && (-1 !== e.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) || ("none" === t.style.touchAction || "manipulation" === t.style.touchAction))
        }, r.attach = function (t, e) {
            return new r(t, e)
        }, void 0 === (n = function () {
            return r
        }.call(e, i, e, t)) || (t.exports = n)
    }()
}, function (t, e, i) {
    //懒加载获取新闻数据
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}),
        e.lazyLoadPages = function () {
            document.addEventListener("lazybeforeunveil", function (t) {
                var e, i, r, s = t.target.getAttribute("data-lazyload-page");
                // s:data-lazyload-page  下一页的请求链接
                return
                s && (e = t.target, i = s, r = new XMLHttpRequest, e.classList.add("is-loading"),
                    // console.log('+++++++++++++++++'),
                    // console.log("e:",e),         //加载图标块
                    // console.log("i:",i),         //下个页面接口请求连接  https://www.benoy.com/news/p2/
                    // console.log("r:",r),         //ajax请求实例对象
                    // console.log("s:",s),         //https://www.benoy.com/news/p2/
                    // console.log("t:",t),         //loading 事件（不确定是啥）
                    r.open("GET", i),    //参数1：请求方式    参数2：请求地址
                    r.responseType = "document",
                    r.onload = function () {
                        200 === r.status && (function (t) {
                            for (
                                var e = document.querySelector("[data-lazyload-container]"),  //新闻列表展示主体
                                    i = t.querySelector("[data-lazyload-container]").children,
                                    r = [],
                                    s = (t.querySelector("[data-lazyload-page]"), 0);
                                s < i.length; s++) {
                                var o = i[s].cloneNode(!0), a = null;
                                e.appendChild(o);
                                for (var l = (a = o.querySelectorAll("a")).length - 1; l >= 0; l--) r.push(a[l])
                            }
                            loader.classList.remove("is-loading"), (0, n.bindHistoryLinks)(r)
                        }(this.responseXML), e.remove())
                    },
                    r.send())
            })
        };
    var n = i(10)
}, function (t, e, i) {
    var n = function (t, e) {
        var i = "onwheel" in e ? "wheel" : "mousewheel", n = {
            callback: function () {
            }, elem: e, preventMouse: !0
        };

        function r(e) {
            this._options = a(n, e), this._deltaArray = [0, 0, 0], this._isAcceleration = !1, this._isStopped = !0, this._direction = "", this._timer = "", this._isWorking = !0;
            var r, l, h, u = this;
            this._wheelHandler = function (e) {
                var i;
                u._isWorking && (function (t) {
                    var e = this, i = o(t);
                    if (0 === i) return;
                    var n, r = i > 0 ? "down" : "up", a = e._deltaArray.length, l = !1, h = 0;
                    for (clearTimeout(e._timer), e._timer = setTimeout(function () {
                        e._deltaArray = [0, 0, 0], e._isStopped = !0, e._direction = r
                    }, 150), n = 0; n < a; n++) 0 !== e._deltaArray[n] && (e._deltaArray[n] > 0 ? ++h : --h);
                    Math.abs(h) === a && (h > 0 ? "down" : "up") !== e._direction && (l = !0, e._direction = r);
                    e._isStopped || (l ? (e._isAcceleration = !0, s.call(this, t)) : Math.abs(h) === a && function (t) {
                        var e = Math.abs(this._deltaArray[0]), i = Math.abs(this._deltaArray[1]),
                            n = Math.abs(this._deltaArray[2]), r = Math.abs(o(t));
                        r > n && n > i && i > e && (this._isAcceleration || (s.call(this, t), this._isAcceleration = !0));
                        r < n && n <= i && (this._isAcceleration = !1)
                    }.call(this, t));
                    e._isStopped && (e._isStopped = !1, e._isAcceleration = !0, e._direction = r, s.call(this, t));
                    e._deltaArray.shift(), e._deltaArray.push(i)
                }.call(u, e), u._options.preventMouse && ((i = (i = e) || t.event).preventDefault ? i.preventDefault() : i.returnValue = !1))
            }, r = this._options.elem, l = i, h = this._wheelHandler, r.addEventListener ? r.addEventListener(l, h, !1) : r.attachEvent && r.attachEvent("on" + l, h)
        }

        function s(t) {
            t.direction = this._direction, this._options.callback.call(this, t)
        }

        r.prototype = {
            constructor: r, turnOn: function () {
                return this._isWorking = !0, this
            }, turnOff: function () {
                return this._isWorking = !1, this
            }, setOptions: function (t) {
                return this._options = a(this._options, t), this
            }, getOption: function (t) {
                var e = this._options[t];
                if (void 0 !== e) return e;
                throw new Error("Unknown option")
            }, destroy: function () {
                var t, e, n;
                return t = this._options.elem, e = i, n = this._wheelHandler, t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n), this
            }
        };
        var o = function (t) {
            return (o = t.wheelDelta && !t.deltaY ? function (t) {
                return -1 * t.wheelDelta
            } : function (t) {
                return t.deltaY
            })(t)
        };

        function a(t, e) {
            var i, n = {};
            for (i in t) Object.prototype.hasOwnProperty.call(t, i) && (n[i] = t[i]);
            for (i in e) Object.prototype.hasOwnProperty.call(e, i) && (n[i] = e[i]);
            return n
        }

        return r
    }(window, document);
    t.exports = n
}, function (t, e, i) {
    var n;
    (function () {
        var i = this, r = i._, s = Array.prototype, o = Object.prototype, a = Function.prototype, l = s.push,
            h = s.slice, u = o.toString, c = o.hasOwnProperty, f = Array.isArray, d = Object.keys, p = a.bind,
            m = Object.create, _ = function () {
            }, g = function (t) {
                return t instanceof g ? t : this instanceof g ? void (this._wrapped = t) : new g(t)
            };
        void 0 !== t && t.exports && (e = t.exports = g), e._ = g, g.VERSION = "1.8.3";
        var v = function (t, e, i) {
            if (void 0 === e) return t;
            switch (null == i ? 3 : i) {
                case 1:
                    return function (i) {
                        return t.call(e, i)
                    };
                case 2:
                    return function (i, n) {
                        return t.call(e, i, n)
                    };
                case 3:
                    return function (i, n, r) {
                        return t.call(e, i, n, r)
                    };
                case 4:
                    return function (i, n, r, s) {
                        return t.call(e, i, n, r, s)
                    }
            }
            return function () {
                return t.apply(e, arguments)
            }
        }, y = function (t, e, i) {
            return null == t ? g.identity : g.isFunction(t) ? v(t, e, i) : g.isObject(t) ? g.matcher(t) : g.property(t)
        };
        g.iteratee = function (t, e) {
            return y(t, e, 1 / 0)
        };
        var b = function (t, e) {
            return function (i) {
                var n = arguments.length;
                if (n < 2 || null == i) return i;
                for (var r = 1; r < n; r++) for (var s = arguments[r], o = t(s), a = o.length, l = 0; l < a; l++) {
                    var h = o[l];
                    e && void 0 !== i[h] || (i[h] = s[h])
                }
                return i
            }
        }, w = function (t) {
            if (!g.isObject(t)) return {};
            if (m) return m(t);
            _.prototype = t;
            var e = new _;
            return _.prototype = null, e
        }, T = function (t) {
            return function (e) {
                return null == e ? void 0 : e[t]
            }
        }, x = Math.pow(2, 53) - 1, P = T("length"), S = function (t) {
            var e = P(t);
            return "number" == typeof e && e >= 0 && e <= x
        };

        function k(t) {
            return function (e, i, n, r) {
                i = v(i, r, 4);
                var s = !S(e) && g.keys(e), o = (s || e).length, a = t > 0 ? 0 : o - 1;
                return arguments.length < 3 && (n = e[s ? s[a] : a], a += t), function (e, i, n, r, s, o) {
                    for (; s >= 0 && s < o; s += t) {
                        var a = r ? r[s] : s;
                        n = i(n, e[a], a, e)
                    }
                    return n
                }(e, i, n, s, a, o)
            }
        }

        g.each = g.forEach = function (t, e, i) {
            var n, r;
            if (e = v(e, i), S(t)) for (n = 0, r = t.length; n < r; n++) e(t[n], n, t); else {
                var s = g.keys(t);
                for (n = 0, r = s.length; n < r; n++) e(t[s[n]], s[n], t)
            }
            return t
        }, g.map = g.collect = function (t, e, i) {
            e = y(e, i);
            for (var n = !S(t) && g.keys(t), r = (n || t).length, s = Array(r), o = 0; o < r; o++) {
                var a = n ? n[o] : o;
                s[o] = e(t[a], a, t)
            }
            return s
        }, g.reduce = g.foldl = g.inject = k(1), g.reduceRight = g.foldr = k(-1), g.find = g.detect = function (t, e, i) {
            var n;
            if (void 0 !== (n = S(t) ? g.findIndex(t, e, i) : g.findKey(t, e, i)) && -1 !== n) return t[n]
        }, g.filter = g.select = function (t, e, i) {
            var n = [];
            return e = y(e, i), g.each(t, function (t, i, r) {
                e(t, i, r) && n.push(t)
            }), n
        }, g.reject = function (t, e, i) {
            return g.filter(t, g.negate(y(e)), i)
        }, g.every = g.all = function (t, e, i) {
            e = y(e, i);
            for (var n = !S(t) && g.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (!e(t[o], o, t)) return !1
            }
            return !0
        }, g.some = g.any = function (t, e, i) {
            e = y(e, i);
            for (var n = !S(t) && g.keys(t), r = (n || t).length, s = 0; s < r; s++) {
                var o = n ? n[s] : s;
                if (e(t[o], o, t)) return !0
            }
            return !1
        }, g.contains = g.includes = g.include = function (t, e, i, n) {
            return S(t) || (t = g.values(t)), ("number" != typeof i || n) && (i = 0), g.indexOf(t, e, i) >= 0
        }, g.invoke = function (t, e) {
            var i = h.call(arguments, 2), n = g.isFunction(e);
            return g.map(t, function (t) {
                var r = n ? e : t[e];
                return null == r ? r : r.apply(t, i)
            })
        }, g.pluck = function (t, e) {
            return g.map(t, g.property(e))
        }, g.where = function (t, e) {
            return g.filter(t, g.matcher(e))
        }, g.findWhere = function (t, e) {
            return g.find(t, g.matcher(e))
        }, g.max = function (t, e, i) {
            var n, r, s = -1 / 0, o = -1 / 0;
            if (null == e && null != t) for (var a = 0, l = (t = S(t) ? t : g.values(t)).length; a < l; a++) (n = t[a]) > s && (s = n); else e = y(e, i), g.each(t, function (t, i, n) {
                ((r = e(t, i, n)) > o || r === -1 / 0 && s === -1 / 0) && (s = t, o = r)
            });
            return s
        }, g.min = function (t, e, i) {
            var n, r, s = 1 / 0, o = 1 / 0;
            if (null == e && null != t) for (var a = 0, l = (t = S(t) ? t : g.values(t)).length; a < l; a++) (n = t[a]) < s && (s = n); else e = y(e, i), g.each(t, function (t, i, n) {
                ((r = e(t, i, n)) < o || r === 1 / 0 && s === 1 / 0) && (s = t, o = r)
            });
            return s
        }, g.shuffle = function (t) {
            for (var e, i = S(t) ? t : g.values(t), n = i.length, r = Array(n), s = 0; s < n; s++) (e = g.random(0, s)) !== s && (r[s] = r[e]), r[e] = i[s];
            return r
        }, g.sample = function (t, e, i) {
            return null == e || i ? (S(t) || (t = g.values(t)), t[g.random(t.length - 1)]) : g.shuffle(t).slice(0, Math.max(0, e))
        }, g.sortBy = function (t, e, i) {
            return e = y(e, i), g.pluck(g.map(t, function (t, i, n) {
                return {value: t, index: i, criteria: e(t, i, n)}
            }).sort(function (t, e) {
                var i = t.criteria, n = e.criteria;
                if (i !== n) {
                    if (i > n || void 0 === i) return 1;
                    if (i < n || void 0 === n) return -1
                }
                return t.index - e.index
            }), "value")
        };
        var E = function (t) {
            return function (e, i, n) {
                var r = {};
                return i = y(i, n), g.each(e, function (n, s) {
                    var o = i(n, s, e);
                    t(r, n, o)
                }), r
            }
        };
        g.groupBy = E(function (t, e, i) {
            g.has(t, i) ? t[i].push(e) : t[i] = [e]
        }), g.indexBy = E(function (t, e, i) {
            t[i] = e
        }), g.countBy = E(function (t, e, i) {
            g.has(t, i) ? t[i]++ : t[i] = 1
        }), g.toArray = function (t) {
            return t ? g.isArray(t) ? h.call(t) : S(t) ? g.map(t, g.identity) : g.values(t) : []
        }, g.size = function (t) {
            return null == t ? 0 : S(t) ? t.length : g.keys(t).length
        }, g.partition = function (t, e, i) {
            e = y(e, i);
            var n = [], r = [];
            return g.each(t, function (t, i, s) {
                (e(t, i, s) ? n : r).push(t)
            }), [n, r]
        }, g.first = g.head = g.take = function (t, e, i) {
            if (null != t) return null == e || i ? t[0] : g.initial(t, t.length - e)
        }, g.initial = function (t, e, i) {
            return h.call(t, 0, Math.max(0, t.length - (null == e || i ? 1 : e)))
        }, g.last = function (t, e, i) {
            if (null != t) return null == e || i ? t[t.length - 1] : g.rest(t, Math.max(0, t.length - e))
        }, g.rest = g.tail = g.drop = function (t, e, i) {
            return h.call(t, null == e || i ? 1 : e)
        }, g.compact = function (t) {
            return g.filter(t, g.identity)
        };
        var C = function (t, e, i, n) {
            for (var r = [], s = 0, o = n || 0, a = P(t); o < a; o++) {
                var l = t[o];
                if (S(l) && (g.isArray(l) || g.isArguments(l))) {
                    e || (l = C(l, e, i));
                    var h = 0, u = l.length;
                    for (r.length += u; h < u;) r[s++] = l[h++]
                } else i || (r[s++] = l)
            }
            return r
        };

        function A(t) {
            return function (e, i, n) {
                i = y(i, n);
                for (var r = P(e), s = t > 0 ? 0 : r - 1; s >= 0 && s < r; s += t) if (i(e[s], s, e)) return s;
                return -1
            }
        }

        function O(t, e, i) {
            return function (n, r, s) {
                var o = 0, a = P(n);
                if ("number" == typeof s) t > 0 ? o = s >= 0 ? s : Math.max(s + a, o) : a = s >= 0 ? Math.min(s + 1, a) : s + a + 1; else if (i && s && a) return n[s = i(n, r)] === r ? s : -1;
                if (r != r) return (s = e(h.call(n, o, a), g.isNaN)) >= 0 ? s + o : -1;
                for (s = t > 0 ? o : a - 1; s >= 0 && s < a; s += t) if (n[s] === r) return s;
                return -1
            }
        }

        g.flatten = function (t, e) {
            return C(t, e, !1)
        }, g.without = function (t) {
            return g.difference(t, h.call(arguments, 1))
        }, g.uniq = g.unique = function (t, e, i, n) {
            g.isBoolean(e) || (n = i, i = e, e = !1), null != i && (i = y(i, n));
            for (var r = [], s = [], o = 0, a = P(t); o < a; o++) {
                var l = t[o], h = i ? i(l, o, t) : l;
                e ? (o && s === h || r.push(l), s = h) : i ? g.contains(s, h) || (s.push(h), r.push(l)) : g.contains(r, l) || r.push(l)
            }
            return r
        }, g.union = function () {
            return g.uniq(C(arguments, !0, !0))
        }, g.intersection = function (t) {
            for (var e = [], i = arguments.length, n = 0, r = P(t); n < r; n++) {
                var s = t[n];
                if (!g.contains(e, s)) {
                    for (var o = 1; o < i && g.contains(arguments[o], s); o++) ;
                    o === i && e.push(s)
                }
            }
            return e
        }, g.difference = function (t) {
            var e = C(arguments, !0, !0, 1);
            return g.filter(t, function (t) {
                return !g.contains(e, t)
            })
        }, g.zip = function () {
            return g.unzip(arguments)
        }, g.unzip = function (t) {
            for (var e = t && g.max(t, P).length || 0, i = Array(e), n = 0; n < e; n++) i[n] = g.pluck(t, n);
            return i
        }, g.object = function (t, e) {
            for (var i = {}, n = 0, r = P(t); n < r; n++) e ? i[t[n]] = e[n] : i[t[n][0]] = t[n][1];
            return i
        }, g.findIndex = A(1), g.findLastIndex = A(-1), g.sortedIndex = function (t, e, i, n) {
            for (var r = (i = y(i, n, 1))(e), s = 0, o = P(t); s < o;) {
                var a = Math.floor((s + o) / 2);
                i(t[a]) < r ? s = a + 1 : o = a
            }
            return s
        }, g.indexOf = O(1, g.findIndex, g.sortedIndex), g.lastIndexOf = O(-1, g.findLastIndex), g.range = function (t, e, i) {
            null == e && (e = t || 0, t = 0), i = i || 1;
            for (var n = Math.max(Math.ceil((e - t) / i), 0), r = Array(n), s = 0; s < n; s++, t += i) r[s] = t;
            return r
        };
        var D = function (t, e, i, n, r) {
            if (!(n instanceof e)) return t.apply(i, r);
            var s = w(t.prototype), o = t.apply(s, r);
            return g.isObject(o) ? o : s
        };
        g.bind = function (t, e) {
            if (p && t.bind === p) return p.apply(t, h.call(arguments, 1));
            if (!g.isFunction(t)) throw new TypeError("Bind must be called on a function");
            var i = h.call(arguments, 2), n = function () {
                return D(t, n, e, this, i.concat(h.call(arguments)))
            };
            return n
        }, g.partial = function (t) {
            var e = h.call(arguments, 1), i = function () {
                for (var n = 0, r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = e[o] === g ? arguments[n++] : e[o];
                for (; n < arguments.length;) s.push(arguments[n++]);
                return D(t, i, this, this, s)
            };
            return i
        }, g.bindAll = function (t) {
            var e, i, n = arguments.length;
            if (n <= 1) throw new Error("bindAll must be passed function names");
            for (e = 1; e < n; e++) t[i = arguments[e]] = g.bind(t[i], t);
            return t
        }, g.memoize = function (t, e) {
            var i = function (n) {
                var r = i.cache, s = "" + (e ? e.apply(this, arguments) : n);
                return g.has(r, s) || (r[s] = t.apply(this, arguments)), r[s]
            };
            return i.cache = {}, i
        }, g.delay = function (t, e) {
            var i = h.call(arguments, 2);
            return setTimeout(function () {
                return t.apply(null, i)
            }, e)
        }, g.defer = g.partial(g.delay, g, 1), g.throttle = function (t, e, i) {
            var n, r, s, o = null, a = 0;
            i || (i = {});
            var l = function () {
                a = !1 === i.leading ? 0 : g.now(), o = null, s = t.apply(n, r), o || (n = r = null)
            };
            return function () {
                var h = g.now();
                a || !1 !== i.leading || (a = h);
                var u = e - (h - a);
                return n = this, r = arguments, u <= 0 || u > e ? (o && (clearTimeout(o), o = null), a = h, s = t.apply(n, r), o || (n = r = null)) : o || !1 === i.trailing || (o = setTimeout(l, u)), s
            }
        }, g.debounce = function (t, e, i) {
            var n, r, s, o, a, l = function () {
                var h = g.now() - o;
                h < e && h >= 0 ? n = setTimeout(l, e - h) : (n = null, i || (a = t.apply(s, r), n || (s = r = null)))
            };
            return function () {
                s = this, r = arguments, o = g.now();
                var h = i && !n;
                return n || (n = setTimeout(l, e)), h && (a = t.apply(s, r), s = r = null), a
            }
        }, g.wrap = function (t, e) {
            return g.partial(e, t)
        }, g.negate = function (t) {
            return function () {
                return !t.apply(this, arguments)
            }
        }, g.compose = function () {
            var t = arguments, e = t.length - 1;
            return function () {
                for (var i = e, n = t[e].apply(this, arguments); i--;) n = t[i].call(this, n);
                return n
            }
        }, g.after = function (t, e) {
            return function () {
                if (--t < 1) return e.apply(this, arguments)
            }
        }, g.before = function (t, e) {
            var i;
            return function () {
                return --t > 0 && (i = e.apply(this, arguments)), t <= 1 && (e = null), i
            }
        }, g.once = g.partial(g.before, 2);
        var L = !{toString: null}.propertyIsEnumerable("toString"),
            M = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];

        function z(t, e) {
            var i = M.length, n = t.constructor, r = g.isFunction(n) && n.prototype || o, s = "constructor";
            for (g.has(t, s) && !g.contains(e, s) && e.push(s); i--;) (s = M[i]) in t && t[s] !== r[s] && !g.contains(e, s) && e.push(s)
        }

        g.keys = function (t) {
            if (!g.isObject(t)) return [];
            if (d) return d(t);
            var e = [];
            for (var i in t) g.has(t, i) && e.push(i);
            return L && z(t, e), e
        }, g.allKeys = function (t) {
            if (!g.isObject(t)) return [];
            var e = [];
            for (var i in t) e.push(i);
            return L && z(t, e), e
        }, g.values = function (t) {
            for (var e = g.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = t[e[r]];
            return n
        }, g.mapObject = function (t, e, i) {
            e = y(e, i);
            for (var n, r = g.keys(t), s = r.length, o = {}, a = 0; a < s; a++) o[n = r[a]] = e(t[n], n, t);
            return o
        }, g.pairs = function (t) {
            for (var e = g.keys(t), i = e.length, n = Array(i), r = 0; r < i; r++) n[r] = [e[r], t[e[r]]];
            return n
        }, g.invert = function (t) {
            for (var e = {}, i = g.keys(t), n = 0, r = i.length; n < r; n++) e[t[i[n]]] = i[n];
            return e
        }, g.functions = g.methods = function (t) {
            var e = [];
            for (var i in t) g.isFunction(t[i]) && e.push(i);
            return e.sort()
        }, g.extend = b(g.allKeys), g.extendOwn = g.assign = b(g.keys), g.findKey = function (t, e, i) {
            e = y(e, i);
            for (var n, r = g.keys(t), s = 0, o = r.length; s < o; s++) if (e(t[n = r[s]], n, t)) return n
        }, g.pick = function (t, e, i) {
            var n, r, s = {}, o = t;
            if (null == o) return s;
            g.isFunction(e) ? (r = g.allKeys(o), n = v(e, i)) : (r = C(arguments, !1, !1, 1), n = function (t, e, i) {
                return e in i
            }, o = Object(o));
            for (var a = 0, l = r.length; a < l; a++) {
                var h = r[a], u = o[h];
                n(u, h, o) && (s[h] = u)
            }
            return s
        }, g.omit = function (t, e, i) {
            if (g.isFunction(e)) e = g.negate(e); else {
                var n = g.map(C(arguments, !1, !1, 1), String);
                e = function (t, e) {
                    return !g.contains(n, e)
                }
            }
            return g.pick(t, e, i)
        }, g.defaults = b(g.allKeys, !0), g.create = function (t, e) {
            var i = w(t);
            return e && g.extendOwn(i, e), i
        }, g.clone = function (t) {
            return g.isObject(t) ? g.isArray(t) ? t.slice() : g.extend({}, t) : t
        }, g.tap = function (t, e) {
            return e(t), t
        }, g.isMatch = function (t, e) {
            var i = g.keys(e), n = i.length;
            if (null == t) return !n;
            for (var r = Object(t), s = 0; s < n; s++) {
                var o = i[s];
                if (e[o] !== r[o] || !(o in r)) return !1
            }
            return !0
        };
        var R = function (t, e, i, n) {
            if (t === e) return 0 !== t || 1 / t == 1 / e;
            if (null == t || null == e) return t === e;
            t instanceof g && (t = t._wrapped), e instanceof g && (e = e._wrapped);
            var r = u.call(t);
            if (r !== u.call(e)) return !1;
            switch (r) {
                case"[object RegExp]":
                case"[object String]":
                    return "" + t == "" + e;
                case"[object Number]":
                    return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
                case"[object Date]":
                case"[object Boolean]":
                    return +t == +e
            }
            var s = "[object Array]" === r;
            if (!s) {
                if ("object" != typeof t || "object" != typeof e) return !1;
                var o = t.constructor, a = e.constructor;
                if (o !== a && !(g.isFunction(o) && o instanceof o && g.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1
            }
            i = i || [], n = n || [];
            for (var l = i.length; l--;) if (i[l] === t) return n[l] === e;
            if (i.push(t), n.push(e), s) {
                if ((l = t.length) !== e.length) return !1;
                for (; l--;) if (!R(t[l], e[l], i, n)) return !1
            } else {
                var h, c = g.keys(t);
                if (l = c.length, g.keys(e).length !== l) return !1;
                for (; l--;) if (h = c[l], !g.has(e, h) || !R(t[h], e[h], i, n)) return !1
            }
            return i.pop(), n.pop(), !0
        };
        g.isEqual = function (t, e) {
            return R(t, e)
        }, g.isEmpty = function (t) {
            return null == t || (S(t) && (g.isArray(t) || g.isString(t) || g.isArguments(t)) ? 0 === t.length : 0 === g.keys(t).length)
        }, g.isElement = function (t) {
            return !(!t || 1 !== t.nodeType)
        }, g.isArray = f || function (t) {
            return "[object Array]" === u.call(t)
        }, g.isObject = function (t) {
            var e = typeof t;
            return "function" === e || "object" === e && !!t
        }, g.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (t) {
            g["is" + t] = function (e) {
                return u.call(e) === "[object " + t + "]"
            }
        }), g.isArguments(arguments) || (g.isArguments = function (t) {
            return g.has(t, "callee")
        }), "function" != typeof /./ && "object" != typeof Int8Array && (g.isFunction = function (t) {
            return "function" == typeof t || !1
        }), g.isFinite = function (t) {
            return isFinite(t) && !isNaN(parseFloat(t))
        }, g.isNaN = function (t) {
            return g.isNumber(t) && t !== +t
        }, g.isBoolean = function (t) {
            return !0 === t || !1 === t || "[object Boolean]" === u.call(t)
        }, g.isNull = function (t) {
            return null === t
        }, g.isUndefined = function (t) {
            return void 0 === t
        }, g.has = function (t, e) {
            return null != t && c.call(t, e)
        }, g.noConflict = function () {
            return i._ = r, this
        }, g.identity = function (t) {
            return t
        }, g.constant = function (t) {
            return function () {
                return t
            }
        }, g.noop = function () {
        }, g.property = T, g.propertyOf = function (t) {
            return null == t ? function () {
            } : function (e) {
                return t[e]
            }
        }, g.matcher = g.matches = function (t) {
            return t = g.extendOwn({}, t), function (e) {
                return g.isMatch(e, t)
            }
        }, g.times = function (t, e, i) {
            var n = Array(Math.max(0, t));
            e = v(e, i, 1);
            for (var r = 0; r < t; r++) n[r] = e(r);
            return n
        }, g.random = function (t, e) {
            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
        }, g.now = Date.now || function () {
            return (new Date).getTime()
        };
        var I = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}, F = g.invert(I),
            N = function (t) {
                var e = function (e) {
                    return t[e]
                }, i = "(?:" + g.keys(t).join("|") + ")", n = RegExp(i), r = RegExp(i, "g");
                return function (t) {
                    return t = null == t ? "" : "" + t, n.test(t) ? t.replace(r, e) : t
                }
            };
        g.escape = N(I), g.unescape = N(F), g.result = function (t, e, i) {
            var n = null == t ? void 0 : t[e];
            return void 0 === n && (n = i), g.isFunction(n) ? n.call(t) : n
        };
        var j = 0;
        g.uniqueId = function (t) {
            var e = ++j + "";
            return t ? t + e : e
        }, g.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var B = /(.)^/, W = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
            X = /\\|'|\r|\n|\u2028|\u2029/g, Y = function (t) {
                return "\\" + W[t]
            };
        g.template = function (t, e, i) {
            !e && i && (e = i), e = g.defaults({}, e, g.templateSettings);
            var n = RegExp([(e.escape || B).source, (e.interpolate || B).source, (e.evaluate || B).source].join("|") + "|$", "g"),
                r = 0, s = "__p+='";
            t.replace(n, function (e, i, n, o, a) {
                return s += t.slice(r, a).replace(X, Y), r = a + e.length, i ? s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : o && (s += "';\n" + o + "\n__p+='"), e
            }), s += "';\n", e.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
            try {
                var o = new Function(e.variable || "obj", "_", s)
            } catch (t) {
                throw t.source = s, t
            }
            var a = function (t) {
                return o.call(this, t, g)
            }, l = e.variable || "obj";
            return a.source = "function(" + l + "){\n" + s + "}", a
        }, g.chain = function (t) {
            var e = g(t);
            return e._chain = !0, e
        };
        var q = function (t, e) {
            return t._chain ? g(e).chain() : e
        };
        g.mixin = function (t) {
            g.each(g.functions(t), function (e) {
                var i = g[e] = t[e];
                g.prototype[e] = function () {
                    var t = [this._wrapped];
                    return l.apply(t, arguments), q(this, i.apply(g, t))
                }
            })
        }, g.mixin(g), g.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (t) {
            var e = s[t];
            g.prototype[t] = function () {
                var i = this._wrapped;
                return e.apply(i, arguments), "shift" !== t && "splice" !== t || 0 !== i.length || delete i[0], q(this, i)
            }
        }), g.each(["concat", "join", "slice"], function (t) {
            var e = s[t];
            g.prototype[t] = function () {
                return q(this, e.apply(this._wrapped, arguments))
            }
        }), g.prototype.value = function () {
            return this._wrapped
        }, g.prototype.valueOf = g.prototype.toJSON = g.prototype.value, g.prototype.toString = function () {
            return "" + this._wrapped
        }, void 0 === (n = function () {
            return g
        }.apply(e, [])) || (t.exports = n)
    }).call(this)
}, function (t, e, i) {
    (function (n) {
        var r, s, o, a = void 0 !== t && t.exports && void 0 !== n ? n : this || window;
        (a._gsQueue || (a._gsQueue = [])).push(function () {
            "use strict";
            var t = (a.document || {}).documentElement, e = a, i = function (i, n) {
                var r = "x" === n ? "Width" : "Height", s = "scroll" + r, o = "client" + r, a = document.body;
                return i === e || i === t || i === a ? Math.max(t[s], a[s]) - (e["inner" + r] || t[o] || a[o]) : i[s] - i["offset" + r]
            }, n = function (i, n) {
                var r = "scroll" + ("x" === n ? "Left" : "Top");
                return i === e && (null != i.pageXOffset ? r = "page" + n.toUpperCase() + "Offset" : i = null != t[r] ? t : document.body), function () {
                    return i[r]
                }
            }, r = function (i, r) {
                var s,
                    o = (s = i, "string" == typeof s && (s = TweenLite.selector(s)), s.length && s !== e && s[0] && s[0].style && !s.nodeType && (s = s[0]), s === e || s.nodeType && s.style ? s : null).getBoundingClientRect(),
                    a = !r || r === e || r === document.body, l = (a ? t : r).getBoundingClientRect(),
                    h = {x: o.left - l.left, y: o.top - l.top};
                return !a && r && (h.x += n(r, "x")(), h.y += n(r, "y")()), h
            }, s = function (t, e, n) {
                var s = typeof t;
                return isNaN(t) ? "number" === s || "string" === s && "=" === t.charAt(1) ? t : "max" === t ? i(e, n) : Math.min(i(e, n), r(t, e)[n]) : parseFloat(t)
            }, o = a._gsDefine.plugin({
                propName: "scrollTo", API: 2, global: !0, version: "1.9.0", init: function (t, i, r) {
                    return this._wdw = t === e, this._target = t, this._tween = r, "object" != typeof i ? "string" == typeof (i = {y: i}).y && "max" !== i.y && "=" !== i.y.charAt(1) && (i.x = i.y) : i.nodeType && (i = {
                        y: i,
                        x: i
                    }), this.vars = i, this._autoKill = !1 !== i.autoKill, this.getX = n(t, "x"), this.getY = n(t, "y"), this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != i.x ? (this._addTween(this, "x", this.x, s(i.x, t, "x") - (i.offsetX || 0), "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != i.y ? (this._addTween(this, "y", this.y, s(i.y, t, "y") - (i.offsetY || 0), "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
                }, set: function (t) {
                    this._super.setRatio.call(this, t);
                    var n = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                        r = this._wdw || !this.skipY ? this.getY() : this.yPrev, s = r - this.yPrev, a = n - this.xPrev,
                        l = o.autoKillThreshold;
                    this.x < 0 && (this.x = 0), this.y < 0 && (this.y = 0), this._autoKill && (!this.skipX && (a > l || a < -l) && n < i(this._target, "x") && (this.skipX = !0), !this.skipY && (s > l || s < -l) && r < i(this._target, "y") && (this.skipY = !0), this.skipX && this.skipY && (this._tween.kill(), this.vars.onAutoKill && this.vars.onAutoKill.apply(this.vars.onAutoKillScope || this._tween, this.vars.onAutoKillParams || []))), this._wdw ? e.scrollTo(this.skipX ? n : this.x, this.skipY ? r : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
                }
            }), l = o.prototype;
            o.max = i, o.getOffset = r, o.buildGetter = n, o.autoKillThreshold = 7, l._kill = function (t) {
                return t.scrollTo_x && (this.skipX = !0), t.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, t)
            }
        }), a._gsDefine && a._gsQueue.pop()(), function (n) {
            "use strict";
            var l = function () {
                return (a.GreenSockGlobals || a).ScrollToPlugin
            };
            void 0 !== t && t.exports ? (i(12), t.exports = l()) : (s = [i(12)], void 0 === (o = "function" == typeof (r = l) ? r.apply(e, s) : r) || (t.exports = o))
        }()
    }).call(e, i(3))
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.init = function () {
        if (o.carousels = document.querySelectorAll("[data-carousel]"), !o.carousels) return;
        for (var t = o.carousels.length - 1; t >= 0; t--) {
            var e = o.carousels[t], i = !e.hasAttribute("data-carousel-disable-autoheight");
            new s.default(e, {wrapAround: !0, imagesLoaded: !0, prevNextButtons: !1, watchCSS: !0, adaptiveHeight: i})
        }
    };
    var n, r = i(22), s = (n = r) && n.__esModule ? n : {default: n};
    var o = {carousels: null}
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i) {
        "use strict";
        e.createMethods.push("_createImagesLoaded");
        var n = e.prototype;
        return n._createImagesLoaded = function () {
            this.on("activate", this.imagesLoaded)
        }, n.imagesLoaded = function () {
            if (this.options.imagesLoaded) {
                var t = this;
                i(this.slider).on("progress", function (e, i) {
                    var n = t.getParentCell(i.img);
                    t.cellSizeChange(n && n.element), t.options.freeScroll || t.positionSliderAtSelected()
                })
            }
        }, e
    }, n = [i(23), i(35)], void 0 === (r = function (t, e) {
        return s(0, t, e)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s, o;
    window, o = function (t) {
        return t
    }, r = [i(1), i(28), i(30), i(31), i(32), i(33), i(34)], void 0 === (s = "function" == typeof (n = o) ? n.apply(e, r) : n) || (t.exports = s)
}, function (t, e, i) {
    var n, r;
    !function (s, o) {
        "use strict";
        void 0 === (r = "function" == typeof (n = o) ? n.call(e, i, e, t) : n) || (t.exports = r)
    }(window, function () {
        "use strict";
        var t = function () {
            var t = window.Element.prototype;
            if (t.matches) return "matches";
            if (t.matchesSelector) return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i] + "MatchesSelector";
                if (t[n]) return n
            }
        }();
        return function (e, i) {
            return e[t](i)
        }
    })
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e) {
        "use strict";

        function i(t, e) {
            this.element = t, this.parent = e, this.create()
        }

        var n = i.prototype;
        return n.create = function () {
            this.element.style.position = "absolute", this.element.setAttribute("aria-hidden", "true"), this.x = 0, this.shift = 0
        }, n.destroy = function () {
            this.unselect(), this.element.style.position = "";
            var t = this.parent.originSide;
            this.element.style[t] = ""
        }, n.getSize = function () {
            this.size = e(this.element)
        }, n.setPosition = function (t) {
            this.x = t, this.updateTarget(), this.renderPosition(t)
        }, n.updateTarget = n.setDefaultTarget = function () {
            var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
            this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
        }, n.renderPosition = function (t) {
            var e = this.parent.originSide;
            this.element.style[e] = this.parent.getPositionValue(t)
        }, n.select = function () {
            this.element.classList.add("is-selected"), this.element.removeAttribute("aria-hidden")
        }, n.unselect = function () {
            this.element.classList.remove("is-selected"), this.element.setAttribute("aria-hidden", "true")
        }, n.wrapShift = function (t) {
            this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
        }, n.remove = function () {
            this.element.parentNode.removeChild(this.element)
        }, i
    }, n = [i(4)], void 0 === (r = function (t) {
        return s(0, t)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r;
    window, void 0 === (r = "function" == typeof (n = function () {
        "use strict";

        function t(t) {
            this.parent = t, this.isOriginLeft = "left" == t.originSide, this.cells = [], this.outerWidth = 0, this.height = 0
        }

        var e = t.prototype;
        return e.addCell = function (t) {
            if (this.cells.push(t), this.outerWidth += t.size.outerWidth, this.height = Math.max(t.size.outerHeight, this.height), 1 == this.cells.length) {
                this.x = t.x;
                var e = this.isOriginLeft ? "marginLeft" : "marginRight";
                this.firstMargin = t.size[e]
            }
        }, e.updateTarget = function () {
            var t = this.isOriginLeft ? "marginRight" : "marginLeft", e = this.getLastCell(), i = e ? e.size[t] : 0,
                n = this.outerWidth - (this.firstMargin + i);
            this.target = this.x + this.firstMargin + n * this.parent.cellAlign
        }, e.getLastCell = function () {
            return this.cells[this.cells.length - 1]
        }, e.select = function () {
            this.cells.forEach(function (t) {
                t.select()
            })
        }, e.unselect = function () {
            this.cells.forEach(function (t) {
                t.unselect()
            })
        }, e.getCellElements = function () {
            return this.cells.map(function (t) {
                return t.element
            })
        }, t
    }) ? n.call(e, i, e, t) : n) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e) {
        "use strict";
        var i = {
            startAnimation: function () {
                this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
            }, animate: function () {
                this.applyDragForce(), this.applySelectedAttraction();
                var t = this.x;
                if (this.integratePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
                    var e = this;
                    requestAnimationFrame(function () {
                        e.animate()
                    })
                }
            }, positionSlider: function () {
                var t = this.x;
                this.options.wrapAround && this.cells.length > 1 && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), this.setTranslateX(t, this.isAnimating), this.dispatchScrollEvent()
            }, setTranslateX: function (t, e) {
                t += this.cursorPosition, t = this.options.rightToLeft ? -t : t;
                var i = this.getPositionValue(t);
                this.slider.style.transform = e ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")"
            }, dispatchScrollEvent: function () {
                var t = this.slides[0];
                if (t) {
                    var e = -this.x - t.target, i = e / this.slidesWidth;
                    this.dispatchEvent("scroll", null, [i, e])
                }
            }, positionSliderAtSelected: function () {
                this.cells.length && (this.x = -this.selectedSlide.target, this.velocity = 0, this.positionSlider())
            }, getPositionValue: function (t) {
                return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
            }, settle: function (t) {
                this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, this.positionSlider(), this.dispatchEvent("settle", null, [this.selectedIndex]))
            }, shiftWrapCells: function (t) {
                var e = this.cursorPosition + t;
                this._shiftCells(this.beforeShiftCells, e, -1);
                var i = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
                this._shiftCells(this.afterShiftCells, i, 1)
            }, _shiftCells: function (t, e, i) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n], s = e > 0 ? i : 0;
                    r.wrapShift(s), e -= r.size.outerWidth
                }
            }, _unshiftCells: function (t) {
                if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0)
            }, integratePhysics: function () {
                this.x += this.velocity, this.velocity *= this.getFrictionFactor()
            }, applyForce: function (t) {
                this.velocity += t
            }, getFrictionFactor: function () {
                return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
            }, getRestingPosition: function () {
                return this.x + this.velocity / (1 - this.getFrictionFactor())
            }, applyDragForce: function () {
                if (this.isDraggable && this.isPointerDown) {
                    var t = this.dragX - this.x - this.velocity;
                    this.applyForce(t)
                }
            }, applySelectedAttraction: function () {
                if (!(this.isDraggable && this.isPointerDown) && !this.isFreeScrolling && this.slides.length) {
                    var t = (-1 * this.selectedSlide.target - this.x) * this.options.selectedAttraction;
                    this.applyForce(t)
                }
            }
        };
        return i
    }, n = [i(0)], void 0 === (r = function (t) {
        return s(0, t)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s, o;
    s = window, o = function (t, e, i, n) {
        "use strict";
        n.extend(e.defaults, {draggable: ">1", dragThreshold: 3}), e.createMethods.push("_createDrag");
        var r = e.prototype;
        n.extend(r, i.prototype), r._touchActionValue = "pan-y";
        var s = "createTouch" in document, o = !1;
        r._createDrag = function () {
            this.on("activate", this.onActivateDrag), this.on("uiChange", this._uiChangeDrag), this.on("deactivate", this.onDeactivateDrag), this.on("cellChange", this.updateDraggable), s && !o && (t.addEventListener("touchmove", function () {
            }), o = !0)
        }, r.onActivateDrag = function () {
            this.handles = [this.viewport], this.bindHandles(), this.updateDraggable()
        }, r.onDeactivateDrag = function () {
            this.unbindHandles(), this.element.classList.remove("is-draggable")
        }, r.updateDraggable = function () {
            ">1" == this.options.draggable ? this.isDraggable = this.slides.length > 1 : this.isDraggable = this.options.draggable, this.isDraggable ? this.element.classList.add("is-draggable") : this.element.classList.remove("is-draggable")
        }, r.bindDrag = function () {
            this.options.draggable = !0, this.updateDraggable()
        }, r.unbindDrag = function () {
            this.options.draggable = !1, this.updateDraggable()
        }, r._uiChangeDrag = function () {
            delete this.isFreeScrolling
        }, r.pointerDown = function (e, i) {
            this.isDraggable ? this.okayPointerDown(e) && (this._pointerDownPreventDefault(e), this.pointerDownFocus(e), document.activeElement != this.element && this.pointerDownBlur(), this.dragX = this.x, this.viewport.classList.add("is-pointer-down"), this.pointerDownScroll = l(), t.addEventListener("scroll", this), this._pointerDownDefault(e, i)) : this._pointerDownDefault(e, i)
        }, r._pointerDownDefault = function (t, e) {
            this.pointerDownPointer = {
                pageX: e.pageX,
                pageY: e.pageY
            }, this._bindPostStartEvents(t), this.dispatchEvent("pointerDown", t, [e])
        };
        var a = {INPUT: !0, TEXTAREA: !0, SELECT: !0};

        function l() {
            return {x: t.pageXOffset, y: t.pageYOffset}
        }

        return r.pointerDownFocus = function (t) {
            a[t.target.nodeName] || this.focus()
        }, r._pointerDownPreventDefault = function (t) {
            var e = "touchstart" == t.type, i = "touch" == t.pointerType, n = a[t.target.nodeName];
            e || i || n || t.preventDefault()
        }, r.hasDragStarted = function (t) {
            return Math.abs(t.x) > this.options.dragThreshold
        }, r.pointerUp = function (t, e) {
            delete this.isTouchScrolling, this.viewport.classList.remove("is-pointer-down"), this.dispatchEvent("pointerUp", t, [e]), this._dragPointerUp(t, e)
        }, r.pointerDone = function () {
            t.removeEventListener("scroll", this), delete this.pointerDownScroll
        }, r.dragStart = function (e, i) {
            this.isDraggable && (this.dragStartPosition = this.x, this.startAnimation(), t.removeEventListener("scroll", this), this.dispatchEvent("dragStart", e, [i]))
        }, r.pointerMove = function (t, e) {
            var i = this._dragPointerMove(t, e);
            this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i)
        }, r.dragMove = function (t, e, i) {
            if (this.isDraggable) {
                t.preventDefault(), this.previousDragX = this.dragX;
                var n = this.options.rightToLeft ? -1 : 1;
                this.options.wrapAround && (i.x = i.x % this.slideableWidth);
                var r = this.dragStartPosition + i.x * n;
                if (!this.options.wrapAround && this.slides.length) {
                    var s = Math.max(-this.slides[0].target, this.dragStartPosition);
                    r = r > s ? .5 * (r + s) : r;
                    var o = Math.min(-this.getLastSlide().target, this.dragStartPosition);
                    r = r < o ? .5 * (r + o) : r
                }
                this.dragX = r, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", t, [e, i])
            }
        }, r.dragEnd = function (t, e) {
            if (this.isDraggable) {
                this.options.freeScroll && (this.isFreeScrolling = !0);
                var i = this.dragEndRestingSelect();
                if (this.options.freeScroll && !this.options.wrapAround) {
                    var n = this.getRestingPosition();
                    this.isFreeScrolling = -n > this.slides[0].target && -n < this.getLastSlide().target
                } else this.options.freeScroll || i != this.selectedIndex || (i += this.dragEndBoostSelect());
                delete this.previousDragX, this.isDragSelect = this.options.wrapAround, this.select(i), delete this.isDragSelect, this.dispatchEvent("dragEnd", t, [e])
            }
        }, r.dragEndRestingSelect = function () {
            var t = this.getRestingPosition(), e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
                i = this._getClosestResting(t, e, 1), n = this._getClosestResting(t, e, -1);
            return i.distance < n.distance ? i.index : n.index
        }, r._getClosestResting = function (t, e, i) {
            for (var n = this.selectedIndex, r = 1 / 0, s = this.options.contain && !this.options.wrapAround ? function (t, e) {
                return t <= e
            } : function (t, e) {
                return t < e
            }; s(e, r) && (n += i, r = e, null !== (e = this.getSlideDistance(-t, n)));) e = Math.abs(e);
            return {distance: r, index: n - i}
        }, r.getSlideDistance = function (t, e) {
            var i = this.slides.length, r = this.options.wrapAround && i > 1, s = r ? n.modulo(e, i) : e,
                o = this.slides[s];
            if (!o) return null;
            var a = r ? this.slideableWidth * Math.floor(e / i) : 0;
            return t - (o.target + a)
        }, r.dragEndBoostSelect = function () {
            if (void 0 === this.previousDragX || !this.dragMoveTime || new Date - this.dragMoveTime > 100) return 0;
            var t = this.getSlideDistance(-this.dragX, this.selectedIndex), e = this.previousDragX - this.dragX;
            return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0
        }, r.staticClick = function (t, e) {
            var i = this.getParentCell(t.target), n = i && i.element, r = i && this.cells.indexOf(i);
            this.dispatchEvent("staticClick", t, [e, n, r])
        }, r.onscroll = function () {
            var t = l(), e = this.pointerDownScroll.x - t.x, i = this.pointerDownScroll.y - t.y;
            (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone()
        }, e
    }, n = [i(1), i(29), i(0)], void 0 === (r = function (t, e, i) {
        return o(s, t, e, i)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s, o;
    s = window, o = function (t, e) {
        "use strict";

        function i() {
        }

        var n = i.prototype = Object.create(e.prototype);
        n.bindHandles = function () {
            this._bindHandles(!0)
        }, n.unbindHandles = function () {
            this._bindHandles(!1)
        }, n._bindHandles = function (e) {
            for (var i = (e = void 0 === e || e) ? "addEventListener" : "removeEventListener", n = e ? this._touchActionValue : "", r = 0; r < this.handles.length; r++) {
                var s = this.handles[r];
                this._bindStartEvent(s, e), s[i]("click", this), t.PointerEvent && (s.style.touchAction = n)
            }
        }, n._touchActionValue = "none", n.pointerDown = function (t, e) {
            this.okayPointerDown(t) && (this.pointerDownPointer = e, t.preventDefault(), this.pointerDownBlur(), this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]))
        };
        var r = {TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0},
            s = {radio: !0, checkbox: !0, button: !0, submit: !0, image: !0, file: !0};
        return n.okayPointerDown = function (t) {
            var e = r[t.target.nodeName], i = s[t.target.type], n = !e || i;
            return n || this._pointerReset(), n
        }, n.pointerDownBlur = function () {
            var t = document.activeElement;
            t && t.blur && t != document.body && t.blur()
        }, n.pointerMove = function (t, e) {
            var i = this._dragPointerMove(t, e);
            this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i)
        }, n._dragPointerMove = function (t, e) {
            var i = {x: e.pageX - this.pointerDownPointer.pageX, y: e.pageY - this.pointerDownPointer.pageY};
            return !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i
        }, n.hasDragStarted = function (t) {
            return Math.abs(t.x) > 3 || Math.abs(t.y) > 3
        }, n.pointerUp = function (t, e) {
            this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e)
        }, n._dragPointerUp = function (t, e) {
            this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e)
        }, n._dragStart = function (t, e) {
            this.isDragging = !0, this.isPreventingClicks = !0, this.dragStart(t, e)
        }, n.dragStart = function (t, e) {
            this.emitEvent("dragStart", [t, e])
        }, n._dragMove = function (t, e, i) {
            this.isDragging && this.dragMove(t, e, i)
        }, n.dragMove = function (t, e, i) {
            t.preventDefault(), this.emitEvent("dragMove", [t, e, i])
        }, n._dragEnd = function (t, e) {
            this.isDragging = !1, setTimeout(function () {
                delete this.isPreventingClicks
            }.bind(this)), this.dragEnd(t, e)
        }, n.dragEnd = function (t, e) {
            this.emitEvent("dragEnd", [t, e])
        }, n.onclick = function (t) {
            this.isPreventingClicks && t.preventDefault()
        }, n._staticClick = function (t, e) {
            this.isIgnoringMouseUp && "mouseup" == t.type || (this.staticClick(t, e), "mouseup" != t.type && (this.isIgnoringMouseUp = !0, setTimeout(function () {
                delete this.isIgnoringMouseUp
            }.bind(this), 400)))
        }, n.staticClick = function (t, e) {
            this.emitEvent("staticClick", [t, e])
        }, i.getPointerPoint = e.getPointerPoint, i
    }, n = [i(9)], void 0 === (r = function (t) {
        return o(s, t)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i, n) {
        "use strict";
        var r = "http://www.w3.org/2000/svg";

        function s(t, e) {
            this.direction = t, this.parent = e, this._create()
        }

        s.prototype = Object.create(i.prototype), s.prototype._create = function () {
            this.isEnabled = !0, this.isPrevious = -1 == this.direction;
            var t = this.parent.options.rightToLeft ? 1 : -1;
            this.isLeft = this.direction == t;
            var e = this.element = document.createElement("button");
            e.className = "flickity-button flickity-prev-next-button", e.className += this.isPrevious ? " previous" : " next", e.setAttribute("type", "button"), this.disable(), e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
            var i = this.createSVG();
            e.appendChild(i), this.parent.on("select", this.update.bind(this)), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, s.prototype.activate = function () {
            this.bindStartEvent(this.element), this.element.addEventListener("click", this), this.parent.element.appendChild(this.element)
        }, s.prototype.deactivate = function () {
            this.parent.element.removeChild(this.element), this.unbindStartEvent(this.element), this.element.removeEventListener("click", this)
        }, s.prototype.createSVG = function () {
            var t = document.createElementNS(r, "svg");
            t.setAttribute("class", "flickity-button-icon"), t.setAttribute("viewBox", "0 0 100 100");
            var e = document.createElementNS(r, "path"), i = function (t) {
                if ("string" == typeof t) return t;
                return "M " + t.x0 + ",50 L " + t.x1 + "," + (t.y1 + 50) + " L " + t.x2 + "," + (t.y2 + 50) + " L " + t.x3 + ",50  L " + t.x2 + "," + (50 - t.y2) + " L " + t.x1 + "," + (50 - t.y1) + " Z"
            }(this.parent.options.arrowShape);
            return e.setAttribute("d", i), e.setAttribute("class", "arrow"), this.isLeft || e.setAttribute("transform", "translate(100, 100) rotate(180) "), t.appendChild(e), t
        }, s.prototype.handleEvent = n.handleEvent, s.prototype.onclick = function () {
            if (this.isEnabled) {
                this.parent.uiChange();
                var t = this.isPrevious ? "previous" : "next";
                this.parent[t]()
            }
        }, s.prototype.enable = function () {
            this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
        }, s.prototype.disable = function () {
            this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
        }, s.prototype.update = function () {
            var t = this.parent.slides;
            if (this.parent.options.wrapAround && t.length > 1) this.enable(); else {
                var e = t.length ? t.length - 1 : 0, i = this.isPrevious ? 0 : e;
                this[this.parent.selectedIndex == i ? "disable" : "enable"]()
            }
        }, s.prototype.destroy = function () {
            this.deactivate(), this.allOff()
        }, n.extend(e.defaults, {
            prevNextButtons: !0,
            arrowShape: {x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30}
        }), e.createMethods.push("_createPrevNextButtons");
        var o = e.prototype;
        return o._createPrevNextButtons = function () {
            this.options.prevNextButtons && (this.prevButton = new s(-1, this), this.nextButton = new s(1, this), this.on("activate", this.activatePrevNextButtons))
        }, o.activatePrevNextButtons = function () {
            this.prevButton.activate(), this.nextButton.activate(), this.on("deactivate", this.deactivatePrevNextButtons)
        }, o.deactivatePrevNextButtons = function () {
            this.prevButton.deactivate(), this.nextButton.deactivate(), this.off("deactivate", this.deactivatePrevNextButtons)
        }, e.PrevNextButton = s, e
    }, n = [i(1), i(9), i(0)], void 0 === (r = function (t, e, i) {
        return s(0, t, e, i)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i, n) {
        "use strict";

        function r(t) {
            this.parent = t, this._create()
        }

        r.prototype = Object.create(i.prototype), r.prototype._create = function () {
            this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [], this.handleClick = this.onClick.bind(this), this.on("pointerDown", this.parent.childUIPointerDown.bind(this.parent))
        }, r.prototype.activate = function () {
            this.setDots(), this.holder.addEventListener("click", this.handleClick), this.bindStartEvent(this.holder), this.parent.element.appendChild(this.holder)
        }, r.prototype.deactivate = function () {
            this.holder.removeEventListener("click", this.handleClick), this.unbindStartEvent(this.holder), this.parent.element.removeChild(this.holder)
        }, r.prototype.setDots = function () {
            var t = this.parent.slides.length - this.dots.length;
            t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t)
        }, r.prototype.addDots = function (t) {
            for (var e = document.createDocumentFragment(), i = [], n = this.dots.length, r = n + t, s = n; s < r; s++) {
                var o = document.createElement("li");
                o.className = "dot", o.setAttribute("aria-label", "Page dot " + (s + 1)), e.appendChild(o), i.push(o)
            }
            this.holder.appendChild(e), this.dots = this.dots.concat(i)
        }, r.prototype.removeDots = function (t) {
            this.dots.splice(this.dots.length - t, t).forEach(function (t) {
                this.holder.removeChild(t)
            }, this)
        }, r.prototype.updateSelected = function () {
            this.selectedDot && (this.selectedDot.className = "dot", this.selectedDot.removeAttribute("aria-current")), this.dots.length && (this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected", this.selectedDot.setAttribute("aria-current", "step"))
        }, r.prototype.onTap = r.prototype.onClick = function (t) {
            var e = t.target;
            if ("LI" == e.nodeName) {
                this.parent.uiChange();
                var i = this.dots.indexOf(e);
                this.parent.select(i)
            }
        }, r.prototype.destroy = function () {
            this.deactivate(), this.allOff()
        }, e.PageDots = r, n.extend(e.defaults, {pageDots: !0}), e.createMethods.push("_createPageDots");
        var s = e.prototype;
        return s._createPageDots = function () {
            this.options.pageDots && (this.pageDots = new r(this), this.on("activate", this.activatePageDots), this.on("select", this.updateSelectedPageDots), this.on("cellChange", this.updatePageDots), this.on("resize", this.updatePageDots), this.on("deactivate", this.deactivatePageDots))
        }, s.activatePageDots = function () {
            this.pageDots.activate()
        }, s.updateSelectedPageDots = function () {
            this.pageDots.updateSelected()
        }, s.updatePageDots = function () {
            this.pageDots.setDots()
        }, s.deactivatePageDots = function () {
            this.pageDots.deactivate()
        }, e.PageDots = r, e
    }, n = [i(1), i(9), i(0)], void 0 === (r = function (t, e, i) {
        return s(0, t, e, i)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i) {
        "use strict";

        function n(t) {
            this.parent = t, this.state = "stopped", this.onVisibilityChange = this.visibilityChange.bind(this), this.onVisibilityPlay = this.visibilityPlay.bind(this)
        }

        n.prototype = Object.create(t.prototype), n.prototype.play = function () {
            "playing" != this.state && (document.hidden ? document.addEventListener("visibilitychange", this.onVisibilityPlay) : (this.state = "playing", document.addEventListener("visibilitychange", this.onVisibilityChange), this.tick()))
        }, n.prototype.tick = function () {
            if ("playing" == this.state) {
                var t = this.parent.options.autoPlay;
                t = "number" == typeof t ? t : 3e3;
                var e = this;
                this.clear(), this.timeout = setTimeout(function () {
                    e.parent.next(!0), e.tick()
                }, t)
            }
        }, n.prototype.stop = function () {
            this.state = "stopped", this.clear(), document.removeEventListener("visibilitychange", this.onVisibilityChange)
        }, n.prototype.clear = function () {
            clearTimeout(this.timeout)
        }, n.prototype.pause = function () {
            "playing" == this.state && (this.state = "paused", this.clear())
        }, n.prototype.unpause = function () {
            "paused" == this.state && this.play()
        }, n.prototype.visibilityChange = function () {
            this[document.hidden ? "pause" : "unpause"]()
        }, n.prototype.visibilityPlay = function () {
            this.play(), document.removeEventListener("visibilitychange", this.onVisibilityPlay)
        }, e.extend(i.defaults, {pauseAutoPlayOnHover: !0}), i.createMethods.push("_createPlayer");
        var r = i.prototype;
        return r._createPlayer = function () {
            this.player = new n(this), this.on("activate", this.activatePlayer), this.on("uiChange", this.stopPlayer), this.on("pointerDown", this.stopPlayer), this.on("deactivate", this.deactivatePlayer)
        }, r.activatePlayer = function () {
            this.options.autoPlay && (this.player.play(), this.element.addEventListener("mouseenter", this))
        }, r.playPlayer = function () {
            this.player.play()
        }, r.stopPlayer = function () {
            this.player.stop()
        }, r.pausePlayer = function () {
            this.player.pause()
        }, r.unpausePlayer = function () {
            this.player.unpause()
        }, r.deactivatePlayer = function () {
            this.player.stop(), this.element.removeEventListener("mouseenter", this)
        }, r.onmouseenter = function () {
            this.options.pauseAutoPlayOnHover && (this.player.pause(), this.element.addEventListener("mouseleave", this))
        }, r.onmouseleave = function () {
            this.player.unpause(), this.element.removeEventListener("mouseleave", this)
        }, i.Player = n, i
    }, n = [i(2), i(0), i(1)], void 0 === (r = function (t, e, i) {
        return s(t, e, i)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i) {
        "use strict";
        var n = e.prototype;
        return n.insert = function (t, e) {
            var i = this._makeCells(t);
            if (i && i.length) {
                var n = this.cells.length;
                e = void 0 === e ? n : e;
                var r, s, o = (r = i, s = document.createDocumentFragment(), r.forEach(function (t) {
                    s.appendChild(t.element)
                }), s), a = e == n;
                if (a) this.slider.appendChild(o); else {
                    var l = this.cells[e].element;
                    this.slider.insertBefore(o, l)
                }
                if (0 === e) this.cells = i.concat(this.cells); else if (a) this.cells = this.cells.concat(i); else {
                    var h = this.cells.splice(e, n - e);
                    this.cells = this.cells.concat(i).concat(h)
                }
                this._sizeCells(i), this.cellChange(e, !0)
            }
        }, n.append = function (t) {
            this.insert(t, this.cells.length)
        }, n.prepend = function (t) {
            this.insert(t, 0)
        }, n.remove = function (t) {
            var e = this.getCells(t);
            if (e && e.length) {
                var n = this.cells.length - 1;
                e.forEach(function (t) {
                    t.remove();
                    var e = this.cells.indexOf(t);
                    n = Math.min(e, n), i.removeFrom(this.cells, t)
                }, this), this.cellChange(n, !0)
            }
        }, n.cellSizeChange = function (t) {
            var e = this.getCell(t);
            if (e) {
                e.getSize();
                var i = this.cells.indexOf(e);
                this.cellChange(i)
            }
        }, n.cellChange = function (t, e) {
            var i = this.selectedElement;
            this._positionCells(t), this._getWrapShiftCells(), this.setGallerySize();
            var n = this.getCell(i);
            n && (this.selectedIndex = this.getCellSlideIndex(n)), this.selectedIndex = Math.min(this.slides.length - 1, this.selectedIndex), this.emitEvent("cellChange", [t]), this.select(this.selectedIndex), e && this.positionSliderAtSelected()
        }, e
    }, n = [i(1), i(0)], void 0 === (r = function (t, e) {
        return s(0, t, e)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r, s;
    window, s = function (t, e, i) {
        "use strict";
        e.createMethods.push("_createLazyload");
        var n = e.prototype;

        function r(t, e) {
            this.img = t, this.flickity = e, this.load()
        }

        return n._createLazyload = function () {
            this.on("select", this.lazyLoad)
        }, n.lazyLoad = function () {
            var t = this.options.lazyLoad;
            if (t) {
                var e = "number" == typeof t ? t : 0, n = [];
                this.getAdjacentCellElements(e).forEach(function (t) {
                    var e = function (t) {
                        if ("IMG" == t.nodeName) {
                            var e = t.getAttribute("data-flickity-lazyload"),
                                n = t.getAttribute("data-flickity-lazyload-src"),
                                r = t.getAttribute("data-flickity-lazyload-srcset");
                            if (e || n || r) return [t]
                        }
                        var s = t.querySelectorAll("img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]");
                        return i.makeArray(s)
                    }(t);
                    n = n.concat(e)
                }), n.forEach(function (t) {
                    new r(t, this)
                }, this)
            }
        }, r.prototype.handleEvent = i.handleEvent, r.prototype.load = function () {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this);
            var t = this.img.getAttribute("data-flickity-lazyload") || this.img.getAttribute("data-flickity-lazyload-src"),
                e = this.img.getAttribute("data-flickity-lazyload-srcset");
            this.img.src = t, e && this.img.setAttribute("srcset", e), this.img.removeAttribute("data-flickity-lazyload"), this.img.removeAttribute("data-flickity-lazyload-src"), this.img.removeAttribute("data-flickity-lazyload-srcset")
        }, r.prototype.onload = function (t) {
            this.complete(t, "flickity-lazyloaded")
        }, r.prototype.onerror = function (t) {
            this.complete(t, "flickity-lazyerror")
        }, r.prototype.complete = function (t, e) {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
            var i = this.flickity.getParentCell(this.img), n = i && i.element;
            this.flickity.cellSizeChange(n), this.img.classList.add(e), this.flickity.dispatchEvent("lazyLoad", t, n)
        }, e.LazyLoader = r, e
    }, n = [i(1), i(0)], void 0 === (r = function (t, e) {
        return s(0, t, e)
    }.apply(e, n)) || (t.exports = r)
}, function (t, e, i) {
    var n, r;
    !function (s, o) {
        "use strict";
        n = [i(2)], void 0 === (r = function (t) {
            return o(s, t)
        }.apply(e, n)) || (t.exports = r)
    }("undefined" != typeof window ? window : this, function (t, e) {
        "use strict";
        var i = t.jQuery, n = t.console;

        function r(t, e) {
            for (var i in e) t[i] = e[i];
            return t
        }

        var s = Array.prototype.slice;

        function o(t, e, a) {
            if (!(this instanceof o)) return new o(t, e, a);
            var l, h = t;
            ("string" == typeof t && (h = document.querySelectorAll(t)), h) ? (this.elements = (l = h, Array.isArray(l) ? l : "object" == typeof l && "number" == typeof l.length ? s.call(l) : [l]), this.options = r({}, this.options), "function" == typeof e ? a = e : r(this.options, e), a && this.on("always", a), this.getImages(), i && (this.jqDeferred = new i.Deferred), setTimeout(this.check.bind(this))) : n.error("Bad element for imagesLoaded " + (h || t))
        }

        o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
            this.images = [], this.elements.forEach(this.addElementImages, this)
        }, o.prototype.addElementImages = function (t) {
            "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
            var e = t.nodeType;
            if (e && a[e]) {
                for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                    var r = i[n];
                    this.addImage(r)
                }
                if ("string" == typeof this.options.background) {
                    var s = t.querySelectorAll(this.options.background);
                    for (n = 0; n < s.length; n++) {
                        var o = s[n];
                        this.addElementBackgroundImages(o)
                    }
                }
            }
        };
        var a = {1: !0, 9: !0, 11: !0};

        function l(t) {
            this.img = t
        }

        function h(t, e) {
            this.url = t, this.element = e, this.img = new Image
        }

        return o.prototype.addElementBackgroundImages = function (t) {
            var e = getComputedStyle(t);
            if (e) for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                var r = n && n[2];
                r && this.addBackground(r, t), n = i.exec(e.backgroundImage)
            }
        }, o.prototype.addImage = function (t) {
            var e = new l(t);
            this.images.push(e)
        }, o.prototype.addBackground = function (t, e) {
            var i = new h(t, e);
            this.images.push(i)
        }, o.prototype.check = function () {
            var t = this;

            function e(e, i, n) {
                setTimeout(function () {
                    t.progress(e, i, n)
                })
            }

            this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? this.images.forEach(function (t) {
                t.once("progress", e), t.check()
            }) : this.complete()
        }, o.prototype.progress = function (t, e, i) {
            this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && n && n.log("progress: " + i, t, e)
        }, o.prototype.complete = function () {
            var t = this.hasAnyBroken ? "fail" : "done";
            if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                var e = this.hasAnyBroken ? "reject" : "resolve";
                this.jqDeferred[e](this)
            }
        }, l.prototype = Object.create(e.prototype), l.prototype.check = function () {
            this.getIsImageComplete() ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src)
        }, l.prototype.getIsImageComplete = function () {
            return this.img.complete && this.img.naturalWidth
        }, l.prototype.confirm = function (t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
        }, l.prototype.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, l.prototype.onload = function () {
            this.confirm(!0, "onload"), this.unbindEvents()
        }, l.prototype.onerror = function () {
            this.confirm(!1, "onerror"), this.unbindEvents()
        }, l.prototype.unbindEvents = function () {
            this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, h.prototype = Object.create(l.prototype), h.prototype.check = function () {
            this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
        }, h.prototype.unbindEvents = function () {
            this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
        }, h.prototype.confirm = function (t, e) {
            this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
        }, o.makeJQueryPlugin = function (e) {
            (e = e || t.jQuery) && ((i = e).fn.imagesLoaded = function (t, e) {
                return new o(this, t, e).jqDeferred.promise(i(this))
            })
        }, o.makeJQueryPlugin(), o
    })
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.bindUI = function () {
        n.expandButtons = document.querySelectorAll("[data-text-expand-button]");
        for (var t = function (t) {
            n.expandButtons[t].addEventListener("click", function () {
                var e, i;
                e = n.expandButtons[t], (i = e.closest("[data-text-expand]")).classList.contains("is-expanded") ? (e.innerHTML = e.getAttribute("data-off"), i.classList.remove("is-expanded")) : (e.innerHTML = e.getAttribute("data-on"), i.classList.add("is-expanded"))
            })
        }, e = n.expandButtons.length - 1; e >= 0; e--) t(e)
    };
    var n = {expandButtons: null}
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.init = function () {
        if (n.accordions = document.querySelectorAll("[data-accordion-group]"), !n.accordions) return;
        for (var t = n.accordions.length - 1; t >= 0; t--) r(n.accordions[t])
    };
    var n = {accordions: null};

    function r(t) {
        for (var e = t.querySelector("[data-accordion].is-active"), i = t.querySelectorAll("[data-accordion]"), n = function (t) {
            i[t].addEventListener("click", function () {
                i[t] !== e && (i[t].classList.add("is-active"), e.classList.remove("is-active"), (e = i[t]).scrollIntoView({behavior: "smooth"}))
            })
        }, r = i.length - 1; r >= 0; r--) n(r)
    }
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.init = function () {
        for (var t = (o = document.querySelectorAll("[data-embed]")).length - 1; t >= 0; t--) a(o[t])
    };
    var n, r = i(39), s = (n = r) && n.__esModule ? n : {default: n};
    var o = void 0;

    function a(t) {
        var e = t.querySelector("[data-embed-cover]"), i = t.querySelector("iframe"), n = null, r = null;
        i && ("vimeo" === (r = -1 !== i.src.indexOf("vimeo") ? "vimeo" : null) && (n = new s.default(i)), n && n.on("pause", function () {
            e && e.classList.remove("is-hidden")
        })), e && e.addEventListener("click", function () {
            e.classList.add("is-hidden"), n && r && "vimeo" === r && n.play()
        })
    }
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), function (t, i) {
        function n(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
            }
        }

        var r = void 0 !== t && "[object global]" === {}.toString.call(t);

        function s(t, e) {
            return 0 === t.indexOf(e.toLowerCase()) ? t : "".concat(e.toLowerCase()).concat(t.substr(0, 1).toUpperCase()).concat(t.substr(1))
        }

        function o(t) {
            return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(t)
        }

        function a() {
            var t, e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, i = e.id, n = e.url,
                r = i || n;
            if (!r) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
            if (t = r, !isNaN(parseFloat(t)) && isFinite(t) && Math.floor(t) == t) return "https://vimeo.com/".concat(r);
            if (o(r)) return r.replace("http:", "https:");
            if (i) throw new TypeError("“".concat(i, "” is not a valid video id."));
            throw new TypeError("“".concat(r, "” is not a vimeo.com url."))
        }

        var l = void 0 !== Array.prototype.indexOf, h = "undefined" != typeof window && void 0 !== window.postMessage;
        if (!(r || l && h)) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
        var u = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {};
        !function (t) {
            if (!t.WeakMap) {
                var e = Object.prototype.hasOwnProperty, i = function (t, e, i) {
                    Object.defineProperty ? Object.defineProperty(t, e, {
                        configurable: !0,
                        writable: !0,
                        value: i
                    }) : t[e] = i
                };
                t.WeakMap = function () {
                    function t() {
                        if (void 0 === this) throw new TypeError("Constructor WeakMap requires 'new'");
                        if (i(this, "_id", "_WeakMap" + "_" + s() + "." + s()), arguments.length > 0) throw new TypeError("WeakMap iterable is not supported")
                    }

                    function r(t, i) {
                        if (!n(t) || !e.call(t, "_id")) throw new TypeError(i + " method called on incompatible receiver " + typeof t)
                    }

                    function s() {
                        return Math.random().toString().substring(2)
                    }

                    return i(t.prototype, "delete", function (t) {
                        if (r(this, "delete"), !n(t)) return !1;
                        var e = t[this._id];
                        return !(!e || e[0] !== t) && (delete t[this._id], !0)
                    }), i(t.prototype, "get", function (t) {
                        if (r(this, "get"), n(t)) {
                            var e = t[this._id];
                            return e && e[0] === t ? e[1] : void 0
                        }
                    }), i(t.prototype, "has", function (t) {
                        if (r(this, "has"), !n(t)) return !1;
                        var e = t[this._id];
                        return !(!e || e[0] !== t)
                    }), i(t.prototype, "set", function (t, e) {
                        if (r(this, "set"), !n(t)) throw new TypeError("Invalid value used as weak map key");
                        var s = t[this._id];
                        return s && s[0] === t ? (s[1] = e, this) : (i(t, this._id, [t, e]), this)
                    }), i(t, "_polyfill", !0), t
                }()
            }

            function n(t) {
                return Object(t) === t
            }
        }("undefined" != typeof self ? self : "undefined" != typeof window ? window : u);
        var c, f = (function (t) {
            var e, n, r;
            r = function () {
                var t, e, n, r = Object.prototype.toString, s = void 0 !== i ? function (t) {
                    return i(t)
                } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), t = function (t, e, i, n) {
                        return Object.defineProperty(t, e, {value: i, writable: !0, configurable: !1 !== n})
                    }
                } catch (e) {
                    t = function (t, e, i) {
                        return t[e] = i, t
                    }
                }

                function o(t, i) {
                    n.add(t, i), e || (e = s(n.drain))
                }

                function a(t) {
                    var e, i = typeof t;
                    return null == t || "object" != i && "function" != i || (e = t.then), "function" == typeof e && e
                }

                function l() {
                    for (var t = 0; t < this.chain.length; t++) h(this, 1 === this.state ? this.chain[t].success : this.chain[t].failure, this.chain[t]);
                    this.chain.length = 0
                }

                function h(t, e, i) {
                    var n, r;
                    try {
                        !1 === e ? i.reject(t.msg) : (n = !0 === e ? t.msg : e.call(void 0, t.msg)) === i.promise ? i.reject(TypeError("Promise-chain cycle")) : (r = a(n)) ? r.call(n, i.resolve, i.reject) : i.resolve(n)
                    } catch (t) {
                        i.reject(t)
                    }
                }

                function u(t) {
                    var e = this;
                    e.triggered || (e.triggered = !0, e.def && (e = e.def), e.msg = t, e.state = 2, e.chain.length > 0 && o(l, e))
                }

                function c(t, e, i, n) {
                    for (var r = 0; r < e.length; r++) !function (r) {
                        t.resolve(e[r]).then(function (t) {
                            i(r, t)
                        }, n)
                    }(r)
                }

                function f(t) {
                    this.def = t, this.triggered = !1
                }

                function d(t) {
                    if ("function" != typeof t) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var e = new function (t) {
                        this.promise = t, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                    }(this);
                    this.then = function (t, i) {
                        var n = {success: "function" != typeof t || t, failure: "function" == typeof i && i};
                        return n.promise = new this.constructor(function (t, e) {
                            if ("function" != typeof t || "function" != typeof e) throw TypeError("Not a function");
                            n.resolve = t, n.reject = e
                        }), e.chain.push(n), 0 !== e.state && o(l, e), n.promise
                    }, this.catch = function (t) {
                        return this.then(void 0, t)
                    };
                    try {
                        t.call(void 0, function (t) {
                            (function t(e) {
                                var i, n = this;
                                if (!n.triggered) {
                                    n.triggered = !0, n.def && (n = n.def);
                                    try {
                                        (i = a(e)) ? o(function () {
                                            var r = new f(n);
                                            try {
                                                i.call(e, function () {
                                                    t.apply(r, arguments)
                                                }, function () {
                                                    u.apply(r, arguments)
                                                })
                                            } catch (t) {
                                                u.call(r, t)
                                            }
                                        }) : (n.msg = e, n.state = 1, n.chain.length > 0 && o(l, n))
                                    } catch (t) {
                                        u.call(new f(n), t)
                                    }
                                }
                            }).call(e, t)
                        }, function (t) {
                            u.call(e, t)
                        })
                    } catch (t) {
                        u.call(e, t)
                    }
                }

                n = function () {
                    var t, i, n;
                    return {
                        add: function (e, r) {
                            n = new function (t, e) {
                                this.fn = t, this.self = e, this.next = void 0
                            }(e, r), i ? i.next = n : t = n, i = n, n = void 0
                        }, drain: function () {
                            var n = t;
                            for (t = i = e = void 0; n;) n.fn.call(n.self), n = n.next
                        }
                    }
                }();
                var p = t({}, "constructor", d, !1);
                return d.prototype = p, t(p, "__NPO__", 0, !1), t(d, "resolve", function (t) {
                    return t && "object" == typeof t && 1 === t.__NPO__ ? t : new this(function (e, i) {
                        if ("function" != typeof e || "function" != typeof i) throw TypeError("Not a function");
                        e(t)
                    })
                }), t(d, "reject", function (t) {
                    return new this(function (e, i) {
                        if ("function" != typeof e || "function" != typeof i) throw TypeError("Not a function");
                        i(t)
                    })
                }), t(d, "all", function (t) {
                    var e = this;
                    return "[object Array]" != r.call(t) ? e.reject(TypeError("Not an array")) : 0 === t.length ? e.resolve([]) : new e(function (i, n) {
                        if ("function" != typeof i || "function" != typeof n) throw TypeError("Not a function");
                        var r = t.length, s = Array(r), o = 0;
                        c(e, t, function (t, e) {
                            s[t] = e, ++o === r && i(s)
                        }, n)
                    })
                }), t(d, "race", function (t) {
                    var e = this;
                    return "[object Array]" != r.call(t) ? e.reject(TypeError("Not an array")) : new e(function (i, n) {
                        if ("function" != typeof i || "function" != typeof n) throw TypeError("Not a function");
                        c(e, t, function (t, e) {
                            i(e)
                        }, n)
                    })
                }), d
            }, (n = u)[e = "Promise"] = n[e] || r(), t.exports && (t.exports = n[e])
        }(c = {exports: {}}, c.exports), c.exports), d = new WeakMap;

        function p(t, e, i) {
            var n = d.get(t.element) || {};
            e in n || (n[e] = []), n[e].push(i), d.set(t.element, n)
        }

        function m(t, e) {
            return (d.get(t.element) || {})[e] || []
        }

        function _(t, e, i) {
            var n = d.get(t.element) || {};
            if (!n[e]) return !0;
            if (!i) return n[e] = [], d.set(t.element, n), !0;
            var r = n[e].indexOf(i);
            return -1 !== r && n[e].splice(r, 1), d.set(t.element, n), n[e] && 0 === n[e].length
        }

        var g = ["autopause", "autoplay", "background", "byline", "color", "dnt", "height", "id", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "title", "transparent", "url", "width"];

        function v(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
            return g.reduce(function (e, i) {
                var n = t.getAttribute("data-vimeo-".concat(i));
                return (n || "" === n) && (e[i] = "" === n ? 1 : n), e
            }, e)
        }

        function y(t, e) {
            var i = t.html;
            if (!e) throw new TypeError("An element must be provided");
            if (null !== e.getAttribute("data-vimeo-initialized")) return e.querySelector("iframe");
            var n = document.createElement("div");
            return n.innerHTML = i, e.appendChild(n.firstChild), e.setAttribute("data-vimeo-initialized", "true"), e.querySelector("iframe")
        }

        function b(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                i = arguments.length > 2 ? arguments[2] : void 0;
            return new Promise(function (n, r) {
                if (!o(t)) throw new TypeError("“".concat(t, "” is not a vimeo.com url."));
                var s = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(t), "&domain=").concat(window.location.hostname);
                for (var a in e) e.hasOwnProperty(a) && (s += "&".concat(a, "=").concat(encodeURIComponent(e[a])));
                var l = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
                l.open("GET", s, !0), l.onload = function () {
                    if (404 !== l.status) if (403 !== l.status) try {
                        var e = JSON.parse(l.responseText);
                        if (403 === e.domain_status_code) return y(e, i), void r(new Error("“".concat(t, "” is not embeddable.")));
                        n(e)
                    } catch (t) {
                        r(t)
                    } else r(new Error("“".concat(t, "” is not embeddable."))); else r(new Error("“".concat(t, "” was not found.")))
                }, l.onerror = function () {
                    var t = l.status ? " (".concat(l.status, ")") : "";
                    r(new Error("There was an error fetching the embed code from Vimeo".concat(t, ".")))
                }, l.send()
            })
        }

        function w(t) {
            if ("string" == typeof t) try {
                t = JSON.parse(t)
            } catch (t) {
                return console.warn(t), {}
            }
            return t
        }

        function T(t, e, i) {
            if (t.element.contentWindow && t.element.contentWindow.postMessage) {
                var n = {method: e};
                void 0 !== i && (n.value = i);
                var r = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
                r >= 8 && r < 10 && (n = JSON.stringify(n)), t.element.contentWindow.postMessage(n, t.origin)
            }
        }

        function x(t, e) {
            var i, n = [];
            if ((e = w(e)).event) {
                if ("error" === e.event) m(t, e.data.method).forEach(function (i) {
                    var n = new Error(e.data.message);
                    n.name = e.data.name, i.reject(n), _(t, e.data.method, i)
                });
                n = m(t, "event:".concat(e.event)), i = e.data
            } else if (e.method) {
                var r = function (t, e) {
                    var i = m(t, e);
                    if (i.length < 1) return !1;
                    var n = i.shift();
                    return _(t, e, n), n
                }(t, e.method);
                r && (n.push(r), i = e.value)
            }
            n.forEach(function (e) {
                try {
                    if ("function" == typeof e) return void e.call(t, i);
                    e.resolve(i)
                } catch (t) {
                }
            })
        }

        var P = new WeakMap, S = new WeakMap, k = function () {
            function t(e) {
                var i, n = this, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (function (t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }(this, t), window.jQuery && e instanceof jQuery && (e.length > 1 && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), e = e[0]), "undefined" != typeof document && "string" == typeof e && (e = document.getElementById(e)), i = e, !Boolean(i && 1 === i.nodeType && "nodeName" in i && i.ownerDocument && i.ownerDocument.defaultView)) throw new TypeError("You must pass either a valid element or a valid id.");
                var s = e.ownerDocument.defaultView;
                if ("IFRAME" !== e.nodeName) {
                    var l = e.querySelector("iframe");
                    l && (e = l)
                }
                if ("IFRAME" === e.nodeName && !o(e.getAttribute("src") || "")) throw new Error("The player element passed isn’t a Vimeo embed.");
                if (P.has(e)) return P.get(e);
                this.element = e, this.origin = "*";
                var h = new f(function (t, i) {
                    var l = function (e) {
                        if (o(e.origin) && n.element.contentWindow === e.source) {
                            "*" === n.origin && (n.origin = e.origin);
                            var r = w(e.data);
                            if (r && "error" === r.event && r.data && "ready" === r.data.method) {
                                var s = new Error(r.data.message);
                                return s.name = r.data.name, void i(s)
                            }
                            var a = r && "ready" === r.event, l = r && "ping" === r.method;
                            if (a || l) return n.element.setAttribute("data-ready", "true"), void t();
                            x(n, r)
                        }
                    };
                    if (s.addEventListener ? s.addEventListener("message", l, !1) : s.attachEvent && s.attachEvent("onmessage", l), "IFRAME" !== n.element.nodeName) {
                        var h = v(e, r);
                        b(a(h), h, e).then(function (t) {
                            var i, r, s, o = y(t, e);
                            return n.element = o, n._originalElement = e, i = e, r = o, s = d.get(i), d.set(r, s), d.delete(i), P.set(n.element, n), t
                        }).catch(i)
                    }
                });
                return S.set(this, h), P.set(this.element, this), "IFRAME" === this.element.nodeName && T(this, "ping"), this
            }

            var e, i, r;
            return e = t, (i = [{
                key: "callMethod", value: function (t) {
                    var e = this, i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return new f(function (n, r) {
                        return e.ready().then(function () {
                            p(e, t, {resolve: n, reject: r}), T(e, t, i)
                        }).catch(r)
                    })
                }
            }, {
                key: "get", value: function (t) {
                    var e = this;
                    return new f(function (i, n) {
                        return t = s(t, "get"), e.ready().then(function () {
                            p(e, t, {resolve: i, reject: n}), T(e, t)
                        }).catch(n)
                    })
                }
            }, {
                key: "set", value: function (t, e) {
                    var i = this;
                    return new f(function (n, r) {
                        if (t = s(t, "set"), void 0 === e || null === e) throw new TypeError("There must be a value to set.");
                        return i.ready().then(function () {
                            p(i, t, {resolve: n, reject: r}), T(i, t, e)
                        }).catch(r)
                    })
                }
            }, {
                key: "on", value: function (t, e) {
                    if (!t) throw new TypeError("You must pass an event name.");
                    if (!e) throw new TypeError("You must pass a callback function.");
                    if ("function" != typeof e) throw new TypeError("The callback must be a function.");
                    0 === m(this, "event:".concat(t)).length && this.callMethod("addEventListener", t).catch(function () {
                    }), p(this, "event:".concat(t), e)
                }
            }, {
                key: "off", value: function (t, e) {
                    if (!t) throw new TypeError("You must pass an event name.");
                    if (e && "function" != typeof e) throw new TypeError("The callback must be a function.");
                    _(this, "event:".concat(t), e) && this.callMethod("removeEventListener", t).catch(function (t) {
                    })
                }
            }, {
                key: "loadVideo", value: function (t) {
                    return this.callMethod("loadVideo", t)
                }
            }, {
                key: "ready", value: function () {
                    var t = S.get(this) || new f(function (t, e) {
                        e(new Error("Unknown player. Probably unloaded."))
                    });
                    return f.resolve(t)
                }
            }, {
                key: "addCuePoint", value: function (t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return this.callMethod("addCuePoint", {time: t, data: e})
                }
            }, {
                key: "removeCuePoint", value: function (t) {
                    return this.callMethod("removeCuePoint", t)
                }
            }, {
                key: "enableTextTrack", value: function (t, e) {
                    if (!t) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {language: t, kind: e})
                }
            }, {
                key: "disableTextTrack", value: function () {
                    return this.callMethod("disableTextTrack")
                }
            }, {
                key: "pause", value: function () {
                    return this.callMethod("pause")
                }
            }, {
                key: "play", value: function () {
                    return this.callMethod("play")
                }
            }, {
                key: "unload", value: function () {
                    return this.callMethod("unload")
                }
            }, {
                key: "destroy", value: function () {
                    var t = this;
                    return new f(function (e) {
                        S.delete(t), P.delete(t.element), t._originalElement && (P.delete(t._originalElement), t._originalElement.removeAttribute("data-vimeo-initialized")), t.element && "IFRAME" === t.element.nodeName && t.element.parentNode && t.element.parentNode.removeChild(t.element), e()
                    })
                }
            }, {
                key: "getAutopause", value: function () {
                    return this.get("autopause")
                }
            }, {
                key: "setAutopause", value: function (t) {
                    return this.set("autopause", t)
                }
            }, {
                key: "getBuffered", value: function () {
                    return this.get("buffered")
                }
            }, {
                key: "getColor", value: function () {
                    return this.get("color")
                }
            }, {
                key: "setColor", value: function (t) {
                    return this.set("color", t)
                }
            }, {
                key: "getCuePoints", value: function () {
                    return this.get("cuePoints")
                }
            }, {
                key: "getCurrentTime", value: function () {
                    return this.get("currentTime")
                }
            }, {
                key: "setCurrentTime", value: function (t) {
                    return this.set("currentTime", t)
                }
            }, {
                key: "getDuration", value: function () {
                    return this.get("duration")
                }
            }, {
                key: "getEnded", value: function () {
                    return this.get("ended")
                }
            }, {
                key: "getLoop", value: function () {
                    return this.get("loop")
                }
            }, {
                key: "setLoop", value: function (t) {
                    return this.set("loop", t)
                }
            }, {
                key: "getPaused", value: function () {
                    return this.get("paused")
                }
            }, {
                key: "getPlaybackRate", value: function () {
                    return this.get("playbackRate")
                }
            }, {
                key: "setPlaybackRate", value: function (t) {
                    return this.set("playbackRate", t)
                }
            }, {
                key: "getPlayed", value: function () {
                    return this.get("played")
                }
            }, {
                key: "getSeekable", value: function () {
                    return this.get("seekable")
                }
            }, {
                key: "getSeeking", value: function () {
                    return this.get("seeking")
                }
            }, {
                key: "getTextTracks", value: function () {
                    return this.get("textTracks")
                }
            }, {
                key: "getVideoEmbedCode", value: function () {
                    return this.get("videoEmbedCode")
                }
            }, {
                key: "getVideoId", value: function () {
                    return this.get("videoId")
                }
            }, {
                key: "getVideoTitle", value: function () {
                    return this.get("videoTitle")
                }
            }, {
                key: "getVideoWidth", value: function () {
                    return this.get("videoWidth")
                }
            }, {
                key: "getVideoHeight", value: function () {
                    return this.get("videoHeight")
                }
            }, {
                key: "getVideoUrl", value: function () {
                    return this.get("videoUrl")
                }
            }, {
                key: "getVolume", value: function () {
                    return this.get("volume")
                }
            }, {
                key: "setVolume", value: function (t) {
                    return this.set("volume", t)
                }
            }]) && n(e.prototype, i), r && n(e, r), t
        }();
        r || (function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document, e = function (t) {
                "console" in window && console.error && console.error("There was an error creating an embed: ".concat(t))
            };
            [].slice.call(t.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")).forEach(function (t) {
                try {
                    if (null !== t.getAttribute("data-vimeo-defer")) return;
                    var i = v(t);
                    b(a(i), i, t).then(function (e) {
                        return y(e, t)
                    }).catch(e)
                } catch (t) {
                    e(t)
                }
            })
        }(), function () {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document;
            if (!window.VimeoPlayerResizeEmbeds_) {
                window.VimeoPlayerResizeEmbeds_ = !0;
                var e = function (e) {
                    if (o(e.origin) && e.data && "spacechange" === e.data.event) for (var i = t.querySelectorAll("iframe"), n = 0; n < i.length; n++) if (i[n].contentWindow === e.source) {
                        i[n].parentElement.style.paddingBottom = "".concat(e.data.data[0].bottom, "px");
                        break
                    }
                };
                window.addEventListener ? window.addEventListener("message", e, !1) : window.attachEvent && window.attachEvent("onmessage", e)
            }
        }()), e.default = k
    }.call(e, i(3), i(40).setImmediate)
}, function (t, e, i) {
    var n = Function.prototype.apply;

    function r(t, e) {
        this._id = t, this._clearFn = e
    }

    e.setTimeout = function () {
        return new r(n.call(setTimeout, window, arguments), clearTimeout)
    }, e.setInterval = function () {
        return new r(n.call(setInterval, window, arguments), clearInterval)
    }, e.clearTimeout = e.clearInterval = function (t) {
        t && t.close()
    }, r.prototype.unref = r.prototype.ref = function () {
    }, r.prototype.close = function () {
        this._clearFn.call(window, this._id)
    }, e.enroll = function (t, e) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = e
    }, e.unenroll = function (t) {
        clearTimeout(t._idleTimeoutId), t._idleTimeout = -1
    }, e._unrefActive = e.active = function (t) {
        clearTimeout(t._idleTimeoutId);
        var e = t._idleTimeout;
        e >= 0 && (t._idleTimeoutId = setTimeout(function () {
            t._onTimeout && t._onTimeout()
        }, e))
    }, i(41), e.setImmediate = setImmediate, e.clearImmediate = clearImmediate
}, function (t, e, i) {
    (function (t, e) {
        !function (t, i) {
            "use strict";
            if (!t.setImmediate) {
                var n, r, s, o, a, l = 1, h = {}, u = !1, c = t.document,
                    f = Object.getPrototypeOf && Object.getPrototypeOf(t);
                f = f && f.setTimeout ? f : t, "[object process]" === {}.toString.call(t.process) ? n = function (t) {
                    e.nextTick(function () {
                        p(t)
                    })
                } : !function () {
                    if (t.postMessage && !t.importScripts) {
                        var e = !0, i = t.onmessage;
                        return t.onmessage = function () {
                            e = !1
                        }, t.postMessage("", "*"), t.onmessage = i, e
                    }
                }() ? t.MessageChannel ? ((s = new MessageChannel).port1.onmessage = function (t) {
                    p(t.data)
                }, n = function (t) {
                    s.port2.postMessage(t)
                }) : c && "onreadystatechange" in c.createElement("script") ? (r = c.documentElement, n = function (t) {
                    var e = c.createElement("script");
                    e.onreadystatechange = function () {
                        p(t), e.onreadystatechange = null, r.removeChild(e), e = null
                    }, r.appendChild(e)
                }) : n = function (t) {
                    setTimeout(p, 0, t)
                } : (o = "setImmediate$" + Math.random() + "$", a = function (e) {
                    e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(o) && p(+e.data.slice(o.length))
                }, t.addEventListener ? t.addEventListener("message", a, !1) : t.attachEvent("onmessage", a), n = function (e) {
                    t.postMessage(o + e, "*")
                }), f.setImmediate = function (t) {
                    "function" != typeof t && (t = new Function("" + t));
                    for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
                    var r = {callback: t, args: e};
                    return h[l] = r, n(l), l++
                }, f.clearImmediate = d
            }

            function d(t) {
                delete h[t]
            }

            function p(t) {
                if (u) setTimeout(p, 0, t); else {
                    var e = h[t];
                    if (e) {
                        u = !0;
                        try {
                            !function (t) {
                                var e = t.callback, n = t.args;
                                switch (n.length) {
                                    case 0:
                                        e();
                                        break;
                                    case 1:
                                        e(n[0]);
                                        break;
                                    case 2:
                                        e(n[0], n[1]);
                                        break;
                                    case 3:
                                        e(n[0], n[1], n[2]);
                                        break;
                                    default:
                                        e.apply(i, n)
                                }
                            }(e)
                        } finally {
                            d(t), u = !1
                        }
                    }
                }
            }
        }("undefined" == typeof self ? void 0 === t ? this : t : self)
    }).call(e, i(3), i(42))
}, function (t, e) {
    var i, n, r = t.exports = {};

    function s() {
        throw new Error("setTimeout has not been defined")
    }

    function o() {
        throw new Error("clearTimeout has not been defined")
    }

    function a(t) {
        if (i === setTimeout) return setTimeout(t, 0);
        if ((i === s || !i) && setTimeout) return i = setTimeout, setTimeout(t, 0);
        try {
            return i(t, 0)
        } catch (e) {
            try {
                return i.call(null, t, 0)
            } catch (e) {
                return i.call(this, t, 0)
            }
        }
    }

    !function () {
        try {
            i = "function" == typeof setTimeout ? setTimeout : s
        } catch (t) {
            i = s
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : o
        } catch (t) {
            n = o
        }
    }();
    var l, h = [], u = !1, c = -1;

    function f() {
        u && l && (u = !1, l.length ? h = l.concat(h) : c = -1, h.length && d())
    }

    function d() {
        if (!u) {
            var t = a(f);
            u = !0;
            for (var e = h.length; e;) {
                for (l = h, h = []; ++c < e;) l && l[c].run();
                c = -1, e = h.length
            }
            l = null, u = !1, function (t) {
                if (n === clearTimeout) return clearTimeout(t);
                if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                try {
                    n(t)
                } catch (e) {
                    try {
                        return n.call(null, t)
                    } catch (e) {
                        return n.call(this, t)
                    }
                }
            }(t)
        }
    }

    function p(t, e) {
        this.fun = t, this.array = e
    }

    function m() {
    }

    r.nextTick = function (t) {
        var e = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
        h.push(new p(t, e)), 1 !== h.length || u || a(d)
    }, p.prototype.run = function () {
        this.fun.apply(null, this.array)
    }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = m, r.addListener = m, r.once = m, r.off = m, r.removeListener = m, r.removeAllListeners = m, r.emit = m, r.prependListener = m, r.prependOnceListener = m, r.listeners = function (t) {
        return []
    }, r.binding = function (t) {
        throw new Error("process.binding is not supported")
    }, r.cwd = function () {
        return "/"
    }, r.chdir = function (t) {
        throw new Error("process.chdir is not supported")
    }, r.umask = function () {
        return 0
    }
}, function (t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {value: !0}), e.init = function () {
        if (o.grids = document.querySelectorAll("[data-masonry-grid]"), !o.grids) return;
        for (var t = o.grids.length - 1; t >= 0; t--) e = o.grids[t], void 0, new s.default(e, {
            columnWidth: "[data-masonry-sizer]",
            itemSelector: "[data-masonry-item]"
        });
        var e
    };
    var n, r = i(44), s = (n = r) && n.__esModule ? n : {default: n};
    var o = {grids: null}
}, function (t, e, i) {
    var n, r, s, o;
    window, o = function (t, e) {
        "use strict";
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var n = i.prototype;
        return n._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
            for (var t = 0; t < this.cols; t++) this.colYs.push(0);
            this.maxY = 0, this.horizontalColIndex = 0
        }, n.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter, r = this.containerWidth + this.gutter, s = r / n, o = n - r % n;
            s = Math[o && o < 1 ? "round" : "floor"](s), this.cols = Math.max(s, 1)
        }, n.getContainerWidth = function () {
            var t = this._getOption("fitWidth") ? this.element.parentNode : this.element, i = e(t);
            this.containerWidth = i && i.innerWidth
        }, n._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth,
                i = Math[e && e < 1 ? "round" : "ceil"](t.size.outerWidth / this.columnWidth);
            i = Math.min(i, this.cols);
            for (var n = this[this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition"](i, t), r = {
                x: this.columnWidth * n.col,
                y: n.y
            }, s = n.y + t.size.outerHeight, o = i + n.col, a = n.col; a < o; a++) this.colYs[a] = s;
            return r
        }, n._getTopColPosition = function (t) {
            var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
            return {col: e.indexOf(i), y: i}
        }, n._getTopColGroup = function (t) {
            if (t < 2) return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++) e[n] = this._getColGroupY(n, t);
            return e
        }, n._getColGroupY = function (t, e) {
            if (e < 2) return this.colYs[t];
            var i = this.colYs.slice(t, t + e);
            return Math.max.apply(Math, i)
        }, n._getHorizontalColPosition = function (t, e) {
            var i = this.horizontalColIndex % this.cols;
            i = t > 1 && i + t > this.cols ? 0 : i;
            var n = e.size.outerWidth && e.size.outerHeight;
            return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
        }, n._manageStamp = function (t) {
            var i = e(t), n = this._getElementOffset(t), r = this._getOption("originLeft") ? n.left : n.right,
                s = r + i.outerWidth, o = Math.floor(r / this.columnWidth);
            o = Math.max(0, o);
            var a = Math.floor(s / this.columnWidth);
            a -= s % this.columnWidth ? 0 : 1, a = Math.min(this.cols - 1, a);
            for (var l = (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight, h = o; h <= a; h++) this.colYs[h] = Math.max(l, this.colYs[h])
        }, n._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
        }, n._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t != this.containerWidth
        }, i
    }, r = [i(45), i(4)], void 0 === (s = "function" == typeof (n = o) ? n.apply(e, r) : n) || (t.exports = s)
}, function (t, e, i) {
    var n, r;
    !function (s, o) {
        "use strict";
        n = [i(2), i(4), i(0), i(46)], void 0 === (r = function (t, e, i, n) {
            return o(s, t, e, i, n)
        }.apply(e, n)) || (t.exports = r)
    }(window, function (t, e, i, n, r) {
        "use strict";
        var s = t.console, o = t.jQuery, a = function () {
        }, l = 0, h = {};

        function u(t, e) {
            var i = n.getQueryElement(t);
            if (i) {
                this.element = i, o && (this.$element = o(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
                var r = ++l;
                this.element.outlayerGUID = r, h[r] = this, this._create(), this._getOption("initLayout") && this.layout()
            } else s && s.error("Bad element for " + this.constructor.namespace + ": " + (i || t))
        }

        u.namespace = "outlayer", u.Item = r, u.defaults = {
            containerStyle: {position: "relative"},
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        };
        var c = u.prototype;

        function f(t) {
            function e() {
                t.apply(this, arguments)
            }

            return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
        }

        n.extend(c, e.prototype), c.option = function (t) {
            n.extend(this.options, t)
        }, c._getOption = function (t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
        }, u.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, c._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
        }, c.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, c._itemize = function (t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], r = 0; r < e.length; r++) {
                var s = new i(e[r], this);
                n.push(s)
            }
            return n
        }, c._filterFindItemElements = function (t) {
            return n.filterFindElements(t, this.options.itemSelector)
        }, c.getItemElements = function () {
            return this.items.map(function (t) {
                return t.element
            })
        }, c.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, c._init = c.layout, c._resetLayout = function () {
            this.getSize()
        }, c.getSize = function () {
            this.size = i(this.element)
        }, c._getMeasurement = function (t, e) {
            var n, r = this.options[t];
            r ? ("string" == typeof r ? n = this.element.querySelector(r) : r instanceof HTMLElement && (n = r), this[t] = n ? i(n)[e] : r) : this[t] = 0
        }, c.layoutItems = function (t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, c._getItemsForLayout = function (t) {
            return t.filter(function (t) {
                return !t.isIgnored
            })
        }, c._layoutItems = function (t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                var i = [];
                t.forEach(function (t) {
                    var n = this._getItemLayoutPosition(t);
                    n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
                }, this), this._processLayoutQueue(i)
            }
        }, c._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, c._processLayoutQueue = function (t) {
            this.updateStagger(), t.forEach(function (t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e)
            }, this)
        }, c.updateStagger = function () {
            var t = this.options.stagger;
            if (null !== t && void 0 !== t) return this.stagger = function (t) {
                if ("number" == typeof t) return t;
                var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
                if (!i.length) return 0;
                i = parseFloat(i);
                var r = d[n] || 1;
                return i * r
            }(t), this.stagger;
            this.stagger = 0
        }, c._positionItem = function (t, e, i, n, r) {
            n ? t.goTo(e, i) : (t.stagger(r * this.stagger), t.moveTo(e, i))
        }, c._postLayout = function () {
            this.resizeContainer()
        }, c.resizeContainer = function () {
            if (this._getOption("resizeContainer")) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, c._getContainerSize = a, c._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, c._emitCompleteOnItems = function (t, e) {
            var i = this;

            function n() {
                i.dispatchEvent(t + "Complete", null, [e])
            }

            var r = e.length;
            if (e && r) {
                var s = 0;
                e.forEach(function (e) {
                    e.once(t, o)
                })
            } else n();

            function o() {
                ++s == r && n()
            }
        }, c.dispatchEvent = function (t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), o) if (this.$element = this.$element || o(this.element), e) {
                var r = o.Event(e);
                r.type = t, this.$element.trigger(r, i)
            } else this.$element.trigger(t, i)
        }, c.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, c.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, c.stamp = function (t) {
            (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
        }, c.unstamp = function (t) {
            (t = this._find(t)) && t.forEach(function (t) {
                n.removeFrom(this.stamps, t), this.unignore(t)
            }, this)
        }, c._find = function (t) {
            if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)
        }, c._manageStamps = function () {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
        }, c._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, c._manageStamp = a, c._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(), n = this._boundingRect, r = i(t);
            return {
                left: e.left - n.left - r.marginLeft,
                top: e.top - n.top - r.marginTop,
                right: n.right - e.right - r.marginRight,
                bottom: n.bottom - e.bottom - r.marginBottom
            }
        }, c.handleEvent = n.handleEvent, c.bindResize = function () {
            t.addEventListener("resize", this), this.isResizeBound = !0
        }, c.unbindResize = function () {
            t.removeEventListener("resize", this), this.isResizeBound = !1
        }, c.onresize = function () {
            this.resize()
        }, n.debounceMethod(u, "onresize", 100), c.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, c.needsResizeLayout = function () {
            var t = i(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth
        }, c.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, c.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, c.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, c.reveal = function (t) {
            if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function (t, i) {
                    t.stagger(i * e), t.reveal()
                })
            }
        }, c.hide = function (t) {
            if (this._emitCompleteOnItems("hide", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function (t, i) {
                    t.stagger(i * e), t.hide()
                })
            }
        }, c.revealItemElements = function (t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, c.hideItemElements = function (t) {
            var e = this.getItems(t);
            this.hide(e)
        }, c.getItem = function (t) {
            for (var e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.element == t) return i
            }
        }, c.getItems = function (t) {
            var e = [];
            return (t = n.makeArray(t)).forEach(function (t) {
                var i = this.getItem(t);
                i && e.push(i)
            }, this), e
        }, c.remove = function (t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
                t.remove(), n.removeFrom(this.items, t)
            }, this)
        }, c.destroy = function () {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
                t.destroy()
            }), this.unbindResize();
            var e = this.element.outlayerGUID;
            delete h[e], delete this.element.outlayerGUID, o && o.removeData(this.element, this.constructor.namespace)
        }, u.data = function (t) {
            var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
            return e && h[e]
        }, u.create = function (t, e) {
            var i = f(u);
            return i.defaults = n.extend({}, u.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, u.compatOptions), i.namespace = t, i.data = u.data, i.Item = f(r), n.htmlInit(i, t), o && o.bridget && o.bridget(t, i), i
        };
        var d = {ms: 1, s: 1e3};
        return u.Item = r, u
    })
}, function (t, e, i) {
    var n, r, s, o;
    window, o = function (t, e) {
        "use strict";
        var i = document.documentElement.style, n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
            r = "string" == typeof i.transform ? "transform" : "WebkitTransform",
            s = {WebkitTransition: "webkitTransitionEnd", transition: "transitionend"}[n], o = {
                transform: r,
                transition: n,
                transitionDuration: n + "Duration",
                transitionProperty: n + "Property",
                transitionDelay: n + "Delay"
            };

        function a(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }

        var l = a.prototype = Object.create(t.prototype);
        l.constructor = a, l._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, l.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, l.getSize = function () {
            this.size = e(this.element)
        }, l.css = function (t) {
            var e = this.element.style;
            for (var i in t) {
                e[o[i] || i] = t[i]
            }
        }, l.getPosition = function () {
            var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"),
                i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], r = t[i ? "top" : "bottom"],
                s = parseFloat(n), o = parseFloat(r), a = this.layout.size;
            -1 != n.indexOf("%") && (s = s / 100 * a.width), -1 != r.indexOf("%") && (o = o / 100 * a.height), s = isNaN(s) ? 0 : s, o = isNaN(o) ? 0 : o, s -= e ? a.paddingLeft : a.paddingRight, o -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = o
        }, l.layoutPosition = function () {
            var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"),
                n = this.layout._getOption("originTop"), r = i ? "paddingLeft" : "paddingRight",
                s = i ? "left" : "right", o = i ? "right" : "left", a = this.position.x + t[r];
            e[s] = this.getXValue(a), e[o] = "";
            var l = n ? "paddingTop" : "paddingBottom", h = n ? "top" : "bottom", u = n ? "bottom" : "top",
                c = this.position.y + t[l];
            e[h] = this.getYValue(c), e[u] = "", this.css(e), this.emitEvent("layout", [this])
        }, l.getXValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, l.getYValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, l._transitionTo = function (t, e) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, r = t == this.position.x && e == this.position.y;
            if (this.setPosition(t, e), !r || this.isTransitioning) {
                var s = t - i, o = e - n, a = {};
                a.transform = this.getTranslate(s, o), this.transition({
                    to: a,
                    onTransitionEnd: {transform: this.layoutPosition},
                    isCleaning: !0
                })
            } else this.layoutPosition()
        }, l.getTranslate = function (t, e) {
            var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
            return "translate3d(" + (t = i ? t : -t) + "px, " + (e = n ? e : -e) + "px, 0)"
        }, l.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, l.moveTo = l._transitionTo, l.setPosition = function (t, e) {
            this.position.x = parseFloat(t), this.position.y = parseFloat(e)
        }, l._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
        }, l.transition = function (t) {
            if (parseFloat(this.layout.options.transitionDuration)) {
                var e = this._transn;
                for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
                for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
                if (t.from) {
                    this.css(t.from);
                    this.element.offsetHeight;
                    null
                }
                this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
            } else this._nonTransition(t)
        };
        var h = "opacity," + r.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        });
        l.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t, this.css({
                    transitionProperty: h,
                    transitionDuration: t,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(s, this, !1)
            }
        }, l.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t)
        }, l.onotransitionend = function (t) {
            this.ontransitionend(t)
        };
        var u = {"-webkit-transform": "transform"};
        l.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn, i = u[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[i], function (t) {
                    for (var e in t) return !1;
                    return !0
                }(e.ingProperties) && this.disableTransition(), i in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[i]), i in e.onEnd) e.onEnd[i].call(this), delete e.onEnd[i];
                this.emitEvent("transitionEnd", [this])
            }
        }, l.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(s, this, !1), this.isTransitioning = !1
        }, l._removeStyles = function (t) {
            var e = {};
            for (var i in t) e[i] = "";
            this.css(e)
        };
        var c = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
        return l.removeTransitionStyles = function () {
            this.css(c)
        }, l.stagger = function (t) {
            t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
        }, l.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
        }, l.remove = function () {
            n && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                this.removeElem()
            }), this.hide()) : this.removeElem()
        }, l.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, l.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal")
        }, l.getHideRevealTransitionEndProperty = function (t) {
            var e = this.layout.options[t];
            if (e.opacity) return "opacity";
            for (var i in e) return i
        }, l.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, l.onHideTransitionEnd = function () {
            this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
        }, l.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, a
    }, r = [i(2), i(4)], void 0 === (s = "function" == typeof (n = o) ? n.apply(e, r) : n) || (t.exports = s)
}, function (t, e) {
    void 0 !== t && void 0 !== t.exports && (t.exports = function (t) {
        "use strict";
        var e = navigator.userAgent.indexOf("Edge/") >= 0, i = new Image, n = "object-fit" in i.style && !e,
            r = "object-position" in i.style && !e, s = /(object-fit|object-position)\s*:\s*([-\w\s%]+)/g;

        function o(t) {
            for (var e = getComputedStyle(t).fontFamily, i = null, n = {}; null !== (i = s.exec(e));) n[i[1]] = i[2];
            return n["object-position"] ? (~(r = n)["object-position"].indexOf("left") ? r["object-position-x"] = "left" : ~r["object-position"].indexOf("right") ? r["object-position-x"] = "right" : r["object-position-x"] = "center", ~r["object-position"].indexOf("top") ? r["object-position-y"] = "top" : ~r["object-position"].indexOf("bottom") ? r["object-position-y"] = "bottom" : r["object-position-y"] = "center", r) : n;
            var r
        }

        function a(t, e) {
            if ("fill" !== e["object-fit"]) {
                var i = t.style, n = window.getComputedStyle(t), r = document.createElement("object-fit");
                r.appendChild(t.parentNode.replaceChild(r, t));
                var s = {
                    height: "100%",
                    width: "100%",
                    boxSizing: "content-box",
                    display: "inline-block",
                    overflow: "hidden"
                };
                "backgroundColor backgroundImage borderColor borderStyle borderWidth bottom fontSize lineHeight left opacity margin position right top visibility".replace(/\w+/g, function (t) {
                    s[t] = n[t]
                });
                for (var o in s) r.style[o] = s[o];
                i.border = i.margin = i.padding = 0, i.display = "block", i.opacity = 1, t.addEventListener("loadedmetadata", a), window.addEventListener("optimizedResize", a), t.readyState >= 1 && (t.removeEventListener("loadedmetadata", a), a())
            }

            function a() {
                var n = t.videoWidth / t.videoHeight, s = r.clientWidth, o = r.clientHeight, a = s / o, l = 0, h = 0;
                i.marginLeft = i.marginTop = 0, (n < a ? "contain" === e["object-fit"] : "cover" === e["object-fit"]) ? (l = o * n, h = s / n, i.width = Math.round(l) + "px", i.height = o + "px", "left" === e["object-position-x"] ? i.marginLeft = 0 : "right" === e["object-position-x"] ? i.marginLeft = Math.round(s - l) + "px" : i.marginLeft = Math.round((s - l) / 2) + "px") : (h = s / n, i.width = s + "px", i.height = Math.round(h) + "px", "top" === e["object-position-y"] ? i.marginTop = 0 : "bottom" === e["object-position-y"] ? i.marginTop = Math.round(o - h) + "px" : i.marginTop = Math.round((o - h) / 2) + "px"), t.autoplay && t.play()
            }
        }

        n && r || (function (t) {
            var e = -1;
            t ? "length" in t || (t = [t]) : t = document.querySelectorAll("video");
            for (; t[++e];) {
                var i = o(t[e]);
                (i["object-fit"] || i["object-position"]) && (i["object-fit"] = i["object-fit"] || "fill", a(t[e], i))
            }
        }(t), function (t, e, i) {
            i = i || window;
            var n = !1, r = null;
            try {
                r = new CustomEvent(e)
            } catch (t) {
                (r = document.createEvent("Event")).initEvent(e, !0, !0)
            }
            i.addEventListener(t, function () {
                n || (n = !0, requestAnimationFrame(function () {
                    i.dispatchEvent(r), n = !1
                }))
            })
        }("resize", "optimizedResize"))
    })
}, function (t, e, i) {
    var n, r, s;
    r = [], void 0 === (s = "function" == typeof (n = function () {
        "use strict";

        function t() {
            var t = document.createElement("div");
            t.style.cssText = "position: fixed; top: 0; bottom: 0;", document.documentElement.insertBefore(t, document.documentElement.firstChild);
            var e = document.createElement("div");
            e.style.cssText = "position: fixed; top: 0; height: 100vh", document.documentElement.insertBefore(e, document.documentElement.firstChild);
            var i = t.offsetHeight, n = e.offsetHeight - i;
            return document.documentElement.removeChild(t), document.documentElement.removeChild(e), n
        }

        function e(t, e) {
            document.documentElement.style.setProperty("--" + t, e + "px")
        }

        return function (i) {
            i = "string" == typeof i ? i : "vh-offset";
            var n = t();
            return !!n && (e(i, n), window.addEventListener("orientationchange", function () {
                var n = t();
                e(i, n)
            }, !1), !0)
        }
    }) ? n.apply(e, r) : n) || (t.exports = s)
}]);