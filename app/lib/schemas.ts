import { z } from "zod";

/**
 * Coerces the value to an integer between 0 and 100. Models sometimes return
 * numbers as strings or slightly out of range, so we normalise instead of
 * rejecting the whole response.
 */
const scoreSchema = z.coerce
  .number()
  .catch(0)
  .transform((value) => Math.min(100, Math.max(0, Math.round(value))));

const baseTipSchema = {
  type: z.enum(["good", "improve"]).catch("improve"),
  tip: z.string().catch(""),
};

/** ATS tips only need a short label. */
const atsTipSchema = z.object(baseTipSchema);

/** The other sections also carry a longer explanation. */
const detailTipSchema = z.object({
  ...baseTipSchema,
  explanation: z.string().catch(""),
});

const detailSectionSchema = z.object({
  score: scoreSchema,
  tips: z.array(detailTipSchema).catch([]),
});

/**
 * Runtime contract for the JSON returned by the AI. The results page reads
 * `feedback.ATS.score`, `feedback.toneAndStyle.tips`, ... directly, so an
 * incomplete payload would crash the UI.
 */
export const feedbackSchema = z.object({
  overallScore: scoreSchema,
  ATS: z.object({
    score: scoreSchema,
    tips: z.array(atsTipSchema).catch([]),
  }),
  toneAndStyle: detailSectionSchema,
  content: detailSectionSchema,
  structure: detailSectionSchema,
  skills: detailSectionSchema,
});

export type ValidatedFeedback = z.infer<typeof feedbackSchema>;
