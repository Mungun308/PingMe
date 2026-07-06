import * as dotenv from "dotenv";
dotenv.config({path:".env.local"});

import { db } from "../db";
import { users, profiles, questions } from "../db/schema";


async function seed() {
  console.log("Seeding started...");

  // ─────────────────────────────
  // 1. Insert 10 NextAuth users
  // ─────────────────────────────
  const userData = [
    { id: "user-01", name: "Бат Болд", email: "bat.bold@callpro.mn" },
    { id: "user-02", name: "Сараа Дорж", email: "saraa.dorj@callpro.mn" },
    { id: "user-03", name: "Ганбат Эрдэнэ", email: "ganbat.erdene@callpro.mn" },
    { id: "user-04", name: "Оюунаа Мөнх", email: "oyunaa.munkh@callpro.mn" },
    { id: "user-05", name: "Төмөр Баяр", email: "tumur.bayar@callpro.mn" },
    { id: "user-06", name: "Ануужин Сүх", email: "anuujin.sukh@callpro.mn" },
    { id: "user-07", name: "Батжаргал Нар", email: "batjargal.nar@callpro.mn" },
    { id: "user-08", name: "Уянга Хас", email: "uyanga.khas@callpro.mn" },
    { id: "user-09", name: "Энхбат Дорж", email: "enkhbat.dorj@callpro.mn" },
    { id: "user-10", name: "Цэцэг Баясгалан", email: "tsetseg.bayasgalan@callpro.mn" },
  ];

  const insertedUsers = await db.insert(users).values(userData).returning();
  console.log(`Inserted ${insertedUsers.length} users`);

  // ─────────────────────────────
  // 2. Insert 10 profiles, each linked to one auth user
  // ─────────────────────────────
  const profileData = insertedUsers.map((u, i) => ({
    authUserId: u.id,
    fullName: u.name,
    age: 22 + i,
    position: [
      "Software Engineer",
      "HR Manager",
      "Sales Executive",
      "Marketing Lead",
      "Support Agent",
      "Accountant",
      "Data Analyst",
      "Product Manager",
      "Designer",
      "QA Engineer",
    ][i],
    team: [
      "Development",
      "HR",
      "Sales",
      "Marketing",
      "Support",
      "Finance",
      "Data",
      "Product",
      "Design",
      "QA",
    ][i],
    avatarUrl: null,
    education: { degree: "Bachelor", school: "МУИС" },
    lifestyle: { hobby: ["Football", "Reading", "Gaming", "Cooking", "Travel"][i % 5] },
    personality: { mbti: ["INTJ", "ENFP", "ISTP", "ESFJ", "INFP"][i % 5] },
  }));

  const insertedProfiles = await db.insert(profiles).values(profileData).returning();
  console.log(`Inserted ${insertedProfiles.length} profiles`);
  insertedProfiles.forEach((p) => console.log(" -", p.userId, p.fullName));

  // ─────────────────────────────
  // 3. Insert 10 questions, each pointing to a random profile as receiver
  // ─────────────────────────────
  const sampleContexts = [
    "Чи ажилдаа сэтгэл хангалуун байдаг уу?",
    "Хамгийн дуртай төслийн туршлага чинь юу вэ?",
    "Багийн гишүүддээ ямар зөвлөгөө өгөх вэ?",
    "Ажлын байрандаа юу сайжруулмаар байна?",
    "Чөлөөт цагаараа юу хийдэг вэ?",
    "Компаний соёлын талаар санал бодол?",
    "Шинэ ажилтнуудад ямар зөвлөгөө өгөх вэ?",
    "Ирээдүйн зорилго чинь юу вэ?",
    "Хамгийн хэцүү даалгавар юу байсан бэ?",
    "Дуртай технологи/хэрэгсэл юу вэ?",
  ];

  const questionData = insertedProfiles.map((p, i) => ({
    questionId: `Q${String(i + 1).padStart(3, "0")}`, // Q001, Q002, ...
    receiverId: p.userId,
    context: sampleContexts[i],
    answer: i % 2 === 0 ? "Тийм ээ, сэтгэл хангалуун байдаг." : null,
    answeredAt: i % 2 === 0 ? new Date().toISOString().split("T")[0] : null,
  }));

  const insertedQuestions = await db.insert(questions).values(questionData).returning();
  console.log(`Inserted ${insertedQuestions.length} questions`);

  console.log("Seeding finished!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});