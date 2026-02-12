-- Survey responses (one per user per survey)
create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (survey_id, user_id)
);

-- Answers
create table if not exists public.survey_answers (
  id uuid primary key default gen_random_uuid(),
  response_id uuid not null references public.survey_responses(id) on delete cascade,
  question_id uuid not null references public.survey_questions(id) on delete cascade,
  option_id uuid references public.survey_options(id),
  text_answer text,
  created_at timestamptz not null default now()
);

-- RLS
alter table public.survey_responses enable row level security;
alter table public.survey_answers enable row level security;

-- Logged-in users can submit their own responses
create policy "responses_insert_own"
on public.survey_responses
for insert
with check (auth.uid() = user_id);

create policy "answers_insert_own"
on public.survey_answers
for insert
with check (
  exists (
    select 1
    from public.survey_responses r
    where r.id = survey_answers.response_id
      and r.user_id = auth.uid()
  )
);


------------------------------------------------------------------------

drop policy if exists "responses_insert_own" on public.survey_responses;


create policy "responses_select_own"
on public.survey_responses
for select
using (auth.uid() = user_id);

create policy "answers_select_own"
on public.survey_answers
for select
using (
  exists (
    select 1
    from public.survey_responses r
    where r.id = survey_answers.response_id
      and r.user_id = auth.uid()
  )
);