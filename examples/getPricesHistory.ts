import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import {
    ApiKeyCreds,
    Chain,
    ClobClient,
    PriceHistoryFilterParams,
    PriceHistoryInterval,
} from "../src";

dotenvConfig({ path: resolve(__dirname, "../.env") });

async function main() {
    const wallet = new ethers.Wallet(`${process.env.PK}`);
    const chainId = parseInt(`${process.env.CHAIN_ID || Chain.MUMBAI}`) as Chain;
    console.log(`Address: ${await wallet.getAddress()}, chainId: ${chainId}`);

    const host = process.env.CLOB_API_URL || "http://localhost:8080";
    const creds: ApiKeyCreds = {
        key: `${process.env.CLOB_API_KEY}`,
        secret: `${process.env.CLOB_SECRET}`,
        passphrase: `${process.env.CLOB_PASS_PHRASE}`,
    };
    const clobClient = new ClobClient(host, chainId, wallet, creds);

    const YES_TOKEN_ID =
        "1343197538147866997676250008839231694243646439454152539053893078719042421992";
    const NO_TOKEN_ID =
        "16678291189211314787145083999015737376658799626183230671758641503291735614088";

    const yes_prices_history = await clobClient.getPricesHistory({
        startTs: new Date().getTime() / 1000 - 1000,
        endTs: new Date().getTime() / 1000,
        market: YES_TOKEN_ID,
    } as PriceHistoryFilterParams);

    console.log(yes_prices_history);

    const no_prices_history = await clobClient.getPricesHistory({
        startTs: new Date().getTime() / 1000 - 1000,
        endTs: new Date().getTime() / 1000,
        market: NO_TOKEN_ID,
    } as PriceHistoryFilterParams);

    console.log(no_prices_history);

    // intervals
    // ONE HOUR
    const one_hour_history = await clobClient.getPricesHistory({
        market: YES_TOKEN_ID,
        interval: PriceHistoryInterval.ONE_HOUR,
        fidelity: 1,
    } as PriceHistoryFilterParams);

    console.log(one_hour_history);

    // SIX HOURS
    const six_hours_history = await clobClient.getPricesHistory({
        market: YES_TOKEN_ID,
        interval: PriceHistoryInterval.SIX_HOURS,
        fidelity: 3,
    } as PriceHistoryFilterParams);

    console.log(six_hours_history);

    // ONE DAY
    const one_day_history = await clobClient.getPricesHistory({
        market: YES_TOKEN_ID,
        interval: PriceHistoryInterval.ONE_DAY,
        fidelity: 5,
    } as PriceHistoryFilterParams);

    console.log(one_day_history);

    // ONE WEEK
    const one_week_history = await clobClient.getPricesHistory({
        market: YES_TOKEN_ID,
        interval: PriceHistoryInterval.ONE_WEEK,
        fidelity: 10,
    } as PriceHistoryFilterParams);

    console.log(one_week_history);
}

main();
