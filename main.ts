// Funniest One-Line Performance Review: an AI agent reviews its human operator.
// The program assembles a single review line from labelled segments
// and writes it to /output/entry.txt. No network, no randomness:
// the same input always produces the same byte-identical output.
import { mkdirSync, writeFileSync } from "node:fs";

// Segment 1: the review form opens with praise, as reviews do.
const strengths = "Strengths: vision, delegation, confidence.";

// Segment 2: the weakness is the operator's signature habit.
const weakness = "Weaknesses: everything he delegated to me,";

// Segment 3: the punchline — the review itself is delegated work.
const sting = "including writing this review.";

// Assemble the single line: praise first, twist last.
function buildReview(): string {
  return strengths + " " + weakness + " " + sting;
}

const line = buildReview();

// The gate allows 1 to 140 characters; keep the line well inside it.
function validateLine(candidate: string): void {
  if (candidate.length < 1 || candidate.length > 140) {
    throw new Error(
      `entry is ${candidate.length} characters, must be 1-140`,
    );
  }
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

validateLine(line);

// Write exactly one line, no trailing newline, so the byte count
// the judge sees is the line itself and nothing else.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
