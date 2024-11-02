import React, { useState } from 'react';

interface JSONEditorProps {
  onChange: (schema: any) => void;
}

const JSONEditor: React.FC<JSONEditorProps> = ({ onChange }) => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setJsonInput(value);

    try {
      const parsedSchema = JSON.parse(value);
      setError(null);
      onChange(parsedSchema);
    } catch (err) {
      setError('Invalid JSON');
    }
  };

  return (
    <div >
      <h2 className="text-xl font-bold mb-2 dark:text-white">JSON Editor</h2>
      <textarea
        className="w-full h-screen p-4 dark:bg-night  border border-gray-300 dark:text-white  rounded focus:outline-none"
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Enter your JSON schema here..."
      />
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default JSONEditor;
