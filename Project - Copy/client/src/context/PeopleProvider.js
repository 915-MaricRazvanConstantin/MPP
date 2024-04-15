import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const PeopleContext = createContext();

export const usePeopleContext = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData(); // Fetch initial data
        const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds
        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/people')
            .then(response => {
                setPeople(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setError(error);
                setLoading(false);
            });
    };

    const fetchPerson = (id) => {
        return axios.get(`http://localhost:5000/api/people/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching person by ID: ', error);
                throw error;
            });
    };


    const addPerson = (newPerson) => {
        // Assuming the API supports adding a new person
        axios.post('http://localhost:5000/api/people', newPerson)
            .then(response => {
                setPeople(prevPeople => [...prevPeople, response.data]);
                window.alert('Successfully added new person');
            })
            .catch(error => {
                console.error('Error adding person: ', error);
                // Handle error if needed
            });
    };

    const deletePerson = (id) => {
        // Assuming the API supports deleting a person
        axios.delete(`http://localhost:5000/api/people/${id}`)
            .then(() => {
                setPeople(prevPeople => prevPeople.filter(person => person.id !== id));
            })
            .catch(error => {
                console.error('Error deleting person: ', error);
                // Handle error if needed
            });
    };

    const updatePerson = (id, updatedData) => {
        // Assuming the API supports updating a person
        axios.put(`http://localhost:5000/api/people/${id}`, updatedData)
            .then(() => {
                // Update the local state with the updated person data
                setPeople(prevPeople => prevPeople.map(person => {
                    if (person.id === id) {
                        return { ...person, ...updatedData };
                    }
                    return person;
                }));
                // Display a success alert
                window.alert('Person updated successfully.');
            })
            .catch(error => {
                console.error('Error updating person: ', error);
                // Handle error if needed
            });
    };

    return (
        <PeopleContext.Provider value={{ people, loading, error, addPerson, deletePerson, fetchPerson, updatePerson}}>
            {children}
        </PeopleContext.Provider>
    );
};