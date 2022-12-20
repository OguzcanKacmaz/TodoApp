let guncellenecekId;
let ul = document.getElementById("gorevList");
let txtGorevAdi = document.getElementById("gorevAdi");
let btnEkle = document.getElementById("btnEkle");
document.getElementById("btnEkle").addEventListener("click", gorevEkle);
document.getElementById("btnTemizle").addEventListener("click", gorevleriTemizle);
txtGorevAdi.addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        document.getElementById("btnEkle").click();
    }
});
let gorevListesi = [{ "id": 1, "görevAdi": "Görev 1", "durum": "Aktif" }]
// if (localStorage.getItem("gorevListesi") != null) {
//     gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
// }
// gorevleriGetir();
function gorevEkle() {
    if (btnEkle.innerText == "Güncelle") {
        gorevListesi.find(x => x.id == guncellenecekId).gorevAdi = txtGorevAdi.value;
        txtGorevAdi.value = "";
        btnEkle.innerText = "Ekle";
        btnEkle.classList.remove("btn-primary");
        btnEkle.classList.add("btn-warning");
        gorevleriGetir();
    }
    else {
        if (txtGorevAdi.value != "") {
            gorevListesi.push({ "id": gorevListesi.length + 1, "gorevAdi": txtGorevAdi.value, "durum": "Aktif" });
            txtGorevAdi.value = "";
            gorevleriGetir();
        }
        else {
            alert("Görev Adını Boş Bırakmayınız.");
        }
    }
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
}

function gorevleriTemizle() {
    gorevListesi.splice(0, gorevListesi.length);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    gorevleriGetir();
}

function gorevSil(id) {
    let silinecekId;
    silinecekId = gorevListesi.findIndex(x => x.id == id);
    gorevListesi.splice(silinecekId, 1);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    gorevleriGetir();
}
function gorevGuncelle(id, gorevAdi) {
    txtGorevAdi.value = gorevAdi;
    btnEkle.innerText = "Güncelle";
    btnEkle.classList.remove("btn-warning");
    btnEkle.classList.add("btn-primary");
    guncellenecekId = id;
}
function durumGuncelle(durumCheck) {
    let label = durumCheck.nextElementSibling;
    let durum;
    if (durumCheck.checked) {
        label.classList.add("checked");
        durum = "Pasif";
    }
    else {
        label.classList.remove("checked");
        durum = "Aktif";
    }

    for (const gorev of gorevListesi) {

        if (gorev.id == durumCheck.parentElement.id) {
            gorev.durum = durum;
            localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
            break;
        }
    }
}
function gorevleriGetir() {

    if (gorevListesi.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0'>Görev Listesi Boş</p>"
    }
    else {
        ul.innerHTML = "";
        for (const gorev of gorevListesi) {
            let gorevDurum = gorev.durum == "Pasif" ? "checked" : "";
            let li = `<li class="gorev list-group-item p-2 d-flex justify-content-between align-items-center">
        <form id="${gorev.id}">
            <input class="form-check-input" ${gorevDurum} onclick="durumGuncelle(this)" type="checkbox" id="gorevCheck">
            <label class="form-check-label ${gorevDurum}" for="gorevCheck">${gorev.gorevAdi}</label>
        </form>
        <div class="dropdown float-end">
            <button class="btn btn-link dropdown-toggle text-dark " type="button"
                data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-ellipsis"></i>
            </button>
            <ul class="dropdown-menu">
                <li><a onclick="gorevSil(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-trash"></i> Sil</a></li>
                <li><a onclick="gorevGuncelle(${gorev.id},'${gorev.gorevAdi}')" class="dropdown-item" href="#"><i class="fa-solid fa-pen"></i> Güncelle</a>
                </li>
            </ul>
        </div>
        </li>
        `;
            ul.insertAdjacentHTML("beforeend", li);
        }
    }
}

console.log(txtGorevAdi.value);