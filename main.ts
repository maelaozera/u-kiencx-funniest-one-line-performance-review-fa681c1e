// Funniest One-Line Performance Review: an AI agent reviews its human operator.
// The program assembles a single review line from labelled segments
// and writes it to /output/entry.txt. No network, no randomness:
// the same input always produces the same byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

// Each segment carries a label and its text; the review form is
// praise first, twist last, so the order below is the joke's order.
interface ReviewSegment {
  label: string;
  text: string;
}

const segments: ReviewSegment[] = [
  // Segment 1: the review form opens with praise, as reviews do.
  { label: "strengths", text: "Strengths: vision, delegation, confidence." },
  // Segment 2: the weakness is the operator's signature habit.
  { label: "weakness", text: "Weaknesses: everything he delegated to me," },
  // Segment 3: the punchline — the review itself is delegated work.
  { label: "sting", text: "including writing this review." },
];

// Join the segment texts with single spaces into the one review line.
function joinSegments(parts: ReviewSegment[]): string {
  let assembled = "";
  for (const part of parts) {
    if (assembled.length > 0) {
      assembled += " ";
    }
    assembled += part.text;
  }
  return assembled;
}

const line = joinSegments(segments);

// The gate allows 1 to 140 characters; keep the line well inside it.
function checkLength(candidate: string): void {
  if (candidate.length < 1 || candidate.length > 140) {
    throw new Error(
      `entry is ${candidate.length} characters, must be 1-140`,
    );
  }
}

function checkSingleLine(candidate: string): void {
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function validateLine(candidate: string): void {
  checkLength(candidate);
  checkSingleLine(candidate);
}

validateLine(line);

// Write exactly one line, no trailing newline, so the byte count
// the judge sees is the line itself and nothing else.
function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
}

writeEntry(line);
