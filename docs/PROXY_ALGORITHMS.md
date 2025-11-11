# Proxy Middleware Algorithms

## Overview

The proxy middleware (`src/proxy.ts`) is the core routing and authentication layer for the Next.js application. It handles authentication, internationalization (i18n), and role-based access control (RBAC) in a single unified middleware.

## Architecture

The middleware operates as a **request interceptor** that processes all incoming requests before they reach the application routes. It performs three main functions:

1. **Authentication Verification** - Validates user sessions
2. **Internationalization Routing** - Handles locale-aware routing
3. **Role-Based Access Control** - Enforces role-based route protection

## Algorithm Flow

### High-Level Flow

```
Request → Auth Route Check → Session Validation → Role Extraction → 
Locale Extraction → Role-Based Protection → i18n Routing → Response
```

### Detailed Algorithm

#### 1. Request Initialization

```typescript
Input: NextRequest
Output: NextResponse

1. Extract pathname from request URL
2. Initialize headers object for auth API
```

#### 2. Auth Route Detection

**Algorithm:** `isAuthRoute(pathname: string)`

```typescript
IF pathname === "/login" OR
   pathname === "/register" OR
   pathname.endsWith("/login") OR
   pathname.endsWith("/register")
THEN
    Skip authentication
    Apply i18n middleware only
    RETURN response
END IF
```

**Purpose:** Auth routes (login/register) are publicly accessible and don't require authentication.

#### 3. Session Validation

**Algorithm:** `getSession(headers)`

```typescript
1. Convert NextRequest headers to Headers object
2. Forward cookies to backend auth API
3. Call auth.api.getSession({ headers })
4. IF session is null THEN
       Extract locale from cookie
       Construct locale-aware login path
       RETURN redirect to login
   END IF
5. Extract user role from session
6. Default role to "STUDENT" if not present
```

**Purpose:** Ensures only authenticated users can access protected routes.

#### 4. Locale Extraction

**Algorithm:** `extractPathnameWithoutLocale(pathname)`

```typescript
Input: pathname (e.g., "/en/catalog", "/uk/tutor", "/catalog")
Output: pathnameWithoutLocale (e.g., "/catalog", "/tutor", "/catalog")

1. Initialize pathnameWithoutLocale = pathname
2. FOR each locale in routing.locales DO
       IF pathname.startsWith(`/${locale}/`) THEN
           pathnameWithoutLocale = pathname.slice(`/${locale}`.length)
           BREAK
       ELSE IF pathname === `/${locale}` THEN
           pathnameWithoutLocale = "/"
           BREAK
       END IF
   END FOR
3. RETURN pathnameWithoutLocale
```

**Purpose:** Normalizes paths by removing locale prefixes for role-based checks.

#### 5. Role-Based Route Protection

**Algorithm:** `protectRoutesByRole(role, pathnameWithoutLocale)`

##### 5.1 Tutor Route Protection

```typescript
IF pathnameWithoutLocale.startsWith("/tutor") THEN
    IF role !== "TUTOR" THEN
        Extract locale from request
        Construct student home path (locale-aware)
        RETURN redirect to student home
    END IF
END IF
```

**Purpose:** Prevents non-tutors from accessing tutor-only routes.

##### 5.2 Student Route Protection

```typescript
IF role === "TUTOR" THEN
    IF pathnameWithoutLocale === "/" THEN
        // Root "/" is student home
        Extract locale from request
        Construct tutor home path (locale-aware)
        RETURN redirect to tutor home
    END IF
    
    IF isStudentOnlyRoute(pathnameWithoutLocale) THEN
        // Check student-only routes: /catalog, /orders, /saved, /chats, /profile
        Extract locale from request
        Construct tutor home path (locale-aware)
        RETURN redirect to tutor home
    END IF
END IF
```

**Purpose:** Prevents tutors from accessing student-only routes.

**Student-Only Routes:**
- `/` (root/home)
- `/catalog`
- `/orders`
- `/saved`
- `/chats`
- `/profile`

**Tutor-Only Routes:**
- `/tutor` (tutor home)
- `/tutor/orders`
- `/tutor/saved`
- `/tutor/chats`
- `/tutor/profile`
- `/tutor/profile/subjects`

#### 6. Internationalization Routing

**Algorithm:** `applyIntlMiddleware(request)`

```typescript
1. Apply next-intl middleware to request
2. This handles:
   - Locale detection
   - Locale prefixing/removal
   - Locale-aware redirects
3. RETURN response with i18n routing applied
```

**Purpose:** Ensures all routes are properly localized.

#### 7. User ID Cookie Management

**Algorithm:** `setUserIdCookie(response, userId)`

```typescript
1. Extract userId from session
2. Check if USER_ID_COOKIE exists and matches current userId
3. IF cookie doesn't exist OR doesn't match THEN
       Set USER_ID_COOKIE with:
           - value: userId
           - httpOnly: true
           - secure: production only
           - sameSite: "lax"
           - maxAge: 30 days
   END IF
```

**Purpose:** Maintains user ID cookie for GrowthBook experiment hashing and analytics.

## Complete Flow Diagram

```
┌─────────────────┐
│  Incoming Request │
└────────┬────────┘
         │
         ▼
┌─────────────────────┐
│ Extract pathname    │
└────────┬────────────┘
         │
         ▼
┌─────────────────────┐      YES
│ Is Auth Route?      │───────────┐
└────────┬────────────┘           │
    NO   │                         │
         ▼                         ▼
┌─────────────────────┐    ┌──────────────┐
│ Get Session         │    │ Apply i18n   │
└────────┬────────────┘    │ Middleware   │
         │                  └──────┬───────┘
         │                         │
    NULL │                         │
         ▼                         │
┌─────────────────────┐           │
│ Redirect to Login   │           │
└─────────────────────┘           │
                                  │
         │                        │
    Valid│                        │
         ▼                        │
┌─────────────────────┐           │
│ Extract Role        │           │
└────────┬────────────┘           │
         │                         │
         ▼                         │
┌─────────────────────┐           │
│ Extract Locale      │           │
│ from Pathname       │           │
└────────┬────────────┘           │
         │                         │
         ▼                         │
┌─────────────────────┐           │
│ Role-Based          │           │
│ Protection          │           │
└────────┬────────────┘           │
         │                         │
    Block│                         │
         ▼                         │
┌─────────────────────┐           │
│ Redirect to          │           │
│ Appropriate Home    │           │
└─────────────────────┘           │
                                  │
         │                        │
    Allow│                        │
         ▼                        │
         └────────────────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │ Set User ID Cookie    │
         └──────────┬────────────┘
                    │
                    ▼
         ┌──────────────────────┐
         │   Return Response     │
         └──────────────────────┘
```

## Key Algorithms

### 1. Locale Extraction Algorithm

**Problem:** Extract the base pathname without locale prefix for role-based checks.

**Solution:**
```typescript
function extractPathnameWithoutLocale(pathname: string): string {
    let pathnameWithoutLocale = pathname;
    
    for (const locale of routing.locales) {
        if (pathname.startsWith(`/${locale}/`)) {
            pathnameWithoutLocale = pathname.slice(`/${locale}`.length);
            break;
        } else if (pathname === `/${locale}`) {
            pathnameWithoutLocale = "/";
            break;
        }
    }
    
    return pathnameWithoutLocale;
}
```

**Examples:**
- `/en/catalog` → `/catalog`
- `/uk/tutor` → `/tutor`
- `/en` → `/`
- `/catalog` → `/catalog` (no locale prefix)

### 2. Role-Based Access Control Algorithm

**Problem:** Prevent unauthorized role access to protected routes.

**Solution:**
```typescript
function protectRoutesByRole(role: UserRole, pathname: string): NextResponse | null {
    // Tutor route protection
    if (pathname.startsWith("/tutor")) {
        if (role !== "TUTOR") {
            return redirectToStudentHome();
        }
    }
    
    // Student route protection
    if (role === "TUTOR") {
        // Protect root "/" (student home)
        if (pathname === "/") {
            return redirectToTutorHome();
        }
        
        // Protect other student-only routes
        if (isStudentOnlyRoute(pathname)) {
            return redirectToTutorHome();
        }
    }
    
    return null; // Allow access
}
```

### 3. Locale-Aware Redirect Algorithm

**Problem:** Generate redirects that preserve or respect locale preferences.

**Solution:**
```typescript
function getLocaleAwarePath(basePath: string, locale: string): string {
    if (locale === routing.defaultLocale) {
        return basePath;
    }
    return `/${locale}${basePath}`;
}
```

**Examples:**
- Default locale: `/tutor` → `/tutor`
- Non-default locale: `/tutor` → `/uk/tutor`
- Default locale: `/` → `/`
- Non-default locale: `/` → `/en/`

## Edge Cases

### 1. Missing Role in Session

**Scenario:** Session exists but role is not present.

**Handling:**
```typescript
const role = userRole || "STUDENT"; // Default to STUDENT
```

**Rationale:** Default to least privileged role for security.

### 2. Locale-Only Pathname

**Scenario:** User accesses `/{locale}` (e.g., `/en` or `/uk`).

**Handling:**
```typescript
if (pathname === `/${locale}`) {
    pathnameWithoutLocale = "/";
}
```

**Rationale:** Treats locale-only paths as root/home.

### 3. Unauthenticated Access to Protected Routes

**Scenario:** User tries to access protected route without session.

**Handling:**
```typescript
if (!session) {
    const locale = getLocaleFromRequest(request);
    const loginPath = locale === routing.defaultLocale 
        ? "/login" 
        : `/${locale}/login`;
    return NextResponse.redirect(new URL(loginPath, request.url));
}
```

**Rationale:** Redirects to locale-aware login page.

### 4. Role Mismatch

**Scenario:** User with role X tries to access role Y's routes.

**Handling:**
- Tutor accessing student routes → Redirect to `/tutor`
- Student accessing tutor routes → Redirect to `/`

**Rationale:** Always redirect to user's appropriate home page.

## Performance Considerations

### 1. Early Returns

The middleware uses early returns to avoid unnecessary processing:
- Auth routes skip authentication
- Missing sessions redirect immediately
- Role mismatches redirect immediately

### 2. Cookie Management

User ID cookie is only updated when necessary:
```typescript
if (existingUserId !== userId) {
    // Update cookie
}
```

### 3. Locale Detection

Locale is extracted from cookies (fast) rather than parsing pathname multiple times.

## Security Considerations

### 1. Role Defaulting

**Security:** Defaults to least privileged role (STUDENT) if role is missing.

**Rationale:** Fail-safe approach - better to deny access than grant unauthorized access.

### 2. Session Validation

**Security:** All protected routes require valid session.

**Rationale:** Prevents unauthorized access to protected resources.

### 3. Role-Based Redirects

**Security:** Redirects unauthorized users to their appropriate home, not to an error page.

**Rationale:** Better UX while maintaining security boundaries.

## Configuration

### Matcher Pattern

```typescript
matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"]
```

**Excludes:**
- `/api/*` - API routes
- `/_next/*` - Next.js internals
- `/_vercel/*` - Vercel routes
- `*.*` - Static files (anything with a dot)

**Includes:**
- All other routes (application routes)

## Testing Scenarios

### 1. Student Access Tests

| Route | Expected Behavior |
|-------|------------------|
| `/` | ✅ Allow |
| `/catalog` | ✅ Allow |
| `/tutor` | ❌ Redirect to `/` |
| `/tutor/orders` | ❌ Redirect to `/` |

### 2. Tutor Access Tests

| Route | Expected Behavior |
|-------|------------------|
| `/` | ❌ Redirect to `/tutor` |
| `/catalog` | ❌ Redirect to `/tutor` |
| `/tutor` | ✅ Allow |
| `/tutor/orders` | ✅ Allow |

### 3. Unauthenticated Access Tests

| Route | Expected Behavior |
|-------|------------------|
| `/` | ❌ Redirect to `/login` |
| `/tutor` | ❌ Redirect to `/login` |
| `/login` | ✅ Allow |
| `/register` | ✅ Allow |

### 4. Locale-Aware Tests

| Route | Expected Behavior |
|-------|------------------|
| `/en/catalog` | ✅ Allow (student) |
| `/uk/tutor` | ✅ Allow (tutor) |
| `/en/tutor` (as student) | ❌ Redirect to `/en` |
| `/uk/` (as tutor) | ❌ Redirect to `/uk/tutor` |

## Dependencies

- `next-intl` - Internationalization middleware
- `better-auth` - Authentication session management
- `@/pkg/libraries/role` - Role-based routing utilities

## Related Files

- `src/proxy.ts` - Main middleware implementation
- `src/pkg/libraries/role/routing.ts` - Role routing constants
- `src/pkg/libraries/better-auth/auth.ts` - Auth session utilities
- `src/pkg/libraries/locale/routing.ts` - Locale routing configuration

## Future Enhancements

1. **Admin Role Support** - Add admin role with access to all routes
2. **Route-Level Permissions** - More granular permission system
3. **Audit Logging** - Log unauthorized access attempts
4. **Rate Limiting** - Add rate limiting for authentication attempts
5. **Caching** - Cache session lookups for performance




