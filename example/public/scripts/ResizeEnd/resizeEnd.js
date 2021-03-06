/*!
 * jQuery resizeend - A jQuery plugin that allows for window resize-end event handling.
 *
 * Copyright (c) 2015 Erik Nielsen
 *
 * Licensed under the MIT license:
 *    http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *    http://312development.com
 *
 * Version:  0.2.0
 *
 */

!function (a) {
  var b = window.Chicago || {
      utils: {
        now: Date.now || function () {
          return (new Date).getTime()
        }, uid: function (a) {
          return (a || "id") + b.utils.now() + "RAND" + Math.ceil(1e5 * Math.random())
        }, is: {
          number: function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
          }, fn: function (a) {
            return "function" == typeof a
          }, object: function (a) {
            return "[object Object]" === Object.prototype.toString.call(a)
          }
        }, debounce: function (a, b, c) {
          var d;
          return function () {
            var e = this, f = arguments, g = function () {
              d = null, c || a.apply(e, f)
            }, h = c && !d;
            d && clearTimeout(d), d = setTimeout(g, b), h && a.apply(e, f)
          }
        }
      }, $: window.jQuery || null
    };
  if ("function" == typeof define && define.amd && define("chicago", function () {
      return b.load = function (a, c, d, e) {
        var f = a.split(","), g = [],
          h = (e.config && e.config.chicago && e.config.chicago.base ? e.config.chicago.base : "").replace(/\/+$/g, "");
        if (!h)throw new Error("Please define base path to jQuery resize.end in the requirejs config.");
        for (var i = 0; i < f.length;) {
          var j = f[i].replace(/\./g, "/");
          g.push(h + "/" + j), i += 1
        }
        c(g, function () {
          d(b)
        })
      }, b
    }), window && window.jQuery)return a(b, window, window.document);
  if (!window.jQuery)throw new Error("jQuery resize.end requires jQuery")
}(function (a, b, c) {
  a.$win = a.$(b), a.$doc = a.$(c), a.events || (a.events = {}), a.events.resizeend = {
    defaults: {delay: 250},
    setup: function () {
      var b, c = arguments, d = {delay: a.$.event.special.resizeend.defaults.delay};
      a.utils.is.fn(c[0]) ? b = c[0] : a.utils.is.number(c[0]) ? d.delay = c[0] : a.utils.is.object(c[0]) && (d = a.$.extend({}, d, c[0]));
      var e = a.utils.uid("resizeend"), f = a.$.extend({delay: a.$.event.special.resizeend.defaults.delay}, d), g = f,
        h = function (b) {
          g && clearTimeout(g), g = setTimeout(function () {
            return g = null, b.type = "resizeend.chicago.dom", a.$(b.target).trigger("resizeend", b)
          }, f.delay)
        };
      return a.$(this).data("chicago.event.resizeend.uid", e), a.$(this).on("resize", a.utils.debounce(h, 100)).data(e, h)
    },
    teardown: function () {
      var b = a.$(this).data("chicago.event.resizeend.uid");
      return a.$(this).off("resize", a.$(this).data(b)), a.$(this).removeData(b), a.$(this).removeData("chicago.event.resizeend.uid")
    }
  }, function () {
    a.$.event.special.resizeend = a.events.resizeend, a.$.fn.resizeend = function (b, c) {
      return this.each(function () {
        a.$(this).on("resizeend", b, c)
      })
    }
  }()
});