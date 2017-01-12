var randomWord = "";

// spiced.get('http://www.setgetgo.com/randomword/get.php?len=' + 6 + Math.floor(Math.random()*6), function (randomWord) {
// randomWord = randomWord.toUpperCase();
// hangmanGame(randomWord);
// });

// spiced.get('http://www.setgetgo.com/randomword/get.php?len=' + 6 + Math.floor(Math.random()*6), function (randomWord) {
//     randomWord = randomWord.toUpperCase();
//     hangmanGame(randomWord);
// });


function getRandomWord () {
    spiced.get('http://www.setgetgo.com/randomword/get.php?len=' + 6 + Math.floor(Math.random()*6), function (randomWord) {
        try {
            randomWord = randomWord.toUpperCase();
            hangmanGame(randomWord);
            if (randomWord === undefined);
        } catch (e) {
            var manualRandomWord = ["HAUPTBAHNHOF", "WEISSBIER", "MACBOOK", "REICHSTAG", "GERMANY", "JAVASCRIPT", "HANGMAN"];
            randomWord = manualRandomWord[Math.floor(Math.random()* manualRandomWord.length)].split("").join("");
            hangmanGame(randomWord);
        }
});
}



getRandomWord();



function hangmanGame(randomWord) {
    console.log("hello");
    console.log(randomWord);
    var submitButton = document.getElementById('submit_button');
    var replaceText = ""; //To create the empt underline
    for (var i = 0; i < randomWord.length; i++) {
        replaceText += "_";
    }
    var underLine = replaceText.split(""); // variable to replace by input letter
    var wrongShot = []; //array that will get the wrong shots
    var wrongCounter = 0; //count the wrodnShot index
    var answerIsTrue = ""; //to control is shot is right or wrong
    var checkTypedLetters = [];

    document.getElementById("hang_word").innerHTML = replaceText;

    submitButton.addEventListener("click", function(){
        checkOnInputClick();
    });

    document.getElementById("letter_input").addEventListener("keydown", function(e){
        if (e.key === "Enter"){
            checkOnInputClick();}
    });

    function checkOnInputClick () {
        var inputLetter = document.getElementById('letter_input').value.toUpperCase();
        checkLetters();

        function checkLetters () {
            if (checkTypedLetters.indexOf(inputLetter) > -1 || inputLetter === "") {
                alert ("You insert a repeated letter or empt space, try again");
                document.getElementById('letter_input').value = "";
            } else {
                checkTypedLetters.push(inputLetter);
                compareTheLetter();
            }
        }

        function compareTheLetter () {
            for (var i = 0; i < randomWord.length; i++){
                if (inputLetter === randomWord[i]) {
                    underLine[i] = inputLetter;
                    console.log(underLine.join(""));
                    console.log(randomWord);
                    document.getElementById("hang_word").innerHTML = underLine.join("");
                    answerIsTrue = true;
                    if (underLine.join("") === randomWord) {
                        setTimeToMessage(youWin);
                    }
                }
            }
            if (!answerIsTrue)  {
                wrongShot[wrongCounter] = inputLetter + "<br>";
                wrongCounter++;
                document.getElementById('wrong_shots').innerHTML = wrongShot.join("");
                drawTheHandMan();
            }
            answerIsTrue="";
            document.getElementById('letter_input').value = "";
            if (wrongCounter === 6) {
                setTimeToMessage(youLose);
            }
        }
        document.getElementById("letter_input").focus();
    }

    document.getElementById('solve_the_puzzle_button').addEventListener("click", function(){
        var checkTheAnswer = prompt ("Do you know the answer? You can try!! Be sure to guess it right!").toUpperCase();
        console.log(checkTheAnswer);
        console.log(randomWord);
        if (checkTheAnswer === randomWord) {
            setTimeToMessage(youWin);
        } else {
            setTimeToMessage(youLose);
        }
    });


    function drawTheHandMan() {
        switch(wrongCounter) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
        }
    }

    var context = document.getElementById('canv').getContext('2d');


    context.strokeStyle = 'white';
    context.lineWidth=3;

    function head (){
        context.beginPath();
        context.moveTo(300, 100);
        context.arc(250, 100, 50, 0, 2 * Math.PI);
        context.stroke();
    }

    function body () {
        context.beginPath();
        context.moveTo(250, 150);
        context.lineTo(250, 350);
        context.stroke();
    }

    function leftArm(){
        context.beginPath();
        context.moveTo(250, 200);
        context.lineTo(150, 100);
        context.stroke();
    }

    function rightArm(){
        context.beginPath();
        context.moveTo(250, 200);
        context.lineTo(350, 100);
        context.stroke();
    }

    function leftLeg(){
        context.beginPath();
        context.moveTo(250, 350);
        context.lineTo(200, 425);
        context.stroke();
    }

    function rightLeg() {
        context.beginPath();
        context.moveTo(250, 350);
        context.lineTo(300, 425);
        context.stroke();
    }


    function youWin () {
        document.getElementById('end_container').style.display = "block";
        document.getElementById('end_text').innerHTML = "Congratulations! You win!";
        document.getElementById('try_again').addEventListener("click", function(){
            window.location.reload();
        });
    }

    function youLose () {
        document.getElementById('end_container').style.display = "block";
        document.getElementById('end_text').innerHTML = "You lost the game! The hangman is dead!! What to try another time?";
        document.getElementById('try_again').addEventListener("click", function(){
            window.location.reload();
        });
    }

    function setTimeToMessage (functionName) {
        setTimeout(functionName, 500);
    }
}
