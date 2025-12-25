export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  isDefault?: boolean;
  createdAt: number; // timestamp
}

const ADDRESSES_STORAGE_KEY = 'bware_addresses';

/**
 * Get all saved addresses from localStorage
 */
export function getAddresses(): Address[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const addressesData = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (!addressesData) {
      return [];
    }
    return JSON.parse(addressesData) as Address[];
  } catch (error) {
    console.error('Error reading addresses from localStorage:', error);
    return [];
  }
}

/**
 * Save addresses to localStorage
 */
function saveAddresses(addresses: Address[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
    // Dispatch event to notify components
    window.dispatchEvent(new Event('addressesUpdated'));
  } catch (error) {
    console.error('Error saving addresses to localStorage:', error);
  }
}

/**
 * Add a new address or update existing one
 */
export function addAddress(address: Omit<Address, 'id' | 'createdAt'>): Address {
  const addresses = getAddresses();
  
  // Check if address already exists (by comparing all fields)
  const existingAddress = addresses.find(addr => 
    addr.name === address.name &&
    addr.street === address.street &&
    addr.city === address.city &&
    addr.postalCode === address.postalCode
  );

  if (existingAddress) {
    // Address already exists, return it
    return existingAddress;
  }

  // Create new address
  const newAddress: Address = {
    id: `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...address,
    createdAt: Date.now(),
  };

  // If this is set as default, remove default from others
  if (newAddress.isDefault) {
    addresses.forEach(addr => {
      addr.isDefault = false;
    });
  }

  addresses.push(newAddress);
  saveAddresses(addresses);

  return newAddress;
}

/**
 * Remove address by ID
 */
export function removeAddress(addressId: string): void {
  const addresses = getAddresses();
  const filtered = addresses.filter(addr => addr.id !== addressId);
  saveAddresses(filtered);
}

/**
 * Update address
 */
export function updateAddress(addressId: string, updates: Partial<Address>): void {
  const addresses = getAddresses();
  const index = addresses.findIndex(addr => addr.id === addressId);
  
  if (index >= 0) {
    // If setting as default, remove default from others
    if (updates.isDefault) {
      addresses.forEach(addr => {
        if (addr.id !== addressId) {
          addr.isDefault = false;
        }
      });
    }

    addresses[index] = { ...addresses[index], ...updates };
    saveAddresses(addresses);
  }
}

/**
 * Set default address
 */
export function setDefaultAddress(addressId: string): void {
  const addresses = getAddresses();
  addresses.forEach(addr => {
    addr.isDefault = addr.id === addressId;
  });
  saveAddresses(addresses);
}

/**
 * Get default address
 */
export function getDefaultAddress(): Address | null {
  const addresses = getAddresses();
  return addresses.find(addr => addr.isDefault) || addresses[0] || null;
}

/**
 * Convert shipping address from order format to address format
 */
export function convertShippingAddressToAddress(shippingAddress: {
  name: string;
  street: string;
  city: string;
  postalCode: string;
}): Omit<Address, 'id' | 'createdAt'> {
  return {
    name: shippingAddress.name,
    street: shippingAddress.street,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    isDefault: false,
  };
}



