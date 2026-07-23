const table = [
  // Grupo A
  { name: "Mexico", id: 1, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Sudafrica", id: 2, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Corea del Sur", id: 3, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Chequia", id: 4, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo B
  { name: "Canada", id: 5, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Bosnia y Herzegovina", id: 6, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Catar", id: 7, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Suiza", id: 8, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo C
  { name: "Brasil", id: 9, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Marruecos", id: 10, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Haiti", id: 11, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Escocia", id: 12, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo D
  { name: "Estados Unidos", id: 13, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Paraguay", id: 14, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Australia", id: 15, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Turquia", id: 16, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo E
  { name: "Alemania", id: 17, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Curazao", id: 18, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Costa de Marfil", id: 19, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Ecuador", id: 20, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo F
  { name: "Paises Bajos", id: 21, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Japon", id: 22, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Suecia", id: 23, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Tunez", id: 24, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo G
  { name: "Belgica", id: 25, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Egipto", id: 26, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Iran", id: 27, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Nueva Zelanda", id: 28, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo H
  { name: "España", id: 29, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Cabo Verde", id: 30, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Arabia Saudita", id: 31, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Uruguay", id: 32, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo I
  { name: "Francia", id: 33, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Senegal", id: 34, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Irak", id: 35, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Noruega", id: 36, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo J
  { name: "Argentina", id: 37, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Argelia", id: 38, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Austria", id: 39, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Jordania", id: 40, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo K
  { name: "Portugal", id: 41, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "RD Congo", id: 42, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Uzbekistan", id: 43, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Colombia", id: 44, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },

  // Grupo L
  { name: "Inglaterra", id: 45, position: 1, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Croacia", id: 46, position: 2, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Ghana", id: 47, position: 3, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 },
  { name: "Panama", id: 48, position: 4, pj: 0, g: 0, e: 0, p: 0, ptos: 0, gf: 0, gc: 0, dg: 0 }
];

export default table;