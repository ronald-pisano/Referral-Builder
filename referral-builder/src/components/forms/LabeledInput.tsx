import { Field, Label, Input, InputProps } from "@headlessui/react";

const LabeledInput = ({
  label,
  inputProps,
}: {
  label: string;
  inputProps: InputProps;
}) => {
  return (
    <Field>
      <Label className="block uppercase text-start text-primary text-xs mb-1">
        {label}
      </Label>
      <Input
        {...inputProps}
        className="block w-full h-12 text-dark2 text-sm ring-1 ring-inset ring-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-accent invalid:ring-danger invalid:ring-2 mb-4 p-2"
      />
    </Field>
  );
};

export default LabeledInput;
