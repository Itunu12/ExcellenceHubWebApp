export interface University {
  id: string;
  name: string;
  shortName: string;
  state: string;
  type: "federal" | "state" | "private";
  established: number;
}

export const nigerianUniversities: University[] = [
  // Federal Universities
  {
    id: "unilag",
    name: "University of Lagos",
    shortName: "UNILAG",
    state: "Lagos",
    type: "federal",
    established: 1962,
  },
  {
    id: "unn",
    name: "University of Nigeria, Nsukka",
    shortName: "UNN",
    state: "Enugu",
    type: "federal",
    established: 1960,
  },
  {
    id: "ui",
    name: "University of Ibadan",
    shortName: "UI",
    state: "Oyo",
    type: "federal",
    established: 1948,
  },
  {
    id: "oau",
    name: "Obafemi Awolowo University",
    shortName: "OAU",
    state: "Osun",
    type: "federal",
    established: 1961,
  },
  {
    id: "abu",
    name: "Ahmadu Bello University",
    shortName: "ABU",
    state: "Kaduna",
    type: "federal",
    established: 1962,
  },
  {
    id: "uniben",
    name: "University of Benin",
    shortName: "UNIBEN",
    state: "Edo",
    type: "federal",
    established: 1970,
  },
  {
    id: "unilorin",
    name: "University of Ilorin",
    shortName: "UNILORIN",
    state: "Kwara",
    type: "federal",
    established: 1975,
  },
  {
    id: "unijos",
    name: "University of Jos",
    shortName: "UNIJOS",
    state: "Plateau",
    type: "federal",
    established: 1975,
  },
  {
    id: "unical",
    name: "University of Calabar",
    shortName: "UNICAL",
    state: "Cross River",
    type: "federal",
    established: 1975,
  },
  {
    id: "unimaid",
    name: "University of Maiduguri",
    shortName: "UNIMAID",
    state: "Borno",
    type: "federal",
    established: 1975,
  },
  {
    id: "uniport",
    name: "University of Port Harcourt",
    shortName: "UNIPORT",
    state: "Rivers",
    type: "federal",
    established: 1975,
  },
  {
    id: "unisokoto",
    name: "Usmanu Danfodiyo University",
    shortName: "UDUS",
    state: "Sokoto",
    type: "federal",
    established: 1975,
  },
  {
    id: "bayero",
    name: "Bayero University Kano",
    shortName: "BUK",
    state: "Kano",
    type: "federal",
    established: 1977,
  },
  {
    id: "uniabuja",
    name: "University of Abuja",
    shortName: "UNIABUJA",
    state: "FCT",
    type: "federal",
    established: 1988,
  },
  {
    id: "futa",
    name: "Federal University of Technology, Akure",
    shortName: "FUTA",
    state: "Ondo",
    type: "federal",
    established: 1981,
  },
  {
    id: "futminna",
    name: "Federal University of Technology, Minna",
    shortName: "FUTMINNA",
    state: "Niger",
    type: "federal",
    established: 1983,
  },
  {
    id: "futo",
    name: "Federal University of Technology, Owerri",
    shortName: "FUTO",
    state: "Imo",
    type: "federal",
    established: 1980,
  },
  {
    id: "fuoye",
    name: "Federal University Oye-Ekiti",
    shortName: "FUOYE",
    state: "Ekiti",
    type: "federal",
    established: 2011,
  },
  {
    id: "fupre",
    name: "Federal University of Petroleum Resources",
    shortName: "FUPRE",
    state: "Delta",
    type: "federal",
    established: 2007,
  },
  {
    id: "noun",
    name: "National Open University of Nigeria",
    shortName: "NOUN",
    state: "FCT",
    type: "federal",
    established: 2002,
  },
  {
    id: "mouau",
    name: "Michael Okpara University of Agriculture",
    shortName: "MOUAU",
    state: "Abia",
    type: "federal",
    established: 1992,
  },

  // State Universities
  {
    id: "lasu",
    name: "Lagos State University",
    shortName: "LASU",
    state: "Lagos",
    type: "state",
    established: 1983,
  },
  {
    id: "oou",
    name: "Olabisi Onabanjo University",
    shortName: "OOU",
    state: "Ogun",
    type: "state",
    established: 1982,
  },
  {
    id: "tasued",
    name: "Tai Solarin University of Education",
    shortName: "TASUED",
    state: "Ogun",
    type: "state",
    established: 2005,
  },
  {
    id: "eksu",
    name: "Ekiti State University",
    shortName: "EKSU",
    state: "Ekiti",
    type: "state",
    established: 1982,
  },
  {
    id: "osustech",
    name: "Osun State University",
    shortName: "UNIOSUN",
    state: "Osun",
    type: "state",
    established: 2006,
  },
  {
    id: "oystech",
    name: "Oyo State Technical University",
    shortName: "OYSTECH",
    state: "Oyo",
    type: "state",
    established: 2019,
  },
  {
    id: "kasu",
    name: "Kaduna State University",
    shortName: "KASU",
    state: "Kaduna",
    type: "state",
    established: 2004,
  },
  {
    id: "kwasu",
    name: "Kwara State University",
    shortName: "KWASU",
    state: "Kwara",
    type: "state",
    established: 2009,
  },
  {
    id: "gsu",
    name: "Gombe State University",
    shortName: "GSU",
    state: "Gombe",
    type: "state",
    established: 2004,
  },
  {
    id: "kust",
    name: "Kebbi State University of Science and Technology",
    shortName: "KUST",
    state: "Kebbi",
    type: "state",
    established: 2006,
  },

  // Private Universities
  {
    id: "covenant",
    name: "Covenant University",
    shortName: "CU",
    state: "Ogun",
    type: "private",
    established: 2002,
  },
  {
    id: "babcock",
    name: "Babcock University",
    shortName: "BU",
    state: "Ogun",
    type: "private",
    established: 1999,
  },
  {
    id: "aun",
    name: "American University of Nigeria",
    shortName: "AUN",
    state: "Adamawa",
    type: "private",
    established: 2003,
  },
  {
    id: "bowen",
    name: "Bowen University",
    shortName: "BU",
    state: "Osun",
    type: "private",
    established: 2001,
  },
  {
    id: "landmark",
    name: "Landmark University",
    shortName: "LMU",
    state: "Omu-Aran",
    type: "private",
    established: 2011,
  },
  {
    id: "pau",
    name: "Pan-Atlantic University",
    shortName: "PAU",
    state: "Lagos",
    type: "private",
    established: 2002,
  },
  {
    id: "adeleke",
    name: "Adeleke University",
    shortName: "AU",
    state: "Osun",
    type: "private",
    established: 2011,
  },
  {
    id: "afe-babalola",
    name: "Afe Babalola University",
    shortName: "ABUAD",
    state: "Ekiti",
    type: "private",
    established: 2009,
  },
];

export const getUniversitiesByState = (state: string) => {
  return universities.filter(
    (uni) => uni.state.toLowerCase() === state.toLowerCase()
  );
};

export const getUniversitiesByType = (
  type: "federal" | "state" | "private"
) => {
  return universities.filter((uni) => uni.type === type);
};

export const searchUniversities = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return universities.filter(
    (uni) =>
      uni.name.toLowerCase().includes(lowercaseQuery) ||
      uni.shortName.toLowerCase().includes(lowercaseQuery) ||
      uni.state.toLowerCase().includes(lowercaseQuery)
  );
};
