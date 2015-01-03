define([
	'game/object/door/OneWayDoor',
	'game/object/door/SecurityDoor',
	'game/object/interactive/FloorSwitch'
], function(
	OneWayDoor,
	SecurityDoor,
	FloorSwitch
) {
	return {
		OneWayDoor: OneWayDoor,
		SecurityDoor: SecurityDoor,
		FloorSwitch: FloorSwitch
	};
});