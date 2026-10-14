import { getLucid } from "./lucid.js";

const lucid = await getLucid();

console.log(
  await lucid.wallet().address()
);
