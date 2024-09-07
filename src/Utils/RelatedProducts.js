function extractKeywords(product) {
    const keywords = [];
    
    if (product && product.name) {
        keywords.push(...product.name.split(' '));
    }
    if (product && product.description) {
        keywords.push(...product.description.split(' '));
    }
    
    return keywords;
}

export function findRelatedProducts(selectedProduct, ProductsData) {
    const relatedProducts = [];
  
    if (!selectedProduct || !selectedProduct.name || !selectedProduct.description) {
        return relatedProducts; // Return empty array or handle error condition
    }

    const keywords = extractKeywords(selectedProduct);
  
    for (let product of ProductsData) {
        if (!product.name || !product.description) {
            continue; // Skip products with missing name or description
        }

        const similarityScore = calculateSimilarity(selectedProduct, product);
      
        const similarityThreshold = 0.0;
      
        // if (similarityScore >= similarityThreshold) {
            relatedProducts.push(product);
        // }
    }
  
    return relatedProducts;
}

  // Example function to calculate similarity (simplified)
export function calculateSimilarity(selectedProduct, product) {
    // Example: Calculating based on keyword overlap
    const keywordsSelected = extractKeywords(selectedProduct);
    const keywordsProduct = extractKeywords(product);
    
    const intersection = keywordsSelected.filter(word => keywordsProduct.includes(word));
    const union = new Set([...keywordsSelected, ...keywordsProduct]);
    
    return intersection.length / union.size;
  }
  
