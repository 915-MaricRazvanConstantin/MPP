const { describe, test, expect } = require('@jest/globals');
const { getAllPeople, createPerson, getPersonByID, updatePerson, deletePerson } = require('../controller/personController');
const PEOPLE = require('../model/people');
// Mock request and response objects
const mockRequest = (params = {}, body = {}) => ({ params, body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('getAllPeople function', () => {
    test('should return all people', () => {
        const req = mockRequest();
        const res = mockResponse();

        getAllPeople(req, res);

        expect(res.json).toHaveBeenCalledWith(PEOPLE);
    });
});

describe('createPerson function', () => {
    test('should create a new person', () => {
        const newPerson = { name: 'Alice', age: 35 };
        const req = mockRequest({}, newPerson);
        const res = mockResponse();

        createPerson(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newPerson));
    });
});

describe('getPersonByID function', () => {
    test('should return the correct person if found', () => {
        const id = '1';
        const req = mockRequest({ id });
        const res = mockResponse();

        getPersonByID(req, res);

        expect(res.json).toHaveBeenCalledWith(PEOPLE.find(person => person.id === id));
    });

    test('should respond with 404 if person is not found', () => {
        const id = 'non-existent-id';
        const req = mockRequest({ id });
        const res = mockResponse();

        getPersonByID(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Person not found" });
    });
});

describe('updatePerson function', () => {
    test('should update the person with the given id', () => {
        const id = '1';
        const updatedPersonData = { name: 'Updated Name', age: 40 };
        const req = mockRequest({ id }, updatedPersonData);
        const res = mockResponse();

        updatePerson(req, res);

        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id, ...updatedPersonData }));
    });

    test('should respond with 404 if person is not found', () => {
        const id = 'non-existent-id';
        const updatedPersonData = { name: 'Updated Name', age: 40 };
        const req = mockRequest({ id }, updatedPersonData);
        const res = mockResponse();

        updatePerson(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Person not found" });
    });
});

describe('deletePerson function', () => {
    test('should delete the person with the given id', () => {
        const id = '1';
        const req = mockRequest({ id });
        const res = mockResponse();
        deletedPerson = PEOPLE.find(person => person.id === id);
        deletePerson(req, res);

        expect(res.json).toHaveBeenCalledWith(deletedPerson);
    });

    test('should respond with 404 if person is not found', () => {
        const id = 'non-existent-id';
        const req = mockRequest({ id });
        const res = mockResponse();

        deletePerson(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Person not found" });
    });
});
