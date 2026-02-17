import { createSupabaseServerClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import AdminPanel from './AdminPanel';
import type { Project, PublicationWithPhotos } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = await createSupabaseServerClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch projects
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true });

  // Fetch publications with their photos
  const { data: publications } = await supabase
    .from('publications')
    .select(`
      *,
      photos (*)
    `)
    .order('display_order', { ascending: true });

  // Sort photos within each publication
  const publicationsWithSortedPhotos = (publications ?? []).map((pub: any) => ({
    ...pub,
    photos: (pub.photos ?? []).sort((a: any, b: any) => a.display_order - b.display_order),
  })) as PublicationWithPhotos[];

  return (
    <AdminPanel
      projects={(projects ?? []) as any}
      publications={publicationsWithSortedPhotos}
      userEmail={user.email ?? ''}
    />
  );
}
