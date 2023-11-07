export const registrar = async (data) => {
    await fetch("http://localhost:3000/api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        return responseData
      })
      .catch((error) => {
        return error
      });
}