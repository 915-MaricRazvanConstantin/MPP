import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useParams } from "react-router-dom";
import { usePeopleContext } from "../context/PeopleProvider"; // Import the context hook

function Edit() {
    const { fetchPerson, updatePerson } = usePeopleContext(); // Use the context hook to access context values
    const { id } = useParams(); // Get the id from URL params
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        fetchPerson(id); // Fetch person data on component mount
    }, [fetchPerson, id]);

    const handleUpdate = (e) => {
        e.preventDefault();
        if (name === "" || age === "") {
            alert("Invalid input");
            return;
        }

        updatePerson(id, { name, age }); // Update person data
    };

    return (
        <div>
            <Form onSubmit={handleUpdate} className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter Name"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        type="number"
                        placeholder="Age"
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">
                    Update
                </Button>
                <Link className="d-grid gap-2" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
