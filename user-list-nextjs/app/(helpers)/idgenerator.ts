export default function generateRandomId(): number {
  return Math.floor(Math.random() * 1_000_000);
}