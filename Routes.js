import express from 'express';
import * as categories from './controllers/categories-controller.js';
import * as endPoints from './constants/endpoints.js';
import { getArticles } from './controllers/articles-controller.js';

const router = express.Router();

//CATEGORIES ROUTES CONTROLLERS

//--get routes --
router.get(
  endPoints.adminEndPoints.categories.GET.index,
  categories.categoriesIndex
);

router.get(
    endPoints.adminEndPoints.categories.GET.createNewCategory,
  categories.createNewCategory
);
router.get(
    endPoints.adminEndPoints.categories.GET.categoryEdition,
  categories.selectEditCategory
);
//--post routes --
router.post(
    endPoints.adminEndPoints.categories.POST.saveCategory,
  categories.saveNewCategory
);
router.post(
    endPoints.adminEndPoints.categories.POST.deleteCategory,
  categories.deleteCategory
);
router.post(
    endPoints.adminEndPoints.categories.POST.updateCategory,
  categories.updateCategory
);

//ARTICLES ROUTES CONTROLLERS
router.get('/articles', getArticles);

export default router;
