// utils/buildCategoryTree.ts

import { Category } from "@/types/Category.type"

// input: flat list of categories
// output: nested tree with `children` arrays
export function buildCategoryTree(categories: Category[]): Category[] {
  const categoryMap: Record<string, Category & { children: Category[] }> = {}

  // Initialize map with children = []
  categories?.forEach(cat => {
    categoryMap[cat.id] = { ...cat, children: [] }
  })

  const tree: Category[] = []

  categories?.forEach(cat => {
    if (cat.parentId) {
      // add to its parent's children
      categoryMap[cat.parentId]?.children.push(categoryMap[cat.id])
    } else {
      // top-level (no parentId)
      tree.push(categoryMap[cat.id])
    }
  })

  return tree
}
