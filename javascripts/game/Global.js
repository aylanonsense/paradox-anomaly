define({
	TARGET_FRAMERATE: 60, //used for moving actors the correct amount each frame
	CANVAS_WIDTH: 800,
	CANVAS_HEIGHT: 600,
	TILE_WIDTH: 80,
	TILE_HEIGHT: 60,
	IMAGE_SMOOTHING: false,
	KEY_BINDINGS: {
		37: 'MOVE_LEFT', //left arrow key
		39: 'MOVE_RIGHT', //right arrow key
		38: 'MOVE_UP', //up arrow key
		40: 'MOVE_DOWN', //down arrow key
		90: 'USE', //z key
		88: 'TIME_TRAVEL', //x key
		16: 'STAND_STILL' //shift key
	},

	//debug variables
	DEBUG_FRAMERATE: null,
	DEBUG_DRAW_GRIDLINES: true,
	DEBUG_DRAW_ACTOR_BORDERS: true
});