﻿function NumberToNumberString(e) { e = (e = (e = (e = (e = (e = (e += "").replace(",", "")).replace(",", "")).replace(",", "")).replace(",", "")).replace(",", "")).replace(",", ""), x = e.split("."), 1 == x.length ? x = e.split("/") : x = e.split("."), x1 = x[0], x2 = x.length > 1 ? "/" + x[1] : ""; for (var t = /(\d+)(\d{3})/; t.test(x1);)x1 = x1.replace(t, "$1,$2"); return x1 + x2 } function SlashToDot(e) { return e.replace(/,/g, "").replace("/", ".") } function DotToSlash(e) { return e.replace(".", "/") } $("input.int").keydown(function (e) { e.ctrlKey ? 45 != e.keyCode && 67 != e.keyCode && 86 != e.keyCode && e.preventDefault() : e.shiftKey ? 9 != e.keyCode && 37 != e.keyCode && 39 != e.keyCode && 45 != e.keyCode && e.preventDefault() : 8 == e.keyCode || 9 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 46 == e.keyCode || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.preventDefault() }), $(".NumberString").keyup(function () {
    var e = this.value; e = (e = (e = (e = (e = (e = (e += "").replace(",", "")).replace(",", "")).replace(",", "")).replace(",", "")).replace(",", "")).replace(",", ""), x = e.split("/"), x1 = x[0], x2 = x.length > 1 ? "/" + x[1] : "";
    for (var t = /(\d+)(\d{3})/; t.test(x1);)x1 = x1.replace(t, "$1,$2"); this.value = x1 + x2
}), $("input.float").keyup(function (e) { this.value = NumberToNumberString(this.value) }),
    $("input.float").keydown(function (e) {
        e.ctrlKey ? 45 != e.keyCode && 67 != e.keyCode && 86 != e.keyCode && e.preventDefault() : e.shiftKey ? 9 != e.keyCode && 37 != e.keyCode && 39 != e.keyCode && 45 != e.keyCode && e.preventDefault() : 8 == e.keyCode || 9 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 46 == e.keyCode || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.preventDefault(),
        110 != e.keyCode && 190 != e.keyCode && 111 != e.keyCode && 191 != e.keyCode || (this.value = this.value + String.fromCharCode(47))
    }), $("input.string").keypress(function (e) { 39 == (e.charCode || e.keyCode || 0) && e.preventDefault() }),
    $("textarea.string").keypress(function (e) { 39 == (e.charCode || e.keyCode || 0) && e.preventDefault() }),
    $("input.date").keydown(function (e) { e.ctrlKey ? 45 != e.keyCode && 67 != e.keyCode && 86 != e.keyCode && e.preventDefault() : e.shiftKey ? 9 != e.keyCode && 37 != e.keyCode && 39 != e.keyCode && 45 != e.keyCode && e.preventDefault() : 8 == e.keyCode || 9 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 46 == e.keyCode || 111 == e.keyCode || 191 == e.keyCode || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.preventDefault() }),
    $("input.date").keydown(function (e) { e.ctrlKey ? 45 != e.keyCode && 67 != e.keyCode && 86 != e.keyCode && e.preventDefault() : e.shiftKey ? 9 != e.keyCode && 37 != e.keyCode && 39 != e.keyCode && 45 != e.keyCode && e.preventDefault() : 8 == e.keyCode || 9 == e.keyCode || 37 == e.keyCode || 39 == e.keyCode || 46 == e.keyCode || 111 == e.keyCode || 191 == e.keyCode || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.preventDefault() }),
    $("input.login").keypress(function (e) { 0 != e.keyCode && 32 != e.keyCode || e.preventDefault() }), $("input.digits").keyup(function (e) { e.which >= 37 && e.which <= 40 && e.preventDefault(); var t = $(this), o = t.val().replace(/,/g, ""); t.val(o.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")) }), $(".pdate").on("keypress", function (e) { var t = String.fromCharCode(e.keyCode); if ($("div").text(e.keyCode), !(t >= "0" && t <= "9" || "/" == t || "," == t || "-" == t)) return !1; if ("," == t || "-" == t) { var o = $(this).val(), d = this.selectionStart; return o = o.slice(0, d) + "/" + o.slice(d, o.length), $(this).val(o), this.selectionStart = d + 1, this.selectionEnd = d + 1, !1 } }), String.prototype.toEnglishDigit = function () { for (var e, t = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"], o = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], d = this, y = 0; y < t.length; y++)e = new RegExp(t[y], "g"), d = d.replace(e, o[y]); return d };