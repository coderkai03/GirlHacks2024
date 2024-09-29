export function cleanJsonString(input: string): string {
  // Remove leading ```json if present
  let cleaned = input.replace(/^\s*```json\s*/, '');
  // Remove trailing ``` if present
  cleaned = cleaned.replace(/```\s*$/, '');
  // Remove trailing commas in objects and arrays
  cleaned = cleaned.replace(/,(\s*[\]}])/g, '$1');
  // Remove trailing commas in arrays with items on new lines
  cleaned = cleaned.replace(/,(\s*\n\s*[\]}])/g, '$1');
  // Trim any remaining whitespace
  return cleaned.trim();
}