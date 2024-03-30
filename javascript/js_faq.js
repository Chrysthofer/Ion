document.addEventListener("DOMContentLoaded", function () {
    var n = document.querySelectorAll(".panel");
    n.forEach(function (e) {
        e.addEventListener("change", function () {
            n.forEach(function (n) {
                n !== e && (n.checked = !1);
            });
        });
    });
    var e = 0,
        t = new IntersectionObserver(
            function (n, t) {
                n.forEach(function (n) {
                    if (n.isIntersecting) {
                        var o, r;
                        (o = document.getElementById("viewsCounter")),
                            (r = setInterval(function () {
                                (e += 23.4) >= 3500 && (clearInterval(r), (e = 3500)), (o.textContent = Math.round(e));
                            }, 1)),
                            t.disconnect();
                    }
                });
            },
            { root: null, rootMargin: "0px", threshold: 0.1 }
        ),
        o = document.getElementById("thanks");
    t.observe(o);
});
