define([
	'game/object/obstacle/Obstacle',
	'create!game/display/Sprite > Obstacles'
], function(
	SUPERCLASS,
	SPRITE
) {
	function Crate() {
		SUPERCLASS.call(this, {
			isPushable: true,
			debugColor: '#f70'
		});
	}
	Crate.prototype = Object.create(SUPERCLASS.prototype);
	Crate.prototype.render = function(ctx, camera) {
		SPRITE.render(ctx, camera, this.x - SPRITE.width / 2,
			this.y - SPRITE.height / 2, 0, false);
	};
	return Crate;
});