import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, addProduct } from "../api/productApi";
import "./Home.css"

function Home() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  const handleAdd = async () => {
    if (!name || !desc) return;
    const newProduct = await addProduct({ name, desc });
    setProducts([...products, newProduct]);
    setName("");
    setDesc("");
  };

  return (
    <div>
      <div className="menu">
        <h1 className="logo">🛒 Cửa hàng sản phẩm</h1>
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
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Mô tả"
      />
      <button onClick={handleAdd}>Thêm sản phẩm</button>

      {products.map((p) => (
        <div key={p.id} className="product-card">
          <h3>{p.name}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
