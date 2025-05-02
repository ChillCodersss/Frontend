export const changePassword = async (
  token: string,
  oldPassword: string,
  newPassword: string,
  confirmedNewPassword: string
) => {
  const response = await fetch(
    "http://localhost:8080//api/Auth/ProfileChangePassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmedNewPassword: confirmedNewPassword,
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to change password");
  }

  return response.json();
};
