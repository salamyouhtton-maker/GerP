import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product/ProductCard';
import { FiltersSidebar } from '@/components/product/FiltersSidebar';
import { PriceSortButton } from '@/components/product/PriceSortButton';
import { BestOfferNotification } from '@/components/notifications/BestOfferNotification';
import { products, getProductsByCategory } from '@/data/products';
import { categories } from '@/data/categories';
import { Category } from '@/lib/types';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const searchParamsResolved = await searchParams;
  
  const categoryInfo = categories.find(c => c.slug === categorySlug);
  if (!categoryInfo) {
    notFound();
  }

  let filteredProducts = getProductsByCategory(categoryInfo.id);

  // Apply filters
  const priceMin = searchParamsResolved.price_min ? Number(searchParamsResolved.price_min) : null;
  const priceMax = searchParamsResolved.price_max ? Number(searchParamsResolved.price_max) : null;
  const brand = searchParamsResolved.brand as string | undefined;
  const grade = searchParamsResolved.grade as string | undefined;
  const reason = searchParamsResolved.reason as string | undefined;

  if (priceMin !== null) {
    filteredProducts = filteredProducts.filter(p => p.priceSale >= priceMin);
  }
  if (priceMax !== null) {
    filteredProducts = filteredProducts.filter(p => p.priceSale <= priceMax);
  }
  if (brand) {
    filteredProducts = filteredProducts.filter(p => p.brand === brand);
  }
  if (grade) {
    filteredProducts = filteredProducts.filter(p => p.conditionGrade === grade);
  }
  if (reason && reason !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.discountReason === reason);
  }

  // Auto-sort by price if price filter is used
  const hasPriceFilter = priceMin !== null || priceMax !== null;
  const sortParam = searchParamsResolved.sort as string | undefined;
  
  if (hasPriceFilter || sortParam === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.priceSale - b.priceSale);
  }

  // Special positioning logic
  // For Waschmaschinen category
  if (categoryInfo.id === 'Waschmaschinen') {
    // 1. Find and move wm-010 (Bauknecht WM Class 7A with super badge) to position 0 (first position)
    const productWm010 = filteredProducts.find(p => p.id === 'wm-010');
    if (productWm010) {
      const wm010Index = filteredProducts.findIndex(p => p.id === 'wm-010');
      if (wm010Index !== -1 && wm010Index !== 0) {
        filteredProducts.splice(wm010Index, 1);
        filteredProducts.unshift(productWm010);
      }
    }
  }

  // For Staubsauger category
  if (categoryInfo.id === 'Staubsauger') {
    // 1. Find and move vac-philips-powerpro-compact-1 (PHILIPS PowerPro Compact with best badge) to position 0 (first position)
    const productPhilipsBest = filteredProducts.find(p => p.id === 'vac-philips-powerpro-compact-1');
    if (productPhilipsBest) {
      const philipsIndex = filteredProducts.findIndex(p => p.id === 'vac-philips-powerpro-compact-1');
      if (philipsIndex !== -1 && philipsIndex !== 0) {
        filteredProducts.splice(philipsIndex, 1);
        filteredProducts.unshift(productPhilipsBest);
      }
    }

    // 2. Move products without images to the end
    const productsWithoutImages: typeof filteredProducts = [];
    const productsWithImages: typeof filteredProducts = [];
    
    filteredProducts.forEach(product => {
      if (!product.imagesStock || product.imagesStock.length === 0 || 
          (product.id === 'staub-001' || product.id === 'staub-002')) {
        productsWithoutImages.push(product);
      } else {
        productsWithImages.push(product);
      }
    });
    
    // Rebuild array: products with images first, then products without images
    filteredProducts.length = 0;
    filteredProducts.push(...productsWithImages, ...productsWithoutImages);
  }

  // For Kühlschränke category
  if (categoryInfo.id === 'Kühlschränke') {
    // 1. Find and move fridge-003 (Beko RDSA240K40SN with best badge) to position 0 (first position)
    const productBekoBest = filteredProducts.find(p => p.id === 'fridge-003');
    if (productBekoBest) {
      const bekoIndex = filteredProducts.findIndex(p => p.id === 'fridge-003');
      if (bekoIndex !== -1 && bekoIndex !== 0) {
        filteredProducts.splice(bekoIndex, 1);
        filteredProducts.unshift(productBekoBest);
      }
    }

    // 2. Move products without images to the end
    const productsWithoutImages: typeof filteredProducts = [];
    const productsWithImages: typeof filteredProducts = [];
    
    filteredProducts.forEach(product => {
      if (!product.imagesStock || product.imagesStock.length === 0) {
        productsWithoutImages.push(product);
      } else {
        productsWithImages.push(product);
      }
    });
    
    // Rebuild array: products with images first, then products without images
    filteredProducts.length = 0;
    filteredProducts.push(...productsWithImages, ...productsWithoutImages);
  }

  // Common positioning logic for Waschmaschinen
  if (categoryInfo.id === 'Waschmaschinen') {

    // 2. Find and move product with price 130€ to position 1 (second position)
    const product130Index = filteredProducts.findIndex(p => p.priceSale === 130.00);
    if (product130Index !== -1 && product130Index !== 1) {
      const product130 = filteredProducts[product130Index];
      filteredProducts.splice(product130Index, 1);
      // Insert at index 1 (second position)
      if (filteredProducts.length > 1) {
        filteredProducts.splice(1, 0, product130);
      } else {
        filteredProducts.push(product130);
      }
    }

    // 3. Find and move wm-017 (Haier HW80-BP14929BU1 - third) to position 3 (first position of second row)
    // Grid has 3 columns, so second row starts at index 3
    const productWm017 = filteredProducts.find(p => p.id === 'wm-017');
    if (productWm017 && filteredProducts.length > 3) {
      const wm017Index = filteredProducts.findIndex(p => p.id === 'wm-017');
      if (wm017Index !== -1 && wm017Index !== 3) {
        filteredProducts.splice(wm017Index, 1);
        // Insert at index 3 (first position of second row)
        if (filteredProducts.length > 3) {
          filteredProducts.splice(3, 0, productWm017);
        } else {
          filteredProducts.push(productWm017);
        }
      }
    }

    // 4. Find and move most expensive product to position 3 (first position of second row) if wm-017 is not present
    // Grid has 3 columns, so second row starts at index 3
    if (filteredProducts.length > 3 && !productWm017) {
      let mostExpensiveIndex = -1;
      let mostExpensivePrice = -1;
      
      // Find most expensive product that is not at position 0 or 1
      for (let i = 0; i < filteredProducts.length; i++) {
        if (i !== 0 && i !== 1 && filteredProducts[i].priceSale > mostExpensivePrice) {
          mostExpensivePrice = filteredProducts[i].priceSale;
          mostExpensiveIndex = i;
        }
      }
      
      // Move most expensive to position 3 (index 3)
      if (mostExpensiveIndex !== -1 && mostExpensiveIndex !== 3) {
        const mostExpensive = filteredProducts[mostExpensiveIndex];
        filteredProducts.splice(mostExpensiveIndex, 1);
        // Insert at index 3 (first position of second row)
        if (filteredProducts.length > 3) {
          filteredProducts.splice(3, 0, mostExpensive);
        } else {
          filteredProducts.push(mostExpensive);
        }
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">{categoryInfo.name}</h1>
        <PriceSortButton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FiltersSidebar category={categoryInfo.id} />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-4 text-sm text-muted-foreground">
            {filteredProducts.length} Produkt{filteredProducts.length !== 1 ? 'e' : ''} gefunden
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      {categoryInfo.id === 'Waschmaschinen' && <BestOfferNotification />}
    </div>
  );
}


