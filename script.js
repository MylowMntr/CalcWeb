
// Fonction pour afficher les nombres dans l'input
function set(op) {
    document.getElementById("display").value += op;
}

// Fonction pour calculer le résultat de l'opération et l'afficher dans l'input
function answer() {
    let Exp = document.getElementById("display");
    let Exp1 = Exp.value;

    let prev = document.getElementById("previous");
    prev.value = Exp1 + " = ";

    let result = eval(Exp1);
    //alert(result);
    Exp.value = result;
}

// Fonction pour tout effacer
function clr() {
    let elem = document.getElementById("display");
    elem.value = "";

    elem = document.getElementById("previous");
    elem.value = "";
}

// Fonction pour effacer le dernier caractère
function ce() {

    let elem = document.getElementById("display").value;
    let length = elem.length;
    length--;
    let a = elem.substr(0, length);
    document.getElementById("display").value = a;
}

