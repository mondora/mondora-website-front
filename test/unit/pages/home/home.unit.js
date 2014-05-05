describe("The HomeController", function () {

	var mod;
	before(function () {
		mod = module("mnd-web.pages.home");
	});

	it("should be defined by the mnd-web.pages.home module", function () {
		mod.should.not.equal(null);
	});

	beforeEach(module("mnd-web.pages.home"));

	var $scope;
	beforeEach(inject(function ($rootScope) {
		$scope = $rootScope.$new();
	}));

	it("should call the Configurations.findOne method", inject(function ($controller) {
		var banner = {};
		var sprinkleText = "0";
		$scope.Configurations = {
			findOne: sinon.spy(function () {
				return {
					sprinkleText: sprinkleText,
					banner: banner
				};
			})
		};
		$controller("HomeController", {$scope: $scope});
		$scope.sprinkleText.should.equal(sprinkleText);
		$scope.banner.should.equal(banner);
		$scope.Configurations.findOne.calledWith({page: "home"}).should.equal(true);
	}));

	it("should define in its scope a login function that, when invoked, calls the Ceres.loginWithTwitter method", inject(function ($controller) {
		$scope.Configurations = {
			findOne: function () {
				return {};
			}
		};
		$scope.Ceres = {
			loginWithTwitter: sinon.spy()
		};
		$controller("HomeController", {$scope: $scope});
		_.isFunction($scope.login).should.equal(true);
		$scope.login();
		$scope.Ceres.loginWithTwitter.called.should.equal(true);
	}));

});
