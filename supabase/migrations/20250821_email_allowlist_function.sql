-- Create email allowlist function
CREATE OR REPLACE FUNCTION check_email_domain()
RETURNS TRIGGER AS $$
DECLARE
    user_email_domain TEXT;
    allowed_domains TEXT[] := ARRAY[
        'ucdavis.edu',
        'ucla.edu',
        'uci.edu',
        'ucsd.edu',
        'ucsc.edu',
        'ucmerced.edu',
        'berkeley.edu',
        'ucr.edu',
        'ucsb.edu',
        'usc.edu'
    ];
BEGIN
    -- Get the email domain from the new user
    user_email_domain := split_part(NEW.email, '@', 2);
    
    -- Check if the domain is in the allowed list
    IF user_email_domain = ANY(allowed_domains) THEN
        -- Domain is allowed, proceed with user creation
        RAISE LOG 'Email domain % is allowed for user %', user_email_domain, NEW.email;
        RETURN NEW;
    ELSE
        -- Domain is not allowed, prevent user creation
        RAISE LOG 'Email domain % is NOT allowed for user %. User creation blocked.', user_email_domain, NEW.email;
        RAISE EXCEPTION 'Email domain % is not allowed. Only UC school and USC email addresses are permitted.', user_email_domain;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function before user creation
DROP TRIGGER IF EXISTS check_email_domain_trigger ON auth.users;
CREATE TRIGGER check_email_domain_trigger
    BEFORE INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION check_email_domain();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION check_email_domain() TO authenticated;
GRANT EXECUTE ON FUNCTION check_email_domain() TO anon;
