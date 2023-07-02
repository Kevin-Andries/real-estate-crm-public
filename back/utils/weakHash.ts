import { createHash } from "crypto";

export default function weakHash(str: string) {
	return createHash("sha256").update(str.toString()).digest("hex");
}
