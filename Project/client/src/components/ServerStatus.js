import React, { useState, useEffect } from "react";
import Home from "./Home";

const ServerStatusChecker = () => {
    const [serverStatus, setServerStatus] = useState(null);

    useEffect(() => {
        fetch("/api/people/ping")
            .then(response => {
                if (response.status === 200) {
                    setServerStatus("up");
                } else {
                    setServerStatus("down");
                }
            })
            .catch(error => {
                console.error("Error checking server status:", error);
                setServerStatus("down");
            });
    }, []);

    if (serverStatus === "down") {
        return (
            <div>
                <h2>Server is Down</h2>
                <p>Please try again later.</p>
            </div>
        );
    }

    // If server is up, render the Home component
    return <Home />;
};

export default ServerStatusChecker;