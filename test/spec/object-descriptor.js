var ObjectDescriptor = require("montage-data/logic/model/object-descriptor").ObjectDescriptor,
    Montage = require("montage-data/montage").Montage,
    RelationshipDescriptor = require("montage-data/logic/model/relationship-descriptor").RelationshipDescriptor,
    PropertyDescriptor = require("montage-data/logic/model/property-descriptor").PropertyDescriptor;

describe("An ObjectDescriptor", function() {

    it("can be created", function () {
        expect(new ObjectDescriptor()).toBeDefined();
    });

    it("initially has no name", function () {
        expect(new ObjectDescriptor().name).toBeUndefined();
    });

    it("preserves its name", function () {
        var descriptor = new ObjectDescriptor(),
            name = "String" + Math.random();
        descriptor.name = name;
        expect(descriptor.name).toEqual(name);
    });

    it("has a Montage instance as the initial prototype value", function () {
        expect(new ObjectDescriptor().prototype).toEqual(jasmine.any(Montage));
    });

    it("preserves its prototype value", function () {
        var descriptor = new ObjectDescriptor(),
            prototype = {};
        descriptor.prototype = prototype;
        expect(descriptor.prototype).toBe(prototype);
    });

    it("initially has no properties", function () {
        expect(new ObjectDescriptor().properties).toEqual({});
    });

    it("preserves its properties", function () {
        var descriptor = new ObjectDescriptor(),
            properties = {},
            name;
        properties["String" + Math.random()] = new PropertyDescriptor();
        properties["String" + Math.random()] = new PropertyDescriptor();
        properties["String" + Math.random()] = new PropertyDescriptor();
        for (name in properties) {
            descriptor.addProperty(name, properties[name]);
        }
        expect(descriptor.properties).toEqual(properties);
    });

    // TODO [Charles]: Update this for API changes.
    xit("can add relationships", function () {
        // Generate test data.
        var descriptor = new ObjectDescriptor(),
            type1 = new ObjectDescriptor(),
            type2 = new ObjectDescriptor(),
            expressions1 = {foo: "String" + Math.random(), bar: "String" + Math.random()},
            expressions2 = {a: "String" + Math.random(), b: "String" + Math.random()},
            expressions3 = {x: "String" + Math.random(), y: "String" + Math.random()},
            expressions4 = {},
            relationship1;
        // Add one relationship.
        type1.name = "String" + Math.random();
        descriptor._addRelationship({
            destinationType: type1,
            valueExpressions: expressions1,
            criteriaExpressions: expressions2,
        });
        // Verify that the corresponding relationship descriptors were added.
        expect(Object.keys(descriptor.properties).sort()).toEqual(["bar", "foo"]);
        expect(descriptor.properties.foo).toEqual(jasmine.any(PropertyDescriptor));
        expect(descriptor.properties.foo.relationship).toEqual(jasmine.any(RelationshipDescriptor));
        expect(descriptor.properties.foo.relationship.destinationType).toBe(type1);
        expect(descriptor.properties.foo.relationship.valueExpressions).toEqual(expressions1);
        expect(descriptor.properties.foo.relationship.criteriaExpressions).toEqual(expressions2);
        expect(descriptor.properties.bar).toEqual(jasmine.any(PropertyDescriptor));
        expect(descriptor.properties.bar.relationship).toBe(descriptor.properties.foo.relationship);
        // Record some state for later testing.
        property1 = descriptor.properties.foo;
        property2 = descriptor.properties.bar;
        // Add another relationship.
        type2.name = "String" + Math.random();
        descriptor._addRelationship({
            destinationType: type2,
            valueExpressions: expressions3,
            criteriaExpressions: expressions4,
        });
        // Verify that the properties corresponding to the originally added
        // relationship have not been affected.
        expect(descriptor.properties.foo).toBe(property1);
        expect(descriptor.properties.bar).toBe(property2);
        // Verify that the correspondingproperty descriptors have been added,
        // and that they all includes a reference to the added relationship.
        expect(Object.keys(descriptor.properties).sort()).toEqual(["bar", "foo", "x", "y"]);
        expect(descriptor.properties.x).toEqual(jasmine.any(PropertyDescriptor));
        expect(descriptor.properties.x.relationship).toEqual(jasmine.any(RelationshipDescriptor));
        expect(descriptor.properties.x.relationship.destinationType).toBe(type2);
        expect(descriptor.properties.x.relationship.valueExpressions).toEqual(expressions3);
        expect(descriptor.properties.x.relationship.criteriaExpressions).toEqual(expressions4);
        expect(descriptor.properties.y).toEqual(jasmine.any(PropertyDescriptor));
        expect(descriptor.properties.y.relationship).toBe(descriptor.properties.x.relationship);
    });

});