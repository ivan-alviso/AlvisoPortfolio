export const projects = [
  {
    name: "SMART",
    desc: "Student Management and Record Tracking software with grade management, performance analytics, predictive score simulation, automated feedback engine, report generation, attendance tracking, and assignment management features.",
    images: [
      `${import.meta.env.BASE_URL}smart/smart_1.jpg`,
      `${import.meta.env.BASE_URL}smart/smart_2.jpg`,
      `${import.meta.env.BASE_URL}smart/smart_3.jpg`
    ],
    languages: ["Java", "MySQL", "XML"]
  },
  {
    name: "FingerScan",
    desc: "Fingerprint classification using image recognition with 95% accuracy, featuring Henry Classification System, batch processing, and real-time processing capabilities.",
    images: [
      `${import.meta.env.BASE_URL}fingerscan/fingerscan_1.jpg`
    ],
    languages: ["Kotlin", "XML"]
  },
  {
    name: "CIVIQ",
    desc: "Civics learning app with interactive modules, real-time news feed, gamified quizzes, badge achievement system, community forum with poll voting, progress tracking, and leaderboards.",
    images: [
      `${import.meta.env.BASE_URL}civiq/civiq_1.jpg`,
      `${import.meta.env.BASE_URL}civiq/civiq_2.jpg`
    ],
    languages: ["Kotlin", "Firebase", "XML"]
  },
  {
    name: "Techlapia",
    desc: "Computer vision system for counting tilapia using YOLOv8 and OpenCV with 98% accuracy, featuring real-time processing, multi-object tracking, population mapping, and export analytics",
    images: [
      `${import.meta.env.BASE_URL}techlapia/techlapia_1.jpg`,
      `${import.meta.env.BASE_URL}techlapia/techlapia_2.jpg`,
      `${import.meta.env.BASE_URL}techlapia/techlapia_3.jpg`
    ],
    languages: ["Python", "OpenCV", "YOLOv8"]
  }
];