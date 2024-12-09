import { Field, Label, Input } from "@headlessui/react";

const LabeledInput = ({ label }: { label: string }) => {
  return (
    <Field>
      <Label className="block uppercase text-start text-primary text-xs mb-1">
        {label}
      </Label>
      <Input className="block w-full h-12 text-dark2 text-sm ring-1 ring-inset ring-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4 p-2" />
    </Field>
  );
};

export default LabeledInput;
