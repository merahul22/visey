import { Storage } from '@google-cloud/storage';
import { NextRequest, NextResponse } from 'next/server';

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME || '');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const blob = bucket.file(fileName);
    
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.type,
      }
      // Removed public flag since we're using uniform bucket-level access
    });

    return new Promise((resolve, reject) => {
      blobStream.on('error', (err) => {
        console.error('Upload error:', err);
        resolve(NextResponse.json(
          { error: 'Upload failed' },
          { status: 500 }
        ));
      });

      blobStream.on('finish', async () => {
        // With uniform bucket-level access, we don't need to make individual files public
        // The bucket's IAM policies control access instead
        const publicUrl = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_BUCKET_NAME}/${fileName}`;
        
        resolve(NextResponse.json(
          { url: publicUrl },
          { status: 200 }
        ));
      });

      blobStream.end(buffer);
    });
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
