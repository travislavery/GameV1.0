var bubbles;
var player;
var ceiling;
var drunkLevel = 0;
var platforms;
var objects;
var runner;
var pointer;
var scoreText;

var playState={
	create: function(){
		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, game.world.height - 238, 'ground')
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height-1, 'floor');
		ground.body.immovable = true;

		objects = game.add.group();
		objects.enableBody = true;
		for (var i = 0; i < 4; i++) {
			var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
			stand.body.immovable = true;
		}
		ceiling= game.add.group();
		ceiling.enableBody = true;
		var ceiling1 = ceiling.create(0, 0, 'redSpike');
		ceiling.scale.setTo(.8, 1);
		ceiling1.body.immovable = true;
		var ceiling2 = ceiling.create(900, 0, 'blueSpike')

		runner = game.add.sprite(32, game.world.height-150, 'dude');
		game.physics.arcade.enable(runner);
		runner.body.bounce.y = 0.2;
		runner.body.gravity.y = 300;
		runner.body.collideWorldBounds= true;
		runner.animations.add('run', [5, 6, 7, 8], 10, true);

		

		bubbles = game.add.group();
		bubbles.enableBody = true;;
		for (var i = 0; i < 8; i ++) {
			var bubble = bubbles.create((1200*Math.random()), game.world.height + 10, 'bubble1');
			bubble.body.gravity.y = -5;
			bubble.scale.setTo(1, 1);
			bubble.body.bounce.y = .8;
			bubble.body.bounce.x = .3;
			bubble.body.collideWorldBounds=true;
			bubble.inputEnabled = true;
			bubble.input.enableDrag(true);
		}
		for (var i = 0; i < 8; i ++) {
			var bubble = bubbles.create((1200*Math.random()), game.world.height + 10, 'bubble2');
			bubble.body.gravity.y = -5;
			bubble.scale.setTo(1, 1);
			bubble.body.bounce.y = .8;
			bubble.body.bounce.x = .3;
			bubble.body.collideWorldBounds=true;
			bubble.inputEnabled = true;
			bubble.input.enableDrag(true);
		}

		/*player = game.add.sprite(32, game.world.height - 150, 'characters');*/
		

		cursors = game.input.keyboard.createCursorKeys();
		game.input.mouse.capture = true;


		scoreText = game.add.text(16, 600, 'Desire to be Drunk: 0', { fontSize: '32px', fill: '#ffffff' });
		pointer = game.add.sprite(scoreText.x + 350, scoreText.y - 10, 'beerStein')
		game.physics.arcade.enable(pointer);
		pointer.scale.setTo(.33,.33);
		pointer.animations.add('spin', [0,1,2,3,4,5,6,7,8,9,10], 10, true);
	},
	update: function(){
		game.physics.arcade.collide(runner, platforms);
		game.physics.arcade.overlap(bubbles, ceiling, popBubble, null, this);
		game.physics.arcade.collide(bubbles, objects, destroyObject, null, this);
		/*game.physics.arcade.collide(pointer, bubbles);*/
		game.physics.arcade.collide(bubbles, bubbles);
		game.physics.arcade.overlap(bubbles, bubbles, bounceApart, null, this);

		runner.body.velocity.x=0;
		if (drunkLevel>0) {
			runner.body.velocity.x = 80;
			runner.animations.play('run');
			pointer.animations.play('spin');
			drunkLevel -= Math.round(.2*100)/100;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		} else if (drunkLevel<=0) {
			pointer.animations.stop();
			runner.animations.stop();
			runner.frame = 4;
			drunkLevel = 0;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		}

		/*if (game.input.mousePointer.isDown) {
			game.physics.arcade.moveToPointer(pointer, 300);
			pointer.animations.play('spin');
			if (Phaser.Rectangle.contains(pointer.body, game.input.x, game.input.y)) {
				pointer.body.velocity.setTo(0,0);
			}
		} else {
			pointer.body.velocity.setTo(0, 0);
			pointer.animations.stop();

		}*/
		if (bubbles.length === 0) {
			game.state.start('title');
		}
	}
}
function bounceApart(bubble1, bubble2,){
	bubble1.body.velocity.setTo(-10, 0);
	bubble2.body.velocity.setTo(10, 0);
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
