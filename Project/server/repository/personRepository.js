const { Person } = require('../model/person'); // Assuming your Person model is defined in a file named 'person.js'

const getAllPeople = () => {
    return Person.findAll()
        .then(people => people)
        .catch(error => {
            console.error('Error fetching people:', error);
            throw new Error('Error fetching people');
        });
};

const getPersonById = (id) => {
    return Person.findByPk(id)
        .then(person => person)
        .catch(error => {
            console.error('Error fetching person by id:', error);
            throw new Error('Error fetching person by id');
        });
};

const createPerson = (personData) => {
    return Person.create(personData)
        .then(person => person)
        .catch(error => {
            console.error('Error creating person:', error);
            throw new Error('Error creating person');
        });
};

const updatePerson = (id, updatedPersonData) => {
    return Person.update(updatedPersonData, {
        where: { id },
        returning: true // Return the updated record
    })
        .then(([rowsUpdated, [updatedPerson]]) => {
            if (rowsUpdated === 0) {
                throw new Error('Person not found');
            }
            return updatedPerson;
        })
        .catch(error => {
            console.error('Error updating person:', error);
            throw new Error('Error updating person');
        });
};

const deletePerson = (id) => {
    return Person.destroy({
        where: { id }
    })
        .then(deletedRows => {
            if (deletedRows === 0) {
                throw new Error('Person not found');
            }
            return deletedRows;
        })
        .catch(error => {
            console.error('Error deleting person:', error);
            throw new Error('Error deleting person');
        });
};

async function addRecords() {
    try {
        // Create records
        const person1 = await Person.create({ id: '1', name: 'John', age: 30 });
        const person2 = await Person.create({ id: '2', name: 'Alice', age: 25 });
        const person3 = await Person.create({ id: '3', name: 'Bob', age: 35 });
        console.log(person1, person2, person3);

        console.log('Records added successfully:', person1.toJSON(), person2.toJSON(), person3.toJSON());
    } catch (error) {
        console.error('Error adding records:', error);
    }
}

addRecords().then();

module.exports = {
    getAllPeople,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
};