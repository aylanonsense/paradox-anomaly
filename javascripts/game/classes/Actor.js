if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'game/classes/GameObj'
], function(
	SUPERCLASS
) {
	function Actor(x, y, width, height) {
		SUPERCLASS.call(this, x, y, width, height);
		this.collidableBox = null; //box other actors can collide with
		this.collisionBoxes = [];
		this.hitBoxes = [];
		this.hurtBoxes = [];
	}
	Actor.prototype = Object.create(SUPERCLASS.prototype);

	//lifecycle
	Actor.prototype.isAlive = function() {
		return true;
	};
	Actor.prototype.addedToLevel = function() {};
	Actor.prototype.startOfFrame = function() {};
	Actor.prototype.planMovement = function() {};
	Actor.prototype.move = function() {};
	Actor.prototype.hasMovementRemaining = function() {};
	Actor.prototype.endOfMovement = function() {};
	Actor.prototype.endOfFrame = function() {};
	Actor.prototype.render = function(ctx, camera) {};

	//interactions
	Actor.prototype.handleCollision = function(collision, collisionBox) {};
	Actor.prototype.isHitting = function(actor) {
		var hits = [];
		if(this.hitBoxes && other.hurtBoxes) {
			for(var i = 0; i < this.hitBoxes.length; i++) {
				for(var j = 0; j < actor.hurtBoxes.length; j++) {
					if(this.hitBoxes[i].sharesATypeWith(actor.hurtBoxes[j])) {
						var overlap = this.hitBoxes[i].isOverlapping(actor.hurtBoxes[j]);
						if(overlap) {
							hits.push(overlap);
						}
					}
				}
			}
		}
		return hits.length > 0 ? hits : false;
	};
	Actor.prototype.onHit = function(actor, hits) {};
	Actor.prototype.onHitBy = function(actor, hits) {};
	Actor.prototype.recalculateCollisionBoxes = function() {};
	Actor.prototype.recalculateHitBoxes = function() {};

	return Actor;
});