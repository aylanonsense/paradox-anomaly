define({
	toDirection: function(dx, dy) {
		if(dx === 0 && dy === -1) { return "NORTH"; }
		else if(dx === 1 && dy === 0) { return "EAST"; }
		else if(dx === 0 && dy === 1) { return "SOUTH"; }
		else if(dx === -1 && dy === 0) { return "WEST"; }
		else { return null; }
	},
	toVector: function(dir) {
		if(dir === "NORTH") { return { x: 0, y: -1 }; }
		else if(dir === "EAST") { return { x: 1, y: 0 }; }
		else if(dir === "SOUTH") { return { x: 0, y: 1 }; }
		else if(dir === "WEST") { return { x: -1, y: 0 }; }
		else { return null; }
	}
});