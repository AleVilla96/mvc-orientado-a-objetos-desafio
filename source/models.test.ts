import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test("Testeo el load del modelo", (t) => {
    const model = new ContactsCollection();
    model.load();
    t.deepEqual(contactsObject, model.getAll());
});

test("Testeo el addOne del modelo", (t) => {
    const model = new ContactsCollection();
    const mockContact = {
        id: 30,
        name: "Marce",
    };
    model.addOne(mockContact);
    t.deepEqual(model.getAll(), [mockContact]);
});

test("Testeo el save del modelo", (t) => {
    const model = new ContactsCollection();
    model.load();
    const auxModel = model;
    const mockContact = {
        id: 30,
        name: "Marce",
    };
    model.addOne(mockContact);
    model.save();
    const fileContent = jsonfile.readFileSync(__dirname + "/contacts.json");
    t.deepEqual(fileContent, model.getAll());
    auxModel.save();
});

test("Testeo el getOneById del modelo", (t) => {
    const model = new ContactsCollection();
    const mockContact = {
        id: 31,
        name: "Marce",
    };
    model.addOne(mockContact);
    const one = model.getOneById(31);
    t.deepEqual(one, mockContact);
});
