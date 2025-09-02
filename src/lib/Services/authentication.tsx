export async function registerUserApi(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await res.json();
  } catch (err) {
    throw err;
  }
}
 export async function loginUserApi(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
}
  export async function ResetPassword(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
}
 export async function forgotPasswords(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
}
 export async function verfiyCode(data: any) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    throw err;
  }
}