# DiPA-Client

DiPA-Client ist das Frontend-Modul von DiPA, basierend auf einem JavaScript-Stack.

## Lizenz

Das Projekte `dipa-client` unterliegt der [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0) Lizenz

## Code of Conduct

Die Zusammenarbeit in diesem Projekt wird durch den
[Verhaltenscodex](https://github.com/DiPA-Projekt/contribution/blob/master/CODE_OF_CONDUCT.md) geregelt. Von
allen Mitarbeitenden wird dessen Einhaltung erwartet. Bitte melden Sie inakzeptables Verhalten an info@dipa.online.

## Entwicklung und Architektur

Nähere Informationen zur Architektur, der Entwicklungsumgebung, den Projekt-Konventionen und zur Mitarbeit können
auf unsere, [Development Guide](DEVELOPMENT.md) nachgelesen werden.

## GitHub Packages einrichten

Alle unsere Artefakte in **GitHub Packages** können von allen über einen **GitHub-Account** unabhängig ob sie Mitglied in der Organisation "DiPA-Projekt" **heruntergeladen** werden.

### GitHub Personal Access Token anlegen

Gehen Sie in Ihre persönlichen GitHub-Einstellungen und erstellen Sie sich einen Personal Access Token mit dem Recht von der Registry lesen zu dürfen.

Link: https://github.com/settings/tokens

![image](https://user-images.githubusercontent.com/6279703/111908499-cb273980-8a59-11eb-85d5-5630c5c8e4bd.png)

### NPM

Geben Sie folgenden Befehl ein, um den GitHub Personal Access Token für NPM zu setzen und die NPM-Registry für DiPA einzustellen.

**Einstellen des Autorisierungstoken:**
```bash
npm config set //npm.pkg.github.com/:_authToken PERSONAL_GITHUB_ACCESS_TOKEN
```

**Einstellen der NPM-Registry für DiPA-Packages:**
```bash
npm config set @dipa-projekt:registry https://npm.pkg.github.com
```

## Projekt Stages

| Stage       | URL                         |
| ----------- | --------------------------- |
| Development | https://develop.dipa.online |
| Production  | https://release.dipa.online |