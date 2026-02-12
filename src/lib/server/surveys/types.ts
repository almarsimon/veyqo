import "server-only";

export type QuestionType = "single_choice" | "multiple_choice" | "text";

export type CreateSurveyPayload = {
  title: string;
  questions: Array<{
    prompt: string;
    type: QuestionType;
    options?: string[];
  }>;
  mode: "draft" | "publish";
};
