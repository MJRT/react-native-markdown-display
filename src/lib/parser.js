import {stringToAST} from './util/stringToAST';
import tokensToAST from './util/tokensToAST';
import {stringToTokens} from './util/stringToTokens';
import {cleanupTokens} from './util/cleanupTokens';
import groupTextTokens from './util/groupTextTokens';
import omitListItemParagraph from './util/omitListItemParagraph';

/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @param {Array<string>} [blockTokens]
 * @return {View}
 */
export default function parser(source, renderer, markdownIt, blockTokens) {
  if (Array.isArray(source)) {
    return renderer(source);
  }

  const astTree = stringToAST(source, markdownIt, blockTokens);

  return renderer(astTree);
}
