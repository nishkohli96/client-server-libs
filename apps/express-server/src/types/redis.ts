export type SScanResult = {
  cursor: number;
  members: string[];
};

export type SortedSetMember = {
  score: number;
  value: string;
};

export type ZScanResult = {
  cursor: number;
  members: SortedSetMember[];
};
