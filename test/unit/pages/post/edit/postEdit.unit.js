describe("The PostEditController", function () {

	var mod;
	before(function () {
		mod = module("mnd-web.pages.post.edit");
	});

	it("should be defined by the mnd-web.pages.post.edit module", function () {
		mod.should.not.equal(null);
	});

	beforeEach(module("mnd-web.pages.post.edit"));
	beforeEach(module("ui.router"));
	beforeEach(module("angularFileUpload"));

	var $scope;
	beforeEach(inject(function ($rootScope) {
		$scope = $rootScope.$new();
	}));

	it("should redirect the user to the notFound page if no post by that id is defined", inject(function ($controller, $state) {
		$scope.Posts = {
			db: {
				get: sinon.spy(function () {
					return undefined;
				})
			}
		};
		sinon.stub($state, "go");
		var stateParams = {
			postId: "id"
		};
		$controller("PostEditController", {$scope: $scope, $stateParams: stateParams});
		$scope.Posts.db.get.calledWith("id");
		$state.go.calledWith("notFound").should.equal(true);
		$state.go.restore();
	}));

	it("should create Medium editors on the title, subtitle and body elements", inject(function ($controller) {
		$scope.Posts = {
			db: {
				get: sinon.spy(function () {
					return {
						title: "title",
						subtitle: "subtitle",
						body: "body"
					};
				})
			}
		};
		sinon.stub(document, "getElementById").returns(document.createElement("div"));
		window.MediumEditor = sinon.spy();
		$controller("PostEditController", {$scope: $scope});
		document.getElementById.callCount.should.equal(3);
		document.getElementById.getCall(0).args[0].should.equal("postTitleEditor");
		document.getElementById.getCall(1).args[0].should.equal("postSubtitleEditor");
		document.getElementById.getCall(2).args[0].should.equal("postBodyEditor");
		MediumEditor.callCount.should.equal(3);
		MediumEditor.calledWithNew().should.equal(true);
		document.getElementById.restore();
	}));

	it("should register a interval of 5000 milliseconds that executes the function $scope.save", inject(function ($controller) {
		$scope.Posts = {
			db: {
				get: sinon.spy(function () {
					return {
						title: "title",
						subtitle: "subtitle",
						body: "body"
					};
				})
			}
		};
		sinon.stub(document, "getElementById").returns(document.createElement("div"));
		window.MediumEditor = sinon.spy();
		var interval = sinon.spy();
		$controller("PostEditController", {$scope: $scope, $interval: interval});
		interval.calledWith($scope.save, 5000).should.equal(true);
		document.getElementById.restore();	
	}));

	it("should de-register the interval when the scope gets destroyed", inject(function ($controller) {
		$scope.Posts = {
			db: {
				get: sinon.spy(function () {
					return {
						title: "title",
						subtitle: "subtitle",
						body: "body"
					};
				})
			}
		};
		sinon.stub(document, "getElementById").returns(document.createElement("div"));
		window.MediumEditor = sinon.spy();
		var interval = sinon.spy(function () {
			return "intervalId";
		});
		interval.cancel = sinon.spy();
		$controller("PostEditController", {$scope: $scope, $interval: interval});
		$scope.$destroy();
		interval.cancel.calledWith("intervalId").should.equal(true);
		document.getElementById.restore();	
	}));

	describe("should define", function () {

		var title = document.createElement("div");
		title.innerHTML = "title";
		var subtitle = document.createElement("div");
		subtitle.innerHTML = "subtitle";
		var body = document.createElement("div");
		body.innerHTML = "body";
		var gebi;
		var upload = {};
		beforeEach(inject(function ($controller) {
			$scope.Posts = {
				db: {
					get: sinon.spy(function () {
						return {
							title: "title",
							subtitle: "subtitle",
							body: "body"
						};
					})
				},
				remove: sinon.spy()
			};
			gebi = document.getElementById;
			document.getElementById = sinon.spy(function (id) {
				if (id === "postTitleEditor") return title;
				if (id === "postSubtitleEditor") return subtitle;
				if (id === "postBodyEditor") return body;
			});
			window.MediumEditor = sinon.spy();
			var interval = sinon.spy(function () {
				return "intervalId";
			});
			interval.cancel = sinon.spy();
			var stateParams = {
				postId: "postId"
			};
			$controller("PostEditController", {$scope: $scope, $interval: interval, $stateParams: stateParams, $upload: upload});
		}));

		afterEach(function () {
			document.getElementById = gebi;
		});

		it("a toggleDelete function on its scope that toggles the boolean value showDelete", function () {
			_.isFunction($scope.toggleDelete).should.equal(true);
			var beforeToggle = $scope.showDelete;
			$scope.toggleDelete();
			var afterToggle = $scope.showDelete;
			afterToggle.should.equal(!beforeToggle);
		});

		it("a deletePost function which calls the Posts.remove function and then redirects to the home", inject(function ($state) {
			sinon.stub($state, "go");
			_.isFunction($scope.deletePost).should.equal(true);
			$scope.deletePost();
			$scope.Posts.remove.called.should.equal(true);
			$state.go.calledWith("home").should.equal(true);
			$state.go.restore();
		}));

		it("a publishPost function which sets the $scope.post.published property to true and then saves the document", function () {
			$scope.save = sinon.spy();
			_.isFunction($scope.publishPost).should.equal(true);
			$scope.publishPost();
			$scope.post.published.should.equal(true);
			$scope.save.called.should.equal(true);
		});

		it("an unpublishPost function which sets the $scope.post.published property to false and then saves the document", function () {
			$scope.save = sinon.spy();
			_.isFunction($scope.unpublishPost).should.equal(true);
			$scope.unpublishPost();
			$scope.post.published.should.equal(false);
			$scope.save.called.should.equal(true);
		});

		describe("an isOwner function which", function () {
			it("is a function", function () {
				_.isFunction($scope.isOwner).should.equal(true);
			});
			it("returns true if the user is the owner of the post", function () {
				$scope.user = {_id: "A"};
				$scope.post.user = "A";
				$scope.isOwner().should.equal(true);
			});
			it("returns false if the user is not logged in", function () {
				$scope.post.userId = "A";
				if($scope.isOwner()) {
					throw "$scope.isOwner() should return a falsy value";
				}
			});
			it("returns false if the user is not the owner of the post", function () {
				$scope.user = {_id: "B"};
				$scope.post.userId = "A";
				if($scope.isOwner()) {
					throw "$scope.isOwner() should return a falsy value";
				}
			});
		});

		it("a clickFileInput function which should trigger a click on the file input", function () {
			click = sinon.spy();
			sinon.stub(document, "querySelector").returns({
				click: click
			});
			$scope.clickFileInput();
			click.called.should.equal(true);
			document.querySelector.restore();
		});

		it("an abortUpload function which aborts the upload in progress, by calling the abort method of the imageUpload object", function () {
			var spy = sinon.spy();
			$scope.imageUpload = {
				abort: spy
			};
			$scope.abortUpload();
			spy.called.should.equal(true);
			$scope.isUploading.should.equal(false);
			_.isUndefined($scope.imageUpload).should.equal(true);
		});

		describe("an onFileSelect function which", function () {

			it("alerts the user if the file type is not image", function () {
				var al = window.alert;
				window.alert = sinon.spy();
				$scope.onFileSelect([{type: "text"}]);
				alert.calledWith("Devi caricare un'immagine.").should.equal(true);
				window.alert = al;
			});

			it("if the file type is image, calls the $upload service", function () {
				var promise = {
					progress: function () {
						return promise;
					},
					success: function () {
						return promise;
					}
				};
				upload.upload = sinon.spy(function () {
					return promise;
				});
				var file = {
					type: "image",
					name: "imageFile"
				};
				$scope.onFileSelect([file]);
				upload.upload.called.should.equal(true);
			});

			it("attaches a progress function to the returned promise, which updates the uploadProgress property", function () {
				var progress;
				var promise = {
					progress: function (onProgress) {
						progress = onProgress;
						return promise;
					},
					success: function () {
						return promise;
					}
				};
				upload.upload = sinon.spy(function () {
					return promise;
				});
				var file = {
					type: "image",
					name: "imageFile"
				};
				$scope.onFileSelect([file]);
				_.isFunction(progress).should.equal(true);
				progress({
					loaded: 10,
					total: 100
				});
				$scope.uploadProgress.should.equal(10);
			});

			it("attaches a success function to the returned promise, which updates various property and saves", function () {
				var success;
				var promise = {
					progress: function () {
						return promise;
					},
					success: function (onSuccess) {
						success = onSuccess;
						return promise;
					}
				};
				upload.upload = sinon.spy(function () {
					return promise;
				});
				var file = {
					type: "image",
					name: "imageFile"
				};
				$scope.save = sinon.spy();
				$scope.onFileSelect([file]);
				_.isFunction(success).should.equal(true);
				success();
				$scope.uploadProgress.should.equal(100);
				$scope.isUploading.should.equal(false);
				$scope.titleImageIsDisplayed.should.equal(true);
				$scope.save.called.should.equal(true);
			});

		});

		it("a save function which should collect all post info and call the Posts.update method", function () {
			$scope.user = {
				_id: "userId",
				profile: {
					name: "name"
				},
				services: {
					twitter: {
						screenName: "screenName",
						profile_image_url: "profile_image_url"
					}
				}
			};
			$scope.Posts = {
				update: sinon.spy()
			};

			var post = {
				title: title.innerHTML,
				subtitle: subtitle.innerHTML,
				body: body.innerHTML,
				user: "userId",
				comments: [],
				authors: [{
					userId: "userId",
					name: "name",
					screenName: "screenName",
					imageUrl: "profile_image_url"
				}]
			};
			$scope.save();
			$scope.Posts.update.calledWith("postId", post);
		});

	});

});

