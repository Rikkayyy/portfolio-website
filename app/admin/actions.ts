'use server';

import { getSupabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import type { Database } from '@/types/supabase';

type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
type PublicationInsert = Database['public']['Tables']['publications']['Insert'];


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

  const { error } = await supabase.from('projects').insert(projectData);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

export async function deleteProject(id: string) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/projects');
  return { success: true };
}

export async function toggleProjectVisibility(id: string, visible: boolean) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('projects')
    .update({ visible: !visible })
    .eq('id', id);

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
    .update(projectData)
    .eq('id', id);

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

  const { error } = await supabase.from('publications').insert(publicationData);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function deletePublication(id: string) {
  const supabase = getSupabaseAdmin();
  // Photos cascade-delete via foreign key
  const { error } = await supabase.from('publications').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

export async function togglePublicationVisibility(id: string, visible: boolean) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from('publications')
    .update({ visible: !visible })
    .eq('id', id);

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
    .update(publicationData)
    .eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}

// ── Photos ────────────────────────────────────────────────────────────────────

export async function createPhotoUploadUrl(publicationId: string, fileName: string) {
  const supabase = getSupabaseAdmin();

  const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
  const path = `${publicationId}/${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from('gallery')
    .createSignedUploadUrl(path);

  if (error) return { error: error.message };

  return { signedUrl: data.signedUrl, path };
}

export async function insertPhoto(data: {
  publicationId: string;
  path: string;
  alt: string | null;
  displayOrder: number;
}) {
  const supabase = getSupabaseAdmin();

  const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(data.path);

  const { error } = await supabase.from('photos').insert({
    publication_id: data.publicationId,
    image_url: urlData.publicUrl,
    alt: data.alt,
    display_order: data.displayOrder,
  });

  if (error) return { error: error.message };

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

  const { error } = await supabase.from('photos').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/admin');
  revalidatePath('/gallery');
  return { success: true };
}
