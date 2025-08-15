import { client } from "@/sanity/lib/client";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  // Validate the ID parameter
  if (!id || typeof id !== 'string' || id.trim() === '') {
    return (
      <div className="view-container">
        <p className="view-text">
          <span className="font-black">Views: 0</span>
        </p>
      </div>
    );
  }

  try {
    const result = await client
      .withConfig({ useCdn: false })
      .fetch(PROJECT_VIEWS_QUERY, { id });

    if (!result) {
      console.error('No project found with ID:', id);
      return (
        <div className="view-container">
          <p className="view-text">
            <span className="font-black">Views: 0</span>
          </p>
        </div>
      );
    }

    const totalViews = result.views || 0;

    if (typeof process !== "undefined") {
      if (id && id.length > 0) {
        writeClient
          .patch(id)
          .set({ views: totalViews + 1 })
          .commit()
          .catch((error) => {
            console.error("Failed to increment views for ID:", id, error);
          });
      }
    }

    return (
      <div className="view-container">
        <p className="view-text">
          <span className="font-black">Views: {totalViews}</span>
        </p>
      </div>
    );

  } catch (error) {
    console.error('Error in View component:', error);
    return (
      <div className="view-container">
        <p className="view-text">
          <span className="font-black">Views: --</span>
        </p>
      </div>
    );
  }
};

export default View;