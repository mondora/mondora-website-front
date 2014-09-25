describe("The MndCalendarUtils service", function () {

	beforeEach(module("mnd-web.components"));

	it("should have defined a `weekOfSelectedDay` method", inject(function (MndCalendarUtils) {
		(typeof MndCalendarUtils.weekOfSelectedDay).should.equal("function");
	}));

	it("should have defined a `weeksInMonth` method", inject(function (MndCalendarUtils) {
		(typeof MndCalendarUtils.weeksInMonth).should.equal("function");
	}));

});

describe("The `weekOfSelectedDay` method", function () {

	beforeEach(module("mnd-web.components"));

	it("should throw an error if the first argument passed to it is not a parsable moment", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weekOfSelectedDay("notadate");
		};
		troublemaker.should.throw("Non-parsable date");
	}));

	it("should not throw an error if the first argument passed to it is a parsable moment (undefined included)", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weekOfSelectedDay(new Date());
			MndCalendarUtils.weekOfSelectedDay("2014-09-19T00:00:00.000Z");
			MndCalendarUtils.weekOfSelectedDay();
		};
		troublemaker.should.not.throw();
	}));

	it("should return the correct week for the selected day", inject(function (MndCalendarUtils) {

		MndCalendarUtils.weekOfSelectedDay("2014-01-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-03-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-04-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-07-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-01T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-12-01T00:00:00.000Z").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-03-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-04-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-02T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-02T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-12-02T00:00:00.000Z").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-03T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-03-03T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-04-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-03T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-03T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-03T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-12-03T00:00:00.000Z").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-04T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-03-04T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-04-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-04T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-04T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-09-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-04T00:00:00.000Z").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-04T00:00:00.000Z").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-12-04T00:00:00.000Z").should.equal(1);

	}));

});

describe("The `weeksInMonth` method", function () {

	beforeEach(module("mnd-web.components"));

	it("should throw an error if the first argument passed to it is not a parsable moment", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weeksInMonth("notadate");
		};
		troublemaker.should.throw("Non-parsable date");
	}));

	it("should not throw an error if the first argument passed to it is a parsable moment (undefined included)", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weeksInMonth(new Date());
			MndCalendarUtils.weeksInMonth("2014-09-19T00:00:00.000Z");
			MndCalendarUtils.weeksInMonth();
		};
		troublemaker.should.not.throw();
	}));

	it("should, you know, return the correct number of weeks in a month", inject(function (MndCalendarUtils) {

		MndCalendarUtils.weeksInMonth("2014-01-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-02-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-03-01T00:00:00.000Z").should.equal(6);
		MndCalendarUtils.weeksInMonth("2014-04-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-05-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-06-01T00:00:00.000Z").should.equal(6);
		MndCalendarUtils.weeksInMonth("2014-07-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-08-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-09-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-10-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-11-01T00:00:00.000Z").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-12-01T00:00:00.000Z").should.equal(5);

	}));

});
