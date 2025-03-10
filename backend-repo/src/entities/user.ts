export interface User {
    id?: string;
    name: string;
    email: string;
    totalAverageWeightRatings?: number;
    numberOfRents?: number;
    recentlyActive?: number;
    createdAt?: number;
    updatedAt?: number;
  }
  
  export default User;