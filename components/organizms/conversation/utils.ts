import { IConversation } from "@/services";
import { InfiniteData } from "@tanstack/react-query";

/**
 * Updates the title of an object with a specific _id in useInfiniteQuery data
 * @param {Object} queryData - The useInfiniteQuery return value
 * @param {string} targetId - The _id of the object to update
 * @param {string} newTitle - The new title value
 * @returns {Object} Updated queryData object
 */
export function updateObjectTitle(
  queryData: InfiniteData<IConversation[]>,
  targetId: string,
  newTitle: string
): InfiniteData<IConversation[]> {
  // Create a deep copy to avoid mutating the original data

  const updatedData = JSON.parse(JSON.stringify(queryData));

  // Iterate through pages
  for (let i = 0; i < updatedData.pages.length; i++) {
    const page = updatedData.pages[i];

    // Check if this page has a data array
    if (page.data && Array.isArray(page.data)) {
      // Find the object with matching _id
      const objectIndex = page.data.findIndex(
        (obj: IConversation) => obj._id === targetId
      );

      if (objectIndex !== -1) {
        // Update the title
        updatedData.pages[i].data[objectIndex].title = newTitle;

        // Optionally update the updatedAt timestamp
        updatedData.pages[i].data[objectIndex].updatedAt =
          new Date().toISOString();

        return updatedData;
      }
    }
  }

  return updatedData;
}
