import getTokenTypeByToken from './getTokenTypeByToken';
import flattenInlineTokens from './flattenInlineTokens';
import renderInlineAsText from './renderInlineAsText';

// Default block tokens that should always be treated as block elements
const DEFAULT_BLOCK_TOKENS = ['image', 'hardbreak'];

export function cleanupTokens(tokens, blockTokens = []) {
  tokens = flattenInlineTokens(tokens);
  tokens.forEach((token) => {
    token.type = getTokenTypeByToken(token);

    // Always set image and hardbreak to block elements (default behavior)
    // Also set any additional tokens specified by the user
    if (
      DEFAULT_BLOCK_TOKENS.includes(token.type) ||
      blockTokens.includes(token.type)
    ) {
      token.block = true;
    }

    // Set img alt text
    if (token.type === 'image') {
      token.attrs[token.attrIndex('alt')][1] = renderInlineAsText(
        token.children,
      );
    }
  });

  /**
   * changing a link token to a blocklink to fix issue where link tokens with
   * nested non text tokens breaks component
   */
  const stack = [];
  tokens = tokens.reduce((acc, token, index) => {
    if (token.type === 'link' && token.nesting === 1) {
      stack.push(token);
    } else if (
      stack.length > 0 &&
      token.type === 'link' &&
      token.nesting === -1
    ) {
      if (stack.some((stackToken) => stackToken.block)) {
        stack[0].type = 'blocklink';
        stack[0].block = true;
        token.type = 'blocklink';
        token.block = true;
      }

      stack.push(token);

      while (stack.length) {
        acc.push(stack.shift());
      }
    } else if (stack.length > 0) {
      stack.push(token);
    } else {
      acc.push(token);
    }

    return acc;
  }, []);

  return tokens;
}
