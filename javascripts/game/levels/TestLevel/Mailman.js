define([
	'game/classes/actor/MovingFullCollisionActor',
	'create!game/display/Sprite > Mailman'
], function(
	SUPERCLASS,
	MailmanSprite
) {
	function Mailman(x, y) {
		SUPERCLASS.call(this, x, y, MailmanSprite.width, MailmanSprite.height);
		this.vel.x = 50;
	}
	Mailman.prototype = Object.create(SUPERCLASS.prototype);
	Mailman.prototype.render = function(ctx, camera) {
		SUPERCLASS.prototype.render.call(this, ctx, camera);
		MailmanSprite.render(ctx, camera, this.x, this.y, 0, false);
	};
	return Mailman;
});