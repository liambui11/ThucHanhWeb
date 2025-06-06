import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, addProduct, updateProduct } from "../api/productApi";
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAdd = async () => {
    if (!name || !description) return;
    const newProduct = await addProduct({ name, description });
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setName("");
    setDescription("");
  };

  const handleUpdate = async () => {
    if (!name || !description) {
      return alert("Tên và mô tả không thể để trống!");
    }

    if (!selectedProduct) {
      return alert("Vui lòng chọn sản phẩm để sửa!");
    }

    try {
      const updatedProduct = await updateProduct(selectedProduct.id, {
        name,
        description,
      });

      if (updatedProduct) {
        // Fetch lại dữ liệu sau khi cập nhật sản phẩm
        getProducts().then(setProducts);

        setName("");
        setDescription("");
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error.message);
    }
  };

  return (
    <div>
      <div className="menu">
        <h1 className="logo">🛒 Cửa hàng sản phẩm Đồ ăn - Đồ uống</h1>
        <Link to="/detail" className="nav-link">
          Giới thiệu
        </Link>
      </div>

      <p>Chào mừng đến với shop!</p>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên sản phẩm"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Mô tả"
      />
      <button onClick={handleAdd}>Thêm sản phẩm</button>
      <button onClick={handleUpdate}>Sửa sản phẩm</button>

      {products.map((p) => (
        <div
          key={p.id}
          className="product-card"
          onClick={() => {
            setName(p.name);
            setDescription(p.description);
            setSelectedProduct(p); // Lưu sản phẩm đã chọn
          }}
        >
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
