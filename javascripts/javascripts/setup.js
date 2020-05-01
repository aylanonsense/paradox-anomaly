//configure requirejs
requirejs.config({
	baseUrl: BASE_URL + '/javascripts',
	paths: {
		jquery: 'lib/jquery',
		create: 'lib/instanqi8'
	}
});

//start client
requirejs([
	'jquery',
	'game/Global',
	'game/Main'
], function(
	$,
	Global,
	Game
) {
	//compute some globals
	var viewingAngle = Math.atan2(Global.TILE_HEIGHT, Global.TILE_WIDTH - Global.TILE_HEIGHT);
	Global.DEBUG_HEIGHT_MULT = Math.cos(viewingAngle);
	Global.DEBUG_DEPTH_MULT = Math.sin(viewingAngle);

	//init vars
	var ctx = $('#game-canvas')[0].getContext('2d');
	ctx.imageSmoothingEnabled = Global.IMAGE_SMOOTHING;
	ctx.webkitImageSmoothingEnabled = Global.IMAGE_SMOOTHING;
	ctx.msImageSmoothingEnabled = Global.IMAGE_SMOOTHING;
	ctx.imageSmoothingEnabled = Global.IMAGE_SMOOTHING;

	//add input listeners
	var keyboard = {};
	for(var key in Global.KEY_BINDINGS) { keyboard[Global.KEY_BINDINGS[key]] = false; }
	$(document).on('keydown keyup', function(evt) {
		evt.isDown = (evt.type === 'keydown');
		if(Global.KEY_BINDINGS[evt.which] && keyboard[Global.KEY_BINDINGS[evt.which]] !== evt.isDown) {
			keyboard[Global.KEY_BINDINGS[evt.which]] = evt.isDown;
			evt.gameKey = Global.KEY_BINDINGS[evt.which];
			Game.onKeyboardEvent(evt, keyboard);
		}
	});
	$('#game-canvas').on('mousemove mouseup mousedown', Game.onMouseEvent);

	//set up the game loop
	function loop() {
		Game.update();
		Game.render(ctx);
		scheduleLoop();
	}
	function scheduleLoop() {
		if(Global.DEBUG_FRAMERATE) {
			setTimeout(loop, 1000 / Global.DEBUG_FRAMERATE);
		}
		else {
			requestAnimationFrame(loop);
		}
	}

	//kick off the game loop
	scheduleLoop();
});