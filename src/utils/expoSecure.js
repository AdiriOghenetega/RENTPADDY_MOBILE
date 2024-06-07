import * as SecureStore from 'expo-secure-store';

export const secureSetItemAsync = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data securely:', error);
  }
};

export const secureGetItemAsync = async (key) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error retrieving data securely:', error);
    return null;
  }
};

export const removeItemFromSecureStore = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item from secure store:', error);
    }
  };