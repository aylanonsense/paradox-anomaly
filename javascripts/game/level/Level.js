define([
	'game/Global',
	'game/tile/TileGrid'
], function(
	Global,
	TileGrid
) {
	function Level() {
		this.backgroundColor = '#222';
		this.player = null;
		this.tileGrid = new TileGrid();
		this.objects = [];
		this.camera = { x: 0, y: 0 };
		this.frame = 0;
		this._stateHistory = {};
	}
	Level.prototype.update = function() {
		var i, j, steps;

		//save state
		if(this.frame % 15 === 0) {
			this._stateHistory[this.frame] = this.getState();
		}

		//start of frame
		this.startOfFrame();
		for(i = 0; i < this.objects.length; i++) {
			this.objects[i].startOfFrame();
		}

		//tick (move everything)
		for(i = this.objects.length - 1; i >= 0; i--) {
			this.objects[i].tick();
		}

		//end of frame
		for(i = 0; i < this.objects.length; i++) {
			this.objects[i].endOfFrame();
		}
		this.endOfFrame();

		this.frame++;
	};
	Level.prototype.render = function(ctx) {
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, Global.CANVAS_WIDTH, Global.CANVAS_HEIGHT);
		this.tileGrid.render(ctx, this.camera);
		ctx.fillStyle = '#fff';
		ctx.font = "12px Lucida Console";
		var sec = "" + (Math.floor(this.frame / 6) / 10);
		ctx.fillText(sec + (sec.indexOf(".") === -1 ? ".0" : ""), 20, 20);
	};
	Level.prototype.getState = function() {
		var state = {
			frame: this.frame,
			objects: {}
		};
		for(var i = 0; i < this.objects.length; i++) {
			state.objects[this.objects[i].id] = this.objects[i].getState();
		}
		return state;
	};
	Level.prototype.loadState = function(state, prevFrame) {
		//this.frame = state.frame
		for(var i = 0; i < this.objects.length; i++) {
			this.objects[i].loadState(state.objects[this.objects[i].id] || null, prevFrame);
		}
	};
	Level.prototype.rewindState = function(frames) {
		var frame = Math.floor((this.frame - frames) / 15) * 15;
		var actualFrame = frame;
		while(frame > 0 && !this._stateHistory[frame]) {
			frame -= 15;
		}
		while(frame < 0 && !this._stateHistory[frame]) {
			frame += 15;
		}
		var prevFrame = this.frame;
		this.frame = actualFrame; //TODO hacky
		this.loadState(this._stateHistory[frame], prevFrame);
		this._stateHistory[this.frame] = this.getState();
	};
	Level.prototype.startOfFrame = function() {};
	Level.prototype.endOfFrame = function() {};
	Level.prototype.onKeyboardEvent = function(evt, keyboard) {
		if(this.player) {
			this.player.onKeyboardEvent(evt, keyboard);
		}
	};
	Level.prototype.onMouseEvent = function(evt) {};
	Level.prototype.spawnGameObj = function(obj, col, row) {
		var tile = null;
		if(typeof col === 'number' && typeof row === 'number') {
			tile = this.tileGrid.get(col, row);
		}
		this.objects.push(obj);
		obj.addToLevel(this, tile);
		return obj;
	};
	return Level;
});