# Blog Functionality Documentation

## Overview
The blog feature allows authenticated users to create, view, like, comment on, and share blog posts within the StageConnect platform. The feature is fully integrated with the existing authentication system and database.

## Database Schema

### Blog Model
- `blog_id` (UUID): Primary key
- `author_id` (UUID): Foreign key to User
- `title` (String): Blog title (max 255 chars)
- `content` (String): Blog content
- `category` (BlogCategory): Category enum
- `image_url` (String, optional): URL for featured image
- `published` (Boolean): Publication status
- `created_at` (DateTime): Creation timestamp
- `updated_at` (DateTime): Last update timestamp

### BlogLike Model
- `like_id` (UUID): Primary key
- `blog_id` (UUID): Foreign key to Blog
- `user_id` (UUID): Foreign key to User
- `created_at` (DateTime): Like timestamp
- **Unique constraint**: `(blog_id, user_id)` - prevents duplicate likes

### BlogComment Model
- `comment_id` (UUID): Primary key
- `blog_id` (UUID): Foreign key to Blog
- `user_id` (UUID): Foreign key to User
- `content` (Text): Comment content
- `created_at` (DateTime): Creation timestamp
- `updated_at` (DateTime): Last update timestamp

### Blog Categories
- `acting`
- `dancing`
- `singing`
- `modeling`
- `voiceover`
- `photography`
- `tips`
- `experience`
- `industry_news`
- `other`

## Server Actions

All server actions are located in `/app/Actions/blogs.ts`:

### 1. `getBlogs(params?)`
Fetches all published blogs with filters and sorting.

**Parameters:**
- `category` (optional): Filter by blog category
- `search` (optional): Search in title and content
- `sortBy` (optional): "newest" (default) or "trending"
- `limit` (optional): Maximum number of results

**Returns:**
```typescript
{
  success: boolean;
  blogs: Array<{
    id: string;
    title: string;
    content: string;
    category: string;
    image: string | null;
    author: {
      id: string;
      name: string;
      image: string | null;
      role: string;
    };
    likes: number;
    comments: number;
    liked: boolean; // if user is authenticated
    createdAt: Date;
  }>;
}
```

### 2. `createBlog(data)`
Creates a new blog post (requires authentication).

**Parameters:**
```typescript
{
  title: string;
  content: string;
  category: BlogCategory;
  image_url?: string;
}
```

**Returns:**
```typescript
{
  success: boolean;
  blog?: BlogPost;
  error?: string;
}
```

### 3. `toggleBlogLike(blogId)`
Toggles a like on a blog post (requires authentication).

**Parameters:**
- `blogId` (string): The blog's UUID

**Returns:**
```typescript
{
  success: boolean;
  liked: boolean;
  likeCount: number;
  error?: string;
}
```

### 4. `addBlogComment(blogId, content)`
Adds a comment to a blog post (requires authentication).

**Parameters:**
- `blogId` (string): The blog's UUID
- `content` (string): Comment text

**Returns:**
```typescript
{
  success: boolean;
  comment?: {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      image: string | null;
    };
    createdAt: Date;
  };
  error?: string;
}
```

### 5. `getBlogComments(blogId)`
Fetches all comments for a blog post.

**Parameters:**
- `blogId` (string): The blog's UUID

**Returns:**
```typescript
{
  success: boolean;
  comments: Array<Comment>;
  error?: string;
}
```

### 6. `checkAuth()`
Checks if the current user is authenticated.

**Returns:**
```typescript
{
  success: boolean;
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  } | null;
}
```

## Components

### BlogPage (`/app/Blog/page.tsx`)
Server component that wraps the blog functionality with Navbar and Footer.

### BlogClient (`/app/Blog/BlogClient.tsx`)
Client component that handles all blog interactions:

#### Features:
1. **Authentication-gated actions**: 
   - Shows login popup for unauthenticated users
   - Redirects to `/login` when needed

2. **Blog creation**:
   - Modal form for creating new blogs
   - Category selection
   - Title and content validation

3. **Search and filters**:
   - Real-time text search
   - Category filtering with tags
   - Sort by newest or trending

4. **Like functionality**:
   - Optimistic UI updates
   - Real-time like count
   - Visual feedback (red heart when liked)

5. **Comment functionality**:
   - Comment modal with existing comments
   - Add new comments
   - Real-time comment count updates

6. **Share functionality**:
   - Copy blog link to clipboard
   - Shareable URL format: `/Blog?id={blogId}`

## Usage

### For Users:
1. **View blogs**: Visit `/Blog` - no authentication required
2. **Write a blog**: Click "Write Blog" button (requires login)
3. **Like a blog**: Click the heart icon (requires login)
4. **Comment**: Click the comment icon (requires login)
5. **Share**: Click the share icon to copy link

### For Developers:

#### Import server actions:
```typescript
import {
  getBlogs,
  createBlog,
  toggleBlogLike,
  addBlogComment,
  getBlogComments,
} from "@/app/Actions/blogs";
```

#### Fetch blogs:
```typescript
const result = await getBlogs({
  category: "acting",
  sortBy: "trending",
  limit: 10,
});
```

#### Create a blog:
```typescript
const result = await createBlog({
  title: "My First Blog",
  content: "This is my story...",
  category: "experience",
});
```

#### Toggle like:
```typescript
const result = await toggleBlogLike(blogId);
// result.liked will be true if now liked, false if unliked
```

## Authentication Flow

1. **Unauthenticated users**:
   - Can view all blogs
   - Can search and filter
   - Cannot create, like, or comment

2. **Attempting protected actions**:
   - Shows popup: "Only logged in users can post blogs, like posts, and comment"
   - Offers "Go to Login" button
   - Redirects to `/login`

3. **Authenticated users**:
   - Full access to all features
   - Author info displayed with their posts
   - Can see which blogs they've liked

## Security

1. **Server-side validation**:
   - All actions verify session
   - Input sanitization for content
   - Author verification for updates/deletes

2. **Database constraints**:
   - Unique constraint on likes (one like per user per blog)
   - Cascade deletes (deleting a blog removes likes and comments)
   - Foreign key constraints

3. **Authorization**:
   - Only authenticated users can create/like/comment
   - Users can only delete their own content (future feature)

## Future Enhancements

1. **Save/bookmark posts** (schema ready, not yet implemented)
2. **Edit/delete own blogs**
3. **Rich text editor** for blog content
4. **Image upload** for featured images
5. **Blog pagination** for better performance
6. **User profile blog listings**
7. **Notifications** for likes and comments
8. **Trending algorithm** improvement
9. **Comment replies** (threaded comments)
10. **Report inappropriate content**

## Database Migration

The blog models were added via migration:
```bash
npx prisma migrate dev --name add_blog_models
```

To reset and reseed (if needed):
```bash
npx prisma migrate reset
npx prisma db seed
```

## Testing Checklist

- [ ] View blogs without login
- [ ] Search functionality
- [ ] Category filters
- [ ] Sort by newest/trending
- [ ] Login popup appears for protected actions
- [ ] Create blog (authenticated)
- [ ] Like blog (authenticated)
- [ ] Unlike blog
- [ ] Add comment (authenticated)
- [ ] Share blog (copy link)
- [ ] Redirect to login works
- [ ] Real-time updates work
- [ ] Optimistic UI updates
- [ ] Error handling

## Performance Considerations

1. **Database queries**:
   - Includes are optimized
   - Only necessary fields selected
   - Indexes on frequently queried fields

2. **Client-side**:
   - Optimistic updates for better UX
   - Minimal re-renders with proper state management
   - Lazy loading for images

3. **Caching**:
   - Server-side caching with `revalidatePath`
   - Client-side caching with React state

## Troubleshooting

### TypeScript errors after migration:
```bash
npx prisma generate
# Restart TypeScript server in VS Code
```

### Blogs not showing:
1. Check database connection
2. Verify blogs are `published: true`
3. Check console for errors

### Authentication issues:
1. Verify NextAuth configuration
2. Check session validity
3. Clear browser cookies and re-login

## Support

For issues or questions:
1. Check console logs
2. Verify database schema with `npx prisma studio`
3. Review server action responses
4. Check authentication session
