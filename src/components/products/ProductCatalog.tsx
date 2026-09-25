import React, { useMemo } from 'react';
import { 
  Search, 
  Plus, 
  X
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';

interface ProductCatalogProps {
  onOpenAddModal: () => void;
  onOpenEditModal: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  onOpenAddModal, 
  onOpenEditModal 
}) => {
  const { 
    products, 
    isAdmin, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery, 
    brandFilter, 
    setBrandFilter, 
    statusFilter, 
    setStatusFilter, 
    sortBy, 
    setSortBy 
  } = useShop();

  // Extract unique brands for brand filter
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [products]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }

      // Brand filter
      if (brandFilter !== 'all' && p.brand.toLowerCase() !== brandFilter.toLowerCase()) {
        return false;
      }

      // Status filter
      if (statusFilter === 'available' && p.status === 'sold') {
        return false;
      }
      if (statusFilter === 'sold' && p.status !== 'sold') {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(query);
        const descMatch = p.description.toLowerCase().includes(query);
        const brandMatch = p.brand.toLowerCase().includes(query);
        const specsMatch = Object.values(p.specs).some(
          val => typeof val === 'string' && val.toLowerCase().includes(query)
        );
        return titleMatch || descMatch || brandMatch || specsMatch;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      // default: featured first, then available first
      if (a.status !== b.status) return a.status === 'available' ? -1 : 1;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, activeCategory, brandFilter, statusFilter, searchQuery, sortBy]);

  const categories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Inventory', count: products.length },
    { id: 'laptops', label: 'Laptops', count: products.filter(p => p.category === 'laptops').length },
    { id: 'desktops', label: 'PC Towers', count: products.filter(p => p.category === 'desktops').length },
    { id: 'chargers', label: 'Chargers', count: products.filter(p => p.category === 'chargers').length },
    { id: 'batteries', label: 'Batteries', count: products.filter(p => p.category === 'batteries').length },
    { id: 'printers', label: 'Printers', count: products.filter(p => p.category === 'printers').length },
    { id: 'peripherals', label: 'Peripherals', count: products.filter(p => p.category === 'peripherals').length },
    { id: 'networking', label: 'Routers & Net', count: products.filter(p => p.category === 'networking').length },
  ];

  return (
    <section id="catalog" className="py-12 bg-slate-100/60 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
              In-Store Hardware Stock · Metcash Complex Room 104A
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Laptops, PC Towers, Chargers & Accessories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Tested machines with original chargers, fast NVMe SSD storage, and pre-installed Windows. Inquire directly via WhatsApp or visit our shop.
            </p>
          </div>

          {/* Admin Fast Add Stock Button */}
          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Stock</span>
            </button>
          )}
        </div>

        {/* Category Tabs (Segmented Button Controls) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-transparent hover:text-white hover:shadow-md hover:shadow-blue-500/20'
                }`}
              >
                {!isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0" />
                )}
                <span className="relative z-10">{cat.label}</span>
                <span className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded font-mono transition-colors ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 text-slate-500 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center shadow-xs">
          
          {/* Live Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by brand, CPU (i5, i7, Ryzen), RAM, SSD or model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Brand Filter */}
          <div className="lg:col-span-3">
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-600"
            >
              <option value="all">All Brands (Dell, HP, Lenovo, etc.)</option>
              {availableBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Stock Availability Filter */}
          <div className="lg:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'available' | 'sold')}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-600"
            >
              <option value="all">All Stock Status</option>
              <option value="available">In Stock Only</option>
              <option value="sold">Sold Items</option>
            </select>
          </div>

          {/* Sort By Filter */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'newest')}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:bg-white focus:border-blue-600"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Recently Added</option>
            </select>
          </div>

        </div>

        {/* Results Counter & Active Filters Summary */}
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items in catalog
          </span>

          {(brandFilter !== 'all' || statusFilter !== 'all' || searchQuery.trim()) && (
            <button
              onClick={() => {
                setBrandFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="text-blue-700 hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onOpenEdit={onOpenEditModal}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                No matching hardware found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find items matching "{searchQuery}". Try searching for Core i5, ThinkPad, 8GB RAM, Type-C charger, or clear filters.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveCategory('all');
                setBrandFilter('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold hover:bg-blue-800 transition-colors"
            >
              Show All Available Inventory
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
