import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

// Initialize storage client
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucketName = process.env.GOOGLE_CLOUD_BUCKET_NAME || 'visey-opportunity-banner-uploads';

/**
 * Uploads a file to Google Cloud Storage
 * @param file The file to upload
 * @param folderPath The folder path within the bucket
 * @returns The URL of the uploaded file
 */
export const uploadToGCS = async (
  file: File,
  folderPath: string = 'banners'
): Promise<string | null> => {
  try {
    // Get the file buffer
    const buffer = await file.arrayBuffer();

    // Create a unique file name
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}_${Date.now()}.${fileExt}`;
    const filePath = `${folderPath}/${fileName}`;

    // Get bucket
    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(filePath);

    // Upload file
    await blob.save(Buffer.from(buffer), {
      metadata: {
        contentType: file.type,
      },
    });

    // Make the file public and get URL
    await blob.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file to GCS:', error);
    return null;
  }
};
