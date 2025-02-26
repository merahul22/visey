import { NextApiRequest, NextApiResponse } from "next";
import { getBusinessDetails } from "@/actions/get-business-details";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { businessId } = req.query;

  if (!businessId || typeof businessId !== "string") {
    return res.status(400).json({ error: "Invalid businessId" });
  }

  try {
    const businessDetails = await getBusinessDetails(businessId as string);

    if ("error" in businessDetails) {
      return res.status(404).json({ error: businessDetails.error });
    }

    return res.status(200).json(businessDetails);
  } catch (error) {
    console.error("Failed to fetch business details:", error);
    return res.status(500).json({ error: "Failed to fetch business details" });
  }
}
