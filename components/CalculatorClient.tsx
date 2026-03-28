"use client";

type CalculatorField = {
  key: string;
  label: string;
  type: "number";
  defaultValue: number;
};

type Calculator = {
  title: string;
  description: string;
  fields: CalculatorField[];
};

type Props = {
  calculator: Calculator;
};

export default function CalculatorClient({ calculator }: Props) {
  return (
    <div
      style={{
        marginTop: "24px",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Calculator Form</h2>

      {calculator.fields?.map((field) => (
        <div key={field.key} style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", marginBottom: "4px" }}>
            {field.label}
          </label>
          <input
            type="number"
            defaultValue={field.defaultValue}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
      ))}

      <div style={{ marginTop: "16px", fontWeight: "bold" }}>
        Result block
      </div>
    </div>
  );
}