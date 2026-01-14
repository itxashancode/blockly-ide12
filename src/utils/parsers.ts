import * as esprima from 'esprima';
import * as acorn from 'acorn';

export class CodeParser {
  private parserType: 'esprima' | 'acorn' = 'esprima';
  
  constructor(parserType: 'esprima' | 'acorn' = 'esprima') {
    this.parserType = parserType;
  }

  parseToAST(code: string, language: string): any {
    try {
      if (language === 'javascript') {
        if (this.parserType === 'esprima') {
          return esprima.parseScript(code, { range: true, loc: true });
        } else {
          return acorn.parse(code, { 
            ecmaVersion: 'latest',
            locations: true,
            ranges: true 
          });
        }
      }
      // For other languages, we'll use a simplified approach
      return this.parseCustomLanguage(code, language);
    } catch (error: any) {
      throw new Error(`Parse error: ${error.message}`);
    }
  }

  private parseCustomLanguage(code: string, language: string): any {
    // Simplified parsing for demonstration
    // In production, use proper language parsers
    const lines = code.split('\n');
    const ast = {
      type: 'Program',
      body: lines.map((line, index) => ({
        type: 'ExpressionStatement',
        expression: {
          type: 'Literal',
          value: line,
          raw: `"${line}"`
        },
        loc: {
          start: { line: index + 1, column: 0 },
          end: { line: index + 1, column: line.length }
        }
      }))
    };
    return ast;
  }

    astToBlockly(ast: any): any[] {
    const blocks: any[] = [];
    
    const traverse = (node: any, parentBlock?: any): any => { // Add return type
      if (!node) return null;
      
      switch (node.type) {
        case 'Program':
          node.body.forEach((child: any) => traverse(child));
          break;
        
        case 'VariableDeclaration':
          node.declarations.forEach((decl: any) => {
            blocks.push({
              type: 'variables_set',
              values: {
                VALUE: decl.init ? traverse(decl.init) : null
              },
              fields: {
                VAR: decl.id.name
              }
            });
          });
          break;
        
        case 'FunctionDeclaration':
          blocks.push({
            type: 'procedures_defnoreturn',
            fields: {
              NAME: node.id.name
            },
            statements: {
              STACK: node.body.body.map((stmt: any) => traverse(stmt))
            }
          });
          break;
        
        case 'BinaryExpression':
          return {
            type: 'math_arithmetic',
            fields: {
              OP: node.operator
            },
            values: {
              A: traverse(node.left),
              B: traverse(node.right)
            }
          };
        
        case 'Literal':
          return {
            type: 'math_number',
            fields: {
              NUM: node.value
            }
          };
        
        case 'Identifier':
          return {
            type: 'variables_get',
            fields: {
              VAR: node.name
            }
          };
        
        default:
          return null;
      }
      return null;
    };
    
    traverse(ast);
    return blocks;
  }
  findErrorLocation(error: Error, code: string): { line: number; column: number } {
    const match = error.message.match(/at line (\d+) column (\d+)/);
    if (match) {
      return {
        line: parseInt(match[1]),
        column: parseInt(match[2])
      };
    }
    
    // Fallback: find the first problematic line
    const lines = code.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('undefined') || lines[i].includes('null')) {
        return { line: i + 1, column: 0 };
      }
    }
    
    return { line: 1, column: 0 };
  }
}