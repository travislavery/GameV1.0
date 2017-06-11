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
var bubbleG;
var printme;

var playState={
	create: function(){
		music = game.sound.play('zeldaFTW');
		

		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, game.world.height - 238, 'ground')
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height-1, 'floor');
		ground.body.immovable = true;

		mute = game.add.button(570, game.world.height-710, 'muteButton', muteOnClick, this, 0, 2);

		objects = game.add.group();
		objects.enableBody = true;
		for (var i = 0; i < 8; i++) {
			var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
			stand.body.immovable = true;
		}
		ceiling= game.add.group();
		ceiling.enableBody = true;
		var ceiling1 = ceiling.create(0, 0, 'redSpike');
		ceiling.scale.setTo(1, 1);
		ceiling1.body.immovable = true;
		var ceiling2 = ceiling.create(665, 0, 'blueSpike')

		runner = game.add.sprite(32, game.world.height-150, 'dude');
		game.physics.arcade.enable(runner);
		runner.body.bounce.y = 0.2;
		runner.body.gravity.y = 300;
		runner.body.collideWorldBounds= true;
		runner.animations.add('run', [5, 6, 7, 8], 10, true);

		star = game.add.sprite(1100, 100, 'winObject');
		game.physics.arcade.enable(star);
		star.enableBody= true;
		star.body.gravity.y= 300;
		star.body.bounce.y= .5;
		
		bubbleG = [];
		bubbles = game.add.group();
		bubbles.enableBody = true;
		bubbleSpawn();
		
		scoreText = game.add.text(16, 600, 'Desire to be Drunk: 0', { fontSize: '32px', fill: '#ffffff' });
		beerSpin = game.add.sprite(scoreText.x + 370, scoreText.y - 10, 'beerStein')
		game.physics.arcade.enable(beerSpin);
		beerSpin.scale.setTo(.33,.33);
		beerSpin.animations.add('spin', [0,1,2,3,4,5,6,7,8,9,10], 10, true);

		

		cursors = game.input.keyboard.createCursorKeys();
		game.input.mouse.capture = true;
		right = game.input.activePointer.rightButton;
		left = game.input.activePointer.leftButton;
		printme = left.x;
	},
	update: function(){
		if(runner.x === 1100) {
			beerDrop();
		}
		if(left.isDown) {
			console.log(left.worldX);
		}
		if(bubbles) {
			bubbleSpin(bubbleG);
			pairedBubbles(bubbleG);
		}
		game.physics.arcade.collide(star, platforms);
		game.physics.arcade.collide(runner, platforms);
		game.physics.arcade.overlap(bubbles, ceiling, popBubble, null, this);
		game.physics.arcade.collide(bubbles, objects, destroyObject, null, this);
		/*game.physics.arcade.collide(pointer, bubbles);*/
		game.physics.arcade.collide(bubbles, bubbles);
		game.physics.arcade.overlap(bubbles, bubbles, bounceApart, null, this);
		game.physics.arcade.overlap(runner, star, winGame, null, this);

		

		runner.body.velocity.x=0;
		if (drunkLevel>0) {
			runner.body.velocity.x = 80;
			runner.animations.play('run');
			beerSpin.animations.play('spin');
			drunkLevel -= Math.round(.2*100)/100;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		} else if (drunkLevel<=0) {
			beerSpin.animations.stop();
			runner.animations.stop();
			runner.frame = 4;
			drunkLevel = 0;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		}
	}
}
function bubbleSpawn() {
	for (var i = 0; i < 8; i++) {
		var bubble = bubbles.create((1200*Math.random()), game.world.height + 10, 'bubble1');
		bubbleTraits(bubble);
		bubbleG.push(bubble);
		
		var bubble2 = bubbles.create((1200*Math.random()), game.world.height + 10, 'bubble2');
		bubbleTraits(bubble2);
		bubbleG.push(bubble2);
	}
}
function bubbleTraits(bubble) {
	bubble.anchor.setTo(0.5, 0.5);
	bubble.body.gravity.y = -5;
	bubble.body.bounce.y = .8;
	bubble.body.bounce.x = .8;
	bubble.body.collideWorldBounds=true;
	bubble.inputEnabled = true;
	bubble.input.enableDrag(true);
	bubble.angle = Math.floor(Math.random()*360);
}

function beerDrop() {
	
}

function bubbleSpin(bubbleG) {
	for (var i = 0; i < bubbleG.length; i++) {
		bubbleG[i].angle += 1;
	}
}
function pairedBubbles(bubbleG) {
	for (var i = 0; i < bubbleG.length; i= i+2) {
		if (bubbleG[i].isDragged) {
			console.log(bubbleG[i+1].position)
		}
	}
}
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
function popBubble(bubble, ceiling){
	bubble.kill();
	drunkLevel += Math.round(10*100)/100;
	scoreText.text = 'Desire to be Drunk: '+ drunkLevel;
}
