/* istanbul ignore if  */ if (typeof define !== 'function') { var define = require('amdefine')(module); }
define({
	DEBUG_FRAMERATE: null, //only use for debug purposes, set to null
	TARGET_FRAMERATE: 60, //used for moving actors the "correct" amount each frame
	WIDTH: 800,
	HEIGHT: 600,
	TILE_SIZE: 32,
	MAX_STEPS_PER_FRAME: 20,
	KEY_BINDINGS: {
		32: 'JUMP', //space bar
		37: 'MOVE_LEFT', //left arrow key
		38: 'MOVE_DOWN', //down arrow key
		39: 'MOVE_RIGHT', //right arrow key
		40: 'MOVE_UP', //up arrow key
		65: 'SHOOT' //A key
	},
	RENDER_LAYERS: [
		'FAR_BACKGROUND', //on top of the background image/color
		'BACKGROUND', //on top of the background tile grid, beneath the tile grid
		'STAGE', //on top of the tile grid
		'FOREGROUND', //on top of stage actors
		'FAR_FOREGROUND' //on top of the HUD
	]
});