import { Legend } from "@headlessui/react";

const FieldSetLegend = ({ text }: { text: string }) => {
  return (
    <Legend className="uppercase text-start text-primary text-sm pb-1 border-b border-muted font-bold mb-8">
      {text}
    </Legend>
  );
};

export default FieldSetLegend;
