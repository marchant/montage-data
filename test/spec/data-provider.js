var DataProvider = require("montage-data/logic/service/data-provider").DataProvider;

describe("A DataProvider", function() {

    it("can be created", function () {
        expect(new DataProvider()).toBeDefined();
    });

    it("initially has no data", function () {
        var provider = new DataProvider();
        expect(Array.isArray(provider.data)).toBe(true);
        expect(provider.data.length).toEqual(0);
    });

    it("accepts requests for data", function () {
        expect(new DataProvider().requestData).toEqual(jasmine.any(Function));
    });

});
