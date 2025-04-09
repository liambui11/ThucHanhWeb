const API_URL = "http://localhost:3001/api/products";

export async function getProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error(`Lỗi khi fetch sản phẩm: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Lỗi khi lấy sản phẩm:", err.message);
    return [];
  }
}

export async function addProduct(product) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      throw new Error(`Lỗi khi thêm sản phẩm: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Lỗi khi thêm sản phẩm:", err.message);
    return null;
  }
}
