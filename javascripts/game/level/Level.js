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
	}
	Level.prototype.update = function() {
		var i, j, steps;

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
	};
	Level.prototype.render = function(ctx) {
		ctx.fillStyle = this.backgroundColor;
		ctx.fillRect(0, 0, Global.CANVAS_WIDTH, Global.CANVAS_HEIGHT);
		this.tileGrid.render(ctx, this.camera);
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
		var tile = this.tileGrid.get(col, row);
		this.objects.push(obj);
		obj.addToLevel(this, tile);
		return obj;
	};
	return Level;
});