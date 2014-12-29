define([
	'game/object/actor/Actor',
	'game/util/extend',
	'game/util/toVector'
], function(
	SUPERCLASS,
	extend,
	toVector
) {
	function PastSelf(params) {
		SUPERCLASS.call(this, extend(params, {
			speed: 2,
			canCarryItems: true,
			canPush: true,
			debugColor: '#0ff'
		}));
		this._actions = params.actions;
		this._spawnTime = this._actions[0].frame;
		this._despawnTime = this._actions[this._actions.length - 1].frame;
		this._initialState = params.initialState;
		this._isDead = true;
		this._isCorrupt = false;
	}
	PastSelf.prototype = Object.create(SUPERCLASS.prototype);
	PastSelf.prototype.getState = function() {
		var state = SUPERCLASS.prototype.getState.call(this);
		state.isDead = this._level.frame < this._spawnTime || this._level.frame >= this._despawnTime;
		state.isCorrupt = this._isCorrupt;
		return state;
	};
	PastSelf.prototype.loadState = function(state, prevFrame) {
		if(state === null) {
			state = this._initialState;
		}
		SUPERCLASS.prototype.loadState.call(this, state, prevFrame);
		this._isDead = this._level.frame < this._spawnTime || this._level.frame >= this._despawnTime;
		this._isCorrupt = state.isCorrupt || false;
		this._debugColor = (this._isCorrupt ? '#f00' : '#0ff');
	};
	PastSelf.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		for(var i = 0; i < this._actions.length; i++) {
			if(this._actions[i].frame === this._level.frame) {
				this._processAction(this._actions[i]);
			}
		}
	};
	PastSelf.prototype._processAction = function(action) {
		if(action.action === 'MOVE') {
			if(!this.move(action.moveX, action.moveY, action.speed)) {
				this._isCorrupt = true;
				this._debugColor = '#f00';
			}
		}
		else if(action.action === 'SPAWN') {
			this._isDead = false;
		}
		else if(action.action === 'DESPAWN') {
			this._isDead = true;
		}
		else if(action.action === 'TURN') {
			this._facing = action.facing;
		}
		else if(action.action === 'USE') {
			if(this._tile.use(this, this._facing, false)) {
				return;
			}
			var nextTile = this._level.tileGrid.get(this.col + toVector(this._facing).x,
				this.row + toVector(this._facing).y);
			if(nextTile && nextTile.use(this, this._facing, true)) {
				return;
			}
			if(this.dropCarriedItem()) {
				return;
			}
		}
	};
	PastSelf.prototype.render = function(ctx, camera) {
		SUPERCLASS.prototype.render.call(this, ctx, camera);
		ctx.fillStyle = '#000';
		ctx.font = "8px Lucida Console";
		var sec = "" + (Math.floor((this._level.frame - this._spawnTime) / 6) / 10);
		ctx.fillText(sec + (sec.indexOf(".") === -1 ? ".0" : ""),
			this.x - 17 - camera.x, this.y - 12 - camera.y);
		sec = "" + (Math.floor((this._despawnTime - this._level.frame) / 6) / 10);
		ctx.fillText(sec + (sec.indexOf(".") === -1 ? ".0" : ""),
			this.x - 17 - camera.x, this.y - 12 + 8 - camera.y);
		ctx.fillText("" + this.id, this.x + 8 - camera.x, this.y + 16 - camera.y);
	};
	return PastSelf;
});