/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/common/Header';
import { FlyerHero } from './components/home/FlyerHero';
import { FlyerLightboxModal } from './components/home/FlyerLightboxModal';
import { ProductCatalog } from './components/products/ProductCatalog';
import { ProductDetailModal } from './components/products/ProductDetailModal';
import { RepairsSection } from './components/repairs/RepairsSection';
import { ChargersSection } from './components/chargers/ChargersSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StockItemModal } from './components/admin/StockItemModal';
import { Footer } from './components/common/Footer';
import { Product } from './types';
import { MessageSquareQuote } from 'lucide-react';

const MainShopApp: React.FC = () => {
  const { 
    adminModalOpen, 
    setAdminModalOpen, 
    siteConfig 
  } = useShop();

  const [stockModalOpen, setStockModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenAddStock = () => {
    setProductToEdit(null);
    setStockModalOpen(true);
  };

  const handleOpenEditStock = (product: Product) => {
    setProductToEdit(product);
    setStockModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Navigation Header */}
      <Header />

      {/* Main Store Content */}
      <main className="flex-1">
        {/* Promotional Flyer Hero Section */}
        <FlyerHero />

        {/* Product Catalog: Laptops, Desktops, Printers, Peripherals */}
        <ProductCatalog 
          onOpenAddModal={handleOpenAddStock}
          onOpenEditModal={handleOpenEditStock}
        />

        {/* Repairs Desk & Diagnostics Test Bench */}
        <RepairsSection />

        {/* Genuine Chargers (M300 / M450) & Replacement Batteries */}
        <ChargersSection />
      </main>

      {/* Store Footer */}
      <Footer />

      {/* Mobile Floating WhatsApp Button */}
      <div className="fixed bottom-5 right-5 z-30 sm:hidden">
        <a
          href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${encodeURIComponent("Hello Computer Village, I would like to inquire about laptops, chargers, or repairs.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-900/30 transition-transform active:scale-95"
          aria-label="WhatsApp Store"
        >
          <MessageSquareQuote className="w-6 h-6" />
        </a>
      </div>

      {/* Flyer Zoom Lightbox Modal */}
      <FlyerLightboxModal />

      {/* Product Specs Detail Modal */}
      <ProductDetailModal />

      {/* Admin Dashboard */}
      <AdminDashboard 
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onOpenAddStock={handleOpenAddStock}
        onOpenEditStock={handleOpenEditStock}
      />

      {/* Add / Edit Stock Modal */}
      <StockItemModal 
        isOpen={stockModalOpen}
        onClose={() => {
          setStockModalOpen(false);
          setProductToEdit(null);
        }}
        productToEdit={productToEdit}
      />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainShopApp />
    </ShopProvider>
  );
}
