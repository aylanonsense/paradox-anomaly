define([
	'game/Global'
], function(
	Global
) {
	function LevelRunner(level) {
		this._level = level;
	}
	LevelRunner.prototype.update = function() {
		var i, j, steps;

		//start of frame
		this._level.startOfFrame();
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].startOfFrame();
			}
		}

		//tick (move everything)
		for(i = this._level.actors.length - 1; i >= 0; i--) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].tick();
			}
		}

		//end of frame
		for(i = 0; i < this._level.actors.length; i++) {
			if(this._level.actors[i].isAlive()) {
				this._level.actors[i].endOfFrame();
			}
		}
		this._level.endOfFrame();
	};
	LevelRunner.prototype.render = function(ctx) {
		ctx.fillStyle = this._level.backgroundColor;
		ctx.fillRect(0, 0, Global.CANVAS_WIDTH, Global.CANVAS_HEIGHT);
		this._level.tileGrid.render(ctx, this._level.camera);
	};
	LevelRunner.prototype.onKeyboardEvent = function(evt, keyboard) {
		this._level.onKeyboardEvent(evt, keyboard);
	};
	LevelRunner.prototype.onMouseEvent = function(evt) {
		this._level.onMouseEvent(evt);
	};
	return LevelRunner;
});