export type UserType = {
  mail: string;
  username: string;
  displayName: string;  
  logo: string;
  url: string;
  verified: boolean;
  premium: boolean;
  association: string;
  company: string;
  membership: {
    type: string;
    start: Date;
    end: Date;
    price: number;
    autoRenew: boolean;
    lastRenew?: Date;
  };
};
