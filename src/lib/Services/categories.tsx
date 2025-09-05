export async function getAllCategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      cache: "no-store",  
    });

    if (!response.ok) {
      return(response.statusText || "Failed to fetch products");
    },

    const { data } = await response.json();
    return { data }; 
  } catch (err: any) {
    return { error: err.message || "Something went wrong" };
  }
}
 