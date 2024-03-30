document.addEventListener("DOMContentLoaded", function () {
    var e = { 
        aboutPopup: "https://www.nipscern.com/license.html", 
        docPopup: "https://github.com/nipscernlab/websapho/raw/main/files/documentation.pdf", 
        dowPopup: "https://github.com/nipscernlab/sapho/archive/refs/heads/main.zip", 
        contPopup: "mailto:contact@nipscern.com" 
    };

    1 === performance.navigation.type && sessionStorage.clear();

    document.querySelectorAll(".primary").forEach(function (o) {
        o.addEventListener("click", function (t) {
            t.preventDefault();
            var a,
                i = o.querySelector("a").getAttribute("href").substring(1);
            if (((a = i), "true" !== sessionStorage.getItem(a))) {
                console.log("Abrindo modal:", i);
                var n = document.getElementById(i);
                if (n) {
                    (n.style.opacity = "1"), (n.style.visibility = "visible"), (r = i), sessionStorage.setItem(r, "true"), console.log("Modal aberto com sucesso.");
                    var r,
                        l = n.querySelector(".close-button");
                    l
                        ? l.addEventListener("click", function (e) {
                            e.preventDefault(), (n.style.opacity = "0"), (n.style.visibility = "hidden"), console.log("Modal fechado.");
                        })
                        : console.log("Erro: Botão de fechar não encontrado dentro do modal.");
                } else console.log("Erro: Modal não encontrado.");
            } else console.log("Modal já foi aberto. Não é possível abrir novamente.");
            if (e[i]) {
                if (e[i].startsWith("mailto:")) window.location.href = e[i];
                else {
                    var c = document.createElement("a");
                    c.href = e[i];
                    c.target = "_blank"; // Adicionando o atributo target
                    c.download = "";
                    c.click();
                }
            }
        });
    });
});
