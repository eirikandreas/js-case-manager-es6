// Returnerer div elementer med Id som injiseres
const getDivId = (id) => {
    return document.getElementById(id);
}
// Returnerer div elementer med klassenavn som injiseres
const getClass = (caseClass) => {
    return document.querySelector(caseClass);
}

/*  Initialiserende */
let idNumber = 0;

const addBoxBtn = getDivId("add-box-btn");
const outputMain = getDivId("output-main");

let caseListArr = JSON.parse(localStorage.getItem('caseList')) || [];
let caseDetailArr = JSON.parse(localStorage.getItem('caseDetails')) || [];
let caseSolvedArr = JSON.parse(localStorage.getItem('caseSolved')) || [];


// Funksjon som viser Ny sak dialogboksen og sender verdiene til funksjonen setCase() når du trykker opprett
const newCase = () => {
    let newCase = document.createElement("article");
    newCase.setAttribute("id", "new-case-modal");
    newCase.setAttribute("class", "new-case item-box-new col-12-new grid");
    newCase.innerHTML = `<div class="col-12 case-box-top"><h1>Opprett ny sak</h1></div>
    <div class="col-12 grid new-case-container">
        <div class="col-12 col-md-2">Tittel</div><div class="col-12 col-md-10"><input type="text" id="caseInputTitle" placeholder="Tittel"></div>
        
        
        <div class="col-12 col-md-2">
        Kategori
        </div>
        
        <div class="col-12 col-md-10">
        <select id="caseInputCat">
        <option value="0">-</option>
        <option value="1">Narkotika</option>
        <option value="2">Trafikk</option>
        <option value="3">Vold</option>
        <option value="4">Vinning</option>
        <option value="5">Økonomi</option>
        <option value="6">Annet</option>
        </select>

        </div>
        <div class="col-12 col-md-2">Beskrivelse</div><div class="col-12 col-md-10"><textarea id="caseInputDesc" rows="4" cols="50" placeholder="Beskrivelse av saken"></textarea></div>
        <div class="col-12 col-md-2">Bilde</div><div class="col-12 col-md-10"><input type="text" id="caseInputImg" placeholder="bildenavn.filendelse"><p class="notify-p">*Bildet må legges i IMG mappen for å vises.</div>
       
       <div class="col-12"><input id="submit-case-btn" class="btn" type="button" value="Opprett" class="btn" onclick="setCase()">
 
   <input id="cancel-case-btn" class="btn" type="button" value="Avbryt" class="btn"></div>
   </div>
        `;

    outputMain.appendChild(newCase);

}

// Bilde funksjon, dersom saksbilde verdien ved opprettelse av ny sak eller ved redigering er tomt, gi default bilde
const caseImg = (imgUrl) => {
    if (imgUrl == null || imgUrl == "") {
        return "default.jpg";
    } else {
        return document.getElementById("caseInputImg").value;
    }
}

// Hent verdiene som er skrevet i inputfeltene ved ny sak inn i localstorage
const setCase = () => {

    let caseTitle = getDivId("caseInputTitle");
    let getCategory = getDivId("caseInputCat");

    let catId = getCategory.options[getCategory.selectedIndex].value;
    let caseCat = getCategory.options[getCategory.selectedIndex].text;

    let caseDesc = getDivId("caseInputDesc");
    let caseDate = new Date().toLocaleDateString();
    let getImage = document.getElementById("caseInputImg").value;
    let caseIsSolved = false;
    let caseIsFeatured = false;

    // Sjekker arrayet for idnummer
    caseListArr.map(function (caseObj) {
        if (caseObj.caseId > idNumber) {
            idNumber = caseObj.caseId;

        }
    });
    // Gir visuell tilbakemelding om at felt skrevet i ny sak dialogboksen ikke har verdi
    if (caseTitle === null || caseTitle.value === "" || catId === "0" || caseDesc.value === null || caseDesc.value === "") {

        if (caseTitle.value === null || caseTitle.value === "") {

            caseTitle.style.borderColor = "#eb3636";

        } else if (catId === "0") {

            getCategory.style.borderColor = "#eb3636";

        } else if (caseDesc.value === null || caseDesc.value === "") {

            caseDesc.style.borderColor = "#eb3636";

        }

    } else {

        // Lager et objekt basert på verdiene i inputfeltene 
        let caseObj = {
            caseId: idNumber + 1,
            date: caseDate,
            title: caseTitle.value,
            category: caseCat,
            description: caseDesc.value,
            image: caseImg(getImage),
            solved: caseIsSolved,
            isFeatured: caseIsFeatured
        };

        // Setter objektet i arrayet
        caseListArr.push(caseObj);

        // Setter objektet i localstorage
        localStorage.setItem("caseList", JSON.stringify(caseListArr));

        createCase();
    }

}

// Funksjon som setter en valgt saks detaljer i localstorage med egen key
const setDetails = (num) => {
    let caseList = JSON.parse(localStorage.getItem("caseList"));
    const caseDetails = caseList.find(caseObj => caseObj.caseId === num);

    if ("caseDetails" in localStorage) {
        localStorage.removeItem("caseDetails");
        localStorage.setItem("caseDetails", JSON.stringify(caseDetails));
    } else {
        localStorage.setItem("caseDetails", JSON.stringify(caseDetails));
    }
    
    // Sender brukeren videre til detaljer siden
    let url = "detaljer.html";
    window.location = url;
}

// Oppretter alle sakene
const createCase = () => {


    let getPageTitle = getDivId("page-title");

    getPageTitle.innerHTML = `Alle saker (${caseListArr.length})`;

    let getSubmenuBtn = getDivId("submenu-btn");
    getSubmenuBtn.innerHTML = `<input id="add-box-btn" class="btn" type="button" value="Opprett sak">`

    getSubmenuBtn.addEventListener("click", newCase);

    if (caseListArr.length > 0) {
        let status = "";
        let caseLiItem = "";
        let classTester = "";


        // For hver sak som ligger i arrayet lag følgende html elementer
        caseListArr.forEach(caseObj => {

            // Sjekk om saken er løst eller ikke løst og gi visuell tilbakemelding
            if (caseObj.solved == true) {
                status = "<p class='status-color-green'>Løst</p>";
                classTester = "border-green";
            } else {
                status = "<p class='status-color-red'>Uløst</p>";
                classTester = "border-red";
            }


            caseLiItem += `
  
        
                            <li value="${caseObj.caseId}" id="case-box-${caseObj.caseId}" class="item-list col-12 col-xs-12 col-s-12 col-md-12 grid-2 ${classTester}">
                            <div class="col-12 col-xs-2 col-s-1 col-md-1 display li-case">${status}</div>
                            <div class="col-1 col-xs-2 col-s-1 col-md-1 li-case display"><h1>${caseObj.caseId}</h1></div>
                        
                            <div class="col-5 col-xs-5 col-s-3 col-md-3 li-case"><p>${caseObj.title}</p></div>
                            <div class="col-4 col-xs-3 col-s-2 col-md-2 li-case"><p>${caseObj.category}</p></div>
                            <div class="col-2 col-xs-2 col-s-2 col-md-2 li-case display"><p>${caseObj.date}</p></div>
                            
                            <div class="col-12 col-xs-4 col-s-3 col-md-3 case-list-nav display">
                            <button onclick="setDetails(${caseObj.caseId})" class="icon-btn item-btn"><i class="material-icons">find_in_page</i></button>
                            <button onclick="editCase(${caseObj.caseId})" id="totop" class="icon-btn item-btn"><i class="material-icons">create</i></button>
                            <button onclick="alertBox(${caseObj.caseId})" id="remove-case-btn" class="icon-btn item-btn"><i class="material-icons">clear</i></button>
            
                            </div>
                            <div id="mobile-toggle" class="col-2 case-list-nav-mobile display-mobile">
                            <button onclick="toggleMobileNav(${caseObj.caseId})" id="mobile-nav-toggle-${caseObj.caseId}" class="item-btn" value="closed"><i class="material-icons">expand_more</i></button>
                            </div>
                            <div id="mobile-nav-${caseObj.caseId}" class="col-12">
                        
                            </div>
                            </li>
       
    
         
         
             `;



        });

        outputMain.innerHTML = `
                                <div class="list-page col-12 grid-2"><div id='list-index' class='col-12 grid-2'>
                                <div class="col-4 col-s-1 col-md-1 display">Status</div>
                                <div class="col-1 col-s-1 col-md-1 display">Id</div>
                            
                                <div class="col-5 col-s-3 col-md-3">Tittel</div>
                                <div class="col-4 col-s-2 col-md-2">Kategori</div>
                                <div class="col-2 col-s-2 col-md-2 display">Opprettet</div>

                                
                                </div>
                                
                                <ul id='list-view' class='col-12 grid-2'>
     
     
                                 ${caseLiItem}</ul></div>
            `;
    // Hvis det ikke er noen saker i arrayet, output dette
    } else {
        outputMain.innerHTML = "<div class='col-12 no-cases'>Ingen saker er registrert</div>";
    }

}


// Funksjon som injiserer en dropdown mobilmeny i sakslisten. x er sak ID slik at hver knapp får unik id
const toggleMobileNav = (x) => {
    let getNavDiv = getDivId("mobile-nav-" + x);
    let getButton = getDivId("mobile-nav-toggle-" + x)

    if (getButton.value == "closed") {
        getNavDiv.innerHTML = ` <div id="mobnavbox-${x}" class="mobile-nav-menu">
                                <button onclick="setDetails(${x})" class="icon-btn item-btn"><i class="material-icons">find_in_page</i></button>
                                <button onclick="editCase(${x})" id="totop" class="icon-btn item-btn"><i class="material-icons">create</i></button>
                                <button onclick="clearCase(${x})" id="remove-case-btn item-btn" class="icon-btn item-btn"><i class="material-icons">clear</i></button>
                                </div>`;

        getButton.innerHTML = `<i class="material-icons">expand_less</i>`;
        getButton.value = "open"

    } else {
        let getMobNavBox = getDivId("mobnavbox-" + x);
        getMobNavBox.remove();
        getButton.innerHTML = `<i class="material-icons">expand_more</i>`;
        getButton.value = "closed"
    }

}

// Funksjon som outputer om saken er løst eller ikke løst basert på verdien som er sprøytet inn
const caseSolvedStatus = (isSolved) => {
    let solvedSection = getDivId("solved-cases");
    let unsolvedSection = getDivId("unsolved-cases");

    if (caseListArr.length > 0) {

        let caseList = JSON.parse(localStorage.getItem("caseList"));
        let html = "";
        let status = "";


        caseListArr.forEach(caseObj => {
            //Hvis sak er løst, gi visuell indikator
            if (caseObj.solved == true) {
                status = "<p class='status-color-green'>Løst</p>";
            } else {
                status = "<p class='status-color-red'>Uløst</p>";
            }
            // For hvert objekt som er løst eller uløst basert på injisert verdi, skap følgende
            if (caseObj.solved == isSolved)
                html += `<article id="case-box-${caseObj.caseId}" class="item-box col-12 col-xs-6 col-s-5 col-md-4">
                         <div class="case-box-top"><h1>ID-${caseObj.caseId}</h1><h1>${caseObj.date}</h1></div>
                         <div class="case-box-alt"><h1 class="cat-item">${caseObj.category}</h2> <h1>${status}</h1></div>
                         <div class="case-box-alt"><h1 class="case-box-title">${caseObj.title}</h1></div>
                         <div class="case-box-alt"></div>
                         <img src="img/${caseObj.image}" alt="Bilde for sak ID-${caseObj.caseId} med tittelen ${caseObj.title}">
                         <div class="case-nav">

                         <button onclick="setDetails(${caseObj.caseId})" class="icon-btn"><i class="material-icons">find_in_page</i></button>
                         </div>
                         </article> 
         `;

        });
        // Saker som er løst blir puttet i egen div med overskrift
        if (isSolved == true) {

            solvedSection.innerHTML = "<div class='col-12'><h1 class='page-title'>Løste saker</h1></div>" + html;

        // Saker som er uløst blir puttet i egen div med overskrift
        } else {

            unsolvedSection.innerHTML = "<div class='col-12'><h1 class='page-title'>Uløste saker</h1></div>" + html;
        }

    } else {
        outputMain.innerHTML = "<div class='col-12 no-cases'>Ingen saker er registrert</div>";
    }
}

// Funksjon som skaper en dialogboks for brukeren
const alertBox = (x) => {
    let alertBoxOverlay = document.createElement("div");
    alertBoxOverlay.style.position = "fixed";
    alertBoxOverlay.style.top = "0px";
    alertBoxOverlay.style.width = "100%";
    alertBoxOverlay.style.height = "100%";
    alertBoxOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
    document.body.appendChild(alertBoxOverlay);

    let alertBox = document.createElement("div");
    alertBox.style.position = "absolute";
    alertBox.style.top = "20%";
    alertBox.style.left = "50%";
    alertBox.style.marginLeft = "-160px";
    alertBox.style.height = "220px";
    alertBox.style.width = "320px";
    alertBox.style.backgroundColor = "#1c1c25";
    alertBox.style.border = "5px solid rgba(255, 56, 56)";
    alertBox.style.borderRadius = "5px";
    alertBox.style.padding = "0px";

    let alertBtnOk = document.createElement("button");
    alertBtnOk.classList.add("btn");
    alertBtnOk.style.width = "120px";
    alertBtnOk.style.marginRight = "20px";
    alertBtnOk.innerHTML = "OK";

    let alertBtnCancel = document.createElement("button");
    alertBtnCancel.setAttribute("id", "cancel-btn");
    alertBtnCancel.classList.add("btn");
    alertBtnCancel.style.width = "120px";
    alertBtnCancel.innerHTML = "Avbryt";

    let top = document.createElement("div");
    top.classList.add("case-box-top");
    top.style.borderBottom = "1px solid #373a44";
    top.style.paddingTop = "10px";
    top.style.paddingLeft = "20px";
    top.style.paddingBottom = "10px";
    top.innerHTML = "Advarsel!";

    let infoContainer = document.createElement("div");
    infoContainer.style.fontSize = "1.3rem";
    infoContainer.style.paddingTop = "20px";
    infoContainer.style.paddingLeft = "20px";
    infoContainer.style.paddingRight = "20px";
    infoContainer.innerHTML = "Er du sikker på at du vil slette sak ID-" + x + "?";

    let buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.position = "absolute";
    buttonContainer.style.bottom = "0";
    buttonContainer.style.left = "50%"
    buttonContainer.style.marginLeft = "-160px";
    buttonContainer.style.width = "280px";
    buttonContainer.style.paddingBottom = "30px";
    buttonContainer.style.paddingLeft = "20px";
    buttonContainer.style.justifyContent = "space-between";
    buttonContainer.style.alignItems = "center";

    alertBoxOverlay.appendChild(alertBox);
    alertBox.appendChild(top);
    alertBox.appendChild(infoContainer);
    alertBox.appendChild(buttonContainer);
    buttonContainer.appendChild(alertBtnOk);
    buttonContainer.appendChild(alertBtnCancel);

    // Når OK trykkes, slett
    alertBtnOk.addEventListener("click", function () {
    clearCase(x);
    alertBoxOverlay.remove();
    });
    
}

// Funksjon som sletter sak basert på saks id (x)
const clearCase = (x) => {

    let caseBox = document.getElementById("case-box-" + x);
    let caseList = JSON.parse(localStorage.getItem("caseList"));

    // Finner den saken i arrayet som har samme verdi som injisert verdi (saks id)
    for (var i = 0; i < caseListArr.length; i++) {
        if (caseListArr[i].caseId === x) {
            caseListArr.pop(x, 0);
            caseList.pop(x, 0);
        }
    }
    localStorage.setItem("caseList", JSON.stringify(caseList));

    let getPageTitle = getDivId("page-title");
    getPageTitle.innerHTML = `Alle saker (${caseListArr.length})`;

    caseBox.remove();
}

// Viser redigeringsdialogboks basert på hvilken saks id (x) det er
const editCase = (x) => {
    let caseList = JSON.parse(localStorage.getItem("caseList"));
    const caseEditables = caseList.find(caseObj => caseObj.caseId === x);

    let editCase = document.createElement("article");
    editCase.setAttribute("id", "case-item-" + x);
    editCase.setAttribute("class", "new-case item-box-new col-12-new grid");
    editCase.innerHTML = `

                            <div class="col-12 case-box-top"><h1>Rediger sak ID-${caseEditables.caseId}</h1></div>
                            <div class="col-12 grid new-case-container">
                                <div class="col-12 col-md-2">Tittel</div><div class="col-12 col-md-10"><input type="text" id="caseInputTitle" value="${caseEditables.title}"></div>
                                
                                <div class="col-12 col-md-2">
                                Kategori
                                </div>
                                
                                <div class="col-12 col-md-10">
                                <select id="caseInputCat">
                                <option value="0">-</option>
                                <option value="1">Narkotika</option>
                                <option value="2">Trafikk</option>
                                <option value="3">Vold</option>
                                <option value="4">Vinning</option>
                                <option value="5">Økonomi</option>
                                <option value="6">Annet</option>
                                </select>

                                </div>
                                <div class="col-12 col-md-2">Beskrivelse</div><div class="col-12 col-md-10"><textarea id="caseInputDesc" rows="4" cols="50" value="${caseEditables.description}"></textarea></div>
                                <div class="col-12 col-md-2">Bilde</div><div class="col-12 col-md-10"><input type="text" id="caseInputImg" value="${caseEditables.image}"><p>*Bildet må legges i IMG mappen for å vises.</div>
                            
                            <div class="col-12"><input id="submit-case-btn" class="btn" type="button" value="Opprett" class="btn" onclick="updateCase(${x})">
                        
                        <input id="cancel-case-btn" class="btn" type="button" value="Avbryt" class="btn"></div>
                        </div>
    `;

    outputMain.appendChild(editCase);
}

//Oppdater redigert saks informasjon (x = saks id)
const updateCase = (x) => {
    let caseTitle = getDivId("caseInputTitle").value;
    let getCategory = getDivId("caseInputCat");


    let caseCat = getCategory.options[getCategory.selectedIndex].text;
    let caseDesc = getDivId("caseInputDesc").value;
    let caseDate = new Date().toLocaleString();
    let getImage = getDivId("caseInputImg").value;


    let caseList = JSON.parse(localStorage.getItem("caseList"));
    const caseId = caseList.findIndex((caseObj => caseObj.caseId === x));

    caseList[caseId].title = caseTitle;
    caseList[caseId].category = caseCat;
    caseList[caseId].description = caseDesc;
    caseList[caseId].image = caseImg(getImage);

    localStorage.setItem("caseList", JSON.stringify(caseList));

    getActiveCase = getClass("#case-box-" + x);
    let status = "";
    
    // Hvis sak er løst, gi visuell indikator
    if (caseList[caseId].solved == true) {
        status = "<p class='status-color-green'>Løst</p>";

    } else {
        status = "<p class='status-color-red'>Uløst</p>";
    }

    // Når alle verdiene er behandlet, opprett en ny sak i sakslisten
    getActiveCase.innerHTML = `

    <div class="col-12 col-xs-2 col-s-1 col-md-1 display li-case">${status}</div>
    <div class="col-1 col-xs-2 col-s-1 col-md-1 li-case display"><h1>${caseList[caseId].caseId}</h1></div>
 
    <div class="col-5 col-xs-5 col-s-3 col-md-3 li-case"><p>${caseList[caseId].title}</p></div>
    <div class="col-4 col-xs-3 col-s-2 col-md-2 li-case"><p>${caseList[caseId].category}</p></div>
    <div class="col-2 col-xs-2 col-s-2 col-md-2 li-case display"><p>${caseList[caseId].date}</p></div>
   
    <div class="col-12 col-xs-4 col-s-3 col-md-3 case-list-nav display">
    <button onclick="setDetails(${caseList[caseId].caseId})" class="icon-btn item-btn"><i class="material-icons">find_in_page</i></button>
    <button onclick="editCase(${caseList[caseId].caseId})" id="totop" class="icon-btn item-btn"><i class="material-icons">create</i></button>
    <button onclick="alertBox(${caseList[caseId].caseId})" id="remove-case-btn" class="icon-btn item-btn"><i class="material-icons">clear</i></button>

    </div>
    <div id="mobile-toggle" class="col-2 case-list-nav-mobile display-mobile">
    <button onclick="toggleMobileNav(${caseList[caseId].caseId})" id="mobile-nav-toggle-${caseList[caseId].caseId}" class="item-btn" value="closed"><i class="material-icons">expand_more</i></button>
    </div>
    <div id="mobile-nav-${caseList[caseId].caseId}" class="col-12">
  
</div>   
    `;

    let getNewCaseBox = getDivId("case-item-" + x);
    getNewCaseBox.remove();
}