describe("MndGetCalendarObject", function () {

	beforeEach(module("mnd-web.components"));

	var tmp;
	beforeEach(function () {
		tmp = window.Ceres;
		window.Ceres = {
			subscribe: sinon.spy(function () {
				return {
					ready: {
						then: function (fn) {
							fn();
						}
					}
				};
			}),
			getCollection: sinon.spy(function () {
				return {
					reactiveQuery: sinon.spy(function () {
						return {
							on: function (name, fn) {
								this._onChange = fn;
							},
							result: [],
							_fireChange: function () {
								this._onChange();
							}
						};
					})
				};
			})
		};
	});
	afterEach(function () {
		window.Ceres = tmp;
	});

	describe("setMonth method", function () {

		it("should be defined", inject(function (MndGetCalendarObject) {
			(typeof MndGetCalendarObject.setMonth).should.equal("function");
		}));

		it("should set the `month` property of the calendar object to a moment", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setMonth();
			moment.isMoment(MndGetCalendarObject.month).should.equal(true);
			MndGetCalendarObject._update.restore();
		}));

		it("should return the calendar object (be chainable)", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setMonth().should.equal(MndGetCalendarObject);
			MndGetCalendarObject._update.restore();
		}));

		it("should call the `_update` method", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setMonth();
			MndGetCalendarObject._update.called.should.equal(true);
			MndGetCalendarObject._update.restore();
		}));

	});


	describe("setUserId method", function () {

		it("should be defined", inject(function (MndGetCalendarObject) {
			(typeof MndGetCalendarObject.setUserId).should.equal("function");
		}));

		it("should set the `userId` property", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setUserId("userId");
			MndGetCalendarObject.userId.should.equal("userId");
			MndGetCalendarObject._update.restore();
		}));

		it("should return the calendar object (be chainable)", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setUserId().should.equal(MndGetCalendarObject);
			MndGetCalendarObject._update.restore();
		}));

		it("should call the `_update` method", inject(function (MndGetCalendarObject) {
			sinon.stub(MndGetCalendarObject, "_update");
			MndGetCalendarObject.setUserId();
			MndGetCalendarObject._update.called.should.equal(true);
			MndGetCalendarObject._update.restore();
		}));

	});

	describe("weeks property", function () {
		
		it("after the day has been set, should contain a representation of the weeks in the month", inject(function (MndGetCalendarObject, MndCalendarUtils) {
			var day = "2014-09-25T00:00:00.000Z";
			MndGetCalendarObject.setMonth(day);
			// Has the right number of weeks
			MndGetCalendarObject.weeks.length.should.equal(MndCalendarUtils.weeksInMonth(day));
			// The first week has 7 days (values of the array which have a `moment`property)
			// (we manually set values by looking at the calendar)
			MndGetCalendarObject.weeks[0].days.filter(function (day) {
				return !!day.moment;
			}).length.should.equal(7);
			// The last week has 2 days (values of the array which have a `moment`property)
			// (we manually set values by looking at the calendar)
			MndGetCalendarObject.weeks[4].days.filter(function (day) {
				return !!day.moment;
			}).length.should.equal(2);
		}));

	});

	describe("onChange property (a function, set by the user)", function () {

		it("should be called each time the calendar gets updated", inject(function (MndGetCalendarObject) {
			MndGetCalendarObject.onChange = sinon.spy();
			MndGetCalendarObject.onChange.called.should.equal(false);
			MndGetCalendarObject.setMonth();
			MndGetCalendarObject.onChange.called.should.equal(true);
		}));

		it("should be called each time the a day reactive query changes", inject(function (MndGetCalendarObject) {
			var day = "2014-09-25T00:00:00.000Z";
			MndGetCalendarObject.setMonth(day);
			MndGetCalendarObject.onChange = sinon.spy();
			MndGetCalendarObject.onChange.called.should.equal(false);
			MndGetCalendarObject.weeks[0].days[0].coinRQ._fireChange();
			MndGetCalendarObject.onChange.called.should.equal(true);
		}));

	});

});
