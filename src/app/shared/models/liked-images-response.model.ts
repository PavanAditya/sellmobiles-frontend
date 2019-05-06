import { LikedImages } from './liked-images.model';
export interface LikedImagesResponse {
    message: string;
    data: LikedImages[];
    status: number;
  }
