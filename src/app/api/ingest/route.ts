import { NextRequest, NextResponse } from 'next/server';
import { IngestionService } from '@/lib/ingestionService';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await IngestionService.ingestZip(buffer);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Ingestion API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
