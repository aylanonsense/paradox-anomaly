define({
	TARGET_FRAMERATE: 60, //used for moving actors the correct amount each frame
	CANVAS_WIDTH: 432,
	CANVAS_HEIGHT: 324,
	TILE_WIDTH: 4 * 12,
	TILE_HEIGHT: 4 * 9,
	IMAGE_SMOOTHING: false,
	KEY_BINDINGS: {
		38: 'MOVE_UP', 87: 'MOVE_UP', //up arrow key / w key
		37: 'MOVE_LEFT', 65: 'MOVE_LEFT', //left arrow key / a key
		40: 'MOVE_DOWN', 83: 'MOVE_DOWN', //down arrow key / s key
		39: 'MOVE_RIGHT', 68: 'MOVE_RIGHT', //right arrow key / d key
		90: 'USE', //z key
		88: 'TIME_TRAVEL', //x key
		16: 'STAND_STILL' //shift key
	},

	//debug variables
	DEBUG_FRAMERATE: null,
	DEBUG_DRAW_GRIDLINES: false,
	DEBUG_TRACE_SPRITES: false,
	DEBUG_HIDE_SPRITES: false
});