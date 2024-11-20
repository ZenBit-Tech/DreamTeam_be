import Customer from 'src/common/entities/customer.entity';
import Route from 'src/common/entities/route.entity';
import { LuggageSize, OrderStatus, UserRole } from 'src/common/enums';

interface OrderSeedDataType {
  collection_date: Date;
  collection_address: string;
  status: OrderStatus;
  note: string | null;
  customer: Customer;
  route: Route;
  luggage: Array<{
    luggage_size: LuggageSize;
    luggage_weight: number;
  }>;
}

export const superAdminSeedData = {
  full_name: 'Super Admin',
  email: 'dreamteam@gmail.com',
  phone_number: '+123456',
  role: UserRole.SUPER_ADMIN,
  token: 'mock token',
};

export const customerSeedData = {
  full_name: 'Customer',
  email: 'dreamteam@gmail.com',
  phone_number: '+123456',
};

export const routeSeedData = {
  distance: 21,
  start_address: 'Dortmund',
  end_address: 'Koln',
};

export const seedCollectionDate = new Date();

export const getOrdersSeedData = (
  customer: Customer,
  route: Route,
): Array<OrderSeedDataType> => [
  {
    collection_date: seedCollectionDate,
    collection_address: '123 Main St, City',
    status: OrderStatus.UPCOMING,
    note: 'Handle with care',
    customer,
    route,
    luggage: [
      { luggage_size: LuggageSize.SMALL, luggage_weight: 10 },
      { luggage_size: LuggageSize.MIDDLE, luggage_weight: 20 },
    ],
  },
  {
    collection_date: seedCollectionDate,
    collection_address: '456 Elm St, City',
    status: OrderStatus.COMPLETED,
    note: null,
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: seedCollectionDate,
    collection_address: '320 Elm St, City',
    status: OrderStatus.AT_RISK,
    note: null,
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: seedCollectionDate,
    collection_address: '500 Elm St, City',
    status: OrderStatus.COMPLETED,
    note: null,
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: seedCollectionDate,
    collection_address: '234 Elm St, City',
    status: OrderStatus.UPCOMING,
    note: null,
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
];
