// Categories Controllers

import * as categoryModel from '../models/category-model.js';
import * as helpers from '../helpers/helpers.js';


const categoriesIndex = async (req,res) => {
   const paginationInfo = await categoryModel.getPaginationInfo(req, categoryModel.prisma);
   res.render('../views/admin/categories/pagination.ejs', paginationInfo);
}


const createNewCategory = async (req, res) => {
  res.render('../views/admin/categories/new-category');
};

const saveNewCategory = async ({ body: { categoryname } }, res) => {
  if (!categoryname) {
    return res.redirect('/admin/categories/new-category');
  }

  try {
    await categoryModel.createNewCategory(categoryname);
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.redirect('/admin/categories/new-category');
  }
};

const deleteCategory = async ({ body: { id } }, res) => {
  if (!id || isNaN(id)) {
    return res.redirect('/admin/categories');
  }

  try {
    await categoryModel.deleteCategory(id);
    console.log('Category deleted');
  } catch (error) {
    console.error(`Error deleting category. Details: ${error}`);
  }

  res.redirect('/admin/categories');
};

const selectEditCategory = async (req, res) => {
  const category_id = req.params.id;
  const hasLetters = /^[0-9]+$/;

  if (!category_id) return res.redirect('/');
  if (!hasLetters.test(category_id))
    return res.render('../views/pagenotfound.ejs');

  const existingIds = await categoryModel.listAllCategories();
  
  const checkIfCategoryExists = helpers.checkIdMatch(
    existingIds,
    parseInt(category_id),
    'category_id'
  );
  

  if (!checkIfCategoryExists) return res.render('../views/pagenotfound.ejs');

  const category = await categoryModel.selectOneCategory(category_id);

  res.render('../views/admin/categories/edit-category.ejs', { category });
};

const updateCategory = async (req, res) => {
  const { id, editcategory: categoryName } = req.body;

  if (!id || isNaN(id)) return res.redirect('/admin/categories');

  try {
    const category = await categoryModel.updateCategory(
      parseInt(id),
      categoryName
    );
    console.log(category);
  } catch (error) {
    console.error('Error updating category: ', error);
  }

  res.redirect('/admin/categories');
};





export {
  
  createNewCategory,
  saveNewCategory,
  deleteCategory,
  selectEditCategory,
  updateCategory,
  categoriesIndex,
  
};
