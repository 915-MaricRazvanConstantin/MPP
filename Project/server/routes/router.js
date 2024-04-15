const express = require('express')
const PeopleController = require('../controller/personController')
const router = express.Router()

router.get('/ping', PeopleController.ping);
router.get('/', PeopleController.getAllPeople);
router.post('/', PeopleController.createPerson);
router.get('/:id', PeopleController.getPersonByID);
router.put('/:id', PeopleController.updatePerson);
router.delete('/:id', PeopleController.deletePerson);

module.exports = {router};