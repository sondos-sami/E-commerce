export async function registerUserApi(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return { error: res.statusText || "Failed to register user" };
    }

    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function loginUserApi(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to login user" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function ResetPassword(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/resetPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to reset password" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function forgotPasswords(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/forgotPasswords`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to send forgot password request" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}
export async function verfiyCode(data: any) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ecommerce.routemisr.com/api/v1';
    const res = await fetch(`${baseUrl}/auth/verifyResetCode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      return { error: res.statusText || "Failed to verify code" };
    }
    
    return await res.json();
  } catch (err: any) {
    return { error: err.message };
  }
}