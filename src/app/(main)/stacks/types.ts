export type SalonStackParamList = {
  Home: undefined;
  SalonDetail: { 
    salon: { 
      id: string; 
      name: string; 
      image: string; 
      location: string; 
      rating: number; 
    } 
  };
  Appointment: { 
    salon: { 
      _id: any; 
      id: string; 
      name: string; 
      image: string; 
      location: string; 
      rating: number; 
    };
    customerId: string; // ✅ Added customerId here
  };
};
