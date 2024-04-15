const Mock = require('mockjs');

// Extend Mock.Random with custom firstName method
Mock.Random.extend({
    firstName: function() {
        const firstNames = ['John', 'Jane', 'Michael', 'Emily', 'William', 'Emma', 'David', 'Olivia', 'James', 'Ava', 'Alexander', 'Sophia'];
        return this.pick(firstNames);
    }
});

// Define a template for generating mock people data
const template = {
    'id': '@guid', // Ensure id is a string
    'name': '@firstName',
    'age|18-80': 1
};

// Initialize an empty array for people data
let PEOPLE = [];

// Function to generate a new person
const generatePerson = () => {
    return Mock.mock(template);
};

// Function to add a new person to the PEOPLE array every 5 seconds
const addPersonEvery5Seconds = () => {
    const newPerson = generatePerson();
    PEOPLE.push(newPerson);
    console.log('New person added:', newPerson);
};

const add10People = () => {
    for(let i = 0; i < 10; i++)
        PEOPLE.push(generatePerson());
}
add10People();

// Generate a new person every 5 seconds
//setInterval(addPersonEvery5Seconds, 5000);

// Export the PEOPLE array
module.exports = PEOPLE;