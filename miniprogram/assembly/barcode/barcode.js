var EAN13, pluginName;

pluginName = null, EAN13 = function() {
    function t(t, i, e, s) {
        var n;
        if (this.id = t, this.number = i, this.ctx = s, this.settings = {
            width: 200,
            height: 100,
            number: !0,
            prefix: !0,
            color: "black",
            debug: !1,
            onValid: function() {},
            onInvalid: function() {},
            onSuccess: function() {},
            onError: function() {}
        }, e) for (n in e) this.settings[n] = e[n];
        this._name = pluginName, this.init();
    }
    return t.prototype.settings = {}, t.prototype.init = function() {
        var t, i;
        return 12 === this.number.length && (t = this.generateCheckDigit(this.number), this.number += t), 
        13 === this.number.length ? (this.validate() ? this.settings.onValid.call() : this.settings.onInvalid.call(), 
        i = this.getCode(), this.draw(i)) : this.settings.onError.call();
    }, t.prototype.getCode = function() {
        var t, i, e, s, n, r, h;
        for (n = [ "0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011" ], 
        r = [ "0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111" ], 
        h = [ "1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100" ], 
        i = "", t = [ "xxxxxx", "xxyxyy", "xxyyxy", "xxyyyx", "xyxxyy", "xyyxxy", "xyyyxx", "xyxyxy", "xyxyyx", "xyyxyx" ][parseInt(this.number.substr(0, 1), 10)].split(""), 
        s = this.number.substr(1).split(""), e = 0; e < 6; ) "x" === t[e] ? i += n[s[e]] : i += r[s[e]], 
        e++;
        for (e = 6; e < 12; ) i += h[s[e]], e++;
        return i;
    }, t.prototype.clear = function(t) {
        return t.clearRect(0, 0, this.settings.width, this.settings.height);
    }, t.prototype.draw = function(t) {
        var e, s, i, n, r, h, o, f, l, u, x, c, g, a;
        if (h = {
            prefix_offset: .06,
            font_stretch: .073,
            border_line_height_number: .9,
            border_line_height: 1,
            line_height: .9,
            font_size: .15,
            font_y: 1.03,
            text_offset: 4.5
        }, x = this.settings.prefix ? this.settings.width - this.settings.width * h.prefix_offset : this.settings.width, 
        this.settings.number ? (e = h.border_line_height_number * this.settings.height, 
        i = h.line_height * e) : i = e = h.border_line_height * this.settings.height, r = x / 95, 
        this.id) {
            for (s = wx.createCanvasContext(this.id, this.ctx), this.clear(s), s.setFillStyle(this.settings.color), 
            o = this.settings.number && this.settings.prefix ? this.settings.width * h.prefix_offset : 0, 
            f = t.split(""), s.fillRect(o, 0, r, e), o += 2 * r, s.fillRect(o, 0, r, e), o += r, 
            n = 0; n < 42; ) "1" === f[n] && s.fillRect(o, 0, Math.floor(r) + 1, i), o += r, 
            n++;
            for (o += r, s.fillRect(o, 0, r, e), o += 2 * r, s.fillRect(o, 0, r, e), o += 2 * r, 
            n = 42; n < 84; ) "1" === f[n] && s.fillRect(o, 0, Math.floor(r) + 1, i), o += r, 
            n++;
            if (s.fillRect(o, 0, r, e), o += 2 * r, s.fillRect(o, 0, r, e), this.settings.number && (s.setFontSize(h.font_size * i + "px monospace"), 
            u = this.number.substr(0, 1), this.settings.prefix && s.fillText(u, 0, e * h.font_y), 
            l = r * h.text_offset + (this.settings.prefix ? h.prefix_offset * this.settings.width : 0), 
            this.number.substr(1, 6).split("").forEach(function(t, i) {
                return s.fillText(t, l, e * h.font_y), l += h.font_stretch * x;
            }), l = 49 * r + (this.settings.prefix ? h.prefix_offset * this.settings.width : 0) + h.text_offset, 
            this.number.substr(7).split("").forEach(function(t, i) {
                return s.fillText(t, l, e * h.font_y), l += h.font_stretch * x;
            })), this.settings.debug) for (c = g = 0, a = 2 * r; 0 < a ? g <= x : x <= g; c = g += a) s.beginPath(), 
            s.rect(c, .4 * i, r, .1 * i), s.setFillStyle("red"), s.fill();
            return s.draw(), this.settings.onSuccess.call();
        }
        return this.settings.onError.call();
    }, t.prototype.generateCheckDigit = function(t) {
        var e;
        return e = 0, t.split("").forEach(function(t, i) {
            return e += i % 2 == 0 ? parseInt(t, 10) : 3 * parseInt(t, 10);
        }), 10 - e % 10 % 10;
    }, t.prototype.validate = function() {
        return parseInt(this.number.slice(-1), 10) === this.generateCheckDigit(this.number.slice(0, -1));
    }, t;
}(), "undefined" != typeof module && void 0 !== module.exports && (module.exports = EAN13);