export interface ProfileBadge {
  label: string;
  color: string;
}

export interface ProfileUser {
  name: string;
  initials: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  major: string;
  batch: string;
  password: string;
  badges: ProfileBadge[];
}