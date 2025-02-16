export interface Fair {
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
  headcount?: number;
  question: string;
}
