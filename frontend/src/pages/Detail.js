import React from "react";
import { Link } from "react-router-dom";

function Detail() {
  return (
    <div>
      <h2>📦 Giới thiệu web</h2>
      <p>
        Chào mừng bạn đến với <strong>Cửa hàng sản phẩm Đồ ăn - Đồ uống</strong>{" "}
        – nơi bạn có thể dễ dàng tìm thấy những món hàng thiết yếu mỗi ngày!
        Chúng tôi cam kết mang đến những sản phẩm chất lượng, giá cả hợp lý và
        dịch vụ tận tâm nhất.
      </p>
      <Link to="/">⬅️ Quay lại trang chủ</Link>
    </div>
  );
}

export default Detail;
