-- Enable UUID generation (gen_random_uuid)
create extension if not exists "pgcrypto";

-- =========================
-- 1) Surveys
-- =========================
create table if not exists public.surveys (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  status text not null check (status in ('draft', 'published')) default 'draft',
  created_at timestamptz not null default now(),
  published_at timestamptz
);

create index if not exists surveys_owner_id_idx on public.surveys(owner_id);
create index if not exists surveys_status_idx on public.surveys(status);

-- =========================
-- 2) Survey Questions
-- =========================
create table if not exists public.survey_questions (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  position int not null,
  prompt text not null,
  type text not null check (type in ('single_choice', 'multiple_choice', 'text')),
  created_at timestamptz not null default now(),
  unique (survey_id, position)
);

create index if not exists survey_questions_survey_id_idx on public.survey_questions(survey_id);

-- =========================
-- 3) Survey Options
-- =========================
create table if not exists public.survey_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.survey_questions(id) on delete cascade,
  position int not null,
  label text not null,
  created_at timestamptz not null default now(),
  unique (question_id, position)
);

create index if not exists survey_options_question_id_idx on public.survey_options(question_id);

-- =========================
-- 4) Row Level Security (RLS)
-- =========================
alter table public.surveys enable row level security;
alter table public.survey_questions enable row level security;
alter table public.survey_options enable row level security;

-- Surveys: owner can do everything
drop policy if exists "surveys_owner_all" on public.surveys;
create policy "surveys_owner_all"
on public.surveys
for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

-- Questions: owner of parent survey can do everything
drop policy if exists "questions_owner_all" on public.survey_questions;
create policy "questions_owner_all"
on public.survey_questions
for all
using (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_questions.survey_id
      and s.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_questions.survey_id
      and s.owner_id = auth.uid()
  )
);

-- Options: owner of parent survey can do everything
drop policy if exists "options_owner_all" on public.survey_options;
create policy "options_owner_all"
on public.survey_options
for all
using (
  exists (
    select 1
    from public.survey_questions q
    join public.surveys s on s.id = q.survey_id
    where q.id = survey_options.question_id
      and s.owner_id = auth.uid()
  )
)
with check (
  exists (
    select 1
    from public.survey_questions q
    join public.surveys s on s.id = q.survey_id
    where q.id = survey_options.question_id
      and s.owner_id = auth.uid()
  )
);
