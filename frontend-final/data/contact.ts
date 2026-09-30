export const CONTACT_SERVICE_OPTIONS = [
  { value: "", label: "What are you looking for?" },
  { value: "commercial", label: "Commercial solar & battery" },
  { value: "residential", label: "Residential solar & battery" },
  { value: "irrigation", label: "Solar irrigation pumps" },
  { value: "offgrid", label: "Off-grid system" },
  { value: "hvac", label: "Commercial HVAC / air conditioning" },
  { value: "ppa", label: "PPA / solar farm on my land" },
  { value: "other", label: "Other / general enquiry" },
] as const;

export const CONTACT_SERVICE_PILLS = CONTACT_SERVICE_OPTIONS.filter((o) => o.value !== "");
