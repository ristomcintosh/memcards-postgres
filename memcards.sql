--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-08-30 01:18:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2 (class 3079 OID 16808)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 205 (class 1259 OID 16849)
-- Name: decks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.decks (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    user_id integer
);


ALTER TABLE public.decks OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16856)
-- Name: flashcards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.flashcards (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    front character varying NOT NULL,
    back character varying NOT NULL,
    deck_id uuid,
    image_src character varying,
    image_alt character varying,
    image_thumb character varying
);


ALTER TABLE public.flashcards OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16796)
-- Name: login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.login (
    id integer NOT NULL,
    email text NOT NULL,
    hash character varying(100) NOT NULL
);


ALTER TABLE public.login OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16863)
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.login_id_seq OWNER TO postgres;

--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 207
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- TOC entry 204 (class 1259 OID 16802)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100),
    email text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16865)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 208
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2716 (class 2604 OID 16867)
-- Name: login id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- TOC entry 2717 (class 2604 OID 16868)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2729 (class 2606 OID 16870)
-- Name: decks decks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_pkey PRIMARY KEY (id);


--
-- TOC entry 2731 (class 2606 OID 16872)
-- Name: flashcards flashcards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flashcards
    ADD CONSTRAINT flashcards_pkey PRIMARY KEY (id);


--
-- TOC entry 2721 (class 2606 OID 16874)
-- Name: login login_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_email_key UNIQUE (email);


--
-- TOC entry 2723 (class 2606 OID 16876)
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- TOC entry 2725 (class 2606 OID 16878)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2727 (class 2606 OID 16880)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2732 (class 2606 OID 16881)
-- Name: decks decks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.decks
    ADD CONSTRAINT decks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2733 (class 2606 OID 16886)
-- Name: flashcards flashcards_deck_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.flashcards
    ADD CONSTRAINT flashcards_deck_id_fkey FOREIGN KEY (deck_id) REFERENCES public.decks(id);


-- Completed on 2020-08-30 01:18:12

--
-- PostgreSQL database dump complete
--

