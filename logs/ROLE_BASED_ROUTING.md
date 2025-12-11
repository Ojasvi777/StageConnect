# Role-Based Routing Implementation

## Overview
Implemented a client-side role-based routing system that automatically directs users to the appropriate home page based on their role (Talent vs Employer) without using middleware.

## How It Works

### Architecture
```
User visits /Home
    ↓
Check session & fetch user role from API
    ↓
If role === "employer" → Redirect to /(Employer)/Home
If role === "talent" → Stay on /Home (talent dashboard)
```

### Key Components

#### 1. **RoleProvider** (`/app/Components/RoleProvider.tsx`)
A React context provider that:
- Fetches and caches the user's role
- Provides `useRole()` hook for components
- Exports: `role`, `isEmployer`, `isTalent`, `loading`

```tsx
import { useRole } from "../Components/RoleProvider";

function MyComponent() {
  const { role, isEmployer, isTalent, loading } = useRole();
  // Use role-based logic
}
```

#### 2. **User Role API** (`/app/api/user/role/route.ts`)
- **Endpoint:** `GET /api/user/role?userId={userId}`
- **Returns:** `{ role: "employer" | "talent" }`
- Fetches role from Prisma database

#### 3. **Home Page Router** (`/app/Home/page.tsx`)
The main `/Home` route that:
- Checks user's session and role
- Redirects employers to `/(Employer)/Home`
- Shows talent dashboard for talent users
- Displays loading state during checks

#### 4. **Employer Dashboard** (`/app/(Employer)/Home/page.tsx`)
Dedicated employer home page with:
- Analytics and metrics
- Posted jobs overview
- Applications tracking
- Charts and visualizations

## User Flows

### Talent User Flow
1. Logs in → session created
2. Visits `/Home`
3. System fetches role → "talent"
4. Stays on `/Home` → sees talent dashboard
5. Views posts, applications, blog feed

### Employer User Flow
1. Registers company OR logs in
2. Redirected to `/Home`
3. System fetches role → "employer"
4. Auto-redirected to `/(Employer)/Home`
5. Views analytics, posted jobs, applications

## Files Modified/Created

### Created Files
- `/app/api/user/role/route.ts` - API endpoint for role fetching
- `/app/Components/RoleProvider.tsx` - Role context provider
- `/app/Components/HomePageRouter.tsx` - Optional routing component
- `/app/(Employer)/Home/page.tsx` - Employer dashboard
- `/app/Actions/analytics.ts` - Analytics server actions
- `/app/Actions/userRole.ts` - Server-side role utilities

### Modified Files
- `/app/Home/page.tsx` - Added role checking and redirect logic
- `/app/CreatePage/page.tsx` - Redirects to /Home after registration

### Deleted Files
- `middleware.ts` - Removed (using client-side routing instead)

## Benefits of This Approach

### ✅ Pros
1. **No Middleware Complexity** - Simpler architecture
2. **Client-Side Control** - Better UX with loading states
3. **Easy Debugging** - All logic in React components
4. **Flexible** - Easy to add more roles or conditions
5. **SEO Friendly** - Both routes are accessible

### ⚠️ Considerations
1. **Client-Side Only** - Not protecting routes at server level
2. **Role Check on Every Load** - Makes API call to fetch role
3. **Could Cache** - Consider caching role in localStorage/cookies

## Future Enhancements

### Potential Improvements
1. **Role Caching** - Store role in localStorage to reduce API calls
2. **Protected Routes** - Add route guards for sensitive pages
3. **Role Permissions** - Fine-grained permissions system
4. **Multi-Role Support** - Users with multiple roles
5. **Admin Role** - Add admin dashboard

### Example: Adding Role Caching
```tsx
// In RoleProvider
useEffect(() => {
  // Check cache first
  const cachedRole = localStorage.getItem('userRole');
  if (cachedRole) {
    setRole(cachedRole);
  }
  
  // Then fetch from API
  fetchRole().then(role => {
    localStorage.setItem('userRole', role);
    setRole(role);
  });
}, []);
```

## Usage Examples

### Using RoleProvider in Layout
```tsx
// app/layout.tsx
import { RoleProvider } from "./Components/RoleProvider";

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <RoleProvider>
        {children}
      </RoleProvider>
    </SessionProvider>
  );
}
```

### Conditional Rendering Based on Role
```tsx
import { useRole } from "../Components/RoleProvider";

function Navbar() {
  const { isEmployer, isTalent } = useRole();
  
  return (
    <nav>
      {isEmployer && <Link href="/post-job">Post Job</Link>}
      {isTalent && <Link href="/find-jobs">Find Jobs</Link>}
    </nav>
  );
}
```

### Server-Side Role Check
```tsx
import { getCurrentUserRole, isEmployer } from "../Actions/userRole";

async function MyServerComponent() {
  const role = await getCurrentUserRole();
  const employerAccess = await isEmployer();
  
  if (!employerAccess) {
    return <AccessDenied />;
  }
  
  return <EmployerContent />;
}
```

## Testing

### Manual Test Checklist
- [ ] Talent user visits /Home → sees talent dashboard
- [ ] Employer user visits /Home → redirects to /(Employer)/Home
- [ ] Loading state shows during role check
- [ ] No infinite redirect loops
- [ ] Role persists across page refreshes
- [ ] Logout clears role properly

### Test Scenarios
1. **New talent registration** → Should see talent home
2. **New company registration** → Should see employer dashboard
3. **Direct URL access** → /(Employer)/Home redirects non-employers
4. **Session expiry** → Redirects to login properly

## Troubleshooting

### Common Issues

**Issue: Infinite redirect loop**
- Check that redirect logic only runs once
- Ensure `userRole` state updates properly
- Add conditional rendering to prevent loops

**Issue: Role not loading**
- Verify API endpoint returns role correctly
- Check session includes user ID
- Confirm profile exists in database

**Issue: Wrong dashboard shown**
- Clear localStorage/cookies
- Check role value in database
- Verify redirect URL is correct

## API Reference

### GET /api/user/role
**Query Parameters:**
- `userId` (required) - The user's ID from session

**Response:**
```json
{
  "role": "employer" | "talent"
}
```

**Error Responses:**
- `400` - User ID not provided
- `404` - Profile not found
- `500` - Server error

## Security Notes

⚠️ **Important:** This implementation uses client-side routing only. For production:

1. **Add Server-Side Protection** - Protect sensitive routes
2. **Validate Requests** - Always verify role on server actions
3. **Rate Limiting** - Limit role API calls
4. **Session Security** - Use secure session configuration
5. **CSRF Protection** - Enable CSRF tokens

## Summary

This implementation provides a clean, maintainable solution for role-based routing without the complexity of middleware. It leverages Next.js App Router capabilities while keeping the codebase simple and debuggable.

The system automatically routes users to their appropriate dashboard based on their role, providing a personalized experience for both talent and employer users.
