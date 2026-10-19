import type { FileDocument } from '@/types/form/remote';

const STORAGE_KEY = 'profile_upload';
const LEGACY_KEYS = ['fileName', 'mediaType', 'fileSize', 'upload'];

interface StoredProfile extends FileDocument {
  owner: string;
}

export const getStoredProfile = (owner: string): FileDocument | null => {
  LEGACY_KEYS.forEach((key) => localStorage.removeItem(key));

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  const { owner: storedOwner, ...fileData } = JSON.parse(stored) as StoredProfile;

  return storedOwner === owner ? fileData : null;
};

export const saveStoredProfile = (owner: string, fileData: FileDocument) => {
  const storedProfile: StoredProfile = { owner, ...fileData };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storedProfile));
};
