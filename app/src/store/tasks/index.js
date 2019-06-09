import requreDir from "@/util/require-dir";
export default requreDir(require.context(".",false,/task\.ts$/));
