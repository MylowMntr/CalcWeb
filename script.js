class BaseCalculator {

    // Constructeur de la classe BaseCalculator qui permet d'initialiser les variables display et previous
    constructor() {
        this.display = document.getElementById("display");
        this.previous = document.getElementById("previous");
        this.history = [];
    }

    // Fonction pour afficher les nombres dans l'input
    set(op) {
        this.display.value += op;
    }

    // Fonction pour calculer le résultat de l'opération et l'afficher dans l'input
    answer() {
        let Exp1 = this.display.value;

        // On ajoute l'opération dans l'historique
        this.history.push(Exp1);

        this.previous.value = Exp1 + " = ";
        let result = eval(Exp1);
        //alert(result);
        this.display.value = result;
    }

    // Fonction pour tout effacer
    clr() {
        this.previous.value = "";
        this.display.value = "";
    }

    // Fonction pour effacer le dernier caractère
    ce() {
        let elem = this.display.value;
        let length = elem.length;
        length--;
        let a = elem.substr(0, length);
        this.display.value = a;
    }

    // Fonction pour afficher l'historique
    getBack() {
        // On test si l'historique est vide, si c'est le cas on ne fait rien, sinon on affiche la dernière opération
        let value = this.history.pop();
        if (value != undefined) {
            this.display.value = value;
            this.previous.value = "";
        }
    }

}

let calc = new BaseCalculator();
