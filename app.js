// Part 1 ----------------

let baseURL = 'http://numbersapi.com';

async function getFavNum() {
    let num = await $.getJSON(`${baseURL}/7?json`);
    console.log(num);
}
getFavNum();

async function getMultNums() {
    let fiveNumPromises = [];

    for (let i = 1; i < 5; i++) {
    fiveNumPromises.push(
        $.getJSON(`${baseURL}/${i}?json`)
    );
}

    try {
        let nums = await Promise.all(fiveNumPromises);
          
        let $div = $('#num-div');
        nums.forEach(n => {
            let p = document.createElement('p');
            p.textContent = n.text;
            $div.append(p);
        });
    } catch (err) {
        console.error('Error getting facts', err);
    }
}
getMultNums();

async function favNumPromises() {
    let favNumPromises = [];

    for (let i = 1; i < 5; i++) {
        favNumPromises.push(
            $.get(`${baseURL}/7?json`)
        );
    }

    try {
        let facts = await Promise.all(favNumPromises);

        let $div = $('#num-div');
        facts.forEach(f => {
            let p = document.createElement('p');
            p.textContent = f.text;
            $div.append(p);
        });
    } catch (err) {
        console.error('Error gettings facts', err);
    }
}
favNumPromises();

// Part 2 -------------------

let cardsBaseUrl = 'https://deckofcardsapi.com/api/deck';
let deckId;

async function singleCard() {
    try {
        let card = await $.getJSON(`${cardsBaseUrl}/new/draw/`);
        let {value, suit} = card.cards[0];
        console.log(`${value} of ${suit}`);
    } catch (err) {
        console.error('Error getting card', err);
    }
}
singleCard();

async function twoCards() {
    try {
        let card1 = await $.getJSON(`${cardsBaseUrl}/new/draw/`);
        let {value: value1, suit: suit1} = card1.cards[0];
        console.log(`${value1} of ${suit1}`);
        deckId = card1.deck_id;
        let card2 = await $.getJSON(`${cardsBaseUrl}/${deckId}/draw/`);
        let {value: value2, suit: suit2} = card2.cards[0];
        console.log(`${value2} of ${suit2}`);
    } catch (err) {
        console.error('Error getting cards', err);
    }
}
twoCards();

async function newDeck(){
    try {
        let $gimmeCard = $('button');
        let $cardDiv = $('#card-div');

        async function drawCard(deckId) {
            let card = await $.getJSON(`${cardsBaseUrl}/${deckId}/draw/`);
            return card;
        }

        async function displayCard(imgSrc) {
            let imgEl = document.createElement('img');
            imgEl.src = imgSrc;
            $cardDiv.append(imgEl);
        }

        let deck = await $.getJSON(`${cardsBaseUrl}/new/shuffle/`);
        deckId = deck.deck_id;
        $gimmeCard.on('click', async function() {
            let card = await drawCard(deckId);
            imgSrc = card.cards[0].image;
            displayCard(imgSrc);
            if (card.remaining === 0) {
                $gimmeCard.remove();
            }
        });
    } catch (err) {
        console.error('Error getting deck', err);
    }
}
newDeck();


//improvements
//1. When making HTTP requests, choose either $.getJSON or $.get 
//2. Wrap jQuery Ajax calls in promises for better handling of asynchronous operations.
