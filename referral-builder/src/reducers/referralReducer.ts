import { Address } from "../models/Address";
import { ReferralInfo } from "../models/ReferralInfo";

type ReferralInfoEditableProperties = Omit<ReferralInfo, "id" | "Address">;
type AddressEditableProperties = Address;

export type ReferralActions =
  | { type: "LOAD_REFERRAL"; payload: ReferralInfo }
  | {
      type: "UPDATE_FIELD";
      field: keyof ReferralInfoEditableProperties;
      payload: string;
    }
  | {
      type: "UPDATE_ADDRESS";
      field: keyof AddressEditableProperties;
      payload: string | undefined;
    }
  | { type: "RESET" };

export type ReferralState = {
  referral: ReferralInfo;
  originalReferral?: ReferralInfo;
};

export const initialState: ReferralState = {
  referral: new ReferralInfo(null, "", "", "", ""),
};

export function referralReducer(
  state: ReferralState,
  action: ReferralActions
): ReferralState {
  switch (action.type) {
    case "LOAD_REFERRAL":
      return {
        ...state,
        referral: action.payload,
        originalReferral: action.payload,
      };

    case "UPDATE_FIELD":
      return {
        ...state,
        referral: { ...state.referral, [action.field]: action.payload },
      };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        referral: {
          ...state.referral,
          Address: {
            ...state.referral.Address!,
            [action.field]: action.payload,
          },
        },
      };

    case "RESET":
      if (state.originalReferral) {
        return { ...state, referral: state.originalReferral };
      }

      return { ...state, referral: new ReferralInfo(null, "", "", "", "") };

    default:
      const _exhaustiveCheck: never = action;
      console.log(_exhaustiveCheck);
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}
