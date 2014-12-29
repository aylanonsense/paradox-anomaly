define([
	'game/object/GameObj'
], function(
	SUPERCLASS
) {
	function Item(params) {
		SUPERCLASS.call(this, params);
		this._debugColor = params.debugColor || '#fff';
		this._carrier = null;
	}
	Item.prototype = Object.create(SUPERCLASS.prototype);
	Item.prototype.getState = function() {
		var state = SUPERCLASS.prototype.getState.call(this);
		state.carrier = this._carrier;
		return state;
	};
	Item.prototype.loadState = function(state, prevFrame) {
		SUPERCLASS.prototype.loadState.call(this, state, prevFrame);
		this._carrier = state.carrier;
	};
	Item.prototype.onPickedUp = function(obj) {
		this._carrier = obj;
	};
	Item.prototype.onDroppedInto = function(tile, obj) {
		this._tile.removeOccupant(this);
		this._tile = tile;
		this._tile.addOccupant(this);
		this._carrier = null;
		var occupants = this._tile.getOccupants();
		for(var i = 0; i < occupants.length; i++) {
			if(occupants[i].isAlive() && !this.isBeingCarried() &&
				occupants[i].canCarryItems && !occupants[i].isCarryingItem()) {
				occupants[i].pickUpItem(this);
				break;
			}
		}
	};
	Item.prototype.onEnter = function(obj) {
		if(obj.isAlive() && !this.isBeingCarried() && obj.canCarryItems && !obj.isCarryingItem()) {
			obj.pickUpItem(this);
		}
	};
	Item.prototype.isBeingCarried = function() {
		return this._carrier !== null;
	};
	Item.prototype.render = function(ctx, camera, calledByCarrier) {
		if(!this.isBeingCarried() || calledByCarrier) {
			ctx.fillStyle = this._debugColor;
			ctx.fillRect(this.x - 10 - camera.x, this.y - 6 - camera.y, 20, 12);
			ctx.fillStyle = '#000';
			ctx.font = "12px Lucida Console";
			ctx.fillText("" + this.id, this.x - 9 - camera.x, this.y + 4 - camera.y);
		}
	};
	Item.prototype._getX = function() {
		if(this.isBeingCarried()) {
			return this._carrier.x;
		}
		return SUPERCLASS.prototype._getX.call(this);
	};
	Item.prototype._getY = function() {
		if(this.isBeingCarried()) {
			return this._carrier.y;
		}
		return SUPERCLASS.prototype._getY.call(this);
	};
	return Item;
});