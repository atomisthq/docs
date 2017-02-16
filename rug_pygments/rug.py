# -*- coding: utf-8 -*-

# This module implements the pygments lexer interface to support the
# Rug DSL (including the BDD test side).
# To install, simply run as follows:
#
# $ python setup.py install
#
# This will automatically add this lexer to the installed pygments
# package.

from pygments.lexer import RegexLexer, bygroups, words, include
from pygments.token import *

__all__ = ['RugDSLLexer']
__version__ = '0.1.0'


class RugDSLLexer(RegexLexer):
    """
    Pygments lexer for the Rug DSL language.
    """
    name = 'Rug'
    aliases = ['rug']
    filenames = ['*.rug']

    tokens = {
        'root': [
            (r'\n', Whitespace),
            (r'\s+', Whitespace),
            (r'/\*', Comment.Multiline, 'comment'),
            (r'#.*?$', Comment.Singleline),
            (r'"|"""|\'|\'\'\'', String, 'string'),
            (r'(@generator)([ \t]+)(".*")$', bygroups(Name.Decorator, Text,
                                                      String)),
            (r'(@generator)$', Name.Decorator),
            (r'(generator|editor|reviewer|predicate|precondition)(\s*)([A-Z][A-Za-z0-9]+)$',
             bygroups(Keyword.Namespace, Text, Name.Namespace)),
            (r'(scenario)(\s*)(.*)$', bygroups(Keyword.Namespace, Text,
                                               Name.Namespace)),
            (r'(@tag|@default)([ \t]+)(["\'].*["\'])$',
             bygroups(Name.Decorator, Text, String)),
            (r'(@description|@validInput|@displayName|@default)',
             bygroups(Name.Decorator)),
            (r'(@optional|@hide)([ \t]*)$',
             bygroups(Name.Decorator, Text)),
            (r'(@minLength|@maxLength)([ \t]+)([0-9]+)$',
             bygroups(Name.Decorator, Text, Number)),
            (r'(begin)$', Keyword.Namespace),
            (r'(end)$', Keyword.Namespace),
            (r'(given)$', Keyword.Namespace),
            (r'(then)$', Keyword.Namespace),
            (r',', Operator),
            include('paramblock'),
            include('letblock'),
            include('usesblock'),
            include('withblock'),
            include('andblock'),
            include('whenblock'),
            include('doblock'),
            include('callotherblock'),
            include('assignblock'),
            include('funcblock')
        ],
        'comment': [
            (r'[^*/]', Comment.Multiline),
            (r'/\*', Comment.Multiline, '#push'),
            (r'\*/', Comment.Multiline, '#pop'),
            (r'[*/]', Comment.Multiline)
        ],
        'string': [
            ('[^"\']', String),
            (r'"|"""|\'|\'\'\'', String, '#pop'),
        ],
        'jsblock': [
            (r'[^}]', Text),
            (r'{', Text, '#push'),
            (r'}', Text, '#pop'),
            (r'[}]', Text)
        ],
        'doblock': [
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)(".*")([ \t]+)([a-zA-Z_]+)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text, String,
                      Text, Name.Variable.Instance)),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)(".*")',
             bygroups(Keyword.Namespace, Text, Name.Function, Text, String)),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)([A-Za-z_]+)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text,
                      Name.Variable.Instance)),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text), 'jsblock'),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)([A-Za-z_]+)([ \t]+)(from|to)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text,
                      Name.Variable.Instance, Text, Operator)),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)([A-Za-z_]+)([ \t]+)(from|to)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text,
                      Name.Variable.Instance, Text, Operator)),
            (r'(do)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)({)(.*)(})([ \t]+)(from|to)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text, Operator,
                      Text, Operator, Text, Operator)),
            (r'(do)(\s*)$',
             bygroups(Keyword.Namespace, Text))
        ],
        'whenblock': [
            (r'(when)([ \t]+)([A-Za-z_]+)([ \t]+)',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text)),
            (r'(when)([ \t]+)([A-Za-z_]+)([ \t]+)([A-Za-z_]+)',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text,
                      Name.Function)),
            (r'(when)([ \t]+)([A-Za-z_]+)(.)([a-z]+)(.)([\w]+)',
             bygroups(Keyword, Text, Name.Variable.Instance, Text,
                      Name.Attribute, Text, Name.Function)),
            (r'(when)([ \t]+)([A-Za-z_]+)([ \t]+)(=)([ \t]+)(".*")',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text,
                      Operator, Text, String)),
            (r'(when)([ \t]+)([A-Za-z_]+)(.)([a-z]+)',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text,
                      Name.Attribute)),
            (r'(when)([ \t]*)$',
             bygroups(Keyword.Namespace, Text)),
        ],
        'withblock': [
            (r'(with)((?:\s|\\\s)+)([a-zA-Z_.]*)([ \t]+)([a-zA-Z]+)',
             bygroups(Keyword.Namespace, Text, Keyword.Type, Text,
                      Name.Variable.Instance)),
            (r'(with)((?:\s|\\\s)+)([a-zA-Z_.]*)',
             bygroups(Keyword.Namespace, Text, Keyword.Type))
        ],
        'paramblock': [
            (r'(param)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]*)(:)([ \t]*)([@a-z_]+)$',
             bygroups(Keyword.Namespace, Text, Name.Variable, Text, Operator,
                      Text, Name.Constant)),
            (r'(param)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]*)(:)([ \t]*)(\^.*\$)$',
             bygroups(Keyword.Namespace, Text, Name.Variable, Text, Operator,
                      Text, String.Regex)),
            (r'(param)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]*)(:)([ \t]*)(".*")$',
             bygroups(Keyword.Namespace, Text, Name.Variable, Text, Operator,
                      Text, String))
        ],
        'letblock': [
            (r'(let)((?:\s|\\\s)+)([a-zA-Z_]+)([ \t]*)(=)([ \t]*)({)',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text,
                      Operator, Text, Punctuation), 'jsblock'),
            (r'(let)((?:\s|\\\s)+)([a-zA-Z_]+)([ \t]*)(=)',
             bygroups(Keyword.Namespace, Text, Name.Variable.Instance, Text,
                      Operator))
        ],
        'usesblock': [
            (r'(uses)((?:\s|\\\s)+)([-a-z]+)(.)([-a-z]+)(.)([a-zA-Z_]+)',
             bygroups(Keyword.Namespace, Text, Name.Namespace, Text,
                      Name.Namespace, Text, Name.Namespace)),
            (r'(uses)((?:\s|\\\s)+)([A-Z][A-Za-z0-9]+)',
             bygroups(Keyword.Namespace, Text, Name.Namespace)),
        ],
        'andblock': [
            (r'(and)((?:\s|\\\s)+)([A-Za-z_]+)([ \t]+)',
             bygroups(Keyword.Namespace, Text, Name.Function, Text)),
            (r'(and)((?:\s|\\\s)+)',
             bygroups(Keyword.Namespace, Text), 'jsblock')
        ],
        'callotherblock': [
            (r'([A-Z][A-Za-z0-9]+)([ \t]*)',
             bygroups(Name.Namespace, Text), 'assignblock'),
            (r'([A-Z][A-Za-z0-9]+)([ \t]*)$',
             bygroups(Name.Namespace, Text)),
        ],
        'assignblock': [
            (r'([-A-Za-z_0-9/.]+)(\s*)(=)(\s*)([A-Za-z_0-9]+)',
             bygroups(Name.Variable, Text, Operator, Text,
                      Name.Variable.Instance)),
            (r'([-A-Za-z_0-9/.]+)(\s*)(=)(\s*)(".*?")',
             bygroups(Name.Variable, Text, Operator, Text, String))
        ],
        'funcblock': [
            (r'([A-Za-z_]+)([ \t]*)',
             bygroups(Name.Function, Text)),
        ]
    }
