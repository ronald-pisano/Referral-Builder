import {
  Field,
  Label,
  Input,
  InputProps,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import XMarkIcon from "../../assets/icons/XMarkIcon";
import CheckMarkIcon from "../../assets/icons/CheckMarkIcon";
import { useEffect, useState } from "react";

const LabeledInput = ({
  label,
  inputProps,
  showValidation,
  isValid,
  errorMessage,
}: {
  label: string;
  inputProps: InputProps;
  isValid?: () => boolean;
  showValidation?: boolean;
  errorMessage?: string;
}) => {
  const [showValid, setShowValid] = useState(showValidation);

  useEffect(() => {
    setShowValid(showValidation);
  }, [showValidation]);

  return (
    <Field>
      <div className="flex items-center mb-1">
        <Label className="uppercase text-start text-primary text-xs mr-2">
          {label}
        </Label>
        {showValid && isValid && !isValid() && (
          <Popover className="inline-flex">
            <PopoverButton className="relative">
              <XMarkIcon className="stroke-danger stroke-2 size-4 " />
              <PopoverPanel className="absolute z-10 p-2 mt-2 w-48 bg-dark2 border rounded-md shadow-lg top-full left-1/2 -translate-x-1/2">
                <div className="text-white text-sm">{errorMessage}</div>
              </PopoverPanel>
            </PopoverButton>
          </Popover>
        )}
        {showValid && isValid && isValid() && (
          <CheckMarkIcon className="stroke-success stroke-2 size-4" />
        )}
      </div>
      <Input
        {...inputProps}
        onChange={(e) => {
          inputProps.onChange && inputProps.onChange(e);
          setShowValid(true);
        }}
        className="block w-full h-12 text-dark2 text-sm ring-inset ring-1 ring-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4 p-2"
      />
    </Field>
  );
};

export default LabeledInput;
