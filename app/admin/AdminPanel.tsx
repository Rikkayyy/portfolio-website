'use client';

import { useState, useRef } from 'react';
import styles from './Admin.module.css';
import {
  addProject,
  deleteProject,
  addPublication,
  deletePublication,
  uploadPhoto,
  deletePhoto,
} from './actions';
import type { Project, PublicationWithPhotos } from '@/types/supabase';

interface Props {
  projects: Project[];
  publications: PublicationWithPhotos[];
}

export default function AdminPanel({ projects, publications }: Props) {
  const [tab, setTab] = useState<'projects' | 'gallery'>('projects');

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Admin</h1>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'projects' ? styles.tabActive : ''}`}
            onClick={() => setTab('projects')}
          >
            Projects
          </button>
          <button
            className={`${styles.tab} ${tab === 'gallery' ? styles.tabActive : ''}`}
            onClick={() => setTab('gallery')}
          >
            Gallery
          </button>
        </div>

        {tab === 'projects' && <ProjectsTab projects={projects} />}
        {tab === 'gallery' && <GalleryTab publications={publications} />}
      </main>
    </div>
  );
}

// ── Projects Tab ──────────────────────────────────────────────────────────────

function ProjectsTab({ projects }: { projects: Project[] }) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAdd(formData: FormData) {
    setPending(true);
    setMsg(null);
    const result = await addProject(formData);
    setPending(false);
    if (result.error) {
      setMsg({ type: 'error', text: result.error });
    } else {
      setMsg({ type: 'success', text: 'Project added.' });
      formRef.current?.reset();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this project?')) return;
    const result = await deleteProject(id);
    if (result.error) setMsg({ type: 'error', text: result.error });
  }

  return (
    <>
      {/* Existing projects */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Existing Projects</p>
        {projects.length === 0 && <p className={styles.empty}>No projects yet.</p>}
        <div className={styles.items}>
          {projects.map((p, i) => (
            <div key={p.id} className={styles.item}>
              <span className={styles.itemNum}>{String(i + 1).padStart(2, '0')}</span>
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>{p.title}</div>
                <div className={styles.itemMeta}>
                  {p.year} &middot; {p.technologies.join(', ')}
                </div>
              </div>
              <button className={styles.btnDanger} onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add project form */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Add Project</p>
        <form ref={formRef} className={styles.form} action={handleAdd}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input name="title" className={styles.input} required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Year</label>
              <input name="year" className={styles.input} placeholder="2024" required />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea name="description" className={styles.textarea} required />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Technologies (comma-separated)</label>
            <input name="technologies" className={styles.input} placeholder="Next.js, TypeScript, Supabase" required />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>GitHub URL (optional)</label>
              <input name="github_url" className={styles.input} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Live URL (optional)</label>
              <input name="live_url" className={styles.input} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Display Order</label>
            <input name="display_order" type="number" className={styles.input} defaultValue={projects.length} />
          </div>

          {msg && <p className={msg.type === 'error' ? styles.error : styles.success}>{msg.text}</p>}

          <button type="submit" className={styles.btn} disabled={pending}>
            {pending ? 'Adding…' : 'Add Project'}
          </button>
        </form>
      </div>
    </>
  );
}

// ── Gallery Tab ───────────────────────────────────────────────────────────────

function GalleryTab({ publications }: { publications: PublicationWithPhotos[] }) {
  const [pendingPub, setPendingPub] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(false);
  const [msg, setMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const pubFormRef = useRef<HTMLFormElement>(null);
  const photoFormRef = useRef<HTMLFormElement>(null);

  async function handleAddPub(formData: FormData) {
    setPendingPub(true);
    setMsg(null);
    const result = await addPublication(formData);
    setPendingPub(false);
    if (result.error) {
      setMsg({ type: 'error', text: result.error });
    } else {
      setMsg({ type: 'success', text: 'Series added.' });
      pubFormRef.current?.reset();
    }
  }

  async function handleDeletePub(id: string) {
    if (!confirm('Delete this series and all its photos?')) return;
    const result = await deletePublication(id);
    if (result.error) setMsg({ type: 'error', text: result.error });
  }

  async function handleUploadPhoto(formData: FormData) {
    setPendingPhoto(true);
    setMsg(null);
    const result = await uploadPhoto(formData);
    setPendingPhoto(false);
    if (result.error) {
      setMsg({ type: 'error', text: result.error });
    } else {
      setMsg({ type: 'success', text: 'Photo uploaded.' });
      photoFormRef.current?.reset();
    }
  }

  async function handleDeletePhoto(id: string, imageUrl: string) {
    if (!confirm('Delete this photo?')) return;
    const result = await deletePhoto(id, imageUrl);
    if (result.error) setMsg({ type: 'error', text: result.error });
  }

  return (
    <>
      {/* Existing publications */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Existing Series</p>
        {publications.length === 0 && <p className={styles.empty}>No series yet.</p>}
        <div className={styles.items}>
          {publications.map((pub) => (
            <div key={pub.id}>
              <div className={styles.item}>
                <span className={styles.itemNum}>{pub.num}</span>
                <div className={styles.itemInfo}>
                  <div className={styles.itemTitle}>{pub.title}</div>
                  <div className={styles.itemMeta}>
                    {pub.year} &middot; {pub.photos.length} photo{pub.photos.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <button className={styles.btnDanger} onClick={() => handleDeletePub(pub.id)}>
                  Delete
                </button>
              </div>

              {/* Photo thumbnails */}
              {pub.photos.length > 0 && (
                <div className={styles.photoGrid}>
                  {pub.photos.map((photo) => (
                    <div key={photo.id} className={styles.photoCard}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.image_url} alt={photo.alt ?? ''} />
                      <button
                        className={styles.photoDelete}
                        onClick={() => handleDeletePhoto(photo.id, photo.image_url)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add series form */}
      <div className={styles.section}>
        <p className={styles.sectionTitle}>Add Series</p>
        <form ref={pubFormRef} className={styles.form} action={handleAddPub}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Number</label>
              <input
                name="num"
                className={styles.input}
                placeholder="01"
                defaultValue={String(publications.length + 1).padStart(2, '0')}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input name="title" className={styles.input} placeholder="Series I" required />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Year</label>
              <input name="year" className={styles.input} placeholder="2024" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Display Order</label>
              <input name="display_order" type="number" className={styles.input} defaultValue={publications.length} />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Essay (optional)</label>
            <textarea name="essay" className={styles.textarea} placeholder="A short description or essay for this series…" />
          </div>

          <button type="submit" className={styles.btn} disabled={pendingPub}>
            {pendingPub ? 'Adding…' : 'Add Series'}
          </button>
        </form>
      </div>

      {/* Upload photo form */}
      {publications.length > 0 && (
        <div className={styles.section}>
          <p className={styles.sectionTitle}>Upload Photo</p>
          <form ref={photoFormRef} className={styles.form} action={handleUploadPhoto}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Series</label>
                <select name="publication_id" className={styles.select} required>
                  {publications.map((pub) => (
                    <option key={pub.id} value={pub.id}>
                      {pub.num} — {pub.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Display Order</label>
                <input name="display_order" type="number" className={styles.input} defaultValue={0} />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Image</label>
              <input name="file" type="file" accept="image/*" className={styles.fileInput} required />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Alt Text (optional)</label>
              <input name="alt" className={styles.input} placeholder="A short description of the image" />
            </div>

            {msg && <p className={msg.type === 'error' ? styles.error : styles.success}>{msg.text}</p>}

            <button type="submit" className={styles.btn} disabled={pendingPhoto}>
              {pendingPhoto ? 'Uploading…' : 'Upload Photo'}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
