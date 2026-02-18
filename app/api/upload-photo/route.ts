import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  const supabase = getSupabaseAdmin();

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const publicationId = formData.get('publication_id') as string;
  const alt = (formData.get('alt') as string) || null;
  const displayOrder = Number(formData.get('display_order') ?? 0);

  if (!file || !publicationId) {
    return NextResponse.json({ error: 'Missing file or publication.' }, { status: 400 });
  }

  // Sanitize file name
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .toLowerCase();
  const path = `${publicationId}/${Date.now()}-${safeName}`;

  // Upload to Supabase Storage
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(path, buffer, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Build public URL
  const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path);

  // Insert photo record
  const { error: insertError } = await supabase.from('photos').insert({
    publication_id: publicationId,
    image_url: urlData.publicUrl,
    alt,
    display_order: displayOrder,
  });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return NextResponse.json({ success: true });
}
