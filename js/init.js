// Legg til innhold i footeren
const addFooterContent = () => {
    document.getElementById("footer").innerHTML = `
    
    <div class="footer-container">

        <div class="footer-info">inSight for 
            <div class="pst-logo"><img src="img/pst-logo.svg" width="48px" height="48px"></div>
        </div>

        <div class="footer-buttons">
            <button id="totop" class="round-icon-btn"><i class="material-icons">expand_less</i></button> 
        </div>
             
    </div>
     <div class="footer-credits center-text"><p>Eksamensoppgave, Webutvikling 2019</p></div>
    `;
}

addFooterContent();

