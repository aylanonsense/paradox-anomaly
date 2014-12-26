define(function() {
	return function toDirection(x, y) {
		if(x === 0 && y === -1) { return 'NORTH'; }
		if(x === 0 && y === 1) { return 'SOUTH'; }
		if(x === 1 && y === 0) { return 'EAST'; }
		if(x === -1 && y === 0) { return 'WEST'; }
		return null;
	};
});