import AddProductModal from "./AddProductModal";
import RemoveProductModal from "./RemoveProductModal";

export default function ProductController({
  admin,
  addProductModal,
  setAddProductModal,
  removeProductModal,
  setRemoveProductModal,
  productToBeEdited,
  setProductToBeEdited,
}) {
  const closeProductModal = () => {
    setAddProductModal(false);
    setRemoveProductModal(false);
    setProductToBeEdited(null);
  };
  return (
    <>
      <AddProductModal
        show={addProductModal}
        onHide={closeProductModal}
        token={admin && admin.token}
        product={productToBeEdited}
      />

      <RemoveProductModal
        product={productToBeEdited}
        show={removeProductModal}
        onHide={closeProductModal}
        token={admin && admin.token}
      />
    </>
  );
}
