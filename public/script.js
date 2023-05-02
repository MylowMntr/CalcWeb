class BaseCalculator {

    // Constructeur de la classe BaseCalculator qui permet d'initialiser les variables display et previous
    constructor() {
        this.display = document.getElementById("display");
        this.previous = document.getElementById("previous");
        this.history = [];
    }

    // Fonction pour afficher les nombres dans l'input
    set(op) {
        fetch('http://localhost:3000/timer/start', { method: 'POST' })
            .then(response => response.text())
            .then(text => {
                console.log(text); // "Timer démarré"
                // Continuer avec la logique du traitement de l'entrée utilisateur...
            })
            .catch(error => {
                console.error(error);
                // Gérer les erreurs...
            });

        if (this.display.value == "Erreur !") {
            this.display.value = "";
        }
        this.display.value += op;
    }

    // Fonction pour calculer le résultat de l'opération et l'afficher dans l'input
    answer() {
        // let Exp1 = this.display.value;

        // // On ajoute l'opération dans l'historique
        // this.history.push(Exp1);

        // this.previous.value = Exp1 + " = ";
        // let result = eval(Exp1);
        // //alert(result);
        // this.display.value = result;

        fetch('http://localhost:3000/timer/stop', { method: 'POST' })
            .then(response => response.text())
            .then(text => {
                console.log(text); // "4"

                let time = 0;
                if (!isNaN(text)) {
                    time = text;
                }

                const expression = this.display.value;
                this.history.push(expression);
                this.previous.value = expression + " =   (" + time + "ms)";

                fetch('http://localhost:3000/calculate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ expression, time }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (!isNaN(data)) {
                            console.log(data); // afficher le résultat
                            this.display.value = data;
                        } else {
                            console.error("Le résultat n'a pas été renvoyé par le serveur. Vérifier l'expression.");
                            this.display.value = "Erreur !";
                        }
                    });

            })
            .catch(error => {
                console.error(error);
                // Gérer les erreurs...
            });


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



    stats() {
        fetch('http://localhost:3000/stats', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data); // afficher les statistiques
                this.display.value = "voir console";
            })
            .catch(error => {
                console.error(error);
                // Gérer les erreurs...
            }
            );
    }

    bdd() {
        fetch('http://localhost:3000/calculations', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                console.log(data); // afficher les statistiques
                this.display.value = "voir console";
            })
            .catch(error => {
                console.error(error);
                // Gérer les erreurs...
            }
            );
    }



}

let calc = new BaseCalculator();

// Permet l'arrêt du timer lors du rafraichissement de la page
window.addEventListener('beforeunload', function (event) {
    event.preventDefault();
    fetch('/calculator/timer/stop', { method: 'POST' })
        .then(response => response.text())
        .then(text => {
            console.log(text); // "Timer arrêté. Temps écoulé : 4 secondes."
        })
        .catch(error => {
            console.error(error);
        });
});



const inputRegex = /[\d+\-*\/\.\(\)]/; // L'expression régulière pour les entrées claviers autorisées

document.addEventListener('keydown', function (event) {
    const key = event.key; // Récupération de la touche pressée
    const isValid = inputRegex.test(key); // Vérification de la correspondance avec l'expression régulière

    if (key === 'Enter') {
        calc.answer(); // Calculer le résultat
    }
    else if (key === 'Backspace') {
        calc.ce(); // Effacer le dernier caractère
    }

    else if (!isValid) {
        event.preventDefault(); // Empêcher l'action par défaut de la touche pressée
    }
    else {
        calc.set(key); // Ajouter le caractère à l'écran
    }
});