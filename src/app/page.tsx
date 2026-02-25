// src/app/page.tsx
import * as React from "react";
import ProductHero from "@/components/home/ProductHero";
import ProductValues from "@/components/home/ProductValues";
import ProductCategories from "@/components/home/ProductCategories";
import ProductHowItWorks from "@/components/home/ProductHowItWorks";
import ProductCTA from "@/components/home/ProductCTA";
import ProductSmokingHero from "@/components/home/ProductSmokingHero";

import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";

type TrendingSurvey = {
  id: string;
  title: string;
  response_count: number;
  last_response_at: string | null;
};

export default async function HomePage() {
  const supabase = await supabaseServerClient();

  const { data: trending, error } = await supabase.rpc("get_trending_surveys", {
    days: 7,
    lim: 3,
  });

  if (error) {
    console.error("get_trending_surveys error:", error.message);
  }

  const surveys = (trending ?? []) as TrendingSurvey[];

  return (
    <React.Fragment>
      <ProductHero />
      <ProductValues />

      {/* ✅ Replaced “categories images” with your trending surveys (still clickable) */}
      <ProductCategories surveys={surveys} />

      <ProductHowItWorks />

      {/* ✅ Replaced “Receive offers” with an About section + CTA */}
      <ProductCTA />

      {/* ✅ Replaced “Got questions” section with Contact section */}
      <ProductSmokingHero />
    </React.Fragment>
  );
}
