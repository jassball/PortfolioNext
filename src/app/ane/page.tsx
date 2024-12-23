"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // Predefined correct values

  const correctValues = {
    field1: ["36,55", "36.55"],
    field2: ["paris", "PARIS", "Paris"],
    field3: ["fireball", "Fireball"],
  };

  // State to hold user input and validation status
  const [formValues, setFormValues] = useState({
    field1: "",
    field2: "",
    field3: "",
  });

  const [errors, setErrors] = useState({
    field1: false,
    field2: false,
    field3: false,
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: false, // Reset error state on change
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // set field2 and field3 to lowercase
    formValues.field2 = formValues.field2.toLowerCase();
    formValues.field3 = formValues.field3.toLowerCase();

    // Validate inputs
    const newErrors = {
      field1: !correctValues.field1.includes(formValues.field1),
      field2: !correctValues.field2.includes(formValues.field2),
      field3: !correctValues.field3.includes(formValues.field3),
    };

    setErrors(newErrors);

    // Check if all fields are correct
    const allCorrect = Object.values(newErrors).every((error) => !error);

    if (allCorrect) {
      // Navigate to the next page
      router.push("/ane/correct");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-2xl font-bold mb-4">Skriv inn svarene</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["field1", "field2", "field3"].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              value={formValues[field as keyof typeof formValues]}
              onChange={handleChange}
              placeholder={
                field === "field1"
                  ? "Lars tid"
                  : field === "field2"
                  ? "Sang"
                  : "Fysikk spørsmål"
              }
              className={`block w-64 px-4 py-2 border-2 rounded-md focus:outline-none ${
                errors[field as keyof typeof errors]
                  ? "border-red-500"
                  : correctValues[field as keyof typeof correctValues].includes(
                      formValues[field as keyof typeof formValues]
                    )
                  ? "border-green-500"
                  : "border-gray-300"
              }`}
            />
          </div>
        ))}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white mx-auto rounded-md hover:bg-blue-600"
        >
          Send inn
        </button>
      </form>
    </div>
  );
}
