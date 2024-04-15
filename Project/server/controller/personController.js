const PersonRepository = require('../repository/personRepository');

const ping = (req, res) => {
    res.status(200).json({ message: 'Server is up and running.' });
};

const getAllPeople = (req, res) => {
    PersonRepository.getAllPeople()
        .then(people => {
            res.json(people);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const createPerson = (req, res) => {
    const personData = req.body;
    PersonRepository.createPerson(personData)
        .then(newPerson => {
            console.log(newPerson);
            res.json(newPerson);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const getPersonByID = (req, res) => {
    const id = req.params.id;
    PersonRepository.getPersonById(id)
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
};

const updatePerson = (req, res) => {
    const id = req.params.id;
    const updatedPersonData = req.body;
    PersonRepository.updatePerson(id, updatedPersonData)
        .then(([_, updatedPerson]) => {
            if (updatedPerson) {
                console.log(updatedPerson);
                res.json(updatedPerson);
            } else {
                res.status(404).json({ message: "Person not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const deletePerson = (req, res) => {
    const id = req.params.id;
    PersonRepository.deletePerson(id)
        .then(deletedPerson => {
            if (deletedPerson) {
                console.log('Deleted person:', deletedPerson);
                res.json(deletedPerson);
            } else {
                res.status(404).json({ message: "Person not found" });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

module.exports = {
    ping,
    getAllPeople,
    createPerson,
    getPersonByID,
    updatePerson,
    deletePerson
};