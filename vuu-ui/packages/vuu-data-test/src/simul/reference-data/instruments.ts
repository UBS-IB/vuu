import { isinGenerator } from "@thomaschaplin/isin-generator";
import { currencies } from "./currencies";
import { locations, suffixes } from "./locations";
import { lotsizes } from "./lotsizes";
import { random } from "../../data-utils";
import { buildDataColumnMap, Table } from "../../Table";
import { schemas } from "../simul-schemas";

export type bbg = string;
export type currency = string;
export type ric = string;
export type description = string;
export type exchange = string;
// seed for price generation
export type price = number;
type supported = boolean;
type wishlist = boolean;

export type InstrumentsDataRow = [
  bbg,
  currency,
  description,
  exchange,
  string,
  number,
  ric,
  supported,
  wishlist,
  price
];

export const InstrumentColumnMap = {
  bbg: 0,
  currency: 1,
  description: 2,
  exchange: 3,
  string: 4,
  number: 5,
  ric: 6,
  supported: 7,
  wishlist: 8,
  price: 9,
} as const;

const instrumentsData: InstrumentsDataRow[] = [];

const chars = Array.from("ABCEFGHKMNOPQRTUVWYZ");

const randomPrice = () => {
  const price = random(0, 10000);
  const multiplier = random(1, 10);
  return price / multiplier;
};

// const start = performance.now();
// Create 100_000 Instruments
for (const char of chars) {
  for (let i = 0; i < 5_000; i++) {
    const char2 = chars[random(0, chars.length - 1)];
    const char3 = chars[random(0, chars.length - 1)];
    const char4 = chars[random(0, chars.length - 1)];

    const suffix = suffixes[random(0, suffixes.length - 1)];
    const ric = char + char2 + char3 + char4 + "." + suffix;
    const bbg = char + char2 + char3 + char4 + " " + suffix;
    const description = `${ric} description`;
    const currency = currencies[random(0, 4)];
    const isin = isinGenerator();
    const lotSize = lotsizes[random(0, lotsizes.length - 1)];

    const exchange = locations[suffix][1];
    const price = randomPrice();
    const supported = random(0, 1) === 1;
    const wishlist = random(0, 1) === 1;

    instrumentsData.push([
      bbg,
      currency,
      description,
      exchange,
      String(isin),
      lotSize,
      ric,
      supported,
      wishlist,
      price,
    ]);
  }
}
// const end = performance.now();
// console.log(`generating 100,000 instruments took ${end - start} ms`);

const instrumentsTable = new Table(
  schemas.instruments,
  instrumentsData,
  buildDataColumnMap(schemas.instruments)
);

export { instrumentsData };
export default instrumentsTable;
