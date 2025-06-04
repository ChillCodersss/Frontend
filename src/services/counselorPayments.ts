const baseURL = "62.60.213.13";

export const CounselorPaymentsHistory = async (
  token: string,
  PageSize: number,
  PageIndex: number
) => {
  const url = new URL(`http://${baseURL}/api/Payments/CounselorPayments`);
  url.searchParams.append("PageSize", PageSize.toString());
  url.searchParams.append("PageIndex", PageIndex.toString());
  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message || "خطا در ارتباط با سرور");
  }

  return response.json();
};