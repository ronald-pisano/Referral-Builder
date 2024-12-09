import { Button, Fieldset } from "@headlessui/react";
import "./App.css";
import FieldSetLegend from "./components/forms/FieldSetLegend";
import LabeledInput from "./components/forms/LabeledInput";
import MenuIcon from "./assets/icons/MenuIcon";
import PencilIcon from "./assets/icons/PencilIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import FormButton from "./components/forms/FormButton";

function App() {
  return (
    <div className="flex">
      <div className="flex-col p-4 h-screen w-full md:max-w-screen-md min-w-80 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-start text-dark font-bold text-3xl tracking-normal">
            Referral Builder
          </h1>
          <MenuIcon className="size-6 stroke-black md:hidden" />
        </div>

        <Fieldset>
          <FieldSetLegend text="Personal Details" />
          <div className="grid xl:grid-cols-2 gap-4">
            <LabeledInput label="Given Name" />
            <LabeledInput label="Surname" />
            <LabeledInput label="Email" />
            <LabeledInput label="Phone" />
          </div>

          <FieldSetLegend text="Address" />
          <div className="grid xl:grid-cols-2 gap-4">
            <LabeledInput label="Home Name Or #" />
            <LabeledInput label="Street" />
            <LabeledInput label="Suburb" />
            <LabeledInput label="State" />
            <LabeledInput label="Postcode" />
            <LabeledInput label="Country" />
          </div>
        </Fieldset>

        <div className="grid xl:grid-cols-2 gap-4 mt-6">
          <FormButton text="Upload Avatar" type="secondary" />
          <FormButton text="Create Referral" type="primary" />
        </div>
      </div>
      <div className="grow flex justify-center py-12 px-8 bg-base">
        <div className="bg-white border-md w-full p-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="uppercase text-sm font-bold text-primary border-b border-muted">
                <th className="text-start">Given Name</th>
                <th className="text-start">Surname</th>
                <th className="text-start">Email</th>
                <th className="text-start">Phone</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm leading-6 text-primary py-4 border-b border-muted">
                <td>John</td>
                <td>Johnson</td>
                <td>jh@email123.com</td>
                <td>0453-283-283</td>
                <td>
                  <PencilIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
                  <TrashIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
                </td>
              </tr>
              <tr className="text-sm leading-6 text-primary py-4 border-b border-muted">
                <td>Matthew</td>
                <td>Lombard</td>
                <td>mat197501@gmail.com</td>
                <td>0453-283-283</td>
                <td>
                  <PencilIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
                  <TrashIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
