// Opprett Case objektet med følgende verdier
class Case {
    constructor(caseId, date, title, category, description, image, solved, database, isFeatured) {
        this.caseId = caseId;
        this.date = date;
        this.title = title;
        this.category = category;
        this.description = description;
        this.image = image;
        this.solved = solved;
        this.database = database;
        this.isFeatured = isFeatured;
    }
}

export default Case;