describe("The minmap component", function() {

	var map = {
		href: "http://mondora.com",
		text: "0",
		children: [
			{
				href: "http://mondora.com",
				text: "0.0",
				children: [
					{
						href: "http://mondora.com",
						text: "0.0.0"
					}
				]
			},
			{
				href: "http://mondora.com",
				text: "0.1",
				children: [
					{
						href: "http://mondora.com",
						text: "0.1.0"
					}
				]
			}
		]
	};
	
	beforeEach(module("RecursionHelper"));
	beforeEach(module("mnd-web.templates"));
	beforeEach(module("mnd-web.components.mindmap"));
	var compile, rootScope;
	beforeEach(inject(function ($compile, $rootScope) {
		compile = $compile;
		rootScope = $rootScope;
	}));

	describe("generates an element that", function () {

		var element;
		beforeEach(function () {
			rootScope.map = map;
			var html = "<mnd-mind-map map=\"map\"></mnd-mind-map>";
			element = compile(html)(rootScope);
			rootScope.$digest();
		});

		it("has a \"mm-wrapper\" css class", function() {
			element.hasClass("mm-wrapper").should.equal(true);
		});

		it("has two children, with mm-children and mm-parent css classes", function() {
			element.children().length.should.equal(2);
			angular.element(element.children()[0]).hasClass("mm-children").should.equal(true);
			angular.element(element.children()[1]).hasClass("mm-parent").should.equal(true);
		});

		it("has in its scope a map property which references the map object passed to the directive", function () {
			element.isolateScope().map.should.equal(map);
		});

		it("has in its scope a getWidth method which returns a map of css properties", function () {
			var scope = element.isolateScope();
			var length = scope.map.children.length;
			var css = scope.getWidth(length);
			css.width.should.equal("50%");
		});

		it("has in its scope an autodestroy method which autodestroys the element if the element is not the top-most", function () {
			var firstChild;
			var text;
			firstChild = angular.element(element[0].querySelector(".mm-wrapper .mm-wrapper"));
			text = firstChild.isolateScope().map.text;
			text.should.equal("0.0");
			firstChild.isolateScope().autodestroy();
			rootScope.$digest();
			firstChild = angular.element(element[0].querySelector(".mm-wrapper .mm-wrapper"));
			text = firstChild.isolateScope().map.text;
			text.should.equal("0.1");
		});

		describe("has in its scope an addChild method which", function () {

			it("if map.children is not defined, it creates it (an array)", function () {
				var leaf = angular.element(element[0].querySelector(".mm-wrapper .mm-wrapper .mm-wrapper"));
				var scope = leaf.isolateScope();
				_.isUndefined(scope.map.children).should.equal(true);
				scope.addChild();
				rootScope.$digest();
				_.isArray(scope.map.children).should.equal(true);
			});

			it("adds a child to the map.children array in the scope", function () {
				var scope = element.isolateScope();
				var beforeLength = scope.map.children.length;
				scope.addChild();
				rootScope.$digest();
				var afterLength = scope.map.children.length;
				afterLength.should.equal(beforeLength + 1);
			});

		});

	});

	describe("if edit is not set or set to false, the mm-parent div", function() {
		it("should have an a element as only child", function () {
			rootScope.map = map;
			var html = "<mnd-mind-map map=\"map\"></mnd-mind-map>";
			element = compile(html)(rootScope);
			rootScope.$digest();
			var parent = element.children()[1];
			angular.element(parent).children().length.should.equal(1);
			angular.element(parent).children()[0].tagName.should.equal("A");
		});
	});

	describe("if edit is set to true, the mm-parent div", function() {
		it("should have four children", function () {
			rootScope.map = map;
			var html = "<mnd-mind-map map=\"map\" edit=\"true\"></mnd-mind-map>";
			element = compile(html)(rootScope);
			rootScope.$digest();
			var parent = element.children()[1];
			angular.element(parent).children().length.should.equal(4);
		});
	});

	describe("the mm-children div", function () {

		it("should have as children other mindmaps", function () {
			rootScope.map = map;
			var html = "<mnd-mind-map map=\"map\"></mnd-mind-map>";
			element = compile(html)(rootScope);
			rootScope.$digest();
			var children = angular.element(element.children()[0]);
			children.children().length.should.equal(map.children.length);
			var grandChildren = children.children();
			for (var i=0; i<grandChildren.length; i++) {
				angular.element(grandChildren[i]).hasClass("mm-wrapper");
			}
		});

	});

});
