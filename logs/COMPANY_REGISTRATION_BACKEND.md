# Company Registration Backend - Implementation Guide

## Overview
This document describes the modular server actions implementation for company registration in StageConnect.

## Database Schema Changes

### Profile Model Updates
Added the following fields to the `Profile` model in `prisma/schema.prisma`:

```prisma
// Company information
company_size         String? @db.VarChar(50)
contact_person_role  String? @db.VarChar(200)

// Company address fields
company_address      String? @db.VarChar(255)
company_city         String? @db.VarChar(100)
company_state        String? @db.VarChar(100)
company_country      String? @db.VarChar(100)
company_zip_code     String? @db.VarChar(20)

// Legal information
registration_number  String? @db.VarChar(100)
tax_id               String? @db.VarChar(100)

// Verification status
is_verified          Boolean @default(false)
```

### User Model Updates
Added password field for credential-based authentication:

```prisma
password       String? // For credential-based authentication
```

## Migrations Applied

1. **20251211064429_add_company_fields** - Added company-specific fields to Profile model
2. **20251211064615_add_password_field** - Added password field to User model

## Server Actions (`app/Actions/company.ts`)

### Module Structure
The company registration backend is organized into modular, reusable functions:

#### 1. **Validation Functions**
- `validateCompanyData()` - Validates all required fields and formats
  - Checks required fields
  - Validates email format
  - Ensures password strength (minimum 8 characters)
  - Confirms password match

#### 2. **Database Query Functions**
- `checkEmailExists()` - Prevents duplicate email registrations
- `createUserAccount()` - Creates user with hashed password
- `createCompanyProfile()` - Creates employer profile with company details

#### 3. **Main Registration Function**
- `registerCompany()` - Orchestrates the registration process
  - Step 1: Validate input data
  - Step 2: Check email availability
  - Step 3: Create user account
  - Step 4: Create company profile
  - Step 5: Revalidate paths

#### 4. **Utility Functions**
- `getCompanyProfile()` - Fetch company profile by user ID
- `updateCompanyProfile()` - Update company information
- `verifyCompany()` - Admin function to verify companies

## Security Features

### Password Hashing
- Uses `bcryptjs` with salt rounds of 12
- Passwords are never stored in plain text
- Hashed before database insertion

### Input Validation
- Server-side validation for all fields
- Email format validation with regex
- Password strength requirements
- SQL injection protection via Prisma

### Email Uniqueness
- Checks for existing email before registration
- Prevents duplicate accounts
- Case-insensitive email storage

## Frontend Integration (`app/CreatePage/page.tsx`)

### State Management
```typescript
- formData: Stores all form inputs
- isLoading: Loading state during submission
- error: Error messages from server
- success: Success messages from server
```

### Form Features
- Real-time error clearing on input change
- Loading states with disabled buttons
- Success/error message display
- Auto-redirect to login after successful registration

### UX Enhancements
- Required field indicators
- Form validation feedback
- Loading spinner on submit button
- Disabled state during processing

## API Response Format

All server actions return a consistent response format:

```typescript
interface ActionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

### Success Response
```typescript
{
  success: true,
  data: {
    userId: "uuid",
    profileId: "uuid"
  },
  message: "Company registered successfully!"
}
```

### Error Response
```typescript
{
  success: false,
  error: "An account with this email already exists"
}
```

## Form Data Structure

```typescript
interface CompanyRegistrationInput {
  // Company Information
  companyName: string;
  industry: string;
  companySize: string;
  description: string;
  website?: string;
  
  // Contact Information
  email: string;
  phone: string;
  contactPersonName: string;
  contactPersonRole: string;
  
  // Address
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  
  // Legal
  registrationNumber?: string;
  taxId?: string;
  
  // Security
  password: string;
  confirmPassword: string;
}
```

## Industry Options
- Film & Television
- Theater
- Fashion & Modeling
- Music & Entertainment
- Advertising
- Event Management
- Other

## Company Size Options
- 1-10 employees
- 11-50 employees
- 51-200 employees
- 201-500 employees
- 500+ employees

## Error Handling

### Client-Side Errors
- Form validation errors
- Password mismatch
- Network errors

### Server-Side Errors
- Email already exists
- Database connection issues
- Invalid data format
- Missing required fields

## Testing the Implementation

### Manual Testing Steps
1. Navigate to `/CreatePage`
2. Fill in all required fields
3. Submit the form
4. Verify success message
5. Check redirect to login page
6. Verify data in database

### Database Verification
```sql
-- Check user creation
SELECT * FROM users WHERE email = 'company@example.com';

-- Check profile creation
SELECT * FROM profiles WHERE role = 'employer';
```

## Future Enhancements

### Planned Features
1. Email verification workflow
2. Document upload for legal information
3. Company logo upload
4. Admin approval workflow
5. Two-factor authentication
6. Company profile completion wizard

### Integration Points
- NextAuth credentials provider
- Email service for verification
- File storage (S3) for documents
- Admin dashboard for company approval

## Dependencies

```json
{
  "bcryptjs": "^2.4.3",
  "@types/bcryptjs": "^2.4.6",
  "@prisma/client": "^6.19.1",
  "next": "latest",
  "react": "latest"
}
```

## Environment Variables

Ensure these are set in `.env`:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Common Issues & Solutions

### Issue: Prisma types not updating
**Solution**: Run `npx prisma generate` to regenerate the Prisma client

### Issue: Migration fails
**Solution**: Check database connection and ensure schema is valid

### Issue: Password hashing fails
**Solution**: Ensure `bcryptjs` is installed correctly

### Issue: Email already exists error on valid input
**Solution**: Check for case sensitivity in email comparisons

## Best Practices

1. **Always validate on the server** - Never trust client-side validation alone
2. **Use transactions** - For operations that modify multiple tables
3. **Hash passwords** - Never store plain text passwords
4. **Sanitize inputs** - Prevent XSS and SQL injection
5. **Error messages** - Be specific but don't reveal sensitive information
6. **Logging** - Log errors for debugging, not sensitive data

## Code Organization

```
app/
├── Actions/
│   └── company.ts          # Server actions for company operations
├── CreatePage/
│   └── page.tsx            # Company registration UI
└── api/
    └── auth/               # NextAuth configuration

prisma/
├── schema.prisma           # Database schema
└── migrations/             # Migration files
```

## Maintenance Notes

- Review and update validation rules regularly
- Monitor registration success rates
- Check for abandoned registrations
- Update industry/size options as needed
- Regular security audits of authentication flow

## Support & Documentation

For issues or questions:
1. Check Prisma documentation: https://www.prisma.io/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Review NextAuth documentation: https://next-auth.js.org

---

**Last Updated**: December 11, 2025
**Version**: 1.0.0
**Author**: StageConnect Development Team
