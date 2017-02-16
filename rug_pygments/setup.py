# -*- coding: utf-8 -*-
from setuptools import setup

from rug import __version__


setup(
    name='rug_pygments',
    version=__version__,
    py_modules=['rug'],
    install_requires=[
        'pygments',
    ],
    entry_points="""
        [pygments.lexers]
        rug = rug:RugDSLLexer
    """,
)
