//Henter wrapper og output-main
const detailTop = document.getElementById("wrapper");
const outputMain = document.getElementById("output-main");

// Hvis det ligger noe i arrayet output dette
if (localStorage.length > 0) {

    let caseDetails = JSON.parse(localStorage.getItem("caseDetails"));
    let status = "";
    let statusValue = "";

    // Hvis saken er uløst/løst gi variabel verdi som tilsvarer dette
    if (caseDetails.solved === false) {
        statusValue = "Sett til løst";
        status = "<p class='status-color-red'>Uløst</p>";
    } else {
        statusValue = "Sett til uløst";
        status = "<p class='status-color-green'>Løst</p>";
    }

    // HTML kode i template literals med objektvariabler for å hente ut ønskede verdier
    let title = `<div class='col-12 page-top'><h1 class='page-title'>Detaljer for sak ID-${caseDetails.caseId}</h1><input type="button" id="status-solved-btn" class="btn" onclick="caseSolved(${caseDetails.caseId})" value="${statusValue}"></div>`;
    let details = `<article class="case-div case-single item-box col-12 grid">
                <div id="singlecase-top" class="case-box-top col-12"><h1>ID-${caseDetails.caseId}</h1><h1>${caseDetails.date}</h1></div>
   
            <div class="col-12 col-md-6 grid-2 border-right single-case-container">
                    <div class="col-12"><h1 class="undertitle">Status</h1></div>
                    <div class="col-12 title-spacer" id="status-top"><h2>${status}</h2></div>
                    <div class="col-12"><h1 class="undertitle">Kategori</h1></div>
                    <div class="col-12 title-spacer"><h2>${caseDetails.category}</h2></div>
                    <div class="col-12"><h1 class="undertitle">Tittel</h1></div>
                    <div class="col-12 title-spacer"><h1 class="single-case-title">${caseDetails.title}</h1></div>
                    <div class="col-12"><h1 class="undertitle">Beskrivelse</h1></div>
                    <div class="col-12 title-spacer"><p>${caseDetails.description}</p></div></div>

            <div class="col-12 col-md-6 grid image-container">
                    <div class="col-12 col-md-12"><img class="details-img" src="img/${caseDetails.image}" alt="Bilde for sak ID-${caseDetails.caseId} med tittelen ${caseDetails.title}"></div>
            </div>
                    <div class="col-12 case-box-bottom">
                   <input type="button" id="go-back-btn" class="btn" value="Gå tilbake"></div>
            </article>`;


    outputMain.innerHTML = title + details;

    //Gi "gå tilbake" knapp funksjon for å gå tilbake
    getBackBtn = document.getElementById("go-back-btn")
    getBackBtn.addEventListener("click", function () {
        window.history.go(-1);
    });

}
// Hvis ingen sak er i arrayet output dette
else {
    outputMain.innerHTML = "<div class='col-12 no-cases'>Ingen sak er valgt</div>";
}

// Funksjon som endrer status fra uløst til løst
const caseSolved = (theId) => {

    let caseList = JSON.parse(localStorage.getItem("caseList"));
    const caseId = caseList.findIndex((caseObj => caseObj.caseId === theId));

    let caseDetails = JSON.parse(localStorage.getItem("caseDetails"));

    const getBtn = document.getElementById("status-solved-btn");
    const getStatusTop = document.getElementById("status-top");

    // Hvis saken settes til uløst/løst, endre verdien i localstorage og endre knappens verdi
    if (caseDetails.solved === false) {
        caseDetails.solved = true;
        localStorage.setItem("caseDetails", JSON.stringify(caseDetails));
        caseList[caseId].solved = true;
        localStorage.setItem("caseList", JSON.stringify(caseList));

        getBtn.value = "Sett til uløst";
        getStatusTop.innerHTML = "<p class='status-color-green'>Løst</p>";

    } else {

        caseDetails.solved = false;
        localStorage.setItem("caseDetails", JSON.stringify(caseDetails));
        caseList[caseId].solved = false;
        localStorage.setItem("caseList", JSON.stringify(caseList));

        getBtn.value = "Sett til løst";
        getStatusTop.innerHTML = "<p class='status-color-red'>Uløst</p>";

    }
    
}