export function cleanJsonString(input: string): string {
    // Remove leading ```json if present
    let cleaned = input.replace(/^\s*```json\s*/, '');
    // Remove trailing ` if present
    cleaned = cleaned.replace(/```\s*$/, '');
    // Trim any remaining whitespace
    return cleaned.trim();
  }