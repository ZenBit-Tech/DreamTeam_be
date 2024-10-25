export enum UserRole {
  DISPATCHER = 'dispatcher',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  DRIVER = 'driver',
}

export enum OrderStatus {
  COMPLETED = 'Completed',
  FAILED = 'Failed',
  NOT_ARRIVED = 'Not arrived',
  AT_RISK = 'At Risk',
  UPCOMING = 'Upcoming',
}

export enum NotificationType {
  ROUTE = 'route',
  NOTE = 'note',
  START_ROUTE = 'start_route',
}

export enum LuggageSize {
  SMALL = 'small',
  MIDDLE = 'middle',
  BIG = 'big',
}
