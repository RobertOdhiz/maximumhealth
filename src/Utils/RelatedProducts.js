function extractKeywords(product) {
  const keywords = [];

  if (product && product.name) {
    keywords.push(...product.name.toLowerCase().split(' ')); // Convert to lowercase for consistent comparison
  }
  if (product && product.description) {
    keywords.push(...product.description.toLowerCase().split(' ')); // Convert to lowercase for consistent comparison
  }

  return keywords;
}

export function findRelatedProducts(selectedProduct, ProductsData = null) {
  const relatedProducts = [];

  if (!ProductsData) return null;

  if (!selectedProduct || !selectedProduct.name || !selectedProduct.description) {
    return ProductsData.slice(-3); // Return the last 3 products if there's an error or missing data
  }

  const keywords = extractKeywords(selectedProduct);

  for (let product of ProductsData) {
    if (!product.name || !product.description) {
      continue; // Skip products with missing name or description
    }

    const similarityScore = calculateSimilarity(selectedProduct, product);

    const similarityThreshold = 0.1; // Set a similarity threshold (adjust as needed)

    if (similarityScore >= similarityThreshold) {
      relatedProducts.push(product);
    }
  }

  // If no related products found, return the last 3 products in the data
  if (relatedProducts.length === 0) {
    return ProductsData.slice(-3);
  }

  return relatedProducts;
}

// Example function to calculate similarity based on keyword overlap
export function calculateSimilarity(selectedProduct, product) {
  const keywordsSelected = extractKeywords(selectedProduct);
  const keywordsProduct = extractKeywords(product);

  const intersection = keywordsSelected.filter((word) => keywordsProduct.includes(word));
  const union = new Set([...keywordsSelected, ...keywordsProduct]);

  return intersection.length / union.size; // Jaccard similarity
}
