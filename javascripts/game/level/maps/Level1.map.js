define({
	player: {
		initialFacing: 'SOUTH'
	},
	walls: [
		' .......',
		' .......',
		' .......',
		'.S......E',
		' .......',
		' .......',
		' .......'
	],
	objects: [
		{ type: 'OneWayDoor', col: 0, row: 3, params: { dir: 'EAST' }}, //should be a one-way door
		{ type: 'FloorSwitch', col: 4, row: 3, params: {} },
		{ type: 'SecurityDoor', col: 8, row: 3, params: { dir: 'WEST' } }
	],
	triggers: [
		{ from: 1, to: 2 }
	]
});