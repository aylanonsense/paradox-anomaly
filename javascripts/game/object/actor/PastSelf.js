define([
	'game/object/actor/Actor',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
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
		SUPERCLASS.prototype.loadState.call(this, state, prevFrame);
		this._isDead = this._level.frame < this._spawnTime || this._level.frame >= this._despawnTime;
		this._isCorrupt = state.isCorrupt || false;
		this._debugColor = (this._isCorrupt ? '#f00' : '#0ff');
	};
	PastSelf.prototype.startOfFrame = function() {
		for(var i = 0; i < this._actions.length; i++) {
			if(this._actions[i].frame === this._level.frame) {
				this._processAction(this._actions[i]);
			}
		}
		SUPERCLASS.prototype.startOfFrame.call(this);
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
	};
	return PastSelf;
});