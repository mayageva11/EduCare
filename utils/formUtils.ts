/**
 * Utility functions for handling form data
 */

/**
 * Decodes base64 content from a data URL
 * @param dataUrl - The data URL containing base64 encoded content
 * @returns The decoded content as an object or null if there was an error
 */
export function decodeFormContent<T>(dataUrl: string): T | null {
  try {
    // Handle empty or invalid data URL
    if (!dataUrl) {
      console.error('Empty data URL provided');
      return null;
    }

    // Check if the data URL has the correct format
    if (!dataUrl.includes('base64')) {
      console.error('Invalid data URL format: missing base64 indicator');
      return null;
    }

    // Extract the base64 part
    const parts = dataUrl.split(',');
    if (parts.length < 2) {
      console.error('Invalid data URL format: cannot extract base64 data');
      return null;
    }

    const base64Data = parts[1];

    // Decode the base64 data
    const jsonString = atob(base64Data);

    // Validate JSON before parsing
    try {
      JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Invalid JSON format in data URL', parseError);
      return null;
    }

    // Parse the JSON string
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Error decoding form content:', error);
    return null;
  }
}

/**
 * Creates a data URL for JSON content
 * @param content - The content to encode
 * @returns A data URL with base64 encoded content
 */
export function encodeFormContent(content: any): string {
  try {
    // Validate content
    if (!content) {
      console.error('Empty content provided for encoding');
      return '';
    }

    // Convert content to JSON string
    const jsonString = JSON.stringify(content);

    // Convert to base64
    const base64Data = btoa(jsonString);

    // Create data URL
    return `data:application/json;base64,${base64Data}`;
  } catch (error) {
    console.error('Error encoding form content:', error);
    return '';
  }
}

/**
 * Creates a file name for a form
 * @param formName - The name of the form
 * @returns A file name with current date
 */
export function createFormFileName(formName: string): string {
  try {
    if (!formName) {
      return `form-${new Date().toISOString().split('T')[0]}.json`;
    }

    const sanitizedName = formName.replace(/[^\w\s-]/g, '').trim();
    const date = new Date().toISOString().split('T')[0];
    return `${sanitizedName}-${date}.json`;
  } catch (error) {
    console.error('Error creating form file name:', error);
    return `form-${Date.now()}.json`;
  }
}

/**
 * Validates the structure of a functional report
 * @param content - The report content to validate
 * @returns Boolean indicating if the structure is valid
 */
export function validateFunctionalReportContent(content: any): boolean {
  if (!content) return false;

  return (
    typeof content.academicEvaluation === 'string' &&
    content.behavioralEvaluation &&
    typeof content.behavioralEvaluation.emotionalEvaluation === 'string' &&
    typeof content.behavioralEvaluation.socialEvaluation === 'string'
  );
}
