import { ObjectId } from "mongodb";

/**
 * Transforms MongoDB document by converting _id to id
 * @param doc MongoDB document with _id field
 * @returns Document with id field instead of _id
 */
export function transformMongoDoc<T extends { _id?: ObjectId | string }>(
  doc: T,
): Omit<T, "_id"> & { id: string } {
  const { _id, ...rest } = doc;
  return {
    ...rest,
    id: _id?.toString() || "",
  };
}

/**
 * Transforms an array of MongoDB documents
 * @param docs Array of MongoDB documents
 * @returns Array with transformed documents
 */
export function transformMongoDocs<T extends { _id?: ObjectId | string }>(
  docs: T[],
): (Omit<T, "_id"> & { id: string })[] {
  return docs.map(transformMongoDoc);
}
