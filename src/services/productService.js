import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { apiClient } from './api';

export const productService = {
  /**
   * Fetch all products with optional filtering and sorting
   * Later maps to: GET /api/products?category=...&search=...&sort=...
   */
  async getProducts(params = {}) {
    await apiClient.delay(150);
    let result = [...PRODUCTS];

    // Filter by Category
    if (params.category && params.category !== 'all') {
      result = result.filter(
        p => p.categorySlug.toLowerCase() === params.category.toLowerCase()
      );
    }

    // Filter by Search Query
    if (params.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Filter by Price Range
    if (params.minPrice !== undefined) {
      result = result.filter(p => p.price >= Number(params.minPrice));
    }
    if (params.maxPrice !== undefined) {
      result = result.filter(p => p.price <= Number(params.maxPrice));
    }

    // Filter by Min Rating
    if (params.minRating !== undefined && params.minRating > 0) {
      result = result.filter(p => p.rating >= Number(params.minRating));
    }

    // Sort Results
    if (params.sort) {
      switch (params.sort) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => b.id - a.id);
          break;
        case 'featured':
        default:
          result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return result;
  },

  /**
   * Fetch a single product by ID
   * Later maps to: GET /api/products/{id}
   */
  async getProductById(id) {
    await apiClient.delay(100);
    const product = PRODUCTS.find(p => p.id === Number(id));
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  },

  /**
   * Fetch featured products for homepage
   * Later maps to: GET /api/products/featured
   */
  async getFeaturedProducts() {
    await apiClient.delay(100);
    return PRODUCTS.filter(p => p.isFeatured);
  },

  /**
   * Fetch best-sellers for carousel
   * Later maps to: GET /api/products/bestsellers
   */
  async getBestsellers() {
    await apiClient.delay(100);
    return PRODUCTS.filter(p => p.isBestseller);
  },

  /**
   * Fetch all categories
   * Later maps to: GET /api/categories
   */
  async getCategories() {
    await apiClient.delay(80);
    return CATEGORIES;
  },

  /**
   * Get related products based on category
   */
  async getRelatedProducts(currentId, categorySlug, limit = 4) {
    await apiClient.delay(100);
    return PRODUCTS
      .filter(p => p.id !== Number(currentId) && p.categorySlug === categorySlug)
      .slice(0, limit);
  }
};
