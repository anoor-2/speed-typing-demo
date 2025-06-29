// declare and define variables that refer to html elements
let btn = document.querySelector(".startBtn");
let time = document.querySelector(".time");
let score = document.querySelector(".score");
let test = document.querySelector(".test");
// running time of the timer (during an iteration when the value changes)
// necessary for countdown functionality
let curr_time = document.querySelector(".time");

let seconds = 60;
let points = 0;

// variable that holds the letter typed
let typed;
// spans hold individual letters of the test word
let spans;

let game_active = false;

// timer countdown functionality
function countdown() {
    timer = setInterval( function() {
        //function that will run repeatedly every x amount of time
        seconds = seconds - 1; //or seconds -= 1; or seconds--;
        curr_time.innerHTML = seconds;

        //logic for when timer ends
        if (seconds <= 0) {
            //ending alert
            alert("Game Over! Your score was " + points);

            //reset all elements (set score to zero, timer to 60 seconds, etc.)
            score.innerHTML = "0";
            test.innerHTML = "";
            time.innerHTML = "60";

            // btn.disabled = false; //unnecessary
            game_active = false;

            clearInterval(timer);
            seconds = 60;
            points = 0;
        }
    }, 1000); //runs every one second
}

//list of typing test words
let list = ["tee","fire","best","summer","fun","strawberry","liberty","house","computer","activity","pneumonoultramicroscopicsilicovolcanoconiosis"];

// random word to type functionality
function random_word() {
    //generates a random number; used to access a random word in the word list
    //Math.random() generates a value 0 (inclusive) to 1 (exclusive)
    let random = Math.floor(Math.random() * list.length);

    //splits the a random word from the list (of words) into it's characters
    let word = list[random].split("");

    //decreases the size of the word if there's more than 11 words
    if (word.length > 11) {
    test.style.fontSize = "6.8rem"; // Smaller size for long words
    } else {
    test.style.fontSize = "11rem"; // Regular size for short words
    }

    //clears any previous words/characters
    test.innerHTML = "";

    //creating the words letter by letter
    for (let i = 0; i < word.length; i++) {
        //creates an inline span container for the letters 
        let span = document.createElement("span");
        //creates a class that applies to all of the spans that make up the word
        span.classList.add("span");

        //shows what span is
        //span.style.border = "solid red";

        //changes HTML of the span to show each letter (until the word is spelt)
        span.innerHTML = word[i];
        //allows each span to the test word div (as a child)
        test.appendChild(span);
    }

    // defines a variable that refers to all spans
    spans = document.querySelectorAll(".span");
}

// button must start countdown and produce random word
btn.addEventListener("click", function() {
    //prevents restarting mid-game
    if (game_active === true) {
        return;
    }
    //prevents button double click/ further clicks
    // btn.disabled = true; //unnecessary
    // status of if there is a game/round that is ongoing
    game_active = true;

    // functions that allow for countdown timer
    // function for random word generation
    countdown();
    random_word();
});

// test functionality
function typing(event) {
    //gets the letter from key press
    typed = event.key;
    console.log(typed);

    // goes through the each span (container of the letter) that make up spans
    for (let i = 0; i < spans.length; i++) {
        //checks the letter of the span matches of the typed letter
        if (spans[i].innerHTML === typed) {
            //add a background if current span doesn't have a background
            //and if previous span doesn't exist (beginning of word) or already has background (middle of word)
            if ((spans[i].classList.contains("background") === false) && 
                    (spans[i-1] === undefined || spans[i-1].classList.contains("background") === true)) {
                spans[i].classList.add("background");
                break;
            }
        }
    }

    let checker = 0;
    for (let j = 0; j < spans.length; j++) {
        //checker checks how many spans have background colors
        if (spans[j].className === "span background") {
            checker++;
        }
        //checks when the entire word is typed
        if (checker === spans.length) {
            //updates points
            points = points + 1;
            score.innerHTML = points;

            //resets
            //temporarily stops keyboard input during transition
            document.removeEventListener("keydown", typing, false);

            //re-enables keyboard input and gives new word after 200ms delay
            setTimeout(function(){
                random_word(); // give another word
                document.addEventListener("keydown", typing, false);
            }, 200);
        }
    }
}

//enables keyboard input
document.addEventListener("keydown", typing, false);