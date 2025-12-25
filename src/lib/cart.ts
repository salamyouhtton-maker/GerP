export interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string; // timestamp
}

const CART_STORAGE_KEY = 'bware_cart';

/**
 * Get all items from cart
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      return [];
    }
    return JSON.parse(cartData) as CartItem[];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
}

/**
 * Add item to cart or update quantity if already exists
 */
export function addToCart(productId: string, quantity: number = 1): void {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.productId === productId);

  if (existingItemIndex >= 0) {
    // Item already in cart, update quantity
    cart[existingItemIndex].quantity += quantity;
  } else {
    // New item, add to cart
    cart.push({
      productId,
      quantity,
      addedAt: new Date().toISOString(),
    });
  }

  saveCart(cart);
}

/**
 * Remove item from cart
 */
export function removeFromCart(productId: string): void {
  const cart = getCart();
  const filteredCart = cart.filter(item => item.productId !== productId);
  saveCart(filteredCart);
}

/**
 * Update quantity of an item in cart
 */
export function updateCartItemQuantity(productId: string, quantity: number): void {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.productId === productId);

  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
}

/**
 * Get total number of items in cart
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Check if product is in cart
 */
export function isInCart(productId: string): boolean {
  const cart = getCart();
  return cart.some(item => item.productId === productId);
}

/**
 * Get quantity of specific product in cart
 */
export function getCartItemQuantity(productId: string): number {
  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  return item ? item.quantity : 0;
}



