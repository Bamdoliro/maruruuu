export interface Fair {
  id: number;
  start: string;
  place: string;
  applicationUrl: string;
  applicationStartDate: string;
  applicationEndDate: string;
  status: string;
}

export interface FairApplication {
  schoolName: string;
  name: string;
  type: string;
  phoneNumber: string;
  headcount?: number | null;
  question?: string;
}
