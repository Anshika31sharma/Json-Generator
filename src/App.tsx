import React, { useState, useEffect } from 'react';
import JSONEditor from './component/JsonEditor';
import FormGenerator from './component/FormGenerator';
import Navbar from './component/Navbar';

const App: React.FC = () => {
  const [schema, setSchema] = useState<any | null>(null);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("isDarkMode");
    if (isDarkMode === "true") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const isDarkMode = document.documentElement.classList.toggle("dark");
    localStorage.setItem("isDarkMode", String(isDarkMode));
  };

  return (
    <div className="dark:bg-night">
      <Navbar toggleDarkMode={toggleDarkMode} />
      <div  className="min-h-screen flex flex-col md:flex-row">
      <div className=" w-full md:w-1/2 p-4">
        <JSONEditor onChange={setSchema} />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <FormGenerator schema={schema} />
      </div>
      </div>
    </div>
  );
};

export default App;
