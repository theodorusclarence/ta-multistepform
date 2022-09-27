export type Report = {
  bahasa: number;
  english: number;
  math: number;
  nature_science: number;
  social_science: number;
};

export type ReportForm = {
  report_1_grades: Report;
  report_2_grades: Report;
  report_3_grades: Report;
  report_4_grades: Report;
  report_5_grades: Report;
};
