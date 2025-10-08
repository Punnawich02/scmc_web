-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "data_page" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category_name_th" TEXT NOT NULL,
    "category_name_en" TEXT NOT NULL,
    "embed_code" TEXT,
    "link_url" TEXT,
    "create_by" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_by" TEXT,
    "update_at" DATETIME,
    "delete_by" TEXT,
    "delete_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "data_page_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "data_page_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "data_page_delete_by_fkey" FOREIGN KEY ("delete_by") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "publications" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title_th" TEXT NOT NULL,
    "title_en" TEXT NOT NULL,
    "description_th" TEXT,
    "description_en" TEXT,
    "link_url" TEXT NOT NULL,
    "create_by" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_by" TEXT,
    "update_at" DATETIME,
    "delete_by" TEXT,
    "delete_at" DATETIME,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "publications_create_by_fkey" FOREIGN KEY ("create_by") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "publications_update_by_fkey" FOREIGN KEY ("update_by") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "publications_delete_by_fkey" FOREIGN KEY ("delete_by") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "data_page_create_by_idx" ON "data_page"("create_by");

-- CreateIndex
CREATE INDEX "data_page_update_by_idx" ON "data_page"("update_by");

-- CreateIndex
CREATE INDEX "data_page_is_active_idx" ON "data_page"("is_active");

-- CreateIndex
CREATE INDEX "publications_create_by_idx" ON "publications"("create_by");

-- CreateIndex
CREATE INDEX "publications_update_by_idx" ON "publications"("update_by");

-- CreateIndex
CREATE INDEX "publications_is_active_idx" ON "publications"("is_active");
