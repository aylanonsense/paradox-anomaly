define(function() {
	return function extend(obj1, obj2) {
		obj1 = obj1 || {};
		for(var key in obj2) {
			obj1[key] = obj2[key];
		}
		return obj1;
	};
});