export type Policyholder = {
  name: string;
  age: number;
  address: {
    line1: string;
    line2: string | undefined;
    city: string;
    state: string;
    postalCode: string;
  };
  phoneNumber: string;
  isPrimary?: boolean;
};

export type Address = {
  line1: string;
  line2: string | undefined;
  city: string;
  state: string;
  postalCode: string;
};

export type Rows = {
  key: string;
  value: string | number;
}[];
