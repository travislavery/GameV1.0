var bubbles;
var player;
var ceiling;
var drunkLevel = 0;
var platforms;
var objects;
var runner;
var beerSpin;
var scoreText;
var star;
var music;
var mute;
var winText;
var click;
var left;
var right;
var bubbleR;
var bubbleB;
var printme;
var leftArrow;
var rightArrow;
var upArrow;
var downArrow;
var bubble;
var bubble2;
var driverTrail;

var playState={
	create: function(){

		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, game.world.height - 238, 'ground')
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height-1, 'floor');
		ground.body.immovable = true;

		redCeiling = game.add.group();
		redCeiling.enableBody = true;
		var ceiling1 = redCeiling.create(0, 0, 'redSpike');
		ceiling1.body.immovable = true;

		blueCeiling = game.add.group();
		blueCeiling.enableBody = true;
		var ceiling2 = blueCeiling.create(665, 0, 'blueSpike');
		ceiling2.body.immovable = true;

		//music = game.sound.play('zeldaFTW');
		mute = game.add.button(570, game.world.height-710, 'muteButton', muteOnClick, this, 0, 2);

		objects = game.add.group();
		objects.enableBody = true;
		game.time.events.repeat(100, 8, cloudSpawn, this);
		

		runner = game.add.sprite(32, game.world.height-150, 'dude');
		game.physics.arcade.enable(runner);
		runner.body.bounce.y = 0.2;
		runner.body.gravity.y = 300;
		runner.body.collideWorldBounds= true;
		runner.animations.add('run', [5, 6, 7, 8], 10, true);
		
		star = game.add.sprite(1120, 100, 'winObject');
		game.physics.arcade.enable(star);
		star.anchor.setTo(0.5, 0.5);
		star.enableBody= true;
		star.body.gravity.y= 300;
		star.body.bounce.y= .5;

		bubbleR = [];
		bubbleB = [];
		redBubbles = game.add.group();
		redBubbles.enableBody = true;
		redBubbles.inputEnabled = true;
		blueBubbles = game.add.group();
		blueBubbles.enableBody = true;
		blueBubbles.inputEnabled = true;
		game.time.events.repeat(1000, 8, bubbleSpawn, this);


		
		scoreText = game.add.text(16, 600, 'Desire to be Drunk: 0', { fontSize: '32px', fill: '#ffffff' });
		beerSpin = game.add.sprite(scoreText.x + 370, scoreText.y - 10, 'beerStein')
		game.physics.arcade.enable(beerSpin);
		beerSpin.anchor.setTo(0.5, 0.5);
		beerSpin.body.maxAngular = 900;
		beerSpin.body.angularDrag = 300;
		beerSpin.scale.setTo(.33,.33);
		beerSpin.animations.add('spin', [0,1,2,3,4,5,6,7,8,9,10], 10, true);

		cursors = game.input.keyboard.createCursorKeys();
		game.input.mouse.capture = true;


		/*leftArrow = game.input.keyboard(Phaser.Keyboard.LEFT);
		rightArrow = game.input.keyboard(Phaser.Keyboard.RIGHT);
		downArrow = game.input.keyboard(Phaser.Keyboard.DOWN);
		upArrow = game.input.keyboard(Phaser.Keyboard.UP);*/
		right = game.input.activePointer.rightButton;
		left = game.input.activePointer.leftButton;
		printme = left.x;
		spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	spaceKey.onDown.add(togglePause, this);
	},
	update: function(){
		
		game.physics.arcade.collide(star, platforms);
		game.physics.arcade.collide(runner, platforms);
		game.physics.arcade.overlap(redBubbles, redCeiling, popBubbleR, null, this);
		game.physics.arcade.overlap(blueBubbles, redCeiling, popBubbleR, null, this);
		game.physics.arcade.overlap(redBubbles, blueCeiling, popBubbleB, null, this);
		game.physics.arcade.overlap(blueBubbles, blueCeiling, popBubbleB, null, this);
		game.physics.arcade.collide(redBubbles, objects, destroyObject, null, this);
		game.physics.arcade.collide(blueBubbles, objects, destroyObject, null, this);
		/*game.physics.arcade.collide(pointer, bubbles);*/
		game.physics.arcade.collide(redBubbles, redBubbles);
		game.physics.arcade.collide(blueBubbles, blueBubbles);
		game.physics.arcade.collide(redBubbles, blueBubbles);
		game.physics.arcade.overlap(redBubbles, redBubbles, bounceApart, null, this);
		game.physics.arcade.overlap(blueBubbles, blueBubbles, bounceApart, null, this);
		game.physics.arcade.overlap(blueBubbles, redBubbles, bounceApart, null, this);
		game.physics.arcade.overlap(runner, star, winGame, null, this);
		drunkNess(drunkLevel);
		if (hasDriver) {
			driver(driverNow);
		}
	}
}

function whatO() {

}
function togglePause() {
    game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
}
var driverNow = 0;
var hasDriver = false;

function setDriver(bubble) {
	driverNow = bubble;
}
function driver(bubble) {
	//var directionArrow = game.add.sprite(bubble.x, bubble.y, 'driverArrow');
	//directionArrow.rotate(bubble.x, bubble.y, bubble.body.angle, true);
	setDriver(bubble);
	hasDriver = true;

	bubble.body.velocity.x = 0;
	bubble.body.velocity.y = 0;
	driverTrail = game.add.emitter()
	//Harder to control, trying to set velocity to 0 instead.
	/*if (bubble.body.velocity.x > 0) {
		bubble.body.velocity.x -= 10;
	} else if (bubble.body.velocity.x < 0) {
		bubble.body.velocity.x += 10;
	} 

	if (bubble.body.velocity.y > 0) {
		bubble.body.velocity.y -= 10;
	} else if (bubble.body.velocity.y < 0) {
		bubble.body.velocity.y += 10;
	} */

	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		bubble.body.angularVelocity = -200;
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		bubble.body.angularVelocity = 200;
	}
	if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		game.physics.arcade.velocityFromAngle(bubble.angle, 300, bubble.body.velocity);
	}
}
function drunkNess(drunk) {
	runner.body.velocity.x=0;
	if (drunk>0) {
		runner.body.velocity.x = 80;
		runner.animations.play('run');
		beerSpin.body.angularAcceleration += 200;
		drunkLevel -= Math.round(.2*100)/100;
		scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
	} else if (drunk<=0) {
		beerSpin.body.angularAcceleration = 0;
		runner.animations.stop();
		runner.frame = 4;
		drunkLevel = 0;
		scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
	}
}
function cloudSpawn() {
	var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
	stand.body.immovable = true;
}
var nameNum = 0;
function bubbleSpawn() {
	bubble = blueBubbles.create((1200*Math.random()), game.world.height + 10, 'bubble1');
	bubbleTraits(bubble);
	bubbleR.push(bubble); 
	bubble.events.onInputDown.add(function (s) {driver(s)});
		
	bubble2 = redBubbles.create((1200*Math.random()), game.world.height + 10, 'bubble2');
	bubbleTraits(bubble2);
	bubbleB.push(bubble2);
	//bubble2.events.listener.onInputDown.add(driver(bubble));


}
function bubbleTraits(bubble) {
	bubble.name = 'bubble' + nameNum.toString();
	nameNum += 1;
	bubble.anchor.setTo(0.5, 0.5);
	bubble.body.gravity.y = -5;
	bubble.body.bounce.y = .8;
	bubble.body.bounce.x = .8;
	bubble.body.collideWorldBounds=true;
	bubble.body.maxAngular = 500;
	bubble.body.angularDrag = 50;
	bubble.inputEnabled = true;
	//bubble.events.onInputDown.add(driver, this);
	//bubble.events.onInputUpdate.add(driverCircle);
	//bubble.input.enableDrag(true);
	bubble.body.angularAcceleration = Math.floor(Math.random()*500);
}

function beerDrop() {
	
}

/*function pairedBubbles(bubbleR) {
	for (var i = 0; i < bubbleG.length; i= i+2) {
		if (bubbleG[i].isDragged) {
			console.log(bubbleG[i+1].position)
		}
	}
}*/
function muteOnClick() {
	music.mute =! music.mute;	
}


function winGame(runner, star){
	runner.body.velocity.y= -150;
	winText = game.add.text(game.world.centerX - 300, game.world.centerY, "God damn alcoholic", { fontSize: '72px', fill: '#ffffff' });
}

function bounceApart(bubble1, bubble2,){
	bubble1.body.velocity.setTo(-20, -15);
	bubble2.body.velocity.setTo(20, -15);
}

function destroyObject(bubble, object){
	object.kill();
	if (bubble.body.x >= 640){
		bubble.body.velocity.x = -150;
	} else if (bubble.body.x < 640){
		bubble.body.velocity.x = 150;
	}
}
function popBubbleR(bubble, ceiling){
	bubble.kill();
	drunkLevel += Math.round(10*100)/100;
	scoreText.text = 'Desire to be Drunk: '+ drunkLevel;
	console.log('red');
}
function popBubbleB(bubble, ceiling){
	bubble.kill();
	drunkLevel += Math.round(10*100)/100;
	scoreText.text = 'Desire to be Drunk: '+ drunkLevel;
	console.log('blue');
}
