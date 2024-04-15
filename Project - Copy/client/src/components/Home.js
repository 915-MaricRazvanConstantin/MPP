import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { usePeopleContext } from "../context/PeopleProvider";

function Home() {
    const { people, loading, error, deletePerson } = usePeopleContext();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Logic to calculate index of the first and last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = people.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ margin: "5rem" }}>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((person) => (
                    <tr key={person.id}>
                        <td>{person.name}</td>
                        <td>{person.age}</td>
                        <td>
                            <Link to={`/person/${person.id}`}>
                                <Button>Details</Button>
                            </Link>{" "}
                            <Link to={`/edit/${person.id}`}>
                                <Button>Update</Button>
                            </Link>{" "}
                            <Button
                                onClick={() => deletePerson(person.id)}
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div>
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(people.length / itemsPerPage) }).map((_, index) => (
                        <li key={index} className="page-item">
                            <Button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
            <Link className="d-grid gap-2" to="/create">
                <Button variant="warning" size="lg">
                    Create
                </Button>
            </Link>
            <Link className="d-grid gap-2" to="/chart">
                <Button variant="warning" size="lg">
                    Chart
                </Button>
            </Link>
        </div>
    );
}

export default Home;
