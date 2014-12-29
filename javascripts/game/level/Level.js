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
		this._frame = 0;
		this._stateHistory = {};
	}
	Level.prototype.update = function() {
		var i, j, steps;

		//save start
		if(this._frame % 15 === 0) {
			this._stateHistory[this._frame] = this.getState();
		}

		//start of frame
		this.startOfFrame();
		for(i = 0; i < this.objects.length; i++) {
			if(this.objects[i].isAlive()) {
				this.objects[i].startOfFrame();
			}
		}

		//tick (move everything)
		for(i = this.objects.length - 1; i >= 0; i--) {
			if(this.objects[i].isAlive()) {
				this.objects[i].tick();
			}
		}

		//end of frame
		for(i = 0; i < this.objects.length; i++) {
			if(this.objects[i].isAlive()) {
				this.objects[i].endOfFrame();
			}
		}
		this.endOfFrame();

		this._frame++;
	};
	Level.prototype.render = function(ctx) {
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, Global.CANVAS_WIDTH, Global.CANVAS_HEIGHT);
		this.tileGrid.render(ctx, this.camera);
	};
	Level.prototype.getState = function() {
		var state = {
			frame: this._frame,
			objects: {}
		};
		for(var i = 0; i < this.objects.length; i++) {
			state.objects[this.objects[i].id] = this.objects[i].getState();
		}
		return state;
	};
	Level.prototype.loadState = function(state) {
		this._frame = state.frame;
		for(var i = 0; i < this.objects.length; i++) {
			if(state.objects[this.objects[i].id]) {
				this.objects[i].loadState(state.objects[this.objects[i].id]);
			}
		}
	};
	Level.prototype.rewindState = function(frames) {
		var frame = Math.floor((this._frame - frames) / 15) * 15;
		var actualFrame = frame;
		while(frame > 0 && !this._stateHistory[frame]) {
			frame -= 15;
		}
		while(frame < 0 && !this._stateHistory[frame]) {
			frame += 15;
		}
		this.loadState(this._stateHistory[frame]);
		this._frame = actualFrame;
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