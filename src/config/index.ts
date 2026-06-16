/**
 * @file Per-client configuration system
 * @description Exports all config-related types, functions, and defaults
 */

// Types
export {
  CONFIDENCE_THRESHOLD,
  type ValidationFailure,
  type TagDefinition,
  type ClientConfig,
} from "./types.js";

// Loader
export { getClientConfig, getAvailableConfigIds } from "./loader.js";

// Prompt builder
export { buildSplitterPrompt } from "./prompt-builder.js";

// Validator
export {
  validateExtraction,
  type LowConfidenceField,
  type ValidationResult,
  type ExtendAIOutput,
} from "./validator.js";

// Default config
export { defaultConfig } from "./clients/default.js";
