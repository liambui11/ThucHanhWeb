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

export async function updateProduct(id, updatedProduct) {
  console.log("🔧 Đang cập nhật sản phẩm ID:", id);
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) {
      throw new Error(`Lỗi khi cập nhật sản phẩm: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Lỗi khi cập nhật sản phẩm:", err.message);
    console.log("🔧 Updating product ID:", id);

    return null;
  }
}
