'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/types/supabase';

type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type PublicationInsert = Database['public']['Tables']['publications']['Insert'];
type PhotoInsert = Database['public']['Tables']['photos']['Insert'];

// ── Projects ──────────────────────────────────────────────────────────────────

export async function addProject(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const projectData: ProjectInsert = {
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    description: formData.get('description') as string,
    technologies: (formData.get('technologies') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    github_url: (formData.get('github_url') as string) || null,
    live_url: (formData.get('live_url') as string) || null,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const { error } = await supabase.from('projects').insert(projectData as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('projects').delete().eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

export async function toggleProjectVisibility(id: string, visible: boolean) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('projects')
    .update({ visible: !visible } as any)
    .eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = getSupabaseAdmin();

  const projectData: Partial<ProjectInsert> = {
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    description: formData.get('description') as string,
    technologies: (formData.get('technologies') as string)
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean),
    github_url: (formData.get('github_url') as string) || null,
    live_url: (formData.get('live_url') as string) || null,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const { error } = await supabase
    .from('projects')
    .update(projectData as any)
    .eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

// ── Publications (gallery series) ─────────────────────────────────────────────

export async function addPublication(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const publicationData: PublicationInsert = {
    num: formData.get('num') as string,
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    essay: (formData.get('essay') as string) || null,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const { error } = await supabase.from('publications').insert(publicationData as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function deletePublication(id: string) {
  const supabase = getSupabaseAdmin();
  // Photos cascade-delete via foreign key
  const { error } = await supabase.from('publications').delete().eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function togglePublicationVisibility(id: string, visible: boolean) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('publications')
    .update({ visible: !visible } as any)
    .eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function updatePublication(id: string, formData: FormData) {
  const supabase = getSupabaseAdmin();

  const publicationData: Partial<PublicationInsert> = {
    num: formData.get('num') as string,
    title: formData.get('title') as string,
    year: formData.get('year') as string,
    essay: (formData.get('essay') as string) || null,
    display_order: Number(formData.get('display_order') ?? 0),
  };

  const { error } = await supabase
    .from('publications')
    .update(publicationData as any)
    .eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

// ── Photos ────────────────────────────────────────────────────────────────────

export async function uploadPhoto(formData: FormData) {
  const supabase = getSupabaseAdmin();

  const file = formData.get('file') as File;
  const publicationId = formData.get('publication_id') as string;
  const alt = (formData.get('alt') as string) || null;
  const displayOrder = Number(formData.get('display_order') ?? 0);

  if (!file || !publicationId) return { error: 'Missing file or publication.' };

  // Upload to Supabase Storage
  const path = `${publicationId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(path, file, { contentType: file.type });

  if (uploadError) return { error: uploadError.message };

  // Build public URL
  const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path);

  // Insert photo record
  const photoData: PhotoInsert = {
    publication_id: publicationId,
    image_url: urlData.publicUrl,
    alt,
    display_order: displayOrder,
  };

  const { error: insertError } = await supabase.from('photos').insert(photoData as any);

  if (insertError) return { error: insertError.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function deletePhoto(id: string, imageUrl: string) {
  const supabase = getSupabaseAdmin();

  // Remove file from storage
  const match = imageUrl.match(/\/storage\/v1\/object\/public\/gallery\/(.+)$/);
  if (match) {
    await supabase.storage.from('gallery').remove([match[1]]);
  }

  const { error } = await supabase.from('photos').delete().eq('id' as any, id as any);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}
