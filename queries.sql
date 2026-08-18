DROP TABLE IF EXISTS team, tournament, group, group_team, match, match_team;

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

CREATE TABLE group (
    id SERIAL PRIMARY KEY,

    tournament_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    code CHAR(1) NOT NULL UNIQUE,

    CONSTRAINT fk_group_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournament(id)
        ON DELETE CASCADE,

    CONSTRAINT unique_group
        UNIQUE (tournament_id, name)
);

CREATE TABLE group_team (
    group_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,

    PRIMARY KEY (group_id, team_id),

    CONSTRAINT fk_group_team_group
        FOREIGN KEY (group_id)
        REFERENCES group(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_group_team_team
        FOREIGN KEY (team_id)
        REFERENCES team(id)
        ON DELETE CASCADE
);

CREATE TABLE match (
    id SERIAL PRIMARY KEY,

    tournament_id INTEGER NOT NULL,
    round VARCHAR(100),
    group_id INTEGER,

    match_number INTEGER NOT NULL,

    match_time TIME,
    match_date DATE,

    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',

    home_score INTEGER,
    away_score INTEGER,

    CONSTRAINT fk_match_tournament
        FOREIGN KEY (tournament_id)
        REFERENCES tournament(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_match_group
        FOREIGN KEY (group_id)
        REFERENCES group(id)
        ON DELETE RESTRICT,

    CONSTRAINT valid_status
        CHECK (
            status IN ('scheduled', 'finished')
        ),

    CONSTRAINT valid_home_score
        CHECK (home_score IS NULL OR home_score >= 0),

    CONSTRAINT valid_away_score
        CHECK (away_score IS NULL OR away_score >= 0),

    CONSTRAINT unique_match_number
        UNIQUE (tournament_id, round, match_number)
);

CREATE TABLE match_team (
    id SERIAL PRIMARY KEY,

    match_id INTEGER NOT NULL,

    slot VARCHAR(10) NOT NULL,

    team_id INTEGER,

    source_match_id INTEGER,

    CONSTRAINT fk_participant_match
        FOREIGN KEY (match_id)
        REFERENCES match(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_participant_team
        FOREIGN KEY (team_id)
        REFERENCES team(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_participant_source_match
        FOREIGN KEY (source_match_id)
        REFERENCES match(id)
        ON DELETE RESTRICT,

    CONSTRAINT valid_slot
        CHECK (slot IN ('home', 'away')),

    CONSTRAINT participant_source
        CHECK (
            team_id IS NOT NULL
            OR source_match_id IS NOT NULL
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
        '/images/scotlanflag.webp',
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
        'https://flagsapi.com/UA/flat/64.png',
        'UA'
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

INSERT INTO group (
    tournament_id,
    name,
    code
)
VALUES (
    1,
    'Group A',
    'A'
),(
    1,
    'Group B',
    'B'
),(
    1,
    'Group C',
    'C'
),(
    1,
    'Group D',
    'D'
),(
    1,
    'Group E',
    'E'
),(
    1,
    'Group F',
    'F'
),(
    1,
    'Group G',
    'G'
),(
    1,
    'Group H',
    'H'
),(
    1,
    'Group I',
    'I'
),(
    1,
    'Group J',
    'J'
),(
    1,
    'Group K',
    'K'
),(
    1,
    'Group L',
    'L'
);

INSERT INTO group_team (
    group_id,
    team_id
)
VALUES (
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'MX')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'KR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'ZA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'A'),

        (SELECT id
         FROM team
         WHERE code = 'CZ')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'CA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'BA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'QA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'B'),

        (SELECT id
         FROM team
         WHERE code = 'CH')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'BR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'MA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'UK')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'C'),

        (SELECT id
         FROM team
         WHERE code = 'HT')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'US')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'AU')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'PY')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'D'),

        (SELECT id
         FROM team
         WHERE code = 'TR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'DE')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'EC')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'CI')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'E'),

        (SELECT id
         FROM team
         WHERE code = 'CW')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'NL')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'JP')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'TN')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'F'),

        (SELECT id
         FROM team
         WHERE code = 'UA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'BE')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'IR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'EG')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'G'),

        (SELECT id
         FROM team
         WHERE code = 'NZ')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'ES')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'UY')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'SA')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'H'),

        (SELECT id
         FROM team
         WHERE code = 'CV')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'FR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'SN')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'NO')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'I'),

        (SELECT id
         FROM team
         WHERE code = 'IQ')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'AR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'AT')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'DZ')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'J'),

        (SELECT id
         FROM team
         WHERE code = 'JO')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'PT')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'CO')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'UZ')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'K'),

        (SELECT id
         FROM team
         WHERE code = 'CD')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'GB')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'HR')
    ),(
        (SELECT id
         FROM group
         WHERE tournament_id = 1
         AND code = 'L'),

        (SELECT id
         FROM team
         WHERE code = 'PA')
    ),(
        (SELECT id
         FROM group
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
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    1,
    '21:00',
    'Jue, 11/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    2,
    '04:00',
    'Vie, 12/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    3,
    '21:00',
    'Vie, 12/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    4,
    '03:00',
    'Sab, 13/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    5,
    '21:00',
    'Sab, 13/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    6,
    '00:00',
    'Dom, 14/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    7,
    '03:00',
    'Dom, 14/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    8,
    '06:00',
    'Dom, 14/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    9,
    '19:00',
    'Dom, 14/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    10,
    '22:00',
    'Dom, 14/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    11,
    '01:00',
    'Lun, 15/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    12,
    '04:00',
    'Lun, 15/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    13,
    '18:00',
    'Lun, 15/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    14,
    '21:00',
    'Lun, 15/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    15,
    '00:00',
    'Mar, 16/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    16,
    '03:00',
    'Mar, 16/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    17,
    '21:00',
    'Mar, 16/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    18,
    '00:00',
    'Mie, 17/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    19,
    '03:00',
    'Mie, 17/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    20,
    '06:00',
    'Mie, 17/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    21,
    '19:00',
    'Mie, 17/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    22,
    '22:00',
    'Mie, 17/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    23,
    '01:00',
    'Jue, 18/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    24,
    '04:00',
    'Jue, 18/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    25,
    '18:00',
    'Jue, 18/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    26,
    '21:00',
    'Jue, 18/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    27,
    '00:00',
    'Vie, 19/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    28,
    '03:00',
    'Vie, 19/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    29,
    '21:00',
    'Vie, 19/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    30,
    '00:00',
    'Sab, 20/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    31,
    '02:30',
    'Sab, 20/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    32,
    '05:00',
    'Sab, 20/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    33,
    '19:00',
    'Sab, 20/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    34,
    '22:00',
    'Sab, 20/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    35,
    '02:00',
    'Dom, 21/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    36,
    '06:00',
    'Dom, 21/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    37,
    '18:00',
    'Dom, 21/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    38,
    '21:00',
    'Dom, 21/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    39,
    '00:00',
    'Lun, 22/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    40,
    '03:00',
    'Lun, 22/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    41,
    '19:00',
    'Lun, 22/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    42,
    '23:00',
    'Lun, 22/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    43,
    '02:00',
    'Mar, 23/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    44,
    '05:00',
    'Mar, 23/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    45,
    '19:00',
    'Mar, 23/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    46,
    '22:00',
    'Mar, 23/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    47,
    '01:00',
    'Mie, 24/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    48,
    '04:00',
    'Mie, 24/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    49,
    '21:00',
    'Mie, 24/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'B'),
    50,
    '21:00',
    'Mie, 24/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    51,
    '00:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'C'),
    52,
    '00:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    53,
    '03:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'A'),
    54,
    '03:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    55,
    '22:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'E'),
    56,
    '22:00',
    'Jue, 25/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    57,
    '01:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'F'),
    58,
    '01:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    59,
    '04:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'D'),
    60,
    '04:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    61,
    '21:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'I'),
    62,
    '21:00',
    'Vie, 26/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    63,
    '02:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'H'),
    64,
    '02:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    65,
    '05:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'G'),
    66,
    '05:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    67,
    '23:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'L'),
    68,
    '23:00',
    'Sab, 27/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    69,
    '01:30',
    'Dom, 28/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'K'),
    70,
    '01:30',
    'Dom, 28/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    71,
    '04:00',
    'Dom, 28/6'
),(
    1,
    'GROUP_STAGE',
    (SELECT id
     FROM group
     WHERE tournament_id = 1
     AND code = 'J'),
    72,
    '04:00',
    'Dom, 28/6'
);

INSERT INTO match_team (
    match_id,
    slot,
    team_id
)
VALUES (
    1,
    'home',
    (SELECT id FROM teams WHERE code = 'MX')
),(
    1,
    'away',
    (SELECT id FROM teams WHERE code = 'ZA')
),(
    2,
    'home',
    (SELECT id FROM teams WHERE code = 'KR')
),(
    2,
    'away',
    (SELECT id FROM teams WHERE code = 'CZ')
),(
    3,
    'home',
    (SELECT id FROM teams WHERE code = 'CA')
),(
    3,
    'away',
    (SELECT id FROM teams WHERE code = 'BA')
),(
    4,
    'home',
    (SELECT id FROM teams WHERE code = 'US')
),(
    4,
    'away',
    (SELECT id FROM teams WHERE code = 'PY')
),(
    5,
    'home',
    (SELECT id FROM teams WHERE code = 'QA')
),(
    5,
    'away',
    (SELECT id FROM teams WHERE code = 'CH')
),(
    6,
    'home',
    (SELECT id FROM teams WHERE code = 'BR')
),(
    6,
    'away',
    (SELECT id FROM teams WHERE code = 'MA')
),(
    7,
    'home',
    (SELECT id FROM teams WHERE code = 'HT')
),(
    7,
    'away',
    (SELECT id FROM teams WHERE code = 'undefined')
),(
    8,
    'home',
    (SELECT id FROM teams WHERE code = 'AU')
),(
    8,
    'away',
    (SELECT id FROM teams WHERE code = 'TR')
),(
    9,
    'home',
    (SELECT id FROM teams WHERE code = 'DE')
),(
    9,
    'away',
    (SELECT id FROM teams WHERE code = 'CW')
),(
    10,
    'home',
    (SELECT id FROM teams WHERE code = 'NL')
),(
    10,
    'away',
    (SELECT id FROM teams WHERE code = 'JP')
),(
    11,
    'home',
    (SELECT id FROM teams WHERE code = 'CI')
),(
    11,
    'away',
    (SELECT id FROM teams WHERE code = 'EC')
),(
    12,
    'home',
    (SELECT id FROM teams WHERE code = 'UA')
),(
    12,
    'away',
    (SELECT id FROM teams WHERE code = 'TN')
),(
    13,
    'home',
    (SELECT id FROM teams WHERE code = 'ES')
),(
    13,
    'away',
    (SELECT id FROM teams WHERE code = 'CV')
),(
    14,
    'home',
    (SELECT id FROM teams WHERE code = 'BE')
),(
    14,
    'away',
    (SELECT id FROM teams WHERE code = 'EG')
),(
    15,
    'home',
    (SELECT id FROM teams WHERE code = 'SA')
),(
    15,
    'away',
    (SELECT id FROM teams WHERE code = 'UY')
),(
    16,
    'home',
    (SELECT id FROM teams WHERE code = 'IR')
),(
    16,
    'away',
    (SELECT id FROM teams WHERE code = 'NZ')
),(
    17,
    'home',
    (SELECT id FROM teams WHERE code = 'FR')
),(
    17,
    'away',
    (SELECT id FROM teams WHERE code = 'SN')
),(
    18,
    'home',
    (SELECT id FROM teams WHERE code = 'IQ')
),(
    18,
    'away',
    (SELECT id FROM teams WHERE code = 'NO')
),(
    19,
    'home',
    (SELECT id FROM teams WHERE code = 'AR')
),(
    19,
    'away',
    (SELECT id FROM teams WHERE code = 'DZ')
),(
    20,
    'home',
    (SELECT id FROM teams WHERE code = 'AT')
),(
    20,
    'away',
    (SELECT id FROM teams WHERE code = 'JO')
),(
    21,
    'home',
    (SELECT id FROM teams WHERE code = 'PT')
),(
    21,
    'away',
    (SELECT id FROM teams WHERE code = 'CD')
),(
    22,
    'home',
    (SELECT id FROM teams WHERE code = 'GB')
),(
    22,
    'away',
    (SELECT id FROM teams WHERE code = 'HR')
),(
    23,
    'home',
    (SELECT id FROM teams WHERE code = 'GH')
),(
    23,
    'away',
    (SELECT id FROM teams WHERE code = 'PA')
),(
    24,
    'home',
    (SELECT id FROM teams WHERE code = 'UZ')
),(
    24,
    'away',
    (SELECT id FROM teams WHERE code = 'CO')
),(
    25,
    'home',
    (SELECT id FROM teams WHERE code = 'CZ')
),(
    25,
    'away',
    (SELECT id FROM teams WHERE code = 'ZA')
),(
    26,
    'home',
    (SELECT id FROM teams WHERE code = 'CH')
),(
    26,
    'away',
    (SELECT id FROM teams WHERE code = 'BA')
),(
    27,
    'home',
    (SELECT id FROM teams WHERE code = 'CA')
),(
    27,
    'away',
    (SELECT id FROM teams WHERE code = 'QA')
),(
    28,
    'home',
    (SELECT id FROM teams WHERE code = 'MX')
),(
    28,
    'away',
    (SELECT id FROM teams WHERE code = 'KR')
),(
    29,
    'home',
    (SELECT id FROM teams WHERE code = 'US')
),(
    29,
    'away',
    (SELECT id FROM teams WHERE code = 'AU')
),(
    30,
    'home',
    (SELECT id FROM teams WHERE code = 'undefined')
),(
    30,
    'away',
    (SELECT id FROM teams WHERE code = 'MA')
),(
    31,
    'home',
    (SELECT id FROM teams WHERE code = 'BR')
),(
    31,
    'away',
    (SELECT id FROM teams WHERE code = 'HT')
),(
    32,
    'home',
    (SELECT id FROM teams WHERE code = 'TR')
),(
    32,
    'away',
    (SELECT id FROM teams WHERE code = 'PY')
),(
    33,
    'home',
    (SELECT id FROM teams WHERE code = 'NL')
),(
    33,
    'away',
    (SELECT id FROM teams WHERE code = 'UA')
),(
    34,
    'home',
    (SELECT id FROM teams WHERE code = 'DE')
),(
    34,
    'away',
    (SELECT id FROM teams WHERE code = 'CI')
),(
    35,
    'home',
    (SELECT id FROM teams WHERE code = 'EC')
),(
    35,
    'away',
    (SELECT id FROM teams WHERE code = 'CW')
),(
    36,
    'home',
    (SELECT id FROM teams WHERE code = 'TN')
),(
    36,
    'away',
    (SELECT id FROM teams WHERE code = 'JP')
),(
    37,
    'home',
    (SELECT id FROM teams WHERE code = 'ES')
),(
    37,
    'away',
    (SELECT id FROM teams WHERE code = 'SA')
),(
    38,
    'home',
    (SELECT id FROM teams WHERE code = 'BE')
),(
    38,
    'away',
    (SELECT id FROM teams WHERE code = 'IR')
),(
    39,
    'home',
    (SELECT id FROM teams WHERE code = 'UY')
),(
    39,
    'away',
    (SELECT id FROM teams WHERE code = 'CV')
),(
    40,
    'home',
    (SELECT id FROM teams WHERE code = 'NZ')
),(
    40,
    'away',
    (SELECT id FROM teams WHERE code = 'EG')
),(
    41,
    'home',
    (SELECT id FROM teams WHERE code = 'AR')
),(
    41,
    'away',
    (SELECT id FROM teams WHERE code = 'AT')
),(
    42,
    'home',
    (SELECT id FROM teams WHERE code = 'FR')
),(
    42,
    'away',
    (SELECT id FROM teams WHERE code = 'IQ')
),(
    43,
    'home',
    (SELECT id FROM teams WHERE code = 'NO')
),(
    43,
    'away',
    (SELECT id FROM teams WHERE code = 'SN')
),(
    44,
    'home',
    (SELECT id FROM teams WHERE code = 'JO')
),(
    44,
    'away',
    (SELECT id FROM teams WHERE code = 'DZ')
),(
    45,
    'home',
    (SELECT id FROM teams WHERE code = 'PT')
),(
    45,
    'away',
    (SELECT id FROM teams WHERE code = 'UZ')
),(
    46,
    'home',
    (SELECT id FROM teams WHERE code = 'GB')
),(
    46,
    'away',
    (SELECT id FROM teams WHERE code = 'GH')
),(
    47,
    'home',
    (SELECT id FROM teams WHERE code = 'PA')
),(
    47,
    'away',
    (SELECT id FROM teams WHERE code = 'HR')
),(
    48,
    'home',
    (SELECT id FROM teams WHERE code = 'CO')
),(
    48,
    'away',
    (SELECT id FROM teams WHERE code = 'CD')
),(
    49,
    'home',
    (SELECT id FROM teams WHERE code = 'CH')
),(
    49,
    'away',
    (SELECT id FROM teams WHERE code = 'CA')
),(
    50,
    'home',
    (SELECT id FROM teams WHERE code = 'BA')
),(
    50,
    'away',
    (SELECT id FROM teams WHERE code = 'QA')
),(
    51,
    'home',
    (SELECT id FROM teams WHERE code = 'MA')
),(
    51,
    'away',
    (SELECT id FROM teams WHERE code = 'HT')
),(
    52,
    'home',
    (SELECT id FROM teams WHERE code = 'undefined')
),(
    52,
    'away',
    (SELECT id FROM teams WHERE code = 'BR')
),(
    53,
    'home',
    (SELECT id FROM teams WHERE code = 'ZA')
),(
    53,
    'away',
    (SELECT id FROM teams WHERE code = 'KR')
),(
    54,
    'home',
    (SELECT id FROM teams WHERE code = 'CZ')
),(
    54,
    'away',
    (SELECT id FROM teams WHERE code = 'MX')
),(
    55,
    'home',
    (SELECT id FROM teams WHERE code = 'CW')
),(
    55,
    'away',
    (SELECT id FROM teams WHERE code = 'CI')
),(
    56,
    'home',
    (SELECT id FROM teams WHERE code = 'EC')
),(
    56,
    'away',
    (SELECT id FROM teams WHERE code = 'DE')
),(
    57,
    'home',
    (SELECT id FROM teams WHERE code = 'TN')
),(
    57,
    'away',
    (SELECT id FROM teams WHERE code = 'NL')
),(
    58,
    'home',
    (SELECT id FROM teams WHERE code = 'JP')
),(
    58,
    'away',
    (SELECT id FROM teams WHERE code = 'UA')
),(
    59,
    'home',
    (SELECT id FROM teams WHERE code = 'TR')
),(
    59,
    'away',
    (SELECT id FROM teams WHERE code = 'US')
),(
    60,
    'home',
    (SELECT id FROM teams WHERE code = 'PY')
),(
    60,
    'away',
    (SELECT id FROM teams WHERE code = 'AU')
),(
    61,
    'home',
    (SELECT id FROM teams WHERE code = 'NO')
),(
    61,
    'away',
    (SELECT id FROM teams WHERE code = 'FR')
),(
    62,
    'home',
    (SELECT id FROM teams WHERE code = 'SN')
),(
    62,
    'away',
    (SELECT id FROM teams WHERE code = 'IQ')
),(
    63,
    'home',
    (SELECT id FROM teams WHERE code = 'CV')
),(
    63,
    'away',
    (SELECT id FROM teams WHERE code = 'SA')
),(
    64,
    'home',
    (SELECT id FROM teams WHERE code = 'UY')
),(
    64,
    'away',
    (SELECT id FROM teams WHERE code = 'ES')
),(
    65,
    'home',
    (SELECT id FROM teams WHERE code = 'NZ')
),(
    65,
    'away',
    (SELECT id FROM teams WHERE code = 'BE')
),(
    66,
    'home',
    (SELECT id FROM teams WHERE code = 'EG')
),(
    66,
    'away',
    (SELECT id FROM teams WHERE code = 'IR')
),(
    67,
    'home',
    (SELECT id FROM teams WHERE code = 'PA')
),(
    67,
    'away',
    (SELECT id FROM teams WHERE code = 'GB')
),(
    68,
    'home',
    (SELECT id FROM teams WHERE code = 'HR')
),(
    68,
    'away',
    (SELECT id FROM teams WHERE code = 'GH')
),(
    69,
    'home',
    (SELECT id FROM teams WHERE code = 'CO')
),(
    69,
    'away',
    (SELECT id FROM teams WHERE code = 'PT')
),(
    70,
    'home',
    (SELECT id FROM teams WHERE code = 'CD')
),(
    70,
    'away',
    (SELECT id FROM teams WHERE code = 'UZ')
),(
    71,
    'home',
    (SELECT id FROM teams WHERE code = 'DZ')
),(
    71,
    'away',
    (SELECT id FROM teams WHERE code = 'AT')
),(
    72,
    'home',
    (SELECT id FROM teams WHERE code = 'JO')
),(
    72,
    'away',
    (SELECT id FROM teams WHERE code = 'AR')
);
