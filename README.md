# Jinja for Visual Studio Code

This extension adds syntax highlighting and snippets for the Jinja template language.

![IDE](https://raw.githubusercontent.com/wholroyd/vscode-jinja/master/example.png)

## Using

Install Visual Studio Code 1.75 or higher. In the command palette (`cmd-shift-p` / `ctrl-shift-p`) choose **Install Extensions** and search for `Jinja`.

Jinja has no single standard file extension, so the extension maps a few common ones and leaves the rest to you.

| Language mode | Extensions |
| --- | --- |
| Jinja | `.j2`, `.jinja`, `.jinja2` |
| Jinja HTML | `.html.j2`, `.html.jinja`, `.html.jinja2` |
| Jinja YAML | `.yml.j2`, `.yaml.j2`, `.yml.jinja`, `.yaml.jinja`, `.sls` |

Jinja HTML is a separate language from HTML. Emmet abbreviations work there because the extension maps `jinja-html` to HTML for Emmet. Script and style blocks use JavaScript and CSS commenting instead of HTML comments.

To treat other names as Jinja, use [`files.associations`](https://code.visualstudio.com/docs/languages/overview#_adding-a-file-extension-to-a-language):

```json
"files.associations": {
    "*.jinja": "jinja",
    "*.html": "jinja-html",
    "*.sls": "jinja-yaml"
}
```

Do not associate `*.html` globally if you also edit plain HTML in that workspace. Prefer a folder setting, or double extensions like `.html.j2`.

This extension does not replace VS Code's built-in HTML or YAML languages. That used to happen, and it broke commenting, Emmet, and other HTML features in every HTML file.

## Contributing

Pull requests are welcome for highlighting, snippets, and language configuration. IntelliSense, go to definition, and formatters need a language server. This extension does not provide one.

If you're new to VS Code extensions, start at https://code.visualstudio.com/api.

Run `npm test` for grammar fixtures and a check that we still don't attach grammars to the built-in HTML or YAML languages. Pull requests run the same command in GitHub Actions.

To work on this extension:

1. Open the Debug viewlet, select `Launch Extension`, and run (`F5`). That starts a second Code window with this folder loaded as the extension.

2. Reload that second window (`Ctrl+R` or `Cmd+R` on Mac) after you change files.

If you already have the Marketplace build installed, the debug window uses this folder instead. Your stable window keeps the installed version.

## Contributors

- [Mikhail Kashkin](https://github.com/xen)
- [TuxOtaku (Ryan Draga)](https://github.com/TuxOtaku)
- [Silvenga (Mark Lopez)](https://github.com/Silvenga)
- [Tim Wilde](https://github.com/TimWilde)
- [Juan Castano](https://github.com/juan-castano)
- [MortalCatalyst (Sayth)](https://github.com/MortalCatalyst)
- [gmotos](https://github.com/gmotos)

## License
[MIT](LICENSE)
