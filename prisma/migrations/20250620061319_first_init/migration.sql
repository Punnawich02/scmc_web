-- CreateTable
CREATE TABLE "transit_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "display_name_th" TEXT,
    "display_name_en" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transit_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transit_service" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "title" TEXT,
    "upload_by" TEXT,
    "upload_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "transit_service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "data_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_embed" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "embed_code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "data_embed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "publication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "link_url" TEXT NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transit_category_name_key" ON "transit_category"("name");

-- CreateIndex
CREATE INDEX "idx_transit_service_active" ON "transit_service"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "data_category_name_key" ON "data_category"("name");

-- CreateIndex
CREATE INDEX "idx_data_embed_active" ON "data_embed"("is_active");

-- CreateIndex
CREATE INDEX "idx_publication_active" ON "publication"("is_active");

-- AddForeignKey
ALTER TABLE "transit_service" ADD CONSTRAINT "transit_service_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "transit_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "data_embed" ADD CONSTRAINT "data_embed_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "data_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
