
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  company: string;
  phone: string;
  email?: string;
}

interface PurchasedProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  purchaseDate: string;
  downloadUrl?: string;
  coverImage?: string;
}

interface AuthContextType {
  user: User | null;
  purchasedProducts: PurchasedProduct[];
  login: (phone: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addPurchasedProduct: (product: PurchasedProduct) => void;
  isLoading: boolean;
}

interface RegisterData {
  name: string;
  company: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [purchasedProducts, setPurchasedProducts] = useState<PurchasedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('checkout-user');
    const storedProducts = localStorage.getItem('checkout-purchased-products');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedProducts) {
      setPurchasedProducts(JSON.parse(storedProducts));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      name: 'João Silva',
      company: 'Silva Digital',
      phone: phone
    };
    
    setUser(mockUser);
    localStorage.setItem('checkout-user', JSON.stringify(mockUser));
    
    // Load user's purchased products
    const userProducts = localStorage.getItem(`checkout-products-${phone}`);
    if (userProducts) {
      const products = JSON.parse(userProducts);
      setPurchasedProducts(products);
      localStorage.setItem('checkout-purchased-products', JSON.stringify(products));
    }
    
    setIsLoading(false);
    return true;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful registration
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      company: userData.company,
      phone: userData.phone
    };
    
    setUser(newUser);
    localStorage.setItem('checkout-user', JSON.stringify(newUser));
    
    // Initialize empty purchased products for new user
    setPurchasedProducts([]);
    localStorage.setItem('checkout-purchased-products', JSON.stringify([]));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    setPurchasedProducts([]);
    localStorage.removeItem('checkout-user');
    localStorage.removeItem('checkout-purchased-products');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('checkout-user', JSON.stringify(updatedUser));
    }
  };

  const addPurchasedProduct = (product: PurchasedProduct) => {
    const updatedProducts = [...purchasedProducts, product];
    setPurchasedProducts(updatedProducts);
    localStorage.setItem('checkout-purchased-products', JSON.stringify(updatedProducts));
    
    // Also store by phone number for future logins
    if (user) {
      localStorage.setItem(`checkout-products-${user.phone}`, JSON.stringify(updatedProducts));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      purchasedProducts,
      login,
      register,
      logout,
      updateUser,
      addPurchasedProduct,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
