import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { usePeopleContext } from '../context/PeopleProvider'; // Import the context hook

function Create() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const history = useNavigate();
    const { addPerson } = usePeopleContext(); // Use the context hook to access the addPerson function

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !age) {
            alert("Name and age are required");
            return;
        }

        const newEntry = {
            name: name,
            age: age,
        };

        // Call the addPerson function from the context to add the new entry
        addPerson(newEntry);
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAge">
                    <Form.Control
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>

                <Link className="d-grid gap-2" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;
