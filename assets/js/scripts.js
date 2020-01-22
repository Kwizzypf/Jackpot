const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;
var tabImg =
[
    "assets/img/1.png",
    "assets/img/2.ico",
    "assets/img/3.ico",
    "assets/img/4.png",
    "assets/img/5.png",
    "assets/img/6.png",
    "assets/img/7.png",
    "assets/img/8.jpg",
    "assets/img/9.png",
    "assets/img/10.jpg",
    "assets/img/11.png",
    "assets/img/12.ico",
]

$("#winner").hide();
var winSeed = getRandomInt(13);

var tableAlreadyOutput = [];
var tableSeedPrevious = [];
var tabWin = [false, false, false, false, true];
var cpt = 0;

function createSlots (ring) {
	
	var slotAngle = 360 / SLOTS_PER_REEL;

	var seed = getSeed();

	for (var i = 0; i < SLOTS_PER_REEL; i ++) {
		var slot = document.createElement('div');
		
		slot.className = 'slot';

		// compute and assign the transform for this slot
		var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;

		// setup the number to show inside the slots
		// the position is randomized to 

		//var content = $(slot).append('<p>' + ((seed + i)%6)+ '</p>');
        slot.style.background = "url("+tabImg[i]+")";
        slot.style.backgroundPosition = "center";
        slot.style.width = "86px";
        slot.style.height = "76px"
		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random()*(SLOTS_PER_REEL));
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
  }


function rollInMore(winSeed, timer, i)
{
	$('#ring'+i).css('animation','back-spin 1s, spin-' + winSeed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + winSeed);
}

function spin(timer) {

	cpt = getRandomInt(5);
	bool = tabWin[cpt];

	var tryed = $(".score").html();
	tryed = parseInt(tryed);

	if( tryed == 0)
	{
		alert("Comeback later");
		return;
	}
	
	$(".score").html(tryed-100);
	
	winSeed = getRandomInt(13);

	for(var i = 2; i < 5; i ++) 
	{
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
		}
		while(oldSeed == winSeed) {
			console.log("test");
			winSeed = getRandomInt(13);
		}
	}
	

	if(bool)
	{
		console.log("win on")
		//var txt = 'seeds: ';
	for(var i = 2; i < 5; i ++) {
		var oldSeed = -1;

		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/

		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
		}

		var seed = getSeed();
		while(oldSeed == seed) {
			console.log("test");
			seed = getSeed();
		}


		$('#ring'+i)
		.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
		.attr('class','ring spin-' + seed);
		
		rollInMore(winSeed, timer, i);
	}

	console.log('=====');
	setTimeout(function()
	{ 
		$("#winner").show();
		$("#winner").delay(2000).fadeOut( 400 );
		$(".score").html(tryed+200);
		tableSeedPrevious.length = 0;
	}, 4000);
	}
	else
	{
		tableAlreadyOutput.length = 0;
	//var txt = 'seeds: ';
	for(var i = 2; i < 5; i ++) {
		var oldSeed = -1;

		/*
		checking that the old seed from the previous iteration is not the same as the current iteration;
		if this happens then the reel will not spin at all
		*/
		var oldClass = $('#ring'+i).attr('class');
		if(oldClass.length > 4) {
			oldSeed = parseInt(oldClass.slice(10));
		}
		var seed = getSeed();

		while(oldSeed == seed) {
			console.log("test");

			seed = getSeed();
		}

		$('#ring'+i)
			.css('animation','back-spin 1s, spin-' + seed + ' ' + (timer + i*0.5) + 's')
			.attr('class','ring spin-' + seed);
	}

	console.log('=====');
	setTimeout(function()
	{ 
		
	}, 4000);
	}
}

$(document).ready(function() {
	
	// initiate slots 
 	createSlots($('#ring2'));
 	createSlots($('#ring3'));
 	createSlots($('#ring4'));
 	
 	// hook start button
 	$('.go').on('click',function(){
 		var timer = 2;
 		spin(timer);
 	})

 


 });