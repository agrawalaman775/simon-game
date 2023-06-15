var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];


var started=false;
var level=0;


function nextSequence(){
    userClickPattern=[];
    level++;
    $("h1").text("Level "+level);

    var randomNumber=Math.floor((Math.random()*4));
    var randomChoosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);
    $("#"+randomChoosenColour).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

    playSound(randomChoosenColour);
}

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickPattern.push(userChosenColour);
    //console.log(userClickPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});

function playSound(colour){
    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    },100);
}

$(document).keypress(function(){
    
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
    
})


function checkAnswer(currLevel){
    if(gamePattern[currLevel]===userClickPattern[currLevel]){
        
        if(userClickPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over! Press any key to start over");
        startover();
    }
}

function startover(){
    level=0;
    gamePattern=[];
    started=false;
}