if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/state/LevelRunner',
	'game/levels/TestLevel/Level'
], function(
	LevelRunner,
	Level
) {
	var scene = new LevelRunner(new Level());

	function update() {
		scene.update();
	}
	function render(ctx) {
		scene.render(ctx);
	}

	return {
		update: update,
		render: render,
		onMouseEvent: function() {},
		onKeyboardEvent: function() {}
	};
});