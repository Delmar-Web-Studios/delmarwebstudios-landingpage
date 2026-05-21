-- Seed two super_admin accounts with confirmed email
DO $$
DECLARE
  uid uuid;
  emails text[] := ARRAY['info@delmarwebstudios.qzz.io', 'ceo@delmarwebstudios.qzz.io'];
  em text;
BEGIN
  FOREACH em IN ARRAY emails LOOP
    SELECT id INTO uid FROM auth.users WHERE email = em LIMIT 1;
    IF uid IS NULL THEN
      uid := gen_random_uuid();
      INSERT INTO auth.users (
        instance_id, id, aud, role, email, encrypted_password,
        email_confirmed_at, created_at, updated_at,
        raw_app_meta_data, raw_user_meta_data,
        confirmation_token, email_change, email_change_token_new, recovery_token
      ) VALUES (
        '00000000-0000-0000-0000-000000000000', uid, 'authenticated', 'authenticated',
        em, crypt('delmarwebstudios@2026', gen_salt('bf')),
        now(), now(), now(),
        '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
        '', '', '', ''
      );
      INSERT INTO auth.identities (
        id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at
      ) VALUES (
        gen_random_uuid(), uid, uid,
        jsonb_build_object('sub', uid::text, 'email', em, 'email_verified', true),
        'email', now(), now(), now()
      );
    ELSE
      UPDATE auth.users
      SET encrypted_password = crypt('delmarwebstudios@2026', gen_salt('bf')),
          email_confirmed_at = COALESCE(email_confirmed_at, now()),
          updated_at = now()
      WHERE id = uid;
    END IF;

    INSERT INTO public.profiles (user_id, email, display_name)
    VALUES (uid, em, split_part(em, '@', 1))
    ON CONFLICT DO NOTHING;

    INSERT INTO public.user_roles (user_id, role)
    VALUES (uid, 'super_admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END LOOP;
END $$;