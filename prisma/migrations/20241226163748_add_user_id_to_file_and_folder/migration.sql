/*
  Warnings:

  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- Agregar la columna userId a la tabla File
ALTER TABLE "File" ADD COLUMN "userId" INTEGER;

-- Actualizar las filas existentes con un valor predeterminado para userId
-- Aquí asumimos que el valor predeterminado es 1, pero debes ajustarlo según tu caso
UPDATE "File" SET "userId" = 1 WHERE "userId" IS NULL;

-- Hacer que la columna userId sea obligatoria
ALTER TABLE "File" ALTER COLUMN "userId" SET NOT NULL;

-- Agregar la columna userId a la tabla Folder
ALTER TABLE "Folder" ADD COLUMN "userId" INTEGER;

-- Actualizar las filas existentes con un valor predeterminado para userId
-- Aquí asumimos que el valor predeterminado es 1, pero debes ajustarlo según tu caso
UPDATE "Folder" SET "userId" = 1 WHERE "userId" IS NULL;

-- Hacer que la columna userId sea obligatoria
ALTER TABLE "Folder" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
