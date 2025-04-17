export interface User {
    id: number;
    email: string;
    name?: string;
    image?: string;
}
  
export interface Product {
    id: number;
    name: string;
    price: number;
    userId: number;
    createdAt: Date;
}