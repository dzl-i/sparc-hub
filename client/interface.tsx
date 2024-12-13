export interface Society {
  fullTitle: string;
  abbreviatedTitle: string;
  description: string;
  logo: string;
  emailUrl: string;
  facebookUrl: string;
  websiteUrl: string;
  discordUrl: string;
  instagramUrl: string;
  tags: string[];
  numReviews: number;
  ratingAvg: number;
}

export interface Review {
  anonymous: boolean;
  username: string;
  title: string;
  starRating: number;
  date: Date;
  tags: string[];
  reviewContent: string;
}
