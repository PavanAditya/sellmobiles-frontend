export interface MobileUploaded {
    _id: string;
    brand: string;
    model: string;
    location: string;
    price: number;
    ram: number;
    rom: number;
    likedBy: string[];
    image: string[];
    primaryCamera: number;
    secondaryCamera: number;
    battery: number;
    userName: string;
    buyerUserName: string;
    __v: number;
    date?: string;
  }
