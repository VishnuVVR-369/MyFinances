import { categories, accounts, transactions } from "@/db/schema";
import { convertAmountToPaisa } from "@/lib/utils";
import { neon } from "@neondatabase/serverless";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

config();

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_USER_ID = "user_2hh1GrKLtVzcfiKnXtZpL94JnSf";
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID },
  { id: "category_2", name: "Rent", userId: SEED_USER_ID },
  { id: "category_3", name: "Utilities", userId: SEED_USER_ID },
  { id: "category_4", name: "Entertainment", userId: SEED_USER_ID },
  { id: "category_5", name: "Health", userId: SEED_USER_ID },
  { id: "category_6", name: "Shopping", userId: SEED_USER_ID },
  { id: "category_7", name: "Education", userId: SEED_USER_ID },
  { id: "category_8", name: "Others", userId: SEED_USER_ID },
];
const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];
const SEED_ACCOUNTS = [
  { id: "account_1", name: "Cash", userId: SEED_USER_ID },
  { id: "account_2", name: "Bank", userId: SEED_USER_ID },
  { id: "account_3", name: "Credit Card", userId: SEED_USER_ID },
];

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Food":
      return Math.floor(Math.random() * 1000) + 100;
    case "Rent":
      return Math.floor(Math.random() * 1000) + 5000;
    case "Utilities":
      return Math.floor(Math.random() * 500) + 200;
    case "Entertainment":
      return Math.floor(Math.random() * 500) + 100;
    case "Health":
      return Math.floor(Math.random() * 1000) + 100;
    case "Shopping":
      return Math.floor(Math.random() * 1000) + 100;
    case "Education":
      return Math.floor(Math.random() * 1000) + 100;
    default:
      return Math.floor(Math.random() * 1000) + 100;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.4;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToPaisa(isExpense ? -amount : amount);
    SEED_TRANSACTIONS.push({
      id: `transaction_${format(day, "yyyyMMdd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Payee",
      notes: "Notes",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(categories).execute();
    await db.delete(accounts).execute();
    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (error) {
    console.error("Error during running seed script: ", error);
    process.exit(1);
  }
};

main();
