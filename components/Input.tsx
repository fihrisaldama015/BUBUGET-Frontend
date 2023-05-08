"use client";

type InputType = {
  value: string;
  onChange: (value: string) => void;
};

const InputEmail = ({ value, onChange }: InputType) => {
  return (
    <input
      type="email"
      placeholder="Email"
      className="py-2 px-4 rounded-xl text-sm focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

const InputPassword = ({ value, onChange }: InputType) => {
  return (
    <input
      type="password"
      placeholder="******"
      className="py-2 px-4 rounded-xl text-sm focus:outline-none"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
  );
};

export { InputEmail, InputPassword };
