import { Button } from "@headlessui/react";

const FormButton = ({
  text,
  type,
}: {
  text: string;
  type: "primary" | "secondary";
}) => {
  const buttonStyle =
    type === "primary"
      ? "text-white hover:bg-success/80 bg-success"
      : "ring-1 ring-primary hover:text-primary/80 hover:bg-muted/50 bg-white";

  return (
    <Button
      className={
        "block w-full px-2 py-4 uppercase font-bold text-primary shadow-sm shadow-primary " +
        buttonStyle
      }
    >
      {text}
    </Button>
  );
};

export default FormButton;
