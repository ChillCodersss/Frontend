const baseURL = "62.60.213.13";

export const PaymentsHistory = async (
  token: string,
  PageSize: number,
  PageIndex: number
) => {
  const url = new URL(`http://${baseURL}/api/Payments`);
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

export const payingPayments = async (token: string, id: number) => {
  const response = await fetch(`http://${baseURL}/api/Payments?id=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ Id: id }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message || "خطا در ارتباط با سرور");
  }
  return response.json();
};

export const cancelRequestCounselor = async (token: string) => {
  const response = await fetch(
    `http://${baseURL}/api/RequestCounselor/Cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message || "خطا در ارتباط با سرور");
  }
  return response.json();
};
