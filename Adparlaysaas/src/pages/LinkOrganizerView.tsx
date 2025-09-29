import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { SocialMediaIcons } from '../components/SocialMediaIcons';
import { AccordionLink } from '../components/AccordionLink';

interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string;
  color?: string;
  type: 'link' | 'social' | 'product' | 'poll' | 'quiz' | 'form' | 'embed';
  isVisible: boolean;
  order: number;
  clicks?: number;
}

interface ProductItem {
  id: string;
  title: string;
  description: string;
  price?: string;
  image?: string;
  url: string;
  category?: string;
  isVisible: boolean;
  order: number;
  clicks?: number;
}

interface LinkOrganizer {
  id: string;
  userId: string;
  title: string;
  description?: string;
  profileImage?: string;
  profileName?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
  backgroundStyle?: {
    type: 'gradient' | 'solid' | 'image';
    primaryColor?: string;
    secondaryColor?: string;
    imageUrl?: string;
  };
  links: LinkItem[];
  products: ProductItem[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const LinkOrganizerView: React.FC = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const [linkOrganizer, setLinkOrganizer] = useState<LinkOrganizer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'links' | 'shop'>('links');
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    if (linkId) {
      fetchLinkOrganizer();
    }
  }, [linkId]);

  const fetchLinkOrganizer = async () => {
    if (!linkId) return;

    try {
      const docRef = doc(db, 'linkOrganizers', linkId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setLinkOrganizer({
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date()
        } as LinkOrganizer);
      } else {
        setError('Link page not found');
      }
    } catch (error) {
      console.error('Error fetching link organizer:', error);
      setError('Error loading link page');
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: LinkItem) => {
    try {
      // Update click count
      const linkRef = doc(db, 'linkOrganizers', linkId!);
      await updateDoc(linkRef, {
        [`links.${link.id}.clicks`]: increment(1)
      });

      // Format URL to ensure it has proper protocol
      let formattedUrl = link.url;
      
      // If URL doesn't start with http:// or https://, add https://
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }

      // Open link in new tab
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error updating click count:', error);
      
      // Format URL to ensure it has proper protocol
      let formattedUrl = link.url;
      
      // If URL doesn't start with http:// or https://, add https://
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }
      
      // Still open the link even if click tracking fails
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleProductClick = async (product: ProductItem) => {
    try {
      // Update click count
      const linkRef = doc(db, 'linkOrganizers', linkId!);
      await updateDoc(linkRef, {
        [`products.${product.id}.clicks`]: increment(1)
      });

      // Format URL to ensure it has proper protocol
      let formattedUrl = product.url;
      
      // If URL doesn't start with http:// or https://, add https://
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }

      // Open link in new tab
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error updating click count:', error);
      
      // Format URL to ensure it has proper protocol
      let formattedUrl = product.url;
      
      // If URL doesn't start with http:// or https://, add https://
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
      }
      
      // Still open the link even if click tracking fails
      window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentX(e.touches[0].clientX);
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0 && activeView === 'shop') {
        setSwipeDirection('right');
      } else if (deltaX < 0 && activeView === 'links') {
        setSwipeDirection('left');
      }
    }
  };

  const handleTouchEnd = () => {
    const deltaX = currentX - startX;
    
    if (Math.abs(deltaX) > 100) {
      if (deltaX > 0 && activeView === 'shop') {
        setActiveView('links');
      } else if (deltaX < 0 && activeView === 'links') {
        setActiveView('shop');
      }
    }
    
    setSwipeDirection(null);
    setStartX(0);
    setCurrentX(0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !linkOrganizer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Page Not Found</h1>
          <p className="text-gray-600">{error || 'This link page does not exist or has been removed.'}</p>
        </div>
      </div>
    );
  }

  // Additional safety check to ensure linkOrganizer has the required structure
  if (!linkOrganizer || typeof linkOrganizer !== 'object') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const visibleLinks = Array.isArray(linkOrganizer?.links) ? linkOrganizer.links.filter(link => link.isVisible) : [];
  const visibleProducts = Array.isArray(linkOrganizer?.products) ? linkOrganizer.products.filter(product => product.isVisible) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* iPhone-style container with rounded corners and shadow */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden rounded-t-3xl shadow-2xl">
        {/* Status bar area */}
        <div className="h-6 bg-black rounded-t-3xl flex items-center justify-center">
          <div className="w-16 h-1 bg-white rounded-full opacity-60"></div>
        </div>

        {/* Header with profile */}
        <div 
          className="relative overflow-hidden"
          style={{
            background: linkOrganizer.backgroundStyle?.type === 'gradient' 
              ? `linear-gradient(135deg, ${linkOrganizer.backgroundStyle.primaryColor}, ${linkOrganizer.backgroundStyle.secondaryColor})`
              : linkOrganizer.backgroundStyle?.primaryColor || '#8B5CF6'
          }}
        >
          
          <div className="relative p-8 pb-12">
            {/* Profile Section */}
            <div className="flex flex-col items-center text-center">
              {linkOrganizer.profileImage ? (
                <div className="relative mb-6">
                  <img 
                    src={linkOrganizer.profileImage} 
                    alt="Profile" 
                    className="w-28 h-28 rounded-full shadow-2xl object-cover"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 rounded-full bg-white bg-opacity-20 border-4 border-white border-opacity-30 flex items-center justify-center mb-6 shadow-2xl">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              
              <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">
                {linkOrganizer.profileName}
              </h1>
              
              {/* Bio with word limit */}
              <p className="text-white text-opacity-90 text-sm leading-relaxed max-w-xs mb-6 line-clamp-3">
                {linkOrganizer.bio && linkOrganizer.bio.length > 120 
                  ? `${linkOrganizer.bio.substring(0, 120)}...` 
                  : linkOrganizer.bio}
              </p>

              {/* Social Links - Smaller and below description */}
              {linkOrganizer.socialLinks && 
               typeof linkOrganizer.socialLinks === 'object' && 
               Object.values(linkOrganizer.socialLinks).some(link => link) && (
                <div className="mb-4">
                  <SocialMediaIcons 
                    socialLinks={linkOrganizer.socialLinks}
                    size="sm"
                    className="opacity-90"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-gray-100">
          <div className="flex">
            <button
              onClick={() => setActiveView('links')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                activeView === 'links'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Links</span>
                {visibleLinks.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                    {visibleLinks.length}
                  </span>
                )}
              </div>
              {activeView === 'links' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
            
            <button
              onClick={() => setActiveView('shop')}
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors relative ${
                activeView === 'shop'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Shop</span>
                {visibleProducts.length > 0 && (
                  <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                    {visibleProducts.length}
                  </span>
                )}
              </div>
              {activeView === 'shop' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeView === 'links' && (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6"
              >
                  {visibleLinks.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No links yet</h3>
                    <p className="text-gray-500 text-sm">Links will appear here when added</p>
                    </div>
                  ) : (
                  <div className="space-y-4">
                    {visibleLinks
                      .sort((a, b) => a.order - b.order)
                      .map((link, index) => (
                        <motion.div
                          key={link.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                        <AccordionLink
                          link={link}
                          theme={linkOrganizer.theme}
                          onClick={handleLinkClick}
                          className="w-full"
                        />
                        </motion.div>
                      ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeView === 'shop' && (
              <motion.div
                key="shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-6"
              >
                  {visibleProducts.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                    <p className="text-gray-500 text-sm">Products will appear here when added</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {visibleProducts.map((product, index) => (
                        <motion.button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                        className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                        {/* Product Image */}
                        <div className="aspect-square relative overflow-hidden">
                          {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                        </div>
                          
                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 leading-tight">
                              {product.title}
                            </h3>
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                              {product.description}
                            </p>
                            {product.price && (
                            <div className="text-sm font-bold text-green-600 mb-3">
                                {product.price}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-blue-600 font-medium">View Product</span>
                            <svg className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom safe area for iPhone */}
        <div className="h-8 bg-white"></div>
      </div>
    </div>
  );
};

export default LinkOrganizerView;
