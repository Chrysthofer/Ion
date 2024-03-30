document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        let e = document.querySelector(".top");
        window.pageYOffset > window.innerHeight ? ((e.style.opacity = "1"), (e.style.pointerEvents = "auto")) : ((e.style.opacity = "0"), (e.style.pointerEvents = "none")),
            window.pageYOffset > 50 && ((e.style.opacity = "1"), (e.style.pointerEvents = "auto"));
    }),
        document.querySelector(".top").addEventListener("click", function (e) {
            e.preventDefault();
            let t = document.querySelector("body");
            t.scrollIntoView({ behavior: "smooth", block: "start" });
        });
});
