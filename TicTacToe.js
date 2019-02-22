//Stephen Green
//September 14, 2018


//Global variables made it easier to coordinate functions
var move=1;

var box1,
	box2,
	box3,
	box4,
	box5,
	box6,
	box7,
	box8,
	box9,
	gStatus;
	

window.onload = function() {
	// Place an X or O by deciphering which turn it is
	// Making X's always go first
	
	//Need to create all variables upon loading program
	var boxes = document.getElementsByClassName("box") ;
	var PlayerFirst = document.getElementById("PlayerButton");
	var CPUFirst = document.getElementById("CPUButton");
	
	box1 = document.getElementById("one"),
	box2 = document.getElementById("two"),
	box3 = document.getElementById("three"),
	box4 = document.getElementById("four"),
	box5 = document.getElementById("five"),
	box6 = document.getElementById("six"),
	box7 = document.getElementById("seven"),
	box8 = document.getElementById("eight"),
	box9 = document.getElementById("nine"),
	gStatus = document.getElementById("GameStatus");
	
		
	PlayerFirst.onclick = function(){
		//Just calls the board to be reset and the let the player start a new game
		clearBoard();
	}
	
	CPUFirst.onclick = function(){
		// Will reset the board and call the computer to move first and the game will proceed like normal
		clearBoard();
		computerMove();
	}
	for (var i = 0; i < 9; i++){
		
		// Player Function
		// Fills in X or O upon Clicking by looking at the turn number
		// After each click the turn counter is updated and will call the computer to move
		// Checks winner After every player and CPU move
		
		boxes[i].onclick = function(){
			// Will stop allowing moves after game has been won
			if ((this.innerHTML == "X") || (this.innerHTML == "O")
				|| (gStatus.innerHTML != "Game In Progress....")){
				
			}
			else {
				if (move % 2 == 1){	
					this.innerHTML = "X";
					move++;
					getWinner() ;
				}
				else {
					this.innerHTML = "O";
					move++;
					getWinner() ;
				}
				
				// Delay the computers move so its not instant
				if (gStatus.innerHTML == "Game In Progress....")
					setTimeout (function(){computerMove();},200);
				
				
			}
			
			//Checks if the game went to a TIE
			if (move > 9 && gStatus.innerHTML == "Game In Progress....")
				gStatus.innerHTML = "Tie Game";
					
			
		}
		
	}

}

function clearBoard(){

	// Resets the game to its original settings
	box1.innerHTML = "";
	box2.innerHTML = "";
	box3.innerHTML = "";
	box4.innerHTML = "";
	box5.innerHTML = "";
	box6.innerHTML = "";
	box7.innerHTML = "";
	box8.innerHTML = "";
	box9.innerHTML = "";
	gStatus.innerHTML = "Game In Progress....";
	
	box3.style.backgroundColor = "white";
	box2.style.backgroundColor = "white";
	box1.style.backgroundColor = "white";
	box4.style.backgroundColor = "white";
	box5.style.backgroundColor = "white";
	box6.style.backgroundColor = "white";
	box7.style.backgroundColor = "white";
	box8.style.backgroundColor = "white";
	box9.style.backgroundColor = "white";
	
	move = 1;

}

function computerMove(){
		//Picking X or O
		//Check for winning move then Block winning move
		//Uses same method of determining whether its X or O by checking turn number
		if (move % 2 == 1){	
			var CPUBoxNumber = checkXWin();
			console.log("Win X " + CPUBoxNumber)
			if (CPUBoxNumber == "none")
				CPUBoxNumber = checkOWin();
				console.log("Block O " + CPUBoxNumber)
		}
		else {
			var CPUBoxNumber = checkOWin();
			console.log("Win O " + CPUBoxNumber)
			if (CPUBoxNumber == "none")
				CPUBoxNumber = checkXWin();
				console.log("Block X " + CPUBoxNumber)
			
		}
		

		// After checking for potential winning moves and saving blocks
		// Few key scenarios that could trick CPU
		// Safety precautions put into place to cover them
		if (CPUBoxNumber == "none")			{
			
			CPUBoxNumber = avoidTrap();
			console.log("Trap" + CPUBoxNumber);
			
		}	
		
		// Lastly just making sure the CPU will always make a move somewhere
		// Priority list goes as follows Middle, Corner, Edge
		if (CPUBoxNumber == "none"){
			//Middle is best option
			//Will be first move
			if (box5.innerHTML == "")
			CPUBoxNumber = "five";
			//Second option: Go for corner
			else if (box5.innerHTML != "" && box1.innerHTML == "")
				CPUBoxNumber = "one";
			else if (box1.innerHTML != "" && box9.innerHTML == "")
				CPUBoxNumber = "nine";
			else if (box9.innerHTML != "" && box3.innerHTML == "")
				CPUBoxNumber = "three";
			else if (box3.innerHTML != "" && box7.innerHTML == "")
				CPUBoxNumber = "seven";
			
			//Third Option Edge
			else if (box7.innerHTML != "" && box2.innerHTML == "")
				CPUBoxNumber = "two";
			else if (box2.innerHTML != "" && box8.innerHTML == "")
				CPUBoxNumber = "eight";
			else if (box8.innerHTML != "" && box4.innerHTML == "")
				CPUBoxNumber = "four";
			else if (box4.innerHTML != "" && box6.innerHTML == "")
				CPUBoxNumber = "six";
		}
		
		console.log(CPUBoxNumber);
		
		//All methods for checking possible moves merely return a string
		//Once the string is confirmed it will call the actual box using that string id
		var CPUBox = document.getElementById(CPUBoxNumber);
		if (move % 2 == 1){	
			CPUBox.innerHTML = "X";
			move++;
			getWinner() ;
		}
		else {
			CPUBox.innerHTML = "O";
			move++;
			getWinner() ;
		}
		
		
		//Checks if the game went to a TIE
		if (move > 9 && gStatus.innerHTML == "Game In Progress....")
			gStatus.innerHTML = "Tie Game";
		
		
		//Avoiding Traps
		//First Turn Setups
	
}

function avoidTrap(){
	// Whatever didn't get covered in CPU's main flowchart is covered here
		// Going over more specific scenarios that can confuse the AI
		
		
	// Opposite Corners Trap
	// The most classic trap
	// The CPU will always go for middle and then
	// The player will play in both opposite corners the CPU's natural flowchart tells it to pick another corner
	// Upon doing so it sets up for a double win scenario for the player that can't be blocked
		if (box5.innerHTML == ""){
			return "five";
		}
		else if (box1.innnerHTML != "" && box9.innerHTML != "" && box1.innerHTML == box9.innerHTML  
			&& box8.innerHTML == ""){
				return "eight";
		}
		else if (box3.innnerHTML != "" && box7.innerHTML != "" && box3.innerHTML == box7.innerHTML && box2.innerHTML == ""){
				return "two";
		}
		
		else if (box2.innerHTML != "" && box5.innerHTML == box2.innerHTML){
			console.log("middle column top to bottom clog");
			if (box8.innerHTML == "")
				return "eight";
		}
		
		else if (box8.innerHTML != "" && box5.innerHTML == box8.innerHTML){
			if (box2.innerHTML == "")
				return "two";
		}
		
		else if (box3.innerHTML != "" && box4.innerHTML != "" && box1.innerHTML == ""){
				return "one";
		}
		
		// Double Edge Corner Trap	
		// Due to the CPU's flowchart to always pick the top left corner when under no pressure
		// It was simple to trap it by placing your move in the lower right edges
		else if (box8.innnerHTML != "" && (box6.innerHTML != "" || box3.innerHTML!= "")){
			if (box9.innerHTML == "")
				return "nine";
			else if (box4.innerHTML == "")
				return "four";
		}
		
		//CPU Glitched consistently when blocking these tiles on a full board
		//Made it an extra priority
		else if (box9.innerHTML != "" && box3.innerHTML == box9.innerHTML){
			console.log("safety trap");
			return "six";
		}
		
		return "none";
}

// Was initially One Generic function to check for both blocks and wins simultaneously
// Split them into X and O so CPU could prioritize its own tile first and go for the win

function checkOWin(){


	// Top Row
	if (box1.innerHTML == "O" && box1.innerHTML == box2.innerHTML){
		if (box3.innerHTML == "")
			return "three";
	}
	if (box3.innerHTML == "O" && box3.innerHTML == box2.innerHTML){
		if (box1.innerHTML == "")	
			return "one";
	}
	if (box3.innerHTML == "O" && box3.innerHTML == box1.innerHTML){
		if (box2.innerHTML == "")	
			return "two";
	}
	
	
	//Middle Row
	if (box4.innerHTML == "O" && box4.innerHTML == box5.innerHTML){
		if (box6.innerHTML == "")	
			return  "six";
	}
	if (box6.innerHTML == "O" && box6.innerHTML == box5.innerHTML){
		if (box4.innerHTML == "")	
			return  "four";
	}
	if (box6.innerHTML == "O" && box6.innerHTML == box4.innerHTML){
		if (box5.innerHTML == "")	
			return  "five";
	}
	
	
	//Bottom Row
	if (box9.innerHTML == "O" && box9.innerHTML == box8.innerHTML){
		if (box7.innerHTML == "")
			return  "seven";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box8.innerHTML){
		if (box9.innerHTML == "")	
			return  "nine";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box9.innerHTML){
		if (box8.innerHTML == "")	
			return  "eight";
	}
	
	
	//Left Column
	if (box1.innerHTML == "O" && box1.innerHTML == box4.innerHTML){
		if (box7.innerHTML == "")	
			return  "seven";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box4.innerHTML){
		if (box1.innerHTML == "")
			return  "one";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box1.innerHTML){
		if (box4.innerHTML == "")
			return  "four";
	}
	
	
	//Middle Column
	
	if (box2.innerHTML == "O" && box2.innerHTML == box5.innerHTML){
		if (box8.innerHTML == "")
			return  "eight";
	}
	if (box8.innerHTML == "O" && box8.innerHTML == box5.innerHTML){
		if (box2.innerHTML == "")
			return  "two";
	}
	if (box8.innerHTML == "O" && box8.innerHTML == box2.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}
	
	
	//Right Column
	if (box9.innerHTML == "O" && box9.innerHTML == box6.innerHTML){
		if (box3.innerHTML == "")
			return  "three";
	}
	if (box9.innerHTML == "O" && box9.innerHTML == box3.innerHTML){
		if (box6.innerHTML == "")
			return  "six";
	}
	if (box3.innerHTML == "O" && box3.innerHTML == box6.innerHTML){
		if (box9.innerHTML == "")
			return  "nine";
	}
	
	
	//UpRight to DownLeft Diagonal
	if (box3.innerHTML == "O" && box3.innerHTML == box5.innerHTML){
		if (box7.innerHTML == "")
			return  "seven";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box5.innerHTML){
		if (box3.innerHTML == "")
			return  "three";
	}
	if (box7.innerHTML == "O" && box7.innerHTML == box3.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}	
	
	
	//UpLeft to DownRight Diagonal
	if (box1.innerHTML == "O" && box1.innerHTML == box5.innerHTML){
		if (box9.innerHTML == "")
			return  "nine";
	}
	if (box9.innerHTML == "O" && box9.innerHTML == box1.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}
	if (box9.innerHTML == "O" && box9.innerHTML == box5.innerHTML){
		if (box1.innerHTML == "")
			return  "one";
	}
	
	// No winning move currently
	return "none";
	
} 

function checkXWin(){

	// Top Row
	if (box1.innerHTML == "X" && box1.innerHTML == box2.innerHTML){
		if (box3.innerHTML == "")
			return "three";
	}
	if (box3.innerHTML == "X" && box3.innerHTML == box2.innerHTML){
		if (box1.innerHTML == "")	
			return "one";
	}
	if (box3.innerHTML == "X" && box3.innerHTML == box1.innerHTML){
		if (box2.innerHTML == "")	
			return "two";
	}
	
	
	//Middle Row
	if (box4.innerHTML == "X" && box4.innerHTML == box5.innerHTML){
		if (box6.innerHTML == "")	
			return  "six";
	}
	if (box6.innerHTML == "X" && box6.innerHTML == box5.innerHTML){
		if (box4.innerHTML == "")	
			return  "four";
	}
	if (box6.innerHTML == "X" && box6.innerHTML == box4.innerHTML){
		if (box5.innerHTML == "")	
			return  "five";
	}
	
	
	//Bottom Row
	if (box9.innerHTML == "X" && box9.innerHTML == box8.innerHTML){
		if (box7.innerHTML == "")
			return  "seven";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box8.innerHTML){
		console.log("need to block 9");
		if (box9.innerHTML == "")	
			return  "nine";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box9.innerHTML){
		if (box8.innerHTML == "")	
			return  "eight";
	}
	
	
	//Left Column
	if (box1.innerHTML == "X" && box1.innerHTML == box4.innerHTML){
		if (box7.innerHTML == "")	
			return  "seven";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box4.innerHTML){
		if (box1.innerHTML == "")
			return  "one";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box1.innerHTML){
		if (box4.innerHTML == "")
			return  "four";
	}
	
	
	//Middle Column
	
	if (box2.innerHTML == "X" && box2.innerHTML == box5.innerHTML){
		if (box8.innerHTML == "")
			return  "eight";
	}
	if (box8.innerHTML == "X" && box8.innerHTML == box5.innerHTML){
		if (box2.innerHTML == "")
			return  "two";
	}
	if (box8.innerHTML == "X" && box8.innerHTML == box2.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}
	
	
	//Right Column
	if (box9.innerHTML == "X" && box9.innerHTML == box6.innerHTML){
		if (box3.innerHTML == "")
			return  "three";
	}
	if (box9.innerHTML == "X" && box9.innerHTML == box3.innerHTML){
		if (box6.innerHTML == "")
			return  "six";
	}
	if (box3.innerHTML == "X" && box3.innerHTML == box6.innerHTML){
		if (box9.innerHTML == "")
			return  "nine";
	}
	
	
	//UpRight to DownLeft Diagonal
	if (box3.innerHTML == "X" && box3.innerHTML == box5.innerHTML){
		if (box7.innerHTML == "")
			return  "seven";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box5.innerHTML){
		if (box3.innerHTML == "")
			return  "three";
	}
	if (box7.innerHTML == "X" && box7.innerHTML == box3.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}	
	
	
	//UpLeft to DownRight Diagonal
	if (box1.innerHTML == "X" && box1.innerHTML == box5.innerHTML){
		if (box9.innerHTML == "")
			return  "nine";
	}
	if (box9.innerHTML == "X" && box9.innerHTML == box1.innerHTML){
		if (box5.innerHTML == "")
			return  "five";
	}
	if (box9.innerHTML == "X" && box9.innerHTML == box5.innerHTML){
		if (box1.innerHTML == "")
			return  "one";
	}
	
	// No winning move currently
	return "none";
	
}
	
// Checks all 8 Possible Win Scenarios
// Upon finding a win will highlight the Three in a row and display appropriate winner message
function getWinner(){

		
	// All Win Conditions
	
	//Top Row
	if (box1.innerHTML != "" && box1.innerHTML == box2.innerHTML && box1.innerHTML == box3.innerHTML){
		box3.style.backgroundColor = "orange";
		box2.style.backgroundColor = "orange";
		box1.style.backgroundColor = "orange";
		if (box1.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else{
			
			gStatus.innerHTML = "O's got that W";
		}
	}
	
	//Left Column
	else if (box1.innerHTML != "" && box1.innerHTML == box4.innerHTML && box1.innerHTML == box7.innerHTML){

		box1.style.backgroundColor = "orange";
		box4.style.backgroundColor = "orange";
		box7.style.backgroundColor = "orange";
		if (box1.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else{
			
			gStatus.innerHTML = "O's got that W";
		}
	}
	
	//TopLeft to BottomRight Diagonal
	else if (box1.innerHTML != "" && box1.innerHTML == box5.innerHTML && box1.innerHTML == box9.innerHTML){
		box1.style.backgroundColor = "orange";
		box5.style.backgroundColor = "orange";
		box9.style.backgroundColor = "orange";
		if (box1.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}	
		
	//TopRight to BottomLeft Diagonal
	else if (box3.innerHTML != "" && box3.innerHTML == box5.innerHTML && box3.innerHTML == box7.innerHTML){
		box3.style.backgroundColor = "orange";
		box5.style.backgroundColor = "orange";
		box7.style.backgroundColor = "orange";
		if (box3.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}	
	
	//Right Column
	else if (box3.innerHTML != "" && box3.innerHTML == box6.innerHTML && box3.innerHTML == box9.innerHTML){
		box3.style.backgroundColor = "orange";
		box6.style.backgroundColor = "orange";
		box9.style.backgroundColor = "orange";
		if (box3.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}	
	
	//Middle Column
	else if (box2.innerHTML != "" && box2.innerHTML == box5.innerHTML && box2.innerHTML == box8.innerHTML){
		box2.style.backgroundColor = "orange";
		box5.style.backgroundColor = "orange";
		box8.style.backgroundColor = "orange";
		if (box2.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}	
	
	//Middle Row
	else if (box4.innerHTML != "" && box4.innerHTML == box5.innerHTML && box4.innerHTML == box6.innerHTML){
		box4.style.backgroundColor = "orange";
		box5.style.backgroundColor = "orange";
		box6.style.backgroundColor = "orange";
		if (box4.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}

	//Bottom Row
	else if (box7.innerHTML != "" && box7.innerHTML == box8.innerHTML && box7.innerHTML == box9.innerHTML){
		box9.style.backgroundColor = "orange";
		box8.style.backgroundColor = "orange";
		box7.style.backgroundColor = "orange";
		if (box7.innerHTML == "X")
			gStatus.innerHTML = "Big Win for X's";
		else
			{
			
			gStatus.innerHTML = "O's got that W";
		}
	}
			
}
