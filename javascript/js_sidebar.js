document.addEventListener("DOMContentLoaded", function () {
    let e = document.getElementById("navcheck"),
        t = document.querySelector("nav");
    document.getElementById("content");
    let n = document.getElementById("language-link");
    n.addEventListener("click", function (e) {
        e.preventDefault();
    });
    let c = 0,
        i = 0,
        o = !1;
    function d() {
        e.checked = !0;
    }
    function l() {
        e.checked = !1;
    }
    document.addEventListener("touchstart", function (e) {
        (c = e.touches[0].clientX), (i = e.touches[0].clientY), (o = !1);
    }),
        document.addEventListener("touchmove", function (e) {
            let t = e.touches[0].clientX,
                n = e.touches[0].clientY,
                l = t - c,
                u = n - i;
            Math.abs(l) > Math.abs(u) && l > 100 && !o && (d(), (o = !0));
        }),
        document.addEventListener("touchend", function (t) {
            if (!o) {
                let n = t.changedTouches[0].clientX,
                    i = Math.abs(n - c);
                i < 10 && (e.checked = !e.checked);
            }
            o = !1;
        });
    let u = document.getElementById("menuButton");
    u &&
        u.addEventListener("click", function () {
            e.checked ? l() : d();
        }),
        document.addEventListener("touchstart", function (e) {
            t && !t.contains(e.target) && u && !u.contains(e.target) && l();
        }),
        document.addEventListener("touchend", function (t) {
            if (!o) {
                let n = t.changedTouches[0].clientX,
                    i = Math.abs(n - c);
                i < 10 && (e.checked = !e.checked);
            }
            o = !1;
        });
    let r = document.querySelectorAll("nav a");
    r.forEach((t) => {
    if (t.id !== "articles") {
        t.addEventListener("click", function (t) {
            t.preventDefault();
            let n = this.getAttribute("href").substring(1),
                c = document.getElementById(n);
            c &&
                (c.scrollIntoView({ behavior: "smooth" }),
                setTimeout(() => {
                    e.checked = !1;
                }, 300));
        });
        }
    }),
        window.addEventListener("scroll", function () {
            (function e(t) {
                if (!t) return !1;
                let n = t.getBoundingClientRect();
                return n.top >= 0 && n.left >= 0 && n.bottom <= (window.innerHeight || document.documentElement.clientHeight) && n.right <= (window.innerWidth || document.documentElement.clientWidth);
            })(document.getElementById("content")) &&
                setTimeout(() => {
                    e.checked = !1;
                }, 1e3);
        });
    
});
