import { PersonalInfo } from '../types/PersonalInfo';
import { Project } from '../types/Project';
import { Experience } from '../types/Experience';
import { mockPersonalInfo, mockProjects, mockExperiences } from '../data/mockData';
import CacheManager from './cacheManager';

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class PortfolioService {
  private static async fetchWithCache<T>(
    key: string,
    fetchFn: () => Promise<T>
  ): Promise<T> {
    const cached = CacheManager.get(key);
    if (cached) {
      return cached as T;
    }

    const data = await fetchFn();
    CacheManager.set(key, data);
    return data;
  }

  static async getPersonalInfo(): Promise<PersonalInfo> {
    return this.fetchWithCache('personalInfo', async () => {
      await delay(500);
      return mockPersonalInfo;
    });
  }

  static async getProjects(): Promise<Project[]> {
    return this.fetchWithCache('projects', async () => {
      await delay(500);
      return mockProjects;
    });
  }

  static async getExperiences(): Promise<Experience[]> {
    return this.fetchWithCache('experiences', async () => {
      await delay(500);
      return mockExperiences;
    });
  }
} 