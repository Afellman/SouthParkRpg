
$(document).ready(function () {
  //GLOBAL VARIABLES

  // var to store chosen player and enemy
  var player;
  var enemy;

  //var to store player attack points
  var playerAp;

  //toggle to listen for character choice
  var charIsChosen = 0;
  var enemyIsChosen = 0;

  //object storing the character data
  var charObj = {
    stan: {
      "name": "Stan", 
      "ap" : 15,
      "hp": 115
    },

    kyle: {
      "name": "Kyle",
      "ap" : 10,
      "hp" : 150
    },

    kenny: {
      "name" : "Kenny",
      "ap" : 7,
      "hp" : 75
    },

    cartmen: {
      "name" : "Cartmen",
      "ap": 25,
      "hp": 100
    },
  }

  //function to start the game, resetting the page and redrawing the characters.
  function newGame (){
    $(".char-row").empty();
    $(".fight-row").empty();
    $(".text-row").empty();
    player = "";
    enemy = "";
    
    charIsChosen = 0;
    enemyIsChosen = 0;
    
    charObj = {
    stan: {
      "name": "Stan", 
      "ap" : 15,
      "hp": 115
    },
    
    kyle: {
      "name": "Kyle",
      "ap" : 10,
      "hp" : 150
    },
    
    kenny: {
      "name" : "Kenny",
      "ap" : 7,
      "hp" : 75
    },
    cartmen: {
      "name" : "Cartmen",
      "ap": 25,
      "hp": 100
      
    },
    }
    $(".text-row").append("<h1>Choose Your Character!</h1>");
    //draws the characters to the DOM
    for (var key in charObj) {
      console.log(charObj[key])
      console.log(key);
      var divInsert = '<div id="' + key + '" class="chars char-select rounded center bg-dark text-white">' + key + '<p class="stats">HP: ' + charObj[key]["hp"] + " AP: " +charObj[key]["ap"] + '</div>'
      $(".char-row").append(divInsert)
    };
    clicks();
  };
  //can't get the .on('click') to register without calling it in a function...? (timeout after append?)
  function clicks() {
    //listens for a click on a character
    $(".chars").on("click", function () {
      console.log("onclick")
      //sets first click to player and flips player toggle so it can't be chosen again. 
      if (charIsChosen == 0){
        $(".fight-row").append(this);
        charIsChosen = 1;
        $(this).attr("class", function () { return $(this).attr("class") + " player"});
        $(this).children("p").attr("class", function () { return $(this).attr("class") + " player-stats"});
        player = $(".player").attr("id");
        playerAp = charObj[player]['ap'];
        $(".text-row").html('<h1 class="">Choose Your Enemy!</h1>')
      }
      //sets next click(s) to enemy and flips toggle.
      else if (enemyIsChosen == 0 ){
        $(this).remove();
        $(".fight-row").append("<button class='attack btn btn-primary'>Attack");
        $(".fight-row").append(this);
        enemyIsChosen = 1;
        $(this).attr("class", function () { return $(this).attr("class") + " bg-danger enemy"});
        $(this).children("p").attr("class", function () { return $(this).attr("class") + " enemy-stats"});
        enemy = $(".enemy").attr("id");
        $(".enemy").removeClass("bg-light")
        roundStart();
      }
    });
  };
    //function to start each round. addes
   function roundStart() {
    $(".text-row").html('<h1 class="">Fight!</h1>');  
    $(".player").removeClass("char-select");
    $(".enemy").removeClass("char-select");
    $(".attack").on("click", function(){
      charObj[player]["hp"] -= charObj[enemy]["ap"];
      charObj[enemy]["hp"] -= charObj[player]["ap"];
      charObj[player]["ap"] += playerAp; 
      $(".player-stats").text('HP: ' + charObj[player]["hp"] + " AP: " +charObj[player]["ap"]);
      $(".enemy-stats").text('HP: ' + charObj[enemy]["hp"] + " AP: " +charObj[enemy]["ap"]);
      if (charObj[player]["hp"] <= 0){
        loose();
      }
      else if (charObj[enemy]["hp"] <= 0) {
        console.log(enemy);
        $(".enemy").remove();
        $(".attack").remove();
        enemyIsChosen = 0;
        $(".text-row").html('<h1 class="">Choose YOUR NEXT Enemy!</h1>');
        clicks();
      }

      
    });
  };

    function loose(){
      prompt("you suck!");
      newGame();
    }

    // var attack = function(){
    //   console.log("now attacking");
    //   charObj[player]["hp"] -= charObj[enemy]["ap"]
    //   $(".player-stats").text('HP: ' + charObj[player]["hp"] + " AP: " +charObj[player]["ap"]);

      
    // }

  newGame();
});