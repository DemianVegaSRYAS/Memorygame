const cardsArray = [
    {'name': 'kuriboh', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Kuriboh.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    {'name': 'MagObs', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Mago-Oscuro.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    {'name': 'DragBlanc', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Dragon-Blanco-de-Ojos-Azules.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    {'name': 'MagaObs', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Maga-Oscura.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    {'name': 'BlusBld', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Buster-Blader.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    {'name': 'DragNegr', 'img': 'https://i0.wp.com/codigoespagueti.com/wp-content/uploads/2022/07/Cartas-favoritas-del-creador-de-Yu-Gi-Oh-Dragon-Negro-de-Ojos-Rojos.jpg?resize=1280%2C1890&quality=80&ssl=1',},
    ];

const gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(()=>{
    return 1 - Math.random();
})

const game = document.getElementById('game-board');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i=0; i < gameGrid.length; i++ ){
    let card = document.createElement("div");
    card.classList.add('card');
    card.dataset.name = gameGrid[i].name

    //front of the card
    let front = document.createElement('div');
    front.classList.add('front');

    //back of the card
    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}
let firstGuess = '';
let secondGuess = '';

let count = 0;

let previousTarget = null;
let delay = 1200;



let match = function () {
    let selected = document.querySelectorAll('.selected');
    for (let i=0; i < selected.length; i++){
        selected[i].classList.add('match')
    }
};

const resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    }
};


grid.addEventListener('click', (event) => {
    let clicked = event.target;
    if(clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        return;
    }

    if(count < 2){
        count ++;
        if (count === 1){
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else{
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }

        if(firstGuess !== '' && secondGuess !== ''){
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            }else {
                setTimeout(resetGuesses, delay);
            }
        }

        previousTarget = clicked;
    }
});