define([
	'game/level/levels/Level1'
], function(
	Level
) {
	var scene = new Level();

	function update() {
		scene.update();
	}
	function render(ctx) {
		scene.render(ctx);
	}
	function onMouseEvent(evt) {
		scene.onMouseEvent(evt);
	}
	function onKeyboardEvent(evt, keyboard) {
		scene.onKeyboardEvent(evt, keyboard);
	}

	return {
		update: update,
		render: render,
		onMouseEvent: onMouseEvent,
		onKeyboardEvent: onKeyboardEvent
	};
});