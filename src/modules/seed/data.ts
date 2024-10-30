import { UserRole } from "src/common/enums";

export const superAdminSeedData = {
        full_name: 'Super Admin',
        email: 'superadmin@example.com',
        phone_number: '+123456',
        role: UserRole.SUPER_ADMIN,
        token: 'mock token',
}