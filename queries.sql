DROP TABLE IF EXISTS
    match_team,
    match,
    group_team,
    groups,
    tournament,
    team
CASCADE;

CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    flag_url VARCHAR(100) NOT NULL,
    code CHAR(2) NOT NULL UNIQUE
);

CREATE TABLE tournament (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,

    CONSTRAINT unique_tournament
        UNIQUE (name, year)
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,

    tournament_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    code CHAR(1) NOT NULL,

    CONSTRAINT fk_group_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournament(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_group
        UNIQUE (tournament_id, code)
);

CREATE TABLE group_team (
    group_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,

    PRIMARY KEY (group_id, team_id),

    CONSTRAINT fk_group_team_group
        FOREIGN KEY (group_id)
        REFERENCES groups(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group_team_team
        FOREIGN KEY (team_id)
        REFERENCES team(id)
        ON DELETE CASCADE
);

CREATE TABLE match (
    id SERIAL PRIMARY KEY,

    tournament_id INTEGER NOT NULL,
    round VARCHAR(100) NOT NULL,
    group_id INTEGER,

    match_number INTEGER NOT NULL,

    match_time TIME,
    match_date DATE,

    status VARCHAR(10) NOT NULL DEFAULT 'scheduled',

    home_score INTEGER,
    away_score INTEGER,

    CONSTRAINT fk_match_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournament(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_match_group
        FOREIGN KEY (group_id)
        REFERENCES groups(id)
        ON DELETE RESTRICT,

    CONSTRAINT valid_status
        CHECK (
            status IN ('scheduled', 'played')
        ),

    CONSTRAINT valid_home_score
        CHECK (home_score IS NULL OR home_score >= 0),

    CONSTRAINT valid_away_score
        CHECK (away_score IS NULL OR away_score >= 0),

    CONSTRAINT unique_match_number
        UNIQUE (tournament_id, round, match_number),
    CONSTRAINT valid_round
        CHECK (
            round IN (
                'GROUP_STAGE',
                'ROUND_OF_32',
                'ROUND_OF_16',
                'QUARTERFINAL',
                'SEMIFINAL',
                'FINAL'
            )
        )
);

CREATE TABLE match_team (
    id SERIAL PRIMARY KEY,

    match_id INTEGER NOT NULL,

    slot VARCHAR(10) NOT NULL,

    team_id INTEGER,

    source VARCHAR(10),

    CONSTRAINT fk_participant_match
        FOREIGN KEY (match_id)
        REFERENCES match(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_participant_team
        FOREIGN KEY (team_id)
        REFERENCES team(id)
        ON DELETE RESTRICT,

    CONSTRAINT valid_slot
        CHECK (slot IN ('home', 'away')),

    CONSTRAINT participant_source
        CHECK (
            team_id IS NOT NULL
            OR source IS NOT NULL
        ),

    CONSTRAINT unique_match_slot
        UNIQUE (match_id, slot)
);

---------------------------------------------------------------------------------------------------


INSERT INTO team (
    name,
    flag_url,
    code
)
VALUES
    (
        'Mexico',
        'https://flagsapi.com/MX/flat/64.png',
        'MX'
    ),(
        'Corea del Sur',
        'https://flagsapi.com/KR/flat/64.png',
        'KR'
    ),(
        'Sudafrica',
        'https://flagsapi.com/ZA/flat/64.png',
        'ZA'
    ),(
        'Chequia',
        'https://flagsapi.com/CZ/flat/64.png',
        'CZ'
    ),(
        'Canada',
        'https://flagsapi.com/CA/flat/64.png',
        'CA'
    ),(
        'Bosnia y Herzegovina',
        'https://flagsapi.com/BA/flat/64.png',
        'BA'
    ),(
        'Catar',
        'https://flagsapi.com/QA/flat/64.png',
        'QA'
    ),(
        'Suiza',
        'https://flagsapi.com/CH/flat/64.png',
        'CH'
    ),(
        'Brasil',
        'https://flagsapi.com/BR/flat/64.png',
        'BR'
    ),(
        'Marruecos',
        'https://flagsapi.com/MA/flat/64.png',
        'MA'
    ),(
        'Escocia',
        'images/scotlandflag.webp',
        'UK'
    ),(
        'Haiti',
        'https://flagsapi.com/HT/flat/64.png',
        'HT'
    ),(
        'Estados Unidos',
        'https://flagsapi.com/US/flat/64.png',
        'US'
    ),(
        'Australia',
        'https://flagsapi.com/AU/flat/64.png',
        'AU'
    ),(
        'Paraguay',
        'https://flagsapi.com/PY/flat/64.png',
        'PY'
    ),(
        'Turquia',
        'https://flagsapi.com/TR/flat/64.png',
        'TR'
    ),(
        'Alemania',
        'https://flagsapi.com/DE/flat/64.png',
        'DE'
    ),(
        'Ecuador',
        'https://flagsapi.com/EC/flat/64.png',
        'EC'
    ),(
        'Costa de Marfil',
        'https://flagsapi.com/CI/flat/64.png',
        'CI'
    ),(
        'Curazao',
        'https://flagsapi.com/CW/flat/64.png',
        'CW'
    ),(
        'Paises Bajos',
        'https://flagsapi.com/NL/flat/64.png',
        'NL'
    ),(
        'Japon',
        'https://flagsapi.com/JP/flat/64.png',
        'JP'
    ),(
        'Tunez',
        'https://flagsapi.com/TN/flat/64.png',
        'TN'
    ),(
        'Suecia',
        'https://flagsapi.com/SE/flat/64.png',
        'SE'
    ),(
        'Belgica',
        'https://flagsapi.com/BE/flat/64.png',
        'BE'
    ),(
        'Iran',
        'https://flagsapi.com/IR/flat/64.png',
        'IR'
    ),(
        'Egipto',
        'https://flagsapi.com/EG/flat/64.png',
        'EG'
    ),(
        'Nueva Zelanda',
        'https://flagsapi.com/NZ/flat/64.png',
        'NZ'
    ),(
        'España',
        'https://flagsapi.com/ES/flat/64.png',
        'ES'
    ),(
        'Uruguay',
        'https://flagsapi.com/UY/flat/64.png',
        'UY'
    ),(
        'Arabia Saudita',
        'https://flagsapi.com/SA/flat/64.png',
        'SA'
    ),(
        'Cabo Verde',
        'https://flagsapi.com/CV/flat/64.png',
        'CV'
    ),(
        'Francia',
        'https://flagsapi.com/FR/flat/64.png',
        'FR'
    ),(
        'Senegal',
        'https://flagsapi.com/SN/flat/64.png',
        'SN'
    ),(
        'Noruega',
        'https://flagsapi.com/NO/flat/64.png',
        'NO'
    ),(
        'Irak',
        'https://flagsapi.com/IQ/flat/64.png',
        'IQ'
    ),(
        'Argentina',
        'https://flagsapi.com/AR/flat/64.png',
        'AR'
    ),(
        'Austria',
        'https://flagsapi.com/AT/flat/64.png',
        'AT'
    ),(
        'Argelia',
        'https://flagsapi.com/DZ/flat/64.png',
        'DZ'
    ),(
        'Jordania',
        'https://flagsapi.com/JO/flat/64.png',
        'JO'
    ),(
        'Portugal',
        'https://flagsapi.com/PT/flat/64.png',
        'PT'
    ),(
        'Colombia',
        'https://flagsapi.com/CO/flat/64.png',
        'CO'
    ),(
        'Uzbekistan',
        'https://flagsapi.com/UZ/flat/64.png',
        'UZ'
    ),(
        'RD Congo',
        'https://flagsapi.com/CD/flat/64.png',
        'CD'
    ),(
        'Inglaterra',
        'https://flagsapi.com/GB/flat/64.png',
        'GB'
    ),(
        'Croacia',
        'https://flagsapi.com/HR/flat/64.png',
        'HR'
    ),(
        'Panama',
        'https://flagsapi.com/PA/flat/64.png',
        'PA'
    ),(
        'Ghana',
        'https://flagsapi.com/GH/flat/64.png',
        'GH'
    );

INSERT INTO tournament (name, year)
VALUES ('FIFA World Cup', 2026);

INSERT INTO groups (
    tournament_id,
    name,
    code
)
VALUES (
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group A',
    'A'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group B',
    'B'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group C',
    'C'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group D',
    'D'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group E',
    'E'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group F',
    'F'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group G',
    'G'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group H',
    'H'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group I',
    'I'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group J',
    'J'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group K',
    'K'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'Group L',
    'L'
);

INSERT INTO group_team (
    group_id,
    team_id
)
VALUES (
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'MX')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'KR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'ZA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'CZ')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'CA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'BA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'QA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'CH')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'BR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'MA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'UK')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'HT')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'US')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'AU')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'PY')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'TR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'DE')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'EC')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'CI')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'CW')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'NL')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'JP')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'TN')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'SE')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'BE')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'IR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'EG')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'NZ')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'ES')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'UY')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'SA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'CV')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'FR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'SN')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'NO')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'IQ')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'AR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'AT')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'DZ')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'JO')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'PT')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'CO')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'UZ')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'CD')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'GB')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'HR')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'PA')
    ),(
        (SELECT id
         FROM groups
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'GH')
    );

INSERT INTO match (
    tournament_id,
    round,
    group_id,
    match_number,
    match_time,
    match_date
)
VALUES (
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    1,
    '21:00',
    '2026-06-11'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    2,
    '04:00',
    '2026-06-12'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    3,
    '21:00',
    '2026-06-12'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    4,
    '03:00',
    '2026-06-13'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    5,
    '21:00',
    '2026-06-13'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    6,
    '00:00',
    '2026-06-14'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    7,
    '03:00',
    '2026-06-14'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    8,
    '06:00',
    '2026-06-14'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    9,
    '19:00',
    '2026-06-14'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    10,
    '22:00',
    '2026-06-14'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    11,
    '01:00',
    '2026-06-15'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    12,
    '04:00',
    '2026-06-15'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    13,
    '18:00',
    '2026-06-15'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    14,
    '21:00',
    '2026-06-15'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    15,
    '00:00',
    '2026-06-16'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    16,
    '03:00',
    '2026-06-16'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    17,
    '21:00',
    '2026-06-16'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    18,
    '00:00',
    '2026-06-17'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    19,
    '03:00',
    '2026-06-17'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    20,
    '06:00',
    '2026-06-17'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    21,
    '19:00',
    '2026-06-17'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    22,
    '22:00',
    '2026-06-17'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    23,
    '01:00',
    '2026-06-18'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    24,
    '04:00',
    '2026-06-18'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    25,
    '18:00',
    '2026-06-18'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    26,
    '21:00',
    '2026-06-18'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    27,
    '00:00',
    '2026-06-19'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    28,
    '03:00',
    '2026-06-19'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    29,
    '21:00',
    '2026-06-19'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    30,
    '00:00',
    '2026-06-20'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    31,
    '02:30',
    '2026-06-20'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    32,
    '05:00',
    '2026-06-20'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    33,
    '19:00',
    '2026-06-20'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    34,
    '22:00',
    '2026-06-20'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    35,
    '02:00',
    '2026-06-21'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    36,
    '06:00',
    '2026-06-21'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    37,
    '18:00',
    '2026-06-21'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    38,
    '21:00',
    '2026-06-21'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    39,
    '00:00',
    '2026-06-22'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    40,
    '03:00',
    '2026-06-22'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    41,
    '19:00',
    '2026-06-22'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    42,
    '23:00',
    '2026-06-22'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    43,
    '02:00',
    '2026-06-23'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    44,
    '05:00',
    '2026-06-23'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    45,
    '19:00',
    '2026-06-23'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    46,
    '22:00',
    '2026-06-23'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    47,
    '01:00',
    '2026-06-24'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    48,
    '04:00',
    '2026-06-24'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    49,
    '21:00',
    '2026-06-24'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'B'),
    50,
    '21:00',
    '2026-06-24'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    51,
    '00:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'C'),
    52,
    '00:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    53,
    '03:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'A'),
    54,
    '03:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    55,
    '22:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'E'),
    56,
    '22:00',
    '2026-06-25'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    57,
    '01:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'F'),
    58,
    '01:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    59,
    '04:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'D'),
    60,
    '04:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    61,
    '21:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'I'),
    62,
    '21:00',
    '2026-06-26'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    63,
    '02:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'H'),
    64,
    '02:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    65,
    '05:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'G'),
    66,
    '05:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    67,
    '23:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'L'),
    68,
    '23:00',
    '2026-06-27'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    69,
    '01:30',
    '2026-06-28'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'K'),
    70,
    '01:30',
    '2026-06-28'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    71,
    '04:00',
    '2026-06-28'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'GROUP_STAGE',
    (SELECT id
     FROM groups
     WHERE tournament_id = 1
     AND code = 'J'),
    72,
    '04:00',
    '2026-06-28'
),(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    73,
    '21:00',
    '2026-06-29'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    74,
    '21:00',
    '2026-06-30'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    75,
    '21:00',
    '2026-06-28'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    76,
    '21:00',
    '2026-06-29'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    77,
    '21:00',
    '2026-07-02'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    78,
    '21:00',
    '2026-07-02'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    79,
    '21:00',
    '2026-07-01'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    80,
    '21:00',
    '2026-07-01'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    81,
    '21:00',
    '2026-06-29'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    82,
    '21:00',
    '2026-06-30'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    83,
    '21:00',
    '2026-06-30'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    84,
    '21:00',
    '2026-07-01'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    85,
    '21:00',
    '2026-07-03'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    86,
    '21:00',
    '2026-07-03'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    87,
    '21:00',
    '2026-07-02'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_32',
    null,
    88,
    '21:00',
    '2026-07-02'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    89,
    '21:00',
    '2026-07-05'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    90,
    '21:00',
    '2026-07-05'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    91,
    '21:00',
    '2026-07-06'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    92,
    '21:00',
    '2026-07-06'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    93,
    '21:00',
    '2026-07-07'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    94,
    '21:00',
    '2026-07-07'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    95,
    '21:00',
    '2026-07-08'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'ROUND_OF_16',
    null,
    96,
    '21:00',
    '2026-07-08'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'QUARTERFINAL',
    null,
    97,
    '21:00',
    '2026-07-11'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'QUARTERFINAL',
    null,
    98,
    '21:00',
    '2026-07-11'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'QUARTERFINAL',
    null,
    99,
    '21:00',
    '2026-07-12'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'QUARTERFINAL',
    null,
    100,
    '21:00',
    '2026-07-12'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'SEMIFINAL',
    null,
    101,
    '21:00',
    '2026-07-17'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'SEMIFINAL',
    null,
    102,
    '21:00',
    '2026-07-16'
),
(
    (SELECT id
 FROM tournament
 WHERE name = 'FIFA World Cup'
 AND year = 2026),
    'FINAL',
    null,
    103,
    '21:00',
    '2026-07-19'
);

INSERT INTO match_team (
    match_id,
    slot,
    team_id,
    source
)
VALUES (
    1,
    'home',
    (SELECT id FROM team WHERE code = 'MX'),
    null
),(
    1,
    'away',
    (SELECT id FROM team WHERE code = 'ZA'),
    null
),(
    2,
    'home',
    (SELECT id FROM team WHERE code = 'KR'),
    null
),(
    2,
    'away',
    (SELECT id FROM team WHERE code = 'CZ'),
    null
),(
    3,
    'home',
    (SELECT id FROM team WHERE code = 'CA'),
    null
),(
    3,
    'away',
    (SELECT id FROM team WHERE code = 'BA'),
    null
),(
    4,
    'home',
    (SELECT id FROM team WHERE code = 'US'),
    null
),(
    4,
    'away',
    (SELECT id FROM team WHERE code = 'PY'),
    null
),(
    5,
    'home',
    (SELECT id FROM team WHERE code = 'QA'),
    null
),(
    5,
    'away',
    (SELECT id FROM team WHERE code = 'CH'),
    null
),(
    6,
    'home',
    (SELECT id FROM team WHERE code = 'BR'),
    null
),(
    6,
    'away',
    (SELECT id FROM team WHERE code = 'MA'),
    null
),(
    7,
    'home',
    (SELECT id FROM team WHERE code = 'HT'),
    null
),(
    7,
    'away',
    (SELECT id FROM team WHERE code = 'UK'),
    null
),(
    8,
    'home',
    (SELECT id FROM team WHERE code = 'AU'),
    null
),(
    8,
    'away',
    (SELECT id FROM team WHERE code = 'TR'),
    null
),(
    9,
    'home',
    (SELECT id FROM team WHERE code = 'DE'),
    null
),(
    9,
    'away',
    (SELECT id FROM team WHERE code = 'CW'),
    null
),(
    10,
    'home',
    (SELECT id FROM team WHERE code = 'NL'),
    null
),(
    10,
    'away',
    (SELECT id FROM team WHERE code = 'JP'),
    null
),(
    11,
    'home',
    (SELECT id FROM team WHERE code = 'CI'),
    null
),(
    11,
    'away',
    (SELECT id FROM team WHERE code = 'EC'),
    null
),(
    12,
    'home',
    (SELECT id FROM team WHERE code = 'SE'),
    null
),(
    12,
    'away',
    (SELECT id FROM team WHERE code = 'TN'),
    null
),(
    13,
    'home',
    (SELECT id FROM team WHERE code = 'ES'),
    null
),(
    13,
    'away',
    (SELECT id FROM team WHERE code = 'CV'),
    null
),(
    14,
    'home',
    (SELECT id FROM team WHERE code = 'BE'),
    null
),(
    14,
    'away',
    (SELECT id FROM team WHERE code = 'EG'),
    null
),(
    15,
    'home',
    (SELECT id FROM team WHERE code = 'SA'),
    null
),(
    15,
    'away',
    (SELECT id FROM team WHERE code = 'UY'),
    null
),(
    16,
    'home',
    (SELECT id FROM team WHERE code = 'IR'),
    null
),(
    16,
    'away',
    (SELECT id FROM team WHERE code = 'NZ'),
    null
),(
    17,
    'home',
    (SELECT id FROM team WHERE code = 'FR'),
    null
),(
    17,
    'away',
    (SELECT id FROM team WHERE code = 'SN'),
    null
),(
    18,
    'home',
    (SELECT id FROM team WHERE code = 'IQ'),
    null
),(
    18,
    'away',
    (SELECT id FROM team WHERE code = 'NO'),
    null
),(
    19,
    'home',
    (SELECT id FROM team WHERE code = 'AR'),
    null
),(
    19,
    'away',
    (SELECT id FROM team WHERE code = 'DZ'),
    null
),(
    20,
    'home',
    (SELECT id FROM team WHERE code = 'AT'),
    null
),(
    20,
    'away',
    (SELECT id FROM team WHERE code = 'JO'),
    null
),(
    21,
    'home',
    (SELECT id FROM team WHERE code = 'PT'),
    null
),(
    21,
    'away',
    (SELECT id FROM team WHERE code = 'CD'),
    null
),(
    22,
    'home',
    (SELECT id FROM team WHERE code = 'GB'),
    null
),(
    22,
    'away',
    (SELECT id FROM team WHERE code = 'HR'),
    null
),(
    23,
    'home',
    (SELECT id FROM team WHERE code = 'GH'),
    null
),(
    23,
    'away',
    (SELECT id FROM team WHERE code = 'PA'),
    null
),(
    24,
    'home',
    (SELECT id FROM team WHERE code = 'UZ'),
    null
),(
    24,
    'away',
    (SELECT id FROM team WHERE code = 'CO'),
    null
),(
    25,
    'home',
    (SELECT id FROM team WHERE code = 'CZ'),
    null
),(
    25,
    'away',
    (SELECT id FROM team WHERE code = 'ZA'),
    null
),(
    26,
    'home',
    (SELECT id FROM team WHERE code = 'CH'),
    null
),(
    26,
    'away',
    (SELECT id FROM team WHERE code = 'BA'),
    null
),(
    27,
    'home',
    (SELECT id FROM team WHERE code = 'CA'),
    null
),(
    27,
    'away',
    (SELECT id FROM team WHERE code = 'QA'),
    null
),(
    28,
    'home',
    (SELECT id FROM team WHERE code = 'MX'),
    null
),(
    28,
    'away',
    (SELECT id FROM team WHERE code = 'KR'),
    null
),(
    29,
    'home',
    (SELECT id FROM team WHERE code = 'US'),
    null
),(
    29,
    'away',
    (SELECT id FROM team WHERE code = 'AU'),
    null
),(
    30,
    'home',
    (SELECT id FROM team WHERE code = 'UK'),
    null
),(
    30,
    'away',
    (SELECT id FROM team WHERE code = 'MA'),
    null
),(
    31,
    'home',
    (SELECT id FROM team WHERE code = 'BR'),
    null
),(
    31,
    'away',
    (SELECT id FROM team WHERE code = 'HT'),
    null
),(
    32,
    'home',
    (SELECT id FROM team WHERE code = 'TR'),
    null
),(
    32,
    'away',
    (SELECT id FROM team WHERE code = 'PY'),
    null
),(
    33,
    'home',
    (SELECT id FROM team WHERE code = 'NL'),
    null
),(
    33,
    'away',
    (SELECT id FROM team WHERE code = 'SE'),
    null
),(
    34,
    'home',
    (SELECT id FROM team WHERE code = 'DE'),
    null
),(
    34,
    'away',
    (SELECT id FROM team WHERE code = 'CI'),
    null
),(
    35,
    'home',
    (SELECT id FROM team WHERE code = 'EC'),
    null
),(
    35,
    'away',
    (SELECT id FROM team WHERE code = 'CW'),
    null
),(
    36,
    'home',
    (SELECT id FROM team WHERE code = 'TN'),
    null
),(
    36,
    'away',
    (SELECT id FROM team WHERE code = 'JP'),
    null
),(
    37,
    'home',
    (SELECT id FROM team WHERE code = 'ES'),
    null
),(
    37,
    'away',
    (SELECT id FROM team WHERE code = 'SA'),
    null
),(
    38,
    'home',
    (SELECT id FROM team WHERE code = 'BE'),
    null
),(
    38,
    'away',
    (SELECT id FROM team WHERE code = 'IR'),
    null
),(
    39,
    'home',
    (SELECT id FROM team WHERE code = 'UY'),
    null
),(
    39,
    'away',
    (SELECT id FROM team WHERE code = 'CV'),
    null
),(
    40,
    'home',
    (SELECT id FROM team WHERE code = 'NZ'),
    null
),(
    40,
    'away',
    (SELECT id FROM team WHERE code = 'EG'),
    null
),(
    41,
    'home',
    (SELECT id FROM team WHERE code = 'AR'),
    null
),(
    41,
    'away',
    (SELECT id FROM team WHERE code = 'AT'),
    null
),(
    42,
    'home',
    (SELECT id FROM team WHERE code = 'FR'),
    null
),(
    42,
    'away',
    (SELECT id FROM team WHERE code = 'IQ'),
    null
),(
    43,
    'home',
    (SELECT id FROM team WHERE code = 'NO'),
    null
),(
    43,
    'away',
    (SELECT id FROM team WHERE code = 'SN'),
    null
),(
    44,
    'home',
    (SELECT id FROM team WHERE code = 'JO'),
    null
),(
    44,
    'away',
    (SELECT id FROM team WHERE code = 'DZ'),
    null
),(
    45,
    'home',
    (SELECT id FROM team WHERE code = 'PT'),
    null
),(
    45,
    'away',
    (SELECT id FROM team WHERE code = 'UZ'),
    null
),(
    46,
    'home',
    (SELECT id FROM team WHERE code = 'GB'),
    null
),(
    46,
    'away',
    (SELECT id FROM team WHERE code = 'GH'),
    null
),(
    47,
    'home',
    (SELECT id FROM team WHERE code = 'PA'),
    null
),(
    47,
    'away',
    (SELECT id FROM team WHERE code = 'HR'),
    null
),(
    48,
    'home',
    (SELECT id FROM team WHERE code = 'CO'),
    null
),(
    48,
    'away',
    (SELECT id FROM team WHERE code = 'CD'),
    null
),(
    49,
    'home',
    (SELECT id FROM team WHERE code = 'CH'),
    null
),(
    49,
    'away',
    (SELECT id FROM team WHERE code = 'CA'),
    null
),(
    50,
    'home',
    (SELECT id FROM team WHERE code = 'BA'),
    null
),(
    50,
    'away',
    (SELECT id FROM team WHERE code = 'QA'),
    null
),(
    51,
    'home',
    (SELECT id FROM team WHERE code = 'MA'),
    null
),(
    51,
    'away',
    (SELECT id FROM team WHERE code = 'HT'),
    null
),(
    52,
    'home',
    (SELECT id FROM team WHERE code = 'UK'),
    null
),(
    52,
    'away',
    (SELECT id FROM team WHERE code = 'BR'),
    null
),(
    53,
    'home',
    (SELECT id FROM team WHERE code = 'ZA'),
    null
),(
    53,
    'away',
    (SELECT id FROM team WHERE code = 'KR'),
    null
),(
    54,
    'home',
    (SELECT id FROM team WHERE code = 'CZ'),
    null
),(
    54,
    'away',
    (SELECT id FROM team WHERE code = 'MX'),
    null
),(
    55,
    'home',
    (SELECT id FROM team WHERE code = 'CW'),
    null
),(
    55,
    'away',
    (SELECT id FROM team WHERE code = 'CI'),
    null
),(
    56,
    'home',
    (SELECT id FROM team WHERE code = 'EC'),
    null
),(
    56,
    'away',
    (SELECT id FROM team WHERE code = 'DE'),
    null
),(
    57,
    'home',
    (SELECT id FROM team WHERE code = 'TN'),
    null
),(
    57,
    'away',
    (SELECT id FROM team WHERE code = 'NL'),
    null
),(
    58,
    'home',
    (SELECT id FROM team WHERE code = 'JP'),
    null
),(
    58,
    'away',
    (SELECT id FROM team WHERE code = 'SE'),
    null
),(
    59,
    'home',
    (SELECT id FROM team WHERE code = 'TR'),
    null
),(
    59,
    'away',
    (SELECT id FROM team WHERE code = 'US'),
    null
),(
    60,
    'home',
    (SELECT id FROM team WHERE code = 'PY'),
    null
),(
    60,
    'away',
    (SELECT id FROM team WHERE code = 'AU'),
    null
),(
    61,
    'home',
    (SELECT id FROM team WHERE code = 'NO'),
    null
),(
    61,
    'away',
    (SELECT id FROM team WHERE code = 'FR'),
    null
),(
    62,
    'home',
    (SELECT id FROM team WHERE code = 'SN'),
    null
),(
    62,
    'away',
    (SELECT id FROM team WHERE code = 'IQ'),
    null
),(
    63,
    'home',
    (SELECT id FROM team WHERE code = 'CV'),
    null
),(
    63,
    'away',
    (SELECT id FROM team WHERE code = 'SA'),
    null
),(
    64,
    'home',
    (SELECT id FROM team WHERE code = 'UY'),
    null
),(
    64,
    'away',
    (SELECT id FROM team WHERE code = 'ES'),
    null
),(
    65,
    'home',
    (SELECT id FROM team WHERE code = 'NZ'),
    null
),(
    65,
    'away',
    (SELECT id FROM team WHERE code = 'BE'),
    null
),(
    66,
    'home',
    (SELECT id FROM team WHERE code = 'EG'),
    null
),(
    66,
    'away',
    (SELECT id FROM team WHERE code = 'IR'),
    null
),(
    67,
    'home',
    (SELECT id FROM team WHERE code = 'PA'),
    null
),(
    67,
    'away',
    (SELECT id FROM team WHERE code = 'GB'),
    null
),(
    68,
    'home',
    (SELECT id FROM team WHERE code = 'HR'),
    null
),(
    68,
    'away',
    (SELECT id FROM team WHERE code = 'GH'),
    null
),(
    69,
    'home',
    (SELECT id FROM team WHERE code = 'CO'),
    null
),(
    69,
    'away',
    (SELECT id FROM team WHERE code = 'PT'),
    null
),(
    70,
    'home',
    (SELECT id FROM team WHERE code = 'CD'),
    null
),(
    70,
    'away',
    (SELECT id FROM team WHERE code = 'UZ'),
    null
),(
    71,
    'home',
    (SELECT id FROM team WHERE code = 'DZ'),
    null
),(
    71,
    'away',
    (SELECT id FROM team WHERE code = 'AT'),
    null
),(
    72,
    'home',
    (SELECT id FROM team WHERE code = 'JO'),
    null
),(
    72,
    'away',
    (SELECT id FROM team WHERE code = 'AR'),
    null
),(
    73,
    'home',
    null,
    '1E'
),
(
    73,
    'away',
    null,
    'third'
),
(
    74,
    'home',
    null,
    '1I'
),
(
    74,
    'away',
    null,
    'third'
),
(
    75,
    'home',
    null,
    '2A'
),
(
    75,
    'away',
    null,
    '2B'
),
(
    76,
    'home',
    null,
    '1F'
),
(
    76,
    'away',
    null,
    '2C'
),
(
    77,
    'home',
    null,
    '2K'
),
(
    77,
    'away',
    null,
    '2L'
),
(
    78,
    'home',
    null,
    '1H'
),
(
    78,
    'away',
    null,
    '2J'
),
(
    79,
    'home',
    null,
    '1D'
),
(
    79,
    'away',
    null,
    'third'
),
(
    80,
    'home',
    null,
    '1G'
),
(
    80,
    'away',
    null,
    'third'
),
(
    81,
    'home',
    null,
    '1C'
),
(
    81,
    'away',
    null,
    '2F'
),
(
    82,
    'home',
    null,
    '2E'
),
(
    82,
    'away',
    null,
    '2I'
),
(
    83,
    'home',
    null,
    '1A'
),
(
    83,
    'away',
    null,
    'third'
),
(
    84,
    'home',
    null,
    '1L'
),
(
    84,
    'away',
    null,
    'third'
),
(
    85,
    'home',
    null,
    '1J'
),
(
    85,
    'away',
    null,
    '2H'
),
(
    86,
    'home',
    null,
    '2D'
),
(
    86,
    'away',
    null,
    '2G'
),
(
    87,
    'home',
    null,
    '1B'
),
(
    87,
    'away',
    null,
    'third'
),
(
    88,
    'home',
    null,
    '1K'
),
(
    88,
    'away',
    null,
    'third'
),
(
    89,
    'home',
    null,
    'W73'
),
(
    89,
    'away',
    null,
    'W74'
),
(
    90,
    'home',
    null,
    'W75'
),
(
    90,
    'away',
    null,
    'W76'
),
(
    91,
    'home',
    null,
    'W77'
),
(
    91,
    'away',
    null,
    'W78'
),
(
    92,
    'home',
    null,
    'W79'
),
(
    92,
    'away',
    null,
    'W80'
),
(
    93,
    'home',
    null,
    'W81'
),
(
    93,
    'away',
    null,
    'W82'
),
(
    94,
    'home',
    null,
    'W83'
),
(
    94,
    'away',
    null,
    'W84'
),
(
    95,
    'home',
    null,
    'W85'
),
(
    95,
    'away',
    null,
    'W86'
),
(
    96,
    'home',
    null,
    'W87'
),
(
    96,
    'away',
    null,
    'W88'
),
(
    97,
    'home',
    null,
    'W89'
),
(
    97,
    'away',
    null,
    'W90'
),
(
    98,
    'home',
    null,
    'W91'
),
(
    98,
    'away',
    null,
    'W92'
),
(
    99,
    'home',
    null,
    'W93'
),
(
    99,
    'away',
    null,
    'W94'
),
(
    100,
    'home',
    null,
    'W95'
),
(
    100,
    'away',
    null,
    'W96'
),
(
    101,
    'home',
    null,
    'W97'
),
(
    101,
    'away',
    null,
    'W98'
),
(
    102,
    'home',
    null,
    'W99'
),
(
    102,
    'away',
    null,
    'W100'
),
(
    103,
    'home',
    null,
    'W101'
),
(
    103,
    'away',
    null,
    'W102'
);
