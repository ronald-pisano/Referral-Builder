import { Button, Fieldset, Input, Legend } from "@headlessui/react";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Referral Builder</h1>
        <Fieldset>
          <Legend>Personal Details</Legend>
          <Input className="focus:outline-none ring-1 ring-inset ring-gray-500 rounded-sm" />
        </Fieldset>
        <Button>Upload Avatar</Button>
        <Button>Create Referral</Button>
      </div>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Given Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John</td>
              <td>Johnson</td>
              <td>jh@email123.com</td>
              <td>0453-283-283</td>
              <td>
                <span>Pencil</span>
                <span>Trashcan</span>
              </td>
            </tr>
            <tr>
              <td>Matthew</td>
              <td>Lombard</td>
              <td>mat197501@gmail.com</td>
              <td>0453-283-283</td>
              <td>
                <span>Pencil</span>
                <span>Trashcan</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
