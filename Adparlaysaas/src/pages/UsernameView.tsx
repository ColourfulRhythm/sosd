import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, where, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { SocialMediaIcons } from '../components/SocialMediaIcons';
import { AccordionLink } from '../components/AccordionLink';
import { BackgroundShader } from '../components/shaders';

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
  username?: string;
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

const UsernameView: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [linkOrganizer, setLinkOrganizer] = useState<LinkOrganizer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'links' | 'shop'>('links');
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  useEffect(() => {
    if (username) {
      fetchLinkOrganizerByUsername();
    }
  }, [username]);

  const fetchLinkOrganizerByUsername = async () => {
    if (!username) return;

    console.log('Fetching link organizer for username:', username);

    try {
      // Try to find by username - simplified approach
      const linkOrganizersQuery = query(
        collection(db, 'linkOrganizers'),
        where('username', '==', username)
      );
      
      const querySnapshot = await getDocs(linkOrganizersQuery);
      
      console.log('Query results:', querySnapshot.size, 'documents found');
      
      if (querySnapshot.empty) {
        console.log('No link organizer found for username:', username);
        setError('Link page not found');
        setLoading(false);
        return;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      console.log('Found link organizer data:', data);
      console.log('Document ID:', doc.id);
      
      // Set the link organizer data to render directly
      setLinkOrganizer({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        links: data.links || [],
        products: data.products || []
      } as LinkOrganizer);

    } catch (error) {
      console.error('Error fetching link organizer:', error);
      // If it's a permissions error, try a different approach
      if (error instanceof Error && error.message.includes('permissions')) {
        setError('This link page is private or not available');
      } else {
        setError('Error loading link page');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = async (link: LinkItem) => {
    try {
      // Update click count
      const linkRef = doc(db, 'linkOrganizers', linkOrganizer!.id);
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
      const linkRef = doc(db, 'linkOrganizers', linkOrganizer!.id);
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

  const visibleLinks = (linkOrganizer.links || []).filter(link => link.isVisible);
  const visibleProducts = (linkOrganizer.products || []).filter(product => product.isVisible);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background Shader */}
      <BackgroundShader shaderId={1} opacity={0.15} className="fixed inset-0" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
      
      {/* Mobile-first container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative overflow-hidden shadow-2xl">
        {/* Swipe indicator */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex space-x-1">
            <div 
              className={`w-2 h-2 rounded-full transition-colors ${
                activeView === 'links' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
            <div 
              className={`w-2 h-2 rounded-full transition-colors ${
                activeView === 'shop' ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            ></div>
          </div>
        </div>

        {/* Main content with swipe support */}
        <div 
          className="relative w-full h-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateX(${swipeDirection === 'left' ? '-10px' : swipeDirection === 'right' ? '10px' : '0'})`,
            transition: swipeDirection ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <AnimatePresence mode="wait">
            {activeView === 'links' && (
              <motion.div
                key="links"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Header */}
                <div 
                  className="h-64 relative"
                  style={{
                    background: linkOrganizer.backgroundStyle?.type === 'gradient' 
                      ? `linear-gradient(135deg, ${linkOrganizer.backgroundStyle.primaryColor}, ${linkOrganizer.backgroundStyle.secondaryColor})`
                      : linkOrganizer.backgroundStyle?.primaryColor || '#1F2937'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="relative p-6 h-full flex flex-col items-center justify-center text-white">
                    {linkOrganizer.profileImage && (
                      <img 
                        src={linkOrganizer.profileImage} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full mb-4 border-4 border-white border-opacity-30 object-cover"
                      />
                    )}
                    <h1 className="text-2xl font-bold mb-2 text-center">{linkOrganizer.profileName}</h1>
                    <p className="text-center text-white text-opacity-90 text-sm leading-relaxed">
                      {linkOrganizer.bio}
                    </p>
                  </div>
                </div>

                {/* Links - Accordion Format */}
                <div className="p-6 space-y-3">
                  {visibleLinks.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <p className="text-gray-600">No links available yet</p>
                    </div>
                  ) : (
                    visibleLinks
                      .sort((a, b) => a.order - b.order)
                      .map((link) => (
                        <AccordionLink
                          key={link.id}
                          link={link}
                          theme={linkOrganizer.theme}
                          onClick={handleLinkClick}
                          className="w-full"
                        />
                      ))
                  )}
                </div>

                {/* Social Links - Vector Icons */}
                {Object.values(linkOrganizer.socialLinks || {}).some(link => link) && (
                  <div className="px-6 pb-6">
                    <SocialMediaIcons 
                      socialLinks={linkOrganizer.socialLinks || {}}
                      size="lg"
                      className="mt-4"
                    />
                  </div>
                )}
              </motion.div>
            )}

            {activeView === 'shop' && (
              <motion.div
                key="shop"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* Shop Header */}
                <div 
                  className="h-32 relative"
                  style={{
                    background: linkOrganizer.backgroundStyle?.type === 'gradient' 
                      ? `linear-gradient(135deg, ${linkOrganizer.backgroundStyle.primaryColor}, ${linkOrganizer.backgroundStyle.secondaryColor})`
                      : linkOrganizer.backgroundStyle?.primaryColor || '#1F2937'
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                  <div className="relative p-6 h-full flex flex-col items-center justify-center text-white">
                    <h1 className="text-xl font-bold mb-1">Shop</h1>
                    <p className="text-sm opacity-90">{linkOrganizer.profileName}</p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="p-4">
                  {visibleProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <p className="text-gray-600">No products available yet</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {visibleProducts.map((product, index) => (
                        <motion.button
                          key={product.id}
                          onClick={() => handleProductClick(product)}
                          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all transform hover:scale-105 active:scale-95"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {product.image ? (
                            <div className="aspect-square relative">
                              <img 
                                src={product.image} 
                                alt={product.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          
                          <div className="p-3">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            {product.price && (
                              <div className="text-sm font-bold text-green-600 mb-2">
                                {product.price}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-blue-600 font-medium">View Product</span>
                              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe hint */}
        {activeView === 'links' && visibleProducts.length > 0 && (
          <div className="absolute bottom-4 right-4 bg-blue-600 text-white px-3 py-2 rounded-full text-xs font-medium shadow-lg">
            ← Swipe for Shop
          </div>
        )}
        {activeView === 'shop' && visibleLinks.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-2 rounded-full text-xs font-medium shadow-lg">
            Swipe for Links →
          </div>
        )}
      </div>
    </div>
  );
};

export default UsernameView;
