/********************************* Function.prototype.bind polyfill for phantomjs ********************************/
/* */
/* */	if (!Function.prototype.bind) {
/* */		Function.prototype.bind = function (oThis) {
/* */			if (typeof this !== "function") {
/* */				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
/* */			}
/* */			var aArgs = Array.prototype.slice.call(arguments, 1);
/* */			var fToBind = this;
/* */			var fNOP = function () {};
/* */			var fBound = function () {
/* */				var target = this instanceof fNOP && oThis ? this : oThis;
/* */				var args = aArgs.concat(Array.prototype.slice.call(arguments));
/* */				return fToBind.apply(target, args);
/* */			};
/* */			fNOP.prototype = this.prototype;
/* */			fBound.prototype = new fNOP();
/* */			return fBound;
/* */		};
/* */	}
/* */
/*****************************************************************************************************************/

// Create app modules
try {
	angular.module("mnd-web.templates");
} catch (e) {
	angular.module("mnd-web.templates", []);
}
angular.module("mnd-web.methods", []);
angular.module("mnd-web.components", []);
angular.module("mnd-web.pages", []);

angular.module("mnd-web", [

	// Third party modules
	"ui.bootstrap",
	"ui.router",
	"ui.tree",
	"mnd.sprinkle",
	"mnd.dashboard",
	"angularFileUpload",
	"ngSanitize",
	"RecursionHelper",
	"datePicker",
	"mentio",

	// App modules
	"mnd-web.templates",
	"mnd-web.methods",
	"mnd-web.components",
	"mnd-web.pages"

]);
