define(function() {
	return function toOppositeDirection(dir) {
		if(dir === 'SOUTH') { return 'NORTH'; }
		if(dir === 'NORTH') { return 'SOUTH'; }
		if(dir === 'WEST') { return 'EAST'; }
		if(dir === 'EAST') { return 'WEST'; }
		return null;
	};
});