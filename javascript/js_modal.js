document.addEventListener("DOMContentLoaded", function() {
    var e = {
        aboutPopup: "https://www.nipscern.com/licenses.html",
        docPopup: "https://github.com/nipscernlab/websapho/raw/main/files/documentation.pdf",
        dowPopup: "https://github.com/nipscernlab/sapho/archive/refs/heads/main.zip",
        contPopup: "mailto:contact@nipscern.com"
    };
    if (1 === performance.navigation.type) {
        sessionStorage.clear();
    }
    document.querySelectorAll(".primary").forEach(function(o) {
        o.addEventListener("click", function(t) {
            t.preventDefault();
            var a, i = o.querySelector("a").getAttribute("href").substring(1);
            if (((a = i), "true" !== sessionStorage.getItem(a))) {
                console.log("Opening modal:", i);
                var n = document.getElementById(i);
                if (n) {
                    n.style.opacity = "1";
                    n.style.visibility = "visible";
                    r = i;
                    sessionStorage.setItem(r, "true");
                    console.log("Modal opened successfully.");
                    var r, l = n.querySelector(".close-button");
                    l ? l.addEventListener("click", function(e) {
                        e.preventDefault(), n.style.opacity = "0", n.style.visibility = "hidden", console.log("Modal closed.")
                    }) : console.log("Error: Close button not found inside the modal.")
                } else console.log("Error: Modal not found.")
            } else console.log("Modal has already been opened. Cannot open again.");
            if (e[i]) {
                if (e[i].startsWith("mailto:")) {
                    window.location.href = e[i];
                } else {
                    var c = document.createElement("a");
                    c.href = e[i];
                    if (i === 'aboutPopup') { // Check if the link is aboutPopup
                        c.target = "_blank"; // Apply target="_blank" only for aboutPopup
                    }
                    c.download = "";
                    c.click();
                }
            }
        })
    })
})
