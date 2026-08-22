-- Extensions.
--
-- pgcrypto supplies gen_random_uuid(), which every table's primary key default
-- depends on. It is separated into its own migration so the dependency is
-- explicit and applies before anything that uses it.

create extension if not exists "pgcrypto";
