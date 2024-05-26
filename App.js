import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ComponentLibrary from './components/ComponentLibrary';
import Workspace from './components/Workspace';
import ConfigurationPanel from './components/ConfigurationPanel';
import ExecutionControls from './components/ExecutionControls';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [elements, setElements] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [token, setToken] = useState(null);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
  };

  const handleSaveConfiguration = (component, config) => {
    // Save the configuration
    console.log(`Saving configuration for ${component}`, config);
  };

  const handleConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  const handleBuild = () => {
    // Validate and build the workflow
    console.log('Building workflow...', elements);
  };

  const handleRun = () => {
    // Run the workflow
    console.log('Running workflow...');
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/"
          element={
            token ? (
              <div className="App">
                <ComponentLibrary onComponentSelect={handleComponentSelect} />
                <Workspace elements={elements} setElements={setElements} onConnect={handleConnect} />
                {selectedComponent && (
                  <ConfigurationPanel component={selectedComponent} onSave={handleSaveConfiguration} />
                )}
                <ExecutionControls onBuild={handleBuild} onRun={handleRun} />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
