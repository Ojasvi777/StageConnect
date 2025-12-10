-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('acting', 'dancing', 'singing', 'modeling', 'voiceover', 'photography', 'tips', 'experience', 'industry_news', 'other');

-- CreateTable
CREATE TABLE "blogs" (
    "blog_id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL DEFAULT 'experience',
    "image_url" VARCHAR(512),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("blog_id")
);

-- CreateTable
CREATE TABLE "blog_likes" (
    "like_id" UUID NOT NULL,
    "blog_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blog_likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "blog_comments" (
    "comment_id" UUID NOT NULL,
    "blog_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "blog_comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE INDEX "blogs_author_id_idx" ON "blogs"("author_id");

-- CreateIndex
CREATE INDEX "blogs_category_idx" ON "blogs"("category");

-- CreateIndex
CREATE INDEX "blogs_created_at_idx" ON "blogs"("created_at");

-- CreateIndex
CREATE INDEX "blogs_published_idx" ON "blogs"("published");

-- CreateIndex
CREATE INDEX "blog_likes_blog_id_idx" ON "blog_likes"("blog_id");

-- CreateIndex
CREATE INDEX "blog_likes_user_id_idx" ON "blog_likes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "blog_likes_blog_id_user_id_key" ON "blog_likes"("blog_id", "user_id");

-- CreateIndex
CREATE INDEX "blog_comments_blog_id_idx" ON "blog_comments"("blog_id");

-- CreateIndex
CREATE INDEX "blog_comments_user_id_idx" ON "blog_comments"("user_id");

-- CreateIndex
CREATE INDEX "blog_comments_created_at_idx" ON "blog_comments"("created_at");

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_likes" ADD CONSTRAINT "blog_likes_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("blog_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_likes" ADD CONSTRAINT "blog_likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("blog_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_comments" ADD CONSTRAINT "blog_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
