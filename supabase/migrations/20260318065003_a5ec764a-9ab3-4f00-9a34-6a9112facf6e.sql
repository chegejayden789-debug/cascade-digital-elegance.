
CREATE TABLE public.customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  review_text text NOT NULL,
  source text DEFAULT 'website',
  is_approved boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews"
ON public.customer_reviews FOR SELECT
TO public
USING (is_approved = true);

-- Anyone can submit a review
CREATE POLICY "Anyone can submit a review"
ON public.customer_reviews FOR INSERT
TO public
WITH CHECK (true);

-- Authenticated users can manage reviews
CREATE POLICY "Authenticated users can update reviews"
ON public.customer_reviews FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
ON public.customer_reviews FOR DELETE
TO authenticated
USING (true);

-- Insert seed reviews
INSERT INTO public.customer_reviews (name, rating, review_text, source, is_approved) VALUES
('Happy Customer', 5, 'The pizza here, you have to travel to Italy to meet its equal...', 'google', true),
('Bridal Party Guest', 5, 'Choosing Cascade for a bridal shower was a great decision... The staff helped with the set-up and made sure we had the best experience, the food was exceptional.', 'google', true),
('Community Supporter', 5, 'I have 5 stars after I learned that they train in-house and offer jobs to most of their staff. Kudos Cascade!', 'google', true),
('Thika Local', 5, 'Wonderful and affordable restaurant in Thika Town. This is so far my favourite restaurant in Thika.', 'google', true),
('Business Diner', 5, 'Great ambience, prompt and professional service. There is enough parking. Quality food at fair prices.', 'google', true),
('Loyal Customer', 5, 'This is one of the best hotels I have been to... the food is very very good, service is world class.', 'google', true);
