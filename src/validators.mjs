function isBlank(value) {
  return value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0);
}

export function validateItem(item, profile) {
  const errors = [];
  const warnings = [];

  for (const field of profile.requiredFields) {
    if (isBlank(item[field])) {
      errors.push({
        code: "required-field-missing",
        field,
        message: `${field} is required for ${profile.entity}.`,
      });
    }
  }

  if (item.status === "blocked" || item.status === "waiting") {
    warnings.push({
      code: "status-needs-attention",
      field: "status",
      message: "The item is not ready and needs an owner decision.",
    });
  }

  if (profile.warningField && isBlank(item[profile.warningField])) {
    warnings.push({
      code: "recommended-field-missing",
      field: profile.warningField,
      message: `${profile.warningField} is recommended before release.`,
    });
  }

  if (item.riskLevel === "high") {
    warnings.push({
      code: "high-risk-item",
      field: "riskLevel",
      message: "High risk items require manual review evidence.",
    });
  }

  return {
    id: item.id ?? `item-${item._index + 1}`,
    title: item.title ?? "(untitled)",
    result: errors.length > 0 ? "failed" : warnings.length > 0 ? "warning" : "passed",
    errors,
    warnings,
  };
}
