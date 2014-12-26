define([
	'game/object/interactive/Interactive',
	'game/util/extend'
], function(
	SUPERCLASS,
	extend
) {
	function IDCardScanner(params) {
		SUPERCLASS.call(this, extend(params, { debugColor: '#fc0' }));
	}
	IDCardScanner.prototype = Object.create(SUPERCLASS.prototype);
	return IDCardScanner;
});