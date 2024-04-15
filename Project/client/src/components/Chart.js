import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { usePeopleContext } from '../context/PeopleProvider'; // Import the context hook
import axios from "axios";

const MyChart = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const { people } = usePeopleContext(); // Use the context hook to access the people array

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/people')
            .then(response => {
                // setArray(response.data);
                // Instead of setting the array state, use the people context directly
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    };

    useEffect(() => {
        // Create the chart only if array has data
        if (people.length > 0) { // Use the people array from context
            const labels = people.map((person) => person.name);
            const data = people.map((person) => parseInt(person.age));

            const ctx = chartRef.current.getContext("2d");

            if (chartInstance.current) {
                chartInstance.current.destroy(); // Destroy previous chart instance
            }

            chartInstance.current = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "age",
                            data: data,
                            backgroundColor: "rgba(54, 162, 235, 0.5)", // Blue color with transparency
                            borderColor: "rgba(54, 162, 235, 1)", // Solid blue color
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "age",
                            },
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy(); // Ensure chart is destroyed when component unmounts
            }
        };
    }, [people]); // Add people to the dependency array

    return <canvas ref={chartRef}/>;
};

export default MyChart;
