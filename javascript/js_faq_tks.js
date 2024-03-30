document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".accordion-item").forEach(function (e) {
        e.querySelector(".accordion-link").addEventListener("click", function (o) {
            o.preventDefault();
            var r = e.querySelector(".answer"),
                t = e.querySelector(".icon"),
                n = e.querySelector(".icon");
            r.style.maxHeight
                ? ((r.style.maxHeight = null), t.classList.remove("ion-md-arrow-up"), n.classList.add("ion-md-arrow-down"))
                : ((r.style.maxHeight = r.scrollHeight + "px"), t.classList.add("ion-md-arrow-up"), n.classList.remove("ion-md-arrow-down"));
        });
    });
});
