describe("The dashboard component", function() {

	beforeEach(module("mnd-web.components.dashboard"));
	beforeEach(module("ui.router"));

	var $scope;
	beforeEach(inject(function ($rootScope) {
		$scope = $rootScope.$new();
	}));

	var ctrl;
	beforeEach(inject(function ($controller) {
		ctrl = $controller("SidebarController", {$scope: $scope});
	}));

	var state;
	beforeEach(inject(function ($state) {
		state = $state;
	}));

	describe("The SidebarController", function () {

		it("should add the addPost function to its $scope", function () {
			_.isFunction($scope.addPost).should.equal(true);
		});

		it("should add a menu property to its $scope", function () {
			_.isPlainObject($scope.menu).should.equal(true);
		});

	});

	describe("The addPost function", function () {

		it("should insert a post and then go to the postEdit page", function () {
			$scope.Posts = {
				insert: sinon.spy()
			};
			var go = state.go;
			state.go = sinon.spy();


			$scope.addPost();

			var insertCall = $scope.Posts.insert.getCall(0);
			insertCall.args[0].should.eql({});

			var goCall = state.go.getCall(0);
			goCall.args[0].should.equal("postEdit");
			goCall.args[1].should.eql({postId: undefined});

			state.go = go;

		});

	});

});


