import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import "./App.css";

function App() {
  return (
    <>
      <div className="flex-col p-4 space-y-8">
        <h1 className="text-start text-dark font-bold text-3xl tracking-normal">
          Referral Builder
        </h1>

        <hr className="temp h-12 bg-slate-300" />

        <Fieldset>
          <Legend className="uppercase text-start text-primary text-sm pb-1 border-b border-muted font-bold mb-4 mt-8">
            Personal Details
          </Legend>

          <Field>
            <Label className="block uppercase text-start text-primary text-xs mb-1">
              Given Name
            </Label>
            <Input className="block w-full h-12 text-dark2 text-sm ring-1 ring-inset ring-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4 p-2" />
          </Field>

          <Field>
            <Label className="block uppercase text-start text-primary text-xs mb-1">
              Surname
            </Label>
            <Input className="block w-full h-12 text-dark2 text-sm ring-1 ring-inset ring-primary rounded-sm focus:outline-none focus:ring-2 focus:ring-accent mb-4 p-2" />
          </Field>
        </Fieldset>

        <hr className="temp h-12 bg-slate-300" />

        <Button className="block w-full py-4 uppercase font-bold text-primary ring-1 ring-primary hover:text-primary/80 hover:bg-muted/50 bg-white shadow-sm shadow-black">
          Upload Avatar
        </Button>
        <Button className="block w-full py-4 uppercase font-bold text-white hover:text-primary/80 hover:bg-muted/50 bg-success shadow-sm shadow-black">
          Create Referral
        </Button>
      </div>
      <div className="flex justify-center mt-8 w-screen p-4 bg-base">
        <div className="bg-white w-full border-md p-4">
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
              <tr className="text-sm leading-6 text-primary py-4 border-b border-muted">
                <td>Matthew</td>
                <td>Lombard</td>
                <td>mat197501@gmail.com</td>
                <td>0453-283-283</td>
                <td>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                    />
                  </svg>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4 inline"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
