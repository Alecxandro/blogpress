const adminEndPoints = {
  categories: {
    GET: {
      index: '/admin/categories',
      createNewCategory: '/admin/categories/new-category',
      categoryEdition: '/admin/categories/edit-category/:id',
    },
  
    POST: {
      saveCategory: '/categories/save',
      deleteCategory: '/categories/delete',
      updateCategory: '/categories/updatecategory',
    },
  },

  articles: {}
 
};

export { adminEndPoints }