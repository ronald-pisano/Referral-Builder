import { ReferralInfo } from "../models/ReferralInfo";
import testReferralInfoData from "../models/test-data/ReferralInfo-Test";

const referrals = testReferralInfoData;

/**
 * Mock function that mimics fetching todos from a database.
 */
export const fetchReferrals = async (query = ""): Promise<ReferralInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("fetched referrals");

  const filteredTodos = referrals.filter((referral) =>
    referral.givenName.toLowerCase().includes(query.toLowerCase())
  );

  // Uncomment the line below to trigger an error
  // throw new Error();

  return [...filteredTodos];
};

/**
 * Mock function that mimics adding a todo to a database.
 */
export const addReferral = async (
  referral: ReferralInfo
): Promise<ReferralInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (referrals.find((f) => f.id === referral.id)) {
    referrals.map((ref) => {
      ref.id === referral.id ? referral : ref;
    });

    return referral;
  } else {
    let newReferral: ReferralInfo = { ...referral, id: referrals.length + 1 };

    console.log("pushedReferral", newReferral);
    referrals.push(newReferral);

    return newReferral;
  }
};
