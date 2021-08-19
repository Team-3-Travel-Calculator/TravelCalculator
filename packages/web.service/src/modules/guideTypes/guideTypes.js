export const GuideGroupSizes = {
  Small: { code: 1, personsLimit: 5 },
  Medium: { code: 2, personsLimit: 15 },
  Large: { code: 3, personsLimit: 50 },
};

export const GuideTypes = {
  Transfer: 1,
  Tour: 2,
  Instructor: 3,
  SkiInstructor: 4,
};

export const WorkTermTypes = {
  NoTerm: { code: 1, hourLimit: 0 },
  ShortTerm: { code: 2, hourLimit: 4.483 },
  MidTerm: { code: 3, hourLimit: 7.983 },
  LongTerm: { code: 4, hourLimit: 24 },
};
