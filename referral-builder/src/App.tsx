import { Button, Fieldset } from "@headlessui/react";
import "./App.css";
import FieldSetLegend from "./components/forms/FieldSetLegend";
import LabeledInput from "./components/forms/LabeledInput";
import MenuIcon from "./assets/icons/MenuIcon";
import PencilIcon from "./assets/icons/PencilIcon";
import TrashIcon from "./assets/icons/TrashIcon";
import FormButton from "./components/forms/FormButton";
import { ReferralInfo } from "./models/ReferralInfo";
import { useEffect, useReducer, useRef, useState } from "react";
import { initialState, referralReducer } from "./reducers/referralReducer";
import ImageCropper from "./components/image-cropper/ImageCropper";
import XMarkIcon from "./assets/icons/XMarkIcon";
import { formatPhoneNumber } from "./helpers/formatters";
import { isValidEmail, isValidNumber } from "./helpers/validators";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addReferral, fetchReferrals } from "./api/referrals";

function App() {
  const [referralInfoState, dispatch] = useReducer(
    referralReducer,
    initialState
  );
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string>();
  const [croppedImage, setCroppedImage] = useState<string>();
  const queryClient = useQueryClient();
  const [showFormValidations, setShowFormValidations] = useState(false);

  const [referralTableInfo, setReferralTableInfo] = useState<ReferralInfo[]>(
    []
  );

  const { data: referrals, isLoading } = useQuery({
    queryKey: ["referrals"],
    queryFn: () => fetchReferrals(),
    staleTime: Infinity,
    cacheTime: 0,
  });

  const { mutateAsync: addReferralMutation } = useMutation({
    mutationFn: addReferral,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["referrals"] });
    },
  });

  useEffect(() => {
    referrals && setReferralTableInfo(referrals!);
  }, [referrals]);

  useEffect(() => {
    setReferralTableInfo((prev) => {
      return prev.map((referral) =>
        referral.id === referralInfoState.referral.id
          ? referralInfoState.referral
          : referral
      );
    });
  }, [referralInfoState.referral]);

  useEffect(() => {
    dispatch({ type: "UPDATE_FIELD", field: "avatar", payload: croppedImage! });
  }, [croppedImage]);

  const renderTableRow = (referralInfo: ReferralInfo): JSX.Element => {
    const isBeingEdited = referralInfo.id === referralInfoState.referral.id;

    return (
      <>
        <tr
          key={referralInfo.id}
          className="text-sm leading-10 text-primary py-4 border-b border-muted"
        >
          <td>{isBeingEdited ? "→" : ""}</td>
          <td>{referralInfo.givenName}</td>
          <td>{referralInfo.surname}</td>
          <td>{referralInfo.email}</td>
          <td>{referralInfo.phone}</td>
          <td>
            {!isBeingEdited ? (
              <>
                <Button
                  onClick={() =>
                    dispatch({ type: "LOAD_REFERRAL", payload: referralInfo })
                  }
                >
                  <PencilIcon className="fill-primary stroke-none stroke-1 size-4 inline mr-1" />
                </Button>
                <Button
                  onClick={() => {
                    setReferralTableInfo((prev) =>
                      prev.filter((referral) => referral.id !== referralInfo.id)
                    );
                  }}
                >
                  <TrashIcon className="fill-primary stroke-none stroke-1 size-4 inline" />
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setReferralTableInfo((prev) => {
                    return prev.map((referral) =>
                      referral.id === referralInfoState.referral.id
                        ? referralInfoState.originalReferral!
                        : referral
                    );
                  });
                  dispatch({ type: "RESET" });
                }}
              >
                <XMarkIcon className="stroke-primary stroke-[4px] size-4 inline" />
              </Button>
            )}
          </td>
        </tr>
      </>
    );
  };

  const handleSubmit = async () => {
    if (
      !!referralInfoState?.referral.givenName &&
      !!referralInfoState?.referral.surname &&
      isValidEmail(referralInfoState?.referral.email) &&
      isValidNumber(referralInfoState?.referral.phone)
    ) {
      try {
        await addReferralMutation(referralInfoState.referral);
        dispatch({ type: "RESET" });
        setShowFormValidations(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      setShowFormValidations(true);
    }
  };

  const isNotNewReferral = referralInfoState.referral.id !== null;

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
            <LabeledInput
              label="Given Name"
              showValidation={isNotNewReferral || showFormValidations}
              isValid={() => !!referralInfoState?.referral.givenName}
              errorMessage="Given name is required"
              inputProps={{
                value: referralInfoState?.referral.givenName,
                invalid: !referralInfoState?.referral.givenName,
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
              showValidation={isNotNewReferral || showFormValidations}
              isValid={() => !!referralInfoState?.referral.surname}
              errorMessage="Surname is required"
              inputProps={{
                value: referralInfoState?.referral.surname,
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
              showValidation={isNotNewReferral || showFormValidations}
              isValid={() => isValidEmail(referralInfoState?.referral.email)}
              errorMessage="Email is not valid format"
              inputProps={{
                type: "email",
                value: referralInfoState?.referral.email,
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
              showValidation={isNotNewReferral || showFormValidations}
              isValid={() => isValidNumber(referralInfoState?.referral.phone)}
              errorMessage="Phone number is not valid format"
              inputProps={{
                value: referralInfoState?.referral.phone,
                maxLength: 12,
                onChange: (e) => {
                  const input = e.target.value;
                  const formatted = formatPhoneNumber(input);
                  dispatch({
                    type: "UPDATE_FIELD",
                    field: "phone",
                    payload: formatted,
                  });
                },
              }}
            />
          </div>

          <FieldSetLegend text="Address" />
          <div className="grid xl:grid-cols-2 gap-4">
            <LabeledInput
              label="Home Name Or #"
              inputProps={{
                value: referralInfoState.referral.Address?.homeNameOrNumber,
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
                value: referralInfoState.referral.Address?.street,
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
                value: referralInfoState.referral.Address?.suburb,
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
                value: referralInfoState.referral.Address?.state,
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
                value: referralInfoState.referral.Address?.postcode,
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
                value: referralInfoState.referral.Address?.country,
                onChange: (e) =>
                  dispatch({
                    type: "UPDATE_ADDRESS",
                    field: "country",
                    payload: e.target.value,
                  }),
              }}
            />
          </div>
          {referralInfoState.referral.avatar && (
            <div>
              <FieldSetLegend text="Avatar" />
              <div className="flex justify-center">
                <img src={croppedImage} />
              </div>
            </div>
          )}
          <div className="grid xl:grid-cols-2 gap-4 mt-6">
            <FormButton
              text="Upload Avatar"
              type="secondary"
              buttonProps={{
                onClick: () => {
                  fileInputRef.current?.click();
                },
              }}
            />
            <ImageCropper
              isOpen={isOpen}
              image={image}
              croppedImage={croppedImage}
              setImage={setImage}
              setIsOpen={setIsOpen}
              setCroppedImage={setCroppedImage}
              fileInputRef={fileInputRef}
            />
            <FormButton
              text={
                referralInfoState.referral.id === null
                  ? "Create Referral"
                  : "Update Referral"
              }
              type="primary"
              buttonProps={{ type: "submit", onClick: () => handleSubmit() }}
            />
          </div>
        </Fieldset>
      </div>
      <div className="grow flex justify-center py-12 px-8 bg-base">
        <div className="bg-white border-md w-full p-6">
          <table className="table-auto w-full">
            <thead>
              <tr className="uppercase text-sm leading-8 font-bold text-primary border-b border-muted">
                <th className="text-start"></th>
                <th className="text-start">Given Name</th>
                <th className="text-start">Surname</th>
                <th className="text-start">Email</th>
                <th className="text-start">Phone</th>
                <th className="text-start">Actions</th>
              </tr>
            </thead>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <tbody>
                {referralInfoState.referral.id === null &&
                  (referralInfoState.referral.givenName ||
                    referralInfoState.referral.surname ||
                    referralInfoState.referral.email ||
                    referralInfoState.referral.phone) &&
                  renderTableRow(referralInfoState.referral)}
                {referralTableInfo!.map((referralInfo) =>
                  renderTableRow(referralInfo)
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
