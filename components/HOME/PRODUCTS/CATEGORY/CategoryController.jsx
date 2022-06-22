import { useDispatch, useSelector } from "react-redux";

import AddCategoryModal from "./AddCategoryModal";
import RemoveCategoryModal from "./RemoveCategoryModal";
import { setCategories } from "redux/categories";

export default function CategoryController({
  admin,
  addCategoryModal,
  setAddCategoryModal,
  removeCategoryModal,
  setRemoveCategoryModal,
  categoryId,
  setCategoryId,
  categoryToBeEdited,
  setCategoryToBeEdited,
}) {
  let dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const setNewCategoriresAfterRemove = (categoryId) => {
    let newCategories = categories.filter(
      (category) => category._id !== categoryId
    );
    dispatch(setCategories(newCategories));
  };
  const setNewCategoriresAfterEdit = (categoryId, categoryName) => {
    let editedCategories = [...categories];
    let categoryIndex = editedCategories.findIndex(
      (categoryItem) => categoryItem._id === categoryId
    );
    editedCategories[categoryIndex] = {
      ...editedCategories[categoryIndex],
      name: categoryName,
    };
    dispatch(setCategories(editedCategories));
  };
  const setNewCategoriresAfterAdd = (category) => {
    let newCategories = [...categories, category];
    dispatch(setCategories(newCategories));
  };
  const closeCategoryModal = () => {
    setAddCategoryModal(false);
    setRemoveCategoryModal(false);
    setCategoryId("");
    setCategoryToBeEdited(null);
  };
  return (
    <>
      <AddCategoryModal
        show={addCategoryModal}
        onHide={closeCategoryModal}
        token={admin && admin.token}
        onAdd={setNewCategoriresAfterAdd}
        category={categoryToBeEdited}
        onEdit={setNewCategoriresAfterEdit}
      />

      <RemoveCategoryModal
        categoryid={categoryId}
        show={removeCategoryModal}
        onHide={closeCategoryModal}
        token={admin && admin.token}
        onRemove={setNewCategoriresAfterRemove}
      />
    </>
  );
}
