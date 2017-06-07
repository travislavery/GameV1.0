var bubbles;
var player;
var ceiling;
var drunkLevel = 0;
var platforms;
var objects;
var runner;

var playState={
	create: function(){
		game.add.sprite(0, 0, 'sky');
		game.add.sprite(0, game.world.height - 130, 'ground')
		platforms = game.add.group();
		platforms.enableBody = true;
		var ground = platforms.create(0, game.world.height-1, 'floor');
		ground.scale.setTo(1,.25);
		ground.body.immovable = true;

		objects = game.add.group();
		objects.enableBody = true;
		for (var i = 0; i < 4; i++) {
			var stand = objects.create((1200*Math.random()), game.world.height - (650 * Math.random()), 'cloud');
			stand.body.immovable = true;
		}
		ceiling= game.add.group();
		ceiling.enableBody = true;
		var ceiling1 = ceiling.create(0, 0, 'spikes');
		ceiling.scale.setTo(1, 1);
		ceiling1.body.immovable = true;

		runner = game.add.sprite(32, game.world.height-150, 'dude');
		game.physics.arcade.enable(runner);
		runner.body.bounce.y = 0.2;
		runner.body.gravity.y = 300;
		runner.body.collideWorldBounds= true;
		runner.animations.add('run', [5, 6, 7, 8], 10, true);

		bubbles = game.add.group();
		bubbles.enableBody = true;
		for (var i = 0; i < 4; i ++) {
			var bubble = bubbles.create((1200*Math.random()), game.world.height + 10, 'bubble1');
			bubble.body.gravity.y = -5;
			bubble.scale.setTo(1, 1);
			bubble.body.bounce.y = .8;
		}

		/*player = game.add.sprite(32, game.world.height - 150, 'characters');*/
		

		cursors = game.input.keyboard.createCursorKeys();

		scoreText = game.add.text(16, 16, 'Desire to be Drunk: 0', { fontSize: '32px', fill: '#ffffff' });
	},
	update: function(){
		game.physics.arcade.collide(runner, platforms);
		game.physics.arcade.overlap(bubbles, ceiling, popBubble, null, this);
		game.physics.arcade.collide(bubbles, objects, destroyObject, null, this);

		runner.body.velocity.x=0;
		if (drunkLevel>0) {
			runner.body.velocity.x = 80;
			runner.animations.play('run');
			drunkLevel -= Math.round(.05*100)/100;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		} else if (drunkLevel<=0) {
			runner.animations.stop();
			runner.frame = 4;
			drunkLevel = 0;
			scoreText.text = 'Desire to be Drunk: '+ Math.round(drunkLevel*100)/100;
		}
	}
}
function destroyObject(bubble, object){
	object.kill();
}
function popBubble(bubble, ceiling){
	bubble.kill();
	drunkLevel += Math.round(10*100)/100;
	scoreText.text = 'Desire to be Drunk: '+ drunkLevel;
}
