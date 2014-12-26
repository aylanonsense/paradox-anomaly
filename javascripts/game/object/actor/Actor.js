define([
	'game/object/MovableGameObj',
	'game/Global',
	'game/util/extend',
	'game/util/toVector',
	'game/util/toDirection'
], function(
	SUPERCLASS,
	Global,
	extend,
	toVector,
	toDirection
) {
	function Actor(params) {
		SUPERCLASS.call(this, extend(params, {
			fillsTile: true
		}));
		this._facing = params.facing || 'NORTH';
		this._debugColor = params.debugColor || '#fff';
		this._carriedItem = null;
		this.canPush = (params.canPush === true);
	}
	Actor.prototype = Object.create(SUPERCLASS.prototype);
	Actor.prototype.move = function(moveX, moveY, speed) {
		speed = speed || this._defaultSpeed;
		if(SUPERCLASS.prototype.move.call(this, moveX, moveY, speed)) {
			this._facing = toDirection(moveX, moveY);
			return true;
		}
		else if(!this.isPerformingAction() && this._tile.canLeave(this, moveX, moveY)) {
			this._nextTile = this._level.tileGrid.get(this.col + moveX, this.row + moveY);
			if(this._nextTile && this._nextTile.canPush(this, moveX, moveY)) {
				this._moveX = moveX;
				this._moveY = moveY;
				this._prevTile = this._tile;
				this._nextTile.reserveForOccupant(this);
				speed /= 2.5;
				var frames = Math.max(2, Math.ceil(Global.TARGET_FRAMERATE / speed));
				this._setCurrentAction('moving', frames);
				this._facing = toDirection(moveX, moveY);
				this._nextTile.pushOccupants(this, moveX, moveY, speed);
				return true;
			}
		}

		//at any rate, adjust the facing to match
		if(!this.isMoving()) {
			this._facing = toDirection(moveX, moveY);
		}
		return false;
	};
	Actor.prototype.getCarriedItem = function() {
		return this._carriedItem;
	};
	Actor.prototype.isCarryingItem = function() {
		return this._carriedItem !== null;
	};
	Actor.prototype.pickUpItem = function(item) {
		this._carriedItem = item;
		this._carriedItem.onPickedUp(this);
	};
	Actor.prototype.dropCarriedItem = function() {
		if(this._carriedItem) {
			var vector = toVector(this._facing);
			if(this._tile.canLeave(this._carriedItem, vector.x, vector.y)) {
				var nextTile = this._level.tileGrid.get(this.col + vector.x, this.row + vector.y);
				if(nextTile && nextTile.canEnter(this._carriedItem, vector.x, vector.y) &&
					nextTile.isVirtuallyEmpty()) {
					this._carriedItem.onDroppedInto(nextTile, this);
					this._carriedItem = null;
					return true;
				}
			}
		}
		return false;
	};
	Actor.prototype.render = function(ctx, camera) {
		ctx.fillStyle = this._debugColor;
		ctx.fillRect(this.x - 20 - camera.x, this.y - 20 - camera.y, 40, 40);

		//draw facing
		var vector = toVector(this._facing);
		ctx.strokeStyle = '#002';
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.x - camera.x, this.y - camera.y);
		ctx.lineTo(this.x + 20 * vector.x - camera.x, this.y + 20 * vector.y - camera.y);
		ctx.stroke();
	};
	return Actor;
});