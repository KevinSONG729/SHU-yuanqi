Component({
    externalClasses: [ "wux-class" ],
    properties: {
        defaultValue: {
            type: String,
            value: ""
        },
        value: {
            type: String,
            value: "",
            observer: function(t) {
                this.data.controlled && this.updated(t);
            }
        },
        placeholder: {
            type: String,
            value: "搜索"
        },
        placeholderStyle: {
            type: String,
            value: ""
        },
        placeholderClass: {
            type: String,
            value: "input-placeholder"
        },
        disabled: {
            type: Boolean,
            value: !1
        },
        maxlength: {
            type: Number,
            value: 140
        },
        cursorSpacing: {
            type: Number,
            value: 11
        },
        focus: {
            type: Boolean,
            value: !1,
            observer: function(t) {
                this.setData({
                    inputFocus: t
                });
            }
        },
        confirmType: {
            type: String,
            value: "search"
        },
        confirmHold: {
            type: Boolean,
            value: !1
        },
        cursor: {
            type: Number,
            value: -1
        },
        selectionStart: {
            type: Number,
            value: -1
        },
        selectionEnd: {
            type: Number,
            value: -1
        },
        adjustPosition: {
            type: Boolean,
            value: !0
        },
        clear: {
            type: Boolean,
            value: !1
        },
        cancelText: {
            type: String,
            value: "取消"
        },
        showCancel: {
            type: Boolean,
            value: !1
        },
        controlled: {
            type: Boolean,
            value: !1
        }
    },
    data: {
        inputValue: "",
        inputFocus: !1
    },
    methods: {
        updated: function(t) {
            this.data.inputValue !== t && this.setData({
                inputValue: t
            });
        },
        onChange: function(t) {
            this.data.controlled || this.updated(t.detail.value), this.data.inputFocus || this.setData({
                inputFocus: !0
            }), this.triggerEvent("change", t.detail);
        },
        onFocus: function(t) {
            this.setData({
                inputFocus: !0
            }), this.triggerEvent("focus", t.detail);
        },
        onBlur: function(t) {
            this.setData({
                inputFocus: !1
            }), this.triggerEvent("blur", t.detail);
        },
        onConfirm: function(t) {
            this.triggerEvent("confirm", t.detail);
        },
        onClear: function() {
            var t = this.data, e = t.controlled, a = t.inputValue;
            this.setData({
                inputValue: e ? a : "",
                inputFocus: !0
            }), this.triggerEvent("clear", {
                value: ""
            });
        },
        onCancel: function() {
            this.triggerEvent("cancel", {
                value: this.data.inputValue
            });
        },
        onClick: function() {
            this.data.disabled || this.setData({
                inputFocus: !0
            });
        }
    },
    attached: function() {
        var t = this.data, e = t.defaultValue, a = t.value, n = t.controlled ? a : e;
        this.updated(n);
    }
});