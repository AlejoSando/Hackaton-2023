export const entrar = async (data) => {
    await fetch("http://localhost:3000/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((responseData) => {
        return responseData
      })
      .catch((error) => {
        return error
      });

}