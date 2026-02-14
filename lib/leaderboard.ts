import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export async function updateLeaderboard(username: string, xp: number) {
  const userRef = doc(db, "leaderboard", username);

  await setDoc(
    userRef,
    {
      name: username,
      xp,
      updatedAt: new Date(),
    },
    { merge: true }
  );
}
