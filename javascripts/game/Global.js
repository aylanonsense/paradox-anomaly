define({
	TARGET_FRAMERATE: 60, //used for moving actors the correct amount each frame
	CANVAS_WIDTH: 800,
	CANVAS_HEIGHT: 600,
	TILE_WIDTH: 36,
	TILE_HEIGHT: 20,
	IMAGE_SMOOTHING: false,
	KEY_BINDINGS: {
		37: 'MOVE_LEFT', //left arrow key
		39: 'MOVE_RIGHT', //right arrow key
		38: 'MOVE_UP', //up arrow key
		40: 'MOVE_DOWN' //down arrow key
	},
	RENDER_LAYERS: [
		'FAR_BACKGROUND', //on top of the background image/color
		'BACKGROUND', //on top of the background tile grid, beneath the tile grid
		'STAGE', //on top of the tile grid
		'FOREGROUND', //on top of stage actors
		'FAR_FOREGROUND' //on top of the HUD
	],

	//debug variables
	DEBUG_FRAMERATE: null,
	DEBUG_DRAW_GRIDLINES: true
});