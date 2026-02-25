create or replace function public.get_trending_surveys(
  days integer default 7,
  lim integer default 3
)
returns table (
  id uuid,
  title text,
  response_count bigint,
  last_response_at timestamptz
)
language sql
stable
as $$
  select
    s.id,
    s.title,
    count(r.id) as response_count,
    max(r.created_at) as last_response_at
  from public.surveys s
  left join public.survey_responses r
    on r.survey_id = s.id
   and r.created_at >= now() - (days || ' days')::interval
  group by s.id, s.title
  order by response_count desc, last_response_at desc nulls last
  limit lim;
$$;

create index if not exists survey_responses_survey_id_created_at_idx
on public.survey_responses (survey_id, created_at desc);
