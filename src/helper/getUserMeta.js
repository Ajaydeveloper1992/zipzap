import UserMeta from "@/models/userMetaModel";

export const getUserMeta = async (userId) => {
    try {
      const metaData = await UserMeta.find({ userId });
      return metaData;
    } catch (error) {
      console.error("Error fetching user meta data:", error);
      throw new Error("Failed to fetch user meta data");
    }
  };

export const getUserMetadataByKey = async (userId, metaKey) => {
    try {
      const userMetadata = await UserMeta.findOne({ userId, meta_key: metaKey }).exec();
      return userMetadata;
    } catch (error) {
      console.error('Error fetching user metadata:', error);
      throw error; // Handle error as needed
    }
  };