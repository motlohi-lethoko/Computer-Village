import React, { useState } from 'react';
import { 
  MessageSquareQuote, 
  Video, 
  Check, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle,
  Tag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onOpenEdit?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenEdit }) => {
  const { 
    isAdmin, 
    siteConfig, 
    toggleMarkSold, 
    updateProductPrice, 
    deleteProduct, 
    setSelectedProductForModal 
  } = useShop();

  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price.toString());
  const [priceSaveSuccess, setPriceSaveSuccess] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const isSold = product.status === 'sold';

  const handlePriceSave = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(editedPrice);
    if (!isNaN(val) && val >= 0) {
      updateProductPrice(product.id, val);
      setIsEditingPrice(false);
      setPriceSaveSuccess(true);
      setTimeout(() => setPriceSaveSuccess(false), 2000);
    }
  };

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `Hello Computer Village, I would like to inquire about ${product.title} (Price: M${product.price.toLocaleString()}) listed on your website. Is it available in Room 104A?`
    );
  };

  return (
    <div 
      className={`group relative flex flex-col bg-white border rounded-xl overflow-hidden transition-all duration-200 ${
        isSold 
          ? 'border-slate-200 opacity-80' 
          : 'border-slate-200 hover:border-slate-400 hover:shadow-md'
      }`}
    >
      {/* Sold Badge */}
      {isSold && (
        <div className="absolute top-2.5 left-2.5 z-20 bg-red-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
          SOLD OUT
        </div>
      )}

      {/* Condition Badge */}
      {!isSold && product.condition === 'Brand New' && (
        <div className="absolute top-2.5 left-2.5 z-20 bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
          Brand New
        </div>
      )}

      {/* Video Indicator */}
      {product.videoUrl && (
        <div className="absolute top-2.5 right-2.5 z-20 bg-slate-900/90 text-white font-medium text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
          <Video className="w-3 h-3 text-blue-400" />
          <span>Video Demo</span>
        </div>
      )}

      {/* Product Image Area */}
      <div 
        onClick={() => setSelectedProductForModal(product)}
        className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center border-b border-slate-100"
      >
        <img
          src={product.image}
          alt={product.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-102 ${
            isSold ? 'grayscale' : ''
          }`}
          onError={(e) => {
            const target = e.currentTarget;
            target.src = '/assets/images/laptops_showcase_row_1790265301779.jpg';
          }}
        />

        {/* Hover View Hint */}
        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-blue-700" />
            <span>View Specs</span>
          </span>
        </div>
      </div>

      {/* Product Info Body */}
      <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Brand & Condition Header */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-blue-700 uppercase tracking-wide text-[11px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-slate-500">
              {product.condition}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setSelectedProductForModal(product)}
            className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.title}
          </h3>

          {/* Unboxed Metadata Specs */}
          <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 font-mono">
            {product.specs.processor && (
              <span>{product.specs.processor}</span>
            )}
            {product.specs.ram && (
              <>
                <span className="text-slate-400 font-sans" aria-hidden="true">·</span>
                <span>{product.specs.ram}</span>
              </>
            )}
            {product.specs.storage && (
              <>
                <span className="text-slate-400 font-sans" aria-hidden="true">·</span>
                <span>{product.specs.storage}</span>
              </>
            )}
            {product.specs.os && (
              <>
                <span className="text-slate-400 font-sans" aria-hidden="true">·</span>
                <span>{product.specs.os}</span>
              </>
            )}
            {product.specs.voltage && (
              <span>{product.specs.voltage}</span>
            )}
            {product.specs.tipType && (
              <>
                <span className="text-slate-400 font-sans" aria-hidden="true">·</span>
                <span>{product.specs.tipType}</span>
              </>
            )}
          </div>
        </div>

        {/* Pricing & Order Actions */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          {/* Price Row / Admin Inline Edit */}
          <div className="flex items-baseline justify-between">
            {isEditingPrice ? (
              <form onSubmit={handlePriceSave} className="flex items-center gap-1.5 w-full">
                <span className="text-xs font-bold text-slate-600">M</span>
                <input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="w-24 bg-white border border-blue-600 rounded px-2 py-1 text-xs font-bold text-slate-900 focus:outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="p-1 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                  title="Save price"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingPrice(false);
                    setEditedPrice(product.price.toString());
                  }}
                  className="p-1 bg-slate-200 text-slate-600 rounded hover:bg-slate-300"
                >
                  ✕
                </button>
              </form>
            ) : (
              <div className="flex items-baseline gap-2">
                <div className="text-xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                  <span className="text-xs font-bold text-slate-500 mr-0.5">M</span>
                  {product.price.toLocaleString()}
                </div>

                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through tabular-nums">
                    M{product.originalPrice.toLocaleString()}
                  </span>
                )}

                {isAdmin && (
                  <button
                    onClick={() => setIsEditingPrice(true)}
                    className="p-1 text-slate-400 hover:text-blue-600 rounded hover:bg-slate-100 cursor-pointer"
                    title="Change price"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {priceSaveSuccess && (
              <span className="text-[11px] text-emerald-600 font-bold">Saved!</span>
            )}

            {!isEditingPrice && (
              <span className="text-[11px] text-slate-500">
                {product.specs.warranty || 'In Stock'}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedProductForModal(product)}
              className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 text-center transition-colors cursor-pointer"
            >
              Specs
            </button>

            <a
              href={`https://wa.me/${siteConfig.whatsappNumbers[0]}?text=${getWhatsAppMessage()}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 text-xs font-bold text-white transition-colors ${
                isSold 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed pointer-events-none' 
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-xs'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Inquire</span>
            </a>
          </div>

          {/* Admin Toolbar (Direct on Card) */}
          {isAdmin && (
            <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 bg-slate-50 p-2 rounded-lg">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleMarkSold(product.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                    isSold 
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                  title="Toggle sold status"
                >
                  {isSold ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Mark Available</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" />
                      <span>Mark as Sold</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1">
                  {onOpenEdit && (
                    <button
                      onClick={() => onOpenEdit(product)}
                      className="p-1 text-slate-600 hover:text-blue-600 hover:bg-slate-200 rounded cursor-pointer"
                      title="Edit stock details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setConfirmDelete(true)}
                    className="p-1 text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded cursor-pointer"
                    title="Delete product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {confirmDelete && (
                <div className="bg-red-50 border border-red-200 rounded p-1.5 flex items-center justify-between text-[11px] text-red-800">
                  <span>Confirm delete?</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        deleteProduct(product.id);
                        setConfirmDelete(false);
                      }}
                      className="px-1.5 py-0.5 bg-red-600 text-white rounded font-bold hover:bg-red-700 cursor-pointer"
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
