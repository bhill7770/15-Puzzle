// initializing core variables for game setup.
(function () {
    
    window.onload = start_GameBrd; // window to load game board

    var grid_RnC = 4; // number of col and rows
    var blnk_xDrtn = 0; // blank row direction
    var blnk_yDrtn = 0; // blank col direction 
    var solGrid = true; // solavable grid 
    var grid_NumPuzzle = 15; // number of pieces
    var grid_PuzzleSize = 100; // amount relating to game board
    
   
    // to load up game board grid. 
    function start_GameBrd() {

       // more functions added to build pieces with the shuffle button 
        new_puzzlePiece(); // new board
        bgIMG_Option(); // user options of background image
        usrWinAmt(); // user number of wins 
        usrIMG_bg(); // user selection in backgroun image
        shfflBtn(); // shuffle button
    }

    // intializing new variables for creating new puzzle grid board
    function new_puzzlePiece() {
        var x = 0; // game row
        var y = 0; // game colomn 
        var amt = 0; // count for each col and row
        var brdPuzzle = document.getElementById("newPuzzBrd"); // setting the board


        for (var i = 0; i < grid_NumPuzzle; i++) {
           
           
            var value = i + 1; // to set the size of the rows and colomns (4 x 4) for the grid
            if (amt == grid_RnC) {
                x = 0;               
                amt = 0;
                y += grid_PuzzleSize;
            }

            var gameTile = document.createElement("div");  // starting a div element to contain the puzzle pieces

           
            brdPuzzle.appendChild(gameTile);
            gameTile.onmouseout = origBdr; // the color of the original boarder is return to block when that no longer applies
            gameTile.onmouseover = freeTile; // highlights tile piece if it's next to empty space when hovered over.
            gameTile.onmouseup = looseTile; // let's the tile have the ability to move into the empty space if it neighbors it.
            gameTile.value = false; // will change to true depending on if tile can be moved
           
            gameTile.style.backgroundPosition = -x + "px " + -y + "px";
            gameTile.style.left = x + "px";
            gameTile.style.top = y + "px";
          
            gameTile.className = "gameTile";
            gameTile.innerHTML = value;
            
            amt++; // value of count increasing
            x += grid_PuzzleSize;
        }

        blnk_xDrtn = x; // new value added to blank space as 16th place in the x direction (row)
        blnk_yDrtn = y; // new value added to blank space as 16th place in the y direction (column)
    }

    // to allow shuffle function 
    function tile_UDRL(x_tile) { // to allow for movement for the tile - all 4 directions - up, down, right, left
      
        if (x_tile.value === true) {
            
            var placeHold_xVal = parseInt(x_tile.style.left); // temporary variables for current variables
            var placeHold_yVal = parseInt(x_tile.style.top);
            
            x_tile.value = false; // to hender illegal movement of tiles during gameplay
            x_tile.style.left = blnk_xDrtn + "px"; // sets x&y values of the blank spot to new tile
            x_tile.style.top = blnk_yDrtn + "px";
           
            blnk_xDrtn = placeHold_xVal; // set x&y values of newly moved tile to empty values
            blnk_yDrtn = placeHold_yVal;
           
            if (solGrid === true) { // verifies if board is solved without shuffling occuring
                verifySolBrd();
            }
        }
    }

    // setting up board
    function origBdr() {        
        this.value = false; // hender unjustafiable moves
        this.style.color = "black"; //original color   
        this.style.cursor = "default"; // return to default color once mouse stop hovering over tile
        this.style.border = "5px solid black"; // set tile appearance
    }

       // setting up game tile design
       function hilght_Tile(x_tile) { 
        x_tile.value = true; // allows for tile movement when allowed       
        x_tile.style.color = "white"; // highlights selected title white when mouse hovers over it
        x_tile.style.cursor = "pointer"; 
        x_tile.style.border = "5px solid white";
    }

    // the current tile references other functions to determine if it neighbors the empty block in effort to move
    function freeTile() { 
        if (check_xVal(this) || check_yVal(this)) { // highlight free tile & change the value to allow for play movement
            hilght_Tile(this);
        }
    }

    // to move the free tile if possible by referencing other functions
    function looseTile() {
        tile_UDRL(this);
    }

     // activate the shuffle button for gameplay
     function shfflBtn() {

        var bttn = document.getElementById("shuffle"); // when button is pressed shuffle the board
        bttn.onclick = gridShffl;
    }

    // for game background images
    function bgIMG_Option() {
        var usr_choose = document.getElementById("background"); // user can select background image from a list of options
        usr_choose.onchange = puzzleBG; // the chosen image will be the new background for the game board
    }

    // saves background for puzzle
    function puzzleBG() {
        var img = document.getElementById("background").value;
        var gameTiles = document.querySelectorAll(".gameTile");
        for (var i = 0; i < gameTiles.length; i++) { // so background image covers every tile on game board
            gameTiles[i].style.backgroundImage = 'url(' + img + ')';
        }

    localStorage["background"] = img; // stored image
    }

    // display the player's chosen background image when they return
    function usrIMG_bg() {
        if (localStorage["background"]) {
            var img = document.getElementById("background");
            img.value = localStorage["background"]; // retreive backage image from storage
            var gameTiles = document.querySelectorAll(".gameTile");
            for (var i = 0; i < gameTiles.length; i++) {
                gameTiles[i].style.backgroundImage = 'url(' + img.value + ')';
            }
        }
    }

    // to shuffle the titles on grid
    function gridShffl() {
        var gameTiles = document.getElementsByClassName("gameTile");
        document.getElementById("usrWins").innerHTML = ""; // erases text when winner alert is shown
        solGrid = false; // winner alert will not display when gameplay is still occuring
       
        for (var i = 0; i < 1000; i++) { // loop is searching for free tiles to randomly place a tile in a blank spot
            var nTiles = [];
            for (var j = 0; j < gameTiles.length; j++) {
                if (check_xVal(gameTiles[j]) || check_yVal(gameTiles[j])) {
                    nTiles.push(gameTiles[j]);
                }
            }

            var xSpace = Math.floor(Math.random() * nTiles.length); 
            nTiles[xSpace].value = true;
            tile_UDRL(nTiles[xSpace]); // movement for tiles
            nTiles[xSpace].value = false;
        }

        solGrid = true; // allows for win function after game board is shuffled
    }


     // to check if the X coordinate of the selected title is in the same column of the blank space
     function check_xVal(x_tile) { // check positions
        if (parseInt(x_tile.style.left) == blnk_xDrtn) { 
            if (parseInt(x_tile.style.top) == (blnk_yDrtn - grid_PuzzleSize) || parseInt(x_tile.style.top) == (blnk_yDrtn + grid_PuzzleSize)) {
                return true;
            }
        }
    }

    // to check if x coordinate value of the selected tile is in the row of the blank space
    function check_yVal(x_tile) { // check positions
        if (parseInt(x_tile.style.top) == blnk_yDrtn) {
            if (parseInt(x_tile.style.left) == (blnk_xDrtn - grid_PuzzleSize) || parseInt(x_tile.style.left) == (blnk_xDrtn + grid_PuzzleSize)) {
                return true;
            }
        }
    }


    // checks if the puzzle is solved
    function verifySolBrd() {
        var amt = 0; // counting 
        var checkedRow = 0; // checking in rows
        var checkedColumn = 0; // checking in columns
        var verified = 0; // finished checking
        var gameTiles = document.getElementsByClassName("gameTile");
        
        for (var i = 0; i < gameTiles.length; i++) { // iteration through tiles in the x & y direction to current spots of titles
            if (amt == grid_RnC) {
                amt = 0;
                checkedRow = 0;
                checkedColumn += grid_PuzzleSize;
            }

            if (parseInt(gameTiles[i].style.left) == checkedRow && parseInt(gameTiles[i].style.top) == checkedColumn) { // if row and col coordinate set match the game counter is incremented by 1
                verified++;
            } else { 
                verified = 0; // otherwise not
            }
            amt++;
            checkedRow += grid_PuzzleSize;
        }

        if (verified == grid_NumPuzzle) { 
            document.getElementById("usrWins").innerHTML = "🏆  Congratulations, You Won! 🏆"; // once the puzzle has been solved, the user is alerted of the win by a message
            var gameWon = localStorage["usrWinAmt"]; // win is stored
            gameWon++; // win count is incremented for every successful solved puzzle
            localStorage["usrWinAmt"] = gameWon;
            usrWinAmt();
        } else {
            document.getElementById("usrWins").innerHTML = ""; // message disappears and is not displayed when user doesn't win
        }
    }

    
    // to display the number of wins after user succesfully solves puzzle
    function usrWinAmt() {
        var win = document.getElementById("usrWinAmt");
        if (!localStorage["usrWinAmt"]) {
            localStorage["usrWinAmt"] = 0;
        }
        win.innerHTML = "Wins: " + localStorage["usrWinAmt"];
    }
})();