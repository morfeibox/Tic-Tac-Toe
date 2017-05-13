


$(document).ready(function() {
    //initialize variables
    var computerwins=0;
    var playerwins=0;
    var playerT='x';
    var computerT='o';
    var turns=[" "," "," "," "," "," "," "," "," "];
    var gameOn=false;
    var count=0;

     //show initial menu
    $(".choose-payer").show("fade",500);

//choos player o
    $("#o-player").click(function(){
        playerT = 'o';
        computerT = 'x';
        $(".choose-payer").hide("puff",400);
        $(".game-bord").show("fade",800);
        $(".game-scores").show("slide",1200);
        players();
        scores();
        });

 //choos player x
    $("#x-player").click(function(){
        playerT = 'x';
        computerT = 'o';
        $(".choose-payer").hide("puff",400);
        $(".game-bord").show("fade",800);
        $(".game-scores").show("slide",1200);
        players();
        scores();
    });

     // set players, colors..
    function players(){
        if(computerT === 'x') {
            $(".player-scores").children().addClass("o-player").text('o');
            $(".computer-scores").children().addClass("x-player").text('x');
        }else{
            $(".computer-scores").children().addClass("o-player").text('o');
            $(".player-scores").children().addClass("x-player").text('x');
        }
    }

    // computer Turn Logic
    function computerTurn(){
        var turntaken=false;
        var computersMove;
        while(turntaken === false && count !== 5 ) {
            if (turns[4] === " ") {
                 computersMove = 4;
            } else if (turns[4] === "x" || turns[4] === "o") {
                preventPlayer();
                if (preventPlayer() !== undefined) {
                     computersMove = preventPlayer();
                    }
                    else if (preventPlayer() === undefined || preventPlayer() === false) {
                        blockFork();

                         if ( blockFork() !== undefined) {
                             computersMove =  blockFork();}
                         else if ( blockFork() === undefined ||  blockFork() === false) {
                             computersMove = Math.floor(Math.random() * 9);
                             console.log(computersMove + "200");
                         }

                    }
            }
             var move= $("#" + computersMove).text();
             if(move === ""){
                 turns[computersMove]=computerT;
                      if(computerT === "o"){
                     $("#" + computersMove).css("color", "#8BC0EC");
                 }
                 $("#"+ computersMove).text(computerT);
                      isitWin();
                 turntaken=true;

             }

        }
    }


   //prevent Player to win the game by placing computer turn where player may has a third
    function preventPlayer() {
        var result = false;
        var arr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for (var j in arr) {
            var row = arr[j];
            if (turns[row[0]] === playerT && turns[row[1]] === playerT && turns[row[2]]===" ") {
                result = row[2];
                return result;



            }
            if (turns[row[0]] === playerT && turns[row[2]] === playerT && turns[row[1]]===" ") {
                result = row[1];
                return result;


            }
            if (turns[row[1]] === playerT && turns[row[2]] === playerT && turns[row[0]]===" ") {
                result = row[0];
                return result;

            }

        }



    }



   // prevent Player from creating fork
    function blockFork() {
        var result=false;
        if (turns[1] === playerT && turns[5] === playerT && turns[2]===" ") {
            result= 2;

            return result;
        } else if (turns[7] === playerT && turns[5] === playerT && turns[8]===" ") {
            result= 8;

            return result;
        } else if (turns[7] === playerT && turns[3] === playerT && turns[6]===" ") {
            result= 6;

            return result;
        } else if (turns[1] === playerT && turns[3] === playerT && turns[0]===" ") {
            result= 0;

            return result;
        }


    }



    // generates player click data
    $(".click").click(function(){
        var currentclick = $(this).attr('id');
        playerTurn(playerT,currentclick);
    });


    //player Turn
    function playerTurn(playerT,currentclick){
        var spot = $("#" + currentclick).text();

        if(spot === ""){
            count++;
            turns[currentclick]= playerT;
                if(playerT === "o"){
                $("#" + currentclick).css("color", "#8BC0EC");
                 }
            $("#" + currentclick).text(playerT);
            isitWin();
            if(gameOn === false){
                setTimeout (computerTurn,400);

            }
        }

    }

    // check do we have a wining condition
    function isitWin(){
          var arr = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6]
          ];
          for (var i in arr) {
              var row = arr[i];

              if (turns[row[0]] === computerT && turns[row[1]] === computerT && turns[row[2]] === computerT) {
                  gameOn=true;
                  computerwins++;
                  scores();
                  setTimeout(function () {
                      $('#' + row[0] + ', #' + row[1] + ', #' + row[2]).effect('pulsate', {
                          times: 1
                      }, 400);
                  }, 100);
                  return (setTimeout(pcWin, 1200));
              } else if (turns[row[0]] === playerT && turns[row[1]] === playerT && turns[row[2]] === playerT) {
                  gameOn=true;
                  playerwins++;
                  scores();

                  setTimeout(function () {
                      $('#' + row[0] + ', #' + row[1] + ', #' + row[2]).effect('pulsate', {
                          times: 1
                      }, 400);
                  }, 100);
                  return (setTimeout(playerWin, 1200));
              }else{
                  gameOn=false;
              }
          }

              if (jQuery.inArray(" ", turns)===-1) {
                  return (setTimeout(noWiner, 600));

          }
      }


    // the next three function represent the result of the game
    function noWiner (){
        $("#condition-gif").attr("src", "media/no-winner.gif");
        resetGame();

        $("#game-condition").show("bounce",700);
        $("#condition").text('There is no Winner');
        $("#reset").click(function(){
            $("#game-condition").hide("fade",10);
            $("#condition-gif").attr("src", " ");
        });


    }
    function pcWin(){
        $("#condition-gif").attr("src", "media/i-win.gif");
        resetGame();

        $("#game-condition").show("bounce",700);
        $("#condition").text('PC Win');
        $("#reset").click(function(){
            $("#game-condition").hide("fade",10);
            $("#condition-gif").attr("src", " ");
        });

    }
    function playerWin(){
        $("#condition-gif").attr("src", "media/you-win.gif");
        resetGame();

        $("#game-condition").show("bounce",700);
        $("#condition").text('You Win');
        $("#reset").click(function(){
            $("#game-condition").hide("fade",10);
            $("#condition-gif").attr("src", " ");
        });
    }


    //generates scores
   function scores(){
        $(".scores").html(computerwins + ':' + playerwins);
   }


   function resetGame(){
       $(".click").empty();
       count=0;
       turns=[" "," "," "," "," "," "," "," "," "];
       gameOn=false;
       $(".box").css("color","#FCE473");
   }





});