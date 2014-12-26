define([
	'game/object/GameObj'
], function(
	SUPERCLASS
) {
	function ActionGameObj(params) {
		SUPERCLASS.call(this, params);
		this._prevAction = null;
		this._currentAction = null;
		this._currentActionFrames = null;
		this._currentActionFramesLeft = null;
	}
	ActionGameObj.prototype = Object.create(SUPERCLASS.prototype);
	ActionGameObj.prototype.startOfFrame = function() {
		if(this._currentActionFramesLeft !== null) {
			this._currentActionFramesLeft--;
			if(this._currentActionFramesLeft <= 0) {
				this._prevAction = this._currentAction;
				this._currentAction = null;
				this._currentActionFrames = null;
				this._currentActionFramesLeft = null;
			}
		}
	};
	ActionGameObj.prototype.isPerformingAction = function() {
		return this._currentAction !== null;
	};
	ActionGameObj.prototype._setCurrentAction = function(action, frames) {
		this._currentAction = action;
		this._currentActionFrames = frames;
		this._currentActionFramesLeft = frames;
	};
	return ActionGameObj;
});