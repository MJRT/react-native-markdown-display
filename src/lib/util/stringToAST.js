import tokensToAST from './tokensToAST';
import {stringToTokens} from './stringToTokens';
import {cleanupTokens} from './cleanupTokens';
import groupTextTokens from './groupTextTokens';
import omitListItemParagraph from './omitListItemParagraph';

/**
 * Converts a markdown string to an AST (Abstract Syntax Tree)
 *
 * @param {string} source - The markdown source string
 * @param {Object} markdownIt - The markdownIt instance
 * @param {Array<string>} [blockTokens] - List of block tokens to process
 * @return {Object} The AST tree representation of the markdown
 */
export function stringToAST(source, markdownIt, blockTokens) {
  let tokens = stringToTokens(source, markdownIt);
  tokens = cleanupTokens(tokens, blockTokens);
  tokens = groupTextTokens(tokens);
  tokens = omitListItemParagraph(tokens);

  return tokensToAST(tokens);
}
