-- Add RLS policy for authenticated users to update reservations
CREATE POLICY "Authenticated users can update reservations"
ON public.reservations
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Add RLS policy for authenticated users to delete reservations
CREATE POLICY "Authenticated users can delete reservations"
ON public.reservations
FOR DELETE
TO authenticated
USING (true);