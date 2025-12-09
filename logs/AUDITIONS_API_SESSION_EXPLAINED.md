# Why `/api/auth/session` is Being Called

## The Issue

You're seeing these logs:
```
GET /api/auth/session 200 in 546ms
GET /api/auth/session 200 in 621ms
```

This happens because `useSession()` from `next-auth/react` makes **client-side API calls** to fetch the session data.

## Two Approaches to Fix This

### Approach 1: Keep Client-Side Session (Current - Simple but has API calls)

**Pros:**
- ✅ Easy to implement
- ✅ Works everywhere
- ✅ Real-time session updates

**Cons:**
- ❌ Extra API calls on every page load
- ❌ Slight delay before session is available
- ❌ Redundant since layout already checked auth

**Current Usage:**
```typescript
import { useSession } from "next-auth/react";

function MyPage() {
  const { data: session } = useSession();
  // Makes API call to /api/auth/session
}
```

---

### Approach 2: Server-Side Session Provider (Recommended - No API calls)

**Pros:**
- ✅ No extra API calls
- ✅ Faster page loads
- ✅ Session available immediately
- ✅ Single source of truth (layout)

**Cons:**
- ❌ Slightly more setup
- ❌ Need custom hook for protected pages

**Implementation:**

#### 1. Create SessionProvider (`app/(protected)/SessionProvider.tsx`)
```typescript
"use client";

import { createContext, useContext } from "react";
import { Session } from "next-auth";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useProtectedSession() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("useProtectedSession must be used within SessionProvider");
  }
  return session;
}
```

#### 2. Update Protected Layout
```typescript
// app/(protected)/layout.tsx
import { SessionProvider } from "./SessionProvider";

export default async function ProtectedLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Pass session from server to client via context
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
```

#### 3. Update Pages to Use Custom Hook
```typescript
// Instead of this:
import { useSession } from "next-auth/react";
const { data: session } = useSession(); // Makes API call

// Use this:
import { useProtectedSession } from "../SessionProvider";
const session = useProtectedSession(); // No API call, instant
```

---

## Why This Happens

### Next-Auth Architecture:

```
Browser (Client)
    ↓
useSession() hook
    ↓
Fetches from /api/auth/session
    ↓
Returns session data
```

With your `(protected)` layout, the flow is:

```
Request to /Auditions
    ↓
Server: Check session in layout
    ↓
If authenticated: Render page
    ↓
Page loads with useSession()
    ↓
Client: Fetch session AGAIN from API ← REDUNDANT!
```

---

## Comparison

### Current (with useSession):
```
User visits /Auditions
    ↓
Layout checks auth (server) ← API call to session
    ↓
Page renders
    ↓
useSession() fetches (client) ← ANOTHER API call
    ↓
Total: 2 session checks
```

### With SessionProvider:
```
User visits /Auditions
    ↓
Layout checks auth (server) ← Single API call
    ↓
Passes session to context
    ↓
Page uses context (instant)
    ↓
Total: 1 session check
```

---

## Performance Impact

### With useSession():
- **Initial Load:** ~500-600ms for session fetch
- **Every Page Navigation:** New API call
- **Network Requests:** 2+ per page

### With SessionProvider:
- **Initial Load:** Instant (session already available)
- **Every Page Navigation:** No additional calls
- **Network Requests:** 1 per page

---

## Decision Guide

### Keep `useSession()` if:
- You have very few protected pages
- You need session updates in real-time across tabs
- Simplicity is more important than performance
- 500ms delay is acceptable

### Use `SessionProvider` if:
- You have many protected pages
- Performance is important
- You want cleaner, faster code
- You don't need cross-tab session updates

---

## Migration Example

### Before:
```typescript
// page.tsx
"use client";
import { useSession } from "next-auth/react";

function MyPage() {
  const { data: session } = useSession();
  // Wait for session to load...
  if (!session) return <Loading />;
  
  return <div>Welcome {session.user.name}</div>;
}
```

### After:
```typescript
// page.tsx
"use client";
import { useProtectedSession } from "../SessionProvider";

function MyPage() {
  const session = useProtectedSession();
  // Session is instantly available!
  
  return <div>Welcome {session.user.name}</div>;
}
```

---

## Recommendation

For your StageConnect app with multiple protected pages (Auditions, Profile, etc.), **I recommend Approach 2 (SessionProvider)** because:

1. ✅ Eliminates redundant API calls
2. ✅ Faster page loads
3. ✅ Better performance with multiple protected pages
4. ✅ Cleaner architecture (single source of truth)
5. ✅ Already have server-side auth in layout

---

## Implementation Status

Files created/updated:
- ✅ `app/(protected)/SessionProvider.tsx` - Custom context and hook
- ✅ `app/(protected)/layout.tsx` - Passes session to context
- ⏳ `app/(protected)/Auditions/page.tsx` - Needs to use new hook
- ⏳ `app/(protected)/Profile/page.tsx` - Can use new hook

---

## Testing

After implementation, you should see:
```
GET /Auditions 200 in 200ms  ← Much faster!
```

Instead of:
```
GET /api/auth/session 200 in 546ms  ← Gone!
GET /Auditions 200 in 853ms
GET /api/auth/session 200 in 621ms  ← Gone!
```

---

**Bottom Line:** The API calls are happening because `useSession()` is a client-side hook that fetches session data. Since you already have server-side auth in the layout, using a custom SessionProvider eliminates these redundant calls and improves performance.
