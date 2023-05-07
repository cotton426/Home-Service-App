import Omise from "omise";
import * as dotenv from "dotenv";

dotenv.config();

const publicKey = process.env.OMISE_PUBLIC_KEY;
const secretKey = process.env.OMISE_SECRET_KEY;
const omise = new Omise({ publicKey, secretKey });

export { omise };
