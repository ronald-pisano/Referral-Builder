import { ReferralInfo } from "../models/ReferralInfo";
import testReferralInfoData from "../models/test-data/ReferralInfo-Test";

const referrals = testReferralInfoData;

export const fetchReferrals = async (): Promise<ReferralInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch("http://localhost:5012/api/referrals", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return referrals;
};

export const upsertReferral = async (
  referral: ReferralInfo
): Promise<ReferralInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { id, ...referralWithoutId } = referral;
  var requestBody = referralWithoutId;

  if (id) {
    try {
      const response = await fetch(
        `http://localhost:5012/api/referrals/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  } else {
    try {
      const response = await fetch(`http://localhost:5012/api/referrals/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  return referral;
};
