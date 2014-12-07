define([
	'game/classes/actor/MovingFullCollisionActor',
	'create!game/display/Sprite > GrassTile'
], function(
	SUPERCLASS,
	MailmanSprite
) {
	function Rock(x, y) {
		SUPERCLASS.call(this, x, y, MailmanSprite.width, MailmanSprite.height);
	}
	Rock.prototype = Object.create(SUPERCLASS.prototype);
	Rock.prototype.recalculateCollisionBoxes = function() {
		this.collidableBox = this.boundingBox;
	};
	Rock.prototype.render = function(ctx, camera) {
		MailmanSprite.render(ctx, camera, this.x, this.y, 1, false);
		SUPERCLASS.prototype.render.call(this, ctx, camera);
	};
	return Rock;
});