import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import Edit from './components/Edit';
import Home from './components/Home';
import Details from './components/Details';
import MyChart from './components/Chart';
import { PeopleProvider } from './context/PeopleProvider';

function App() {
    return (
        <div className="App">
            <PeopleProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/edit/:id" element={<Edit />} />
                        <Route path="/person/:id" element={<Details />} />
                        <Route path="/chart" element={<MyChart />} />
                    </Routes>
                </Router>
            </PeopleProvider>
        </div>
    );
}

export default App;