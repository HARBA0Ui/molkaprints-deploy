import Product from "../Product/Product";

/* eslint-disable react/prop-types */
function ProductsTable({ products }) {
  return (
    <div className="gap-4 flex justify-center flex-col">
      {products.map(p => <Product key={p.id} product={p} />)}
    </div>
  );
}

export default ProductsTable;
