var loadState={
	preload: function() {
		var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px Courier', fill: '#ffffff'});
		game.load.audio('zeldaFTW', 'assets/music/lozow.mp3');
		game.load.image('sky', 'assets/images/sunset.jpg');
		game.load.image('winObject', 'assets/images/beerWin.png')
		game.load.image('ground', 'assets/images/streetOnly.png');
		game.load.image('wall', 'assets/images/wall.png')
		game.load.image('bubble1', 'assets/images/bubble1.png');
		game.load.image('bubble2', 'assets/images/bubble2.png');
		game.load.image('spikes', 'assets/images/spikes2.png');
		game.load.image('blueSpike', 'assets/images/blueSpike.png');
		game.load.image('redSpike', 'assets/images/redSpike.png');
		game.load.image('platform', 'assets/images/randomPlatform.png');
		game.load.image('floor', 'assets/images/platform.png');
		game.load.image('cloud', 'assets/images/cloud.png');
		game.load.spritesheet('muteButton', 'assets/sprites/muteButton.png', 128, 115);
		game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
		game.load.spritesheet('beerStein', 'assets/sprites/beerStein.png', 135.7, 139);
		game.load.spritesheet('characters', 'assets/sprites/antifareawhite.png', 16, 18);
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.PageAlignHorizontally = true;
		game.scale.PageAlignVertically = true;
		game.stage.backgroundColor = '#000000';

		
	},
	create: function(){
		game.state.start('title');
	}
}