import { getSupabaseAdmin } from '@/lib/supabase';
import AdminPanel from './AdminPanel';
import type { Project, PublicationWithPhotos } from '@/types/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = getSupabaseAdmin();

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
  const publicationsWithSortedPhotos = (publications ?? []).map((pub) => ({
    ...pub,
    photos: (pub.photos ?? []).sort((a, b) => a.display_order - b.display_order),
  })) as PublicationWithPhotos[];

  return (
    <AdminPanel
      projects={(projects ?? []) as Project[]}
      publications={publicationsWithSortedPhotos}
    />
  );
}
