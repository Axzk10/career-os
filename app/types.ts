export type Job = {
  id: string;
  company: string;
  title: string;
  status: string;
  priority: string;
  location: string | null;
  salary: string | null;
  url: string | null;
  applicationDate: string;
  followUpDate: string | null;
  updatedAt: string;
  cvPath: string | null;
};