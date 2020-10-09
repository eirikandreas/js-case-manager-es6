// Importer klassen Case
import Case from "./case.js";

let caseDate = new Date().toLocaleDateString();

// Funksjon som legger inn test data i localstorage
const addData = () => {

    // Hvis testdata eksisterer logg i konsollen at det er lastet
    if (caseListArr.some(caseObj => caseObj.database === "test-data")) {

        console.log("Test Data is loaded");
    
    // Hvis ikke, last inn nye saker i arrayet.
    } else {

        //Tar i bruk Case klassen og lager nye objekter
        let dbCase1 = new Case(0, caseDate, "Innbrudd i ambassade", "Vinning", "Etter et innbrudd i en ambassade har det forsvunnet en hel del klassifiserte dokumenter. Disse dokumentene er nå på avveie. Etter å ha foretatt en rundspørring blant kilder har vi foreløpig ingen bekreftelse på hvor dokumentene befinner seg.", "1.jpg", false, "test-data", true);
        let dbCase2 = new Case(1, caseDate, "Narkobaron ankommer Norge", "Narkotika", "Flere meldinger innenfor vårt 'narko-miljø' tilsier at den Ukrainske narkobaronen Semion Mogilevich ankommer Norge. Meldingene sier også at dette gjøres i forbindelse med finansiering av en Tjetjensk terror celle. Vi frykter foreløpig at Mogilevich importerer store mengder av hans egenproduserte og svært ettertraktede partydop 'red-white'.", "2.jpg", false, "test-data", false);
        let dbCase3 = new Case(2, caseDate, "Overlevering av penger", "Økonomi", "En ukjent politiker er antatt å overlevere store verdier til Iran, vi kan ikke si med sikkerhet hvem denne politikeren er. Vi vet at pengene går til finansiering til et nytt atomanlegg i Iran, som produserer plutonium.<br><br> OPPDATERING: Politikeren er nå funnet og arrestert for å ulovlig ha finansiert Iransk produksjon av masseødeleggelsesvåpen.", "3.jpg", true, "test-data", true);
        let dbCase4 = new Case(3, caseDate, "Innkommende hackergruppe", "Annet", "En hackergruppe med tilknytning til den tidligere væpnede baskiske separatistbevegelsen, ETA, har nå begynt å innhente store verdier fra Norge. Dette ved å hacke flere bankkontoer og overføre pengene videre til kontoer i Panama.", "4.jpg", false, "test-data", true);
        let dbCase5 = new Case(4, caseDate, "Drap på Norsk finansmann", "Økonomi", "En norsk finansmann er bekreftet død av nederlandsk politi. <br><br>OPPDATERING: Mannen er nå funnet i Rotterdam og arrestert", "5.jpg", true, "test-data", false);

        caseListArr.push(dbCase1);
        caseListArr.push(dbCase2);
        caseListArr.push(dbCase3);
        caseListArr.push(dbCase4);
        caseListArr.push(dbCase5);

        localStorage.setItem("caseList", JSON.stringify(caseListArr));

        // Oppdaterer siden etter at dataene er lastet
        location.reload();

    }

}

addData();