export interface Society {
  id: string;
  name: string;
  abbreviated_name: string;
  description: string;
  icon: string;
  email: string;
  facebook: string;
  website: string;
  discord: string;
  instagramUrl?: string;
  total_reviews: number;
  average_rating: number;
}

export interface Review {
  id: string;
  anonymous: boolean;
  user_id: string;
  title: string;
  rating: number;
  created_at: Date;
  tags: string[];
  content: string;
}

export interface User {
  zid: string;
  description?: string;
  degree?: string;
  year?: number;
}

export interface DropdownItem {
  id: string;
  name: string;
}
