// Word Guess

// My Cool Library:

var myForEach = function(list, func) {
	if (Array.isArray(list)){
		for (i = 0; i < list.length; i++) {
			func(list[i],i,list);
		}
	} else {
		for (key in list) {
			func(list[key],key,list);
		}
	}
};

var myFind = function (list,pred) { // should take function {return val === "dog"}
	var result;
	for (i = 0; i < list.length; i++) { //cant use forEach here bc it cannot be broken out of
		if(pred(list[i])) {
			result = list[i];

			return result;
		}
	}
	
}
// test :
// var myFindTest = myFind([1,2,3,4,5,6],function(val){return val % 2 === 0})
// console.log(myFindTest);

var myMap = function(arr, func) { //only used to create blank currentWord at start of game
	results = [];
	myForEach(arr,function(val){
		results.push(func(val))
	});
	return results;
};

var myFindReplace = function(baseArr,newArr, str) {
	myForEach(baseArr,function(val,ind,list){
		if (val === str) {
			newArr[ind] = str;
		}
	})
	return (myFind(newArr,function(val){return str === val}))
}

function arraysAreIdentical(arr1, arr2){
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++){
        if (arr1[i] !== arr2[i]){
            return false;
        }
    }
    return true;
};

// end of My Cool Library

// game setup
var possibleWords = ["grapefruit","pomegranate","watermelon","tangerine"];
var goalWord = possibleWords[Math.floor(Math.random() * possibleWords.length)].split(""); //choose random word from possibleWords
var currentWord = myMap(goalWord,function(){return "_"}) //create an array of underscores
var incorrectGuesses = [];
var validEntries = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var message = "uh oh. game not working.";

$( document ).ready(function() {
    $('#results-container2').html(currentWord.join(" "));
});

// end of game setup

var takeTurn = function(){
	guess = $('#guess').val().toLowerCase();
	var getMessage = function() {
		if (myFind(validEntries,function(val){return val === guess})){ //if guess is in valid entry
			if(myFind(currentWord,function(val){return guess === val})){ //if guess is in currentWord
				return "you already got that one";
			} else {
				if (myFindReplace(goalWord,currentWord,guess)) { //if guess is in goalWord
					if (arraysAreIdentical(goalWord, currentWord)) {
						$('#results-container2').css("font-weight","Bold");
						return "You won!!! Refresh to play again."
					} else {
						return "you got a new letter!"; 
					}
				} else {
					if(myFind(incorrectGuesses,function(val){return guess === val})){ //if guess is in incorrectGuesses
						return "still nope";
					} else {
						incorrectGuesses.push(guess);
						return "nope";
					}
				}
			}
		} else {
			return "oops! please enter a letter";
		}
	}
	gotMessage = getMessage();
	$('#results-container1').html(gotMessage);
	$('#results-container2').html(currentWord.join(" "));
	if (gotMessage === "nope") {
		$('#results-container3').html(incorrectGuesses.join(" "));
	}
	$('#guess').val('');
	return "yay";
}

// /////////////// experiments:

// var myFilter = function(arr,func) {
// 	results = [];
// 	myForEach(arr,function(val,ind,arr){
// 		if (func(val)){
// 			results.push(val)
// 		}
// 	})
// 	return results;
// };

// tests :
// var filtered = myFilter([1,2,3,4,5,6],function(val){return val % 2 === 0});

// var filteredMapped = myMap(myFilter([1,2,3,4,5,6],function(val,ind,arr){return val % 3 === 0}), function(val1){return val1 * 10})
// console.log(filteredMapped);
