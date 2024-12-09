import { Button, Fieldset } from "@headlessui/react";
import "./App.css";
import FieldSetLegend from "./components/forms/FieldSetLegend";
import LabeledInput from "./components/forms/LabeledInput";
import MenuIcon from "./assets/icons/MenuIcon";
import PencilIcon from "./assets/icons/PencilIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import FormButton from "./components/forms/FormButton";
import { ReferralInfo } from "./models/ReferralInfo";
import testReferralInfoData from "./models/test-data/ReferralInfo-Test";
import { useReducer } from "react";
import { initialState, referralReducer } from "./reducers/referralReducer";

function App() {
  const [state, dispatch] = useReducer(referralReducer, initialState);

  const referralInfo: ReferralInfo[] = testReferralInfoData;

  const renderTableRow = (referralInfo: ReferralInfo): JSX.Element => {
    return (
      <tr className="text-sm leading-6 text-primary py-4 border-b border-muted">
        <td>{referralInfo.givenName}</td>
        <td>{referralInfo.surname}</td>
        <td>{referralInfo.email}</td>
        <td>{referralInfo.phone}</td>
        <td>
          <Button
            onClick={() =>
              dispatch({ type: "LOAD_REFERRAL", payload: referralInfo })
            }
          >
            <PencilIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
          </Button>
          <Button onClick={() => {}}>
            <TrashIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
          </Button>
        </td>
      </tr>
    );
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    alert("Submitted Data: " + state.referral?.email);
  };

  return (
    <div className="flex">
      <div className="flex-col p-4 h-screen w-full md:max-w-screen-md min-w-80 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-start text-dark font-bold text-3xl tracking-normal">
            Referral Builder
          </h1>
          <MenuIcon className="size-6 stroke-black md:hidden" />
        </div>

        <Fieldset onSubmit={handleSubmit}>
          <FieldSetLegend text="Personal Details" />
          <div className="grid xl:grid-cols-2 gap-4">
            <LabeledInput
              label="Given Name"
              inputProps={{
                value: state?.referral.givenName,
                required: true,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "givenName",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Surname"
              inputProps={{
                value: state?.referral.surname,
                required: true,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "surname",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Email"
              inputProps={{
                type: "email",
                value: state?.referral.email,
                required: true,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "email",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Phone"
              inputProps={{
                value: state?.referral.phone,
                required: true,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "phone",
                    payload: e.target.value,
                  }),
              }}
            />
          </div>

          <FieldSetLegend text="Address" />
          <div className="grid xl:grid-cols-2 gap-4">
            <LabeledInput
              label="Home Name Or #"
              inputProps={{
                value: state.referral.Address?.homeNameOrNumber,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "homeNameOrNumber",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Street"
              inputProps={{
                value: state.referral.Address?.street,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "street",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Suburb"
              inputProps={{
                value: state.referral.Address?.suburb,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "suburb",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="State"
              inputProps={{
                value: state.referral.Address?.state,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "state",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Postcode"
              inputProps={{
                value: state.referral.Address?.postcode,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "postcode",
                    payload: e.target.value,
                  }),
              }}
            />
            <LabeledInput
              label="Country"
              inputProps={{
                value: state.referral.Address?.country,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "country",
                    payload: e.target.value,
                  }),
              }}
            />
          </div>
          <div className="grid xl:grid-cols-2 gap-4 mt-6">
            <FormButton text="Upload Avatar" type="secondary" />
            <FormButton
              text="Create Referral"
              type="primary"
              buttonProps={{ type: "submit" }}
            />
          </div>
        </Fieldset>
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
              {state !== initialState &&
                state.referral.id === null &&
                renderTableRow(state.referral)}
              {referralInfo.map((referralInfo) => renderTableRow(referralInfo))}
            </tbody>
          </table>
          <span className="block">
            {state.referral.Address?.homeNameOrNumber}
          </span>
          <span className="block">{state.referral.Address?.street}</span>
          <span className="block">{state.referral.Address?.suburb}</span>
          <span className="block">{state.referral.Address?.state}</span>
          <span className="block">{state.referral.Address?.postcode}</span>
          <span className="block">{state.referral.Address?.country}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
