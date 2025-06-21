// __tests__/utils/localStorage.test.ts
/**
 * Utility functions for localStorage operations
 * You can create these helper functions in utils/localStorage.ts
 */

// Mock localStorage for testing
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('localStorage utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('stores and retrieves liked posts', () => {
    const likedPosts = [1, 2, 3];
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));

    const retrieved = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    expect(retrieved).toEqual(likedPosts);
  });

  it('handles empty liked posts', () => {
    const retrieved = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    expect(retrieved).toEqual([]);
  });

  it('updates liked posts correctly', () => {
    localStorage.setItem('likedPosts', JSON.stringify([1, 2]));

    // Add new like
    const currentLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const updatedLikes = [...currentLikes, 3];
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));

    const retrieved = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    expect(retrieved).toEqual([1, 2, 3]);
  });

  it('removes liked posts correctly', () => {
    localStorage.setItem('likedPosts', JSON.stringify([1, 2, 3]));

    // Remove like
    const currentLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const updatedLikes = currentLikes.filter((id: number) => id !== 2);
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes));

    const retrieved = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    expect(retrieved).toEqual([1, 3]);
  });
});
