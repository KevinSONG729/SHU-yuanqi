var BitByte = require("./8BitByte"), RSBlock = require("./RSBlock"), BitBuffer = require("./BitBuffer"), util = require("./util"), Polynomial = require("./Polynomial");

function QRCode(t, e) {
    this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, 
    this.dataCache = null, this.dataList = [];
}

var proto = QRCode.prototype;

proto.addData = function(t) {
    var e = new BitByte(t);
    this.dataList.push(e), this.dataCache = null;
}, proto.isDark = function(t, e) {
    if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e) throw new Error(t + "," + e);
    return this.modules[t][e];
}, proto.getModuleCount = function() {
    return this.moduleCount;
}, proto.make = function() {
    if (this.typeNumber < 1) {
        var t = 1;
        for (t = 1; t < 40; t++) {
            for (var e = RSBlock.getRSBlocks(t, this.errorCorrectLevel), o = new BitBuffer(), r = 0, i = 0; i < e.length; i++) r += e[i].dataCount;
            for (i = 0; i < this.dataList.length; i++) {
                var n = this.dataList[i];
                o.put(n.mode, 4), o.put(n.getLength(), util.getLengthInBits(n.mode, t)), n.write(o);
            }
            if (o.getLengthInBits() <= 8 * r) break;
        }
        this.typeNumber = t;
    }
    this.makeImpl(!1, this.getBestMaskPattern());
}, proto.makeImpl = function(t, e) {
    this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);
    for (var o = 0; o < this.moduleCount; o++) {
        this.modules[o] = new Array(this.moduleCount);
        for (var r = 0; r < this.moduleCount; r++) this.modules[o][r] = null;
    }
    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), 
    this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), 
    this.setupTimingPattern(), this.setupTypeInfo(t, e), 7 <= this.typeNumber && this.setupTypeNumber(t), 
    null == this.dataCache && (this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), 
    this.mapData(this.dataCache, e);
}, proto.setupPositionProbePattern = function(t, e) {
    for (var o = -1; o <= 7; o++) if (!(t + o <= -1 || this.moduleCount <= t + o)) for (var r = -1; r <= 7; r++) e + r <= -1 || this.moduleCount <= e + r || (this.modules[t + o][e + r] = 0 <= o && o <= 6 && (0 == r || 6 == r) || 0 <= r && r <= 6 && (0 == o || 6 == o) || 2 <= o && o <= 4 && 2 <= r && r <= 4);
}, proto.getBestMaskPattern = function() {
    for (var t = 0, e = 0, o = 0; o < 8; o++) {
        this.makeImpl(!0, o);
        var r = util.getLostPoint(this);
        (0 == o || r < t) && (t = r, e = o);
    }
    return e;
}, proto.createMovieClip = function(t, e, o) {
    var r = t.createEmptyMovieClip(e, o);
    this.make();
    for (var i = 0; i < this.modules.length; i++) for (var n = 1 * i, u = 0; u < this.modules[i].length; u++) {
        var s = 1 * u;
        this.modules[i][u] && (r.beginFill(0, 100), r.moveTo(s, n), r.lineTo(s + 1, n), 
        r.lineTo(s + 1, n + 1), r.lineTo(s, n + 1), r.endFill());
    }
    return r;
}, proto.setupTimingPattern = function() {
    for (var t = 8; t < this.moduleCount - 8; t++) null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
    for (var e = 8; e < this.moduleCount - 8; e++) null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
}, proto.setupPositionAdjustPattern = function() {
    for (var t = util.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++) for (var o = 0; o < t.length; o++) {
        var r = t[e], i = t[o];
        if (null == this.modules[r][i]) for (var n = -2; n <= 2; n++) for (var u = -2; u <= 2; u++) this.modules[r + n][i + u] = -2 == n || 2 == n || -2 == u || 2 == u || 0 == n && 0 == u;
    }
}, proto.setupTypeNumber = function(t) {
    for (var e = util.getBCHTypeNumber(this.typeNumber), o = 0; o < 18; o++) {
        var r = !t && 1 == (e >> o & 1);
        this.modules[Math.floor(o / 3)][o % 3 + this.moduleCount - 8 - 3] = r;
    }
    for (o = 0; o < 18; o++) {
        r = !t && 1 == (e >> o & 1);
        this.modules[o % 3 + this.moduleCount - 8 - 3][Math.floor(o / 3)] = r;
    }
}, proto.setupTypeInfo = function(t, e) {
    for (var o = this.errorCorrectLevel << 3 | e, r = util.getBCHTypeInfo(o), i = 0; i < 15; i++) {
        var n = !t && 1 == (r >> i & 1);
        i < 6 ? this.modules[i][8] = n : i < 8 ? this.modules[i + 1][8] = n : this.modules[this.moduleCount - 15 + i][8] = n;
    }
    for (i = 0; i < 15; i++) {
        n = !t && 1 == (r >> i & 1);
        i < 8 ? this.modules[8][this.moduleCount - i - 1] = n : i < 9 ? this.modules[8][15 - i - 1 + 1] = n : this.modules[8][15 - i - 1] = n;
    }
    this.modules[this.moduleCount - 8][8] = !t;
}, proto.mapData = function(t, e) {
    for (var o = -1, r = this.moduleCount - 1, i = 7, n = 0, u = this.moduleCount - 1; 0 < u; u -= 2) for (6 == u && u--; ;) {
        for (var s = 0; s < 2; s++) if (null == this.modules[r][u - s]) {
            var l = !1;
            n < t.length && (l = 1 == (t[n] >>> i & 1)), util.getMask(e, r, u - s) && (l = !l), 
            this.modules[r][u - s] = l, -1 == --i && (n++, i = 7);
        }
        if ((r += o) < 0 || this.moduleCount <= r) {
            r -= o, o = -o;
            break;
        }
    }
}, QRCode.PAD0 = 236, QRCode.PAD1 = 17, QRCode.createData = function(t, e, o) {
    for (var r = RSBlock.getRSBlocks(t, e), i = new BitBuffer(), n = 0; n < o.length; n++) {
        var u = o[n];
        i.put(u.mode, 4), i.put(u.getLength(), util.getLengthInBits(u.mode, t)), u.write(i);
    }
    var s = 0;
    for (n = 0; n < r.length; n++) s += r[n].dataCount;
    if (i.getLengthInBits() > 8 * s) throw new Error("code length overflow. (" + i.getLengthInBits() + ">" + 8 * s + ")");
    for (i.getLengthInBits() + 4 <= 8 * s && i.put(0, 4); i.getLengthInBits() % 8 != 0; ) i.putBit(!1);
    for (;!(i.getLengthInBits() >= 8 * s || (i.put(QRCode.PAD0, 8), i.getLengthInBits() >= 8 * s)); ) i.put(QRCode.PAD1, 8);
    return QRCode.createBytes(i, r);
}, QRCode.createBytes = function(t, e) {
    for (var o = 0, r = 0, i = 0, n = new Array(e.length), u = new Array(e.length), s = 0; s < e.length; s++) {
        var l = e[s].dataCount, a = e[s].totalCount - l;
        r = Math.max(r, l), i = Math.max(i, a), n[s] = new Array(l);
        for (var h = 0; h < n[s].length; h++) n[s][h] = 255 & t.buffer[h + o];
        o += l;
        var d = util.getErrorCorrectPolynomial(a), m = new Polynomial(n[s], d.getLength() - 1).mod(d);
        u[s] = new Array(d.getLength() - 1);
        for (h = 0; h < u[s].length; h++) {
            var f = h + m.getLength() - u[s].length;
            u[s][h] = 0 <= f ? m.get(f) : 0;
        }
    }
    var g = 0;
    for (h = 0; h < e.length; h++) g += e[h].totalCount;
    var p = new Array(g), C = 0;
    for (h = 0; h < r; h++) for (s = 0; s < e.length; s++) h < n[s].length && (p[C++] = n[s][h]);
    for (h = 0; h < i; h++) for (s = 0; s < e.length; s++) h < u[s].length && (p[C++] = u[s][h]);
    return p;
}, module.exports = QRCode;