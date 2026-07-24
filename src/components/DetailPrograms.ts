export interface Program {
  tag: string;
  title: string;
  description: string;
  schedule: string;
  prerequisites: string;
  benefits: string[];
  syllabus: string[];
}

export const PROGRAMS: Program[] = [
  {
    tag: "Pelatihan Genap",
    title: "IMAGE PROCESSING",
    description:
      "Pelatihan komprehensif mengenai teknik pengolahan citra digital mulai dari manipulasi piksel dasar, deteksi tepi, ekstraksi fitur, hingga pengenalan pola sederhana menggunakan pustaka OpenCV dan Python.",
    schedule: "6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)",
    prerequisites: "Dasar Pemrograman Python",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & source code",
      "Grup diskusi & konsultasi",
      "Praktik langsung (Hands-on)",
    ],
    syllabus: [
      "Sesi 1: Setup & Intro to Image Processing",
      "Sesi 2: Color Models, Resizing, and Geometric Transformations",
      "Sesi 3: Intensity Transformation and Spatial Filtering",
      "Sesi 4: Image Thresholding, Bitwise OPeration and Morphological",
      "Sesi 5: Contour Tracing",
      "Sesi 6: Feature Extraction, Template Matching, and Final Project",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "MatLab",
    description:
      "Pelajari dasar-dasar MATLAB untuk analisis data, visualisasi grafik 2D & 3D, pemecahan persamaan matematika kompleks, simulasi sistem dinamis (Simulink), serta pengenalan toolbox teknik elektro dan teknologi informasi.",
    schedule: "6 Sesi (Setiap Hari Sabtu, 13:00 - 16:00 WIB)",
    prerequisites: "Matematika Teknik Dasar",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & file simulasi (.m & .slx)",
      "Grup diskusi & konsultasi",
      "Studi kasus industri",
    ],
    syllabus: [
      "Sesi 1: Introduction to Matlab and Syntax",
      "Sesi 2: Arrays of Numbers, Vectors, and Matrices",
      "Sesi 3: Plotting and Import Data",
      "Sesi 4: Intorduction to Simulink and Simulate a Simple Simulink Model",
      "Sesi 5: Dynamic System in Simulink",
      "Sesi 6: Discrete System and Continuous System in Simulink",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "Proteus #2",
    description:
      "Pelatihan software simulasi sirkuit elektronik Proteus. Peserta akan belajar menggambar skema rangkaian, mensimulasikan logika digital & analog secara real-time, mendesain tata letak PCB, hingga mengekspor file Gerber siap cetak.",
    schedule: "6 Sesi (Setiap Hari Minggu, 09:00 - 12:00 WIB)",
    prerequisites: "Rangkaian Elektrik & Elektronika Dasar",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul panduan desain PCB",
      "Grup diskusi & konsultasi",
      "File proyek simulasi",
    ],
    syllabus: [
      "Sesi 1: Introduction",
      "Sesi 2: Driving Circuit Components and ELectronics Circuit Protection",
      "Sesi 3: Rectifier and Voltage Regulator",
      "Sesi 4: Operatinal Amplifier",
      "Sesi 5: Microcontroller",
      "Sesi 6: Course Reviewing & Final Project Briefing",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "STM32",
    description:
      "-",
    schedule: "6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)",
    prerequisites: "-",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & source code",
      "Grup diskusi & konsultasi",
      "Praktik langsung (Hands-on)",
    ],
    syllabus: [
      "Sesi 1: Introduction to STM32 - STM32CubeIDE",
      "Sesi 2: GPIO - Digital Input & Output",
      "Sesi 3: Timer & Interrupt - PWM Generation",
      "Sesi 4: Comm. Protocols & Display - UART, I2C, SPI",
      "Sesi 5: Sensor Interface - ADC(Analog to Digital)",
      "Sesi 6: Digital Filtering -Signal Processing Dasar",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "Programmable Logic Controller(PLC) II",
    description:
      "Pelatihan ",
    schedule: "6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)",
    prerequisites: "-",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & source code",
      "Grup diskusi & konsultasi",
      "Praktik langsung (Hands-on)",
    ],
    syllabus: [
      "Sesi 1: Pengenalan PLC",
      "Sesi 2: Ladder Logic",
      "Sesi 3: Timer & Counter",
      "Sesi 4: Pulse Generator",
      "Sesi 5: Komunikasi Modbus",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "Web Development II",
    description:
      "Pelatihan ",
    schedule: "6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)",
    prerequisites: "-",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & source code",
      "Grup diskusi & konsultasi",
      "Praktik langsung (Hands-on)",
    ],
    syllabus: [
      "Sesi 1: Setup & WebDevelopment Basics",
      "Sesi 2: Javascript Basics & React Fundamentals",
      "Sesi 3: React State, Hooks, & Application Logic",
      "Sesi 4: API Integration & Persistence",
      "Sesi 5: TypeSCript INterlude",
      "Sesi 6: Deployment & Production Workflow",
    ],
  },
  {
    tag: "Pelatihan Genap",
    title: "EP Class",
    description:
      "Pelatihan ",
    schedule: "6 Sesi (Setiap Hari Sabtu, 09:00 - 12:00 WIB)",
    prerequisites: "-",
    benefits: [
      "Sertifikat Pelatihan resmi KMTETI",
      "Modul materi & source code",
      "Grup diskusi & konsultasi",
      "Praktik langsung (Hands-on)",
    ],
    syllabus: [
      "Sesi 1: Competition Mindset & Design Thinking",
      "Sesi 2: Business Model & Executive Summary",
      "Sesi 3: Problem Validation & Product-Market Fit",
      "Sesi 4: Market & Competitive Strategy",
      "Sesi 5: Financial & Operational Planning",
      "Sesi 6: Tell Me Your Idea Within 5 min",
    ],
  },
];
