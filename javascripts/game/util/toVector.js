define(function() {
	return function toVector(dir) {
		return {
			NORTH: { x: 0, y: -1 },
			SOUTH: { x: 0, y: 1 },
			EAST: { x: 1, y: 0 },
			WEST: { x: -1, y: 0 }
		}[dir] || null;
	};
});