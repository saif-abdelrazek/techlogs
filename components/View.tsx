
import { client } from "@/sanity/lib/client";
import { PROJECT_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(PROJECT_VIEWS_QUERY, { id });

  // Increment views after fetching (server action)
  if (typeof process !== "undefined") {
    writeClient
      .patch(id)
      .set({ views: totalViews + 1 })
      .commit()
      .catch((error) => {
        console.error("Failed to increment views:", error);
      });
  }

  return (
    <div className="view-container">
      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;