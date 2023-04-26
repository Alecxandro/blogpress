
import slugify from 'slugify';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getPaginationInfo = async (req, prisma) => {
  const { numberresults = 3 } = req.body;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * numberresults;

  const [items, itemCount] = await Promise.all([
    prisma.categories.findMany({ skip, take: numberresults }),
    prisma.categories.count(),
  ]);

  const pageCount = Math.ceil(itemCount / numberresults);

  return { items, currentPage: page, pageCount };
};

async function createNewCategory(title) {
  await prisma.categories.create({
    data: {
      title,
      slug: slugify(title),
    },
  });
}

async function listAllCategories() {
  const categories = await prisma.categories.findMany();

  if (categories) return categories;
}

async function deleteCategory(id) {
  try {
    await prisma.categories.delete({
      where: { category_id: parseInt(id) },
    });
  } catch (error) {
    console.log('Error details:', error);
  }
}

async function selectOneCategory(id) {
  try {
    const category = await prisma.categories.findUnique({
      where: { category_id: parseInt(id) },
    });

    if (category) return category;
  } catch (error) {
    console.log('Error while selecting one category:', error);
  }
}

async function updateCategory(id, data) {
  try {
    const category = await prisma.categories.update({
      where: { category_id: id },
      data: {
        title: data,
        slug: slugify(data),
      },
    });
    console.log('Category update', category);
    if (category) return category;
  } catch (error) {
    console.log('Error while updating category:', error);
  }
}

export {
  createNewCategory,
  listAllCategories,
  deleteCategory,
  selectOneCategory,
  updateCategory,
  getPaginationInfo,
  prisma
};
