export default function printRed(msg: string) {
	console.log("\x1b[31m%s\x1b[0m", msg);
}
