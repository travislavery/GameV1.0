var loadState={
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
		game.load.image('sky', 'assets/backgroundBar.jpg');
		game.load.image('ground', 'assets/streetBar.png');
		game.load.image('bubble1', 'assets/bubble1.png');
		game.load.image('bubble2', 'assets/bubble2.png');
		game.load.image('spikes', 'assets/spikes2.png');
		game.load.image('platform', 'assets/randomPlatform.png');
		game.load.image('floor', 'assets/platform.png');
		game.load.image('cloud', 'assets/cloud.png');
		game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizontally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		game.load.spritesheet('characters', 'assets/sprites/antifareawhite.png', 16, 18);
	},
	create: function(){
		game.state.start('title');
	}
}