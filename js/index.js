//Vis løst og uløste saker på forsiden
caseSolvedStatus(true);
caseSolvedStatus(false);

getBannerContent = document.getElementById("banner-content");
let caseList = JSON.parse(localStorage.getItem("caseList"));
let bannerContent = "";

// Skap en div for hver sak med tittel og bakgrunnsbilde fra localstorage 
caseList.forEach(caseObj => {

    bannerContent += `
       <div class="banner-image">

            <div class="banner-case-image" style="background-image: url(img/${caseObj.image});">
            
                <div class="banner-overlay">
                    
                    <div class="banner-case-title"><h1>${caseObj.title}</h1><p> ${caseObj.category}</p><input onclick="setDetails(${caseObj.caseId})" type="button" id="go-back-btn" class="banner-btn btn" value="Se detaljer"></div>

                </div>

            </div>
        </div>
       `;

});

getBannerContent.innerHTML = bannerContent;

// Skap en bildeverdi til bannerfunksjonen
let imgId = 0;

// Funksjon som får banneret på forsiden til å "animeres"
const frontpageBanner = () => {

    const getBannerBox = document.getElementsByClassName("banner-image");

    // For hvert element i div'en, gi den display verdi none
    for (let i = 0; i < getBannerBox.length; i++) {
     
        getBannerBox[i].style.display = "none";
    }
    // Inkrementer bildeverdi
    imgId++;

    if (imgId > getBannerBox.length) {
        imgId = 1
    }

    // Trekk fra imgId verdi, og legg til klassen fade in og sett display block
    getBannerBox[imgId - 1].classList.add("fade-in");
    getBannerBox[imgId - 1].style.display = "block";

    // Varighet 5 sekunder
    setTimeout(frontpageBanner, 5000);
}

frontpageBanner();