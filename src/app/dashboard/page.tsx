import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import HeroBanner from "@/components/HeroBanner";
import StatCardGrid from "@/components/StatCardGrid";
import ScheduleList from "@/components/ScheduleList";
import AnnouncementList, { imgIconMegaphone, imgIconCalendar } from "@/components/AnnouncementList";
import type { Announcement, ScheduleEntry, StatCard } from "@/types/dashboard";

// Figma (3202-547): dot color tokens
const DOT_GREEN = "green";
const DOT_PURPLE = "purple";

const SCHEDULE_ENTRIES: ScheduleEntry[] = [
  {
    id: "stm32-serba-serbi",
    dayName: "TUE",
    month: "MAY",
    date: 20,
    title: "Serba Serbi Compvis",
    trainingName: "Pelatihan STM32 I 2026",
    timeStart: "13:00",
    timeEnd: "15:00",
    mode: "Offline",
    dotColor: DOT_PURPLE,
  },
  {
    id: "mbg-gizi-1",
    dayName: "THU",
    month: "MAY",
    date: 22,
    title: "Gizi Makanan Ternak",
    trainingName: "Pelatihan MBG 2026",
    timeStart: "10:00",
    timeEnd: "12:00",
    mode: "Online",
    dotColor: DOT_GREEN,
  },
  {
    id: "mbg-kembang",
    dayName: "THU",
    month: "MAY",
    date: 22,
    title: "Kembang Buah Hati",
    trainingName: "Pelatihan MBG 2026",
    timeStart: "10:00",
    timeEnd: "12:00",
    mode: "Online",
    dotColor: DOT_GREEN,
  },
  {
    id: "mbg-gizi-2",
    dayName: "THU",
    month: "MAY",
    date: 22,
    title: "Gizi Makanan Ternak",
    trainingName: "Pelatihan MBG 2026",
    timeStart: "10:00",
    timeEnd: "12:00",
    mode: "Online",
    dotColor: DOT_GREEN,
  },
];

const ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-genap-2026",
    iconSrc: imgIconMegaphone,
    title: "Pelatihan Genap 2026 Sudah Dibuka!",
    date: "May 6, 2026",
    body: "Pendaftaran pelatihan sudah dibuka. Jangan sia-siakan kesempatan ini!",
  },
  {
    id: "ann-jadwal-stm32",
    iconSrc: imgIconCalendar,
    title: "Perubahan Jadwal Pelatihan STM32",
    date: "May 6, 2026",
    body: "Pelatihan STM32 di tanggal 32 Mei 2026 akan ditunda ke 1 Juli 2026.",
  },
];

const CURRENT_USER = {
  name: "John Doe",
  role: "Participant",
};

const imgIconPelatihan = "/pelatihanicon.svg";
const imgIconTasks = "/penugasanicon.svg";
const imgIconJadwal = "/jadwalicon.svg";
const imgIconProgress = "/materiicon.svg";

const STAT_CARDS: StatCard[] = [
  { iconSrc: imgIconPelatihan, label: "Pelatihan", value: "2", sub: "Aktif" },
  { iconSrc: imgIconTasks, label: "Completed Tasks", value: "12 / 67", sub: "Minggu ini" },
  { iconSrc: imgIconJadwal, label: "Kelas Mendatang", value: "3", sub: "Dalam 7 hari" },
  { iconSrc: imgIconProgress, label: "Progress", value: "55%", sub: "Pelatihan" },
];

type PanelCopy = {
  scheduleTitle: string;
  announcementTitle: string;
};

const DASHBOARD_COPY: PanelCopy = {
  scheduleTitle: "Jadwal Selanjutnya",
  announcementTitle: "Pengumuman",
};

function getUserInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

function getGreetingByHour(hour: number) {
  if (hour >= 5 && hour < 12) {
    return "G'morning";
  }

  if (hour >= 12 && hour < 15) {
    return "G'noon";
  }

  if (hour >= 15 && hour < 18) {
    return "G'afternoon";
  }

  return "G'evening";
}

export default function DashboardPage() {
  const userInitial = getUserInitial(CURRENT_USER.name);
  const greeting = getGreetingByHour(new Date().getHours());

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeHref="/dashboard"
        userName={CURRENT_USER.name}
        userRole={CURRENT_USER.role}
        userInitial={userInitial}
      />
      <div className="dashboard-main">
        <Topbar notificationCount={3} />
        <main className="dashboard-content">
          <HeroBanner
            userName={CURRENT_USER.name}
            greeting={greeting}
            tagline="Rise and shine to keep growing."
            eventTitle="Pelatihan Ganjil 2026"
            eventDesc="is now open for registration!"
            eventHref="/pelatihan/bootcamp-2026"
          />
          <StatCardGrid cards={STAT_CARDS} />
          <div className="dashboard-panels">
            <ScheduleList
              entries={SCHEDULE_ENTRIES}
              showAllHref="/jadwal"
              title={DASHBOARD_COPY.scheduleTitle}
            />
            <AnnouncementList
              items={ANNOUNCEMENTS}
              showAllHref="/pengumuman"
              title={DASHBOARD_COPY.announcementTitle}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
