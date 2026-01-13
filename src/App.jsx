import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, 
  Search, 
  Menu as MenuIcon, 
  X, 
  CupSoda, 
  IceCream2, 
  GlassWater, 
  Milk, 
  Citrus,
  UtensilsCrossed,
  ArrowUp,
  Image as ImageIcon,
  Phone,
  MapPin,
  Map,
  Facebook,
  Instagram,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Receipt,
  MoreHorizontal // Added icon for "Others"
} from 'lucide-react';

// ... TikTokIcon component ...
const TikTokIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const MENU_DATA = [
  {
    category: "Coffee",
    categoryKh: "កាហ្វេ",
    icon: <Coffee className="w-5 h-5" />,
    items: [
      { 
        id: 1, 
        nameEn: "Americano", 
        nameKh: "អាមេរិកខេនណូ", 
        // EXAMPLE: How to add an image (remove // to enable after adding file)
        image: "/images/coffee/iced-americano.jpeg", 
        prices: { m: { hot: 5000, ice: 6000 }, l: { hot: 6000, ice: 7000 } } 
      },
      { id: 2, nameEn: "Cappuccino", nameKh: "កាពូឈីណូ", image: "/images/coffee/iced-cappuccino.jpg", prices: { m: { hot: 5000, ice: 6000, frappe: 8000 }, l: { hot: 6000, ice: 8000, frappe: 8500 } } },
      { id: 3, nameEn: "Latte Coffee", nameKh: "កាហ្វេឡាតេ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 5000, ice: 6000, frappe: 7000 }, l: { hot: 6000, ice: 7000, frappe: 7500 } } },
      { id: 4, nameEn: "Signature Coffee", nameKh: "កាហ្វេទឹកដោះគោ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 5000, ice: 6000, frappe: 7000 }, l: { hot: 6000, ice: 7000, frappe: 7500 } } },
      { id: 5, nameEn: "Latte Vanilla", nameKh: "ឡាតេវ៉ាន់នីឡា", image: "/images/coffee/IcedCaffeLattewProtein.jpg",  prices: { m: { hot: 6000, ice: 7000 }, l: { hot: 7000, ice: 8000 } } }, 
      { id: 6, nameEn: "Latte Caramel", nameKh: "ឡាតេខារ៉ាមែល", image: "/images/coffee/IcedCaramelProteinLatte.jpg",  prices: { m: { hot: 5000, ice: 6000, frappe: 7500 }, l: { hot: 6000, ice: 7000, frappe: 8000 } } },
      { id: 7, nameEn: "Mocha", nameKh: "ម៉ូកា", image: "/images/coffee/iced-mocha.jpeg",  prices: { m: { hot: 5000, ice: 6000, frappe: 7000 }, l: { hot: 6000, ice: 7000, frappe: 8000 } } },
      { id: 8, nameEn: "Coconut Coffee", nameKh: "កាហ្វេដូង", image: "/images/coffee/IcedCaramelProteinLatte.jpg",  prices: { m: { ice: 6000 }, l: { ice: 7000 } } },
    ]
  },
  {
    category: "Matcha",
    categoryKh: "ម៉ាតឆា",
    icon: <UtensilsCrossed className="w-5 h-5" />, 
    items: [
      { id: 9, nameEn: "Matcha Strawberry", nameKh: "ម៉ាតឆាស្ត្របឺរី", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 10, nameEn: "Matcha Coconut Cream", nameKh: "ម៉ាឆាដូងត្រឹម", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 11, nameEn: "Matcha Latte", nameKh: "ម៉ាតឆាឡាតេ", image: "/images/coffee/iced-matcha.jpeg",  prices: { m: { hot: 5000, ice: 6000 }, l: { hot: 6000, ice: 8000 } } },
    ]
  },
  {
    category: "Milk Tea",
    categoryKh: "តែទឹកដោះគោ",
    icon: <Milk className="w-5 h-5" />,
    items: [
      { id: 12, nameEn: "Green Milk Tea", nameKh: "តែបៃតងទឹកដោះគោ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 4000, ice: 5000, frappe: 6000 }, l: { hot: 6000, ice: 7000, frappe: 8000 } } },
      { id: 13, nameEn: "Red Milk Tea", nameKh: "តែក្រហមទឹកដោះគោ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 4000, ice: 5000, frappe: 6000 }, l: { hot: 6000, ice: 7000, frappe: 8000 } } },
      { id: 14, nameEn: "Black Milk Tea", nameKh: "តែខ្មៅទឹកដោះគោ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 5000 }, l: { ice: 7000 } } },
      { id: 15, nameEn: "Brown Sugar Milk Tea", nameKh: "តែស្ករត្នោតទឹកដោះគោ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 16, nameEn: "Strawberry Cream Green Tea", nameKh: "តែបៃតងស្ត្របឺរីគ្រីម", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 17, nameEn: "Strawberry Latte", nameKh: "ស្ត្របឺរីឡាតេ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
    ]
  },
  {
    category: "Chocolate",
    categoryKh: "សូកូឡា",
    icon: <IceCream2 className="w-5 h-5" />,
    items: [
      { id: 22, nameEn: "Chocolate", nameKh: "សូកូឡា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 5000, ice: 6000, frappe: 7000 }, l: { hot: 6000, ice: 8000, frappe: 9000 } } },
    ]
  },
  {
    category: "Soda",
    categoryKh: "សូដា",
    icon: <CupSoda className="w-5 h-5" />,
    items: [
      { id: 23, nameEn: "Passion Soda", nameKh: "ផាសិនសូដា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 24, nameEn: "Passion Cream Soda", nameKh: "ផាសិនក្រីមសូដា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 25, nameEn: "Blue Sky Soda", nameKh: "ប្លូស្កាយសូដា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
      { id: 26, nameEn: "Strawberry Soda", nameKh: "ស្ត្របឺរីសូដា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 6000 }, l: { ice: 8000 } } },
    ]
  },
  {
    category: "Lemon Tea",
    categoryKh: "តែក្រូចឆ្មា",
    icon: <Citrus className="w-5 h-5" />,
    items: [
      { id: 18, nameEn: "Lemon Red Tea", nameKh: "តែក្រហមក្រូចឆ្មា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 4000, ice: 4500 }, l: { hot: 5000, ice: 5500 } } },
      { id: 19, nameEn: "Lemon Green Tea", nameKh: "តែបៃតងក្រូចឆ្មា", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { hot: 4000, ice: 4500 }, l: { hot: 5000, ice: 5500 } } },
    ]
  },
  {
    category: "Smoothie",
    categoryKh: "ផ្លែឈើក្រឡុក",
    icon: <GlassWater className="w-5 h-5" />,
    items: [
      { id: 27, nameEn: "Passion Smoothie", nameKh: "ផាសិនក្រឡុក", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { frappe: 6000 }, l: { frappe: 8000 } } },
      { id: 28, nameEn: "Strawberry Smoothie", nameKh: "ស្ត្របឺរីក្រឡុក", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { frappe: 6500 }, l: { frappe: 8000 } } },
    ]
  },
  {
    category: "Fresh Milk",
    categoryKh: "ទឹកដោះគោស្រស់",
    icon: <Milk className="w-5 h-5" />,
    items: [
      { id: 20, nameEn: "Honey Milk", nameKh: "ទឹកដោះគោស្រស់ទឹកឃ្មុំ", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 5000 }, l: { ice: 7000 } } },
      { id: 21, nameEn: "Passion Milk", nameKh: "ផាសិនទឹកដោះគោស្រស់", image: "/images/coffee/iced-latte.jpeg",  prices: { m: { ice: 5000 }, l: { ice: 6000 } } },
    ]
  },
  {
    category: "Others",
    categoryKh: "ផ្សេងទៀត",
    icon: <MoreHorizontal className="w-5 h-5" />,
    items: [] // Add items here later
  }
];

const getCategoryStyles = (categoryName) => {
  switch (categoryName) {
    case "Coffee": return { bg: "bg-rose-100", icon: <Coffee className="w-8 h-8 text-rose-700 opacity-50" /> };
    case "Matcha": return { bg: "bg-emerald-100", icon: <UtensilsCrossed className="w-8 h-8 text-emerald-700 opacity-50" /> };
    case "Milk Tea": return { bg: "bg-orange-100", icon: <Milk className="w-8 h-8 text-orange-700 opacity-50" /> };
    case "Chocolate": return { bg: "bg-stone-200", icon: <IceCream2 className="w-8 h-8 text-stone-700 opacity-50" /> };
    case "Soda": return { bg: "bg-blue-100", icon: <CupSoda className="w-8 h-8 text-blue-700 opacity-50" /> };
    case "Lemon Tea": return { bg: "bg-yellow-100", icon: <Citrus className="w-8 h-8 text-yellow-700 opacity-50" /> };
    case "Smoothie": return { bg: "bg-pink-100", icon: <GlassWater className="w-8 h-8 text-pink-700 opacity-50" /> };
    case "Fresh Milk": return { bg: "bg-sky-100", icon: <Milk className="w-8 h-8 text-sky-700 opacity-50" /> };
    case "Others": return { bg: "bg-slate-100", icon: <MoreHorizontal className="w-8 h-8 text-slate-700 opacity-50" /> };
    default: return { bg: "bg-gray-100", icon: <Coffee className="w-8 h-8 text-gray-400" /> };
  }
};

const PriceTag = ({ label, price, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center min-w-[4rem] bg-white/80 hover:bg-rose-50 active:bg-rose-100 rounded-md py-1 px-1 border border-stone-200 hover:border-rose-200 transition-all cursor-pointer group shadow-sm active:scale-95"
  >
    <span className="text-[9px] text-gray-500 group-hover:text-rose-600 font-bold font-khmer tracking-tight">{label}</span>
    <span className="text-xs font-bold text-rose-900">{price?.toLocaleString()}៛</span>
  </button>
);

const MenuItem = ({ item, categoryName, onAddToCart }) => {
  const { bg, icon } = getCategoryStyles(categoryName);
  
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-200 flex gap-3">
      {/* Image Placeholder or Actual Image */}
      <div className={`w-24 h-32 sm:w-28 sm:h-36 flex-shrink-0 rounded-lg ${bg} flex items-center justify-center relative overflow-hidden group`}>
         {item.image ? (
            <img 
              src={item.image} 
              alt={item.nameEn} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
         ) : (
           <>
             <div className="absolute w-20 h-20 bg-white/20 rounded-full -top-4 -left-4"></div>
             {icon}
             <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-white drop-shadow-md" />
             </div>
           </>
         )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
        <div className="flex flex-col mb-2">
          <h3 className="font-bold text-stone-800 text-base leading-tight truncate">{item.nameEn}</h3>
          <p className="text-stone-500 font-khmer text-sm truncate">{item.nameKh}</p>
        </div>
        
        <div className="flex flex-col gap-2">
          {/* Sizes Row */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded w-5 text-center">M</span>
               <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                 {item.prices.m.hot && <PriceTag label="HOT/ក្តៅ" price={item.prices.m.hot} onClick={() => onAddToCart(item, 'M', 'Hot', item.prices.m.hot)} />}
                 {item.prices.m.ice && <PriceTag label="ICE/ទឹកកក" price={item.prices.m.ice} onClick={() => onAddToCart(item, 'M', 'Ice', item.prices.m.ice)} />}
                 {item.prices.m.frappe && <PriceTag label="FRP/ក្រឡុក" price={item.prices.m.frappe} onClick={() => onAddToCart(item, 'M', 'Frappe', item.prices.m.frappe)} />}
               </div>
            </div>
            
             <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded w-5 text-center">L</span>
               <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                 {item.prices.l.hot && <PriceTag label="HOT/ក្តៅ" price={item.prices.l.hot} onClick={() => onAddToCart(item, 'L', 'Hot', item.prices.l.hot)} />}
                 {item.prices.l.ice && <PriceTag label="ICE/ទឹកកក" price={item.prices.l.ice} onClick={() => onAddToCart(item, 'L', 'Ice', item.prices.l.ice)} />}
                 {item.prices.l.frappe && <PriceTag label="FRP/ក្រឡុក" price={item.prices.l.frappe} onClick={() => onAddToCart(item, 'L', 'Frappe', item.prices.l.frappe)} />}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ... CartModal component ...
const CartModal = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove }) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-md bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-white rounded-t-2xl">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-700" />
            <h2 className="font-bold text-lg text-stone-800">Your Order</h2>
            <span className="bg-rose-100 text-rose-700 text-xs px-2 py-0.5 rounded-full font-bold">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-stone-400">
              <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={onClose}
                className="mt-4 text-rose-600 font-bold text-sm hover:underline"
              >
                Start Adding Drinks
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId} className="flex items-center justify-between bg-stone-50 p-3 rounded-xl border border-stone-100">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 text-sm">{item.nameEn}</h4>
                  <p className="text-xs text-stone-500 font-khmer">{item.nameKh}</p>
                  <div className="flex gap-2 mt-1">
                    <span className="text-[10px] bg-white border border-stone-200 px-1.5 rounded text-stone-500 uppercase">{item.size}</span>
                    <span className="text-[10px] bg-rose-50 border border-rose-100 px-1.5 rounded text-rose-600 uppercase">{item.type}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-stone-800 text-sm">{(item.price * item.quantity).toLocaleString()}៛</span>
                  <div className="flex items-center gap-3 bg-white rounded-lg border border-stone-200 p-1">
                    <button 
                      onClick={() => onUpdateQuantity(item.cartId, -1)}
                      className="p-1 hover:bg-stone-100 rounded-md text-stone-500"
                    >
                      {item.quantity === 1 ? <Trash2 className="w-3 h-3 text-red-500" /> : <Minus className="w-3 h-3" />}
                    </button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.cartId, 1)}
                      className="p-1 hover:bg-stone-100 rounded-md text-stone-800"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-stone-100 bg-stone-50 rounded-b-2xl">
            <div className="flex justify-between items-center mb-4">
              <span className="text-stone-500 font-medium">Total Amount</span>
              <span className="text-xl font-black text-rose-700">{total.toLocaleString()}៛</span>
            </div>
            <button className="w-full bg-rose-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-900/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Receipt className="w-5 h-5" />
              <span>Confirm Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState("Coffee");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Nav Ref for auto-scrolling
  const navRef = useRef(null);

  const handleCategoryClick = (e, category) => {
    setActiveCategory(category);
    setSearchQuery("");
    
    // Auto-scroll logic: Center the clicked item
    const container = navRef.current;
    const button = e.currentTarget;
    
    if (container && button) {
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      
      // Calculate scroll position to center the button
      // We want: buttonLeft - scrollLeft = (containerWidth / 2) - (buttonWidth / 2)
      // So: scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)
      const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (item, size, type, price) => {
    setCart(prev => {
      // Check if exact item already exists
      const existingItem = prev.find(i => i.id === item.id && i.size === size && i.type === type);
      
      if (existingItem) {
        return prev.map(i => 
          (i.id === item.id && i.size === size && i.type === type)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, {
        cartId: Date.now(), // unique ID for the cart entry
        id: item.id,
        nameEn: item.nameEn,
        nameKh: item.nameKh,
        size,
        type,
        price,
        quantity: 1
      }];
    });
  };

  const updateQuantity = (cartId, change) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + change;
        return newQty < 1 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean)); // Remove items with null (quantity < 1)
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Add Favicon and Document Title
  useEffect(() => {
    document.title = "iMaster Café | Menu";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = 'iMaster.png'; 
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = MENU_DATA.flatMap(category => {
    if (!searchQuery && category.category !== activeCategory) return [];
    return category.items.filter(item => 
      item.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.nameKh.includes(searchQuery)
    ).map(item => ({ ...item, categoryName: category.category }));
  });

  const groupedSearchResults = filteredItems.reduce((acc, item) => {
    const cat = item.categoryName || activeCategory;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const displayData = searchQuery 
    ? Object.entries(groupedSearchResults).map(([cat, items]) => ({
        category: cat,
        categoryKh: MENU_DATA.find(c => c.category === cat)?.categoryKh,
        items
      }))
    : [MENU_DATA.find(c => c.category === activeCategory)];

  useEffect(() => {
    if (!searchQuery) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-32 relative selection:bg-rose-100">
      {/* Font Loader for Khmer Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap');
        .font-khmer {
          font-family: 'Kantumruy Pro', sans-serif;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Cart Modal */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart} 
        onUpdateQuantity={updateQuantity}
      />

      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-100">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg shadow-rose-900/20 bg-white border border-stone-100 flex items-center justify-center p-1">
                 <img src="iMaster.png" alt="iMaster Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-black text-stone-800 tracking-tight leading-none">iMaster Café</h1>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mt-1">Coffee & Drinks</p>
              </div>
            </div>
            
            {/* Header Cart Button (Desktop/Tablet) */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-stone-100 text-stone-600 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-0 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4 group-focus-within:text-rose-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search drinks... (រកភេសជ្ជៈ)" 
              className="w-full pl-10 pr-4 py-3 bg-stone-100/50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:bg-white focus:border-rose-500/50 text-sm transition-all font-khmer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-1 rounded-full hover:bg-stone-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Updated Navigation with Ref for Auto-Scrolling */}
        <nav 
          ref={navRef}
          className="overflow-x-auto no-scrollbar scroll-smooth"
        >
          <div className="max-w-3xl mx-auto flex px-2 min-w-max">
            {MENU_DATA.map((cat) => (
              <button
                key={cat.category}
                onClick={(e) => handleCategoryClick(e, cat.category)}
                className={`
                  flex flex-col items-center gap-1.5 px-5 py-3 text-xs sm:text-sm font-medium transition-all duration-300 border-b-[3px]
                  ${activeCategory === cat.category && !searchQuery
                    ? 'border-rose-700 text-rose-700 bg-rose-50/30' 
                    : 'border-transparent text-stone-400 hover:text-stone-600 hover:bg-stone-50'}
                `}
              >
                <span className={`p-1.5 rounded-full transition-transform duration-300 ${activeCategory === cat.category ? 'bg-rose-100 scale-110' : 'bg-transparent scale-100'}`}>
                   {React.cloneElement(cat.icon, { className: "w-4 h-4" })}
                </span>
                <span className="whitespace-nowrap font-khmer">{cat.categoryKh}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {displayData.map((section, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            {searchQuery && (
              <div className="sticky top-[152px] bg-stone-50/95 backdrop-blur-sm py-3 z-10 px-1 -mx-1 mb-2">
                 <h2 className="text-lg font-bold text-stone-700 flex items-center gap-2">
                  <span className="w-1 h-6 bg-rose-500 rounded-full"></span>
                  {section.category}
                  <span className="text-sm font-normal text-stone-400 font-khmer">({section.categoryKh})</span>
                </h2>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {section.items.map((item) => (
                <MenuItem key={item.id} item={item} categoryName={section.category || activeCategory} onAddToCart={addToCart} />
              ))}
            </div>

            {section.items.length === 0 && (
              <div className="text-center py-16 text-stone-400 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mb-4">
                    <Coffee className="w-8 h-8 text-stone-400" />
                </div>
                <p className="font-medium">No items found</p>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Floating Cart Bar (Bottom) */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-3xl mx-auto">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-rose-900 text-white p-4 rounded-2xl shadow-xl shadow-rose-900/30 flex items-center justify-between border border-rose-800 animate-in slide-in-from-bottom duration-500"
          >
            <div className="flex items-center gap-3">
              <div className="bg-rose-700 text-white font-bold w-10 h-10 rounded-xl flex items-center justify-center shadow-inner">
                {totalCartItems}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-rose-300 font-medium">Total Price</span>
                <span className="text-lg font-bold">{totalCartPrice.toLocaleString()}៛</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <span className="font-bold text-sm">View Cart</span>
              <ShoppingBag className="w-5 h-5" />
            </div>
          </button>
        </div>
      )}

      {/* Floating Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed right-6 p-3.5 bg-white text-rose-900 border border-rose-100 rounded-full shadow-lg transition-all duration-300 z-30 hover:bg-rose-50 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        style={{ bottom: totalCartItems > 0 ? '6rem' : '1.5rem' }}
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-10 mt-auto border-t-4 border-rose-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="bg-white/10 p-2 rounded-xl">
                 <img src="iMaster.png" alt="iMaster Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">iMaster Café</span>
          </div>

          <div className="flex justify-center items-center gap-2 mb-6">
            <a href="tel:015612512" className="flex items-center gap-2 bg-rose-700/10 hover:bg-rose-700/20 text-rose-500 font-bold py-2 px-5 rounded-full transition-colors border border-rose-700/20">
              <Phone className="w-4 h-4" />
              <span>015 612 512</span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-2 mb-8 px-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-800 text-stone-500 mb-1">
              <MapPin className="w-4 h-4" />
            </div>
            <p className="text-sm font-khmer text-stone-400 leading-relaxed max-w-md mx-auto">
              ខាងជើងផ្សារបែកអន្លូង (ចម្ងាយ៧០០ម៉ែត្រ) ភូមិ​បែកអន្លូង១ ឃុំ​អារក្សត្នោត ស្រុកស្ទឹងត្រង់ ខេត្តកំពង់ចាម
            </p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=12.370916,105.586711" 
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-2 text-rose-500 hover:text-rose-400 text-xs font-bold border border-rose-500/30 hover:bg-rose-500/10 px-4 py-2 rounded-full transition-all"
            >
              <Map className="w-3 h-3" />
              <span>មើលទីតាំងលើផែនទី (View Map)</span>
            </a>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <a href="#" className="p-2 rounded-full bg-stone-800 text-stone-400 hover:bg-[#1877F2] hover:text-white transition-all transform hover:scale-110">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-stone-800 text-stone-400 hover:bg-black hover:text-white transition-all transform hover:scale-110">
              <TikTokIcon className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full bg-stone-800 text-stone-400 hover:bg-[#E4405F] hover:text-white transition-all transform hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm mb-2 font-khmer opacity-80">រសជាតិកាហ្វេពិតៗ សម្រាប់ថ្ងៃថ្មីរបស់អ្នក</p>
          <div className="w-12 h-1 bg-stone-800 mx-auto my-4 rounded-full"></div>
          <p className="text-xs text-stone-600">© 2026 iMaster Café.</p>
        </div>
      </footer>
    </div>
  );
}