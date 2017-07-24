var inquirer = require('inquirer');
var fs = require('fs');


var cardData = require('./clozeCards.json');

function ClozeCard(fullText,answer){
	var clozePosition = clozeDelete(fullText,answer);

	this.partial = getPartial(fullText,clozePosition);

	this.answer = answer;

	function clozeDelete(fullText,answer){
		var start = fullText.indexOf(answer);
		if(start !== -1){
			return [start, start+answer.length];
			}
			throw new Error("Incorrect!")
		}
		
		function getPartial(fullText,clozePosition){
			var start = fullText.slice(0,clozePosition[0]);
			var end = fullText.slice(clozePosition[1],fullText.length);
			return start+" ... "+end;
		}

}



ClozeCard.prototype.displayCard = function displayCard(){
	console.log(this.partial.replace("...",this.answer))
}



function createNewCard(){
	inquirer.prompt([{
		type:"input",
		name:"fullText",
		message:"What is the full text of the flashcard you would like to make?"
	},{ 
		type:"input",
		name:"answer",
		message:"What is the answer to the flashcard?"
	}]).then(function(inputs){
		var card = new ClozeCard(inputs.fullText,inputs.answer);
		cardData.push(card);
		card.displayCard();
		
		var newCardData = JSON.stringify(cardData,null,'\t');
		fs.writeFile('./clozeCards.json',newCardData,function(err){
		if(err)throw err;
		console.log("Done");
		})
	})
}



createNewCard();












