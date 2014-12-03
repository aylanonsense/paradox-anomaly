if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
], function(
) {
	return {
		load: function(name, require, onload, config) {
			var SYMBOL = '>';
			var moduleName = name.substring(0, name.indexOf(SYMBOL));
			var arg = name.substring(name.indexOf(SYMBOL) + 1, name.length);
			require([ moduleName ], function(mod) {
				onload(new mod(arg));
			});
		}
	};
});