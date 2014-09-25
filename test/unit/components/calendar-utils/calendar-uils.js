describe("The MndCalendarUtils service", function () {

	beforeEach(module("mnd-web.pages"));

	it("should have defined a `weekOfSelectedDay` method", inject(function (MndCalendarUtils) {
		(typeof MndCalendarUtils.weekOfSelectedDay).should.equal("function");
	}));

	it("should have defined a `weeksInMonth` method", inject(function (MndCalendarUtils) {
		(typeof MndCalendarUtils.weeksInMonth).should.equal("function");
	}));

});

describe("The `weekOfSelectedDay` method", function () {

	beforeEach(module("mnd-web.pages"));

	it("should throw an error if the first argument passed to it is not a parsable moment", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weekOfSelectedDay("notadate");
		};
		troublemaker.should.throw("Non-parsable date");
	}));

	it("should not throw an error if the first argument passed to it is a parsable moment (undefined included)", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weekOfSelectedDay(new Date());
			MndCalendarUtils.weekOfSelectedDay("2014-09-19");
			MndCalendarUtils.weekOfSelectedDay();
		};
		troublemaker.should.not.throw();
	}));

	it("should return the correct week for the selected day", inject(function (MndCalendarUtils) {

		MndCalendarUtils.weekOfSelectedDay("2014-01-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-03-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-04-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-07-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-01").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-12-01").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-03-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-04-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-02").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-02").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-12-02").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-03").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-03-03").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-04-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-03").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-09-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-03").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-03").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-12-03").should.equal(1);

		MndCalendarUtils.weekOfSelectedDay("2014-01-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-02-04").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-03-04").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-04-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-05-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-06-04").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-07-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-08-04").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-09-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-10-04").should.equal(1);
		MndCalendarUtils.weekOfSelectedDay("2014-11-04").should.equal(2);
		MndCalendarUtils.weekOfSelectedDay("2014-12-04").should.equal(1);

	}));

});

describe("The `weeksInMonth` method", function () {

	beforeEach(module("mnd-web.pages"));

	it("should throw an error if the first argument passed to it is not a parsable moment", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weeksInMonth("notadate");
		};
		troublemaker.should.throw("Non-parsable date");
	}));

	it("should not throw an error if the first argument passed to it is a parsable moment (undefined included)", inject(function (MndCalendarUtils) {
		var troublemaker = function () {
			MndCalendarUtils.weeksInMonth(new Date());
			MndCalendarUtils.weeksInMonth("2014-09-19");
			MndCalendarUtils.weeksInMonth();
		};
		troublemaker.should.not.throw();
	}));

	it("should, you know, return the correct number of weeks in a month", inject(function (MndCalendarUtils) {

		MndCalendarUtils.weeksInMonth("2014-01-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-02-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-03-01").should.equal(6);
		MndCalendarUtils.weeksInMonth("2014-04-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-05-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-06-01").should.equal(6);
		MndCalendarUtils.weeksInMonth("2014-07-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-08-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-09-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-10-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-11-01").should.equal(5);
		MndCalendarUtils.weeksInMonth("2014-12-01").should.equal(5);

	}));

});
