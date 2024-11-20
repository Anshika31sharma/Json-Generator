import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Field {
  id: string;
  type: string;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    message?: string;
  };
}

interface FormSchema {
  formTitle: string;
  formDescription?: string;
  fields: Field[];
}

interface FormGeneratorProps {
  schema: FormSchema | null;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData, setFormData] = useState<any | null>(null);

  const onSubmit: SubmitHandler<any> = data => {
    console.log('Form submitted:', data);
    alert('Form submitted successfully!');
    setFormData(data);
  };

  const handleDownload = () => {
    if (!formData) {
      alert('No data available to download.');
      return;
    }
    const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-submission.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!schema) {
    return <p className="text-gray-500">Please enter a valid JSON schema to generate the form.</p>;
  }

  return (
    <div className="p-4 dark:text-white border-l border-gray-300">
      <h2 className="text-2xl font-bold mb-4">{schema.formTitle}</h2>
      {schema.formDescription && <p className="mb-4">{schema.formDescription}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {schema.fields?.map(field => (
          <div key={field.id}>
            <label className="block mb-1 font-medium" htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-600">*</span>}
            </label>
            {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
              <input
                id={field.id}
                type={field.type}
                {...register(field.id, {
                  required: field.required,
                  pattern: field.validation?.pattern ? new RegExp(field.validation.pattern) : undefined,
                })}
                placeholder={field.placeholder}
                className="w-full p-2 border dark:text-black border-gray-300 rounded"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                {...register(field.id, { required: field.required })}
                className="w-full dark:text-black p-2 border border-gray-300 rounded"
              >
                <option value="">Select an option</option>
                {field.options?.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : field.type === 'radio' ? (
              <div>
                {field.options?.map(option => (
                  <label key={option.value} className="block">
                    <input
                      type="radio"
                      {...register(field.id, { required: field.required })}
                      value={option.value}
                      className="mr-2 dark:text-black"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            ) : null}
            {errors[field.id] && <p className="text-red-600">{field.validation?.message || 'This field is required'}</p>}
          </div>
        ))}
     <div className="flex justify-between">
  {schema?.fields?.length > 0 && (
    <button type="submit" className="p-2 w-20 bg-blue-600 text-white rounded">Submit</button>
  )}
  {formData && (
    <button onClick={handleDownload} className="p-2 bg-green-600 text-white rounded">
      Download Data
    </button>
  )}
</div>

      </form>
     
    </div>
  );
};

export default FormGenerator;
