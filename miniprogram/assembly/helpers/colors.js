Object.defineProperty(exports, "__esModule", {
    value: !0
});

var colors = exports.colors = {
    light: "#ddd",
    stable: "#b2b2b2",
    positive: "#387ef5",
    calm: "#11c1f3",
    balanced: "#33cd5f",
    energized: "#ffc900",
    assertive: "#ef473a",
    royal: "#886aea",
    dark: "#444"
}, isPresetColor = exports.isPresetColor = function(e) {
    return !!e && (colors[e] ? colors[e] : e);
};