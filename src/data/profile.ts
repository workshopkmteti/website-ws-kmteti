export const DUMMY_USER = {
  name: "JOHN DOE",
  initials: "J",
  fullName: "JOHN DOE",
  email: "johndoe@gmail.com",
  phone: "+62 0812-3456-7890",
  university: "Universitas Gadjah Mada",
  major: "Teknik Elektro",
  batch: "2024",
  password: "**************",
  badges: [
    {
      label: "Active Participant",
      color: "emerald",
    },
    {
      label: "Great Competitor",
      color: "purple",
    },
  ],
};

export const PERSONAL_FIELDS = [
  {
    id: "fullName",
    label: "Nama Lengkap",
    type: "text",
    key: "fullName",
  },
  {
    id: "email",
    label: "Alamat Email",
    type: "email",
    key: "email",
  },
  {
    id: "phone",
    label: "Nomor Telepon",
    type: "tel",
    key: "phone",
  },
] as const;

export const ACADEMIC_FIELDS = [
  {
    id: "university",
    label: "Asal Universitas",
    type: "text",
    key: "university",
  },
  {
    id: "major",
    label: "Jurusan",
    type: "text",
    key: "major",
  },
  {
    id: "batch",
    label: "Angkatan",
    type: "text",
    key: "batch",
  },
] as const;