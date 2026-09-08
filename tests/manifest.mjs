import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const contributes = pkg.contributes;

function lang(id) {
	const found = contributes.languages.find((item) => item.id === id);
	assert.ok(found, `missing language id ${id}`);
	return found;
}

function grammar(language) {
	const found = contributes.grammars.find((item) => item.language === language);
	assert.ok(found, `missing grammar for ${language}`);
	return found;
}

function readConfig(relPath) {
	const abs = join(root, relPath);
	assert.ok(existsSync(abs), `missing ${relPath}`);
	return JSON.parse(readFileSync(abs, "utf8"));
}

test("does not replace built-in HTML or YAML", () => {
	for (const item of contributes.grammars) {
		assert.notEqual(item.language, "html");
		assert.notEqual(item.language, "yaml");
	}
});

test("registers jinja, jinja-html, and jinja-yaml", () => {
	assert.deepEqual(
		contributes.languages.map((item) => item.id).sort(),
		["jinja", "jinja-html", "jinja-yaml"]
	);
	assert.equal(grammar("jinja").scopeName, "source.jinja");
	assert.equal(grammar("jinja-html").scopeName, "text.html.jinja");
	assert.equal(grammar("jinja-yaml").scopeName, "text.yaml.jinja");
});

test("maps common template extensions", () => {
	assert.deepEqual(lang("jinja").extensions, [".j2", ".jinja", ".jinja2"]);
	assert.ok(lang("jinja-html").extensions.includes(".html.j2"));
	assert.ok(lang("jinja-yaml").extensions.includes(".yaml.j2"));
	assert.ok(lang("jinja-yaml").extensions.includes(".sls"));
});

test("language configs exist and keep Jinja delimiters", () => {
	for (const id of ["jinja", "jinja-html", "jinja-yaml"]) {
		const rel = lang(id).configuration;
		const config = readConfig(rel);
		assert.ok(config.brackets.some((pair) => pair[0] === "{{" && pair[1] === "}}"));
		assert.ok(config.brackets.some((pair) => pair[0] === "{%" && pair[1] === "%}"));
		assert.ok(
			!config.autoClosingPairs.some((pair) => pair[0] === "{" && pair[1] === "}"),
			`${rel} must not auto-close a lone {`
		);
	}
});

test("Jinja HTML comments are {# #}, not #", () => {
	const config = readConfig(lang("jinja-html").configuration);
	assert.deepEqual(config.comments.blockComment, ["{#", "#}"]);
	assert.equal(config.comments.lineComment, undefined);
});

test("Jinja YAML keeps # line comments", () => {
	const config = readConfig(lang("jinja-yaml").configuration);
	assert.equal(config.comments.lineComment, "#");
});

test("Emmet treats jinja-html as HTML", () => {
	assert.equal(contributes.configurationDefaults["emmet.includeLanguages"]["jinja-html"], "html");
});

test("snippets and grammars point at files that exist", () => {
	for (const item of contributes.snippets) {
		assert.ok(existsSync(join(root, item.path)), item.path);
	}
	for (const item of contributes.grammars) {
		assert.ok(existsSync(join(root, item.path)), item.path);
		assert.ok(existsSync(join(root, lang(item.language).configuration)));
	}
	assert.deepEqual(
		contributes.snippets.map((item) => item.language).sort(),
		["jinja", "jinja-html", "jinja-yaml"]
	);
});
