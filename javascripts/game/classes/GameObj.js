define([
	'game/Global',
	'game/geom/Rect'
], function(
	Global,
	Rect
) {
	var NEXT_GAME_OBJ_ID = 0;
	function GameObj(x, y, width, height) {
		this._gameObjId = NEXT_GAME_OBJ_ID++;
		this._level = null;
		this.renderLayer = 'STAGE';
		this.boundingBox = new Rect(x, y, width, height);
	}
	GameObj.prototype.sameAs = function(other) {
		return other && other._gameObjId == this._gameObjId;
	};
	GameObj.prototype.addToLevel = function(level) {
		this._level = level;
	};
	GameObj.prototype.addedToLevel = function() {};
	GameObj.prototype.render = function(ctx, camera) {
		if(Global.DEBUG_FILL_COLLISION_BOXES) {
			if(this.collidableBox) {
				this.collidableBox.render(ctx, camera, 'rgba(0, 255, 255, 0.75)', false);
			}
			if(this.collisionBoxes) {
				for(var i = 0; i < this.collisionBoxes.length; i++) {
					this.collisionBoxes[i].render(ctx, camera, 'rgba(0, 255, 0, 0.75)', false);
				}
			}
		}
	};

	//define useful getters/setters
	Object.defineProperty(GameObj.prototype, 'x', {
		get: function() { return this.boundingBox.x; },
		set: function(x) { this.boundingBox.x = x; }
	});
	Object.defineProperty(GameObj.prototype, 'y', {
		get: function() { return this.boundingBox.y; },
		set: function(y) { this.boundingBox.y = y; }
	});
	Object.defineProperty(GameObj.prototype, 'center', {
		get: function() {
			return {
				x: this.boundingBox.x + this.boundingBox.width / 2,
				y: this.boundingBox.y + this.boundingBox.height / 2
			};
		},
		set: function(x, y) {
			this.boundingBox.x = x - this.boundingBox.width / 2;
			this.boundingBox.y = y - this.boundingBox.height / 2;
		}
	});
	Object.defineProperty(GameObj.prototype, 'left', {
		get: function() { return this.boundingBox.x; },
		set: function(x) { this.boundingBox.x = x; }
	});
	Object.defineProperty(GameObj.prototype, 'right', {
		get: function() { return this.boundingBox.x + this.boundingBox.width; },
		set: function(x) { this.boundingBox.x = x - this.boundingBox.width; }
	});
	Object.defineProperty(GameObj.prototype, 'top', {
		get: function() { return this.boundingBox.y; },
		set: function(y) { this.boundingBox.y = y; }
	});
	Object.defineProperty(GameObj.prototype, 'bottom', {
		get: function() { return this.boundingBox.y + this.boundingBox.height; },
		set: function(y) { this.boundingBox.y = y - this.boundingBox.height; }
	});
	Object.defineProperty(GameObj.prototype, 'width', {
		get: function() { return this.boundingBox.width; },
		set: function(width) { this.boundingBox.width = width; }
	});
	Object.defineProperty(GameObj.prototype, 'height', {
		get: function() { return this.boundingBox.height; },
		set: function(height) { this.boundingBox.height = height; }
	});

	return GameObj;
});