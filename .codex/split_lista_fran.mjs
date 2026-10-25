import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "file:///C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const inputPath = "C:/Users/Admin/Downloads/BANCO DE DADOS.xlsx";
const outputDir = "C:/Users/Admin/Documents/GitHub/rbeventos/emails/contatos-hostinger/lista-fran-premium10";
const batchSize = 100;

function csvCell(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function toContact(name, email) {
  const parts = String(name).trim().split(/\s+/);
  return {
    firstName: parts[0] || "Contato",
    lastName: parts.slice(1).join(" "),
    email: String(email).trim().toLowerCase(),
  };
}

const input = await FileBlob.load(inputPath);
const workbook = await SpreadsheetFile.importXlsx(input);
const sheet = workbook.worksheets.getItemAt(0);
const values = sheet.getUsedRange().values;
const headers = values[0].map((value) => String(value).trim().toUpperCase());
const nameIndex = headers.indexOf("NOME");
const emailIndex = headers.indexOf("E-MAIL");

if (nameIndex < 0 || emailIndex < 0) {
  throw new Error("A planilha precisa conter as colunas NOME e E-MAIL.");
}

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const seenEmails = new Set();
const contacts = [];
let invalidRows = 0;
let duplicateRows = 0;

for (const row of values.slice(1)) {
  const name = String(row[nameIndex] ?? "").trim();
  const email = String(row[emailIndex] ?? "").trim().toLowerCase();
  if (!emailPattern.test(email)) {
    invalidRows += 1;
    continue;
  }
  if (seenEmails.has(email)) {
    duplicateRows += 1;
    continue;
  }
  seenEmails.add(email);
  contacts.push(toContact(name, email));
}

await fs.mkdir(outputDir, { recursive: true });

for (let start = 0; start < contacts.length; start += batchSize) {
  const batchNumber = String(start / batchSize + 1).padStart(2, "0");
  const batch = contacts.slice(start, start + batchSize);
  const lines = ["First Name,Last Name,Email"];
  for (const contact of batch) {
    lines.push([contact.firstName, contact.lastName, contact.email].map(csvCell).join(","));
  }
  await fs.writeFile(
    `${outputDir}/lista-fran-${batchNumber}-hostinger.csv`,
    `${lines.join("\r\n")}\r\n`,
    "utf8",
  );
}

workbook.recalculate();
const sourceCheck = await workbook.inspect({
  kind: "table",
  range: "Planilha1!A1:B6",
  include: "values",
  tableMaxRows: 6,
  tableMaxCols: 2,
});

console.log(JSON.stringify({
  sourceRows: values.length - 1,
  uniqueValidContacts: contacts.length,
  invalidRows,
  duplicateRows,
  batches: Math.ceil(contacts.length / batchSize),
  batchSizes: Array.from({ length: Math.ceil(contacts.length / batchSize) }, (_, index) => Math.min(batchSize, contacts.length - index * batchSize)),
  sourceCheck: sourceCheck.ndjson,
}, null, 2));
