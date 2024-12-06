function ProductCard({ product, onUpdateStock, onDeleteProduct }) {
    return (
      <div className="card">
        <h2>{product.title}</h2>
        <img
          src={product.imgSrc}
          alt={product.title}
          style={{ maxWidth: "180px", maxHeight: "150px" }}
        />
        <p>
          <span>Price:</span> {product.price} {product.currency}
        </p>
        <p><span>Year:</span> {product.year}</p>
        <p><span>Stock:</span> {product.stock}</p>
        <div className="buttons">
          <button onClick={() => onUpdateStock(product.id, 1)}>➕</button>
          <button
            onClick={() => onUpdateStock(product.id, -1)}
            disabled={product.stock <= 0}
          >
            ➖
          </button>
          <button className="delBtn" onClick={() => onDeleteProduct(product.id)}>
            ❌
          </button>
        </div>
      </div>
    );
  }
  
  export default ProductCard;
  