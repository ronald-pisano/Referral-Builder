import { ReferralInfo } from "../models/ReferralInfo";

const baseUrl = "http://localhost:5000/api/referrals";

export const fetchReferrals = async (): Promise<ReferralInfo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(baseUrl, {
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

  return [];
};

export const upsertReferral = async (
  referral: ReferralInfo
): Promise<ReferralInfo> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { id, ...referralWithoutId } = referral;
  var requestBody = referralWithoutId;

  if (id) {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
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
  } else {
    try {
      const response = await fetch(baseUrl, {
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

export const deleteReferral = async (referralId: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const response = await fetch(`${baseUrl}/${referralId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
