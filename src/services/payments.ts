const baseURL = "62.60.213.13";

export const PaymentsHistory = async (
  token: string,
  PageSize: number,
  PageIndex: number
) => {
  const response = await fetch(`http://${baseURL}/api/Payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ PageSize: PageSize, PageIndex: PageIndex }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData.message || "خطا در ارتباط با سرور");
  }

  return response.json();
};

export const payingPayments = async (token: string, id: number) => {
  const response = await fetch(`http://${baseURL}/api/Payments`, {
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
