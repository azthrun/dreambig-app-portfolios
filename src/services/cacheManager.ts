type CacheData = {
  data: any;
  timestamp: number;
};

class CacheManager {
  private static cache: Map<string, CacheData> = new Map();
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  static set(key: string, data: any): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  static get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  static clear(): void {
    this.cache.clear();
  }
}

export default CacheManager; 