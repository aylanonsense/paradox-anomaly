define([
	'game/classes/Actor'
], function(
	SUPERCLASS
) {
	function Robot() {
		SUPERCLASS.call(this, {
			moveSpeed: 2,
			width: 20,
			height: 30,
			debugColor: '#f00',
			debugFillColor: '#a00'
		});
		this._currMoveDir = 'SOUTH';
	}
	Robot.prototype = Object.create(SUPERCLASS.prototype);
	Robot.prototype.startOfFrame = function() {
		SUPERCLASS.prototype.startOfFrame.call(this);
		if(!this.isMoving() && !this.move(this._currMoveDir)) {
			this._currMoveDir = (this._currMoveDir === 'SOUTH' ? 'NORTH' : 'SOUTH');
		}
	};
	return Robot;
});