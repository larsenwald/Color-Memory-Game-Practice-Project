/*
if keydown, start game
create random number 0 to 3 and flash corresponding box, and
    push number to an array
player will then click one of the boxes, and the corresponding
    number will get pushed to a different array
we compare the arrays together at EVERY click. if there is a
    mismatch at any point, the game ends

the game will know to progress to the next flash (the next round)
    by checking the two array lengths, and if equal, the game will
    once again flash a box and push the corresponding number to array
at every round, the player's array will empty. once again, with EVERY push
    that the player makes to their array, we compare the element in that position
    to the element in the same index position of the other array
*/

$(document).on("keydown", function(){
    startGame();
    $("header p").addClass("hide");
});

function startGame(){
    var round = 1;
    $(document).off("keydown");
    $("h1").html("Round "+round);
    var computerCombination = [];
    var playerCombination = [];

    var randomNumber = Math.floor(Math.random()*4);
    $(".color").eq(randomNumber).removeClass("flash");
    $(".color").eq(randomNumber).offset(); //trigger browser reflow
    $(".color").eq(randomNumber).addClass("flash");
    new Audio("sounds/piano"+randomNumber+".mp3").play();
    computerCombination.push(randomNumber);

    
    var count = 0;
    $(".color").on("mousedown", function(e){
        new Audio("sounds/piano"+$(this).index()+".mp3").play();
        playerCombination.push($(this).index());
        if(playerCombination[count]!==computerCombination[count]){
            var audio = new Audio("sounds/drum.mp3");
            audio.volume = .2;
            audio.play();
            $(".color").off("mousedown");
            $("h1").html("You <span class='red-text'>lost.</span>");
            $("header p").html("Press any key to restart.");
            $("header p").removeClass("hide");
            $(document).on("keydown", function(){
                startGame();
                $("header p").addClass("hide");
            });

        }
        count++;
        console.log("count = "+count)
        if(playerCombination.length===computerCombination.length && playerCombination[count-1]===computerCombination[count-1]){
            playerCombination = [];
            randomNumber = Math.floor(Math.random()*4);
            setTimeout(function(){$(".color").eq(randomNumber).removeClass("flash");
                $(".color").eq(randomNumber).offset(); //trigger browser reflow
                $(".color").eq(randomNumber).addClass("flash");
                computerCombination.push(randomNumber);
                new Audio("sounds/piano"+randomNumber+".mp3").play();} , 1000);
            count = 0;
            round++;
            $("h1").html("Round "+round);
        };
    });
    
};