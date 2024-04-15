import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePeopleContext } from '../context/PeopleProvider'; // Import the context hook

function Details() {
    const { fetchPerson } = usePeopleContext(); // Use the context hook to access context values
    const { id } = useParams(); // Get the id from URL params
    const [person, setPerson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch person data based on the ID
        fetchPerson(id)
            .then(response => {
                setPerson(response);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id, fetchPerson]); // Include id and getPersonById in the dependency array

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!person) return <p>No person found</p>;

    return (
        <div>
            <h1>Person Details</h1>
            <p>Name: {person.name}</p>
            <p>Age: {person.age}</p>
            {/* Add more details as needed */}
        </div>
    );
}

export default Details;