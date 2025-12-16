// src/lib/types.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string; 
  featured?: boolean;
  popular?: boolean;
  rating?: number; 
  category?: string;
  description?: string;
}

export interface CategoryProduct {
  id: string;
  title: string;
  slug: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  stock?: number;
}

export interface ParentCategory extends CategoryProduct {
  hoverImage: string;
}

export interface InstagramPost {
  id: string;
  image: string;
}