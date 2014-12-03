//configure requirejs
requirejs.config({
	baseUrl: 'javascripts',
	paths: {
		jquery: '/javascripts/lib/jquery',
		create: '/javascripts/lib/instanqi8'
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
		if(Global.KEY_BINDINGS[evt.which] && keyboard[evt.which] !== evt.isDown) {
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