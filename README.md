# Jinja for Visual Studio Code

This extension adds language colorization support for the Jinja template language to VS Code.

![IDE](https://raw.githubusercontent.com/wholroyd/vscode-jinja/master/example.png)

## Using

First, you will need to install Visual Studio Code `1.0.0` or higher. In the command palette (`cmd-shift-p`) select `Install Extension` and choose `Jinja`.

The downside of the Jinja language itself is that there is no defined file extension and as such, there is no way to detect it automatically in all cases. If you'd like to associate a file extension with this language, use the `file.association` setting as described [here](https://code.visualstudio.com/docs/languages/overview#_adding-a-file-extension-to-a-language).

```json
"files.associations": {
    "*.jinja": "jinja",
    "*.sls": "jinja"
}
```


## Possible Issues

A change was made to Visual Studio Code a while back which changed how languages are injected and used together. Such as using Jinja with HTML, YAML, JSON, or any other language you want to templatize. As a result, the extension will only highlight for the actual Jinja language or the other language, but not both. It's an unfortunate short term solution to give YAML and HTML options back to users until the extension can be revamped to support Jinja with any other language.

## Contributing

If you are interested in making this extension better, I will gladly take pull requests that expand it to add intellisense, hovers and validators. If you're not familiar with working on Visual Studio Code extensions, check out the VS Code extenders documentation at
https://code.visualstudio.com/docs.

To get started on the extension...

1. Go to the Debug viewlet and select `Launch Extension` then hit run (`F5`). This will launch a second instance of Code with the extension from the first window loaded.

2. As you make changes, you can also reload (`Ctrl+R` or `Cmd+R` on Mac) the second Code window to load any changes.

If you have a previous release of the extension installed and you perform these steps, Code will temporarily override the locally installed version instead for the one you're working on for the second window. The first (main) window will remain to have the locally installed, prior version installed and enabled until an update is available.

## Contributors

- [Mikhail Kashkin](https://github.com/xen)
- [TuxOtaku (Ryan Draga)](https://github.com/TuxOtaku)
- [Silvenga (Mark Lopez)](https://github.com/Silvenga)
- [Tim Wilde](https://github.com/TimWilde)
- [Juan Castano](https://github.com/juan-castano)
- [MortalCatalyst (Sayth)](https://github.com/MortalCatalyst)

## License
[MIT](LICENSE)
