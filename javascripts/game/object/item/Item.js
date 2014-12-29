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
	Item.prototype.loadState = function(state) {
		SUPERCLASS.prototype.loadState.call(this, state);
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
	};
	Item.prototype.onEnter = function(obj) {
		if(!this.isBeingCarried()) {
			if(obj.canCarryItems && !obj.isCarryingItem()) {
				obj.pickUpItem(this);
			}
		}
	};
	Item.prototype.isBeingCarried = function() {
		return this._carrier !== null;
	};
	Item.prototype.render = function(ctx, camera) {
		if(!this.isBeingCarried()) {
			ctx.fillStyle = this._debugColor;
			ctx.fillRect(this.x - 10 - camera.x, this.y - 6 - camera.y, 20, 12);
		}
	};
	return Item;
});