const People = require("../model/people");
const { v4: uuid } = require("uuid");

const ping = (req, res) => {
    res.status(200).json({ message: 'Server is up and running.' });
};

const getAllPeople = (req, res) => {
    People.findAll()
        .then(people => {
            res.json(people);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const createPerson = (req, res) => {
    const person = req.body;
    People.create({ id: uuid(), ...person })
        .then(newPerson => {
            console.log(newPerson);
            res.json(newPerson);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const getPersonByID = (req, res) => {
    const id = req.params.id;
    People.findByPk(id)
        .then(person => {
            if (person) {
                res.json(person);
            } else {
                res.status(404).json({ message: "Person not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const updatePerson = (req, res) => {
    const id = req.params.id;
    const updatedPersonData = req.body;
    People.findByPk(id)
        .then(person => {
            if (person) {
                return person.update(updatedPersonData);
            } else {
                res.status(404).json({ message: "Person not found" });
            }
        })
        .then(person => {
            console.log(person);
            res.json(person);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}

const deletePerson = (req, res) => {
    const id = req.params.id;
    People.findByPk(id)
        .then(person => {
            if (person) {
                return person.destroy();
            } else {
                res.status(404).json({ message: "Person not found" });
            }
        })
        .then(deletedPerson => {
            console.log('Deleted person:', deletedPerson);
            res.json(deletedPerson);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
}

module.exports = {
    ping,
    getAllPeople,
    createPerson,
    getPersonByID,
    updatePerson,
    deletePerson
};