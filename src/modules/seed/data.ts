import Customer from 'src/common/entities/customer.entity';
import Route from 'src/common/entities/route.entity';
import { LuggageSize, OrderStatus, UserRole } from 'src/common/enums';

export const superAdminSeedData = {
  full_name: 'Super Admin',
  email: 'dreamteam@gmail.com',
  phone_number: '+123456',
  role: UserRole.SUPER_ADMIN,
  token: 'mock token',
};

export const seedCollectionDate = new Date();

export const getOrdersSeedData = (customer: Customer, route: Route) => [
  {
    collection_date: new Date('2024-01-01T10:00:00Z'),
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
    collection_date: new Date('2024-02-14T14:00:00Z'),
    collection_address: '456 Elm St, City',
    status: OrderStatus.COMPLETED,
    note: 'No issues reported',
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: new Date('2024-03-08T09:00:00Z'),
    collection_address: '320 Elm St, City',
    status: OrderStatus.AT_RISK,
    note: 'Delayed delivery',
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: new Date('2024-04-10T15:00:00Z'),
    collection_address: '500 Elm St, City',
    status: OrderStatus.COMPLETED,
    note: null,
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
  {
    collection_date: new Date('2024-05-20T08:30:00Z'),
    collection_address: '234 Elm St, City',
    status: OrderStatus.UPCOMING,
    note: 'Fragile items',
    customer,
    route,
    luggage: [{ luggage_size: LuggageSize.BIG, luggage_weight: 30 }],
  },
];
